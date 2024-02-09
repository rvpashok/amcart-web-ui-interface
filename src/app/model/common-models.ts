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
    'tags': string[]
    'inventoryStatus': string
    'price': number
    'originalPrice': number
 }

export class SearchSuggestionsResults {
    'content': Array<SuggestionResponse>;
}

export class SearchResults {
    'content': Array<ProductSearchResponse>;
}

export class Product {
    'id': string;
    'productId': string;
    'name': string;
    'shortDescription': string;
    'longDescription': string;
    'price': number;
    'inventoryStatus': string;

    constructor(id: string, productId: string, name: string, 
        shortDescription: string, longDescription: string,
        price: number, inventoryStatus: string){
        this.id=id;
        this.name =name;
        this.shortDescription=shortDescription;
        this.longDescription=longDescription;
        this.productId=productId;
        this.price=price;
        this.inventoryStatus  = inventoryStatus;
    }
  } 

  export interface ProductDetailResponse {
    'id' : string
    'productId' : string
    'name' : string
    'shortDescription' : string
    'longDescription' : string
    'additionalInfo' : string
    'brand' : string
    'tags': Array<string>
    'categoryIds': Array<string>
    'skus': Array<Sku>
    'discountPercentage': number
    'inventoryStatus': string
 }

 export interface Sku{
    'id' : string
    'name' : string
    'color' : string
    'mediaUrl' : string
    'size' : string
    'priceDetail': Array<PriceDetail>
    'inventoryStatus': string
 }

 export interface PriceDetail{
    'priceType' : string
    'currencyType' : string
    'price' : string
 }

 export interface ProductDetail extends ProductDetailResponse {
    'salePrice': number
    'inventoryStatus': string
    'originalPrice': number
 }

 export interface ProductSorting {
    'name': string;
    'displayName': string;
    'sortObj' : string;
  }

  export interface ProductFilter {
    'fieldName': string | any;
    'name': string;
    'displayName': string;
    'operator' : string;
  }

  export interface ProductFilterRequest {
    'fieldName': string;
    'fieldValue': string[];
    'operator' : string;
  }

  export interface ProductListingPageDetails {
    'searchTerm': string;
    'categoryId': string;
    'sortObj' : string;
  }

  export interface UserProfileResponse {
    'id': string;
    'auth0_id': string;
    'name' : string;
    'email': string;
    'phone_number' : string;
    'profilePicUrl' : string;
  }
