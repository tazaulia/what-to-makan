export function sanitizeDishName(name: string): string {
  // Remove any HTML tags
  return name.replace(/<[^>]*>/g, '').trim();
}
