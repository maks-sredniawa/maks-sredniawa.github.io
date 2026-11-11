import { TestBed } from '@angular/core/testing';
import { ideas } from '../catalog/ideas';
import { projects } from '../catalog/projects';
import { HomePage } from './home-page';

function render(): HTMLElement {
  const fixture = TestBed.createComponent(HomePage);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

describe('HomePage', () => {
  it('lists every project once and every idea once', () => {
    const page = render();

    expect(page.querySelectorAll('.mf-ledger-row')).toHaveLength(projects.length);
    expect(page.querySelectorAll('.mf-idea')).toHaveLength(ideas.length);
    expect(page.querySelectorAll('.mf-tile, .mf-shelf-item, .mf-index-entry')).toHaveLength(0);
  });

  it('keeps each project reachable at its old anchor', () => {
    const page = render();

    for (const project of projects) {
      expect(page.querySelector(`.mf-ledger-row#${project.icon}`)).not.toBeNull();
    }
  });

  it('keeps every former section anchor on the app list', () => {
    const page = render();

    for (const id of [
      'live',
      'building',
      'tools',
      'android-apps',
      'web-apps',
      'chrome-extensions',
      'wot-mods',
    ]) {
      expect(page.querySelector(`#apps #${id}`)).not.toBeNull();
    }
  });

  it('counts the projects behind every filter option', () => {
    const page = render();
    const options = [...page.querySelectorAll('.mf-filter label')].map((label) => ({
      value: label.querySelector('input')?.value,
      count: Number(label.querySelector('small')?.textContent),
    }));
    const rows = [...page.querySelectorAll<HTMLElement>('.mf-ledger-row')];

    expect(options[0]).toEqual({ value: 'all', count: projects.length });
    for (const { value, count } of options.slice(1)) {
      expect(rows.filter((row) => row.dataset['platform'] === value)).toHaveLength(count);
    }
    expect(options.slice(1).reduce((sum, { count }) => sum + count, 0)).toBe(projects.length);
  });

  it('pre-fills the idea email', () => {
    const page = render();
    const send = page.querySelector<HTMLAnchorElement>('#ideas a.mf-btn');

    expect(send?.getAttribute('href')).toBe(
      'mailto:ideas@maksforge.com?subject=App%20idea%20for%20MaksForge&body=What%20problem%20should%20the%20app%20solve%3F%0A%0A%0AWho%20would%20use%20it%3F%0A%0A%0AAnything%20else%3F%0A',
    );
  });

  it('describes the page for search engines and link previews', () => {
    render();

    expect(document.querySelector('meta[name="description"]')).not.toBeNull();
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://maksforge.com/',
    );
  });
});
