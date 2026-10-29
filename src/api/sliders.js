import { BASE_URL } from './config';

export async function fetchSliders() {
  const res = await fetch(`${BASE_URL}/api/cms/sliders`);
  if (!res.ok) throw new Error('Failed to fetch sliders');
  const data = await res.json();
  // API returns { data: [...] } or array directly
  return Array.isArray(data) ? data : (data.data ?? []);
}
