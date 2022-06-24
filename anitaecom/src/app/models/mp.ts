export interface MPClient{
    items: [
        {
            title: string,
            unit_price: number,
            quantity: number,
            picture_url: string,

        }
    ],
    auto_return: string,
}

export interface MPServer{
    items: [{
        quantity: number,
        category_id: any,
        picture_url: string,
        description: string,
        id: number,
        title: string,
        unit_price: number
    }],
    email: string,
    name: string
}