import {GameStatus} from "@hardbulls/wbsc-crawler";

export const OVERRIDES: { [key: string]: { status?: GameStatus, venue?: string, date?: Date } } = {
    "e3b3d2919520a2fea14a14a405020831": {
        "venue": "Ballpark am See, Hard"
    },
    "dbeb98cd054e4877a76e84f412c2d2f7": {
        "date": new Date("2024-07-14T12:00:00.000Z"),
        "status": GameStatus.SCHEDULED,
        "venue": "Sportanlage Rohrbach, Dornbirn",
    },
    "b736049f07bb88460b9c0b9264a10d82": {
      "status": GameStatus.CANCELED
    },
    "063b64da31d723f58d16ae91167a37d0": {
      "status": GameStatus.CANCELED
    },
    "e5d1bc874d8ab8f77b954bc6f155df59": {
       "status": GameStatus.CANCELED
    },
    "873ed2ffdefb5ca55214ef1788fa19fa": {
      "status": GameStatus.CANCELED
    },
    "ac02030062e90628ad044054599840a7": {
       "status": GameStatus.CANCELED
    },
    "3db71ddd0a5a71092ffcb4625b8f7f7c": {
        "venue": "Sportanlage Rohrbach, Dornbirn"
    }
}
