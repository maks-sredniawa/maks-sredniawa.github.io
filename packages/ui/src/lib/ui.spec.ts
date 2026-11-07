import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Button } from './button/button';
import { Card } from './card/card';
import { Fact } from './fact/fact';
import { IdeaCard } from './idea-card/idea-card';
import { SectionHead } from './section-head/section-head';
import { StatusBadge } from './status-badge/status-badge';

@Component({
  imports: [Button, Card, Fact, IdeaCard, SectionHead, StatusBadge],
  template: `
    <a id="primary" mfButton href="#">Primary</a>
    <a id="ghost" mfButton variant="ghost" size="small" href="#">Ghost</a>
    <span id="badge" mfStatusBadge="building">Building</span>
    <div mfSectionHead status="idea" statusLabel="Ideas" heading="Next">Blurb</div>
    <article
      id="live"
      mfCard
      iconSrc="icon.svg"
      heading="Binky"
      kind="Android app"
      [headingLevel]="4"
    >
      <p>Summary</p>
      <a mfButton mfCardAction href="#">Google Play</a>
    </article>
    <article id="building" mfCard iconSrc="icon.svg" heading="Kozica" kind="Android app"></article>
    <ul>
      <li mfIdeaCard heading="Idea" kind="Tool" added="2026-11-07">Pitch</li>
      <li mfFact [value]="5">apps live</li>
    </ul>
  `,
})
class Host {}

function render(): HTMLElement {
  const fixture = TestBed.createComponent(Host);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

describe('ui', () => {
  it('styles buttons by variant and size', () => {
    const host = render();

    expect(host.querySelector('#primary')?.className).toBe('btn primary');
    expect(host.querySelector('#ghost')?.className).toBe('btn ghost small');
  });

  it('keeps the status class next to the status', () => {
    expect(render().querySelector('#badge')?.className).toBe('status building');
  });

  it('heads a section with its status, title and blurb', () => {
    const head = render().querySelector('.section-head');

    expect(head?.querySelector('.status.idea')?.textContent).toBe('Ideas');
    expect(head?.querySelector('h2')?.textContent).toBe('Next');
    expect(head?.querySelector('p')?.textContent).toBe('Blurb');
  });

  it('puts card content in the body and actions in the links row', () => {
    const card = render().querySelector('#live');

    expect(card?.className).toBe('card');
    expect(card?.querySelector('h4')?.textContent).toBe('Binky');
    expect(card?.querySelector('.card-body p:last-child')?.textContent).toBe('Summary');
    expect(card?.querySelector('.links a')?.textContent).toBe('Google Play');
  });

  it('heads a card at level 3 by default', () => {
    expect(render().querySelector('#building h3')?.textContent).toBe('Kozica');
  });

  it('dates an idea and states a fact', () => {
    const host = render();

    expect(host.querySelector('[data-added="2026-11-07"] h3')?.textContent).toBe('Idea');
    expect(host.querySelector('li strong')?.textContent).toBe('5');
  });
});
