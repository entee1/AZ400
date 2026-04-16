import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InsuranceApiService } from '../../services/insurance-api.service';

@Component({
  selector: 'app-bind',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <h1>Bind Policy</h1>
      <form [formGroup]="bindForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="quoteId">Quote ID</label>
          <input id="quoteId" type="text" formControlName="quoteId" placeholder="Enter your quote ID" />
          @if (bindForm.get('quoteId')?.invalid && bindForm.get('quoteId')?.touched) {
            <span class="error">Quote ID is required</span>
          }
        </div>

        <div class="form-group">
          <label for="paymentMethod">Payment Method</label>
          <select id="paymentMethod" formControlName="paymentMethod">
            <option value="">Select payment method</option>
            <option value="credit_card">Credit Card</option>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="paypal">PayPal</option>
          </select>
          @if (bindForm.get('paymentMethod')?.invalid && bindForm.get('paymentMethod')?.touched) {
            <span class="error">Payment method is required</span>
          }
        </div>

        <div class="form-group checkbox-group">
          <label>
            <input type="checkbox" formControlName="customerConfirmed" />
            I confirm that all information is correct and I want to bind this policy
          </label>
          @if (bindForm.get('customerConfirmed')?.invalid && bindForm.get('customerConfirmed')?.touched) {
            <span class="error">You must confirm to proceed</span>
          }
        </div>

        <button type="submit" [disabled]="loading || bindForm.invalid">
          {{ loading ? 'Processing...' : 'Bind Policy' }}
        </button>

        @if (successMessage) {
          <div class="success">{{ successMessage }}</div>
        }
        @if (errorMessage) {
          <div class="error">{{ errorMessage }}</div>
        }
      </form>
    </div>
  `,
  styles: [`
    .container { max-width: 600px; margin: 0 auto; }
    .form-group { margin-bottom: 16px; }
    label { display: block; margin-bottom: 4px; font-weight: 500; }
    input, select { width: 100%; padding: 8px 12px; border: 1px solid #ccc; border-radius: 4px; }
    .checkbox-group label { display: flex; align-items: center; gap: 8px; font-weight: normal; }
    .checkbox-group input { width: auto; }
    button { padding: 10px 20px; background: #16a34a; color: white; border: none; border-radius: 4px; cursor: pointer; }
    button:disabled { background: #9ca3af; }
    .error { color: #dc2626; font-size: 12px; }
    .success { color: #16a34a; padding: 12px; background: #dcfce7; border-radius: 4px; margin-top: 16px; }
  `]
})
export class BindComponent {
  private fb = inject(FormBuilder);
  private apiService = inject(InsuranceApiService);

  bindForm = this.fb.group({
    quoteId: ['', Validators.required],
    customerConfirmed: [false, Validators.requiredTrue],
    paymentMethod: ['', Validators.required]
  });

  loading = false;
  successMessage = '';
  errorMessage = '';

  onSubmit() {
    if (this.bindForm.valid) {
      this.loading = true;
      this.successMessage = '';
      this.errorMessage = '';

      this.apiService.bindPolicy(this.bindForm.value as any).subscribe({
        next: () => {
          this.loading = false;
          this.successMessage = 'Policy bound successfully!';
          this.bindForm.reset();
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = 'Failed to bind policy. Please check your quote ID.';
          console.error(err);
        }
      });
    }
  }
}
