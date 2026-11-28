const themeToggle = document.querySelector<HTMLButtonElement>('.theme-toggle');
let themePreference: string | null = null;
try { themePreference = localStorage.getItem('ksc-theme'); } catch {}
if (themePreference !== 'light' && themePreference !== 'dark') themePreference = null;
function applyTheme(theme: 'light' | 'dark') {
  document.documentElement.dataset.theme = theme;
  themeToggle?.setAttribute('aria-checked', String(theme === 'dark'));
  const label = themeToggle?.querySelector('.theme-label');
  if (label) label.textContent = theme === 'dark' ? 'Dark' : 'Light';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#17232c' : '#f8f7f3');
}
applyTheme(themePreference === 'dark' ? 'dark' : 'light');
if (themeToggle) themeToggle.hidden = false;
themeToggle?.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  themePreference = theme;
  try { localStorage.setItem('ksc-theme', theme); } catch {}
  applyTheme(theme);
});
window.addEventListener('storage', event => {
  if (event.key !== 'ksc-theme' && event.key !== null) return;
  themePreference = event.newValue === 'light' || event.newValue === 'dark' ? event.newValue : null;
  applyTheme(themePreference === 'dark' ? 'dark' : 'light');
});

const archive = document.querySelector<HTMLElement>('[data-archive]');
if (archive) {
  const search = archive.querySelector<HTMLInputElement>('input[type=search]')!;
  const filters = [...archive.querySelectorAll<HTMLButtonElement>('[data-filter]')];
  const language = archive.querySelector<HTMLSelectElement>('select');
  const entries = [...archive.querySelectorAll<HTMLElement>('[data-archive-entry]')];
  let filter = 'all';
  const update = () => {
    const query = search.value.toLocaleLowerCase().trim();
    let count = 0;
    for (const entry of entries) {
      const matchesLanguage = !language || language.value === 'all' || entry.dataset.language === language.value || entry.dataset.language === 'en-zh';
      const visible = (filter === 'all' || entry.dataset.kind === filter) && matchesLanguage && entry.dataset.search!.toLocaleLowerCase().includes(query);
      entry.hidden = !visible; if (visible) count++;
    }
    archive.querySelector<HTMLElement>('.archive-count')!.textContent = `${count} ${count === 1 ? 'record' : 'records'}`;
    archive.querySelector<HTMLElement>('.no-results')!.hidden = count > 0;
  };
  search.addEventListener('input', update);
  language?.addEventListener('change', update);
  for (const button of filters) button.addEventListener('click', () => {
    filter = button.dataset.filter!;
    for (const item of filters) item.setAttribute('aria-pressed', String(item === button));
    update();
  });
}

const dialog = document.querySelector<HTMLDialogElement>('.art-dialog')!;
const triggers = [...document.querySelectorAll<HTMLElement>('[data-viewer-src], .prose a:has(img)')];
let activeTriggers = triggers;
let current = 0;
let lastTrigger: HTMLElement | undefined;
const image = dialog.querySelector<HTMLImageElement>('img')!;
const previous = dialog.querySelector<HTMLButtonElement>('.viewer-prev')!;
const next = dialog.querySelector<HTMLButtonElement>('.viewer-next')!;
function show(index: number) {
  current = (index + activeTriggers.length) % activeTriggers.length;
  const trigger = activeTriggers[current];
  image.src = trigger.dataset.viewerSrc || trigger.getAttribute('href') || '';
  image.alt = trigger.dataset.viewerCaption || trigger.querySelector('img')?.alt || 'Archive image';
  dialog.querySelector<HTMLElement>('.viewer-caption')!.textContent = image.alt;
  dialog.querySelector<HTMLElement>('.viewer-count')!.textContent = `${current + 1} / ${activeTriggers.length}`;
  previous.disabled = next.disabled = activeTriggers.length < 2;
}
triggers.forEach((trigger) => trigger.addEventListener('click', event => {
  const target = trigger.dataset.viewerSrc || trigger.getAttribute('href') || '';
  if (!/\.(webp|png|jpe?g|gif)(?:$|\?)/i.test(target)) return;
  event.preventDefault();
  lastTrigger = trigger;
  const collectionGroup = trigger.closest('[data-collection]');
  activeTriggers = triggers.filter(item => !item.closest('[hidden]') && (!collectionGroup || collectionGroup.contains(item)));
  show(activeTriggers.indexOf(trigger));
  dialog.showModal();
}));
dialog.querySelector('.viewer-close')?.addEventListener('click', () => dialog.close());
previous.addEventListener('click', () => show(current - 1));
next.addEventListener('click', () => show(current + 1));
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') { event.preventDefault(); show(current - 1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); show(current + 1); }
});
dialog.addEventListener('close', () => lastTrigger?.focus());

const collection = document.querySelector<HTMLElement>('[data-collection]');
if (collection) {
  const toolbar = collection.querySelector<HTMLElement>('.collection-toolbar')!;
  const search = collection.querySelector<HTMLInputElement>('[data-collection-search]')!;
  const medium = collection.querySelector<HTMLSelectElement>('[data-collection-medium]')!;
  const works = [...collection.querySelectorAll<HTMLElement>('[data-collection-work]')];
  const update = () => {
    const query = search.value.trim().toLocaleLowerCase();
    let count = 0;
    for (const work of works) {
      const visible = (medium.value === 'all' || work.dataset.medium === medium.value) && work.dataset.search!.toLocaleLowerCase().includes(query);
      work.hidden = !visible;
      if (visible) count++;
    }
    collection.querySelector<HTMLElement>('.collection-count')!.textContent = `${count} ${count === 1 ? 'painting' : 'paintings'}`;
    for (const section of collection.querySelectorAll<HTMLElement>('[data-collection-section]')) {
      section.querySelector<HTMLElement>('.collection-empty')!.hidden = !!section.querySelector('[data-collection-work]:not([hidden])');
    }
  };
  toolbar.hidden = false;
  search.addEventListener('input', update);
  medium.addEventListener('change', update);
}
