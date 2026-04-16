export interface Document {
  id: string;
  name: string;
  type: string;
  quoteId: string;
  createdAt: Date;
  downloadUrl?: string;
}
