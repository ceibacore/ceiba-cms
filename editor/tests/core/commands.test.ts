import { describe, expect, it } from 'vitest';
import { checkTree, EditorError, SERVER_LIMITS } from '../../src/core';
import type { Command, TreeState } from '../../src/core';
import { setup, snapshot } from '../support/session';

const code = (run: () => unknown): string => {
  try {
    run();
  } catch (error) {
    return error instanceof EditorError ? error.code : 'not-editor-error';
  }
  return 'no-error';
};

/** Applies a command, checks the tree, then its inverse must give back exactly the original document. */
const roundTrip = (command: Command): TreeState => {
  const { commands, tree } = setup();
  const result = commands.apply(tree, command);
  expect(checkTree(result.state, SERVER_LIMITS)).toEqual([]);
  const undone = commands.apply(result.state, result.inverse);
  expect(snapshot(undone.state)).toEqual(snapshot(tree));
  return result.state;
};

describe('commands and their inverses', () => {
  it('insert gives fresh ids to the whole subtree', () => {
    const state = roundTrip({ kind: 'insert', parent: 'c1', index: 1,
      node: { id: 'h', type: 'div', children: [{ id: 'p1', type: 'p', children: [] }] } });
    expect(state.nodes.c1?.children).toEqual(['h', 'new1', 'p1', 'w1']);
    expect(state.nodes.new1?.children).toEqual(['new2']);
  });

  it('remove keeps unknown components and extensions when undone', () => {
    const state = roundTrip({ kind: 'remove', id: 'c1' });
    expect(state.rootIds).toEqual(['d1']);
    expect(Object.keys(state.nodes)).toEqual(['d1', 'b1']);
  });

  it('move across parents and within the same parent, both directions', () => {
    expect(roundTrip({ kind: 'move', id: 'b1', parent: 'c1', index: 0 }).nodes.c1?.children).toEqual(['b1', 'h', 'p1', 'w1']);
    expect(roundTrip({ kind: 'move', id: 'h', parent: 'c1', index: 3 }).nodes.c1?.children).toEqual(['p1', 'w1', 'h']);
    expect(roundTrip({ kind: 'move', id: 'w1', parent: 'c1', index: 0 }).nodes.c1?.children).toEqual(['w1', 'h', 'p1']);
    expect(roundTrip({ kind: 'move', id: 'd1', parent: null, index: 0 }).rootIds).toEqual(['d1', 'c1']);
  });

  it('duplicate copies after the original and rewrites internal references', () => {
    const state = roundTrip({ kind: 'duplicate', id: 'd1' });
    expect(state.rootIds).toEqual(['c1', 'd1', 'new1']);
    expect(state.nodes.new2?.fields.props).toEqual({ targetId: 'new1', text: 'Go' });
    expect(state.nodes.b1?.fields.props).toEqual({ targetId: 'd1', text: 'Go' });
  });

  it('duplicate keeps the _id alias in step with the new id (the module stores both)', () => {
    const { commands, tree } = setup();
    const aliased = commands.apply(tree, { kind: 'replace', id: 'h', keepIds: true, node: { id: 'h', _id: 'h', type: 'h1' } });
    const copy = commands.apply(aliased.state, { kind: 'duplicate', id: 'h' });
    expect(copy.state.nodes[copy.focus as string]?.fields._id).toBe(copy.focus);
    expect(copy.state.nodes.h?.fields._id).toBe('h');
  });

  it('updateProps restores changed, removed and added keys', () => {
    const state = roundTrip({ kind: 'updateProps', id: 'p1', set: { content: 'New', align: 'center' }, unset: [] });
    expect(state.nodes.p1?.fields.props).toEqual({ content: 'New', align: 'center' });
    roundTrip({ kind: 'updateProps', id: 'c1', set: {}, unset: ['fluid'] });
  });

  it('rename and replace', () => {
    expect(roundTrip({ kind: 'rename', id: 'h', name: 'Title', label: null }).nodes.h?.fields.name).toBe('Title');
    expect(roundTrip({ kind: 'rename', id: 'p1', name: null, label: null }).nodes.p1?.fields).not.toHaveProperty('name');
    const state = roundTrip({ kind: 'replace', id: 'h', node: { type: 'heading', props: { text: 'Hi' }, children: [] } });
    expect(state.nodes.c1?.children).toEqual(['new1', 'p1', 'w1']);
  });
});

describe('preconditions fail before touching the state', () => {
  it('rejects cycles, bad placement, unknown and locked components and missing nodes', () => {
    const { commands, tree } = setup();
    const before = snapshot(tree);
    expect(code(() => commands.apply(tree, { kind: 'move', id: 'c1', parent: 'p1', index: 0 }))).toBe('CYCLE');
    expect(code(() => commands.apply(tree, { kind: 'move', id: 'c1', parent: 'c1', index: 0 }))).toBe('CYCLE');
    expect(code(() => commands.apply(tree, { kind: 'move', id: 'd1', parent: 'p1', index: 0 }))).toBe('PLACEMENT_NOT_ALLOWED');
    expect(code(() => commands.apply(tree, { kind: 'insert', parent: null, index: 0, node: { type: 'row' } }))).toBe('PLACEMENT_NOT_ALLOWED');
    expect(code(() => commands.apply(tree, { kind: 'insert', parent: 'h', index: 0, node: { type: 'image' } }))).toBe('PLACEMENT_NOT_ALLOWED');
    expect(code(() => commands.apply(tree, { kind: 'insert', parent: 'c1', index: 0,
      node: { type: 'row', children: [{ type: 'text' }] } }))).toBe('PLACEMENT_NOT_ALLOWED');
    expect(code(() => commands.apply(tree, { kind: 'insert', parent: 'c1', index: 0, node: { type: 'marquee' } }))).toBe('UNKNOWN_COMPONENT');
    expect(code(() => commands.apply(tree, { kind: 'updateProps', id: 'w1', set: { speed: 1 } }))).toBe('LOCKED_COMPONENT');
    expect(code(() => commands.apply(tree, { kind: 'remove', id: 'ghost' }))).toBe('NODE_NOT_FOUND');
    expect(code(() => commands.apply(tree, { kind: 'insert', parent: 'ghost', index: 0, node: { type: 'div' } }))).toBe('NODE_NOT_FOUND');
    expect(snapshot(tree)).toEqual(before);
  });

  it('respects the node and depth limits of the server', () => {
    const shallow = setup({ maxNodes: 500, maxDepth: 3, maxBytes: 2_000_000 });
    const deep = { type: 'div', children: [{ type: 'div', children: [{ type: 'div' }] }] };
    expect(code(() => shallow.commands.apply(shallow.tree, { kind: 'insert', parent: 'c1', index: 0, node: deep }))).toBe('MAX_DEPTH');
    expect(code(() => shallow.commands.apply(shallow.tree, { kind: 'move', id: 'd1', parent: 'c1', index: 0 }))).toBe('no-error');
    const small = setup({ maxNodes: 7, maxDepth: 15, maxBytes: 2_000_000 });
    expect(code(() => small.commands.apply(small.tree, { kind: 'duplicate', id: 'd1' }))).toBe('MAX_NODES');
    expect(code(() => small.commands.apply(small.tree, { kind: 'insert', parent: null, index: 0, node: { type: 'div' } }))).toBe('no-error');
  });
});
