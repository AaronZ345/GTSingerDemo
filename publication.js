// Add publication details to the published GTSinger app without changing its generated bundle.
const app = document.querySelector('#app');
const template = document.querySelector('#publication-template');
const titleText = document.querySelector('meta[name="citation_title"]')?.content;

function updatePublication() {
  const hero = app.querySelector('#home .headgraph > div');
  if (!hero) return;

  const [title, lead] = hero.children;
  if (!title || !lead) return;

  if (!hero.querySelector(':scope > .publication-meta')) {
    title.textContent = titleText;
    title.setAttribute('role', 'heading');
    title.setAttribute('aria-level', '1');
    title.classList.add('publication-title');
    lead.hidden = true;
    // Keep the added block outside Vue's cached title and intro fragment.
    lead.after(template.content.cloneNode(true));
  }

  // The original links are mounted again whenever Home is reopened.
  for (const node of hero.children) {
    if (!node.matches('.publication-meta') &&
        node.querySelector('a[href="https://github.com/AaronZ345/GTSinger"]') &&
        node.querySelector('a[href="https://huggingface.co/datasets/AaronZ345/GTSinger"]')) {
      node.hidden = true;
    }
  }
}

if (app && template && titleText) {
  updatePublication();
  new MutationObserver(updatePublication).observe(app, { childList: true, subtree: true });
}
