// src/modules/opportunities/types/opportunity.ts

export interface CompanyInfo {
  userId: {
    name: string
  }
  sector: string
  address: string
}

export interface Opportunity {
  uuid: string
  description: string
  deadline: string
  mode: 'remote' | 'on-site' | 'hybrid'
  companyId: CompanyInfo
  email: string
  forStudents: boolean
  status: 'open' | 'closed' | 'pending-approval'
  requirements?: string[]
  benefits?: string[]
  flyerUrl?: string
  flyerFormat?: 'png'
  createdAt: string
}
