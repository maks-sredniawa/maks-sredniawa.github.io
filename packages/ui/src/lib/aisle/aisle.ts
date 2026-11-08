import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'div[mfAisle]',
  host: { class: 'mf-aisle' },
  template: `
    <div class="mf-aisle__label">
      <h3>{{ heading() }}</h3>
      <p>{{ note() }}</p>
    </div>
    <ng-content />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Aisle {
  readonly heading = input.required<string>();
  readonly note = input.required<string>();
}
