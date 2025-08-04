# lightning.sivothajan.me

custom domain lightning address support for binance lightning nrtwork with the help of Binance API, Supabase and Vercel serverless functions

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
    notstrPubkey TEXT,
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

- **`notstrPubkey`**: A `TEXT` column that stores the public key of the Lightning Network node. This field is optional and can be left empty.

- **`tag`**: A `TEXT` column that can store an optional tag or label for the Lightning Network address. This field is nullable, meaning it can be left empty.

- **`comment`**: A `TEXT` column that can store an optional comment or description for the Lightning Network address. This field is nullable, meaning it can be left empty.

- **`is_paid`**: A boolean value indicating whether the record has been paid. The default value is `false`, meaning that records will be marked as unpaid by default unless updated to `true`.

- **`created_at`**: A timestamp column that records when the entry was created. It defaults to the current timestamp when a new record is inserted.

- **`updated_at`**: A timestamp column that records when the entry was last updated. It defaults to the current timestamp when a new record is inserted and will be updated automatically whenever the record is modified.

---

## Vercel Serverless functions - Region (**`cdg1`**)

The project is deployed in the **`CDG1`** (Paris) region to ensure compliance with Binance API restrictions, which may block access from certain regions. By specifying this region, the deployment ensures that all API calls to Binance are routed from a region where access is permitted, avoiding potential issues with region-based bans on Binance API.

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
```

---

## ⚠️ Usage Warning

This project is intended for developers and users familiar with the **Binance Lightning Network**, **Supabase**, and **Vercel Serverless Functions**. Please be aware of the following when using this project:

- **Experimental Nature**: This project may still be under development or testing. Use it at your own risk, and make sure to thoroughly test in a safe environment before deploying it for production use.
- **Binance API Limitations**: The integration with Binance’s Lightning Network may be subject to rate limits, changes in API functionality, or downtime on their servers. Always check for updates and handle errors gracefully.
- **Security Risks**: Be cautious when handling sensitive information such as API keys, secrets, or user data. Always follow best security practices to avoid exposing sensitive data.
- **Platform Compatibility**: This project relies on **Supabase** and **Vercel**. Ensure that your environment supports these platforms and configurations before using the project in production.

---

### Roadmap

- [ ] LUD-01
- [ ] LUD-02
- [ ] LUD-03
- [ ] LUD-04
- [x] LUD-06
- [ ] LUD-07
- [ ] LUD-08
- [x] LUD-09
- [ ] LUD-10
- [x] LUD-11
- [x] LUD-12
- [ ] LUD-13
- [ ] LUD-14
- [ ] LUD-15
- [x] LUD-16
- [ ] LUD-17
- [ ] LUD-18
- [ ] LUD-19
- [ ] LUD-20
- [x] LUD-21

### npub: [sivothajan.me](https://nosta.me/sivothajan.me)
