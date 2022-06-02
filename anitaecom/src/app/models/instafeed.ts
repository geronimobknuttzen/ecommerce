export interface Insta{
    data: [
           id: number,
           username: string,
           timestamp: any,
           caption: string,
           media_url: string,
           media_type: string,
           permalink: string
        ]
}

export class Instafeed implements Insta {
    data: [
        id: number,
        username: string,
        timestamp: any,
        caption: string,
        media_url: string,
        media_type: string,
        permalink: string
     ]
}