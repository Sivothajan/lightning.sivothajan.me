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