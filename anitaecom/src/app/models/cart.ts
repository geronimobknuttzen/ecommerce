import { Preset } from './presets';

export interface CartModelServer{
    totalDolar: number;
    totalPesos: number;
    data: [{
        product: Preset,
        numInCart: number
    }],

}
export interface CartModelPublic{
    totalDolar: number;
    totalPesos: number;
    prodData:[
        {
            id: number,
            incart: number
        }
    ]
}

