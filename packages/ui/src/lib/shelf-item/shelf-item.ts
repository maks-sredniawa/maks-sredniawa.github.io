import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { type Status } from '../tag/tag';

@Component({
  selector: 'li[mfShelfItem]',
  template: `
    <a [class]="'mf-shelf-item mf-shelf-item--' + status()" [href]="href()">
      <img [src]="iconSrc()" alt="" width="60" height="60" />
      <b>{{ name() }}</b>
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShelfItem {
  readonly iconSrc = input.required<string>();
  readonly name = input.required<string>();
  readonly status = input.required<Status>();
  readonly href = input.required<string>();
}
