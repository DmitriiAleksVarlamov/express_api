import express from 'express';
import path from 'node:path';
import { createProxyMiddleware } from 'http-proxy-middleware';

function staticFilesMiddleware() {
  process.env.NODE_ENV !== 'development'
    ? express.static(path.resolve(__dirname, '../../client/dist'))
    : createProxyMiddleware({
        target: 'http://localhost:5173/',
        changeOrigin: true,
      });
}

export { staticFilesMiddleware };
