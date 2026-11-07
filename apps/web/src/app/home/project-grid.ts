import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Button, Card, type HeadingLevel } from '@maksforge/ui';
import { type Project, projectKindLabels } from '../catalog/project';

@Component({
  selector: 'div[mfProjectGrid]',
  imports: [Button, Card],
  host: { class: 'grid' },
  template: `
    @for (project of projects(); track project.icon) {
      <article
        mfCard
        [iconSrc]="'/assets/icons/' + project.icon + '.webp'"
        [heading]="project.name"
        [kind]="kindLabels[project.kind]"
        [headingLevel]="headingLevel()"
      >
        <p [innerHTML]="project.summary"></p>
        @for (link of project.links; track link.href) {
          <a mfButton mfCardAction size="small" [variant]="link.variant" [href]="link.href">
            {{ link.label }}
          </a>
        }
      </article>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectGrid {
  readonly projects = input.required<readonly Project[]>();
  readonly headingLevel = input<HeadingLevel>(3);

  protected readonly kindLabels = projectKindLabels;
}
