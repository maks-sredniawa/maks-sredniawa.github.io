import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'li[mfIdeaCard]',
  host: { '[attr.data-added]': 'added()' },
  template: `
    <h3>{{ heading() }}</h3>
    <p class="kind">{{ kind() }}</p>
    <p><ng-content /></p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdeaCard {
  readonly heading = input.required<string>();
  readonly kind = input.required<string>();
  readonly added = input.required<string>();
}
