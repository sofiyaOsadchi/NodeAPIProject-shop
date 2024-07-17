

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
  createdAt: Date;
  isAdmin: boolean;
  cart: ICartProduct[];
};

export type ICartProduct = {
  productId: string;
  title: string;
  price: number;
  size: string;
};


export type ICartItem = {
  productId: string;
  quantity: number;
};

export type ICart = {
  userId: string;
  items: ICartItem[];
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

export type IProductInput = {
  title: string;
  subtitle: string;
  description: string;
  price: number;
  image: IImage;
  alt: string;
  size: string;
  quantity: number;
  barcode: number;
};

export type IProduct = IProductInput & {
  _id: string;
  barcode: number;
  createdAt: Date;
  shoppingCart: string[];
  quantity: number;
  sold: number;
  userId: string;
};

export type IOrderProduct = {
  productId: string;
  quantity: number;
  size: string;
};

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


