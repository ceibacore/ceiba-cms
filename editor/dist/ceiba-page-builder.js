import { A as e, B as t, C as n, D as r, E as i, F as a, G as o, H as s, I as c, J as l, K as u, L as d, M as f, N as p, O as m, P as h, Q as g, R as _, S as v, T as y, U as b, V as x, W as S, X as C, Y as w, Z as ee, _ as te, a as ne, b as re, c as ie, d as ae, f as oe, g as se, h as ce, i as le, j as ue, k as de, l as fe, m as pe, n as me, o as he, p as ge, q as _e, r as ve, s as ye, t as be, u as xe, v as Se, w as Ce, x as we, y as Te, z as Ee } from "./shared/core.js";
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
var He = 1024, Ue = 2048, We = 4096, Ge = 8192, Ke = 16384, qe = 32768, Je = 1 << 25, Ye = 65536, Xe = 1 << 19, Ze = 1 << 20, Qe = 1 << 25, $e = 65536, et = 1 << 21, tt = 1 << 22, nt = 1 << 23, rt = Symbol("$state"), it = Symbol("legacy props"), at = Symbol(""), ot = Symbol("attributes"), st = Symbol("class"), ct = Symbol("style"), lt = Symbol("text"), ut = Symbol("form reset"), dt = new class extends Error {
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
var wt = {}, T = Symbol("uninitialized"), Tt = "http://www.w3.org/1999/xhtml";
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
var E = !1;
function At(e) {
	E = e;
}
var D;
function jt(e) {
	if (e === null) throw Dt(), wt;
	return D = e;
}
function Mt() {
	return jt(/* @__PURE__ */ er(D));
}
function O(e) {
	if (E) {
		if (/* @__PURE__ */ er(D) !== null) throw Dt(), wt;
		D = e;
	}
}
function Nt(e = 1) {
	if (E) {
		for (var t = e, n = D; t--;) n = /* @__PURE__ */ er(n);
		D = n;
	}
}
function Pt(e = !0) {
	for (var t = 0, n = D;;) {
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
function Ft(e) {
	if (!e || e.nodeType !== 8) throw Dt(), wt;
	return e.data;
}
// node_modules/svelte/src/internal/client/reactivity/equality.js
function It(e) {
	return e === this.v;
}
function Lt(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function Rt(e) {
	return !Lt(e, this.v);
}
// node_modules/svelte/src/internal/client/context.js
var k = null;
function zt(e) {
	k = e;
}
function A(e, t = !1, n) {
	k = {
		p: k,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: H,
		l: null
	};
}
function j(e) {
	var t = k, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) _r(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, k = t.p, e ?? {};
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
	var t = H;
	if (t === null) return V.f |= nt, e;
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
var qt = ~(Ue | We | He);
function M(e, t) {
	e.f = e.f & qt | t;
}
function Jt(e) {
	e.f & 512 || e.deps === null ? M(e, He) : M(e, We);
}
// node_modules/svelte/src/internal/client/reactivity/utils.js
function Yt(e) {
	if (e !== null) for (let t of e) t.f & 2 && t.f & 65536 && (t.f ^= $e, Yt(t.deps));
}
function Xt(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), Yt(e.deps), M(e, He);
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
var $t = null, N = null, en = null, tn = null, nn = null, rn = !1, an = !1, on = null, sn = null, cn = 0, ln = 1, un = class e {
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
			for (var r of n.d) M(r, Ue), t(r);
			for (r of n.m) M(r, We), t(r);
		}
		this.#m.add(e);
	}
	#_() {
		if (this.#e = !0, cn++ > 1e3 && (this.#C(), fn()), !this.#g()) {
			for (let e of this.#d) this.#f.delete(e), M(e, Ue), this.schedule(e);
			for (let e of this.#f) M(e, We), this.schedule(e);
		}
		let t = this.#l;
		this.#l = [], this.apply();
		var n = on = [], r = [], i = sn = [];
		for (let e of t) try {
			this.#v(e, n, r);
		} catch (t) {
			throw _n(e), t;
		}
		if (N = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (on = null, sn = null, this.#g()) {
			this.#x(r), this.#x(n);
			for (let [e, t] of this.#p) gn(e, t);
			i.length > 0 && N.#_();
			return;
		}
		let o = this.#y();
		if (o) o.#b(this);
		else {
			this.#d.clear(), this.#f.clear();
			for (let e of this.#r) e(this);
			this.#r.clear(), en = this, mn(r), mn(n), en = null, this.#c?.resolve();
			var s = N;
			if (this.linked && this.#o === 0 && this.#C(), this.#l.length > 0) {
				s === null && (s = this, this.#S());
				let e = s;
				e.#l.push(...this.#l.filter((t) => !e.#l.includes(t)));
			}
			s !== null && s.#_();
		}
	}
	#v(e, t, n) {
		e.f ^= He;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#p.has(r)) && r.fn !== null) {
				a ? r.f ^= He : i & 4 ? t.push(r) : Xr(r) && (i & 16 && this.#f.add(r), ti(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#f.delete(i), M(i, Ue), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#C(), N = this, this.#_();
	}
	#x(e) {
		for (var t = 0; t < e.length; t += 1) Xt(e[t], this.#d, this.#f);
	}
	capture(e, t, n = !1) {
		e.v !== T && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), tn?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		N = this;
	}
	deactivate() {
		N = null, tn = null;
	}
	flush() {
		try {
			an = !0, N = this, this.#_();
		} finally {
			cn = 0, nn = null, on = null, sn = null, an = !1, N = null, tn = null, In.clear();
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
		if (N === null) {
			let t = N = new e();
			t.#S(), !an && !rn && Ut(() => {
				t.#e || t.flush();
			});
		}
		return N;
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
				if (on !== null && t === H && (V === null || !(V.f & 2))) return;
				if (n & 96) {
					if (!(n & 1024)) return;
					t.f ^= He;
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
		for (e && (N !== null && !N.is_fork && N.flush(), n = e());;) {
			if (Wt(), N === null) return n;
			N.flush();
		}
	} finally {
		rn = t;
	}
}
function fn() {
	try {
		vt();
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
			if (!(r.f & 24576) && Xr(r) && (pn = /* @__PURE__ */ new Set(), ti(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Or(r), pn?.size > 0)) {
				In.clear();
				for (let e of pn) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) pn.has(n) && (pn.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || ti(n);
					}
				}
				pn.clear();
			}
		}
		pn = null;
	}
}
function hn(e) {
	N.schedule(e);
}
function gn(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), M(e, He);
		for (var n = e.first; n !== null;) gn(n, t), n = n.next;
	}
}
function _n(e) {
	M(e, He);
	for (var t = e.first; t !== null;) _n(t), t = t.next;
}
// node_modules/svelte/src/reactivity/create-subscriber.js
function vn(e) {
	let t = 0, n = Rn(0), r;
	return () => {
		mr() && (G(n), xr(() => (t === 0 && (r = ai(() => e(() => Hn(n)))), t += 1, () => {
			Ut(() => {
				--t, t === 0 && (r?.(), r = void 0, Hn(n));
			});
		})));
	};
}
// node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var yn = Ye | Xe;
function bn(e, t, n, r) {
	new xn(e, t, n, r);
}
var xn = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = E ? D : null;
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
			var t = H;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = H.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = Sr(() => {
			if (E) {
				let e = this.#t;
				Mt();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, yn), E && (this.#e = D);
	}
	#g() {
		try {
			this.#a = Cr(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed;
		t && (this.#s = Cr(() => {
			t(this.#e, () => e, () => () => {});
		}));
	}
	#v() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = Cr(() => e(this.#e)), Ut(() => {
			var e = this.#c = document.createDocumentFragment(), t = Qn();
			e.append(t), this.#a = this.#x(() => Cr(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, kr(this.#o, () => {
				this.#o = null;
			}), this.#b(N));
		}));
	}
	#y() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = Cr(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				Nr(this.#a, e);
				let t = this.#n.pending;
				this.#o = Cr(() => t(this.#e));
			} else this.#b(N);
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
		var t = H, n = V, r = k;
		Br(this.#i), zr(this.#i), zt(this.#i.ctx);
		try {
			return un.ensure(), e();
		} catch (e) {
			return Gt(e), null;
		} finally {
			Br(t), zr(n), zt(r);
		}
	}
	#S(e, t) {
		this.has_pending_snippet() ? (this.#u += e, this.#u === 0 && (this.#b(t), this.#o && kr(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null))) : this.parent && this.parent.#S(e, t);
	}
	update_pending_count(e, t) {
		this.#S(e, t), this.#l += e, !this.#m || this.#d || (this.#d = !0, Ut(() => {
			this.#d = !1, this.#m && Bn(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), G(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		N?.is_fork ? (this.#a && N.skip_effect(this.#a), this.#o && N.skip_effect(this.#o), this.#s && N.skip_effect(this.#s), N.on_fork_commit(() => {
			this.#C(e);
		})) : this.#C(e);
	}
	#C(e) {
		this.#a &&= (B(this.#a), null), this.#o &&= (B(this.#o), null), this.#s &&= (B(this.#s), null), E && (jt(this.#t), Nt(), jt(Pt()));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var r = !1, i = !1;
		let a = () => {
			r ? kt() : (r = !0, i && Ct(), this.#s !== null && kr(this.#s, () => {
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
					return Cr(() => {
						var t = H;
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
	var o = H, s = Cn(), c = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
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
	var e = H, t = V, n = k, r = N;
	return function(i = !0) {
		Br(e), zr(t), zt(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function wn(e = !0) {
	Br(null), zr(null), zt(null), e && N?.deactivate();
}
function Tn() {
	var e = H, t = e.b, n = N, r = t.is_rendered();
	return t.update_pending_count(1, n), n.increment(r, e), () => {
		t.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function En(e) {
	var t = 2 | Ue;
	return H !== null && (H.f |= Xe), {
		ctx: k,
		deps: null,
		effects: null,
		equals: It,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: T,
		wv: 0,
		parent: H,
		ac: null
	};
}
var Dn = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function On(e, t, n) {
	let r = H;
	r === null && pt();
	var i = void 0, a = Rn(T), o = !V, s = /* @__PURE__ */ new Set();
	return br(() => {
		var t = H, n = Be();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== dt && n.reject(e);
			}).finally(wn);
		} catch (e) {
			n.reject(e), wn();
		}
		var c = N;
		if (o) {
			if (t.f & 32768) var l = Tn();
			if (r.b.is_rendered()) c.async_deriveds.get(t)?.reject(Dn);
			else for (let e of s.values()) e.reject(Dn);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== Dn && (c.activate(), t ? (a.f |= nt, Bn(a, t)) : (a.f & 8388608 && (a.f ^= nt), Bn(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), hr(() => {
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
function P(e) {
	let t = /* @__PURE__ */ En(e);
	return Hr(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function kn(e) {
	let t = /* @__PURE__ */ En(e);
	return t.equals = Rt, t;
}
function An(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) B(t[n]);
	}
}
function jn(e) {
	var t, n = H, r = e.parent;
	if (!Ir && r !== null && e.v !== T && r.f & 24576) return Et(), e.v;
	Br(r);
	try {
		e.f &= ~$e, An(e), t = Qr(e);
	} finally {
		Br(n);
	}
	return t;
}
function Mn(e) {
	var t = jn(e);
	!e.equals(t) && (e.wv = Yr(), (!N?.is_fork || e.deps === null) && (N === null ? e.v = t : (N.capture(e, t, !0), en?.capture(e, t, !0)), e.deps === null)) ? M(e, He) : Ir || (tn === null ? Jt(e) : (mr() || N?.is_fork) && tn.set(e, t));
}
function Nn(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac?.abort(dt), t.fn !== null && (t.teardown = Re), t.ac = null, ei(t, 0), Tr(t));
}
function Pn(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && ti(t);
}
// node_modules/svelte/src/internal/client/reactivity/sources.js
var Fn = /* @__PURE__ */ new Set(), In = /* @__PURE__ */ new Map(), Ln = !1;
function Rn(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: It,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function F(e, t) {
	let n = Rn(e, t);
	return Hr(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function zn(e, t = !1, n = !0) {
	let r = Rn(e);
	return t || (r.equals = Rt), r;
}
function I(e, t, n = !1) {
	return V !== null && (!Rr || V.f & 131072) && Bt() && V.f & 4325394 && (Vr === null || !ke.call(Vr, e)) && St(), Bn(e, n ? Wn(t) : t, sn);
}
function Bn(e, t, n = null) {
	if (!e.equals(t)) {
		In.set(e, Ir ? t : e.v);
		var r = un.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && jn(t), tn === null && Jt(t);
		}
		e.wv = Yr(), Un(e, Ue, n), Bt() && H !== null && H.f & 1024 && !(H.f & 96) && (Ur === null ? Wr([e]) : Ur.push(e)), !r.is_fork && Fn.size > 0 && !Ln && Vn();
	}
	return t;
}
function Vn() {
	Ln = !1;
	for (let e of Fn) {
		e.f & 1024 && M(e, We);
		let t;
		try {
			t = Xr(e);
		} catch {
			t = !0;
		}
		t && ti(e);
	}
	Fn.clear();
}
function Hn(e) {
	I(e, e.v + 1);
}
function Un(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Bt(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (i || s !== H) {
			var l = (c & Ue) === 0;
			if (l && M(s, t), c & 131072) Fn.add(s);
			else if (c & 2) {
				var u = s;
				tn?.delete(u), c & 65536 || (c & 512 && (H === null || !(H.f & 2097152)) && (s.f |= $e), Un(u, We, n));
			} else if (l) {
				var d = s;
				c & 16 && pn !== null && pn.add(d), n === null ? hn(d) : n.push(d);
			}
		}
	}
}
function Wn(e) {
	if (typeof e != "object" || !e || rt in e) return e;
	let t = Ie(e);
	if (t !== Pe && t !== Fe) return e;
	var n = /* @__PURE__ */ new Map(), r = De(e), i = /* @__PURE__ */ F(0), a = null, o = qr, s = (e) => {
		if (qr === o) return e();
		var t = V, n = qr;
		zr(null), Jr(o);
		var r = e();
		return zr(t), Jr(n), r;
	};
	return r && n.set("length", /* @__PURE__ */ F(e.length, a)), new Proxy(e, {
		defineProperty(e, t, r) {
			"value" in r && r.configurable !== !1 && r.enumerable !== !1 && r.writable !== !1 || bt();
			var i = n.get(t);
			return i === void 0 ? s(() => {
				var e = /* @__PURE__ */ F(r.value, a);
				return n.set(t, e), e;
			}) : I(i, r.value, !0), !0;
		},
		deleteProperty(e, t) {
			var r = n.get(t);
			if (r === void 0) {
				if (t in e) {
					let e = s(() => /* @__PURE__ */ F(T, a));
					n.set(t, e), Hn(i);
				}
			} else I(r, T), Hn(i);
			return !0;
		},
		get(t, r, i) {
			if (r === rt) return e;
			var o = n.get(r), c = r in t;
			if (o === void 0 && (!c || Me(t, r)?.writable) && (o = s(() => /* @__PURE__ */ F(Wn(c ? t[r] : T), a)), n.set(r, o)), o !== void 0) {
				var l = G(o);
				return l === T ? void 0 : l;
			}
			return Reflect.get(t, r, i);
		},
		getOwnPropertyDescriptor(e, t) {
			var r = Reflect.getOwnPropertyDescriptor(e, t);
			if (r && "value" in r) {
				var i = n.get(t);
				i && (r.value = G(i));
			} else if (r === void 0) {
				var a = n.get(t), o = a?.v;
				if (a !== void 0 && o !== T) return {
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
			var r = n.get(t), i = r !== void 0 && r.v !== T || Reflect.has(e, t);
			return (r !== void 0 || H !== null && (!i || Me(e, t)?.writable)) && (r === void 0 && (r = s(() => /* @__PURE__ */ F(i ? Wn(e[t]) : T, a)), n.set(t, r)), G(r) === T) ? !1 : i;
		},
		set(e, t, o, c) {
			var l = n.get(t), u = t in e;
			if (r && t === "length") for (var d = o; d < l.v; d += 1) {
				var f = n.get(d + "");
				f === void 0 ? d in e && (f = s(() => /* @__PURE__ */ F(T, a)), n.set(d + "", f)) : I(f, T);
			}
			if (l === void 0) (!u || Me(e, t)?.writable) && (l = s(() => /* @__PURE__ */ F(void 0, a)), I(l, Wn(o)), n.set(t, l));
			else {
				u = l.v !== T;
				var p = s(() => Wn(o));
				I(l, p);
			}
			var m = Reflect.getOwnPropertyDescriptor(e, t);
			if (m?.set && m.set.call(c, o), !u) {
				if (r && typeof t == "string") {
					var h = n.get("length"), g = Number(t);
					Number.isInteger(g) && g >= h.v && I(h, g + 1);
				}
				Hn(i);
			}
			return !0;
		},
		ownKeys(e) {
			G(i);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = n.get(e);
				return t === void 0 || t.v !== T;
			});
			for (var [r, a] of n) a.v !== T && !(r in e) && t.push(r);
			return t;
		},
		setPrototypeOf() {
			xt();
		}
	});
}
function Gn(e) {
	try {
		if (typeof e == "object" && e && rt in e) return e[rt];
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
		Yn = Me(t, "firstChild").get, Xn = Me(t, "nextSibling").get, Le(e) && (e[st] = void 0, e[ot] = null, e[ct] = void 0, e.__e = void 0), Le(n) && (n[lt] = void 0);
	}
}
function Qn(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function $n(e) {
	return Yn.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function er(e) {
	return Xn.call(e);
}
function L(e, t) {
	if (!E) return /* @__PURE__ */ $n(e);
	var n = /* @__PURE__ */ $n(D);
	if (n === null) n = D.appendChild(Qn());
	else if (t && n.nodeType !== 3) {
		var r = Qn();
		return n?.before(r), jt(r), r;
	}
	return t && ar(n), jt(n), n;
}
function tr(e, t = !1) {
	if (!E) {
		var n = /* @__PURE__ */ $n(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ er(n) : n;
	}
	if (t) {
		if (D?.nodeType !== 3) {
			var r = Qn();
			return D?.before(r), jt(r), r;
		}
		ar(D);
	}
	return D;
}
function R(e, t = 1, n = !1) {
	let r = E ? D : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ er(r);
	if (!E) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = Qn();
			return r === null ? i?.after(a) : r.before(a), jt(a), a;
		}
		ar(r);
	}
	return jt(r), r;
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
	E && /* @__PURE__ */ $n(e) !== null && nr(e);
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
	var t = V, n = H;
	zr(null), Br(null);
	try {
		return e();
	} finally {
		zr(t), Br(n);
	}
}
function ur(e, t, n, r = n) {
	e.addEventListener(t, () => lr(n));
	let i = e[ut];
	e[ut] = i ? () => {
		i(), r(!0);
	} : () => r(!0), cr();
}
// node_modules/svelte/src/internal/client/reactivity/effects.js
function dr(e) {
	H === null && (V === null && _t(e), gt()), Ir && ht(e);
}
function fr(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function pr(e, t) {
	var n = H;
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
	N?.register_created_effect(r);
	var i = r;
	if (e & 4) on === null ? un.ensure().schedule(r) : on.push(r);
	else if (t !== null) {
		try {
			ti(r);
		} catch (e) {
			throw B(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= Ye));
	}
	if (i !== null && (i.parent = n, n !== null && fr(i, n), V !== null && V.f & 2 && !(e & 64))) {
		var a = V;
		(a.effects ??= []).push(i);
	}
	return r;
}
function mr() {
	return V !== null && !Rr;
}
function hr(e) {
	let t = pr(8, null);
	return M(t, He), t.teardown = e, t;
}
function gr(e) {
	dr("$effect");
	var t = H.f;
	if (!V && t & 32 && !(t & 32768)) {
		var n = k;
		(n.e ??= []).push(e);
	} else return _r(e);
}
function _r(e) {
	return pr(4 | Ze, e);
}
function vr(e) {
	un.ensure();
	let t = pr(64 | Xe, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? kr(t, () => {
			B(t), n(void 0);
		}) : (B(t), n(void 0));
	});
}
function yr(e) {
	return pr(4, e);
}
function br(e) {
	return pr(tt | Xe, e);
}
function xr(e, t = 0) {
	return pr(8 | t, e);
}
function z(e, t = [], n = [], r = []) {
	Sn(r, t, n, (t) => {
		pr(8, () => e(...t.map(G)));
	});
}
function Sr(e, t = 0) {
	return pr(16 | t, e);
}
function Cr(e) {
	return pr(32 | Xe, e);
}
function wr(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = Ir, n = V;
		Lr(!0), zr(null);
		try {
			t.call(null);
		} finally {
			Lr(e), zr(n);
		}
	}
}
function Tr(e, t = !1) {
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
function Er(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || B(t), t = n;
	}
}
function B(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Dr(e.nodes.start, e.nodes.end), n = !0), M(e, Je), Tr(e, t && !n), ei(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	wr(e), e.f ^= Je, e.f |= Ke;
	var i = e.parent;
	i !== null && i.first !== null && Or(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Dr(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ er(e);
		e.remove(), e = n;
	}
}
function Or(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function kr(e, t, n = !0) {
	var r = [];
	Ar(e, r, !0);
	var i = () => {
		n && B(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Ar(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= Ge;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				Ar(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function jr(e) {
	Mr(e, !0);
}
function Mr(e, t) {
	if (e.f & 8192) {
		e.f ^= Ge, e.f & 1024 || (M(e, Ue), un.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			Mr(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function Nr(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ er(n);
		t.append(n), n = i;
	}
}
// node_modules/svelte/src/internal/client/legacy.js
var Pr = null, Fr = !1, Ir = !1;
function Lr(e) {
	Ir = e;
}
var V = null, Rr = !1;
function zr(e) {
	V = e;
}
var H = null;
function Br(e) {
	H = e;
}
var Vr = null;
function Hr(e) {
	V !== null && (Vr === null ? Vr = [e] : Vr.push(e));
}
var U = null, W = 0, Ur = null;
function Wr(e) {
	Ur = e;
}
var Gr = 1, Kr = 0, qr = Kr;
function Jr(e) {
	qr = e;
}
function Yr() {
	return ++Gr;
}
function Xr(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~$e), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (Xr(a) && Mn(a), a.wv > e.wv) return !0;
		}
		t & 512 && tn === null && M(e, He);
	}
	return !1;
}
function Zr(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Vr !== null && ke.call(Vr, e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? Zr(a, t, !1) : t === a && (n ? M(a, Ue) : a.f & 1024 && M(a, We), hn(a));
	}
}
function Qr(e) {
	var t = U, n = W, r = Ur, i = V, a = Vr, o = k, s = Rr, c = qr, l = e.f;
	U = null, W = 0, Ur = null, V = l & 96 ? null : e, Vr = null, zt(e.ctx), Rr = !1, qr = ++Kr, e.ac !== null && (lr(() => {
		e.ac.abort(dt);
	}), e.ac = null);
	try {
		e.f |= et;
		var u = e.fn, d = u();
		e.f |= qe;
		var f = e.deps, p = N?.is_fork;
		if (U !== null) {
			var m;
			if (p || ei(e, W), f !== null && W > 0) for (f.length = W + U.length, m = 0; m < U.length; m++) f[W + m] = U[m];
			else e.deps = f = U;
			if (mr() && e.f & 512) for (m = W; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && W < f.length && (ei(e, W), f.length = W);
		if (Bt() && Ur !== null && !Rr && f !== null && !(e.f & 6146)) for (m = 0; m < Ur.length; m++) Zr(Ur[m], e);
		if (i !== null && i !== e) {
			if (Kr++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = Kr;
			if (t !== null) for (let e of t) e.rv = Kr;
			Ur !== null && (r === null ? r = Ur : r.push(...Ur));
		}
		return e.f & 8388608 && (e.f ^= nt), d;
	} catch (e) {
		return Gt(e);
	} finally {
		e.f ^= et, U = t, W = n, Ur = r, V = i, Vr = a, zt(o), Rr = s, qr = c;
	}
}
function $r(e, t) {
	let n = t.reactions;
	if (n !== null) {
		var r = Oe.call(n, e);
		if (r !== -1) {
			var i = n.length - 1;
			i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
		}
	}
	if (n === null && t.f & 2 && (U === null || !ke.call(U, t))) {
		var a = t;
		a.f & 512 && (a.f ^= 512, a.f &= ~$e), a.v !== T && Jt(a), Nn(a), ei(a, 0);
	}
}
function ei(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) $r(e, n[r]);
}
function ti(e) {
	var t = e.f;
	if (!(t & 16384)) {
		M(e, He);
		var n = H, r = Fr;
		H = e, Fr = !0;
		try {
			t & 16777232 ? Er(e) : Tr(e), wr(e);
			var i = Qr(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = Gr;
		} finally {
			Fr = r, H = n;
		}
	}
}
async function ni() {
	await Promise.resolve(), dn();
}
function G(e) {
	var t = !!(e.f & 2);
	if (Pr?.add(e), V !== null && !Rr && !(H !== null && H.f & 16384) && (Vr === null || !ke.call(Vr, e))) {
		var n = V.deps;
		if (V.f & 2097152) e.rv < Kr && (e.rv = Kr, U === null && n !== null && n[W] === e ? W++ : U === null ? U = [e] : U.push(e));
		else {
			V.deps ??= [], ke.call(V.deps, e) || V.deps.push(e);
			var r = e.reactions;
			r === null ? e.reactions = [V] : ke.call(r, V) || r.push(V);
		}
	}
	if (Ir && In.has(e)) return In.get(e);
	if (t) {
		var i = e;
		if (Ir) {
			var a = i.v;
			return (!(i.f & 1024) && i.reactions !== null || ii(i)) && (a = jn(i)), In.set(i, a), a;
		}
		var o = !(i.f & 512) && !Rr && V !== null && (Fr || !!(V.f & 512)), s = (i.f & qe) === 0;
		Xr(i) && (o && (i.f |= 512), Mn(i)), o && !s && (Pn(i), ri(i));
	}
	if (tn?.has(e)) return tn.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function ri(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (Pn(t), ri(t));
}
function ii(e) {
	if (e.v === T) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (In.has(t) || t.f & 2 && ii(t)) return !0;
	return !1;
}
function ai(e) {
	var t = Rr;
	try {
		return Rr = !0, e();
	} finally {
		Rr = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var oi = ["touchstart", "touchmove"];
function si(e) {
	return oi.includes(e);
}
// node_modules/svelte/src/internal/client/dev/css.js
var ci = Symbol("events"), li = /* @__PURE__ */ new Set(), ui = /* @__PURE__ */ new Set();
function di(e) {
	if (!E) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function fi(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || gi.call(t, e), !e.cancelBubble) return lr(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Ut(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function pi(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = fi(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && hr(() => {
		t.removeEventListener(e, o, a);
	});
}
function K(e, t, n) {
	(t[ci] ??= {})[e] = n;
}
function mi(e) {
	for (var t = 0; t < e.length; t++) li.add(e[t]);
	for (var n of ui) n(e);
}
var hi = null;
function gi(e) {
	var t = this, n = t.ownerDocument, r = e.type, i = e.composedPath?.() || [], a = i[0] || e.target;
	hi = e;
	var o = 0, s = hi === e && e[ci];
	if (s) {
		var c = i.indexOf(s);
		if (c !== -1 && (t === document || t === window)) {
			e[ci] = t;
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
		var u = V, d = H;
		zr(null), Br(null);
		try {
			for (var f, p = []; a !== null;) {
				var m = a.assignedSlot || a.parentNode || a.host || null;
				try {
					var h = a[ci]?.[r];
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
			e[ci] = t, delete e.currentTarget, zr(u), Br(d);
		}
	}
}
// node_modules/svelte/src/internal/client/dom/reconciler.js
var _i = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function vi(e) {
	return _i?.createHTML(e) ?? e;
}
function yi(e) {
	var t = ir("template");
	return t.innerHTML = vi(e.replaceAll("<!>", "<!---->")), t.content;
}
// node_modules/svelte/src/internal/client/dom/template.js
function bi(e, t) {
	var n = H;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function q(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (E) return bi(D, null), D;
		i === void 0 && (i = yi(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ $n(i)));
		var t = r || Jn ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ $n(t), s = t.lastChild;
			bi(o, s);
		} else bi(t, t);
		return t;
	};
}
function xi() {
	if (E) return bi(D, null), D;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = Qn();
	return e.append(t, n), bi(t, n), e;
}
function J(e, t) {
	if (E) {
		var n = H;
		n.f & 32768 && n.nodes.end !== null || (n.nodes.end = D), Mt();
	} else e !== null && e.before(t);
}
function Y(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[lt] ??= e.nodeValue) && (e[lt] = n, e.nodeValue = `${n}`);
}
function Si(e, t) {
	return wi(e, t);
}
var Ci = /* @__PURE__ */ new Map();
function wi(e, { target: t, anchor: n, props: r = {}, events: i, context: a, intro: o = !0, transformError: s }) {
	Zn();
	var c = void 0, l = vr(() => {
		var o = n ?? t.appendChild(Qn());
		bn(o, { pending: () => {} }, (t) => {
			A({});
			var n = k;
			if (a && (n.c = a), i && (r.$$events = i), E && bi(t, null), c = e(t, r) || {}, E && (H.nodes.end = D, D === null || D.nodeType !== 8 || D.data !== "]")) throw Dt(), wt;
			j();
		}, s);
		var l = /* @__PURE__ */ new Set(), u = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!l.has(r)) {
					l.add(r);
					var i = si(r);
					for (let e of [t, document]) {
						var a = Ci.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Ci.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, gi, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return u(Ae(li)), ui.add(u), () => {
			for (var e of l) for (let n of [t, document]) {
				var r = Ci.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, gi), r.delete(e), r.size === 0 && Ci.delete(n)) : r.set(e, i);
			}
			ui.delete(u), o !== n && o.parentNode?.removeChild(o);
		};
	});
	return Ti.set(c, l), c;
}
var Ti = /* @__PURE__ */ new WeakMap();
function Ei(e, t) {
	let n = Ti.get(e);
	return n ? (Ti.delete(e), n(t)) : Promise.resolve();
}
// node_modules/svelte/src/internal/client/dom/blocks/branches.js
var Di = class {
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
			if (n) jr(n), this.#r.delete(t);
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
						Nr(r, t), t.append(Qn()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else B(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), kr(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (B(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = N, r = rr();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = Qn();
				i.append(a), this.#n.set(e, {
					effect: Cr(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, Cr(() => t(this.anchor)));
		}
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else E && (this.anchor = D), this.#a(n);
	}
};
// node_modules/svelte/src/internal/client/dom/blocks/if.js
function X(e, t, n = !1) {
	var r;
	E && (r = D, Mt());
	var i = new Di(e), a = n ? Ye : 0;
	function o(e, t) {
		if (E) {
			var n = Ft(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Pt();
				jt(a), i.anchor = a, At(!1), i.ensure(e, t), At(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	Sr(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
// node_modules/svelte/src/internal/client/dom/blocks/key.js
var Oi = Symbol("NaN");
function ki(e, t, n) {
	E && Mt();
	var r = new Di(e), i = !Bt();
	Sr(() => {
		var e = t();
		e !== e && (e = Oi), i && typeof e == "object" && e && (e = {}), r.ensure(e, n);
	});
}
// node_modules/svelte/src/internal/client/dom/blocks/each.js
function Ai(e, t, n) {
	for (var r = [], i = t.length, a, o = t.length, s = 0; s < i; s++) {
		let n = t[s];
		kr(n, () => {
			if (a) {
				if (a.pending.delete(n), a.done.add(n), a.pending.size === 0) {
					var t = e.outrogroups;
					ji(e, Ae(a.done)), t.delete(a), t.size === 0 && (e.outrogroups = null);
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
		ji(e, t, !c);
	} else a = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(a);
}
function ji(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= Qe, Nr(a, document.createDocumentFragment())) : B(t[i], n);
	}
}
var Mi;
function Ni(e, t, n, r, i, a = null) {
	var o = e, s = /* @__PURE__ */ new Map();
	if (t & 4) {
		var c = e;
		o = E ? jt(/* @__PURE__ */ $n(c)) : c.appendChild(Qn());
	}
	E && Mt();
	var l = null, u = /* @__PURE__ */ kn(() => {
		var e = n();
		return De(e) ? e : e == null ? [] : Ae(e);
	}), d, f = /* @__PURE__ */ new Map(), p = !0;
	function m(e) {
		g.effect.f & 16384 || (g.pending.delete(e), g.fallback = l, Fi(g, d, o, t, r), l !== null && (d.length === 0 ? l.f & 33554432 ? (l.f ^= Qe, Li(l, null, o)) : jr(l) : kr(l, () => {
			l = null;
		})));
	}
	function h(e) {
		g.pending.delete(e);
	}
	var g = {
		effect: Sr(() => {
			d = G(u);
			var e = d.length;
			let c = !1;
			E && Ft(o) === "[!" != (e === 0) && (o = Pt(), jt(o), At(!1), c = !0);
			for (var g = /* @__PURE__ */ new Set(), _ = N, v = rr(), y = 0; y < e; y += 1) {
				E && D.nodeType === 8 && D.data === "]" && (o = D, c = !0, At(!1));
				var b = d[y], x = r(b, y), S = p ? null : s.get(x);
				S ? (S.v && Bn(S.v, b), S.i && Bn(S.i, y), v && _.unskip_effect(S.e)) : (S = Ii(s, p ? o : Mi ??= Qn(), b, x, y, i, t, n), p || (S.e.f |= Qe), s.set(x, S)), g.add(x);
			}
			if (e === 0 && a && !l && (p ? l = Cr(() => a(o)) : (l = Cr(() => a(Mi ??= Qn())), l.f |= Qe)), e > g.size && mt("", "", ""), E && e > 0 && jt(Pt()), !p) {
				if (f.set(_, g), v) {
					for (let [e, t] of s) g.has(e) || _.skip_effect(t.e);
					_.oncommit(m), _.ondiscard(h);
				} else m(_);
			}
			c && At(!0), G(u);
		}),
		flags: t,
		items: s,
		pending: f,
		outrogroups: null,
		fallback: l
	};
	p = !1, E && (o = D);
}
function Pi(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Fi(e, t, n, r, i) {
	var a = !!(r & 8), o = t.length, s = e.items, c = Pi(e.effect.first), l, u = null, d, f = [], p = [], m, h, g, _;
	if (a) for (_ = 0; _ < o; _ += 1) m = t[_], h = i(m, _), g = s.get(h).e, g.f & 33554432 || (g.nodes?.a?.measure(), (d ??= /* @__PURE__ */ new Set()).add(g));
	for (_ = 0; _ < o; _ += 1) {
		if (m = t[_], h = i(m, _), g = s.get(h).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(g), t.done.delete(g);
		if (g.f & 8192 && (jr(g), a && (g.nodes?.a?.unfix(), (d ??= /* @__PURE__ */ new Set()).delete(g))), g.f & 33554432) {
			if (g.f ^= Qe, g === c) Li(g, null, n);
			else {
				var v = u ? u.next : c;
				g === e.effect.last && (e.effect.last = g.prev), g.prev && (g.prev.next = g.next), g.next && (g.next.prev = g.prev), Ri(e, u, g), Ri(e, g, v), Li(g, v, n), u = g, f = [], p = [], c = Pi(u.next);
				continue;
			}
		}
		if (g !== c) {
			if (l !== void 0 && l.has(g)) {
				if (f.length < p.length) {
					var y = p[0], b;
					u = y.prev;
					var x = f[0], S = f[f.length - 1];
					for (b = 0; b < f.length; b += 1) Li(f[b], y, n);
					for (b = 0; b < p.length; b += 1) l.delete(p[b]);
					Ri(e, x.prev, S.next), Ri(e, u, x), Ri(e, S, y), c = y, u = S, --_, f = [], p = [];
				} else l.delete(g), Li(g, c, n), Ri(e, g.prev, g.next), Ri(e, g, u === null ? e.effect.first : u.next), Ri(e, u, g), u = g;
				continue;
			}
			for (f = [], p = []; c !== null && c !== g;) (l ??= /* @__PURE__ */ new Set()).add(c), p.push(c), c = Pi(c.next);
			if (c === null) continue;
		}
		g.f & 33554432 || f.push(g), u = g, c = Pi(g.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (ji(e, Ae(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (c !== null || l !== void 0) {
		var C = [];
		if (l !== void 0) for (g of l) g.f & 8192 || C.push(g);
		for (; c !== null;) !(c.f & 8192) && c !== e.fallback && C.push(c), c = Pi(c.next);
		var w = C.length;
		if (w > 0) {
			var ee = r & 4 && o === 0 ? n : null;
			if (a) {
				for (_ = 0; _ < w; _ += 1) C[_].nodes?.a?.measure();
				for (_ = 0; _ < w; _ += 1) C[_].nodes?.a?.fix();
			}
			Ai(e, C, ee);
		}
	}
	a && Ut(() => {
		if (d !== void 0) for (g of d) g.nodes?.a?.apply();
	});
}
function Ii(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Rn(n) : /* @__PURE__ */ zn(n, !1, !1) : null, l = o & 2 ? Rn(i) : null;
	return {
		v: c,
		i: l,
		e: Cr(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Li(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ er(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Ri(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
// node_modules/svelte/src/internal/client/dom/blocks/snippet.js
function zi(e, t, ...n) {
	var r = new Di(e);
	Sr(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, Ye);
}
// node_modules/svelte/src/internal/client/dom/css.js
function Z(e, t) {
	yr(() => {
		var n = e.getRootNode(), r = n.host ? n : n.head ?? n.ownerDocument.head;
		if (!r.querySelector("#" + t.hash)) {
			let e = ir("style");
			e.id = t.hash, e.textContent = t.code, r.appendChild(e);
		}
	});
}
// node_modules/svelte/src/internal/shared/attributes.js
function Bi(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function Vi(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function Hi(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(Vi)), i && c.push(...Object.keys(i).map(Vi));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = Vi(e.substring(l, u).trim());
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
		return r && (n += Bi(r)), i && (n += Bi(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
// node_modules/svelte/src/internal/client/dom/elements/style.js
function Ui(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function Wi(e, t, n, r) {
	var i = e[ct];
	if (E || i !== t) {
		var a = Hi(t, r);
		E && a === e.getAttribute("style") || (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[ct] = t;
	} else r && (Array.isArray(r) ? (Ui(e, n?.[0], r[0]), Ui(e, n?.[1], r[1], "important")) : Ui(e, n, r));
	return r;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
function Gi(e, t, n = !1) {
	if (e.multiple) {
		if (t == null) return;
		if (!De(t)) return Ot();
		for (var r of e.options) r.selected = t.includes(Ji(r));
	} else {
		for (r of e.options) if (Kn(Ji(r), t)) {
			r.selected = !0;
			return;
		}
		n && t === void 0 || (e.selectedIndex = -1);
	}
}
function Ki(e) {
	var t = new MutationObserver(() => {
		Gi(e, e.__value);
	});
	t.observe(e, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["value"]
	}), hr(() => {
		t.disconnect();
	});
}
function qi(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet(), i = !0;
	ur(e, "change", (t) => {
		var i = t ? "[selected]" : ":checked", a;
		if (e.multiple) a = [].map.call(e.querySelectorAll(i), Ji);
		else {
			var o = e.querySelector(i) ?? e.querySelector("option:not([disabled])");
			a = o && Ji(o);
		}
		n(a), e.__value = a, N !== null && r.add(N);
	}), yr(() => {
		var a = t();
		if (e === document.activeElement) {
			var o = N;
			if (r.has(o)) return;
		}
		if (Gi(e, a, i), i && a === void 0) {
			var s = e.querySelector(":checked");
			s !== null && (a = Ji(s), n(a));
		}
		e.__value = a, i = !1;
	}), Ki(e);
}
function Ji(e) {
	return "__value" in e ? e.__value : e.value;
}
// node_modules/svelte/src/internal/client/dom/elements/attributes.js
var Yi = Symbol("is custom element"), Xi = Symbol("is html"), Zi = ft ? "link" : "LINK", Qi = ft ? "progress" : "PROGRESS";
function Q(e) {
	if (E) {
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
		e[ut] = n, Ut(n), cr();
	}
}
function $i(e, t) {
	var n = ta(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === Qi) && (e.value = t ?? "");
}
function ea(e, t) {
	var n = ta(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function $(e, t, n, r) {
	var i = ta(e);
	E && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === Zi) || i[t] !== (i[t] = n) && (t === "loading" && (e[at] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && ra(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function ta(e) {
	return e[ot] ??= {
		[Yi]: e.nodeName.includes("-"),
		[Xi]: e.namespaceURI === Tt
	};
}
var na = /* @__PURE__ */ new Map();
function ra(e) {
	var t = e.getAttribute("is") || e.nodeName, n = na.get(t);
	if (n) return n;
	na.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var o in r = Ne(i), r) r[o].set && o !== "innerHTML" && o !== "textContent" && o !== "innerText" && n.push(o);
		i = Ie(i);
	}
	return n;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function ia(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	ur(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = aa(e) ? oa(a) : a, n(a), N !== null && r.add(N), await ni(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (E && e.defaultValue !== e.value || ai(t) == null && e.value) && (n(aa(e) ? oa(e.value) : e.value), N !== null && r.add(N)), xr(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = N;
			if (r.has(i)) return;
		}
		aa(e) && n === oa(e.value) || (e.type !== "date" || n || e.value) && n !== e.value && (e.value = n ?? "");
	});
}
function aa(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function oa(e) {
	return e === "" ? null : +e;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function sa(e, t) {
	return e === t || e?.[rt] === t;
}
function ca(e = {}, t, n, r) {
	var i = k.r, a = H;
	return yr(() => {
		var o, s;
		return xr(() => {
			o = s, s = r?.() || [], ai(() => {
				sa(n(...s), e) || (t(e, ...s), o && sa(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && sa(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
// node_modules/svelte/src/internal/client/reactivity/props.js
function la(e, t, n, r) {
	var i = !0, a = !!(n & 8), o = !!(n & 16), s = r, c = !0, l = void 0, u = () => o && i ? (l ??= /* @__PURE__ */ En(r), G(l)) : (c && (c = !1, s = o ? ai(r) : r), s);
	let d;
	if (a) {
		var f = rt in e || it in e;
		d = Me(e, t)?.set ?? (f && t in e ? (n) => e[t] = n : void 0);
	}
	var p, m = !1;
	a ? [p, m] = Qt(() => e[t]) : p = e[t], p === void 0 && r !== void 0 && (p = u(), d && (i && yt(t), d(p)));
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
	a && G(v);
	var y = H;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? G(v) : i && a ? Wn(e) : e;
			return I(v, n), _ = !0, s !== void 0 && (s = n), e;
		}
		return Ir && _ || y.f & 16384 ? v.v : G(v);
	});
}
// node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
// src/ui/canvas/sanitize.ts
var ua = /* @__PURE__ */ new Set([
	"http:",
	"https:",
	"mailto:",
	"tel:"
]), da = (e) => {
	if (typeof e != "string") return "";
	let t = e.replace(/[\u0000- \u007f-\u009f]/g, ""), n = /^([a-z][a-z0-9+.-]*):/i.exec(t)?.[1];
	return n === void 0 || ua.has(`${n.toLowerCase()}:`) ? e.trim() : "";
}, fa = (e) => typeof e == "string" ? e.replace(/[^\w\- :]/g, "").trim() : "", pa = (e) => {
	let t = da(e);
	return t !== "" && !/^(mailto|tel):/i.test(t) ? t : "";
}, ma = (e) => typeof e == "string" ? e : typeof e == "number" ? String(e) : "", ha = (e) => e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;"), ga = "allow-same-origin", _a = (e) => "<!doctype html><html><head><meta charset=\"utf-8\"><meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'none'; style-src * 'unsafe-inline'; img-src * data: blob:; font-src * data:\">" + e.map(pa).filter((e) => e !== "").map((e) => `<link rel="stylesheet" href="${ha(e)}">`).join("") + "<style>body{margin:0;padding:12px;min-height:100vh;box-sizing:border-box}[data-ceiba-id]{cursor:default}[data-ceiba-id]:hover{outline:1px dashed #94a3b8}[data-ceiba-selected]{outline:2px solid #2563eb!important;outline-offset:2px}[data-ceiba-multiline]{white-space:pre-line}[contenteditable]{outline:2px solid #16a34a!important;outline-offset:2px;cursor:text}.ceiba-dragging,.ceiba-dragging *{user-select:none!important;cursor:grabbing!important}.ceiba-placeholder{padding:12px;border:1px dashed #94a3b8;color:#475569;font:13px system-ui;background:#f8fafc}@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}</style></head><body></body></html>", va = /* @__PURE__ */ new Set([
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
]), ya = /* @__PURE__ */ new Set(["text"]), ba = (e, t) => !t.has(e.type) || e.children.length > 0 ? null : e.type === "heading" ? "text" : e.type === "text" ? "content" : e.type === "button" ? "label" : va.has(e.type) || ya.has(e.type) ? "content" : null, xa = (e) => ya.has(e), Sa = (e, t) => {
	let n = e.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, "");
	return t ? n.replace(/\n$/, "") : n.replace(/\n+/g, " ");
}, Ca = (e) => {
	let t = e.ownerDocument, n = t.createRange();
	n.selectNodeContents(e), n.collapse(!1);
	let r = t.getSelection();
	r?.removeAllRanges(), r?.addRange(n);
}, wa = /* @__PURE__ */ new Set(/* @__PURE__ */ "div.section.article.header.footer.nav.main.aside.h1.h2.h3.h4.h5.h6.p.span.strong.em.small.a.ul.ol.li.blockquote.figure.figcaption.code.pre.hr.br.img.label".split(".")), Ta = (e) => {
	let t = e.fields.props;
	return typeof t == "object" && t && !Array.isArray(t) ? t : {};
}, Ea = (e, t) => {
	let n = e.createElement("div");
	return n.className = "ceiba-placeholder", n.textContent = t, n;
}, Da = (e, t, n, r) => {
	let i = Ta(t), a = (t, n = "") => {
		let r = e.createElement(t), a = `${n} ${fa(i.class)}`.trim();
		return a && (r.className = a), r;
	};
	switch (t.type) {
		case "container": return a("div", i.fluid ? "container-fluid" : "container");
		case "row": {
			let e = fa(ma(i.gutter));
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
			return e.textContent = ma(i.text), e;
		}
		case "text": {
			let e = a("p");
			return e.textContent = ma(i.content), e;
		}
		case "image":
		case "img": {
			let t = da(i.src);
			if (t === "") return Ea(e, n.emptyImage);
			let r = a("img", "img-fluid");
			return r.src = t, r.alt = ma(i.alt), r;
		}
		case "button": {
			let e = a("a", "btn btn-primary");
			return e.href = da(i.url) || "#", e.textContent = ma(i.label), e;
		}
		case "html": return Ea(e, n.html);
	}
	if (!r || !wa.has(t.type)) return Ea(e, n.unknown(t.type));
	let o = a(t.type);
	return t.type === "a" && (o.href = da(i.href) || "#"), t.type === "img" && (o.src = da(i.src), o.alt = ma(i.alt)), i.content !== void 0 && o.append(e.createTextNode(ma(i.content))), o;
}, Oa = (e, t, n, r, i) => {
	let a = (o) => {
		let s = t.nodes[o];
		if (!s) return null;
		let c = Da(e, s, i, n.has(s.type));
		if (c.dataset.ceibaId = o, o === r && (c.dataset.ceibaSelected = ""), xa(s.type) && (c.dataset.ceibaMultiline = ""), c.className !== "ceiba-placeholder" && c.tagName !== "IMG") for (let e of s.children) {
			let t = a(e);
			t && c.append(t);
		}
		return c;
	}, o = t.rootIds.map(a).filter((e) => e !== null);
	e.body.replaceChildren(...o);
}, ka = /* @__PURE__ */ q("<div class=\"canvas svelte-1tv0kiv\"><p class=\"help svelte-1tv0kiv\"> </p> <iframe class=\"svelte-1tv0kiv\"></iframe></div>"), Aa = {
	hash: "svelte-1tv0kiv",
	code: ".canvas.svelte-1tv0kiv {background:var(--cpb-canvas);padding:.5rem 1rem 1rem;min-height:0;display:flex;flex-direction:column;}.help.svelte-1tv0kiv {margin:0 0 .5rem;font-size:.75rem;color:var(--cpb-muted);}iframe.svelte-1tv0kiv {flex:1;width:100%;min-height:480px;border:1px solid var(--cpb-border);border-radius:8px;background:#fff;}"
};
function ja(e, t) {
	A(t, !0), Z(e, Aa);
	let n = la(t, "stylesheets", 19, () => []), r = /* @__PURE__ */ P(() => t.store.t), i = /* @__PURE__ */ F(void 0), a = /* @__PURE__ */ F(!1), o = /* @__PURE__ */ F(null), s = /* @__PURE__ */ P(() => _a(n())), c = (e) => e?.closest?.("[data-ceiba-id]");
	function l(e) {
		let n = G(i)?.contentDocument, a = t.store.tree.nodes[e], s = a && t.store.catalogue ? ba(a, t.store.catalogue) : null, c = n?.querySelector(`[data-ceiba-id="${CSS.escape(e)}"]`);
		if (!n || !a || !s || !c) return !1;
		t.store.select(e), I(o, e, !0);
		let l = xa(a.type);
		c.setAttribute("contenteditable", "plaintext-only"), c.setAttribute("aria-label", G(r)("announce.editing"));
		let u = () => {
			t.store.run({
				kind: "updateProps",
				id: e,
				set: { [s]: Sa(c.innerText, l) }
			});
		}, d = (n) => {
			c.removeEventListener("input", u), c.removeEventListener("keydown", f), c.removeEventListener("blur", p), c.removeAttribute("contenteditable"), I(o, null), t.store.announce("announce.editDone"), t.onEditEnd(e, n);
		}, f = (e) => {
			(e.key === "Escape" || e.key === "Enter" && (!l || e.ctrlKey || e.metaKey)) && (e.preventDefault(), d(!0));
		}, p = () => d(!1);
		return c.addEventListener("input", u), c.addEventListener("keydown", f), c.addEventListener("blur", p), c.focus(), Ca(c), t.store.announce("announce.editing"), !0;
	}
	function u(e) {
		e.addEventListener("click", (e) => {
			e.preventDefault(), G(o) === null && t.store.select(c(e.target)?.dataset.ceibaId ?? null);
		}), e.addEventListener("dblclick", (e) => {
			let t = c(e.target)?.dataset.ceibaId;
			t && G(o) === null && l(t);
		}), e.addEventListener("pointerdown", (e) => {
			let n = c(e.target);
			n?.dataset.ceibaId && G(o) === null && t.drag.pressNode(e, n, n.dataset.ceibaId);
		}), e.addEventListener("submit", (e) => e.preventDefault()), e.addEventListener("auxclick", (e) => e.preventDefault()), e.addEventListener("dragstart", (e) => e.preventDefault());
	}
	function d() {
		let e = G(i)?.contentDocument;
		e && G(i) && (u(e), t.drag.attach(G(i)), I(a, !0));
	}
	gr(() => {
		let e = G(i)?.contentDocument, n = t.store.catalogue, s = t.store.tree, c = t.store.selection;
		G(a) && e && n && G(o) === null && (Oa(e, s, n, c, {
			unknown: (e) => G(r)("canvas.unknown", { type: e }),
			html: G(r)("canvas.html"),
			emptyImage: G(r)("canvas.emptyImage")
		}), c && e.querySelector(`[data-ceiba-id="${CSS.escape(c)}"]`)?.scrollIntoView({ block: "nearest" }));
	});
	var f = { startEditing: l }, p = ka(), m = L(p), h = L(m, !0);
	O(m);
	var g = R(m, 2);
	return ca(g, (e) => I(i, e), () => G(i)), O(p), z((e, n) => {
		$(m, "id", `${t.uid}-canvas-help`), Y(h, e), $(g, "title", n), $(g, "sandbox", ga), $(g, "srcdoc", G(s)), $(g, "aria-describedby", `${t.uid}-canvas-help`);
	}, [() => G(r)("canvas.help"), () => G(r)("canvas.title")]), pi("load", g, d), di(g), J(e, p), j(f);
}
// src/ui/model/insert.ts
var Ma = (e, t) => {
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
}, Na = (e, t, n) => {
	let r = e.get(t);
	return !r?.isContainer || r.disallowedChildren.includes(n) ? !1 : r.allowedChildren.includes("*") || r.allowedChildren.includes(n);
}, Pa = (e, t, n, r) => {
	let i = n === null ? void 0 : e.nodes[n];
	if (!i) return {
		parent: null,
		index: e.rootIds.length
	};
	if (Na(t, i.type, r)) return {
		parent: i.id,
		index: i.children.length
	};
	let a = o(e, i.parent);
	return {
		parent: i.parent,
		index: a.indexOf(i.id) + 1
	};
}, Fa = (e) => {
	let { id: t, _id: n, children: r, ...i } = e;
	return {
		...i,
		children: (r ?? []).map(Fa)
	};
}, Ia = class {
	store;
	#e = /* @__PURE__ */ F([]);
	get templates() {
		return G(this.#e);
	}
	set templates(e) {
		I(this.#e, e);
	}
	constructor(e) {
		this.store = e;
	}
	allowed(e, t) {
		let n = this.store.session.capabilities;
		return typeof t == "function" && (n === null || n.features[e] === !0);
	}
	get canTemplates() {
		return this.allowed("templates", this.store.session.transport.listTemplates);
	}
	get canImport() {
		return this.allowed("htmlImport", this.store.session.transport.importHtml);
	}
	async loadTemplates() {
		let e = this.store.session.transport;
		if (this.canTemplates && e.listTemplates) try {
			this.templates = await e.listTemplates();
		} catch (e) {
			this.store.fail(e);
		}
	}
	insertNodes(e, t) {
		let n = this.store.catalogue, r = e[0];
		if (!n || !r) return !1;
		let i = Pa(this.store.tree, n, this.store.selection, r.type), a = this.store.session.commandContext;
		if (!a) return !1;
		try {
			e.reduce((e, t, n) => ae(e, {
				kind: "insert",
				parent: i.parent,
				index: i.index + n,
				node: t
			}, a).state, this.store.tree);
		} catch (e) {
			return this.store.fail(e), !1;
		}
		let o = !0;
		return e.forEach((e, t) => {
			o &&= this.store.run({
				kind: "insert",
				parent: i.parent,
				index: i.index + t,
				node: e
			});
		}), o && this.store.announce("announce.inserted", { label: t }), o;
	}
	async saveTemplate(e, t, n) {
		let r = this.store.session.transport.saveTemplate, i = this.store.session.toDocument().root.flatMap(function t(n) {
			return n.id === e ? [n] : (n.children ?? []).flatMap(t);
		})[0];
		if (!r || !i) return !1;
		try {
			let e = await r.call(this.store.session.transport, {
				name: t,
				category: n,
				nodes: [Fa(i)]
			});
			return this.templates = [...this.templates, e], this.store.announce("announce.templateSaved", { name: t }), !0;
		} catch (e) {
			return this.store.fail(e), !1;
		}
	}
	async importHtml(e) {
		let t = this.store.session.transport;
		if (!t.importHtml) return null;
		try {
			let n = await t.importHtml(e);
			return n.nodes.length === 0 ? (this.store.announce("announce.importEmpty"), 0) : this.insertNodes(n.nodes, this.store.t("import.label")) ? n.warnings.length : null;
		} catch (e) {
			return this.store.fail(e), null;
		}
	}
}, La = /* @__PURE__ */ q("<dialog class=\"svelte-o2xhl0\"><form method=\"dialog\" class=\"svelte-o2xhl0\"><h2 class=\"svelte-o2xhl0\"> </h2> <!> <div class=\"actions svelte-o2xhl0\"><button type=\"button\" class=\"svelte-o2xhl0\"> </button> <button type=\"submit\" class=\"primary svelte-o2xhl0\"> </button></div></form></dialog>"), Ra = {
	hash: "svelte-o2xhl0",
	code: "dialog.svelte-o2xhl0 {border:1px solid var(--cpb-border);border-radius:10px;padding:1rem;width:min(560px, 90vw);color:inherit;font:inherit;}dialog.svelte-o2xhl0::backdrop {background:rgb(15 23 42 / .45);}h2.svelte-o2xhl0 {font-size:1rem;margin:0 0 .75rem;}.actions.svelte-o2xhl0 {display:flex;justify-content:flex-end;gap:.5rem;margin-top:1rem;}button.svelte-o2xhl0 {font:inherit;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.primary.svelte-o2xhl0 {background:var(--cpb-accent);border-color:var(--cpb-accent);color:#fff;}button.svelte-o2xhl0:disabled {opacity:.5;}.svelte-o2xhl0:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function za(e, t) {
	A(t, !0), Z(e, Ra);
	let n = la(t, "open", 15, !1), r = la(t, "busy", 3, !1), i = /* @__PURE__ */ F(void 0), a = null;
	gr(() => {
		G(i) && (n() && !G(i).open ? (a = G(i).getRootNode().activeElement, G(i).showModal()) : !n() && G(i).open && G(i).close());
	});
	var o = La(), s = L(o), c = L(s), l = L(c, !0);
	O(c);
	var u = R(c, 2);
	zi(u, () => t.children);
	var d = R(u, 2), f = L(d), p = L(f, !0);
	O(f);
	var m = R(f, 2), h = L(m, !0);
	O(m), O(d), O(s), O(o), ca(o, (e) => I(i, e), () => G(i)), z(() => {
		$(o, "aria-labelledby", `${t.uid}-title`), $(c, "id", `${t.uid}-title`), Y(l, t.title), Y(p, t.cancelLabel), m.disabled = r(), Y(h, t.submitLabel);
	}), pi("close", o, () => {
		n(!1), a?.focus?.();
	}), pi("submit", s, (e) => {
		e.preventDefault(), t.onSubmit();
	}), K("click", f, () => {
		n(!1);
	}), J(e, o), j();
}
mi(["click"]);
// src/ui/content/ImportDialog.svelte
var Ba = /* @__PURE__ */ q("<p class=\"help svelte-c6zkzf\"> </p> <label class=\"svelte-c6zkzf\"> </label> <textarea rows=\"10\" spellcheck=\"false\" class=\"svelte-c6zkzf\"></textarea>", 1), Va = {
	hash: "svelte-c6zkzf",
	code: ".help.svelte-c6zkzf {font-size:.8rem;margin:0 0 .5rem;}label.svelte-c6zkzf {display:block;font-size:.8rem;font-weight:600;margin-bottom:.25rem;}textarea.svelte-c6zkzf {width:100%;box-sizing:border-box;font:12px/1.4 ui-monospace, monospace;padding:.5rem;border:1px solid var(--cpb-border);border-radius:6px;}"
};
function Ha(e, t) {
	A(t, !0), Z(e, Va);
	let n = la(t, "open", 15, !1), r = /* @__PURE__ */ P(() => t.store.t), i = /* @__PURE__ */ F(""), a = /* @__PURE__ */ F(!1);
	async function o() {
		if (G(i).trim() === "") return;
		I(a, !0);
		let e = await t.content.importHtml(G(i));
		I(a, !1), e !== null && (e > 0 && t.store.announce("import.warnings", { count: e }), I(i, ""), n(!1));
	}
	{
		let s = /* @__PURE__ */ P(() => G(r)("import.title")), c = /* @__PURE__ */ P(() => `${t.uid}-import`), l = /* @__PURE__ */ P(() => G(r)("import.submit")), u = /* @__PURE__ */ P(() => G(r)("dialog.cancel"));
		za(e, {
			get title() {
				return G(s);
			},
			get uid() {
				return G(c);
			},
			get submitLabel() {
				return G(l);
			},
			get cancelLabel() {
				return G(u);
			},
			get busy() {
				return G(a);
			},
			onSubmit: o,
			get open() {
				return n();
			},
			set open(e) {
				n(e);
			},
			children: (e, n) => {
				var a = Ba(), o = tr(a), s = L(o, !0);
				O(o);
				var c = R(o, 2), l = L(c, !0);
				O(c);
				var u = R(c, 2);
				or(u), z((e, n) => {
					Y(s, e), $(c, "for", `${t.uid}-import-html`), Y(l, n), $(u, "id", `${t.uid}-import-html`);
				}, [() => G(r)("import.help"), () => G(r)("import.field")]), ia(u, () => G(i), (e) => I(i, e)), J(e, a);
			},
			$$slots: { default: !0 }
		});
	}
	j();
}
// src/ui/content/TemplateDialog.svelte
var Ua = /* @__PURE__ */ q("<label class=\"svelte-181fmze\"> </label> <input required=\"\" maxlength=\"200\" class=\"svelte-181fmze\"/> <label class=\"svelte-181fmze\"> </label> <input maxlength=\"100\" class=\"svelte-181fmze\"/>", 1), Wa = {
	hash: "svelte-181fmze",
	code: "label.svelte-181fmze {display:block;font-size:.8rem;font-weight:600;margin:.5rem 0 .25rem;}input.svelte-181fmze {width:100%;box-sizing:border-box;font:inherit;padding:.35rem .5rem;border:1px solid var(--cpb-border);border-radius:6px;}"
};
function Ga(e, t) {
	A(t, !0), Z(e, Wa);
	let n = la(t, "open", 15, !1), r = /* @__PURE__ */ P(() => t.store.t), i = /* @__PURE__ */ F(""), a = /* @__PURE__ */ F("general"), o = /* @__PURE__ */ F(!1);
	async function s() {
		if (!t.nodeId || G(i).trim() === "") return;
		I(o, !0);
		let e = await t.content.saveTemplate(t.nodeId, G(i).trim(), G(a).trim() || "general");
		I(o, !1), e && (I(i, ""), n(!1));
	}
	{
		let c = /* @__PURE__ */ P(() => G(r)("template.title")), l = /* @__PURE__ */ P(() => `${t.uid}-template`), u = /* @__PURE__ */ P(() => G(r)("template.submit")), d = /* @__PURE__ */ P(() => G(r)("dialog.cancel"));
		za(e, {
			get title() {
				return G(c);
			},
			get uid() {
				return G(l);
			},
			get submitLabel() {
				return G(u);
			},
			get cancelLabel() {
				return G(d);
			},
			get busy() {
				return G(o);
			},
			onSubmit: s,
			get open() {
				return n();
			},
			set open(e) {
				n(e);
			},
			children: (e, n) => {
				var o = Ua(), s = tr(o), c = L(s, !0);
				O(s);
				var l = R(s, 2);
				Q(l);
				var u = R(l, 2), d = L(u, !0);
				O(u);
				var f = R(u, 2);
				Q(f), z((e, n) => {
					$(s, "for", `${t.uid}-template-name`), Y(c, e), $(l, "id", `${t.uid}-template-name`), $(u, "for", `${t.uid}-template-category`), Y(d, n), $(f, "id", `${t.uid}-template-category`);
				}, [() => G(r)("template.name"), () => G(r)("template.category")]), ia(l, () => G(i), (e) => I(i, e)), ia(f, () => G(a), (e) => I(a, e)), J(e, o);
			},
			$$slots: { default: !0 }
		});
	}
	j();
}
// src/ui/drag/indicator.ts
var Ka = "ceiba-drop-indicator", qa = (e, t, n, r) => {
	let i = e.getElementById(Ka);
	i || (i = e.createElement("div"), i.id = Ka, i.setAttribute("aria-hidden", "true"), e.body.append(i));
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
}, Ja = (e) => {
	e?.getElementById(Ka)?.remove();
}, Ya = (e, t, n, r) => {
	let i = t <= 0 ? .5 : (n - e) / t;
	return r ? i < .25 ? "before" : i > .75 ? "after" : "inside" : i < .5 ? "before" : "after";
}, Xa = (e, t, n, r) => t.kind === "move" ? {
	kind: "move",
	id: t.id,
	parent: n,
	index: r
} : {
	kind: "insert",
	parent: n,
	index: r,
	node: t.node
}, Za = (e, t, n, r, i) => {
	let a;
	if (r === null || !e.nodes[r]) a = Xa(e, n, null, e.rootIds.length);
	else if (i === "inside") a = Xa(e, n, r, e.nodes[r]?.children.length ?? 0);
	else {
		let t = e.nodes[r]?.parent ?? null;
		a = Xa(e, n, t, o(e, t).indexOf(r) + +(i === "after"));
	}
	let s = r !== null && e.nodes[r] ? r : null;
	if (n.kind === "move" && a.kind === "move" && Qa(e, n.id, a.parent, a.index)) return {
		command: null,
		anchor: s,
		zone: i,
		refused: null
	};
	try {
		return ae(e, a, t), {
			command: a,
			anchor: s,
			zone: i,
			refused: null
		};
	} catch (e) {
		return {
			command: null,
			anchor: s,
			zone: i,
			refused: e instanceof ee ? e.code : "SERVER"
		};
	}
}, Qa = (e, t, n, r) => {
	if (e.nodes[t]?.parent !== n) return !1;
	let i = o(e, n).indexOf(t);
	return r === i || r === i + 1;
}, $a = 5, eo = class {
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
			!this.active && Math.hypot(e.clientX - r.x, e.clientY - r.y) < $a || (this.active || this.begin({
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
			if (!this.active && Math.hypot(e.clientX - i.x, e.clientY - i.y) < $a) return;
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
		let i = n.elementFromPoint(e, t)?.closest("[data-ceiba-id]") ?? null, a = i?.dataset.ceibaId ?? null, o = a ? this.store.tree.nodes[a] : void 0, s = i?.getBoundingClientRect(), c = o ? this.store.catalogue?.get(o.type)?.isContainer ?? !1 : !1, l = s ? Ya(s.top, s.height, t, c) : "inside";
		this.active.target = Za(this.store.tree, r, this.active.dragged, a, l), qa(n, i, l, this.active.target.refused !== null);
	}
	clearTarget() {
		this.active && (this.active.target = null), Ja(this.doc);
	}
	finish(e) {
		let t = this.active;
		if (this.active = null, Ja(this.doc), this.frame && (this.frame.style.pointerEvents = ""), this.doc?.body.classList.remove("ceiba-dragging"), document.removeEventListener("keydown", this.onKey, !0), this.doc?.removeEventListener("keydown", this.onKey, !0), !t) return;
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
}, to = (e) => typeof e == "object" && e && !Array.isArray(e) ? e : {}, no = (e) => {
	let t = to(e), n = typeof t.source == "string" ? t.source : "", r = to(t.sort);
	return {
		sourceType: n.startsWith("module:") ? "module" : n.startsWith("api:") ? "api" : "none",
		module: n.startsWith("module:") ? n.slice(7) : "",
		api: n.startsWith("api:") ? n.slice(4) : "",
		variable: typeof t.variable == "string" ? t.variable : "item",
		key: typeof t.key == "string" ? t.key : "id",
		limit: t.limit === void 0 || t.limit === null ? "" : String(t.limit),
		offset: t.offset === void 0 || t.offset === null ? "" : String(t.offset),
		sortColumn: typeof r.column == "string" ? r.column : "",
		sortDirection: r.direction === "ASC" ? "ASC" : "DESC",
		filters: Object.entries(to(t.filters)).map(([e, t]) => `${e}=${String(t)}`).join("\n")
	};
}, ro = (e) => {
	if (e.trim() === "") return;
	let t = Number(e);
	return Number.isInteger(t) && t >= 0 ? t : null;
}, io = (e) => {
	if (e.sourceType === "none") return { loop: null };
	let t = (e.sourceType === "module" ? e.module : e.api).trim();
	if (t === "" || e.sourceType === "api" && !/^https?:\/\//i.test(t)) return { error: "loop.source" };
	if (!/^[A-Za-z_][A-Za-z0-9_]{0,40}$/.test(e.variable.trim())) return { error: "loop.variable" };
	let n = {
		source: `${e.sourceType}:${t}`,
		variable: e.variable.trim(),
		key: e.key.trim() || "id"
	};
	for (let [t, r] of [["limit", e.limit], ["offset", e.offset]]) {
		let e = ro(r);
		if (e === null) return { error: "loop.number" };
		e !== void 0 && (n[t] = e);
	}
	let r = {};
	for (let t of e.filters.split("\n")) {
		let e = t.indexOf("=");
		e > 0 && (r[t.slice(0, e).trim()] = t.slice(e + 1).trim());
	}
	return Object.keys(r).length > 0 && (n.filters = r), e.sortColumn.trim() !== "" && (n.sort = {
		column: e.sortColumn.trim(),
		direction: e.sortDirection
	}), { loop: n };
}, ao = /* @__PURE__ */ q("<div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input class=\"svelte-1v8f4it\"/></div>"), oo = /* @__PURE__ */ q("<div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input type=\"url\" class=\"svelte-1v8f4it\"/></div>"), so = /* @__PURE__ */ q("<div class=\"grid svelte-1v8f4it\"><div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input class=\"svelte-1v8f4it\"/></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input class=\"svelte-1v8f4it\"/></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input inputmode=\"numeric\" class=\"svelte-1v8f4it\"/></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input inputmode=\"numeric\" class=\"svelte-1v8f4it\"/></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input class=\"svelte-1v8f4it\"/></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label> <select class=\"svelte-1v8f4it\"><option class=\"svelte-1v8f4it\">ASC</option><option class=\"svelte-1v8f4it\">DESC</option></select></div></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><textarea rows=\"3\" class=\"svelte-1v8f4it\"></textarea></div>", 1), co = /* @__PURE__ */ q("<p class=\"error svelte-1v8f4it\" role=\"alert\"> </p>"), lo = /* @__PURE__ */ q("<details class=\"advanced svelte-1v8f4it\"><summary class=\"svelte-1v8f4it\"> </summary> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label> <select class=\"svelte-1v8f4it\"><option class=\"svelte-1v8f4it\"> </option><option class=\"svelte-1v8f4it\"> </option><option class=\"svelte-1v8f4it\"> </option></select></div> <!> <!> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input class=\"svelte-1v8f4it\"/></div> <!> <button type=\"button\" class=\"svelte-1v8f4it\"> </button></details>"), uo = {
	hash: "svelte-1v8f4it",
	code: ".advanced.svelte-1v8f4it {margin-top:1rem;border-top:1px solid var(--cpb-border);padding-top:.5rem;}summary.svelte-1v8f4it {cursor:pointer;font-size:.8rem;font-weight:700;}.grid.svelte-1v8f4it {display:grid;grid-template-columns:1fr 1fr;gap:0 .5rem;}.field.svelte-1v8f4it {display:grid;gap:.25rem;margin:.5rem 0;}label.svelte-1v8f4it {font-size:.75rem;font-weight:600;}input.svelte-1v8f4it, select.svelte-1v8f4it, textarea.svelte-1v8f4it {font:inherit;font-size:.8rem;padding:.3rem .45rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}.error.svelte-1v8f4it {color:var(--cpb-danger);font-size:.75rem;margin:0;}button.svelte-1v8f4it {font:inherit;font-size:.8rem;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}.svelte-1v8f4it:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function fo(e, t) {
	A(t, !0), Z(e, uo);
	let n = /* @__PURE__ */ P(() => t.store.t), r = Wn(ai(() => no(t.node.fields.loop))), i = /* @__PURE__ */ F(Wn(ai(() => typeof t.node.fields.condition == "string" ? t.node.fields.condition : ""))), a = /* @__PURE__ */ F(null), o = (e) => `${t.uid}-adv-${e}`;
	function s() {
		let e = io(r);
		if ("error" in e) {
			I(a, G(n)(e.error), !0);
			return;
		}
		I(a, null);
		let o = {}, s = [];
		e.loop ? o.loop = e.loop : s.push("loop"), G(i).trim() === "" ? s.push("condition") : o.condition = G(i).trim(), t.store.run({
			kind: "updateFields",
			id: t.node.id,
			set: o,
			unset: s
		});
	}
	var c = lo(), l = L(c), u = L(l, !0);
	O(l);
	var d = R(l, 2), f = L(d), p = L(f, !0);
	O(f);
	var m = R(f, 2), h = L(m), g = L(h, !0);
	O(h), h.value = h.__value = "none";
	var _ = R(h), v = L(_, !0);
	O(_), _.value = _.__value = "module";
	var y = R(_), b = L(y, !0);
	O(y), y.value = y.__value = "api", O(m), O(d);
	var x = R(d, 2), S = (e) => {
		var t = ao(), i = L(t), a = L(i, !0);
		O(i);
		var s = R(i);
		Q(s), O(t), z((e, t, n) => {
			$(i, "for", e), Y(a, t), $(s, "id", n);
		}, [
			() => o("module"),
			() => G(n)("advanced.moduleSlug"),
			() => o("module")
		]), ia(s, () => r.module, (e) => r.module = e), J(e, t);
	}, C = (e) => {
		var t = oo(), i = L(t), a = L(i, !0);
		O(i);
		var s = R(i);
		Q(s), O(t), z((e, t, n) => {
			$(i, "for", e), Y(a, t), $(s, "id", n);
		}, [
			() => o("api"),
			() => G(n)("advanced.apiUrl"),
			() => o("api")
		]), ia(s, () => r.api, (e) => r.api = e), J(e, t);
	};
	X(x, (e) => {
		r.sourceType === "module" ? e(S) : r.sourceType === "api" && e(C, 1);
	});
	var w = R(x, 2), ee = (e) => {
		var t = so(), i = tr(t), a = L(i), s = L(a), c = L(s, !0);
		O(s);
		var l = R(s);
		Q(l), O(a);
		var u = R(a, 2), d = L(u), f = L(d, !0);
		O(d);
		var p = R(d);
		Q(p), O(u);
		var m = R(u, 2), h = L(m), g = L(h, !0);
		O(h);
		var _ = R(h);
		Q(_), O(m);
		var v = R(m, 2), y = L(v), b = L(y, !0);
		O(y);
		var x = R(y);
		Q(x), O(v);
		var S = R(v, 2), C = L(S), w = L(C, !0);
		O(C);
		var ee = R(C);
		Q(ee), O(S);
		var te = R(S, 2), ne = L(te), re = L(ne, !0);
		O(ne);
		var ie = R(ne, 2), ae = L(ie);
		ae.value = ae.__value = "ASC";
		var oe = R(ae);
		oe.value = oe.__value = "DESC", O(ie), O(te), O(i);
		var se = R(i, 2), ce = L(se), le = L(ce, !0);
		O(ce);
		var ue = R(ce);
		or(ue), O(se), z((e, t, n, r, i, a, o, u, m, v, S, te, ae, oe, se, de, fe, pe, me, he, ge) => {
			$(s, "for", e), Y(c, t), $(l, "id", n), $(d, "for", r), Y(f, i), $(p, "id", a), $(h, "for", o), Y(g, u), $(_, "id", m), $(y, "for", v), Y(b, S), $(x, "id", te), $(C, "for", ae), Y(w, oe), $(ee, "id", se), $(ne, "for", de), Y(re, fe), $(ie, "id", pe), $(ce, "for", me), Y(le, he), $(ue, "id", ge);
		}, [
			() => o("variable"),
			() => G(n)("advanced.variable"),
			() => o("variable"),
			() => o("key"),
			() => G(n)("advanced.key"),
			() => o("key"),
			() => o("limit"),
			() => G(n)("advanced.limit"),
			() => o("limit"),
			() => o("offset"),
			() => G(n)("advanced.offset"),
			() => o("offset"),
			() => o("sort"),
			() => G(n)("advanced.sort"),
			() => o("sort"),
			() => o("direction"),
			() => G(n)("advanced.direction"),
			() => o("direction"),
			() => o("filters"),
			() => G(n)("advanced.filters"),
			() => o("filters")
		]), ia(l, () => r.variable, (e) => r.variable = e), ia(p, () => r.key, (e) => r.key = e), ia(_, () => r.limit, (e) => r.limit = e), ia(x, () => r.offset, (e) => r.offset = e), ia(ee, () => r.sortColumn, (e) => r.sortColumn = e), qi(ie, () => r.sortDirection, (e) => r.sortDirection = e), ia(ue, () => r.filters, (e) => r.filters = e), J(e, t);
	};
	X(w, (e) => {
		r.sourceType !== "none" && e(ee);
	});
	var te = R(w, 2), ne = L(te), re = L(ne, !0);
	O(ne);
	var ie = R(ne);
	Q(ie), O(te);
	var ae = R(te, 2), oe = (e) => {
		var t = co(), n = L(t, !0);
		O(t), z(() => Y(n, G(a))), J(e, t);
	};
	X(ae, (e) => {
		G(a) && e(oe);
	});
	var se = R(ae, 2), ce = L(se, !0);
	O(se), O(c), z((e, t, n, r, i, a, o, s, c, l, d) => {
		Y(u, e), $(f, "for", t), Y(p, n), $(m, "id", r), Y(g, i), Y(v, a), Y(b, o), $(ne, "for", s), Y(re, c), $(ie, "id", l), Y(ce, d);
	}, [
		() => G(n)("advanced.title"),
		() => o("source"),
		() => G(n)("advanced.source"),
		() => o("source"),
		() => G(n)("advanced.none"),
		() => G(n)("advanced.module"),
		() => G(n)("advanced.api"),
		() => o("condition"),
		() => G(n)("advanced.condition"),
		() => o("condition"),
		() => G(n)("advanced.apply")
	]), qi(m, () => r.sourceType, (e) => r.sourceType = e), ia(ie, () => G(i), (e) => I(i, e)), K("click", se, s), J(e, c), j();
}
mi(["click"]);
// src/ui/inspector/fields.ts
var po = {
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
}, mo = /* @__PURE__ */ new Set([
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
]), ho = (e) => e.charAt(0).toUpperCase() + e.slice(1).replace(/[_-]/g, " "), go = (e) => {
	let t = [], n = /* @__PURE__ */ new Set();
	for (let [r, i] of Object.entries(e.editorControls)) {
		let e = i, a = e.options?.map(String);
		t.push({
			key: r,
			label: e.label ?? ho(r),
			control: po[e.type ?? ""] ?? "text",
			...a ? { options: a } : {}
		}), n.add(r);
	}
	for (let [r, i] of Object.entries(e.propsSchema)) {
		if (n.has(r)) continue;
		let e = i, a = e.enum?.map(String);
		t.push({
			key: r,
			label: ho(r),
			control: a ? "select" : po[e.type ?? ""] ?? "text",
			...a ? { options: a } : {}
		}), n.add(r);
	}
	return Object.keys(e.propsSchema).length === 0 && Object.keys(e.editorControls).length === 0 && (mo.has(e.type) && t.push({
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
}, _o = (e, t) => {
	if (e.control === "checkbox") return { value: t === !0 };
	let n = String(t);
	if (e.control === "number") {
		if (n.trim() === "") return { value: null };
		let e = Number(n);
		return Number.isFinite(e) ? { value: e } : { error: "field.number" };
	}
	return e.control === "url" && n.trim() !== "" && da(n) === "" ? { error: "field.url" } : e.control === "select" && e.options && !e.options.includes(n) ? { error: "field.option" } : e.control === "select" && e.options?.every((e) => /^\d+$/.test(e)) ? { value: Number(n) } : { value: n };
}, vo = /* @__PURE__ */ q("<label class=\"svelte-1g42mo8\"><input type=\"checkbox\" class=\"svelte-1g42mo8\"/> </label>"), yo = /* @__PURE__ */ q("<textarea rows=\"3\" class=\"svelte-1g42mo8\"></textarea>"), bo = /* @__PURE__ */ q("<option> </option>"), xo = /* @__PURE__ */ q("<select class=\"svelte-1g42mo8\"></select>"), So = /* @__PURE__ */ q("<input class=\"svelte-1g42mo8\"/>"), Co = /* @__PURE__ */ q("<label class=\"svelte-1g42mo8\"> </label> <!>", 1), wo = /* @__PURE__ */ q("<p class=\"error svelte-1g42mo8\" role=\"alert\"> </p>"), To = /* @__PURE__ */ q("<div class=\"field svelte-1g42mo8\"><!> <!></div>"), Eo = {
	hash: "svelte-1g42mo8",
	code: ".field.svelte-1g42mo8 {display:grid;gap:.25rem;margin-bottom:.75rem;}label.svelte-1g42mo8 {font-size:.8rem;font-weight:600;}input.svelte-1g42mo8:not([type='checkbox']), textarea.svelte-1g42mo8, select.svelte-1g42mo8 {font:inherit;font-size:.875rem;padding:.35rem .5rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}[aria-invalid='true'].svelte-1g42mo8 {border-color:var(--cpb-danger);}input.svelte-1g42mo8:focus-visible, textarea.svelte-1g42mo8:focus-visible, select.svelte-1g42mo8:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}.error.svelte-1g42mo8 {color:var(--cpb-danger);font-size:.75rem;margin:0;}"
};
function Do(e, t) {
	A(t, !0), Z(e, Eo);
	let n = /* @__PURE__ */ F(null), r = /* @__PURE__ */ P(() => t.value === null || t.value === void 0 ? "" : String(t.value));
	function i(e) {
		let r = _o(t.field, e);
		"error" in r ? I(n, t.t(r.error), !0) : (I(n, null), t.onChange(r.value));
	}
	var a = To(), o = L(a), s = (e) => {
		var n = vo(), r = L(n);
		Q(r);
		var a = R(r);
		O(n), z(() => {
			$(r, "id", t.id), ea(r, t.value === !0), Y(a, ` ${t.field.label ?? ""}`);
		}), K("change", r, (e) => i(e.currentTarget.checked)), J(e, n);
	}, c = (e) => {
		var a = Co(), o = tr(a), s = L(o, !0);
		O(o);
		var c = R(o, 2), l = (e) => {
			var a = yo();
			or(a), z(() => {
				$(a, "id", t.id), $i(a, G(r)), $(a, "aria-invalid", G(n) !== null), $(a, "aria-describedby", G(n) ? `${t.id}-error` : void 0);
			}), K("input", a, (e) => i(e.currentTarget.value)), J(e, a);
		}, u = (e) => {
			var n = xo();
			Ni(n, 20, () => t.field.options ?? [], (e) => e, (e, t) => {
				var n = bo(), r = L(n, !0);
				O(n);
				var i = {};
				z(() => {
					Y(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
				}), J(e, n);
			}), O(n);
			var a;
			Ki(n), z(() => {
				$(n, "id", t.id), a !== (a = G(r)) && (n.value = (n.__value = G(r)) ?? "", Gi(n, G(r)));
			}), K("change", n, (e) => i(e.currentTarget.value)), J(e, n);
		}, d = (e) => {
			var a = So();
			Q(a), z(() => {
				$(a, "id", t.id), $(a, "type", t.field.control === "number" ? "number" : t.field.control === "url" ? "url" : "text"), $i(a, G(r)), $(a, "aria-invalid", G(n) !== null), $(a, "aria-describedby", G(n) ? `${t.id}-error` : void 0);
			}), K("input", a, (e) => i(e.currentTarget.value)), J(e, a);
		};
		X(c, (e) => {
			t.field.control === "textarea" ? e(l) : t.field.control === "select" ? e(u, 1) : e(d, -1);
		}), z(() => {
			$(o, "for", t.id), Y(s, t.field.label);
		}), J(e, a);
	};
	X(o, (e) => {
		t.field.control === "checkbox" ? e(s) : e(c, -1);
	});
	var l = R(o, 2), u = (e) => {
		var r = wo(), i = L(r, !0);
		O(r), z(() => {
			$(r, "id", `${t.id}-error`), Y(i, G(n));
		}), J(e, r);
	};
	X(l, (e) => {
		G(n) && e(u);
	}), O(a), J(e, a), j();
}
mi(["change", "input"]);
// src/ui/inspector/Inspector.svelte
var Oo = /* @__PURE__ */ q("<p class=\"hint svelte-2ghsnx\"> </p>"), ko = /* @__PURE__ */ q("<p class=\"locked svelte-2ghsnx\" role=\"note\"> </p>"), Ao = /* @__PURE__ */ q("<button type=\"button\" class=\"svelte-2ghsnx\"> </button>"), jo = /* @__PURE__ */ q("<p class=\"type svelte-2ghsnx\"> </p> <div class=\"field svelte-2ghsnx\"><label class=\"svelte-2ghsnx\"> </label> <input type=\"text\" class=\"svelte-2ghsnx\"/></div> <!> <!> <div class=\"actions svelte-2ghsnx\"><button type=\"button\" class=\"svelte-2ghsnx\"> </button> <!> <button type=\"button\" class=\"danger svelte-2ghsnx\"> </button></div>", 1), Mo = /* @__PURE__ */ q("<section class=\"inspector svelte-2ghsnx\"><h2 class=\"svelte-2ghsnx\"> </h2> <!></section>"), No = {
	hash: "svelte-2ghsnx",
	code: ".inspector.svelte-2ghsnx {padding:.5rem .75rem;overflow:auto;border-left:1px solid var(--cpb-border);}h2.svelte-2ghsnx {font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin:0 0 .5rem;color:var(--cpb-muted);}.hint.svelte-2ghsnx, .locked.svelte-2ghsnx {font-size:.85rem;color:var(--cpb-muted);}.locked.svelte-2ghsnx {color:var(--cpb-danger);}.type.svelte-2ghsnx {font-weight:700;margin:0 0 .75rem;}.field.svelte-2ghsnx {display:grid;gap:.25rem;margin-bottom:.75rem;}label.svelte-2ghsnx {font-size:.8rem;font-weight:600;}input.svelte-2ghsnx {font:inherit;font-size:.875rem;padding:.35rem .5rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}.actions.svelte-2ghsnx {display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1rem;}button.svelte-2ghsnx {font:inherit;font-size:.8rem;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.danger.svelte-2ghsnx {color:var(--cpb-danger);}button.svelte-2ghsnx:focus-visible, input.svelte-2ghsnx:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Po(e, t) {
	A(t, !0), Z(e, No);
	let n = la(t, "canTemplates", 3, !1), r = /* @__PURE__ */ P(() => t.store.t), i = /* @__PURE__ */ P(() => t.store.selection ? t.store.tree.nodes[t.store.selection] : void 0), a = /* @__PURE__ */ P(() => G(i) ? t.store.catalogue?.get(G(i).type) : void 0), o = /* @__PURE__ */ P(() => G(a) ? go(G(a)) : []), s = /* @__PURE__ */ P(() => {
		let e = G(i)?.fields.props;
		return typeof e == "object" && e && !Array.isArray(e) ? e : {};
	});
	function c(e, n) {
		G(i) && (n === null || n === "" ? t.store.run({
			kind: "updateProps",
			id: G(i).id,
			set: {},
			unset: [e]
		}) : t.store.run({
			kind: "updateProps",
			id: G(i).id,
			set: { [e]: n }
		}));
	}
	function l(e) {
		if (!G(i)) return;
		let n = typeof G(i).fields.name == "string" ? G(i).fields.name : null;
		t.store.run({
			kind: "rename",
			id: G(i).id,
			name: n,
			label: e.trim() === "" ? null : e
		});
	}
	function u() {
		G(i) && t.store.run({
			kind: "remove",
			id: G(i).id
		}, ["announce.removed"]) && t.onRemoved();
	}
	var d = Mo(), f = L(d), p = L(f, !0);
	O(f);
	var m = R(f, 2), h = (e) => {
		var t = Oo(), n = L(t, !0);
		O(t), z((e) => Y(n, e), [() => G(r)("inspector.none")]), J(e, t);
	}, g = (e) => {
		var d = xi();
		ki(tr(d), () => G(i).id, (e) => {
			var d = jo(), f = tr(d), p = L(f, !0);
			O(f);
			var m = R(f, 2), h = L(m), g = L(h, !0);
			O(h);
			var _ = R(h, 2);
			Q(_), O(m);
			var v = R(m, 2), y = (e) => {
				var t = ko(), n = L(t, !0);
				O(t), z((e) => Y(n, e), [() => G(r)("inspector.locked")]), J(e, t);
			}, b = (e) => {
				var n = xi();
				Ni(tr(n), 17, () => G(o), (e) => e.key, (e, n) => {
					{
						let i = /* @__PURE__ */ P(() => `${t.uid}-prop-${G(n).key}`);
						Do(e, {
							get field() {
								return G(n);
							},
							get t() {
								return G(r);
							},
							get id() {
								return G(i);
							},
							get value() {
								return G(s)[G(n).key];
							},
							onChange: (e) => c(G(n).key, e)
						});
					}
				}), J(e, n);
			};
			X(v, (e) => {
				G(a) ? e(b, -1) : e(y);
			});
			var x = R(v, 2), S = (e) => {
				fo(e, {
					get store() {
						return t.store;
					},
					get node() {
						return G(i);
					},
					get uid() {
						return t.uid;
					}
				});
			};
			X(x, (e) => {
				G(a) && e(S);
			});
			var C = R(x, 2), w = L(C), ee = L(w, !0);
			O(w);
			var te = R(w, 2), ne = (e) => {
				var n = Ao(), i = L(n, !0);
				O(n), z((e) => Y(i, e), [() => G(r)("inspector.saveTemplate")]), K("click", n, function(...e) {
					t.onSaveTemplate?.apply(this, e);
				}), J(e, n);
			};
			X(te, (e) => {
				n() && e(ne);
			});
			var re = R(te, 2), ie = L(re, !0);
			O(re), O(C), z((e, n, r) => {
				Y(p, G(a)?.label ?? G(i).type), $(h, "for", `${t.uid}-name`), Y(g, e), $(_, "id", `${t.uid}-name`), $i(_, typeof G(i).fields.label == "string" ? G(i).fields.label : ""), Y(ee, n), Y(ie, r);
			}, [
				() => G(r)("inspector.name"),
				() => G(r)("inspector.duplicate"),
				() => G(r)("inspector.remove")
			]), K("input", _, (e) => l(e.currentTarget.value)), K("click", w, () => G(i) && t.store.run({
				kind: "duplicate",
				id: G(i).id
			})), K("click", re, u), J(e, d);
		}), J(e, d);
	};
	X(m, (e) => {
		G(i) ? e(g, -1) : e(h);
	}), O(d), z((e) => {
		$(d, "aria-labelledby", `${t.uid}-inspector-title`), $(f, "id", `${t.uid}-inspector-title`), Y(p, e);
	}, [() => G(r)("inspector.title")]), J(e, d), j();
}
mi(["input", "click"]);
// src/ui/palette/Palette.svelte
var Fo = /* @__PURE__ */ q("<button type=\"button\" class=\"wide svelte-om8jxl\"> </button>"), Io = /* @__PURE__ */ q("<li><button type=\"button\" class=\"svelte-om8jxl\"> </button></li>"), Lo = /* @__PURE__ */ q("<h3 class=\"svelte-om8jxl\"> </h3> <ul class=\"svelte-om8jxl\"></ul>", 1), Ro = /* @__PURE__ */ q("<li><button type=\"button\" class=\"svelte-om8jxl\"> </button></li>"), zo = /* @__PURE__ */ q("<h3 class=\"svelte-om8jxl\"> </h3> <ul class=\"svelte-om8jxl\"></ul>", 1), Bo = /* @__PURE__ */ q("<section class=\"palette svelte-om8jxl\" aria-labelledby=\"cpb-palette-title\"><h2 id=\"cpb-palette-title\" class=\"svelte-om8jxl\"> </h2> <!> <!> <!></section>"), Vo = {
	hash: "svelte-om8jxl",
	code: ".palette.svelte-om8jxl {padding:.5rem .75rem;overflow:auto;}h2.svelte-om8jxl {font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin:0 0 .5rem;color:var(--cpb-muted);}h3.svelte-om8jxl {font-size:.75rem;margin:.5rem 0 .25rem;color:var(--cpb-muted);text-transform:capitalize;}ul.svelte-om8jxl {list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2, 1fr);gap:.25rem;}button.svelte-om8jxl {touch-action:none;width:100%;font:inherit;font-size:.8rem;padding:.35rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;text-align:left;}button.svelte-om8jxl:hover {border-color:var(--cpb-accent);}.wide.svelte-om8jxl {margin-bottom:.5rem;text-align:center;}button.svelte-om8jxl:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Ho(e, t) {
	A(t, !0), Z(e, Vo);
	let n = /* @__PURE__ */ P(() => t.store.t), r = [
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
	], i = /* @__PURE__ */ P(() => {
		let e = t.store.catalogue;
		if (!e) return [];
		let n = [...e.rules.values()].filter((e) => (e.label !== e.type || r.includes(e.type)) && e.type !== "html"), i = /* @__PURE__ */ new Map();
		for (let e of n) i.set(e.category, [...i.get(e.category) ?? [], e]);
		return [...i.entries()];
	});
	function a(e) {
		let n = t.store.catalogue;
		if (!n || t.drag.consumeClick()) return;
		let r = Pa(t.store.tree, n, t.store.selection, e.type);
		t.store.run({
			kind: "insert",
			...r,
			node: Ma(n, e.type)
		}, ["announce.inserted", { label: e.label }]) && t.store.selection && t.onInserted(t.store.selection);
	}
	var o = Bo(), s = L(o), c = L(s, !0);
	O(s);
	var l = R(s, 2), u = (e) => {
		var r = Fo(), i = L(r, !0);
		O(r), z((e) => Y(i, e), [() => G(n)("palette.import")]), K("click", r, function(...e) {
			t.onImport?.apply(this, e);
		}), J(e, r);
	};
	X(l, (e) => {
		t.content.canImport && e(u);
	});
	var d = R(l, 2), f = (e) => {
		var r = Lo(), i = tr(r), a = L(i, !0);
		O(i);
		var o = R(i, 2);
		Ni(o, 21, () => t.content.templates, (e) => e.id, (e, r) => {
			var i = Io(), a = L(i), o = L(a, !0);
			O(a), O(i), z((e) => {
				$(a, "aria-label", e), Y(o, G(r).name);
			}, [() => G(n)("palette.insertTemplate", { name: G(r).name })]), K("click", a, () => {
				t.content.insertNodes(G(r).nodes, G(r).name) && t.store.selection && t.onInserted(t.store.selection);
			}), J(e, i);
		}), O(o), z((e) => Y(a, e), [() => G(n)("palette.templates")]), J(e, r);
	};
	X(d, (e) => {
		t.content.canTemplates && t.content.templates.length > 0 && e(f);
	}), Ni(R(d, 2), 17, () => G(i), ([e, t]) => e, (e, r) => {
		var i = /* @__PURE__ */ P(() => Ve(G(r), 2));
		let o = () => G(i)[0], s = () => G(i)[1];
		var c = zo(), l = tr(c), u = L(l, !0);
		O(l);
		var d = R(l, 2);
		Ni(d, 21, s, (e) => e.type, (e, r) => {
			var i = Ro(), o = L(i), s = L(o, !0);
			O(o), O(i), z((e) => {
				$(o, "aria-label", e), $(o, "data-type", G(r).type), Y(s, G(r).label);
			}, [() => G(n)("palette.insert", { label: G(r).label })]), K("click", o, () => a(G(r))), K("pointerdown", o, (e) => t.store.catalogue && t.drag.pressNew(e, {
				kind: "insert",
				node: Ma(t.store.catalogue, G(r).type)
			}, G(r).label)), J(e, i);
		}), O(d), z((e) => Y(u, e), [() => o().replace(/_/g, " ")]), J(e, c);
	}), O(o), z((e) => Y(c, e), [() => G(n)("palette.title")]), J(e, o), j();
}
mi(["click", "pointerdown"]);
// src/ui/publish/ConflictBanner.svelte
var Uo = /* @__PURE__ */ q("<button type=\"button\" class=\"svelte-1ti6kqq\"> </button>"), Wo = /* @__PURE__ */ q("<div class=\"conflict svelte-1ti6kqq\" role=\"alertdialog\" aria-modal=\"false\" tabindex=\"-1\"><strong> </strong> <p class=\"svelte-1ti6kqq\"> </p> <div class=\"actions svelte-1ti6kqq\"><button type=\"button\" class=\"primary svelte-1ti6kqq\"> </button> <button type=\"button\" class=\"svelte-1ti6kqq\"> </button> <!></div></div>"), Go = {
	hash: "svelte-1ti6kqq",
	code: ".conflict.svelte-1ti6kqq {margin:.5rem .75rem 0;padding:.75rem;border:2px solid var(--cpb-danger);border-radius:8px;background:#fef2f2;}.conflict.svelte-1ti6kqq:focus-visible {outline:2px solid var(--cpb-danger);outline-offset:2px;}p.svelte-1ti6kqq {margin:.25rem 0 .5rem;font-size:.875rem;}.actions.svelte-1ti6kqq {display:flex;flex-wrap:wrap;gap:.5rem;}button.svelte-1ti6kqq {font:inherit;font-size:.85rem;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.primary.svelte-1ti6kqq {background:var(--cpb-danger);border-color:var(--cpb-danger);color:#fff;}button.svelte-1ti6kqq:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:2px;}"
};
function Ko(e, t) {
	A(t, !0), Z(e, Go);
	let n = /* @__PURE__ */ P(() => t.store.t), r = /* @__PURE__ */ F(void 0);
	gr(() => {
		t.store.status === "conflict" && ni().then(() => G(r)?.focus());
	});
	var i = xi(), a = tr(i), o = (e) => {
		var i = Wo(), a = L(i), o = L(a, !0);
		O(a);
		var s = R(a, 2), c = L(s, !0);
		O(s);
		var l = R(s, 2), u = L(l), d = L(u, !0);
		O(u);
		var f = R(u, 2), p = L(f, !0);
		O(f);
		var m = R(f, 2), h = (e) => {
			var r = Uo(), i = L(r, !0);
			O(r), z((e) => Y(i, e), [() => G(n)("conflict.view")]), K("click", r, () => t.onView?.(t.store.conflictRevision)), J(e, r);
		};
		X(m, (e) => {
			t.onView && t.store.conflictRevision && e(h);
		}), O(l), O(i), ca(i, (e) => I(r, e), () => G(r)), z((e, n, r, l) => {
			$(i, "aria-labelledby", `${t.uid}-conflict-title`), $(i, "aria-describedby", `${t.uid}-conflict-body`), $(a, "id", `${t.uid}-conflict-title`), Y(o, e), $(s, "id", `${t.uid}-conflict-body`), Y(c, n), Y(d, r), Y(p, l);
		}, [
			() => G(n)("conflict.title"),
			() => G(n)("conflict.body", {
				revision: t.store.conflictRevision ?? "?",
				base: t.store.revision
			}),
			() => G(n)("conflict.keepMine"),
			() => G(n)("conflict.takeTheirs")
		]), K("click", u, () => t.store.resolve("keep-mine")), K("click", f, () => t.store.resolve("take-theirs")), J(e, i);
	};
	X(a, (e) => {
		t.store.status === "conflict" && e(o);
	}), J(e, i), j();
}
mi(["click"]);
// src/ui/publish/ServerView.svelte
var qo = /* @__PURE__ */ q("<p class=\"note svelte-ztrun4\"> </p>"), Jo = /* @__PURE__ */ q("<p class=\"note svelte-ztrun4\" role=\"status\"> </p>"), Yo = /* @__PURE__ */ q("<iframe sandbox=\"\" class=\"svelte-ztrun4\"></iframe>"), Xo = /* @__PURE__ */ q("<div class=\"server svelte-ztrun4\"><div class=\"bar svelte-ztrun4\"><strong> </strong> <button type=\"button\" class=\"svelte-ztrun4\"> </button></div> <!> <!></div>"), Zo = {
	hash: "svelte-ztrun4",
	code: ".server.svelte-ztrun4 {background:var(--cpb-canvas);padding:.5rem 1rem 1rem;min-height:0;display:flex;flex-direction:column;gap:.5rem;}.bar.svelte-ztrun4 {display:flex;align-items:center;gap:.75rem;}.note.svelte-ztrun4 {margin:0;font-size:.8rem;color:var(--cpb-muted);}button.svelte-ztrun4 {margin-left:auto;font:inherit;font-size:.8rem;padding:.3rem .7rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}iframe.svelte-ztrun4 {flex:1;width:100%;min-height:480px;border:1px solid var(--cpb-border);border-radius:8px;background:#fff;}"
};
function Qo(e, t) {
	A(t, !0), Z(e, Zo);
	let n = la(t, "stylesheets", 19, () => []), r = /* @__PURE__ */ P(() => t.store.t), i = /* @__PURE__ */ F(null);
	gr(() => {
		let e = t.store.session.transport.render, n = t.revision;
		I(i, null), e && e.call(t.store.session.transport, t.store.session.pageId, n).then((e) => {
			n === t.revision && I(i, e, !0);
		}).catch((e) => t.store.fail(e));
	});
	let a = /* @__PURE__ */ P(() => G(i) === null ? "" : _a(n()).replace("<body></body>", `<body>${G(i)}</body>`));
	var o = Xo(), s = L(o), c = L(s), l = L(c, !0);
	O(c);
	var u = R(c, 2), d = L(u, !0);
	O(u), O(s);
	var f = R(s, 2), p = (e) => {
		var t = qo(), n = L(t, !0);
		O(t), z((e) => Y(n, e), [() => G(r)("server.dirty")]), J(e, t);
	};
	X(f, (e) => {
		t.store.dirty && e(p);
	});
	var m = R(f, 2), h = (e) => {
		var t = Jo(), n = L(t, !0);
		O(t), z((e) => Y(n, e), [() => G(r)("server.loading")]), J(e, t);
	}, g = (e) => {
		var t = Yo();
		z((e) => {
			$(t, "title", e), $(t, "srcdoc", G(a));
		}, [() => G(r)("server.frame")]), J(e, t);
	};
	X(m, (e) => {
		G(i) === null ? e(h) : e(g, -1);
	}), O(o), z((e, t) => {
		Y(l, e), Y(d, t);
	}, [() => G(r)("server.title", { revision: t.revision }), () => G(r)("server.back")]), K("click", u, function(...e) {
		t.onBack?.apply(this, e);
	}), J(e, o), j();
}
mi(["click"]);
// src/ui/model/flatten.ts
var $o = (e) => {
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
}, es = (e) => {
	if (!(e.ctrlKey || e.metaKey) || e.altKey) return null;
	let t = e.key.toLowerCase();
	return t === "z" ? e.shiftKey ? { type: "redo" } : { type: "undo" } : t === "y" ? { type: "redo" } : null;
}, ts = (e, t, n) => {
	let r = $o(e), i = r[0];
	if (!i) return null;
	let a = t === null ? -1 : r.findIndex((e) => e.id === t), s = r[a];
	if (!s) return n.key === "ArrowDown" || n.key === "Home" ? {
		type: "select",
		id: i.id
	} : null;
	let c = e.nodes[s.id], l = o(e, s.parent), u = n.ctrlKey || n.metaKey;
	if (n.altKey && !u) switch (n.key) {
		case "ArrowUp": return s.index > 0 ? ns(s.id, s.parent, s.index - 1) : null;
		case "ArrowDown": return s.index < l.length - 1 ? ns(s.id, s.parent, s.index + 2) : null;
		case "ArrowRight": {
			let t = l[s.index - 1];
			return t ? ns(s.id, t, e.nodes[t]?.children.length ?? 0) : null;
		}
		case "ArrowLeft": {
			if (s.parent === null) return null;
			let t = e.nodes[s.parent], n = o(e, t?.parent ?? null);
			return ns(s.id, t?.parent ?? null, n.indexOf(s.parent) + 1);
		}
		default: return null;
	}
	if (u && n.key.toLowerCase() === "d") return {
		type: "command",
		command: {
			kind: "duplicate",
			id: s.id
		}
	};
	if (u || n.altKey) return es(n);
	switch (n.key) {
		case "ArrowDown": return rs(r[a + 1]?.id);
		case "ArrowUp": return rs(r[a - 1]?.id);
		case "Home": return rs(i.id);
		case "End": return rs(r[r.length - 1]?.id);
		case "ArrowRight": return rs(c?.children[0]);
		case "ArrowLeft": return rs(s.parent ?? void 0);
		case "Delete":
		case "Backspace": return {
			type: "command",
			command: {
				kind: "remove",
				id: s.id
			}
		};
		default: return null;
	}
}, ns = (e, t, n) => ({
	type: "command",
	command: {
		kind: "move",
		id: e,
		parent: t,
		index: n
	}
}), rs = (e) => e ? {
	type: "select",
	id: e
} : null, is = /* @__PURE__ */ q("<p class=\"empty svelte-y2i8n1\"> </p>"), as = /* @__PURE__ */ q("<li role=\"treeitem\" class=\"svelte-y2i8n1\"> </li>"), os = /* @__PURE__ */ q("<ul role=\"tree\" aria-labelledby=\"cpb-structure-title\" aria-describedby=\"cpb-structure-help\" class=\"svelte-y2i8n1\"></ul>"), ss = /* @__PURE__ */ q("<section class=\"structure svelte-y2i8n1\" aria-labelledby=\"cpb-structure-title\"><h2 id=\"cpb-structure-title\" class=\"svelte-y2i8n1\"> </h2> <p class=\"help svelte-y2i8n1\" id=\"cpb-structure-help\"> </p> <!></section>"), cs = {
	hash: "svelte-y2i8n1",
	code: ".structure.svelte-y2i8n1 {padding:.5rem .75rem;overflow:auto;border-top:1px solid var(--cpb-border);}h2.svelte-y2i8n1 {font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin:0;color:var(--cpb-muted);}.help.svelte-y2i8n1, .empty.svelte-y2i8n1 {font-size:.75rem;color:var(--cpb-muted);margin:.25rem 0 .5rem;}ul.svelte-y2i8n1 {list-style:none;margin:0;padding:0;outline:none;}li.svelte-y2i8n1 {font-size:.85rem;padding:.25rem .375rem;border-radius:4px;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}li[aria-selected='true'].svelte-y2i8n1 {background:var(--cpb-accent-soft);color:var(--cpb-accent-strong);font-weight:600;}li.svelte-y2i8n1:focus-visible, ul.svelte-y2i8n1:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:-2px;}"
};
function ls(e, t) {
	A(t, !0), Z(e, cs);
	let n = /* @__PURE__ */ P(() => t.store.t), r = /* @__PURE__ */ P(() => $o(t.store.tree)), i = /* @__PURE__ */ F(void 0), a = (e) => {
		let n = t.store.tree.nodes[e];
		if (!n) return e;
		let r = typeof n.fields.label == "string" && n.fields.label !== "" ? n.fields.label : null, i = t.store.catalogue?.get(n.type);
		return r ? `${r} (${i?.label ?? n.type})` : i?.label ?? n.type;
	};
	async function o(e) {
		await ni(), ((e ? G(i)?.querySelector(`[data-node-id="${CSS.escape(e)}"]`) : null) ?? G(i))?.focus();
	}
	async function s(e) {
		if ((e.key === "F2" || e.key === "Enter") && t.store.selection && !e.altKey) {
			t.onEdit(t.store.selection) && e.preventDefault();
			return;
		}
		let n = ts(t.store.tree, t.store.selection, e);
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
	var c = { focusItem: o }, l = ss(), u = L(l), d = L(u, !0);
	O(u);
	var f = R(u, 2), p = L(f, !0);
	O(f);
	var m = R(f, 2), h = (e) => {
		var t = is(), r = L(t, !0);
		O(t), z((e) => Y(r, e), [() => G(n)("structure.empty")]), J(e, t);
	}, g = (e) => {
		var n = os();
		Ni(n, 21, () => G(r), (e) => e.id, (e, n) => {
			var r = as();
			let i;
			var o = L(r, !0);
			O(r), z((e) => {
				$(r, "aria-level", G(n).depth), $(r, "aria-setsize", G(n).siblings), $(r, "aria-posinset", G(n).index + 1), $(r, "aria-selected", t.store.selection === G(n).id), $(r, "tabindex", t.store.selection === G(n).id ? 0 : -1), $(r, "data-node-id", G(n).id), i = Wi(r, "", i, { "padding-left": `${(G(n).depth - 1) * 14 + 6}px` }), Y(o, e);
			}, [() => a(G(n).id)]), K("click", r, () => t.store.select(G(n).id)), pi("focus", r, () => t.store.selection !== G(n).id && t.store.select(G(n).id)), K("keydown", r, () => {}), J(e, r);
		}), O(n), ca(n, (e) => I(i, e), () => G(i)), z(() => $(n, "tabindex", t.store.selection ? -1 : 0)), K("keydown", n, s), J(e, n);
	};
	return X(m, (e) => {
		G(r).length === 0 ? e(h) : e(g, -1);
	}), O(l), z((e, t) => {
		Y(d, e), Y(p, t);
	}, [() => G(n)("structure.title"), () => G(n)("structure.help")]), J(e, l), j(c);
}
mi(["keydown", "click"]);
// src/ui/toolbar/Toolbar.svelte
var us = /* @__PURE__ */ q("<button type=\"button\" class=\"primary svelte-ouhh5d\"> </button>"), ds = /* @__PURE__ */ q("<button type=\"button\" class=\"svelte-ouhh5d\"> </button>"), fs = /* @__PURE__ */ q("<span class=\"revision svelte-ouhh5d\"> <span data-publication=\"\"> </span></span>"), ps = /* @__PURE__ */ q("<div class=\"toolbar svelte-ouhh5d\" role=\"toolbar\"><button type=\"button\" aria-keyshortcuts=\"Control+Z\" class=\"svelte-ouhh5d\"> </button> <button type=\"button\" aria-keyshortcuts=\"Control+Shift+Z\" class=\"svelte-ouhh5d\"> </button> <button type=\"button\" aria-keyshortcuts=\"Control+S\" class=\"svelte-ouhh5d\"> </button> <!> <!> <span class=\"status svelte-ouhh5d\"> </span> <!></div>"), ms = {
	hash: "svelte-ouhh5d",
	code: ".toolbar.svelte-ouhh5d {display:flex;flex-wrap:wrap;gap:.5rem;align-items:center;padding:.5rem .75rem;border-bottom:1px solid var(--cpb-border);}button.svelte-ouhh5d {font:inherit;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.svelte-ouhh5d:disabled {opacity:.5;cursor:not-allowed;}button.primary.svelte-ouhh5d {background:var(--cpb-accent);border-color:var(--cpb-accent);color:#fff;}button[aria-pressed='true'].svelte-ouhh5d {background:var(--cpb-accent-soft);border-color:var(--cpb-accent);}button.svelte-ouhh5d:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:2px;}.status.svelte-ouhh5d {margin-left:auto;font-size:.875rem;}.status[data-status='conflict'].svelte-ouhh5d, .status[data-status='offline'].svelte-ouhh5d, .status[data-status='load-error'].svelte-ouhh5d {color:var(--cpb-danger);font-weight:600;}.revision.svelte-ouhh5d {font-size:.75rem;color:var(--cpb-muted);}"
};
function hs(e, t) {
	A(t, !0), Z(e, ms);
	let n = /* @__PURE__ */ P(() => t.store.t), r = /* @__PURE__ */ P(() => t.store.publishedRevision === null ? G(n)("publication.none") : t.store.unpublished ? G(n)("publication.pending", { revision: t.store.publishedRevision }) : G(n)("publication.current"));
	var i = ps(), a = L(i), o = L(a, !0);
	O(a);
	var s = R(a, 2), c = L(s, !0);
	O(s);
	var l = R(s, 2), u = L(l, !0);
	O(l);
	var d = R(l, 2), f = (e) => {
		var r = us(), i = L(r, !0);
		O(r), z((e) => {
			r.disabled = t.store.publishing || t.store.status !== "ready" || !t.store.unpublished, Y(i, e);
		}, [() => t.store.publishing ? G(n)("toolbar.publishing") : G(n)("toolbar.publish")]), K("click", r, () => t.store.publish()), J(e, r);
	};
	X(d, (e) => {
		t.store.canPublish && e(f);
	});
	var p = R(d, 2), m = (e) => {
		var r = ds(), i = L(r, !0);
		O(r), z((e) => {
			$(r, "aria-pressed", t.serverView), Y(i, e);
		}, [() => G(n)("toolbar.serverView")]), K("click", r, function(...e) {
			t.onServerView?.apply(this, e);
		}), J(e, r);
	};
	X(p, (e) => {
		t.onServerView && e(m);
	});
	var h = R(p, 2), g = L(h, !0);
	O(h);
	var _ = R(h, 2), v = (e) => {
		var i = fs(), a = L(i), o = R(a), s = L(o, !0);
		O(o), O(i), z((e) => {
			Y(a, `${e ?? ""} · `), Y(s, G(r));
		}, [() => G(n)("toolbar.revision", { revision: t.store.revision })]), J(e, i);
	};
	X(_, (e) => {
		t.store.revision > 0 && e(v);
	}), O(i), z((e, n, r, d, f) => {
		$(i, "aria-label", e), a.disabled = !t.store.canUndo, Y(o, n), s.disabled = !t.store.canRedo, Y(c, r), l.disabled = !t.store.dirty || t.store.status === "saving" || t.store.status === "conflict", Y(u, d), $(h, "data-status", t.store.status), Y(g, f);
	}, [
		() => G(n)("editor.label"),
		() => G(n)("toolbar.undo"),
		() => G(n)("toolbar.redo"),
		() => G(n)("toolbar.save"),
		() => G(n)(`status.${t.store.status}`)
	]), K("click", a, () => t.store.undo()), K("click", s, () => t.store.redo()), K("click", l, () => t.store.save()), J(e, i), j();
}
mi(["click"]);
// src/ui/Editor.svelte
var gs = /* @__PURE__ */ q("<div class=\"editor svelte-b7je3p\" role=\"application\"><!> <!> <div class=\"body svelte-b7je3p\"><aside class=\"left svelte-b7je3p\"><!> <!></aside> <!> <!></div> <!> <!> <div class=\"sr-only svelte-b7je3p\" aria-live=\"polite\"> </div> <div class=\"sr-only svelte-b7je3p\" aria-live=\"assertive\" role=\"alert\"> </div></div>"), _s = {
	hash: "svelte-b7je3p",
	code: ".editor.svelte-b7je3p {--cpb-border: #d4d4d8;--cpb-surface: #fff;--cpb-canvas: #f1f5f9;--cpb-muted: #52525b;--cpb-accent: #2563eb;--cpb-accent-soft: #dbeafe;--cpb-accent-strong: #1e3a8a;--cpb-danger: #b91c1c;font:14px/1.4 system-ui, sans-serif;color:#18181b;background:var(--cpb-surface);display:flex;flex-direction:column;height:100%;min-height:600px;border:1px solid var(--cpb-border);}.body.svelte-b7je3p {flex:1;display:grid;grid-template-columns:240px 1fr 280px;min-height:0;}.left.svelte-b7je3p {display:grid;grid-template-rows:minmax(0, 45%) minmax(0, 1fr);min-height:0;border-right:1px solid var(--cpb-border);}.sr-only.svelte-b7je3p {position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;}\n  @media (max-width: 900px) {.body.svelte-b7je3p {grid-template-columns:1fr;} }"
};
function vs(e, t) {
	A(t, !0), Z(e, _s);
	let n = la(t, "stylesheets", 19, () => []), r = /* @__PURE__ */ F(void 0), i = /* @__PURE__ */ F(void 0), a = /* @__PURE__ */ P(() => new eo(t.store)), o = /* @__PURE__ */ P(() => new Ia(t.store)), s = /* @__PURE__ */ F(!1), c = /* @__PURE__ */ F(!1), l = !1;
	gr(() => {
		t.store.status === "ready" && !l && (l = !0, G(o).loadTemplates());
	});
	let u = /* @__PURE__ */ F(null), d = /* @__PURE__ */ P(() => typeof t.store.session.transport.render == "function");
	function f(e) {
		if ((e.ctrlKey || e.metaKey) && !e.altKey && e.key.toLowerCase() === "s") {
			e.preventDefault(), t.store.dirty && t.store.save();
			return;
		}
		if (e.target?.closest("input, textarea, select, [contenteditable=\"true\"], [role=\"tree\"]")) return;
		let n = es(e);
		n && (e.preventDefault(), n.type === "undo" ? t.store.undo() : n.type === "redo" && t.store.redo());
	}
	var p = gs(), m = L(p);
	{
		let e = /* @__PURE__ */ P(() => G(u) !== null), n = /* @__PURE__ */ P(() => G(d) ? () => {
			I(u, G(u) === null ? t.store.revision : null, !0);
		} : null);
		hs(m, {
			get store() {
				return t.store;
			},
			get serverView() {
				return G(e);
			},
			get onServerView() {
				return G(n);
			}
		});
	}
	var h = R(m, 2);
	{
		let e = /* @__PURE__ */ P(() => G(d) ? (e) => {
			I(u, e, !0);
		} : null);
		Ko(h, {
			get store() {
				return t.store;
			},
			get uid() {
				return t.uid;
			},
			get onView() {
				return G(e);
			}
		});
	}
	var g = R(h, 2), _ = L(g), v = L(_);
	Ho(v, {
		get store() {
			return t.store;
		},
		get drag() {
			return G(a);
		},
		get content() {
			return G(o);
		},
		onInserted: (e) => G(r)?.focusItem(e),
		onImport: () => {
			I(s, !0);
		}
	}), ca(ls(R(v, 2), {
		get store() {
			return t.store;
		},
		onEdit: (e) => G(i)?.startEditing(e) ?? !1
	}), (e) => I(r, e, !0), () => G(r)), O(_);
	var y = R(_, 2), b = (e) => {
		Qo(e, {
			get store() {
				return t.store;
			},
			get revision() {
				return G(u);
			},
			get stylesheets() {
				return n();
			},
			onBack: () => {
				I(u, null);
			}
		});
	}, x = (e) => {
		ca(ja(e, {
			get store() {
				return t.store;
			},
			get drag() {
				return G(a);
			},
			get uid() {
				return t.uid;
			},
			get stylesheets() {
				return n();
			},
			onEditEnd: (e, t) => {
				t && G(r)?.focusItem(e);
			}
		}), (e) => I(i, e, !0), () => G(i));
	};
	X(y, (e) => {
		G(u) === null ? e(x, -1) : e(b);
	}), Po(R(y, 2), {
		get store() {
			return t.store;
		},
		get uid() {
			return t.uid;
		},
		get canTemplates() {
			return G(o).canTemplates;
		},
		onRemoved: () => G(r)?.focusItem(t.store.selection),
		onSaveTemplate: () => {
			I(c, !0);
		}
	}), O(g);
	var S = R(g, 2);
	Ha(S, {
		get store() {
			return t.store;
		},
		get content() {
			return G(o);
		},
		get uid() {
			return t.uid;
		},
		get open() {
			return G(s);
		},
		set open(e) {
			I(s, e, !0);
		}
	});
	var C = R(S, 2);
	Ga(C, {
		get store() {
			return t.store;
		},
		get content() {
			return G(o);
		},
		get uid() {
			return t.uid;
		},
		get nodeId() {
			return t.store.selection;
		},
		get open() {
			return G(c);
		},
		set open(e) {
			I(c, e, !0);
		}
	});
	var w = R(C, 2), ee = L(w, !0);
	O(w);
	var te = R(w, 2), ne = L(te, !0);
	O(te), O(p), z((e) => {
		$(p, "aria-label", e), Y(ee, t.store.message), Y(ne, t.store.alert);
	}, [() => t.store.t("editor.label")]), K("keydown", p, f), J(e, p), j();
}
mi(["keydown"]);
// src/ui/i18n/en.ts
var ys = {
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
	"announce.templateSaved": "Template “{name}” saved",
	"announce.importEmpty": "The HTML produced no elements",
	"palette.templates": "Templates",
	"palette.insertTemplate": "Insert the template {name}",
	"palette.import": "Import HTML",
	"import.label": "Imported HTML",
	"import.title": "Import HTML",
	"import.help": "Paste HTML: the server turns it into editor elements. Scripts are dropped.",
	"import.field": "HTML",
	"import.submit": "Import",
	"import.warnings": "Imported with {count} converter warnings.",
	"dialog.cancel": "Cancel",
	"template.title": "Save as template",
	"template.name": "Name",
	"template.category": "Category",
	"template.submit": "Save template",
	"inspector.saveTemplate": "Save as template",
	"advanced.title": "Advanced: dynamic content",
	"advanced.source": "Repeat with data from",
	"advanced.none": "Nothing (fixed element)",
	"advanced.module": "A dynamic module",
	"advanced.api": "An external API",
	"advanced.moduleSlug": "Module (slug)",
	"advanced.apiUrl": "API URL (https)",
	"advanced.variable": "Name of each item",
	"advanced.key": "Unique key",
	"advanced.limit": "Limit",
	"advanced.offset": "Offset",
	"advanced.sort": "Sort by (column)",
	"advanced.direction": "Direction",
	"advanced.filters": "Filters (key=value per line)",
	"advanced.condition": "Condition to show it",
	"advanced.apply": "Apply",
	"loop.source": "Give the module, or an https URL of the API.",
	"loop.number": "Limit and offset must be non-negative integers.",
	"loop.variable": "Use letters, digits and underscore, starting with a letter.",
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
}, bs = {
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
	"announce.templateSaved": "Plantilla «{name}» guardada",
	"announce.importEmpty": "El HTML no produjo ningún elemento",
	"palette.templates": "Plantillas",
	"palette.insertTemplate": "Insertar la plantilla {name}",
	"palette.import": "Importar HTML",
	"import.label": "HTML importado",
	"import.title": "Importar HTML",
	"import.help": "Pega HTML: el servidor lo convierte en elementos del editor. Los scripts se descartan.",
	"import.field": "HTML",
	"import.submit": "Importar",
	"import.warnings": "Importado con {count} avisos del conversor.",
	"dialog.cancel": "Cancelar",
	"template.title": "Guardar como plantilla",
	"template.name": "Nombre",
	"template.category": "Categoría",
	"template.submit": "Guardar plantilla",
	"inspector.saveTemplate": "Guardar como plantilla",
	"advanced.title": "Avanzado: contenido dinámico",
	"advanced.source": "Repetir con datos de",
	"advanced.none": "Nada (elemento fijo)",
	"advanced.module": "Un módulo dinámico",
	"advanced.api": "Una API externa",
	"advanced.moduleSlug": "Módulo (slug)",
	"advanced.apiUrl": "URL de la API (https)",
	"advanced.variable": "Nombre de cada elemento",
	"advanced.key": "Clave única",
	"advanced.limit": "Límite",
	"advanced.offset": "Desde",
	"advanced.sort": "Ordenar por (columna)",
	"advanced.direction": "Sentido",
	"advanced.filters": "Filtros (clave=valor por línea)",
	"advanced.condition": "Condición para mostrarlo",
	"advanced.apply": "Aplicar",
	"loop.source": "Indica el módulo, o una URL https de la API.",
	"loop.number": "Límite y desde deben ser enteros sin signo.",
	"loop.variable": "Usa letras, números y guion bajo, empezando por una letra.",
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
}, xs = {
	es: bs,
	en: ys
}, Ss = (e) => {
	let t = xs[e.toLowerCase().split("-")[0] ?? "es"] ?? bs;
	return (e, n = {}) => t[e].replace(/\{(\w+)\}/g, (e, t) => String(n[t] ?? `{${t}}`));
}, Cs = class {
	session;
	t;
	#e = /* @__PURE__ */ F({
		nodes: {},
		rootIds: []
	});
	get tree() {
		return G(this.#e);
	}
	set tree(e) {
		I(this.#e, e);
	}
	#t = /* @__PURE__ */ F(null);
	get catalogue() {
		return G(this.#t);
	}
	set catalogue(e) {
		I(this.#t, e);
	}
	#n = /* @__PURE__ */ F(null);
	get selection() {
		return G(this.#n);
	}
	set selection(e) {
		I(this.#n, e, !0);
	}
	#r = /* @__PURE__ */ F("loading");
	get status() {
		return G(this.#r);
	}
	set status(e) {
		I(this.#r, e, !0);
	}
	#i = /* @__PURE__ */ F(!1);
	get dirty() {
		return G(this.#i);
	}
	set dirty(e) {
		I(this.#i, e, !0);
	}
	#a = /* @__PURE__ */ F(!1);
	get canUndo() {
		return G(this.#a);
	}
	set canUndo(e) {
		I(this.#a, e, !0);
	}
	#o = /* @__PURE__ */ F(!1);
	get canRedo() {
		return G(this.#o);
	}
	set canRedo(e) {
		I(this.#o, e, !0);
	}
	#s = /* @__PURE__ */ F(0);
	get revision() {
		return G(this.#s);
	}
	set revision(e) {
		I(this.#s, e, !0);
	}
	#c = /* @__PURE__ */ F(null);
	get publishedRevision() {
		return G(this.#c);
	}
	set publishedRevision(e) {
		I(this.#c, e, !0);
	}
	#l = /* @__PURE__ */ F(!1);
	get canPublish() {
		return G(this.#l);
	}
	set canPublish(e) {
		I(this.#l, e, !0);
	}
	#u = /* @__PURE__ */ F(!1);
	get publishing() {
		return G(this.#u);
	}
	set publishing(e) {
		I(this.#u, e, !0);
	}
	#d = /* @__PURE__ */ F(null);
	get conflictRevision() {
		return G(this.#d);
	}
	set conflictRevision(e) {
		I(this.#d, e, !0);
	}
	#f = /* @__PURE__ */ F("");
	get message() {
		return G(this.#f);
	}
	set message(e) {
		I(this.#f, e, !0);
	}
	#p = /* @__PURE__ */ F("");
	get alert() {
		return G(this.#p);
	}
	set alert(e) {
		I(this.#p, e, !0);
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
	fail(e, t = e instanceof ee ? e.code : "SERVER") {
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
}, ws = [
	"ready",
	"selection-change",
	"dirty-change",
	"save-start",
	"save-success",
	"save-error",
	"conflict",
	"publish-success",
	"publish-error"
], Ts = 0, Es = class extends HTMLElement {
	#e = null;
	#t = null;
	#n = null;
	#r = null;
	#i = null;
	#a = `cpb${++Ts}`;
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
		let t = this.shadowRoot ?? this.attachShadow({ mode: "open" }), n = new ye(e);
		for (let e of ws) n.events.on(e, (t) => {
			let n = e === "save-error" || e === "publish-error" ? { code: t.error.code } : t;
			this.dispatchEvent(new CustomEvent(e, {
				detail: n,
				bubbles: !0,
				composed: !0
			}));
		});
		let r = new Cs(n, Ss(e.locale ?? "es"));
		this.#n = n, this.#r = r, this.#t = Si(vs, {
			target: t,
			props: {
				store: r,
				uid: this.#a,
				stylesheets: e.stylesheets ?? []
			}
		}), n.load().then(() => {
			r.sync(), e.autosave !== !1 && n.capabilities?.features.autosave !== !1 && (this.#i = new me(n, {
				...ve,
				...e.autosave ?? {}
			}), this.#i.start());
		}, (e) => {
			r.sync(), r.fail(e);
		});
	}
	#s() {
		this.#i?.stop(), this.#i = null, this.#t && Ei(this.#t), this.#r?.destroy(), this.#n?.destroy(), this.#t = null, this.#r = null, this.#n = null, this.shadowRoot?.replaceChildren();
	}
}, Ds = (e = "ceiba-page-builder") => {
	customElements.get(e) || customElements.define(e, Es);
};
// src/ui/index.ts
Ds();
export { me as Autosave, Es as CeibaPageBuilder, ve as DEFAULT_AUTOSAVE, n as DEFAULT_HISTORY, oe as EDITABLE_FIELDS, ee as EditorError, ye as EditorSession, ws as PUBLIC_EVENTS, ge as REFERENCE_PROPS, h as SCHEMA_VERSION, pe as SERVER_LIMITS, Ce as afterRedo, y as afterUndo, ae as applyCommand, ce as assertDepth, Se as assertEditable, Te as assertKnown, re as assertNewContent, se as assertNodeCount, we as assertPlacement, te as assertSize, a as attachRaw, i as canRedo, r as canUndo, he as checkTree, o as childrenOf, v as createCatalogue, xe as createCommands, be as createEditor, le as createHttpTransport, Ds as defineElement, _ as depthOf, m as emptyHistory, u as emptyTree, ne as errorFromResponse, g as fail, ue as fromDocument, Ee as getNode, e as groupKeyOf, t as heightOf, x as indexInParent, _e as insertAt, s as isSelfOrDescendant, c as measureRaw, b as nodeCount, f as parseDocument, ie as randomIds, de as record, fe as sequentialIds, S as subtreeIds, p as toDocument, d as toRaw, l as withChildren, w as withNode, C as withoutNodes };

//# sourceMappingURL=ceiba-page-builder.js.map