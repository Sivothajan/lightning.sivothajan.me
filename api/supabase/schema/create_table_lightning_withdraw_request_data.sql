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