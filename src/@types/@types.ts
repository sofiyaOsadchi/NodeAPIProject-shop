export type Cat = {
  name: string;
};

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
  alt: string;
  url: string;
};

export type IUserInput = {
  email: string;
  phone: string;
  password: string;
  isBusiness: boolean;
  address: IAddress;
  name: IName;
  image?: IImage;
};

export type IUser = IUserInput & {
  createdAt: Date;
  isAdmin: boolean;
};

export type ILogin = {
  email: string;
  password: string
};


export type IJWTPayload = {
  _id: string, 
  isAdmin: boolean,
  isBusiness: boolean
}


export type ICardInput = {
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  web: string;
  image: IImage;
  address: IAddress
};

export type ICard = ICardInput & {
  _id: string, 
  bizNumber: number,
  createdAt: Date,
  likes: string[],
  favorites: string[];
  userId: string
};