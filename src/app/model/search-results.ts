export interface SuggestionResponse{
    'name': string;
}

export interface CategorySearchResponse{
    'id' : string
    'categoryId' : string
    'name' : string
    'displayName' : string
    'parentCategoryId': string
 }

export interface ProductSearchResponse{
    'id' : string
    'productId' : string
    'name' : string
    'shortDescription' : string
    'longDescription' : string
    'additionalInfo' : string
    'brand' : string
    'skuId' : string
    'skuName' : string
    'skuColor' : string
    'skuMediaUrl' : string
    'skuSize' : string
    'inventoryStatus': string
 }

export class SearchSuggestionsResults {
    'content': Array<SuggestionResponse>;
}

export class SearchResults {
    'content': Array<ProductSearchResponse>;
}