# lightning.sivothajan.me

 custom domain lightning address support for binance lightning nrtwork with the help of Binance API, Supabase and Vercel serverless functions

---

## Database Setup

This project requires a **Supabase** table called `lightning_data`. To set it up, you can run the following SQL query to create the table in your Supabase database.

### Create the `lightning_data` Table

Execute this SQL query to create the table:

```sql
CREATE TABLE public.lightning_data (
    uuid UUID NOT NULL DEFAULT gen_random_uuid(), -- Ensure uuid is generated if not provided
    data JSONB NOT NULL,                          -- Data column to store JSON data
    "isPaid" BOOLEAN DEFAULT FALSE,              -- Default value for isPaid is false
    "savedTime" TIMESTAMPTZ DEFAULT (
        (now() AT TIME ZONE 'utc') AT TIME ZONE 'Asia/Colombo' -- Timezone conversion to Asia/Colombo (change if you want)
    ),
    CONSTRAINT lightning_data_pkey PRIMARY KEY (uuid) -- Set the primary key on the uuid column
) TABLESPACE pg_default;
```

### Table Columns and Description

- **`uuid`**: A universally unique identifier for each entry. This column is of type `UUID` and will automatically generate a value if not provided when a new record is inserted.
  
- **`data`**: A `JSONB` column for storing JSON data. This allows you to store flexible, structured data in each record.

- **`isPaid`**: A boolean value indicating whether the record has been paid. The default value is `false`, meaning that records will be marked as unpaid by default unless updated to `true`.

- **`savedTime`**: A `TIMESTAMPTZ` column storing the timestamp of when the record was created or last updated. The default value is set to the current time in the **Asia/Colombo** time zone. It uses the `now()` function in UTC and converts it to the specified time zone.

---

## Vercel Serverless functions - Region (**`cdg1`**)

The project is deployed in the **`CDG1`** (Paris) region to ensure compliance with Binance API restrictions, which may block access from certain regions. By specifying this region, the deployment ensures that all API calls to Binance are routed from a region where access is permitted, avoiding potential issues with region-based bans on Binance API.

---

### Environment Variables

Create a `.env` file in the root directory and add the following:

```env
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_URL=your_supabase_url
SUPABASE_TABLE=your_supabase_table_name
BINANCE_API_SECRET=your_binance_api_secret
BINANCE_API_KEY=your_binance_api_key
```

---

## ⚠️ Usage Warning

This project is intended for developers and users familiar with the **Binance Lightning Network**, **Supabase**, and **Vercel Serverless Functions**. Please be aware of the following when using this project:

- **Experimental Nature**: This project may still be under development or testing. Use it at your own risk, and make sure to thoroughly test in a safe environment before deploying it for production use.
- **Binance API Limitations**: The integration with Binance’s Lightning Network may be subject to rate limits, changes in API functionality, or downtime on their servers. Always check for updates and handle errors gracefully.
- **Security Risks**: Be cautious when handling sensitive information such as API keys, secrets, or user data. Always follow best security practices to avoid exposing sensitive data.
- **Platform Compatibility**: This project relies on **Supabase** and **Vercel**. Ensure that your environment supports these platforms and configurations before using the project in production.

---

## Roadmap

| LUD Version | Status |
|-------------|--------|
| LUD-01      | - [ ]  |
| LUD-02      | - [ ]  |
| LUD-03      | - [ ]  |
| LUD-04      | - [ ]  |
| LUD-06      | - [x]  |
| LUD-07      | - [ ]  |
| LUD-08      | - [ ]  |
| LUD-09      | - [ ]  |
| LUD-10      | - [ ]  |
| LUD-12      | - [ ]  |
| LUD-13      | - [ ]  |
| LUD-14      | - [ ]  |
| LUD-15      | - [ ]  |
| LUD-16      | - [ ]  |

### npub: [sivothajan.me](https://nosta.me/sivothajan.me)
