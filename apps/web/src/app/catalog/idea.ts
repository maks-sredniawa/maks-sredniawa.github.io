export type IdeaKind = 'android-app' | 'chrome-extension' | 'tool' | 'wot-mod';

export interface Idea {
  readonly name: string;
  readonly kind: IdeaKind;
  readonly pitch: string;
  readonly added: `${number}-${number}-${number}`;
}

export const ideaKindLabels: Readonly<Record<IdeaKind, string>> = {
  'android-app': $localize`Android app`,
  'chrome-extension': $localize`Chrome extension`,
  tool: $localize`Tool`,
  'wot-mod': $localize`WoT mod`,
};
