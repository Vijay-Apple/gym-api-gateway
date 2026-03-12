import express from "express";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";
dotenv.config();

const app = express();
app.use(express.json());

// ==================
// Routes as Proxy
// ==================

// Auth Service
app.use(
    "/api/auth",
    createProxyMiddleware({
        target: process.env.AUTH_URL,
        changeOrigin: true
    })
);

app.use(
    "/api/chat",
    createProxyMiddleware({
        target: process.env.CHAT_URL,
        changeOrigin: true
    })
);

app.use(
    "/api/payment",
    createProxyMiddleware({
        target: process.env.PAYMENT_URL,
        changeOrigin: true
    })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API Gateway running on ${PORT}`));
