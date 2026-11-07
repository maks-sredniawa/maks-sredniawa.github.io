import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Stamp } from '../stamp/stamp';

/** Project the text as content and the buttons with the `mfNoticeAction` attribute. */
@Component({
  selector: 'aside[mfNotice]',
  imports: [Stamp],
  host: { class: 'mf-notice' },
  template: `
    @if (stamp()) {
      <span mfStamp>{{ stamp() }}</span>
    }
    <p class="mf-notice__kicker mf-sc">{{ kicker() }}</p>
    <h2>{{ heading() }}</h2>
    <p><ng-content /></p>
    <div class="mf-notice__actions"><ng-content select="[mfNoticeAction]" /></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Notice {
  readonly kicker = input.required<string>();
  readonly heading = input.required<string>();
  readonly stamp = input<string>();
}
