import { Product } from "./product";

export interface SearchQueryResult {
    products: Product[],
    searchResultCount: number,
    currentPage: number
}
