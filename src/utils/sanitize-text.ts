import sanitizeHtml from 'sanitize-html';

export const clearFromHTML = (text: string) => {
  const withoutBreakLines = text
    .replaceAll('﻿', '')
    .replaceAll('<br>', '\n')
    .replaceAll('<br />', '\n');

  const sanitizedTextWithImages = sanitizeHtml(withoutBreakLines, {
    allowedTags: ['img'],
    allowedAttributes: {
      img: ['src']
    }
  });

  return sanitizedTextWithImages
    .replaceAll('<img src="', ' Image: ')
    .replaceAll('" />', ' ')
    .replaceAll('  ', ' ') // clean if we messed up somewhere with extra spaces
};