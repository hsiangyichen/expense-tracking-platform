# Expense Tracking and Budget Alert Platform

## Overview

The Expense Tracking Platform is a powerful web application designed to help users effortlessly monitor their spending and stay within their budget. By integrating the Plaid API for secure transaction fetching, Clerk for authentication, and Next.js for a high-performance experience, the platform ensures real-time expense tracking.

### Problem

Many individuals find it challenging to consistently monitor their spending, often exceeding their budgets without realizing it. Traditional banking apps typically provide transaction details after the fact, and manual tracking is both tedious and error-prone. This platform offers an automated, intelligent solution to provide real-time insights and categorized expenses.

### User Profile

- Budget-conscious individuals who want to:
  - Track their expenses automatically
  - Set and monitor financial goals
  - Access their financial data quickly without complex login processes

### Features

#### Core Features

- 🔐 Secure authentication with Clerk (Google, Apple, Email)
- 🏦 Bank account integration via Plaid
- 📊 Real-time transaction tracking
- 📱 Responsive design with Tailwind CSS
- 📈 Interactive financial data visualization
- 🎯 Automated expense categorization
- 💰 Budget tracking and monitoring

#### Future Features

- Mobile app version
- Gamified rewards system for meeting budget goals
- Set Budget manually and set alert
- Group saving features with couples and family

## Implementation

### Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS, Chart.js
- **Backend**: Next.js API Routes, Node.js
- **Database**: Appwrite
- **Authentication**: Clerk
- **Bank Integration**: Plaid API
- **Deployment**: Vercel

## Prerequisites

Before you begin, ensure you have:

- Node.js (v18 or higher)
- npm or yarn
- Accounts set up for:
  - [Clerk](https://clerk.com)
  - [Plaid](https://plaid.com)
  - [Appwrite](https://appwrite.io)

### Sitemap

- Home page (dashboard)
  - Accounts overview
  - Recent transaction details
  - Quick access to bank linking
- Transaction History
  - Comprehensive list of transactions
- Budget & Categories
  - Auto categorize spending transactions
  - View Spending Progress
- Bank Account Connection
  - Secure Bank Integration (Plaid API)
- Authentication
  - Secure login and signup using Clerk

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/expense-tracking-platform.git
cd expense-tracking-platform
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with the following variables:

```env
# Next.JS
NEXT_PUBLIC_API_URL=

# APPWRITE
NEXT_PUBLIC_APPWRITE_ENDPOINT=
NEXT_PUBLIC_APPWRITE_PROJECT=
APPWRITE_DATABASE_ID=
APPWRITE_USER_COLLECTION_ID=
APPWRITE_PLAID_COLLECTION_ID=
APPWRITE_ACCOUNT_COLLECTION_ID=
APPWRITE_TRANSACTION_COLLECTION_ID=
APPWRITE_CURSOR_COLLECTION_ID=
NEXT_APPWRITE_KEY=

# PLAID
PLAID_CLIENT_ID=
PLAID_SECRET=
PLAID_ENV=
PLAID_PRODUCTS=
PLAID_COUNTRY_CODES=
PLAID_BASE_URL=

# CLERK
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── api/           # API routes
│   ├── (auth)/       # Authentication pages
│   └── (root)/       # Main application pages
├── components/        # React components
├── lib/
│   ├── actions/      # Server actions
│   ├── appwrite.ts   # Appwrite configuration
│   └── plaid.ts      # Plaid configuration
├── types/            # TypeScript type definitions
├── constants/        # Application constants
└── public/           # Static assets
```

## API Endpoints

### Authentication

- `GET /api/auth/sync` - Syncs user data between Clerk and Appwrite

### Plaid Integration

- `POST /api/plaid/create-link-token` - Creates Plaid Link token
- `POST /api/plaid/exchange-public-token` - Exchanges Plaid public token

### Server Actions

- Account Management
  - `fetchAndStoreAccounts`
  - `getAccountStats`
- Transaction Management
  - `fetchAndStoreTransactions`
  - `getFilteredTransactions`
  - `getTransactionStats`
- Category Management
  - `getCategoryStats`
  - `getCategorizedTransactions`

## Database Setup

### Appwrite Collections

1. Users Collection (`APPWRITE_USER_COLLECTION_ID`)

   - `id`: string - Unique user ID from Clerk
   - `email`: string - User's email address
   - `firstName`: string - User's first name
   - `lastName`: string - User's last name

2. Plaid Connections Collection (`APPWRITE_PLAID_COLLECTION_ID`)

   - `userId`: string - Reference to user
   - `itemId`: string - Plaid item ID
   - `accessToken`: string - Plaid access token
   - `status`: string - Connection status ("active" | "inactive")
   - `institution`: string - Institution name
   - `institutionId`: string - Institution ID from Plaid
   - `createdAt`: string - ISO date string
   - `updatedAt`: string - ISO date string

3. Accounts Collection (`APPWRITE_ACCOUNT_COLLECTION_ID`)

   - `id`: string - Unique document ID
   - `userId`: string - Reference to user
   - `itemId`: string - Reference to Plaid item
   - `accountId`: string - Account ID from Plaid
   - `institutionId`: string - Institution ID
   - `institutionName`: string - Institution name
   - `name`: string - Account name
   - `officialName`: string - Official account name
   - `mask`: string - Last 4 digits of account
   - `subtype`: string - Account subtype
   - `balanceCurrent`: number - Current balance
   - `type`: string - Account type
   - `status`: string - Account status ("active" | "inactive")
   - `createdAt`: string - ISO date string
   - `updatedAt`: string - ISO date string

4. Transactions Collection (`APPWRITE_TRANSACTION_COLLECTION_ID`)

   - `id`: string - Unique document ID
   - `userId`: string - Reference to user
   - `itemId`: string - Reference to Plaid item
   - `accountId`: string - Reference to account
   - `transactionId`: string - Transaction ID from Plaid
   - `name`: string - Transaction name
   - `amount`: number - Transaction amount
   - `date`: string - Transaction date
   - `category`: string[] - Array of categories
   - `pending`: boolean - Transaction pending status
   - `merchantName`: string | null - Merchant name if available
   - `paymentChannel`: string - Payment channel
   - `image`: string | null - Transaction image URL
   - `status`: string - Optional status field for removed transactions
   - `createdAt`: string - ISO date string
   - `updatedAt`: string - ISO date string

5. Cursors Collection (`APPWRITE_CURSOR_COLLECTION_ID`)
   - `userId`: string - Reference to user
   - `itemId`: string - Reference to Plaid item
   - `type`: string - Cursor type (e.g., "transactions")
   - `cursor`: string - Plaid cursor value
   - `createdAt`: string - ISO date string
   - `updatedAt`: string - ISO date string

Each collection should have appropriate indexes set up for the fields commonly used in queries, especially:

- userId (for all collections)
- itemId (for relevant collections)
- status (for filtered queries)
- date (for transaction queries)
