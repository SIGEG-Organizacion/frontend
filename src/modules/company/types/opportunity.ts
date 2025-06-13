// src/modules/company/types/opportunity.ts
export interface Opportunity {
  _id: string;
  companyId: string;
  deadline: string;
  description: string;
  requirements: string[];
  benefits: string[];
  mode: string;
  email: string;
  status: string;
  uuid: string;
  createdAt: string;
  flyerUrl?: string;
  format?: "jpg";
  forStudents: boolean;
}
