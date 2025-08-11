# lightning.sivothajan.me

custom domain lightning address support for binance lightning nrtwork with the help of Binance API, Supabase and Vercel Serverless Functions

---

## Database Setup

This project requires two seperate **Supabase** tables called `lightning_pay_request_data` and `lightning_withdraw_request_data` to store the pay request and withdraw request data respectively. The tables are created using SQL queries, which can be executed in the Supabase SQL editor or any PostgreSQL client connected to your Supabase database.

### Create the `lightning_pay_request_data` and `lightning_withdraw_request_data` Tables

Execute the bellow SQL queries to create the tables:

```sql
CREATE TABLE lightning_pay_request_data (
    uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    address TEXT NOT NULL,
    url TEXT,
    coin TEXT NOT NULL,
    amount BIGINT NOT NULL,
    nostr_pubkey TEXT,
    tag TEXT,
    comment TEXT,
    is_paid BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

```sql
CREATE TABLE lightning_withdraw_request_data (
    k1 CHAR(64) PRIMARY KEY DEFAULT encode(gen_random_bytes(32), 'hex'),
    address TEXT NOT NULL,
    url TEXT,
    coin TEXT NOT NULL,
    amount BIGINT NOT NULL,
    is_paid BOOLEAN NOT NULL DEFAULT FALSE,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    network TEXT NOT NULL DEFAULT 'LIGHTNING',
    prefix TEXT,
    payee_node TEXT NOT NULL,
    payment_hash TEXT NOT NULL UNIQUE,
    nostr_pubkey TEXT,
    tag TEXT,
    comment TEXT
);
```

### Table Columns and Description

#### `lightning_pay_request_data` Table

| Column Name    | Type        | Description                                     |
| -------------- | ----------- | ----------------------------------------------- |
| `uuid`         | UUID        | Unique identifier for the pay request           |
| `address`      | TEXT        | Lightning address for the pay request           |
| `url`          | TEXT        | Optional URL associated with the pay request    |
| `coin`         | TEXT        | Cryptocurrency type (e.g., BTC)                 |
| `amount`       | BIGINT      | Amount to be paid in satoshis                   |
| `nostr_pubkey` | TEXT        | Nostr public key associated with the request    |
| `tag`          | TEXT        | Optional tag for categorization                 |
| `comment`      | TEXT        | Optional comment for the pay request            |
| `is_paid`      | BOOLEAN     | Indicates if the pay request has been paid      |
| `created_at`   | TIMESTAMPTZ | Timestamp when the pay request was created      |
| `updated_at`   | TIMESTAMPTZ | Timestamp when the pay request was last updated |

#### `lightning_withdraw_request_data` Table

| Column Name    | Type        | Description                                              |
| -------------- | ----------- | -------------------------------------------------------- |
| `k1`           | CHAR(64)    | Unique identifier for the withdraw request (hex-encoded) |
| `address`      | TEXT        | Lightning address for the withdraw request               |
| `url`          | TEXT        | Optional URL associated with the withdraw request        |
| `coin`         | TEXT        | Cryptocurrency type (e.g., BTC)                          |
| `amount`       | BIGINT      | Amount to be withdrawn in satoshis                       |
| `is_paid`      | BOOLEAN     | Indicates if the withdraw request has been paid          |
| `expires_at`   | TIMESTAMPTZ | Expiration timestamp for the withdraw request            |
| `created_at`   | TIMESTAMPTZ | Timestamp when the withdraw request was created          |
| `updated_at`   | TIMESTAMPTZ | Timestamp when the withdraw request was last updated     |
| `network`      | TEXT        | Network type (default is 'LIGHTNING')                    |
| `prefix`       | TEXT        | Optional prefix for the withdraw request                 |
| `payee_node`   | TEXT        | Payee node information for the withdraw request          |
| `payment_hash` | TEXT        | Unique payment hash for the withdraw request             |
| `nostr_pubkey` | TEXT        | Nostr public key associated with the withdraw request    |
| `tag`          | TEXT        | Optional tag for categorization                          |
| `comment`      | TEXT        | Optional comment for the withdraw request                |

---

## Installation

NOTE-1: This is a standalone project and does not require any additional dependencies beyond the ones specified in the `package.json` file and `supabase`. This vercel branch is specifically for deploying the project on Vercel. If you want to deploy it on a different platform, you can use the main branch.

NOTE-2: See the [main Branch](https://github.com/Sivothajan/lightning.sivothajan.me/tree/main) for the main project setup and deployment instructions.

1. Clone the repository:

   ```bash
   gh repo clone Sivothajan/lightning.sivothajan.me
   ```

2. Navigate to the project directory:

   ```bash
    cd lightning.sivothajan.me
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Install the `supabase` CLI tool if you haven't already:

   ```bash
   npm install -g supabase
   ```

