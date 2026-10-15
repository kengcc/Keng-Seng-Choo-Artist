const themeToggle = document.querySelector<HTMLButtonElement>('.theme-toggle');
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
let themePreference: string | null = null;
try { themePreference = localStorage.getItem('ksc-theme'); } catch {}
if (themePreference !== 'light' && themePreference !== 'dark') themePreference = null;
function applyTheme(theme: 'light' | 'dark') {
  document.documentElement.dataset.theme = theme;
  themeToggle?.setAttribute('aria-checked', String(theme === 'dark'));
  const label = themeToggle?.querySelector('.theme-label');
  if (label) label.textContent = theme === 'dark' ? 'Dark' : 'Light';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#191f1d' : '#f7f5ef');
}
applyTheme(themePreference === 'light' || themePreference === 'dark' ? themePreference : systemTheme.matches ? 'dark' : 'light');
if (themeToggle) themeToggle.hidden = false;
themeToggle?.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  themePreference = theme;
  try { localStorage.setItem('ksc-theme', theme); } catch {}
  applyTheme(theme);
});
systemTheme.addEventListener('change', event => {
  if (!themePreference) applyTheme(event.matches ? 'dark' : 'light');
});
window.addEventListener('storage', event => {
  if (event.key !== 'ksc-theme' && event.key !== null) return;
  themePreference = event.newValue === 'light' || event.newValue === 'dark' ? event.newValue : null;
  applyTheme(themePreference || (systemTheme.matches ? 'dark' : 'light'));
});

const menu = document.querySelector<HTMLButtonElement>('.menu-toggle');
const nav = document.querySelector<HTMLElement>('#primary-nav');
menu?.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!expanded));
  nav?.classList.toggle('is-open', !expanded);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
    menu.setAttribute('aria-expanded', 'false'); nav?.classList.remove('is-open'); menu.focus();
  }
});

const archive = document.querySelector<HTMLElement>('[data-archive]');
if (archive) {
  const search = archive.querySelector<HTMLInputElement>('input[type=search]')!;
  const filters = [...archive.querySelectorAll<HTMLButtonElement>('[data-filter]')];
  const entries = [...archive.querySelectorAll<HTMLElement>('[data-archive-entry]')];
  let filter = 'all';
  const update = () => {
    const query = search.value.toLocaleLowerCase().trim();
    let count = 0;
    for (const entry of entries) {
      const visible = (filter === 'all' || entry.dataset.kind === filter) && entry.dataset.search!.toLocaleLowerCase().includes(query);
      entry.hidden = !visible; if (visible) count++;
    }
    archive.querySelector<HTMLElement>('.archive-count')!.textContent = `${count} ${count === 1 ? 'article' : 'articles'}`;
    archive.querySelector<HTMLElement>('.no-results')!.hidden = count > 0;
  };
  search.addEventListener('input', update);
  for (const button of filters) button.addEventListener('click', () => {
    filter = button.dataset.filter!;
    for (const item of filters) item.setAttribute('aria-pressed', String(item === button));
    update();
  });
}

const dialog = document.querySelector<HTMLDialogElement>('.art-dialog')!;
const triggers = [...document.querySelectorAll<HTMLElement>('[data-viewer-src], .prose a:has(img)')];
let current = 0;
let lastTrigger: HTMLElement | undefined;
const image = dialog.querySelector<HTMLImageElement>('img')!;
const previous = dialog.querySelector<HTMLButtonElement>('.viewer-prev')!;
const next = dialog.querySelector<HTMLButtonElement>('.viewer-next')!;
function show(index: number) {
  current = (index + triggers.length) % triggers.length;
  const trigger = triggers[current];
  image.src = trigger.dataset.viewerSrc || trigger.getAttribute('href') || '';
  image.alt = trigger.dataset.viewerCaption || trigger.querySelector('img')?.alt || 'Archive image';
  dialog.querySelector<HTMLElement>('.viewer-caption')!.textContent = image.alt;
  dialog.querySelector<HTMLElement>('.viewer-count')!.textContent = `${current + 1} / ${triggers.length}`;
  previous.disabled = next.disabled = triggers.length < 2;
}
triggers.forEach((trigger, index) => trigger.addEventListener('click', event => {
  const target = trigger.dataset.viewerSrc || trigger.getAttribute('href') || '';
  if (!/\.(webp|png|jpe?g|gif)(?:$|\?)/i.test(target)) return;
  event.preventDefault(); lastTrigger = trigger; show(index); dialog.showModal();
}));
dialog.querySelector('.viewer-close')?.addEventListener('click', () => dialog.close());
previous.addEventListener('click', () => show(current - 1));
next.addEventListener('click', () => show(current + 1));
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') { event.preventDefault(); show(current - 1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); show(current + 1); }
});
dialog.addEventListener('close', () => lastTrigger?.focus());
