export interface ProductAttribute {
  id: number;
  attribute_id: number;
  product_id: number;
  value: string;
  attribute: {
    id: number;
    name: string;
  };
}

export interface Product {
  id: number;
  name: string;
  img: string;
  price: number;
  discount: number;
  stock: boolean;
  grade: number;
  tags?: string[];
  attributes?: ProductAttribute[];
}
