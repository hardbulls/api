import {Game, GameCrawler, GameStatus, StandingsCrawler, StatisticsCrawler} from "@hardbulls/wbsc-crawler";
import {CONFIG} from "./config";
import * as fs from 'fs/promises'
import * as path from "path";
import {IcalGenerator} from "./Calendar/IcalGenerator";

const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 0, 0, 0);

interface ApiGame extends Game {
    league: string,
    season: number,
}

(async () => {
    const nextWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 0, 0, 0);
    const upcomingWeekGames: ApiGame[] = [];
    const baseOutputDir = path.join(__dirname, CONFIG.output)

    for (const league of CONFIG.leagues) {
        const leagueName = `${league.name} ${league.year}`

        if (CONFIG.crawlYears.includes(league.year)) {

            const games: ApiGame[] = (await Promise.all(league.games.map(async gameUrl => await GameCrawler.crawl(gameUrl, CONFIG.timezone)))).flat().map(game => {
                return {
                    ...game,
                    league: league.slug,
                    season: league.year
                }
            })
            const standings = await StandingsCrawler.crawl(league.standings)

            const leagueDirectory = path.resolve(path.join(baseOutputDir, 'seasons', league.year.toString(), league.slug));
            const gamesFile = path.resolve(leagueDirectory, `games.json`,);
            const standingsFile = path.resolve(leagueDirectory, `standings.json`,);
            const statisticsFile = path.resolve(leagueDirectory, `statistics.json`,);

            await fs.mkdir(leagueDirectory, {recursive: true})
            await fs.writeFile(gamesFile, JSON.stringify(games, null, 2));
            await fs.writeFile(standingsFile, JSON.stringify(standings, null, 2));

            for (const game of games) {
                if (game.date > today && game.date < nextWeek && game.status === GameStatus.SCHEDULED) {
                    upcomingWeekGames.push({
                        ...game,
                        league: league.slug,
                        season: league.year
                    });
                }
            }

            if (league.statistics) {
                const statistics = await StatisticsCrawler.crawl(league.statistics)

                await fs.writeFile(statisticsFile, JSON.stringify(statistics, null, 2));
            }

            const leagueCalendar = IcalGenerator.games(leagueName, games.filter(v => v.status === GameStatus.SCHEDULED || v.status === GameStatus.FINISHED), CONFIG.timezone, CONFIG.defaultGameDuration)

            await fs.writeFile(path.resolve(leagueDirectory, 'games.ics'), leagueCalendar);
        }
    }

    await fs.writeFile(path.resolve(baseOutputDir, 'weekly-games.json'), JSON.stringify(upcomingWeekGames, null, 2));

    const aggregateStatistics = async (leagueSlug: string) => {
        const seasonsDirectory = await fs.readdir(path.resolve(baseOutputDir, 'seasons'));
        const statisticsByPlayerAndSeason: { [key: string]: { [key: string]: any } } = {};
        const activeNames: string[] = [];

        for (const season of seasonsDirectory) {
            const previousSeasons: string[] = seasonsDirectory.map(v => v).sort().reverse().slice(0, CONFIG.aggregateYears);
            console.log(previousSeasons)

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

    for (const league of CONFIG.leagues) {
        await aggregateStatistics(league.slug);
    }
})()

