import { Directive, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'brand';
export type ButtonSize = 'regular' | 'small';

@Directive({
  selector: 'a[mfButton]',
  host: {
    class: 'mf-btn',
    '[class.mf-btn--primary]': 'variant() === "primary"',
    '[class.mf-btn--brand]': 'variant() === "brand"',
    '[class.mf-btn--small]': 'size() === "small"',
  },
})
export class Button {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('regular');
}
