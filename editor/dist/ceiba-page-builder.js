import { A as e, B as t, C as n, D as r, E as i, F as a, G as o, H as s, I as c, J as l, K as u, L as d, M as f, N as p, O as m, P as h, R as g, S as _, T as v, U as y, V as b, W as ee, Y as x, _ as te, a as ne, b as re, c as ie, d as ae, f as oe, g as se, h as ce, i as le, j as ue, k as de, l as fe, m as pe, n as me, o as he, p as ge, q as _e, r as ve, s as ye, t as be, u as xe, v as Se, w as Ce, x as we, y as Te, z as Ee } from "./shared/core.js";
// node_modules/svelte/src/internal/shared/utils.js
var De = Array.isArray, Oe = Array.prototype.indexOf, ke = Array.prototype.includes, Ae = Array.from, je = Object.defineProperty, Me = Object.getOwnPropertyDescriptor, Ne = Object.getOwnPropertyDescriptors, Pe = Object.prototype, Fe = Array.prototype, Ie = Object.getPrototypeOf, Le = Object.isExtensible, Re = () => {};
function ze(e) {
	for (var t = 0; t < e.length; t++) e[t]();
}
function Be() {
	var e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
function Ve(e, t) {
	if (Array.isArray(e)) return e;
	if (t === void 0 || !(Symbol.iterator in e)) return Array.from(e);
	let n = [];
	for (let r of e) if (n.push(r), n.length === t) break;
	return n;
}
var S = 1024, He = 2048, Ue = 4096, We = 8192, Ge = 16384, Ke = 32768, qe = 1 << 25, Je = 65536, Ye = 1 << 19, Xe = 1 << 20, Ze = 1 << 25, Qe = 65536, $e = 1 << 21, et = 1 << 22, tt = 1 << 23, nt = Symbol("$state"), rt = Symbol("legacy props"), it = Symbol(""), at = Symbol("attributes"), ot = Symbol("class"), st = Symbol("style"), ct = Symbol("text"), lt = Symbol("form reset"), ut = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), dt = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
// node_modules/svelte/src/internal/client/errors.js
function ft() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function pt(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function mt(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function ht() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function gt(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function _t() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function vt(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function yt() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function bt() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function xt() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function St() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
// node_modules/svelte/src/constants.js
var Ct = {}, C = Symbol("uninitialized"), wt = "http://www.w3.org/1999/xhtml";
function Tt() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function Et(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function Dt() {
	console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function Ot() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
// node_modules/svelte/src/internal/client/dom/hydration.js
var w = !1;
function kt(e) {
	w = e;
}
var T;
function E(e) {
	if (e === null) throw Et(), Ct;
	return T = e;
}
function At() {
	return E(/* @__PURE__ */ $n(T));
}
function D(e) {
	if (w) {
		if (/* @__PURE__ */ $n(T) !== null) throw Et(), Ct;
		T = e;
	}
}
function jt(e = 1) {
	if (w) {
		for (var t = e, n = T; t--;) n = /* @__PURE__ */ $n(n);
		T = n;
	}
}
function Mt(e = !0) {
	for (var t = 0, n = T;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ $n(n);
		e && n.remove(), n = i;
	}
}
function Nt(e) {
	if (!e || e.nodeType !== 8) throw Et(), Ct;
	return e.data;
}
// node_modules/svelte/src/internal/client/reactivity/equality.js
function Pt(e) {
	return e === this.v;
}
function Ft(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function It(e) {
	return !Ft(e, this.v);
}
// node_modules/svelte/src/internal/client/context.js
var O = null;
function Lt(e) {
	O = e;
}
function Rt(e, t = !1, n) {
	O = {
		p: O,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: U,
		l: null
	};
}
function zt(e) {
	var t = O, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) hr(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, O = t.p, e ?? {};
}
function Bt() {
	return !0;
}
// node_modules/svelte/src/internal/client/dom/task.js
var Vt = [];
function Ht() {
	var e = Vt;
	Vt = [], ze(e);
}
function Ut(e) {
	if (Vt.length === 0 && !rn) {
		var t = Vt;
		queueMicrotask(() => {
			t === Vt && Ht();
		});
	}
	Vt.push(e);
}
function Wt() {
	for (; Vt.length > 0;) Ht();
}
function Gt(e) {
	var t = U;
	if (t === null) return B.f |= tt, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	Kt(e, t);
}
function Kt(e, t) {
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
var qt = ~(He | Ue | S);
function k(e, t) {
	e.f = e.f & qt | t;
}
function Jt(e) {
	e.f & 512 || e.deps === null ? k(e, S) : k(e, Ue);
}
// node_modules/svelte/src/internal/client/reactivity/utils.js
function Yt(e) {
	if (e !== null) for (let t of e) t.f & 2 && t.f & 65536 && (t.f ^= Qe, Yt(t.deps));
}
function Xt(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), Yt(e.deps), k(e, S);
}
// node_modules/svelte/src/internal/client/reactivity/store.js
var Zt = !1;
function Qt(e) {
	var t = Zt;
	try {
		return Zt = !1, [e(), Zt];
	} finally {
		Zt = t;
	}
}
// node_modules/svelte/src/internal/client/reactivity/batch.js
var $t = null, A = null, en = null, tn = null, nn = null, rn = !1, an = !1, on = null, sn = null, cn = 0, ln = 1, un = class e {
	id = ln++;
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
			for (var r of n.d) k(r, He), t(r);
			for (r of n.m) k(r, Ue), t(r);
		}
		this.#m.add(e);
	}
	#_() {
		if (this.#e = !0, cn++ > 1e3 && (this.#C(), fn()), !this.#g()) {
			for (let e of this.#d) this.#f.delete(e), k(e, He), this.schedule(e);
			for (let e of this.#f) k(e, Ue), this.schedule(e);
		}
		let t = this.#l;
		this.#l = [], this.apply();
		var n = on = [], r = [], i = sn = [];
		for (let e of t) try {
			this.#v(e, n, r);
		} catch (t) {
			throw _n(e), t;
		}
		if (A = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (on = null, sn = null, this.#g()) {
			this.#x(r), this.#x(n);
			for (let [e, t] of this.#p) gn(e, t);
			i.length > 0 && A.#_();
			return;
		}
		let o = this.#y();
		if (o) o.#b(this);
		else {
			this.#d.clear(), this.#f.clear();
			for (let e of this.#r) e(this);
			this.#r.clear(), en = this, mn(r), mn(n), en = null, this.#c?.resolve();
			var s = A;
			if (this.linked && this.#o === 0 && this.#C(), this.#l.length > 0) {
				s === null && (s = this, this.#S());
				let e = s;
				e.#l.push(...this.#l.filter((t) => !e.#l.includes(t)));
			}
			s !== null && s.#_();
		}
	}
	#v(e, t, n) {
		e.f ^= S;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#p.has(r)) && r.fn !== null) {
				a ? r.f ^= S : i & 4 ? t.push(r) : Ur(r) && (i & 16 && this.#f.add(r), Jr(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#f.delete(i), k(i, He), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#C(), A = this, this.#_();
	}
	#x(e) {
		for (var t = 0; t < e.length; t += 1) Xt(e[t], this.#d, this.#f);
	}
	capture(e, t, n = !1) {
		e.v !== C && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), tn?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		A = this;
	}
	deactivate() {
		A = null, tn = null;
	}
	flush() {
		try {
			an = !0, A = this, this.#_();
		} finally {
			cn = 0, nn = null, on = null, sn = null, an = !1, A = null, tn = null, In.clear();
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
		this.#h || (this.#h = !0, Ut(() => {
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
		return (this.#c ??= Be()).promise;
	}
	static ensure() {
		if (A === null) {
			let t = A = new e();
			t.#S(), !an && !rn && Ut(() => {
				t.#e || t.flush();
			});
		}
		return A;
	}
	apply() {
		tn = null;
	}
	schedule(e) {
		if (nn = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) e.b.defer_effect(e);
		else {
			for (var t = e; t.parent !== null;) {
				t = t.parent;
				var n = t.f;
				if (on !== null && t === U && (B === null || !(B.f & 2))) return;
				if (n & 96) {
					if (!(n & 1024)) return;
					t.f ^= S;
				}
			}
			this.#l.push(t);
		}
	}
	#S() {
		$t === null ? $t = this : ($t.#n = this, this.#t = $t), $t = this;
	}
	#C() {
		var e = this.#t, t = this.#n;
		e === null || (e.#n = t), t === null ? $t = e : t.#t = e, this.linked = !1;
	}
};
function dn(e) {
	var t = rn;
	rn = !0;
	try {
		var n;
		for (e && (A !== null && !A.is_fork && A.flush(), n = e());;) {
			if (Wt(), A === null) return n;
			A.flush();
		}
	} finally {
		rn = t;
	}
}
function fn() {
	try {
		_t();
	} catch (e) {
		Kt(e, nn);
	}
}
var pn = null;
function mn(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && Ur(r) && (pn = /* @__PURE__ */ new Set(), Jr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Tr(r), pn?.size > 0)) {
				In.clear();
				for (let e of pn) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) pn.has(n) && (pn.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || Jr(n);
					}
				}
				pn.clear();
			}
		}
		pn = null;
	}
}
function hn(e) {
	A.schedule(e);
}
function gn(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), k(e, S);
		for (var n = e.first; n !== null;) gn(n, t), n = n.next;
	}
}
function _n(e) {
	k(e, S);
	for (var t = e.first; t !== null;) _n(t), t = t.next;
}
// node_modules/svelte/src/reactivity/create-subscriber.js
function vn(e) {
	let t = 0, n = Rn(0), r;
	return () => {
		fr() && (J(n), yr(() => (t === 0 && (r = Qr(() => e(() => Hn(n)))), t += 1, () => {
			Ut(() => {
				--t, t === 0 && (r?.(), r = void 0, Hn(n));
			});
		})));
	};
}
// node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var yn = Je | Ye;
function bn(e, t, n, r) {
	new xn(e, t, n, r);
}
var xn = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = w ? T : null;
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
	#h = vn(() => (this.#m = Rn(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = U;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = U.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = br(() => {
			if (w) {
				let e = this.#t;
				At();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, yn), w && (this.#e = T);
	}
	#g() {
		try {
			this.#a = R(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed;
		t && (this.#s = R(() => {
			t(this.#e, () => e, () => () => {});
		}));
	}
	#v() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = R(() => e(this.#e)), Ut(() => {
			var e = this.#c = document.createDocumentFragment(), t = P();
			e.append(t), this.#a = this.#x(() => R(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, Er(this.#o, () => {
				this.#o = null;
			}), this.#b(A));
		}));
	}
	#y() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = R(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				Ar(this.#a, e);
				let t = this.#n.pending;
				this.#o = R(() => t(this.#e));
			} else this.#b(A);
		} catch (e) {
			this.error(e);
		}
	}
	#b(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		Xt(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#x(e) {
		var t = U, n = B, r = O;
		Fr(this.#i), H(this.#i), Lt(this.#i.ctx);
		try {
			return un.ensure(), e();
		} catch (e) {
			return Gt(e), null;
		} finally {
			Fr(t), H(n), Lt(r);
		}
	}
	#S(e, t) {
		this.has_pending_snippet() ? (this.#u += e, this.#u === 0 && (this.#b(t), this.#o && Er(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null))) : this.parent && this.parent.#S(e, t);
	}
	update_pending_count(e, t) {
		this.#S(e, t), this.#l += e, !this.#m || this.#d || (this.#d = !0, Ut(() => {
			this.#d = !1, this.#m && Bn(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), J(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		A?.is_fork ? (this.#a && A.skip_effect(this.#a), this.#o && A.skip_effect(this.#o), this.#s && A.skip_effect(this.#s), A.on_fork_commit(() => {
			this.#C(e);
		})) : this.#C(e);
	}
	#C(e) {
		this.#a &&= (z(this.#a), null), this.#o &&= (z(this.#o), null), this.#s &&= (z(this.#s), null), w && (E(this.#t), jt(), E(Mt()));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var r = !1, i = !1;
		let a = () => {
			r ? Ot() : (r = !0, i && St(), this.#s !== null && Er(this.#s, () => {
				this.#s = null;
			}), this.#x(() => {
				this.#y();
			}));
		}, o = (e) => {
			try {
				i = !0, t?.(e, a), i = !1;
			} catch (e) {
				Kt(e, this.#i && this.#i.parent);
			}
			n && (this.#s = this.#x(() => {
				try {
					return R(() => {
						var t = U;
						t.b = this, t.f |= 128, n(this.#e, () => e, () => a);
					});
				} catch (e) {
					return Kt(e, this.#i.parent), null;
				}
			}));
		};
		Ut(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				Kt(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(o, (e) => Kt(e, this.#i && this.#i.parent)) : o(t);
		});
	}
};
// node_modules/svelte/src/internal/client/reactivity/async.js
function Sn(e, t, n, r) {
	let i = Bt() ? En : kn;
	var a = e.filter((e) => !e.settled);
	if (n.length === 0 && a.length === 0) {
		r(t.map(i));
		return;
	}
	var o = U, s = Cn(), c = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function l(e) {
		if (!(o.f & 16384)) {
			s();
			try {
				r(e);
			} catch (e) {
				Kt(e, o);
			}
			wn();
		}
	}
	var u = Tn();
	if (n.length === 0) {
		c.then(() => l(t.map(i))).finally(u);
		return;
	}
	function d() {
		Promise.all(n.map((e) => /* @__PURE__ */ On(e))).then((e) => l([...t.map(i), ...e])).catch((e) => Kt(e, o)).finally(u);
	}
	c ? c.then(() => {
		s(), d(), wn();
	}) : d();
}
function Cn() {
	var e = U, t = B, n = O, r = A;
	return function(i = !0) {
		Fr(e), H(t), Lt(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function wn(e = !0) {
	Fr(null), H(null), Lt(null), e && A?.deactivate();
}
function Tn() {
	var e = U, t = e.b, n = A, r = t.is_rendered();
	return t.update_pending_count(1, n), n.increment(r, e), () => {
		t.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function En(e) {
	var t = 2 | He;
	return U !== null && (U.f |= Ye), {
		ctx: O,
		deps: null,
		effects: null,
		equals: Pt,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: C,
		wv: 0,
		parent: U,
		ac: null
	};
}
var Dn = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function On(e, t, n) {
	let r = U;
	r === null && ft();
	var i = void 0, a = Rn(C), o = !B, s = /* @__PURE__ */ new Set();
	return vr(() => {
		var t = U, n = Be();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== ut && n.reject(e);
			}).finally(wn);
		} catch (e) {
			n.reject(e), wn();
		}
		var c = A;
		if (o) {
			if (t.f & 32768) var l = Tn();
			if (r.b.is_rendered()) c.async_deriveds.get(t)?.reject(Dn);
			else for (let e of s.values()) e.reject(Dn);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== Dn && (c.activate(), t ? (a.f |= tt, Bn(a, t)) : (a.f & 8388608 && (a.f ^= tt), Bn(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), pr(() => {
		for (let e of s) e.reject(Dn);
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
function j(e) {
	let t = /* @__PURE__ */ En(e);
	return Ir(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function kn(e) {
	let t = /* @__PURE__ */ En(e);
	return t.equals = It, t;
}
function An(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) z(t[n]);
	}
}
function jn(e) {
	var t, n = U, r = e.parent;
	if (!Nr && r !== null && e.v !== C && r.f & 24576) return Tt(), e.v;
	Fr(r);
	try {
		e.f &= ~Qe, An(e), t = Gr(e);
	} finally {
		Fr(n);
	}
	return t;
}
function Mn(e) {
	var t = jn(e);
	!e.equals(t) && (e.wv = Hr(), (!A?.is_fork || e.deps === null) && (A === null ? e.v = t : (A.capture(e, t, !0), en?.capture(e, t, !0)), e.deps === null)) ? k(e, S) : Nr || (tn === null ? Jt(e) : (fr() || A?.is_fork) && tn.set(e, t));
}
function Nn(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac?.abort(ut), t.fn !== null && (t.teardown = Re), t.ac = null, qr(t, 0), Sr(t));
}
function Pn(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && Jr(t);
}
// node_modules/svelte/src/internal/client/reactivity/sources.js
var Fn = /* @__PURE__ */ new Set(), In = /* @__PURE__ */ new Map(), Ln = !1;
function Rn(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: Pt,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function M(e, t) {
	let n = Rn(e, t);
	return Ir(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function zn(e, t = !1, n = !0) {
	let r = Rn(e);
	return t || (r.equals = It), r;
}
function N(e, t, n = !1) {
	return B !== null && (!V || B.f & 131072) && Bt() && B.f & 4325394 && (W === null || !ke.call(W, e)) && xt(), Bn(e, n ? Wn(t) : t, sn);
}
function Bn(e, t, n = null) {
	if (!e.equals(t)) {
		In.set(e, Nr ? t : e.v);
		var r = un.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && jn(t), tn === null && Jt(t);
		}
		e.wv = Hr(), Un(e, He, n), Bt() && U !== null && U.f & 1024 && !(U.f & 96) && (q === null ? Lr([e]) : q.push(e)), !r.is_fork && Fn.size > 0 && !Ln && Vn();
	}
	return t;
}
function Vn() {
	Ln = !1;
	for (let e of Fn) {
		e.f & 1024 && k(e, Ue);
		let t;
		try {
			t = Ur(e);
		} catch {
			t = !0;
		}
		t && Jr(e);
	}
	Fn.clear();
}
function Hn(e) {
	N(e, e.v + 1);
}
function Un(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Bt(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (i || s !== U) {
			var l = (c & He) === 0;
			if (l && k(s, t), c & 131072) Fn.add(s);
			else if (c & 2) {
				var u = s;
				tn?.delete(u), c & 65536 || (c & 512 && (U === null || !(U.f & 2097152)) && (s.f |= Qe), Un(u, Ue, n));
			} else if (l) {
				var d = s;
				c & 16 && pn !== null && pn.add(d), n === null ? hn(d) : n.push(d);
			}
		}
	}
}
function Wn(e) {
	if (typeof e != "object" || !e || nt in e) return e;
	let t = Ie(e);
	if (t !== Pe && t !== Fe) return e;
	var n = /* @__PURE__ */ new Map(), r = De(e), i = /* @__PURE__ */ M(0), a = null, o = Br, s = (e) => {
		if (Br === o) return e();
		var t = B, n = Br;
		H(null), Vr(o);
		var r = e();
		return H(t), Vr(n), r;
	};
	return r && n.set("length", /* @__PURE__ */ M(e.length, a)), new Proxy(e, {
		defineProperty(e, t, r) {
			"value" in r && r.configurable !== !1 && r.enumerable !== !1 && r.writable !== !1 || yt();
			var i = n.get(t);
			return i === void 0 ? s(() => {
				var e = /* @__PURE__ */ M(r.value, a);
				return n.set(t, e), e;
			}) : N(i, r.value, !0), !0;
		},
		deleteProperty(e, t) {
			var r = n.get(t);
			if (r === void 0) {
				if (t in e) {
					let e = s(() => /* @__PURE__ */ M(C, a));
					n.set(t, e), Hn(i);
				}
			} else N(r, C), Hn(i);
			return !0;
		},
		get(t, r, i) {
			if (r === nt) return e;
			var o = n.get(r), c = r in t;
			if (o === void 0 && (!c || Me(t, r)?.writable) && (o = s(() => /* @__PURE__ */ M(Wn(c ? t[r] : C), a)), n.set(r, o)), o !== void 0) {
				var l = J(o);
				return l === C ? void 0 : l;
			}
			return Reflect.get(t, r, i);
		},
		getOwnPropertyDescriptor(e, t) {
			var r = Reflect.getOwnPropertyDescriptor(e, t);
			if (r && "value" in r) {
				var i = n.get(t);
				i && (r.value = J(i));
			} else if (r === void 0) {
				var a = n.get(t), o = a?.v;
				if (a !== void 0 && o !== C) return {
					enumerable: !0,
					configurable: !0,
					value: o,
					writable: !0
				};
			}
			return r;
		},
		has(e, t) {
			if (t === nt) return !0;
			var r = n.get(t), i = r !== void 0 && r.v !== C || Reflect.has(e, t);
			return (r !== void 0 || U !== null && (!i || Me(e, t)?.writable)) && (r === void 0 && (r = s(() => /* @__PURE__ */ M(i ? Wn(e[t]) : C, a)), n.set(t, r)), J(r) === C) ? !1 : i;
		},
		set(e, t, o, c) {
			var l = n.get(t), u = t in e;
			if (r && t === "length") for (var d = o; d < l.v; d += 1) {
				var f = n.get(d + "");
				f === void 0 ? d in e && (f = s(() => /* @__PURE__ */ M(C, a)), n.set(d + "", f)) : N(f, C);
			}
			if (l === void 0) (!u || Me(e, t)?.writable) && (l = s(() => /* @__PURE__ */ M(void 0, a)), N(l, Wn(o)), n.set(t, l));
			else {
				u = l.v !== C;
				var p = s(() => Wn(o));
				N(l, p);
			}
			var m = Reflect.getOwnPropertyDescriptor(e, t);
			if (m?.set && m.set.call(c, o), !u) {
				if (r && typeof t == "string") {
					var h = n.get("length"), g = Number(t);
					Number.isInteger(g) && g >= h.v && N(h, g + 1);
				}
				Hn(i);
			}
			return !0;
		},
		ownKeys(e) {
			J(i);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = n.get(e);
				return t === void 0 || t.v !== C;
			});
			for (var [r, a] of n) a.v !== C && !(r in e) && t.push(r);
			return t;
		},
		setPrototypeOf() {
			bt();
		}
	});
}
function Gn(e) {
	try {
		if (typeof e == "object" && e && nt in e) return e[nt];
	} catch {}
	return e;
}
function Kn(e, t) {
	return Object.is(Gn(e), Gn(t));
}
var qn, Jn, Yn, Xn;
function Zn() {
	if (qn === void 0) {
		qn = window, Jn = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		Yn = Me(t, "firstChild").get, Xn = Me(t, "nextSibling").get, Le(e) && (e[ot] = void 0, e[at] = null, e[st] = void 0, e.__e = void 0), Le(n) && (n[ct] = void 0);
	}
}
function P(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function Qn(e) {
	return Yn.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function $n(e) {
	return Xn.call(e);
}
function F(e, t) {
	if (!w) return /* @__PURE__ */ Qn(e);
	var n = /* @__PURE__ */ Qn(T);
	if (n === null) n = T.appendChild(P());
	else if (t && n.nodeType !== 3) {
		var r = P();
		return n?.before(r), E(r), r;
	}
	return t && ir(n), E(n), n;
}
function er(e, t = !1) {
	if (!w) {
		var n = /* @__PURE__ */ Qn(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ $n(n) : n;
	}
	if (t) {
		if (T?.nodeType !== 3) {
			var r = P();
			return T?.before(r), E(r), r;
		}
		ir(T);
	}
	return T;
}
function I(e, t = 1, n = !1) {
	let r = w ? T : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ $n(r);
	if (!w) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = P();
			return r === null ? i?.after(a) : r.before(a), E(a), a;
		}
		ir(r);
	}
	return E(r), r;
}
function tr(e) {
	e.textContent = "";
}
function nr() {
	return !1;
}
function rr(e, t, n) {
	let r = n ? { is: n } : void 0;
	return document.createElementNS(t ?? "http://www.w3.org/1999/xhtml", e, r);
}
function ir(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
// node_modules/svelte/src/internal/client/dom/elements/misc.js
function ar(e) {
	w && /* @__PURE__ */ Qn(e) !== null && tr(e);
}
var or = !1;
function sr() {
	or || (or = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[lt]?.();
		});
	}, { capture: !0 }));
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function cr(e) {
	var t = B, n = U;
	H(null), Fr(null);
	try {
		return e();
	} finally {
		H(t), Fr(n);
	}
}
// node_modules/svelte/src/internal/client/reactivity/effects.js
function lr(e) {
	U === null && (B === null && gt(e), ht()), Nr && mt(e);
}
function ur(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function dr(e, t) {
	var n = U;
	n !== null && n.f & 8192 && (e |= We);
	var r = {
		ctx: O,
		deps: null,
		nodes: null,
		f: e | He | 512,
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
	A?.register_created_effect(r);
	var i = r;
	if (e & 4) on === null ? un.ensure().schedule(r) : on.push(r);
	else if (t !== null) {
		try {
			Jr(r);
		} catch (e) {
			throw z(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= Je));
	}
	if (i !== null && (i.parent = n, n !== null && ur(i, n), B !== null && B.f & 2 && !(e & 64))) {
		var a = B;
		(a.effects ??= []).push(i);
	}
	return r;
}
function fr() {
	return B !== null && !V;
}
function pr(e) {
	let t = dr(8, null);
	return k(t, S), t.teardown = e, t;
}
function mr(e) {
	lr("$effect");
	var t = U.f;
	if (!B && t & 32 && !(t & 32768)) {
		var n = O;
		(n.e ??= []).push(e);
	} else return hr(e);
}
function hr(e) {
	return dr(4 | Xe, e);
}
function gr(e) {
	un.ensure();
	let t = dr(64 | Ye, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Er(t, () => {
			z(t), n(void 0);
		}) : (z(t), n(void 0));
	});
}
function _r(e) {
	return dr(4, e);
}
function vr(e) {
	return dr(et | Ye, e);
}
function yr(e, t = 0) {
	return dr(8 | t, e);
}
function L(e, t = [], n = [], r = []) {
	Sn(r, t, n, (t) => {
		dr(8, () => e(...t.map(J)));
	});
}
function br(e, t = 0) {
	return dr(16 | t, e);
}
function R(e) {
	return dr(32 | Ye, e);
}
function xr(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = Nr, n = B;
		Pr(!0), H(null);
		try {
			t.call(null);
		} finally {
			Pr(e), H(n);
		}
	}
}
function Sr(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && cr(() => {
			e.abort(ut);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : z(n, t), n = r;
	}
}
function Cr(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || z(t), t = n;
	}
}
function z(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (wr(e.nodes.start, e.nodes.end), n = !0), k(e, qe), Sr(e, t && !n), qr(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	xr(e), e.f ^= qe, e.f |= Ge;
	var i = e.parent;
	i !== null && i.first !== null && Tr(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function wr(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ $n(e);
		e.remove(), e = n;
	}
}
function Tr(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Er(e, t, n = !0) {
	var r = [];
	Dr(e, r, !0);
	var i = () => {
		n && z(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Dr(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= We;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				Dr(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function Or(e) {
	kr(e, !0);
}
function kr(e, t) {
	if (e.f & 8192) {
		e.f ^= We, e.f & 1024 || (k(e, He), un.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			kr(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function Ar(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ $n(n);
		t.append(n), n = i;
	}
}
// node_modules/svelte/src/internal/client/legacy.js
var jr = null, Mr = !1, Nr = !1;
function Pr(e) {
	Nr = e;
}
var B = null, V = !1;
function H(e) {
	B = e;
}
var U = null;
function Fr(e) {
	U = e;
}
var W = null;
function Ir(e) {
	B !== null && (W === null ? W = [e] : W.push(e));
}
var G = null, K = 0, q = null;
function Lr(e) {
	q = e;
}
var Rr = 1, zr = 0, Br = zr;
function Vr(e) {
	Br = e;
}
function Hr() {
	return ++Rr;
}
function Ur(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~Qe), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (Ur(a) && Mn(a), a.wv > e.wv) return !0;
		}
		t & 512 && tn === null && k(e, S);
	}
	return !1;
}
function Wr(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(W !== null && ke.call(W, e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? Wr(a, t, !1) : t === a && (n ? k(a, He) : a.f & 1024 && k(a, Ue), hn(a));
	}
}
function Gr(e) {
	var t = G, n = K, r = q, i = B, a = W, o = O, s = V, c = Br, l = e.f;
	G = null, K = 0, q = null, B = l & 96 ? null : e, W = null, Lt(e.ctx), V = !1, Br = ++zr, e.ac !== null && (cr(() => {
		e.ac.abort(ut);
	}), e.ac = null);
	try {
		e.f |= $e;
		var u = e.fn, d = u();
		e.f |= Ke;
		var f = e.deps, p = A?.is_fork;
		if (G !== null) {
			var m;
			if (p || qr(e, K), f !== null && K > 0) for (f.length = K + G.length, m = 0; m < G.length; m++) f[K + m] = G[m];
			else e.deps = f = G;
			if (fr() && e.f & 512) for (m = K; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && K < f.length && (qr(e, K), f.length = K);
		if (Bt() && q !== null && !V && f !== null && !(e.f & 6146)) for (m = 0; m < q.length; m++) Wr(q[m], e);
		if (i !== null && i !== e) {
			if (zr++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = zr;
			if (t !== null) for (let e of t) e.rv = zr;
			q !== null && (r === null ? r = q : r.push(...q));
		}
		return e.f & 8388608 && (e.f ^= tt), d;
	} catch (e) {
		return Gt(e);
	} finally {
		e.f ^= $e, G = t, K = n, q = r, B = i, W = a, Lt(o), V = s, Br = c;
	}
}
function Kr(e, t) {
	let n = t.reactions;
	if (n !== null) {
		var r = Oe.call(n, e);
		if (r !== -1) {
			var i = n.length - 1;
			i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
		}
	}
	if (n === null && t.f & 2 && (G === null || !ke.call(G, t))) {
		var a = t;
		a.f & 512 && (a.f ^= 512, a.f &= ~Qe), a.v !== C && Jt(a), Nn(a), qr(a, 0);
	}
}
function qr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) Kr(e, n[r]);
}
function Jr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		k(e, S);
		var n = U, r = Mr;
		U = e, Mr = !0;
		try {
			t & 16777232 ? Cr(e) : Sr(e), xr(e);
			var i = Gr(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = Rr;
		} finally {
			Mr = r, U = n;
		}
	}
}
async function Yr() {
	await Promise.resolve(), dn();
}
function J(e) {
	var t = !!(e.f & 2);
	if (jr?.add(e), B !== null && !V && !(U !== null && U.f & 16384) && (W === null || !ke.call(W, e))) {
		var n = B.deps;
		if (B.f & 2097152) e.rv < zr && (e.rv = zr, G === null && n !== null && n[K] === e ? K++ : G === null ? G = [e] : G.push(e));
		else {
			B.deps ??= [], ke.call(B.deps, e) || B.deps.push(e);
			var r = e.reactions;
			r === null ? e.reactions = [B] : ke.call(r, B) || r.push(B);
		}
	}
	if (Nr && In.has(e)) return In.get(e);
	if (t) {
		var i = e;
		if (Nr) {
			var a = i.v;
			return (!(i.f & 1024) && i.reactions !== null || Zr(i)) && (a = jn(i)), In.set(i, a), a;
		}
		var o = !(i.f & 512) && !V && B !== null && (Mr || !!(B.f & 512)), s = (i.f & Ke) === 0;
		Ur(i) && (o && (i.f |= 512), Mn(i)), o && !s && (Pn(i), Xr(i));
	}
	if (tn?.has(e)) return tn.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function Xr(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (Pn(t), Xr(t));
}
function Zr(e) {
	if (e.v === C) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (In.has(t) || t.f & 2 && Zr(t)) return !0;
	return !1;
}
function Qr(e) {
	var t = V;
	try {
		return V = !0, e();
	} finally {
		V = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var $r = ["touchstart", "touchmove"];
function ei(e) {
	return $r.includes(e);
}
// node_modules/svelte/src/internal/client/dev/css.js
var ti = Symbol("events"), ni = /* @__PURE__ */ new Set(), ri = /* @__PURE__ */ new Set();
function ii(e) {
	if (!w) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function ai(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || li.call(t, e), !e.cancelBubble) return cr(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Ut(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function oi(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = ai(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && pr(() => {
		t.removeEventListener(e, o, a);
	});
}
function Y(e, t, n) {
	(t[ti] ??= {})[e] = n;
}
function si(e) {
	for (var t = 0; t < e.length; t++) ni.add(e[t]);
	for (var n of ri) n(e);
}
var ci = null;
function li(e) {
	var t = this, n = t.ownerDocument, r = e.type, i = e.composedPath?.() || [], a = i[0] || e.target;
	ci = e;
	var o = 0, s = ci === e && e[ti];
	if (s) {
		var c = i.indexOf(s);
		if (c !== -1 && (t === document || t === window)) {
			e[ti] = t;
			return;
		}
		var l = i.indexOf(t);
		if (l === -1) return;
		c <= l && (o = c);
	}
	if (a = i[o] || e.target, a !== t) {
		je(e, "currentTarget", {
			configurable: !0,
			get() {
				return a || n;
			}
		});
		var u = B, d = U;
		H(null), Fr(null);
		try {
			for (var f, p = []; a !== null;) {
				var m = a.assignedSlot || a.parentNode || a.host || null;
				try {
					var h = a[ti]?.[r];
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
			e[ti] = t, delete e.currentTarget, H(u), Fr(d);
		}
	}
}
// node_modules/svelte/src/internal/client/dom/reconciler.js
var ui = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function di(e) {
	return ui?.createHTML(e) ?? e;
}
function fi(e) {
	var t = rr("template");
	return t.innerHTML = di(e.replaceAll("<!>", "<!---->")), t.content;
}
// node_modules/svelte/src/internal/client/dom/template.js
function pi(e, t) {
	var n = U;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function X(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (w) return pi(T, null), T;
		i === void 0 && (i = fi(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ Qn(i)));
		var t = r || Jn ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ Qn(t), s = t.lastChild;
			pi(o, s);
		} else pi(t, t);
		return t;
	};
}
function mi() {
	if (w) return pi(T, null), T;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = P();
	return e.append(t, n), pi(t, n), e;
}
function Z(e, t) {
	if (w) {
		var n = U;
		n.f & 32768 && n.nodes.end !== null || (n.nodes.end = T), At();
	} else e !== null && e.before(t);
}
function Q(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[ct] ??= e.nodeValue) && (e[ct] = n, e.nodeValue = `${n}`);
}
function hi(e, t) {
	return _i(e, t);
}
var gi = /* @__PURE__ */ new Map();
function _i(e, { target: t, anchor: n, props: r = {}, events: i, context: a, intro: o = !0, transformError: s }) {
	Zn();
	var c = void 0, l = gr(() => {
		var o = n ?? t.appendChild(P());
		bn(o, { pending: () => {} }, (t) => {
			Rt({});
			var n = O;
			if (a && (n.c = a), i && (r.$$events = i), w && pi(t, null), c = e(t, r) || {}, w && (U.nodes.end = T, T === null || T.nodeType !== 8 || T.data !== "]")) throw Et(), Ct;
			zt();
		}, s);
		var l = /* @__PURE__ */ new Set(), u = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!l.has(r)) {
					l.add(r);
					var i = ei(r);
					for (let e of [t, document]) {
						var a = gi.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), gi.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, li, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return u(Ae(ni)), ri.add(u), () => {
			for (var e of l) for (let n of [t, document]) {
				var r = gi.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, li), r.delete(e), r.size === 0 && gi.delete(n)) : r.set(e, i);
			}
			ri.delete(u), o !== n && o.parentNode?.removeChild(o);
		};
	});
	return vi.set(c, l), c;
}
var vi = /* @__PURE__ */ new WeakMap();
function yi(e, t) {
	let n = vi.get(e);
	return n ? (vi.delete(e), n(t)) : Promise.resolve();
}
// node_modules/svelte/src/internal/client/dom/blocks/branches.js
var bi = class {
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
			if (n) Or(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (z(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						Ar(r, t), t.append(P()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else z(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), Er(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (z(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = A, r = nr();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = P();
				i.append(a), this.#n.set(e, {
					effect: R(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, R(() => t(this.anchor)));
		}
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else w && (this.anchor = T), this.#a(n);
	}
};
// node_modules/svelte/src/internal/client/dom/blocks/if.js
function xi(e, t, n = !1) {
	var r;
	w && (r = T, At());
	var i = new bi(e), a = n ? Je : 0;
	function o(e, t) {
		if (w) {
			var n = Nt(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Mt();
				E(a), i.anchor = a, kt(!1), i.ensure(e, t), kt(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	br(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
// node_modules/svelte/src/internal/client/dom/blocks/key.js
var Si = Symbol("NaN");
function Ci(e, t, n) {
	w && At();
	var r = new bi(e), i = !Bt();
	br(() => {
		var e = t();
		e !== e && (e = Si), i && typeof e == "object" && e && (e = {}), r.ensure(e, n);
	});
}
// node_modules/svelte/src/internal/client/dom/blocks/each.js
function wi(e, t, n) {
	for (var r = [], i = t.length, a, o = t.length, s = 0; s < i; s++) {
		let n = t[s];
		Er(n, () => {
			if (a) {
				if (a.pending.delete(n), a.done.add(n), a.pending.size === 0) {
					var t = e.outrogroups;
					Ti(e, Ae(a.done)), t.delete(a), t.size === 0 && (e.outrogroups = null);
				}
			} else --o;
		}, !1);
	}
	if (o === 0) {
		var c = r.length === 0 && n !== null;
		if (c) {
			var l = n, u = l.parentNode;
			tr(u), u.append(l), e.items.clear();
		}
		Ti(e, t, !c);
	} else a = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(a);
}
function Ti(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= Ze, Ar(a, document.createDocumentFragment())) : z(t[i], n);
	}
}
var Ei;
function Di(e, t, n, r, i, a = null) {
	var o = e, s = /* @__PURE__ */ new Map();
	if (t & 4) {
		var c = e;
		o = w ? E(/* @__PURE__ */ Qn(c)) : c.appendChild(P());
	}
	w && At();
	var l = null, u = /* @__PURE__ */ kn(() => {
		var e = n();
		return De(e) ? e : e == null ? [] : Ae(e);
	}), d, f = /* @__PURE__ */ new Map(), p = !0;
	function m(e) {
		g.effect.f & 16384 || (g.pending.delete(e), g.fallback = l, ki(g, d, o, t, r), l !== null && (d.length === 0 ? l.f & 33554432 ? (l.f ^= Ze, ji(l, null, o)) : Or(l) : Er(l, () => {
			l = null;
		})));
	}
	function h(e) {
		g.pending.delete(e);
	}
	var g = {
		effect: br(() => {
			d = J(u);
			var e = d.length;
			let c = !1;
			w && Nt(o) === "[!" != (e === 0) && (o = Mt(), E(o), kt(!1), c = !0);
			for (var g = /* @__PURE__ */ new Set(), _ = A, v = nr(), y = 0; y < e; y += 1) {
				w && T.nodeType === 8 && T.data === "]" && (o = T, c = !0, kt(!1));
				var b = d[y], ee = r(b, y), x = p ? null : s.get(ee);
				x ? (x.v && Bn(x.v, b), x.i && Bn(x.i, y), v && _.unskip_effect(x.e)) : (x = Ai(s, p ? o : Ei ??= P(), b, ee, y, i, t, n), p || (x.e.f |= Ze), s.set(ee, x)), g.add(ee);
			}
			if (e === 0 && a && !l && (p ? l = R(() => a(o)) : (l = R(() => a(Ei ??= P())), l.f |= Ze)), e > g.size && pt("", "", ""), w && e > 0 && E(Mt()), !p) {
				if (f.set(_, g), v) {
					for (let [e, t] of s) g.has(e) || _.skip_effect(t.e);
					_.oncommit(m), _.ondiscard(h);
				} else m(_);
			}
			c && kt(!0), J(u);
		}),
		flags: t,
		items: s,
		pending: f,
		outrogroups: null,
		fallback: l
	};
	p = !1, w && (o = T);
}
function Oi(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function ki(e, t, n, r, i) {
	var a = !!(r & 8), o = t.length, s = e.items, c = Oi(e.effect.first), l, u = null, d, f = [], p = [], m, h, g, _;
	if (a) for (_ = 0; _ < o; _ += 1) m = t[_], h = i(m, _), g = s.get(h).e, g.f & 33554432 || (g.nodes?.a?.measure(), (d ??= /* @__PURE__ */ new Set()).add(g));
	for (_ = 0; _ < o; _ += 1) {
		if (m = t[_], h = i(m, _), g = s.get(h).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(g), t.done.delete(g);
		if (g.f & 8192 && (Or(g), a && (g.nodes?.a?.unfix(), (d ??= /* @__PURE__ */ new Set()).delete(g))), g.f & 33554432) {
			if (g.f ^= Ze, g === c) ji(g, null, n);
			else {
				var v = u ? u.next : c;
				g === e.effect.last && (e.effect.last = g.prev), g.prev && (g.prev.next = g.next), g.next && (g.next.prev = g.prev), Mi(e, u, g), Mi(e, g, v), ji(g, v, n), u = g, f = [], p = [], c = Oi(u.next);
				continue;
			}
		}
		if (g !== c) {
			if (l !== void 0 && l.has(g)) {
				if (f.length < p.length) {
					var y = p[0], b;
					u = y.prev;
					var ee = f[0], x = f[f.length - 1];
					for (b = 0; b < f.length; b += 1) ji(f[b], y, n);
					for (b = 0; b < p.length; b += 1) l.delete(p[b]);
					Mi(e, ee.prev, x.next), Mi(e, u, ee), Mi(e, x, y), c = y, u = x, --_, f = [], p = [];
				} else l.delete(g), ji(g, c, n), Mi(e, g.prev, g.next), Mi(e, g, u === null ? e.effect.first : u.next), Mi(e, u, g), u = g;
				continue;
			}
			for (f = [], p = []; c !== null && c !== g;) (l ??= /* @__PURE__ */ new Set()).add(c), p.push(c), c = Oi(c.next);
			if (c === null) continue;
		}
		g.f & 33554432 || f.push(g), u = g, c = Oi(g.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Ti(e, Ae(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (c !== null || l !== void 0) {
		var te = [];
		if (l !== void 0) for (g of l) g.f & 8192 || te.push(g);
		for (; c !== null;) !(c.f & 8192) && c !== e.fallback && te.push(c), c = Oi(c.next);
		var ne = te.length;
		if (ne > 0) {
			var re = r & 4 && o === 0 ? n : null;
			if (a) {
				for (_ = 0; _ < ne; _ += 1) te[_].nodes?.a?.measure();
				for (_ = 0; _ < ne; _ += 1) te[_].nodes?.a?.fix();
			}
			wi(e, te, re);
		}
	}
	a && Ut(() => {
		if (d !== void 0) for (g of d) g.nodes?.a?.apply();
	});
}
function Ai(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Rn(n) : /* @__PURE__ */ zn(n, !1, !1) : null, l = o & 2 ? Rn(i) : null;
	return {
		v: c,
		i: l,
		e: R(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function ji(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ $n(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Mi(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
// node_modules/svelte/src/internal/client/dom/css.js
function Ni(e, t) {
	_r(() => {
		var n = e.getRootNode(), r = n.host ? n : n.head ?? n.ownerDocument.head;
		if (!r.querySelector("#" + t.hash)) {
			let e = rr("style");
			e.id = t.hash, e.textContent = t.code, r.appendChild(e);
		}
	});
}
// node_modules/svelte/src/internal/shared/attributes.js
function Pi(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function Fi(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function Ii(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(Fi)), i && c.push(...Object.keys(i).map(Fi));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = Fi(e.substring(l, u).trim());
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
		return r && (n += Pi(r)), i && (n += Pi(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
// node_modules/svelte/src/internal/client/dom/elements/style.js
function Li(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function Ri(e, t, n, r) {
	var i = e[st];
	if (w || i !== t) {
		var a = Ii(t, r);
		w && a === e.getAttribute("style") || (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[st] = t;
	} else r && (Array.isArray(r) ? (Li(e, n?.[0], r[0]), Li(e, n?.[1], r[1], "important")) : Li(e, n, r));
	return r;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
function zi(e, t, n = !1) {
	if (e.multiple) {
		if (t == null) return;
		if (!De(t)) return Dt();
		for (var r of e.options) r.selected = t.includes(Vi(r));
	} else {
		for (r of e.options) if (Kn(Vi(r), t)) {
			r.selected = !0;
			return;
		}
		n && t === void 0 || (e.selectedIndex = -1);
	}
}
function Bi(e) {
	var t = new MutationObserver(() => {
		zi(e, e.__value);
	});
	t.observe(e, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["value"]
	}), pr(() => {
		t.disconnect();
	});
}
function Vi(e) {
	return "__value" in e ? e.__value : e.value;
}
// node_modules/svelte/src/internal/client/dom/elements/attributes.js
var Hi = Symbol("is custom element"), Ui = Symbol("is html"), Wi = dt ? "link" : "LINK", Gi = dt ? "progress" : "PROGRESS";
function Ki(e) {
	if (w) {
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
		e[lt] = n, Ut(n), sr();
	}
}
function qi(e, t) {
	var n = Yi(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === Gi) && (e.value = t ?? "");
}
function Ji(e, t) {
	var n = Yi(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function $(e, t, n, r) {
	var i = Yi(e);
	w && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === Wi) || i[t] !== (i[t] = n) && (t === "loading" && (e[it] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Zi(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function Yi(e) {
	return e[at] ??= {
		[Hi]: e.nodeName.includes("-"),
		[Ui]: e.namespaceURI === wt
	};
}
var Xi = /* @__PURE__ */ new Map();
function Zi(e) {
	var t = e.getAttribute("is") || e.nodeName, n = Xi.get(t);
	if (n) return n;
	Xi.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var o in r = Ne(i), r) r[o].set && o !== "innerHTML" && o !== "textContent" && o !== "innerText" && n.push(o);
		i = Ie(i);
	}
	return n;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function Qi(e, t) {
	return e === t || e?.[nt] === t;
}
function $i(e = {}, t, n, r) {
	var i = O.r, a = U;
	return _r(() => {
		var o, s;
		return yr(() => {
			o = s, s = r?.() || [], Qr(() => {
				Qi(n(...s), e) || (t(e, ...s), o && Qi(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && Qi(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
// node_modules/svelte/src/internal/client/reactivity/props.js
function ea(e, t, n, r) {
	var i = !0, a = !!(n & 8), o = !!(n & 16), s = r, c = !0, l = void 0, u = () => o && i ? (l ??= /* @__PURE__ */ En(r), J(l)) : (c && (c = !1, s = o ? Qr(r) : r), s);
	let d;
	if (a) {
		var f = nt in e || rt in e;
		d = Me(e, t)?.set ?? (f && t in e ? (n) => e[t] = n : void 0);
	}
	var p, m = !1;
	a ? [p, m] = Qt(() => e[t]) : p = e[t], p === void 0 && r !== void 0 && (p = u(), d && (i && vt(t), d(p)));
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
	var _ = !1, v = (n & 1 ? En : kn)(() => (_ = !1, h()));
	a && J(v);
	var y = U;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? J(v) : i && a ? Wn(e) : e;
			return N(v, n), _ = !0, s !== void 0 && (s = n), e;
		}
		return Nr && _ || y.f & 16384 ? v.v : J(v);
	});
}
// node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
// src/ui/canvas/sanitize.ts
var ta = /* @__PURE__ */ new Set([
	"http:",
	"https:",
	"mailto:",
	"tel:"
]), na = (e) => {
	if (typeof e != "string") return "";
	let t = e.replace(/[\u0000- \u007f-\u009f]/g, ""), n = /^([a-z][a-z0-9+.-]*):/i.exec(t)?.[1];
	return n === void 0 || ta.has(`${n.toLowerCase()}:`) ? e.trim() : "";
}, ra = (e) => typeof e == "string" ? e.replace(/[^\w\- :]/g, "").trim() : "", ia = (e) => {
	let t = na(e);
	return t !== "" && !/^(mailto|tel):/i.test(t) ? t : "";
}, aa = (e) => typeof e == "string" ? e : typeof e == "number" ? String(e) : "", oa = (e) => e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;"), sa = "allow-same-origin", ca = (e) => "<!doctype html><html><head><meta charset=\"utf-8\"><meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'none'; style-src * 'unsafe-inline'; img-src * data: blob:; font-src * data:\">" + e.map(ia).filter((e) => e !== "").map((e) => `<link rel="stylesheet" href="${oa(e)}">`).join("") + "<style>body{margin:0;padding:12px;min-height:100vh;box-sizing:border-box}[data-ceiba-id]{cursor:default}[data-ceiba-id]:hover{outline:1px dashed #94a3b8}[data-ceiba-selected]{outline:2px solid #2563eb!important;outline-offset:2px}.ceiba-placeholder{padding:12px;border:1px dashed #94a3b8;color:#475569;font:13px system-ui;background:#f8fafc}@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}</style></head><body></body></html>", la = /* @__PURE__ */ new Set(/* @__PURE__ */ "div.section.article.header.footer.nav.main.aside.h1.h2.h3.h4.h5.h6.p.span.strong.em.small.a.ul.ol.li.blockquote.figure.figcaption.code.pre.hr.br.img.label".split(".")), ua = (e) => {
	let t = e.fields.props;
	return typeof t == "object" && t && !Array.isArray(t) ? t : {};
}, da = (e, t) => {
	let n = e.createElement("div");
	return n.className = "ceiba-placeholder", n.textContent = t, n;
}, fa = (e, t, n, r) => {
	let i = ua(t), a = (t, n = "") => {
		let r = e.createElement(t), a = `${n} ${ra(i.class)}`.trim();
		return a && (r.className = a), r;
	};
	switch (t.type) {
		case "container": return a("div", i.fluid ? "container-fluid" : "container");
		case "row": return a("div", `row g-${ra(aa(i.gutter)) || "3"}`);
		case "col": return a("div", [i.xs ? `col-${Number(i.xs)}` : "col", i.md ? `col-md-${Number(i.md)}` : ""].join(" "));
		case "heading": {
			let e = a(`h${Math.min(6, Math.max(1, Number(i.level) || 2))}`);
			return e.textContent = aa(i.text), e;
		}
		case "text": {
			let e = a("p");
			return e.textContent = aa(i.content), e;
		}
		case "image":
		case "img": {
			let t = na(i.src);
			if (t === "") return da(e, n.emptyImage);
			let r = a("img", "img-fluid");
			return r.src = t, r.alt = aa(i.alt), r;
		}
		case "button": {
			let e = a("a", "btn btn-primary");
			return e.href = na(i.url) || "#", e.textContent = aa(i.label), e;
		}
		case "html": return da(e, n.html);
	}
	if (!r || !la.has(t.type)) return da(e, n.unknown(t.type));
	let o = a(t.type);
	return t.type === "a" && (o.href = na(i.href) || "#"), t.type === "img" && (o.src = na(i.src), o.alt = aa(i.alt)), i.content !== void 0 && o.append(e.createTextNode(aa(i.content))), o;
}, pa = (e, t, n, r, i) => {
	let a = (o) => {
		let s = t.nodes[o];
		if (!s) return null;
		let c = fa(e, s, i, n.has(s.type));
		if (c.dataset.ceibaId = o, o === r && (c.dataset.ceibaSelected = ""), c.className !== "ceiba-placeholder" && c.tagName !== "IMG") for (let e of s.children) {
			let t = a(e);
			t && c.append(t);
		}
		return c;
	}, o = t.rootIds.map(a).filter((e) => e !== null);
	e.body.replaceChildren(...o);
}, ma = /* @__PURE__ */ X("<div class=\"canvas svelte-1tv0kiv\"><iframe class=\"svelte-1tv0kiv\"></iframe></div>"), ha = {
	hash: "svelte-1tv0kiv",
	code: ".canvas.svelte-1tv0kiv {background:var(--cpb-canvas);padding:1rem;min-height:0;display:flex;}iframe.svelte-1tv0kiv {flex:1;width:100%;min-height:480px;border:1px solid var(--cpb-border);border-radius:8px;background:#fff;}"
};
function ga(e, t) {
	Rt(t, !0), Ni(e, ha);
	let n = ea(t, "stylesheets", 19, () => []), r = /* @__PURE__ */ j(() => t.store.t), i = /* @__PURE__ */ M(void 0), a = /* @__PURE__ */ M(!1), o = /* @__PURE__ */ j(() => ca(n()));
	function s(e) {
		e.addEventListener("click", (e) => {
			e.preventDefault();
			let n = e.target?.closest?.("[data-ceiba-id]");
			t.store.select(n?.dataset.ceibaId ?? null);
		}), e.addEventListener("submit", (e) => e.preventDefault()), e.addEventListener("auxclick", (e) => e.preventDefault());
	}
	function c() {
		let e = J(i)?.contentDocument;
		e && (s(e), N(a, !0));
	}
	mr(() => {
		let e = J(i)?.contentDocument, n = t.store.catalogue;
		J(a) && e && n && (pa(e, t.store.tree, n, t.store.selection, {
			unknown: (e) => J(r)("canvas.unknown", { type: e }),
			html: J(r)("canvas.html"),
			emptyImage: J(r)("canvas.emptyImage")
		}), t.store.selection && e.querySelector(`[data-ceiba-id="${CSS.escape(t.store.selection)}"]`)?.scrollIntoView({ block: "nearest" }));
	});
	var l = ma(), u = F(l);
	$i(u, (e) => N(i, e), () => J(i)), D(l), L((e) => {
		$(u, "title", e), $(u, "sandbox", sa), $(u, "srcdoc", J(o));
	}, [() => J(r)("canvas.title")]), oi("load", u, c), ii(u), Z(e, l), zt();
}
// src/ui/inspector/fields.ts
var _a = {
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
}, va = /* @__PURE__ */ new Set([
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
]), ya = (e) => e.charAt(0).toUpperCase() + e.slice(1).replace(/[_-]/g, " "), ba = (e) => {
	let t = [], n = /* @__PURE__ */ new Set();
	for (let [r, i] of Object.entries(e.editorControls)) {
		let e = i, a = e.options?.map(String);
		t.push({
			key: r,
			label: e.label ?? ya(r),
			control: _a[e.type ?? ""] ?? "text",
			...a ? { options: a } : {}
		}), n.add(r);
	}
	for (let [r, i] of Object.entries(e.propsSchema)) {
		if (n.has(r)) continue;
		let e = i, a = e.enum?.map(String);
		t.push({
			key: r,
			label: ya(r),
			control: a ? "select" : _a[e.type ?? ""] ?? "text",
			...a ? { options: a } : {}
		}), n.add(r);
	}
	return Object.keys(e.propsSchema).length === 0 && Object.keys(e.editorControls).length === 0 && (va.has(e.type) && t.push({
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
}, xa = (e, t) => {
	if (e.control === "checkbox") return { value: t === !0 };
	let n = String(t);
	if (e.control === "number") {
		if (n.trim() === "") return { value: null };
		let e = Number(n);
		return Number.isFinite(e) ? { value: e } : { error: "field.number" };
	}
	return e.control === "url" && n.trim() !== "" && na(n) === "" ? { error: "field.url" } : e.control === "select" && e.options && !e.options.includes(n) ? { error: "field.option" } : e.control === "select" && e.options?.every((e) => /^\d+$/.test(e)) ? { value: Number(n) } : { value: n };
}, Sa = /* @__PURE__ */ X("<label class=\"svelte-1g42mo8\"><input type=\"checkbox\" class=\"svelte-1g42mo8\"/> </label>"), Ca = /* @__PURE__ */ X("<textarea rows=\"3\" class=\"svelte-1g42mo8\"></textarea>"), wa = /* @__PURE__ */ X("<option> </option>"), Ta = /* @__PURE__ */ X("<select class=\"svelte-1g42mo8\"></select>"), Ea = /* @__PURE__ */ X("<input class=\"svelte-1g42mo8\"/>"), Da = /* @__PURE__ */ X("<label class=\"svelte-1g42mo8\"> </label> <!>", 1), Oa = /* @__PURE__ */ X("<p class=\"error svelte-1g42mo8\" role=\"alert\"> </p>"), ka = /* @__PURE__ */ X("<div class=\"field svelte-1g42mo8\"><!> <!></div>"), Aa = {
	hash: "svelte-1g42mo8",
	code: ".field.svelte-1g42mo8 {display:grid;gap:.25rem;margin-bottom:.75rem;}label.svelte-1g42mo8 {font-size:.8rem;font-weight:600;}input.svelte-1g42mo8:not([type='checkbox']), textarea.svelte-1g42mo8, select.svelte-1g42mo8 {font:inherit;font-size:.875rem;padding:.35rem .5rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}[aria-invalid='true'].svelte-1g42mo8 {border-color:var(--cpb-danger);}input.svelte-1g42mo8:focus-visible, textarea.svelte-1g42mo8:focus-visible, select.svelte-1g42mo8:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}.error.svelte-1g42mo8 {color:var(--cpb-danger);font-size:.75rem;margin:0;}"
};
function ja(e, t) {
	Rt(t, !0), Ni(e, Aa);
	let n = /* @__PURE__ */ M(null), r = /* @__PURE__ */ j(() => t.value === null || t.value === void 0 ? "" : String(t.value));
	function i(e) {
		let r = xa(t.field, e);
		"error" in r ? N(n, t.t(r.error), !0) : (N(n, null), t.onChange(r.value));
	}
	var a = ka(), o = F(a), s = (e) => {
		var n = Sa(), r = F(n);
		Ki(r);
		var a = I(r);
		D(n), L(() => {
			$(r, "id", t.id), Ji(r, t.value === !0), Q(a, ` ${t.field.label ?? ""}`);
		}), Y("change", r, (e) => i(e.currentTarget.checked)), Z(e, n);
	}, c = (e) => {
		var a = Da(), o = er(a), s = F(o, !0);
		D(o);
		var c = I(o, 2), l = (e) => {
			var a = Ca();
			ar(a), L(() => {
				$(a, "id", t.id), qi(a, J(r)), $(a, "aria-invalid", J(n) !== null), $(a, "aria-describedby", J(n) ? `${t.id}-error` : void 0);
			}), Y("input", a, (e) => i(e.currentTarget.value)), Z(e, a);
		}, u = (e) => {
			var n = Ta();
			Di(n, 20, () => t.field.options ?? [], (e) => e, (e, t) => {
				var n = wa(), r = F(n, !0);
				D(n);
				var i = {};
				L(() => {
					Q(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
				}), Z(e, n);
			}), D(n);
			var a;
			Bi(n), L(() => {
				$(n, "id", t.id), a !== (a = J(r)) && (n.value = (n.__value = J(r)) ?? "", zi(n, J(r)));
			}), Y("change", n, (e) => i(e.currentTarget.value)), Z(e, n);
		}, d = (e) => {
			var a = Ea();
			Ki(a), L(() => {
				$(a, "id", t.id), $(a, "type", t.field.control === "number" ? "number" : t.field.control === "url" ? "url" : "text"), qi(a, J(r)), $(a, "aria-invalid", J(n) !== null), $(a, "aria-describedby", J(n) ? `${t.id}-error` : void 0);
			}), Y("input", a, (e) => i(e.currentTarget.value)), Z(e, a);
		};
		xi(c, (e) => {
			t.field.control === "textarea" ? e(l) : t.field.control === "select" ? e(u, 1) : e(d, -1);
		}), L(() => {
			$(o, "for", t.id), Q(s, t.field.label);
		}), Z(e, a);
	};
	xi(o, (e) => {
		t.field.control === "checkbox" ? e(s) : e(c, -1);
	});
	var l = I(o, 2), u = (e) => {
		var r = Oa(), i = F(r, !0);
		D(r), L(() => {
			$(r, "id", `${t.id}-error`), Q(i, J(n));
		}), Z(e, r);
	};
	xi(l, (e) => {
		J(n) && e(u);
	}), D(a), Z(e, a), zt();
}
si(["change", "input"]);
// src/ui/inspector/Inspector.svelte
var Ma = /* @__PURE__ */ X("<p class=\"hint svelte-2ghsnx\"> </p>"), Na = /* @__PURE__ */ X("<p class=\"locked svelte-2ghsnx\" role=\"note\"> </p>"), Pa = /* @__PURE__ */ X("<p class=\"type svelte-2ghsnx\"> </p> <div class=\"field svelte-2ghsnx\"><label class=\"svelte-2ghsnx\"> </label> <input type=\"text\" class=\"svelte-2ghsnx\"/></div> <!> <div class=\"actions svelte-2ghsnx\"><button type=\"button\" class=\"svelte-2ghsnx\"> </button> <button type=\"button\" class=\"danger svelte-2ghsnx\"> </button></div>", 1), Fa = /* @__PURE__ */ X("<section class=\"inspector svelte-2ghsnx\"><h2 class=\"svelte-2ghsnx\"> </h2> <!></section>"), Ia = {
	hash: "svelte-2ghsnx",
	code: ".inspector.svelte-2ghsnx {padding:.5rem .75rem;overflow:auto;border-left:1px solid var(--cpb-border);}h2.svelte-2ghsnx {font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin:0 0 .5rem;color:var(--cpb-muted);}.hint.svelte-2ghsnx, .locked.svelte-2ghsnx {font-size:.85rem;color:var(--cpb-muted);}.locked.svelte-2ghsnx {color:var(--cpb-danger);}.type.svelte-2ghsnx {font-weight:700;margin:0 0 .75rem;}.field.svelte-2ghsnx {display:grid;gap:.25rem;margin-bottom:.75rem;}label.svelte-2ghsnx {font-size:.8rem;font-weight:600;}input.svelte-2ghsnx {font:inherit;font-size:.875rem;padding:.35rem .5rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}.actions.svelte-2ghsnx {display:flex;gap:.5rem;margin-top:1rem;}button.svelte-2ghsnx {font:inherit;font-size:.8rem;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.danger.svelte-2ghsnx {color:var(--cpb-danger);}button.svelte-2ghsnx:focus-visible, input.svelte-2ghsnx:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function La(e, t) {
	Rt(t, !0), Ni(e, Ia);
	let n = /* @__PURE__ */ j(() => t.store.t), r = /* @__PURE__ */ j(() => t.store.selection ? t.store.tree.nodes[t.store.selection] : void 0), i = /* @__PURE__ */ j(() => J(r) ? t.store.catalogue?.get(J(r).type) : void 0), a = /* @__PURE__ */ j(() => J(i) ? ba(J(i)) : []), o = /* @__PURE__ */ j(() => {
		let e = J(r)?.fields.props;
		return typeof e == "object" && e && !Array.isArray(e) ? e : {};
	});
	function s(e, n) {
		J(r) && (n === null || n === "" ? t.store.run({
			kind: "updateProps",
			id: J(r).id,
			set: {},
			unset: [e]
		}) : t.store.run({
			kind: "updateProps",
			id: J(r).id,
			set: { [e]: n }
		}));
	}
	function c(e) {
		if (!J(r)) return;
		let n = typeof J(r).fields.label == "string" ? J(r).fields.label : null;
		t.store.run({
			kind: "rename",
			id: J(r).id,
			name: e.trim() === "" ? null : e,
			label: n
		});
	}
	function l() {
		J(r) && t.store.run({
			kind: "remove",
			id: J(r).id
		}, ["announce.removed"]) && t.onRemoved();
	}
	var u = Fa(), d = F(u), f = F(d, !0);
	D(d);
	var p = I(d, 2), m = (e) => {
		var t = Ma(), r = F(t, !0);
		D(t), L((e) => Q(r, e), [() => J(n)("inspector.none")]), Z(e, t);
	}, h = (e) => {
		var u = mi();
		Ci(er(u), () => J(r).id, (e) => {
			var u = Pa(), d = er(u), f = F(d, !0);
			D(d);
			var p = I(d, 2), m = F(p), h = F(m, !0);
			D(m);
			var g = I(m, 2);
			Ki(g), D(p);
			var _ = I(p, 2), v = (e) => {
				var t = Na(), r = F(t, !0);
				D(t), L((e) => Q(r, e), [() => J(n)("inspector.locked")]), Z(e, t);
			}, y = (e) => {
				var r = mi();
				Di(er(r), 17, () => J(a), (e) => e.key, (e, r) => {
					{
						let i = /* @__PURE__ */ j(() => `${t.uid}-prop-${J(r).key}`);
						ja(e, {
							get field() {
								return J(r);
							},
							get t() {
								return J(n);
							},
							get id() {
								return J(i);
							},
							get value() {
								return J(o)[J(r).key];
							},
							onChange: (e) => s(J(r).key, e)
						});
					}
				}), Z(e, r);
			};
			xi(_, (e) => {
				J(i) ? e(y, -1) : e(v);
			});
			var b = I(_, 2), ee = F(b), x = F(ee, !0);
			D(ee);
			var te = I(ee, 2), ne = F(te, !0);
			D(te), D(b), L((e, n, a) => {
				Q(f, J(i)?.label ?? J(r).type), $(m, "for", `${t.uid}-name`), Q(h, e), $(g, "id", `${t.uid}-name`), qi(g, typeof J(r).fields.name == "string" ? J(r).fields.name : ""), Q(x, n), Q(ne, a);
			}, [
				() => J(n)("inspector.name"),
				() => J(n)("inspector.duplicate"),
				() => J(n)("inspector.remove")
			]), Y("input", g, (e) => c(e.currentTarget.value)), Y("click", ee, () => J(r) && t.store.run({
				kind: "duplicate",
				id: J(r).id
			})), Y("click", te, l), Z(e, u);
		}), Z(e, u);
	};
	xi(p, (e) => {
		J(r) ? e(h, -1) : e(m);
	}), D(u), L((e) => {
		$(u, "aria-labelledby", `${t.uid}-inspector-title`), $(d, "id", `${t.uid}-inspector-title`), Q(f, e);
	}, [() => J(n)("inspector.title")]), Z(e, u), zt();
}
si(["input", "click"]);
// src/ui/model/insert.ts
var Ra = (e, t) => {
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
}, za = (e, t, n) => {
	let r = e.get(t);
	return !r?.isContainer || r.disallowedChildren.includes(n) ? !1 : r.allowedChildren.includes("*") || r.allowedChildren.includes(n);
}, Ba = (e, t, n, r) => {
	let i = n === null ? void 0 : e.nodes[n];
	if (!i) return {
		parent: null,
		index: e.rootIds.length
	};
	if (za(t, i.type, r)) return {
		parent: i.id,
		index: i.children.length
	};
	let a = s(e, i.parent);
	return {
		parent: i.parent,
		index: a.indexOf(i.id) + 1
	};
}, Va = /* @__PURE__ */ X("<li><button type=\"button\" class=\"svelte-om8jxl\"> </button></li>"), Ha = /* @__PURE__ */ X("<h3 class=\"svelte-om8jxl\"> </h3> <ul class=\"svelte-om8jxl\"></ul>", 1), Ua = /* @__PURE__ */ X("<section class=\"palette svelte-om8jxl\" aria-labelledby=\"cpb-palette-title\"><h2 id=\"cpb-palette-title\" class=\"svelte-om8jxl\"> </h2> <!></section>"), Wa = {
	hash: "svelte-om8jxl",
	code: ".palette.svelte-om8jxl {padding:.5rem .75rem;overflow:auto;}h2.svelte-om8jxl {font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin:0 0 .5rem;color:var(--cpb-muted);}h3.svelte-om8jxl {font-size:.75rem;margin:.5rem 0 .25rem;color:var(--cpb-muted);text-transform:capitalize;}ul.svelte-om8jxl {list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2, 1fr);gap:.25rem;}button.svelte-om8jxl {width:100%;font:inherit;font-size:.8rem;padding:.35rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;text-align:left;}button.svelte-om8jxl:hover {border-color:var(--cpb-accent);}button.svelte-om8jxl:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Ga(e, t) {
	Rt(t, !0), Ni(e, Wa);
	let n = /* @__PURE__ */ j(() => t.store.t), r = [
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
	], i = /* @__PURE__ */ j(() => {
		let e = t.store.catalogue;
		if (!e) return [];
		let n = [...e.rules.values()].filter((e) => (e.label !== e.type || r.includes(e.type)) && e.type !== "html"), i = /* @__PURE__ */ new Map();
		for (let e of n) i.set(e.category, [...i.get(e.category) ?? [], e]);
		return [...i.entries()];
	});
	function a(e) {
		let n = t.store.catalogue;
		if (!n) return;
		let r = Ba(t.store.tree, n, t.store.selection, e.type);
		t.store.run({
			kind: "insert",
			...r,
			node: Ra(n, e.type)
		}, ["announce.inserted", { label: e.label }]) && t.store.selection && t.onInserted(t.store.selection);
	}
	var o = Ua(), s = F(o), c = F(s, !0);
	D(s), Di(I(s, 2), 17, () => J(i), ([e, t]) => e, (e, t) => {
		var r = /* @__PURE__ */ j(() => Ve(J(t), 2));
		let i = () => J(r)[0], o = () => J(r)[1];
		var s = Ha(), c = er(s), l = F(c, !0);
		D(c);
		var u = I(c, 2);
		Di(u, 21, o, (e) => e.type, (e, t) => {
			var r = Va(), i = F(r), o = F(i, !0);
			D(i), D(r), L((e) => {
				$(i, "aria-label", e), $(i, "data-type", J(t).type), Q(o, J(t).label);
			}, [() => J(n)("palette.insert", { label: J(t).label })]), Y("click", i, () => a(J(t))), Z(e, r);
		}), D(u), L((e) => Q(l, e), [() => i().replace(/_/g, " ")]), Z(e, s);
	}), D(o), L((e) => Q(c, e), [() => J(n)("palette.title")]), Z(e, o), zt();
}
si(["click"]);
// src/ui/model/flatten.ts
var Ka = (e) => {
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
}, qa = (e) => {
	if (!(e.ctrlKey || e.metaKey) || e.altKey) return null;
	let t = e.key.toLowerCase();
	return t === "z" ? e.shiftKey ? { type: "redo" } : { type: "undo" } : t === "y" ? { type: "redo" } : null;
}, Ja = (e, t, n) => {
	let r = Ka(e), i = r[0];
	if (!i) return null;
	let a = t === null ? -1 : r.findIndex((e) => e.id === t), o = r[a];
	if (!o) return n.key === "ArrowDown" || n.key === "Home" ? {
		type: "select",
		id: i.id
	} : null;
	let c = e.nodes[o.id], l = s(e, o.parent), u = n.ctrlKey || n.metaKey;
	if (n.altKey && !u) switch (n.key) {
		case "ArrowUp": return o.index > 0 ? Ya(o.id, o.parent, o.index - 1) : null;
		case "ArrowDown": return o.index < l.length - 1 ? Ya(o.id, o.parent, o.index + 2) : null;
		case "ArrowRight": {
			let t = l[o.index - 1];
			return t ? Ya(o.id, t, e.nodes[t]?.children.length ?? 0) : null;
		}
		case "ArrowLeft": {
			if (o.parent === null) return null;
			let t = e.nodes[o.parent], n = s(e, t?.parent ?? null);
			return Ya(o.id, t?.parent ?? null, n.indexOf(o.parent) + 1);
		}
		default: return null;
	}
	if (u && n.key.toLowerCase() === "d") return {
		type: "command",
		command: {
			kind: "duplicate",
			id: o.id
		}
	};
	if (u || n.altKey) return qa(n);
	switch (n.key) {
		case "ArrowDown": return Xa(r[a + 1]?.id);
		case "ArrowUp": return Xa(r[a - 1]?.id);
		case "Home": return Xa(i.id);
		case "End": return Xa(r[r.length - 1]?.id);
		case "ArrowRight": return Xa(c?.children[0]);
		case "ArrowLeft": return Xa(o.parent ?? void 0);
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
}, Ya = (e, t, n) => ({
	type: "command",
	command: {
		kind: "move",
		id: e,
		parent: t,
		index: n
	}
}), Xa = (e) => e ? {
	type: "select",
	id: e
} : null, Za = /* @__PURE__ */ X("<p class=\"empty svelte-y2i8n1\"> </p>"), Qa = /* @__PURE__ */ X("<li role=\"treeitem\" class=\"svelte-y2i8n1\"> </li>"), $a = /* @__PURE__ */ X("<ul role=\"tree\" aria-labelledby=\"cpb-structure-title\" aria-describedby=\"cpb-structure-help\" class=\"svelte-y2i8n1\"></ul>"), eo = /* @__PURE__ */ X("<section class=\"structure svelte-y2i8n1\" aria-labelledby=\"cpb-structure-title\"><h2 id=\"cpb-structure-title\" class=\"svelte-y2i8n1\"> </h2> <p class=\"help svelte-y2i8n1\" id=\"cpb-structure-help\"> </p> <!></section>"), to = {
	hash: "svelte-y2i8n1",
	code: ".structure.svelte-y2i8n1 {padding:.5rem .75rem;overflow:auto;border-top:1px solid var(--cpb-border);}h2.svelte-y2i8n1 {font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin:0;color:var(--cpb-muted);}.help.svelte-y2i8n1, .empty.svelte-y2i8n1 {font-size:.75rem;color:var(--cpb-muted);margin:.25rem 0 .5rem;}ul.svelte-y2i8n1 {list-style:none;margin:0;padding:0;outline:none;}li.svelte-y2i8n1 {font-size:.85rem;padding:.25rem .375rem;border-radius:4px;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}li[aria-selected='true'].svelte-y2i8n1 {background:var(--cpb-accent-soft);color:var(--cpb-accent-strong);font-weight:600;}li.svelte-y2i8n1:focus-visible, ul.svelte-y2i8n1:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:-2px;}"
};
function no(e, t) {
	Rt(t, !0), Ni(e, to);
	let n = /* @__PURE__ */ j(() => t.store.t), r = /* @__PURE__ */ j(() => Ka(t.store.tree)), i = /* @__PURE__ */ M(void 0), a = (e) => {
		let n = t.store.tree.nodes[e];
		if (!n) return e;
		let r = typeof n.fields.name == "string" && n.fields.name !== "" ? n.fields.name : null, i = t.store.catalogue?.get(n.type);
		return r ? `${r} (${i?.label ?? n.type})` : i?.label ?? n.type;
	};
	async function o(e) {
		await Yr(), ((e ? J(i)?.querySelector(`[data-node-id="${CSS.escape(e)}"]`) : null) ?? J(i))?.focus();
	}
	async function s(e) {
		let n = Ja(t.store.tree, t.store.selection, e);
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
	var c = { focusItem: o }, l = eo(), u = F(l), d = F(u, !0);
	D(u);
	var f = I(u, 2), p = F(f, !0);
	D(f);
	var m = I(f, 2), h = (e) => {
		var t = Za(), r = F(t, !0);
		D(t), L((e) => Q(r, e), [() => J(n)("structure.empty")]), Z(e, t);
	}, g = (e) => {
		var n = $a();
		Di(n, 21, () => J(r), (e) => e.id, (e, n) => {
			var r = Qa();
			let i;
			var o = F(r, !0);
			D(r), L((e) => {
				$(r, "aria-level", J(n).depth), $(r, "aria-setsize", J(n).siblings), $(r, "aria-posinset", J(n).index + 1), $(r, "aria-selected", t.store.selection === J(n).id), $(r, "tabindex", t.store.selection === J(n).id ? 0 : -1), $(r, "data-node-id", J(n).id), i = Ri(r, "", i, { "padding-left": `${(J(n).depth - 1) * 14 + 6}px` }), Q(o, e);
			}, [() => a(J(n).id)]), Y("click", r, () => t.store.select(J(n).id)), oi("focus", r, () => t.store.selection !== J(n).id && t.store.select(J(n).id)), Y("keydown", r, () => {}), Z(e, r);
		}), D(n), $i(n, (e) => N(i, e), () => J(i)), L(() => $(n, "tabindex", t.store.selection ? -1 : 0)), Y("keydown", n, s), Z(e, n);
	};
	return xi(m, (e) => {
		J(r).length === 0 ? e(h) : e(g, -1);
	}), D(l), L((e, t) => {
		Q(d, e), Q(p, t);
	}, [() => J(n)("structure.title"), () => J(n)("structure.help")]), Z(e, l), zt(c);
}
si(["keydown", "click"]);
// src/ui/toolbar/Toolbar.svelte
var ro = /* @__PURE__ */ X("<span class=\"revision svelte-ouhh5d\"> </span>"), io = /* @__PURE__ */ X("<div class=\"toolbar svelte-ouhh5d\" role=\"toolbar\"><button type=\"button\" aria-keyshortcuts=\"Control+Z\" class=\"svelte-ouhh5d\"> </button> <button type=\"button\" aria-keyshortcuts=\"Control+Shift+Z\" class=\"svelte-ouhh5d\"> </button> <button type=\"button\" class=\"primary svelte-ouhh5d\"> </button> <span class=\"status svelte-ouhh5d\"> </span> <!></div>"), ao = {
	hash: "svelte-ouhh5d",
	code: ".toolbar.svelte-ouhh5d {display:flex;gap:.5rem;align-items:center;padding:.5rem .75rem;border-bottom:1px solid var(--cpb-border);}button.svelte-ouhh5d {font:inherit;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.svelte-ouhh5d:disabled {opacity:.5;cursor:not-allowed;}button.primary.svelte-ouhh5d {background:var(--cpb-accent);border-color:var(--cpb-accent);color:#fff;}button.svelte-ouhh5d:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:2px;}.status.svelte-ouhh5d {margin-left:auto;font-size:.875rem;}.status[data-status='conflict'].svelte-ouhh5d, .status[data-status='offline'].svelte-ouhh5d, .status[data-status='load-error'].svelte-ouhh5d {color:var(--cpb-danger);font-weight:600;}.revision.svelte-ouhh5d {font-size:.75rem;color:var(--cpb-muted);}"
};
function oo(e, t) {
	Rt(t, !0), Ni(e, ao);
	let n = /* @__PURE__ */ j(() => t.store.t);
	var r = io(), i = F(r), a = F(i, !0);
	D(i);
	var o = I(i, 2), s = F(o, !0);
	D(o);
	var c = I(o, 2), l = F(c, !0);
	D(c);
	var u = I(c, 2), d = F(u, !0);
	D(u);
	var f = I(u, 2), p = (e) => {
		var r = ro(), i = F(r, !0);
		D(r), L((e) => Q(i, e), [() => J(n)("toolbar.revision", { revision: t.store.revision })]), Z(e, r);
	};
	xi(f, (e) => {
		t.store.revision > 0 && e(p);
	}), D(r), L((e, n, f, p, m) => {
		$(r, "aria-label", e), i.disabled = !t.store.canUndo, Q(a, n), o.disabled = !t.store.canRedo, Q(s, f), c.disabled = !t.store.dirty || t.store.status === "saving" || t.store.status === "conflict", Q(l, p), $(u, "data-status", t.store.status), Q(d, m);
	}, [
		() => J(n)("editor.label"),
		() => J(n)("toolbar.undo"),
		() => J(n)("toolbar.redo"),
		() => J(n)("toolbar.save"),
		() => J(n)(`status.${t.store.status}`)
	]), Y("click", i, () => t.store.undo()), Y("click", o, () => t.store.redo()), Y("click", c, () => t.store.save()), Z(e, r), zt();
}
si(["click"]);
// src/ui/Editor.svelte
var so = /* @__PURE__ */ X("<div class=\"editor svelte-b7je3p\" role=\"application\"><!> <div class=\"body svelte-b7je3p\"><aside class=\"left svelte-b7je3p\"><!> <!></aside> <!> <!></div> <div class=\"sr-only svelte-b7je3p\" aria-live=\"polite\"> </div> <div class=\"sr-only svelte-b7je3p\" aria-live=\"assertive\" role=\"alert\"> </div></div>"), co = {
	hash: "svelte-b7je3p",
	code: ".editor.svelte-b7je3p {--cpb-border: #d4d4d8;--cpb-surface: #fff;--cpb-canvas: #f1f5f9;--cpb-muted: #52525b;--cpb-accent: #2563eb;--cpb-accent-soft: #dbeafe;--cpb-accent-strong: #1e3a8a;--cpb-danger: #b91c1c;font:14px/1.4 system-ui, sans-serif;color:#18181b;background:var(--cpb-surface);display:flex;flex-direction:column;height:100%;min-height:600px;border:1px solid var(--cpb-border);}.body.svelte-b7je3p {flex:1;display:grid;grid-template-columns:240px 1fr 280px;min-height:0;}.left.svelte-b7je3p {display:grid;grid-template-rows:minmax(0, 45%) minmax(0, 1fr);min-height:0;border-right:1px solid var(--cpb-border);}.sr-only.svelte-b7je3p {position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;}\n  @media (max-width: 900px) {.body.svelte-b7je3p {grid-template-columns:1fr;} }"
};
function lo(e, t) {
	Rt(t, !0), Ni(e, co);
	let n = ea(t, "stylesheets", 19, () => []), r = /* @__PURE__ */ M(void 0);
	function i(e) {
		if (e.target?.closest("input, textarea, select, [contenteditable=\"true\"], [role=\"tree\"]")) return;
		let n = qa(e);
		n && (e.preventDefault(), n.type === "undo" ? t.store.undo() : n.type === "redo" && t.store.redo());
	}
	var a = so(), o = F(a);
	oo(o, { get store() {
		return t.store;
	} });
	var s = I(o, 2), c = F(s), l = F(c);
	Ga(l, {
		get store() {
			return t.store;
		},
		onInserted: (e) => J(r)?.focusItem(e)
	}), $i(no(I(l, 2), { get store() {
		return t.store;
	} }), (e) => N(r, e, !0), () => J(r)), D(c);
	var u = I(c, 2);
	ga(u, {
		get store() {
			return t.store;
		},
		get stylesheets() {
			return n();
		}
	}), La(I(u, 2), {
		get store() {
			return t.store;
		},
		get uid() {
			return t.uid;
		},
		onRemoved: () => J(r)?.focusItem(t.store.selection)
	}), D(s);
	var d = I(s, 2), f = F(d, !0);
	D(d);
	var p = I(d, 2), m = F(p, !0);
	D(p), D(a), L((e) => {
		$(a, "aria-label", e), Q(f, t.store.message), Q(m, t.store.alert);
	}, [() => t.store.t("editor.label")]), Y("keydown", a, i), Z(e, a), zt();
}
si(["keydown"]);
// src/ui/i18n/en.ts
var uo = {
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
	"structure.help": "Arrows to navigate · Alt+arrows to move · Delete to remove · Ctrl+D to duplicate",
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
	"error.VALIDATION_FAILED": "The server rejected the page.",
	"error.AUTHORIZATION_DENIED": "You do not have permission for this action.",
	"error.NETWORK": "Offline. Your changes are still here.",
	"error.SERVER": "Server error. Your changes are still here."
}, fo = {
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
	"structure.help": "Flechas para navegar · Alt+flechas para mover · Supr para borrar · Ctrl+D para duplicar",
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
	"error.VALIDATION_FAILED": "El servidor rechazó la página.",
	"error.AUTHORIZATION_DENIED": "No tienes permiso para esta acción.",
	"error.NETWORK": "Sin conexión. Tus cambios siguen aquí.",
	"error.SERVER": "Error del servidor. Tus cambios siguen aquí."
}, po = {
	es: fo,
	en: uo
}, mo = (e) => {
	let t = po[e.toLowerCase().split("-")[0] ?? "es"] ?? fo;
	return (e, n = {}) => t[e].replace(/\{(\w+)\}/g, (e, t) => String(n[t] ?? `{${t}}`));
}, ho = class {
	session;
	t;
	#e = /* @__PURE__ */ M({
		nodes: {},
		rootIds: []
	});
	get tree() {
		return J(this.#e);
	}
	set tree(e) {
		N(this.#e, e);
	}
	#t = /* @__PURE__ */ M(null);
	get catalogue() {
		return J(this.#t);
	}
	set catalogue(e) {
		N(this.#t, e);
	}
	#n = /* @__PURE__ */ M(null);
	get selection() {
		return J(this.#n);
	}
	set selection(e) {
		N(this.#n, e, !0);
	}
	#r = /* @__PURE__ */ M("loading");
	get status() {
		return J(this.#r);
	}
	set status(e) {
		N(this.#r, e, !0);
	}
	#i = /* @__PURE__ */ M(!1);
	get dirty() {
		return J(this.#i);
	}
	set dirty(e) {
		N(this.#i, e, !0);
	}
	#a = /* @__PURE__ */ M(!1);
	get canUndo() {
		return J(this.#a);
	}
	set canUndo(e) {
		N(this.#a, e, !0);
	}
	#o = /* @__PURE__ */ M(!1);
	get canRedo() {
		return J(this.#o);
	}
	set canRedo(e) {
		N(this.#o, e, !0);
	}
	#s = /* @__PURE__ */ M(0);
	get revision() {
		return J(this.#s);
	}
	set revision(e) {
		N(this.#s, e, !0);
	}
	#c = /* @__PURE__ */ M("");
	get message() {
		return J(this.#c);
	}
	set message(e) {
		N(this.#c, e, !0);
	}
	#l = /* @__PURE__ */ M("");
	get alert() {
		return J(this.#l);
	}
	set alert(e) {
		N(this.#l, e, !0);
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
			"conflict"
		]) this.stops.push(e.events.on(t, () => this.sync()));
		this.sync();
	}
	sync() {
		let e = this.session;
		this.tree = e.tree, this.catalogue = e.status === "loading" || e.status === "load-error" ? this.catalogue : e.catalogue, this.selection = e.selection, this.status = e.status, this.dirty = e.dirty, this.canUndo = e.canUndo, this.canRedo = e.canRedo, this.revision = e.baseRevision;
	}
	announce(e, t = {}) {
		this.message = this.t(e, t), this.alert = "";
	}
	fail(e) {
		let t = e instanceof l ? e.code : "SERVER";
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
}, go = [
	"ready",
	"selection-change",
	"dirty-change",
	"save-start",
	"save-success",
	"save-error",
	"conflict"
], _o = 0, vo = class extends HTMLElement {
	#e = null;
	#t = null;
	#n = null;
	#r = null;
	#i = `cpb${++_o}`;
	get config() {
		return this.#e;
	}
	set config(e) {
		this.#e = e, this.isConnected && this.#a();
	}
	get session() {
		return this.#n;
	}
	connectedCallback() {
		this.#e && !this.#t && this.#a();
	}
	disconnectedCallback() {
		this.#o();
	}
	#a() {
		this.#o();
		let e = this.#e;
		if (!e) return;
		let t = this.shadowRoot ?? this.attachShadow({ mode: "open" }), n = new ne(e);
		for (let e of go) n.events.on(e, (t) => {
			let n = e === "save-error" ? { code: t.error.code } : t;
			this.dispatchEvent(new CustomEvent(e, {
				detail: n,
				bubbles: !0,
				composed: !0
			}));
		});
		let r = new ho(n, mo(e.locale ?? "es"));
		this.#n = n, this.#r = r, this.#t = hi(lo, {
			target: t,
			props: {
				store: r,
				uid: this.#i,
				stylesheets: e.stylesheets ?? []
			}
		}), n.load().then(() => r.sync(), (e) => {
			r.sync(), r.fail(e);
		});
	}
	#o() {
		this.#t && yi(this.#t), this.#r?.destroy(), this.#n?.destroy(), this.#t = null, this.#r = null, this.#n = null, this.shadowRoot?.replaceChildren();
	}
}, yo = (e = "ceiba-page-builder") => {
	customElements.get(e) || customElements.define(e, vo);
};
// src/ui/index.ts
yo();
export { vo as CeibaPageBuilder, re as DEFAULT_HISTORY, l as EditorError, ne as EditorSession, go as PUBLIC_EVENTS, xe as REFERENCE_PROPS, ue as SCHEMA_VERSION, ae as SERVER_LIMITS, we as afterRedo, _ as afterUndo, fe as applyCommand, oe as assertDepth, ce as assertEditable, se as assertKnown, te as assertNewContent, ge as assertNodeCount, Se as assertPlacement, pe as assertSize, f as attachRaw, n as canRedo, Ce as canUndo, le as checkTree, s as childrenOf, Te as createCatalogue, ie as createCommands, be as createEditor, me as createHttpTransport, yo as defineElement, a as depthOf, v as emptyHistory, y as emptyTree, ve as errorFromResponse, x as fail, m as fromDocument, c as getNode, r as groupKeyOf, d as heightOf, g as indexInParent, ee as insertAt, Ee as isSelfOrDescendant, p as measureRaw, t as nodeCount, de as parseDocument, he as randomIds, i as record, ye as sequentialIds, b as subtreeIds, e as toDocument, h as toRaw, o as withChildren, u as withNode, _e as withoutNodes };

//# sourceMappingURL=ceiba-page-builder.js.map