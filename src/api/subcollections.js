import { BASE_URL } from './config';

/**
 * Fetches all subcollections (partners) from the API.
 * Each item has: { id, slug, name, category: { slug, name, parent_id, ... }, ... }
 */
export async function fetchSubcollections() {
  const res = await fetch(`${BASE_URL}/api/company/partners`);
  if (!res.ok) throw new Error('Failed to fetch subcollections');
  const json = await res.json();
  const payload = json?.data;
  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.items)) return payload.items;
  return [];
}
