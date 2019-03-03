export interface Product {
    creationDate: number;
    "description"?: string;
    "id": number,
    "name": string,
    "price": number,
    "thumbnailUrl": string;
    "url": string;
}

export enum ProductType {
    TypeOne = 1,
    TypeTwo = 2,
    TypeThree = 3,
}
