export interface BindRequest {
  quoteId: string;
  customerConfirmed: boolean;
  paymentMethod: string;
  paymentDetails?: string;
}
