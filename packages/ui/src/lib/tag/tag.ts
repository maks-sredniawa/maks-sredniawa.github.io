import { Directive, input } from '@angular/core';

export type Status = 'live' | 'building' | 'oss' | 'idea';
export type TagTone = Status | 'plain' | 'ink';

@Directive({
  selector: 'span[mfTag]',
  host: { class: 'mf-tag', '[class]': '"mf-tag--" + tone()' },
})
export class Tag {
  readonly tone = input<TagTone>('ink', { alias: 'mfTag' });
}
