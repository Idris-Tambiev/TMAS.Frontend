export interface ICard {
  id?: number;
  isDone?: boolean;
  title: string;
  text?: string;
  sortBy: number;
  columnId: number;
  createdDate?: Date;
  updatedDate?: Date;
  executionPeriod?: Date;
}
