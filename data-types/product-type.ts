export interface product{
    _id:string,
    image:string,
    productName:string,
    shopName:string,
    price:number,
    category:string,
    description:string,
    quantity?:number,
    status?:string
    user?:user
}

interface user{
    username:string,
    email:string,
    phone:number,
    address:string
}