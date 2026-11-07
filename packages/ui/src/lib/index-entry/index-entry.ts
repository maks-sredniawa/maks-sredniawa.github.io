import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { type Status } from '../tag/tag';

@Component({
  selector: 'li[mfIndexEntry]',
  host: { '[class]': '"mf-index-entry mf-index-entry--" + status()' },
  template: `
    <a [href]="href()"
      >{{ name() }} <span class="mf-index-entry__kind">{{ kind() }}</span></a
    >
    <span class="mf-index-entry__status mf-sc">{{ statusLabel() }}</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexEntry {
  readonly name = input.required<string>();
  readonly kind = input.required<string>();
  readonly href = input.required<string>();
  readonly status = input.required<Status>();
  readonly statusLabel = input.required<string>();
}
