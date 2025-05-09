import Item from "./Item";

export default interface Sale {
  _id: string,
  cardItems: Item[],
  total: number,
  discount?: number,
  addition?: number,
  client?: string,
  salesPerson?: string,
  showInfo: boolean,
  createdAt: string,
  updatedAt: string
}