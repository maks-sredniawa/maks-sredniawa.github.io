import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Button, Fact, IdeaCard, SectionHead } from '@maksforge/ui';
import { ideaKindLabels } from '../catalog/idea';
import { ideas } from '../catalog/ideas';
import { liveSections, type ProjectSection } from '../catalog/project';
import { projects } from '../catalog/projects';
import { ProjectGrid } from './project-grid';

const siteUrl = 'https://maksforge.com/';

const projectsIn = (section: ProjectSection) => projects.filter((p) => p.section === section);

@Component({
  selector: 'mf-home-page',
  imports: [Button, Fact, IdeaCard, ProjectGrid, SectionHead],
  templateUrl: './home-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  protected readonly androidApps = projectsIn('android-apps');
  protected readonly chromeExtensions = projectsIn('chrome-extensions');
  protected readonly wotMods = projectsIn('wot-mods');
  protected readonly building = projectsIn('building');
  protected readonly openSource = projectsIn('open-source');
  protected readonly ideas = ideas;
  protected readonly ideaKindLabels = ideaKindLabels;

  protected readonly liveCount = projects.filter((p) => liveSections.includes(p.section)).length;
  protected readonly buildingCount = this.building.length;

  protected readonly ideaMailto = `mailto:ideas@maksforge.com?${new URLSearchParams({
    subject: $localize`App idea for MaksForge`,
    body: $localize`What problem should the app solve?\n\n\nWho would use it?\n\n\nAnything else?\n`,
  })
    .toString()
    .replaceAll('+', '%20')}`;

  constructor() {
    inject(Meta).addTags([
      {
        name: 'description',
        content: $localize`Small, free Android apps and tools by Maksymilian Średniawa. No ads, no tracking.`,
      },
      { property: 'og:title', content: 'MaksForge' },
      {
        property: 'og:description',
        content: $localize`Small, free Android apps and tools. No ads, no tracking.`,
      },
      { property: 'og:url', content: siteUrl },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: `${siteUrl}assets/logo-512.jpg` },
    ]);
    addCanonicalLink(inject(DOCUMENT), siteUrl);
  }
}

function addCanonicalLink(document: Document, href: string): void {
  if (document.head.querySelector('link[rel="canonical"]')) {
    return;
  }
  const link = document.createElement('link');
  link.rel = 'canonical';
  link.href = href;
  document.head.appendChild(link);
}
