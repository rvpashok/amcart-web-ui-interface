export class Product {
    'id': string;
    'productId': string;
    'name': string;
    'shortDescription': string;
    'longDescription': string;
    'price': number;

    constructor(id: string, productId: string, name: string, 
        shortDescription: string, longDescription: string,
        price: number){
        this.id=id;
        this.name =name;
        this.shortDescription=shortDescription;
        this.longDescription=longDescription;
        this.productId=productId;
        this.price=price;
    }
  } 