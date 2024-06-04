export interface User {
    id: number
    firstName: string
    lastName: string
    userName: string
    emailAddress: string
    password: string
    type: number
    lastLogin: string
    order: any
    cart: Cart
  }
  
  export interface Cart {
    cartId: number
    cartQuantity: number
    user: any
    userId: number
    orderItems: OrderItem[]
  }
  
  export interface OrderItem {
    id: number
    quantity: number
    cart: any
    cartID: number
    product: Product
    productID: number
  }
  
  export interface Product {
    id: number
    productName: string
    price: number
    addedOn: string
    department: any
    departmentID: number
    subCategory: any
    subCategoryID: number
    colors: any
    galleryImage: GalleryImage[],
    size: any
  }
  
  export interface GalleryImage {
    url: string;
    alt: string;
  }