import { Product } from "./product";

export interface ProductQueryResult {
    products: Product[],
    queryResultCount: number,
    currentPage: number
}
