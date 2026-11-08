(function () {
  const storageKey = 'mf-language';
  const tabNamePrefix = 'mf-language:';
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
      return window.name.startsWith(tabNamePrefix) ? window.name.slice(tabNamePrefix.length) : null;
    }
  }

  function saveLanguage(language) {
    try {
      localStorage.setItem(storageKey, language);
    } catch {
      window.name = tabNamePrefix + language;
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

  function closeMenusOutside(target) {
    for (const menu of openMenus()) {
      if (!menu.contains(target)) {
        menu.open = false;
      }
    }
  }

  document.addEventListener('click', (event) => {
    const link = event.target instanceof Element && event.target.closest('a[data-language]');
    if (link) {
      saveLanguage(link.getAttribute('data-language'));
    }
    closeMenusOutside(event.target);
  });

  document.addEventListener('focusin', (event) => {
    closeMenusOutside(event.target);
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
