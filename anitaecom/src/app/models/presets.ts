export interface Presets {
    id: number;
    title: string;
    quantity: number;
    image: string;
    description: string;
    price: number;
    precioPesos:number;
    short_desc: string
}

export class Preset implements Presets {
    id: number;
    title: string;
    quantity: number;
    image: string;
    description: string;
    price: number;
    precioPesos:number;
    short_desc: string
    constructor(presetData: any) {
        this.id = presetData.id;
        this.title = presetData.title;
        this.quantity =  presetData.quantity;
        this.image = presetData.image
        this.description = presetData.description
        this.price = presetData.price
        this.precioPesos = presetData.precioPesos
    }
}