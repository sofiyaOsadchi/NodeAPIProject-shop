

export type IName = {
  first: string;
  middle?: string;
  last: string;
};

export type IAddress = {
  street: string;
  city: string;
  state?: string;
  zip?: string;
  country: string;
  houseNumber: number;
};

export type IImage = {
  url: string;
};

export type IUserInput = {
  email: string;
  phone: string;
  password: string;
  /* isBusiness: boolean; */
  address: IAddress;
  name: IName;
 /*  image?: IImage;
  alt: string; */
};

export type IUser = IUserInput & {
  _id?: string;
  createdAt: Date;
  isAdmin: boolean;
  cart?: ICart[];
  
};


export type ILogin = {
  email: string;
  password: string;
};

export type IJWTPayload = {
  _id: string;
  isAdmin: boolean;
  /*   isBusiness: boolean; */
};



export interface ICartItem {
  productId: string;
  variantId: string;
  title: string;
  price: number;
  size: string;
  quantity: number;
  image: IImage;
}


export interface ICart {
  userId: string;
  items: ICartItem[];
}

export interface ICartWithTotals extends ICart {
  totalQuantity: number;
  totalPrice: number;
};


export type IVariant = {
  _id?: string;
  size: string;
  quantity: number;
  price: number;
};




export type IProductInput = {
  title: string;
  subtitle: string;
  description: string;
  image: IImage;
  alt: string;
  variants: IVariant[];
};

export type IProduct = IProductInput & {
  _id: string;
  barcode: number;
  createdAt: Date;
  shoppingCart: string[];
  sold: number;
  userId: string;
};

export type IOrderProduct = {
  productId: string;
  quantity: number;
  size: string;
  price: number;
  title: string;
};

// טיפוס עבור הזמנה
export type IOrder = {
  userId: string;
  products: IOrderProduct[];
  totalAmount: number;
  status: string;
  createdAt: Date;
  orderNumber: string;
};

export interface SalesByDateQuery {
  startDate: string;
  endDate: string;
}

export type IUpdateUserType = {
  name: {
    first: string;
    middle: string;
    last: string;
  };
  phone: string;
  address: {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip: number;
  };
};


export type IMessage = {
  fullName: string;
  email: string;
  message: string;
  createdAt?: Date;
}