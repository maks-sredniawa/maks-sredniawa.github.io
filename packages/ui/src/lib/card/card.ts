import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type HeadingLevel = 3 | 4;

/** Project the summary as content and the buttons with the `mfCardAction` attribute. */
@Component({
  selector: 'article[mfCard]',
  host: { class: 'card' },
  template: `
    <img class="icon" [src]="iconSrc()" alt="" width="64" height="64" />
    <div class="card-body">
      @if (headingLevel() === 4) {
        <h4>{{ heading() }}</h4>
      } @else {
        <h3>{{ heading() }}</h3>
      }
      <p class="kind">{{ kind() }}</p>
      <ng-content />
    </div>
    <div class="links"><ng-content select="[mfCardAction]" /></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  readonly iconSrc = input.required<string>();
  readonly heading = input.required<string>();
  readonly kind = input.required<string>();
  readonly headingLevel = input<HeadingLevel>(3);
}
