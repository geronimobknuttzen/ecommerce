export interface ICarrouselItem {
    id: number,
    title: string,
    url: string,
    marginLeft: number;
    description: string;
    section?: string,
    image: string,
    order?: string,
}