import { $ as e, A as t, B as n, C as r, D as i, E as a, F as o, G as s, H as c, I as l, J as u, K as d, L as f, M as p, N as m, O as h, P as g, Q as _, R as v, S as y, T as b, U as x, V as S, W as C, X as w, Y as T, Z as ee, _ as E, a as te, at as ne, b as re, c as ie, ct as ae, d as oe, dt as se, et as ce, f as le, ft as ue, g as de, gt as fe, h as pe, ht as me, i as he, it as ge, j as _e, k as ve, l as ye, lt as be, m as xe, mt as Se, n as Ce, nt as we, o as Te, ot as Ee, p as De, pt as Oe, q as ke, r as Ae, rt as je, s as Me, st as Ne, t as Pe, tt as Fe, u as Ie, ut as Le, v as Re, w as ze, x as Be, y as Ve, z as He } from "./shared/core.js";
// node_modules/svelte/src/internal/shared/utils.js
var Ue = Array.isArray, We = Array.prototype.indexOf, Ge = Array.prototype.includes, Ke = Array.from, qe = Object.defineProperty, Je = Object.getOwnPropertyDescriptor, Ye = Object.getOwnPropertyDescriptors, Xe = Object.prototype, Ze = Array.prototype, Qe = Object.getPrototypeOf, $e = Object.isExtensible, et = () => {};
function tt(e) {
	for (var t = 0; t < e.length; t++) e[t]();
}
function nt() {
	var e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
function rt(e, t) {
	if (Array.isArray(e)) return e;
	if (t === void 0 || !(Symbol.iterator in e)) return Array.from(e);
	let n = [];
	for (let r of e) if (n.push(r), n.length === t) break;
	return n;
}
var it = 1024, at = 2048, ot = 4096, st = 8192, ct = 16384, lt = 32768, ut = 1 << 25, dt = 65536, ft = 1 << 19, pt = 1 << 20, mt = 1 << 25, ht = 65536, gt = 1 << 21, _t = 1 << 22, vt = 1 << 23, yt = Symbol("$state"), bt = Symbol("legacy props"), xt = Symbol(""), St = Symbol("attributes"), Ct = Symbol("class"), wt = Symbol("style"), Tt = Symbol("text"), Et = Symbol("form reset"), Dt = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), Ot = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
// node_modules/svelte/src/internal/client/errors.js
function kt() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function At(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function jt(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function Mt() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Nt(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function Pt() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Ft(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function It() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Lt() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function Rt() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function zt() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
// node_modules/svelte/src/constants.js
var Bt = {}, D = Symbol("uninitialized"), Vt = "http://www.w3.org/1999/xhtml";
function Ht() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function Ut(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function Wt() {
	console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function Gt() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
// node_modules/svelte/src/internal/client/dom/hydration.js
var O = !1;
function Kt(e) {
	O = e;
}
var k;
function qt(e) {
	if (e === null) throw Ut(), Bt;
	return k = e;
}
function Jt() {
	return qt(/* @__PURE__ */ _r(k));
}
function A(e) {
	if (O) {
		if (/* @__PURE__ */ _r(k) !== null) throw Ut(), Bt;
		k = e;
	}
}
function Yt(e = 1) {
	if (O) {
		for (var t = e, n = k; t--;) n = /* @__PURE__ */ _r(n);
		k = n;
	}
}
function Xt(e = !0) {
	for (var t = 0, n = k;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ _r(n);
		e && n.remove(), n = i;
	}
}
function Zt(e) {
	if (!e || e.nodeType !== 8) throw Ut(), Bt;
	return e.data;
}
// node_modules/svelte/src/internal/client/reactivity/equality.js
function Qt(e) {
	return e === this.v;
}
function $t(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function en(e) {
	return !$t(e, this.v);
}
// node_modules/svelte/src/internal/client/context.js
var tn = null;
function nn(e) {
	tn = e;
}
function j(e, t = !1, n) {
	tn = {
		p: tn,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: H,
		l: null
	};
}
function M(e) {
	var t = tn, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) Pr(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, tn = t.p, e ?? {};
}
function rn() {
	return !0;
}
// node_modules/svelte/src/internal/client/dom/task.js
var an = [];
function on() {
	var e = an;
	an = [], tt(e);
}
function sn(e) {
	if (an.length === 0 && !xn) {
		var t = an;
		queueMicrotask(() => {
			t === an && on();
		});
	}
	an.push(e);
}
function cn() {
	for (; an.length > 0;) on();
}
function ln(e) {
	var t = H;
	if (t === null) return V.f |= vt, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	un(e, t);
}
function un(e, t) {
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
var dn = ~(at | ot | it);
function N(e, t) {
	e.f = e.f & dn | t;
}
function fn(e) {
	e.f & 512 || e.deps === null ? N(e, it) : N(e, ot);
}
// node_modules/svelte/src/internal/client/reactivity/utils.js
function pn(e) {
	if (e !== null) for (let t of e) t.f & 2 && t.f & 65536 && (t.f ^= ht, pn(t.deps));
}
function mn(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), pn(e.deps), N(e, it);
}
// node_modules/svelte/src/internal/client/reactivity/store.js
var hn = !1;
function gn(e) {
	var t = hn;
	try {
		return hn = !1, [e(), hn];
	} finally {
		hn = t;
	}
}
// node_modules/svelte/src/internal/client/reactivity/batch.js
var _n = null, P = null, vn = null, yn = null, bn = null, xn = !1, Sn = !1, Cn = null, wn = null, Tn = 0, En = 1, Dn = class e {
	id = En++;
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
			for (var r of n.d) N(r, at), t(r);
			for (r of n.m) N(r, ot), t(r);
		}
		this.#m.add(e);
	}
	#_() {
		if (this.#e = !0, Tn++ > 1e3 && (this.#C(), kn()), !this.#g()) {
			for (let e of this.#d) this.#f.delete(e), N(e, at), this.schedule(e);
			for (let e of this.#f) N(e, ot), this.schedule(e);
		}
		let t = this.#l;
		this.#l = [], this.apply();
		var n = Cn = [], r = [], i = wn = [];
		for (let e of t) try {
			this.#v(e, n, r);
		} catch (t) {
			throw Pn(e), t;
		}
		if (P = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (Cn = null, wn = null, this.#g()) {
			this.#x(r), this.#x(n);
			for (let [e, t] of this.#p) Nn(e, t);
			i.length > 0 && P.#_();
			return;
		}
		let o = this.#y();
		if (o) o.#b(this);
		else {
			this.#d.clear(), this.#f.clear();
			for (let e of this.#r) e(this);
			this.#r.clear(), vn = this, jn(r), jn(n), vn = null, this.#c?.resolve();
			var s = P;
			if (this.linked && this.#o === 0 && this.#C(), this.#l.length > 0) {
				s === null && (s = this, this.#S());
				let e = s;
				e.#l.push(...this.#l.filter((t) => !e.#l.includes(t)));
			}
			s !== null && s.#_();
		}
	}
	#v(e, t, n) {
		e.f ^= it;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#p.has(r)) && r.fn !== null) {
				a ? r.f ^= it : i & 4 ? t.push(r) : gi(r) && (i & 16 && this.#f.add(r), xi(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#f.delete(i), N(i, at), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#C(), P = this, this.#_();
	}
	#x(e) {
		for (var t = 0; t < e.length; t += 1) mn(e[t], this.#d, this.#f);
	}
	capture(e, t, n = !1) {
		e.v !== D && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), yn?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		P = this;
	}
	deactivate() {
		P = null, yn = null;
	}
	flush() {
		try {
			Sn = !0, P = this, this.#_();
		} finally {
			Tn = 0, bn = null, Cn = null, wn = null, Sn = !1, P = null, yn = null, $n.clear();
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
		this.#h || (this.#h = !0, sn(() => {
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
		return (this.#c ??= nt()).promise;
	}
	static ensure() {
		if (P === null) {
			let t = P = new e();
			t.#S(), !Sn && !xn && sn(() => {
				t.#e || t.flush();
			});
		}
		return P;
	}
	apply() {
		yn = null;
	}
	schedule(e) {
		if (bn = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) e.b.defer_effect(e);
		else {
			for (var t = e; t.parent !== null;) {
				t = t.parent;
				var n = t.f;
				if (Cn !== null && t === H && (V === null || !(V.f & 2))) return;
				if (n & 96) {
					if (!(n & 1024)) return;
					t.f ^= it;
				}
			}
			this.#l.push(t);
		}
	}
	#S() {
		_n === null ? _n = this : (_n.#n = this, this.#t = _n), _n = this;
	}
	#C() {
		var e = this.#t, t = this.#n;
		e === null || (e.#n = t), t === null ? _n = e : t.#t = e, this.linked = !1;
	}
};
function On(e) {
	var t = xn;
	xn = !0;
	try {
		var n;
		for (e && (P !== null && !P.is_fork && P.flush(), n = e());;) {
			if (cn(), P === null) return n;
			P.flush();
		}
	} finally {
		xn = t;
	}
}
function kn() {
	try {
		Pt();
	} catch (e) {
		un(e, bn);
	}
}
var An = null;
function jn(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && gi(r) && (An = /* @__PURE__ */ new Set(), xi(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Kr(r), An?.size > 0)) {
				$n.clear();
				for (let e of An) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) An.has(n) && (An.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || xi(n);
					}
				}
				An.clear();
			}
		}
		An = null;
	}
}
function Mn(e) {
	P.schedule(e);
}
function Nn(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), N(e, it);
		for (var n = e.first; n !== null;) Nn(n, t), n = n.next;
	}
}
function Pn(e) {
	N(e, it);
	for (var t = e.first; t !== null;) Pn(t), t = t.next;
}
// node_modules/svelte/src/reactivity/create-subscriber.js
function Fn(e) {
	let t = 0, n = tr(0), r;
	return () => {
		jr() && (U(n), Rr(() => (t === 0 && (r = Ti(() => e(() => ar(n)))), t += 1, () => {
			sn(() => {
				--t, t === 0 && (r?.(), r = void 0, ar(n));
			});
		})));
	};
}
// node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var In = dt | ft;
function Ln(e, t, n, r) {
	new Rn(e, t, n, r);
}
var Rn = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = O ? k : null;
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
	#h = Fn(() => (this.#m = tr(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = H;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = H.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = zr(() => {
			if (O) {
				let e = this.#t;
				Jt();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, In), O && (this.#e = k);
	}
	#g() {
		try {
			this.#a = Br(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed;
		t && (this.#s = Br(() => {
			t(this.#e, () => e, () => () => {});
		}));
	}
	#v() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = Br(() => e(this.#e)), sn(() => {
			var e = this.#c = document.createDocumentFragment(), t = hr();
			e.append(t), this.#a = this.#x(() => Br(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, qr(this.#o, () => {
				this.#o = null;
			}), this.#b(P));
		}));
	}
	#y() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = Br(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				Zr(this.#a, e);
				let t = this.#n.pending;
				this.#o = Br(() => t(this.#e));
			} else this.#b(P);
		} catch (e) {
			this.error(e);
		}
	}
	#b(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		mn(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#x(e) {
		var t = H, n = V, r = tn;
		ii(this.#i), ri(this.#i), nn(this.#i.ctx);
		try {
			return Dn.ensure(), e();
		} catch (e) {
			return ln(e), null;
		} finally {
			ii(t), ri(n), nn(r);
		}
	}
	#S(e, t) {
		this.has_pending_snippet() ? (this.#u += e, this.#u === 0 && (this.#b(t), this.#o && qr(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null))) : this.parent && this.parent.#S(e, t);
	}
	update_pending_count(e, t) {
		this.#S(e, t), this.#l += e, !this.#m || this.#d || (this.#d = !0, sn(() => {
			this.#d = !1, this.#m && rr(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), U(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		P?.is_fork ? (this.#a && P.skip_effect(this.#a), this.#o && P.skip_effect(this.#o), this.#s && P.skip_effect(this.#s), P.on_fork_commit(() => {
			this.#C(e);
		})) : this.#C(e);
	}
	#C(e) {
		this.#a &&= (Wr(this.#a), null), this.#o &&= (Wr(this.#o), null), this.#s &&= (Wr(this.#s), null), O && (qt(this.#t), Yt(), qt(Xt()));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var r = !1, i = !1;
		let a = () => {
			r ? Gt() : (r = !0, i && zt(), this.#s !== null && qr(this.#s, () => {
				this.#s = null;
			}), this.#x(() => {
				this.#y();
			}));
		}, o = (e) => {
			try {
				i = !0, t?.(e, a), i = !1;
			} catch (e) {
				un(e, this.#i && this.#i.parent);
			}
			n && (this.#s = this.#x(() => {
				try {
					return Br(() => {
						var t = H;
						t.b = this, t.f |= 128, n(this.#e, () => e, () => a);
					});
				} catch (e) {
					return un(e, this.#i.parent), null;
				}
			}));
		};
		sn(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				un(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(o, (e) => un(e, this.#i && this.#i.parent)) : o(t);
		});
	}
};
// node_modules/svelte/src/internal/client/reactivity/async.js
function zn(e, t, n, r) {
	let i = rn() ? Un : Kn;
	var a = e.filter((e) => !e.settled);
	if (n.length === 0 && a.length === 0) {
		r(t.map(i));
		return;
	}
	var o = H, s = Bn(), c = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function l(e) {
		if (!(o.f & 16384)) {
			s();
			try {
				r(e);
			} catch (e) {
				un(e, o);
			}
			Vn();
		}
	}
	var u = Hn();
	if (n.length === 0) {
		c.then(() => l(t.map(i))).finally(u);
		return;
	}
	function d() {
		Promise.all(n.map((e) => /* @__PURE__ */ Gn(e))).then((e) => l([...t.map(i), ...e])).catch((e) => un(e, o)).finally(u);
	}
	c ? c.then(() => {
		s(), d(), Vn();
	}) : d();
}
function Bn() {
	var e = H, t = V, n = tn, r = P;
	return function(i = !0) {
		ii(e), ri(t), nn(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function Vn(e = !0) {
	ii(null), ri(null), nn(null), e && P?.deactivate();
}
function Hn() {
	var e = H, t = e.b, n = P, r = t.is_rendered();
	return t.update_pending_count(1, n), n.increment(r, e), () => {
		t.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function Un(e) {
	var t = 2 | at;
	return H !== null && (H.f |= ft), {
		ctx: tn,
		deps: null,
		effects: null,
		equals: Qt,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: D,
		wv: 0,
		parent: H,
		ac: null
	};
}
var Wn = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function Gn(e, t, n) {
	let r = H;
	r === null && kt();
	var i = void 0, a = tr(D), o = !V, s = /* @__PURE__ */ new Set();
	return Lr(() => {
		var t = H, n = nt();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== Dt && n.reject(e);
			}).finally(Vn);
		} catch (e) {
			n.reject(e), Vn();
		}
		var c = P;
		if (o) {
			if (t.f & 32768) var l = Hn();
			if (r.b.is_rendered()) c.async_deriveds.get(t)?.reject(Wn);
			else for (let e of s.values()) e.reject(Wn);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== Wn && (c.activate(), t ? (a.f |= vt, rr(a, t)) : (a.f & 8388608 && (a.f ^= vt), rr(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), Mr(() => {
		for (let e of s) e.reject(Wn);
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
function F(e) {
	let t = /* @__PURE__ */ Un(e);
	return oi(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function Kn(e) {
	let t = /* @__PURE__ */ Un(e);
	return t.equals = en, t;
}
function qn(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) Wr(t[n]);
	}
}
function Jn(e) {
	var t, n = H, r = e.parent;
	if (!ei && r !== null && e.v !== D && r.f & 24576) return Ht(), e.v;
	ii(r);
	try {
		e.f &= ~ht, qn(e), t = vi(e);
	} finally {
		ii(n);
	}
	return t;
}
function Yn(e) {
	var t = Jn(e);
	!e.equals(t) && (e.wv = hi(), (!P?.is_fork || e.deps === null) && (P === null ? e.v = t : (P.capture(e, t, !0), vn?.capture(e, t, !0)), e.deps === null)) ? N(e, it) : ei || (yn === null ? fn(e) : (jr() || P?.is_fork) && yn.set(e, t));
}
function Xn(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac?.abort(Dt), t.fn !== null && (t.teardown = et), t.ac = null, bi(t, 0), Hr(t));
}
function Zn(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && xi(t);
}
// node_modules/svelte/src/internal/client/reactivity/sources.js
var Qn = /* @__PURE__ */ new Set(), $n = /* @__PURE__ */ new Map(), er = !1;
function tr(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: Qt,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function I(e, t) {
	let n = tr(e, t);
	return oi(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function nr(e, t = !1, n = !0) {
	let r = tr(e);
	return t || (r.equals = en), r;
}
function L(e, t, n = !1) {
	return V !== null && (!ni || V.f & 131072) && rn() && V.f & 4325394 && (ai === null || !Ge.call(ai, e)) && Rt(), rr(e, n ? sr(t) : t, wn);
}
function rr(e, t, n = null) {
	if (!e.equals(t)) {
		$n.set(e, ei ? t : e.v);
		var r = Dn.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && Jn(t), yn === null && fn(t);
		}
		e.wv = hi(), or(e, at, n), rn() && H !== null && H.f & 1024 && !(H.f & 96) && (li === null ? ui([e]) : li.push(e)), !r.is_fork && Qn.size > 0 && !er && ir();
	}
	return t;
}
function ir() {
	er = !1;
	for (let e of Qn) {
		e.f & 1024 && N(e, ot);
		let t;
		try {
			t = gi(e);
		} catch {
			t = !0;
		}
		t && xi(e);
	}
	Qn.clear();
}
function ar(e) {
	L(e, e.v + 1);
}
function or(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = rn(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (i || s !== H) {
			var l = (c & at) === 0;
			if (l && N(s, t), c & 131072) Qn.add(s);
			else if (c & 2) {
				var u = s;
				yn?.delete(u), c & 65536 || (c & 512 && (H === null || !(H.f & 2097152)) && (s.f |= ht), or(u, ot, n));
			} else if (l) {
				var d = s;
				c & 16 && An !== null && An.add(d), n === null ? Mn(d) : n.push(d);
			}
		}
	}
}
function sr(e) {
	if (typeof e != "object" || !e || yt in e) return e;
	let t = Qe(e);
	if (t !== Xe && t !== Ze) return e;
	var n = /* @__PURE__ */ new Map(), r = Ue(e), i = /* @__PURE__ */ I(0), a = null, o = pi, s = (e) => {
		if (pi === o) return e();
		var t = V, n = pi;
		ri(null), mi(o);
		var r = e();
		return ri(t), mi(n), r;
	};
	return r && n.set("length", /* @__PURE__ */ I(e.length, a)), new Proxy(e, {
		defineProperty(e, t, r) {
			"value" in r && r.configurable !== !1 && r.enumerable !== !1 && r.writable !== !1 || It();
			var i = n.get(t);
			return i === void 0 ? s(() => {
				var e = /* @__PURE__ */ I(r.value, a);
				return n.set(t, e), e;
			}) : L(i, r.value, !0), !0;
		},
		deleteProperty(e, t) {
			var r = n.get(t);
			if (r === void 0) {
				if (t in e) {
					let e = s(() => /* @__PURE__ */ I(D, a));
					n.set(t, e), ar(i);
				}
			} else L(r, D), ar(i);
			return !0;
		},
		get(t, r, i) {
			if (r === yt) return e;
			var o = n.get(r), c = r in t;
			if (o === void 0 && (!c || Je(t, r)?.writable) && (o = s(() => /* @__PURE__ */ I(sr(c ? t[r] : D), a)), n.set(r, o)), o !== void 0) {
				var l = U(o);
				return l === D ? void 0 : l;
			}
			return Reflect.get(t, r, i);
		},
		getOwnPropertyDescriptor(e, t) {
			var r = Reflect.getOwnPropertyDescriptor(e, t);
			if (r && "value" in r) {
				var i = n.get(t);
				i && (r.value = U(i));
			} else if (r === void 0) {
				var a = n.get(t), o = a?.v;
				if (a !== void 0 && o !== D) return {
					enumerable: !0,
					configurable: !0,
					value: o,
					writable: !0
				};
			}
			return r;
		},
		has(e, t) {
			if (t === yt) return !0;
			var r = n.get(t), i = r !== void 0 && r.v !== D || Reflect.has(e, t);
			return (r !== void 0 || H !== null && (!i || Je(e, t)?.writable)) && (r === void 0 && (r = s(() => /* @__PURE__ */ I(i ? sr(e[t]) : D, a)), n.set(t, r)), U(r) === D) ? !1 : i;
		},
		set(e, t, o, c) {
			var l = n.get(t), u = t in e;
			if (r && t === "length") for (var d = o; d < l.v; d += 1) {
				var f = n.get(d + "");
				f === void 0 ? d in e && (f = s(() => /* @__PURE__ */ I(D, a)), n.set(d + "", f)) : L(f, D);
			}
			if (l === void 0) (!u || Je(e, t)?.writable) && (l = s(() => /* @__PURE__ */ I(void 0, a)), L(l, sr(o)), n.set(t, l));
			else {
				u = l.v !== D;
				var p = s(() => sr(o));
				L(l, p);
			}
			var m = Reflect.getOwnPropertyDescriptor(e, t);
			if (m?.set && m.set.call(c, o), !u) {
				if (r && typeof t == "string") {
					var h = n.get("length"), g = Number(t);
					Number.isInteger(g) && g >= h.v && L(h, g + 1);
				}
				ar(i);
			}
			return !0;
		},
		ownKeys(e) {
			U(i);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = n.get(e);
				return t === void 0 || t.v !== D;
			});
			for (var [r, a] of n) a.v !== D && !(r in e) && t.push(r);
			return t;
		},
		setPrototypeOf() {
			Lt();
		}
	});
}
function cr(e) {
	try {
		if (typeof e == "object" && e && yt in e) return e[yt];
	} catch {}
	return e;
}
function lr(e, t) {
	return Object.is(cr(e), cr(t));
}
var ur, dr, fr, pr;
function mr() {
	if (ur === void 0) {
		ur = window, dr = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		fr = Je(t, "firstChild").get, pr = Je(t, "nextSibling").get, $e(e) && (e[Ct] = void 0, e[St] = null, e[wt] = void 0, e.__e = void 0), $e(n) && (n[Tt] = void 0);
	}
}
function hr(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function gr(e) {
	return fr.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function _r(e) {
	return pr.call(e);
}
function R(e, t) {
	if (!O) return /* @__PURE__ */ gr(e);
	var n = /* @__PURE__ */ gr(k);
	if (n === null) n = k.appendChild(hr());
	else if (t && n.nodeType !== 3) {
		var r = hr();
		return n?.before(r), qt(r), r;
	}
	return t && Sr(n), qt(n), n;
}
function vr(e, t = !1) {
	if (!O) {
		var n = /* @__PURE__ */ gr(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ _r(n) : n;
	}
	if (t) {
		if (k?.nodeType !== 3) {
			var r = hr();
			return k?.before(r), qt(r), r;
		}
		Sr(k);
	}
	return k;
}
function z(e, t = 1, n = !1) {
	let r = O ? k : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ _r(r);
	if (!O) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = hr();
			return r === null ? i?.after(a) : r.before(a), qt(a), a;
		}
		Sr(r);
	}
	return qt(r), r;
}
function yr(e) {
	e.textContent = "";
}
function br() {
	return !1;
}
function xr(e, t, n) {
	let r = n ? { is: n } : void 0;
	return document.createElementNS(t ?? "http://www.w3.org/1999/xhtml", e, r);
}
function Sr(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
// node_modules/svelte/src/internal/client/dom/elements/misc.js
function Cr(e) {
	O && /* @__PURE__ */ gr(e) !== null && yr(e);
}
var wr = !1;
function Tr() {
	wr || (wr = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[Et]?.();
		});
	}, { capture: !0 }));
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function Er(e) {
	var t = V, n = H;
	ri(null), ii(null);
	try {
		return e();
	} finally {
		ri(t), ii(n);
	}
}
function Dr(e, t, n, r = n) {
	e.addEventListener(t, () => Er(n));
	let i = e[Et];
	e[Et] = i ? () => {
		i(), r(!0);
	} : () => r(!0), Tr();
}
// node_modules/svelte/src/internal/client/reactivity/effects.js
function Or(e) {
	H === null && (V === null && Nt(e), Mt()), ei && jt(e);
}
function kr(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function Ar(e, t) {
	var n = H;
	n !== null && n.f & 8192 && (e |= st);
	var r = {
		ctx: tn,
		deps: null,
		nodes: null,
		f: e | at | 512,
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
	P?.register_created_effect(r);
	var i = r;
	if (e & 4) Cn === null ? Dn.ensure().schedule(r) : Cn.push(r);
	else if (t !== null) {
		try {
			xi(r);
		} catch (e) {
			throw Wr(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= dt));
	}
	if (i !== null && (i.parent = n, n !== null && kr(i, n), V !== null && V.f & 2 && !(e & 64))) {
		var a = V;
		(a.effects ??= []).push(i);
	}
	return r;
}
function jr() {
	return V !== null && !ni;
}
function Mr(e) {
	let t = Ar(8, null);
	return N(t, it), t.teardown = e, t;
}
function Nr(e) {
	Or("$effect");
	var t = H.f;
	if (!V && t & 32 && !(t & 32768)) {
		var n = tn;
		(n.e ??= []).push(e);
	} else return Pr(e);
}
function Pr(e) {
	return Ar(4 | pt, e);
}
function Fr(e) {
	Dn.ensure();
	let t = Ar(64 | ft, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? qr(t, () => {
			Wr(t), n(void 0);
		}) : (Wr(t), n(void 0));
	});
}
function Ir(e) {
	return Ar(4, e);
}
function Lr(e) {
	return Ar(_t | ft, e);
}
function Rr(e, t = 0) {
	return Ar(8 | t, e);
}
function B(e, t = [], n = [], r = []) {
	zn(r, t, n, (t) => {
		Ar(8, () => e(...t.map(U)));
	});
}
function zr(e, t = 0) {
	return Ar(16 | t, e);
}
function Br(e) {
	return Ar(32 | ft, e);
}
function Vr(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = ei, n = V;
		ti(!0), ri(null);
		try {
			t.call(null);
		} finally {
			ti(e), ri(n);
		}
	}
}
function Hr(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && Er(() => {
			e.abort(Dt);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : Wr(n, t), n = r;
	}
}
function Ur(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || Wr(t), t = n;
	}
}
function Wr(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Gr(e.nodes.start, e.nodes.end), n = !0), N(e, ut), Hr(e, t && !n), bi(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	Vr(e), e.f ^= ut, e.f |= ct;
	var i = e.parent;
	i !== null && i.first !== null && Kr(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Gr(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ _r(e);
		e.remove(), e = n;
	}
}
function Kr(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function qr(e, t, n = !0) {
	var r = [];
	Jr(e, r, !0);
	var i = () => {
		n && Wr(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Jr(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= st;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				Jr(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function Yr(e) {
	Xr(e, !0);
}
function Xr(e, t) {
	if (e.f & 8192) {
		e.f ^= st, e.f & 1024 || (N(e, at), Dn.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			Xr(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function Zr(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ _r(n);
		t.append(n), n = i;
	}
}
// node_modules/svelte/src/internal/client/legacy.js
var Qr = null, $r = !1, ei = !1;
function ti(e) {
	ei = e;
}
var V = null, ni = !1;
function ri(e) {
	V = e;
}
var H = null;
function ii(e) {
	H = e;
}
var ai = null;
function oi(e) {
	V !== null && (ai === null ? ai = [e] : ai.push(e));
}
var si = null, ci = 0, li = null;
function ui(e) {
	li = e;
}
var di = 1, fi = 0, pi = fi;
function mi(e) {
	pi = e;
}
function hi() {
	return ++di;
}
function gi(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~ht), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (gi(a) && Yn(a), a.wv > e.wv) return !0;
		}
		t & 512 && yn === null && N(e, it);
	}
	return !1;
}
function _i(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(ai !== null && Ge.call(ai, e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? _i(a, t, !1) : t === a && (n ? N(a, at) : a.f & 1024 && N(a, ot), Mn(a));
	}
}
function vi(e) {
	var t = si, n = ci, r = li, i = V, a = ai, o = tn, s = ni, c = pi, l = e.f;
	si = null, ci = 0, li = null, V = l & 96 ? null : e, ai = null, nn(e.ctx), ni = !1, pi = ++fi, e.ac !== null && (Er(() => {
		e.ac.abort(Dt);
	}), e.ac = null);
	try {
		e.f |= gt;
		var u = e.fn, d = u();
		e.f |= lt;
		var f = e.deps, p = P?.is_fork;
		if (si !== null) {
			var m;
			if (p || bi(e, ci), f !== null && ci > 0) for (f.length = ci + si.length, m = 0; m < si.length; m++) f[ci + m] = si[m];
			else e.deps = f = si;
			if (jr() && e.f & 512) for (m = ci; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && ci < f.length && (bi(e, ci), f.length = ci);
		if (rn() && li !== null && !ni && f !== null && !(e.f & 6146)) for (m = 0; m < li.length; m++) _i(li[m], e);
		if (i !== null && i !== e) {
			if (fi++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = fi;
			if (t !== null) for (let e of t) e.rv = fi;
			li !== null && (r === null ? r = li : r.push(...li));
		}
		return e.f & 8388608 && (e.f ^= vt), d;
	} catch (e) {
		return ln(e);
	} finally {
		e.f ^= gt, si = t, ci = n, li = r, V = i, ai = a, nn(o), ni = s, pi = c;
	}
}
function yi(e, t) {
	let n = t.reactions;
	if (n !== null) {
		var r = We.call(n, e);
		if (r !== -1) {
			var i = n.length - 1;
			i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
		}
	}
	if (n === null && t.f & 2 && (si === null || !Ge.call(si, t))) {
		var a = t;
		a.f & 512 && (a.f ^= 512, a.f &= ~ht), a.v !== D && fn(a), Xn(a), bi(a, 0);
	}
}
function bi(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) yi(e, n[r]);
}
function xi(e) {
	var t = e.f;
	if (!(t & 16384)) {
		N(e, it);
		var n = H, r = $r;
		H = e, $r = !0;
		try {
			t & 16777232 ? Ur(e) : Hr(e), Vr(e);
			var i = vi(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = di;
		} finally {
			$r = r, H = n;
		}
	}
}
async function Si() {
	await Promise.resolve(), On();
}
function U(e) {
	var t = !!(e.f & 2);
	if (Qr?.add(e), V !== null && !ni && !(H !== null && H.f & 16384) && (ai === null || !Ge.call(ai, e))) {
		var n = V.deps;
		if (V.f & 2097152) e.rv < fi && (e.rv = fi, si === null && n !== null && n[ci] === e ? ci++ : si === null ? si = [e] : si.push(e));
		else {
			V.deps ??= [], Ge.call(V.deps, e) || V.deps.push(e);
			var r = e.reactions;
			r === null ? e.reactions = [V] : Ge.call(r, V) || r.push(V);
		}
	}
	if (ei && $n.has(e)) return $n.get(e);
	if (t) {
		var i = e;
		if (ei) {
			var a = i.v;
			return (!(i.f & 1024) && i.reactions !== null || wi(i)) && (a = Jn(i)), $n.set(i, a), a;
		}
		var o = !(i.f & 512) && !ni && V !== null && ($r || !!(V.f & 512)), s = (i.f & lt) === 0;
		gi(i) && (o && (i.f |= 512), Yn(i)), o && !s && (Zn(i), Ci(i));
	}
	if (yn?.has(e)) return yn.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function Ci(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (Zn(t), Ci(t));
}
function wi(e) {
	if (e.v === D) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if ($n.has(t) || t.f & 2 && wi(t)) return !0;
	return !1;
}
function Ti(e) {
	var t = ni;
	try {
		return ni = !0, e();
	} finally {
		ni = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var Ei = ["touchstart", "touchmove"];
function Di(e) {
	return Ei.includes(e);
}
// node_modules/svelte/src/internal/client/dev/css.js
var Oi = Symbol("events"), ki = /* @__PURE__ */ new Set(), Ai = /* @__PURE__ */ new Set();
function ji(e) {
	if (!O) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function Mi(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Fi.call(t, e), !e.cancelBubble) return Er(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? sn(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function Ni(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = Mi(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && Mr(() => {
		t.removeEventListener(e, o, a);
	});
}
function W(e, t, n) {
	(t[Oi] ??= {})[e] = n;
}
function G(e) {
	for (var t = 0; t < e.length; t++) ki.add(e[t]);
	for (var n of Ai) n(e);
}
var Pi = null;
function Fi(e) {
	var t = this, n = t.ownerDocument, r = e.type, i = e.composedPath?.() || [], a = i[0] || e.target;
	Pi = e;
	var o = 0, s = Pi === e && e[Oi];
	if (s) {
		var c = i.indexOf(s);
		if (c !== -1 && (t === document || t === window)) {
			e[Oi] = t;
			return;
		}
		var l = i.indexOf(t);
		if (l === -1) return;
		c <= l && (o = c);
	}
	if (a = i[o] || e.target, a !== t) {
		qe(e, "currentTarget", {
			configurable: !0,
			get() {
				return a || n;
			}
		});
		var u = V, d = H;
		ri(null), ii(null);
		try {
			for (var f, p = []; a !== null;) {
				var m = a.assignedSlot || a.parentNode || a.host || null;
				try {
					var h = a[Oi]?.[r];
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
			e[Oi] = t, delete e.currentTarget, ri(u), ii(d);
		}
	}
}
// node_modules/svelte/src/internal/client/dom/reconciler.js
var Ii = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function Li(e) {
	return Ii?.createHTML(e) ?? e;
}
function Ri(e) {
	var t = xr("template");
	return t.innerHTML = Li(e.replaceAll("<!>", "<!---->")), t.content;
}
// node_modules/svelte/src/internal/client/dom/template.js
function zi(e, t) {
	var n = H;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function K(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (O) return zi(k, null), k;
		i === void 0 && (i = Ri(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ gr(i)));
		var t = r || dr ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ gr(t), s = t.lastChild;
			zi(o, s);
		} else zi(t, t);
		return t;
	};
}
function Bi(e = "") {
	if (!O) {
		var t = hr(e + "");
		return zi(t, t), t;
	}
	var n = k;
	return n.nodeType === 3 ? Sr(n) : (n.before(n = hr()), qt(n)), zi(n, n), n;
}
function Vi() {
	if (O) return zi(k, null), k;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = hr();
	return e.append(t, n), zi(t, n), e;
}
function q(e, t) {
	if (O) {
		var n = H;
		n.f & 32768 && n.nodes.end !== null || (n.nodes.end = k), Jt();
	} else e !== null && e.before(t);
}
function J(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[Tt] ??= e.nodeValue) && (e[Tt] = n, e.nodeValue = `${n}`);
}
function Hi(e, t) {
	return Wi(e, t);
}
var Ui = /* @__PURE__ */ new Map();
function Wi(e, { target: t, anchor: n, props: r = {}, events: i, context: a, intro: o = !0, transformError: s }) {
	mr();
	var c = void 0, l = Fr(() => {
		var o = n ?? t.appendChild(hr());
		Ln(o, { pending: () => {} }, (t) => {
			j({});
			var n = tn;
			if (a && (n.c = a), i && (r.$$events = i), O && zi(t, null), c = e(t, r) || {}, O && (H.nodes.end = k, k === null || k.nodeType !== 8 || k.data !== "]")) throw Ut(), Bt;
			M();
		}, s);
		var l = /* @__PURE__ */ new Set(), u = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!l.has(r)) {
					l.add(r);
					var i = Di(r);
					for (let e of [t, document]) {
						var a = Ui.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Ui.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Fi, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return u(Ke(ki)), Ai.add(u), () => {
			for (var e of l) for (let n of [t, document]) {
				var r = Ui.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Fi), r.delete(e), r.size === 0 && Ui.delete(n)) : r.set(e, i);
			}
			Ai.delete(u), o !== n && o.parentNode?.removeChild(o);
		};
	});
	return Gi.set(c, l), c;
}
var Gi = /* @__PURE__ */ new WeakMap();
function Ki(e, t) {
	let n = Gi.get(e);
	return n ? (Gi.delete(e), n(t)) : Promise.resolve();
}
// node_modules/svelte/src/internal/client/dom/blocks/branches.js
var qi = class {
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
			if (n) Yr(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (Wr(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						Zr(r, t), t.append(hr()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else Wr(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), qr(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (Wr(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = P, r = br();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = hr();
				i.append(a), this.#n.set(e, {
					effect: Br(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, Br(() => t(this.anchor)));
		}
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else O && (this.anchor = k), this.#a(n);
	}
};
// node_modules/svelte/src/internal/client/dom/blocks/if.js
function Y(e, t, n = !1) {
	var r;
	O && (r = k, Jt());
	var i = new qi(e), a = n ? dt : 0;
	function o(e, t) {
		if (O) {
			var n = Zt(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Xt();
				qt(a), i.anchor = a, Kt(!1), i.ensure(e, t), Kt(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	zr(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
// node_modules/svelte/src/internal/client/dom/blocks/key.js
var Ji = Symbol("NaN");
function Yi(e, t, n) {
	O && Jt();
	var r = new qi(e), i = !rn();
	zr(() => {
		var e = t();
		e !== e && (e = Ji), i && typeof e == "object" && e && (e = {}), r.ensure(e, n);
	});
}
// node_modules/svelte/src/internal/client/dom/blocks/each.js
function Xi(e, t, n) {
	for (var r = [], i = t.length, a, o = t.length, s = 0; s < i; s++) {
		let n = t[s];
		qr(n, () => {
			if (a) {
				if (a.pending.delete(n), a.done.add(n), a.pending.size === 0) {
					var t = e.outrogroups;
					Zi(e, Ke(a.done)), t.delete(a), t.size === 0 && (e.outrogroups = null);
				}
			} else --o;
		}, !1);
	}
	if (o === 0) {
		var c = r.length === 0 && n !== null;
		if (c) {
			var l = n, u = l.parentNode;
			yr(u), u.append(l), e.items.clear();
		}
		Zi(e, t, !c);
	} else a = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(a);
}
function Zi(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= mt, Zr(a, document.createDocumentFragment())) : Wr(t[i], n);
	}
}
var Qi;
function X(e, t, n, r, i, a = null) {
	var o = e, s = /* @__PURE__ */ new Map();
	if (t & 4) {
		var c = e;
		o = O ? qt(/* @__PURE__ */ gr(c)) : c.appendChild(hr());
	}
	O && Jt();
	var l = null, u = /* @__PURE__ */ Kn(() => {
		var e = n();
		return Ue(e) ? e : e == null ? [] : Ke(e);
	}), d, f = /* @__PURE__ */ new Map(), p = !0;
	function m(e) {
		g.effect.f & 16384 || (g.pending.delete(e), g.fallback = l, ea(g, d, o, t, r), l !== null && (d.length === 0 ? l.f & 33554432 ? (l.f ^= mt, na(l, null, o)) : Yr(l) : qr(l, () => {
			l = null;
		})));
	}
	function h(e) {
		g.pending.delete(e);
	}
	var g = {
		effect: zr(() => {
			d = U(u);
			var e = d.length;
			let c = !1;
			O && Zt(o) === "[!" != (e === 0) && (o = Xt(), qt(o), Kt(!1), c = !0);
			for (var g = /* @__PURE__ */ new Set(), _ = P, v = br(), y = 0; y < e; y += 1) {
				O && k.nodeType === 8 && k.data === "]" && (o = k, c = !0, Kt(!1));
				var b = d[y], x = r(b, y), S = p ? null : s.get(x);
				S ? (S.v && rr(S.v, b), S.i && rr(S.i, y), v && _.unskip_effect(S.e)) : (S = ta(s, p ? o : Qi ??= hr(), b, x, y, i, t, n), p || (S.e.f |= mt), s.set(x, S)), g.add(x);
			}
			if (e === 0 && a && !l && (p ? l = Br(() => a(o)) : (l = Br(() => a(Qi ??= hr())), l.f |= mt)), e > g.size && At("", "", ""), O && e > 0 && qt(Xt()), !p) {
				if (f.set(_, g), v) {
					for (let [e, t] of s) g.has(e) || _.skip_effect(t.e);
					_.oncommit(m), _.ondiscard(h);
				} else m(_);
			}
			c && Kt(!0), U(u);
		}),
		flags: t,
		items: s,
		pending: f,
		outrogroups: null,
		fallback: l
	};
	p = !1, O && (o = k);
}
function $i(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function ea(e, t, n, r, i) {
	var a = !!(r & 8), o = t.length, s = e.items, c = $i(e.effect.first), l, u = null, d, f = [], p = [], m, h, g, _;
	if (a) for (_ = 0; _ < o; _ += 1) m = t[_], h = i(m, _), g = s.get(h).e, g.f & 33554432 || (g.nodes?.a?.measure(), (d ??= /* @__PURE__ */ new Set()).add(g));
	for (_ = 0; _ < o; _ += 1) {
		if (m = t[_], h = i(m, _), g = s.get(h).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(g), t.done.delete(g);
		if (g.f & 8192 && (Yr(g), a && (g.nodes?.a?.unfix(), (d ??= /* @__PURE__ */ new Set()).delete(g))), g.f & 33554432) {
			if (g.f ^= mt, g === c) na(g, null, n);
			else {
				var v = u ? u.next : c;
				g === e.effect.last && (e.effect.last = g.prev), g.prev && (g.prev.next = g.next), g.next && (g.next.prev = g.prev), ra(e, u, g), ra(e, g, v), na(g, v, n), u = g, f = [], p = [], c = $i(u.next);
				continue;
			}
		}
		if (g !== c) {
			if (l !== void 0 && l.has(g)) {
				if (f.length < p.length) {
					var y = p[0], b;
					u = y.prev;
					var x = f[0], S = f[f.length - 1];
					for (b = 0; b < f.length; b += 1) na(f[b], y, n);
					for (b = 0; b < p.length; b += 1) l.delete(p[b]);
					ra(e, x.prev, S.next), ra(e, u, x), ra(e, S, y), c = y, u = S, --_, f = [], p = [];
				} else l.delete(g), na(g, c, n), ra(e, g.prev, g.next), ra(e, g, u === null ? e.effect.first : u.next), ra(e, u, g), u = g;
				continue;
			}
			for (f = [], p = []; c !== null && c !== g;) (l ??= /* @__PURE__ */ new Set()).add(c), p.push(c), c = $i(c.next);
			if (c === null) continue;
		}
		g.f & 33554432 || f.push(g), u = g, c = $i(g.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Zi(e, Ke(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (c !== null || l !== void 0) {
		var C = [];
		if (l !== void 0) for (g of l) g.f & 8192 || C.push(g);
		for (; c !== null;) !(c.f & 8192) && c !== e.fallback && C.push(c), c = $i(c.next);
		var w = C.length;
		if (w > 0) {
			var T = r & 4 && o === 0 ? n : null;
			if (a) {
				for (_ = 0; _ < w; _ += 1) C[_].nodes?.a?.measure();
				for (_ = 0; _ < w; _ += 1) C[_].nodes?.a?.fix();
			}
			Xi(e, C, T);
		}
	}
	a && sn(() => {
		if (d !== void 0) for (g of d) g.nodes?.a?.apply();
	});
}
function ta(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? tr(n) : /* @__PURE__ */ nr(n, !1, !1) : null, l = o & 2 ? tr(i) : null;
	return {
		v: c,
		i: l,
		e: Br(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function na(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ _r(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function ra(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
// node_modules/svelte/src/internal/client/dom/blocks/snippet.js
function ia(e, t, ...n) {
	var r = new qi(e);
	zr(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, dt);
}
// node_modules/svelte/src/internal/client/dom/css.js
function Z(e, t) {
	Ir(() => {
		var n = e.getRootNode(), r = n.host ? n : n.head ?? n.ownerDocument.head;
		if (!r.querySelector("#" + t.hash)) {
			let e = xr("style");
			e.id = t.hash, e.textContent = t.code, r.appendChild(e);
		}
	});
}
// node_modules/svelte/src/internal/shared/attributes.js
function aa(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function oa(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function sa(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(oa)), i && c.push(...Object.keys(i).map(oa));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = oa(e.substring(l, u).trim());
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
		return r && (n += aa(r)), i && (n += aa(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
// node_modules/svelte/src/internal/client/dom/elements/style.js
function ca(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function la(e, t, n, r) {
	var i = e[wt];
	if (O || i !== t) {
		var a = sa(t, r);
		O && a === e.getAttribute("style") || (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[wt] = t;
	} else r && (Array.isArray(r) ? (ca(e, n?.[0], r[0]), ca(e, n?.[1], r[1], "important")) : ca(e, n, r));
	return r;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
function ua(e, t, n = !1) {
	if (e.multiple) {
		if (t == null) return;
		if (!Ue(t)) return Wt();
		for (var r of e.options) r.selected = t.includes(pa(r));
	} else {
		for (r of e.options) if (lr(pa(r), t)) {
			r.selected = !0;
			return;
		}
		n && t === void 0 || (e.selectedIndex = -1);
	}
}
function da(e) {
	var t = new MutationObserver(() => {
		ua(e, e.__value);
	});
	t.observe(e, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["value"]
	}), Mr(() => {
		t.disconnect();
	});
}
function fa(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet(), i = !0;
	Dr(e, "change", (t) => {
		var i = t ? "[selected]" : ":checked", a;
		if (e.multiple) a = [].map.call(e.querySelectorAll(i), pa);
		else {
			var o = e.querySelector(i) ?? e.querySelector("option:not([disabled])");
			a = o && pa(o);
		}
		n(a), e.__value = a, P !== null && r.add(P);
	}), Ir(() => {
		var a = t();
		if (e === document.activeElement) {
			var o = P;
			if (r.has(o)) return;
		}
		if (ua(e, a, i), i && a === void 0) {
			var s = e.querySelector(":checked");
			s !== null && (a = pa(s), n(a));
		}
		e.__value = a, i = !1;
	}), da(e);
}
function pa(e) {
	return "__value" in e ? e.__value : e.value;
}
// node_modules/svelte/src/internal/client/dom/elements/attributes.js
var ma = Symbol("is custom element"), ha = Symbol("is html"), ga = Ot ? "link" : "LINK", _a = Ot ? "progress" : "PROGRESS";
function Q(e) {
	if (O) {
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
		e[Et] = n, sn(n), Tr();
	}
}
function va(e, t) {
	var n = ba(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === _a) && (e.value = t ?? "");
}
function ya(e, t) {
	var n = ba(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function $(e, t, n, r) {
	var i = ba(e);
	O && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === ga) || i[t] !== (i[t] = n) && (t === "loading" && (e[xt] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Sa(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function ba(e) {
	return e[St] ??= {
		[ma]: e.nodeName.includes("-"),
		[ha]: e.namespaceURI === Vt
	};
}
var xa = /* @__PURE__ */ new Map();
function Sa(e) {
	var t = e.getAttribute("is") || e.nodeName, n = xa.get(t);
	if (n) return n;
	xa.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var o in r = Ye(i), r) r[o].set && o !== "innerHTML" && o !== "textContent" && o !== "innerText" && n.push(o);
		i = Qe(i);
	}
	return n;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function Ca(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	Dr(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = wa(e) ? Ta(a) : a, n(a), P !== null && r.add(P), await Si(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (O && e.defaultValue !== e.value || Ti(t) == null && e.value) && (n(wa(e) ? Ta(e.value) : e.value), P !== null && r.add(P)), Rr(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = P;
			if (r.has(i)) return;
		}
		wa(e) && n === Ta(e.value) || (e.type !== "date" || n || e.value) && n !== e.value && (e.value = n ?? "");
	});
}
function wa(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function Ta(e) {
	return e === "" ? null : +e;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function Ea(e, t) {
	return e === t || e?.[yt] === t;
}
function Da(e = {}, t, n, r) {
	var i = tn.r, a = H;
	return Ir(() => {
		var o, s;
		return Rr(() => {
			o = s, s = r?.() || [], Ti(() => {
				Ea(n(...s), e) || (t(e, ...s), o && Ea(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && Ea(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
// node_modules/svelte/src/internal/client/reactivity/props.js
function Oa(e, t, n, r) {
	var i = !0, a = !!(n & 8), o = !!(n & 16), s = r, c = !0, l = void 0, u = () => o && i ? (l ??= /* @__PURE__ */ Un(r), U(l)) : (c && (c = !1, s = o ? Ti(r) : r), s);
	let d;
	if (a) {
		var f = yt in e || bt in e;
		d = Je(e, t)?.set ?? (f && t in e ? (n) => e[t] = n : void 0);
	}
	var p, m = !1;
	a ? [p, m] = gn(() => e[t]) : p = e[t], p === void 0 && r !== void 0 && (p = u(), d && (i && Ft(t), d(p)));
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
	var _ = !1, v = (n & 1 ? Un : Kn)(() => (_ = !1, h()));
	a && U(v);
	var y = H;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? U(v) : i && a ? sr(e) : e;
			return L(v, n), _ = !0, s !== void 0 && (s = n), e;
		}
		return ei && _ || y.f & 16384 ? v.v : U(v);
	});
}
// node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
// src/ui/canvas/sanitize.ts
var ka = /* @__PURE__ */ new Set([
	"http:",
	"https:",
	"mailto:",
	"tel:"
]), Aa = (e) => {
	if (typeof e != "string") return "";
	let t = e.replace(/[\u0000- \u007f-\u009f]/g, ""), n = /^([a-z][a-z0-9+.-]*):/i.exec(t)?.[1];
	return n === void 0 || ka.has(`${n.toLowerCase()}:`) ? e.trim() : "";
}, ja = (e) => typeof e == "string" ? e.replace(/[^\w\- :]/g, "").trim() : "", Ma = (e) => {
	let t = Aa(e);
	return t !== "" && !/^(mailto|tel):/i.test(t) ? t : "";
}, Na = (e) => typeof e == "string" ? e : typeof e == "number" ? String(e) : "", Pa = (e) => e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;"), Fa = "allow-same-origin", Ia = (e) => "<!doctype html><html><head><meta charset=\"utf-8\"><meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'none'; style-src * 'unsafe-inline'; img-src * data: blob:; font-src * data:\">" + e.map(Ma).filter((e) => e !== "").map((e) => `<link rel="stylesheet" href="${Pa(e)}">`).join("") + "<style>body{margin:0;padding:12px;min-height:100vh;box-sizing:border-box}[data-ceiba-id]{cursor:default}[data-ceiba-id]:hover{outline:1px dashed #94a3b8}[data-ceiba-selected]{outline:2px solid #2563eb!important;outline-offset:2px}[data-ceiba-multiline]{white-space:pre-line}[contenteditable]{outline:2px solid #16a34a!important;outline-offset:2px;cursor:text}.ceiba-dragging,.ceiba-dragging *{user-select:none!important;cursor:grabbing!important}.ceiba-placeholder{padding:12px;border:1px dashed #94a3b8;color:#475569;font:13px system-ui;background:#f8fafc}@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}</style></head><body></body></html>", La = /* @__PURE__ */ new Set([
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
]), Ra = /* @__PURE__ */ new Set(["text"]), za = (e, t) => !t.has(e.type) || e.children.length > 0 ? null : e.type === "heading" ? "text" : e.type === "text" ? "content" : e.type === "button" ? "label" : La.has(e.type) || Ra.has(e.type) ? "content" : null, Ba = (e) => Ra.has(e), Va = (e, t) => {
	let n = e.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, "");
	return t ? n.replace(/\n$/, "") : n.replace(/\n+/g, " ");
}, Ha = (e) => {
	let t = e.ownerDocument, n = t.createRange();
	n.selectNodeContents(e), n.collapse(!1);
	let r = t.getSelection();
	r?.removeAllRanges(), r?.addRange(n);
}, Ua = /* @__PURE__ */ new Set(/* @__PURE__ */ "div.section.article.header.footer.nav.main.aside.h1.h2.h3.h4.h5.h6.p.span.strong.em.small.a.ul.ol.li.blockquote.figure.figcaption.code.pre.hr.br.img.label".split(".")), Wa = (e) => {
	let t = e.fields.props;
	return typeof t == "object" && t && !Array.isArray(t) ? t : {};
}, Ga = (e, t) => {
	let n = e.createElement("div");
	return n.className = "ceiba-placeholder", n.textContent = t, n;
}, Ka = (e, t, n, r) => {
	let i = Wa(t), a = (t, n = "") => {
		let r = e.createElement(t), a = `${n} ${ja(i.class)}`.trim();
		return a && (r.className = a), r;
	};
	switch (t.type) {
		case "container": return a("div", i.fluid ? "container-fluid" : "container");
		case "row": {
			let e = ja(Na(i.gutter));
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
			return e.textContent = Na(i.text), e;
		}
		case "text": {
			let e = a("p");
			return e.textContent = Na(i.content), e;
		}
		case "image":
		case "img": {
			let t = Aa(i.src);
			if (t === "") return Ga(e, n.emptyImage);
			let r = a("img", "img-fluid");
			return r.src = t, r.alt = Na(i.alt), r;
		}
		case "button": {
			let e = a("a", "btn btn-primary");
			return e.href = Aa(i.url) || "#", e.textContent = Na(i.label), e;
		}
		case "html": return Ga(e, n.html);
	}
	if (!r || !Ua.has(t.type)) return Ga(e, n.unknown(t.type));
	let o = a(t.type);
	return t.type === "a" && (o.href = Aa(i.href) || "#"), t.type === "img" && (o.src = Aa(i.src), o.alt = Na(i.alt)), i.content !== void 0 && o.append(e.createTextNode(Na(i.content))), o;
}, qa = (e, t, n, r, i, a) => {
	let o = (s) => {
		let c = t.nodes[s];
		if (!c) return null;
		let l = Ka(e, c, i, n.has(c.type));
		l.dataset.ceibaId = s;
		let u = c.fields.styles;
		if (a && typeof u == "object" && u && !Array.isArray(u) && l.classList.add(...ye(s, u, a)), s === r && (l.dataset.ceibaSelected = ""), Ba(c.type) && (l.dataset.ceibaMultiline = ""), l.className !== "ceiba-placeholder" && l.tagName !== "IMG") for (let e of c.children) {
			let t = o(e);
			t && l.append(t);
		}
		return l;
	}, s = t.rootIds.map(o).filter((e) => e !== null);
	e.body.replaceChildren(...s);
}, Ja = /* @__PURE__ */ K("<button type=\"button\" role=\"radio\" class=\"svelte-1cfnx8l\"> </button>"), Ya = /* @__PURE__ */ K("<div class=\"viewport svelte-1cfnx8l\" role=\"radiogroup\"><button type=\"button\" role=\"radio\" class=\"svelte-1cfnx8l\"> </button> <!></div>"), Xa = {
	hash: "svelte-1cfnx8l",
	code: ".viewport.svelte-1cfnx8l {display:flex;flex-wrap:wrap;gap:.25rem;margin-bottom:.5rem;}button.svelte-1cfnx8l {font:inherit;font-size:.75rem;padding:.2rem .5rem;border:1px solid var(--cpb-border);border-radius:999px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button[aria-checked='true'].svelte-1cfnx8l {background:var(--cpb-accent-soft);border-color:var(--cpb-accent);font-weight:600;}button.svelte-1cfnx8l:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Za(e, t) {
	j(t, !0), Z(e, Xa);
	let n = Oa(t, "store", 7), r = /* @__PURE__ */ F(() => n().t);
	var i = Ya(), a = R(i), o = R(a, !0);
	A(a), X(z(a, 2), 17, () => n().design.breakpoints, (e) => e.id, (e, t) => {
		var r = Ja(), i = R(r);
		A(r), B(() => {
			$(r, "aria-checked", n().viewport === U(t).id), J(i, `${U(t).id ?? ""} · ${U(t).minWidth ?? ""}px`);
		}), W("click", r, () => {
			n().viewport = U(t).id;
		}), q(e, r);
	}), A(i), B((e, t) => {
		$(i, "aria-label", e), $(a, "aria-checked", n().viewport === null), J(o, t);
	}, [() => U(r)("viewport.label"), () => U(r)("viewport.base")]), W("click", a, () => {
		n().viewport = null;
	}), q(e, i), M();
}
G(["click"]);
// src/ui/canvas/Canvas.svelte
var Qa = /* @__PURE__ */ K("<div class=\"canvas svelte-1tv0kiv\"><p class=\"help svelte-1tv0kiv\"> </p> <!> <div class=\"stage svelte-1tv0kiv\"><iframe class=\"svelte-1tv0kiv\"></iframe></div></div>"), $a = {
	hash: "svelte-1tv0kiv",
	code: ".canvas.svelte-1tv0kiv {background:var(--cpb-canvas);padding:.5rem 1rem 1rem;min-height:0;display:flex;flex-direction:column;}.help.svelte-1tv0kiv {margin:0 0 .5rem;font-size:.75rem;color:var(--cpb-muted);}.stage.svelte-1tv0kiv {flex:1;overflow:auto;display:flex;justify-content:center;min-height:0;}iframe.svelte-1tv0kiv {flex:none;max-width:none;min-height:480px;height:100%;border:1px solid var(--cpb-border);border-radius:8px;background:#fff;}"
};
function eo(e, t) {
	j(t, !0), Z(e, $a);
	let n = Oa(t, "stylesheets", 19, () => []), r = /* @__PURE__ */ F(() => t.store.t), i = /* @__PURE__ */ I(void 0), a = /* @__PURE__ */ I(!1), o = /* @__PURE__ */ I(null), s = /* @__PURE__ */ F(() => Ia(n())), c = /* @__PURE__ */ F(() => t.store.viewport === null ? 375 : t.store.design.breakpoints.find((e) => e.id === t.store.viewport)?.minWidth ?? 375);
	function l(e) {
		let n = e.head.querySelector("style[data-cms-design]");
		n || (n = e.createElement("style"), n.dataset.cmsDesign = "", e.head.append(n)), n.textContent = Ie(t.store.design, ie(t.store.session.toDocument().root)).css;
	}
	let u = (e) => e?.closest?.("[data-ceiba-id]");
	function d(e) {
		let n = U(i)?.contentDocument, a = t.store.tree.nodes[e], s = a && t.store.catalogue ? za(a, t.store.catalogue) : null, c = n?.querySelector(`[data-ceiba-id="${CSS.escape(e)}"]`);
		if (!n || !a || !s || !c) return !1;
		t.store.select(e), L(o, e, !0);
		let l = Ba(a.type);
		c.setAttribute("contenteditable", "plaintext-only"), c.setAttribute("aria-label", U(r)("announce.editing"));
		let u = () => {
			t.store.run({
				kind: "updateProps",
				id: e,
				set: { [s]: Va(c.innerText, l) }
			});
		}, d = (n) => {
			c.removeEventListener("input", u), c.removeEventListener("keydown", f), c.removeEventListener("blur", p), c.removeAttribute("contenteditable"), L(o, null), t.store.announce("announce.editDone"), t.onEditEnd(e, n);
		}, f = (e) => {
			(e.key === "Escape" || e.key === "Enter" && (!l || e.ctrlKey || e.metaKey)) && (e.preventDefault(), d(!0));
		}, p = () => d(!1);
		return c.addEventListener("input", u), c.addEventListener("keydown", f), c.addEventListener("blur", p), c.focus(), Ha(c), t.store.announce("announce.editing"), !0;
	}
	function f(e) {
		e.addEventListener("click", (e) => {
			e.preventDefault(), U(o) === null && t.store.select(u(e.target)?.dataset.ceibaId ?? null);
		}), e.addEventListener("dblclick", (e) => {
			let t = u(e.target)?.dataset.ceibaId;
			t && U(o) === null && d(t);
		}), e.addEventListener("pointerdown", (e) => {
			let n = u(e.target);
			n?.dataset.ceibaId && U(o) === null && t.drag.pressNode(e, n, n.dataset.ceibaId);
		}), e.addEventListener("submit", (e) => e.preventDefault()), e.addEventListener("auxclick", (e) => e.preventDefault()), e.addEventListener("dragstart", (e) => e.preventDefault());
	}
	function p() {
		let e = U(i)?.contentDocument;
		e && U(i) && (f(e), t.drag.attach(U(i)), L(a, !0));
	}
	Nr(() => {
		let e = U(i)?.contentDocument, n = t.store.catalogue, s = t.store.tree, c = t.store.selection, u = t.store.design;
		U(a) && e && n && U(o) === null && (qa(e, s, n, c, {
			unknown: (e) => U(r)("canvas.unknown", { type: e }),
			html: U(r)("canvas.html"),
			emptyImage: U(r)("canvas.emptyImage")
		}, u), l(e), c && e.querySelector(`[data-ceiba-id="${CSS.escape(c)}"]`)?.scrollIntoView({ block: "nearest" }));
	});
	var m = { startEditing: d }, h = Qa(), g = R(h), _ = R(g, !0);
	A(g);
	var v = z(g, 2);
	Za(v, { get store() {
		return t.store;
	} });
	var y = z(v, 2), b = R(y);
	let x;
	return Da(b, (e) => L(i, e), () => U(i)), A(y), A(h), B((e, n) => {
		$(g, "id", `${t.uid}-canvas-help`), J(_, e), $(b, "title", n), $(b, "sandbox", Fa), $(b, "srcdoc", U(s)), $(b, "aria-describedby", `${t.uid}-canvas-help`), x = la(b, "", x, { width: `${U(c)}px` });
	}, [() => U(r)("canvas.help"), () => U(r)("canvas.title")]), Ni("load", b, p), ji(b), q(e, h), M(m);
}
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
	let a = be(e, i.parent);
	return {
		parent: i.parent,
		index: a.indexOf(i.id) + 1
	};
}, io = (e) => {
	let { id: t, _id: n, children: r, ...i } = e;
	return {
		...i,
		children: (r ?? []).map(io)
	};
}, ao = class {
	store;
	#e = /* @__PURE__ */ I([]);
	get templates() {
		return U(this.#e);
	}
	set templates(e) {
		L(this.#e, e);
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
		let i = ro(this.store.tree, n, this.store.selection, r.type), a = this.store.session.commandContext;
		if (!a) return !1;
		try {
			e.reduce((e, t, n) => ve(e, {
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
				nodes: [io(i)]
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
}, oo = /* @__PURE__ */ K("<dialog class=\"svelte-o2xhl0\"><form method=\"dialog\" class=\"svelte-o2xhl0\"><h2 class=\"svelte-o2xhl0\"> </h2> <!> <div class=\"actions svelte-o2xhl0\"><button type=\"button\" class=\"svelte-o2xhl0\"> </button> <button type=\"submit\" class=\"primary svelte-o2xhl0\"> </button></div></form></dialog>"), so = {
	hash: "svelte-o2xhl0",
	code: "dialog.svelte-o2xhl0 {border:1px solid var(--cpb-border);border-radius:10px;padding:1rem;width:min(560px, 90vw);color:inherit;font:inherit;}dialog.svelte-o2xhl0::backdrop {background:rgb(15 23 42 / .45);}h2.svelte-o2xhl0 {font-size:1rem;margin:0 0 .75rem;}.actions.svelte-o2xhl0 {display:flex;justify-content:flex-end;gap:.5rem;margin-top:1rem;}button.svelte-o2xhl0 {font:inherit;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.primary.svelte-o2xhl0 {background:var(--cpb-accent);border-color:var(--cpb-accent);color:#fff;}button.svelte-o2xhl0:disabled {opacity:.5;}.svelte-o2xhl0:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function co(e, t) {
	j(t, !0), Z(e, so);
	let n = Oa(t, "open", 15, !1), r = Oa(t, "busy", 3, !1), i = /* @__PURE__ */ I(void 0), a = null;
	Nr(() => {
		U(i) && (n() && !U(i).open ? (a = U(i).getRootNode().activeElement, U(i).showModal()) : !n() && U(i).open && U(i).close());
	});
	var o = oo(), s = R(o), c = R(s), l = R(c, !0);
	A(c);
	var u = z(c, 2);
	ia(u, () => t.children);
	var d = z(u, 2), f = R(d), p = R(f, !0);
	A(f);
	var m = z(f, 2), h = R(m, !0);
	A(m), A(d), A(s), A(o), Da(o, (e) => L(i, e), () => U(i)), B(() => {
		$(o, "aria-labelledby", `${t.uid}-title`), $(c, "id", `${t.uid}-title`), J(l, t.title), J(p, t.cancelLabel), m.disabled = r(), J(h, t.submitLabel);
	}), Ni("close", o, () => {
		n(!1), a?.focus?.();
	}), Ni("submit", s, (e) => {
		e.preventDefault(), t.onSubmit();
	}), W("click", f, () => {
		n(!1);
	}), q(e, o), M();
}
G(["click"]);
// src/ui/content/ImportDialog.svelte
var lo = /* @__PURE__ */ K("<p class=\"help svelte-c6zkzf\"> </p> <label class=\"svelte-c6zkzf\"> </label> <textarea rows=\"10\" spellcheck=\"false\" class=\"svelte-c6zkzf\"></textarea>", 1), uo = {
	hash: "svelte-c6zkzf",
	code: ".help.svelte-c6zkzf {font-size:.8rem;margin:0 0 .5rem;}label.svelte-c6zkzf {display:block;font-size:.8rem;font-weight:600;margin-bottom:.25rem;}textarea.svelte-c6zkzf {width:100%;box-sizing:border-box;font:12px/1.4 ui-monospace, monospace;padding:.5rem;border:1px solid var(--cpb-border);border-radius:6px;}"
};
function fo(e, t) {
	j(t, !0), Z(e, uo);
	let n = Oa(t, "open", 15, !1), r = /* @__PURE__ */ F(() => t.store.t), i = /* @__PURE__ */ I(""), a = /* @__PURE__ */ I(!1);
	async function o() {
		if (U(i).trim() === "") return;
		L(a, !0);
		let e = await t.content.importHtml(U(i));
		L(a, !1), e !== null && (e > 0 && t.store.announce("import.warnings", { count: e }), L(i, ""), n(!1));
	}
	{
		let s = /* @__PURE__ */ F(() => U(r)("import.title")), c = /* @__PURE__ */ F(() => `${t.uid}-import`), l = /* @__PURE__ */ F(() => U(r)("import.submit")), u = /* @__PURE__ */ F(() => U(r)("dialog.cancel"));
		co(e, {
			get title() {
				return U(s);
			},
			get uid() {
				return U(c);
			},
			get submitLabel() {
				return U(l);
			},
			get cancelLabel() {
				return U(u);
			},
			get busy() {
				return U(a);
			},
			onSubmit: o,
			get open() {
				return n();
			},
			set open(e) {
				n(e);
			},
			children: (e, n) => {
				var a = lo(), o = vr(a), s = R(o, !0);
				A(o);
				var c = z(o, 2), l = R(c, !0);
				A(c);
				var u = z(c, 2);
				Cr(u), B((e, n) => {
					J(s, e), $(c, "for", `${t.uid}-import-html`), J(l, n), $(u, "id", `${t.uid}-import-html`);
				}, [() => U(r)("import.help"), () => U(r)("import.field")]), Ca(u, () => U(i), (e) => L(i, e)), q(e, a);
			},
			$$slots: { default: !0 }
		});
	}
	M();
}
// src/ui/design/ops.ts
var po = /^[a-z][a-z0-9-]*(?:\.[a-z0-9-]+)*$/, mo = /^[a-z][a-z0-9-]{0,40}$/, ho = (e, t, n) => ({
	...e,
	tokens: {
		...e.tokens,
		[t]: n
	}
}), go = (e, t) => {
	let n = { ...e.tokens };
	return delete n[t], {
		...e,
		tokens: n
	};
}, _o = (e, t, n, r = {}) => ({
	...e,
	classes: {
		...e.classes,
		[t]: {
			name: n,
			styles: e.classes[t]?.styles ?? r
		}
	}
}), vo = (e, t, n) => {
	let r = e.classes[t];
	return r ? {
		...e,
		classes: {
			...e.classes,
			[t]: {
				...r,
				styles: n ?? {}
			}
		}
	} : e;
}, yo = (e, t) => {
	let n = { ...e.classes };
	return delete n[t], {
		...e,
		classes: n
	};
}, bo = (e, t) => ({
	...e,
	breakpoints: t
}), xo = (e, t) => JSON.stringify(e ?? {}).includes(`{"token":${JSON.stringify(t)}}`), So = (e, t) => [...Object.entries(e.tokens).filter(([e, n]) => e !== t && typeof n.value == "object" && n.value.token === t).map(([e]) => `token ${e}`), ...Object.entries(e.classes).filter(([, e]) => xo(e.styles, t)).map(([e, t]) => `class ${t.name ?? e}`)], Co = /* @__PURE__ */ K("<li class=\"svelte-l0fwje\"><code class=\"svelte-l0fwje\"> </code> <label class=\"svelte-l0fwje\"> <input type=\"number\" min=\"1\" max=\"4000\" class=\"svelte-l0fwje\"/></label></li>"), wo = /* @__PURE__ */ K("<ul class=\"svelte-l0fwje\"></ul>"), To = {
	hash: "svelte-l0fwje",
	code: "ul.svelte-l0fwje {list-style:none;margin:0;padding:0;display:grid;gap:.35rem;}li.svelte-l0fwje {display:flex;align-items:center;gap:.5rem;font-size:.8rem;}label.svelte-l0fwje {display:flex;align-items:center;gap:.35rem;}input.svelte-l0fwje {width:6rem;font:inherit;font-size:.8rem;padding:.2rem .35rem;border:1px solid var(--cpb-border);border-radius:5px;}.svelte-l0fwje:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Eo(e, t) {
	j(t, !0), Z(e, To);
	let n = /* @__PURE__ */ F(() => t.store.t);
	function r(e, n) {
		let r = Number(n);
		Number.isInteger(r) && t.store.designSession.update(bo(t.store.design, t.store.design.breakpoints.map((t) => t.id === e ? {
			...t,
			minWidth: r
		} : t)));
	}
	var i = wo();
	X(i, 21, () => t.store.design.breakpoints, (e) => e.id, (e, t) => {
		var i = Co(), a = R(i), o = R(a, !0);
		A(a);
		var s = z(a, 2), c = R(s), l = z(c);
		Q(l), A(s), A(i), B((e) => {
			J(o, U(t).id), J(c, `${e ?? ""} `), va(l, U(t).minWidth);
		}, [() => U(n)("design.minWidth")]), W("change", l, (e) => r(U(t).id, e.currentTarget.value)), q(e, i);
	}), A(i), q(e, i), M();
}
G(["change"]);
// src/ui/styles/groups.ts
var Do = [
	{
		key: "styles.group.layout",
		properties: [
			"display",
			"flexDirection",
			"flexWrap",
			"justifyContent",
			"alignItems",
			"alignSelf",
			"gap",
			"gridTemplateColumns",
			"gridColumn",
			"flexGrow",
			"flexShrink"
		]
	},
	{
		key: "styles.group.spacing",
		properties: [
			"margin",
			"marginBlock",
			"marginInline",
			"padding",
			"paddingBlock",
			"paddingInline"
		]
	},
	{
		key: "styles.group.size",
		properties: [
			"width",
			"minWidth",
			"maxWidth",
			"height",
			"minHeight",
			"maxHeight"
		]
	},
	{
		key: "styles.group.typography",
		properties: [
			"fontFamily",
			"fontSize",
			"fontWeight",
			"lineHeight",
			"textAlign",
			"color"
		]
	},
	{
		key: "styles.group.background",
		properties: ["backgroundColor"]
	},
	{
		key: "styles.group.border",
		properties: [
			"borderWidth",
			"borderStyle",
			"borderColor",
			"borderRadius",
			"boxShadow"
		]
	},
	{
		key: "styles.group.effects",
		properties: ["opacity"]
	}
], Oo = (e) => {
	let t = e.replace(/([A-Z])/g, " $1").toLowerCase();
	return t.charAt(0).toUpperCase() + t.slice(1);
}, ko = (e, t) => {
	let n = t.trim();
	return (e === "number" || e === "lineHeight") && /^-?(\d+\.?\d*|\.\d+)$/.test(n) ? Number(n) : n;
}, Ao = /* @__PURE__ */ K("<option class=\"svelte-91oqxq\"> </option>"), jo = /* @__PURE__ */ K("<select class=\"svelte-91oqxq\"><option class=\"svelte-91oqxq\"> </option><!></select>"), Mo = /* @__PURE__ */ K("<option class=\"svelte-91oqxq\"> </option>"), No = /* @__PURE__ */ K("<select class=\"svelte-91oqxq\"><option class=\"svelte-91oqxq\"> </option><!></select>"), Po = /* @__PURE__ */ K("<input class=\"svelte-91oqxq\"/>"), Fo = /* @__PURE__ */ K("<option class=\"svelte-91oqxq\"> </option>"), Io = /* @__PURE__ */ K("<select class=\"svelte-91oqxq\"><option class=\"svelte-91oqxq\"> </option><!></select>"), Lo = /* @__PURE__ */ K("<button type=\"button\" class=\"remove svelte-91oqxq\">×</button>"), Ro = /* @__PURE__ */ K("<p class=\"error svelte-91oqxq\" role=\"alert\"> </p>"), zo = /* @__PURE__ */ K("<p class=\"origin svelte-91oqxq\"> </p>"), Bo = /* @__PURE__ */ K("<div class=\"field svelte-91oqxq\"><label class=\"svelte-91oqxq\"> </label> <div class=\"row svelte-91oqxq\"><!> <!> <!></div> <!></div>"), Vo = {
	hash: "svelte-91oqxq",
	code: ".field.svelte-91oqxq {display:grid;gap:.2rem;margin:.4rem 0;}label.svelte-91oqxq {font-size:.75rem;font-weight:600;}.row.svelte-91oqxq {display:flex;gap:.25rem;}input.svelte-91oqxq, select.svelte-91oqxq {flex:1;min-width:0;font:inherit;font-size:.8rem;padding:.25rem .4rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}[aria-invalid='true'].svelte-91oqxq {border-color:var(--cpb-danger);}.remove.svelte-91oqxq {font:inherit;padding:0 .5rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);cursor:pointer;}.origin.svelte-91oqxq {margin:0;font-size:.7rem;color:var(--cpb-muted);}.error.svelte-91oqxq {margin:0;font-size:.7rem;color:var(--cpb-danger);}.svelte-91oqxq:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Ho(e, t) {
	j(t, !0), Z(e, Vo);
	let n = /* @__PURE__ */ F(() => t.store.t), r = /* @__PURE__ */ F(() => te(t.styles, t.store.design, t.target, t.spec.name)), i = /* @__PURE__ */ F(() => U(r)?.origin === "own" ? U(r).value : void 0), a = /* @__PURE__ */ F(() => pe(t.spec)), o = /* @__PURE__ */ F(() => Object.entries(t.store.design.tokens).filter(([, e]) => e.type === U(a)).map(([e]) => e)), s = /* @__PURE__ */ F(() => t.spec.kind === "keyword" ? Re.keywords[t.spec.name] ?? [] : []), c = /* @__PURE__ */ F(() => typeof U(i) == "object" && U(i) !== null ? U(i).token : ""), l = /* @__PURE__ */ F(() => U(i) === void 0 || typeof U(i) == "object" ? "" : String(U(i))), u = (e) => typeof e == "object" ? `{${e.token}}` : String(e), d = /* @__PURE__ */ F(() => !U(r) || U(r).origin === "own" ? null : U(r).origin === "class" ? U(n)("styles.fromClass", { from: U(r).from }) : U(n)("styles.inherited", { from: U(r).from })), f = /* @__PURE__ */ I(null);
	function p(e) {
		e !== null && typeof e != "object" && de(t.spec, e) === null ? L(f, U(n)("styles.invalid"), !0) : (L(f, null), t.onSet(Me(t.styles, t.target, t.spec.name, e)));
	}
	let m = (e) => p(e.trim() === "" ? null : ko(t.spec.kind, e));
	var h = Bo(), g = R(h), _ = R(g, !0);
	A(g);
	var v = z(g, 2), y = R(v), b = (e) => {
		var n = jo(), i = R(n), a = R(i, !0);
		A(i), i.value = i.__value = "", X(z(i), 16, () => U(o), (e) => e, (e, t) => {
			var n = Ao(), r = R(n, !0);
			A(n);
			var i = {};
			B(() => {
				J(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
			}), q(e, n);
		}), A(n);
		var s;
		da(n), B((e) => {
			$(n, "id", t.id), J(a, e), s !== (s = U(c)) && (n.value = (n.__value = U(c)) ?? "", ua(n, U(c)));
		}, [() => U(r) ? u(U(r).value) : "—"]), W("change", n, (e) => p(e.currentTarget.value === "" ? null : { token: e.currentTarget.value })), q(e, n);
	}, x = (e) => {
		var n = No(), i = R(n), a = R(i, !0);
		A(i), i.value = i.__value = "", X(z(i), 16, () => U(s), (e) => e, (e, t) => {
			var n = Mo(), r = R(n, !0);
			A(n);
			var i = {};
			B(() => {
				J(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
			}), q(e, n);
		}), A(n);
		var o;
		da(n), B((e) => {
			$(n, "id", t.id), J(a, e), o !== (o = U(l)) && (n.value = (n.__value = U(l)) ?? "", ua(n, U(l)));
		}, [() => U(r) ? u(U(r).value) : "—"]), W("change", n, (e) => m(e.currentTarget.value)), q(e, n);
	}, S = (e) => {
		var n = Po();
		Q(n), B((e) => {
			$(n, "id", t.id), va(n, U(l)), $(n, "placeholder", e), $(n, "aria-invalid", U(f) !== null), $(n, "aria-describedby", U(f) ? `${t.id}-error` : U(d) ? `${t.id}-origin` : void 0);
		}, [() => U(r) && U(r).origin !== "own" ? u(U(r).value) : ""]), W("change", n, (e) => m(e.currentTarget.value)), q(e, n);
	};
	Y(y, (e) => {
		t.spec.kind === "token" ? e(b) : U(s).length > 0 ? e(x, 1) : e(S, -1);
	});
	var C = z(y, 2), w = (e) => {
		var r = Io(), i = R(r), a = R(i, !0);
		A(i), i.value = i.__value = "", X(z(i), 16, () => U(o), (e) => e, (e, t) => {
			var n = Fo(), r = R(n, !0);
			A(n);
			var i = {};
			B(() => {
				J(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
			}), q(e, n);
		}), A(r);
		var s;
		da(r), B((e, t) => {
			$(r, "aria-label", e), J(a, t), s !== (s = U(c)) && (r.value = (r.__value = U(c)) ?? "", ua(r, U(c)));
		}, [() => `${U(n)("styles.token")} · ${Oo(t.spec.name)}`, () => U(n)("styles.literal")]), W("change", r, (e) => p(e.currentTarget.value === "" ? null : { token: e.currentTarget.value })), q(e, r);
	};
	Y(C, (e) => {
		U(o).length > 0 && t.spec.kind !== "token" && e(w);
	});
	var T = z(C, 2), ee = (e) => {
		var r = Lo();
		B((e) => $(r, "aria-label", e), [() => U(n)("styles.remove", { property: Oo(t.spec.name) })]), W("click", r, () => p(null)), q(e, r);
	};
	Y(T, (e) => {
		U(i) !== void 0 && e(ee);
	}), A(v);
	var E = z(v, 2), ne = (e) => {
		var n = Ro(), r = R(n, !0);
		A(n), B(() => {
			$(n, "id", `${t.id}-error`), J(r, U(f));
		}), q(e, n);
	}, re = (e) => {
		var n = zo(), r = R(n, !0);
		A(n), B(() => {
			$(n, "id", `${t.id}-origin`), J(r, U(d));
		}), q(e, n);
	};
	Y(E, (e) => {
		U(f) ? e(ne) : U(d) && e(re, 1);
	}), A(h), B((e) => {
		$(g, "for", t.id), J(_, e);
	}, [() => Oo(t.spec.name)]), q(e, h), M();
}
G(["change", "click"]);
// src/ui/styles/StylesPanel.svelte
var Uo = /* @__PURE__ */ K("<option class=\"svelte-tbe6xh\"> </option>"), Wo = /* @__PURE__ */ K("<option class=\"svelte-tbe6xh\"> </option>"), Go = /* @__PURE__ */ K("<details class=\"group svelte-tbe6xh\"><summary class=\"svelte-tbe6xh\"> </summary> <!></details>"), Ko = /* @__PURE__ */ K("<details class=\"styles svelte-tbe6xh\" open=\"\"><summary class=\"svelte-tbe6xh\"> </summary> <div class=\"target svelte-tbe6xh\"><label class=\"svelte-tbe6xh\"> </label> <select class=\"svelte-tbe6xh\"><option class=\"svelte-tbe6xh\"> </option><!></select> <label class=\"svelte-tbe6xh\"> </label> <select class=\"svelte-tbe6xh\"><option class=\"svelte-tbe6xh\"> </option><!></select></div> <!> <!></details>"), qo = {
	hash: "svelte-tbe6xh",
	code: ".styles.svelte-tbe6xh {margin-top:1rem;border-top:1px solid var(--cpb-border);padding-top:.5rem;}summary.svelte-tbe6xh {cursor:pointer;font-size:.8rem;font-weight:700;}.group.svelte-tbe6xh {margin:.35rem 0;padding-left:.25rem;}.group.svelte-tbe6xh summary:where(.svelte-tbe6xh) {font-weight:600;font-size:.78rem;}.target.svelte-tbe6xh {display:grid;grid-template-columns:auto 1fr;gap:.25rem .5rem;align-items:center;margin:.5rem 0;}label.svelte-tbe6xh {font-size:.75rem;font-weight:600;}select.svelte-tbe6xh {font:inherit;font-size:.8rem;padding:.25rem .4rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}.svelte-tbe6xh:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Jo(e, t) {
	j(t, !0), Z(e, qo);
	let n = Oa(t, "store", 7), r = /* @__PURE__ */ F(() => n().t), i = /* @__PURE__ */ F(() => n().styleState === null ? {
		breakpoint: n().viewport,
		state: null
	} : {
		breakpoint: null,
		state: n().styleState
	});
	var a = Ko(), o = R(a), s = R(o, !0);
	A(o);
	var c = z(o, 2), l = R(c), u = R(l, !0);
	A(l);
	var d = z(l, 2), f = R(d), p = R(f, !0);
	A(f), f.value = f.__value = "", X(z(f), 17, () => n().design.breakpoints, (e) => e.id, (e, t) => {
		var n = Uo(), r = R(n);
		A(n);
		var i = {};
		B(() => {
			J(r, `${U(t).id ?? ""} · ${U(t).minWidth ?? ""}px`), i !== (i = U(t).id) && (n.value = (n.__value = U(t).id) ?? "");
		}), q(e, n);
	}), A(d);
	var m;
	da(d);
	var h = z(d, 2), g = R(h, !0);
	A(h);
	var _ = z(h, 2), v = R(_), y = R(v, !0);
	A(v), v.value = v.__value = "", X(z(v), 16, () => Re.states, (e) => e, (e, t) => {
		var n = Wo(), r = R(n, !0);
		A(n);
		var i = {};
		B(() => {
			J(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
		}), q(e, n);
	}), A(_);
	var b;
	da(_), A(c);
	var x = z(c, 2);
	ia(x, () => t.children ?? et), X(z(x, 2), 17, () => Do, (e) => e.key, (e, a) => {
		var o = Go(), s = R(o), c = R(s, !0);
		A(s), X(z(s, 2), 16, () => U(a).properties, (e) => e, (e, r) => {
			let a = /* @__PURE__ */ F(() => E.get(r));
			var o = Vi(), s = vr(o), c = (e) => {
				{
					let o = /* @__PURE__ */ F(() => `${t.uid}-style-${r}`);
					Ho(e, {
						get store() {
							return n();
						},
						get styles() {
							return t.styles;
						},
						get target() {
							return U(i);
						},
						get spec() {
							return U(a);
						},
						get onSet() {
							return t.onSet;
						},
						get id() {
							return U(o);
						}
					});
				}
			};
			Y(s, (e) => {
				U(a) && e(c);
			}), q(e, o);
		}), A(o), B((e) => J(c, e), [() => U(r)(U(a).key)]), q(e, o);
	}), A(a), B((e, r, i, a, o) => {
		J(s, e), $(l, "for", `${t.uid}-bp`), J(u, r), $(d, "id", `${t.uid}-bp`), J(p, i), m !== (m = n().viewport ?? "") && (d.value = (d.__value = n().viewport ?? "") ?? "", ua(d, n().viewport ?? "")), $(h, "for", `${t.uid}-state`), J(g, a), $(_, "id", `${t.uid}-state`), _.disabled = n().viewport !== null, J(y, o), b !== (b = n().styleState ?? "") && (_.value = (_.__value = n().styleState ?? "") ?? "", ua(_, n().styleState ?? ""));
	}, [
		() => t.title ?? U(r)("styles.title"),
		() => U(r)("styles.target"),
		() => U(r)("viewport.base"),
		() => U(r)("styles.state"),
		() => U(r)("styles.normal")
	]), W("change", d, (e) => {
		n().viewport = e.currentTarget.value || null, n().styleState = null;
	}), W("change", _, (e) => {
		n().styleState = e.currentTarget.value || null;
	}), q(e, a), M();
}
G(["change"]);
// src/ui/design/ClassesTab.svelte
var Yo = /* @__PURE__ */ K("<li class=\"svelte-9fzp9u\"><input class=\"svelte-9fzp9u\"/> <code class=\"svelte-9fzp9u\"> </code> <button type=\"button\" class=\"svelte-9fzp9u\">✎</button> <button type=\"button\" class=\"svelte-9fzp9u\">×</button></li>"), Xo = /* @__PURE__ */ K("<p class=\"message svelte-9fzp9u\" role=\"alert\"> </p>"), Zo = /* @__PURE__ */ K("<ul class=\"svelte-9fzp9u\"></ul> <div class=\"add svelte-9fzp9u\"><input placeholder=\"card\" class=\"svelte-9fzp9u\"/> <input placeholder=\"Card\" class=\"svelte-9fzp9u\"/> <button type=\"button\" class=\"svelte-9fzp9u\"> </button></div> <!> <!>", 1), Qo = {
	hash: "svelte-9fzp9u",
	code: "ul.svelte-9fzp9u {list-style:none;margin:0;padding:0;display:grid;gap:.25rem;}li.svelte-9fzp9u {display:grid;grid-template-columns:1fr auto auto auto;gap:.25rem;align-items:center;font-size:.78rem;}input.svelte-9fzp9u {font:inherit;font-size:.78rem;padding:.2rem .35rem;border:1px solid var(--cpb-border);border-radius:5px;min-width:0;}.add.svelte-9fzp9u {display:grid;grid-template-columns:1fr 1fr auto;gap:.25rem;margin-top:.5rem;}button.svelte-9fzp9u {font:inherit;font-size:.78rem;padding:.2rem .5rem;border:1px solid var(--cpb-border);border-radius:5px;background:var(--cpb-surface);cursor:pointer;}button[aria-pressed='true'].svelte-9fzp9u {background:var(--cpb-accent-soft);}.message.svelte-9fzp9u {color:var(--cpb-danger);font-size:.75rem;}.svelte-9fzp9u:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function $o(e, t) {
	j(t, !0), Z(e, Qo);
	let n = /* @__PURE__ */ F(() => t.store.t), r = /* @__PURE__ */ F(() => Object.entries(t.store.design.classes)), i = /* @__PURE__ */ I(null), a = /* @__PURE__ */ I(""), o = /* @__PURE__ */ I(""), s = /* @__PURE__ */ I(null);
	function c() {
		!mo.test(U(a)) || U(a) in t.store.design.classes ? L(s, U(n)("design.badId"), !0) : (L(s, null), t.store.designSession.update(_o(t.store.design, U(a), U(o).trim() || U(a))), L(i, U(a), !0), L(a, ""), L(o, ""));
	}
	async function l(e) {
		let r = await t.store.session.transport.designUsages?.("class", e).catch(() => []) ?? [];
		r.length > 0 ? L(s, U(n)("design.inUse", {
			name: e,
			where: r.map((e) => e.title).join(", ")
		}), !0) : (L(s, null), U(i) === e && L(i, null), t.store.designSession.update(yo(t.store.design, e)));
	}
	var u = Zo(), d = vr(u);
	X(d, 21, () => U(r), ([e, t]) => e, (e, r) => {
		var a = /* @__PURE__ */ F(() => rt(U(r), 2));
		let o = () => U(a)[0], s = () => U(a)[1];
		var c = Yo(), u = R(c);
		Q(u);
		var d = z(u, 2), f = R(d);
		A(d);
		var p = z(d, 2), m = z(p, 2);
		A(c), B((e, t, n) => {
			$(u, "aria-label", e), va(u, s().name ?? o()), J(f, `.${o() ?? ""}`), $(p, "aria-pressed", U(i) === o()), $(p, "aria-label", t), $(m, "aria-label", n);
		}, [
			() => `${U(n)("design.name")} · ${o()}`,
			() => U(n)("design.edit", { name: s().name ?? o() }),
			() => U(n)("design.delete", { name: s().name ?? o() })
		]), W("change", u, (e) => t.store.designSession.update(_o(t.store.design, o(), e.currentTarget.value))), W("click", p, () => {
			L(i, U(i) === o() ? null : o(), !0);
		}), W("click", m, () => l(o())), q(e, c);
	}), A(d);
	var f = z(d, 2), p = R(f);
	Q(p);
	var m = z(p, 2);
	Q(m);
	var h = z(m, 2), g = R(h, !0);
	A(h), A(f);
	var _ = z(f, 2), v = (e) => {
		var t = Xo(), n = R(t, !0);
		A(t), B(() => J(n, U(s))), q(e, t);
	};
	Y(_, (e) => {
		U(s) && e(v);
	});
	var y = z(_, 2), b = (e) => {
		let r = /* @__PURE__ */ F(() => U(i));
		{
			let i = /* @__PURE__ */ F(() => `${t.uid}-class`), a = /* @__PURE__ */ F(() => t.store.design.classes[U(r)]?.styles), o = /* @__PURE__ */ F(() => U(n)("design.classStyles", { name: t.store.design.classes[U(r)]?.name ?? U(r) }));
			Jo(e, {
				get store() {
					return t.store;
				},
				get uid() {
					return U(i);
				},
				get styles() {
					return U(a);
				},
				get title() {
					return U(o);
				},
				onSet: (e) => t.store.designSession.update(vo(t.store.design, U(r), e))
			});
		}
	};
	Y(y, (e) => {
		U(i) && t.store.design.classes[U(i)] && e(b);
	}), B((e, t, n) => {
		$(p, "aria-label", e), $(m, "aria-label", t), J(g, n);
	}, [
		() => U(n)("design.id"),
		() => U(n)("design.name"),
		() => U(n)("design.add")
	]), Ca(p, () => U(a), (e) => L(a, e)), Ca(m, () => U(o), (e) => L(o, e)), W("click", h, c), q(e, u), M();
}
G(["change", "click"]);
// src/ui/design/TokensTab.svelte
var es = /* @__PURE__ */ K("<input class=\"svelte-1v1kt1m\"/>"), ts = /* @__PURE__ */ K("<tr class=\"svelte-1v1kt1m\"><th scope=\"row\" class=\"svelte-1v1kt1m\"> </th><td class=\"svelte-1v1kt1m\"> </td><td class=\"svelte-1v1kt1m\"><!></td><td class=\"svelte-1v1kt1m\"><button type=\"button\" class=\"svelte-1v1kt1m\">×</button></td></tr>"), ns = /* @__PURE__ */ K("<option class=\"svelte-1v1kt1m\"> </option>"), rs = /* @__PURE__ */ K("<p class=\"message svelte-1v1kt1m\" role=\"alert\"> </p>"), is = /* @__PURE__ */ K("<table class=\"svelte-1v1kt1m\"><thead class=\"svelte-1v1kt1m\"><tr class=\"svelte-1v1kt1m\"><th scope=\"col\" class=\"svelte-1v1kt1m\"> </th><th scope=\"col\" class=\"svelte-1v1kt1m\"> </th><th scope=\"col\" class=\"svelte-1v1kt1m\"> </th><th class=\"svelte-1v1kt1m\"></th></tr></thead><tbody class=\"svelte-1v1kt1m\"></tbody></table> <div class=\"add svelte-1v1kt1m\"><input placeholder=\"color.accent\" class=\"svelte-1v1kt1m\"/> <select class=\"svelte-1v1kt1m\"></select> <input class=\"svelte-1v1kt1m\"/> <button type=\"button\" class=\"svelte-1v1kt1m\"> </button></div> <!>", 1), as = {
	hash: "svelte-1v1kt1m",
	code: "table.svelte-1v1kt1m {width:100%;border-collapse:collapse;font-size:.78rem;}th.svelte-1v1kt1m, td.svelte-1v1kt1m {text-align:left;padding:.2rem;border-bottom:1px solid var(--cpb-border);}input.svelte-1v1kt1m, select.svelte-1v1kt1m {width:100%;box-sizing:border-box;font:inherit;font-size:.78rem;padding:.2rem .35rem;border:1px solid var(--cpb-border);border-radius:5px;}.add.svelte-1v1kt1m {display:grid;grid-template-columns:1fr auto 1fr auto;gap:.25rem;margin-top:.5rem;}button.svelte-1v1kt1m {font:inherit;font-size:.78rem;padding:.2rem .5rem;border:1px solid var(--cpb-border);border-radius:5px;background:var(--cpb-surface);cursor:pointer;}.message.svelte-1v1kt1m {color:var(--cpb-danger);font-size:.75rem;}.svelte-1v1kt1m:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function os(e, t) {
	j(t, !0), Z(e, as);
	let n = /* @__PURE__ */ F(() => t.store.t), r = /* @__PURE__ */ F(() => Object.entries(t.store.design.tokens)), i = /* @__PURE__ */ I(""), a = /* @__PURE__ */ I("color"), o = /* @__PURE__ */ I(""), s = /* @__PURE__ */ I(null), c = (e, t) => De(e, t) !== null;
	function l(e, r) {
		let i = t.store.design.tokens[e];
		i && (c(i.type, r) ? (L(s, null), t.store.designSession.update(ho(t.store.design, e, {
			...i,
			value: r
		}))) : L(s, U(n)("design.badValue"), !0));
	}
	function u() {
		!po.test(U(i)) || U(i) in t.store.design.tokens ? L(s, U(n)("design.badId"), !0) : c(U(a), U(o)) ? (L(s, null), t.store.designSession.update(ho(t.store.design, U(i), {
			type: U(a),
			value: U(o)
		})), L(i, ""), L(o, "")) : L(s, U(n)("design.badValue"), !0);
	}
	async function d(e) {
		let r = await t.store.session.transport.designUsages?.("token", e).catch(() => []) ?? [], i = [...So(t.store.design, e), ...r.map((e) => e.title)];
		i.length > 0 ? L(s, U(n)("design.inUse", {
			name: e,
			where: i.join(", ")
		}), !0) : (L(s, null), t.store.designSession.update(go(t.store.design, e)));
	}
	var f = is(), p = vr(f), m = R(p), h = R(m), g = R(h), _ = R(g, !0);
	A(g);
	var v = z(g), y = R(v, !0);
	A(v);
	var b = z(v), x = R(b, !0);
	A(b), Yt(), A(h), A(m);
	var S = z(m);
	X(S, 21, () => U(r), ([e, t]) => e, (e, t) => {
		var r = /* @__PURE__ */ F(() => rt(U(t), 2));
		let i = () => U(r)[0], a = () => U(r)[1];
		var o = ts(), s = R(o), c = R(s, !0);
		A(s);
		var u = z(s), f = R(u, !0);
		A(u);
		var p = z(u), m = R(p), h = (e) => {
			var t = es();
			Q(t), B((e) => {
				$(t, "aria-label", e), va(t, a().value);
			}, [() => `${U(n)("design.value")} · ${i()}`]), W("change", t, (e) => l(i(), e.currentTarget.value)), q(e, t);
		}, g = (e) => {
			var t = Bi();
			B(() => J(t, `→ ${a().value.token ?? ""}`)), q(e, t);
		};
		Y(m, (e) => {
			typeof a().value == "string" ? e(h) : e(g, -1);
		}), A(p);
		var _ = z(p), v = R(_);
		A(_), A(o), B((e) => {
			J(c, i()), J(f, a().type), $(v, "aria-label", e);
		}, [() => U(n)("design.delete", { name: i() })]), W("click", v, () => d(i())), q(e, o);
	}), A(S), A(p);
	var C = z(p, 2), w = R(C);
	Q(w);
	var T = z(w, 2);
	X(T, 20, () => Re.tokenTypes, (e) => e, (e, t) => {
		var n = ns(), r = R(n, !0);
		A(n);
		var i = {};
		B(() => {
			J(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
		}), q(e, n);
	}), A(T);
	var ee = z(T, 2);
	Q(ee);
	var E = z(ee, 2), te = R(E, !0);
	A(E), A(C);
	var ne = z(C, 2), re = (e) => {
		var t = rs(), n = R(t, !0);
		A(t), B(() => J(n, U(s))), q(e, t);
	};
	Y(ne, (e) => {
		U(s) && e(re);
	}), B((e, n, r, i, a, o, s) => {
		J(_, e), J(y, n), J(x, r), $(w, "aria-label", i), $(T, "aria-label", a), $(ee, "aria-label", o), $(ee, "id", `${t.uid}-token-value`), J(te, s);
	}, [
		() => U(n)("design.id"),
		() => U(n)("design.type"),
		() => U(n)("design.value"),
		() => U(n)("design.id"),
		() => U(n)("design.type"),
		() => U(n)("design.value"),
		() => U(n)("design.add")
	]), Ca(w, () => U(i), (e) => L(i, e)), fa(T, () => U(a), (e) => L(a, e)), Ca(ee, () => U(o), (e) => L(o, e)), W("click", E, u), q(e, f), M();
}
G(["change", "click"]);
// src/ui/design/DesignPanel.svelte
var ss = /* @__PURE__ */ K("<button type=\"button\" role=\"tab\" class=\"svelte-m57uux\"> </button>"), cs = /* @__PURE__ */ K("<li class=\"svelte-m57uux\"><code class=\"svelte-m57uux\"> </code> </li>"), ls = /* @__PURE__ */ K("<div class=\"problems svelte-m57uux\" role=\"alert\"><p class=\"svelte-m57uux\"> </p> <ul class=\"svelte-m57uux\"></ul></div>"), us = /* @__PURE__ */ K("<button type=\"button\" class=\"svelte-m57uux\"> </button>"), ds = /* @__PURE__ */ K("<section class=\"design svelte-m57uux\"><div class=\"head svelte-m57uux\"><h2 class=\"svelte-m57uux\"> </h2> <button type=\"button\" class=\"svelte-m57uux\">×</button></div> <p class=\"meta svelte-m57uux\"> </p> <p class=\"help svelte-m57uux\"> </p> <div class=\"tabs svelte-m57uux\" role=\"tablist\"></div> <div role=\"tabpanel\" class=\"svelte-m57uux\"><!></div> <!> <div class=\"actions svelte-m57uux\"><button type=\"button\" class=\"svelte-m57uux\"> </button> <button type=\"button\" class=\"primary svelte-m57uux\"> </button> <!></div></section>"), fs = {
	hash: "svelte-m57uux",
	code: ".design.svelte-m57uux {padding:.5rem .75rem;overflow:auto;border-left:1px solid var(--cpb-border);display:grid;gap:.5rem;align-content:start;}.head.svelte-m57uux {display:flex;justify-content:space-between;align-items:center;}h2.svelte-m57uux {font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin:0;color:var(--cpb-muted);}.meta.svelte-m57uux, .help.svelte-m57uux {margin:0;font-size:.75rem;color:var(--cpb-muted);}.tabs.svelte-m57uux {display:flex;gap:.25rem;}.tabs.svelte-m57uux button[aria-selected='true']:where(.svelte-m57uux) {background:var(--cpb-accent-soft);border-color:var(--cpb-accent);}.problems.svelte-m57uux {color:var(--cpb-danger);font-size:.75rem;}.problems.svelte-m57uux p:where(.svelte-m57uux) {margin:0;}.actions.svelte-m57uux {display:flex;flex-wrap:wrap;gap:.35rem;}button.svelte-m57uux {font:inherit;font-size:.8rem;padding:.3rem .6rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.primary.svelte-m57uux {background:var(--cpb-accent);border-color:var(--cpb-accent);color:#fff;}button.svelte-m57uux:disabled {opacity:.5;cursor:not-allowed;}.svelte-m57uux:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function ps(e, t) {
	j(t, !0), Z(e, fs);
	let n = Oa(t, "store", 7), r = /* @__PURE__ */ F(() => n().t), i = /* @__PURE__ */ I("tokens"), a = /* @__PURE__ */ F(() => Ie(n().design, []).diagnostics), o = /* @__PURE__ */ F(() => !n().designDirty && n().designPublished !== n().designRevision && n().designRevision > 0 && typeof n().session.transport.publishDesign == "function");
	var s = ds(), c = R(s), l = R(c), u = R(l, !0);
	A(l);
	var d = z(l, 2);
	A(c);
	var f = z(c, 2), p = R(f);
	A(f);
	var m = z(f, 2), h = R(m, !0);
	A(m);
	var g = z(m, 2);
	X(g, 20, () => [
		["tokens", "design.tokens"],
		["classes", "design.classes"],
		["breakpoints", "design.breakpoints"]
	], ([e, t]) => e, (e, n) => {
		var a = /* @__PURE__ */ F(() => rt(n, 2));
		let o = () => U(a)[0], s = () => U(a)[1];
		var c = ss(), l = R(c, !0);
		A(c), B((e) => {
			$(c, "aria-selected", U(i) === o()), $(c, "aria-controls", `${t.uid}-design-${o()}`), J(l, e);
		}, [() => U(r)(s())]), W("click", c, () => {
			L(i, o(), !0);
		}), q(e, c);
	}), A(g);
	var _ = z(g, 2), v = R(_), y = (e) => {
		os(e, {
			get store() {
				return n();
			},
			get uid() {
				return t.uid;
			}
		});
	}, b = (e) => {
		$o(e, {
			get store() {
				return n();
			},
			get uid() {
				return t.uid;
			}
		});
	}, x = (e) => {
		Eo(e, { get store() {
			return n();
		} });
	};
	Y(v, (e) => {
		U(i) === "tokens" ? e(y) : U(i) === "classes" ? e(b, 1) : e(x, -1);
	}), A(_);
	var S = z(_, 2), C = (e) => {
		var t = ls(), n = R(t), i = R(n, !0);
		A(n);
		var o = z(n, 2);
		X(o, 21, () => U(a), (e) => e.path, (e, t) => {
			var n = cs(), r = R(n), i = R(r, !0);
			A(r);
			var a = z(r);
			A(n), B(() => {
				J(i, U(t).path), J(a, ` · ${U(t).code ?? ""}`);
			}), q(e, n);
		}), A(o), A(t), B((e) => J(i, e), [() => U(r)("design.problems")]), q(e, t);
	};
	Y(S, (e) => {
		U(a).length > 0 && e(C);
	});
	var w = z(S, 2), T = R(w), ee = R(T, !0);
	A(T);
	var E = z(T, 2), te = R(E, !0);
	A(E);
	var ne = z(E, 2), re = (e) => {
		var t = us(), i = R(t, !0);
		A(t), B((e) => J(i, e), [() => U(r)("design.reload")]), W("click", t, () => n().designAction("reload")), q(e, t);
	};
	Y(ne, (e) => {
		n().designDirty && e(re);
	}), A(w), A(s), B((e, r, c, f, m, g, v) => {
		$(s, "aria-labelledby", `${t.uid}-design-title`), $(l, "id", `${t.uid}-design-title`), J(u, e), $(d, "aria-label", r), J(p, `${c ?? ""} ·
    ${f ?? ""}`), J(h, m), $(_, "id", `${t.uid}-design-${U(i)}`), T.disabled = !n().designDirty || U(a).length > 0 || !n().designSession.editable, J(ee, g), E.disabled = !U(o), J(te, v);
	}, [
		() => U(r)("design.title"),
		() => U(r)("design.close"),
		() => U(r)("design.revision", { revision: n().designRevision }),
		() => n().designPublished === null ? U(r)("design.notPublished") : U(r)("design.publishedAt", { revision: n().designPublished }),
		() => U(r)("design.help"),
		() => U(r)("design.save"),
		() => U(r)("design.publish")
	]), W("click", d, () => {
		n().designOpen = !1;
	}), W("click", T, () => n().designAction("save")), W("click", E, () => n().designAction("publish")), q(e, s), M();
}
G(["click"]);
// src/ui/content/TemplateDialog.svelte
var ms = /* @__PURE__ */ K("<label class=\"svelte-181fmze\"> </label> <input required=\"\" maxlength=\"200\" class=\"svelte-181fmze\"/> <label class=\"svelte-181fmze\"> </label> <input maxlength=\"100\" class=\"svelte-181fmze\"/>", 1), hs = {
	hash: "svelte-181fmze",
	code: "label.svelte-181fmze {display:block;font-size:.8rem;font-weight:600;margin:.5rem 0 .25rem;}input.svelte-181fmze {width:100%;box-sizing:border-box;font:inherit;padding:.35rem .5rem;border:1px solid var(--cpb-border);border-radius:6px;}"
};
function gs(e, t) {
	j(t, !0), Z(e, hs);
	let n = Oa(t, "open", 15, !1), r = /* @__PURE__ */ F(() => t.store.t), i = /* @__PURE__ */ I(""), a = /* @__PURE__ */ I("general"), o = /* @__PURE__ */ I(!1);
	async function s() {
		if (!t.nodeId || U(i).trim() === "") return;
		L(o, !0);
		let e = await t.content.saveTemplate(t.nodeId, U(i).trim(), U(a).trim() || "general");
		L(o, !1), e && (L(i, ""), n(!1));
	}
	{
		let c = /* @__PURE__ */ F(() => U(r)("template.title")), l = /* @__PURE__ */ F(() => `${t.uid}-template`), u = /* @__PURE__ */ F(() => U(r)("template.submit")), d = /* @__PURE__ */ F(() => U(r)("dialog.cancel"));
		co(e, {
			get title() {
				return U(c);
			},
			get uid() {
				return U(l);
			},
			get submitLabel() {
				return U(u);
			},
			get cancelLabel() {
				return U(d);
			},
			get busy() {
				return U(o);
			},
			onSubmit: s,
			get open() {
				return n();
			},
			set open(e) {
				n(e);
			},
			children: (e, n) => {
				var o = ms(), s = vr(o), c = R(s, !0);
				A(s);
				var l = z(s, 2);
				Q(l);
				var u = z(l, 2), d = R(u, !0);
				A(u);
				var f = z(u, 2);
				Q(f), B((e, n) => {
					$(s, "for", `${t.uid}-template-name`), J(c, e), $(l, "id", `${t.uid}-template-name`), $(u, "for", `${t.uid}-template-category`), J(d, n), $(f, "id", `${t.uid}-template-category`);
				}, [() => U(r)("template.name"), () => U(r)("template.category")]), Ca(l, () => U(i), (e) => L(i, e)), Ca(f, () => U(a), (e) => L(a, e)), q(e, o);
			},
			$$slots: { default: !0 }
		});
	}
	M();
}
// src/ui/drag/indicator.ts
var _s = "ceiba-drop-indicator", vs = (e, t, n, r) => {
	let i = e.getElementById(_s);
	i || (i = e.createElement("div"), i.id = _s, i.setAttribute("aria-hidden", "true"), e.body.append(i));
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
}, ys = (e) => {
	e?.getElementById(_s)?.remove();
}, bs = (e, t, n, r) => {
	let i = t <= 0 ? .5 : (n - e) / t;
	return r ? i < .25 ? "before" : i > .75 ? "after" : "inside" : i < .5 ? "before" : "after";
}, xs = (e, t, n, r) => t.kind === "move" ? {
	kind: "move",
	id: t.id,
	parent: n,
	index: r
} : {
	kind: "insert",
	parent: n,
	index: r,
	node: t.node
}, Ss = (e, t, n, r, i) => {
	let a;
	if (r === null || !e.nodes[r]) a = xs(e, n, null, e.rootIds.length);
	else if (i === "inside") a = xs(e, n, r, e.nodes[r]?.children.length ?? 0);
	else {
		let t = e.nodes[r]?.parent ?? null;
		a = xs(e, n, t, be(e, t).indexOf(r) + +(i === "after"));
	}
	let o = r !== null && e.nodes[r] ? r : null;
	if (n.kind === "move" && a.kind === "move" && Cs(e, n.id, a.parent, a.index)) return {
		command: null,
		anchor: o,
		zone: i,
		refused: null
	};
	try {
		return ve(e, a, t), {
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
			refused: e instanceof me ? e.code : "SERVER"
		};
	}
}, Cs = (e, t, n, r) => {
	if (e.nodes[t]?.parent !== n) return !1;
	let i = be(e, n).indexOf(t);
	return r === i || r === i + 1;
}, ws = 5, Ts = class {
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
			!this.active && Math.hypot(e.clientX - r.x, e.clientY - r.y) < ws || (this.active || this.begin({
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
			if (!this.active && Math.hypot(e.clientX - i.x, e.clientY - i.y) < ws) return;
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
		let i = n.elementFromPoint(e, t)?.closest("[data-ceiba-id]") ?? null, a = i?.dataset.ceibaId ?? null, o = a ? this.store.tree.nodes[a] : void 0, s = i?.getBoundingClientRect(), c = o ? this.store.catalogue?.get(o.type)?.isContainer ?? !1 : !1, l = s ? bs(s.top, s.height, t, c) : "inside";
		this.active.target = Ss(this.store.tree, r, this.active.dragged, a, l), vs(n, i, l, this.active.target.refused !== null);
	}
	clearTarget() {
		this.active && (this.active.target = null), ys(this.doc);
	}
	finish(e) {
		let t = this.active;
		if (this.active = null, ys(this.doc), this.frame && (this.frame.style.pointerEvents = ""), this.doc?.body.classList.remove("ceiba-dragging"), document.removeEventListener("keydown", this.onKey, !0), this.doc?.removeEventListener("keydown", this.onKey, !0), !t) return;
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
}, Es = /* @__PURE__ */ K("<li class=\"svelte-239l1j\"> <button type=\"button\" class=\"svelte-239l1j\">×</button></li>"), Ds = /* @__PURE__ */ K("<option class=\"svelte-239l1j\"> </option>"), Os = /* @__PURE__ */ K("<select class=\"svelte-239l1j\"><option class=\"svelte-239l1j\"> </option><!></select>"), ks = /* @__PURE__ */ K("<div class=\"classes svelte-239l1j\"><label class=\"svelte-239l1j\"> </label> <ul class=\"svelte-239l1j\"></ul> <!></div>"), As = {
	hash: "svelte-239l1j",
	code: ".classes.svelte-239l1j {margin:.5rem 0;display:grid;gap:.25rem;}label.svelte-239l1j {font-size:.75rem;font-weight:600;}ul.svelte-239l1j {list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:.25rem;}li.svelte-239l1j {font-size:.75rem;padding:.1rem .2rem .1rem .5rem;border-radius:999px;background:var(--cpb-accent-soft);display:flex;align-items:center;gap:.25rem;}button.svelte-239l1j {font:inherit;border:none;background:none;cursor:pointer;padding:0 .25rem;}select.svelte-239l1j {font:inherit;font-size:.8rem;padding:.25rem .4rem;border:1px solid var(--cpb-border);border-radius:6px;}.svelte-239l1j:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function js(e, t) {
	j(t, !0), Z(e, As);
	let n = /* @__PURE__ */ F(() => t.store.t), r = /* @__PURE__ */ F(() => t.node.fields.styles), i = /* @__PURE__ */ F(() => U(r)?.classes ?? []), a = /* @__PURE__ */ F(() => Object.entries(t.store.design.classes).filter(([e]) => !U(i).includes(e)));
	function o(e) {
		let n = Te(U(r), e);
		t.store.run(n === null ? {
			kind: "updateFields",
			id: t.node.id,
			set: {},
			unset: ["styles"]
		} : {
			kind: "updateFields",
			id: t.node.id,
			set: { styles: n }
		});
	}
	var s = Vi(), c = vr(s), l = (e) => {
		var r = ks(), s = R(r), c = R(s, !0);
		A(s);
		var l = z(s, 2);
		X(l, 20, () => U(i), (e) => e, (e, r) => {
			var a = Es(), s = R(a), c = z(s);
			A(a), B((e) => {
				J(s, `${t.store.design.classes[r]?.name ?? r ?? ""} `), $(c, "aria-label", e);
			}, [() => U(n)("styles.removeClass", { name: t.store.design.classes[r]?.name ?? r })]), W("click", c, () => o(U(i).filter((e) => e !== r))), q(e, a);
		}), A(l);
		var u = z(l, 2), d = (e) => {
			var r = Os(), s = R(r), c = R(s, !0);
			A(s), s.value = s.__value = "", X(z(s), 17, () => U(a), ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ F(() => rt(U(t), 2));
				let r = () => U(n)[0], i = () => U(n)[1];
				var a = Ds(), o = R(a, !0);
				A(a);
				var s = {};
				B(() => {
					J(o, i().name ?? r()), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
				}), q(e, a);
			}), A(r), r.value = r.__value = "", B((e) => {
				$(r, "id", `${t.uid}-add-class`), J(c, e);
			}, [() => U(n)("styles.addClass")]), W("change", r, (e) => {
				e.currentTarget.value && o([...U(i), e.currentTarget.value]);
			}), q(e, r);
		};
		Y(u, (e) => {
			U(a).length > 0 && e(d);
		}), A(r), B((e) => {
			$(s, "for", `${t.uid}-add-class`), J(c, e);
		}, [() => U(n)("styles.classes")]), q(e, r);
	}, u = /* @__PURE__ */ F(() => Object.keys(t.store.design.classes).length > 0);
	Y(c, (e) => {
		U(u) && e(l);
	}), q(e, s), M();
}
G(["click", "change"]);
// src/ui/inspector/advanced/loop.ts
var Ms = (e) => typeof e == "object" && e && !Array.isArray(e) ? e : {}, Ns = (e) => {
	let t = Ms(e), n = typeof t.source == "string" ? t.source : "", r = Ms(t.sort);
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
		filters: Object.entries(Ms(t.filters)).map(([e, t]) => `${e}=${String(t)}`).join("\n")
	};
}, Ps = (e) => {
	if (e.trim() === "") return;
	let t = Number(e);
	return Number.isInteger(t) && t >= 0 ? t : null;
}, Fs = (e) => {
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
		let e = Ps(r);
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
}, Is = /* @__PURE__ */ K("<div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input class=\"svelte-1v8f4it\"/></div>"), Ls = /* @__PURE__ */ K("<div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input type=\"url\" class=\"svelte-1v8f4it\"/></div>"), Rs = /* @__PURE__ */ K("<div class=\"grid svelte-1v8f4it\"><div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input class=\"svelte-1v8f4it\"/></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input class=\"svelte-1v8f4it\"/></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input inputmode=\"numeric\" class=\"svelte-1v8f4it\"/></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input inputmode=\"numeric\" class=\"svelte-1v8f4it\"/></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input class=\"svelte-1v8f4it\"/></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label> <select class=\"svelte-1v8f4it\"><option class=\"svelte-1v8f4it\">ASC</option><option class=\"svelte-1v8f4it\">DESC</option></select></div></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><textarea rows=\"3\" class=\"svelte-1v8f4it\"></textarea></div>", 1), zs = /* @__PURE__ */ K("<p class=\"error svelte-1v8f4it\" role=\"alert\"> </p>"), Bs = /* @__PURE__ */ K("<details class=\"advanced svelte-1v8f4it\"><summary class=\"svelte-1v8f4it\"> </summary> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label> <select class=\"svelte-1v8f4it\"><option class=\"svelte-1v8f4it\"> </option><option class=\"svelte-1v8f4it\"> </option><option class=\"svelte-1v8f4it\"> </option></select></div> <!> <!> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input class=\"svelte-1v8f4it\"/></div> <!> <button type=\"button\" class=\"svelte-1v8f4it\"> </button></details>"), Vs = {
	hash: "svelte-1v8f4it",
	code: ".advanced.svelte-1v8f4it {margin-top:1rem;border-top:1px solid var(--cpb-border);padding-top:.5rem;}summary.svelte-1v8f4it {cursor:pointer;font-size:.8rem;font-weight:700;}.grid.svelte-1v8f4it {display:grid;grid-template-columns:1fr 1fr;gap:0 .5rem;}.field.svelte-1v8f4it {display:grid;gap:.25rem;margin:.5rem 0;}label.svelte-1v8f4it {font-size:.75rem;font-weight:600;}input.svelte-1v8f4it, select.svelte-1v8f4it, textarea.svelte-1v8f4it {font:inherit;font-size:.8rem;padding:.3rem .45rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}.error.svelte-1v8f4it {color:var(--cpb-danger);font-size:.75rem;margin:0;}button.svelte-1v8f4it {font:inherit;font-size:.8rem;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}.svelte-1v8f4it:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Hs(e, t) {
	j(t, !0), Z(e, Vs);
	let n = /* @__PURE__ */ F(() => t.store.t), r = sr(Ti(() => Ns(t.node.fields.loop))), i = /* @__PURE__ */ I(sr(Ti(() => typeof t.node.fields.condition == "string" ? t.node.fields.condition : ""))), a = /* @__PURE__ */ I(null), o = (e) => `${t.uid}-adv-${e}`;
	function s() {
		let e = Fs(r);
		if ("error" in e) {
			L(a, U(n)(e.error), !0);
			return;
		}
		L(a, null);
		let o = {}, s = [];
		e.loop ? o.loop = e.loop : s.push("loop"), U(i).trim() === "" ? s.push("condition") : o.condition = U(i).trim(), t.store.run({
			kind: "updateFields",
			id: t.node.id,
			set: o,
			unset: s
		});
	}
	var c = Bs(), l = R(c), u = R(l, !0);
	A(l);
	var d = z(l, 2), f = R(d), p = R(f, !0);
	A(f);
	var m = z(f, 2), h = R(m), g = R(h, !0);
	A(h), h.value = h.__value = "none";
	var _ = z(h), v = R(_, !0);
	A(_), _.value = _.__value = "module";
	var y = z(_), b = R(y, !0);
	A(y), y.value = y.__value = "api", A(m), A(d);
	var x = z(d, 2), S = (e) => {
		var t = Is(), i = R(t), a = R(i, !0);
		A(i);
		var s = z(i);
		Q(s), A(t), B((e, t, n) => {
			$(i, "for", e), J(a, t), $(s, "id", n);
		}, [
			() => o("module"),
			() => U(n)("advanced.moduleSlug"),
			() => o("module")
		]), Ca(s, () => r.module, (e) => r.module = e), q(e, t);
	}, C = (e) => {
		var t = Ls(), i = R(t), a = R(i, !0);
		A(i);
		var s = z(i);
		Q(s), A(t), B((e, t, n) => {
			$(i, "for", e), J(a, t), $(s, "id", n);
		}, [
			() => o("api"),
			() => U(n)("advanced.apiUrl"),
			() => o("api")
		]), Ca(s, () => r.api, (e) => r.api = e), q(e, t);
	};
	Y(x, (e) => {
		r.sourceType === "module" ? e(S) : r.sourceType === "api" && e(C, 1);
	});
	var w = z(x, 2), T = (e) => {
		var t = Rs(), i = vr(t), a = R(i), s = R(a), c = R(s, !0);
		A(s);
		var l = z(s);
		Q(l), A(a);
		var u = z(a, 2), d = R(u), f = R(d, !0);
		A(d);
		var p = z(d);
		Q(p), A(u);
		var m = z(u, 2), h = R(m), g = R(h, !0);
		A(h);
		var _ = z(h);
		Q(_), A(m);
		var v = z(m, 2), y = R(v), b = R(y, !0);
		A(y);
		var x = z(y);
		Q(x), A(v);
		var S = z(v, 2), C = R(S), w = R(C, !0);
		A(C);
		var T = z(C);
		Q(T), A(S);
		var ee = z(S, 2), E = R(ee), te = R(E, !0);
		A(E);
		var ne = z(E, 2), re = R(ne);
		re.value = re.__value = "ASC";
		var ie = z(re);
		ie.value = ie.__value = "DESC", A(ne), A(ee), A(i);
		var ae = z(i, 2), oe = R(ae), se = R(oe, !0);
		A(oe);
		var ce = z(oe);
		Cr(ce), A(ae), B((e, t, n, r, i, a, o, u, m, v, S, ee, re, ie, ae, le, ue, de, fe, pe, me) => {
			$(s, "for", e), J(c, t), $(l, "id", n), $(d, "for", r), J(f, i), $(p, "id", a), $(h, "for", o), J(g, u), $(_, "id", m), $(y, "for", v), J(b, S), $(x, "id", ee), $(C, "for", re), J(w, ie), $(T, "id", ae), $(E, "for", le), J(te, ue), $(ne, "id", de), $(oe, "for", fe), J(se, pe), $(ce, "id", me);
		}, [
			() => o("variable"),
			() => U(n)("advanced.variable"),
			() => o("variable"),
			() => o("key"),
			() => U(n)("advanced.key"),
			() => o("key"),
			() => o("limit"),
			() => U(n)("advanced.limit"),
			() => o("limit"),
			() => o("offset"),
			() => U(n)("advanced.offset"),
			() => o("offset"),
			() => o("sort"),
			() => U(n)("advanced.sort"),
			() => o("sort"),
			() => o("direction"),
			() => U(n)("advanced.direction"),
			() => o("direction"),
			() => o("filters"),
			() => U(n)("advanced.filters"),
			() => o("filters")
		]), Ca(l, () => r.variable, (e) => r.variable = e), Ca(p, () => r.key, (e) => r.key = e), Ca(_, () => r.limit, (e) => r.limit = e), Ca(x, () => r.offset, (e) => r.offset = e), Ca(T, () => r.sortColumn, (e) => r.sortColumn = e), fa(ne, () => r.sortDirection, (e) => r.sortDirection = e), Ca(ce, () => r.filters, (e) => r.filters = e), q(e, t);
	};
	Y(w, (e) => {
		r.sourceType !== "none" && e(T);
	});
	var ee = z(w, 2), E = R(ee), te = R(E, !0);
	A(E);
	var ne = z(E);
	Q(ne), A(ee);
	var re = z(ee, 2), ie = (e) => {
		var t = zs(), n = R(t, !0);
		A(t), B(() => J(n, U(a))), q(e, t);
	};
	Y(re, (e) => {
		U(a) && e(ie);
	});
	var ae = z(re, 2), oe = R(ae, !0);
	A(ae), A(c), B((e, t, n, r, i, a, o, s, c, l, d) => {
		J(u, e), $(f, "for", t), J(p, n), $(m, "id", r), J(g, i), J(v, a), J(b, o), $(E, "for", s), J(te, c), $(ne, "id", l), J(oe, d);
	}, [
		() => U(n)("advanced.title"),
		() => o("source"),
		() => U(n)("advanced.source"),
		() => o("source"),
		() => U(n)("advanced.none"),
		() => U(n)("advanced.module"),
		() => U(n)("advanced.api"),
		() => o("condition"),
		() => U(n)("advanced.condition"),
		() => o("condition"),
		() => U(n)("advanced.apply")
	]), fa(m, () => r.sourceType, (e) => r.sourceType = e), Ca(ne, () => U(i), (e) => L(i, e)), W("click", ae, s), q(e, c), M();
}
G(["click"]);
// src/ui/inspector/fields.ts
var Us = {
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
}, Ws = /* @__PURE__ */ new Set([
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
]), Gs = (e) => e.charAt(0).toUpperCase() + e.slice(1).replace(/[_-]/g, " "), Ks = (e) => {
	let t = [], n = /* @__PURE__ */ new Set();
	for (let [r, i] of Object.entries(e.editorControls)) {
		let e = i, a = e.options?.map(String);
		t.push({
			key: r,
			label: e.label ?? Gs(r),
			control: Us[e.type ?? ""] ?? "text",
			...a ? { options: a } : {}
		}), n.add(r);
	}
	for (let [r, i] of Object.entries(e.propsSchema)) {
		if (n.has(r)) continue;
		let e = i, a = e.enum?.map(String);
		t.push({
			key: r,
			label: Gs(r),
			control: a ? "select" : Us[e.type ?? ""] ?? "text",
			...a ? { options: a } : {}
		}), n.add(r);
	}
	return Object.keys(e.propsSchema).length === 0 && Object.keys(e.editorControls).length === 0 && (Ws.has(e.type) && t.push({
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
}, qs = (e, t) => {
	if (e.control === "checkbox") return { value: t === !0 };
	let n = String(t);
	if (e.control === "number") {
		if (n.trim() === "") return { value: null };
		let e = Number(n);
		return Number.isFinite(e) ? { value: e } : { error: "field.number" };
	}
	return e.control === "url" && n.trim() !== "" && Aa(n) === "" ? { error: "field.url" } : e.control === "select" && e.options && !e.options.includes(n) ? { error: "field.option" } : e.control === "select" && e.options?.every((e) => /^\d+$/.test(e)) ? { value: Number(n) } : { value: n };
}, Js = /* @__PURE__ */ K("<label class=\"svelte-1g42mo8\"><input type=\"checkbox\" class=\"svelte-1g42mo8\"/> </label>"), Ys = /* @__PURE__ */ K("<textarea rows=\"3\" class=\"svelte-1g42mo8\"></textarea>"), Xs = /* @__PURE__ */ K("<option> </option>"), Zs = /* @__PURE__ */ K("<select class=\"svelte-1g42mo8\"></select>"), Qs = /* @__PURE__ */ K("<input class=\"svelte-1g42mo8\"/>"), $s = /* @__PURE__ */ K("<label class=\"svelte-1g42mo8\"> </label> <!>", 1), ec = /* @__PURE__ */ K("<p class=\"error svelte-1g42mo8\" role=\"alert\"> </p>"), tc = /* @__PURE__ */ K("<div class=\"field svelte-1g42mo8\"><!> <!></div>"), nc = {
	hash: "svelte-1g42mo8",
	code: ".field.svelte-1g42mo8 {display:grid;gap:.25rem;margin-bottom:.75rem;}label.svelte-1g42mo8 {font-size:.8rem;font-weight:600;}input.svelte-1g42mo8:not([type='checkbox']), textarea.svelte-1g42mo8, select.svelte-1g42mo8 {font:inherit;font-size:.875rem;padding:.35rem .5rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}[aria-invalid='true'].svelte-1g42mo8 {border-color:var(--cpb-danger);}input.svelte-1g42mo8:focus-visible, textarea.svelte-1g42mo8:focus-visible, select.svelte-1g42mo8:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}.error.svelte-1g42mo8 {color:var(--cpb-danger);font-size:.75rem;margin:0;}"
};
function rc(e, t) {
	j(t, !0), Z(e, nc);
	let n = /* @__PURE__ */ I(null), r = /* @__PURE__ */ F(() => t.value === null || t.value === void 0 ? "" : String(t.value));
	function i(e) {
		let r = qs(t.field, e);
		"error" in r ? L(n, t.t(r.error), !0) : (L(n, null), t.onChange(r.value));
	}
	var a = tc(), o = R(a), s = (e) => {
		var n = Js(), r = R(n);
		Q(r);
		var a = z(r);
		A(n), B(() => {
			$(r, "id", t.id), ya(r, t.value === !0), J(a, ` ${t.field.label ?? ""}`);
		}), W("change", r, (e) => i(e.currentTarget.checked)), q(e, n);
	}, c = (e) => {
		var a = $s(), o = vr(a), s = R(o, !0);
		A(o);
		var c = z(o, 2), l = (e) => {
			var a = Ys();
			Cr(a), B(() => {
				$(a, "id", t.id), va(a, U(r)), $(a, "aria-invalid", U(n) !== null), $(a, "aria-describedby", U(n) ? `${t.id}-error` : void 0);
			}), W("input", a, (e) => i(e.currentTarget.value)), q(e, a);
		}, u = (e) => {
			var n = Zs();
			X(n, 20, () => t.field.options ?? [], (e) => e, (e, t) => {
				var n = Xs(), r = R(n, !0);
				A(n);
				var i = {};
				B(() => {
					J(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
				}), q(e, n);
			}), A(n);
			var a;
			da(n), B(() => {
				$(n, "id", t.id), a !== (a = U(r)) && (n.value = (n.__value = U(r)) ?? "", ua(n, U(r)));
			}), W("change", n, (e) => i(e.currentTarget.value)), q(e, n);
		}, d = (e) => {
			var a = Qs();
			Q(a), B(() => {
				$(a, "id", t.id), $(a, "type", t.field.control === "number" ? "number" : t.field.control === "url" ? "url" : "text"), va(a, U(r)), $(a, "aria-invalid", U(n) !== null), $(a, "aria-describedby", U(n) ? `${t.id}-error` : void 0);
			}), W("input", a, (e) => i(e.currentTarget.value)), q(e, a);
		};
		Y(c, (e) => {
			t.field.control === "textarea" ? e(l) : t.field.control === "select" ? e(u, 1) : e(d, -1);
		}), B(() => {
			$(o, "for", t.id), J(s, t.field.label);
		}), q(e, a);
	};
	Y(o, (e) => {
		t.field.control === "checkbox" ? e(s) : e(c, -1);
	});
	var l = z(o, 2), u = (e) => {
		var r = ec(), i = R(r, !0);
		A(r), B(() => {
			$(r, "id", `${t.id}-error`), J(i, U(n));
		}), q(e, r);
	};
	Y(l, (e) => {
		U(n) && e(u);
	}), A(a), q(e, a), M();
}
G(["change", "input"]);
// src/ui/inspector/Inspector.svelte
var ic = /* @__PURE__ */ K("<p class=\"hint svelte-2ghsnx\"> </p>"), ac = /* @__PURE__ */ K("<p class=\"locked svelte-2ghsnx\" role=\"note\"> </p>"), oc = /* @__PURE__ */ K("<!> <!>", 1), sc = /* @__PURE__ */ K("<button type=\"button\" class=\"svelte-2ghsnx\"> </button>"), cc = /* @__PURE__ */ K("<p class=\"type svelte-2ghsnx\"> </p> <div class=\"field svelte-2ghsnx\"><label class=\"svelte-2ghsnx\"> </label> <input type=\"text\" class=\"svelte-2ghsnx\"/></div> <!> <!> <div class=\"actions svelte-2ghsnx\"><button type=\"button\" class=\"svelte-2ghsnx\"> </button> <!> <button type=\"button\" class=\"danger svelte-2ghsnx\"> </button></div>", 1), lc = /* @__PURE__ */ K("<section class=\"inspector svelte-2ghsnx\"><h2 class=\"svelte-2ghsnx\"> </h2> <!></section>"), uc = {
	hash: "svelte-2ghsnx",
	code: ".inspector.svelte-2ghsnx {padding:.5rem .75rem;overflow:auto;border-left:1px solid var(--cpb-border);}h2.svelte-2ghsnx {font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin:0 0 .5rem;color:var(--cpb-muted);}.hint.svelte-2ghsnx, .locked.svelte-2ghsnx {font-size:.85rem;color:var(--cpb-muted);}.locked.svelte-2ghsnx {color:var(--cpb-danger);}.type.svelte-2ghsnx {font-weight:700;margin:0 0 .75rem;}.field.svelte-2ghsnx {display:grid;gap:.25rem;margin-bottom:.75rem;}label.svelte-2ghsnx {font-size:.8rem;font-weight:600;}input.svelte-2ghsnx {font:inherit;font-size:.875rem;padding:.35rem .5rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}.actions.svelte-2ghsnx {display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1rem;}button.svelte-2ghsnx {font:inherit;font-size:.8rem;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.danger.svelte-2ghsnx {color:var(--cpb-danger);}button.svelte-2ghsnx:focus-visible, input.svelte-2ghsnx:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function dc(e, t) {
	j(t, !0), Z(e, uc);
	let n = Oa(t, "canTemplates", 3, !1), r = /* @__PURE__ */ F(() => t.store.t), i = /* @__PURE__ */ F(() => t.store.selection ? t.store.tree.nodes[t.store.selection] : void 0), a = /* @__PURE__ */ F(() => U(i) ? t.store.catalogue?.get(U(i).type) : void 0), o = /* @__PURE__ */ F(() => U(a) ? Ks(U(a)) : []), s = /* @__PURE__ */ F(() => {
		let e = U(i)?.fields.props;
		return typeof e == "object" && e && !Array.isArray(e) ? e : {};
	});
	function c(e, n) {
		U(i) && (n === null || n === "" ? t.store.run({
			kind: "updateProps",
			id: U(i).id,
			set: {},
			unset: [e]
		}) : t.store.run({
			kind: "updateProps",
			id: U(i).id,
			set: { [e]: n }
		}));
	}
	function l(e) {
		if (!U(i)) return;
		let n = typeof U(i).fields.name == "string" ? U(i).fields.name : null;
		t.store.run({
			kind: "rename",
			id: U(i).id,
			name: n,
			label: e.trim() === "" ? null : e
		});
	}
	function u(e) {
		U(i) && t.store.run(e === null ? {
			kind: "updateFields",
			id: U(i).id,
			set: {},
			unset: ["styles"]
		} : {
			kind: "updateFields",
			id: U(i).id,
			set: { styles: e }
		});
	}
	function d() {
		U(i) && t.store.run({
			kind: "remove",
			id: U(i).id
		}, ["announce.removed"]) && t.onRemoved();
	}
	var f = lc(), p = R(f), m = R(p, !0);
	A(p);
	var h = z(p, 2), g = (e) => {
		var t = ic(), n = R(t, !0);
		A(t), B((e) => J(n, e), [() => U(r)("inspector.none")]), q(e, t);
	}, _ = (e) => {
		var f = Vi();
		Yi(vr(f), () => U(i).id, (e) => {
			var f = cc(), p = vr(f), m = R(p, !0);
			A(p);
			var h = z(p, 2), g = R(h), _ = R(g, !0);
			A(g);
			var v = z(g, 2);
			Q(v), A(h);
			var y = z(h, 2), b = (e) => {
				var t = ac(), n = R(t, !0);
				A(t), B((e) => J(n, e), [() => U(r)("inspector.locked")]), q(e, t);
			}, x = (e) => {
				var n = Vi();
				X(vr(n), 17, () => U(o), (e) => e.key, (e, n) => {
					{
						let i = /* @__PURE__ */ F(() => `${t.uid}-prop-${U(n).key}`);
						rc(e, {
							get field() {
								return U(n);
							},
							get t() {
								return U(r);
							},
							get id() {
								return U(i);
							},
							get value() {
								return U(s)[U(n).key];
							},
							onChange: (e) => c(U(n).key, e)
						});
					}
				}), q(e, n);
			};
			Y(y, (e) => {
				U(a) ? e(x, -1) : e(b);
			});
			var S = z(y, 2), C = (e) => {
				var n = oc(), r = vr(n);
				Jo(r, {
					get store() {
						return t.store;
					},
					get uid() {
						return t.uid;
					},
					get styles() {
						return U(i).fields.styles;
					},
					onSet: (e) => u(e),
					children: (e, n) => {
						js(e, {
							get store() {
								return t.store;
							},
							get node() {
								return U(i);
							},
							get uid() {
								return t.uid;
							}
						});
					},
					$$slots: { default: !0 }
				}), Hs(z(r, 2), {
					get store() {
						return t.store;
					},
					get node() {
						return U(i);
					},
					get uid() {
						return t.uid;
					}
				}), q(e, n);
			};
			Y(S, (e) => {
				U(a) && e(C);
			});
			var w = z(S, 2), T = R(w), ee = R(T, !0);
			A(T);
			var E = z(T, 2), te = (e) => {
				var n = sc(), i = R(n, !0);
				A(n), B((e) => J(i, e), [() => U(r)("inspector.saveTemplate")]), W("click", n, function(...e) {
					t.onSaveTemplate?.apply(this, e);
				}), q(e, n);
			};
			Y(E, (e) => {
				n() && e(te);
			});
			var ne = z(E, 2), re = R(ne, !0);
			A(ne), A(w), B((e, n, r) => {
				J(m, U(a)?.label ?? U(i).type), $(g, "for", `${t.uid}-name`), J(_, e), $(v, "id", `${t.uid}-name`), va(v, typeof U(i).fields.label == "string" ? U(i).fields.label : ""), J(ee, n), J(re, r);
			}, [
				() => U(r)("inspector.name"),
				() => U(r)("inspector.duplicate"),
				() => U(r)("inspector.remove")
			]), W("input", v, (e) => l(e.currentTarget.value)), W("click", T, () => U(i) && t.store.run({
				kind: "duplicate",
				id: U(i).id
			})), W("click", ne, d), q(e, f);
		}), q(e, f);
	};
	Y(h, (e) => {
		U(i) ? e(_, -1) : e(g);
	}), A(f), B((e) => {
		$(f, "aria-labelledby", `${t.uid}-inspector-title`), $(p, "id", `${t.uid}-inspector-title`), J(m, e);
	}, [() => U(r)("inspector.title")]), q(e, f), M();
}
G(["input", "click"]);
// src/ui/palette/Palette.svelte
var fc = /* @__PURE__ */ K("<button type=\"button\" class=\"wide svelte-om8jxl\"> </button>"), pc = /* @__PURE__ */ K("<li><button type=\"button\" class=\"svelte-om8jxl\"> </button></li>"), mc = /* @__PURE__ */ K("<h3 class=\"svelte-om8jxl\"> </h3> <ul class=\"svelte-om8jxl\"></ul>", 1), hc = /* @__PURE__ */ K("<li><button type=\"button\" class=\"svelte-om8jxl\"> </button></li>"), gc = /* @__PURE__ */ K("<h3 class=\"svelte-om8jxl\"> </h3> <ul class=\"svelte-om8jxl\"></ul>", 1), _c = /* @__PURE__ */ K("<section class=\"palette svelte-om8jxl\" aria-labelledby=\"cpb-palette-title\"><h2 id=\"cpb-palette-title\" class=\"svelte-om8jxl\"> </h2> <!> <!> <!></section>"), vc = {
	hash: "svelte-om8jxl",
	code: ".palette.svelte-om8jxl {padding:.5rem .75rem;overflow:auto;}h2.svelte-om8jxl {font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin:0 0 .5rem;color:var(--cpb-muted);}h3.svelte-om8jxl {font-size:.75rem;margin:.5rem 0 .25rem;color:var(--cpb-muted);text-transform:capitalize;}ul.svelte-om8jxl {list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2, 1fr);gap:.25rem;}button.svelte-om8jxl {touch-action:none;width:100%;font:inherit;font-size:.8rem;padding:.35rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;text-align:left;}button.svelte-om8jxl:hover {border-color:var(--cpb-accent);}.wide.svelte-om8jxl {margin-bottom:.5rem;text-align:center;}button.svelte-om8jxl:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function yc(e, t) {
	j(t, !0), Z(e, vc);
	let n = /* @__PURE__ */ F(() => t.store.t), r = [
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
	], i = /* @__PURE__ */ F(() => {
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
	var o = _c(), s = R(o), c = R(s, !0);
	A(s);
	var l = z(s, 2), u = (e) => {
		var r = fc(), i = R(r, !0);
		A(r), B((e) => J(i, e), [() => U(n)("palette.import")]), W("click", r, function(...e) {
			t.onImport?.apply(this, e);
		}), q(e, r);
	};
	Y(l, (e) => {
		t.content.canImport && e(u);
	});
	var d = z(l, 2), f = (e) => {
		var r = mc(), i = vr(r), a = R(i, !0);
		A(i);
		var o = z(i, 2);
		X(o, 21, () => t.content.templates, (e) => e.id, (e, r) => {
			var i = pc(), a = R(i), o = R(a, !0);
			A(a), A(i), B((e) => {
				$(a, "aria-label", e), J(o, U(r).name);
			}, [() => U(n)("palette.insertTemplate", { name: U(r).name })]), W("click", a, () => {
				t.content.insertNodes(U(r).nodes, U(r).name) && t.store.selection && t.onInserted(t.store.selection);
			}), q(e, i);
		}), A(o), B((e) => J(a, e), [() => U(n)("palette.templates")]), q(e, r);
	};
	Y(d, (e) => {
		t.content.canTemplates && t.content.templates.length > 0 && e(f);
	}), X(z(d, 2), 17, () => U(i), ([e, t]) => e, (e, r) => {
		var i = /* @__PURE__ */ F(() => rt(U(r), 2));
		let o = () => U(i)[0], s = () => U(i)[1];
		var c = gc(), l = vr(c), u = R(l, !0);
		A(l);
		var d = z(l, 2);
		X(d, 21, s, (e) => e.type, (e, r) => {
			var i = hc(), o = R(i), s = R(o, !0);
			A(o), A(i), B((e) => {
				$(o, "aria-label", e), $(o, "data-type", U(r).type), J(s, U(r).label);
			}, [() => U(n)("palette.insert", { label: U(r).label })]), W("click", o, () => a(U(r))), W("pointerdown", o, (e) => t.store.catalogue && t.drag.pressNew(e, {
				kind: "insert",
				node: to(t.store.catalogue, U(r).type)
			}, U(r).label)), q(e, i);
		}), A(d), B((e) => J(u, e), [() => o().replace(/_/g, " ")]), q(e, c);
	}), A(o), B((e) => J(c, e), [() => U(n)("palette.title")]), q(e, o), M();
}
G(["click", "pointerdown"]);
// src/ui/publish/ConflictBanner.svelte
var bc = /* @__PURE__ */ K("<button type=\"button\" class=\"svelte-1ti6kqq\"> </button>"), xc = /* @__PURE__ */ K("<div class=\"conflict svelte-1ti6kqq\" role=\"alertdialog\" aria-modal=\"false\" tabindex=\"-1\"><strong> </strong> <p class=\"svelte-1ti6kqq\"> </p> <div class=\"actions svelte-1ti6kqq\"><button type=\"button\" class=\"primary svelte-1ti6kqq\"> </button> <button type=\"button\" class=\"svelte-1ti6kqq\"> </button> <!></div></div>"), Sc = {
	hash: "svelte-1ti6kqq",
	code: ".conflict.svelte-1ti6kqq {margin:.5rem .75rem 0;padding:.75rem;border:2px solid var(--cpb-danger);border-radius:8px;background:#fef2f2;}.conflict.svelte-1ti6kqq:focus-visible {outline:2px solid var(--cpb-danger);outline-offset:2px;}p.svelte-1ti6kqq {margin:.25rem 0 .5rem;font-size:.875rem;}.actions.svelte-1ti6kqq {display:flex;flex-wrap:wrap;gap:.5rem;}button.svelte-1ti6kqq {font:inherit;font-size:.85rem;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.primary.svelte-1ti6kqq {background:var(--cpb-danger);border-color:var(--cpb-danger);color:#fff;}button.svelte-1ti6kqq:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:2px;}"
};
function Cc(e, t) {
	j(t, !0), Z(e, Sc);
	let n = /* @__PURE__ */ F(() => t.store.t), r = /* @__PURE__ */ I(void 0);
	Nr(() => {
		t.store.status === "conflict" && Si().then(() => U(r)?.focus());
	});
	var i = Vi(), a = vr(i), o = (e) => {
		var i = xc(), a = R(i), o = R(a, !0);
		A(a);
		var s = z(a, 2), c = R(s, !0);
		A(s);
		var l = z(s, 2), u = R(l), d = R(u, !0);
		A(u);
		var f = z(u, 2), p = R(f, !0);
		A(f);
		var m = z(f, 2), h = (e) => {
			var r = bc(), i = R(r, !0);
			A(r), B((e) => J(i, e), [() => U(n)("conflict.view")]), W("click", r, () => t.onView?.(t.store.conflictRevision)), q(e, r);
		};
		Y(m, (e) => {
			t.onView && t.store.conflictRevision && e(h);
		}), A(l), A(i), Da(i, (e) => L(r, e), () => U(r)), B((e, n, r, l) => {
			$(i, "aria-labelledby", `${t.uid}-conflict-title`), $(i, "aria-describedby", `${t.uid}-conflict-body`), $(a, "id", `${t.uid}-conflict-title`), J(o, e), $(s, "id", `${t.uid}-conflict-body`), J(c, n), J(d, r), J(p, l);
		}, [
			() => U(n)("conflict.title"),
			() => U(n)("conflict.body", {
				revision: t.store.conflictRevision ?? "?",
				base: t.store.revision
			}),
			() => U(n)("conflict.keepMine"),
			() => U(n)("conflict.takeTheirs")
		]), W("click", u, () => t.store.resolve("keep-mine")), W("click", f, () => t.store.resolve("take-theirs")), q(e, i);
	};
	Y(a, (e) => {
		t.store.status === "conflict" && e(o);
	}), q(e, i), M();
}
G(["click"]);
// src/ui/publish/ServerView.svelte
var wc = /* @__PURE__ */ K("<p class=\"note svelte-ztrun4\"> </p>"), Tc = /* @__PURE__ */ K("<p class=\"note svelte-ztrun4\" role=\"status\"> </p>"), Ec = /* @__PURE__ */ K("<iframe sandbox=\"\" class=\"svelte-ztrun4\"></iframe>"), Dc = /* @__PURE__ */ K("<div class=\"server svelte-ztrun4\"><div class=\"bar svelte-ztrun4\"><strong> </strong> <button type=\"button\" class=\"svelte-ztrun4\"> </button></div> <!> <!></div>"), Oc = {
	hash: "svelte-ztrun4",
	code: ".server.svelte-ztrun4 {background:var(--cpb-canvas);padding:.5rem 1rem 1rem;min-height:0;display:flex;flex-direction:column;gap:.5rem;}.bar.svelte-ztrun4 {display:flex;align-items:center;gap:.75rem;}.note.svelte-ztrun4 {margin:0;font-size:.8rem;color:var(--cpb-muted);}button.svelte-ztrun4 {margin-left:auto;font:inherit;font-size:.8rem;padding:.3rem .7rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}iframe.svelte-ztrun4 {flex:1;width:100%;min-height:480px;border:1px solid var(--cpb-border);border-radius:8px;background:#fff;}"
};
function kc(e, t) {
	j(t, !0), Z(e, Oc);
	let n = Oa(t, "stylesheets", 19, () => []), r = /* @__PURE__ */ F(() => t.store.t), i = /* @__PURE__ */ I(null);
	Nr(() => {
		let e = t.store.session.transport.render, n = t.revision;
		L(i, null), e && e.call(t.store.session.transport, t.store.session.pageId, n).then((e) => {
			n === t.revision && L(i, e, !0);
		}).catch((e) => t.store.fail(e));
	});
	let a = /* @__PURE__ */ F(() => U(i) === null ? "" : Ia(n()).replace("</head>", `<style data-cms-page>${U(i).css.replace(/<\/style/gi, "<\\/style")}</style></head>`).replace("<body></body>", `<body>${U(i).html}</body>`));
	var o = Dc(), s = R(o), c = R(s), l = R(c, !0);
	A(c);
	var u = z(c, 2), d = R(u, !0);
	A(u), A(s);
	var f = z(s, 2), p = (e) => {
		var t = wc(), n = R(t, !0);
		A(t), B((e) => J(n, e), [() => U(r)("server.dirty")]), q(e, t);
	};
	Y(f, (e) => {
		t.store.dirty && e(p);
	});
	var m = z(f, 2), h = (e) => {
		var t = Tc(), n = R(t, !0);
		A(t), B((e) => J(n, e), [() => U(r)("server.loading")]), q(e, t);
	}, g = (e) => {
		var t = Ec();
		B((e) => {
			$(t, "title", e), $(t, "srcdoc", U(a));
		}, [() => U(r)("server.frame")]), q(e, t);
	};
	Y(m, (e) => {
		U(i) === null ? e(h) : e(g, -1);
	}), A(o), B((e, t) => {
		J(l, e), J(d, t);
	}, [() => U(r)("server.title", { revision: t.revision }), () => U(r)("server.back")]), W("click", u, function(...e) {
		t.onBack?.apply(this, e);
	}), q(e, o), M();
}
G(["click"]);
// src/ui/model/flatten.ts
var Ac = (e) => {
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
}, jc = (e) => {
	if (!(e.ctrlKey || e.metaKey) || e.altKey) return null;
	let t = e.key.toLowerCase();
	return t === "z" ? e.shiftKey ? { type: "redo" } : { type: "undo" } : t === "y" ? { type: "redo" } : null;
}, Mc = (e, t, n) => {
	let r = Ac(e), i = r[0];
	if (!i) return null;
	let a = t === null ? -1 : r.findIndex((e) => e.id === t), o = r[a];
	if (!o) return n.key === "ArrowDown" || n.key === "Home" ? {
		type: "select",
		id: i.id
	} : null;
	let s = e.nodes[o.id], c = be(e, o.parent), l = n.ctrlKey || n.metaKey;
	if (n.altKey && !l) switch (n.key) {
		case "ArrowUp": return o.index > 0 ? Nc(o.id, o.parent, o.index - 1) : null;
		case "ArrowDown": return o.index < c.length - 1 ? Nc(o.id, o.parent, o.index + 2) : null;
		case "ArrowRight": {
			let t = c[o.index - 1];
			return t ? Nc(o.id, t, e.nodes[t]?.children.length ?? 0) : null;
		}
		case "ArrowLeft": {
			if (o.parent === null) return null;
			let t = e.nodes[o.parent], n = be(e, t?.parent ?? null);
			return Nc(o.id, t?.parent ?? null, n.indexOf(o.parent) + 1);
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
	if (l || n.altKey) return jc(n);
	switch (n.key) {
		case "ArrowDown": return Pc(r[a + 1]?.id);
		case "ArrowUp": return Pc(r[a - 1]?.id);
		case "Home": return Pc(i.id);
		case "End": return Pc(r[r.length - 1]?.id);
		case "ArrowRight": return Pc(s?.children[0]);
		case "ArrowLeft": return Pc(o.parent ?? void 0);
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
}, Nc = (e, t, n) => ({
	type: "command",
	command: {
		kind: "move",
		id: e,
		parent: t,
		index: n
	}
}), Pc = (e) => e ? {
	type: "select",
	id: e
} : null, Fc = /* @__PURE__ */ K("<p class=\"empty svelte-y2i8n1\"> </p>"), Ic = /* @__PURE__ */ K("<li role=\"treeitem\" class=\"svelte-y2i8n1\"> </li>"), Lc = /* @__PURE__ */ K("<ul role=\"tree\" aria-labelledby=\"cpb-structure-title\" aria-describedby=\"cpb-structure-help\" class=\"svelte-y2i8n1\"></ul>"), Rc = /* @__PURE__ */ K("<section class=\"structure svelte-y2i8n1\" aria-labelledby=\"cpb-structure-title\"><h2 id=\"cpb-structure-title\" class=\"svelte-y2i8n1\"> </h2> <p class=\"help svelte-y2i8n1\" id=\"cpb-structure-help\"> </p> <!></section>"), zc = {
	hash: "svelte-y2i8n1",
	code: ".structure.svelte-y2i8n1 {padding:.5rem .75rem;overflow:auto;border-top:1px solid var(--cpb-border);}h2.svelte-y2i8n1 {font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin:0;color:var(--cpb-muted);}.help.svelte-y2i8n1, .empty.svelte-y2i8n1 {font-size:.75rem;color:var(--cpb-muted);margin:.25rem 0 .5rem;}ul.svelte-y2i8n1 {list-style:none;margin:0;padding:0;outline:none;}li.svelte-y2i8n1 {font-size:.85rem;padding:.25rem .375rem;border-radius:4px;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}li[aria-selected='true'].svelte-y2i8n1 {background:var(--cpb-accent-soft);color:var(--cpb-accent-strong);font-weight:600;}li.svelte-y2i8n1:focus-visible, ul.svelte-y2i8n1:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:-2px;}"
};
function Bc(e, t) {
	j(t, !0), Z(e, zc);
	let n = /* @__PURE__ */ F(() => t.store.t), r = /* @__PURE__ */ F(() => Ac(t.store.tree)), i = /* @__PURE__ */ I(void 0), a = (e) => {
		let n = t.store.tree.nodes[e];
		if (!n) return e;
		let r = typeof n.fields.label == "string" && n.fields.label !== "" ? n.fields.label : null, i = t.store.catalogue?.get(n.type);
		return r ? `${r} (${i?.label ?? n.type})` : i?.label ?? n.type;
	};
	async function o(e) {
		await Si(), ((e ? U(i)?.querySelector(`[data-node-id="${CSS.escape(e)}"]`) : null) ?? U(i))?.focus();
	}
	async function s(e) {
		if ((e.key === "F2" || e.key === "Enter") && t.store.selection && !e.altKey) {
			t.onEdit(t.store.selection) && e.preventDefault();
			return;
		}
		let n = Mc(t.store.tree, t.store.selection, e);
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
	var c = { focusItem: o }, l = Rc(), u = R(l), d = R(u, !0);
	A(u);
	var f = z(u, 2), p = R(f, !0);
	A(f);
	var m = z(f, 2), h = (e) => {
		var t = Fc(), r = R(t, !0);
		A(t), B((e) => J(r, e), [() => U(n)("structure.empty")]), q(e, t);
	}, g = (e) => {
		var n = Lc();
		X(n, 21, () => U(r), (e) => e.id, (e, n) => {
			var r = Ic();
			let i;
			var o = R(r, !0);
			A(r), B((e) => {
				$(r, "aria-level", U(n).depth), $(r, "aria-setsize", U(n).siblings), $(r, "aria-posinset", U(n).index + 1), $(r, "aria-selected", t.store.selection === U(n).id), $(r, "tabindex", t.store.selection === U(n).id ? 0 : -1), $(r, "data-node-id", U(n).id), i = la(r, "", i, { "padding-left": `${(U(n).depth - 1) * 14 + 6}px` }), J(o, e);
			}, [() => a(U(n).id)]), W("click", r, () => t.store.select(U(n).id)), Ni("focus", r, () => t.store.selection !== U(n).id && t.store.select(U(n).id)), W("keydown", r, () => {}), q(e, r);
		}), A(n), Da(n, (e) => L(i, e), () => U(i)), B(() => $(n, "tabindex", t.store.selection ? -1 : 0)), W("keydown", n, s), q(e, n);
	};
	return Y(m, (e) => {
		U(r).length === 0 ? e(h) : e(g, -1);
	}), A(l), B((e, t) => {
		J(d, e), J(p, t);
	}, [() => U(n)("structure.title"), () => U(n)("structure.help")]), q(e, l), M(c);
}
G(["keydown", "click"]);
// src/ui/toolbar/Toolbar.svelte
var Vc = /* @__PURE__ */ K("<button type=\"button\" class=\"primary svelte-ouhh5d\"> </button>"), Hc = /* @__PURE__ */ K("<button type=\"button\" class=\"svelte-ouhh5d\"> </button>"), Uc = /* @__PURE__ */ K("<button type=\"button\" class=\"svelte-ouhh5d\"> </button>"), Wc = /* @__PURE__ */ K("<span class=\"revision svelte-ouhh5d\"> <span data-publication=\"\"> </span></span>"), Gc = /* @__PURE__ */ K("<div class=\"toolbar svelte-ouhh5d\" role=\"toolbar\"><button type=\"button\" aria-keyshortcuts=\"Control+Z\" class=\"svelte-ouhh5d\"> </button> <button type=\"button\" aria-keyshortcuts=\"Control+Shift+Z\" class=\"svelte-ouhh5d\"> </button> <button type=\"button\" aria-keyshortcuts=\"Control+S\" class=\"svelte-ouhh5d\"> </button> <!> <!> <!> <span class=\"status svelte-ouhh5d\"> </span> <!></div>"), Kc = {
	hash: "svelte-ouhh5d",
	code: ".toolbar.svelte-ouhh5d {display:flex;flex-wrap:wrap;gap:.5rem;align-items:center;padding:.5rem .75rem;border-bottom:1px solid var(--cpb-border);}button.svelte-ouhh5d {font:inherit;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.svelte-ouhh5d:disabled {opacity:.5;cursor:not-allowed;}button.primary.svelte-ouhh5d {background:var(--cpb-accent);border-color:var(--cpb-accent);color:#fff;}button[aria-pressed='true'].svelte-ouhh5d {background:var(--cpb-accent-soft);border-color:var(--cpb-accent);}button.svelte-ouhh5d:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:2px;}.status.svelte-ouhh5d {margin-left:auto;font-size:.875rem;}.status[data-status='conflict'].svelte-ouhh5d, .status[data-status='offline'].svelte-ouhh5d, .status[data-status='load-error'].svelte-ouhh5d {color:var(--cpb-danger);font-weight:600;}.revision.svelte-ouhh5d {font-size:.75rem;color:var(--cpb-muted);}"
};
function qc(e, t) {
	j(t, !0), Z(e, Kc);
	let n = Oa(t, "store", 7), r = /* @__PURE__ */ F(() => n().t), i = /* @__PURE__ */ F(() => n().publishedRevision === null ? U(r)("publication.none") : n().unpublished ? U(r)("publication.pending", { revision: n().publishedRevision }) : U(r)("publication.current"));
	var a = Gc(), o = R(a), s = R(o, !0);
	A(o);
	var c = z(o, 2), l = R(c, !0);
	A(c);
	var u = z(c, 2), d = R(u, !0);
	A(u);
	var f = z(u, 2), p = (e) => {
		var t = Vc(), i = R(t, !0);
		A(t), B((e) => {
			t.disabled = n().publishing || n().status !== "ready" || !n().unpublished, J(i, e);
		}, [() => n().publishing ? U(r)("toolbar.publishing") : U(r)("toolbar.publish")]), W("click", t, () => n().publish()), q(e, t);
	};
	Y(f, (e) => {
		n().canPublish && e(p);
	});
	var m = z(f, 2), h = (e) => {
		var t = Hc(), i = R(t, !0);
		A(t), B((e) => {
			$(t, "aria-pressed", n().designOpen), J(i, e);
		}, [() => U(r)("design.open")]), W("click", t, () => {
			n().designOpen = !n().designOpen;
		}), q(e, t);
	};
	Y(m, (e) => {
		n().designAvailable && e(h);
	});
	var g = z(m, 2), _ = (e) => {
		var n = Uc(), i = R(n, !0);
		A(n), B((e) => {
			$(n, "aria-pressed", t.serverView), J(i, e);
		}, [() => U(r)("toolbar.serverView")]), W("click", n, function(...e) {
			t.onServerView?.apply(this, e);
		}), q(e, n);
	};
	Y(g, (e) => {
		t.onServerView && e(_);
	});
	var v = z(g, 2), y = R(v, !0);
	A(v);
	var b = z(v, 2), x = (e) => {
		var t = Wc(), a = R(t), o = z(a), s = R(o, !0);
		A(o), A(t), B((e) => {
			J(a, `${e ?? ""} · `), J(s, U(i));
		}, [() => U(r)("toolbar.revision", { revision: n().revision })]), q(e, t);
	};
	Y(b, (e) => {
		n().revision > 0 && e(x);
	}), A(a), B((e, t, r, i, f) => {
		$(a, "aria-label", e), o.disabled = !n().canUndo, J(s, t), c.disabled = !n().canRedo, J(l, r), u.disabled = !n().dirty || n().status === "saving" || n().status === "conflict", J(d, i), $(v, "data-status", n().status), J(y, f);
	}, [
		() => U(r)("editor.label"),
		() => U(r)("toolbar.undo"),
		() => U(r)("toolbar.redo"),
		() => U(r)("toolbar.save"),
		() => U(r)(`status.${n().status}`)
	]), W("click", o, () => n().undo()), W("click", c, () => n().redo()), W("click", u, () => n().save()), q(e, a), M();
}
G(["click"]);
// src/ui/Editor.svelte
var Jc = /* @__PURE__ */ K("<div class=\"editor svelte-b7je3p\" role=\"application\"><!> <!> <div class=\"body svelte-b7je3p\"><aside class=\"left svelte-b7je3p\"><!> <!></aside> <!> <!></div> <!> <!> <div class=\"sr-only svelte-b7je3p\" aria-live=\"polite\"> </div> <div class=\"sr-only svelte-b7je3p\" aria-live=\"assertive\" role=\"alert\"> </div></div>"), Yc = {
	hash: "svelte-b7je3p",
	code: ".editor.svelte-b7je3p {--cpb-border: #d4d4d8;--cpb-surface: #fff;--cpb-canvas: #f1f5f9;--cpb-muted: #52525b;--cpb-accent: #2563eb;--cpb-accent-soft: #dbeafe;--cpb-accent-strong: #1e3a8a;--cpb-danger: #b91c1c;font:14px/1.4 system-ui, sans-serif;color:#18181b;background:var(--cpb-surface);display:flex;flex-direction:column;height:100%;min-height:600px;border:1px solid var(--cpb-border);}.body.svelte-b7je3p {flex:1;display:grid;grid-template-columns:240px 1fr 280px;min-height:0;}.left.svelte-b7je3p {display:grid;grid-template-rows:minmax(0, 45%) minmax(0, 1fr);min-height:0;border-right:1px solid var(--cpb-border);}.sr-only.svelte-b7je3p {position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;}\n  @media (max-width: 900px) {.body.svelte-b7je3p {grid-template-columns:1fr;} }"
};
function Xc(e, t) {
	j(t, !0), Z(e, Yc);
	let n = Oa(t, "stylesheets", 19, () => []), r = /* @__PURE__ */ I(void 0), i = /* @__PURE__ */ I(void 0), a = /* @__PURE__ */ F(() => new Ts(t.store)), o = /* @__PURE__ */ F(() => new ao(t.store)), s = /* @__PURE__ */ I(!1), c = /* @__PURE__ */ I(!1), l = !1;
	Nr(() => {
		t.store.status === "ready" && !l && (l = !0, U(o).loadTemplates());
	});
	let u = /* @__PURE__ */ I(null), d = /* @__PURE__ */ F(() => typeof t.store.session.transport.render == "function");
	function f(e) {
		if ((e.ctrlKey || e.metaKey) && !e.altKey && e.key.toLowerCase() === "s") {
			e.preventDefault(), t.store.dirty && t.store.save();
			return;
		}
		if (e.target?.closest("input, textarea, select, [contenteditable=\"true\"], [role=\"tree\"]")) return;
		let n = jc(e);
		n && (e.preventDefault(), n.type === "undo" ? t.store.undo() : n.type === "redo" && t.store.redo());
	}
	var p = Jc(), m = R(p);
	{
		let e = /* @__PURE__ */ F(() => U(u) !== null), n = /* @__PURE__ */ F(() => U(d) ? () => {
			L(u, U(u) === null ? t.store.revision : null, !0);
		} : null);
		qc(m, {
			get store() {
				return t.store;
			},
			get serverView() {
				return U(e);
			},
			get onServerView() {
				return U(n);
			}
		});
	}
	var h = z(m, 2);
	{
		let e = /* @__PURE__ */ F(() => U(d) ? (e) => {
			L(u, e, !0);
		} : null);
		Cc(h, {
			get store() {
				return t.store;
			},
			get uid() {
				return t.uid;
			},
			get onView() {
				return U(e);
			}
		});
	}
	var g = z(h, 2), _ = R(g), v = R(_);
	yc(v, {
		get store() {
			return t.store;
		},
		get drag() {
			return U(a);
		},
		get content() {
			return U(o);
		},
		onInserted: (e) => U(r)?.focusItem(e),
		onImport: () => {
			L(s, !0);
		}
	}), Da(Bc(z(v, 2), {
		get store() {
			return t.store;
		},
		onEdit: (e) => U(i)?.startEditing(e) ?? !1
	}), (e) => L(r, e, !0), () => U(r)), A(_);
	var y = z(_, 2), b = (e) => {
		kc(e, {
			get store() {
				return t.store;
			},
			get revision() {
				return U(u);
			},
			get stylesheets() {
				return n();
			},
			onBack: () => {
				L(u, null);
			}
		});
	}, x = (e) => {
		Da(eo(e, {
			get store() {
				return t.store;
			},
			get drag() {
				return U(a);
			},
			get uid() {
				return t.uid;
			},
			get stylesheets() {
				return n();
			},
			onEditEnd: (e, t) => {
				t && U(r)?.focusItem(e);
			}
		}), (e) => L(i, e, !0), () => U(i));
	};
	Y(y, (e) => {
		U(u) === null ? e(x, -1) : e(b);
	});
	var S = z(y, 2), C = (e) => {
		ps(e, {
			get store() {
				return t.store;
			},
			get uid() {
				return t.uid;
			}
		});
	}, w = (e) => {
		dc(e, {
			get store() {
				return t.store;
			},
			get uid() {
				return t.uid;
			},
			get canTemplates() {
				return U(o).canTemplates;
			},
			onRemoved: () => U(r)?.focusItem(t.store.selection),
			onSaveTemplate: () => {
				L(c, !0);
			}
		});
	};
	Y(S, (e) => {
		t.store.designOpen ? e(C) : e(w, -1);
	}), A(g);
	var T = z(g, 2);
	fo(T, {
		get store() {
			return t.store;
		},
		get content() {
			return U(o);
		},
		get uid() {
			return t.uid;
		},
		get open() {
			return U(s);
		},
		set open(e) {
			L(s, e, !0);
		}
	});
	var ee = z(T, 2);
	gs(ee, {
		get store() {
			return t.store;
		},
		get content() {
			return U(o);
		},
		get uid() {
			return t.uid;
		},
		get nodeId() {
			return t.store.selection;
		},
		get open() {
			return U(c);
		},
		set open(e) {
			L(c, e, !0);
		}
	});
	var E = z(ee, 2), te = R(E, !0);
	A(E);
	var ne = z(E, 2), re = R(ne, !0);
	A(ne), A(p), B((e) => {
		$(p, "aria-label", e), J(te, t.store.message), J(re, t.store.alert);
	}, [() => t.store.t("editor.label")]), W("keydown", p, f), q(e, p), M();
}
G(["keydown"]);
// src/ui/i18n/en.ts
var Zc = {
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
	"design.open": "Site design",
	"design.title": "Site design",
	"design.close": "Close the site design",
	"design.tokens": "Tokens",
	"design.classes": "Classes",
	"design.breakpoints": "Breakpoints",
	"design.revision": "Revision {revision}",
	"design.publishedAt": "Published: {revision}",
	"design.notPublished": "Not published",
	"design.save": "Save draft",
	"design.publish": "Publish design",
	"design.reload": "Discard and reload",
	"design.saved": "Design saved as revision {revision}",
	"design.published": "Design {revision} published on every page",
	"design.reloaded": "Design reloaded from the server",
	"design.problems": "Fix this before saving:",
	"design.help": "Changes show at once on the canvas; published pages use the published design.",
	"design.id": "Identifier",
	"design.name": "Name",
	"design.type": "Type",
	"design.value": "Value",
	"design.add": "Add",
	"design.delete": "Delete {name}",
	"design.edit": "Edit the styles of {name}",
	"design.inUse": "{name} is in use and cannot be deleted: {where}",
	"design.badId": "Invalid or repeated identifier.",
	"design.badValue": "Invalid value for this type.",
	"design.minWidth": "Minimum width (px)",
	"design.classStyles": "Styles of the class {name}",
	"viewport.label": "Canvas width",
	"viewport.base": "Phone (base)",
	"styles.title": "Styles",
	"styles.target": "Editing",
	"styles.state": "State",
	"styles.normal": "Normal",
	"styles.own": "Own value at this width",
	"styles.inherited": "Inherited from {from}",
	"styles.fromClass": "From the class {from}",
	"styles.remove": "Remove {property} at this width",
	"styles.token": "Token",
	"styles.literal": "— typed value —",
	"styles.invalid": "Value not allowed for this property.",
	"styles.classes": "Site classes",
	"styles.addClass": "Add class",
	"styles.removeClass": "Remove the class {name}",
	"styles.group.layout": "Layout",
	"styles.group.spacing": "Spacing",
	"styles.group.size": "Size",
	"styles.group.typography": "Typography",
	"styles.group.background": "Background",
	"styles.group.border": "Border and shadow",
	"styles.group.effects": "Effects",
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
}, Qc = {
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
	"design.open": "Diseño del sitio",
	"design.title": "Diseño del sitio",
	"design.close": "Cerrar el diseño del sitio",
	"design.tokens": "Tokens",
	"design.classes": "Clases",
	"design.breakpoints": "Puntos de corte",
	"design.revision": "Revisión {revision}",
	"design.publishedAt": "Publicada: {revision}",
	"design.notPublished": "Sin publicar",
	"design.save": "Guardar borrador",
	"design.publish": "Publicar diseño",
	"design.reload": "Descartar y recargar",
	"design.saved": "Diseño guardado como revisión {revision}",
	"design.published": "Diseño {revision} publicado en todas las páginas",
	"design.reloaded": "Diseño recargado del servidor",
	"design.problems": "Hay que corregir esto antes de guardar:",
	"design.help": "Los cambios se ven al instante en el lienzo; las páginas publicadas usan el diseño publicado.",
	"design.id": "Identificador",
	"design.name": "Nombre",
	"design.type": "Tipo",
	"design.value": "Valor",
	"design.add": "Añadir",
	"design.delete": "Eliminar {name}",
	"design.edit": "Editar estilos de {name}",
	"design.inUse": "{name} está en uso y no se puede eliminar: {where}",
	"design.badId": "Identificador no válido o repetido.",
	"design.badValue": "Valor no válido para este tipo.",
	"design.minWidth": "Ancho mínimo (px)",
	"design.classStyles": "Estilos de la clase {name}",
	"viewport.label": "Ancho del lienzo",
	"viewport.base": "Móvil (base)",
	"styles.title": "Estilos",
	"styles.target": "Editando",
	"styles.state": "Estado",
	"styles.normal": "Normal",
	"styles.own": "Valor propio en este ancho",
	"styles.inherited": "Heredado de {from}",
	"styles.fromClass": "De la clase {from}",
	"styles.remove": "Quitar {property} en este ancho",
	"styles.token": "Token",
	"styles.literal": "— valor escrito —",
	"styles.invalid": "Valor no permitido para esta propiedad.",
	"styles.classes": "Clases del sitio",
	"styles.addClass": "Añadir clase",
	"styles.removeClass": "Quitar la clase {name}",
	"styles.group.layout": "Disposición",
	"styles.group.spacing": "Espaciado",
	"styles.group.size": "Tamaño",
	"styles.group.typography": "Tipografía",
	"styles.group.background": "Fondo",
	"styles.group.border": "Borde y sombra",
	"styles.group.effects": "Efectos",
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
}, $c = {
	es: Qc,
	en: Zc
}, el = (e) => {
	let t = $c[e.toLowerCase().split("-")[0] ?? "es"] ?? Qc;
	return (e, n = {}) => t[e].replace(/\{(\w+)\}/g, (e, t) => String(n[t] ?? `{${t}}`));
}, tl = class {
	session;
	t;
	#e = /* @__PURE__ */ I({
		nodes: {},
		rootIds: []
	});
	get tree() {
		return U(this.#e);
	}
	set tree(e) {
		L(this.#e, e);
	}
	#t = /* @__PURE__ */ I(null);
	get catalogue() {
		return U(this.#t);
	}
	set catalogue(e) {
		L(this.#t, e);
	}
	#n = /* @__PURE__ */ I(null);
	get selection() {
		return U(this.#n);
	}
	set selection(e) {
		L(this.#n, e, !0);
	}
	#r = /* @__PURE__ */ I("loading");
	get status() {
		return U(this.#r);
	}
	set status(e) {
		L(this.#r, e, !0);
	}
	#i = /* @__PURE__ */ I(!1);
	get dirty() {
		return U(this.#i);
	}
	set dirty(e) {
		L(this.#i, e, !0);
	}
	#a = /* @__PURE__ */ I(!1);
	get canUndo() {
		return U(this.#a);
	}
	set canUndo(e) {
		L(this.#a, e, !0);
	}
	#o = /* @__PURE__ */ I(!1);
	get canRedo() {
		return U(this.#o);
	}
	set canRedo(e) {
		L(this.#o, e, !0);
	}
	#s = /* @__PURE__ */ I(0);
	get revision() {
		return U(this.#s);
	}
	set revision(e) {
		L(this.#s, e, !0);
	}
	#c = /* @__PURE__ */ I(null);
	get publishedRevision() {
		return U(this.#c);
	}
	set publishedRevision(e) {
		L(this.#c, e, !0);
	}
	#l = /* @__PURE__ */ I(!1);
	get canPublish() {
		return U(this.#l);
	}
	set canPublish(e) {
		L(this.#l, e, !0);
	}
	#u = /* @__PURE__ */ I(!1);
	get publishing() {
		return U(this.#u);
	}
	set publishing(e) {
		L(this.#u, e, !0);
	}
	#d = /* @__PURE__ */ I(null);
	get conflictRevision() {
		return U(this.#d);
	}
	set conflictRevision(e) {
		L(this.#d, e, !0);
	}
	designSession;
	#f = /* @__PURE__ */ I(Ae());
	get design() {
		return U(this.#f);
	}
	set design(e) {
		L(this.#f, e);
	}
	#p = /* @__PURE__ */ I(!1);
	get designDirty() {
		return U(this.#p);
	}
	set designDirty(e) {
		L(this.#p, e, !0);
	}
	#m = /* @__PURE__ */ I(null);
	get viewport() {
		return U(this.#m);
	}
	set viewport(e) {
		L(this.#m, e, !0);
	}
	#h = /* @__PURE__ */ I(null);
	get styleState() {
		return U(this.#h);
	}
	set styleState(e) {
		L(this.#h, e, !0);
	}
	#g = /* @__PURE__ */ I(!1);
	get designOpen() {
		return U(this.#g);
	}
	set designOpen(e) {
		L(this.#g, e, !0);
	}
	#_ = /* @__PURE__ */ I(!1);
	get designAvailable() {
		return U(this.#_);
	}
	set designAvailable(e) {
		L(this.#_, e, !0);
	}
	#v = /* @__PURE__ */ I(0);
	get designRevision() {
		return U(this.#v);
	}
	set designRevision(e) {
		L(this.#v, e, !0);
	}
	#y = /* @__PURE__ */ I(null);
	get designPublished() {
		return U(this.#y);
	}
	set designPublished(e) {
		L(this.#y, e, !0);
	}
	#b = /* @__PURE__ */ I("");
	get message() {
		return U(this.#b);
	}
	set message(e) {
		L(this.#b, e, !0);
	}
	#x = /* @__PURE__ */ I("");
	get alert() {
		return U(this.#x);
	}
	set alert(e) {
		L(this.#x, e, !0);
	}
	stops = [];
	constructor(e, t) {
		this.session = e, this.t = t, this.designSession = new Ce(e.transport), this.stops.push(this.designSession.events.on("change", () => {
			this.design = this.designSession.design, this.designDirty = this.designSession.dirty, this.designRevision = this.designSession.revision, this.designPublished = this.designSession.publishedRevision, this.designAvailable = this.designSession.available;
		}));
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
	fail(e, t = e instanceof me ? e.code : "SERVER") {
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
	async loadDesign() {
		await this.designSession.load();
	}
	async designAction(e) {
		try {
			e === "reload" && await this.designSession.reload();
			let t = e === "save" ? await this.designSession.save() : e === "publish" ? await this.designSession.publish() : this.designSession.revision;
			this.designRevision = this.designSession.revision, this.designPublished = this.designSession.publishedRevision, this.announce(e === "publish" ? "design.published" : e === "save" ? "design.saved" : "design.reloaded", { revision: t });
		} catch (e) {
			this.fail(e);
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
}, nl = [
	"ready",
	"selection-change",
	"dirty-change",
	"save-start",
	"save-success",
	"save-error",
	"conflict",
	"publish-success",
	"publish-error"
], rl = 0, il = class extends HTMLElement {
	#e = null;
	#t = null;
	#n = null;
	#r = null;
	#i = null;
	#a = `cpb${++rl}`;
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
		let t = this.shadowRoot ?? this.attachShadow({ mode: "open" }), n = new b(e);
		for (let e of nl) n.events.on(e, (t) => {
			let n = e === "save-error" || e === "publish-error" ? { code: t.error.code } : t;
			this.dispatchEvent(new CustomEvent(e, {
				detail: n,
				bubbles: !0,
				composed: !0
			}));
		});
		let r = new tl(n, el(e.locale ?? "es"));
		this.#n = n, this.#r = r, this.#t = Hi(Xc, {
			target: t,
			props: {
				store: r,
				uid: this.#a,
				stylesheets: e.stylesheets ?? []
			}
		}), n.load().then(() => {
			r.sync(), r.loadDesign(), e.autosave !== !1 && n.capabilities?.features.autosave !== !1 && (this.#i = new re(n, {
				...Be,
				...e.autosave ?? {}
			}), this.#i.start());
		}, (e) => {
			r.sync(), r.fail(e);
		});
	}
	#s() {
		this.#i?.stop(), this.#i = null, this.#t && Ki(this.#t), this.#r?.destroy(), this.#n?.destroy(), this.#t = null, this.#r = null, this.#n = null, this.shadowRoot?.replaceChildren();
	}
}, al = (e = "ceiba-page-builder") => {
	customElements.get(e) || customElements.define(e, il);
};
// src/ui/index.ts
al();
export { re as Autosave, he as BASE, il as CeibaPageBuilder, Be as DEFAULT_AUTOSAVE, Ve as DEFAULT_BREAKPOINTS, S as DEFAULT_HISTORY, t as EDITABLE_FIELDS, me as EditorError, b as EditorSession, E as PROPERTY_BY_NAME, nl as PUBLIC_EVENTS, _e as REFERENCE_PROPS, _ as SCHEMA_VERSION, p as SERVER_LIMITS, Re as STYLE_MATRIX, Ce as SiteDesignSession, pe as acceptedTokenType, c as afterRedo, x as afterUndo, ve as applyCommand, m as assertDepth, l as assertEditable, f as assertKnown, v as assertNewContent, g as assertNodeCount, He as assertPlacement, o as assertSize, e as attachRaw, C as canRedo, s as canUndo, ze as checkTree, be as childrenOf, ie as collectStyledNodes, Ie as compileStyles, n as createCatalogue, h as createCommands, Pe as createEditor, y as createHttpTransport, Ae as defaultDesign, al as defineElement, we as depthOf, te as effectiveValue, d as emptyHistory, Le as emptyTree, r as errorFromResponse, fe as fail, T as fromDocument, je as getNode, u as groupKeyOf, ge as heightOf, ne as indexInParent, se as insertAt, Ee as isSelfOrDescendant, de as literal, ce as measureRaw, oe as nodeClass, Ne as nodeCount, w as parseDocument, a as randomIds, ke as record, i as sequentialIds, Te as setClasses, Me as setDeclaration, le as siteClass, ye as styleClassNames, ae as subtreeIds, ee as toDocument, Fe as toRaw, De as tokenLiteral, xe as tokenVariable, ue as withChildren, Oe as withNode, Se as withoutNodes };

//# sourceMappingURL=ceiba-page-builder.js.map