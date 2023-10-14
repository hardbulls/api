export interface Config {
    output: string;
    defaultGameDuration: number;
    leagues: Array<{
        year: number;
        name: string;
        games: string[];
        shortName: string;
        standings: string;
        slug: string
    }>,
    timezone: string;
    crawlYears: number[]
}

export const CONFIG: Config = {
    output: '../public/api/',
    crawlYears: [2023],
    timezone: 'Europe/Vienna',
    defaultGameDuration: 120,
    leagues: [
        {
            year: 2023,
            name: 'Baseball Nationalliga/Bundesliga Playoffs',
            shortName: 'NL/BBL Playoffs',
            slug: 'nl-bbl-playoffs',
            standings: 'https://www.baseballsoftball.at/de/events/baseball-nationalliga-baseball-bundesliga-playoffs-2023/standings',
            games: ['https://www.baseballsoftball.at/de/events/baseball-nationalliga-baseball-bundesliga-playoffs-2023/calendars?round=&team=27722&date=']
        },
        {
            year: 2023,
            name: 'Baseball Bundesliga',
            shortName: 'BBL',
            slug: 'bbl',
            standings: 'https://www.baseballsoftball.at/de/events/baseball-bundesliga-2023/standings',
            games: ['https://www.baseballsoftball.at/de/events/baseball-bundesliga-2023/calendars?round=&team=24492&date=']
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
}
