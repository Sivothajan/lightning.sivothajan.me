import express from "express";
import bolt11 from "bolt11";

const app = express();
app.use(express.json());

// Root: API documentation
app.get("/bolt11", (req, res) => {
  res.json({
    name: "BOLT11 Invoice API",
    description: "Encode, decode, and re-encode BOLT11 Lightning invoices",
    endpoints: {
      "/bolt11/decode/:invoice": {
        method: "GET or POST",
        description: "Decode a BOLT11 invoice",
        example: "/bolt11/decode/lnbc1...",
      },
      "/bolt11/encode": {
        method: "POST",
        description: "Encode a new BOLT11 invoice",
      },
      "/bolt11/reencode": {
        method: "POST",
        description: "Re-encode a decoded invoice with minimal fields",
      },
    },
  });
});

// Decode BOLT11 invoice
app.all("/bolt11/decode/:invoice", (req, res) => {
  const { invoice } = req.params;
  try {
    const decoded = bolt11.decode(invoice);
    res.json({ ...decoded, tagsObject: decoded.tagsObject });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Invalid invoice format", details: err.message });
  }
});

// Encode BOLT11 invoice
app.post("/bolt11/encode", (req, res) => {
  const { satoshis, network, tags, timestamp } = req.body;
  if (!satoshis || !network || !tags) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const invoice = bolt11.encode({
      network,
      satoshis,
      timestamp: timestamp || Math.floor(Date.now() / 1000),
      tags,
    });
    res.json({ invoice });
  } catch (err) {
    res.status(500).json({ error: "Failed to encode", details: err.message });
  }
});

// Re-encode BOLT11 invoice (minimized)
app.post("/bolt11/reencode", (req, res) => {
  try {
    const { paymentRequest } = req.body;
    const decoded = bolt11.decode(paymentRequest);
    const minimal = buildMinimalInvoiceInput(decoded);
    const invoice = bolt11.encode(minimal);
    res.json({ invoice });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Failed to re-encode", details: err.message });
  }
});

// Not found handler
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found", path: req.originalUrl });
});

// Helper function to minimize invoice input
function buildMinimalInvoiceInput(decoded) {
  const importantTags = [
    "purpose_commit_hash",
    "payment_hash",
    "fallback_address",
    "expire_time",
    "payment_secret",
    "feature_bits",
  ];

  const tags = decoded.tags
    .filter((tag) => importantTags.includes(tag.tagName))
    .map((tag) => {
      if (tag.tagName === "fallback_address") {
        return {
          tagName: tag.tagName,
          data: { address: tag.data.address },
        };
      }

      if (tag.tagName === "feature_bits") {
        return {
          tagName: tag.tagName,
          data: {
            payment_secret: tag.data?.payment_secret,
          },
        };
      }

      return tag;
    });

  return {
    network: decoded.network,
    satoshis: decoded.satoshis,
    timestamp: decoded.timestamp,
    tags,
  };
}

export default app;

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

app.listen(port, () => {
  console.log("\x1b[33m%s\x1b[0m", `⚡ Bolt11 Server launched on port ${port}`);
  console.log(
    "\x1b[35m%s\x1b[0m",
    `🌐 Bolt11 Server URL: http://${host || "localhost"}:${port}/bolt11`,
  );
});
