import axios from 'axios';

const env = import.meta.env as unknown as { VITE_API_URL?: string };
const baseURL = env.VITE_API_URL ?? 'https://smbossbackend.net';

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});