import { IProductInput } from "../@types/@types";

const users = [
  {
    isAdmin: true,
    name: {
      first: "TomerBu",
      middle: "",
      last: "Bu",
    },
    phone: "0507123012",
    email: "tomerbu@gmail.com",
    password: "Abc!123Abc",
    address: {
      state: "IL",
      country: "Israel",
      city: "Tel aviv",
      street: "Shoham",
      houseNumber: 5,
      zip: "8920435",
    },
    isBusiness: true,
  },
  {
    name: {
      first: "Moshe",
      middle: "",
      last: "Doe",
    },
    phone: "050-8123012",
    email: "moshe@gmail.com",
    password: "Abc!123Abc",
    address: {
      state: "IL",
      country: "Israel",
      city: "Haifa",
      street: "HaNevim",
      houseNumber: 5,
      zip: "8920435",
    },
    isBusiness: true,
  },
  {
    name: {
      first: "Yossi",
      middle: "",
      last: "Cohen",
    },
    phone: "050-9123012",
    email: "rtytuj@gmail.com",
    password: "Abc!123Abc",
    address: {
      state: "IL",
      country: "Israel",
      city: "Haifa",
      street: "HaNevim",
      houseNumber: 5,
      zip: "8920435",
    },
    isBusiness: true,

  },

];
const products: IProductInput[] = [
  {
    title: "Black Ribbed Sweater",
    subtitle: "Elegant and Versatile",
    description: "A black ribbed sweater that offers both elegance and versatility. Perfect for any occasion.",
    image: {
      url: "https://nodeapiproject-shop.onrender.com/uploads/2.png",
    },
    alt: "Black Ribbed Sweater",
    variants: [
      { size: "S", quantity: 40, price: 222 },
      { size: "M", quantity: 35, price: 333 },
      { size: "L", quantity: 20, price: 444 },
    ],
  },
  {
    title: "Black Blazer",
    subtitle: "Classic and Timeless",
    description: "A classic black blazer that never goes out of style. Ideal for both formal and casual occasions.",
    image: {
      url: "https://nodeapiproject-shop.onrender.com/uploads/3.png",
    },
    alt: "Black Blazer",
    variants: [
      { size: "S", quantity: 40, price: 222 },
      { size: "M", quantity: 15, price: 333 },
      { size: "L", quantity: 20, price: 444 },
    ],
  },
  {
    title: "Checked Blazer",
    subtitle: "Stylish and Modern",
    description: "A stylish checked blazer that adds a modern touch to any outfit. Perfect for making a statement.",
    image: {
      url: "https://nodeapiproject-shop.onrender.com/uploads/4.png",
    },
    alt: "Checked Blazer",
    variants: [
      { size: "S", quantity: 40, price: 222 },
      { size: "M", quantity: 45, price: 333 },
      { size: "L", quantity: 20, price: 444 },
    ],
  },
  {
    title: "Oversized Blazer",
    subtitle: "Comfort and Style",
    description: "An oversized blazer that combines comfort and style. Perfect for a relaxed yet chic look.",
    image: {
      url: "https://nodeapiproject-shop.onrender.com/uploads/5.png",
    },
    alt: "Oversized Blazer",
    variants: [
      { size: "S", quantity: 40, price: 222 },
      { size: "M", quantity: 15, price: 333 },
      { size: "L", quantity: 20, price: 444 },
    ],
  },
  {
    title: "Beige Blazer",
    subtitle: "Sleek and Sophisticated",
    description: "A sleek and sophisticated beige blazer. Perfect for adding a touch of elegance to any outfit.",
    image: {
      url: "https://nodeapiproject-shop.onrender.com/uploads/6.png",
    },
    alt: "Beige Blazer",
    variants: [
      { size: "S", quantity: 40, price: 222 },
      { size: "M", quantity: 25, price: 333 },
      { size: "L", quantity: 30, price: 444 },
    ],
  },
  {
    title: "Fashionable Blazer",
    subtitle: "Bold and Trendy",
    description: "A fashionable blazer that is both bold and trendy. Perfect for standing out in style.",
    image: {
      url: "https://nodeapiproject-shop.onrender.com/uploads/7.png",
    },
    alt: "Fashionable Blazer",
    variants: [
      { size: "S", quantity: 40, price: 222 },
      { size: "M", quantity: 15, price: 333 },
      { size: "L", quantity: 20, price: 444 },
    ],
  },
  {
    title: "White Blouse",
    subtitle: "Crisp and Clean",
    description: "A crisp and clean white blouse. Ideal for both professional and casual settings.",
    image: {
      url: "https://nodeapiproject-shop.onrender.com/uploads/8.png",
    },
    alt: "White Blouse",
    variants: [
      { size: "S", quantity: 40, price: 222 },
      { size: "M", quantity: 25, price: 333 },
      { size: "L", quantity: 30, price: 444 },
    ],
  },
  {
    title: "Elegant Beige Blazer",
    subtitle: "Chic and Modern",
    description: "An elegant beige blazer that is both chic and modern. Perfect for elevating any look.",
    image: {
      url: "https://nodeapiproject-shop.onrender.com/uploads/9.png",
    },
    alt: "Elegant Beige Blazer",
    variants: [
      { size: "S", quantity: 40, price: 222 },
      { size: "M", quantity: 15, price: 333 },
      { size: "L", quantity: 20, price: 444 },
    ],
  },
  {
    title: "Sophisticated Blazer",
    subtitle: "Elegant and Timeless",
    description: "A sophisticated blazer that is both elegant and timeless. Perfect for any occasion.",
    image: {
      url: "https://nodeapiproject-shop.onrender.com/uploads/10.png",  
    },
    alt: "Sophisticated Blazer",
    variants: [
      { size: "S", quantity: 40, price: 222 },
      { size: "M", quantity: 15, price: 333 },
      { size: "L", quantity: 20, price: 444 },
    ],
  },
];


export { users , products};
