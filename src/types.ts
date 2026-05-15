export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  selectedColor: string;
  variants: {
    colorName: string;
    colorCode: string;
  }[];
  modelURL: string;
  position: Position;
  scale: string;
}

export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface CartItem {
  id: string;
  color: string;
  quantity: number;
  basePrice: number;
  price: number;
}

export interface Decoration {
  id: string;
  modelURL: string;
  position: Position;
  scale: string;
}
