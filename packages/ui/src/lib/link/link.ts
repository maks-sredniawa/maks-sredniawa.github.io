import { Directive, input } from '@angular/core';

export type LinkVariant = 'plain' | 'go';

@Directive({
  selector: 'a[mfLink]',
  host: { class: 'mf-link', '[class.mf-link--go]': 'variant() === "go"' },
})
export class Link {
  readonly variant = input<LinkVariant>('plain');
}
