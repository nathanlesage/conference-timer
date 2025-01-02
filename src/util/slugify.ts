export function slugify (text: string): string {
  // Simple Pandoc-style slugification
  text = text.toLowerCase()
  text = text.normalize('NFC') // Unicode normalization (ö -> o, ç -> c)
  text = text.replace(/[^\sa-z0-9-\.]+/g, '')
  text = text.replace(/\s+/g, '-')
  return text
}
