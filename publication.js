// Add publication details to the published GTSinger app without changing its generated bundle.
const app = document.querySelector('#app');
const template = document.querySelector('#publication-template');
const titleText = document.querySelector('meta[name="citation_title"]')?.content;

function updatePublication() {
  const hero = app.querySelector('#home .headgraph > div');
  if (!hero || hero.querySelector('.publication-meta')) return;

  const [title, lead, ...rest] = hero.children;
  if (!title || !lead) return;
  const legacyLinks = rest.find((node) =>
    node.querySelector('a[href="https://github.com/AaronZ345/GTSinger"]') &&
    node.querySelector('a[href="https://huggingface.co/datasets/AaronZ345/GTSinger"]')
  );

  title.textContent = titleText;
  title.setAttribute('role', 'heading');
  title.setAttribute('aria-level', '1');
  title.classList.add('publication-title');
  lead.hidden = true;
  title.after(template.content.cloneNode(true));
  if (legacyLinks) legacyLinks.hidden = true;
}

if (app && template && titleText) {
  updatePublication();
  new MutationObserver(updatePublication).observe(app, { childList: true, subtree: true });
}
