import { Routes } from '@angular/router';
import { QuoteComponent } from './components/quote/quote.component';
import { BindComponent } from './components/bind/bind.component';
import { DocumentationComponent } from './components/documentation/documentation.component';

export const routes: Routes = [
  { path: '', redirectTo: 'quote', pathMatch: 'full' },
  { path: 'quote', component: QuoteComponent },
  { path: 'bind', component: BindComponent },
  { path: 'documents', component: DocumentationComponent }
];
