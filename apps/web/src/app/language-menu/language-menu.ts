import { ChangeDetectionStrategy, Component, inject, LOCALE_ID } from '@angular/core';
import { languageFor, languages } from '../languages';

@Component({
  selector: 'details[mfLanguageMenu]',
  template: `
    <summary class="lang-toggle mf-sc">
      <svg
        class="lang-glyph"
        viewBox="0 0 16 16"
        width="14"
        height="14"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.2" />
        <ellipse
          cx="8"
          cy="8"
          rx="2.6"
          ry="6.5"
          fill="none"
          stroke="currentColor"
          stroke-width="1.2"
        />
        <path
          d="M1.5 8h13M2.3 5h11.4M2.3 11h11.4"
          fill="none"
          stroke="currentColor"
          stroke-width="1.2"
        />
      </svg>
      <span class="mf-sr" i18n>Language:</span>
      <span [attr.lang]="current.code">{{ current.name }}</span>
    </summary>
    <ul class="lang-menu" i18n-aria-label aria-label="Languages">
      @for (language of languages; track language.code) {
        <li>
          <a
            [href]="language.path"
            [attr.hreflang]="language.code"
            [attr.lang]="language.code"
            [attr.data-language]="language.key"
            [attr.aria-current]="language === current ? 'page' : null"
            >{{ language.name }}</a
          >
        </li>
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'lang' },
})
export class LanguageMenu {
  protected readonly languages = languages;
  protected readonly current = languageFor(inject(LOCALE_ID));
}
