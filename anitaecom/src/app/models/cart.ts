import { Preset } from './presets';

export interface CartResponse{
    totalDolar: number;
    totalPesos: number;
    data: [{
        product: Preset,
        numInCart: number
    }],

}
export interface Cart{
    totalDolar: number;
    totalPesos: number;
    prodData:[
        {
            id: number,
            incart: number
        }
    ]
}

