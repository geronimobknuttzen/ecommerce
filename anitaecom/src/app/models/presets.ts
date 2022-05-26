export interface Presets {
    id: number;
    name: string;
}

export class Preset implements Presets {
    id: number;
    name: string;
    quantity: number;
    image: string;
    description: string;
    price: number;
    precioPesos:number;
    constructor(presetData: any) {
        this.id = presetData.id;
        this.name = presetData.name;
        this.quantity =  presetData.quantity;
    }
}