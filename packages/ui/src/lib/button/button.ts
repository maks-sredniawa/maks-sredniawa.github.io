import { Directive, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'ghost';
export type ButtonSize = 'regular' | 'small';

@Directive({
  selector: 'a[mfButton]',
  host: {
    class: 'btn',
    '[class.primary]': 'variant() === "primary"',
    '[class.ghost]': 'variant() === "ghost"',
    '[class.small]': 'size() === "small"',
  },
})
export class Button {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('regular');
}
