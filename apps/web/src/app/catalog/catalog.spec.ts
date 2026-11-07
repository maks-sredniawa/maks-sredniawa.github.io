import { ideas } from './ideas';
import { projects } from './projects';

describe('catalog', () => {
  it('lists the newest idea first', () => {
    const dates = ideas.map((idea) => idea.added);

    expect(dates).toEqual([...dates].sort().reverse());
  });

  it('names every idea once', () => {
    const names = ideas.map((idea) => idea.name.toLowerCase());

    expect(new Set(names).size).toBe(names.length);
  });

  it('gives every project its own icon', () => {
    const icons = projects.map((project) => project.icon);

    expect(new Set(icons).size).toBe(icons.length);
  });

  it('gives every project at least one link', () => {
    expect(projects.filter((project) => project.links.length === 0)).toEqual([]);
  });
});
