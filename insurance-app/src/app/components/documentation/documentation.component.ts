import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsuranceApiService } from '../../services/insurance-api.service';
import { Document } from '../../models/document.model';

@Component({
  selector: 'app-documentation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Documentation</h1>
      
      @if (loading) {
        <p>Loading documents...</p>
      }

      @if (documents.length === 0 && !loading) {
        <div class="empty-state">
          <p>No documents available yet.</p>
          <p>Complete a quote and bind a policy to generate documents.</p>
        </div>
      }

      <div class="documents-list">
        @for (doc of documents; track doc.id) {
          <div class="document-card">
            <div class="doc-icon">📄</div>
            <div class="doc-info">
              <h3>{{ doc.name }}</h3>
              <p><strong>Type:</strong> {{ doc.type }}</p>
              <p><strong>Quote ID:</strong> {{ doc.quoteId }}</p>
              <p><strong>Created:</strong> {{ doc.createdAt | date:'medium' }}</p>
            </div>
            <button class="download-btn" (click)="downloadDocument(doc)">Download</button>
          </div>
        }
      </div>

      @if (errorMessage) {
        <div class="error">{{ errorMessage }}</div>
      }
    </div>
  `,
  styles: [`
    .container { max-width: 800px; margin: 0 auto; }
    .empty-state { text-align: center; padding: 40px; background: #f3f4f6; border-radius: 8px; }
    .documents-list { display: flex; flex-direction: column; gap: 16px; margin-top: 24px; }
    .document-card { display: flex; align-items: center; padding: 16px; background: white; border: 1px solid #e5e7eb; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .doc-icon { font-size: 32px; margin-right: 16px; }
    .doc-info { flex: 1; }
    .doc-info h3 { margin: 0 0 8px 0; }
    .doc-info p { margin: 4px 0; color: #6b7280; font-size: 14px; }
    .download-btn { padding: 8px 16px; background: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer; }
    .error { color: #dc2626; padding: 12px; background: #fee2e2; border-radius: 4px; margin-top: 16px; }
  `]
})
export class DocumentationComponent implements OnInit {
  private apiService = inject(InsuranceApiService);

  documents: Document[] = [];
  loading = false;
  errorMessage = '';

  ngOnInit() {
    this.loadDocuments();
  }

  loadDocuments() {
    this.loading = true;
    this.errorMessage = '';
    this.apiService.getDocuments().subscribe({
      next: (docs) => {
        this.loading = false;
        this.documents = docs;
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Failed to load documents.';
        console.error(err);
      }
    });
  }

  downloadDocument(doc: Document) {
    alert(`Downloading: ${doc.name}`);
  }
}
