export interface Presets {
    id: number;
    title: string;
}

export class Preset implements Presets {
    id: number;
    title: string;
    constructor(presetData: any) {
        this.id = presetData.id;
        this.title = presetData.title;
    }
}