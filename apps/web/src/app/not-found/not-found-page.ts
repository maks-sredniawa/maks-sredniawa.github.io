import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from '@maksforge/ui';

@Component({
  selector: 'mf-not-found-page',
  imports: [Button],
  templateUrl: './not-found-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage {}
