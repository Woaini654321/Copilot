export function highlightText(text: string, keyword: string): string {
  if (!keyword) return text;
  // 转义正则表达式特殊字符
  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const reg = new RegExp(`(${escapedKeyword})`, 'gi');
  return text.replace(reg, '<span class="highlight">$1</span>');
}