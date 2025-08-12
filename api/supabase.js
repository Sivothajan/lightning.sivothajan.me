// supabase.js (enhanced)
export const config = {
  runtime: "edge",
};

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const DEFAULT_SCHEMA = process.env.NEXT_PUBLIC_SUPABASE_SCHEMA || "public";

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
  );
}

function toArray(v) {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

function buildOrderParam(order) {
  // order can be string "created_at.desc.nullslast"
  // or array of { column, ascending=true, nulls='last' }
  if (typeof order === "string") return order;
  const parts = toArray(order).map((o) => {
    const dir = o.ascending === false ? "desc" : "asc";
    const nulls =
      o.nulls === "first"
        ? ".nullsfirst"
        : o.nulls === "last"
          ? ".nullslast"
          : "";
    return `${encodeURIComponent(o.column)}.${dir}${nulls}`;
  });
  return parts.join(",");
}

function mergePrefer(base, extra) {
  const b = toArray(base).join(",");
  const e = toArray(extra).join(",");
  const all = [b, e].filter(Boolean).join(",");
  const tokens = [
    ...new Set(
      all
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    ),
  ];
  return tokens.join(",");
}

/**
 * Minimal-but-featured Supabase REST helper for Edge
 * @param {string} method - GET | POST | PATCH | DELETE
 * @param {string} table  - Table name
 * @param {object} [opts]
 *  - select, eq, filters, order, limit, offset, onConflict, upsert
 *  - insert, update
 *  - single, maybeSingle
 *  - count: 'exact' | 'planned' | 'estimated'
 *  - schema, jwt, prefer, cache ('no-store' by default), signal, headers, next
 */
async function sb(method, table, opts = {}) {
  const {
    select,
    eq,
    filters, // [{ column, op, value }]
    order,
    limit,
    offset,
    onConflict, // string | array
    upsert, // boolean
    insert,
    update,
    single, // return a single object (throws if >1)
    maybeSingle, // return a single object or null if none
    count, // 'exact' | 'planned' | 'estimated'
    schema = DEFAULT_SCHEMA,
    jwt,
    prefer,
    cache = "no-store", // avoid Next.js edge caching by default
    signal,
    headers: extraHeaders,
    next,
  } = opts;

  const url = new URL(`${SUPABASE_URL}/rest/v1/${encodeURIComponent(table)}`);

  // Query params
  if (select) url.searchParams.set("select", select);
  if (eq) {
    Object.entries(eq).forEach(([k, v]) => {
      url.searchParams.set(k, `eq.${v}`);
    });
  }
  if (filters) {
    for (const { column, op = "eq", value } of filters) {
      if (op === "in" && Array.isArray(value)) {
        url.searchParams.set(
          column,
          `in.(${value.map(encodeURIComponent).join(",")})`,
        );
      } else if (op === "is") {
        url.searchParams.set(column, `is.${value}`); // e.g. null
      } else {
        url.searchParams.set(column, `${op}.${value}`);
      }
    }
  }
  if (order) url.searchParams.set("order", buildOrderParam(order));
  if (limit != null) url.searchParams.set("limit", String(limit));
  if (offset != null) url.searchParams.set("offset", String(offset));
  if (onConflict) {
    const oc = Array.isArray(onConflict) ? onConflict.join(",") : onConflict;
    url.searchParams.set("on_conflict", oc);
  }

  // Headers
  const hdrs = {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${jwt || SUPABASE_KEY}`,
    "Content-Type": "application/json",
    "Accept-Profile": schema,
    "Content-Profile": schema,
    ...(single ? { Accept: "application/vnd.pgrst.object+json" } : {}),
    ...(extraHeaders || {}),
  };

  // Prefer
  let preferHeader = prefer || "";
  if (count) preferHeader = mergePrefer(preferHeader, `count=${count}`);
  // For writes, default to returning rows to avoid 204s breaking res.json()
  if (method !== "GET" && method !== "HEAD") {
    preferHeader = mergePrefer(preferHeader, "return=representation");
    if (upsert)
      preferHeader = mergePrefer(preferHeader, "resolution=merge-duplicates");
  }
  if (preferHeader) hdrs.Prefer = preferHeader;

  const body =
    insert != null
      ? JSON.stringify(insert)
      : update != null
        ? JSON.stringify(update)
        : undefined;

  const res = await fetch(url.toString(), {
    method,
    headers: hdrs,
    body,
    cache,
    signal,
    next,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const err = new Error(text || `HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }

  if (res.status === 204) return single || maybeSingle ? null : []; // No content

  const isJson = (res.headers.get("content-type") || "").includes(
    "application/json",
  );
  const data = isJson ? await res.json() : null;

  if (count) {
    const cr = res.headers.get("content-range"); // e.g. "0-9/123"
    const total = cr && cr.includes("/") ? Number(cr.split("/")[1]) : null;
    return { data, count: Number.isFinite(total) ? total : null };
  }

  return data;
}

/**
 * Call PostgREST RPC function: /rest/v1/rpc/{fn}
 * @param {string} fn
 * @param {object} params
 * @param {object} [opts] - { schema, jwt, prefer, cache, signal, headers }
 */
async function rpc(fn, params = {}, opts = {}) {
  const {
    schema = DEFAULT_SCHEMA,
    jwt,
    prefer,
    cache = "no-store",
    signal,
    headers: extraHeaders,
    next,
  } = opts;

  const url = `${SUPABASE_URL}/rest/v1/rpc/${encodeURIComponent(fn)}`;
  const headers = {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${jwt || SUPABASE_KEY}`,
    "Content-Type": "application/json",
    "Accept-Profile": schema,
    "Content-Profile": schema,
    ...(prefer ? { Prefer: toArray(prefer).join(",") } : {}),
    ...(extraHeaders || {}),
  };

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(params),
    cache,
    signal,
    next,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const err = new Error(text || `HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }

  if (res.status === 204) return null;
  return (res.headers.get("content-type") || "").includes("application/json")
    ? res.json()
    : null;
}

const supabasePayRequestTable =
  process.env.NEXT_PUBLIC_SUPABASE_PAY_REQUEST_TABLE ||
  process.env.SUPABASE_PAY_REQUEST_TABLE;
const supabaseWithdrawRequestTable =
  process.env.NEXT_PUBLIC_SUPABASE_WITHDRAW_REQUEST_TABLE ||
  process.env.SUPABASE_WITHDRAW_REQUEST_TABLE;

// Withdraw

export const checkWithdrawRequestStatus = async (k1) => {
  try {
    const row = await sb("GET", supabaseWithdrawRequestTable, {
      select: "is_paid",
      eq: { k1 },
      limit: 1,
      single: true,
    });
    return !!row?.is_paid;
  } catch (e) {
    console.error("checkWithdrawRequestStatus:", e);
    return false;
  }
};

export const getWithdrawRequestData = async (k1) => {
  try {
    return await sb("GET", supabaseWithdrawRequestTable, {
      select: "*",
      eq: { k1 },
    });
  } catch (e) {
    console.error("getWithdrawRequestData:", e);
    return [];
  }
};

export const saveWithdrawRequestData = async (k1, pr) => {
  try {
    const d = await fetch(`/bolt11/decode/${pr}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    if (!d?.paymentRequest) {
      console.error("Invalid invoice (pr). Decoding failed.");
      return null;
    }

    const amountMsat =
      Number(d.millisatoshis) || (d.satoshis ? Number(d.satoshis) * 1000 : 0);

    const row = {
      k1,
      address: d.paymentRequest,
      url: `https://lightningdecoder.com/${d.paymentRequest}`,
      coin: "BTC",
      amount: amountMsat,
      network: d.network?.bech32 || null,
      prefix: d.prefix || null,
      payee_node: d.payeeNodeKey || null,
      payment_hash:
        d.tags?.find?.((t) => t.tagName === "payment_hash")?.data || null,
      expires_at: d.timeExpireDateString || null,
      is_paid: false,
    };

    const inserted = await sb("POST", supabaseWithdrawRequestTable, {
      insert: row,
      // prefer: 'return=representation' is defaulted for writes
    });

    // PostgREST returns an array for inserts; pick first if needed
    return Array.isArray(inserted) ? inserted[0] : inserted;
  } catch (e) {
    console.error("saveWithdrawRequestData:", e);
    return null;
  }
};

export const updateWithdrawStatus = async (k1, is_paid) => {
  try {
    const updated = await sb("PATCH", supabaseWithdrawRequestTable, {
      eq: { k1 },
      update: { is_paid },
    });
    return Array.isArray(updated) ? updated.length > 0 : !!updated;
  } catch (e) {
    console.error("updateWithdrawStatus:", e);
    return false;
  }
};

// Pay

export const checkPayRequestStatus = async (uuid) => {
  try {
    const row = await sb("GET", supabasePayRequestTable, {
      select: "is_paid",
      eq: { uuid },
      limit: 1,
      single: true,
    });
    return !!row?.is_paid;
  } catch (e) {
    console.error("checkPayRequestStatus:", e);
    return false;
  }
};

export const getPayRequestData = async (uuid) => {
  try {
    return await sb("GET", supabasePayRequestTable, {
      select: "*",
      eq: { uuid },
    });
  } catch (e) {
    console.error("getPayRequestData:", e);
    return [];
  }
};

export const savePayRequestData = async (uuid, paymentData) => {
  try {
    const inserted = await sb("POST", supabasePayRequestTable, {
      insert: {
        uuid,
        address: paymentData.address,
        url: paymentData.url || null,
        coin: paymentData.coin,
        amount: paymentData.amount,
        nostr_pubkey: paymentData.nostr_pubkey || null,
        tag: paymentData.tag || null,
        comment: paymentData.comment || null,
        is_paid: false,
      },
    });
    return Array.isArray(inserted) ? inserted[0] : inserted;
  } catch (e) {
    console.error("savePayRequestData:", e);
    return null;
  }
};

export const updatePayRequestStatus = async (uuid, is_paid) => {
  try {
    const updated = await sb("PATCH", supabasePayRequestTable, {
      eq: { uuid },
      update: { is_paid },
    });
    return Array.isArray(updated) ? updated.length > 0 : !!updated;
  } catch (e) {
    console.error("updatePayRequestStatus:", e);
    return false;
  }
};
