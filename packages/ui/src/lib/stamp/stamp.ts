import { Directive } from '@angular/core';

@Directive({ selector: 'span[mfStamp]', host: { class: 'mf-stamp', 'aria-hidden': 'true' } })
export class Stamp {}
