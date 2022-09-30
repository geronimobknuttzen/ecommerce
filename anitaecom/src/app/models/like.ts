import { Preset } from './presets';

export interface LikeResponse{
    data: [{
        product: Preset,
        numInLike: number
    }],

}
export interface Like{
    likeData:[
        {
            id: number,
            inlike: number
        }
    ]
}