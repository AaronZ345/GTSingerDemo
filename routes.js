// GitHub Pages serves unknown paths through 404.html, including this app's history routes.
(() => {
  const script = document.currentScript;
  const base = new URL('.', script.src).pathname;
  const routes = new Set(['home', 'dataset', 'csv', 'tr', 'st', 'sts', 's']);
  const key = '__gtsinger_route';
  const params = new URLSearchParams(location.search);
  const query = () => params.size ? '?' + params.toString() : '';

  if (script.hasAttribute('data-fallback')) {
    if (!location.pathname.startsWith(base)) return;
    const route = location.pathname.slice(base.length).replace(/\/$/, '');
    if (!routes.has(route)) return;
    params.set(key, route);
    location.replace(base + query() + location.hash);
    return;
  }

  const route = params.get(key);
  if (location.pathname !== base || !routes.has(route)) return;
  params.delete(key);
  history.replaceState(null, '', base + route + query() + location.hash);
})();
