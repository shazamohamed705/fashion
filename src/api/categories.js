import { BASE_URL } from './config';

export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/api/catalog/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  const json = await res.json();
  const payload = json?.data;
  // Live API returns { data: { items: [...] } }; some responses return { data: [...] }
  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.items)) return payload.items;
  // API may return { data: { categories: [...] } }
  if (payload && Array.isArray(payload.categories)) return payload.categories;
  return [];
}

/** Fetch a single category by id — returns { category, products } */
export async function fetchCategoryById(id) {
  const res = await fetch(`${BASE_URL}/api/catalog/categories/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch category ${id}`);
  const json = await res.json();
  // API returns { data: { category: {...}, products: { items: [...], meta: {...} } } }
  return json?.data ?? null;
}
