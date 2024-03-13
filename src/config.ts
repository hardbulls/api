import exp from "node:constants";

export interface Config {
    output: string;
    aggregateYears: number;
    defaultGameDuration: number;
    leagues: Array<{
        year: number;
        name: string;
        games: string[];
        shortName: string;
        standings?: string;
        slug: string
        statistics?: {
            batting?: string;
            pitching?: string;
            fielding?: string;
        }
    }>,
    fixNames?: Array<FixNamesConfig>,
    timezone: string;
    crawlYears: number[]
}

export type FixNamesConfig = {
    name: string,
    corrections: string[]
}

export const CONFIG: Config = {
    output: '../public/api/',
    crawlYears: [2024],
    aggregateYears: 3,
    timezone: 'Europe/Vienna',
    defaultGameDuration: 120,
    fixNames: [
        {
            name: "Luca Mäser",
            corrections: ["Luca Eliah Mäser"]
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
        }
    ],
    leagues: [
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
            }
        },
        {
            year: 2024,
            name: 'Baseball 2. Bundesliga West',
            shortName: '2. BLW',
            slug: '2-blw',
            standings: 'https://www.baseballsoftball.at/de/events/baseball-2-bundesliga-west-2024/standings',
            games: ['https://www.baseballsoftball.at/de/events/baseball-2-bundesliga-west-2024/calendars?round=&team=29979&date=']
        },
        {
            year: 2024,
            name: 'Baseball Landesliga Vorarlberg',
            shortName: 'LLV',
            slug: 'llv',
            standings: 'https://www.baseballsoftball.at/de/events/baseball-landesliga-vorarlberg-2024/standings',
            games: ['https://www.baseballsoftball.at/de/events/baseball-landesliga-vorarlberg-2024/calendars?round=&team=30418&date=']
        },
        {
            year: 2024,
            name: 'Baseball Ponyliga Vorarlberg U14',
            shortName: 'U14',
            slug: 'u14',
            standings: 'https://www.baseballsoftball.at/de/events/baseball-ponyliga-vorarlberg-u14-2024/standings',
            games: ['https://www.baseballsoftball.at/de/events/baseball-ponyliga-vorarlberg-u14-2024/calendars?round=&team=30437&date=']
        },
        {
            year: 2024,
            name: 'Baseball Schülerliga Vorarlberg U12',
            shortName: 'U12',
            slug: 'u12',
            standings: 'https://www.baseballsoftball.at/de/events/baseball-schuelerliga-vorarlberg-u12-2024/standings',
            games: [
                'https://www.baseballsoftball.at/de/events/baseball-schuelerliga-vorarlberg-u12-2024/calendars?round=&team=30449&date=',
            ]
        },
        {
            year: 2024,
            name: 'Baseball Schülerliga Vorarlberg U10',
            shortName: 'U10',
            slug: 'u10',
            standings: 'https://www.baseballsoftball.at/de/events/baseball-schuelerliga-vorarlberg-u10-2024/standings',
            games: [
                'https://www.baseballsoftball.at/de/events/baseball-schuelerliga-vorarlberg-u10-2024/calendars?round=&team=30458&date=',
            ]
        },
        {
            year: 2024,
            name: 'T-Ball Vorarlberg U8',
            shortName: 'U8',
            slug: 'u8',
            standings: 'https://www.baseballsoftball.at/de/events/beeball-vorarlberg-u8-2023/standings',
            games: [
                'https://www.baseballsoftball.at/de/events/baseball-t-ball-vorarlberg-u8-2024/calendars?round=&team=30461&date=',
            ]
        },
        {
            year: 2024,
            name: 'Vorarlberger Slowpitch League',
            shortName: 'VSL',
            slug: 'vsl',
            standings: 'https://www.baseballsoftball.at/de/events/vorarlberger-slowpitch-league-2024/standings',
            games: [
                'https://www.baseballsoftball.at/de/events/vorarlberger-slowpitch-league-2024/calendars?round=&team=30484&date='
            ]
        }
    ]
}

