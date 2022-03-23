import {product} from './product-type'
export interface admin{
    _id:string,
    shopName:string,
    email:string,
    phone:string,
    password:string,
    orders:product,
    cancelledOrders:product,
    processedOrders:product
}

