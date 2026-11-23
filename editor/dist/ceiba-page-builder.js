import { A as e, B as t, C as n, D as r, E as i, F as a, G as o, H as s, I as c, J as l, K as u, L as d, M as f, N as p, O as m, P as h, R as g, S as _, T as v, U as y, V as b, W as x, X as S, Y as ee, Z as te, _ as ne, a as re, b as ie, c as ae, d as oe, f as se, g as ce, h as le, i as ue, j as de, k as fe, l as pe, m as me, n as he, o as ge, p as _e, q as ve, r as ye, s as be, t as xe, u as Se, v as Ce, w as we, x as Te, y as Ee, z as De } from "./shared/core.js";
// node_modules/svelte/src/internal/shared/utils.js
var Oe = Array.isArray, ke = Array.prototype.indexOf, Ae = Array.prototype.includes, je = Array.from, Me = Object.defineProperty, Ne = Object.getOwnPropertyDescriptor, Pe = Object.getOwnPropertyDescriptors, Fe = Object.prototype, Ie = Array.prototype, Le = Object.getPrototypeOf, Re = Object.isExtensible, ze = () => {};
function Be(e) {
	for (var t = 0; t < e.length; t++) e[t]();
}
function Ve() {
	var e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
function He(e, t) {
	if (Array.isArray(e)) return e;
	if (t === void 0 || !(Symbol.iterator in e)) return Array.from(e);
	let n = [];
	for (let r of e) if (n.push(r), n.length === t) break;
	return n;
}
var C = 1024, Ue = 2048, We = 4096, Ge = 8192, Ke = 16384, qe = 32768, Je = 1 << 25, Ye = 65536, Xe = 1 << 19, Ze = 1 << 20, Qe = 1 << 25, $e = 65536, et = 1 << 21, tt = 1 << 22, nt = 1 << 23, rt = Symbol("$state"), it = Symbol("legacy props"), at = Symbol(""), ot = Symbol("attributes"), st = Symbol("class"), ct = Symbol("style"), lt = Symbol("text"), ut = Symbol("form reset"), dt = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), ft = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
// node_modules/svelte/src/internal/client/errors.js
function pt() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function mt(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function ht(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function gt() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function _t(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function vt() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function yt(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function bt() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function xt() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function St() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Ct() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
// node_modules/svelte/src/constants.js
var wt = {}, w = Symbol("uninitialized"), Tt = "http://www.w3.org/1999/xhtml";
function Et() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function Dt(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function Ot() {
	console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function kt() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
// node_modules/svelte/src/internal/client/dom/hydration.js
var T = !1;
function At(e) {
	T = e;
}
var E;
function D(e) {
	if (e === null) throw Dt(), wt;
	return E = e;
}
function jt() {
	return D(/* @__PURE__ */ er(E));
}
function O(e) {
	if (T) {
		if (/* @__PURE__ */ er(E) !== null) throw Dt(), wt;
		E = e;
	}
}
function Mt(e = 1) {
	if (T) {
		for (var t = e, n = E; t--;) n = /* @__PURE__ */ er(n);
		E = n;
	}
}
function Nt(e = !0) {
	for (var t = 0, n = E;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ er(n);
		e && n.remove(), n = i;
	}
}
function Pt(e) {
	if (!e || e.nodeType !== 8) throw Dt(), wt;
	return e.data;
}
// node_modules/svelte/src/internal/client/reactivity/equality.js
function Ft(e) {
	return e === this.v;
}
function It(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function Lt(e) {
	return !It(e, this.v);
}
// node_modules/svelte/src/internal/client/context.js
var k = null;
function Rt(e) {
	k = e;
}
function zt(e, t = !1, n) {
	k = {
		p: k,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: U,
		l: null
	};
}
function Bt(e) {
	var t = k, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) gr(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, k = t.p, e ?? {};
}
function Vt() {
	return !0;
}
// node_modules/svelte/src/internal/client/dom/task.js
var Ht = [];
function Ut() {
	var e = Ht;
	Ht = [], Be(e);
}
function Wt(e) {
	if (Ht.length === 0 && !an) {
		var t = Ht;
		queueMicrotask(() => {
			t === Ht && Ut();
		});
	}
	Ht.push(e);
}
function Gt() {
	for (; Ht.length > 0;) Ut();
}
function Kt(e) {
	var t = U;
	if (t === null) return V.f |= nt, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	qt(e, t);
}
function qt(e, t) {
	for (; t !== null;) {
		if (t.f & 128) {
			if (!(t.f & 32768)) throw e;
			try {
				t.b.error(e);
				return;
			} catch (t) {
				e = t;
			}
		}
		t = t.parent;
	}
	throw e;
}
// node_modules/svelte/src/internal/client/reactivity/status.js
var Jt = ~(Ue | We | C);
function A(e, t) {
	e.f = e.f & Jt | t;
}
function Yt(e) {
	e.f & 512 || e.deps === null ? A(e, C) : A(e, We);
}
// node_modules/svelte/src/internal/client/reactivity/utils.js
function Xt(e) {
	if (e !== null) for (let t of e) t.f & 2 && t.f & 65536 && (t.f ^= $e, Xt(t.deps));
}
function Zt(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), Xt(e.deps), A(e, C);
}
// node_modules/svelte/src/internal/client/reactivity/store.js
var Qt = !1;
function $t(e) {
	var t = Qt;
	try {
		return Qt = !1, [e(), Qt];
	} finally {
		Qt = t;
	}
}
// node_modules/svelte/src/internal/client/reactivity/batch.js
var en = null, j = null, tn = null, nn = null, rn = null, an = !1, on = !1, sn = null, cn = null, ln = 0, un = 1, dn = class e {
	id = un++;
	#e = !1;
	linked = !0;
	#t = null;
	#n = null;
	async_deriveds = /* @__PURE__ */ new Map();
	current = /* @__PURE__ */ new Map();
	previous = /* @__PURE__ */ new Map();
	unblocked = /* @__PURE__ */ new Set();
	#r = /* @__PURE__ */ new Set();
	#i = /* @__PURE__ */ new Set();
	#a = /* @__PURE__ */ new Set();
	#o = 0;
	#s = /* @__PURE__ */ new Map();
	#c = null;
	#l = [];
	#u = [];
	#d = /* @__PURE__ */ new Set();
	#f = /* @__PURE__ */ new Set();
	#p = /* @__PURE__ */ new Map();
	#m = /* @__PURE__ */ new Set();
	is_fork = !1;
	#h = !1;
	#g() {
		if (this.is_fork) return !0;
		for (let n of this.#s.keys()) {
			for (var e = n, t = !1; e.parent !== null;) {
				if (this.#p.has(e)) {
					t = !0;
					break;
				}
				e = e.parent;
			}
			if (!t) return !0;
		}
		return !1;
	}
	skip_effect(e) {
		this.#p.has(e) || this.#p.set(e, {
			d: [],
			m: []
		}), this.#m.delete(e);
	}
	unskip_effect(e, t = (e) => this.schedule(e)) {
		var n = this.#p.get(e);
		if (n) {
			this.#p.delete(e);
			for (var r of n.d) A(r, Ue), t(r);
			for (r of n.m) A(r, We), t(r);
		}
		this.#m.add(e);
	}
	#_() {
		if (this.#e = !0, ln++ > 1e3 && (this.#C(), pn()), !this.#g()) {
			for (let e of this.#d) this.#f.delete(e), A(e, Ue), this.schedule(e);
			for (let e of this.#f) A(e, We), this.schedule(e);
		}
		let t = this.#l;
		this.#l = [], this.apply();
		var n = sn = [], r = [], i = cn = [];
		for (let e of t) try {
			this.#v(e, n, r);
		} catch (t) {
			throw vn(e), t;
		}
		if (j = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (sn = null, cn = null, this.#g()) {
			this.#x(r), this.#x(n);
			for (let [e, t] of this.#p) _n(e, t);
			i.length > 0 && j.#_();
			return;
		}
		let o = this.#y();
		if (o) o.#b(this);
		else {
			this.#d.clear(), this.#f.clear();
			for (let e of this.#r) e(this);
			this.#r.clear(), tn = this, hn(r), hn(n), tn = null, this.#c?.resolve();
			var s = j;
			if (this.linked && this.#o === 0 && this.#C(), this.#l.length > 0) {
				s === null && (s = this, this.#S());
				let e = s;
				e.#l.push(...this.#l.filter((t) => !e.#l.includes(t)));
			}
			s !== null && s.#_();
		}
	}
	#v(e, t, n) {
		e.f ^= C;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#p.has(r)) && r.fn !== null) {
				a ? r.f ^= C : i & 4 ? t.push(r) : Kr(r) && (i & 16 && this.#f.add(r), Zr(r));
				var o = r.first;
				if (o !== null) {
					r = o;
					continue;
				}
			}
			for (; r !== null;) {
				var s = r.next;
				if (s !== null) {
					r = s;
					break;
				}
				r = r.parent;
			}
		}
	}
	#y() {
		for (var e = this.#t; e !== null;) {
			if (!e.is_fork) {
				for (let [t, [, n]] of this.current) if (e.current.has(t) && !n) return e;
			}
			e = e.#t;
		}
		return null;
	}
	#b(e) {
		for (let [t, n] of e.current) !this.previous.has(t) && e.previous.has(t) && this.previous.set(t, e.previous.get(t)), this.current.set(t, n);
		for (let [t, n] of e.async_deriveds) {
			let e = this.async_deriveds.get(t);
			e && n.promise.then(e.resolve);
		}
		let t = (e) => {
			var n = e.reactions;
			if (n !== null) for (let e of n) {
				var r = e.f;
				if (r & 2) t(e);
				else {
					var i = e;
					r & 4194320 && !this.async_deriveds.has(i) && (this.#f.delete(i), A(i, Ue), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#C(), j = this, this.#_();
	}
	#x(e) {
		for (var t = 0; t < e.length; t += 1) Zt(e[t], this.#d, this.#f);
	}
	capture(e, t, n = !1) {
		e.v !== w && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), nn?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		j = this;
	}
	deactivate() {
		j = null, nn = null;
	}
	flush() {
		try {
			on = !0, j = this, this.#_();
		} finally {
			ln = 0, rn = null, sn = null, cn = null, on = !1, j = null, nn = null, Ln.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear(), this.#a.clear(), this.#C();
	}
	register_created_effect(e) {
		this.#u.push(e);
	}
	increment(e, t) {
		if (this.#o += 1, e) {
			let e = this.#s.get(t) ?? 0;
			this.#s.set(t, e + 1);
		}
	}
	decrement(e, t) {
		if (--this.#o, e) {
			let e = this.#s.get(t) ?? 0;
			e === 1 ? this.#s.delete(t) : this.#s.set(t, e - 1);
		}
		this.#h || (this.#h = !0, Wt(() => {
			this.#h = !1, this.linked && this.flush();
		}));
	}
	transfer_effects(e, t) {
		for (let t of e) this.#d.add(t);
		for (let e of t) this.#f.add(e);
		e.clear(), t.clear();
	}
	oncommit(e) {
		this.#r.add(e);
	}
	ondiscard(e) {
		this.#i.add(e);
	}
	on_fork_commit(e) {
		this.#a.add(e);
	}
	run_fork_commit_callbacks() {
		for (let e of this.#a) e(this);
		this.#a.clear();
	}
	settled() {
		return (this.#c ??= Ve()).promise;
	}
	static ensure() {
		if (j === null) {
			let t = j = new e();
			t.#S(), !on && !an && Wt(() => {
				t.#e || t.flush();
			});
		}
		return j;
	}
	apply() {
		nn = null;
	}
	schedule(e) {
		if (rn = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) e.b.defer_effect(e);
		else {
			for (var t = e; t.parent !== null;) {
				t = t.parent;
				var n = t.f;
				if (sn !== null && t === U && (V === null || !(V.f & 2))) return;
				if (n & 96) {
					if (!(n & 1024)) return;
					t.f ^= C;
				}
			}
			this.#l.push(t);
		}
	}
	#S() {
		en === null ? en = this : (en.#n = this, this.#t = en), en = this;
	}
	#C() {
		var e = this.#t, t = this.#n;
		e === null || (e.#n = t), t === null ? en = e : t.#t = e, this.linked = !1;
	}
};
function fn(e) {
	var t = an;
	an = !0;
	try {
		var n;
		for (e && (j !== null && !j.is_fork && j.flush(), n = e());;) {
			if (Gt(), j === null) return n;
			j.flush();
		}
	} finally {
		an = t;
	}
}
function pn() {
	try {
		vt();
	} catch (e) {
		qt(e, rn);
	}
}
var mn = null;
function hn(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && Kr(r) && (mn = /* @__PURE__ */ new Set(), Zr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Er(r), mn?.size > 0)) {
				Ln.clear();
				for (let e of mn) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) mn.has(n) && (mn.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || Zr(n);
					}
				}
				mn.clear();
			}
		}
		mn = null;
	}
}
function gn(e) {
	j.schedule(e);
}
function _n(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), A(e, C);
		for (var n = e.first; n !== null;) _n(n, t), n = n.next;
	}
}
function vn(e) {
	A(e, C);
	for (var t = e.first; t !== null;) vn(t), t = t.next;
}
// node_modules/svelte/src/reactivity/create-subscriber.js
function yn(e) {
	let t = 0, n = zn(0), r;
	return () => {
		pr() && (q(n), br(() => (t === 0 && (r = ti(() => e(() => Un(n)))), t += 1, () => {
			Wt(() => {
				--t, t === 0 && (r?.(), r = void 0, Un(n));
			});
		})));
	};
}
// node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var bn = Ye | Xe;
function xn(e, t, n, r) {
	new Sn(e, t, n, r);
}
var Sn = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = T ? E : null;
	#n;
	#r;
	#i;
	#a = null;
	#o = null;
	#s = null;
	#c = null;
	#l = 0;
	#u = 0;
	#d = !1;
	#f = /* @__PURE__ */ new Set();
	#p = /* @__PURE__ */ new Set();
	#m = null;
	#h = yn(() => (this.#m = zn(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = U;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = U.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = xr(() => {
			if (T) {
				let e = this.#t;
				jt();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, bn), T && (this.#e = E);
	}
	#g() {
		try {
			this.#a = z(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed;
		t && (this.#s = z(() => {
			t(this.#e, () => e, () => () => {});
		}));
	}
	#v() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = z(() => e(this.#e)), Wt(() => {
			var e = this.#c = document.createDocumentFragment(), t = F();
			e.append(t), this.#a = this.#x(() => z(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, Dr(this.#o, () => {
				this.#o = null;
			}), this.#b(j));
		}));
	}
	#y() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = z(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				jr(this.#a, e);
				let t = this.#n.pending;
				this.#o = z(() => t(this.#e));
			} else this.#b(j);
		} catch (e) {
			this.error(e);
		}
	}
	#b(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		Zt(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#x(e) {
		var t = U, n = V, r = k;
		Lr(this.#i), H(this.#i), Rt(this.#i.ctx);
		try {
			return dn.ensure(), e();
		} catch (e) {
			return Kt(e), null;
		} finally {
			Lr(t), H(n), Rt(r);
		}
	}
	#S(e, t) {
		this.has_pending_snippet() ? (this.#u += e, this.#u === 0 && (this.#b(t), this.#o && Dr(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null))) : this.parent && this.parent.#S(e, t);
	}
	update_pending_count(e, t) {
		this.#S(e, t), this.#l += e, !this.#m || this.#d || (this.#d = !0, Wt(() => {
			this.#d = !1, this.#m && Vn(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), q(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		j?.is_fork ? (this.#a && j.skip_effect(this.#a), this.#o && j.skip_effect(this.#o), this.#s && j.skip_effect(this.#s), j.on_fork_commit(() => {
			this.#C(e);
		})) : this.#C(e);
	}
	#C(e) {
		this.#a &&= (B(this.#a), null), this.#o &&= (B(this.#o), null), this.#s &&= (B(this.#s), null), T && (D(this.#t), Mt(), D(Nt()));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var r = !1, i = !1;
		let a = () => {
			r ? kt() : (r = !0, i && Ct(), this.#s !== null && Dr(this.#s, () => {
				this.#s = null;
			}), this.#x(() => {
				this.#y();
			}));
		}, o = (e) => {
			try {
				i = !0, t?.(e, a), i = !1;
			} catch (e) {
				qt(e, this.#i && this.#i.parent);
			}
			n && (this.#s = this.#x(() => {
				try {
					return z(() => {
						var t = U;
						t.b = this, t.f |= 128, n(this.#e, () => e, () => a);
					});
				} catch (e) {
					return qt(e, this.#i.parent), null;
				}
			}));
		};
		Wt(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				qt(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(o, (e) => qt(e, this.#i && this.#i.parent)) : o(t);
		});
	}
};
// node_modules/svelte/src/internal/client/reactivity/async.js
function Cn(e, t, n, r) {
	let i = Vt() ? Dn : An;
	var a = e.filter((e) => !e.settled);
	if (n.length === 0 && a.length === 0) {
		r(t.map(i));
		return;
	}
	var o = U, s = wn(), c = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function l(e) {
		if (!(o.f & 16384)) {
			s();
			try {
				r(e);
			} catch (e) {
				qt(e, o);
			}
			Tn();
		}
	}
	var u = En();
	if (n.length === 0) {
		c.then(() => l(t.map(i))).finally(u);
		return;
	}
	function d() {
		Promise.all(n.map((e) => /* @__PURE__ */ kn(e))).then((e) => l([...t.map(i), ...e])).catch((e) => qt(e, o)).finally(u);
	}
	c ? c.then(() => {
		s(), d(), Tn();
	}) : d();
}
function wn() {
	var e = U, t = V, n = k, r = j;
	return function(i = !0) {
		Lr(e), H(t), Rt(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function Tn(e = !0) {
	Lr(null), H(null), Rt(null), e && j?.deactivate();
}
function En() {
	var e = U, t = e.b, n = j, r = t.is_rendered();
	return t.update_pending_count(1, n), n.increment(r, e), () => {
		t.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function Dn(e) {
	var t = 2 | Ue;
	return U !== null && (U.f |= Xe), {
		ctx: k,
		deps: null,
		effects: null,
		equals: Ft,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: w,
		wv: 0,
		parent: U,
		ac: null
	};
}
var On = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function kn(e, t, n) {
	let r = U;
	r === null && pt();
	var i = void 0, a = zn(w), o = !V, s = /* @__PURE__ */ new Set();
	return yr(() => {
		var t = U, n = Ve();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== dt && n.reject(e);
			}).finally(Tn);
		} catch (e) {
			n.reject(e), Tn();
		}
		var c = j;
		if (o) {
			if (t.f & 32768) var l = En();
			if (r.b.is_rendered()) c.async_deriveds.get(t)?.reject(On);
			else for (let e of s.values()) e.reject(On);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== On && (c.activate(), t ? (a.f |= nt, Vn(a, t)) : (a.f & 8388608 && (a.f ^= nt), Vn(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), mr(() => {
		for (let e of s) e.reject(On);
	}), new Promise((e) => {
		function t(n) {
			function r() {
				n === i ? e(a) : t(i);
			}
			n.then(r, r);
		}
		t(i);
	});
}
/*#__NO_SIDE_EFFECTS__*/
function M(e) {
	let t = /* @__PURE__ */ Dn(e);
	return Rr(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function An(e) {
	let t = /* @__PURE__ */ Dn(e);
	return t.equals = Lt, t;
}
function jn(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) B(t[n]);
	}
}
function Mn(e) {
	var t, n = U, r = e.parent;
	if (!Pr && r !== null && e.v !== w && r.f & 24576) return Et(), e.v;
	Lr(r);
	try {
		e.f &= ~$e, jn(e), t = Jr(e);
	} finally {
		Lr(n);
	}
	return t;
}
function Nn(e) {
	var t = Mn(e);
	!e.equals(t) && (e.wv = Gr(), (!j?.is_fork || e.deps === null) && (j === null ? e.v = t : (j.capture(e, t, !0), tn?.capture(e, t, !0)), e.deps === null)) ? A(e, C) : Pr || (nn === null ? Yt(e) : (pr() || j?.is_fork) && nn.set(e, t));
}
function Pn(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac?.abort(dt), t.fn !== null && (t.teardown = ze), t.ac = null, Xr(t, 0), Cr(t));
}
function Fn(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && Zr(t);
}
// node_modules/svelte/src/internal/client/reactivity/sources.js
var In = /* @__PURE__ */ new Set(), Ln = /* @__PURE__ */ new Map(), Rn = !1;
function zn(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: Ft,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function N(e, t) {
	let n = zn(e, t);
	return Rr(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Bn(e, t = !1, n = !0) {
	let r = zn(e);
	return t || (r.equals = Lt), r;
}
function P(e, t, n = !1) {
	return V !== null && (!Ir || V.f & 131072) && Vt() && V.f & 4325394 && (W === null || !Ae.call(W, e)) && St(), Vn(e, n ? Gn(t) : t, cn);
}
function Vn(e, t, n = null) {
	if (!e.equals(t)) {
		Ln.set(e, Pr ? t : e.v);
		var r = dn.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && Mn(t), nn === null && Yt(t);
		}
		e.wv = Gr(), Wn(e, Ue, n), Vt() && U !== null && U.f & 1024 && !(U.f & 96) && (zr === null ? Br([e]) : zr.push(e)), !r.is_fork && In.size > 0 && !Rn && Hn();
	}
	return t;
}
function Hn() {
	Rn = !1;
	for (let e of In) {
		e.f & 1024 && A(e, We);
		let t;
		try {
			t = Kr(e);
		} catch {
			t = !0;
		}
		t && Zr(e);
	}
	In.clear();
}
function Un(e) {
	P(e, e.v + 1);
}
function Wn(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Vt(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (i || s !== U) {
			var l = (c & Ue) === 0;
			if (l && A(s, t), c & 131072) In.add(s);
			else if (c & 2) {
				var u = s;
				nn?.delete(u), c & 65536 || (c & 512 && (U === null || !(U.f & 2097152)) && (s.f |= $e), Wn(u, We, n));
			} else if (l) {
				var d = s;
				c & 16 && mn !== null && mn.add(d), n === null ? gn(d) : n.push(d);
			}
		}
	}
}
function Gn(e) {
	if (typeof e != "object" || !e || rt in e) return e;
	let t = Le(e);
	if (t !== Fe && t !== Ie) return e;
	var n = /* @__PURE__ */ new Map(), r = Oe(e), i = /* @__PURE__ */ N(0), a = null, o = Ur, s = (e) => {
		if (Ur === o) return e();
		var t = V, n = Ur;
		H(null), Wr(o);
		var r = e();
		return H(t), Wr(n), r;
	};
	return r && n.set("length", /* @__PURE__ */ N(e.length, a)), new Proxy(e, {
		defineProperty(e, t, r) {
			"value" in r && r.configurable !== !1 && r.enumerable !== !1 && r.writable !== !1 || bt();
			var i = n.get(t);
			return i === void 0 ? s(() => {
				var e = /* @__PURE__ */ N(r.value, a);
				return n.set(t, e), e;
			}) : P(i, r.value, !0), !0;
		},
		deleteProperty(e, t) {
			var r = n.get(t);
			if (r === void 0) {
				if (t in e) {
					let e = s(() => /* @__PURE__ */ N(w, a));
					n.set(t, e), Un(i);
				}
			} else P(r, w), Un(i);
			return !0;
		},
		get(t, r, i) {
			if (r === rt) return e;
			var o = n.get(r), c = r in t;
			if (o === void 0 && (!c || Ne(t, r)?.writable) && (o = s(() => /* @__PURE__ */ N(Gn(c ? t[r] : w), a)), n.set(r, o)), o !== void 0) {
				var l = q(o);
				return l === w ? void 0 : l;
			}
			return Reflect.get(t, r, i);
		},
		getOwnPropertyDescriptor(e, t) {
			var r = Reflect.getOwnPropertyDescriptor(e, t);
			if (r && "value" in r) {
				var i = n.get(t);
				i && (r.value = q(i));
			} else if (r === void 0) {
				var a = n.get(t), o = a?.v;
				if (a !== void 0 && o !== w) return {
					enumerable: !0,
					configurable: !0,
					value: o,
					writable: !0
				};
			}
			return r;
		},
		has(e, t) {
			if (t === rt) return !0;
			var r = n.get(t), i = r !== void 0 && r.v !== w || Reflect.has(e, t);
			return (r !== void 0 || U !== null && (!i || Ne(e, t)?.writable)) && (r === void 0 && (r = s(() => /* @__PURE__ */ N(i ? Gn(e[t]) : w, a)), n.set(t, r)), q(r) === w) ? !1 : i;
		},
		set(e, t, o, c) {
			var l = n.get(t), u = t in e;
			if (r && t === "length") for (var d = o; d < l.v; d += 1) {
				var f = n.get(d + "");
				f === void 0 ? d in e && (f = s(() => /* @__PURE__ */ N(w, a)), n.set(d + "", f)) : P(f, w);
			}
			if (l === void 0) (!u || Ne(e, t)?.writable) && (l = s(() => /* @__PURE__ */ N(void 0, a)), P(l, Gn(o)), n.set(t, l));
			else {
				u = l.v !== w;
				var p = s(() => Gn(o));
				P(l, p);
			}
			var m = Reflect.getOwnPropertyDescriptor(e, t);
			if (m?.set && m.set.call(c, o), !u) {
				if (r && typeof t == "string") {
					var h = n.get("length"), g = Number(t);
					Number.isInteger(g) && g >= h.v && P(h, g + 1);
				}
				Un(i);
			}
			return !0;
		},
		ownKeys(e) {
			q(i);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = n.get(e);
				return t === void 0 || t.v !== w;
			});
			for (var [r, a] of n) a.v !== w && !(r in e) && t.push(r);
			return t;
		},
		setPrototypeOf() {
			xt();
		}
	});
}
function Kn(e) {
	try {
		if (typeof e == "object" && e && rt in e) return e[rt];
	} catch {}
	return e;
}
function qn(e, t) {
	return Object.is(Kn(e), Kn(t));
}
var Jn, Yn, Xn, Zn;
function Qn() {
	if (Jn === void 0) {
		Jn = window, Yn = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		Xn = Ne(t, "firstChild").get, Zn = Ne(t, "nextSibling").get, Re(e) && (e[st] = void 0, e[ot] = null, e[ct] = void 0, e.__e = void 0), Re(n) && (n[lt] = void 0);
	}
}
function F(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function $n(e) {
	return Xn.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function er(e) {
	return Zn.call(e);
}
function I(e, t) {
	if (!T) return /* @__PURE__ */ $n(e);
	var n = /* @__PURE__ */ $n(E);
	if (n === null) n = E.appendChild(F());
	else if (t && n.nodeType !== 3) {
		var r = F();
		return n?.before(r), D(r), r;
	}
	return t && ar(n), D(n), n;
}
function tr(e, t = !1) {
	if (!T) {
		var n = /* @__PURE__ */ $n(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ er(n) : n;
	}
	if (t) {
		if (E?.nodeType !== 3) {
			var r = F();
			return E?.before(r), D(r), r;
		}
		ar(E);
	}
	return E;
}
function L(e, t = 1, n = !1) {
	let r = T ? E : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ er(r);
	if (!T) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = F();
			return r === null ? i?.after(a) : r.before(a), D(a), a;
		}
		ar(r);
	}
	return D(r), r;
}
function nr(e) {
	e.textContent = "";
}
function rr() {
	return !1;
}
function ir(e, t, n) {
	let r = n ? { is: n } : void 0;
	return document.createElementNS(t ?? "http://www.w3.org/1999/xhtml", e, r);
}
function ar(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
// node_modules/svelte/src/internal/client/dom/elements/misc.js
function or(e) {
	T && /* @__PURE__ */ $n(e) !== null && nr(e);
}
var sr = !1;
function cr() {
	sr || (sr = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[ut]?.();
		});
	}, { capture: !0 }));
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function lr(e) {
	var t = V, n = U;
	H(null), Lr(null);
	try {
		return e();
	} finally {
		H(t), Lr(n);
	}
}
// node_modules/svelte/src/internal/client/reactivity/effects.js
function ur(e) {
	U === null && (V === null && _t(e), gt()), Pr && ht(e);
}
function dr(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function fr(e, t) {
	var n = U;
	n !== null && n.f & 8192 && (e |= Ge);
	var r = {
		ctx: k,
		deps: null,
		nodes: null,
		f: e | Ue | 512,
		first: null,
		fn: t,
		last: null,
		next: null,
		parent: n,
		b: n && n.b,
		prev: null,
		teardown: null,
		wv: 0,
		ac: null
	};
	j?.register_created_effect(r);
	var i = r;
	if (e & 4) sn === null ? dn.ensure().schedule(r) : sn.push(r);
	else if (t !== null) {
		try {
			Zr(r);
		} catch (e) {
			throw B(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= Ye));
	}
	if (i !== null && (i.parent = n, n !== null && dr(i, n), V !== null && V.f & 2 && !(e & 64))) {
		var a = V;
		(a.effects ??= []).push(i);
	}
	return r;
}
function pr() {
	return V !== null && !Ir;
}
function mr(e) {
	let t = fr(8, null);
	return A(t, C), t.teardown = e, t;
}
function hr(e) {
	ur("$effect");
	var t = U.f;
	if (!V && t & 32 && !(t & 32768)) {
		var n = k;
		(n.e ??= []).push(e);
	} else return gr(e);
}
function gr(e) {
	return fr(4 | Ze, e);
}
function _r(e) {
	dn.ensure();
	let t = fr(64 | Xe, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Dr(t, () => {
			B(t), n(void 0);
		}) : (B(t), n(void 0));
	});
}
function vr(e) {
	return fr(4, e);
}
function yr(e) {
	return fr(tt | Xe, e);
}
function br(e, t = 0) {
	return fr(8 | t, e);
}
function R(e, t = [], n = [], r = []) {
	Cn(r, t, n, (t) => {
		fr(8, () => e(...t.map(q)));
	});
}
function xr(e, t = 0) {
	return fr(16 | t, e);
}
function z(e) {
	return fr(32 | Xe, e);
}
function Sr(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = Pr, n = V;
		Fr(!0), H(null);
		try {
			t.call(null);
		} finally {
			Fr(e), H(n);
		}
	}
}
function Cr(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && lr(() => {
			e.abort(dt);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : B(n, t), n = r;
	}
}
function wr(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || B(t), t = n;
	}
}
function B(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Tr(e.nodes.start, e.nodes.end), n = !0), A(e, Je), Cr(e, t && !n), Xr(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	Sr(e), e.f ^= Je, e.f |= Ke;
	var i = e.parent;
	i !== null && i.first !== null && Er(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Tr(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ er(e);
		e.remove(), e = n;
	}
}
function Er(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Dr(e, t, n = !0) {
	var r = [];
	Or(e, r, !0);
	var i = () => {
		n && B(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Or(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= Ge;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				Or(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function kr(e) {
	Ar(e, !0);
}
function Ar(e, t) {
	if (e.f & 8192) {
		e.f ^= Ge, e.f & 1024 || (A(e, Ue), dn.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			Ar(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function jr(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ er(n);
		t.append(n), n = i;
	}
}
// node_modules/svelte/src/internal/client/legacy.js
var Mr = null, Nr = !1, Pr = !1;
function Fr(e) {
	Pr = e;
}
var V = null, Ir = !1;
function H(e) {
	V = e;
}
var U = null;
function Lr(e) {
	U = e;
}
var W = null;
function Rr(e) {
	V !== null && (W === null ? W = [e] : W.push(e));
}
var G = null, K = 0, zr = null;
function Br(e) {
	zr = e;
}
var Vr = 1, Hr = 0, Ur = Hr;
function Wr(e) {
	Ur = e;
}
function Gr() {
	return ++Vr;
}
function Kr(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~$e), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (Kr(a) && Nn(a), a.wv > e.wv) return !0;
		}
		t & 512 && nn === null && A(e, C);
	}
	return !1;
}
function qr(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(W !== null && Ae.call(W, e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? qr(a, t, !1) : t === a && (n ? A(a, Ue) : a.f & 1024 && A(a, We), gn(a));
	}
}
function Jr(e) {
	var t = G, n = K, r = zr, i = V, a = W, o = k, s = Ir, c = Ur, l = e.f;
	G = null, K = 0, zr = null, V = l & 96 ? null : e, W = null, Rt(e.ctx), Ir = !1, Ur = ++Hr, e.ac !== null && (lr(() => {
		e.ac.abort(dt);
	}), e.ac = null);
	try {
		e.f |= et;
		var u = e.fn, d = u();
		e.f |= qe;
		var f = e.deps, p = j?.is_fork;
		if (G !== null) {
			var m;
			if (p || Xr(e, K), f !== null && K > 0) for (f.length = K + G.length, m = 0; m < G.length; m++) f[K + m] = G[m];
			else e.deps = f = G;
			if (pr() && e.f & 512) for (m = K; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && K < f.length && (Xr(e, K), f.length = K);
		if (Vt() && zr !== null && !Ir && f !== null && !(e.f & 6146)) for (m = 0; m < zr.length; m++) qr(zr[m], e);
		if (i !== null && i !== e) {
			if (Hr++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = Hr;
			if (t !== null) for (let e of t) e.rv = Hr;
			zr !== null && (r === null ? r = zr : r.push(...zr));
		}
		return e.f & 8388608 && (e.f ^= nt), d;
	} catch (e) {
		return Kt(e);
	} finally {
		e.f ^= et, G = t, K = n, zr = r, V = i, W = a, Rt(o), Ir = s, Ur = c;
	}
}
function Yr(e, t) {
	let n = t.reactions;
	if (n !== null) {
		var r = ke.call(n, e);
		if (r !== -1) {
			var i = n.length - 1;
			i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
		}
	}
	if (n === null && t.f & 2 && (G === null || !Ae.call(G, t))) {
		var a = t;
		a.f & 512 && (a.f ^= 512, a.f &= ~$e), a.v !== w && Yt(a), Pn(a), Xr(a, 0);
	}
}
function Xr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) Yr(e, n[r]);
}
function Zr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		A(e, C);
		var n = U, r = Nr;
		U = e, Nr = !0;
		try {
			t & 16777232 ? wr(e) : Cr(e), Sr(e);
			var i = Jr(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = Vr;
		} finally {
			Nr = r, U = n;
		}
	}
}
async function Qr() {
	await Promise.resolve(), fn();
}
function q(e) {
	var t = !!(e.f & 2);
	if (Mr?.add(e), V !== null && !Ir && !(U !== null && U.f & 16384) && (W === null || !Ae.call(W, e))) {
		var n = V.deps;
		if (V.f & 2097152) e.rv < Hr && (e.rv = Hr, G === null && n !== null && n[K] === e ? K++ : G === null ? G = [e] : G.push(e));
		else {
			V.deps ??= [], Ae.call(V.deps, e) || V.deps.push(e);
			var r = e.reactions;
			r === null ? e.reactions = [V] : Ae.call(r, V) || r.push(V);
		}
	}
	if (Pr && Ln.has(e)) return Ln.get(e);
	if (t) {
		var i = e;
		if (Pr) {
			var a = i.v;
			return (!(i.f & 1024) && i.reactions !== null || ei(i)) && (a = Mn(i)), Ln.set(i, a), a;
		}
		var o = !(i.f & 512) && !Ir && V !== null && (Nr || !!(V.f & 512)), s = (i.f & qe) === 0;
		Kr(i) && (o && (i.f |= 512), Nn(i)), o && !s && (Fn(i), $r(i));
	}
	if (nn?.has(e)) return nn.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function $r(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (Fn(t), $r(t));
}
function ei(e) {
	if (e.v === w) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Ln.has(t) || t.f & 2 && ei(t)) return !0;
	return !1;
}
function ti(e) {
	var t = Ir;
	try {
		return Ir = !0, e();
	} finally {
		Ir = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var ni = ["touchstart", "touchmove"];
function ri(e) {
	return ni.includes(e);
}
// node_modules/svelte/src/internal/client/dev/css.js
var ii = Symbol("events"), ai = /* @__PURE__ */ new Set(), oi = /* @__PURE__ */ new Set();
function si(e) {
	if (!T) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function ci(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || fi.call(t, e), !e.cancelBubble) return lr(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Wt(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function li(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = ci(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && mr(() => {
		t.removeEventListener(e, o, a);
	});
}
function J(e, t, n) {
	(t[ii] ??= {})[e] = n;
}
function ui(e) {
	for (var t = 0; t < e.length; t++) ai.add(e[t]);
	for (var n of oi) n(e);
}
var di = null;
function fi(e) {
	var t = this, n = t.ownerDocument, r = e.type, i = e.composedPath?.() || [], a = i[0] || e.target;
	di = e;
	var o = 0, s = di === e && e[ii];
	if (s) {
		var c = i.indexOf(s);
		if (c !== -1 && (t === document || t === window)) {
			e[ii] = t;
			return;
		}
		var l = i.indexOf(t);
		if (l === -1) return;
		c <= l && (o = c);
	}
	if (a = i[o] || e.target, a !== t) {
		Me(e, "currentTarget", {
			configurable: !0,
			get() {
				return a || n;
			}
		});
		var u = V, d = U;
		H(null), Lr(null);
		try {
			for (var f, p = []; a !== null;) {
				var m = a.assignedSlot || a.parentNode || a.host || null;
				try {
					var h = a[ii]?.[r];
					h == null || a.disabled && e.target !== a || h.call(a, e);
				} catch (e) {
					f ? p.push(e) : f = e;
				}
				if (e.cancelBubble || m === t || m === null) break;
				a = m;
			}
			if (f) {
				for (let e of p) queueMicrotask(() => {
					throw e;
				});
				throw f;
			}
		} finally {
			e[ii] = t, delete e.currentTarget, H(u), Lr(d);
		}
	}
}
// node_modules/svelte/src/internal/client/dom/reconciler.js
var pi = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function mi(e) {
	return pi?.createHTML(e) ?? e;
}
function hi(e) {
	var t = ir("template");
	return t.innerHTML = mi(e.replaceAll("<!>", "<!---->")), t.content;
}
// node_modules/svelte/src/internal/client/dom/template.js
function gi(e, t) {
	var n = U;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function Y(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (T) return gi(E, null), E;
		i === void 0 && (i = hi(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ $n(i)));
		var t = r || Yn ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ $n(t), s = t.lastChild;
			gi(o, s);
		} else gi(t, t);
		return t;
	};
}
function _i() {
	if (T) return gi(E, null), E;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = F();
	return e.append(t, n), gi(t, n), e;
}
function X(e, t) {
	if (T) {
		var n = U;
		n.f & 32768 && n.nodes.end !== null || (n.nodes.end = E), jt();
	} else e !== null && e.before(t);
}
function Z(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[lt] ??= e.nodeValue) && (e[lt] = n, e.nodeValue = `${n}`);
}
function vi(e, t) {
	return bi(e, t);
}
var yi = /* @__PURE__ */ new Map();
function bi(e, { target: t, anchor: n, props: r = {}, events: i, context: a, intro: o = !0, transformError: s }) {
	Qn();
	var c = void 0, l = _r(() => {
		var o = n ?? t.appendChild(F());
		xn(o, { pending: () => {} }, (t) => {
			zt({});
			var n = k;
			if (a && (n.c = a), i && (r.$$events = i), T && gi(t, null), c = e(t, r) || {}, T && (U.nodes.end = E, E === null || E.nodeType !== 8 || E.data !== "]")) throw Dt(), wt;
			Bt();
		}, s);
		var l = /* @__PURE__ */ new Set(), u = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!l.has(r)) {
					l.add(r);
					var i = ri(r);
					for (let e of [t, document]) {
						var a = yi.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), yi.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, fi, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return u(je(ai)), oi.add(u), () => {
			for (var e of l) for (let n of [t, document]) {
				var r = yi.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, fi), r.delete(e), r.size === 0 && yi.delete(n)) : r.set(e, i);
			}
			oi.delete(u), o !== n && o.parentNode?.removeChild(o);
		};
	});
	return xi.set(c, l), c;
}
var xi = /* @__PURE__ */ new WeakMap();
function Si(e, t) {
	let n = xi.get(e);
	return n ? (xi.delete(e), n(t)) : Promise.resolve();
}
// node_modules/svelte/src/internal/client/dom/blocks/branches.js
var Ci = class {
	anchor;
	#e = /* @__PURE__ */ new Map();
	#t = /* @__PURE__ */ new Map();
	#n = /* @__PURE__ */ new Map();
	#r = /* @__PURE__ */ new Set();
	#i = !0;
	constructor(e, t = !0) {
		this.anchor = e, this.#i = t;
	}
	#a = (e) => {
		if (this.#e.has(e)) {
			var t = this.#e.get(e), n = this.#t.get(t);
			if (n) kr(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (B(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						jr(r, t), t.append(F()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else B(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), Dr(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (B(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = j, r = rr();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = F();
				i.append(a), this.#n.set(e, {
					effect: z(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, z(() => t(this.anchor)));
		}
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else T && (this.anchor = E), this.#a(n);
	}
};
// node_modules/svelte/src/internal/client/dom/blocks/if.js
function Q(e, t, n = !1) {
	var r;
	T && (r = E, jt());
	var i = new Ci(e), a = n ? Ye : 0;
	function o(e, t) {
		if (T) {
			var n = Pt(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Nt();
				D(a), i.anchor = a, At(!1), i.ensure(e, t), At(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	xr(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
// node_modules/svelte/src/internal/client/dom/blocks/key.js
var wi = Symbol("NaN");
function Ti(e, t, n) {
	T && jt();
	var r = new Ci(e), i = !Vt();
	xr(() => {
		var e = t();
		e !== e && (e = wi), i && typeof e == "object" && e && (e = {}), r.ensure(e, n);
	});
}
// node_modules/svelte/src/internal/client/dom/blocks/each.js
function Ei(e, t, n) {
	for (var r = [], i = t.length, a, o = t.length, s = 0; s < i; s++) {
		let n = t[s];
		Dr(n, () => {
			if (a) {
				if (a.pending.delete(n), a.done.add(n), a.pending.size === 0) {
					var t = e.outrogroups;
					Di(e, je(a.done)), t.delete(a), t.size === 0 && (e.outrogroups = null);
				}
			} else --o;
		}, !1);
	}
	if (o === 0) {
		var c = r.length === 0 && n !== null;
		if (c) {
			var l = n, u = l.parentNode;
			nr(u), u.append(l), e.items.clear();
		}
		Di(e, t, !c);
	} else a = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(a);
}
function Di(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= Qe, jr(a, document.createDocumentFragment())) : B(t[i], n);
	}
}
var Oi;
function ki(e, t, n, r, i, a = null) {
	var o = e, s = /* @__PURE__ */ new Map();
	if (t & 4) {
		var c = e;
		o = T ? D(/* @__PURE__ */ $n(c)) : c.appendChild(F());
	}
	T && jt();
	var l = null, u = /* @__PURE__ */ An(() => {
		var e = n();
		return Oe(e) ? e : e == null ? [] : je(e);
	}), d, f = /* @__PURE__ */ new Map(), p = !0;
	function m(e) {
		g.effect.f & 16384 || (g.pending.delete(e), g.fallback = l, ji(g, d, o, t, r), l !== null && (d.length === 0 ? l.f & 33554432 ? (l.f ^= Qe, Ni(l, null, o)) : kr(l) : Dr(l, () => {
			l = null;
		})));
	}
	function h(e) {
		g.pending.delete(e);
	}
	var g = {
		effect: xr(() => {
			d = q(u);
			var e = d.length;
			let c = !1;
			T && Pt(o) === "[!" != (e === 0) && (o = Nt(), D(o), At(!1), c = !0);
			for (var g = /* @__PURE__ */ new Set(), _ = j, v = rr(), y = 0; y < e; y += 1) {
				T && E.nodeType === 8 && E.data === "]" && (o = E, c = !0, At(!1));
				var b = d[y], x = r(b, y), S = p ? null : s.get(x);
				S ? (S.v && Vn(S.v, b), S.i && Vn(S.i, y), v && _.unskip_effect(S.e)) : (S = Mi(s, p ? o : Oi ??= F(), b, x, y, i, t, n), p || (S.e.f |= Qe), s.set(x, S)), g.add(x);
			}
			if (e === 0 && a && !l && (p ? l = z(() => a(o)) : (l = z(() => a(Oi ??= F())), l.f |= Qe)), e > g.size && mt("", "", ""), T && e > 0 && D(Nt()), !p) {
				if (f.set(_, g), v) {
					for (let [e, t] of s) g.has(e) || _.skip_effect(t.e);
					_.oncommit(m), _.ondiscard(h);
				} else m(_);
			}
			c && At(!0), q(u);
		}),
		flags: t,
		items: s,
		pending: f,
		outrogroups: null,
		fallback: l
	};
	p = !1, T && (o = E);
}
function Ai(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function ji(e, t, n, r, i) {
	var a = !!(r & 8), o = t.length, s = e.items, c = Ai(e.effect.first), l, u = null, d, f = [], p = [], m, h, g, _;
	if (a) for (_ = 0; _ < o; _ += 1) m = t[_], h = i(m, _), g = s.get(h).e, g.f & 33554432 || (g.nodes?.a?.measure(), (d ??= /* @__PURE__ */ new Set()).add(g));
	for (_ = 0; _ < o; _ += 1) {
		if (m = t[_], h = i(m, _), g = s.get(h).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(g), t.done.delete(g);
		if (g.f & 8192 && (kr(g), a && (g.nodes?.a?.unfix(), (d ??= /* @__PURE__ */ new Set()).delete(g))), g.f & 33554432) {
			if (g.f ^= Qe, g === c) Ni(g, null, n);
			else {
				var v = u ? u.next : c;
				g === e.effect.last && (e.effect.last = g.prev), g.prev && (g.prev.next = g.next), g.next && (g.next.prev = g.prev), Pi(e, u, g), Pi(e, g, v), Ni(g, v, n), u = g, f = [], p = [], c = Ai(u.next);
				continue;
			}
		}
		if (g !== c) {
			if (l !== void 0 && l.has(g)) {
				if (f.length < p.length) {
					var y = p[0], b;
					u = y.prev;
					var x = f[0], S = f[f.length - 1];
					for (b = 0; b < f.length; b += 1) Ni(f[b], y, n);
					for (b = 0; b < p.length; b += 1) l.delete(p[b]);
					Pi(e, x.prev, S.next), Pi(e, u, x), Pi(e, S, y), c = y, u = S, --_, f = [], p = [];
				} else l.delete(g), Ni(g, c, n), Pi(e, g.prev, g.next), Pi(e, g, u === null ? e.effect.first : u.next), Pi(e, u, g), u = g;
				continue;
			}
			for (f = [], p = []; c !== null && c !== g;) (l ??= /* @__PURE__ */ new Set()).add(c), p.push(c), c = Ai(c.next);
			if (c === null) continue;
		}
		g.f & 33554432 || f.push(g), u = g, c = Ai(g.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Di(e, je(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (c !== null || l !== void 0) {
		var ee = [];
		if (l !== void 0) for (g of l) g.f & 8192 || ee.push(g);
		for (; c !== null;) !(c.f & 8192) && c !== e.fallback && ee.push(c), c = Ai(c.next);
		var te = ee.length;
		if (te > 0) {
			var ne = r & 4 && o === 0 ? n : null;
			if (a) {
				for (_ = 0; _ < te; _ += 1) ee[_].nodes?.a?.measure();
				for (_ = 0; _ < te; _ += 1) ee[_].nodes?.a?.fix();
			}
			Ei(e, ee, ne);
		}
	}
	a && Wt(() => {
		if (d !== void 0) for (g of d) g.nodes?.a?.apply();
	});
}
function Mi(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? zn(n) : /* @__PURE__ */ Bn(n, !1, !1) : null, l = o & 2 ? zn(i) : null;
	return {
		v: c,
		i: l,
		e: z(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Ni(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ er(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Pi(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
// node_modules/svelte/src/internal/client/dom/css.js
function Fi(e, t) {
	vr(() => {
		var n = e.getRootNode(), r = n.host ? n : n.head ?? n.ownerDocument.head;
		if (!r.querySelector("#" + t.hash)) {
			let e = ir("style");
			e.id = t.hash, e.textContent = t.code, r.appendChild(e);
		}
	});
}
// node_modules/svelte/src/internal/shared/attributes.js
function Ii(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function Li(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function Ri(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(Li)), i && c.push(...Object.keys(i).map(Li));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = Li(e.substring(l, u).trim());
							if (!c.includes(p)) {
								f !== ";" && d++;
								var m = e.substring(l, d).trim();
								n += " " + m + ";";
							}
						}
						l = d + 1, u = -1;
					}
				}
			}
		}
		return r && (n += Ii(r)), i && (n += Ii(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
// node_modules/svelte/src/internal/client/dom/elements/style.js
function zi(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function Bi(e, t, n, r) {
	var i = e[ct];
	if (T || i !== t) {
		var a = Ri(t, r);
		T && a === e.getAttribute("style") || (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[ct] = t;
	} else r && (Array.isArray(r) ? (zi(e, n?.[0], r[0]), zi(e, n?.[1], r[1], "important")) : zi(e, n, r));
	return r;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
function Vi(e, t, n = !1) {
	if (e.multiple) {
		if (t == null) return;
		if (!Oe(t)) return Ot();
		for (var r of e.options) r.selected = t.includes(Ui(r));
	} else {
		for (r of e.options) if (qn(Ui(r), t)) {
			r.selected = !0;
			return;
		}
		n && t === void 0 || (e.selectedIndex = -1);
	}
}
function Hi(e) {
	var t = new MutationObserver(() => {
		Vi(e, e.__value);
	});
	t.observe(e, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["value"]
	}), mr(() => {
		t.disconnect();
	});
}
function Ui(e) {
	return "__value" in e ? e.__value : e.value;
}
// node_modules/svelte/src/internal/client/dom/elements/attributes.js
var Wi = Symbol("is custom element"), Gi = Symbol("is html"), Ki = ft ? "link" : "LINK", qi = ft ? "progress" : "PROGRESS";
function Ji(e) {
	if (T) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					$(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					$(e, "checked", null), e.checked = r;
				}
			}
		};
		e[ut] = n, Wt(n), cr();
	}
}
function Yi(e, t) {
	var n = Zi(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === qi) && (e.value = t ?? "");
}
function Xi(e, t) {
	var n = Zi(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function $(e, t, n, r) {
	var i = Zi(e);
	T && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === Ki) || i[t] !== (i[t] = n) && (t === "loading" && (e[at] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && $i(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function Zi(e) {
	return e[ot] ??= {
		[Wi]: e.nodeName.includes("-"),
		[Gi]: e.namespaceURI === Tt
	};
}
var Qi = /* @__PURE__ */ new Map();
function $i(e) {
	var t = e.getAttribute("is") || e.nodeName, n = Qi.get(t);
	if (n) return n;
	Qi.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var o in r = Pe(i), r) r[o].set && o !== "innerHTML" && o !== "textContent" && o !== "innerText" && n.push(o);
		i = Le(i);
	}
	return n;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function ea(e, t) {
	return e === t || e?.[rt] === t;
}
function ta(e = {}, t, n, r) {
	var i = k.r, a = U;
	return vr(() => {
		var o, s;
		return br(() => {
			o = s, s = r?.() || [], ti(() => {
				ea(n(...s), e) || (t(e, ...s), o && ea(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && ea(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
// node_modules/svelte/src/internal/client/reactivity/props.js
function na(e, t, n, r) {
	var i = !0, a = !!(n & 8), o = !!(n & 16), s = r, c = !0, l = void 0, u = () => o && i ? (l ??= /* @__PURE__ */ Dn(r), q(l)) : (c && (c = !1, s = o ? ti(r) : r), s);
	let d;
	if (a) {
		var f = rt in e || it in e;
		d = Ne(e, t)?.set ?? (f && t in e ? (n) => e[t] = n : void 0);
	}
	var p, m = !1;
	a ? [p, m] = $t(() => e[t]) : p = e[t], p === void 0 && r !== void 0 && (p = u(), d && (i && yt(t), d(p)));
	var h = i ? () => {
		var n = e[t];
		return n === void 0 ? u() : (c = !0, n);
	} : () => {
		var n = e[t];
		return n !== void 0 && (s = void 0), n === void 0 ? s : n;
	};
	if (i && !(n & 4)) return h;
	if (d) {
		var g = e.$$legacy;
		return (function(e, t) {
			return arguments.length > 0 ? ((!i || !t || g || m) && d(t ? h() : e), e) : h();
		});
	}
	var _ = !1, v = (n & 1 ? Dn : An)(() => (_ = !1, h()));
	a && q(v);
	var y = U;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? q(v) : i && a ? Gn(e) : e;
			return P(v, n), _ = !0, s !== void 0 && (s = n), e;
		}
		return Pr && _ || y.f & 16384 ? v.v : q(v);
	});
}
// node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
// src/ui/canvas/sanitize.ts
var ra = /* @__PURE__ */ new Set([
	"http:",
	"https:",
	"mailto:",
	"tel:"
]), ia = (e) => {
	if (typeof e != "string") return "";
	let t = e.replace(/[\u0000- \u007f-\u009f]/g, ""), n = /^([a-z][a-z0-9+.-]*):/i.exec(t)?.[1];
	return n === void 0 || ra.has(`${n.toLowerCase()}:`) ? e.trim() : "";
}, aa = (e) => typeof e == "string" ? e.replace(/[^\w\- :]/g, "").trim() : "", oa = (e) => {
	let t = ia(e);
	return t !== "" && !/^(mailto|tel):/i.test(t) ? t : "";
}, sa = (e) => typeof e == "string" ? e : typeof e == "number" ? String(e) : "", ca = (e) => e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;"), la = "allow-same-origin", ua = (e) => "<!doctype html><html><head><meta charset=\"utf-8\"><meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'none'; style-src * 'unsafe-inline'; img-src * data: blob:; font-src * data:\">" + e.map(oa).filter((e) => e !== "").map((e) => `<link rel="stylesheet" href="${ca(e)}">`).join("") + "<style>body{margin:0;padding:12px;min-height:100vh;box-sizing:border-box}[data-ceiba-id]{cursor:default}[data-ceiba-id]:hover{outline:1px dashed #94a3b8}[data-ceiba-selected]{outline:2px solid #2563eb!important;outline-offset:2px}[data-ceiba-multiline]{white-space:pre-line}[contenteditable]{outline:2px solid #16a34a!important;outline-offset:2px;cursor:text}.ceiba-dragging,.ceiba-dragging *{user-select:none!important;cursor:grabbing!important}.ceiba-placeholder{padding:12px;border:1px dashed #94a3b8;color:#475569;font:13px system-ui;background:#f8fafc}@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}</style></head><body></body></html>", da = /* @__PURE__ */ new Set([
	"heading",
	"button",
	"a",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"span",
	"li",
	"strong",
	"em",
	"small",
	"label",
	"figcaption",
	"p",
	"blockquote",
	"code"
]), fa = /* @__PURE__ */ new Set(["text"]), pa = (e, t) => !t.has(e.type) || e.children.length > 0 ? null : e.type === "heading" ? "text" : e.type === "text" ? "content" : e.type === "button" ? "label" : da.has(e.type) || fa.has(e.type) ? "content" : null, ma = (e) => fa.has(e), ha = (e, t) => {
	let n = e.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, "");
	return t ? n.replace(/\n$/, "") : n.replace(/\n+/g, " ");
}, ga = (e) => {
	let t = e.ownerDocument, n = t.createRange();
	n.selectNodeContents(e), n.collapse(!1);
	let r = t.getSelection();
	r?.removeAllRanges(), r?.addRange(n);
}, _a = /* @__PURE__ */ new Set(/* @__PURE__ */ "div.section.article.header.footer.nav.main.aside.h1.h2.h3.h4.h5.h6.p.span.strong.em.small.a.ul.ol.li.blockquote.figure.figcaption.code.pre.hr.br.img.label".split(".")), va = (e) => {
	let t = e.fields.props;
	return typeof t == "object" && t && !Array.isArray(t) ? t : {};
}, ya = (e, t) => {
	let n = e.createElement("div");
	return n.className = "ceiba-placeholder", n.textContent = t, n;
}, ba = (e, t, n, r) => {
	let i = va(t), a = (t, n = "") => {
		let r = e.createElement(t), a = `${n} ${aa(i.class)}`.trim();
		return a && (r.className = a), r;
	};
	switch (t.type) {
		case "container": return a("div", i.fluid ? "container-fluid" : "container");
		case "row": {
			let e = aa(sa(i.gutter));
			return a("div", `row ${/^[0-5]$/.test(e) ? `g-${e}` : e || "g-0"}`);
		}
		case "col": {
			let e = [
				"sm",
				"md",
				"lg",
				"xl"
			].map((e) => Number(i[e]) > 0 ? `col-${e}-${Number(i[e])}` : ""), t = i.xs === void 0 ? 12 : Number(i.xs);
			return a("div", [t > 0 ? `col-${t}` : "col", ...e].join(" ").replace(/\s+/g, " ").trim());
		}
		case "heading": {
			let e = a(`h${Math.min(6, Math.max(1, Number(i.level) || 2))}`);
			return e.textContent = sa(i.text), e;
		}
		case "text": {
			let e = a("p");
			return e.textContent = sa(i.content), e;
		}
		case "image":
		case "img": {
			let t = ia(i.src);
			if (t === "") return ya(e, n.emptyImage);
			let r = a("img", "img-fluid");
			return r.src = t, r.alt = sa(i.alt), r;
		}
		case "button": {
			let e = a("a", "btn btn-primary");
			return e.href = ia(i.url) || "#", e.textContent = sa(i.label), e;
		}
		case "html": return ya(e, n.html);
	}
	if (!r || !_a.has(t.type)) return ya(e, n.unknown(t.type));
	let o = a(t.type);
	return t.type === "a" && (o.href = ia(i.href) || "#"), t.type === "img" && (o.src = ia(i.src), o.alt = sa(i.alt)), i.content !== void 0 && o.append(e.createTextNode(sa(i.content))), o;
}, xa = (e, t, n, r, i) => {
	let a = (o) => {
		let s = t.nodes[o];
		if (!s) return null;
		let c = ba(e, s, i, n.has(s.type));
		if (c.dataset.ceibaId = o, o === r && (c.dataset.ceibaSelected = ""), ma(s.type) && (c.dataset.ceibaMultiline = ""), c.className !== "ceiba-placeholder" && c.tagName !== "IMG") for (let e of s.children) {
			let t = a(e);
			t && c.append(t);
		}
		return c;
	}, o = t.rootIds.map(a).filter((e) => e !== null);
	e.body.replaceChildren(...o);
}, Sa = /* @__PURE__ */ Y("<div class=\"canvas svelte-1tv0kiv\"><p class=\"help svelte-1tv0kiv\"> </p> <iframe class=\"svelte-1tv0kiv\"></iframe></div>"), Ca = {
	hash: "svelte-1tv0kiv",
	code: ".canvas.svelte-1tv0kiv {background:var(--cpb-canvas);padding:.5rem 1rem 1rem;min-height:0;display:flex;flex-direction:column;}.help.svelte-1tv0kiv {margin:0 0 .5rem;font-size:.75rem;color:var(--cpb-muted);}iframe.svelte-1tv0kiv {flex:1;width:100%;min-height:480px;border:1px solid var(--cpb-border);border-radius:8px;background:#fff;}"
};
function wa(e, t) {
	zt(t, !0), Fi(e, Ca);
	let n = na(t, "stylesheets", 19, () => []), r = /* @__PURE__ */ M(() => t.store.t), i = /* @__PURE__ */ N(void 0), a = /* @__PURE__ */ N(!1), o = /* @__PURE__ */ N(null), s = /* @__PURE__ */ M(() => ua(n())), c = (e) => e?.closest?.("[data-ceiba-id]");
	function l(e) {
		let n = q(i)?.contentDocument, a = t.store.tree.nodes[e], s = a && t.store.catalogue ? pa(a, t.store.catalogue) : null, c = n?.querySelector(`[data-ceiba-id="${CSS.escape(e)}"]`);
		if (!n || !a || !s || !c) return !1;
		t.store.select(e), P(o, e, !0);
		let l = ma(a.type);
		c.setAttribute("contenteditable", "plaintext-only"), c.setAttribute("aria-label", q(r)("announce.editing"));
		let u = () => {
			t.store.run({
				kind: "updateProps",
				id: e,
				set: { [s]: ha(c.innerText, l) }
			});
		}, d = (n) => {
			c.removeEventListener("input", u), c.removeEventListener("keydown", f), c.removeEventListener("blur", p), c.removeAttribute("contenteditable"), P(o, null), t.store.announce("announce.editDone"), t.onEditEnd(e, n);
		}, f = (e) => {
			(e.key === "Escape" || e.key === "Enter" && (!l || e.ctrlKey || e.metaKey)) && (e.preventDefault(), d(!0));
		}, p = () => d(!1);
		return c.addEventListener("input", u), c.addEventListener("keydown", f), c.addEventListener("blur", p), c.focus(), ga(c), t.store.announce("announce.editing"), !0;
	}
	function u(e) {
		e.addEventListener("click", (e) => {
			e.preventDefault(), q(o) === null && t.store.select(c(e.target)?.dataset.ceibaId ?? null);
		}), e.addEventListener("dblclick", (e) => {
			let t = c(e.target)?.dataset.ceibaId;
			t && q(o) === null && l(t);
		}), e.addEventListener("pointerdown", (e) => {
			let n = c(e.target);
			n?.dataset.ceibaId && q(o) === null && t.drag.pressNode(e, n, n.dataset.ceibaId);
		}), e.addEventListener("submit", (e) => e.preventDefault()), e.addEventListener("auxclick", (e) => e.preventDefault()), e.addEventListener("dragstart", (e) => e.preventDefault());
	}
	function d() {
		let e = q(i)?.contentDocument;
		e && q(i) && (u(e), t.drag.attach(q(i)), P(a, !0));
	}
	hr(() => {
		let e = q(i)?.contentDocument, n = t.store.catalogue, s = t.store.tree, c = t.store.selection;
		q(a) && e && n && q(o) === null && (xa(e, s, n, c, {
			unknown: (e) => q(r)("canvas.unknown", { type: e }),
			html: q(r)("canvas.html"),
			emptyImage: q(r)("canvas.emptyImage")
		}), c && e.querySelector(`[data-ceiba-id="${CSS.escape(c)}"]`)?.scrollIntoView({ block: "nearest" }));
	});
	var f = { startEditing: l }, p = Sa(), m = I(p), h = I(m, !0);
	O(m);
	var g = L(m, 2);
	return ta(g, (e) => P(i, e), () => q(i)), O(p), R((e, n) => {
		$(m, "id", `${t.uid}-canvas-help`), Z(h, e), $(g, "title", n), $(g, "sandbox", la), $(g, "srcdoc", q(s)), $(g, "aria-describedby", `${t.uid}-canvas-help`);
	}, [() => q(r)("canvas.help"), () => q(r)("canvas.title")]), li("load", g, d), si(g), X(e, p), Bt(f);
}
// src/ui/drag/indicator.ts
var Ta = "ceiba-drop-indicator", Ea = (e, t, n, r) => {
	let i = e.getElementById(Ta);
	i || (i = e.createElement("div"), i.id = Ta, i.setAttribute("aria-hidden", "true"), e.body.append(i));
	let a = (t ?? e.body).getBoundingClientRect(), o = a.left + e.defaultView.scrollX, s = a.top + e.defaultView.scrollY, c = n !== "inside" && t !== null;
	Object.assign(i.style, {
		position: "absolute",
		pointerEvents: "none",
		zIndex: "2147483647",
		boxSizing: "border-box",
		left: `${o}px`,
		width: `${a.width}px`,
		top: `${c ? n === "before" ? s - 2 : s + a.height - 2 : s}px`,
		height: c ? "4px" : `${a.height}px`,
		background: c ? r ? "#b91c1c" : "#2563eb" : "transparent",
		border: c ? "none" : `2px dashed ${r ? "#b91c1c" : "#2563eb"}`,
		borderRadius: "2px"
	}), i.dataset.zone = n, i.dataset.refused = r ? "true" : "false";
}, Da = (e) => {
	e?.getElementById(Ta)?.remove();
}, Oa = (e, t, n, r) => {
	let i = t <= 0 ? .5 : (n - e) / t;
	return r ? i < .25 ? "before" : i > .75 ? "after" : "inside" : i < .5 ? "before" : "after";
}, ka = (e, t, n, r) => t.kind === "move" ? {
	kind: "move",
	id: t.id,
	parent: n,
	index: r
} : {
	kind: "insert",
	parent: n,
	index: r,
	node: t.node
}, Aa = (e, t, n, r, i) => {
	let a;
	if (r === null || !e.nodes[r]) a = ka(e, n, null, e.rootIds.length);
	else if (i === "inside") a = ka(e, n, r, e.nodes[r]?.children.length ?? 0);
	else {
		let t = e.nodes[r]?.parent ?? null;
		a = ka(e, n, t, x(e, t).indexOf(r) + +(i === "after"));
	}
	let o = r !== null && e.nodes[r] ? r : null;
	if (n.kind === "move" && a.kind === "move" && ja(e, n.id, a.parent, a.index)) return {
		command: null,
		anchor: o,
		zone: i,
		refused: null
	};
	try {
		return oe(e, a, t), {
			command: a,
			anchor: o,
			zone: i,
			refused: null
		};
	} catch (e) {
		return {
			command: null,
			anchor: o,
			zone: i,
			refused: e instanceof S ? e.code : "SERVER"
		};
	}
}, ja = (e, t, n, r) => {
	if (e.nodes[t]?.parent !== n) return !1;
	let i = x(e, n).indexOf(t);
	return r === i || r === i + 1;
}, Ma = 5, Na = class {
	store;
	frame = null;
	active = null;
	dropped = !1;
	onKey = (e) => {
		this.active && e.key === "Escape" && (e.preventDefault(), this.finish(!1));
	};
	constructor(e) {
		this.store = e;
	}
	get dragging() {
		return this.active !== null;
	}
	consumeClick() {
		let e = this.dropped;
		return this.dropped = !1, e;
	}
	attach(e) {
		this.frame = e;
	}
	get doc() {
		return this.frame?.contentDocument ?? null;
	}
	pressNode(e, t, n) {
		if (e.button !== 0) return;
		let r = {
			x: e.clientX,
			y: e.clientY
		}, i = t.ownerDocument, a = (e) => {
			!this.active && Math.hypot(e.clientX - r.x, e.clientY - r.y) < Ma || (this.active || this.begin({
				kind: "move",
				id: n
			}, this.labelOf(n)), this.update(e.clientX, e.clientY));
		}, o = () => {
			i.removeEventListener("pointermove", a), i.removeEventListener("pointerup", o), this.active && this.finish(!0);
		};
		i.addEventListener("pointermove", a), i.addEventListener("pointerup", o);
	}
	pressNew(e, t, n) {
		if (e.button !== 0 || !this.frame) return;
		let r = e.currentTarget, i = {
			x: e.clientX,
			y: e.clientY
		};
		r.setPointerCapture?.(e.pointerId);
		let a = (e) => {
			if (!this.active && Math.hypot(e.clientX - i.x, e.clientY - i.y) < Ma) return;
			this.active || (this.begin(t, n), this.frame && (this.frame.style.pointerEvents = "none"));
			let r = this.frame?.getBoundingClientRect();
			if (!r) return;
			let a = e.clientX - r.left - (this.frame?.clientLeft ?? 0), o = e.clientY - r.top - (this.frame?.clientTop ?? 0);
			a < 0 || o < 0 || a > r.width || o > r.height ? this.clearTarget() : this.update(a, o);
		}, o = () => {
			r.removeEventListener("pointermove", a), r.removeEventListener("pointerup", o), r.removeEventListener("pointercancel", o), this.active && this.finish(!0);
		};
		r.addEventListener("pointermove", a), r.addEventListener("pointerup", o), r.addEventListener("pointercancel", o);
	}
	begin(e, t) {
		this.active = {
			dragged: e,
			label: t,
			target: null
		}, this.doc?.body.classList.add("ceiba-dragging"), document.addEventListener("keydown", this.onKey, !0), this.doc?.addEventListener("keydown", this.onKey, !0);
	}
	update(e, t) {
		let n = this.doc, r = this.store.session.commandContext;
		if (!this.active || !n || !r) return;
		let i = n.elementFromPoint(e, t)?.closest("[data-ceiba-id]") ?? null, a = i?.dataset.ceibaId ?? null, o = a ? this.store.tree.nodes[a] : void 0, s = i?.getBoundingClientRect(), c = o ? this.store.catalogue?.get(o.type)?.isContainer ?? !1 : !1, l = s ? Oa(s.top, s.height, t, c) : "inside";
		this.active.target = Aa(this.store.tree, r, this.active.dragged, a, l), Ea(n, i, l, this.active.target.refused !== null);
	}
	clearTarget() {
		this.active && (this.active.target = null), Da(this.doc);
	}
	finish(e) {
		let t = this.active;
		if (this.active = null, Da(this.doc), this.frame && (this.frame.style.pointerEvents = ""), this.doc?.body.classList.remove("ceiba-dragging"), document.removeEventListener("keydown", this.onKey, !0), this.doc?.removeEventListener("keydown", this.onKey, !0), !t) return;
		this.dropped = !0;
		let n = t.target;
		if (!e || !n) this.store.announce("announce.dragCancelled");
		else if (n.command) {
			let e = n.command.kind === "insert" ? "announce.inserted" : "announce.moved";
			this.store.run(n.command, [e, { label: t.label }]);
		} else n.refused && this.store.fail(Error(n.refused), n.refused);
	}
	labelOf(e) {
		let t = this.store.tree.nodes[e]?.type ?? "";
		return this.store.catalogue?.get(t)?.label ?? t;
	}
}, Pa = {
	text: "text",
	string: "text",
	textarea: "textarea",
	richtext: "textarea",
	number: "number",
	integer: "number",
	switch: "checkbox",
	boolean: "checkbox",
	checkbox: "checkbox",
	select: "select",
	url: "url",
	media_picker: "url"
}, Fa = /* @__PURE__ */ new Set([
	"p",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"span",
	"a",
	"li",
	"blockquote",
	"strong",
	"em",
	"small",
	"figcaption",
	"label",
	"button",
	"code"
]), Ia = (e) => e.charAt(0).toUpperCase() + e.slice(1).replace(/[_-]/g, " "), La = (e) => {
	let t = [], n = /* @__PURE__ */ new Set();
	for (let [r, i] of Object.entries(e.editorControls)) {
		let e = i, a = e.options?.map(String);
		t.push({
			key: r,
			label: e.label ?? Ia(r),
			control: Pa[e.type ?? ""] ?? "text",
			...a ? { options: a } : {}
		}), n.add(r);
	}
	for (let [r, i] of Object.entries(e.propsSchema)) {
		if (n.has(r)) continue;
		let e = i, a = e.enum?.map(String);
		t.push({
			key: r,
			label: Ia(r),
			control: a ? "select" : Pa[e.type ?? ""] ?? "text",
			...a ? { options: a } : {}
		}), n.add(r);
	}
	return Object.keys(e.propsSchema).length === 0 && Object.keys(e.editorControls).length === 0 && (Fa.has(e.type) && t.push({
		key: "content",
		label: "Content",
		control: "textarea"
	}), e.type === "a" && t.push({
		key: "href",
		label: "Link",
		control: "url"
	}), e.type === "img" && t.push({
		key: "src",
		label: "Image",
		control: "url"
	}, {
		key: "alt",
		label: "Alt",
		control: "text"
	}), t.push({
		key: "class",
		label: "Class",
		control: "text"
	})), t;
}, Ra = (e, t) => {
	if (e.control === "checkbox") return { value: t === !0 };
	let n = String(t);
	if (e.control === "number") {
		if (n.trim() === "") return { value: null };
		let e = Number(n);
		return Number.isFinite(e) ? { value: e } : { error: "field.number" };
	}
	return e.control === "url" && n.trim() !== "" && ia(n) === "" ? { error: "field.url" } : e.control === "select" && e.options && !e.options.includes(n) ? { error: "field.option" } : e.control === "select" && e.options?.every((e) => /^\d+$/.test(e)) ? { value: Number(n) } : { value: n };
}, za = /* @__PURE__ */ Y("<label class=\"svelte-1g42mo8\"><input type=\"checkbox\" class=\"svelte-1g42mo8\"/> </label>"), Ba = /* @__PURE__ */ Y("<textarea rows=\"3\" class=\"svelte-1g42mo8\"></textarea>"), Va = /* @__PURE__ */ Y("<option> </option>"), Ha = /* @__PURE__ */ Y("<select class=\"svelte-1g42mo8\"></select>"), Ua = /* @__PURE__ */ Y("<input class=\"svelte-1g42mo8\"/>"), Wa = /* @__PURE__ */ Y("<label class=\"svelte-1g42mo8\"> </label> <!>", 1), Ga = /* @__PURE__ */ Y("<p class=\"error svelte-1g42mo8\" role=\"alert\"> </p>"), Ka = /* @__PURE__ */ Y("<div class=\"field svelte-1g42mo8\"><!> <!></div>"), qa = {
	hash: "svelte-1g42mo8",
	code: ".field.svelte-1g42mo8 {display:grid;gap:.25rem;margin-bottom:.75rem;}label.svelte-1g42mo8 {font-size:.8rem;font-weight:600;}input.svelte-1g42mo8:not([type='checkbox']), textarea.svelte-1g42mo8, select.svelte-1g42mo8 {font:inherit;font-size:.875rem;padding:.35rem .5rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}[aria-invalid='true'].svelte-1g42mo8 {border-color:var(--cpb-danger);}input.svelte-1g42mo8:focus-visible, textarea.svelte-1g42mo8:focus-visible, select.svelte-1g42mo8:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}.error.svelte-1g42mo8 {color:var(--cpb-danger);font-size:.75rem;margin:0;}"
};
function Ja(e, t) {
	zt(t, !0), Fi(e, qa);
	let n = /* @__PURE__ */ N(null), r = /* @__PURE__ */ M(() => t.value === null || t.value === void 0 ? "" : String(t.value));
	function i(e) {
		let r = Ra(t.field, e);
		"error" in r ? P(n, t.t(r.error), !0) : (P(n, null), t.onChange(r.value));
	}
	var a = Ka(), o = I(a), s = (e) => {
		var n = za(), r = I(n);
		Ji(r);
		var a = L(r);
		O(n), R(() => {
			$(r, "id", t.id), Xi(r, t.value === !0), Z(a, ` ${t.field.label ?? ""}`);
		}), J("change", r, (e) => i(e.currentTarget.checked)), X(e, n);
	}, c = (e) => {
		var a = Wa(), o = tr(a), s = I(o, !0);
		O(o);
		var c = L(o, 2), l = (e) => {
			var a = Ba();
			or(a), R(() => {
				$(a, "id", t.id), Yi(a, q(r)), $(a, "aria-invalid", q(n) !== null), $(a, "aria-describedby", q(n) ? `${t.id}-error` : void 0);
			}), J("input", a, (e) => i(e.currentTarget.value)), X(e, a);
		}, u = (e) => {
			var n = Ha();
			ki(n, 20, () => t.field.options ?? [], (e) => e, (e, t) => {
				var n = Va(), r = I(n, !0);
				O(n);
				var i = {};
				R(() => {
					Z(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
				}), X(e, n);
			}), O(n);
			var a;
			Hi(n), R(() => {
				$(n, "id", t.id), a !== (a = q(r)) && (n.value = (n.__value = q(r)) ?? "", Vi(n, q(r)));
			}), J("change", n, (e) => i(e.currentTarget.value)), X(e, n);
		}, d = (e) => {
			var a = Ua();
			Ji(a), R(() => {
				$(a, "id", t.id), $(a, "type", t.field.control === "number" ? "number" : t.field.control === "url" ? "url" : "text"), Yi(a, q(r)), $(a, "aria-invalid", q(n) !== null), $(a, "aria-describedby", q(n) ? `${t.id}-error` : void 0);
			}), J("input", a, (e) => i(e.currentTarget.value)), X(e, a);
		};
		Q(c, (e) => {
			t.field.control === "textarea" ? e(l) : t.field.control === "select" ? e(u, 1) : e(d, -1);
		}), R(() => {
			$(o, "for", t.id), Z(s, t.field.label);
		}), X(e, a);
	};
	Q(o, (e) => {
		t.field.control === "checkbox" ? e(s) : e(c, -1);
	});
	var l = L(o, 2), u = (e) => {
		var r = Ga(), i = I(r, !0);
		O(r), R(() => {
			$(r, "id", `${t.id}-error`), Z(i, q(n));
		}), X(e, r);
	};
	Q(l, (e) => {
		q(n) && e(u);
	}), O(a), X(e, a), Bt();
}
ui(["change", "input"]);
// src/ui/inspector/Inspector.svelte
var Ya = /* @__PURE__ */ Y("<p class=\"hint svelte-2ghsnx\"> </p>"), Xa = /* @__PURE__ */ Y("<p class=\"locked svelte-2ghsnx\" role=\"note\"> </p>"), Za = /* @__PURE__ */ Y("<p class=\"type svelte-2ghsnx\"> </p> <div class=\"field svelte-2ghsnx\"><label class=\"svelte-2ghsnx\"> </label> <input type=\"text\" class=\"svelte-2ghsnx\"/></div> <!> <div class=\"actions svelte-2ghsnx\"><button type=\"button\" class=\"svelte-2ghsnx\"> </button> <button type=\"button\" class=\"danger svelte-2ghsnx\"> </button></div>", 1), Qa = /* @__PURE__ */ Y("<section class=\"inspector svelte-2ghsnx\"><h2 class=\"svelte-2ghsnx\"> </h2> <!></section>"), $a = {
	hash: "svelte-2ghsnx",
	code: ".inspector.svelte-2ghsnx {padding:.5rem .75rem;overflow:auto;border-left:1px solid var(--cpb-border);}h2.svelte-2ghsnx {font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin:0 0 .5rem;color:var(--cpb-muted);}.hint.svelte-2ghsnx, .locked.svelte-2ghsnx {font-size:.85rem;color:var(--cpb-muted);}.locked.svelte-2ghsnx {color:var(--cpb-danger);}.type.svelte-2ghsnx {font-weight:700;margin:0 0 .75rem;}.field.svelte-2ghsnx {display:grid;gap:.25rem;margin-bottom:.75rem;}label.svelte-2ghsnx {font-size:.8rem;font-weight:600;}input.svelte-2ghsnx {font:inherit;font-size:.875rem;padding:.35rem .5rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}.actions.svelte-2ghsnx {display:flex;gap:.5rem;margin-top:1rem;}button.svelte-2ghsnx {font:inherit;font-size:.8rem;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.danger.svelte-2ghsnx {color:var(--cpb-danger);}button.svelte-2ghsnx:focus-visible, input.svelte-2ghsnx:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function eo(e, t) {
	zt(t, !0), Fi(e, $a);
	let n = /* @__PURE__ */ M(() => t.store.t), r = /* @__PURE__ */ M(() => t.store.selection ? t.store.tree.nodes[t.store.selection] : void 0), i = /* @__PURE__ */ M(() => q(r) ? t.store.catalogue?.get(q(r).type) : void 0), a = /* @__PURE__ */ M(() => q(i) ? La(q(i)) : []), o = /* @__PURE__ */ M(() => {
		let e = q(r)?.fields.props;
		return typeof e == "object" && e && !Array.isArray(e) ? e : {};
	});
	function s(e, n) {
		q(r) && (n === null || n === "" ? t.store.run({
			kind: "updateProps",
			id: q(r).id,
			set: {},
			unset: [e]
		}) : t.store.run({
			kind: "updateProps",
			id: q(r).id,
			set: { [e]: n }
		}));
	}
	function c(e) {
		if (!q(r)) return;
		let n = typeof q(r).fields.name == "string" ? q(r).fields.name : null;
		t.store.run({
			kind: "rename",
			id: q(r).id,
			name: n,
			label: e.trim() === "" ? null : e
		});
	}
	function l() {
		q(r) && t.store.run({
			kind: "remove",
			id: q(r).id
		}, ["announce.removed"]) && t.onRemoved();
	}
	var u = Qa(), d = I(u), f = I(d, !0);
	O(d);
	var p = L(d, 2), m = (e) => {
		var t = Ya(), r = I(t, !0);
		O(t), R((e) => Z(r, e), [() => q(n)("inspector.none")]), X(e, t);
	}, h = (e) => {
		var u = _i();
		Ti(tr(u), () => q(r).id, (e) => {
			var u = Za(), d = tr(u), f = I(d, !0);
			O(d);
			var p = L(d, 2), m = I(p), h = I(m, !0);
			O(m);
			var g = L(m, 2);
			Ji(g), O(p);
			var _ = L(p, 2), v = (e) => {
				var t = Xa(), r = I(t, !0);
				O(t), R((e) => Z(r, e), [() => q(n)("inspector.locked")]), X(e, t);
			}, y = (e) => {
				var r = _i();
				ki(tr(r), 17, () => q(a), (e) => e.key, (e, r) => {
					{
						let i = /* @__PURE__ */ M(() => `${t.uid}-prop-${q(r).key}`);
						Ja(e, {
							get field() {
								return q(r);
							},
							get t() {
								return q(n);
							},
							get id() {
								return q(i);
							},
							get value() {
								return q(o)[q(r).key];
							},
							onChange: (e) => s(q(r).key, e)
						});
					}
				}), X(e, r);
			};
			Q(_, (e) => {
				q(i) ? e(y, -1) : e(v);
			});
			var b = L(_, 2), x = I(b), S = I(x, !0);
			O(x);
			var ee = L(x, 2), te = I(ee, !0);
			O(ee), O(b), R((e, n, a) => {
				Z(f, q(i)?.label ?? q(r).type), $(m, "for", `${t.uid}-name`), Z(h, e), $(g, "id", `${t.uid}-name`), Yi(g, typeof q(r).fields.label == "string" ? q(r).fields.label : ""), Z(S, n), Z(te, a);
			}, [
				() => q(n)("inspector.name"),
				() => q(n)("inspector.duplicate"),
				() => q(n)("inspector.remove")
			]), J("input", g, (e) => c(e.currentTarget.value)), J("click", x, () => q(r) && t.store.run({
				kind: "duplicate",
				id: q(r).id
			})), J("click", ee, l), X(e, u);
		}), X(e, u);
	};
	Q(p, (e) => {
		q(r) ? e(h, -1) : e(m);
	}), O(u), R((e) => {
		$(u, "aria-labelledby", `${t.uid}-inspector-title`), $(d, "id", `${t.uid}-inspector-title`), Z(f, e);
	}, [() => q(n)("inspector.title")]), X(e, u), Bt();
}
ui(["input", "click"]);
// src/ui/model/insert.ts
var to = (e, t) => {
	let n = {};
	for (let [r, i] of Object.entries(e.get(t)?.propsSchema ?? {})) {
		let e = i?.default;
		e !== void 0 && (n[r] = e);
	}
	return {
		type: t,
		props: n,
		children: []
	};
}, no = (e, t, n) => {
	let r = e.get(t);
	return !r?.isContainer || r.disallowedChildren.includes(n) ? !1 : r.allowedChildren.includes("*") || r.allowedChildren.includes(n);
}, ro = (e, t, n, r) => {
	let i = n === null ? void 0 : e.nodes[n];
	if (!i) return {
		parent: null,
		index: e.rootIds.length
	};
	if (no(t, i.type, r)) return {
		parent: i.id,
		index: i.children.length
	};
	let a = x(e, i.parent);
	return {
		parent: i.parent,
		index: a.indexOf(i.id) + 1
	};
}, io = /* @__PURE__ */ Y("<li><button type=\"button\" class=\"svelte-om8jxl\"> </button></li>"), ao = /* @__PURE__ */ Y("<h3 class=\"svelte-om8jxl\"> </h3> <ul class=\"svelte-om8jxl\"></ul>", 1), oo = /* @__PURE__ */ Y("<section class=\"palette svelte-om8jxl\" aria-labelledby=\"cpb-palette-title\"><h2 id=\"cpb-palette-title\" class=\"svelte-om8jxl\"> </h2> <!></section>"), so = {
	hash: "svelte-om8jxl",
	code: ".palette.svelte-om8jxl {padding:.5rem .75rem;overflow:auto;}h2.svelte-om8jxl {font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin:0 0 .5rem;color:var(--cpb-muted);}h3.svelte-om8jxl {font-size:.75rem;margin:.5rem 0 .25rem;color:var(--cpb-muted);text-transform:capitalize;}ul.svelte-om8jxl {list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2, 1fr);gap:.25rem;}button.svelte-om8jxl {touch-action:none;width:100%;font:inherit;font-size:.8rem;padding:.35rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;text-align:left;}button.svelte-om8jxl:hover {border-color:var(--cpb-accent);}button.svelte-om8jxl:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function co(e, t) {
	zt(t, !0), Fi(e, so);
	let n = /* @__PURE__ */ M(() => t.store.t), r = [
		"div",
		"section",
		"h1",
		"h2",
		"h3",
		"p",
		"a",
		"ul",
		"li",
		"img"
	], i = /* @__PURE__ */ M(() => {
		let e = t.store.catalogue;
		if (!e) return [];
		let n = [...e.rules.values()].filter((e) => (e.label !== e.type || r.includes(e.type)) && e.type !== "html"), i = /* @__PURE__ */ new Map();
		for (let e of n) i.set(e.category, [...i.get(e.category) ?? [], e]);
		return [...i.entries()];
	});
	function a(e) {
		let n = t.store.catalogue;
		if (!n || t.drag.consumeClick()) return;
		let r = ro(t.store.tree, n, t.store.selection, e.type);
		t.store.run({
			kind: "insert",
			...r,
			node: to(n, e.type)
		}, ["announce.inserted", { label: e.label }]) && t.store.selection && t.onInserted(t.store.selection);
	}
	var o = oo(), s = I(o), c = I(s, !0);
	O(s), ki(L(s, 2), 17, () => q(i), ([e, t]) => e, (e, r) => {
		var i = /* @__PURE__ */ M(() => He(q(r), 2));
		let o = () => q(i)[0], s = () => q(i)[1];
		var c = ao(), l = tr(c), u = I(l, !0);
		O(l);
		var d = L(l, 2);
		ki(d, 21, s, (e) => e.type, (e, r) => {
			var i = io(), o = I(i), s = I(o, !0);
			O(o), O(i), R((e) => {
				$(o, "aria-label", e), $(o, "data-type", q(r).type), Z(s, q(r).label);
			}, [() => q(n)("palette.insert", { label: q(r).label })]), J("click", o, () => a(q(r))), J("pointerdown", o, (e) => t.store.catalogue && t.drag.pressNew(e, {
				kind: "insert",
				node: to(t.store.catalogue, q(r).type)
			}, q(r).label)), X(e, i);
		}), O(d), R((e) => Z(u, e), [() => o().replace(/_/g, " ")]), X(e, c);
	}), O(o), R((e) => Z(c, e), [() => q(n)("palette.title")]), X(e, o), Bt();
}
ui(["click", "pointerdown"]);
// src/ui/publish/ConflictBanner.svelte
var lo = /* @__PURE__ */ Y("<button type=\"button\" class=\"svelte-1ti6kqq\"> </button>"), uo = /* @__PURE__ */ Y("<div class=\"conflict svelte-1ti6kqq\" role=\"alertdialog\" aria-modal=\"false\" tabindex=\"-1\"><strong> </strong> <p class=\"svelte-1ti6kqq\"> </p> <div class=\"actions svelte-1ti6kqq\"><button type=\"button\" class=\"primary svelte-1ti6kqq\"> </button> <button type=\"button\" class=\"svelte-1ti6kqq\"> </button> <!></div></div>"), fo = {
	hash: "svelte-1ti6kqq",
	code: ".conflict.svelte-1ti6kqq {margin:.5rem .75rem 0;padding:.75rem;border:2px solid var(--cpb-danger);border-radius:8px;background:#fef2f2;}.conflict.svelte-1ti6kqq:focus-visible {outline:2px solid var(--cpb-danger);outline-offset:2px;}p.svelte-1ti6kqq {margin:.25rem 0 .5rem;font-size:.875rem;}.actions.svelte-1ti6kqq {display:flex;flex-wrap:wrap;gap:.5rem;}button.svelte-1ti6kqq {font:inherit;font-size:.85rem;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.primary.svelte-1ti6kqq {background:var(--cpb-danger);border-color:var(--cpb-danger);color:#fff;}button.svelte-1ti6kqq:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:2px;}"
};
function po(e, t) {
	zt(t, !0), Fi(e, fo);
	let n = /* @__PURE__ */ M(() => t.store.t), r = /* @__PURE__ */ N(void 0);
	hr(() => {
		t.store.status === "conflict" && Qr().then(() => q(r)?.focus());
	});
	var i = _i(), a = tr(i), o = (e) => {
		var i = uo(), a = I(i), o = I(a, !0);
		O(a);
		var s = L(a, 2), c = I(s, !0);
		O(s);
		var l = L(s, 2), u = I(l), d = I(u, !0);
		O(u);
		var f = L(u, 2), p = I(f, !0);
		O(f);
		var m = L(f, 2), h = (e) => {
			var r = lo(), i = I(r, !0);
			O(r), R((e) => Z(i, e), [() => q(n)("conflict.view")]), J("click", r, () => t.onView?.(t.store.conflictRevision)), X(e, r);
		};
		Q(m, (e) => {
			t.onView && t.store.conflictRevision && e(h);
		}), O(l), O(i), ta(i, (e) => P(r, e), () => q(r)), R((e, n, r, l) => {
			$(i, "aria-labelledby", `${t.uid}-conflict-title`), $(i, "aria-describedby", `${t.uid}-conflict-body`), $(a, "id", `${t.uid}-conflict-title`), Z(o, e), $(s, "id", `${t.uid}-conflict-body`), Z(c, n), Z(d, r), Z(p, l);
		}, [
			() => q(n)("conflict.title"),
			() => q(n)("conflict.body", {
				revision: t.store.conflictRevision ?? "?",
				base: t.store.revision
			}),
			() => q(n)("conflict.keepMine"),
			() => q(n)("conflict.takeTheirs")
		]), J("click", u, () => t.store.resolve("keep-mine")), J("click", f, () => t.store.resolve("take-theirs")), X(e, i);
	};
	Q(a, (e) => {
		t.store.status === "conflict" && e(o);
	}), X(e, i), Bt();
}
ui(["click"]);
// src/ui/publish/ServerView.svelte
var mo = /* @__PURE__ */ Y("<p class=\"note svelte-ztrun4\"> </p>"), ho = /* @__PURE__ */ Y("<p class=\"note svelte-ztrun4\" role=\"status\"> </p>"), go = /* @__PURE__ */ Y("<iframe sandbox=\"\" class=\"svelte-ztrun4\"></iframe>"), _o = /* @__PURE__ */ Y("<div class=\"server svelte-ztrun4\"><div class=\"bar svelte-ztrun4\"><strong> </strong> <button type=\"button\" class=\"svelte-ztrun4\"> </button></div> <!> <!></div>"), vo = {
	hash: "svelte-ztrun4",
	code: ".server.svelte-ztrun4 {background:var(--cpb-canvas);padding:.5rem 1rem 1rem;min-height:0;display:flex;flex-direction:column;gap:.5rem;}.bar.svelte-ztrun4 {display:flex;align-items:center;gap:.75rem;}.note.svelte-ztrun4 {margin:0;font-size:.8rem;color:var(--cpb-muted);}button.svelte-ztrun4 {margin-left:auto;font:inherit;font-size:.8rem;padding:.3rem .7rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}iframe.svelte-ztrun4 {flex:1;width:100%;min-height:480px;border:1px solid var(--cpb-border);border-radius:8px;background:#fff;}"
};
function yo(e, t) {
	zt(t, !0), Fi(e, vo);
	let n = na(t, "stylesheets", 19, () => []), r = /* @__PURE__ */ M(() => t.store.t), i = /* @__PURE__ */ N(null);
	hr(() => {
		let e = t.store.session.transport.render, n = t.revision;
		P(i, null), e && e.call(t.store.session.transport, t.store.session.pageId, n).then((e) => {
			n === t.revision && P(i, e, !0);
		}).catch((e) => t.store.fail(e));
	});
	let a = /* @__PURE__ */ M(() => q(i) === null ? "" : ua(n()).replace("<body></body>", `<body>${q(i)}</body>`));
	var o = _o(), s = I(o), c = I(s), l = I(c, !0);
	O(c);
	var u = L(c, 2), d = I(u, !0);
	O(u), O(s);
	var f = L(s, 2), p = (e) => {
		var t = mo(), n = I(t, !0);
		O(t), R((e) => Z(n, e), [() => q(r)("server.dirty")]), X(e, t);
	};
	Q(f, (e) => {
		t.store.dirty && e(p);
	});
	var m = L(f, 2), h = (e) => {
		var t = ho(), n = I(t, !0);
		O(t), R((e) => Z(n, e), [() => q(r)("server.loading")]), X(e, t);
	}, g = (e) => {
		var t = go();
		R((e) => {
			$(t, "title", e), $(t, "srcdoc", q(a));
		}, [() => q(r)("server.frame")]), X(e, t);
	};
	Q(m, (e) => {
		q(i) === null ? e(h) : e(g, -1);
	}), O(o), R((e, t) => {
		Z(l, e), Z(d, t);
	}, [() => q(r)("server.title", { revision: t.revision }), () => q(r)("server.back")]), J("click", u, function(...e) {
		t.onBack?.apply(this, e);
	}), X(e, o), Bt();
}
ui(["click"]);
// src/ui/model/flatten.ts
var bo = (e) => {
	let t = [], n = (r, i, a) => {
		r.forEach((o, s) => {
			t.push({
				id: o,
				depth: a,
				parent: i,
				index: s,
				siblings: r.length
			}), n(e.nodes[o]?.children ?? [], o, a + 1);
		});
	};
	return n(e.rootIds, null, 1), t;
}, xo = (e) => {
	if (!(e.ctrlKey || e.metaKey) || e.altKey) return null;
	let t = e.key.toLowerCase();
	return t === "z" ? e.shiftKey ? { type: "redo" } : { type: "undo" } : t === "y" ? { type: "redo" } : null;
}, So = (e, t, n) => {
	let r = bo(e), i = r[0];
	if (!i) return null;
	let a = t === null ? -1 : r.findIndex((e) => e.id === t), o = r[a];
	if (!o) return n.key === "ArrowDown" || n.key === "Home" ? {
		type: "select",
		id: i.id
	} : null;
	let s = e.nodes[o.id], c = x(e, o.parent), l = n.ctrlKey || n.metaKey;
	if (n.altKey && !l) switch (n.key) {
		case "ArrowUp": return o.index > 0 ? Co(o.id, o.parent, o.index - 1) : null;
		case "ArrowDown": return o.index < c.length - 1 ? Co(o.id, o.parent, o.index + 2) : null;
		case "ArrowRight": {
			let t = c[o.index - 1];
			return t ? Co(o.id, t, e.nodes[t]?.children.length ?? 0) : null;
		}
		case "ArrowLeft": {
			if (o.parent === null) return null;
			let t = e.nodes[o.parent], n = x(e, t?.parent ?? null);
			return Co(o.id, t?.parent ?? null, n.indexOf(o.parent) + 1);
		}
		default: return null;
	}
	if (l && n.key.toLowerCase() === "d") return {
		type: "command",
		command: {
			kind: "duplicate",
			id: o.id
		}
	};
	if (l || n.altKey) return xo(n);
	switch (n.key) {
		case "ArrowDown": return wo(r[a + 1]?.id);
		case "ArrowUp": return wo(r[a - 1]?.id);
		case "Home": return wo(i.id);
		case "End": return wo(r[r.length - 1]?.id);
		case "ArrowRight": return wo(s?.children[0]);
		case "ArrowLeft": return wo(o.parent ?? void 0);
		case "Delete":
		case "Backspace": return {
			type: "command",
			command: {
				kind: "remove",
				id: o.id
			}
		};
		default: return null;
	}
}, Co = (e, t, n) => ({
	type: "command",
	command: {
		kind: "move",
		id: e,
		parent: t,
		index: n
	}
}), wo = (e) => e ? {
	type: "select",
	id: e
} : null, To = /* @__PURE__ */ Y("<p class=\"empty svelte-y2i8n1\"> </p>"), Eo = /* @__PURE__ */ Y("<li role=\"treeitem\" class=\"svelte-y2i8n1\"> </li>"), Do = /* @__PURE__ */ Y("<ul role=\"tree\" aria-labelledby=\"cpb-structure-title\" aria-describedby=\"cpb-structure-help\" class=\"svelte-y2i8n1\"></ul>"), Oo = /* @__PURE__ */ Y("<section class=\"structure svelte-y2i8n1\" aria-labelledby=\"cpb-structure-title\"><h2 id=\"cpb-structure-title\" class=\"svelte-y2i8n1\"> </h2> <p class=\"help svelte-y2i8n1\" id=\"cpb-structure-help\"> </p> <!></section>"), ko = {
	hash: "svelte-y2i8n1",
	code: ".structure.svelte-y2i8n1 {padding:.5rem .75rem;overflow:auto;border-top:1px solid var(--cpb-border);}h2.svelte-y2i8n1 {font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin:0;color:var(--cpb-muted);}.help.svelte-y2i8n1, .empty.svelte-y2i8n1 {font-size:.75rem;color:var(--cpb-muted);margin:.25rem 0 .5rem;}ul.svelte-y2i8n1 {list-style:none;margin:0;padding:0;outline:none;}li.svelte-y2i8n1 {font-size:.85rem;padding:.25rem .375rem;border-radius:4px;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}li[aria-selected='true'].svelte-y2i8n1 {background:var(--cpb-accent-soft);color:var(--cpb-accent-strong);font-weight:600;}li.svelte-y2i8n1:focus-visible, ul.svelte-y2i8n1:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:-2px;}"
};
function Ao(e, t) {
	zt(t, !0), Fi(e, ko);
	let n = /* @__PURE__ */ M(() => t.store.t), r = /* @__PURE__ */ M(() => bo(t.store.tree)), i = /* @__PURE__ */ N(void 0), a = (e) => {
		let n = t.store.tree.nodes[e];
		if (!n) return e;
		let r = typeof n.fields.label == "string" && n.fields.label !== "" ? n.fields.label : null, i = t.store.catalogue?.get(n.type);
		return r ? `${r} (${i?.label ?? n.type})` : i?.label ?? n.type;
	};
	async function o(e) {
		await Qr(), ((e ? q(i)?.querySelector(`[data-node-id="${CSS.escape(e)}"]`) : null) ?? q(i))?.focus();
	}
	async function s(e) {
		if ((e.key === "F2" || e.key === "Enter") && t.store.selection && !e.altKey) {
			t.onEdit(t.store.selection) && e.preventDefault();
			return;
		}
		let n = So(t.store.tree, t.store.selection, e);
		if (n) {
			if (e.preventDefault(), n.type === "select") t.store.select(n.id);
			else if (n.type === "undo") t.store.undo();
			else if (n.type === "redo") t.store.redo();
			else {
				let e = n.command.kind;
				t.store.run(n.command, e === "remove" ? ["announce.removed"] : e === "move" ? ["announce.moved"] : void 0);
			}
			await o(t.store.selection);
		}
	}
	var c = { focusItem: o }, l = Oo(), u = I(l), d = I(u, !0);
	O(u);
	var f = L(u, 2), p = I(f, !0);
	O(f);
	var m = L(f, 2), h = (e) => {
		var t = To(), r = I(t, !0);
		O(t), R((e) => Z(r, e), [() => q(n)("structure.empty")]), X(e, t);
	}, g = (e) => {
		var n = Do();
		ki(n, 21, () => q(r), (e) => e.id, (e, n) => {
			var r = Eo();
			let i;
			var o = I(r, !0);
			O(r), R((e) => {
				$(r, "aria-level", q(n).depth), $(r, "aria-setsize", q(n).siblings), $(r, "aria-posinset", q(n).index + 1), $(r, "aria-selected", t.store.selection === q(n).id), $(r, "tabindex", t.store.selection === q(n).id ? 0 : -1), $(r, "data-node-id", q(n).id), i = Bi(r, "", i, { "padding-left": `${(q(n).depth - 1) * 14 + 6}px` }), Z(o, e);
			}, [() => a(q(n).id)]), J("click", r, () => t.store.select(q(n).id)), li("focus", r, () => t.store.selection !== q(n).id && t.store.select(q(n).id)), J("keydown", r, () => {}), X(e, r);
		}), O(n), ta(n, (e) => P(i, e), () => q(i)), R(() => $(n, "tabindex", t.store.selection ? -1 : 0)), J("keydown", n, s), X(e, n);
	};
	return Q(m, (e) => {
		q(r).length === 0 ? e(h) : e(g, -1);
	}), O(l), R((e, t) => {
		Z(d, e), Z(p, t);
	}, [() => q(n)("structure.title"), () => q(n)("structure.help")]), X(e, l), Bt(c);
}
ui(["keydown", "click"]);
// src/ui/toolbar/Toolbar.svelte
var jo = /* @__PURE__ */ Y("<button type=\"button\" class=\"primary svelte-ouhh5d\"> </button>"), Mo = /* @__PURE__ */ Y("<button type=\"button\" class=\"svelte-ouhh5d\"> </button>"), No = /* @__PURE__ */ Y("<span class=\"revision svelte-ouhh5d\"> <span data-publication=\"\"> </span></span>"), Po = /* @__PURE__ */ Y("<div class=\"toolbar svelte-ouhh5d\" role=\"toolbar\"><button type=\"button\" aria-keyshortcuts=\"Control+Z\" class=\"svelte-ouhh5d\"> </button> <button type=\"button\" aria-keyshortcuts=\"Control+Shift+Z\" class=\"svelte-ouhh5d\"> </button> <button type=\"button\" aria-keyshortcuts=\"Control+S\" class=\"svelte-ouhh5d\"> </button> <!> <!> <span class=\"status svelte-ouhh5d\"> </span> <!></div>"), Fo = {
	hash: "svelte-ouhh5d",
	code: ".toolbar.svelte-ouhh5d {display:flex;flex-wrap:wrap;gap:.5rem;align-items:center;padding:.5rem .75rem;border-bottom:1px solid var(--cpb-border);}button.svelte-ouhh5d {font:inherit;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.svelte-ouhh5d:disabled {opacity:.5;cursor:not-allowed;}button.primary.svelte-ouhh5d {background:var(--cpb-accent);border-color:var(--cpb-accent);color:#fff;}button[aria-pressed='true'].svelte-ouhh5d {background:var(--cpb-accent-soft);border-color:var(--cpb-accent);}button.svelte-ouhh5d:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:2px;}.status.svelte-ouhh5d {margin-left:auto;font-size:.875rem;}.status[data-status='conflict'].svelte-ouhh5d, .status[data-status='offline'].svelte-ouhh5d, .status[data-status='load-error'].svelte-ouhh5d {color:var(--cpb-danger);font-weight:600;}.revision.svelte-ouhh5d {font-size:.75rem;color:var(--cpb-muted);}"
};
function Io(e, t) {
	zt(t, !0), Fi(e, Fo);
	let n = /* @__PURE__ */ M(() => t.store.t), r = /* @__PURE__ */ M(() => t.store.publishedRevision === null ? q(n)("publication.none") : t.store.unpublished ? q(n)("publication.pending", { revision: t.store.publishedRevision }) : q(n)("publication.current"));
	var i = Po(), a = I(i), o = I(a, !0);
	O(a);
	var s = L(a, 2), c = I(s, !0);
	O(s);
	var l = L(s, 2), u = I(l, !0);
	O(l);
	var d = L(l, 2), f = (e) => {
		var r = jo(), i = I(r, !0);
		O(r), R((e) => {
			r.disabled = t.store.publishing || t.store.status !== "ready" || !t.store.unpublished, Z(i, e);
		}, [() => t.store.publishing ? q(n)("toolbar.publishing") : q(n)("toolbar.publish")]), J("click", r, () => t.store.publish()), X(e, r);
	};
	Q(d, (e) => {
		t.store.canPublish && e(f);
	});
	var p = L(d, 2), m = (e) => {
		var r = Mo(), i = I(r, !0);
		O(r), R((e) => {
			$(r, "aria-pressed", t.serverView), Z(i, e);
		}, [() => q(n)("toolbar.serverView")]), J("click", r, function(...e) {
			t.onServerView?.apply(this, e);
		}), X(e, r);
	};
	Q(p, (e) => {
		t.onServerView && e(m);
	});
	var h = L(p, 2), g = I(h, !0);
	O(h);
	var _ = L(h, 2), v = (e) => {
		var i = No(), a = I(i), o = L(a), s = I(o, !0);
		O(o), O(i), R((e) => {
			Z(a, `${e ?? ""} · `), Z(s, q(r));
		}, [() => q(n)("toolbar.revision", { revision: t.store.revision })]), X(e, i);
	};
	Q(_, (e) => {
		t.store.revision > 0 && e(v);
	}), O(i), R((e, n, r, d, f) => {
		$(i, "aria-label", e), a.disabled = !t.store.canUndo, Z(o, n), s.disabled = !t.store.canRedo, Z(c, r), l.disabled = !t.store.dirty || t.store.status === "saving" || t.store.status === "conflict", Z(u, d), $(h, "data-status", t.store.status), Z(g, f);
	}, [
		() => q(n)("editor.label"),
		() => q(n)("toolbar.undo"),
		() => q(n)("toolbar.redo"),
		() => q(n)("toolbar.save"),
		() => q(n)(`status.${t.store.status}`)
	]), J("click", a, () => t.store.undo()), J("click", s, () => t.store.redo()), J("click", l, () => t.store.save()), X(e, i), Bt();
}
ui(["click"]);
// src/ui/Editor.svelte
var Lo = /* @__PURE__ */ Y("<div class=\"editor svelte-b7je3p\" role=\"application\"><!> <!> <div class=\"body svelte-b7je3p\"><aside class=\"left svelte-b7je3p\"><!> <!></aside> <!> <!></div> <div class=\"sr-only svelte-b7je3p\" aria-live=\"polite\"> </div> <div class=\"sr-only svelte-b7je3p\" aria-live=\"assertive\" role=\"alert\"> </div></div>"), Ro = {
	hash: "svelte-b7je3p",
	code: ".editor.svelte-b7je3p {--cpb-border: #d4d4d8;--cpb-surface: #fff;--cpb-canvas: #f1f5f9;--cpb-muted: #52525b;--cpb-accent: #2563eb;--cpb-accent-soft: #dbeafe;--cpb-accent-strong: #1e3a8a;--cpb-danger: #b91c1c;font:14px/1.4 system-ui, sans-serif;color:#18181b;background:var(--cpb-surface);display:flex;flex-direction:column;height:100%;min-height:600px;border:1px solid var(--cpb-border);}.body.svelte-b7je3p {flex:1;display:grid;grid-template-columns:240px 1fr 280px;min-height:0;}.left.svelte-b7je3p {display:grid;grid-template-rows:minmax(0, 45%) minmax(0, 1fr);min-height:0;border-right:1px solid var(--cpb-border);}.sr-only.svelte-b7je3p {position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;}\n  @media (max-width: 900px) {.body.svelte-b7je3p {grid-template-columns:1fr;} }"
};
function zo(e, t) {
	zt(t, !0), Fi(e, Ro);
	let n = na(t, "stylesheets", 19, () => []), r = /* @__PURE__ */ N(void 0), i = /* @__PURE__ */ N(void 0), a = /* @__PURE__ */ M(() => new Na(t.store)), o = /* @__PURE__ */ N(null), s = /* @__PURE__ */ M(() => typeof t.store.session.transport.render == "function");
	function c(e) {
		if ((e.ctrlKey || e.metaKey) && !e.altKey && e.key.toLowerCase() === "s") {
			e.preventDefault(), t.store.dirty && t.store.save();
			return;
		}
		if (e.target?.closest("input, textarea, select, [contenteditable=\"true\"], [role=\"tree\"]")) return;
		let n = xo(e);
		n && (e.preventDefault(), n.type === "undo" ? t.store.undo() : n.type === "redo" && t.store.redo());
	}
	var l = Lo(), u = I(l);
	{
		let e = /* @__PURE__ */ M(() => q(o) !== null), n = /* @__PURE__ */ M(() => q(s) ? () => {
			P(o, q(o) === null ? t.store.revision : null, !0);
		} : null);
		Io(u, {
			get store() {
				return t.store;
			},
			get serverView() {
				return q(e);
			},
			get onServerView() {
				return q(n);
			}
		});
	}
	var d = L(u, 2);
	{
		let e = /* @__PURE__ */ M(() => q(s) ? (e) => {
			P(o, e, !0);
		} : null);
		po(d, {
			get store() {
				return t.store;
			},
			get uid() {
				return t.uid;
			},
			get onView() {
				return q(e);
			}
		});
	}
	var f = L(d, 2), p = I(f), m = I(p);
	co(m, {
		get store() {
			return t.store;
		},
		get drag() {
			return q(a);
		},
		onInserted: (e) => q(r)?.focusItem(e)
	}), ta(Ao(L(m, 2), {
		get store() {
			return t.store;
		},
		onEdit: (e) => q(i)?.startEditing(e) ?? !1
	}), (e) => P(r, e, !0), () => q(r)), O(p);
	var h = L(p, 2), g = (e) => {
		yo(e, {
			get store() {
				return t.store;
			},
			get revision() {
				return q(o);
			},
			get stylesheets() {
				return n();
			},
			onBack: () => {
				P(o, null);
			}
		});
	}, _ = (e) => {
		ta(wa(e, {
			get store() {
				return t.store;
			},
			get drag() {
				return q(a);
			},
			get uid() {
				return t.uid;
			},
			get stylesheets() {
				return n();
			},
			onEditEnd: (e, t) => {
				t && q(r)?.focusItem(e);
			}
		}), (e) => P(i, e, !0), () => q(i));
	};
	Q(h, (e) => {
		q(o) === null ? e(_, -1) : e(g);
	}), eo(L(h, 2), {
		get store() {
			return t.store;
		},
		get uid() {
			return t.uid;
		},
		onRemoved: () => q(r)?.focusItem(t.store.selection)
	}), O(f);
	var v = L(f, 2), y = I(v, !0);
	O(v);
	var b = L(v, 2), x = I(b, !0);
	O(b), O(l), R((e) => {
		$(l, "aria-label", e), Z(y, t.store.message), Z(x, t.store.alert);
	}, [() => t.store.t("editor.label")]), J("keydown", l, c), X(e, l), Bt();
}
ui(["keydown"]);
// src/ui/i18n/en.ts
var Bo = {
	"editor.label": "Page editor",
	"toolbar.undo": "Undo",
	"toolbar.redo": "Redo",
	"toolbar.save": "Save",
	"toolbar.revision": "Revision {revision}",
	"status.loading": "Loading…",
	"status.ready": "Saved",
	"status.dirty": "Unsaved changes",
	"status.saving": "Saving…",
	"status.conflict": "Conflict: someone else saved this page",
	"status.offline": "Offline; your changes are still here",
	"status.load-error": "The page could not be loaded",
	"palette.title": "Components",
	"palette.insert": "Insert {label}",
	"structure.title": "Structure",
	"structure.empty": "The page is empty. Insert a component.",
	"structure.help": "Arrows to navigate · Alt+arrows to move · F2 to edit the text · Delete to remove · Ctrl+D to duplicate",
	"canvas.title": "Page canvas",
	"canvas.unknown": "Component not available: {type}",
	"canvas.html": "Embedded HTML (not shown while editing)",
	"canvas.emptyImage": "Image without URL",
	"inspector.title": "Properties",
	"inspector.none": "Select an element to see its properties.",
	"inspector.name": "Name in the structure",
	"inspector.locked": "This component is not in the catalogue: it is kept but cannot be edited.",
	"inspector.duplicate": "Duplicate",
	"inspector.remove": "Remove",
	"field.number": "Enter a number.",
	"field.url": "Use an http, https, mailto or tel address, or a site path.",
	"field.option": "Choose one of the options.",
	"announce.inserted": "{label} inserted",
	"announce.removed": "Element removed",
	"announce.moved": "Element moved",
	"announce.saved": "Saved as revision {revision}",
	"announce.dragCancelled": "Drag cancelled",
	"announce.published": "Revision {revision} published",
	"announce.keptMine": "Your changes were saved as revision {revision}",
	"announce.tookTheirs": "Loaded revision {revision} from the server",
	"toolbar.publish": "Publish",
	"toolbar.publishing": "Publishing…",
	"toolbar.serverView": "Server view",
	"publication.none": "Not published",
	"publication.current": "Published",
	"publication.pending": "Published: revision {revision} · there are unpublished changes",
	"conflict.title": "Someone else saved this page",
	"conflict.body": "The server has revision {revision} and you started from {base}. Your changes are still here; choose what to do.",
	"conflict.keepMine": "Keep my changes",
	"conflict.takeTheirs": "Use the server version",
	"conflict.view": "View the server version",
	"server.title": "Revision {revision} drawn by the server",
	"server.dirty": "Shows the last saved revision: save to see your changes.",
	"server.frame": "Server view",
	"server.loading": "Asking the server for the page…",
	"server.back": "Back to the canvas",
	"announce.editing": "Editing the text. Enter or Escape to finish.",
	"announce.editDone": "Text updated",
	"canvas.help": "Drag to move; double-click a text to edit it. With the keyboard: the structure tree (F2 edits the text).",
	"error.NODE_NOT_FOUND": "The element no longer exists.",
	"error.INVALID_TARGET": "Invalid target.",
	"error.CYCLE": "An element cannot be moved inside itself.",
	"error.PLACEMENT_NOT_ALLOWED": "That element cannot be placed there.",
	"error.UNKNOWN_COMPONENT": "That component is not available.",
	"error.LOCKED_COMPONENT": "This component cannot be edited.",
	"error.DUPLICATE_ID": "Repeated identifier.",
	"error.MAX_NODES": "The page reached the maximum number of elements.",
	"error.MAX_DEPTH": "No more nesting levels are allowed.",
	"error.DOCUMENT_TOO_LARGE": "The page is too large to be saved.",
	"error.INVALID_DOCUMENT": "The document is not valid.",
	"error.NOTHING_TO_SAVE": "There are no changes to save.",
	"error.SAVE_IN_PROGRESS": "A save is already running.",
	"error.REVISION_CONFLICT": "Someone else saved this page. Your changes are still here.",
	"error.PUBLIC_CONTENT_DRIFT": "The public page changed outside the editor; it must be reconciled before publishing.",
	"error.NOTHING_TO_PUBLISH": "Save your changes before publishing; this revision is already published.",
	"error.VALIDATION_FAILED": "The server rejected the page.",
	"error.AUTHORIZATION_DENIED": "You do not have permission for this action.",
	"error.NETWORK": "Offline. Your changes are still here.",
	"error.SERVER": "Server error. Your changes are still here."
}, Vo = {
	"editor.label": "Editor de página",
	"toolbar.undo": "Deshacer",
	"toolbar.redo": "Rehacer",
	"toolbar.save": "Guardar",
	"toolbar.revision": "Revisión {revision}",
	"status.loading": "Cargando…",
	"status.ready": "Guardado",
	"status.dirty": "Cambios sin guardar",
	"status.saving": "Guardando…",
	"status.conflict": "Conflicto: otra persona guardó esta página",
	"status.offline": "Sin conexión; los cambios siguen aquí",
	"status.load-error": "No se pudo cargar la página",
	"palette.title": "Componentes",
	"palette.insert": "Insertar {label}",
	"structure.title": "Estructura",
	"structure.empty": "La página está vacía. Inserta un componente.",
	"structure.help": "Flechas para navegar · Alt+flechas para mover · F2 para editar el texto · Supr para borrar · Ctrl+D para duplicar",
	"canvas.title": "Lienzo de la página",
	"canvas.unknown": "Componente no disponible: {type}",
	"canvas.html": "HTML incrustado (no se muestra mientras se edita)",
	"canvas.emptyImage": "Imagen sin URL",
	"inspector.title": "Propiedades",
	"inspector.none": "Selecciona un elemento para ver sus propiedades.",
	"inspector.name": "Nombre en la estructura",
	"inspector.locked": "Este componente no está en el catálogo: se conserva, pero no se puede editar.",
	"inspector.duplicate": "Duplicar",
	"inspector.remove": "Eliminar",
	"field.number": "Escribe un número.",
	"field.url": "Usa una dirección http, https, mailto, tel o una ruta del sitio.",
	"field.option": "Elige una de las opciones.",
	"announce.inserted": "{label} insertado",
	"announce.removed": "Elemento eliminado",
	"announce.moved": "Elemento movido",
	"announce.saved": "Guardado como revisión {revision}",
	"announce.dragCancelled": "Arrastre cancelado",
	"announce.published": "Revisión {revision} publicada",
	"announce.keptMine": "Tus cambios se guardaron como revisión {revision}",
	"announce.tookTheirs": "Cargada la revisión {revision} del servidor",
	"toolbar.publish": "Publicar",
	"toolbar.publishing": "Publicando…",
	"toolbar.serverView": "Vista del servidor",
	"publication.none": "Sin publicar",
	"publication.current": "Publicada",
	"publication.pending": "Publicada: revisión {revision} · hay cambios sin publicar",
	"conflict.title": "Otra persona guardó esta página",
	"conflict.body": "El servidor tiene la revisión {revision} y tú partiste de la {base}. Tus cambios siguen aquí; elige qué hacer.",
	"conflict.keepMine": "Conservar mis cambios",
	"conflict.takeTheirs": "Usar la versión del servidor",
	"conflict.view": "Ver la versión del servidor",
	"server.title": "Revisión {revision} dibujada por el servidor",
	"server.dirty": "Muestra la última revisión guardada: guarda para ver tus cambios.",
	"server.frame": "Vista del servidor",
	"server.loading": "Pidiendo la página al servidor…",
	"server.back": "Volver al lienzo",
	"announce.editing": "Editando el texto. Intro o Escape para terminar.",
	"announce.editDone": "Texto actualizado",
	"canvas.help": "Arrastra para mover; doble clic en un texto para editarlo. Con teclado: el árbol de estructura (F2 edita el texto).",
	"error.NODE_NOT_FOUND": "El elemento ya no existe.",
	"error.INVALID_TARGET": "Destino no válido.",
	"error.CYCLE": "No se puede mover un elemento dentro de sí mismo.",
	"error.PLACEMENT_NOT_ALLOWED": "Ese elemento no se puede colocar ahí.",
	"error.UNKNOWN_COMPONENT": "Ese componente no está disponible.",
	"error.LOCKED_COMPONENT": "Este componente no se puede editar.",
	"error.DUPLICATE_ID": "Identificador repetido.",
	"error.MAX_NODES": "La página alcanzó el máximo de elementos.",
	"error.MAX_DEPTH": "No se pueden anidar más niveles.",
	"error.DOCUMENT_TOO_LARGE": "La página es demasiado grande para guardarse.",
	"error.INVALID_DOCUMENT": "El documento no es válido.",
	"error.NOTHING_TO_SAVE": "No hay cambios que guardar.",
	"error.SAVE_IN_PROGRESS": "Ya se está guardando.",
	"error.REVISION_CONFLICT": "Otra persona guardó esta página. Tus cambios siguen aquí.",
	"error.PUBLIC_CONTENT_DRIFT": "La página pública cambió fuera del editor; hay que reconciliarla antes de publicar.",
	"error.NOTHING_TO_PUBLISH": "Guarda los cambios antes de publicar; esta revisión ya está publicada.",
	"error.VALIDATION_FAILED": "El servidor rechazó la página.",
	"error.AUTHORIZATION_DENIED": "No tienes permiso para esta acción.",
	"error.NETWORK": "Sin conexión. Tus cambios siguen aquí.",
	"error.SERVER": "Error del servidor. Tus cambios siguen aquí."
}, Ho = {
	es: Vo,
	en: Bo
}, Uo = (e) => {
	let t = Ho[e.toLowerCase().split("-")[0] ?? "es"] ?? Vo;
	return (e, n = {}) => t[e].replace(/\{(\w+)\}/g, (e, t) => String(n[t] ?? `{${t}}`));
}, Wo = class {
	session;
	t;
	#e = /* @__PURE__ */ N({
		nodes: {},
		rootIds: []
	});
	get tree() {
		return q(this.#e);
	}
	set tree(e) {
		P(this.#e, e);
	}
	#t = /* @__PURE__ */ N(null);
	get catalogue() {
		return q(this.#t);
	}
	set catalogue(e) {
		P(this.#t, e);
	}
	#n = /* @__PURE__ */ N(null);
	get selection() {
		return q(this.#n);
	}
	set selection(e) {
		P(this.#n, e, !0);
	}
	#r = /* @__PURE__ */ N("loading");
	get status() {
		return q(this.#r);
	}
	set status(e) {
		P(this.#r, e, !0);
	}
	#i = /* @__PURE__ */ N(!1);
	get dirty() {
		return q(this.#i);
	}
	set dirty(e) {
		P(this.#i, e, !0);
	}
	#a = /* @__PURE__ */ N(!1);
	get canUndo() {
		return q(this.#a);
	}
	set canUndo(e) {
		P(this.#a, e, !0);
	}
	#o = /* @__PURE__ */ N(!1);
	get canRedo() {
		return q(this.#o);
	}
	set canRedo(e) {
		P(this.#o, e, !0);
	}
	#s = /* @__PURE__ */ N(0);
	get revision() {
		return q(this.#s);
	}
	set revision(e) {
		P(this.#s, e, !0);
	}
	#c = /* @__PURE__ */ N(null);
	get publishedRevision() {
		return q(this.#c);
	}
	set publishedRevision(e) {
		P(this.#c, e, !0);
	}
	#l = /* @__PURE__ */ N(!1);
	get canPublish() {
		return q(this.#l);
	}
	set canPublish(e) {
		P(this.#l, e, !0);
	}
	#u = /* @__PURE__ */ N(!1);
	get publishing() {
		return q(this.#u);
	}
	set publishing(e) {
		P(this.#u, e, !0);
	}
	#d = /* @__PURE__ */ N(null);
	get conflictRevision() {
		return q(this.#d);
	}
	set conflictRevision(e) {
		P(this.#d, e, !0);
	}
	#f = /* @__PURE__ */ N("");
	get message() {
		return q(this.#f);
	}
	set message(e) {
		P(this.#f, e, !0);
	}
	#p = /* @__PURE__ */ N("");
	get alert() {
		return q(this.#p);
	}
	set alert(e) {
		P(this.#p, e, !0);
	}
	stops = [];
	constructor(e, t) {
		this.session = e, this.t = t;
		for (let t of [
			"status-change",
			"dirty-change",
			"history-change",
			"selection-change",
			"ready",
			"save-success",
			"conflict",
			"publish-start",
			"publish-success",
			"publish-error"
		]) this.stops.push(e.events.on(t, () => this.sync()));
		this.sync();
	}
	sync() {
		let e = this.session;
		this.tree = e.tree, this.catalogue = e.status === "loading" || e.status === "load-error" ? this.catalogue : e.catalogue, this.selection = e.selection, this.status = e.status, this.dirty = e.dirty, this.canUndo = e.canUndo, this.canRedo = e.canRedo, this.revision = e.baseRevision, this.publishedRevision = e.publishedRevision, this.canPublish = e.canPublish, this.publishing = e.publishing, this.conflictRevision = e.conflictRevision;
	}
	get unpublished() {
		return this.dirty || this.publishedRevision !== this.revision;
	}
	async publish() {
		try {
			let e = await this.session.publish();
			this.sync(), this.announce("announce.published", { revision: e });
		} catch (e) {
			this.sync(), this.fail(e);
		}
	}
	async resolve(e) {
		try {
			await this.session.resolveConflict(e), this.sync(), this.announce(e === "keep-mine" ? "announce.keptMine" : "announce.tookTheirs", { revision: this.revision });
		} catch (e) {
			this.sync(), this.fail(e);
		}
	}
	announce(e, t = {}) {
		this.message = this.t(e, t), this.alert = "";
	}
	fail(e, t = e instanceof S ? e.code : "SERVER") {
		this.alert = this.t(`error.${t}`);
	}
	run(e, t) {
		try {
			return this.session.dispatch(e), this.sync(), t && this.announce(t[0], t[1]), !0;
		} catch (e) {
			return this.fail(e), !1;
		}
	}
	undo() {
		this.guard(() => this.session.undo());
	}
	redo() {
		this.guard(() => this.session.redo());
	}
	select(e) {
		this.session.select(e), this.sync();
	}
	async save() {
		try {
			let e = await this.session.save("edit");
			this.sync(), e !== null && this.announce("announce.saved", { revision: e });
		} catch (e) {
			this.sync(), this.fail(e);
		}
	}
	destroy() {
		for (let e of this.stops) e();
	}
	guard(e) {
		try {
			e();
		} catch (e) {
			this.fail(e);
		}
		this.sync();
	}
}, Go = [
	"ready",
	"selection-change",
	"dirty-change",
	"save-start",
	"save-success",
	"save-error",
	"conflict",
	"publish-success",
	"publish-error"
], Ko = 0, qo = class extends HTMLElement {
	#e = null;
	#t = null;
	#n = null;
	#r = null;
	#i = null;
	#a = `cpb${++Ko}`;
	get config() {
		return this.#e;
	}
	set config(e) {
		this.#e = e, this.isConnected && this.#o();
	}
	get session() {
		return this.#n;
	}
	connectedCallback() {
		this.#e && !this.#t && this.#o();
	}
	disconnectedCallback() {
		this.#s();
	}
	#o() {
		this.#s();
		let e = this.#e;
		if (!e) return;
		let t = this.shadowRoot ?? this.attachShadow({ mode: "open" }), n = new be(e);
		for (let e of Go) n.events.on(e, (t) => {
			let n = e === "save-error" || e === "publish-error" ? { code: t.error.code } : t;
			this.dispatchEvent(new CustomEvent(e, {
				detail: n,
				bubbles: !0,
				composed: !0
			}));
		});
		let r = new Wo(n, Uo(e.locale ?? "es"));
		this.#n = n, this.#r = r, this.#t = vi(zo, {
			target: t,
			props: {
				store: r,
				uid: this.#a,
				stylesheets: e.stylesheets ?? []
			}
		}), n.load().then(() => {
			r.sync(), e.autosave !== !1 && n.capabilities?.features.autosave !== !1 && (this.#i = new he(n, {
				...ye,
				...e.autosave ?? {}
			}), this.#i.start());
		}, (e) => {
			r.sync(), r.fail(e);
		});
	}
	#s() {
		this.#i?.stop(), this.#i = null, this.#t && Si(this.#t), this.#r?.destroy(), this.#n?.destroy(), this.#t = null, this.#r = null, this.#n = null, this.shadowRoot?.replaceChildren();
	}
}, Jo = (e = "ceiba-page-builder") => {
	customElements.get(e) || customElements.define(e, qo);
};
// src/ui/index.ts
Jo();
export { he as Autosave, qo as CeibaPageBuilder, ye as DEFAULT_AUTOSAVE, _ as DEFAULT_HISTORY, S as EditorError, be as EditorSession, Go as PUBLIC_EVENTS, se as REFERENCE_PROPS, p as SCHEMA_VERSION, _e as SERVER_LIMITS, n as afterRedo, we as afterUndo, oe as applyCommand, me as assertDepth, ne as assertEditable, Ce as assertKnown, Ee as assertNewContent, le as assertNodeCount, ie as assertPlacement, ce as assertSize, h as attachRaw, v as canRedo, i as canUndo, ge as checkTree, x as childrenOf, Te as createCatalogue, Se as createCommands, xe as createEditor, ue as createHttpTransport, Jo as defineElement, d as depthOf, r as emptyHistory, o as emptyTree, re as errorFromResponse, te as fail, e as fromDocument, g as getNode, fe as groupKeyOf, De as heightOf, t as indexInParent, u as insertAt, b as isSelfOrDescendant, a as measureRaw, s as nodeCount, de as parseDocument, ae as randomIds, m as record, pe as sequentialIds, y as subtreeIds, f as toDocument, c as toRaw, ve as withChildren, l as withNode, ee as withoutNodes };

//# sourceMappingURL=ceiba-page-builder.js.map