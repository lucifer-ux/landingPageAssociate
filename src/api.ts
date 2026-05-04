const rawApiBase = import.meta.env.VITE_API_BASE_URL?.trim() ?? '';

const normalizedApiBase = rawApiBase.endsWith('/')
  ? rawApiBase.slice(0, -1)
  : rawApiBase;

export function buildApiUrl(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedApiBase}${normalizedPath}`;
}
