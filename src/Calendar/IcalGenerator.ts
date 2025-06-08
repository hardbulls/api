import ical from "ical-generator"
import {getVtimezoneComponent} from "@touch4it/ical-timezones"
import {Game} from "@hardbulls/wbsc-crawler";

const changeTimezone = (date: Date, ianatz: string) => {
    const invdate = new Date(
        date.toLocaleString("en-US", {
            timeZone: ianatz,
        })
    )

    const diff = date.getTime() - invdate.getTime()

    return new Date(date.getTime() - diff)
}

export interface ICalGame extends Game {
    league?: string;
}

export const IcalGenerator = {
    games: (name: string, games: ICalGame[], timezone: string, gameDurationInMinutes: number) => {
        const calendar = ical({ name })
        calendar.timezone({
            name: timezone,
            generator: getVtimezoneComponent,
        })

        for (const game of games) {
            const end = new Date()

            end.setTime(game.date.getTime() + gameDurationInMinutes * 60 * 1000)

            const location = game.venue;
            let description = `${game.away} - ${game.home}`

            if (game.league) {
                description = `${game.league}: ${description}`
            }

            const summary = description

            calendar.createEvent({
                start: changeTimezone(game.date, "Europe/Vienna"),
                end: changeTimezone(end, "Europe/Vienna"),
                summary,
                description,
                location,
                timezone: timezone,
            })
        }

        return calendar.toString();
    }
}
