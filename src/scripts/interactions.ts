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
