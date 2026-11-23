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
}, ee = 1, b = (e) => typeof e == "object" && !!e && !Array.isArray(e), te = (t, n) => {
	if (!b(t) || typeof t.type != "string" || t.type === "") throw new e("INVALID_DOCUMENT", `Node without type at ${n}`, { path: n });
	if (t.children !== void 0 && !Array.isArray(t.children)) throw new e("INVALID_DOCUMENT", `Children must be a list at ${n}`, { path: n });
	t.children?.forEach((e, t) => te(e, `${n}.children[${t}]`));
}, x = (t) => {
	if (!b(t) || t.schemaVersion !== 1) throw new e("INVALID_DOCUMENT", "Unsupported document schema version");
	let { documentId: n, revision: r, root: i, resources: a } = t, o = Array.isArray(t.settings) && t.settings.length === 0 ? {} : t.settings;
	if (typeof n != "string" || n === "" || typeof r != "number" || !Array.isArray(i) || !b(o) || !Array.isArray(a)) throw new e("INVALID_DOCUMENT", "Invalid document envelope");
	return i.forEach((e, t) => te(e, `root[${t}]`)), {
		...t,
		settings: o
	};
}, ne = (e, t) => {
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
}, S = (e, t, n) => ({
	schemaVersion: 1,
	documentId: t.documentId,
	revision: n,
	root: e.rootIds.map((t) => v(e, t)),
	settings: { ...t.settings },
	resources: [...t.resources]
}), re = (e) => {
	switch (e.kind) {
		case "updateProps": return `props:${e.id}:${[...Object.keys(e.set), ...e.unset ?? []].sort().join(",")}`;
		case "updateFields": return `fields:${e.id}:${[...Object.keys(e.set), ...e.unset ?? []].sort().join(",")}`;
		case "rename": return `rename:${e.id}`;
		default: return null;
	}
}, C = {
	limit: 100,
	groupWindowMs: 500
}, w = () => ({
	past: [],
	future: []
}), ie = (e, t, n, r, i = C) => {
	let a = re(t), o = e.past[e.past.length - 1];
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
}, T = (e) => e.past.length > 0, E = (e) => e.future.length > 0, D = (e, t) => {
	let n = e.past[e.past.length - 1];
	return n ? {
		past: e.past.slice(0, -1),
		future: [...e.future, {
			...n,
			redo: t,
			group: null
		}]
	} : e;
}, O = (e, t) => {
	let n = e.future[e.future.length - 1];
	return n ? {
		past: [...e.past, {
			...n,
			undo: t,
			group: null
		}],
		future: e.future.slice(0, -1)
	} : e;
}, ae = (e) => ({
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
}), oe = (e) => ({
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
}), k = (e, t = []) => {
	let n = /* @__PURE__ */ new Map();
	for (let e of t) n.set(e.tag, oe(e));
	for (let t of e) n.set(t.name, ae(t));
	return {
		rules: n,
		get: (e) => n.get(e),
		has: (e) => n.has(e)
	};
}, se = class {
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
}, ce = class {
	options;
	events = new se();
	status = "loading";
	tree = n();
	savedTree = n();
	meta = {
		documentId: "",
		settings: {},
		resources: []
	};
	baseRevision = 0;
	history = w();
	selection = null;
	catalogue = k([]);
	commands = null;
	lastError = null;
	conflictRevision = null;
	capabilities = null;
	publishedRevision = null;
	publishing = !1;
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
			canUndo: T(e),
			canRedo: E(e)
		});
	}
}, A = (e, t) => e.includes("*") || e.includes(t), j = (e, n, r, i) => {
	let a = i === null ? null : e.nodes[i]?.type ?? null, o = n.get(r);
	if (o && a !== null && !A(o.allowedParents, a) && t("PLACEMENT_NOT_ALLOWED", `${r} cannot be placed inside ${a}`, {
		type: r,
		parent: a
	}), o && a === null && !A(o.allowedParents, "*") && !o.allowedParents.includes("root") && t("PLACEMENT_NOT_ALLOWED", `${r} cannot be placed at the root`, {
		type: r,
		parent: "root"
	}), a === null) return;
	let s = n.get(a);
	s && (s.isContainer && A(s.allowedChildren, r) && !s.disallowedChildren.includes(r) || t("PLACEMENT_NOT_ALLOWED", `${a} does not accept ${r}`, {
		type: r,
		parent: a
	}));
}, le = (e, n) => {
	e.has(n) || t("UNKNOWN_COMPONENT", `Unknown component ${n}`, { type: n });
}, M = (e, n) => {
	e.has(n) || t("LOCKED_COMPONENT", `${n} is not in the catalogue and cannot be edited`, { type: n });
}, N = (e, n) => {
	le(e, n.type);
	let r = e.get(n.type);
	for (let i of n.children ?? []) r && (!r.isContainer || !A(r.allowedChildren, i.type) || r.disallowedChildren.includes(i.type)) && t("PLACEMENT_NOT_ALLOWED", `${n.type} does not accept ${i.type}`, {
		type: i.type,
		parent: n.type
	}), N(e, i);
}, ue = {
	maxNodes: 500,
	maxDepth: 15,
	maxBytes: 2e6
}, P = (e, n) => {
	n > e.maxNodes && t("MAX_NODES", `A page holds at most ${e.maxNodes} nodes`, { limit: String(e.maxNodes) });
}, F = (e, n) => {
	n > e.maxDepth && t("MAX_DEPTH", `Nodes can be nested ${e.maxDepth} levels at most`, { limit: String(e.maxDepth) });
}, I = (e, n) => {
	let r = new TextEncoder().encode(n).length;
	r > e.maxBytes && t("DOCUMENT_TOO_LARGE", `The page is ${r} bytes; the limit is ${e.maxBytes}`, {
		bytes: String(r),
		limit: String(e.maxBytes)
	});
}, L = (e, n, a, o, c, l, u = 0) => {
	a !== null && !e.nodes[a] && t("NODE_NOT_FOUND", `Node ${a} does not exist`, { id: a });
	let f = y(n);
	P(c.limits, m(e) - u + f.count), F(c.limits, d(e, a) + f.height), j(e, c.catalogue, n.type, a);
	let p = _(e, n, a, c.ids, l);
	return {
		state: i(p.state, a, s(r(p.state, a), o, p.id)),
		id: p.id,
		renamed: p.renamed
	};
}, R = [
	"targetId",
	"for",
	"aria-controls",
	"aria-labelledby",
	"aria-describedby"
], de = (e, t, n) => {
	let r = e;
	for (let i of l(e, t)) {
		let e = r.nodes[i], t = e?.fields.props;
		if (!e || typeof t != "object" || !t || Array.isArray(t)) continue;
		let o = !1, s = { ...t };
		for (let e of R) {
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
}, fe = (e, t, n) => {
	let r = c(e, t.id), i = L(e, v(e, t.id), r.parent, p(e, t.id) + 1, n, "fresh");
	return {
		state: de(i.state, i.id, i.renamed),
		inverse: {
			kind: "remove",
			id: i.id
		},
		focus: i.id
	};
}, pe = (e, t, n) => {
	N(n.catalogue, t.node);
	let r = L(e, t.node, t.parent, t.index, n, "fresh");
	return {
		state: r.state,
		inverse: {
			kind: "remove",
			id: r.id
		},
		focus: r.id
	};
}, me = (e, t, n) => {
	let r = L(e, t.node, t.parent, t.index, n, "keep");
	return {
		state: r.state,
		inverse: {
			kind: "remove",
			id: r.id
		},
		focus: r.id
	};
}, he = (e, n, o) => {
	let l = c(e, n.id);
	n.parent !== null && c(e, n.parent), n.parent !== null && u(e, n.id, n.parent) && t("CYCLE", "A node cannot be moved inside itself", { id: n.id }), F(o.limits, d(e, n.parent) + f(e, n.id)), n.parent !== l.parent && j(e, o.catalogue, l.type, n.parent);
	let m = p(e, n.id), h = i(e, l.parent, r(e, l.parent).filter((e) => e !== n.id)), g = n.parent === l.parent, _ = g && n.index > m ? n.index - 1 : n.index, v = i(h, n.parent, s(r(h, n.parent), _, n.id)), y = a(v, {
		...c(v, n.id),
		parent: n.parent
	}), ee = g && m > _ ? m + 1 : m;
	return {
		state: y,
		inverse: {
			kind: "move",
			id: n.id,
			parent: l.parent,
			index: ee
		},
		focus: n.id
	};
}, z = (e, t) => {
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
}, B = (e) => typeof e == "string" ? e : null, ge = (e, t) => {
	let n = c(e, t.id), r = { ...n.fields };
	for (let e of ["name", "label"]) {
		let n = t[e];
		n === null ? delete r[e] : r[e] = n;
	}
	let i = {
		kind: "rename",
		id: t.id,
		name: B(n.fields.name),
		label: B(n.fields.label)
	};
	return {
		state: a(e, {
			...n,
			fields: r
		}),
		inverse: i,
		focus: t.id
	};
}, _e = (e, t, n) => {
	let r = c(e, t.id), i = p(e, t.id), a = v(e, t.id);
	t.keepIds || N(n.catalogue, t.node);
	let o = z(e, {
		kind: "remove",
		id: t.id
	}, n).state, s = L(o, t.node, r.parent, i, n, t.keepIds ? "keep" : "fresh");
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
}, V = [
	"loop",
	"condition",
	"bindings"
], ve = (e, n, r) => {
	let i = c(e, n.id);
	M(r.catalogue, i.type);
	let o = [...Object.keys(n.set), ...n.unset ?? []], s = o.find((e) => !V.includes(e));
	s !== void 0 && t("INVALID_TARGET", `${s} cannot be changed here`, { field: s });
	let l = {
		...i.fields,
		...n.set
	};
	for (let e of n.unset ?? []) delete l[e];
	let u = {}, d = [];
	for (let e of o) e in i.fields ? u[e] = i.fields[e] : d.push(e);
	return {
		state: a(e, {
			...i,
			fields: l
		}),
		inverse: {
			kind: "updateFields",
			id: n.id,
			set: u,
			unset: d
		},
		focus: n.id
	};
}, ye = (e) => typeof e == "object" && e && !Array.isArray(e) ? { ...e } : {}, be = {
	insert: pe,
	restore: me,
	remove: z,
	move: he,
	duplicate: fe,
	updateProps: (e, t, n) => {
		let r = c(e, t.id);
		M(n.catalogue, r.type);
		let i = ye(r.fields.props), o = {
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
	updateFields: ve,
	rename: ge,
	replace: _e
}, H = (e, t, n) => {
	let r = be[t.kind];
	return r(e, t, n);
}, U = (e) => ({
	context: e,
	apply: (t, n) => H(t, n, e)
}), xe = async (t) => {
	let { transport: n, pageId: r, ids: i, limits: a } = t.options;
	t.setStatus("loading");
	try {
		let [e, o, s, c, l] = await Promise.all([
			n.listComponents(),
			n.listElementRules(),
			n.load(r),
			n.capabilities?.().catch(() => null) ?? null,
			n.status?.(r).catch(() => null) ?? null
		]);
		t.capabilities = c, t.publishedRevision = l?.publishedRevision ?? null, t.catalogue = k(e, o), t.commands = U({
			catalogue: t.catalogue,
			limits: a,
			ids: i
		});
		let u = ne(s.document, i);
		t.meta = u.meta, t.tree = u.tree, t.markSaved(u.tree, s.revision), t.setHistory(w()), t.conflictRevision = null, t.lastError = null, t.setStatus("ready"), t.events.emit("ready", {
			revision: s.revision,
			repairedIds: u.repairedIds
		});
	} catch (n) {
		throw t.lastError = n instanceof e ? n : new e("SERVER", String(n)), t.setStatus("load-error"), t.lastError;
	}
}, Se = () => {
	let e = /* @__PURE__ */ new Uint8Array(8);
	return globalThis.crypto.getRandomValues(e), "n" + Array.from(e, (e) => e.toString(36).padStart(2, "0")).join("").slice(0, 12);
}, Ce = (e = "n") => {
	let t = 0;
	return () => `${e}${++t}`;
}, we = (e) => ({
	pageId: e.pageId,
	transport: e.transport,
	ids: e.ids ?? Se,
	limits: e.limits ?? ue,
	history: {
		...C,
		...e.history
	},
	now: e.now ?? (() => Date.now())
}), Te = (e) => {
	if (!e.options.transport.publish) return !1;
	let t = e.capabilities;
	return t ? t.features.revisionPublish ?? t.permissions.includes("pages.publish") : !0;
}, Ee = () => {
	let e = /* @__PURE__ */ new Uint8Array(16);
	return globalThis.crypto.getRandomValues(e), Array.from(e, (e) => e.toString(16).padStart(2, "0")).join("");
}, De = async (t) => {
	let n = t.options.transport.publish;
	if (!n || !Te(t)) throw new e("AUTHORIZATION_DENIED", "Publishing is not allowed here");
	if (t.status !== "ready" || t.dirty) throw new e("NOTHING_TO_PUBLISH", "Save the changes before publishing", { status: t.status });
	if (t.publishedRevision === t.baseRevision) throw new e("NOTHING_TO_PUBLISH", "This revision is already published");
	if (t.publishing) throw new e("SAVE_IN_PROGRESS", "Publishing is already running");
	let r = t.baseRevision;
	t.publishing = !0, t.events.emit("publish-start", { revision: r });
	try {
		return await n(t.options.pageId, r, Ee()), t.publishedRevision = r, t.events.emit("publish-success", { revision: r }), r;
	} catch (n) {
		let r = n instanceof e ? n : new e("SERVER", String(n));
		throw t.lastError = r, t.events.emit("publish-error", { error: r }), r;
	} finally {
		t.publishing = !1;
	}
}, W = async (t, n) => {
	if (t.status === "loading" || t.status === "load-error") throw new e("INVALID_DOCUMENT", "Nothing loaded to save");
	if (t.status === "saving") throw new e("SAVE_IN_PROGRESS", "A save is already running");
	if (t.status === "conflict") throw new e("REVISION_CONFLICT", "Resolve the conflict before saving", { currentRevision: String(t.conflictRevision ?? "") });
	if (!t.dirty) {
		if (n === "autosave") return null;
		throw new e("NOTHING_TO_SAVE", "There are no changes to save");
	}
	let r = t.tree, i = S(r, t.meta, t.baseRevision + 1);
	I(t.options.limits, JSON.stringify(i));
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
}, Oe = async (e, t) => {
	e.status === "conflict" && (t === "take-theirs" ? await xe(e) : (e.baseRevision = e.conflictRevision ?? (await e.options.transport.load(e.options.pageId)).revision, e.conflictRevision = null, e.setStatus("dirty"), await W(e, "edit")));
}, ke = class {
	core;
	constructor(e) {
		this.core = new ce(we(e));
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
		return T(this.core.history);
	}
	get canRedo() {
		return E(this.core.history);
	}
	get commandContext() {
		return this.core.commands?.context ?? null;
	}
	get capabilities() {
		return this.core.capabilities;
	}
	get publishedRevision() {
		return this.core.publishedRevision;
	}
	get canPublish() {
		return Te(this.core);
	}
	get publishing() {
		return this.core.publishing;
	}
	get conflictRevision() {
		return this.core.conflictRevision;
	}
	get pageId() {
		return this.core.options.pageId;
	}
	get transport() {
		return this.core.options.transport;
	}
	load() {
		return xe(this.core);
	}
	dispatch(e) {
		let t = this.editable().apply(this.core.tree, e);
		this.core.commitTree(t.state, t.focus), this.core.setHistory(ie(this.core.history, e, t.inverse, this.core.options.now(), this.core.options.history));
	}
	undo() {
		let e = this.editable(), t = this.core.history.past[this.core.history.past.length - 1];
		if (!t) return;
		let n = e.apply(this.core.tree, t.undo);
		this.core.commitTree(n.state, n.focus), this.core.setHistory(D(this.core.history, n.inverse));
	}
	redo() {
		let e = this.editable(), t = this.core.history.future[this.core.history.future.length - 1];
		if (!t) return;
		let n = e.apply(this.core.tree, t.redo);
		this.core.commitTree(n.state, n.focus), this.core.setHistory(O(this.core.history, n.inverse));
	}
	select(e) {
		this.core.select(e);
	}
	save(e = "edit") {
		return W(this.core, e);
	}
	publish() {
		return De(this.core);
	}
	resolveConflict(e) {
		return Oe(this.core, e);
	}
	toDocument() {
		return S(this.core.tree, this.core.meta, this.core.baseRevision + 1);
	}
	destroy() {
		this.core.events.clear();
	}
	editable() {
		if (!this.core.commands || this.core.status === "loading" || this.core.status === "load-error" || this.core.status === "saving") throw new e("INVALID_DOCUMENT", `The editor cannot change the page while ${this.core.status}`);
		return this.core.commands;
	}
}, Ae = (e, t) => {
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
}, je = (e) => {
	let t = {};
	if (typeof e == "object" && e) for (let [n, r] of Object.entries(e)) (typeof r == "string" || typeof r == "number") && (t[n] = String(r));
	return t;
}, Me = (e, t) => t === "PUBLIC_CONTENT_DRIFT" ? "PUBLIC_CONTENT_DRIFT" : e === 412 || t === "REVISION_CONFLICT" ? "REVISION_CONFLICT" : e === 403 || e === 401 ? "AUTHORIZATION_DENIED" : e === 422 || e === 400 ? "VALIDATION_FAILED" : e === 404 ? "NODE_NOT_FOUND" : "SERVER", Ne = (t, n) => {
	let r = n?.error ?? {}, i = typeof r.code == "string" ? r.code : "", a = je(r.fieldErrors);
	typeof r.requestId == "string" && (a.requestId = r.requestId), i !== "" && (a.apiCode = i), a.status = String(t);
	let o = typeof r.message == "string" ? r.message : `HTTP ${t}`;
	return new e(Me(t, i), o, a);
}, Pe = (t) => new e("NETWORK", t instanceof Error ? t.message : "Network error"), Fe = (t) => {
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
			throw Pe(e);
		}
		let o = await a.json().catch(() => null);
		if (!a.ok) throw Ne(a.status, o);
		let s = o?.data;
		if (typeof s != "object" || !s) throw new e("SERVER", "Unexpected response", { status: String(a.status) });
		return s;
	};
	return {
		async load(e) {
			let t = await a(`${i(e)}/draft`);
			return {
				revision: Number(t.revision),
				document: x(t.snapshot)
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
			return x((await a(`${i(e)}/revisions/${t}`)).snapshot);
		},
		async listComponents() {
			return (await a(`${r}/components`)).components ?? [];
		},
		async capabilities() {
			let e = await a(`${r}/capabilities`);
			return {
				permissions: Array.isArray(e.effectivePermissions) ? e.effectivePermissions.map(String) : [],
				features: e.features ?? {}
			};
		},
		async status(e) {
			let t = await a(`${i(e)}/status`), n = t.publishedRevision;
			return {
				revision: Number(t.revision),
				publishedRevision: typeof n == "number" ? n : null,
				hasUnpublishedChanges: t.hasUnpublishedChanges === !0
			};
		},
		async publish(e, t, n) {
			let r = await a(`${i(e)}/publish-revision`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Idempotency-Key": n
				},
				body: JSON.stringify({ revision: t })
			});
			return { revision: Number(r.revision) };
		},
		async render(e, t) {
			let n = await a(`${i(e)}/revisions/${t}/render`);
			return typeof n.html == "string" ? n.html : "";
		},
		async listTemplates() {
			let e = await a(`${r}/templates`);
			return Array.isArray(e.templates) ? e.templates : [];
		},
		async saveTemplate(e) {
			return (await a(`${r}/templates`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(e)
			})).template;
		},
		async importHtml(e) {
			let t = await a(`${r}/import-html`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ html: e })
			});
			return {
				nodes: Array.isArray(t.nodes) ? t.nodes : [],
				warnings: Array.isArray(t.warnings) ? t.warnings.map(String) : []
			};
		},
		async listElementRules() {
			if (!t.rulesUrl) return [];
			let e = await a(t.rulesUrl);
			return Object.values(e.html_tags ?? {});
		}
	};
}, Ie = {
	idleMs: 2e3,
	maxWaitMs: 15e3,
	retryMs: [
		2e3,
		5e3,
		15e3,
		3e4
	]
}, Le = {
	set: (e, t) => setTimeout(e, t),
	clear: (e) => clearTimeout(e),
	now: () => Date.now()
}, Re = class {
	session;
	options;
	timers;
	timer = null;
	firstChange = null;
	retries = 0;
	stops = [];
	constructor(e, t = Ie, n = Le) {
		this.session = e, this.options = t, this.timers = n;
	}
	start() {
		this.stops.push(this.session.events.on("history-change", () => this.changed()), this.session.events.on("status-change", ({ status: e }) => {
			(e === "ready" || e === "conflict" || e === "loading") && this.reset();
		}));
	}
	stop() {
		for (let e of this.stops.splice(0)) e();
		this.reset();
	}
	changed() {
		if (!this.session.dirty || this.session.status === "conflict") return;
		let e = this.timers.now();
		this.firstChange ??= e;
		let t = this.session.status === "offline" ? this.retryWait() : Math.min(this.options.idleMs, Math.max(0, this.firstChange + this.options.maxWaitMs - e));
		this.schedule(t);
	}
	schedule(e) {
		this.timer !== null && this.timers.clear(this.timer), this.timer = this.timers.set(() => void this.fire(), e);
	}
	async fire() {
		this.timer = null;
		let e = this.session.status;
		if (!(!this.session.dirty || e !== "dirty" && e !== "offline")) {
			this.firstChange = null;
			try {
				await this.session.save("autosave"), this.retries = 0, this.session.dirty && this.changed();
			} catch {
				(this.session.status === "offline" || this.session.status === "dirty") && (this.schedule(this.retryWait()), this.retries++);
			}
		}
	}
	retryWait() {
		let e = this.options.retryMs;
		return e[Math.min(this.retries, e.length - 1)] ?? this.options.idleMs;
	}
	reset() {
		this.timer !== null && this.timers.clear(this.timer), this.timer = null, this.firstChange = null, this.session.status !== "offline" && (this.retries = 0);
	}
}, ze = [
	{
		id: "sm",
		minWidth: 576
	},
	{
		id: "md",
		minWidth: 768
	},
	{
		id: "lg",
		minWidth: 992
	},
	{
		id: "xl",
		minWidth: 1200
	}
], G = {
	version: 1,
	states: [
		"hover",
		"focus-visible",
		"active"
	],
	tokenTypes: [
		"color",
		"length",
		"fontFamily",
		"fontWeight",
		"shadow",
		"duration"
	],
	keywords: {
		display: [
			"block",
			"inline",
			"inline-block",
			"flex",
			"inline-flex",
			"grid",
			"none"
		],
		flexDirection: [
			"row",
			"row-reverse",
			"column",
			"column-reverse"
		],
		flexWrap: [
			"nowrap",
			"wrap",
			"wrap-reverse"
		],
		justifyContent: [
			"flex-start",
			"flex-end",
			"center",
			"space-between",
			"space-around",
			"space-evenly",
			"start",
			"end"
		],
		alignItems: [
			"stretch",
			"flex-start",
			"flex-end",
			"center",
			"baseline",
			"start",
			"end"
		],
		alignSelf: [
			"auto",
			"stretch",
			"flex-start",
			"flex-end",
			"center",
			"baseline",
			"start",
			"end"
		],
		textAlign: [
			"left",
			"right",
			"center",
			"justify",
			"start",
			"end"
		],
		fontWeight: [
			"normal",
			"bold",
			"100",
			"200",
			"300",
			"400",
			"500",
			"600",
			"700",
			"800",
			"900"
		],
		borderStyle: [
			"none",
			"solid",
			"dashed",
			"dotted",
			"double"
		]
	},
	properties: [
		{
			name: "display",
			css: "display",
			kind: "keyword"
		},
		{
			name: "flexDirection",
			css: "flex-direction",
			kind: "keyword"
		},
		{
			name: "flexWrap",
			css: "flex-wrap",
			kind: "keyword"
		},
		{
			name: "flexGrow",
			css: "flex-grow",
			kind: "number",
			min: 0,
			max: 100
		},
		{
			name: "flexShrink",
			css: "flex-shrink",
			kind: "number",
			min: 0,
			max: 100
		},
		{
			name: "justifyContent",
			css: "justify-content",
			kind: "keyword"
		},
		{
			name: "alignItems",
			css: "align-items",
			kind: "keyword"
		},
		{
			name: "alignSelf",
			css: "align-self",
			kind: "keyword"
		},
		{
			name: "gap",
			css: "gap",
			kind: "length",
			parts: 2
		},
		{
			name: "gridTemplateColumns",
			css: "grid-template-columns",
			kind: "tracks"
		},
		{
			name: "gridColumn",
			css: "grid-column",
			kind: "gridColumn"
		},
		{
			name: "width",
			css: "width",
			kind: "length",
			auto: !0
		},
		{
			name: "minWidth",
			css: "min-width",
			kind: "length"
		},
		{
			name: "maxWidth",
			css: "max-width",
			kind: "length"
		},
		{
			name: "height",
			css: "height",
			kind: "length",
			auto: !0
		},
		{
			name: "minHeight",
			css: "min-height",
			kind: "length"
		},
		{
			name: "maxHeight",
			css: "max-height",
			kind: "length"
		},
		{
			name: "margin",
			css: "margin",
			kind: "length",
			parts: 4,
			auto: !0,
			negative: !0
		},
		{
			name: "marginBlock",
			css: "margin-block",
			kind: "length",
			parts: 2,
			auto: !0,
			negative: !0
		},
		{
			name: "marginInline",
			css: "margin-inline",
			kind: "length",
			parts: 2,
			auto: !0,
			negative: !0
		},
		{
			name: "marginTop",
			css: "margin-top",
			kind: "length",
			auto: !0,
			negative: !0
		},
		{
			name: "marginRight",
			css: "margin-right",
			kind: "length",
			auto: !0,
			negative: !0
		},
		{
			name: "marginBottom",
			css: "margin-bottom",
			kind: "length",
			auto: !0,
			negative: !0
		},
		{
			name: "marginLeft",
			css: "margin-left",
			kind: "length",
			auto: !0,
			negative: !0
		},
		{
			name: "padding",
			css: "padding",
			kind: "length",
			parts: 4
		},
		{
			name: "paddingBlock",
			css: "padding-block",
			kind: "length",
			parts: 2
		},
		{
			name: "paddingInline",
			css: "padding-inline",
			kind: "length",
			parts: 2
		},
		{
			name: "paddingTop",
			css: "padding-top",
			kind: "length"
		},
		{
			name: "paddingRight",
			css: "padding-right",
			kind: "length"
		},
		{
			name: "paddingBottom",
			css: "padding-bottom",
			kind: "length"
		},
		{
			name: "paddingLeft",
			css: "padding-left",
			kind: "length"
		},
		{
			name: "fontFamily",
			css: "font-family",
			kind: "token",
			tokenType: "fontFamily"
		},
		{
			name: "fontSize",
			css: "font-size",
			kind: "length"
		},
		{
			name: "fontWeight",
			css: "font-weight",
			kind: "keyword",
			tokenType: "fontWeight"
		},
		{
			name: "lineHeight",
			css: "line-height",
			kind: "lineHeight",
			min: .5,
			max: 10
		},
		{
			name: "textAlign",
			css: "text-align",
			kind: "keyword"
		},
		{
			name: "color",
			css: "color",
			kind: "color"
		},
		{
			name: "backgroundColor",
			css: "background-color",
			kind: "color"
		},
		{
			name: "borderWidth",
			css: "border-width",
			kind: "length",
			parts: 4
		},
		{
			name: "borderStyle",
			css: "border-style",
			kind: "keyword"
		},
		{
			name: "borderColor",
			css: "border-color",
			kind: "color"
		},
		{
			name: "borderRadius",
			css: "border-radius",
			kind: "length",
			parts: 4
		},
		{
			name: "boxShadow",
			css: "box-shadow",
			kind: "token",
			tokenType: "shadow"
		},
		{
			name: "opacity",
			css: "opacity",
			kind: "number",
			min: 0,
			max: 1
		}
	],
	limits: {
		tokens: 500,
		classes: 200,
		declarations: 60,
		valueLength: 200,
		breakpoints: 8,
		minWidth: 4e3,
		magnitude: 1e4
	}
}, Be = new Map(G.properties.map((e) => [e.name, e])), K = G.limits, Ve = /[;{}\\<>"'`]|\/\*|url\(|expression|@import|!/i, He = /^(-?)(\d+(?:\.\d+)?|\.\d+)(px|rem|em|%|vw|vh)$/, Ue = /^(\d+(?:\.\d+)?|\.\d+)fr$/, We = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, Ge = /^(?:rgb|rgba|hsl|hsla)\([0-9.%, /]{1,60}\)$/, Ke = /^(?:auto|span (?:[1-9]|1[0-2])|(?:[1-9]|1[0-3]) \/ (?:[1-9]|1[0-3]|-1))$/, qe = /^repeat\(([1-9]|1[0-2]), ?(.+)\)$/, Je = (e) => {
	let t = e.replace(/^[ \t\n\r\f\v]+|[ \t\n\r\f\v]+$/g, "").replace(/[ \t\n\r\f\v]+/g, " ");
	return t === "" || t.length > K.valueLength || Ve.test(t) ? null : t;
}, Ye = (e) => Number.isInteger(e) ? String(e) : e.toFixed(4).replace(/0+$/, "").replace(/\.$/, ""), q = (e, t = !1, n = !1) => {
	if (e === "0") return "0";
	if (e === "auto") return t ? "auto" : null;
	let r = He.exec(e);
	return !r || r[1] === "-" && !n || Number(r[2]) > K.magnitude ? null : e;
}, Xe = (e, t) => {
	let n = e.split(" ");
	return n.length > (t.parts ?? 1) ? null : n.every((e) => q(e, t.auto, t.negative) !== null) ? e : null;
}, J = (e) => e === "transparent" || e === "currentColor" || We.test(e) || Ge.test(e) ? e : null, Ze = (e) => {
	if (e === "auto" || e === "min-content" || e === "max-content") return !0;
	let t = Ue.exec(e);
	return t ? Number(t[1]) <= 100 : q(e) !== null;
}, Qe = (e) => {
	let t = qe.exec(e);
	if (t) return Ze(t[2]) ? `repeat(${t[1]}, ${t[2]})` : null;
	let n = e.split(" ");
	return n.length <= 12 && n.every(Ze) ? e : null;
}, $e = (e, t) => Number.isFinite(e) && e >= (t.min ?? 0) && e <= (t.max ?? K.magnitude) ? Ye(e) : null, et = (e, t) => {
	if (typeof t == "number") return e.kind === "number" || e.kind === "lineHeight" ? $e(t, e) : e.kind === "keyword" && e.name === "fontWeight" ? et(e, String(t)) : null;
	let n = Je(t);
	if (n === null) return null;
	switch (e.kind) {
		case "keyword": return G.keywords[e.name]?.includes(n) ? n : null;
		case "length": return Xe(n, e);
		case "color": return J(n);
		case "tracks": return Qe(n);
		case "gridColumn": return Ke.test(n) ? n : null;
		case "lineHeight": return Xe(n, {});
		default: return null;
	}
}, tt = (e) => e.kind === "color" ? "color" : e.kind === "length" ? "length" : e.tokenType ?? null, nt = /^[a-z][a-z0-9-]*(?:\.[a-z0-9-]+)*$/, rt = /^[A-Za-z0-9 -]{1,60}$/, it = /^\d{1,5}(?:ms|s)$/, Y = (e) => `--cms-t-${e.replace(/\./g, "_")}`, at = (e, t) => {
	let n = [], r = 0, i = "";
	for (let a of e) a === "(" && r++, a === ")" && r--, a === t && r === 0 ? (n.push(i.trim()), i = "") : i += a;
	return n.push(i.trim()), n;
}, ot = (e) => {
	let t = at(e, ",");
	if (t.length > 3) return null;
	for (let e of t) {
		let t = at(e, " ").filter((e) => e !== "");
		t[0] === "inset" && t.shift();
		let n = t[t.length - 1] ?? "", r = J(n) !== null && q(n, !1, !0) === null ? t.slice(0, -1) : t;
		if (r.length < 2 || r.length > 4 || r.some((e) => e.endsWith("%") || q(e, !1, !0) === null)) return null;
	}
	return e;
}, st = (e, t) => {
	if (e === "fontFamily") {
		let e = t.split(",").map((e) => e.replace(/^[ \t\n\r\f\v]+|[ \t\n\r\f\v]+$/g, "").replace(/[ \t\n\r\f\v]+/g, " "));
		return e.length > 8 || !e.every((e) => rt.test(e)) ? null : e.map((e) => e.includes(" ") ? `"${e}"` : e).join(", ");
	}
	let n = Je(t);
	if (n === null) return null;
	switch (e) {
		case "color": return J(n);
		case "length": return q(n);
		case "fontWeight": return G.keywords.fontWeight?.includes(n) ? n : null;
		case "shadow": return ot(n);
		case "duration": return it.test(n) ? n : null;
		default: return null;
	}
}, ct = (e, t) => {
	let n = /* @__PURE__ */ new Map(), r = Object.keys(e).sort();
	if (r.length > G.limits.tokens) return t.push({
		path: "design.tokens",
		code: "LIMIT"
	}), {
		table: n,
		root: ""
	};
	let i = [], a = (t, n) => {
		let r = e[t];
		if (typeof r != "object" || !r || !nt.test(t) || t.length > 64 || typeof r.type != "string" || !G.tokenTypes.includes(r.type)) return null;
		if (typeof r.value == "string") {
			let e = st(r.type, r.value);
			return e === null ? null : {
				type: r.type,
				css: e
			};
		}
		let i = typeof r.value == "object" && r.value !== null ? r.value.token : void 0;
		if (typeof i != "string") return null;
		if (n.includes(i)) return "cycle";
		let o = a(i, [...n, i]);
		return o === null || o === "cycle" || o === "type" ? o : o.type === r.type ? {
			type: r.type,
			css: `var(${Y(i)})`
		} : "type";
	};
	for (let e of r) {
		if (!nt.test(e) || e.length > 64) {
			t.push({
				path: `design.tokens.${e}`,
				code: "INVALID_ID"
			});
			continue;
		}
		let r = a(e, [e]);
		r === "cycle" || r === "type" ? t.push({
			path: `design.tokens.${e}`,
			code: r === "cycle" ? "TOKEN_CYCLE" : "TOKEN_TYPE"
		}) : r === null ? t.push({
			path: `design.tokens.${e}`,
			code: "INVALID_VALUE"
		}) : (n.set(e, {
			type: r.type,
			ref: `var(${Y(e)})`
		}), i.push(`${Y(e)}:${r.css}`));
	}
	return {
		table: n,
		root: i.length > 0 ? `:root{${i.join(";")}}` : ""
	};
}, lt = /^[A-Za-z0-9_-]{1,64}$/, ut = /^[a-z][a-z0-9-]{0,40}$/, dt = new Map(G.properties.map((e, t) => [e.name, t])), X = (e) => typeof e == "object" && e ? e : {}, Z = (e) => `cms-n-${e}`, Q = (e) => `cms-c-${e}`, $ = (e, t, n) => {
	let r = Object.entries(X(e));
	if (r.length > G.limits.declarations) return n.diagnostics.push({
		path: t,
		code: "LIMIT"
	}), "";
	let i = [];
	for (let [e, a] of r) {
		let r = Be.get(e), o = `${t}.${e}`;
		if (!r) {
			n.diagnostics.push({
				path: o,
				code: "UNKNOWN_PROPERTY"
			});
			continue;
		}
		let s;
		if (typeof a == "object" && a) {
			let e = a.token, t = typeof e == "string" ? n.tokens.get(e) : void 0;
			if (!t) {
				n.diagnostics.push({
					path: o,
					code: "UNKNOWN_TOKEN"
				});
				continue;
			}
			if (t.type !== tt(r)) {
				n.diagnostics.push({
					path: o,
					code: "TOKEN_TYPE"
				});
				continue;
			}
			s = t.ref;
		} else s = typeof a == "string" || typeof a == "number" ? et(r, a) : null;
		s === null ? n.diagnostics.push({
			path: o,
			code: "INVALID_VALUE"
		}) : i.push([dt.get(e) ?? 0, `${r.css}:${s}`]);
	}
	return i.sort((e, t) => e[0] - t[0]).map(([, e]) => e).join(";");
}, ft = (e, t, n, r, i) => {
	let a = X(t), o = $(a.base, `${n}.base`, r);
	o !== "" && i.rules.push(`${e}{${o}}`);
	let s = X(a.states);
	for (let e of Object.keys(s)) G.states.includes(e) || r.diagnostics.push({
		path: `${n}.states.${e}`,
		code: "UNKNOWN_STATE"
	});
	for (let t of G.states) {
		if (!(t in s)) continue;
		let a = $(s[t], `${n}.states.${t}`, r);
		a !== "" && i.rules.push(`${e}:${t}{${a}}`);
	}
	let c = X(a.breakpoints);
	for (let t of Object.keys(c)) {
		if (!r.breakpoints.some((e) => e.id === t)) {
			r.diagnostics.push({
				path: `${n}.breakpoints.${t}`,
				code: "UNKNOWN_BREAKPOINT"
			});
			continue;
		}
		let a = $(c[t], `${n}.breakpoints.${t}`, r);
		a !== "" && i.media.get(t)?.push(`${e}{${a}}`);
	}
}, pt = (e, t) => {
	let n = Array.isArray(e) && e.length <= G.limits.breakpoints && e.every((t, n) => typeof t == "object" && !!t && typeof t.id == "string" && /^[a-z][a-z0-9-]{0,15}$/.test(t.id) && Number.isInteger(t.minWidth) && t.minWidth >= 1 && t.minWidth <= G.limits.minWidth && (n === 0 || t.minWidth > e[n - 1].minWidth) && e.findIndex((e) => e.id === t.id) === n);
	return n || t.push({
		path: "design.breakpoints",
		code: "INVALID_BREAKPOINTS"
	}), n ? e : [];
}, mt = (e, t, n) => {
	n.push(...e.rules);
	for (let r of t) {
		let t = e.media.get(r.id) ?? [];
		t.length > 0 && n.push(`@media (min-width:${r.minWidth}px){\n${t.join("\n")}\n}`);
	}
}, ht = (e, t) => {
	let n = [], { table: r, root: i } = ct(X(e.tokens), n), a = pt(e.breakpoints ?? [], n), o = {
		tokens: r,
		breakpoints: a,
		diagnostics: n
	}, s = () => ({
		rules: [],
		media: new Map(a.map((e) => [e.id, []]))
	}), c = s(), l = X(e.classes), u = Object.keys(l);
	u.length > G.limits.classes && n.push({
		path: "design.classes",
		code: "LIMIT"
	});
	for (let e of u.length > G.limits.classes ? [] : u) ut.test(e) ? ft(`.${Q(e)}`, X(l[e]).styles, `design.classes.${e}.styles`, o, c) : n.push({
		path: `design.classes.${e}`,
		code: "INVALID_ID"
	});
	let d = s();
	for (let e of t) {
		if (!lt.test(e.id)) {
			n.push({
				path: `nodes.${e.id}`,
				code: "INVALID_ID"
			});
			continue;
		}
		let t = X(e.styles).classes;
		(Array.isArray(t) ? t : []).forEach((t, r) => {
			typeof t == "string" && u.includes(t) && ut.test(t) || n.push({
				path: `nodes.${e.id}.styles.classes.${r}`,
				code: "UNKNOWN_CLASS"
			});
		}), ft(`.${Z(e.id)}.${Z(e.id)}`, e.styles, `nodes.${e.id}.styles`, o, d);
	}
	let f = i === "" ? [] : [i];
	return mt(c, a, f), mt(d, a, f), {
		css: f.join("\n"),
		diagnostics: n
	};
}, gt = (e) => typeof e == "object" && !!e && !Array.isArray(e), _t = (e) => {
	let t = [], n = (e) => {
		for (let r of e) {
			let e = typeof r.id == "string" ? r.id : typeof r._id == "string" ? r._id : "";
			e !== "" && gt(r.styles) && t.push({
				id: e,
				styles: r.styles
			}), n(r.children ?? []);
		}
	};
	return n(e), t;
}, vt = (e) => [
	e.base,
	...Object.values(e.states ?? {}),
	...Object.values(e.breakpoints ?? {})
].some((e) => e !== void 0 && Object.keys(e).length > 0), yt = (e, t, n) => [...(t.classes ?? []).filter((e) => e in (n.classes ?? {})).map(Q), ...vt(t) && /^[A-Za-z0-9_-]{1,64}$/.test(e) ? [Z(e)] : []], bt = (e) => new ke(e);
export { l as $, j as A, ne as B, ue as C, M as D, I as E, E as F, y as G, S as H, T as I, c as J, v as K, w as L, C as M, O as N, le as O, D as P, m as Q, ie as R, R as S, P as T, ee as U, x as V, _ as W, p as X, f as Y, u as Z, Se as _, Z as a, o as at, H as b, Be as c, Re as d, r as et, Ie as f, ke as g, Ae as h, ht as i, a as it, k as j, N as k, G as l, Ne as m, _t as n, s as nt, Q as o, e as ot, Fe as p, d as q, yt as r, i as rt, Y as s, t as st, bt as t, n as tt, ze as u, Ce as v, F as w, V as x, U as y, re as z };

//# sourceMappingURL=core.js.map