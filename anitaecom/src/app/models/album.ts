export interface Albums {
    id: number;
    title: string;
}

export class Album implements Albums {
    id: number;
    title: string;
    constructor(albumData: any) {
        this.id = albumData.id;
        this.title = albumData.title;
    }
}