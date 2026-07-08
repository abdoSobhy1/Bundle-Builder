import { type Product } from "./product";

export interface Category {
  id: string;
  name: string;
  title: string;
  icon: string;
  description?: string;
  products: Product[];
}
