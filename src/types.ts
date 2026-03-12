export interface User {
  id: number;
  email: string;
  name: string;
}

export interface ProductMetadata {
  category: string;
  subcategory: string;
  seo_tags: string[];
  sustainability_filters: string[];
}

export interface ProposalProduct {
  name: string;
  quantity: number;
  unit_price: number;
  total_cost: number;
}

export interface CorporateProposal {
  products: ProposalProduct[];
  budget_breakdown: {
    total_budget: number;
    allocated_budget: number;
  };
  impact_summary: string;
}

export interface HistoryItem {
  id: number;
  user_id: number;
  type: 'metadata' | 'proposal';
  input: any;
  output: any;
  created_at: string;
}
