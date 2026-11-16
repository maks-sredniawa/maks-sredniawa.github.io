import type { Idea } from './idea';

export const ideas: readonly Idea[] = [
  {
    name: $localize`Tank setup simulator`,
    kind: 'wot-mod',
    pitch: $localize`Simulates a World of Tanks tank with the crew skills and equipment you pick, and shows the real values the game's own stats leave out or get wrong, like how long the gun takes to fully aim again after a shot and how its magazine reloads.`,
    added: '2026-11-16',
  },
  {
    name: $localize`Brainstorm sticky notes`,
    kind: 'android-app',
    pitch: $localize`A simple sticky-notes board for brainstorming, where adding a note doesn't throw up pop-ups in your way. Free, no ads.`,
    added: '2026-11-07',
  },
  {
    name: $localize`Monitor brightness presets`,
    kind: 'tool',
    pitch: $localize`A desktop app that keeps a few brightness presets for all your monitors, whatever their make, so you can switch every screen between them in a moment.`,
    added: '2026-11-07',
  },
  {
    name: $localize`Plain light control`,
    kind: 'android-app',
    pitch: $localize`One app in your own language for smart lights whose own app is only in Chinese: it reads each light's details, adds its settings and keeps them per device, so you can control them all in one place.`,
    added: '2026-11-07',
  },
  {
    name: $localize`IOU tracker`,
    kind: 'android-app',
    pitch: $localize`Keeps track of informal loans, like 100 zł lent to a friend or money borrowed from your shared savings, so you remember to pay it back.`,
    added: '2026-11-07',
  },
];
