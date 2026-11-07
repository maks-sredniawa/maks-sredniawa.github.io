import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { type Status, StatusBadge } from '../status-badge/status-badge';

@Component({
  selector: 'div[mfSectionHead]',
  imports: [StatusBadge],
  host: { class: 'section-head' },
  template: `
    <span [mfStatusBadge]="status()">{{ statusLabel() }}</span>
    <h2>{{ heading() }}</h2>
    <p><ng-content /></p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHead {
  readonly status = input.required<Status>();
  readonly statusLabel = input.required<string>();
  readonly heading = input.required<string>();
}
