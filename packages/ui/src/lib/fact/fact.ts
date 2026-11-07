import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'li[mfFact]',
  host: { class: 'mf-fact' },
  template: `<strong>{{ value() }}</strong
    ><span><ng-content /></span>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Fact {
  readonly value = input.required<number>();
}
