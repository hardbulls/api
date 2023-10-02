import {GameCrawler} from "@hardbulls/wbsc-crawler";
import {CONFIG} from "./config";
import * as fs from 'fs/promises'
import * as path from "path";


const fetchGames = async () => {
    for (const league of CONFIG.leagues) {
        const games = await GameCrawler.crawl(league.games)

        const outputDirectory =   path.resolve(path.join(__dirname, CONFIG.output, 'games', league.year.toString()));
        const outputFile = path.resolve(outputDirectory, `${league.slug}.json`,);

        await fs.mkdir(outputDirectory, { recursive: true })
        await fs.writeFile(outputFile, JSON.stringify(games));
    }
}

(async () => {
    await fetchGames()
})()


