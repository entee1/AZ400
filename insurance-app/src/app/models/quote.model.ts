export interface Quote {
  id?: string;
  customerName: string;
  email: string;
  phone: string;
  productType: string;
  coverageAmount: number;
  policyStartDate: string;
  status?: 'pending' | 'quoted' | 'bound';
  premium?: number;
  createdAt?: Date;
}
