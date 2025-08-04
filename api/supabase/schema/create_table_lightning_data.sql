CREATE TABLE public.lightning_data (
    uuid UUID NOT NULL DEFAULT gen_random_uuid(),
    address TEXT NOT NULL,
    url TEXT,
    coin TEXT NOT NULL,
    amount BIGINT NOT NULL,
    notstrPubkey TEXT,
    tag TEXT,
    comment TEXT,
    isPaid BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
) TABLESPACE pg_default;