/**
 * Turns any string into a slug-version, ensuring it only includes the letters
 * a-z, numbers 0-9, and dashes, all in lowercase.
 *
 * @param   {string}  text  The text to slugify
 *
 * @return  {string}        The slug
 */
export function slugify (text: string): string {
  // Simple Pandoc-style slugification
  text = text.toLowerCase()
  text = text.normalize('NFC') // Unicode normalization (ö -> o, ç -> c)
  text = text.replace(/[^\sa-z0-9-\.]+/g, '')
  text = text.replace(/\s+/g, '-')
  return text
}

/**
 * Utility function that ensures that a list of objects, each of which have a
 * "slug" property, those slugs are unique by appending "-1", "-2", etc. to
 * them. NOTE: This modifies the objects in place!
 *
 * @param  {Array<T & { slug: string }>}  items  The items to check
 */
export function ensureUniqueSlugs<T>(items: Array<T & { slug: string }>): void {
  const seenSlugs: string[] = []
  for (const item of items) {
    if (!seenSlugs.includes(item.slug)) {
      seenSlugs.push(item.slug)
      continue
    }

    // The slug already exists -> append "-1", "-2", etc., until the slug is unique
    let counter = 2 // "my-slug" is the first, and "my-slug-2" is the second
    while (seenSlugs.find(slug => slug === item.slug + '-' + String(counter)) !== undefined) {
      counter++
    }
    item.slug += '-' + String(counter)
    seenSlugs.push(item.slug)
  }
}
