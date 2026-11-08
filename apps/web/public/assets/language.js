(function () {
  const storageKey = 'mf-language';
  const paths = {
    en: '/',
    pl: '/pl/',
    de: '/de/',
    es: '/es/',
    fr: '/fr/',
    it: '/it/',
    pt: '/pt-br/',
    cs: '/cs/',
    uk: '/uk/',
  };

  function savedLanguage() {
    try {
      return localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  }

  function saveLanguage(language) {
    try {
      localStorage.setItem(storageKey, language);
    } catch {
      return;
    }
  }

  function browserLanguage() {
    for (const tag of navigator.languages) {
      const base = tag.toLowerCase().split('-')[0];
      if (Object.hasOwn(paths, base)) {
        return base;
      }
    }
    return null;
  }

  function openMenus() {
    return document.querySelectorAll('details.lang[open]');
  }

  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const link = target?.closest('a[data-language]');
    if (link) {
      saveLanguage(link.getAttribute('data-language'));
    }
    const clickedMenu = target?.closest('details.lang');
    for (const menu of openMenus()) {
      if (menu !== clickedMenu) {
        menu.open = false;
      }
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') {
      return;
    }
    for (const menu of openMenus()) {
      menu.open = false;
      menu.querySelector('summary')?.focus();
    }
  });

  if (location.pathname !== '/') {
    return;
  }
  const language = savedLanguage() || browserLanguage();
  if (language && language !== 'en' && Object.hasOwn(paths, language)) {
    location.replace(paths[language] + location.search + location.hash);
  }
})();
