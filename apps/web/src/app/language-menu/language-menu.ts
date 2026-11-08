import { ChangeDetectionStrategy, Component, inject, LOCALE_ID } from '@angular/core';
import { languageFor, languages } from '../languages';

@Component({
  selector: 'details[mfLanguageMenu]',
  template: `
    <summary class="lang-toggle mf-sc">
      <img
        class="lang-flag"
        [src]="'/assets/flags/' + current.code + '.svg'"
        width="21"
        height="14"
        alt=""
      />
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
          >
            <img
              class="lang-flag"
              [src]="'/assets/flags/' + language.code + '.svg'"
              width="21"
              height="14"
              alt=""
            />
            <span>{{ language.name }}</span>
          </a>
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
