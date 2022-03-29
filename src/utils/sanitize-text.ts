import sanitizeHtml from 'sanitize-html';

export const clearFromHTML = (text: string) => {
  const withoutBreakLines = text
    .replaceAll('<br>', '\n')
    .replaceAll('<br />', '\n');

  return sanitizeHtml(withoutBreakLines, {
    allowedTags: [],
    allowedAttributes: {}
  });
};