import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Project the pitch as content; it opens under the name. */
@Component({
  selector: 'li[mfIdea]',
  host: { class: 'mf-idea' },
  template: `
    <details>
      <summary>
        <span class="mf-idea__name">{{ heading() }}</span>
        <span class="mf-idea__kind mf-sc">{{ kind() }}</span>
      </summary>
      <p><ng-content /></p>
    </details>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Idea {
  readonly heading = input.required<string>();
  readonly kind = input.required<string>();
}
