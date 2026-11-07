import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Aisle } from './aisle/aisle';
import { Band } from './band/band';
import { Button } from './button/button';
import { Fact } from './fact/fact';
import { IndexEntry } from './index-entry/index-entry';
import { Link } from './link/link';
import { Notice } from './notice/notice';
import { Pin } from './pin/pin';
import { ShelfItem } from './shelf-item/shelf-item';
import { Tag } from './tag/tag';
import { Tile } from './tile/tile';

@Component({
  imports: [Aisle, Band, Button, Fact, IndexEntry, Link, Notice, Pin, ShelfItem, Tag, Tile],
  template: `
    <a id="primary" mfButton href="#">Primary</a>
    <a id="brand" mfButton variant="brand" size="small" href="#">Brand</a>
    <a id="go" mfLink variant="go" href="#">Go</a>
    <span id="tag" mfTag="building">Building</span>
    <section
      id="band"
      mfBand
      tone="dark"
      status="idea"
      statusLabel="Ideas · 1"
      heading="Next"
      blurb="Blurb"
    >
      <div mfAisle heading="Apps" note="On Play">
        <ul>
          <li id="tile" mfTile iconSrc="icon.svg" heading="Binky" kind="Android app">
            <p>Summary</p>
            <a mfLink mfTileAction href="#">Google Play</a>
          </li>
        </ul>
      </div>
    </section>
    <ul>
      <li mfPin heading="Idea" kind="Tool" added="2026-11-07">Pitch</li>
      <li mfFact [value]="5">apps live</li>
      <li mfShelfItem iconSrc="icon.svg" name="Kozica" status="building" href="#kozica"></li>
      <li
        mfIndexEntry
        name="Gloam"
        kind="Android app"
        href="#gloam"
        status="live"
        statusLabel="Live"
      ></li>
    </ul>
    <aside mfNotice kicker="Notice" heading="Like it?" stamp="Free">
      Tips help.
      <a mfButton mfNoticeAction href="#">Tip</a>
    </aside>
  `,
})
class Host {}

function render(): HTMLElement {
  const fixture = TestBed.createComponent(Host);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

describe('ui', () => {
  it('styles buttons and links by variant and size', () => {
    const host = render();

    expect(host.querySelector('#primary')?.className).toBe('mf-btn mf-btn--primary');
    expect(host.querySelector('#brand')?.className).toBe('mf-btn mf-btn--brand mf-btn--small');
    expect(host.querySelector('#go')?.className).toBe('mf-link mf-link--go');
  });

  it('keeps the tone class next to the tag', () => {
    expect(render().querySelector('#tag')?.className).toBe('mf-tag mf-tag--building');
  });

  it('heads a band with its title, blurb and status tag', () => {
    const band = render().querySelector('#band');

    expect(band?.className).toBe('mf-band mf-band--dark');
    expect(band?.querySelector('.mf-band-head h2')?.textContent).toBe('Next');
    expect(band?.querySelector('.mf-band-head p')?.textContent).toBe('Blurb');
    expect(band?.querySelector('.mf-tag.mf-tag--idea')?.textContent).toBe('Ideas · 1');
    expect(band?.querySelector('.mf-aisle__label h3')?.textContent).toBe('Apps');
  });

  it('puts tile content in the summary and actions in the links row', () => {
    const tile = render().querySelector('#tile');

    expect(tile?.querySelector('.mf-tile__name')?.textContent).toBe('Binky');
    expect(tile?.querySelector('.mf-tile__summary p')?.textContent).toBe('Summary');
    expect(tile?.querySelector('.mf-tile__links a')?.textContent).toBe('Google Play');
  });

  it('dates an idea pin with a machine-readable time', () => {
    const time = render().querySelector('.mf-pin time');

    expect(time?.getAttribute('datetime')).toBe('2026-11-07');
  });

  it('marks shelf items and index entries with their status', () => {
    const host = render();

    expect(host.querySelector('.mf-shelf-item--building')?.getAttribute('href')).toBe('#kozica');
    expect(host.querySelector('.mf-index-entry--live .mf-index-entry__status')?.textContent).toBe(
      'Live',
    );
  });

  it('stamps a notice and keeps its actions together', () => {
    const notice = render().querySelector('.mf-notice');

    expect(notice?.querySelector('.mf-stamp')?.textContent).toBe('Free');
    expect(notice?.querySelector('.mf-notice__actions a')?.textContent).toBe('Tip');
  });

  it('shows a fact with its value', () => {
    expect(render().querySelector('.mf-fact strong')?.textContent).toBe('5');
  });
});
