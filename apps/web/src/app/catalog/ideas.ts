import type { Idea } from './idea';

export const ideas: readonly Idea[] = [
  {
    name: $localize`Garage filter extras`,
    kind: 'wot-mod',
    pitch: $localize`Adds the garage filters the game is missing: one to hide rented tanks, which always show today, and one to show only tanks that are not premium.`,
    added: '2026-11-07',
  },
  {
    name: $localize`Darts scorer`,
    kind: 'android-app',
    pitch: $localize`Counts your darts score from a few photos of the board taken from different angles, as few as it needs, so you don't have to tally the darts by hand.`,
    added: '2026-11-07',
  },
  {
    name: $localize`Archery scorer`,
    kind: 'android-app',
    pitch: $localize`Counts your archery score from a few photos of the target taken from different angles, as few as it needs, so you don't have to tally the arrows by hand.`,
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
  {
    name: $localize`Take your meds`,
    kind: 'android-app',
    pitch: $localize`Reminds you to take your meds, with everything kept on your phone. No ads, no tracking.`,
    added: '2026-11-07',
  },
];
