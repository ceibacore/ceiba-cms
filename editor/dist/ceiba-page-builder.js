import { $ as e, A as t, B as n, C as r, D as i, E as a, F as o, G as s, H as c, I as l, J as u, K as d, L as f, M as p, N as m, O as h, P as g, Q as _, R as v, S as y, T as b, U as x, V as S, W as C, X as w, Y as ee, Z as te, _ as ne, a as re, at as ie, b as ae, c as oe, d as se, et as ce, f as le, g as ue, h as de, i as fe, it as pe, j as me, k as he, l as ge, m as _e, n as ve, nt as ye, o as be, ot as xe, p as Se, q as Ce, r as we, rt as Te, s as Ee, st as De, t as Oe, tt as ke, u as Ae, v as je, w as Me, x as Ne, y as Pe, z as Fe } from "./shared/core.js";
// node_modules/svelte/src/internal/shared/utils.js
var Ie = Array.isArray, Le = Array.prototype.indexOf, Re = Array.prototype.includes, ze = Array.from, Be = Object.defineProperty, Ve = Object.getOwnPropertyDescriptor, He = Object.getOwnPropertyDescriptors, Ue = Object.prototype, We = Array.prototype, Ge = Object.getPrototypeOf, Ke = Object.isExtensible, qe = () => {};
function Je(e) {
	for (var t = 0; t < e.length; t++) e[t]();
}
function Ye() {
	var e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
function Xe(e, t) {
	if (Array.isArray(e)) return e;
	if (t === void 0 || !(Symbol.iterator in e)) return Array.from(e);
	let n = [];
	for (let r of e) if (n.push(r), n.length === t) break;
	return n;
}
var Ze = 1024, Qe = 2048, $e = 4096, et = 8192, tt = 16384, nt = 32768, rt = 1 << 25, it = 65536, at = 1 << 19, ot = 1 << 20, st = 1 << 25, ct = 65536, lt = 1 << 21, ut = 1 << 22, dt = 1 << 23, ft = Symbol("$state"), pt = Symbol("legacy props"), mt = Symbol(""), ht = Symbol("attributes"), gt = Symbol("class"), _t = Symbol("style"), vt = Symbol("text"), yt = Symbol("form reset"), bt = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), xt = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
// node_modules/svelte/src/internal/client/errors.js
function St() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function Ct(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function wt(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function Tt() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Et(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function Dt() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Ot(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function kt() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function At() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function jt() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Mt() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
// node_modules/svelte/src/constants.js
var Nt = {}, T = Symbol("uninitialized"), Pt = "http://www.w3.org/1999/xhtml";
function Ft() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function It(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function Lt() {
	console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function Rt() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
// node_modules/svelte/src/internal/client/dom/hydration.js
var E = !1;
function zt(e) {
	E = e;
}
var D;
function Bt(e) {
	if (e === null) throw It(), Nt;
	return D = e;
}
function Vt() {
	return Bt(/* @__PURE__ */ lr(D));
}
function O(e) {
	if (E) {
		if (/* @__PURE__ */ lr(D) !== null) throw It(), Nt;
		D = e;
	}
}
function Ht(e = 1) {
	if (E) {
		for (var t = e, n = D; t--;) n = /* @__PURE__ */ lr(n);
		D = n;
	}
}
function Ut(e = !0) {
	for (var t = 0, n = D;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ lr(n);
		e && n.remove(), n = i;
	}
}
function Wt(e) {
	if (!e || e.nodeType !== 8) throw It(), Nt;
	return e.data;
}
// node_modules/svelte/src/internal/client/reactivity/equality.js
function Gt(e) {
	return e === this.v;
}
function Kt(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function qt(e) {
	return !Kt(e, this.v);
}
// node_modules/svelte/src/internal/client/context.js
var k = null;
function Jt(e) {
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
		for (var r of n) Er(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, k = t.p, e ?? {};
}
function Yt() {
	return !0;
}
// node_modules/svelte/src/internal/client/dom/task.js
var Xt = [];
function Zt() {
	var e = Xt;
	Xt = [], Je(e);
}
function Qt(e) {
	if (Xt.length === 0 && !pn) {
		var t = Xt;
		queueMicrotask(() => {
			t === Xt && Zt();
		});
	}
	Xt.push(e);
}
function $t() {
	for (; Xt.length > 0;) Zt();
}
function en(e) {
	var t = H;
	if (t === null) return V.f |= dt, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	tn(e, t);
}
function tn(e, t) {
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
var nn = ~(Qe | $e | Ze);
function M(e, t) {
	e.f = e.f & nn | t;
}
function rn(e) {
	e.f & 512 || e.deps === null ? M(e, Ze) : M(e, $e);
}
// node_modules/svelte/src/internal/client/reactivity/utils.js
function an(e) {
	if (e !== null) for (let t of e) t.f & 2 && t.f & 65536 && (t.f ^= ct, an(t.deps));
}
function on(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), an(e.deps), M(e, Ze);
}
// node_modules/svelte/src/internal/client/reactivity/store.js
var sn = !1;
function cn(e) {
	var t = sn;
	try {
		return sn = !1, [e(), sn];
	} finally {
		sn = t;
	}
}
// node_modules/svelte/src/internal/client/reactivity/batch.js
var ln = null, N = null, un = null, dn = null, fn = null, pn = !1, mn = !1, hn = null, gn = null, _n = 0, vn = 1, yn = class e {
	id = vn++;
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
			for (var r of n.d) M(r, Qe), t(r);
			for (r of n.m) M(r, $e), t(r);
		}
		this.#m.add(e);
	}
	#_() {
		if (this.#e = !0, _n++ > 1e3 && (this.#C(), xn()), !this.#g()) {
			for (let e of this.#d) this.#f.delete(e), M(e, Qe), this.schedule(e);
			for (let e of this.#f) M(e, $e), this.schedule(e);
		}
		let t = this.#l;
		this.#l = [], this.apply();
		var n = hn = [], r = [], i = gn = [];
		for (let e of t) try {
			this.#v(e, n, r);
		} catch (t) {
			throw En(e), t;
		}
		if (N = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (hn = null, gn = null, this.#g()) {
			this.#x(r), this.#x(n);
			for (let [e, t] of this.#p) Tn(e, t);
			i.length > 0 && N.#_();
			return;
		}
		let o = this.#y();
		if (o) o.#b(this);
		else {
			this.#d.clear(), this.#f.clear();
			for (let e of this.#r) e(this);
			this.#r.clear(), un = this, Cn(r), Cn(n), un = null, this.#c?.resolve();
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
		e.f ^= Ze;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#p.has(r)) && r.fn !== null) {
				a ? r.f ^= Ze : i & 4 ? t.push(r) : ai(r) && (i & 16 && this.#f.add(r), ui(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#f.delete(i), M(i, Qe), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#C(), N = this, this.#_();
	}
	#x(e) {
		for (var t = 0; t < e.length; t += 1) on(e[t], this.#d, this.#f);
	}
	capture(e, t, n = !1) {
		e.v !== T && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), dn?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		N = this;
	}
	deactivate() {
		N = null, dn = null;
	}
	flush() {
		try {
			mn = !0, N = this, this.#_();
		} finally {
			_n = 0, fn = null, hn = null, gn = null, mn = !1, N = null, dn = null, Gn.clear();
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
		this.#h || (this.#h = !0, Qt(() => {
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
		return (this.#c ??= Ye()).promise;
	}
	static ensure() {
		if (N === null) {
			let t = N = new e();
			t.#S(), !mn && !pn && Qt(() => {
				t.#e || t.flush();
			});
		}
		return N;
	}
	apply() {
		dn = null;
	}
	schedule(e) {
		if (fn = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) e.b.defer_effect(e);
		else {
			for (var t = e; t.parent !== null;) {
				t = t.parent;
				var n = t.f;
				if (hn !== null && t === H && (V === null || !(V.f & 2))) return;
				if (n & 96) {
					if (!(n & 1024)) return;
					t.f ^= Ze;
				}
			}
			this.#l.push(t);
		}
	}
	#S() {
		ln === null ? ln = this : (ln.#n = this, this.#t = ln), ln = this;
	}
	#C() {
		var e = this.#t, t = this.#n;
		e === null || (e.#n = t), t === null ? ln = e : t.#t = e, this.linked = !1;
	}
};
function bn(e) {
	var t = pn;
	pn = !0;
	try {
		var n;
		for (e && (N !== null && !N.is_fork && N.flush(), n = e());;) {
			if ($t(), N === null) return n;
			N.flush();
		}
	} finally {
		pn = t;
	}
}
function xn() {
	try {
		Dt();
	} catch (e) {
		tn(e, fn);
	}
}
var Sn = null;
function Cn(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && ai(r) && (Sn = /* @__PURE__ */ new Set(), ui(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Lr(r), Sn?.size > 0)) {
				Gn.clear();
				for (let e of Sn) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Sn.has(n) && (Sn.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || ui(n);
					}
				}
				Sn.clear();
			}
		}
		Sn = null;
	}
}
function wn(e) {
	N.schedule(e);
}
function Tn(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), M(e, Ze);
		for (var n = e.first; n !== null;) Tn(n, t), n = n.next;
	}
}
function En(e) {
	M(e, Ze);
	for (var t = e.first; t !== null;) En(t), t = t.next;
}
// node_modules/svelte/src/reactivity/create-subscriber.js
function Dn(e) {
	let t = 0, n = qn(0), r;
	return () => {
		Cr() && (G(n), Ar(() => (t === 0 && (r = mi(() => e(() => Zn(n)))), t += 1, () => {
			Qt(() => {
				--t, t === 0 && (r?.(), r = void 0, Zn(n));
			});
		})));
	};
}
// node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var On = it | at;
function kn(e, t, n, r) {
	new An(e, t, n, r);
}
var An = class {
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
	#h = Dn(() => (this.#m = qn(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = H;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = H.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = jr(() => {
			if (E) {
				let e = this.#t;
				Vt();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, On), E && (this.#e = D);
	}
	#g() {
		try {
			this.#a = Mr(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed;
		t && (this.#s = Mr(() => {
			t(this.#e, () => e, () => () => {});
		}));
	}
	#v() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = Mr(() => e(this.#e)), Qt(() => {
			var e = this.#c = document.createDocumentFragment(), t = sr();
			e.append(t), this.#a = this.#x(() => Mr(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, Rr(this.#o, () => {
				this.#o = null;
			}), this.#b(N));
		}));
	}
	#y() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = Mr(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				Hr(this.#a, e);
				let t = this.#n.pending;
				this.#o = Mr(() => t(this.#e));
			} else this.#b(N);
		} catch (e) {
			this.error(e);
		}
	}
	#b(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		on(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#x(e) {
		var t = H, n = V, r = k;
		Yr(this.#i), Jr(this.#i), Jt(this.#i.ctx);
		try {
			return yn.ensure(), e();
		} catch (e) {
			return en(e), null;
		} finally {
			Yr(t), Jr(n), Jt(r);
		}
	}
	#S(e, t) {
		this.has_pending_snippet() ? (this.#u += e, this.#u === 0 && (this.#b(t), this.#o && Rr(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null))) : this.parent && this.parent.#S(e, t);
	}
	update_pending_count(e, t) {
		this.#S(e, t), this.#l += e, !this.#m || this.#d || (this.#d = !0, Qt(() => {
			this.#d = !1, this.#m && Yn(this.#m, this.#l);
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
		this.#a &&= (B(this.#a), null), this.#o &&= (B(this.#o), null), this.#s &&= (B(this.#s), null), E && (Bt(this.#t), Ht(), Bt(Ut()));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var r = !1, i = !1;
		let a = () => {
			r ? Rt() : (r = !0, i && Mt(), this.#s !== null && Rr(this.#s, () => {
				this.#s = null;
			}), this.#x(() => {
				this.#y();
			}));
		}, o = (e) => {
			try {
				i = !0, t?.(e, a), i = !1;
			} catch (e) {
				tn(e, this.#i && this.#i.parent);
			}
			n && (this.#s = this.#x(() => {
				try {
					return Mr(() => {
						var t = H;
						t.b = this, t.f |= 128, n(this.#e, () => e, () => a);
					});
				} catch (e) {
					return tn(e, this.#i.parent), null;
				}
			}));
		};
		Qt(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				tn(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(o, (e) => tn(e, this.#i && this.#i.parent)) : o(t);
		});
	}
};
// node_modules/svelte/src/internal/client/reactivity/async.js
function jn(e, t, n, r) {
	let i = Yt() ? Fn : Rn;
	var a = e.filter((e) => !e.settled);
	if (n.length === 0 && a.length === 0) {
		r(t.map(i));
		return;
	}
	var o = H, s = Mn(), c = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function l(e) {
		if (!(o.f & 16384)) {
			s();
			try {
				r(e);
			} catch (e) {
				tn(e, o);
			}
			Nn();
		}
	}
	var u = Pn();
	if (n.length === 0) {
		c.then(() => l(t.map(i))).finally(u);
		return;
	}
	function d() {
		Promise.all(n.map((e) => /* @__PURE__ */ Ln(e))).then((e) => l([...t.map(i), ...e])).catch((e) => tn(e, o)).finally(u);
	}
	c ? c.then(() => {
		s(), d(), Nn();
	}) : d();
}
function Mn() {
	var e = H, t = V, n = k, r = N;
	return function(i = !0) {
		Yr(e), Jr(t), Jt(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function Nn(e = !0) {
	Yr(null), Jr(null), Jt(null), e && N?.deactivate();
}
function Pn() {
	var e = H, t = e.b, n = N, r = t.is_rendered();
	return t.update_pending_count(1, n), n.increment(r, e), () => {
		t.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function Fn(e) {
	var t = 2 | Qe;
	return H !== null && (H.f |= at), {
		ctx: k,
		deps: null,
		effects: null,
		equals: Gt,
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
var In = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function Ln(e, t, n) {
	let r = H;
	r === null && St();
	var i = void 0, a = qn(T), o = !V, s = /* @__PURE__ */ new Set();
	return kr(() => {
		var t = H, n = Ye();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== bt && n.reject(e);
			}).finally(Nn);
		} catch (e) {
			n.reject(e), Nn();
		}
		var c = N;
		if (o) {
			if (t.f & 32768) var l = Pn();
			if (r.b.is_rendered()) c.async_deriveds.get(t)?.reject(In);
			else for (let e of s.values()) e.reject(In);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== In && (c.activate(), t ? (a.f |= dt, Yn(a, t)) : (a.f & 8388608 && (a.f ^= dt), Yn(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), wr(() => {
		for (let e of s) e.reject(In);
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
	let t = /* @__PURE__ */ Fn(e);
	return Zr(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function Rn(e) {
	let t = /* @__PURE__ */ Fn(e);
	return t.equals = qt, t;
}
function zn(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) B(t[n]);
	}
}
function Bn(e) {
	var t, n = H, r = e.parent;
	if (!Gr && r !== null && e.v !== T && r.f & 24576) return Ft(), e.v;
	Yr(r);
	try {
		e.f &= ~ct, zn(e), t = si(e);
	} finally {
		Yr(n);
	}
	return t;
}
function Vn(e) {
	var t = Bn(e);
	!e.equals(t) && (e.wv = ii(), (!N?.is_fork || e.deps === null) && (N === null ? e.v = t : (N.capture(e, t, !0), un?.capture(e, t, !0)), e.deps === null)) ? M(e, Ze) : Gr || (dn === null ? rn(e) : (Cr() || N?.is_fork) && dn.set(e, t));
}
function Hn(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac?.abort(bt), t.fn !== null && (t.teardown = qe), t.ac = null, li(t, 0), Pr(t));
}
function Un(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && ui(t);
}
// node_modules/svelte/src/internal/client/reactivity/sources.js
var Wn = /* @__PURE__ */ new Set(), Gn = /* @__PURE__ */ new Map(), Kn = !1;
function qn(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: Gt,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function F(e, t) {
	let n = qn(e, t);
	return Zr(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Jn(e, t = !1, n = !0) {
	let r = qn(e);
	return t || (r.equals = qt), r;
}
function I(e, t, n = !1) {
	return V !== null && (!qr || V.f & 131072) && Yt() && V.f & 4325394 && (Xr === null || !Re.call(Xr, e)) && jt(), Yn(e, n ? $n(t) : t, gn);
}
function Yn(e, t, n = null) {
	if (!e.equals(t)) {
		Gn.set(e, Gr ? t : e.v);
		var r = yn.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && Bn(t), dn === null && rn(t);
		}
		e.wv = ii(), Qn(e, Qe, n), Yt() && H !== null && H.f & 1024 && !(H.f & 96) && (Qr === null ? $r([e]) : Qr.push(e)), !r.is_fork && Wn.size > 0 && !Kn && Xn();
	}
	return t;
}
function Xn() {
	Kn = !1;
	for (let e of Wn) {
		e.f & 1024 && M(e, $e);
		let t;
		try {
			t = ai(e);
		} catch {
			t = !0;
		}
		t && ui(e);
	}
	Wn.clear();
}
function Zn(e) {
	I(e, e.v + 1);
}
function Qn(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Yt(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (i || s !== H) {
			var l = (c & Qe) === 0;
			if (l && M(s, t), c & 131072) Wn.add(s);
			else if (c & 2) {
				var u = s;
				dn?.delete(u), c & 65536 || (c & 512 && (H === null || !(H.f & 2097152)) && (s.f |= ct), Qn(u, $e, n));
			} else if (l) {
				var d = s;
				c & 16 && Sn !== null && Sn.add(d), n === null ? wn(d) : n.push(d);
			}
		}
	}
}
function $n(e) {
	if (typeof e != "object" || !e || ft in e) return e;
	let t = Ge(e);
	if (t !== Ue && t !== We) return e;
	var n = /* @__PURE__ */ new Map(), r = Ie(e), i = /* @__PURE__ */ F(0), a = null, o = ni, s = (e) => {
		if (ni === o) return e();
		var t = V, n = ni;
		Jr(null), ri(o);
		var r = e();
		return Jr(t), ri(n), r;
	};
	return r && n.set("length", /* @__PURE__ */ F(e.length, a)), new Proxy(e, {
		defineProperty(e, t, r) {
			"value" in r && r.configurable !== !1 && r.enumerable !== !1 && r.writable !== !1 || kt();
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
					n.set(t, e), Zn(i);
				}
			} else I(r, T), Zn(i);
			return !0;
		},
		get(t, r, i) {
			if (r === ft) return e;
			var o = n.get(r), c = r in t;
			if (o === void 0 && (!c || Ve(t, r)?.writable) && (o = s(() => /* @__PURE__ */ F($n(c ? t[r] : T), a)), n.set(r, o)), o !== void 0) {
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
			if (t === ft) return !0;
			var r = n.get(t), i = r !== void 0 && r.v !== T || Reflect.has(e, t);
			return (r !== void 0 || H !== null && (!i || Ve(e, t)?.writable)) && (r === void 0 && (r = s(() => /* @__PURE__ */ F(i ? $n(e[t]) : T, a)), n.set(t, r)), G(r) === T) ? !1 : i;
		},
		set(e, t, o, c) {
			var l = n.get(t), u = t in e;
			if (r && t === "length") for (var d = o; d < l.v; d += 1) {
				var f = n.get(d + "");
				f === void 0 ? d in e && (f = s(() => /* @__PURE__ */ F(T, a)), n.set(d + "", f)) : I(f, T);
			}
			if (l === void 0) (!u || Ve(e, t)?.writable) && (l = s(() => /* @__PURE__ */ F(void 0, a)), I(l, $n(o)), n.set(t, l));
			else {
				u = l.v !== T;
				var p = s(() => $n(o));
				I(l, p);
			}
			var m = Reflect.getOwnPropertyDescriptor(e, t);
			if (m?.set && m.set.call(c, o), !u) {
				if (r && typeof t == "string") {
					var h = n.get("length"), g = Number(t);
					Number.isInteger(g) && g >= h.v && I(h, g + 1);
				}
				Zn(i);
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
			At();
		}
	});
}
function er(e) {
	try {
		if (typeof e == "object" && e && ft in e) return e[ft];
	} catch {}
	return e;
}
function tr(e, t) {
	return Object.is(er(e), er(t));
}
var nr, rr, ir, ar;
function or() {
	if (nr === void 0) {
		nr = window, rr = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		ir = Ve(t, "firstChild").get, ar = Ve(t, "nextSibling").get, Ke(e) && (e[gt] = void 0, e[ht] = null, e[_t] = void 0, e.__e = void 0), Ke(n) && (n[vt] = void 0);
	}
}
function sr(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function cr(e) {
	return ir.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function lr(e) {
	return ar.call(e);
}
function L(e, t) {
	if (!E) return /* @__PURE__ */ cr(e);
	var n = /* @__PURE__ */ cr(D);
	if (n === null) n = D.appendChild(sr());
	else if (t && n.nodeType !== 3) {
		var r = sr();
		return n?.before(r), Bt(r), r;
	}
	return t && mr(n), Bt(n), n;
}
function ur(e, t = !1) {
	if (!E) {
		var n = /* @__PURE__ */ cr(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ lr(n) : n;
	}
	if (t) {
		if (D?.nodeType !== 3) {
			var r = sr();
			return D?.before(r), Bt(r), r;
		}
		mr(D);
	}
	return D;
}
function R(e, t = 1, n = !1) {
	let r = E ? D : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ lr(r);
	if (!E) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = sr();
			return r === null ? i?.after(a) : r.before(a), Bt(a), a;
		}
		mr(r);
	}
	return Bt(r), r;
}
function dr(e) {
	e.textContent = "";
}
function fr() {
	return !1;
}
function pr(e, t, n) {
	let r = n ? { is: n } : void 0;
	return document.createElementNS(t ?? "http://www.w3.org/1999/xhtml", e, r);
}
function mr(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
// node_modules/svelte/src/internal/client/dom/elements/misc.js
function hr(e) {
	E && /* @__PURE__ */ cr(e) !== null && dr(e);
}
var gr = !1;
function _r() {
	gr || (gr = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[yt]?.();
		});
	}, { capture: !0 }));
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function vr(e) {
	var t = V, n = H;
	Jr(null), Yr(null);
	try {
		return e();
	} finally {
		Jr(t), Yr(n);
	}
}
function yr(e, t, n, r = n) {
	e.addEventListener(t, () => vr(n));
	let i = e[yt];
	e[yt] = i ? () => {
		i(), r(!0);
	} : () => r(!0), _r();
}
// node_modules/svelte/src/internal/client/reactivity/effects.js
function br(e) {
	H === null && (V === null && Et(e), Tt()), Gr && wt(e);
}
function xr(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function Sr(e, t) {
	var n = H;
	n !== null && n.f & 8192 && (e |= et);
	var r = {
		ctx: k,
		deps: null,
		nodes: null,
		f: e | Qe | 512,
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
	if (e & 4) hn === null ? yn.ensure().schedule(r) : hn.push(r);
	else if (t !== null) {
		try {
			ui(r);
		} catch (e) {
			throw B(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= it));
	}
	if (i !== null && (i.parent = n, n !== null && xr(i, n), V !== null && V.f & 2 && !(e & 64))) {
		var a = V;
		(a.effects ??= []).push(i);
	}
	return r;
}
function Cr() {
	return V !== null && !qr;
}
function wr(e) {
	let t = Sr(8, null);
	return M(t, Ze), t.teardown = e, t;
}
function Tr(e) {
	br("$effect");
	var t = H.f;
	if (!V && t & 32 && !(t & 32768)) {
		var n = k;
		(n.e ??= []).push(e);
	} else return Er(e);
}
function Er(e) {
	return Sr(4 | ot, e);
}
function Dr(e) {
	yn.ensure();
	let t = Sr(64 | at, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Rr(t, () => {
			B(t), n(void 0);
		}) : (B(t), n(void 0));
	});
}
function Or(e) {
	return Sr(4, e);
}
function kr(e) {
	return Sr(ut | at, e);
}
function Ar(e, t = 0) {
	return Sr(8 | t, e);
}
function z(e, t = [], n = [], r = []) {
	jn(r, t, n, (t) => {
		Sr(8, () => e(...t.map(G)));
	});
}
function jr(e, t = 0) {
	return Sr(16 | t, e);
}
function Mr(e) {
	return Sr(32 | at, e);
}
function Nr(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = Gr, n = V;
		Kr(!0), Jr(null);
		try {
			t.call(null);
		} finally {
			Kr(e), Jr(n);
		}
	}
}
function Pr(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && vr(() => {
			e.abort(bt);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : B(n, t), n = r;
	}
}
function Fr(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || B(t), t = n;
	}
}
function B(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Ir(e.nodes.start, e.nodes.end), n = !0), M(e, rt), Pr(e, t && !n), li(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	Nr(e), e.f ^= rt, e.f |= tt;
	var i = e.parent;
	i !== null && i.first !== null && Lr(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Ir(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ lr(e);
		e.remove(), e = n;
	}
}
function Lr(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Rr(e, t, n = !0) {
	var r = [];
	zr(e, r, !0);
	var i = () => {
		n && B(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function zr(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= et;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				zr(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function Br(e) {
	Vr(e, !0);
}
function Vr(e, t) {
	if (e.f & 8192) {
		e.f ^= et, e.f & 1024 || (M(e, Qe), yn.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			Vr(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function Hr(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ lr(n);
		t.append(n), n = i;
	}
}
// node_modules/svelte/src/internal/client/legacy.js
var Ur = null, Wr = !1, Gr = !1;
function Kr(e) {
	Gr = e;
}
var V = null, qr = !1;
function Jr(e) {
	V = e;
}
var H = null;
function Yr(e) {
	H = e;
}
var Xr = null;
function Zr(e) {
	V !== null && (Xr === null ? Xr = [e] : Xr.push(e));
}
var U = null, W = 0, Qr = null;
function $r(e) {
	Qr = e;
}
var ei = 1, ti = 0, ni = ti;
function ri(e) {
	ni = e;
}
function ii() {
	return ++ei;
}
function ai(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~ct), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (ai(a) && Vn(a), a.wv > e.wv) return !0;
		}
		t & 512 && dn === null && M(e, Ze);
	}
	return !1;
}
function oi(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Xr !== null && Re.call(Xr, e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? oi(a, t, !1) : t === a && (n ? M(a, Qe) : a.f & 1024 && M(a, $e), wn(a));
	}
}
function si(e) {
	var t = U, n = W, r = Qr, i = V, a = Xr, o = k, s = qr, c = ni, l = e.f;
	U = null, W = 0, Qr = null, V = l & 96 ? null : e, Xr = null, Jt(e.ctx), qr = !1, ni = ++ti, e.ac !== null && (vr(() => {
		e.ac.abort(bt);
	}), e.ac = null);
	try {
		e.f |= lt;
		var u = e.fn, d = u();
		e.f |= nt;
		var f = e.deps, p = N?.is_fork;
		if (U !== null) {
			var m;
			if (p || li(e, W), f !== null && W > 0) for (f.length = W + U.length, m = 0; m < U.length; m++) f[W + m] = U[m];
			else e.deps = f = U;
			if (Cr() && e.f & 512) for (m = W; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && W < f.length && (li(e, W), f.length = W);
		if (Yt() && Qr !== null && !qr && f !== null && !(e.f & 6146)) for (m = 0; m < Qr.length; m++) oi(Qr[m], e);
		if (i !== null && i !== e) {
			if (ti++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = ti;
			if (t !== null) for (let e of t) e.rv = ti;
			Qr !== null && (r === null ? r = Qr : r.push(...Qr));
		}
		return e.f & 8388608 && (e.f ^= dt), d;
	} catch (e) {
		return en(e);
	} finally {
		e.f ^= lt, U = t, W = n, Qr = r, V = i, Xr = a, Jt(o), qr = s, ni = c;
	}
}
function ci(e, t) {
	let n = t.reactions;
	if (n !== null) {
		var r = Le.call(n, e);
		if (r !== -1) {
			var i = n.length - 1;
			i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
		}
	}
	if (n === null && t.f & 2 && (U === null || !Re.call(U, t))) {
		var a = t;
		a.f & 512 && (a.f ^= 512, a.f &= ~ct), a.v !== T && rn(a), Hn(a), li(a, 0);
	}
}
function li(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) ci(e, n[r]);
}
function ui(e) {
	var t = e.f;
	if (!(t & 16384)) {
		M(e, Ze);
		var n = H, r = Wr;
		H = e, Wr = !0;
		try {
			t & 16777232 ? Fr(e) : Pr(e), Nr(e);
			var i = si(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = ei;
		} finally {
			Wr = r, H = n;
		}
	}
}
async function di() {
	await Promise.resolve(), bn();
}
function G(e) {
	var t = !!(e.f & 2);
	if (Ur?.add(e), V !== null && !qr && !(H !== null && H.f & 16384) && (Xr === null || !Re.call(Xr, e))) {
		var n = V.deps;
		if (V.f & 2097152) e.rv < ti && (e.rv = ti, U === null && n !== null && n[W] === e ? W++ : U === null ? U = [e] : U.push(e));
		else {
			V.deps ??= [], Re.call(V.deps, e) || V.deps.push(e);
			var r = e.reactions;
			r === null ? e.reactions = [V] : Re.call(r, V) || r.push(V);
		}
	}
	if (Gr && Gn.has(e)) return Gn.get(e);
	if (t) {
		var i = e;
		if (Gr) {
			var a = i.v;
			return (!(i.f & 1024) && i.reactions !== null || pi(i)) && (a = Bn(i)), Gn.set(i, a), a;
		}
		var o = !(i.f & 512) && !qr && V !== null && (Wr || !!(V.f & 512)), s = (i.f & nt) === 0;
		ai(i) && (o && (i.f |= 512), Vn(i)), o && !s && (Un(i), fi(i));
	}
	if (dn?.has(e)) return dn.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function fi(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (Un(t), fi(t));
}
function pi(e) {
	if (e.v === T) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Gn.has(t) || t.f & 2 && pi(t)) return !0;
	return !1;
}
function mi(e) {
	var t = qr;
	try {
		return qr = !0, e();
	} finally {
		qr = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var hi = ["touchstart", "touchmove"];
function gi(e) {
	return hi.includes(e);
}
// node_modules/svelte/src/internal/client/dev/css.js
var _i = Symbol("events"), vi = /* @__PURE__ */ new Set(), yi = /* @__PURE__ */ new Set();
function bi(e) {
	if (!E) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function xi(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Ti.call(t, e), !e.cancelBubble) return vr(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Qt(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function Si(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = xi(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && wr(() => {
		t.removeEventListener(e, o, a);
	});
}
function K(e, t, n) {
	(t[_i] ??= {})[e] = n;
}
function Ci(e) {
	for (var t = 0; t < e.length; t++) vi.add(e[t]);
	for (var n of yi) n(e);
}
var wi = null;
function Ti(e) {
	var t = this, n = t.ownerDocument, r = e.type, i = e.composedPath?.() || [], a = i[0] || e.target;
	wi = e;
	var o = 0, s = wi === e && e[_i];
	if (s) {
		var c = i.indexOf(s);
		if (c !== -1 && (t === document || t === window)) {
			e[_i] = t;
			return;
		}
		var l = i.indexOf(t);
		if (l === -1) return;
		c <= l && (o = c);
	}
	if (a = i[o] || e.target, a !== t) {
		Be(e, "currentTarget", {
			configurable: !0,
			get() {
				return a || n;
			}
		});
		var u = V, d = H;
		Jr(null), Yr(null);
		try {
			for (var f, p = []; a !== null;) {
				var m = a.assignedSlot || a.parentNode || a.host || null;
				try {
					var h = a[_i]?.[r];
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
			e[_i] = t, delete e.currentTarget, Jr(u), Yr(d);
		}
	}
}
// node_modules/svelte/src/internal/client/dom/reconciler.js
var Ei = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function Di(e) {
	return Ei?.createHTML(e) ?? e;
}
function Oi(e) {
	var t = pr("template");
	return t.innerHTML = Di(e.replaceAll("<!>", "<!---->")), t.content;
}
// node_modules/svelte/src/internal/client/dom/template.js
function ki(e, t) {
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
		if (E) return ki(D, null), D;
		i === void 0 && (i = Oi(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ cr(i)));
		var t = r || rr ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ cr(t), s = t.lastChild;
			ki(o, s);
		} else ki(t, t);
		return t;
	};
}
function Ai() {
	if (E) return ki(D, null), D;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = sr();
	return e.append(t, n), ki(t, n), e;
}
function J(e, t) {
	if (E) {
		var n = H;
		n.f & 32768 && n.nodes.end !== null || (n.nodes.end = D), Vt();
	} else e !== null && e.before(t);
}
function Y(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[vt] ??= e.nodeValue) && (e[vt] = n, e.nodeValue = `${n}`);
}
function ji(e, t) {
	return Ni(e, t);
}
var Mi = /* @__PURE__ */ new Map();
function Ni(e, { target: t, anchor: n, props: r = {}, events: i, context: a, intro: o = !0, transformError: s }) {
	or();
	var c = void 0, l = Dr(() => {
		var o = n ?? t.appendChild(sr());
		kn(o, { pending: () => {} }, (t) => {
			A({});
			var n = k;
			if (a && (n.c = a), i && (r.$$events = i), E && ki(t, null), c = e(t, r) || {}, E && (H.nodes.end = D, D === null || D.nodeType !== 8 || D.data !== "]")) throw It(), Nt;
			j();
		}, s);
		var l = /* @__PURE__ */ new Set(), u = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!l.has(r)) {
					l.add(r);
					var i = gi(r);
					for (let e of [t, document]) {
						var a = Mi.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Mi.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Ti, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return u(ze(vi)), yi.add(u), () => {
			for (var e of l) for (let n of [t, document]) {
				var r = Mi.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Ti), r.delete(e), r.size === 0 && Mi.delete(n)) : r.set(e, i);
			}
			yi.delete(u), o !== n && o.parentNode?.removeChild(o);
		};
	});
	return Pi.set(c, l), c;
}
var Pi = /* @__PURE__ */ new WeakMap();
function Fi(e, t) {
	let n = Pi.get(e);
	return n ? (Pi.delete(e), n(t)) : Promise.resolve();
}
// node_modules/svelte/src/internal/client/dom/blocks/branches.js
var Ii = class {
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
			if (n) Br(n), this.#r.delete(t);
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
						Hr(r, t), t.append(sr()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else B(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), Rr(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (B(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = N, r = fr();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = sr();
				i.append(a), this.#n.set(e, {
					effect: Mr(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, Mr(() => t(this.anchor)));
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
	E && (r = D, Vt());
	var i = new Ii(e), a = n ? it : 0;
	function o(e, t) {
		if (E) {
			var n = Wt(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Ut();
				Bt(a), i.anchor = a, zt(!1), i.ensure(e, t), zt(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	jr(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
// node_modules/svelte/src/internal/client/dom/blocks/key.js
var Li = Symbol("NaN");
function Ri(e, t, n) {
	E && Vt();
	var r = new Ii(e), i = !Yt();
	jr(() => {
		var e = t();
		e !== e && (e = Li), i && typeof e == "object" && e && (e = {}), r.ensure(e, n);
	});
}
// node_modules/svelte/src/internal/client/dom/blocks/each.js
function zi(e, t, n) {
	for (var r = [], i = t.length, a, o = t.length, s = 0; s < i; s++) {
		let n = t[s];
		Rr(n, () => {
			if (a) {
				if (a.pending.delete(n), a.done.add(n), a.pending.size === 0) {
					var t = e.outrogroups;
					Bi(e, ze(a.done)), t.delete(a), t.size === 0 && (e.outrogroups = null);
				}
			} else --o;
		}, !1);
	}
	if (o === 0) {
		var c = r.length === 0 && n !== null;
		if (c) {
			var l = n, u = l.parentNode;
			dr(u), u.append(l), e.items.clear();
		}
		Bi(e, t, !c);
	} else a = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(a);
}
function Bi(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= st, Hr(a, document.createDocumentFragment())) : B(t[i], n);
	}
}
var Vi;
function Hi(e, t, n, r, i, a = null) {
	var o = e, s = /* @__PURE__ */ new Map();
	if (t & 4) {
		var c = e;
		o = E ? Bt(/* @__PURE__ */ cr(c)) : c.appendChild(sr());
	}
	E && Vt();
	var l = null, u = /* @__PURE__ */ Rn(() => {
		var e = n();
		return Ie(e) ? e : e == null ? [] : ze(e);
	}), d, f = /* @__PURE__ */ new Map(), p = !0;
	function m(e) {
		g.effect.f & 16384 || (g.pending.delete(e), g.fallback = l, Wi(g, d, o, t, r), l !== null && (d.length === 0 ? l.f & 33554432 ? (l.f ^= st, Ki(l, null, o)) : Br(l) : Rr(l, () => {
			l = null;
		})));
	}
	function h(e) {
		g.pending.delete(e);
	}
	var g = {
		effect: jr(() => {
			d = G(u);
			var e = d.length;
			let c = !1;
			E && Wt(o) === "[!" != (e === 0) && (o = Ut(), Bt(o), zt(!1), c = !0);
			for (var g = /* @__PURE__ */ new Set(), _ = N, v = fr(), y = 0; y < e; y += 1) {
				E && D.nodeType === 8 && D.data === "]" && (o = D, c = !0, zt(!1));
				var b = d[y], x = r(b, y), S = p ? null : s.get(x);
				S ? (S.v && Yn(S.v, b), S.i && Yn(S.i, y), v && _.unskip_effect(S.e)) : (S = Gi(s, p ? o : Vi ??= sr(), b, x, y, i, t, n), p || (S.e.f |= st), s.set(x, S)), g.add(x);
			}
			if (e === 0 && a && !l && (p ? l = Mr(() => a(o)) : (l = Mr(() => a(Vi ??= sr())), l.f |= st)), e > g.size && Ct("", "", ""), E && e > 0 && Bt(Ut()), !p) {
				if (f.set(_, g), v) {
					for (let [e, t] of s) g.has(e) || _.skip_effect(t.e);
					_.oncommit(m), _.ondiscard(h);
				} else m(_);
			}
			c && zt(!0), G(u);
		}),
		flags: t,
		items: s,
		pending: f,
		outrogroups: null,
		fallback: l
	};
	p = !1, E && (o = D);
}
function Ui(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Wi(e, t, n, r, i) {
	var a = !!(r & 8), o = t.length, s = e.items, c = Ui(e.effect.first), l, u = null, d, f = [], p = [], m, h, g, _;
	if (a) for (_ = 0; _ < o; _ += 1) m = t[_], h = i(m, _), g = s.get(h).e, g.f & 33554432 || (g.nodes?.a?.measure(), (d ??= /* @__PURE__ */ new Set()).add(g));
	for (_ = 0; _ < o; _ += 1) {
		if (m = t[_], h = i(m, _), g = s.get(h).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(g), t.done.delete(g);
		if (g.f & 8192 && (Br(g), a && (g.nodes?.a?.unfix(), (d ??= /* @__PURE__ */ new Set()).delete(g))), g.f & 33554432) {
			if (g.f ^= st, g === c) Ki(g, null, n);
			else {
				var v = u ? u.next : c;
				g === e.effect.last && (e.effect.last = g.prev), g.prev && (g.prev.next = g.next), g.next && (g.next.prev = g.prev), qi(e, u, g), qi(e, g, v), Ki(g, v, n), u = g, f = [], p = [], c = Ui(u.next);
				continue;
			}
		}
		if (g !== c) {
			if (l !== void 0 && l.has(g)) {
				if (f.length < p.length) {
					var y = p[0], b;
					u = y.prev;
					var x = f[0], S = f[f.length - 1];
					for (b = 0; b < f.length; b += 1) Ki(f[b], y, n);
					for (b = 0; b < p.length; b += 1) l.delete(p[b]);
					qi(e, x.prev, S.next), qi(e, u, x), qi(e, S, y), c = y, u = S, --_, f = [], p = [];
				} else l.delete(g), Ki(g, c, n), qi(e, g.prev, g.next), qi(e, g, u === null ? e.effect.first : u.next), qi(e, u, g), u = g;
				continue;
			}
			for (f = [], p = []; c !== null && c !== g;) (l ??= /* @__PURE__ */ new Set()).add(c), p.push(c), c = Ui(c.next);
			if (c === null) continue;
		}
		g.f & 33554432 || f.push(g), u = g, c = Ui(g.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Bi(e, ze(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (c !== null || l !== void 0) {
		var C = [];
		if (l !== void 0) for (g of l) g.f & 8192 || C.push(g);
		for (; c !== null;) !(c.f & 8192) && c !== e.fallback && C.push(c), c = Ui(c.next);
		var w = C.length;
		if (w > 0) {
			var ee = r & 4 && o === 0 ? n : null;
			if (a) {
				for (_ = 0; _ < w; _ += 1) C[_].nodes?.a?.measure();
				for (_ = 0; _ < w; _ += 1) C[_].nodes?.a?.fix();
			}
			zi(e, C, ee);
		}
	}
	a && Qt(() => {
		if (d !== void 0) for (g of d) g.nodes?.a?.apply();
	});
}
function Gi(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? qn(n) : /* @__PURE__ */ Jn(n, !1, !1) : null, l = o & 2 ? qn(i) : null;
	return {
		v: c,
		i: l,
		e: Mr(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Ki(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ lr(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function qi(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
// node_modules/svelte/src/internal/client/dom/blocks/snippet.js
function Ji(e, t, ...n) {
	var r = new Ii(e);
	jr(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, it);
}
// node_modules/svelte/src/internal/client/dom/css.js
function Z(e, t) {
	Or(() => {
		var n = e.getRootNode(), r = n.host ? n : n.head ?? n.ownerDocument.head;
		if (!r.querySelector("#" + t.hash)) {
			let e = pr("style");
			e.id = t.hash, e.textContent = t.code, r.appendChild(e);
		}
	});
}
// node_modules/svelte/src/internal/shared/attributes.js
function Yi(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function Xi(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function Zi(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(Xi)), i && c.push(...Object.keys(i).map(Xi));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = Xi(e.substring(l, u).trim());
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
		return r && (n += Yi(r)), i && (n += Yi(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
// node_modules/svelte/src/internal/client/dom/elements/style.js
function Qi(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function $i(e, t, n, r) {
	var i = e[_t];
	if (E || i !== t) {
		var a = Zi(t, r);
		E && a === e.getAttribute("style") || (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[_t] = t;
	} else r && (Array.isArray(r) ? (Qi(e, n?.[0], r[0]), Qi(e, n?.[1], r[1], "important")) : Qi(e, n, r));
	return r;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
function ea(e, t, n = !1) {
	if (e.multiple) {
		if (t == null) return;
		if (!Ie(t)) return Lt();
		for (var r of e.options) r.selected = t.includes(ra(r));
	} else {
		for (r of e.options) if (tr(ra(r), t)) {
			r.selected = !0;
			return;
		}
		n && t === void 0 || (e.selectedIndex = -1);
	}
}
function ta(e) {
	var t = new MutationObserver(() => {
		ea(e, e.__value);
	});
	t.observe(e, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["value"]
	}), wr(() => {
		t.disconnect();
	});
}
function na(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet(), i = !0;
	yr(e, "change", (t) => {
		var i = t ? "[selected]" : ":checked", a;
		if (e.multiple) a = [].map.call(e.querySelectorAll(i), ra);
		else {
			var o = e.querySelector(i) ?? e.querySelector("option:not([disabled])");
			a = o && ra(o);
		}
		n(a), e.__value = a, N !== null && r.add(N);
	}), Or(() => {
		var a = t();
		if (e === document.activeElement) {
			var o = N;
			if (r.has(o)) return;
		}
		if (ea(e, a, i), i && a === void 0) {
			var s = e.querySelector(":checked");
			s !== null && (a = ra(s), n(a));
		}
		e.__value = a, i = !1;
	}), ta(e);
}
function ra(e) {
	return "__value" in e ? e.__value : e.value;
}
// node_modules/svelte/src/internal/client/dom/elements/attributes.js
var ia = Symbol("is custom element"), aa = Symbol("is html"), oa = xt ? "link" : "LINK", sa = xt ? "progress" : "PROGRESS";
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
		e[yt] = n, Qt(n), _r();
	}
}
function ca(e, t) {
	var n = ua(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === sa) && (e.value = t ?? "");
}
function la(e, t) {
	var n = ua(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function $(e, t, n, r) {
	var i = ua(e);
	E && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === oa) || i[t] !== (i[t] = n) && (t === "loading" && (e[mt] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && fa(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function ua(e) {
	return e[ht] ??= {
		[ia]: e.nodeName.includes("-"),
		[aa]: e.namespaceURI === Pt
	};
}
var da = /* @__PURE__ */ new Map();
function fa(e) {
	var t = e.getAttribute("is") || e.nodeName, n = da.get(t);
	if (n) return n;
	da.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var o in r = He(i), r) r[o].set && o !== "innerHTML" && o !== "textContent" && o !== "innerText" && n.push(o);
		i = Ge(i);
	}
	return n;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function pa(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	yr(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = ma(e) ? ha(a) : a, n(a), N !== null && r.add(N), await di(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (E && e.defaultValue !== e.value || mi(t) == null && e.value) && (n(ma(e) ? ha(e.value) : e.value), N !== null && r.add(N)), Ar(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = N;
			if (r.has(i)) return;
		}
		ma(e) && n === ha(e.value) || (e.type !== "date" || n || e.value) && n !== e.value && (e.value = n ?? "");
	});
}
function ma(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function ha(e) {
	return e === "" ? null : +e;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function ga(e, t) {
	return e === t || e?.[ft] === t;
}
function _a(e = {}, t, n, r) {
	var i = k.r, a = H;
	return Or(() => {
		var o, s;
		return Ar(() => {
			o = s, s = r?.() || [], mi(() => {
				ga(n(...s), e) || (t(e, ...s), o && ga(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && ga(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
// node_modules/svelte/src/internal/client/reactivity/props.js
function va(e, t, n, r) {
	var i = !0, a = !!(n & 8), o = !!(n & 16), s = r, c = !0, l = void 0, u = () => o && i ? (l ??= /* @__PURE__ */ Fn(r), G(l)) : (c && (c = !1, s = o ? mi(r) : r), s);
	let d;
	if (a) {
		var f = ft in e || pt in e;
		d = Ve(e, t)?.set ?? (f && t in e ? (n) => e[t] = n : void 0);
	}
	var p, m = !1;
	a ? [p, m] = cn(() => e[t]) : p = e[t], p === void 0 && r !== void 0 && (p = u(), d && (i && Ot(t), d(p)));
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
	var _ = !1, v = (n & 1 ? Fn : Rn)(() => (_ = !1, h()));
	a && G(v);
	var y = H;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? G(v) : i && a ? $n(e) : e;
			return I(v, n), _ = !0, s !== void 0 && (s = n), e;
		}
		return Gr && _ || y.f & 16384 ? v.v : G(v);
	});
}
// node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
// src/ui/canvas/sanitize.ts
var ya = /* @__PURE__ */ new Set([
	"http:",
	"https:",
	"mailto:",
	"tel:"
]), ba = (e) => {
	if (typeof e != "string") return "";
	let t = e.replace(/[\u0000- \u007f-\u009f]/g, ""), n = /^([a-z][a-z0-9+.-]*):/i.exec(t)?.[1];
	return n === void 0 || ya.has(`${n.toLowerCase()}:`) ? e.trim() : "";
}, xa = (e) => typeof e == "string" ? e.replace(/[^\w\- :]/g, "").trim() : "", Sa = (e) => {
	let t = ba(e);
	return t !== "" && !/^(mailto|tel):/i.test(t) ? t : "";
}, Ca = (e) => typeof e == "string" ? e : typeof e == "number" ? String(e) : "", wa = (e) => e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;"), Ta = "allow-same-origin", Ea = (e) => "<!doctype html><html><head><meta charset=\"utf-8\"><meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'none'; style-src * 'unsafe-inline'; img-src * data: blob:; font-src * data:\">" + e.map(Sa).filter((e) => e !== "").map((e) => `<link rel="stylesheet" href="${wa(e)}">`).join("") + "<style>body{margin:0;padding:12px;min-height:100vh;box-sizing:border-box}[data-ceiba-id]{cursor:default}[data-ceiba-id]:hover{outline:1px dashed #94a3b8}[data-ceiba-selected]{outline:2px solid #2563eb!important;outline-offset:2px}[data-ceiba-multiline]{white-space:pre-line}[contenteditable]{outline:2px solid #16a34a!important;outline-offset:2px;cursor:text}.ceiba-dragging,.ceiba-dragging *{user-select:none!important;cursor:grabbing!important}.ceiba-placeholder{padding:12px;border:1px dashed #94a3b8;color:#475569;font:13px system-ui;background:#f8fafc}@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}</style></head><body></body></html>", Da = /* @__PURE__ */ new Set([
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
]), Oa = /* @__PURE__ */ new Set(["text"]), ka = (e, t) => !t.has(e.type) || e.children.length > 0 ? null : e.type === "heading" ? "text" : e.type === "text" ? "content" : e.type === "button" ? "label" : Da.has(e.type) || Oa.has(e.type) ? "content" : null, Aa = (e) => Oa.has(e), ja = (e, t) => {
	let n = e.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, "");
	return t ? n.replace(/\n$/, "") : n.replace(/\n+/g, " ");
}, Ma = (e) => {
	let t = e.ownerDocument, n = t.createRange();
	n.selectNodeContents(e), n.collapse(!1);
	let r = t.getSelection();
	r?.removeAllRanges(), r?.addRange(n);
}, Na = /* @__PURE__ */ new Set(/* @__PURE__ */ "div.section.article.header.footer.nav.main.aside.h1.h2.h3.h4.h5.h6.p.span.strong.em.small.a.ul.ol.li.blockquote.figure.figcaption.code.pre.hr.br.img.label".split(".")), Pa = (e) => {
	let t = e.fields.props;
	return typeof t == "object" && t && !Array.isArray(t) ? t : {};
}, Fa = (e, t) => {
	let n = e.createElement("div");
	return n.className = "ceiba-placeholder", n.textContent = t, n;
}, Ia = (e, t, n, r) => {
	let i = Pa(t), a = (t, n = "") => {
		let r = e.createElement(t), a = `${n} ${xa(i.class)}`.trim();
		return a && (r.className = a), r;
	};
	switch (t.type) {
		case "container": return a("div", i.fluid ? "container-fluid" : "container");
		case "row": {
			let e = xa(Ca(i.gutter));
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
			return e.textContent = Ca(i.text), e;
		}
		case "text": {
			let e = a("p");
			return e.textContent = Ca(i.content), e;
		}
		case "image":
		case "img": {
			let t = ba(i.src);
			if (t === "") return Fa(e, n.emptyImage);
			let r = a("img", "img-fluid");
			return r.src = t, r.alt = Ca(i.alt), r;
		}
		case "button": {
			let e = a("a", "btn btn-primary");
			return e.href = ba(i.url) || "#", e.textContent = Ca(i.label), e;
		}
		case "html": return Fa(e, n.html);
	}
	if (!r || !Na.has(t.type)) return Fa(e, n.unknown(t.type));
	let o = a(t.type);
	return t.type === "a" && (o.href = ba(i.href) || "#"), t.type === "img" && (o.src = ba(i.src), o.alt = Ca(i.alt)), i.content !== void 0 && o.append(e.createTextNode(Ca(i.content))), o;
}, La = (e, t, n, r, i) => {
	let a = (o) => {
		let s = t.nodes[o];
		if (!s) return null;
		let c = Ia(e, s, i, n.has(s.type));
		if (c.dataset.ceibaId = o, o === r && (c.dataset.ceibaSelected = ""), Aa(s.type) && (c.dataset.ceibaMultiline = ""), c.className !== "ceiba-placeholder" && c.tagName !== "IMG") for (let e of s.children) {
			let t = a(e);
			t && c.append(t);
		}
		return c;
	}, o = t.rootIds.map(a).filter((e) => e !== null);
	e.body.replaceChildren(...o);
}, Ra = /* @__PURE__ */ q("<div class=\"canvas svelte-1tv0kiv\"><p class=\"help svelte-1tv0kiv\"> </p> <iframe class=\"svelte-1tv0kiv\"></iframe></div>"), za = {
	hash: "svelte-1tv0kiv",
	code: ".canvas.svelte-1tv0kiv {background:var(--cpb-canvas);padding:.5rem 1rem 1rem;min-height:0;display:flex;flex-direction:column;}.help.svelte-1tv0kiv {margin:0 0 .5rem;font-size:.75rem;color:var(--cpb-muted);}iframe.svelte-1tv0kiv {flex:1;width:100%;min-height:480px;border:1px solid var(--cpb-border);border-radius:8px;background:#fff;}"
};
function Ba(e, t) {
	A(t, !0), Z(e, za);
	let n = va(t, "stylesheets", 19, () => []), r = /* @__PURE__ */ P(() => t.store.t), i = /* @__PURE__ */ F(void 0), a = /* @__PURE__ */ F(!1), o = /* @__PURE__ */ F(null), s = /* @__PURE__ */ P(() => Ea(n())), c = (e) => e?.closest?.("[data-ceiba-id]");
	function l(e) {
		let n = G(i)?.contentDocument, a = t.store.tree.nodes[e], s = a && t.store.catalogue ? ka(a, t.store.catalogue) : null, c = n?.querySelector(`[data-ceiba-id="${CSS.escape(e)}"]`);
		if (!n || !a || !s || !c) return !1;
		t.store.select(e), I(o, e, !0);
		let l = Aa(a.type);
		c.setAttribute("contenteditable", "plaintext-only"), c.setAttribute("aria-label", G(r)("announce.editing"));
		let u = () => {
			t.store.run({
				kind: "updateProps",
				id: e,
				set: { [s]: ja(c.innerText, l) }
			});
		}, d = (n) => {
			c.removeEventListener("input", u), c.removeEventListener("keydown", f), c.removeEventListener("blur", p), c.removeAttribute("contenteditable"), I(o, null), t.store.announce("announce.editDone"), t.onEditEnd(e, n);
		}, f = (e) => {
			(e.key === "Escape" || e.key === "Enter" && (!l || e.ctrlKey || e.metaKey)) && (e.preventDefault(), d(!0));
		}, p = () => d(!1);
		return c.addEventListener("input", u), c.addEventListener("keydown", f), c.addEventListener("blur", p), c.focus(), Ma(c), t.store.announce("announce.editing"), !0;
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
	Tr(() => {
		let e = G(i)?.contentDocument, n = t.store.catalogue, s = t.store.tree, c = t.store.selection;
		G(a) && e && n && G(o) === null && (La(e, s, n, c, {
			unknown: (e) => G(r)("canvas.unknown", { type: e }),
			html: G(r)("canvas.html"),
			emptyImage: G(r)("canvas.emptyImage")
		}), c && e.querySelector(`[data-ceiba-id="${CSS.escape(c)}"]`)?.scrollIntoView({ block: "nearest" }));
	});
	var f = { startEditing: l }, p = Ra(), m = L(p), h = L(m, !0);
	O(m);
	var g = R(m, 2);
	return _a(g, (e) => I(i, e), () => G(i)), O(p), z((e, n) => {
		$(m, "id", `${t.uid}-canvas-help`), Y(h, e), $(g, "title", n), $(g, "sandbox", Ta), $(g, "srcdoc", G(s)), $(g, "aria-describedby", `${t.uid}-canvas-help`);
	}, [() => G(r)("canvas.help"), () => G(r)("canvas.title")]), Si("load", g, d), bi(g), J(e, p), j(f);
}
// src/ui/model/insert.ts
var Va = (e, t) => {
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
}, Ha = (e, t, n) => {
	let r = e.get(t);
	return !r?.isContainer || r.disallowedChildren.includes(n) ? !1 : r.allowedChildren.includes("*") || r.allowedChildren.includes(n);
}, Ua = (e, t, n, r) => {
	let i = n === null ? void 0 : e.nodes[n];
	if (!i) return {
		parent: null,
		index: e.rootIds.length
	};
	if (Ha(t, i.type, r)) return {
		parent: i.id,
		index: i.children.length
	};
	let a = ce(e, i.parent);
	return {
		parent: i.parent,
		index: a.indexOf(i.id) + 1
	};
}, Wa = (e) => {
	let { id: t, _id: n, children: r, ...i } = e;
	return {
		...i,
		children: (r ?? []).map(Wa)
	};
}, Ga = class {
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
		let i = Ua(this.store.tree, n, this.store.selection, r.type), a = this.store.session.commandContext;
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
				nodes: [Wa(i)]
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
}, Ka = /* @__PURE__ */ q("<dialog class=\"svelte-o2xhl0\"><form method=\"dialog\" class=\"svelte-o2xhl0\"><h2 class=\"svelte-o2xhl0\"> </h2> <!> <div class=\"actions svelte-o2xhl0\"><button type=\"button\" class=\"svelte-o2xhl0\"> </button> <button type=\"submit\" class=\"primary svelte-o2xhl0\"> </button></div></form></dialog>"), qa = {
	hash: "svelte-o2xhl0",
	code: "dialog.svelte-o2xhl0 {border:1px solid var(--cpb-border);border-radius:10px;padding:1rem;width:min(560px, 90vw);color:inherit;font:inherit;}dialog.svelte-o2xhl0::backdrop {background:rgb(15 23 42 / .45);}h2.svelte-o2xhl0 {font-size:1rem;margin:0 0 .75rem;}.actions.svelte-o2xhl0 {display:flex;justify-content:flex-end;gap:.5rem;margin-top:1rem;}button.svelte-o2xhl0 {font:inherit;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.primary.svelte-o2xhl0 {background:var(--cpb-accent);border-color:var(--cpb-accent);color:#fff;}button.svelte-o2xhl0:disabled {opacity:.5;}.svelte-o2xhl0:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Ja(e, t) {
	A(t, !0), Z(e, qa);
	let n = va(t, "open", 15, !1), r = va(t, "busy", 3, !1), i = /* @__PURE__ */ F(void 0), a = null;
	Tr(() => {
		G(i) && (n() && !G(i).open ? (a = G(i).getRootNode().activeElement, G(i).showModal()) : !n() && G(i).open && G(i).close());
	});
	var o = Ka(), s = L(o), c = L(s), l = L(c, !0);
	O(c);
	var u = R(c, 2);
	Ji(u, () => t.children);
	var d = R(u, 2), f = L(d), p = L(f, !0);
	O(f);
	var m = R(f, 2), h = L(m, !0);
	O(m), O(d), O(s), O(o), _a(o, (e) => I(i, e), () => G(i)), z(() => {
		$(o, "aria-labelledby", `${t.uid}-title`), $(c, "id", `${t.uid}-title`), Y(l, t.title), Y(p, t.cancelLabel), m.disabled = r(), Y(h, t.submitLabel);
	}), Si("close", o, () => {
		n(!1), a?.focus?.();
	}), Si("submit", s, (e) => {
		e.preventDefault(), t.onSubmit();
	}), K("click", f, () => {
		n(!1);
	}), J(e, o), j();
}
Ci(["click"]);
// src/ui/content/ImportDialog.svelte
var Ya = /* @__PURE__ */ q("<p class=\"help svelte-c6zkzf\"> </p> <label class=\"svelte-c6zkzf\"> </label> <textarea rows=\"10\" spellcheck=\"false\" class=\"svelte-c6zkzf\"></textarea>", 1), Xa = {
	hash: "svelte-c6zkzf",
	code: ".help.svelte-c6zkzf {font-size:.8rem;margin:0 0 .5rem;}label.svelte-c6zkzf {display:block;font-size:.8rem;font-weight:600;margin-bottom:.25rem;}textarea.svelte-c6zkzf {width:100%;box-sizing:border-box;font:12px/1.4 ui-monospace, monospace;padding:.5rem;border:1px solid var(--cpb-border);border-radius:6px;}"
};
function Za(e, t) {
	A(t, !0), Z(e, Xa);
	let n = va(t, "open", 15, !1), r = /* @__PURE__ */ P(() => t.store.t), i = /* @__PURE__ */ F(""), a = /* @__PURE__ */ F(!1);
	async function o() {
		if (G(i).trim() === "") return;
		I(a, !0);
		let e = await t.content.importHtml(G(i));
		I(a, !1), e !== null && (e > 0 && t.store.announce("import.warnings", { count: e }), I(i, ""), n(!1));
	}
	{
		let s = /* @__PURE__ */ P(() => G(r)("import.title")), c = /* @__PURE__ */ P(() => `${t.uid}-import`), l = /* @__PURE__ */ P(() => G(r)("import.submit")), u = /* @__PURE__ */ P(() => G(r)("dialog.cancel"));
		Ja(e, {
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
				var a = Ya(), o = ur(a), s = L(o, !0);
				O(o);
				var c = R(o, 2), l = L(c, !0);
				O(c);
				var u = R(c, 2);
				hr(u), z((e, n) => {
					Y(s, e), $(c, "for", `${t.uid}-import-html`), Y(l, n), $(u, "id", `${t.uid}-import-html`);
				}, [() => G(r)("import.help"), () => G(r)("import.field")]), pa(u, () => G(i), (e) => I(i, e)), J(e, a);
			},
			$$slots: { default: !0 }
		});
	}
	j();
}
// src/ui/content/TemplateDialog.svelte
var Qa = /* @__PURE__ */ q("<label class=\"svelte-181fmze\"> </label> <input required=\"\" maxlength=\"200\" class=\"svelte-181fmze\"/> <label class=\"svelte-181fmze\"> </label> <input maxlength=\"100\" class=\"svelte-181fmze\"/>", 1), $a = {
	hash: "svelte-181fmze",
	code: "label.svelte-181fmze {display:block;font-size:.8rem;font-weight:600;margin:.5rem 0 .25rem;}input.svelte-181fmze {width:100%;box-sizing:border-box;font:inherit;padding:.35rem .5rem;border:1px solid var(--cpb-border);border-radius:6px;}"
};
function eo(e, t) {
	A(t, !0), Z(e, $a);
	let n = va(t, "open", 15, !1), r = /* @__PURE__ */ P(() => t.store.t), i = /* @__PURE__ */ F(""), a = /* @__PURE__ */ F("general"), o = /* @__PURE__ */ F(!1);
	async function s() {
		if (!t.nodeId || G(i).trim() === "") return;
		I(o, !0);
		let e = await t.content.saveTemplate(t.nodeId, G(i).trim(), G(a).trim() || "general");
		I(o, !1), e && (I(i, ""), n(!1));
	}
	{
		let c = /* @__PURE__ */ P(() => G(r)("template.title")), l = /* @__PURE__ */ P(() => `${t.uid}-template`), u = /* @__PURE__ */ P(() => G(r)("template.submit")), d = /* @__PURE__ */ P(() => G(r)("dialog.cancel"));
		Ja(e, {
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
				var o = Qa(), s = ur(o), c = L(s, !0);
				O(s);
				var l = R(s, 2);
				Q(l);
				var u = R(l, 2), d = L(u, !0);
				O(u);
				var f = R(u, 2);
				Q(f), z((e, n) => {
					$(s, "for", `${t.uid}-template-name`), Y(c, e), $(l, "id", `${t.uid}-template-name`), $(u, "for", `${t.uid}-template-category`), Y(d, n), $(f, "id", `${t.uid}-template-category`);
				}, [() => G(r)("template.name"), () => G(r)("template.category")]), pa(l, () => G(i), (e) => I(i, e)), pa(f, () => G(a), (e) => I(a, e)), J(e, o);
			},
			$$slots: { default: !0 }
		});
	}
	j();
}
// src/ui/drag/indicator.ts
var to = "ceiba-drop-indicator", no = (e, t, n, r) => {
	let i = e.getElementById(to);
	i || (i = e.createElement("div"), i.id = to, i.setAttribute("aria-hidden", "true"), e.body.append(i));
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
}, ro = (e) => {
	e?.getElementById(to)?.remove();
}, io = (e, t, n, r) => {
	let i = t <= 0 ? .5 : (n - e) / t;
	return r ? i < .25 ? "before" : i > .75 ? "after" : "inside" : i < .5 ? "before" : "after";
}, ao = (e, t, n, r) => t.kind === "move" ? {
	kind: "move",
	id: t.id,
	parent: n,
	index: r
} : {
	kind: "insert",
	parent: n,
	index: r,
	node: t.node
}, oo = (e, t, n, r, i) => {
	let a;
	if (r === null || !e.nodes[r]) a = ao(e, n, null, e.rootIds.length);
	else if (i === "inside") a = ao(e, n, r, e.nodes[r]?.children.length ?? 0);
	else {
		let t = e.nodes[r]?.parent ?? null;
		a = ao(e, n, t, ce(e, t).indexOf(r) + +(i === "after"));
	}
	let o = r !== null && e.nodes[r] ? r : null;
	if (n.kind === "move" && a.kind === "move" && so(e, n.id, a.parent, a.index)) return {
		command: null,
		anchor: o,
		zone: i,
		refused: null
	};
	try {
		return ae(e, a, t), {
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
			refused: e instanceof xe ? e.code : "SERVER"
		};
	}
}, so = (e, t, n, r) => {
	if (e.nodes[t]?.parent !== n) return !1;
	let i = ce(e, n).indexOf(t);
	return r === i || r === i + 1;
}, co = 5, lo = class {
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
			!this.active && Math.hypot(e.clientX - r.x, e.clientY - r.y) < co || (this.active || this.begin({
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
			if (!this.active && Math.hypot(e.clientX - i.x, e.clientY - i.y) < co) return;
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
		let i = n.elementFromPoint(e, t)?.closest("[data-ceiba-id]") ?? null, a = i?.dataset.ceibaId ?? null, o = a ? this.store.tree.nodes[a] : void 0, s = i?.getBoundingClientRect(), c = o ? this.store.catalogue?.get(o.type)?.isContainer ?? !1 : !1, l = s ? io(s.top, s.height, t, c) : "inside";
		this.active.target = oo(this.store.tree, r, this.active.dragged, a, l), no(n, i, l, this.active.target.refused !== null);
	}
	clearTarget() {
		this.active && (this.active.target = null), ro(this.doc);
	}
	finish(e) {
		let t = this.active;
		if (this.active = null, ro(this.doc), this.frame && (this.frame.style.pointerEvents = ""), this.doc?.body.classList.remove("ceiba-dragging"), document.removeEventListener("keydown", this.onKey, !0), this.doc?.removeEventListener("keydown", this.onKey, !0), !t) return;
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
}, uo = (e) => typeof e == "object" && e && !Array.isArray(e) ? e : {}, fo = (e) => {
	let t = uo(e), n = typeof t.source == "string" ? t.source : "", r = uo(t.sort);
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
		filters: Object.entries(uo(t.filters)).map(([e, t]) => `${e}=${String(t)}`).join("\n")
	};
}, po = (e) => {
	if (e.trim() === "") return;
	let t = Number(e);
	return Number.isInteger(t) && t >= 0 ? t : null;
}, mo = (e) => {
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
		let e = po(r);
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
}, ho = /* @__PURE__ */ q("<div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input class=\"svelte-1v8f4it\"/></div>"), go = /* @__PURE__ */ q("<div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input type=\"url\" class=\"svelte-1v8f4it\"/></div>"), _o = /* @__PURE__ */ q("<div class=\"grid svelte-1v8f4it\"><div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input class=\"svelte-1v8f4it\"/></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input class=\"svelte-1v8f4it\"/></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input inputmode=\"numeric\" class=\"svelte-1v8f4it\"/></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input inputmode=\"numeric\" class=\"svelte-1v8f4it\"/></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input class=\"svelte-1v8f4it\"/></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label> <select class=\"svelte-1v8f4it\"><option class=\"svelte-1v8f4it\">ASC</option><option class=\"svelte-1v8f4it\">DESC</option></select></div></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><textarea rows=\"3\" class=\"svelte-1v8f4it\"></textarea></div>", 1), vo = /* @__PURE__ */ q("<p class=\"error svelte-1v8f4it\" role=\"alert\"> </p>"), yo = /* @__PURE__ */ q("<details class=\"advanced svelte-1v8f4it\"><summary class=\"svelte-1v8f4it\"> </summary> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label> <select class=\"svelte-1v8f4it\"><option class=\"svelte-1v8f4it\"> </option><option class=\"svelte-1v8f4it\"> </option><option class=\"svelte-1v8f4it\"> </option></select></div> <!> <!> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input class=\"svelte-1v8f4it\"/></div> <!> <button type=\"button\" class=\"svelte-1v8f4it\"> </button></details>"), bo = {
	hash: "svelte-1v8f4it",
	code: ".advanced.svelte-1v8f4it {margin-top:1rem;border-top:1px solid var(--cpb-border);padding-top:.5rem;}summary.svelte-1v8f4it {cursor:pointer;font-size:.8rem;font-weight:700;}.grid.svelte-1v8f4it {display:grid;grid-template-columns:1fr 1fr;gap:0 .5rem;}.field.svelte-1v8f4it {display:grid;gap:.25rem;margin:.5rem 0;}label.svelte-1v8f4it {font-size:.75rem;font-weight:600;}input.svelte-1v8f4it, select.svelte-1v8f4it, textarea.svelte-1v8f4it {font:inherit;font-size:.8rem;padding:.3rem .45rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}.error.svelte-1v8f4it {color:var(--cpb-danger);font-size:.75rem;margin:0;}button.svelte-1v8f4it {font:inherit;font-size:.8rem;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}.svelte-1v8f4it:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function xo(e, t) {
	A(t, !0), Z(e, bo);
	let n = /* @__PURE__ */ P(() => t.store.t), r = $n(mi(() => fo(t.node.fields.loop))), i = /* @__PURE__ */ F($n(mi(() => typeof t.node.fields.condition == "string" ? t.node.fields.condition : ""))), a = /* @__PURE__ */ F(null), o = (e) => `${t.uid}-adv-${e}`;
	function s() {
		let e = mo(r);
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
	var c = yo(), l = L(c), u = L(l, !0);
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
		var t = ho(), i = L(t), a = L(i, !0);
		O(i);
		var s = R(i);
		Q(s), O(t), z((e, t, n) => {
			$(i, "for", e), Y(a, t), $(s, "id", n);
		}, [
			() => o("module"),
			() => G(n)("advanced.moduleSlug"),
			() => o("module")
		]), pa(s, () => r.module, (e) => r.module = e), J(e, t);
	}, C = (e) => {
		var t = go(), i = L(t), a = L(i, !0);
		O(i);
		var s = R(i);
		Q(s), O(t), z((e, t, n) => {
			$(i, "for", e), Y(a, t), $(s, "id", n);
		}, [
			() => o("api"),
			() => G(n)("advanced.apiUrl"),
			() => o("api")
		]), pa(s, () => r.api, (e) => r.api = e), J(e, t);
	};
	X(x, (e) => {
		r.sourceType === "module" ? e(S) : r.sourceType === "api" && e(C, 1);
	});
	var w = R(x, 2), ee = (e) => {
		var t = _o(), i = ur(t), a = L(i), s = L(a), c = L(s, !0);
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
		hr(ue), O(se), z((e, t, n, r, i, a, o, u, m, v, S, te, ae, oe, se, de, fe, pe, me, he, ge) => {
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
		]), pa(l, () => r.variable, (e) => r.variable = e), pa(p, () => r.key, (e) => r.key = e), pa(_, () => r.limit, (e) => r.limit = e), pa(x, () => r.offset, (e) => r.offset = e), pa(ee, () => r.sortColumn, (e) => r.sortColumn = e), na(ie, () => r.sortDirection, (e) => r.sortDirection = e), pa(ue, () => r.filters, (e) => r.filters = e), J(e, t);
	};
	X(w, (e) => {
		r.sourceType !== "none" && e(ee);
	});
	var te = R(w, 2), ne = L(te), re = L(ne, !0);
	O(ne);
	var ie = R(ne);
	Q(ie), O(te);
	var ae = R(te, 2), oe = (e) => {
		var t = vo(), n = L(t, !0);
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
	]), na(m, () => r.sourceType, (e) => r.sourceType = e), pa(ie, () => G(i), (e) => I(i, e)), K("click", se, s), J(e, c), j();
}
Ci(["click"]);
// src/ui/inspector/fields.ts
var So = {
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
}, Co = /* @__PURE__ */ new Set([
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
]), wo = (e) => e.charAt(0).toUpperCase() + e.slice(1).replace(/[_-]/g, " "), To = (e) => {
	let t = [], n = /* @__PURE__ */ new Set();
	for (let [r, i] of Object.entries(e.editorControls)) {
		let e = i, a = e.options?.map(String);
		t.push({
			key: r,
			label: e.label ?? wo(r),
			control: So[e.type ?? ""] ?? "text",
			...a ? { options: a } : {}
		}), n.add(r);
	}
	for (let [r, i] of Object.entries(e.propsSchema)) {
		if (n.has(r)) continue;
		let e = i, a = e.enum?.map(String);
		t.push({
			key: r,
			label: wo(r),
			control: a ? "select" : So[e.type ?? ""] ?? "text",
			...a ? { options: a } : {}
		}), n.add(r);
	}
	return Object.keys(e.propsSchema).length === 0 && Object.keys(e.editorControls).length === 0 && (Co.has(e.type) && t.push({
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
}, Eo = (e, t) => {
	if (e.control === "checkbox") return { value: t === !0 };
	let n = String(t);
	if (e.control === "number") {
		if (n.trim() === "") return { value: null };
		let e = Number(n);
		return Number.isFinite(e) ? { value: e } : { error: "field.number" };
	}
	return e.control === "url" && n.trim() !== "" && ba(n) === "" ? { error: "field.url" } : e.control === "select" && e.options && !e.options.includes(n) ? { error: "field.option" } : e.control === "select" && e.options?.every((e) => /^\d+$/.test(e)) ? { value: Number(n) } : { value: n };
}, Do = /* @__PURE__ */ q("<label class=\"svelte-1g42mo8\"><input type=\"checkbox\" class=\"svelte-1g42mo8\"/> </label>"), Oo = /* @__PURE__ */ q("<textarea rows=\"3\" class=\"svelte-1g42mo8\"></textarea>"), ko = /* @__PURE__ */ q("<option> </option>"), Ao = /* @__PURE__ */ q("<select class=\"svelte-1g42mo8\"></select>"), jo = /* @__PURE__ */ q("<input class=\"svelte-1g42mo8\"/>"), Mo = /* @__PURE__ */ q("<label class=\"svelte-1g42mo8\"> </label> <!>", 1), No = /* @__PURE__ */ q("<p class=\"error svelte-1g42mo8\" role=\"alert\"> </p>"), Po = /* @__PURE__ */ q("<div class=\"field svelte-1g42mo8\"><!> <!></div>"), Fo = {
	hash: "svelte-1g42mo8",
	code: ".field.svelte-1g42mo8 {display:grid;gap:.25rem;margin-bottom:.75rem;}label.svelte-1g42mo8 {font-size:.8rem;font-weight:600;}input.svelte-1g42mo8:not([type='checkbox']), textarea.svelte-1g42mo8, select.svelte-1g42mo8 {font:inherit;font-size:.875rem;padding:.35rem .5rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}[aria-invalid='true'].svelte-1g42mo8 {border-color:var(--cpb-danger);}input.svelte-1g42mo8:focus-visible, textarea.svelte-1g42mo8:focus-visible, select.svelte-1g42mo8:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}.error.svelte-1g42mo8 {color:var(--cpb-danger);font-size:.75rem;margin:0;}"
};
function Io(e, t) {
	A(t, !0), Z(e, Fo);
	let n = /* @__PURE__ */ F(null), r = /* @__PURE__ */ P(() => t.value === null || t.value === void 0 ? "" : String(t.value));
	function i(e) {
		let r = Eo(t.field, e);
		"error" in r ? I(n, t.t(r.error), !0) : (I(n, null), t.onChange(r.value));
	}
	var a = Po(), o = L(a), s = (e) => {
		var n = Do(), r = L(n);
		Q(r);
		var a = R(r);
		O(n), z(() => {
			$(r, "id", t.id), la(r, t.value === !0), Y(a, ` ${t.field.label ?? ""}`);
		}), K("change", r, (e) => i(e.currentTarget.checked)), J(e, n);
	}, c = (e) => {
		var a = Mo(), o = ur(a), s = L(o, !0);
		O(o);
		var c = R(o, 2), l = (e) => {
			var a = Oo();
			hr(a), z(() => {
				$(a, "id", t.id), ca(a, G(r)), $(a, "aria-invalid", G(n) !== null), $(a, "aria-describedby", G(n) ? `${t.id}-error` : void 0);
			}), K("input", a, (e) => i(e.currentTarget.value)), J(e, a);
		}, u = (e) => {
			var n = Ao();
			Hi(n, 20, () => t.field.options ?? [], (e) => e, (e, t) => {
				var n = ko(), r = L(n, !0);
				O(n);
				var i = {};
				z(() => {
					Y(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
				}), J(e, n);
			}), O(n);
			var a;
			ta(n), z(() => {
				$(n, "id", t.id), a !== (a = G(r)) && (n.value = (n.__value = G(r)) ?? "", ea(n, G(r)));
			}), K("change", n, (e) => i(e.currentTarget.value)), J(e, n);
		}, d = (e) => {
			var a = jo();
			Q(a), z(() => {
				$(a, "id", t.id), $(a, "type", t.field.control === "number" ? "number" : t.field.control === "url" ? "url" : "text"), ca(a, G(r)), $(a, "aria-invalid", G(n) !== null), $(a, "aria-describedby", G(n) ? `${t.id}-error` : void 0);
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
		var r = No(), i = L(r, !0);
		O(r), z(() => {
			$(r, "id", `${t.id}-error`), Y(i, G(n));
		}), J(e, r);
	};
	X(l, (e) => {
		G(n) && e(u);
	}), O(a), J(e, a), j();
}
Ci(["change", "input"]);
// src/ui/inspector/Inspector.svelte
var Lo = /* @__PURE__ */ q("<p class=\"hint svelte-2ghsnx\"> </p>"), Ro = /* @__PURE__ */ q("<p class=\"locked svelte-2ghsnx\" role=\"note\"> </p>"), zo = /* @__PURE__ */ q("<button type=\"button\" class=\"svelte-2ghsnx\"> </button>"), Bo = /* @__PURE__ */ q("<p class=\"type svelte-2ghsnx\"> </p> <div class=\"field svelte-2ghsnx\"><label class=\"svelte-2ghsnx\"> </label> <input type=\"text\" class=\"svelte-2ghsnx\"/></div> <!> <!> <div class=\"actions svelte-2ghsnx\"><button type=\"button\" class=\"svelte-2ghsnx\"> </button> <!> <button type=\"button\" class=\"danger svelte-2ghsnx\"> </button></div>", 1), Vo = /* @__PURE__ */ q("<section class=\"inspector svelte-2ghsnx\"><h2 class=\"svelte-2ghsnx\"> </h2> <!></section>"), Ho = {
	hash: "svelte-2ghsnx",
	code: ".inspector.svelte-2ghsnx {padding:.5rem .75rem;overflow:auto;border-left:1px solid var(--cpb-border);}h2.svelte-2ghsnx {font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin:0 0 .5rem;color:var(--cpb-muted);}.hint.svelte-2ghsnx, .locked.svelte-2ghsnx {font-size:.85rem;color:var(--cpb-muted);}.locked.svelte-2ghsnx {color:var(--cpb-danger);}.type.svelte-2ghsnx {font-weight:700;margin:0 0 .75rem;}.field.svelte-2ghsnx {display:grid;gap:.25rem;margin-bottom:.75rem;}label.svelte-2ghsnx {font-size:.8rem;font-weight:600;}input.svelte-2ghsnx {font:inherit;font-size:.875rem;padding:.35rem .5rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}.actions.svelte-2ghsnx {display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1rem;}button.svelte-2ghsnx {font:inherit;font-size:.8rem;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.danger.svelte-2ghsnx {color:var(--cpb-danger);}button.svelte-2ghsnx:focus-visible, input.svelte-2ghsnx:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Uo(e, t) {
	A(t, !0), Z(e, Ho);
	let n = va(t, "canTemplates", 3, !1), r = /* @__PURE__ */ P(() => t.store.t), i = /* @__PURE__ */ P(() => t.store.selection ? t.store.tree.nodes[t.store.selection] : void 0), a = /* @__PURE__ */ P(() => G(i) ? t.store.catalogue?.get(G(i).type) : void 0), o = /* @__PURE__ */ P(() => G(a) ? To(G(a)) : []), s = /* @__PURE__ */ P(() => {
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
	var d = Vo(), f = L(d), p = L(f, !0);
	O(f);
	var m = R(f, 2), h = (e) => {
		var t = Lo(), n = L(t, !0);
		O(t), z((e) => Y(n, e), [() => G(r)("inspector.none")]), J(e, t);
	}, g = (e) => {
		var d = Ai();
		Ri(ur(d), () => G(i).id, (e) => {
			var d = Bo(), f = ur(d), p = L(f, !0);
			O(f);
			var m = R(f, 2), h = L(m), g = L(h, !0);
			O(h);
			var _ = R(h, 2);
			Q(_), O(m);
			var v = R(m, 2), y = (e) => {
				var t = Ro(), n = L(t, !0);
				O(t), z((e) => Y(n, e), [() => G(r)("inspector.locked")]), J(e, t);
			}, b = (e) => {
				var n = Ai();
				Hi(ur(n), 17, () => G(o), (e) => e.key, (e, n) => {
					{
						let i = /* @__PURE__ */ P(() => `${t.uid}-prop-${G(n).key}`);
						Io(e, {
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
				xo(e, {
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
				var n = zo(), i = L(n, !0);
				O(n), z((e) => Y(i, e), [() => G(r)("inspector.saveTemplate")]), K("click", n, function(...e) {
					t.onSaveTemplate?.apply(this, e);
				}), J(e, n);
			};
			X(te, (e) => {
				n() && e(ne);
			});
			var re = R(te, 2), ie = L(re, !0);
			O(re), O(C), z((e, n, r) => {
				Y(p, G(a)?.label ?? G(i).type), $(h, "for", `${t.uid}-name`), Y(g, e), $(_, "id", `${t.uid}-name`), ca(_, typeof G(i).fields.label == "string" ? G(i).fields.label : ""), Y(ee, n), Y(ie, r);
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
Ci(["input", "click"]);
// src/ui/palette/Palette.svelte
var Wo = /* @__PURE__ */ q("<button type=\"button\" class=\"wide svelte-om8jxl\"> </button>"), Go = /* @__PURE__ */ q("<li><button type=\"button\" class=\"svelte-om8jxl\"> </button></li>"), Ko = /* @__PURE__ */ q("<h3 class=\"svelte-om8jxl\"> </h3> <ul class=\"svelte-om8jxl\"></ul>", 1), qo = /* @__PURE__ */ q("<li><button type=\"button\" class=\"svelte-om8jxl\"> </button></li>"), Jo = /* @__PURE__ */ q("<h3 class=\"svelte-om8jxl\"> </h3> <ul class=\"svelte-om8jxl\"></ul>", 1), Yo = /* @__PURE__ */ q("<section class=\"palette svelte-om8jxl\" aria-labelledby=\"cpb-palette-title\"><h2 id=\"cpb-palette-title\" class=\"svelte-om8jxl\"> </h2> <!> <!> <!></section>"), Xo = {
	hash: "svelte-om8jxl",
	code: ".palette.svelte-om8jxl {padding:.5rem .75rem;overflow:auto;}h2.svelte-om8jxl {font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin:0 0 .5rem;color:var(--cpb-muted);}h3.svelte-om8jxl {font-size:.75rem;margin:.5rem 0 .25rem;color:var(--cpb-muted);text-transform:capitalize;}ul.svelte-om8jxl {list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2, 1fr);gap:.25rem;}button.svelte-om8jxl {touch-action:none;width:100%;font:inherit;font-size:.8rem;padding:.35rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;text-align:left;}button.svelte-om8jxl:hover {border-color:var(--cpb-accent);}.wide.svelte-om8jxl {margin-bottom:.5rem;text-align:center;}button.svelte-om8jxl:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Zo(e, t) {
	A(t, !0), Z(e, Xo);
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
		let r = Ua(t.store.tree, n, t.store.selection, e.type);
		t.store.run({
			kind: "insert",
			...r,
			node: Va(n, e.type)
		}, ["announce.inserted", { label: e.label }]) && t.store.selection && t.onInserted(t.store.selection);
	}
	var o = Yo(), s = L(o), c = L(s, !0);
	O(s);
	var l = R(s, 2), u = (e) => {
		var r = Wo(), i = L(r, !0);
		O(r), z((e) => Y(i, e), [() => G(n)("palette.import")]), K("click", r, function(...e) {
			t.onImport?.apply(this, e);
		}), J(e, r);
	};
	X(l, (e) => {
		t.content.canImport && e(u);
	});
	var d = R(l, 2), f = (e) => {
		var r = Ko(), i = ur(r), a = L(i, !0);
		O(i);
		var o = R(i, 2);
		Hi(o, 21, () => t.content.templates, (e) => e.id, (e, r) => {
			var i = Go(), a = L(i), o = L(a, !0);
			O(a), O(i), z((e) => {
				$(a, "aria-label", e), Y(o, G(r).name);
			}, [() => G(n)("palette.insertTemplate", { name: G(r).name })]), K("click", a, () => {
				t.content.insertNodes(G(r).nodes, G(r).name) && t.store.selection && t.onInserted(t.store.selection);
			}), J(e, i);
		}), O(o), z((e) => Y(a, e), [() => G(n)("palette.templates")]), J(e, r);
	};
	X(d, (e) => {
		t.content.canTemplates && t.content.templates.length > 0 && e(f);
	}), Hi(R(d, 2), 17, () => G(i), ([e, t]) => e, (e, r) => {
		var i = /* @__PURE__ */ P(() => Xe(G(r), 2));
		let o = () => G(i)[0], s = () => G(i)[1];
		var c = Jo(), l = ur(c), u = L(l, !0);
		O(l);
		var d = R(l, 2);
		Hi(d, 21, s, (e) => e.type, (e, r) => {
			var i = qo(), o = L(i), s = L(o, !0);
			O(o), O(i), z((e) => {
				$(o, "aria-label", e), $(o, "data-type", G(r).type), Y(s, G(r).label);
			}, [() => G(n)("palette.insert", { label: G(r).label })]), K("click", o, () => a(G(r))), K("pointerdown", o, (e) => t.store.catalogue && t.drag.pressNew(e, {
				kind: "insert",
				node: Va(t.store.catalogue, G(r).type)
			}, G(r).label)), J(e, i);
		}), O(d), z((e) => Y(u, e), [() => o().replace(/_/g, " ")]), J(e, c);
	}), O(o), z((e) => Y(c, e), [() => G(n)("palette.title")]), J(e, o), j();
}
Ci(["click", "pointerdown"]);
// src/ui/publish/ConflictBanner.svelte
var Qo = /* @__PURE__ */ q("<button type=\"button\" class=\"svelte-1ti6kqq\"> </button>"), $o = /* @__PURE__ */ q("<div class=\"conflict svelte-1ti6kqq\" role=\"alertdialog\" aria-modal=\"false\" tabindex=\"-1\"><strong> </strong> <p class=\"svelte-1ti6kqq\"> </p> <div class=\"actions svelte-1ti6kqq\"><button type=\"button\" class=\"primary svelte-1ti6kqq\"> </button> <button type=\"button\" class=\"svelte-1ti6kqq\"> </button> <!></div></div>"), es = {
	hash: "svelte-1ti6kqq",
	code: ".conflict.svelte-1ti6kqq {margin:.5rem .75rem 0;padding:.75rem;border:2px solid var(--cpb-danger);border-radius:8px;background:#fef2f2;}.conflict.svelte-1ti6kqq:focus-visible {outline:2px solid var(--cpb-danger);outline-offset:2px;}p.svelte-1ti6kqq {margin:.25rem 0 .5rem;font-size:.875rem;}.actions.svelte-1ti6kqq {display:flex;flex-wrap:wrap;gap:.5rem;}button.svelte-1ti6kqq {font:inherit;font-size:.85rem;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.primary.svelte-1ti6kqq {background:var(--cpb-danger);border-color:var(--cpb-danger);color:#fff;}button.svelte-1ti6kqq:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:2px;}"
};
function ts(e, t) {
	A(t, !0), Z(e, es);
	let n = /* @__PURE__ */ P(() => t.store.t), r = /* @__PURE__ */ F(void 0);
	Tr(() => {
		t.store.status === "conflict" && di().then(() => G(r)?.focus());
	});
	var i = Ai(), a = ur(i), o = (e) => {
		var i = $o(), a = L(i), o = L(a, !0);
		O(a);
		var s = R(a, 2), c = L(s, !0);
		O(s);
		var l = R(s, 2), u = L(l), d = L(u, !0);
		O(u);
		var f = R(u, 2), p = L(f, !0);
		O(f);
		var m = R(f, 2), h = (e) => {
			var r = Qo(), i = L(r, !0);
			O(r), z((e) => Y(i, e), [() => G(n)("conflict.view")]), K("click", r, () => t.onView?.(t.store.conflictRevision)), J(e, r);
		};
		X(m, (e) => {
			t.onView && t.store.conflictRevision && e(h);
		}), O(l), O(i), _a(i, (e) => I(r, e), () => G(r)), z((e, n, r, l) => {
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
Ci(["click"]);
// src/ui/publish/ServerView.svelte
var ns = /* @__PURE__ */ q("<p class=\"note svelte-ztrun4\"> </p>"), rs = /* @__PURE__ */ q("<p class=\"note svelte-ztrun4\" role=\"status\"> </p>"), is = /* @__PURE__ */ q("<iframe sandbox=\"\" class=\"svelte-ztrun4\"></iframe>"), as = /* @__PURE__ */ q("<div class=\"server svelte-ztrun4\"><div class=\"bar svelte-ztrun4\"><strong> </strong> <button type=\"button\" class=\"svelte-ztrun4\"> </button></div> <!> <!></div>"), os = {
	hash: "svelte-ztrun4",
	code: ".server.svelte-ztrun4 {background:var(--cpb-canvas);padding:.5rem 1rem 1rem;min-height:0;display:flex;flex-direction:column;gap:.5rem;}.bar.svelte-ztrun4 {display:flex;align-items:center;gap:.75rem;}.note.svelte-ztrun4 {margin:0;font-size:.8rem;color:var(--cpb-muted);}button.svelte-ztrun4 {margin-left:auto;font:inherit;font-size:.8rem;padding:.3rem .7rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}iframe.svelte-ztrun4 {flex:1;width:100%;min-height:480px;border:1px solid var(--cpb-border);border-radius:8px;background:#fff;}"
};
function ss(e, t) {
	A(t, !0), Z(e, os);
	let n = va(t, "stylesheets", 19, () => []), r = /* @__PURE__ */ P(() => t.store.t), i = /* @__PURE__ */ F(null);
	Tr(() => {
		let e = t.store.session.transport.render, n = t.revision;
		I(i, null), e && e.call(t.store.session.transport, t.store.session.pageId, n).then((e) => {
			n === t.revision && I(i, e, !0);
		}).catch((e) => t.store.fail(e));
	});
	let a = /* @__PURE__ */ P(() => G(i) === null ? "" : Ea(n()).replace("</head>", `<style data-cms-page>${G(i).css.replace(/<\/style/gi, "<\\/style")}</style></head>`).replace("<body></body>", `<body>${G(i).html}</body>`));
	var o = as(), s = L(o), c = L(s), l = L(c, !0);
	O(c);
	var u = R(c, 2), d = L(u, !0);
	O(u), O(s);
	var f = R(s, 2), p = (e) => {
		var t = ns(), n = L(t, !0);
		O(t), z((e) => Y(n, e), [() => G(r)("server.dirty")]), J(e, t);
	};
	X(f, (e) => {
		t.store.dirty && e(p);
	});
	var m = R(f, 2), h = (e) => {
		var t = rs(), n = L(t, !0);
		O(t), z((e) => Y(n, e), [() => G(r)("server.loading")]), J(e, t);
	}, g = (e) => {
		var t = is();
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
Ci(["click"]);
// src/ui/model/flatten.ts
var cs = (e) => {
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
}, ls = (e) => {
	if (!(e.ctrlKey || e.metaKey) || e.altKey) return null;
	let t = e.key.toLowerCase();
	return t === "z" ? e.shiftKey ? { type: "redo" } : { type: "undo" } : t === "y" ? { type: "redo" } : null;
}, us = (e, t, n) => {
	let r = cs(e), i = r[0];
	if (!i) return null;
	let a = t === null ? -1 : r.findIndex((e) => e.id === t), o = r[a];
	if (!o) return n.key === "ArrowDown" || n.key === "Home" ? {
		type: "select",
		id: i.id
	} : null;
	let s = e.nodes[o.id], c = ce(e, o.parent), l = n.ctrlKey || n.metaKey;
	if (n.altKey && !l) switch (n.key) {
		case "ArrowUp": return o.index > 0 ? ds(o.id, o.parent, o.index - 1) : null;
		case "ArrowDown": return o.index < c.length - 1 ? ds(o.id, o.parent, o.index + 2) : null;
		case "ArrowRight": {
			let t = c[o.index - 1];
			return t ? ds(o.id, t, e.nodes[t]?.children.length ?? 0) : null;
		}
		case "ArrowLeft": {
			if (o.parent === null) return null;
			let t = e.nodes[o.parent], n = ce(e, t?.parent ?? null);
			return ds(o.id, t?.parent ?? null, n.indexOf(o.parent) + 1);
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
	if (l || n.altKey) return ls(n);
	switch (n.key) {
		case "ArrowDown": return fs(r[a + 1]?.id);
		case "ArrowUp": return fs(r[a - 1]?.id);
		case "Home": return fs(i.id);
		case "End": return fs(r[r.length - 1]?.id);
		case "ArrowRight": return fs(s?.children[0]);
		case "ArrowLeft": return fs(o.parent ?? void 0);
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
}, ds = (e, t, n) => ({
	type: "command",
	command: {
		kind: "move",
		id: e,
		parent: t,
		index: n
	}
}), fs = (e) => e ? {
	type: "select",
	id: e
} : null, ps = /* @__PURE__ */ q("<p class=\"empty svelte-y2i8n1\"> </p>"), ms = /* @__PURE__ */ q("<li role=\"treeitem\" class=\"svelte-y2i8n1\"> </li>"), hs = /* @__PURE__ */ q("<ul role=\"tree\" aria-labelledby=\"cpb-structure-title\" aria-describedby=\"cpb-structure-help\" class=\"svelte-y2i8n1\"></ul>"), gs = /* @__PURE__ */ q("<section class=\"structure svelte-y2i8n1\" aria-labelledby=\"cpb-structure-title\"><h2 id=\"cpb-structure-title\" class=\"svelte-y2i8n1\"> </h2> <p class=\"help svelte-y2i8n1\" id=\"cpb-structure-help\"> </p> <!></section>"), _s = {
	hash: "svelte-y2i8n1",
	code: ".structure.svelte-y2i8n1 {padding:.5rem .75rem;overflow:auto;border-top:1px solid var(--cpb-border);}h2.svelte-y2i8n1 {font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin:0;color:var(--cpb-muted);}.help.svelte-y2i8n1, .empty.svelte-y2i8n1 {font-size:.75rem;color:var(--cpb-muted);margin:.25rem 0 .5rem;}ul.svelte-y2i8n1 {list-style:none;margin:0;padding:0;outline:none;}li.svelte-y2i8n1 {font-size:.85rem;padding:.25rem .375rem;border-radius:4px;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}li[aria-selected='true'].svelte-y2i8n1 {background:var(--cpb-accent-soft);color:var(--cpb-accent-strong);font-weight:600;}li.svelte-y2i8n1:focus-visible, ul.svelte-y2i8n1:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:-2px;}"
};
function vs(e, t) {
	A(t, !0), Z(e, _s);
	let n = /* @__PURE__ */ P(() => t.store.t), r = /* @__PURE__ */ P(() => cs(t.store.tree)), i = /* @__PURE__ */ F(void 0), a = (e) => {
		let n = t.store.tree.nodes[e];
		if (!n) return e;
		let r = typeof n.fields.label == "string" && n.fields.label !== "" ? n.fields.label : null, i = t.store.catalogue?.get(n.type);
		return r ? `${r} (${i?.label ?? n.type})` : i?.label ?? n.type;
	};
	async function o(e) {
		await di(), ((e ? G(i)?.querySelector(`[data-node-id="${CSS.escape(e)}"]`) : null) ?? G(i))?.focus();
	}
	async function s(e) {
		if ((e.key === "F2" || e.key === "Enter") && t.store.selection && !e.altKey) {
			t.onEdit(t.store.selection) && e.preventDefault();
			return;
		}
		let n = us(t.store.tree, t.store.selection, e);
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
	var c = { focusItem: o }, l = gs(), u = L(l), d = L(u, !0);
	O(u);
	var f = R(u, 2), p = L(f, !0);
	O(f);
	var m = R(f, 2), h = (e) => {
		var t = ps(), r = L(t, !0);
		O(t), z((e) => Y(r, e), [() => G(n)("structure.empty")]), J(e, t);
	}, g = (e) => {
		var n = hs();
		Hi(n, 21, () => G(r), (e) => e.id, (e, n) => {
			var r = ms();
			let i;
			var o = L(r, !0);
			O(r), z((e) => {
				$(r, "aria-level", G(n).depth), $(r, "aria-setsize", G(n).siblings), $(r, "aria-posinset", G(n).index + 1), $(r, "aria-selected", t.store.selection === G(n).id), $(r, "tabindex", t.store.selection === G(n).id ? 0 : -1), $(r, "data-node-id", G(n).id), i = $i(r, "", i, { "padding-left": `${(G(n).depth - 1) * 14 + 6}px` }), Y(o, e);
			}, [() => a(G(n).id)]), K("click", r, () => t.store.select(G(n).id)), Si("focus", r, () => t.store.selection !== G(n).id && t.store.select(G(n).id)), K("keydown", r, () => {}), J(e, r);
		}), O(n), _a(n, (e) => I(i, e), () => G(i)), z(() => $(n, "tabindex", t.store.selection ? -1 : 0)), K("keydown", n, s), J(e, n);
	};
	return X(m, (e) => {
		G(r).length === 0 ? e(h) : e(g, -1);
	}), O(l), z((e, t) => {
		Y(d, e), Y(p, t);
	}, [() => G(n)("structure.title"), () => G(n)("structure.help")]), J(e, l), j(c);
}
Ci(["keydown", "click"]);
// src/ui/toolbar/Toolbar.svelte
var ys = /* @__PURE__ */ q("<button type=\"button\" class=\"primary svelte-ouhh5d\"> </button>"), bs = /* @__PURE__ */ q("<button type=\"button\" class=\"svelte-ouhh5d\"> </button>"), xs = /* @__PURE__ */ q("<span class=\"revision svelte-ouhh5d\"> <span data-publication=\"\"> </span></span>"), Ss = /* @__PURE__ */ q("<div class=\"toolbar svelte-ouhh5d\" role=\"toolbar\"><button type=\"button\" aria-keyshortcuts=\"Control+Z\" class=\"svelte-ouhh5d\"> </button> <button type=\"button\" aria-keyshortcuts=\"Control+Shift+Z\" class=\"svelte-ouhh5d\"> </button> <button type=\"button\" aria-keyshortcuts=\"Control+S\" class=\"svelte-ouhh5d\"> </button> <!> <!> <span class=\"status svelte-ouhh5d\"> </span> <!></div>"), Cs = {
	hash: "svelte-ouhh5d",
	code: ".toolbar.svelte-ouhh5d {display:flex;flex-wrap:wrap;gap:.5rem;align-items:center;padding:.5rem .75rem;border-bottom:1px solid var(--cpb-border);}button.svelte-ouhh5d {font:inherit;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.svelte-ouhh5d:disabled {opacity:.5;cursor:not-allowed;}button.primary.svelte-ouhh5d {background:var(--cpb-accent);border-color:var(--cpb-accent);color:#fff;}button[aria-pressed='true'].svelte-ouhh5d {background:var(--cpb-accent-soft);border-color:var(--cpb-accent);}button.svelte-ouhh5d:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:2px;}.status.svelte-ouhh5d {margin-left:auto;font-size:.875rem;}.status[data-status='conflict'].svelte-ouhh5d, .status[data-status='offline'].svelte-ouhh5d, .status[data-status='load-error'].svelte-ouhh5d {color:var(--cpb-danger);font-weight:600;}.revision.svelte-ouhh5d {font-size:.75rem;color:var(--cpb-muted);}"
};
function ws(e, t) {
	A(t, !0), Z(e, Cs);
	let n = /* @__PURE__ */ P(() => t.store.t), r = /* @__PURE__ */ P(() => t.store.publishedRevision === null ? G(n)("publication.none") : t.store.unpublished ? G(n)("publication.pending", { revision: t.store.publishedRevision }) : G(n)("publication.current"));
	var i = Ss(), a = L(i), o = L(a, !0);
	O(a);
	var s = R(a, 2), c = L(s, !0);
	O(s);
	var l = R(s, 2), u = L(l, !0);
	O(l);
	var d = R(l, 2), f = (e) => {
		var r = ys(), i = L(r, !0);
		O(r), z((e) => {
			r.disabled = t.store.publishing || t.store.status !== "ready" || !t.store.unpublished, Y(i, e);
		}, [() => t.store.publishing ? G(n)("toolbar.publishing") : G(n)("toolbar.publish")]), K("click", r, () => t.store.publish()), J(e, r);
	};
	X(d, (e) => {
		t.store.canPublish && e(f);
	});
	var p = R(d, 2), m = (e) => {
		var r = bs(), i = L(r, !0);
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
		var i = xs(), a = L(i), o = R(a), s = L(o, !0);
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
Ci(["click"]);
// src/ui/Editor.svelte
var Ts = /* @__PURE__ */ q("<div class=\"editor svelte-b7je3p\" role=\"application\"><!> <!> <div class=\"body svelte-b7je3p\"><aside class=\"left svelte-b7je3p\"><!> <!></aside> <!> <!></div> <!> <!> <div class=\"sr-only svelte-b7je3p\" aria-live=\"polite\"> </div> <div class=\"sr-only svelte-b7je3p\" aria-live=\"assertive\" role=\"alert\"> </div></div>"), Es = {
	hash: "svelte-b7je3p",
	code: ".editor.svelte-b7je3p {--cpb-border: #d4d4d8;--cpb-surface: #fff;--cpb-canvas: #f1f5f9;--cpb-muted: #52525b;--cpb-accent: #2563eb;--cpb-accent-soft: #dbeafe;--cpb-accent-strong: #1e3a8a;--cpb-danger: #b91c1c;font:14px/1.4 system-ui, sans-serif;color:#18181b;background:var(--cpb-surface);display:flex;flex-direction:column;height:100%;min-height:600px;border:1px solid var(--cpb-border);}.body.svelte-b7je3p {flex:1;display:grid;grid-template-columns:240px 1fr 280px;min-height:0;}.left.svelte-b7je3p {display:grid;grid-template-rows:minmax(0, 45%) minmax(0, 1fr);min-height:0;border-right:1px solid var(--cpb-border);}.sr-only.svelte-b7je3p {position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;}\n  @media (max-width: 900px) {.body.svelte-b7je3p {grid-template-columns:1fr;} }"
};
function Ds(e, t) {
	A(t, !0), Z(e, Es);
	let n = va(t, "stylesheets", 19, () => []), r = /* @__PURE__ */ F(void 0), i = /* @__PURE__ */ F(void 0), a = /* @__PURE__ */ P(() => new lo(t.store)), o = /* @__PURE__ */ P(() => new Ga(t.store)), s = /* @__PURE__ */ F(!1), c = /* @__PURE__ */ F(!1), l = !1;
	Tr(() => {
		t.store.status === "ready" && !l && (l = !0, G(o).loadTemplates());
	});
	let u = /* @__PURE__ */ F(null), d = /* @__PURE__ */ P(() => typeof t.store.session.transport.render == "function");
	function f(e) {
		if ((e.ctrlKey || e.metaKey) && !e.altKey && e.key.toLowerCase() === "s") {
			e.preventDefault(), t.store.dirty && t.store.save();
			return;
		}
		if (e.target?.closest("input, textarea, select, [contenteditable=\"true\"], [role=\"tree\"]")) return;
		let n = ls(e);
		n && (e.preventDefault(), n.type === "undo" ? t.store.undo() : n.type === "redo" && t.store.redo());
	}
	var p = Ts(), m = L(p);
	{
		let e = /* @__PURE__ */ P(() => G(u) !== null), n = /* @__PURE__ */ P(() => G(d) ? () => {
			I(u, G(u) === null ? t.store.revision : null, !0);
		} : null);
		ws(m, {
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
		ts(h, {
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
	Zo(v, {
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
	}), _a(vs(R(v, 2), {
		get store() {
			return t.store;
		},
		onEdit: (e) => G(i)?.startEditing(e) ?? !1
	}), (e) => I(r, e, !0), () => G(r)), O(_);
	var y = R(_, 2), b = (e) => {
		ss(e, {
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
		_a(Ba(e, {
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
	}), Uo(R(y, 2), {
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
	Za(S, {
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
	eo(C, {
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
Ci(["keydown"]);
// src/ui/i18n/en.ts
var Os = {
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
}, ks = {
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
}, As = {
	es: ks,
	en: Os
}, js = (e) => {
	let t = As[e.toLowerCase().split("-")[0] ?? "es"] ?? ks;
	return (e, n = {}) => t[e].replace(/\{(\w+)\}/g, (e, t) => String(n[t] ?? `{${t}}`));
}, Ms = class {
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
	fail(e, t = e instanceof xe ? e.code : "SERVER") {
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
}, Ns = [
	"ready",
	"selection-change",
	"dirty-change",
	"save-start",
	"save-success",
	"save-error",
	"conflict",
	"publish-success",
	"publish-error"
], Ps = 0, Fs = class extends HTMLElement {
	#e = null;
	#t = null;
	#n = null;
	#r = null;
	#i = null;
	#a = `cpb${++Ps}`;
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
		let t = this.shadowRoot ?? this.attachShadow({ mode: "open" }), n = new ue(e);
		for (let e of Ns) n.events.on(e, (t) => {
			let n = e === "save-error" || e === "publish-error" ? { code: t.error.code } : t;
			this.dispatchEvent(new CustomEvent(e, {
				detail: n,
				bubbles: !0,
				composed: !0
			}));
		});
		let r = new Ms(n, js(e.locale ?? "es"));
		this.#n = n, this.#r = r, this.#t = ji(Ds, {
			target: t,
			props: {
				store: r,
				uid: this.#a,
				stylesheets: e.stylesheets ?? []
			}
		}), n.load().then(() => {
			r.sync(), e.autosave !== !1 && n.capabilities?.features.autosave !== !1 && (this.#i = new se(n, {
				...le,
				...e.autosave ?? {}
			}), this.#i.start());
		}, (e) => {
			r.sync(), r.fail(e);
		});
	}
	#s() {
		this.#i?.stop(), this.#i = null, this.#t && Fi(this.#t), this.#r?.destroy(), this.#n?.destroy(), this.#t = null, this.#r = null, this.#n = null, this.shadowRoot?.replaceChildren();
	}
}, Is = (e = "ceiba-page-builder") => {
	customElements.get(e) || customElements.define(e, Fs);
};
// src/ui/index.ts
Is();
export { se as Autosave, Fs as CeibaPageBuilder, le as DEFAULT_AUTOSAVE, Ae as DEFAULT_BREAKPOINTS, p as DEFAULT_HISTORY, Ne as EDITABLE_FIELDS, xe as EditorError, ue as EditorSession, oe as PROPERTY_BY_NAME, Ns as PUBLIC_EVENTS, y as REFERENCE_PROPS, x as SCHEMA_VERSION, r as SERVER_LIMITS, ge as STYLE_MATRIX, m as afterRedo, g as afterUndo, ae as applyCommand, Me as assertDepth, i as assertEditable, h as assertKnown, he as assertNewContent, b as assertNodeCount, t as assertPlacement, a as assertSize, C as attachRaw, o as canRedo, l as canUndo, de as checkTree, ce as childrenOf, ve as collectStyledNodes, fe as compileStyles, me as createCatalogue, Pe as createCommands, Oe as createEditor, Se as createHttpTransport, Is as defineElement, Ce as depthOf, f as emptyHistory, ke as emptyTree, _e as errorFromResponse, De as fail, n as fromDocument, u as getNode, Fe as groupKeyOf, ee as heightOf, w as indexInParent, ye as insertAt, te as isSelfOrDescendant, s as measureRaw, re as nodeClass, _ as nodeCount, S as parseDocument, ne as randomIds, v as record, je as sequentialIds, be as siteClass, we as styleClassNames, e as subtreeIds, c as toDocument, d as toRaw, Ee as tokenVariable, Te as withChildren, pe as withNode, ie as withoutNodes };

//# sourceMappingURL=ceiba-page-builder.js.map