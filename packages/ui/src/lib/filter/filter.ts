import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface FilterOption {
  readonly value: string;
  readonly label: string;
  readonly count: number;
}

/** Radio tabs with no script: the page hides what an option excludes with `:has(input[value=…]:checked)`. */
@Component({
  selector: 'fieldset[mfFilter]',
  host: { class: 'mf-filter' },
  template: `
    <legend class="mf-sr">{{ legend() }}</legend>
    @for (option of options(); track option.value) {
      <label>
        <input
          type="radio"
          [attr.name]="name()"
          [attr.value]="option.value"
          [attr.checked]="$first ? '' : null"
        />
        {{ option.label }}
        <small>{{ option.count }}</small>
      </label>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Filter {
  readonly name = input.required<string>();
  readonly legend = input.required<string>();
  readonly options = input.required<readonly FilterOption[]>();
}
