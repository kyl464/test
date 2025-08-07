// utils/api.js
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchKosanList() {
  const res = await fetch(`${API_BASE}/kosan`);
  if (!res.ok) throw new Error("Gagal mengambil data kosan");
  return res.json();
}
