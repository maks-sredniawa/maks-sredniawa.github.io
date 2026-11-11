import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { type Status, Tag } from '../tag/tag';

/** Project the summary as content and the links with the `mfLedgerRowAction` attribute. */
@Component({
  selector: 'li[mfLedgerRow]',
  imports: [Tag],
  host: { class: 'mf-ledger-row' },
  template: `
    <img class="mf-ledger-row__icon" [src]="iconSrc()" alt="" width="52" height="52" />
    <div class="mf-ledger-row__name">
      <h3>{{ heading() }}</h3>
      <span class="mf-sc">{{ kind() }}</span>
    </div>
    <div class="mf-ledger-row__summary"><ng-content /></div>
    <div class="mf-ledger-row__links"><ng-content select="[mfLedgerRowAction]" /></div>
    <span class="mf-ledger-row__status" [mfTag]="status()">{{ statusLabel() }}</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LedgerRow {
  readonly iconSrc = input.required<string>();
  readonly heading = input.required<string>();
  readonly kind = input.required<string>();
  readonly status = input.required<Status>();
  readonly statusLabel = input.required<string>();
}
