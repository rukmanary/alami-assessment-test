export interface DataItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface CartItemProps {
  data: DataItem;
}

export interface DataTotalCart {
  id: number;
  totalCart: number;
}

export interface CalculatePrice {
  operator: 'addition' | 'subtraction';
  price: number;
}

export interface SetDataItem {
  dataItem: DataItem;
  qty: number;
}

export interface NoteProps {
  id: number;
}
