import {Game, GameCrawler, GameStatus, Standing, StandingsCrawler, StatisticsCrawler} from "@hardbulls/wbsc-crawler";
import {CONFIG, FixNamesConfig} from "./config";
import * as fs from 'fs/promises'
import * as path from "path";
import {IcalGenerator} from "./Calendar/IcalGenerator";
import {PlayerStatistics} from "@hardbulls/wbsc-crawler/dist/Model/PlayerStatistics";
import {fileExists} from "./files";
import {createHash} from 'crypto';
import {OVERRIDES} from './overrides';
import { fetchEvents } from "./events";

const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 0, 0, 0);

interface ApiGame extends Game {
    id: string,
    league: string,
    season: number,
}

const correctNames = (statistics: PlayerStatistics[], fixNames: FixNamesConfig[]): PlayerStatistics[] => {
    return statistics.map(playerStatistics => {
        for (const {name, corrections} of fixNames) {
            if (corrections.map(v => v.toLowerCase()).includes(playerStatistics.name.toLowerCase())) {
                return {
                    ...playerStatistics,
                    name: name
                }
            }
        }

        return playerStatistics;
    })
}

(async () => {
    const baseOutputDir = path.join(__dirname, CONFIG.output)

    if (CONFIG.eventsUrl) {
        const events = await fetchEvents(CONFIG.eventsUrl)

        await fs.writeFile(path.resolve(path.join(baseOutputDir, 'events.json')), JSON.stringify(events, null, 2));
    }

    for (const league of CONFIG.leagues) {
        if (CONFIG.crawlYears.includes(league.year)) {
            if (league.games) {
                const games: ApiGame[] = (await Promise.all(league.games.map(async gameUrl => await GameCrawler.crawl(gameUrl, CONFIG.timezone)))).flat().map(game => {
                    const gameData  = {
                        ...game,
                        league: league.slug,
                        season: league.year
                    }
                    const gameId = createHash('md5').update(JSON.stringify(gameData)).digest('hex');

                    const apiGame = {
                        id: gameId,
                        ...gameData,
                    }

                    if (OVERRIDES[gameId]) {
                        return {
                            ...apiGame,
                            ...OVERRIDES[gameId]
                        }
                    }

                    return apiGame;
                })

                games.sort((a, b) => a.date.getTime() - b.date.getTime());

                const leagueDirectory = path.resolve(path.join(baseOutputDir, 'seasons', league.year.toString(), league.slug));
                const standingsFile = path.resolve(leagueDirectory, `standings.json`,);
                let standings: Standing[] = [];

                if (league.standings) {
                    standings = await StandingsCrawler.crawl(league.standings)
                }

                const gamesFile = path.resolve(leagueDirectory, `games.json`,);
                const statisticsFile = path.resolve(leagueDirectory, `statistics.json`,);

                await fs.mkdir(leagueDirectory, {recursive: true})
                await fs.writeFile(gamesFile, JSON.stringify(games, null, 2));
                await fs.writeFile(standingsFile, JSON.stringify(standings, null, 2));

                if (league.statistics) {
                    let statistics = await StatisticsCrawler.crawl(league.statistics)

                    if (CONFIG.fixNames) {
                        statistics = correctNames(statistics, CONFIG.fixNames)
                    }

                    await fs.writeFile(statisticsFile, JSON.stringify(statistics, null, 2));
                }
            }
        }
    }


    const aggregateStatistics = async (leagueSlug: string) => {
        const seasonsDirectory = await fs.readdir(path.resolve(baseOutputDir, 'seasons'));
        const statisticsByPlayerAndSeason: { [key: string]: { [key: string]: any } } = {};
        const activeNames: string[] = [];

        for (const season of seasonsDirectory) {
            const previousSeasons: string[] = seasonsDirectory.map(v => v).sort().reverse().slice(0, CONFIG.aggregateYears);

            try {
                const statistics = JSON.parse(await fs.readFile(path.resolve(baseOutputDir, 'seasons', season, leagueSlug, 'statistics.json'), {encoding: "utf8"}));

                for (const playerStatistics of statistics) {
                    const name = playerStatistics.name;

                    if (previousSeasons.includes(season) && !activeNames.includes(name)) {
                        activeNames.push(name);
                    }

                    if (name) {
                        if (!statisticsByPlayerAndSeason[name]) {
                            statisticsByPlayerAndSeason[name] = {}
                        }

                        if (!statisticsByPlayerAndSeason[name][season]) {
                            statisticsByPlayerAndSeason[name][season] = {}
                        }

                        statisticsByPlayerAndSeason[name][season] = playerStatistics.statistics
                    }
                }
            } catch (err) {
                console.warn(`No statistics.json found for ${season} ${leagueSlug}.`)
                console.error(err)
            }
        }

        for (const name of Object.keys(statisticsByPlayerAndSeason)) {
            if (!activeNames.includes(name)) {
                delete statisticsByPlayerAndSeason[name]
            }
        }

        await fs.mkdir(path.resolve(baseOutputDir, 'statistics', leagueSlug), {recursive: true})
        await fs.writeFile(path.resolve(baseOutputDir, 'statistics', leagueSlug, 'all.json'), JSON.stringify(statisticsByPlayerAndSeason, null, 2));
    }


    const generateCalendar = async (leagueName: string, leagueSlug: string) => {
        const seasonsDirectory = await fs.readdir(path.resolve(baseOutputDir, 'seasons'));

        for (const season of seasonsDirectory) {
            const leagueDirectory = path.resolve(path.join(baseOutputDir, 'seasons', season, leagueSlug));
            const gamesJson = path.resolve(leagueDirectory, 'games.json');

            if (await fileExists(gamesJson)) {
                const games: Game[] = JSON.parse(await fs.readFile(gamesJson, {encoding: "utf8"})).map((game: any) => {
                    return {
                        ...game,
                        date: new Date(game.date)
                    }
                });

                const leagueCalendar = IcalGenerator.games(
                    leagueName,
                    games.filter((v: any) => v.status === GameStatus.SCHEDULED || v.status === GameStatus.FINISHED),
                    CONFIG.timezone,
                    CONFIG.defaultGameDuration
                )

                await fs.writeFile(path.resolve(leagueDirectory, 'games.ics'), leagueCalendar);
            }
        }
    }

    const weeklyGames = async () => {
        const upcomingWeekGames: ApiGame[] = [];
        const nextWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 0, 0, 0);

        for (const league of CONFIG.leagues) {
            const leagueDirectory = path.resolve(path.join(baseOutputDir, 'seasons', nextWeek.getFullYear().toString(), league.slug));
            const gamesJson = path.resolve(leagueDirectory, 'games.json');

            if (await fileExists(gamesJson)) {
                const games = JSON.parse(await fs.readFile(gamesJson, {encoding: "utf8"}));

                for (const game of games) {
                    const gameDate = new Date(game.date);

                    if (gameDate > today && gameDate < nextWeek && game.status === GameStatus.SCHEDULED) {
                        const upcomingGame = {
                            ...game,
                            league: league.slug,
                            season: league.year
                        };

                        upcomingWeekGames.push(upcomingGame);
                    }
                }
            }
        }

        await fs.writeFile(path.resolve(baseOutputDir, 'weekly-games.json'), JSON.stringify(upcomingWeekGames, null, 2));
    }

    for (const league of CONFIG.leagues) {
        if (CONFIG.crawlYears.includes(league.year)) {
            await aggregateStatistics(league.slug);
            await generateCalendar(league.name, league.slug);
        }

    }

    await fs.writeFile(path.resolve(baseOutputDir, 'leagues.json'), JSON.stringify(CONFIG.leagues, null, 2));

    await weeklyGames();
})()

