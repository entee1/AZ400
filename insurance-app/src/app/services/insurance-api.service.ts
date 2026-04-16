import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quote } from '../models/quote.model';
import { BindRequest } from '../models/bind.model';
import { Document } from '../models/document.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InsuranceApiService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  submitQuote(quote: Quote): Observable<Quote> {
    return this.http.post<Quote>(`${this.baseUrl}/api/quotes`, quote);
  }

  bindPolicy(bindRequest: BindRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/bind`, bindRequest);
  }

  getDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.baseUrl}/api/documents`);
  }
}
