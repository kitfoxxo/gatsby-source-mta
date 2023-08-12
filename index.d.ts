export type Station = {
    id: string;
    name: string;
    coordinates: {
        lat: number;
        lng: number;
    }
    lines: string[]
}