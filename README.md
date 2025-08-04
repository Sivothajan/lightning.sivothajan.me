# lightning.sivothajan.me

custom domain lightning address support for binance lightning nrtwork with the help of Binance API and Supabase

---

## Database Setup

This project requires a **Supabase** table called `lightning_data`. To set it up, you can run the following SQL query to create the table in your Supabase database.

### Create the `lightning_data` Table

Execute this SQL query to create the table:

```sql
CREATE TABLE public.lightning_data (
    uuid UUID NOT NULL DEFAULT gen_random_uuid(),
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
) TABLESPACE pg_default;
```

### Table Columns and Description

- **`uuid`**: A universally unique identifier for each entry. This column is of type `UUID` and will automatically generate a value if not provided when a new record is inserted.

- **`address`**: A `TEXT` column that stores the Lightning Network address. This field is required and cannot be null.

- **`url`**: A `TEXT` column that can store an optional URL associated with the Lightning Network address. This field is nullable, meaning it can be left empty.

- **`coin`**: A `TEXT` column that specifies the type of cryptocurrency associated with the Lightning Network address. This field is required and cannot be null.

- **`amount`**: A `BIGINT` column that stores the amount of cryptocurrency in satoshis (the smallest unit of Bitcoin). This field is required and cannot be null.

- **`nostr_pubkey`**: A `TEXT` column that stores the public key of the Lightning Network node. This field is optional and can be left empty.

- **`tag`**: A `TEXT` column that can store an optional tag or label for the Lightning Network address. This field is nullable, meaning it can be left empty.

- **`comment`**: A `TEXT` column that can store an optional comment or description for the Lightning Network address. This field is nullable, meaning it can be left empty.

- **`is_paid`**: A boolean value indicating whether the record has been paid. The default value is `false`, meaning that records will be marked as unpaid by default unless updated to `true`.

- **`created_at`**: A timestamp column that records when the entry was created. It defaults to the current timestamp when a new record is inserted.

- **`updated_at`**: A timestamp column that records when the entry was last updated. It defaults to the current timestamp when a new record is inserted and will be updated automatically whenever the record is modified.

---

## Installation

NOTE-1: This is a standalone project and does not require any additional dependencies beyond the ones specified in the `package.json` file and `supabase`. This main branch is for self-hosting on your own server or local environment.

NOTE-2: See the [Vercel Branch](<[https://](https://github.com/Sivothajan/lightning.sivothajan.me/tree/vercel)>) for deploy in Vercel.

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
NETWORK=LIGHTNING

# Environment variables for the Supabase API
SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=https://your_supabase_anon_key
SUPABASE_TABLE=your_supabase_table

# Environment variables for the Lightning Network
HOST_NAME=lightning.sivothajan.me
NOSTR_PUBLIC_KEY=79f00d3f5a19ec806189fcab03c1be4ff81d18ee4f653c88fac41fe03570f432
MIN_SENDABLE=1000
MAX_SENDABLE=10000000000
IS_NAME_MANDATORY=false
IS_EMAIL_MANDATORY=true
IS_PUBKEY_MANDATORY=false
ALLOWS_NOSTR=true
IS_EMAIL_IDENTIFIER=false
IS_DISPOSABLE_ADDRESS=false
IS_MESSAGE_IN_SUCCESS_ACTION=true
```

---

## ⚠️ Usage Warning

This project is intended for developers and users familiar with the **Binance Lightning Network** and **Supabase**. Please be aware of the following when using this project:

- **Experimental Nature**: This project may still be under development or testing. Use it at your own risk, and make sure to thoroughly test in a safe environment before deploying it for production use.
- **Binance API Limitations**: The integration with Binance’s Lightning Network may be subject to rate limits, changes in API functionality, or downtime on their servers. Always check for updates and handle errors gracefully.
- **Security Risks**: Be cautious when handling sensitive information such as API keys, secrets, or user data. Always follow best security practices to avoid exposing sensitive data.
- **Platform Compatibility**: This project relies on **Supabase**. Ensure that your environment supports **supabase** platform and configurations before using the project in production.

---

### Roadmap

| LUD Spec | Status |
| -------- | ------ |
| LUD-01   | ❌     |
| LUD-02   | ❌     |
| LUD-03   | ❌     |
| LUD-04   | ❌     |
| LUD-06   | ✔️     |
| LUD-07   | ❌     |
| LUD-08   | ❌     |
| LUD-09   | ✔️     |
| LUD-10   | ✔️     |
| LUD-11   | ✔️     |
| LUD-12   | ✔️     |
| LUD-13   | ❌     |
| LUD-14   | ❌     |
| LUD-15   | ❌     |
| LUD-16   | ✔️     |
| LUD-17   | ❌     |
| LUD-18   | ❌     |
| LUD-19   | ❌     |
| LUD-20   | ❌     |
| LUD-21   | ✔️     |

### npub: [sivothajan.me](https://nosta.me/sivothajan.me)
