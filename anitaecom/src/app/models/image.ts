export interface Images {
    id: number;
    title: string;
}

export class Image implements Images {
    id: number;
    title: string;
    constructor(imageData: any) {
        this.id = imageData.id;
        this.title = imageData.title;
    }
}