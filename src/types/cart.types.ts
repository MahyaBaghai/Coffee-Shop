export interface CartItem  {
  id: string | number;
  name: string;
  price: number;
  discount: number;
  quantity: number;
  img: string;
  stock?: boolean;
  finalPrice: number;
}