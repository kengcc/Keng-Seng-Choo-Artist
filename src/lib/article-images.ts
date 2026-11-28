import media from '../data/reference-media.json';

export function articlePreview(entry: { data: { referenceImageId?: string }; body?: string }) {
  const selected = media.find(image => image.id === entry.data.referenceImageId);
  return selected ? ('thumbnail' in selected && selected.thumbnail ? selected.thumbnail : selected.image)
    : entry.body?.match(/\]\((\/media\/[^\s)]+\.(?:webp|png|jpe?g|gif))/i)?.[1];
}
