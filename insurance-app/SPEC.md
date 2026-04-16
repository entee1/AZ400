# Insurance App - Angular v20 Frontend

## Overview
A single-page insurance application with Quote, Bind, and Documentation features. Communicates with a backend API via REST calls.

## Tech Stack
- Angular v20 (standalone components)
- TypeScript
- Reactive Forms
- HttpClient for API calls
- Angular Router

## Features

### 1. Quote Module
- Form to capture customer and policy details
- Fields: Name, Email, Phone, Product Type (dropdown), Coverage Amount, Policy Start Date
- Submit button to POST quote data to backend
- Success/error feedback display

### 2. Bind Module
- Form to bind a quoted policy
- Fields: Quote ID, Customer confirmation checkbox, Payment details placeholder
- Submit button to POST bind request

### 3. Documentation Module
- View generated documents/policies
- List of documents with download links (placeholder)

## API Integration
- Base URL configurable via environment
- POST `/api/quotes` - Submit quote request
- POST `/api/bind` - Bind policy
- GET `/api/documents` - Fetch documents

## Navigation
- Sidebar navigation with links to Quote, Bind, Documentation
- Active state highlighting

## UI Design
- Clean, professional insurance industry aesthetic
- Card-based layout
- Form validation with error messages
- Loading states during API calls
