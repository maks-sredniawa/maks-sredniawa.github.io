import { Directive, input } from '@angular/core';

export type Status = 'live' | 'building' | 'oss' | 'idea';

@Directive({
  selector: 'span[mfStatusBadge]',
  host: {
    class: 'status',
    '[class]': 'status()',
  },
})
export class StatusBadge {
  readonly status = input.required<Status>({ alias: 'mfStatusBadge' });
}
