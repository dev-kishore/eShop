import {product} from '../data-types/product-type'
export interface user{
    _id:string,
    username:string,
    email:string,
    phone:number,
    address:string,
    password:string,
    cart:product[],
    orders:product[],
    cancelledOrders:product[],
    processedOrders:product[]

}
