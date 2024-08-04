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
    title: "product 1",
    subtitle: "a test value for this card",
    description: "a test value for new card\na test value for new card\n",
    image: {
      url: "http://localhost:8080/uploads/Untitled design (16).png",
    },
    alt: "image of something",
    variants: [
      { size: "S", quantity: 40, price: 222 },
      { size: "M", quantity: 35, price: 333 },
      { size: "L", quantity: 20, price: 444 },
    ],
  },
  {
    title: "product 2",
    subtitle: "a test value for this card",
    description: "a test value for new card\na test value for new card\n",
    image: {
      url: "http://localhost:8080/uploads/1721159951196-cards1.png",
    },
    alt: "image of something",
    variants: [
      { size: "S", quantity: 40, price: 222 },
      { size: "M", quantity: 15, price: 333 },
      { size: "L", quantity: 20, price: 444 },
    ],
  },
  {
    title: "product 3",
    subtitle: "a test value for this card",
    description: "a test value for new card\na test value for new card\n",
    image: {
      url: "http://localhost:8080/uploads/1721247242080-328759643_734682074786451_3363899805198390679_n.jpg",
    },
    alt: "image of something",
    variants: [
      { size: "S", quantity: 40, price: 222 },
      { size: "M", quantity: 45, price: 333 },
      { size: "L", quantity: 20, price: 444 },
    ],
  },
];
export { users , products};
