import axios from 'axios';

const baseURL =
  process.env.NEXT_PUBLIC_API_URL ??
  process.env.VITE_API_URL ??
  'https://dpbossbackend.net';

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});
