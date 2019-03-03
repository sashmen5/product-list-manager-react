import {Product, ProductType} from "../models";

export function normalizeAllProducts(typedProducts): Product[] {
    let result: Product[] = [];
    for (const item of typedProducts) {
        const methodName: string  = `normalize${ProductType[item.type]}`;
        const products = normalizer[methodName](item);
        result = result.concat(products);
    }
    return result;
}

const normalizer = {
    normalizeTypeOne: (typedProduct) => {
        return [{...typedProduct.fedex}];
    },
    normalizeTypeTwo: (typedProduct) => {
        return typedProduct.ups;
    },
    normalizeTypeThree: (typedProduct) => {
        delete typedProduct.type;
        delete typedProduct.deliveryComp;

        return [typedProduct];
    }
};
