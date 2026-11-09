// Add publication details to the published GTSinger app without changing its generated bundle.
const app = document.querySelector('#app');
const template = document.querySelector('#publication-template');
const titleText = document.querySelector('meta[name="citation_title"]')?.content;

function removeLegacyResources() {
  // The generated app mounts the same two-icon group on multiple routes.
  for (const code of app.querySelectorAll('.el-main span > a[href="https://github.com/AaronZ345/GTSinger"]')) {
    const codeItem = code.parentElement;
    const group = codeItem.parentElement;
    const dataItem = group.lastElementChild;
    if (group.tagName !== 'DIV' || group.children.length !== 2 ||
        group.firstElementChild !== codeItem || dataItem.tagName !== 'SPAN') continue;

    const data = dataItem.querySelector(':scope > a[href="https://huggingface.co/datasets/AaronZ345/GTSinger"]');
    if (code.textContent.trim() === 'Code' && data?.textContent.trim() === 'Data' &&
        codeItem.querySelector(':scope > svg') && dataItem.querySelector(':scope > svg')) {
      group.remove();
    }
  }
}

function updatePublication() {
  removeLegacyResources();
  const hero = app.querySelector('#home .headgraph > div');
  if (!hero || hero.querySelector(':scope > .publication-meta')) return;

  const [title, lead] = hero.children;
  if (!title || !lead) return;

  title.textContent = titleText;
  title.setAttribute('role', 'heading');
  title.setAttribute('aria-level', '1');
  title.classList.add('publication-title');
  lead.hidden = true;
  // Keep the added block outside Vue's cached title and intro fragment.
  lead.after(template.content.cloneNode(true));
}

if (app && template && titleText) {
  updatePublication();
  new MutationObserver(updatePublication).observe(app, { childList: true, subtree: true });
}
