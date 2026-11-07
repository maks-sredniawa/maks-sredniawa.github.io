import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Link, Tile } from '@maksforge/ui';
import { type Project, projectKindLabels } from '../catalog/project';

@Component({
  selector: 'ul[mfProjectTiles]',
  imports: [Link, Tile],
  host: { class: 'mf-tiles' },
  template: `
    @for (project of projects(); track project.icon) {
      <li
        mfTile
        [id]="project.icon"
        [iconSrc]="'/assets/icons/' + project.icon + '.webp'"
        [heading]="project.name"
        [kind]="kindLabels[project.kind]"
      >
        <p [innerHTML]="project.summary"></p>
        @for (link of project.links; track link.href) {
          <a mfLink mfTileAction [variant]="link.variant" [href]="link.href">{{ link.label }}</a>
        }
      </li>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectTiles {
  readonly projects = input.required<readonly Project[]>();

  protected readonly kindLabels = projectKindLabels;
}
