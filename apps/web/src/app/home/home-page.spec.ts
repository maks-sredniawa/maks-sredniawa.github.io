import { TestBed } from '@angular/core/testing';
import { ideas } from '../catalog/ideas';
import { liveSections } from '../catalog/project';
import { projects } from '../catalog/projects';
import { HomePage } from './home-page';

function render(): HTMLElement {
  const fixture = TestBed.createComponent(HomePage);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

describe('HomePage', () => {
  it('shows a tile, a shelf item and an index entry for every project, and a pin for every idea', () => {
    const page = render();

    expect(page.querySelectorAll('.mf-tile')).toHaveLength(projects.length);
    expect(page.querySelectorAll('.mf-shelf-item')).toHaveLength(projects.length);
    expect(page.querySelectorAll('.mf-index-entry')).toHaveLength(projects.length);
    expect(page.querySelectorAll('.mf-pin')).toHaveLength(ideas.length);
  });

  it('links every shelf item and index entry to its tile', () => {
    const page = render();
    const targets = [...page.querySelectorAll('.mf-shelf-item, .mf-index-entry a')].map((link) =>
      link.getAttribute('href'),
    );

    expect(targets).toHaveLength(projects.length * 2);
    for (const target of targets) {
      expect(page.querySelector(`.mf-tile${target}`)).not.toBeNull();
    }
  });

  it('counts the live and in-development projects', () => {
    const page = render();
    const counts = [...page.querySelectorAll('.mf-fact strong')].map((fact) => fact.textContent);

    expect(counts).toEqual([
      String(projects.filter((p) => liveSections.includes(p.section)).length),
      String(projects.filter((p) => p.section === 'building').length),
      '0',
    ]);
  });

  it('heads tiles one level below their aisle', () => {
    const page = render();

    expect(page.querySelectorAll('.mf-aisle h3').length).toBeGreaterThan(0);
    expect(page.querySelectorAll('.mf-tile h4')).toHaveLength(projects.length);
  });

  it('pre-fills the idea email', () => {
    const page = render();
    const send = page.querySelector<HTMLAnchorElement>('.mf-callout a.mf-btn');

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
