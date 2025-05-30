export interface Interest {
  id: string;
  userId: string;
  opportunityId: string;
  createdAt: Date;
}

export interface FilterParams {
  fromDate?: Date;
  toDate?: Date;
  modality?: string;
}
