// Fails unless every language translates exactly the messages the code contains.
// Usage: node scripts/check-translations.mjs <freshly extracted messages.xlf>
import { readFileSync } from 'node:fs';

const committedSource = 'apps/web/src/locale/messages.xlf';
const countsToCover = 1000;
const fullSentenceWords = 4;

const [extractedPath] = process.argv.slice(2);
if (!extractedPath) {
  console.error('Usage: node scripts/check-translations.mjs <extracted messages.xlf>');
  process.exit(2);
}

function readUnits(path) {
  const units = new Map();
  for (const [, id, body] of readFileSync(path, 'utf8').matchAll(
    /<trans-unit id="([^"]+)"[^>]*>([\s\S]*?)<\/trans-unit>/g,
  )) {
    units.set(id, {
      source: /<source>([\s\S]*?)<\/source>/.exec(body)?.[1] ?? '',
      target: /<target[^>/]*>([\s\S]*?)<\/target>/.exec(body)?.[1]?.trim() ?? '',
    });
  }
  return units;
}

const placeholderIds = (text) => [...text.matchAll(/<x id="([^"]+)"/g)].map(([, id]) => id).sort();
const withoutPlaceholders = (text) => text.replace(/<x [^>]*>/g, ' ');
const isPlural = (text) => /,\s*plural\s*,/.test(withoutPlaceholders(text));
const wordsOf = (text) =>
  withoutPlaceholders(text)
    .split(/\s+/)
    .filter((word) => /\p{L}/u.test(word));
const pluralBranches = (text) =>
  [...text.matchAll(/(?:^|[\s,}])(=\d+|zero|one|two|few|many|other)\s*\{/g)].map(([, key]) => key);

function missingPluralBranches(locale, target) {
  const branches = new Set(pluralBranches(target));
  const rules = new Intl.PluralRules(locale);
  const needed = new Set(['other']);
  for (let count = 0; count <= countsToCover; count++) {
    if (!branches.has(`=${String(count)}`)) {
      needed.add(rules.select(count));
    }
  }
  return [...needed].filter((category) => !branches.has(category));
}

function problemsIn(locale, units, expected) {
  const problems = [];
  for (const id of expected.keys()) {
    if (!units.has(id)) {
      problems.push(`${id}: missing, the English text is "${expected.get(id).source}"`);
    }
  }
  for (const [id, { source, target }] of units) {
    if (!expected.has(id)) {
      problems.push(`${id}: no longer in the code, remove it ("${source}")`);
    } else if (!target) {
      problems.push(`${id}: empty translation of "${source}"`);
    } else if (isPlural(source)) {
      const absent = [...new Set(placeholderIds(source))].filter(
        (placeholder) => !placeholderIds(target).includes(placeholder),
      );
      if (absent.length > 0) {
        problems.push(`${id}: lost placeholder ${absent.join(', ')}`);
      }
      const branches = missingPluralBranches(locale, target);
      if (branches.length > 0) {
        problems.push(`${id}: plural needs ${branches.join(', ')}`);
      }
    } else if (placeholderIds(source).join() !== placeholderIds(target).join()) {
      problems.push(`${id}: placeholders differ from the English text "${source}"`);
    } else if (target === source && wordsOf(source).length >= fullSentenceWords) {
      problems.push(`${id}: still in English: "${source}"`);
    }
  }
  return problems;
}

const expected = readUnits(extractedPath);
const project = JSON.parse(readFileSync('apps/web/project.json', 'utf8'));
const languages = Object.entries(project.i18n.locales);
const sourceDrift = problemsOfCommittedSource();
const results = languages.map(([locale, { translation }]) => ({
  locale,
  problems: problemsIn(locale, readUnits(translation), expected),
}));

function problemsOfCommittedSource() {
  const committed = readUnits(committedSource);
  const stale = [...expected.keys()].some((id) => !committed.has(id));
  return stale || committed.size !== expected.size ? [`${committedSource} is out of date`] : [];
}

let failed = false;
for (const problem of sourceDrift) {
  failed = true;
  console.error(problem);
}
for (const { locale, problems } of results) {
  console.log(`${locale}: ${String(expected.size)} messages, ${String(problems.length)} problems`);
  for (const problem of problems) {
    failed = true;
    console.error(`  ${locale} ${problem}`);
  }
}
if (failed) {
  console.error(
    '\nEvery change to site text needs its translations in the same PR. Run `pnpm i18n:extract`, then update every messages.<language>.xlf.',
  );
  process.exit(1);
}