const PAST_LEAGUE_CONFIGS = [
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
        }
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
        }
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
        }
    },
    {
        year: 2023,
        name: 'Baseball Nationalliga/Bundesliga Playoffs',
        shortName: 'NL/BBL Playoffs',
        slug: 'nl-bbl-playoffs',
        standings: 'https://www.baseballsoftball.at/de/events/baseball-nationalliga-baseball-bundesliga-playoffs-2023/standings',
        games: ['https://www.baseballsoftball.at/de/events/baseball-nationalliga-baseball-bundesliga-playoffs-2023/calendars?round=&team=27722&date=']
    },
    {
        year: 2022,
        name: 'Baseball Bundesliga',
        shortName: 'BBL',
        slug: 'bbl',
        standings: 'https://www.baseballsoftball.at/de/events/2022-baseball-bundesliga/standings',
        games: ['https://www.baseballsoftball.at/de/events/2022-baseball-bundesliga/calendars?round=&team=20357&date=']
    },
    {
        year: 2021,
        name: 'Baseball Bundesliga',
        shortName: 'BBL',
        slug: 'bbl',
        standings: 'https://www.baseballsoftball.at/de/events/2021-baseball-bundesliga/standings',
        games: ['https://www.baseballsoftball.at/de/events/2021-baseball-bundesliga/calendars?round=&team=2572&date=']
    },
    {
        year: 2023,
        name: 'Baseball 2. Bundesliga West',
        shortName: '2. BLW',
        slug: '2-blw',
        standings: 'https://www.baseballsoftball.at/de/events/baseball-2-bundesliga-west-2023/standings',
        games: ['https://www.baseballsoftball.at/de/events/baseball-2-bundesliga-west-2023/calendars?round=&team=24618&date=']
    },
    {
        year: 2023,
        name: 'Landesliga Vorarlberg',
        shortName: 'LLV',
        slug: 'llv',
        standings: 'https://www.baseballsoftball.at/de/events/baseball-landesliga-vorarlberg-2023/standings',
        games: ['https://www.baseballsoftball.at/de/events/baseball-landesliga-vorarlberg-2023/calendars?round=&team=24636&date=']
    },
    {
        year: 2023,
        name: 'Baseball Jugendliga Vorarlberg U16',
        shortName: 'U16',
        slug: 'u16',
        standings: 'https://www.baseballsoftball.at/de/events/baseball-jugendliga-vorarlberg-u16-2023/standings',
        games: ['https://www.baseballsoftball.at/de/events/baseball-jugendliga-vorarlberg-u16-2023/calendars?round=&team=24820']
    },
    {
        year: 2023,
        name: 'Baseball Ponyliga Vorarlberg U14',
        shortName: 'U14',
        slug: 'u14',
        standings: 'https://www.baseballsoftball.at/de/events/baseball-ponyliga-vorarlberg-u14-2023/standings',
        games: ['https://www.baseballsoftball.at/de/events/baseball-ponyliga-vorarlberg-u14-2023/calendars?round=&team=24821']
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
        ]
    },
    {
        year: 2023,
        name: 'Baseball Schülerliga Vorarlberg U10',
        shortName: 'U10',
        slug: 'u10',
        standings: 'https://www.baseballsoftball.at/de/events/baseball-schuelerliga-vorarlberg-u10-2023/standings',
        games: [
            'https://www.baseballsoftball.at/de/events/baseball-schuelerliga-vorarlberg-u10-2023/calendars?round=&team=24824',
        ]
    },
    {
        year: 2023,
        name: 'Beeball Vorarlberg U8',
        shortName: 'U8',
        slug: 'u8',
        standings: 'https://www.baseballsoftball.at/de/events/beeball-vorarlberg-u8-2023/standings',
        games: [
            'https://www.baseballsoftball.at/de/events/beeball-vorarlberg-u8-2023/calendars?round=&team=26067&date=',
        ]
    },
    {
        year: 2023,
        name: 'Vorarlberger Slowpitch League',
        shortName: 'VSL',
        slug: 'vsl',
        standings: 'https://www.baseballsoftball.at/de/events/vorarlberger-slowpitch-league-2023/standings',
        games: [
            'https://www.baseballsoftball.at/de/events/vorarlberger-slowpitch-league-2023/calendars?round=&team=26071&date='
        ]
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
        ]
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
        ]
    }
]
