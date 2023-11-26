import {Game, GameCrawler, GameStatus, StandingsCrawler} from "@hardbulls/wbsc-crawler";
import {CONFIG} from "./config";
import * as fs from 'fs/promises'
import * as path from "path";
import {IcalGenerator} from "./Calendar/IcalGenerator";

const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 0, 0, 0);

(async () => {
    const leagues = CONFIG.leagues.filter(v => CONFIG.crawlYears.includes(v.year))
    const nextWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 0, 0, 0);
    const upcomingWeekGames: Game[] = [];
    const baseOutputDir = path.join(__dirname, CONFIG.output)

    for (const league of leagues) {
        const leagueName = `${league.name} ${league.year}`
        const games = (await Promise.all(league.games.map(async gameUrl => await GameCrawler.crawl(gameUrl, CONFIG.timezone)))).flat()
        const standings = await StandingsCrawler.crawl(league.standings)

        const leagueDirectory = path.resolve(path.join(baseOutputDir, 'seasons', league.year.toString(), league.slug));
        const gamesFile = path.resolve(leagueDirectory, `games.json`,);
        const standingsFile = path.resolve(leagueDirectory, `standings.json`,);

        await fs.mkdir(leagueDirectory, {recursive: true})
        await fs.writeFile(gamesFile, JSON.stringify(games, null, 2));
        await fs.writeFile(standingsFile, JSON.stringify(standings, null, 2));

        for (const game of games) {
            if (game.date > today && game.date < nextWeek && game.status === GameStatus.SCHEDULED) {
                upcomingWeekGames.push(game);
            }
        }

        const leagueCalendar = IcalGenerator.games(leagueName, games.filter(v => v.status === GameStatus.SCHEDULED || v.status === GameStatus.FINISHED), CONFIG.timezone, CONFIG.defaultGameDuration)

        await fs.writeFile(path.resolve(leagueDirectory, 'games.ics'), leagueCalendar);
    }

    await fs.writeFile(path.resolve(baseOutputDir, 'weekly-games.json'), JSON.stringify(upcomingWeekGames, null, 2));
})()


