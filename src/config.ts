import {Game} from "@hardbulls/wbsc-crawler";

export interface LeagueConfig {
    year: number;
    name: string;
    games?: string[];
    shortName: string;
    standings?: string;
    slug: string
    logo?: string;
    filter?: (game: Game) => boolean,
    statistics?: {
        batting?: string;
        pitching?: string;
        fielding?: string;
    }
}

export interface Config {
    output: string;
    aggregateYears: number;
    defaultGameDuration: number;
    combinedCalendarName: string;
    eventsUrl?: string;
    leagues: Array<LeagueConfig>,
    fixNames?: Array<FixNamesConfig>,
    timezone: string;
    crawlYears: number[]
}

export type FixNamesConfig = {
    name: string,
    corrections: string[]
}

export const CONFIG: Config = {
    output: '../public/',
    eventsUrl: 'https://www.hardbulls.com/events/data',
    crawlYears: [2025],
    combinedCalendarName: 'Bulls - Alle Mannschaften',
    aggregateYears: 3,
    timezone: 'Europe/Vienna',
    defaultGameDuration: 120,
    fixNames: [
        {
            name: "Kelvis Palma",
            corrections: ["Kelvis Alexander Palma fernandez"]
        },
        {
            name: "Luca Mäser",
            corrections: ["Luca Eliah Mäser"]
        },
        {
            name: "Nick Jäger",
            corrections: ["Nick Jaeger"]
        },
        {
            name: "Clayton Carson",
            corrections: ["Clayton Reese Carson"]
        },
        {
            name: "Erwin Frias",
            corrections: ["Erwin Eduardo Vals Frias"]
        },
        {
            name: "Marvin Glassen",
            corrections: ["Marvin-Sebastian Glassen"]
        },
        {
            name: "Jonas Zimmermann",
            corrections: ["Jonas Michael Zimmermann"]
        },
        {
            name: "Richard Kranabetter",
            corrections: ["Richard Thomas Kranabetter"]
        },
        {
            name: "Zeke Holt",
            corrections: ["Zachary Noah Tate Holt"],
        },
        {
            name: "Jed Downham",
            corrections: ["Jacob Eric Downham"]
        },
        {
            name: "Caleb Topper",
            corrections: ["Caleb James Topper"]
        }
    ],
    leagues: [
        {
            year: 2025,
            name: 'Baseball Bundesliga',
            shortName: 'BBL',
            slug: 'bbl',
            standings: 'https://www.baseballsoftball.at/de/events/baseball-bundesliga-2025/standings',
            games: [
                'https://www.baseballsoftball.at/de/events/baseball-bundesliga-2025/schedule-and-results'
            ],
            statistics: {
                fielding: "https://www.baseballsoftball.at/api/v1/stats/events/baseball-bundesliga-2025/index?section=players&stats-section=fielding&team=34514&round=&split=&split=&language=de",
                batting: "https://www.baseballsoftball.at/api/v1/stats/events/baseball-bundesliga-2025/index?section=players&stats-section=batting&team=34514&round=&split=&split=&language=de",
                pitching: "https://www.baseballsoftball.at/api/v1/stats/events/baseball-bundesliga-2025/index?section=players&stats-section=pitching&team=34514&round=&split=&split=&language=de",
            },
            logo: "bbl.svg",
            filter: (game: Game) => game.home.toLowerCase().includes('hard bulls') || game.away.toLowerCase().includes('hard bulls')
        },
        {
            year: 2025,
            name: 'Baseball 2. Bundesliga West',
            shortName: '2. BLW',
            slug: '2-blw',
            standings: 'https://www.baseballsoftball.at/de/events/baseball-2-bundesliga-west-2025/standings',
            games: ['https://www.baseballsoftball.at/de/events/baseball-2-bundesliga-west-2025/calendars?round=&team=34977&date='],
            logo: "2-blw.svg"
        },
        {
            year: 2025,
            name: "2. Softball Bundesliga",
            shortName: "2. SBL",
            slug: "2-sbl",
            standings: "https://www.baseballsoftball.at/de/events/softball-2-bundesliga-2025/standings",
            games: [
                "https://www.baseballsoftball.at/de/events/softball-2-bundesliga-2025/calendars?round=&team=34708&date="
            ],
            logo: "2-sbl.svg"
        },
        {
            year: 2025,
            name: 'Baseball Landesliga Vorarlberg',
            shortName: 'LLV',
            slug: 'llv',
            standings: 'https://www.baseballsoftball.at/de/events/baseball-landesliga-vorarlberg-2025/standings',
            games: [
                'https://www.baseballsoftball.at/de/events/baseball-landesliga-vorarlberg-2025/calendars?committee=&round=&team=35524&date=',
                'https://www.baseballsoftball.at/de/events/baseball-landesliga-vorarlberg-2025/calendars?committee=&round=&team=35525&date='
            ],
            logo: "llv.svg"
        },
        {
            year: 2025,
            name: 'Vorarlberger Slowpitch League',
            shortName: 'VSL',
            slug: 'vsl',
            standings: 'https://www.baseballsoftball.at/de/events/vorarlberger-slowpitch-league-2025/standings',
            games: [
                'https://www.baseballsoftball.at/de/events/vorarlberger-slowpitch-league-2025/schedule-and-results'
            ],
            logo: "vsl.svg",
            filter: (game: Game) => game.home.toLowerCase().includes('hard bulls barons') || game.away.toLowerCase().includes('hard bulls barons')
        },
        {
            year: 2025,
            name: 'Baseball Jugendliga West U16',
            shortName: 'U16',
            slug: 'u16',
            standings: 'https://www.baseballsoftball.at/de/events/baseball-jugendliga-west-u16-2025/standings',
            games: ['https://www.baseballsoftball.at/de/events/baseball-jugendliga-west-u16-2025/calendars?round=&team=35529&date='],
            logo: "u16_west.svg"
        },
        {
            year: 2025,
            name: 'Baseball Ponyliga West U14',
            shortName: 'U14',
            slug: 'u14',
            standings: 'https://www.baseballsoftball.at/de/events/baseball-ponyliga-west-u14-2025/standings',
            games: ['https://www.baseballsoftball.at/de/events/baseball-ponyliga-west-u14-2025/schedule-and-results'],
            logo: "u14_west.svg",
            filter: (game: Game) => game.home.toLowerCase().includes('hard bulls') || game.away.toLowerCase().includes('hard bulls')
        },
        {
            year: 2025,
            name: 'Baseball Schülerliga Vorarlberg U12',
            shortName: 'U12',
            slug: 'u12',
            standings: 'https://www.baseballsoftball.at/de/events/baseball-schuelerliga-vorarlberg-u12-2025/standings',
            games: [
                'https://www.baseballsoftball.at/de/events/baseball-schuelerliga-vorarlberg-u12-2025/calendars?round=&team=35556&date=',
            ],
            logo: "u12.svg"
        },
        {
            year: 2025,
            name: 'Baseball Schülerliga Vorarlberg U10',
            shortName: 'U10',
            slug: 'u10',
            standings: 'https://www.baseballsoftball.at/de/events/baseball-schuelerliga-vorarlberg-u10-2025/standings',
            games: [
                'https://www.baseballsoftball.at/de/events/baseball-schuelerliga-vorarlberg-u10-2025/calendars?round=&team=35559&date=',
            ],
            logo: "u10.svg"
        },
        {
            year: 2025,
            name: 'T-Ball Vorarlberg U8',
            shortName: 'U8',
            slug: 'u8',
            games: [
                'https://www.baseballsoftball.at/de/events/baseball-t-ball-vorarlberg-u8-2025/calendars?round=&team=35567&date=',
            ],
            logo: "u8_t-ball.svg"
        },
        {
            year: 2025,
            name: "Bulls Preseason",
            shortName: "Preseason",
            slug: "preseason",
        },
        // {
        //     year: 2025,
        //     name: "Diamond Queens (U12 Preseason)",
        //     shortName: "U12 Preseason",
        //     slug: "u12-preseason",
        // },
        // {
        //     year: 2025,
        //     name: "Diamond Queens (Außer Wertung)",
        //     shortName: "Diamond Queens",
        //     slug: "dqc-nc",
        // },
        // {
        //     year: 2025,
        //     name: "Diamond Queens Cup",
        //     shortName: "Diamond Queens",
        //     slug: "dqc-cup",
        // },
        {
            year: 2024,
            name: 'Baseball Bundesliga',
            shortName: 'BBL',
            slug: 'bbl',
            standings: 'https://www.baseballsoftball.at/de/events/baseball-bundesliga-2024/standings',
            games: ['https://www.baseballsoftball.at/de/events/baseball-bundesliga-2024/calendars?round=&team=29142&date='],
            statistics: {
                batting: 'https://www.baseballsoftball.at/de/events/baseball-bundesliga-2024/stats/general/team/29142/all/batting',
                pitching: 'https://www.baseballsoftball.at/de/events/baseball-bundesliga-2024/stats/general/team/29142/all/pitching',
                fielding: 'https://www.baseballsoftball.at/de/events/baseball-bundesliga-2024/stats/general/team/29142/all/fielding'
            },
            logo: "bbl.svg"
        },
        {
            year: 2024,
            name: 'Baseball 2. Bundesliga West',
            shortName: '2. BLW',
            slug: '2-blw',
            standings: 'https://www.baseballsoftball.at/de/events/baseball-2-bundesliga-west-2024/standings',
            games: ['https://www.baseballsoftball.at/de/events/baseball-2-bundesliga-west-2024/calendars?round=&team=29979&date='],
            logo: "2-blw.svg"
        },
        {
            year: 2024,
            name: 'Baseball Landesliga Vorarlberg',
            shortName: 'LLV',
            slug: 'llv',
            standings: 'https://www.baseballsoftball.at/de/events/baseball-landesliga-vorarlberg-2024/standings',
            games: ['https://www.baseballsoftball.at/de/events/baseball-landesliga-vorarlberg-2024/calendars?round=&team=30418&date='],
            logo: "llv.svg"
        },
        {
            year: 2024,
            name: 'Baseball Jugendliga Vorarlberg U16',
            shortName: 'U16',
            slug: 'u16',
            standings: 'https://www.baseballsoftball.at/de/events/baseball-jugendliga-vorarlberg-u16-2024/standings',
            games: ['https://www.baseballsoftball.at/de/events/baseball-jugendliga-vorarlberg-u16-2024/calendars?round=&team=30427&date='],
            logo: "u16.svg"
        },
        {
            year: 2024,
            name: 'Baseball Ponyliga Vorarlberg U14',
            shortName: 'U14',
            slug: 'u14',
            standings: 'https://www.baseballsoftball.at/de/events/baseball-ponyliga-vorarlberg-u14-2024/standings',
            games: ['https://www.baseballsoftball.at/de/events/baseball-ponyliga-vorarlberg-u14-2024/calendars?round=&team=30437&date='],
            logo: "u14.svg"
        },
        {
            year: 2024,
            name: 'Baseball Schülerliga Vorarlberg U12',
            shortName: 'U12',
            slug: 'u12',
            standings: 'https://www.baseballsoftball.at/de/events/baseball-schuelerliga-vorarlberg-u12-2024/standings',
            games: [
                'https://www.baseballsoftball.at/de/events/baseball-schuelerliga-vorarlberg-u12-2024/calendars?round=&team=30449&date=',
            ],
            logo: "u12.svg"
        },
        {
            year: 2024,
            name: 'Baseball Schülerliga Vorarlberg U10',
            shortName: 'U10',
            slug: 'u10',
            standings: 'https://www.baseballsoftball.at/de/events/baseball-schuelerliga-vorarlberg-u10-2024/standings',
            games: [
                'https://www.baseballsoftball.at/de/events/baseball-schuelerliga-vorarlberg-u10-2024/calendars?round=&team=30458&date=',
            ],
            logo: "u10.svg"
        },
        {
            year: 2024,
            name: 'T-Ball Vorarlberg U8',
            shortName: 'U8',
            slug: 'u8',
            games: [
                'https://www.baseballsoftball.at/de/events/baseball-t-ball-vorarlberg-u8-2024/calendars?round=&team=30461&date=',
            ],
            logo: "u8_t-ball.svg"
        },
        {
            year: 2024,
            name: 'Vorarlberger Slowpitch League',
            shortName: 'VSL',
            slug: 'vsl',
            standings: 'https://www.baseballsoftball.at/de/events/vorarlberger-slowpitch-league-2024/standings',
            games: [
                'https://www.baseballsoftball.at/de/events/vorarlberger-slowpitch-league-2024/calendars?round=&team=30484&date='
            ],
            logo: "vsl.svg"
        },
        {
            year: 2024,
            name: "2. Softball Bundesliga",
            shortName: "2. SBL",
            slug: "2-sbl",
            standings: "https://www.baseballsoftball.at/de/events/softball-2-bundesliga-2024/standings",
            games: [
                "https://www.baseballsoftball.at/de/events/softball-2-bundesliga-2024/calendars?round=&team=29317&date="
            ],
            logo: "2-sbl.svg"
        },
        {
            year: 2024,
            name: "Bulls Preseason",
            shortName: "Preseason",
            slug: "preseason",
        },
        {
            year: 2024,
            name: "Bulls Postseason",
            shortName: "Postseason",
            slug: "postseason",
        },
        {
            year: 2023,
            name: 'Baseball Bundesliga',
            shortName: 'BBL',
            slug: 'bbl',
            standings: 'https://www.baseballsoftball.at/de/events/baseball-bundesliga-2023/standings',
            games: ['https://www.baseballsoftball.at/de/events/baseball-bundesliga-2023/calendars?round=&team=24492&date='],
            statistics: {
                batting: 'https://www.baseballsoftball.at/de/events/baseball-bundesliga-2023/stats/general/team/24492/all/batting',
                pitching: 'https://www.baseballsoftball.at/de/events/baseball-bundesliga-2023/stats/general/team/24492/all/pitching',
                fielding: 'https://www.baseballsoftball.at/de/events/baseball-bundesliga-2023/stats/general/team/24492/all/fielding'
            },
            logo: "bbl.svg"
        },
        {
            year: 2022,
            name: 'Baseball Bundesliga',
            shortName: 'BBL',
            slug: 'bbl',
            standings: 'https://www.baseballsoftball.at/de/events/2022-baseball-bundesliga/standings',
            games: ['https://www.baseballsoftball.at/de/events/2022-baseball-bundesliga/calendars?round=&team=20357&date='],
            statistics: {
                batting: 'https://www.baseballsoftball.at/de/events/2022-baseball-bundesliga/stats/general/team/20357/all/batting',
                pitching: 'https://www.baseballsoftball.at/de/events/2022-baseball-bundesliga/stats/general/team/20357/all/pitching',
                fielding: 'https://www.baseballsoftball.at/de/events/2022-baseball-bundesliga/stats/general/team/20357/all/fielding'
            },
            logo: "bbl.svg"
        },
        {
            year: 2021,
            name: 'Baseball Bundesliga',
            shortName: 'BBL',
            slug: 'bbl',
            standings: 'https://www.baseballsoftball.at/de/events/2021-baseball-bundesliga/standings',
            games: ['https://www.baseballsoftball.at/de/events/2021-baseball-bundesliga/calendars?round=&team=2572&date='],
            statistics: {
                batting: 'https://www.baseballsoftball.at/de/events/2021-baseball-bundesliga/stats/general/team/2572/all/batting',
                pitching: 'https://www.baseballsoftball.at/de/events/2021-baseball-bundesliga/stats/general/team/2572/all/pitching',
                fielding: 'https://www.baseballsoftball.at/de/events/2021-baseball-bundesliga/stats/general/team/2572/all/fielding'
            },
            logo: "bbl.svg"
        },
        {
            year: 2023,
            name: 'Baseball Nationalliga/Bundesliga Playoffs',
            shortName: 'NL/BBL Playoffs',
            slug: 'nl-bbl-playoffs',
            standings: 'https://www.baseballsoftball.at/de/events/baseball-nationalliga-baseball-bundesliga-playoffs-2023/standings',
            games: ['https://www.baseballsoftball.at/de/events/baseball-nationalliga-baseball-bundesliga-playoffs-2023/calendars?round=&team=27722&date='],
            logo: "nl-bbl-playoffs.svg"
        },
        {
            year: 2023,
            name: 'Baseball 2. Bundesliga West',
            shortName: '2. BLW',
            slug: '2-blw',
            standings: 'https://www.baseballsoftball.at/de/events/baseball-2-bundesliga-west-2023/standings',
            games: ['https://www.baseballsoftball.at/de/events/baseball-2-bundesliga-west-2023/calendars?round=&team=24618&date='],
            logo: "2-blw.svg"
        },
        {
            year: 2023,
            name: 'Baseball Landesliga Vorarlberg',
            shortName: 'LLV',
            slug: 'llv',
            standings: 'https://www.baseballsoftball.at/de/events/baseball-landesliga-vorarlberg-2023/standings',
            games: ['https://www.baseballsoftball.at/de/events/baseball-landesliga-vorarlberg-2023/calendars?round=&team=24636&date='],
            logo: "llv.svg"
        },
        {
            year: 2023,
            name: 'Baseball Jugendliga Vorarlberg U16',
            shortName: 'U16',
            slug: 'u16',
            standings: 'https://www.baseballsoftball.at/de/events/baseball-jugendliga-vorarlberg-u16-2023/standings',
            games: ['https://www.baseballsoftball.at/de/events/baseball-jugendliga-vorarlberg-u16-2023/calendars?round=&team=24820'],
            logo: "u16.svg"
        },
        {
            year: 2023,
            name: 'Baseball Ponyliga Vorarlberg U14',
            shortName: 'U14',
            slug: 'u14',
            standings: 'https://www.baseballsoftball.at/de/events/baseball-ponyliga-vorarlberg-u14-2023/standings',
            games: [
                'https://www.baseballsoftball.at/de/events/baseball-ponyliga-vorarlberg-u14-2023/calendars?round=&team=24821'
            ],
            logo: "u14.svg"
        },
        {
            year: 2023,
            name: 'Baseball Schülerliga Vorarlberg U13',
            shortName: 'U13',
            slug: 'u13',
            standings: 'https://www.baseballsoftball.at/de/events/baseball-schuelerliga-vorarlberg-u13-2023/standings',
            games: [
                'https://www.baseballsoftball.at/de/events/baseball-schuelerliga-vorarlberg-u13-2023/calendars?round=&team=24823&date=',
                'https://www.baseballsoftball.at/de/events/baseball-schuelerliga-vorarlberg-u13-2023/calendars?round=&team=24822&date='
            ],
            logo: "u13.svg"
        },
        {
            year: 2023,
            name: 'Baseball Schülerliga Vorarlberg U10',
            shortName: 'U10',
            slug: 'u10',
            standings: 'https://www.baseballsoftball.at/de/events/baseball-schuelerliga-vorarlberg-u10-2023/standings',
            games: [
                'https://www.baseballsoftball.at/de/events/baseball-schuelerliga-vorarlberg-u10-2023/calendars?round=&team=24824',
            ],
            logo: "u10.svg"
        },
        {
            year: 2023,
            name: 'Beeball Vorarlberg U8',
            shortName: 'U8',
            slug: 'u8',
            standings: 'https://www.baseballsoftball.at/de/events/beeball-vorarlberg-u8-2023/standings',
            games: [
                'https://www.baseballsoftball.at/de/events/beeball-vorarlberg-u8-2023/calendars?round=&team=26067&date=',
            ],
            logo: "u8_beeball.svg"
        },
        {
            year: 2023,
            name: 'Vorarlberger Slowpitch League',
            shortName: 'VSL',
            slug: 'vsl',
            standings: 'https://www.baseballsoftball.at/de/events/vorarlberger-slowpitch-league-2023/standings',
            games: [
                'https://www.baseballsoftball.at/de/events/vorarlberger-slowpitch-league-2023/calendars?round=&team=26071&date='
            ],
            logo: "vsl.svg"
        },
        {
            year: 2023,
            name: 'Baseball Österreichische Meisterschaften Pony U14 2023',
            shortName: 'U14 ÖM',
            slug: 'u14-oem',
            standings: 'https://www.baseballsoftball.at/de/events/baseball-oesterreichische-meisterschaften-pony-u14-2023/standings',
            games: [
                'https://www.baseballsoftball.at/de/events/baseball-oesterreichische-meisterschaften-pony-u14-2023/calendars?round=3190&team=Filtern+nach+Team&date=',
                'https://www.baseballsoftball.at/de/events/baseball-oesterreichische-meisterschaften-pony-u14-2023/calendars?round=2690&group=Filtern+nach+Gruppe&team=Filtern+nach+Team&date='
            ],
            logo: "oem_u14.svg"
        },
        {
            year: 2023,
            name: 'Baseball Österreichische Meisterschaften Jugend U16 2023',
            shortName: 'U16 ÖM',
            slug: 'u16-oem',
            standings: 'https://www.baseballsoftball.at/de/events/baseball-oesterreichische-meisterschaften-jugend-u16-2023/standings',
            games: [
                'https://www.baseballsoftball.at/de/events/baseball-oesterreichische-meisterschaften-jugend-u16-2023/calendars?round=3192&team=Filtern+nach+Team&date=',
                'https://www.baseballsoftball.at/de/events/baseball-oesterreichische-meisterschaften-jugend-u16-2023/calendars?round=2585&group=Filtern+nach+Gruppe&team=Filtern+nach+Team&date='
            ],
            logo: "oem_u16.svg"
        }
    ]
}
