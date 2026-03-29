import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    category: "Electronics",
    image: "https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and memory foam ear cushions for maximum comfort.",
    rating: 4.8,
    inStock: true,
    featured: true,
    images: [
      "https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1591/technology-music-sound-things.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ]
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    category: "Wearables",
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Track your fitness goals with precision. This smartwatch monitors heart rate, sleep quality, and activity levels while connecting seamlessly to your smartphone for notifications.",
    rating: 4.6,
    inStock: true,
    featured: true,
    images: [
      "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/236915/pexels-photo-236915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ]
  },
  {
    id: 3,
    name: "Ultralight Laptop",
    price: 1299.99,
    category: "Electronics",
    image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "The ultimate productivity tool. This ultralight laptop weighs just 2.5 pounds but packs a powerful processor, all-day battery life, and a stunning 4K display.",
    rating: 4.9,
    inStock: true,
    images: [
      "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ]
  },
  {
    id: 4,
    name: "Minimalist Desk Lamp",
    price: 89.99,
    category: "Home",
    image: "https://images.pexels.com/photos/7514/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "This elegant, adjustable desk lamp provides warm, eye-friendly lighting for your workspace. Features touch controls and wireless phone charging in the base.",
    rating: 4.5,
    inStock: true,
    discount: 15,
    images: [
      "https://images.pexels.com/photos/7514/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/3846810/pexels-photo-3846810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ]
  },
  {
    id: 5,
    name: "Premium Coffee Maker",
    price: 149.99,
    category: "Kitchen",
    image: "https://images.pexels.com/photos/6542542/pexels-photo-6542542.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Brew barista-quality coffee at home with this programmable coffee maker. Features customizable strength settings, built-in grinder, and thermal carafe to keep coffee hot for hours.",
    rating: 4.7,
    inStock: true,
    featured: true,
    images: [
      "https://images.pexels.com/photos/6542542/pexels-photo-6542542.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/2493324/pexels-photo-2493324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ]
  },
  {
    id: 6,
    name: "Designer Backpack",
    price: 79.99,
    category: "Fashion",
    image: "https://images.pexels.com/photos/934673/pexels-photo-934673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "This stylish yet functional backpack features water-resistant material, padded laptop compartment, and hidden anti-theft pockets. Perfect for commuting or weekend adventures.",
    rating: 4.4,
    inStock: true,
    discount: 20,
    images: [
      "https://images.pexels.com/photos/934673/pexels-photo-934673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1294731/pexels-photo-1294731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/346748/pexels-photo-346748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ]
  },
  {
    id: 7,
    name: "Smart Home Speaker",
    price: 129.99,
    category: "Electronics",
    image: "https://images.pexels.com/photos/4201338/pexels-photo-4201338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Control your smart home with voice commands through this premium speaker. Features rich, room-filling sound and an intelligent assistant that learns your preferences over time.",
    rating: 4.6,
    inStock: false,
    images: [
      "https://images.pexels.com/photos/4201338/pexels-photo-4201338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/3825582/pexels-photo-3825582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/144429/pexels-photo-144429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ]
  },
  {
    id: 8,
    name: "Luxury Watch",
    price: 399.99,
    category: "Fashion",
    image: "https://images.pexels.com/photos/9978720/pexels-photo-9978720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "This precision-crafted timepiece features a sapphire crystal face, automatic movement, and genuine leather strap. Water-resistant to 100 meters.",
    rating: 4.9,
    inStock: true,
    featured: true,
    images: [
      "https://images.pexels.com/photos/9978720/pexels-photo-9978720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ]
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getCategories = (): string[] => {
  return [...new Set(products.map(product => product.category))];
};