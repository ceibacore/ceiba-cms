import { describe, expect, it } from 'vitest';
import { checkTree, EditorError, fromDocument, parseDocument, sequentialIds, SERVER_LIMITS, toDocument } from '../../src/core';
import { sampleDocument } from '../support/documents';

describe('document', () => {
  it('round-trips a document without losing unknown types or extension fields', () => {
    const doc = sampleDocument();
    const { tree, meta, repairedIds } = fromDocument(doc, sequentialIds());
    expect(repairedIds).toEqual([]);
    expect(checkTree(tree, SERVER_LIMITS)).toEqual([]);
    expect(toDocument(tree, meta, 4)).toEqual({ ...doc, revision: 4 });
  });

  it('gives ids to nodes without one and repairs repeated ids', () => {
    const doc = sampleDocument();
    doc.root.push({ type: 'p', children: [] }, { id: 'h', type: 'p', children: [] }, { _id: 'legacy', type: 'div' });
    const { tree, repairedIds } = fromDocument(doc, sequentialIds('x'));
    expect(repairedIds).toEqual(['h']);
    expect(tree.rootIds.slice(2)).toEqual(['x1', 'x2', 'legacy']);
    expect(tree.nodes.legacy?.fields._id).toBe('legacy');
    expect(checkTree(tree, SERVER_LIMITS)).toEqual([]);
  });

  it('rejects envelopes the editor cannot read', () => {
    const bad = [
      null, { ...sampleDocument(), schemaVersion: 2 }, { ...sampleDocument(), root: {} },
      { ...sampleDocument(), root: [{ children: [] }] }, { ...sampleDocument(), root: [{ type: 'p', children: 'x' }] },
    ];
    for (const value of bad) {
      expect(() => parseDocument(value)).toThrow(EditorError);
    }
    expect(parseDocument(sampleDocument()).documentId).toBe('page-1');
    expect(parseDocument({ ...sampleDocument(), settings: [] }).settings).toEqual({});
  });
});
