export function highlightText(text: string, keyword: string): string {
  if (!keyword) return text;
  const reg = new RegExp(keyword, 'gi');
  return text.replace(reg, match => `<span class="highlight">${match}</span>`);
}