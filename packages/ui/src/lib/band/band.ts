import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { type Status, Tag } from '../tag/tag';

export type BandTone = 'plain' | 'tint' | 'dark';

/** Project the band's aisles as content; the head shows the heading, blurb and status tag. */
@Component({
  selector: 'section[mfBand]',
  imports: [Tag],
  host: {
    class: 'mf-band',
    '[class.mf-band--tint]': 'tone() === "tint"',
    '[class.mf-band--dark]': 'tone() === "dark"',
  },
  template: `
    <div class="mf-wrap">
      <div class="mf-band-head">
        <div>
          <h2>{{ heading() }}</h2>
          <p>{{ blurb() }}</p>
        </div>
        <span [mfTag]="status()">{{ statusLabel() }}</span>
      </div>
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Band {
  readonly heading = input.required<string>();
  readonly blurb = input.required<string>();
  readonly status = input.required<Status>();
  readonly statusLabel = input.required<string>();
  readonly tone = input<BandTone>('plain');
}