5. Initialize Supabase in the project directory:

   ```bash
   supabase init
   ```

6. Start the Supabase local development server:

   ```bash
    supabase start
   ```

7. Create the `lightning_data` table in your Supabase database by executing the SQL query provided above.

8. Create a `.env` file in the root directory and add your environment variables as described below.

9. Start the development server:

   ```bash
   npm run dev
   ```

---

### Environment Variables

Create a `.env` file in the root directory and add the following:

```env
# .env.example
# Environment variables for the Binance API
BINANCE_API_KEY=your_binance_Api_key
BINANCE_API_SECRET=your_binance_Api_secret
COIN=BTC
NETWORK=LIGHTNING  # Only LIGHTNING network is supported

# Environment variables for the Supabase API
SUPABASE_URL=https://your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_PAY_REQUEST_TABLE=lightning_pay_request_data  # Table for storing lightning pay request data
SUPABASE_WITHDRAW_REQUEST_TABLE=lightning_withdraw_request_data   # Table for storing lightning withdraw request data

# Environment variables for the Lightning Network
HOST_NAME=lightning.sivothajan.me
NOSTR_PUBLIC_KEY=523dbfa6c2ed3a2a405bcac0ec26a1a27fdb597056a13d9360815903ead12b29
MIN_SENDABLE=1000
MAX_SENDABLE=10000000000
MIN_WITHDRAWABLE=1000
MAX_WITHDRAWABLE=10000000000
IS_NAME_MANDATORY=false
IS_EMAIL_MANDATORY=true
IS_PUBKEY_MANDATORY=false
ALLOWS_NOSTR=true
IS_EMAIL_IDENTIFIER=false
IS_DISPOSABLE_ADDRESS=false
IS_COMMENTS_ALLOWED=false
IS_MESSAGE_IN_SUCCESS_ACTION=true
```

---

## Vercel Serverless functions - Region (**`cdg1`**)

The project is deployed in the **`CDG1`** (Paris) region to ensure compliance with Binance API restrictions, which may block access from certain regions. By specifying this region, the deployment ensures that all API calls to Binance are routed from a region where access is permitted, avoiding potential issues with region-based bans on Binance API.

---

## ⚠️ Usage Warning

This project is intended for developers and users familiar with the **Binance Lightning Network**, **Supabase**, and **Vercel Serverless Functions**. Please be aware of the following when using this project:

- **Experimental Nature**: This project may still be under development or testing. Use it at your own risk, and make sure to thoroughly test in a safe environment before deploying it for production use.
- **Binance API Limitations**: The integration with Binance’s Lightning Network may be subject to rate limits, changes in API functionality, or downtime on their servers. Always check for updates and handle errors gracefully.
- **Security Risks**: Be cautious when handling sensitive information such as API keys, secrets, or user data. Always follow best security practices to avoid exposing sensitive data.
- **Platform Compatibility**: This project relies on **Supabase** and **Vercel**. Ensure that your environment supports these platforms and configurations before using the project in production.

---

### Roadmap

#### LUDs Implementation Status (Serverless implementation)

| LUD Spec | Status |
| -------- | ------ |
| LUD-01   | ✔️     |
| LUD-02   | ✔️     |
| LUD-03   | ✔️     |
| LUD-04   | ✔️     |
| LUD-06   | ✔️     |
| LUD-07   | ✔️     |
| LUD-08   | ✔️     |
| LUD-09   | ✔️     |
| LUD-10   | ✔️     |
| LUD-11   | ✔️     |
| LUD-12   | ✔️     |
| LUD-13   | ✔️     |
| LUD-14   | ✔️     |
| LUD-15   | ✔️     |
| LUD-16   | ✔️     |
| LUD-17   | ✔️     |
| LUD-18   | ✔️     |
| LUD-19   | ✔️     |
| LUD-20   | ✔️     |
| LUD-21   | ✔️     |

> NOTE: The LUDs implementation status is based on the vercel serverless functions.

### npub: [sivothajan.me](https://nosta.me/sivothajan.me)
