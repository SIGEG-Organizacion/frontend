export interface Opportunity {
  _id: string;
  title: string;
  company: string;
  tags: string[];
  modality: "onsite" | "remote" | "hybrid";
  description: string[];
  image?: string;
}

export interface Interest {
  id: string;
  _id?: string;
  userId: string;
  opportunityId: string | Opportunity;
  createdAt: string;
  modality: "onsite" | "remote" | "hybrid";
}
