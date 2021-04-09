export interface History {
  id: number;
  createdDate: Date;
  actionType: number;
  actionObject: string;
  sourceAction: number;
  destinationAction: number;
}
