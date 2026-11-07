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
  it('shows a card for every project and every idea', () => {
    const page = render();

    expect(page.querySelectorAll('article.card')).toHaveLength(projects.length);
    expect(page.querySelectorAll('.ideas li')).toHaveLength(ideas.length);
  });

  it('counts the live and in-development projects', () => {
    const page = render();
    const counts = [...page.querySelectorAll('.facts strong')].map((fact) => fact.textContent);

    expect(counts).toEqual([
      String(projects.filter((p) => liveSections.includes(p.section)).length),
      String(projects.filter((p) => p.section === 'building').length),
      '0',
    ]);
  });

  it('heads live cards one level below their subsection', () => {
    const page = render();

    expect(page.querySelectorAll('#live .card h4').length).toBeGreaterThan(0);
    expect(page.querySelectorAll('#live .card h3')).toHaveLength(0);
    expect(page.querySelectorAll('#building .card h4')).toHaveLength(0);
  });

  it('pre-fills the idea email', () => {
    const page = render();
    const send = page.querySelector<HTMLAnchorElement>('.placeholder a.btn');

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
