import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Project the summary as content and the links with the `mfTileAction` attribute. */
@Component({
  selector: 'li[mfTile]',
  host: { class: 'mf-tile' },
  template: `
    <article class="mf-tile__body">
      <img class="mf-tile__icon" [src]="iconSrc()" alt="" width="56" height="56" />
      <h4 class="mf-tile__name">{{ heading() }}</h4>
      <p class="mf-tile__kind mf-sc">{{ kind() }}</p>
      <div class="mf-tile__summary"><ng-content /></div>
      <div class="mf-tile__links"><ng-content select="[mfTileAction]" /></div>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tile {
  readonly iconSrc = input.required<string>();
  readonly heading = input.required<string>();
  readonly kind = input.required<string>();
}
