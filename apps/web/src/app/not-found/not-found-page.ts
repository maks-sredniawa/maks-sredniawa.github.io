import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from '@maksforge/ui';
import { LanguageMenu } from '../language-menu/language-menu';

@Component({
  selector: 'mf-not-found-page',
  imports: [Button, LanguageMenu],
  templateUrl: './not-found-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage {}
