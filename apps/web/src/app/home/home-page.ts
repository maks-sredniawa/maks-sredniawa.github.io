import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, LOCALE_ID } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Button, Filter, type FilterOption, Idea, LedgerRow, Link } from '@maksforge/ui';
import { ideaKindLabels } from '../catalog/idea';
import { ideas } from '../catalog/ideas';
import {
  type Project,
  type ProjectPlatform,
  projectKindLabels,
  projectPlatformLabels,
  projectPlatforms,
  sectionStatus,
} from '../catalog/project';
import { projects } from '../catalog/projects';
import { LanguageMenu } from '../language-menu/language-menu';
import { languageFor, languages } from '../languages';

const siteUrl = 'https://maksforge.com/';

const platformOf = (project: Project): ProjectPlatform => projectPlatforms[project.kind];

@Component({
  selector: 'mf-home-page',
  imports: [Button, Filter, Idea, LanguageMenu, LedgerRow, Link],
  templateUrl: './home-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  protected readonly projects = projects;
  protected readonly ideas = ideas;
  protected readonly ideaKindLabels = ideaKindLabels;
  protected readonly kindLabels = projectKindLabels;
  protected readonly sectionStatus = sectionStatus;
  protected readonly platformOf = platformOf;
  protected readonly statusLabels = {
    live: $localize`Live`,
    building: $localize`Building`,
    oss: $localize`Open source`,
    idea: $localize`Idea`,
  };
  protected readonly platformFilter: readonly FilterOption[] = [
    { value: 'all', label: $localize`:filter:All`, count: projects.length },
    ...Object.entries(projectPlatformLabels).map(([platform, label]) => ({
      value: platform,
      label,
      count: projects.filter((project) => platformOf(project) === platform).length,
    })),
  ];

  protected readonly ideaMailto = `mailto:ideas@maksforge.com?${new URLSearchParams({
    subject: $localize`App idea for MaksForge`,
    body: $localize`What problem should the app solve?\n\n\nWho would use it?\n\n\nAnything else?\n`,
  })
    .toString()
    .replaceAll('+', '%20')}`;

  constructor() {
    const pageUrl = new URL(languageFor(inject(LOCALE_ID)).path, siteUrl).href;
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
      { property: 'og:url', content: pageUrl },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: `${siteUrl}assets/logo-512.jpg` },
    ]);
    addLanguageLinks(inject(DOCUMENT), pageUrl);
  }
}

function addLanguageLinks(document: Document, canonicalUrl: string): void {
  if (document.head.querySelector('link[rel="canonical"]')) {
    return;
  }
  const addLink = (rel: string, href: string, hreflang?: string) => {
    const link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    if (hreflang) {
      link.hreflang = hreflang;
    }
    document.head.appendChild(link);
  };
  addLink('canonical', canonicalUrl);
  addLink('alternate', siteUrl, 'x-default');
  for (const language of languages) {
    addLink('alternate', new URL(language.path, siteUrl).href, language.code);
  }
}
