// src/core/errors.ts
var e = class extends Error {
	code;
	details;
	constructor(e, t, n = {}) {
		super(t), this.code = e, this.details = n, this.name = "EditorError";
	}
}, t = (t, n, r = {}) => {
	throw new e(t, n, r);
}, n = () => ({
	nodes: {},
	rootIds: []
}), r = (e, t) => t === null ? e.rootIds : e.nodes[t]?.children ?? [], i = (e, t, n) => {
	if (t === null) return {
		...e,
		rootIds: n
	};
	let r = e.nodes[t];
	return r ? a(e, {
		...r,
		children: n
	}) : e;
}, a = (e, t) => ({
	...e,
	nodes: {
		...e.nodes,
		[t.id]: t
	}
}), o = (e, t) => {
	let n = { ...e.nodes };
	for (let e of t) delete n[e];
	return {
		...e,
		nodes: n
	};
}, s = (e, t, n) => {
	let r = Math.max(0, Math.min(t, e.length));
	return [
		...e.slice(0, r),
		n,
		...e.slice(r)
	];
}, c = (e, n) => e.nodes[n] ?? t("NODE_NOT_FOUND", `Node ${n} does not exist`, { id: n }), l = (e, t) => {
	let n = [], r = [t];
	for (; r.length > 0;) {
		let t = r.pop();
		n.push(t);
		let i = e.nodes[t];
		i && r.push(...[...i.children].reverse());
	}
	return n;
}, u = (e, t, n) => {
	let r = n;
	for (; r !== null;) {
		if (r === t) return !0;
		r = e.nodes[r]?.parent ?? null;
	}
	return !1;
}, d = (e, t) => {
	let n = 0, r = t;
	for (; r !== null;) n++, r = e.nodes[r]?.parent ?? null;
	return n;
}, f = (e, t) => {
	let n = e.nodes[t];
	return !n || n.children.length === 0 ? 1 : 1 + Math.max(...n.children.map((t) => f(e, t)));
}, p = (e, t) => r(e, c(e, t).parent).indexOf(t), m = (e) => Object.keys(e.nodes).length, h = /* @__PURE__ */ new Set([
	"id",
	"type",
	"children"
]), g = (e) => {
	let t = {};
	for (let [n, r] of Object.entries(e)) h.has(n) || (t[n] = r);
	return t;
}, _ = (e, t, n, r, i, o = /* @__PURE__ */ new Map()) => {
	let s = typeof t.id == "string" && t.id !== "" ? t.id : typeof t._id == "string" ? t._id : "", c = i === "keep" && s !== "" && !e.nodes[s] ? s : r();
	s !== "" && o.set(s, c);
	let l = g(t);
	"_id" in l && (l._id = c);
	let u = a(e, {
		id: c,
		type: t.type,
		parent: n,
		children: [],
		fields: l
	}), d = [];
	for (let e of t.children ?? []) {
		let t = _(u, e, c, r, i, o);
		u = t.state, d.push(t.id);
	}
	return u = a(u, {
		...u.nodes[c],
		children: d
	}), {
		state: u,
		id: c,
		renamed: o
	};
}, v = (e, t) => {
	let n = c(e, t);
	return {
		id: n.id,
		type: n.type,
		...n.fields,
		children: n.children.map((t) => v(e, t))
	};
}, y = (e) => {
	let t = (e.children ?? []).map(y);
	return {
		count: 1 + t.reduce((e, t) => e + t.count, 0),
		height: 1 + Math.max(0, ...t.map((e) => e.height))
	};
}, b = 1, x = (e) => typeof e == "object" && !!e && !Array.isArray(e), S = (t, n) => {
	if (!x(t) || typeof t.type != "string" || t.type === "") throw new e("INVALID_DOCUMENT", `Node without type at ${n}`, { path: n });
	if (t.children !== void 0 && !Array.isArray(t.children)) throw new e("INVALID_DOCUMENT", `Children must be a list at ${n}`, { path: n });
	t.children?.forEach((e, t) => S(e, `${n}.children[${t}]`));
}, C = (t) => {
	if (!x(t) || t.schemaVersion !== 1) throw new e("INVALID_DOCUMENT", "Unsupported document schema version");
	let { documentId: n, revision: r, root: i, resources: a } = t, o = Array.isArray(t.settings) && t.settings.length === 0 ? {} : t.settings;
	if (typeof n != "string" || n === "" || typeof r != "number" || !Array.isArray(i) || !x(o) || !Array.isArray(a)) throw new e("INVALID_DOCUMENT", "Invalid document envelope");
	return i.forEach((e, t) => S(e, `root[${t}]`)), {
		...t,
		settings: o
	};
}, w = (e, t) => {
	let r = n(), i = /* @__PURE__ */ new Set(), a = [], o = [];
	for (let n of e.root) {
		let e = _(r, n, null, t, "keep");
		for (let [t, n] of e.renamed) (i.has(t) || t !== n) && a.push(t), i.add(t);
		r = e.state, o.push(e.id);
	}
	return {
		tree: {
			...r,
			rootIds: o
		},
		meta: {
			documentId: e.documentId,
			settings: e.settings,
			resources: e.resources
		},
		repairedIds: [...new Set(a)]
	};
}, T = (e, t, n) => ({
	schemaVersion: 1,
	documentId: t.documentId,
	revision: n,
	root: e.rootIds.map((t) => v(e, t)),
	settings: { ...t.settings },
	resources: [...t.resources]
}), E = (e) => {
	switch (e.kind) {
		case "updateProps": return `props:${e.id}:${[...Object.keys(e.set), ...e.unset ?? []].sort().join(",")}`;
		case "rename": return `rename:${e.id}`;
		default: return null;
	}
}, D = {
	limit: 100,
	groupWindowMs: 500
}, O = () => ({
	past: [],
	future: []
}), k = (e, t, n, r, i = D) => {
	let a = E(t), o = e.past[e.past.length - 1];
	if (a !== null && o && o.group === a && r - o.at <= i.groupWindowMs) {
		let n = {
			undo: o.undo,
			redo: t,
			group: a,
			at: r
		};
		return {
			past: [...e.past.slice(0, -1), n],
			future: []
		};
	}
	let s = [...e.past, {
		undo: n,
		redo: t,
		group: a,
		at: r
	}];
	return {
		past: s.slice(Math.max(0, s.length - i.limit)),
		future: []
	};
}, A = (e) => e.past.length > 0, j = (e) => e.future.length > 0, M = (e, t) => {
	let n = e.past[e.past.length - 1];
	return n ? {
		past: e.past.slice(0, -1),
		future: [...e.future, {
			...n,
			redo: t,
			group: null
		}]
	} : e;
}, N = (e, t) => {
	let n = e.future[e.future.length - 1];
	return n ? {
		past: [...e.past, {
			...n,
			undo: t,
			group: null
		}],
		future: e.future.slice(0, -1)
	} : e;
}, ee = (e) => ({
	type: e.name,
	label: e.label,
	category: e.category,
	isContainer: e.isContainer ?? !1,
	allowedChildren: e.isContainer ? e.allowedChildren ?? ["*"] : [],
	disallowedChildren: [],
	allowedParents: e.allowedParents ?? ["*"],
	propsSchema: e.propsSchema ?? {},
	editorControls: e.editorControls ?? {},
	version: e.version
}), te = (e) => ({
	type: e.tag,
	label: e.tag,
	category: e.category ?? "html",
	isContainer: e.allows_children ?? !1,
	allowedChildren: e.allows_children ? e.allowed_children ?? ["*"] : [],
	disallowedChildren: e.disallowed_children ?? [],
	allowedParents: ["*"],
	propsSchema: {},
	editorControls: {},
	version: 1
}), P = (e, t = []) => {
	let n = /* @__PURE__ */ new Map();
	for (let e of t) n.set(e.tag, te(e));
	for (let t of e) n.set(t.name, ee(t));
	return {
		rules: n,
		get: (e) => n.get(e),
		has: (e) => n.has(e)
	};
}, ne = class {
	listeners = /* @__PURE__ */ new Map();
	on(e, t) {
		let n = this.listeners.get(e) ?? /* @__PURE__ */ new Set();
		return n.add(t), this.listeners.set(e, n), () => n.delete(t);
	}
	emit(e, t) {
		for (let n of this.listeners.get(e) ?? []) n(t);
	}
	clear() {
		this.listeners.clear();
	}
}, re = class {
	options;
	events = new ne();
	status = "loading";
	tree = n();
	savedTree = n();
	meta = {
		documentId: "",
		settings: {},
		resources: []
	};
	baseRevision = 0;
	history = O();
	selection = null;
	catalogue = P([]);
	commands = null;
	lastError = null;
	conflictRevision = null;
	constructor(e) {
		this.options = e;
	}
	get dirty() {
		return this.tree !== this.savedTree;
	}
	setStatus(e) {
		this.status !== e && (this.status = e, this.events.emit("status-change", { status: e }));
	}
	commitTree(e, t) {
		let n = this.dirty;
		this.tree = e, this.dirty !== n && this.events.emit("dirty-change", { dirty: this.dirty }), (this.status === "ready" || this.status === "dirty") && this.setStatus(this.dirty ? "dirty" : "ready"), this.select(t !== null && e.nodes[t] ? t : null);
	}
	markSaved(e, t) {
		let n = this.dirty;
		this.savedTree = e, this.baseRevision = t, this.dirty !== n && this.events.emit("dirty-change", { dirty: this.dirty });
	}
	select(e) {
		let t = e !== null && this.tree.nodes[e] ? e : null;
		t !== this.selection && (this.selection = t, this.events.emit("selection-change", { id: t }));
	}
	setHistory(e) {
		this.history = e, this.events.emit("history-change", {
			canUndo: A(e),
			canRedo: j(e)
		});
	}
}, F = (e, t) => e.includes("*") || e.includes(t), I = (e, n, r, i) => {
	let a = i === null ? null : e.nodes[i]?.type ?? null, o = n.get(r);
	if (o && a !== null && !F(o.allowedParents, a) && t("PLACEMENT_NOT_ALLOWED", `${r} cannot be placed inside ${a}`, {
		type: r,
		parent: a
	}), o && a === null && !F(o.allowedParents, "*") && !o.allowedParents.includes("root") && t("PLACEMENT_NOT_ALLOWED", `${r} cannot be placed at the root`, {
		type: r,
		parent: "root"
	}), a === null) return;
	let s = n.get(a);
	s && (s.isContainer && F(s.allowedChildren, r) && !s.disallowedChildren.includes(r) || t("PLACEMENT_NOT_ALLOWED", `${a} does not accept ${r}`, {
		type: r,
		parent: a
	}));
}, L = (e, n) => {
	e.has(n) || t("UNKNOWN_COMPONENT", `Unknown component ${n}`, { type: n });
}, R = (e, n) => {
	e.has(n) || t("LOCKED_COMPONENT", `${n} is not in the catalogue and cannot be edited`, { type: n });
}, z = (e, n) => {
	L(e, n.type);
	let r = e.get(n.type);
	for (let i of n.children ?? []) r && (!r.isContainer || !F(r.allowedChildren, i.type) || r.disallowedChildren.includes(i.type)) && t("PLACEMENT_NOT_ALLOWED", `${n.type} does not accept ${i.type}`, {
		type: i.type,
		parent: n.type
	}), z(e, i);
}, B = {
	maxNodes: 500,
	maxDepth: 15,
	maxBytes: 2e6
}, V = (e, n) => {
	n > e.maxNodes && t("MAX_NODES", `A page holds at most ${e.maxNodes} nodes`, { limit: String(e.maxNodes) });
}, H = (e, n) => {
	n > e.maxDepth && t("MAX_DEPTH", `Nodes can be nested ${e.maxDepth} levels at most`, { limit: String(e.maxDepth) });
}, U = (e, n) => {
	let r = new TextEncoder().encode(n).length;
	r > e.maxBytes && t("DOCUMENT_TOO_LARGE", `The page is ${r} bytes; the limit is ${e.maxBytes}`, {
		bytes: String(r),
		limit: String(e.maxBytes)
	});
}, W = (e, n, a, o, c, l, u = 0) => {
	a !== null && !e.nodes[a] && t("NODE_NOT_FOUND", `Node ${a} does not exist`, { id: a });
	let f = y(n);
	V(c.limits, m(e) - u + f.count), H(c.limits, d(e, a) + f.height), I(e, c.catalogue, n.type, a);
	let p = _(e, n, a, c.ids, l);
	return {
		state: i(p.state, a, s(r(p.state, a), o, p.id)),
		id: p.id,
		renamed: p.renamed
	};
}, G = [
	"targetId",
	"for",
	"aria-controls",
	"aria-labelledby",
	"aria-describedby"
], ie = (e, t, n) => {
	let r = e;
	for (let i of l(e, t)) {
		let e = r.nodes[i], t = e?.fields.props;
		if (!e || typeof t != "object" || !t || Array.isArray(t)) continue;
		let o = !1, s = { ...t };
		for (let e of G) {
			let t = s[e];
			typeof t == "string" && n.has(t) && (s[e] = n.get(t), o = !0);
		}
		o && (r = a(r, {
			...e,
			fields: {
				...e.fields,
				props: s
			}
		}));
	}
	return r;
}, ae = (e, t, n) => {
	let r = c(e, t.id), i = W(e, v(e, t.id), r.parent, p(e, t.id) + 1, n, "fresh");
	return {
		state: ie(i.state, i.id, i.renamed),
		inverse: {
			kind: "remove",
			id: i.id
		},
		focus: i.id
	};
}, oe = (e, t, n) => {
	z(n.catalogue, t.node);
	let r = W(e, t.node, t.parent, t.index, n, "fresh");
	return {
		state: r.state,
		inverse: {
			kind: "remove",
			id: r.id
		},
		focus: r.id
	};
}, se = (e, t, n) => {
	let r = W(e, t.node, t.parent, t.index, n, "keep");
	return {
		state: r.state,
		inverse: {
			kind: "remove",
			id: r.id
		},
		focus: r.id
	};
}, ce = (e, n, o) => {
	let l = c(e, n.id);
	n.parent !== null && c(e, n.parent), n.parent !== null && u(e, n.id, n.parent) && t("CYCLE", "A node cannot be moved inside itself", { id: n.id }), H(o.limits, d(e, n.parent) + f(e, n.id)), n.parent !== l.parent && I(e, o.catalogue, l.type, n.parent);
	let m = p(e, n.id), h = i(e, l.parent, r(e, l.parent).filter((e) => e !== n.id)), g = n.parent === l.parent, _ = g && n.index > m ? n.index - 1 : n.index, v = i(h, n.parent, s(r(h, n.parent), _, n.id)), y = a(v, {
		...c(v, n.id),
		parent: n.parent
	}), b = g && m > _ ? m + 1 : m;
	return {
		state: y,
		inverse: {
			kind: "move",
			id: n.id,
			parent: l.parent,
			index: b
		},
		focus: n.id
	};
}, K = (e, t) => {
	let n = c(e, t.id), a = p(e, t.id), s = r(e, n.parent).filter((e) => e !== t.id), u = v(e, t.id), d = o(i(e, n.parent, s), l(e, t.id)), f = s[a] ?? s[a - 1] ?? n.parent;
	return {
		state: d,
		inverse: {
			kind: "restore",
			parent: n.parent,
			index: a,
			node: u
		},
		focus: f
	};
}, q = (e) => typeof e == "string" ? e : null, le = (e, t) => {
	let n = c(e, t.id), r = { ...n.fields };
	for (let e of ["name", "label"]) {
		let n = t[e];
		n === null ? delete r[e] : r[e] = n;
	}
	let i = {
		kind: "rename",
		id: t.id,
		name: q(n.fields.name),
		label: q(n.fields.label)
	};
	return {
		state: a(e, {
			...n,
			fields: r
		}),
		inverse: i,
		focus: t.id
	};
}, ue = (e, t, n) => {
	let r = c(e, t.id), i = p(e, t.id), a = v(e, t.id);
	t.keepIds || z(n.catalogue, t.node);
	let o = K(e, {
		kind: "remove",
		id: t.id
	}, n).state, s = W(o, t.node, r.parent, i, n, t.keepIds ? "keep" : "fresh");
	return {
		state: s.state,
		inverse: {
			kind: "replace",
			id: s.id,
			node: a,
			keepIds: !0
		},
		focus: s.id
	};
}, de = (e) => typeof e == "object" && e && !Array.isArray(e) ? { ...e } : {}, fe = {
	insert: oe,
	restore: se,
	remove: K,
	move: ce,
	duplicate: ae,
	updateProps: (e, t, n) => {
		let r = c(e, t.id);
		R(n.catalogue, r.type);
		let i = de(r.fields.props), o = {
			...i,
			...t.set
		};
		for (let e of t.unset ?? []) delete o[e];
		let s = {}, l = [];
		for (let e of [...Object.keys(t.set), ...t.unset ?? []]) e in i ? s[e] = i[e] : l.push(e);
		return {
			state: a(e, {
				...r,
				fields: {
					...r.fields,
					props: o
				}
			}),
			inverse: {
				kind: "updateProps",
				id: t.id,
				set: s,
				unset: l
			},
			focus: t.id
		};
	},
	rename: le,
	replace: ue
}, J = (e, t, n) => {
	let r = fe[t.kind];
	return r(e, t, n);
}, Y = (e) => ({
	context: e,
	apply: (t, n) => J(t, n, e)
}), X = async (t) => {
	let { transport: n, pageId: r, ids: i, limits: a } = t.options;
	t.setStatus("loading");
	try {
		let [e, o, s] = await Promise.all([
			n.listComponents(),
			n.listElementRules(),
			n.load(r)
		]);
		t.catalogue = P(e, o), t.commands = Y({
			catalogue: t.catalogue,
			limits: a,
			ids: i
		});
		let c = w(s.document, i);
		t.meta = c.meta, t.tree = c.tree, t.markSaved(c.tree, s.revision), t.setHistory(O()), t.conflictRevision = null, t.lastError = null, t.setStatus("ready"), t.events.emit("ready", {
			revision: s.revision,
			repairedIds: c.repairedIds
		});
	} catch (n) {
		throw t.lastError = n instanceof e ? n : new e("SERVER", String(n)), t.setStatus("load-error"), t.lastError;
	}
}, Z = () => {
	let e = /* @__PURE__ */ new Uint8Array(8);
	return globalThis.crypto.getRandomValues(e), "n" + Array.from(e, (e) => e.toString(36).padStart(2, "0")).join("").slice(0, 12);
}, pe = (e = "n") => {
	let t = 0;
	return () => `${e}${++t}`;
}, me = (e) => ({
	pageId: e.pageId,
	transport: e.transport,
	ids: e.ids ?? Z,
	limits: e.limits ?? B,
	history: {
		...D,
		...e.history
	},
	now: e.now ?? (() => Date.now())
}), Q = async (t, n) => {
	if (t.status === "loading" || t.status === "load-error") throw new e("INVALID_DOCUMENT", "Nothing loaded to save");
	if (t.status === "saving") throw new e("SAVE_IN_PROGRESS", "A save is already running");
	if (t.status === "conflict") throw new e("REVISION_CONFLICT", "Resolve the conflict before saving", { currentRevision: String(t.conflictRevision ?? "") });
	if (!t.dirty) {
		if (n === "autosave") return null;
		throw new e("NOTHING_TO_SAVE", "There are no changes to save");
	}
	let r = t.tree, i = T(r, t.meta, t.baseRevision + 1);
	U(t.options.limits, JSON.stringify(i));
	let a = t.status;
	t.setStatus("saving"), t.events.emit("save-start", {
		reason: n,
		baseRevision: t.baseRevision
	});
	try {
		let { revision: e } = await t.options.transport.save(i, t.baseRevision, n);
		return t.markSaved(r, e), t.lastError = null, t.setStatus(t.dirty ? "dirty" : "ready"), t.events.emit("save-success", { revision: e }), e;
	} catch (n) {
		let r = n instanceof e ? n : new e("SERVER", String(n));
		if (t.lastError = r, r.code === "REVISION_CONFLICT") {
			let e = Number(r.details.currentRevision);
			t.conflictRevision = Number.isInteger(e) && e > 0 ? e : null, t.setStatus("conflict"), t.events.emit("conflict", {
				baseRevision: t.baseRevision,
				currentRevision: t.conflictRevision
			});
		} else t.setStatus(r.code === "NETWORK" ? "offline" : a === "offline" ? "dirty" : a), t.events.emit("save-error", { error: r });
		throw r;
	}
}, he = async (e, t) => {
	e.status === "conflict" && (t === "take-theirs" ? await X(e) : (e.baseRevision = e.conflictRevision ?? (await e.options.transport.load(e.options.pageId)).revision, e.conflictRevision = null, e.setStatus("dirty"), await Q(e, "edit")));
}, ge = class {
	core;
	constructor(e) {
		this.core = new re(me(e));
	}
	get events() {
		return this.core.events;
	}
	get status() {
		return this.core.status;
	}
	get tree() {
		return this.core.tree;
	}
	get selection() {
		return this.core.selection;
	}
	get baseRevision() {
		return this.core.baseRevision;
	}
	get dirty() {
		return this.core.dirty;
	}
	get catalogue() {
		return this.core.catalogue;
	}
	get lastError() {
		return this.core.lastError;
	}
	get canUndo() {
		return A(this.core.history);
	}
	get canRedo() {
		return j(this.core.history);
	}
	load() {
		return X(this.core);
	}
	dispatch(e) {
		let t = this.editable().apply(this.core.tree, e);
		this.core.setHistory(k(this.core.history, e, t.inverse, this.core.options.now(), this.core.options.history)), this.core.commitTree(t.state, t.focus);
	}
	undo() {
		let e = this.editable(), t = this.core.history.past[this.core.history.past.length - 1];
		if (!t) return;
		let n = e.apply(this.core.tree, t.undo);
		this.core.setHistory(M(this.core.history, n.inverse)), this.core.commitTree(n.state, n.focus);
	}
	redo() {
		let e = this.editable(), t = this.core.history.future[this.core.history.future.length - 1];
		if (!t) return;
		let n = e.apply(this.core.tree, t.redo);
		this.core.setHistory(N(this.core.history, n.inverse)), this.core.commitTree(n.state, n.focus);
	}
	select(e) {
		this.core.select(e);
	}
	save(e = "edit") {
		return Q(this.core, e);
	}
	resolveConflict(e) {
		return he(this.core, e);
	}
	toDocument() {
		return T(this.core.tree, this.core.meta, this.core.baseRevision + 1);
	}
	destroy() {
		this.core.events.clear();
	}
	editable() {
		if (!this.core.commands || this.core.status === "loading" || this.core.status === "load-error" || this.core.status === "saving") throw new e("INVALID_DOCUMENT", `The editor cannot change the page while ${this.core.status}`);
		return this.core.commands;
	}
}, _e = (e, t) => {
	let n = [], r = /* @__PURE__ */ new Set(), i = (a, o, s, c) => {
		if (c.has(a)) {
			n.push({
				code: "CYCLE",
				id: a
			});
			return;
		}
		if (r.has(a)) {
			n.push({
				code: "DUPLICATE_ID",
				id: a
			});
			return;
		}
		r.add(a);
		let l = e.nodes[a];
		if (!l) {
			n.push({
				code: "ORPHAN",
				id: a
			});
			return;
		}
		l.parent !== o && n.push({
			code: "PARENT_MISMATCH",
			id: a
		}), s > t.maxDepth && n.push({
			code: "MAX_DEPTH",
			id: a
		});
		let u = new Set(c).add(a);
		for (let e of l.children) i(e, a, s + 1, u);
	};
	for (let t of e.rootIds) i(t, null, 1, /* @__PURE__ */ new Set());
	for (let t of Object.keys(e.nodes)) r.has(t) || n.push({
		code: "ORPHAN",
		id: t
	});
	return r.size > t.maxNodes && n.push({
		code: "MAX_NODES",
		id: ""
	}), n;
}, ve = (e) => {
	let t = {};
	if (typeof e == "object" && e) for (let [n, r] of Object.entries(e)) (typeof r == "string" || typeof r == "number") && (t[n] = String(r));
	return t;
}, ye = (e, t) => e === 412 || t === "REVISION_CONFLICT" ? "REVISION_CONFLICT" : e === 403 || e === 401 ? "AUTHORIZATION_DENIED" : e === 422 || e === 400 ? "VALIDATION_FAILED" : e === 404 ? "NODE_NOT_FOUND" : "SERVER", $ = (t, n) => {
	let r = n?.error ?? {}, i = typeof r.code == "string" ? r.code : "", a = ve(r.fieldErrors);
	typeof r.requestId == "string" && (a.requestId = r.requestId), i !== "" && (a.apiCode = i), a.status = String(t);
	let o = typeof r.message == "string" ? r.message : `HTTP ${t}`;
	return new e(ye(t, i), o, a);
}, be = (t) => new e("NETWORK", t instanceof Error ? t.message : "Network error"), xe = (t) => {
	let n = t.fetch ?? globalThis.fetch.bind(globalThis), r = t.baseUrl.replace(/\/+$/, ""), i = (e) => `${r}/pages/${encodeURIComponent(e)}`, a = async (r, i = {}) => {
		let a;
		try {
			a = await n(r, {
				...i,
				credentials: "same-origin",
				headers: {
					Accept: "application/json",
					...t.headers?.(),
					...i.headers
				}
			});
		} catch (e) {
			throw be(e);
		}
		let o = await a.json().catch(() => null);
		if (!a.ok) throw $(a.status, o);
		let s = o?.data;
		if (typeof s != "object" || !s) throw new e("SERVER", "Unexpected response", { status: String(a.status) });
		return s;
	};
	return {
		async load(e) {
			let t = await a(`${i(e)}/draft`);
			return {
				revision: Number(t.revision),
				document: C(t.snapshot)
			};
		},
		async save(e, t, n) {
			let r = n === "autosave" ? "?reason=autosave" : "", o = await a(`${i(e.documentId)}/draft${r}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"If-Match": `"${t}"`
				},
				body: JSON.stringify(e)
			});
			return { revision: Number(o.revision) };
		},
		async preview(e, t) {
			return C((await a(`${i(e)}/revisions/${t}`)).snapshot);
		},
		async listComponents() {
			return (await a(`${r}/components`)).components ?? [];
		},
		async listElementRules() {
			if (!t.rulesUrl) return [];
			let e = await a(t.rulesUrl);
			return Object.values(e.html_tags ?? {});
		}
	};
}, Se = (e) => new ge(e);
export { D as DEFAULT_HISTORY, e as EditorError, ge as EditorSession, G as REFERENCE_PROPS, b as SCHEMA_VERSION, B as SERVER_LIMITS, N as afterRedo, M as afterUndo, J as applyCommand, H as assertDepth, R as assertEditable, L as assertKnown, z as assertNewContent, V as assertNodeCount, I as assertPlacement, U as assertSize, _ as attachRaw, j as canRedo, A as canUndo, _e as checkTree, r as childrenOf, P as createCatalogue, Y as createCommands, Se as createEditor, xe as createHttpTransport, d as depthOf, O as emptyHistory, n as emptyTree, $ as errorFromResponse, t as fail, w as fromDocument, c as getNode, E as groupKeyOf, f as heightOf, p as indexInParent, s as insertAt, u as isSelfOrDescendant, y as measureRaw, m as nodeCount, C as parseDocument, Z as randomIds, k as record, pe as sequentialIds, l as subtreeIds, T as toDocument, v as toRaw, i as withChildren, a as withNode, o as withoutNodes };

//# sourceMappingURL=core.js.map