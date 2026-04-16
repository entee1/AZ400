import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InsuranceApiService } from '../../services/insurance-api.service';
import { Quote } from '../../models/quote.model';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <h1>Get a Quote</h1>
      <form [formGroup]="quoteForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="customerName">Customer Name</label>
          <input id="customerName" type="text" formControlName="customerName" />
          @if (quoteForm.get('customerName')?.invalid && quoteForm.get('customerName')?.touched) {
            <span class="error">Name is required</span>
          }
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email" />
          @if (quoteForm.get('email')?.invalid && quoteForm.get('email')?.touched) {
            <span class="error">Valid email is required</span>
          }
        </div>

        <div class="form-group">
          <label for="phone">Phone</label>
          <input id="phone" type="tel" formControlName="phone" />
          @if (quoteForm.get('phone')?.invalid && quoteForm.get('phone')?.touched) {
            <span class="error">Phone is required</span>
          }
        </div>

        <div class="form-group">
          <label for="productType">Product Type</label>
          <select id="productType" formControlName="productType">
            <option value="">Select a product</option>
            <option value="auto">Auto Insurance</option>
            <option value="home">Home Insurance</option>
            <option value="life">Life Insurance</option>
            <option value="health">Health Insurance</option>
          </select>
          @if (quoteForm.get('productType')?.invalid && quoteForm.get('productType')?.touched) {
            <span class="error">Product type is required</span>
          }
        </div>

        <div class="form-group">
          <label for="coverageAmount">Coverage Amount ($)</label>
          <input id="coverageAmount" type="number" formControlName="coverageAmount" />
          @if (quoteForm.get('coverageAmount')?.invalid && quoteForm.get('coverageAmount')?.touched) {
            <span class="error">Valid coverage amount is required</span>
          }
        </div>

        <div class="form-group">
          <label for="policyStartDate">Policy Start Date</label>
          <input id="policyStartDate" type="date" formControlName="policyStartDate" />
          @if (quoteForm.get('policyStartDate')?.invalid && quoteForm.get('policyStartDate')?.touched) {
            <span class="error">Start date is required</span>
          }
        </div>

        <button type="submit" [disabled]="loading || quoteForm.invalid">
          {{ loading ? 'Submitting...' : 'Get Quote' }}
        </button>

        @if (successMessage) {
          <div class="success">{{ successMessage }}</div>
        }
        @if (errorMessage) {
          <div class="error">{{ errorMessage }}</div>
        }
      </form>

      @if (submittedQuote) {
        <div class="result-card">
          <h3>Quote Details</h3>
          <p><strong>Quote ID:</strong> {{ submittedQuote.id }}</p>
          <p><strong>Premium:</strong> \${{ submittedQuote.premium }}</p>
          <p><strong>Status:</strong> {{ submittedQuote.status }}</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .container { max-width: 600px; margin: 0 auto; }
    .form-group { margin-bottom: 16px; }
    label { display: block; margin-bottom: 4px; font-weight: 500; }
    input, select { width: 100%; padding: 8px 12px; border: 1px solid #ccc; border-radius: 4px; }
    button { padding: 10px 20px; background: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer; }
    button:disabled { background: #9ca3af; }
    .error { color: #dc2626; font-size: 12px; }
    .success { color: #16a34a; padding: 12px; background: #dcfce7; border-radius: 4px; margin-top: 16px; }
    .result-card { margin-top: 24px; padding: 16px; background: #f0f9ff; border-radius: 8px; border: 1px solid #bae6fd; }
  `]
})
export class QuoteComponent {
  private fb = inject(FormBuilder);
  private apiService = inject(InsuranceApiService);

  quoteForm = this.fb.group({
    customerName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    productType: ['', Validators.required],
    coverageAmount: [null, [Validators.required, Validators.min(1000)]],
    policyStartDate: ['', Validators.required]
  });

  loading = false;
  successMessage = '';
  errorMessage = '';
  submittedQuote: Quote | null = null;

  onSubmit() {
    if (this.quoteForm.valid) {
      this.loading = true;
      this.successMessage = '';
      this.errorMessage = '';

      const quote: Quote = {
        customerName: this.quoteForm.value.customerName!,
        email: this.quoteForm.value.email!,
        phone: this.quoteForm.value.phone!,
        productType: this.quoteForm.value.productType!,
        coverageAmount: this.quoteForm.value.coverageAmount!,
        policyStartDate: this.quoteForm.value.policyStartDate!
      };
      this.apiService.submitQuote(quote).subscribe({
        next: (result) => {
          this.loading = false;
          this.submittedQuote = result;
          this.successMessage = 'Quote submitted successfully!';
          this.quoteForm.reset();
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = 'Failed to submit quote. Please try again.';
          console.error(err);
        }
      });
    }
  }
}
