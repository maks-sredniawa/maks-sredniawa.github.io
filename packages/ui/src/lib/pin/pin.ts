import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'li[mfPin]',
  host: { class: 'mf-pin' },
  template: `
    <h3>{{ heading() }}</h3>
    <p class="mf-pin__meta">
      <span class="mf-sc">{{ kind() }}</span>
      <time class="mf-mono" [attr.datetime]="added()">{{ added() }}</time>
    </p>
    <p><ng-content /></p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pin {
  readonly heading = input.required<string>();
  readonly kind = input.required<string>();
  readonly added = input.required<string>();
}
