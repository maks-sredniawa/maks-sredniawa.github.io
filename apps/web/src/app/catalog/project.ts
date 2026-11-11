import { type LinkVariant, type Status } from '@maksforge/ui';

export type ProjectSection =
  'android-apps' | 'web-apps' | 'chrome-extensions' | 'wot-mods' | 'building' | 'open-source';

export type ProjectKind =
  'android-app' | 'web-app' | 'chrome-extension' | 'wot-mod' | 'template' | 'cli';

export interface ProjectLink {
  readonly label: string;
  readonly href: string;
  readonly variant: LinkVariant;
}

export interface Project {
  readonly name: string;
  /** File name in `assets/icons/`, without the `.webp` extension. */
  readonly icon: string;
  readonly kind: ProjectKind;
  readonly section: ProjectSection;
  /** Rendered as HTML; markup goes in named `$localize` placeholders, out of translators' hands. */
  readonly summary: string;
  readonly links: readonly ProjectLink[];
}

export const projectKindLabels: Readonly<Record<ProjectKind, string>> = {
  'android-app': $localize`Android app`,
  'web-app': $localize`Web app`,
  'chrome-extension': $localize`Chrome extension`,
  'wot-mod': $localize`World of Tanks mod`,
  template: $localize`Template`,
  cli: $localize`Command-line tool`,
};

export type ProjectPlatform = 'android' | 'browser' | 'wot' | 'dev';

export const projectPlatforms: Readonly<Record<ProjectKind, ProjectPlatform>> = {
  'android-app': 'android',
  'web-app': 'browser',
  'chrome-extension': 'browser',
  'wot-mod': 'wot',
  template: 'dev',
  cli: 'dev',
};

export const projectPlatformLabels: Readonly<Record<ProjectPlatform, string>> = {
  android: $localize`:filter:Android`,
  browser: $localize`:filter:Browser`,
  wot: $localize`:filter:World of Tanks`,
  dev: $localize`:filter:For developers`,
};

export const sectionStatus = (section: ProjectSection): Status =>
  section === 'building' ? 'building' : section === 'open-source' ? 'oss' : 'live';

const github = 'https://github.com/maks-sredniawa';

export const googlePlay = (applicationId: string): ProjectLink => ({
  label: $localize`Google Play`,
  href: `https://play.google.com/store/apps/details?id=${applicationId}`,
  variant: 'go',
});

export const chromeWebStore = (href: string): ProjectLink => ({
  label: $localize`Chrome Web Store`,
  href,
  variant: 'go',
});

export const latestRelease = (repo: string): ProjectLink => ({
  label: $localize`Download`,
  href: `${github}/${repo}/releases/latest`,
  variant: 'go',
});

export const website = (repo: string): ProjectLink => ({
  label: $localize`Website`,
  href: `/${repo}/`,
  variant: 'plain',
});

export const source = (repo: string): ProjectLink => ({
  label: $localize`Source`,
  href: `${github}/${repo}`,
  variant: 'plain',
});
