export type ProjectSection =
  'android-apps' | 'chrome-extensions' | 'wot-mods' | 'building' | 'open-source';

export type ProjectKind = 'android-app' | 'chrome-extension' | 'wot-mod' | 'template' | 'cli';

export interface ProjectLink {
  readonly label: string;
  readonly href: string;
  readonly variant: 'primary' | 'ghost';
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

export const liveSections: readonly ProjectSection[] = [
  'android-apps',
  'chrome-extensions',
  'wot-mods',
];

export const projectKindLabels: Readonly<Record<ProjectKind, string>> = {
  'android-app': $localize`Android app`,
  'chrome-extension': $localize`Chrome extension`,
  'wot-mod': $localize`World of Tanks mod`,
  template: $localize`Template`,
  cli: $localize`Command-line tool`,
};

const github = 'https://github.com/maks-sredniawa';

export const googlePlay = (applicationId: string): ProjectLink => ({
  label: $localize`Google Play`,
  href: `https://play.google.com/store/apps/details?id=${applicationId}`,
  variant: 'primary',
});

export const chromeWebStore = (href: string): ProjectLink => ({
  label: $localize`Chrome Web Store`,
  href,
  variant: 'primary',
});

export const latestRelease = (repo: string): ProjectLink => ({
  label: $localize`Download`,
  href: `${github}/${repo}/releases/latest`,
  variant: 'primary',
});

export const website = (repo: string): ProjectLink => ({
  label: $localize`Website`,
  href: `/${repo}/`,
  variant: 'ghost',
});

export const source = (repo: string): ProjectLink => ({
  label: $localize`Source`,
  href: `${github}/${repo}`,
  variant: 'ghost',
});
