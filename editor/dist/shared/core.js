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
}, T = (e) => e.past.length > 0, E = (e) => e.future.length > 0, ae = (e, t) => {
	let n = e.past[e.past.length - 1];
	return n ? {
		past: e.past.slice(0, -1),
		future: [...e.future, {
			...n,
			redo: t,
			group: null
		}]
	} : e;
}, D = (e, t) => {
	let n = e.future[e.future.length - 1];
	return n ? {
		past: [...e.past, {
			...n,
			undo: t,
			group: null
		}],
		future: e.future.slice(0, -1)
	} : e;
}, oe = (e) => ({
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
}), se = (e) => ({
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
}), O = (e, t = []) => {
	let n = /* @__PURE__ */ new Map();
	for (let e of t) n.set(e.tag, se(e));
	for (let t of e) n.set(t.name, oe(t));
	return {
		rules: n,
		get: (e) => n.get(e),
		has: (e) => n.has(e)
	};
}, ce = class {
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
}, le = class {
	options;
	events = new ce();
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
	catalogue = O([]);
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
}, k = (e, t) => e.includes("*") || e.includes(t), A = (e, n, r, i) => {
	let a = i === null ? null : e.nodes[i]?.type ?? null, o = n.get(r);
	if (o && a !== null && !k(o.allowedParents, a) && t("PLACEMENT_NOT_ALLOWED", `${r} cannot be placed inside ${a}`, {
		type: r,
		parent: a
	}), o && a === null && !k(o.allowedParents, "*") && !o.allowedParents.includes("root") && t("PLACEMENT_NOT_ALLOWED", `${r} cannot be placed at the root`, {
		type: r,
		parent: "root"
	}), a === null) return;
	let s = n.get(a);
	s && (s.isContainer && k(s.allowedChildren, r) && !s.disallowedChildren.includes(r) || t("PLACEMENT_NOT_ALLOWED", `${a} does not accept ${r}`, {
		type: r,
		parent: a
	}));
}, ue = (e, n) => {
	e.has(n) || t("UNKNOWN_COMPONENT", `Unknown component ${n}`, { type: n });
}, j = (e, n) => {
	e.has(n) || t("LOCKED_COMPONENT", `${n} is not in the catalogue and cannot be edited`, { type: n });
}, M = (e, n) => {
	ue(e, n.type);
	let r = e.get(n.type);
	for (let i of n.children ?? []) r && (!r.isContainer || !k(r.allowedChildren, i.type) || r.disallowedChildren.includes(i.type)) && t("PLACEMENT_NOT_ALLOWED", `${n.type} does not accept ${i.type}`, {
		type: i.type,
		parent: n.type
	}), M(e, i);
}, de = {
	maxNodes: 500,
	maxDepth: 15,
	maxBytes: 2e6
}, fe = (e, n) => {
	n > e.maxNodes && t("MAX_NODES", `A page holds at most ${e.maxNodes} nodes`, { limit: String(e.maxNodes) });
}, N = (e, n) => {
	n > e.maxDepth && t("MAX_DEPTH", `Nodes can be nested ${e.maxDepth} levels at most`, { limit: String(e.maxDepth) });
}, pe = (e, n) => {
	let r = new TextEncoder().encode(n).length;
	r > e.maxBytes && t("DOCUMENT_TOO_LARGE", `The page is ${r} bytes; the limit is ${e.maxBytes}`, {
		bytes: String(r),
		limit: String(e.maxBytes)
	});
}, P = (e, n, a, o, c, l, u = 0) => {
	a !== null && !e.nodes[a] && t("NODE_NOT_FOUND", `Node ${a} does not exist`, { id: a });
	let f = y(n);
	fe(c.limits, m(e) - u + f.count), N(c.limits, d(e, a) + f.height), A(e, c.catalogue, n.type, a);
	let p = _(e, n, a, c.ids, l);
	return {
		state: i(p.state, a, s(r(p.state, a), o, p.id)),
		id: p.id,
		renamed: p.renamed
	};
}, me = [
	"targetId",
	"for",
	"aria-controls",
	"aria-labelledby",
	"aria-describedby"
], he = (e, t, n) => {
	let r = e;
	for (let i of l(e, t)) {
		let e = r.nodes[i], t = e?.fields.props;
		if (!e || typeof t != "object" || !t || Array.isArray(t)) continue;
		let o = !1, s = { ...t };
		for (let e of me) {
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
}, ge = (e, t, n) => {
	let r = c(e, t.id), i = P(e, v(e, t.id), r.parent, p(e, t.id) + 1, n, "fresh");
	return {
		state: he(i.state, i.id, i.renamed),
		inverse: {
			kind: "remove",
			id: i.id
		},
		focus: i.id
	};
}, _e = (e, t, n) => {
	M(n.catalogue, t.node);
	let r = P(e, t.node, t.parent, t.index, n, "fresh");
	return {
		state: r.state,
		inverse: {
			kind: "remove",
			id: r.id
		},
		focus: r.id
	};
}, ve = (e, t, n) => {
	let r = P(e, t.node, t.parent, t.index, n, "keep");
	return {
		state: r.state,
		inverse: {
			kind: "remove",
			id: r.id
		},
		focus: r.id
	};
}, ye = (e, n, o) => {
	let l = c(e, n.id);
	n.parent !== null && c(e, n.parent), n.parent !== null && u(e, n.id, n.parent) && t("CYCLE", "A node cannot be moved inside itself", { id: n.id }), N(o.limits, d(e, n.parent) + f(e, n.id)), n.parent !== l.parent && A(e, o.catalogue, l.type, n.parent);
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
}, F = (e, t) => {
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
}, I = (e) => typeof e == "string" ? e : null, be = (e, t) => {
	let n = c(e, t.id), r = { ...n.fields };
	for (let e of ["name", "label"]) {
		let n = t[e];
		n === null ? delete r[e] : r[e] = n;
	}
	let i = {
		kind: "rename",
		id: t.id,
		name: I(n.fields.name),
		label: I(n.fields.label)
	};
	return {
		state: a(e, {
			...n,
			fields: r
		}),
		inverse: i,
		focus: t.id
	};
}, xe = (e, t, n) => {
	let r = c(e, t.id), i = p(e, t.id), a = v(e, t.id);
	t.keepIds || M(n.catalogue, t.node);
	let o = F(e, {
		kind: "remove",
		id: t.id
	}, n).state, s = P(o, t.node, r.parent, i, n, t.keepIds ? "keep" : "fresh");
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
}, L = [
	"loop",
	"condition",
	"bindings",
	"styles"
], Se = (e, n, r) => {
	let i = c(e, n.id);
	j(r.catalogue, i.type);
	let o = [...Object.keys(n.set), ...n.unset ?? []], s = o.find((e) => !L.includes(e));
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
}, Ce = (e) => typeof e == "object" && e && !Array.isArray(e) ? { ...e } : {}, we = {
	insert: _e,
	restore: ve,
	remove: F,
	move: ye,
	duplicate: ge,
	updateProps: (e, t, n) => {
		let r = c(e, t.id);
		j(n.catalogue, r.type);
		let i = Ce(r.fields.props), o = {
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
	updateFields: Se,
	rename: be,
	replace: xe
}, R = (e, t, n) => {
	let r = we[t.kind];
	return r(e, t, n);
}, Te = (e) => ({
	context: e,
	apply: (t, n) => R(t, n, e)
}), Ee = async (t) => {
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
		t.capabilities = c, t.publishedRevision = l?.publishedRevision ?? null, t.catalogue = O(e, o), t.commands = Te({
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
}, De = () => {
	let e = /* @__PURE__ */ new Uint8Array(8);
	return globalThis.crypto.getRandomValues(e), "n" + Array.from(e, (e) => e.toString(36).padStart(2, "0")).join("").slice(0, 12);
}, Oe = (e = "n") => {
	let t = 0;
	return () => `${e}${++t}`;
}, ke = (e) => ({
	pageId: e.pageId,
	transport: e.transport,
	ids: e.ids ?? De,
	limits: e.limits ?? de,
	history: {
		...C,
		...e.history
	},
	now: e.now ?? (() => Date.now())
}), Ae = (e) => {
	if (!e.options.transport.publish) return !1;
	let t = e.capabilities;
	return t ? t.features.revisionPublish ?? t.permissions.includes("pages.publish") : !0;
}, je = () => {
	let e = /* @__PURE__ */ new Uint8Array(16);
	return globalThis.crypto.getRandomValues(e), Array.from(e, (e) => e.toString(16).padStart(2, "0")).join("");
}, Me = async (t) => {
	let n = t.options.transport.publish;
	if (!n || !Ae(t)) throw new e("AUTHORIZATION_DENIED", "Publishing is not allowed here");
	if (t.status !== "ready" || t.dirty) throw new e("NOTHING_TO_PUBLISH", "Save the changes before publishing", { status: t.status });
	if (t.publishedRevision === t.baseRevision) throw new e("NOTHING_TO_PUBLISH", "This revision is already published");
	if (t.publishing) throw new e("SAVE_IN_PROGRESS", "Publishing is already running");
	let r = t.baseRevision;
	t.publishing = !0, t.events.emit("publish-start", { revision: r });
	try {
		return await n(t.options.pageId, r, je()), t.publishedRevision = r, t.events.emit("publish-success", { revision: r }), r;
	} catch (n) {
		let r = n instanceof e ? n : new e("SERVER", String(n));
		throw t.lastError = r, t.events.emit("publish-error", { error: r }), r;
	} finally {
		t.publishing = !1;
	}
}, Ne = async (t, n) => {
	if (t.status === "loading" || t.status === "load-error") throw new e("INVALID_DOCUMENT", "Nothing loaded to save");
	if (t.status === "saving") throw new e("SAVE_IN_PROGRESS", "A save is already running");
	if (t.status === "conflict") throw new e("REVISION_CONFLICT", "Resolve the conflict before saving", { currentRevision: String(t.conflictRevision ?? "") });
	if (!t.dirty) {
		if (n === "autosave") return null;
		throw new e("NOTHING_TO_SAVE", "There are no changes to save");
	}
	let r = t.tree, i = S(r, t.meta, t.baseRevision + 1);
	pe(t.options.limits, JSON.stringify(i));
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
}, Pe = async (e, t) => {
	e.status === "conflict" && (t === "take-theirs" ? await Ee(e) : (e.baseRevision = e.conflictRevision ?? (await e.options.transport.load(e.options.pageId)).revision, e.conflictRevision = null, e.setStatus("dirty"), await Ne(e, "edit")));
}, Fe = class {
	core;
	constructor(e) {
		this.core = new le(ke(e));
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
		return Ae(this.core);
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
		return Ee(this.core);
	}
	dispatch(e) {
		let t = this.editable().apply(this.core.tree, e);
		this.core.commitTree(t.state, t.focus), this.core.setHistory(ie(this.core.history, e, t.inverse, this.core.options.now(), this.core.options.history));
	}
	undo() {
		let e = this.editable(), t = this.core.history.past[this.core.history.past.length - 1];
		if (!t) return;
		let n = e.apply(this.core.tree, t.undo);
		this.core.commitTree(n.state, n.focus), this.core.setHistory(ae(this.core.history, n.inverse));
	}
	redo() {
		let e = this.editable(), t = this.core.history.future[this.core.history.future.length - 1];
		if (!t) return;
		let n = e.apply(this.core.tree, t.redo);
		this.core.commitTree(n.state, n.focus), this.core.setHistory(D(this.core.history, n.inverse));
	}
	select(e) {
		this.core.select(e);
	}
	save(e = "edit") {
		return Ne(this.core, e);
	}
	publish() {
		return Me(this.core);
	}
	resolveConflict(e) {
		return Pe(this.core, e);
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
}, Ie = (e, t) => {
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
}, Le = (e) => {
	let t = {};
	if (typeof e == "object" && e) for (let [n, r] of Object.entries(e)) (typeof r == "string" || typeof r == "number") && (t[n] = String(r));
	return t;
}, Re = (e, t) => t === "PUBLIC_CONTENT_DRIFT" ? "PUBLIC_CONTENT_DRIFT" : e === 409 && t === "MEDIA_IN_USE" ? "MEDIA_IN_USE" : e === 409 && t === "SITE_PART_CONFLICT" ? "SITE_PART_CONFLICT" : e === 412 || t === "REVISION_CONFLICT" ? "REVISION_CONFLICT" : e === 403 || e === 401 ? "AUTHORIZATION_DENIED" : e === 422 || e === 400 ? "VALIDATION_FAILED" : e === 404 ? "NODE_NOT_FOUND" : "SERVER", ze = (t, n) => {
	let r = n?.error ?? {}, i = typeof r.code == "string" ? r.code : "", a = Le(r.fieldErrors);
	typeof r.requestId == "string" && (a.requestId = r.requestId), i !== "" && (a.apiCode = i), a.status = String(t);
	let o = typeof r.message == "string" ? r.message : `HTTP ${t}`;
	return new e(Re(t, i), o, a);
}, Be = (t) => new e("NETWORK", t instanceof Error ? t.message : "Network error"), Ve = (e, t) => ({
	async loadDesign() {
		let n = await t(`${e}/design`), r = n.publishedRevision;
		return {
			revision: Number(n.revision),
			publishedRevision: typeof r == "number" ? r : null,
			design: n.design
		};
	},
	async saveDesign(n, r) {
		let i = await t(`${e}/design`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"If-Match": `"${r}"`
			},
			body: JSON.stringify(n)
		});
		return { revision: Number(i.revision) };
	},
	async publishDesign(n) {
		let r = await t(`${e}/design/publish`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ revision: n })
		});
		return { revision: Number(r.revision) };
	},
	async designUsages(n, r) {
		let i = await t(`${e}/design/usages?${n}=${encodeURIComponent(r)}`);
		return Array.isArray(i.pages) ? i.pages : [];
	}
}), He = (e, t) => {
	let n = (t) => `${e}/media/${encodeURIComponent(t)}`;
	return {
		async listMedia(n, r) {
			return await t(`${e}/media?${new URLSearchParams({
				search: n,
				page: String(r)
			})}`);
		},
		async uploadMedia(n, r) {
			let i = new FormData();
			return i.append("file", n), i.append("alt", r.alt), i.append("widths", r.widths.join(",")), i.append("optimize", r.optimize ? "1" : "0"), i.append("webp", r.webp ? "1" : "0"), await t(`${e}/media`, {
				method: "POST",
				body: i
			});
		},
		async resolveMedia(n) {
			if (n.length === 0) return {};
			let r = (await t(`${e}/media/resolve?ids=${n.map(encodeURIComponent).join(",")}`)).media;
			return typeof r == "object" && r && !Array.isArray(r) ? r : {};
		},
		async mediaSettings() {
			return await t(`${e}/media/settings`);
		},
		async describeMedia(e, r) {
			return await t(n(e), {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ alt: r })
			});
		},
		async mediaUsages(e) {
			let r = await t(`${n(e)}/usages`);
			return {
				pages: Array.isArray(r.pages) ? r.pages : [],
				layouts: Array.isArray(r.layouts) ? r.layouts : [],
				design: r.design === !0
			};
		},
		async deleteMedia(e) {
			await t(n(e), { method: "DELETE" });
		}
	};
}, Ue = (e, t) => {
	let n = (e, t, n = {}) => ({
		method: e,
		headers: {
			"Content-Type": "application/json",
			...n
		},
		body: JSON.stringify(t)
	});
	return {
		async listSiteParts() {
			return await t(`${e}/site-parts`);
		},
		async saveSitePartRules(r, i, a) {
			let o = await t(`${e}/site-parts/${encodeURIComponent(r)}/rules`, n("PUT", i, { "If-Match": `"${a}"` }));
			return { version: Number(o.version) };
		},
		async sitePartImpact(r, i = 0) {
			return await t(`${e}/site-parts/impact`, n("POST", {
				ids: r,
				offset: i,
				limit: 50
			}));
		},
		async previewSitePart(n, r, i) {
			let a = new URLSearchParams({
				revision: String(r),
				...i ? { page: i } : {}
			});
			return await t(`${e}/site-parts/${encodeURIComponent(n)}/preview?${a}`);
		},
		async publishSiteParts(r, i) {
			return (await t(`${e}/site-parts/publish`, n("POST", { changes: r }, { "Idempotency-Key": i }))).revisions ?? {};
		}
	};
}, We = (t) => {
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
			throw Be(e);
		}
		let o = await a.json().catch(() => null);
		if (!a.ok) throw ze(a.status, o);
		let s = o?.data;
		if (typeof s != "object" || !s) throw new e("SERVER", "Unexpected response", { status: String(a.status) });
		return s;
	};
	return {
		...Ve(r, a),
		...He(r, a),
		...Ue(r, a),
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
			return {
				html: typeof n.html == "string" ? n.html : "",
				css: typeof n.css == "string" ? n.css : ""
			};
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
}, Ge = {
	idleMs: 2e3,
	maxWaitMs: 15e3,
	retryMs: [
		2e3,
		5e3,
		15e3,
		3e4
	]
}, Ke = {
	set: (e, t) => setTimeout(e, t),
	clear: (e) => clearTimeout(e),
	now: () => Date.now()
}, qe = class {
	session;
	options;
	timers;
	timer = null;
	firstChange = null;
	retries = 0;
	stops = [];
	constructor(e, t = Ge, n = Ke) {
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
}, Je = [
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
], z = {
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
		],
		backgroundSize: [
			"auto",
			"cover",
			"contain"
		],
		backgroundPosition: [
			"center",
			"top",
			"bottom",
			"left",
			"right",
			"center top",
			"center bottom",
			"left top",
			"right top",
			"left bottom",
			"right bottom"
		],
		backgroundRepeat: [
			"no-repeat",
			"repeat",
			"repeat-x",
			"repeat-y"
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
			name: "backgroundImage",
			css: "background-image",
			kind: "image"
		},
		{
			name: "backgroundSize",
			css: "background-size",
			kind: "keyword"
		},
		{
			name: "backgroundPosition",
			css: "background-position",
			kind: "keyword"
		},
		{
			name: "backgroundRepeat",
			css: "background-repeat",
			kind: "keyword"
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
}, Ye = new Map(z.properties.map((e) => [e.name, e])), B = z.limits, Xe = /[;{}\\<>"'`]|\/\*|url\(|expression|@import|!/i, Ze = /^(-?)(\d+(?:\.\d+)?|\.\d+)(px|rem|em|%|vw|vh)$/, Qe = /^(\d+(?:\.\d+)?|\.\d+)fr$/, $e = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, et = /^(?:rgb|rgba|hsl|hsla)\([0-9.%, /]{1,60}\)$/, tt = /^(?:auto|span (?:[1-9]|1[0-2])|(?:[1-9]|1[0-3]) \/ (?:[1-9]|1[0-3]|-1))$/, nt = /^repeat\(([1-9]|1[0-2]), ?(.+)\)$/, rt = (e) => {
	let t = e.replace(/^[ \t\n\r\f\v]+|[ \t\n\r\f\v]+$/g, "").replace(/[ \t\n\r\f\v]+/g, " ");
	return t === "" || t.length > B.valueLength || Xe.test(t) ? null : t;
}, it = (e) => Number.isInteger(e) ? String(e) : e.toFixed(4).replace(/0+$/, "").replace(/\.$/, ""), V = (e, t = !1, n = !1) => {
	if (e === "0") return "0";
	if (e === "auto") return t ? "auto" : null;
	let r = Ze.exec(e);
	return !r || r[1] === "-" && !n || Number(r[2]) > B.magnitude ? null : e;
}, at = (e, t) => {
	let n = e.split(" ");
	return n.length > (t.parts ?? 1) ? null : n.every((e) => V(e, t.auto, t.negative) !== null) ? e : null;
}, H = (e) => e === "transparent" || e === "currentColor" || $e.test(e) || et.test(e) ? e : null, ot = (e) => {
	if (e === "auto" || e === "min-content" || e === "max-content") return !0;
	let t = Qe.exec(e);
	return t ? Number(t[1]) <= 100 : V(e) !== null;
}, st = (e) => {
	let t = nt.exec(e);
	if (t) return ot(t[2]) ? `repeat(${t[1]}, ${t[2]})` : null;
	let n = e.split(" ");
	return n.length <= 12 && n.every(ot) ? e : null;
}, ct = (e, t) => Number.isFinite(e) && e >= (t.min ?? 0) && e <= (t.max ?? B.magnitude) ? it(e) : null, U = (e, t) => {
	if (typeof t == "number") return e.kind === "number" || e.kind === "lineHeight" ? ct(t, e) : e.kind === "keyword" && e.name === "fontWeight" ? U(e, String(t)) : null;
	let n = rt(t);
	if (n === null) return null;
	switch (e.kind) {
		case "keyword": return z.keywords[e.name]?.includes(n) ? n : null;
		case "length": return at(n, e);
		case "color": return H(n);
		case "tracks": return st(n);
		case "gridColumn": return tt.test(n) ? n : null;
		case "lineHeight": return at(n, {});
		default: return null;
	}
}, lt = /^(?:https?:\/\/[A-Za-z0-9._~:/?#[\]@!$&*+,;=%-]{1,490}|\/(?!\/)[A-Za-z0-9._~:/?#[\]@!$&*+,;=%-]{0,490})$/, ut = (e) => typeof e == "string" && lt.test(e) ? `url("${e}")` : null, dt = (e) => e.kind === "color" ? "color" : e.kind === "length" ? "length" : e.tokenType ?? null, ft = /^[a-z][a-z0-9-]*(?:\.[a-z0-9-]+)*$/, pt = /^[A-Za-z0-9 -]{1,60}$/, mt = /^\d{1,5}(?:ms|s)$/, W = (e) => `--cms-t-${e.replace(/\./g, "_")}`, ht = (e, t) => {
	let n = [], r = 0, i = "";
	for (let a of e) a === "(" && r++, a === ")" && r--, a === t && r === 0 ? (n.push(i.trim()), i = "") : i += a;
	return n.push(i.trim()), n;
}, gt = (e) => {
	let t = ht(e, ",");
	if (t.length > 3) return null;
	for (let e of t) {
		let t = ht(e, " ").filter((e) => e !== "");
		t[0] === "inset" && t.shift();
		let n = t[t.length - 1] ?? "", r = H(n) !== null && V(n, !1, !0) === null ? t.slice(0, -1) : t;
		if (r.length < 2 || r.length > 4 || r.some((e) => e.endsWith("%") || V(e, !1, !0) === null)) return null;
	}
	return e;
}, _t = (e, t) => {
	if (e === "fontFamily") {
		let e = t.split(",").map((e) => e.replace(/^[ \t\n\r\f\v]+|[ \t\n\r\f\v]+$/g, "").replace(/[ \t\n\r\f\v]+/g, " "));
		return e.length > 8 || !e.every((e) => pt.test(e)) ? null : e.map((e) => e.includes(" ") ? `"${e}"` : e).join(", ");
	}
	let n = rt(t);
	if (n === null) return null;
	switch (e) {
		case "color": return H(n);
		case "length": return V(n);
		case "fontWeight": return z.keywords.fontWeight?.includes(n) ? n : null;
		case "shadow": return gt(n);
		case "duration": return mt.test(n) ? n : null;
		default: return null;
	}
}, vt = (e, t) => {
	let n = /* @__PURE__ */ new Map(), r = Object.keys(e).sort();
	if (r.length > z.limits.tokens) return t.push({
		path: "design.tokens",
		code: "LIMIT"
	}), {
		table: n,
		root: ""
	};
	let i = [], a = (t, n) => {
		let r = e[t];
		if (typeof r != "object" || !r || !ft.test(t) || t.length > 64 || typeof r.type != "string" || !z.tokenTypes.includes(r.type)) return null;
		if (typeof r.value == "string") {
			let e = _t(r.type, r.value);
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
			css: `var(${W(i)})`
		} : "type";
	};
	for (let e of r) {
		if (!ft.test(e) || e.length > 64) {
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
			ref: `var(${W(e)})`
		}), i.push(`${W(e)}:${r.css}`));
	}
	return {
		table: n,
		root: i.length > 0 ? `:root{${i.join(";")}}` : ""
	};
}, yt = /^[A-Za-z0-9_-]{1,64}$/, bt = /^[a-z][a-z0-9-]{0,40}$/, xt = new Map(z.properties.map((e, t) => [e.name, t])), G = (e) => typeof e == "object" && e ? e : {}, K = (e) => `cms-n-${e}`, q = (e) => `cms-c-${e}`, J = (e, t, n) => {
	let r = Object.entries(G(e));
	if (r.length > z.limits.declarations) return n.diagnostics.push({
		path: t,
		code: "LIMIT"
	}), "";
	let i = [];
	for (let [e, a] of r) {
		let r = Ye.get(e), o = `${t}.${e}`;
		if (!r) {
			n.diagnostics.push({
				path: o,
				code: "UNKNOWN_PROPERTY"
			});
			continue;
		}
		let s;
		if (typeof a == "object" && a && "asset" in a) {
			if (r.kind !== "image") {
				n.diagnostics.push({
					path: o,
					code: "INVALID_VALUE"
				});
				continue;
			}
			let e = a.asset, t = typeof e == "string" && Object.hasOwn(n.assets, e) ? n.assets[e] : void 0;
			if (typeof t != "string") {
				n.diagnostics.push({
					path: o,
					code: "UNKNOWN_ASSET"
				});
				continue;
			}
			s = ut(t);
		} else if (typeof a == "object" && a) {
			let e = a.token, t = typeof e == "string" ? n.tokens.get(e) : void 0;
			if (!t) {
				n.diagnostics.push({
					path: o,
					code: "UNKNOWN_TOKEN"
				});
				continue;
			}
			if (t.type !== dt(r)) {
				n.diagnostics.push({
					path: o,
					code: "TOKEN_TYPE"
				});
				continue;
			}
			s = t.ref;
		} else s = typeof a == "string" || typeof a == "number" ? U(r, a) : null;
		s === null ? n.diagnostics.push({
			path: o,
			code: "INVALID_VALUE"
		}) : i.push([xt.get(e) ?? 0, `${r.css}:${s}`]);
	}
	return i.sort((e, t) => e[0] - t[0]).map(([, e]) => e).join(";");
}, St = (e, t, n, r, i) => {
	let a = G(t), o = J(a.base, `${n}.base`, r);
	o !== "" && i.rules.push(`${e}{${o}}`);
	let s = G(a.states);
	for (let e of Object.keys(s)) z.states.includes(e) || r.diagnostics.push({
		path: `${n}.states.${e}`,
		code: "UNKNOWN_STATE"
	});
	for (let t of z.states) {
		if (!(t in s)) continue;
		let a = J(s[t], `${n}.states.${t}`, r);
		a !== "" && i.rules.push(`${e}:${t}{${a}}`);
	}
	let c = G(a.breakpoints);
	for (let t of Object.keys(c)) {
		if (!r.breakpoints.some((e) => e.id === t)) {
			r.diagnostics.push({
				path: `${n}.breakpoints.${t}`,
				code: "UNKNOWN_BREAKPOINT"
			});
			continue;
		}
		let a = J(c[t], `${n}.breakpoints.${t}`, r);
		a !== "" && i.media.get(t)?.push(`${e}{${a}}`);
	}
}, Ct = (e, t) => {
	let n = Array.isArray(e) && e.length <= z.limits.breakpoints && e.every((t, n) => typeof t == "object" && !!t && typeof t.id == "string" && /^[a-z][a-z0-9-]{0,15}$/.test(t.id) && Number.isInteger(t.minWidth) && t.minWidth >= 1 && t.minWidth <= z.limits.minWidth && (n === 0 || t.minWidth > e[n - 1].minWidth) && e.findIndex((e) => e.id === t.id) === n);
	return n || t.push({
		path: "design.breakpoints",
		code: "INVALID_BREAKPOINTS"
	}), n ? e : [];
}, wt = (e, t, n) => {
	n.push(...e.rules);
	for (let r of t) {
		let t = e.media.get(r.id) ?? [];
		t.length > 0 && n.push(`@media (min-width:${r.minWidth}px){\n${t.join("\n")}\n}`);
	}
}, Tt = (e, t, n = {}) => {
	let r = [], { table: i, root: a } = vt(G(e.tokens), r), o = Ct(e.breakpoints ?? [], r), s = {
		tokens: i,
		breakpoints: o,
		diagnostics: r,
		assets: n
	}, c = () => ({
		rules: [],
		media: new Map(o.map((e) => [e.id, []]))
	}), l = c(), u = G(e.classes), d = Object.keys(u);
	d.length > z.limits.classes && r.push({
		path: "design.classes",
		code: "LIMIT"
	});
	for (let e of d.length > z.limits.classes ? [] : d) bt.test(e) ? St(`.${q(e)}`, G(u[e]).styles, `design.classes.${e}.styles`, s, l) : r.push({
		path: `design.classes.${e}`,
		code: "INVALID_ID"
	});
	let f = c();
	for (let e of t) {
		if (!yt.test(e.id)) {
			r.push({
				path: `nodes.${e.id}`,
				code: "INVALID_ID"
			});
			continue;
		}
		let t = G(e.styles).classes;
		(Array.isArray(t) ? t : []).forEach((t, n) => {
			typeof t == "string" && d.includes(t) && bt.test(t) || r.push({
				path: `nodes.${e.id}.styles.classes.${n}`,
				code: "UNKNOWN_CLASS"
			});
		}), St(`.${K(e.id)}.${K(e.id)}`, e.styles, `nodes.${e.id}.styles`, s, f);
	}
	let p = a === "" ? [] : [a];
	return wt(l, o, p), wt(f, o, p), {
		css: p.join("\n"),
		diagnostics: r
	};
}, Et = (e) => typeof e == "object" && !!e && !Array.isArray(e), Dt = (e) => {
	let t = [], n = (e) => {
		for (let r of e) {
			let e = typeof r.id == "string" ? r.id : typeof r._id == "string" ? r._id : "";
			e !== "" && Et(r.styles) && t.push({
				id: e,
				styles: r.styles
			}), n(r.children ?? []);
		}
	};
	return n(e), t;
}, Ot = (e) => [
	e.base,
	...Object.values(e.states ?? {}),
	...Object.values(e.breakpoints ?? {})
].some((e) => e !== void 0 && Object.keys(e).length > 0), kt = (e, t, n) => [...(t.classes ?? []).filter((e) => e in (n.classes ?? {})).map(q), ...Ot(t) && /^[A-Za-z0-9_-]{1,64}$/.test(e) ? [K(e)] : []], Y = {
	breakpoint: null,
	state: null
}, X = (e, t) => {
	if (e) return t.state === null ? t.breakpoint === null ? e.base : e.breakpoints?.[t.breakpoint] : e.states?.[t.state];
}, Z = (e) => Object.keys(e).length === 0 ? void 0 : e, At = (e, t, n, r) => {
	let i = { ...X(e, t) ?? {} };
	r === null ? delete i[n] : i[n] = r;
	let a = { ...e ?? {} };
	t.state === null ? t.breakpoint === null ? a.base = Z(i) : a.breakpoints = Z({
		...e?.breakpoints ?? {},
		[t.breakpoint]: Z(i)
	}) : a.states = Z({
		...e?.states ?? {},
		[t.state]: Z(i)
	});
	for (let e of Object.keys(a)) {
		let t = a[e];
		if (t === void 0) delete a[e];
		else if (typeof t == "object" && t && !Array.isArray(t)) {
			for (let [e, n] of Object.entries(t)) n === void 0 && delete t[e];
			Object.keys(t).length === 0 && delete a[e];
		}
	}
	return Array.isArray(a.classes) && a.classes.length === 0 && delete a.classes, Object.keys(a).length === 0 ? null : a;
}, jt = (e, t) => {
	let n = {
		...e ?? {},
		classes: [...t]
	};
	return t.length === 0 && delete n.classes, Object.keys(n).length === 0 ? null : n;
}, Mt = (e, t) => {
	if (t.state !== null) return [t, Y];
	let n = e.breakpoints.map((e) => e.id), r = t.breakpoint === null ? -1 : n.indexOf(t.breakpoint);
	return [...n.slice(0, r + 1).reverse().map((e) => ({
		breakpoint: e,
		state: null
	})), Y];
}, Nt = (e, t, n, r) => {
	let i = Mt(t, n);
	for (let [t, n] of i.entries()) {
		let i = X(e, n)?.[r];
		if (i !== void 0) return {
			value: i,
			origin: t === 0 ? "own" : "inherited",
			from: n.state ?? n.breakpoint ?? "base"
		};
	}
	for (let n of [...e?.classes ?? []].reverse()) {
		let e = t.classes[n]?.styles;
		for (let t of i) {
			let i = X(e, t)?.[r];
			if (i !== void 0) return {
				value: i,
				origin: "class",
				from: n
			};
		}
	}
	return null;
}, Q = () => ({
	schemaVersion: 1,
	breakpoints: Je,
	tokens: {},
	classes: {}
}), Pt = class {
	transport;
	events = new ce();
	design = Q();
	saved = this.design;
	revision = 0;
	publishedRevision = null;
	available = !1;
	constructor(e) {
		this.transport = e;
	}
	get dirty() {
		return this.design !== this.saved;
	}
	get editable() {
		return this.available && typeof this.transport.saveDesign == "function";
	}
	get diagnostics() {
		return Tt(this.design, []).diagnostics;
	}
	async load() {
		let e = await this.transport.loadDesign?.().catch(() => null);
		e && (this.design = e.design, this.saved = e.design, this.revision = e.revision, this.publishedRevision = e.publishedRevision, this.available = !0, this.events.emit("change", { dirty: !1 }));
	}
	update(e) {
		this.design = e, this.events.emit("change", { dirty: this.dirty });
	}
	async save() {
		if (!this.transport.saveDesign) throw new e("AUTHORIZATION_DENIED", "This host does not store designs");
		let t = this.diagnostics[0];
		if (t) throw new e("VALIDATION_FAILED", `Invalid design at ${t.path}`, { [t.path]: t.code });
		let n = this.design, { revision: r } = await this.transport.saveDesign(n, this.revision);
		return this.revision = r, this.saved = n, this.events.emit("saved", { revision: r }), this.events.emit("change", { dirty: this.dirty }), r;
	}
	async publish() {
		if (!this.transport.publishDesign) throw new e("AUTHORIZATION_DENIED", "This host does not publish designs");
		if (this.dirty) throw new e("NOTHING_TO_PUBLISH", "Save the design before publishing");
		let { revision: t } = await this.transport.publishDesign(this.revision);
		return this.publishedRevision = t, this.events.emit("published", { revision: t }), t;
	}
	async reload() {
		await this.load();
	}
}, Ft = /^[A-Za-z0-9_-]{1,64}$/, It = (e) => {
	if (typeof e != "object" || !e || Array.isArray(e)) return !1;
	let t = Object.keys(e), n = e;
	return typeof n.asset == "string" && Ft.test(n.asset) && t.every((e) => e === "asset" || e === "alt") && (n.alt === void 0 || typeof n.alt == "string");
}, $ = (e, t, n) => {
	if (!(n > 12 || typeof e != "object" || !e)) {
		if (It(e)) t.add(e.asset);
		else for (let r of Object.values(e)) $(r, t, n + 1);
	}
}, Lt = (e, t) => {
	let n = /* @__PURE__ */ new Set();
	for (let t of Object.values(e.nodes)) $(t.fields.props, n, 0), $(t.fields.styles, n, 0);
	return t && $(t.classes, n, 0), [...n];
}, Rt = /^https?:\/\/(?:(?:www\.|m\.)?youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})(?:[?&#/].*)?$/, zt = /^https?:\/\/(?:www\.)?(?:vimeo\.com\/|player\.vimeo\.com\/video\/)([0-9]{6,12})(?:[?#/].*)?$/, Bt = (e) => {
	if (typeof e != "string" || e.length > 300) return null;
	let t = e.replace(/^[ \t\n\r\0\x0B]+|[ \t\n\r\0\x0B]+$/g, ""), n = Rt.exec(t)?.[1];
	if (n) return {
		provider: "youtube",
		id: n,
		embed: `https://www.youtube-nocookie.com/embed/${n}?autoplay=1&rel=0`,
		watch: `https://www.youtube.com/watch?v=${n}`
	};
	let r = zt.exec(t)?.[1];
	return r ? {
		provider: "vimeo",
		id: r,
		embed: `https://player.vimeo.com/video/${r}?autoplay=1&dnt=1`,
		watch: `https://vimeo.com/${r}`
	} : null;
}, Vt = (e) => new Fe(e);
export { ne as $, De as A, j as B, Je as C, ze as D, We as E, me as F, C as G, M as H, de as I, E as J, D as K, N as L, Te as M, R as N, Ie as O, L as P, re as Q, fe as R, z as S, Ge as T, A as U, ue as V, O as W, w as X, T as Y, ie as Z, W as _, a as _t, Pt as a, v as at, U as b, t as bt, Nt as c, f as ct, Dt as d, m as dt, x as et, kt as f, l as ft, _t as g, i as gt, q as h, s as ht, It as i, y as it, Oe as j, Fe as k, jt as l, p as lt, K as m, n as mt, Bt as n, ee as nt, Q as o, d as ot, Tt as p, r as pt, ae as q, Lt as r, _ as rt, Y as s, c as st, Vt as t, S as tt, At as u, u as ut, dt as v, o as vt, qe as w, Ye as x, ut as y, e as yt, pe as z };

//# sourceMappingURL=core.js.map