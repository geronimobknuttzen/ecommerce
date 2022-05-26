import { Preset } from './presets';

export interface CartResponse{
    total: number;
    data: [{
        product: Preset,
        numInCart: number
    }],

}
export interface Cart{
    total: number,
    prodData:[
        {
            id: number,
            incart: number
        }
    ]
}

