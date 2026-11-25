import { $ as e, A as t, B as n, C as r, Ct as i, D as a, Dt as o, E as s, Et as c, F as l, G as u, H as d, I as f, J as p, K as m, L as h, M as g, N as _, O as v, Ot as y, P as b, Q as x, R as S, S as C, St as w, T as ee, Tt as T, U as te, V as E, W as ne, X as re, Y as ie, Z as ae, _ as oe, _t as se, a as ce, at as le, b as ue, bt as de, c as fe, ct as pe, d as me, dt as he, et as ge, f as _e, ft as ve, g as ye, gt as be, h as xe, ht as Se, i as Ce, it as we, j as Te, k as Ee, kt as De, l as Oe, lt as ke, m as Ae, mt as je, n as Me, nt as Ne, o as Pe, ot as Fe, p as Ie, pt as Le, q as Re, r as ze, rt as Be, s as Ve, st as He, t as Ue, tt as We, u as Ge, ut as Ke, v as qe, vt as Je, w as Ye, wt as Xe, x as Ze, xt as Qe, y as $e, yt as et, z as tt } from "./shared/core.js";
// node_modules/svelte/src/internal/shared/utils.js
var nt = Array.isArray, rt = Array.prototype.indexOf, it = Array.prototype.includes, at = Array.from, ot = Object.defineProperty, st = Object.getOwnPropertyDescriptor, ct = Object.getOwnPropertyDescriptors, lt = Object.prototype, ut = Array.prototype, dt = Object.getPrototypeOf, ft = Object.isExtensible, pt = () => {};
function mt(e) {
	for (var t = 0; t < e.length; t++) e[t]();
}
function ht() {
	var e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
function gt(e, t) {
	if (Array.isArray(e)) return e;
	if (t === void 0 || !(Symbol.iterator in e)) return Array.from(e);
	let n = [];
	for (let r of e) if (n.push(r), n.length === t) break;
	return n;
}
var _t = 1024, vt = 2048, yt = 4096, bt = 8192, xt = 16384, St = 32768, Ct = 1 << 25, wt = 65536, Tt = 1 << 19, Et = 1 << 20, Dt = 1 << 25, Ot = 65536, kt = 1 << 21, At = 1 << 22, jt = 1 << 23, Mt = Symbol("$state"), Nt = Symbol("legacy props"), Pt = Symbol(""), Ft = Symbol("attributes"), It = Symbol("class"), Lt = Symbol("style"), Rt = Symbol("text"), zt = Symbol("form reset"), Bt = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), Vt = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
// node_modules/svelte/src/internal/client/errors.js
function Ht() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function Ut(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function Wt(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function Gt() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Kt(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function qt() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Jt(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function Yt() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Xt() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function Zt() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Qt() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
// node_modules/svelte/src/constants.js
var $t = {}, en = Symbol("uninitialized"), tn = "http://www.w3.org/1999/xhtml";
function nn() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function rn(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function an() {
	console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function on() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
// node_modules/svelte/src/internal/client/dom/hydration.js
var D = !1;
function sn(e) {
	D = e;
}
var O;
function cn(e) {
	if (e === null) throw rn(), $t;
	return O = e;
}
function ln() {
	return cn(/* @__PURE__ */ Mr(O));
}
function k(e) {
	if (D) {
		if (/* @__PURE__ */ Mr(O) !== null) throw rn(), $t;
		O = e;
	}
}
function un(e = 1) {
	if (D) {
		for (var t = e, n = O; t--;) n = /* @__PURE__ */ Mr(n);
		O = n;
	}
}
function dn(e = !0) {
	for (var t = 0, n = O;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ Mr(n);
		e && n.remove(), n = i;
	}
}
function fn(e) {
	if (!e || e.nodeType !== 8) throw rn(), $t;
	return e.data;
}
// node_modules/svelte/src/internal/client/reactivity/equality.js
function pn(e) {
	return e === this.v;
}
function mn(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function hn(e) {
	return !mn(e, this.v);
}
// node_modules/svelte/src/internal/client/context.js
var gn = null;
function _n(e) {
	gn = e;
}
function A(e, t = !1, n) {
	gn = {
		p: gn,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: V,
		l: null
	};
}
function j(e) {
	var t = gn, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) Jr(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, gn = t.p, e ?? {};
}
function vn() {
	return !0;
}
// node_modules/svelte/src/internal/client/dom/task.js
var yn = [];
function bn() {
	var e = yn;
	yn = [], mt(e);
}
function xn(e) {
	if (yn.length === 0 && !In) {
		var t = yn;
		queueMicrotask(() => {
			t === yn && bn();
		});
	}
	yn.push(e);
}
function Sn() {
	for (; yn.length > 0;) bn();
}
function Cn(e) {
	var t = V;
	if (t === null) return B.f |= jt, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	wn(e, t);
}
function wn(e, t) {
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
var Tn = ~(vt | yt | _t);
function En(e, t) {
	e.f = e.f & Tn | t;
}
function Dn(e) {
	e.f & 512 || e.deps === null ? En(e, _t) : En(e, yt);
}
// node_modules/svelte/src/internal/client/reactivity/utils.js
function On(e) {
	if (e !== null) for (let t of e) t.f & 2 && t.f & 65536 && (t.f ^= Ot, On(t.deps));
}
function kn(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), On(e.deps), En(e, _t);
}
// node_modules/svelte/src/internal/client/reactivity/store.js
var An = !1;
function jn(e) {
	var t = An;
	try {
		return An = !1, [e(), An];
	} finally {
		An = t;
	}
}
// node_modules/svelte/src/internal/client/reactivity/batch.js
var Mn = null, M = null, Nn = null, Pn = null, Fn = null, In = !1, Ln = !1, Rn = null, zn = null, Bn = 0, Vn = 1, Hn = class e {
	id = Vn++;
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
			for (var r of n.d) En(r, vt), t(r);
			for (r of n.m) En(r, yt), t(r);
		}
		this.#m.add(e);
	}
	#_() {
		if (this.#e = !0, Bn++ > 1e3 && (this.#C(), Wn()), !this.#g()) {
			for (let e of this.#d) this.#f.delete(e), En(e, vt), this.schedule(e);
			for (let e of this.#f) En(e, yt), this.schedule(e);
		}
		let t = this.#l;
		this.#l = [], this.apply();
		var n = Rn = [], r = [], i = zn = [];
		for (let e of t) try {
			this.#v(e, n, r);
		} catch (t) {
			throw Yn(e), t;
		}
		if (M = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (Rn = null, zn = null, this.#g()) {
			this.#x(r), this.#x(n);
			for (let [e, t] of this.#p) Jn(e, t);
			i.length > 0 && M.#_();
			return;
		}
		let o = this.#y();
		if (o) o.#b(this);
		else {
			this.#d.clear(), this.#f.clear();
			for (let e of this.#r) e(this);
			this.#r.clear(), Nn = this, Kn(r), Kn(n), Nn = null, this.#c?.resolve();
			var s = M;
			if (this.linked && this.#o === 0 && this.#C(), this.#l.length > 0) {
				s === null && (s = this, this.#S());
				let e = s;
				e.#l.push(...this.#l.filter((t) => !e.#l.includes(t)));
			}
			s !== null && s.#_();
		}
	}
	#v(e, t, n) {
		e.f ^= _t;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#p.has(r)) && r.fn !== null) {
				a ? r.f ^= _t : i & 4 ? t.push(r) : Ai(r) && (i & 16 && this.#f.add(r), Fi(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#f.delete(i), En(i, vt), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#C(), M = this, this.#_();
	}
	#x(e) {
		for (var t = 0; t < e.length; t += 1) kn(e[t], this.#d, this.#f);
	}
	capture(e, t, n = !1) {
		e.v !== en && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), Pn?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		M = this;
	}
	deactivate() {
		M = null, Pn = null;
	}
	flush() {
		try {
			Ln = !0, M = this, this.#_();
		} finally {
			Bn = 0, Fn = null, Rn = null, zn = null, Ln = !1, M = null, Pn = null, mr.clear();
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
		this.#h || (this.#h = !0, xn(() => {
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
		return (this.#c ??= ht()).promise;
	}
	static ensure() {
		if (M === null) {
			let t = M = new e();
			t.#S(), !Ln && !In && xn(() => {
				t.#e || t.flush();
			});
		}
		return M;
	}
	apply() {
		Pn = null;
	}
	schedule(e) {
		if (Fn = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) e.b.defer_effect(e);
		else {
			for (var t = e; t.parent !== null;) {
				t = t.parent;
				var n = t.f;
				if (Rn !== null && t === V && (B === null || !(B.f & 2))) return;
				if (n & 96) {
					if (!(n & 1024)) return;
					t.f ^= _t;
				}
			}
			this.#l.push(t);
		}
	}
	#S() {
		Mn === null ? Mn = this : (Mn.#n = this, this.#t = Mn), Mn = this;
	}
	#C() {
		var e = this.#t, t = this.#n;
		e === null || (e.#n = t), t === null ? Mn = e : t.#t = e, this.linked = !1;
	}
};
function Un(e) {
	var t = In;
	In = !0;
	try {
		var n;
		for (e && (M !== null && !M.is_fork && M.flush(), n = e());;) {
			if (Sn(), M === null) return n;
			M.flush();
		}
	} finally {
		In = t;
	}
}
function Wn() {
	try {
		qt();
	} catch (e) {
		wn(e, Fn);
	}
}
var Gn = null;
function Kn(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && Ai(r) && (Gn = /* @__PURE__ */ new Set(), Fi(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && oi(r), Gn?.size > 0)) {
				mr.clear();
				for (let e of Gn) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Gn.has(n) && (Gn.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || Fi(n);
					}
				}
				Gn.clear();
			}
		}
		Gn = null;
	}
}
function qn(e) {
	M.schedule(e);
}
function Jn(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), En(e, _t);
		for (var n = e.first; n !== null;) Jn(n, t), n = n.next;
	}
}
function Yn(e) {
	En(e, _t);
	for (var t = e.first; t !== null;) Yn(t), t = t.next;
}
// node_modules/svelte/src/reactivity/create-subscriber.js
function Xn(e) {
	let t = 0, n = gr(0), r;
	return () => {
		Gr() && (H(n), Qr(() => (t === 0 && (r = zi(() => e(() => br(n)))), t += 1, () => {
			xn(() => {
				--t, t === 0 && (r?.(), r = void 0, br(n));
			});
		})));
	};
}
// node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var Zn = wt | Tt;
function Qn(e, t, n, r) {
	new $n(e, t, n, r);
}
var $n = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = D ? O : null;
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
	#h = Xn(() => (this.#m = gr(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = V;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = V.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = $r(() => {
			if (D) {
				let e = this.#t;
				ln();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, Zn), D && (this.#e = O);
	}
	#g() {
		try {
			this.#a = ei(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed;
		t && (this.#s = ei(() => {
			t(this.#e, () => e, () => () => {});
		}));
	}
	#v() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = ei(() => e(this.#e)), xn(() => {
			var e = this.#c = document.createDocumentFragment(), t = Ar();
			e.append(t), this.#a = this.#x(() => ei(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, si(this.#o, () => {
				this.#o = null;
			}), this.#b(M));
		}));
	}
	#y() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = ei(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				di(this.#a, e);
				let t = this.#n.pending;
				this.#o = ei(() => t(this.#e));
			} else this.#b(M);
		} catch (e) {
			this.error(e);
		}
	}
	#b(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		kn(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#x(e) {
		var t = V, n = B, r = gn;
		vi(this.#i), _i(this.#i), _n(this.#i.ctx);
		try {
			return Hn.ensure(), e();
		} catch (e) {
			return Cn(e), null;
		} finally {
			vi(t), _i(n), _n(r);
		}
	}
	#S(e, t) {
		this.has_pending_snippet() ? (this.#u += e, this.#u === 0 && (this.#b(t), this.#o && si(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null))) : this.parent && this.parent.#S(e, t);
	}
	update_pending_count(e, t) {
		this.#S(e, t), this.#l += e, !this.#m || this.#d || (this.#d = !0, xn(() => {
			this.#d = !1, this.#m && vr(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), H(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		M?.is_fork ? (this.#a && M.skip_effect(this.#a), this.#o && M.skip_effect(this.#o), this.#s && M.skip_effect(this.#s), M.on_fork_commit(() => {
			this.#C(e);
		})) : this.#C(e);
	}
	#C(e) {
		this.#a &&= (ii(this.#a), null), this.#o &&= (ii(this.#o), null), this.#s &&= (ii(this.#s), null), D && (cn(this.#t), un(), cn(dn()));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var r = !1, i = !1;
		let a = () => {
			r ? on() : (r = !0, i && Qt(), this.#s !== null && si(this.#s, () => {
				this.#s = null;
			}), this.#x(() => {
				this.#y();
			}));
		}, o = (e) => {
			try {
				i = !0, t?.(e, a), i = !1;
			} catch (e) {
				wn(e, this.#i && this.#i.parent);
			}
			n && (this.#s = this.#x(() => {
				try {
					return ei(() => {
						var t = V;
						t.b = this, t.f |= 128, n(this.#e, () => e, () => a);
					});
				} catch (e) {
					return wn(e, this.#i.parent), null;
				}
			}));
		};
		xn(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				wn(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(o, (e) => wn(e, this.#i && this.#i.parent)) : o(t);
		});
	}
};
// node_modules/svelte/src/internal/client/reactivity/async.js
function er(e, t, n, r) {
	let i = vn() ? ir : sr;
	var a = e.filter((e) => !e.settled);
	if (n.length === 0 && a.length === 0) {
		r(t.map(i));
		return;
	}
	var o = V, s = tr(), c = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function l(e) {
		if (!(o.f & 16384)) {
			s();
			try {
				r(e);
			} catch (e) {
				wn(e, o);
			}
			nr();
		}
	}
	var u = rr();
	if (n.length === 0) {
		c.then(() => l(t.map(i))).finally(u);
		return;
	}
	function d() {
		Promise.all(n.map((e) => /* @__PURE__ */ or(e))).then((e) => l([...t.map(i), ...e])).catch((e) => wn(e, o)).finally(u);
	}
	c ? c.then(() => {
		s(), d(), nr();
	}) : d();
}
function tr() {
	var e = V, t = B, n = gn, r = M;
	return function(i = !0) {
		vi(e), _i(t), _n(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function nr(e = !0) {
	vi(null), _i(null), _n(null), e && M?.deactivate();
}
function rr() {
	var e = V, t = e.b, n = M, r = t.is_rendered();
	return t.update_pending_count(1, n), n.increment(r, e), () => {
		t.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function ir(e) {
	var t = 2 | vt;
	return V !== null && (V.f |= Tt), {
		ctx: gn,
		deps: null,
		effects: null,
		equals: pn,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: en,
		wv: 0,
		parent: V,
		ac: null
	};
}
var ar = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function or(e, t, n) {
	let r = V;
	r === null && Ht();
	var i = void 0, a = gr(en), o = !B, s = /* @__PURE__ */ new Set();
	return Zr(() => {
		var t = V, n = ht();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== Bt && n.reject(e);
			}).finally(nr);
		} catch (e) {
			n.reject(e), nr();
		}
		var c = M;
		if (o) {
			if (t.f & 32768) var l = rr();
			if (r.b.is_rendered()) c.async_deriveds.get(t)?.reject(ar);
			else for (let e of s.values()) e.reject(ar);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== ar && (c.activate(), t ? (a.f |= jt, vr(a, t)) : (a.f & 8388608 && (a.f ^= jt), vr(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), Kr(() => {
		for (let e of s) e.reject(ar);
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
function N(e) {
	let t = /* @__PURE__ */ ir(e);
	return bi(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function sr(e) {
	let t = /* @__PURE__ */ ir(e);
	return t.equals = hn, t;
}
function cr(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) ii(t[n]);
	}
}
function lr(e) {
	var t, n = V, r = e.parent;
	if (!mi && r !== null && e.v !== en && r.f & 24576) return nn(), e.v;
	vi(r);
	try {
		e.f &= ~Ot, cr(e), t = Mi(e);
	} finally {
		vi(n);
	}
	return t;
}
function ur(e) {
	var t = lr(e);
	!e.equals(t) && (e.wv = ki(), (!M?.is_fork || e.deps === null) && (M === null ? e.v = t : (M.capture(e, t, !0), Nn?.capture(e, t, !0)), e.deps === null)) ? En(e, _t) : mi || (Pn === null ? Dn(e) : (Gr() || M?.is_fork) && Pn.set(e, t));
}
function dr(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac?.abort(Bt), t.fn !== null && (t.teardown = pt), t.ac = null, Pi(t, 0), ni(t));
}
function fr(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && Fi(t);
}
// node_modules/svelte/src/internal/client/reactivity/sources.js
var pr = /* @__PURE__ */ new Set(), mr = /* @__PURE__ */ new Map(), hr = !1;
function gr(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: pn,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function P(e, t) {
	let n = gr(e, t);
	return bi(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function _r(e, t = !1, n = !0) {
	let r = gr(e);
	return t || (r.equals = hn), r;
}
function F(e, t, n = !1) {
	return B !== null && (!gi || B.f & 131072) && vn() && B.f & 4325394 && (yi === null || !it.call(yi, e)) && Zt(), vr(e, n ? Sr(t) : t, zn);
}
function vr(e, t, n = null) {
	if (!e.equals(t)) {
		mr.set(e, mi ? t : e.v);
		var r = Hn.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && lr(t), Pn === null && Dn(t);
		}
		e.wv = ki(), xr(e, vt, n), vn() && V !== null && V.f & 1024 && !(V.f & 96) && (Ci === null ? wi([e]) : Ci.push(e)), !r.is_fork && pr.size > 0 && !hr && yr();
	}
	return t;
}
function yr() {
	hr = !1;
	for (let e of pr) {
		e.f & 1024 && En(e, yt);
		let t;
		try {
			t = Ai(e);
		} catch {
			t = !0;
		}
		t && Fi(e);
	}
	pr.clear();
}
function br(e) {
	F(e, e.v + 1);
}
function xr(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = vn(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (i || s !== V) {
			var l = (c & vt) === 0;
			if (l && En(s, t), c & 131072) pr.add(s);
			else if (c & 2) {
				var u = s;
				Pn?.delete(u), c & 65536 || (c & 512 && (V === null || !(V.f & 2097152)) && (s.f |= Ot), xr(u, yt, n));
			} else if (l) {
				var d = s;
				c & 16 && Gn !== null && Gn.add(d), n === null ? qn(d) : n.push(d);
			}
		}
	}
}
function Sr(e) {
	if (typeof e != "object" || !e || Mt in e) return e;
	let t = dt(e);
	if (t !== lt && t !== ut) return e;
	var n = /* @__PURE__ */ new Map(), r = nt(e), i = /* @__PURE__ */ P(0), a = null, o = Di, s = (e) => {
		if (Di === o) return e();
		var t = B, n = Di;
		_i(null), Oi(o);
		var r = e();
		return _i(t), Oi(n), r;
	};
	return r && n.set("length", /* @__PURE__ */ P(e.length, a)), new Proxy(e, {
		defineProperty(e, t, r) {
			"value" in r && r.configurable !== !1 && r.enumerable !== !1 && r.writable !== !1 || Yt();
			var i = n.get(t);
			return i === void 0 ? s(() => {
				var e = /* @__PURE__ */ P(r.value, a);
				return n.set(t, e), e;
			}) : F(i, r.value, !0), !0;
		},
		deleteProperty(e, t) {
			var r = n.get(t);
			if (r === void 0) {
				if (t in e) {
					let e = s(() => /* @__PURE__ */ P(en, a));
					n.set(t, e), br(i);
				}
			} else F(r, en), br(i);
			return !0;
		},
		get(t, r, i) {
			if (r === Mt) return e;
			var o = n.get(r), c = r in t;
			if (o === void 0 && (!c || st(t, r)?.writable) && (o = s(() => /* @__PURE__ */ P(Sr(c ? t[r] : en), a)), n.set(r, o)), o !== void 0) {
				var l = H(o);
				return l === en ? void 0 : l;
			}
			return Reflect.get(t, r, i);
		},
		getOwnPropertyDescriptor(e, t) {
			var r = Reflect.getOwnPropertyDescriptor(e, t);
			if (r && "value" in r) {
				var i = n.get(t);
				i && (r.value = H(i));
			} else if (r === void 0) {
				var a = n.get(t), o = a?.v;
				if (a !== void 0 && o !== en) return {
					enumerable: !0,
					configurable: !0,
					value: o,
					writable: !0
				};
			}
			return r;
		},
		has(e, t) {
			if (t === Mt) return !0;
			var r = n.get(t), i = r !== void 0 && r.v !== en || Reflect.has(e, t);
			return (r !== void 0 || V !== null && (!i || st(e, t)?.writable)) && (r === void 0 && (r = s(() => /* @__PURE__ */ P(i ? Sr(e[t]) : en, a)), n.set(t, r)), H(r) === en) ? !1 : i;
		},
		set(e, t, o, c) {
			var l = n.get(t), u = t in e;
			if (r && t === "length") for (var d = o; d < l.v; d += 1) {
				var f = n.get(d + "");
				f === void 0 ? d in e && (f = s(() => /* @__PURE__ */ P(en, a)), n.set(d + "", f)) : F(f, en);
			}
			if (l === void 0) (!u || st(e, t)?.writable) && (l = s(() => /* @__PURE__ */ P(void 0, a)), F(l, Sr(o)), n.set(t, l));
			else {
				u = l.v !== en;
				var p = s(() => Sr(o));
				F(l, p);
			}
			var m = Reflect.getOwnPropertyDescriptor(e, t);
			if (m?.set && m.set.call(c, o), !u) {
				if (r && typeof t == "string") {
					var h = n.get("length"), g = Number(t);
					Number.isInteger(g) && g >= h.v && F(h, g + 1);
				}
				br(i);
			}
			return !0;
		},
		ownKeys(e) {
			H(i);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = n.get(e);
				return t === void 0 || t.v !== en;
			});
			for (var [r, a] of n) a.v !== en && !(r in e) && t.push(r);
			return t;
		},
		setPrototypeOf() {
			Xt();
		}
	});
}
function Cr(e) {
	try {
		if (typeof e == "object" && e && Mt in e) return e[Mt];
	} catch {}
	return e;
}
function wr(e, t) {
	return Object.is(Cr(e), Cr(t));
}
var Tr, Er, Dr, Or;
function kr() {
	if (Tr === void 0) {
		Tr = window, Er = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		Dr = st(t, "firstChild").get, Or = st(t, "nextSibling").get, ft(e) && (e[It] = void 0, e[Ft] = null, e[Lt] = void 0, e.__e = void 0), ft(n) && (n[Rt] = void 0);
	}
}
function Ar(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function jr(e) {
	return Dr.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function Mr(e) {
	return Or.call(e);
}
function I(e, t) {
	if (!D) return /* @__PURE__ */ jr(e);
	var n = /* @__PURE__ */ jr(O);
	if (n === null) n = O.appendChild(Ar());
	else if (t && n.nodeType !== 3) {
		var r = Ar();
		return n?.before(r), cn(r), r;
	}
	return t && Ir(n), cn(n), n;
}
function L(e, t = !1) {
	if (!D) {
		var n = /* @__PURE__ */ jr(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ Mr(n) : n;
	}
	if (t) {
		if (O?.nodeType !== 3) {
			var r = Ar();
			return O?.before(r), cn(r), r;
		}
		Ir(O);
	}
	return O;
}
function R(e, t = 1, n = !1) {
	let r = D ? O : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ Mr(r);
	if (!D) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = Ar();
			return r === null ? i?.after(a) : r.before(a), cn(a), a;
		}
		Ir(r);
	}
	return cn(r), r;
}
function Nr(e) {
	e.textContent = "";
}
function Pr() {
	return !1;
}
function Fr(e, t, n) {
	let r = n ? { is: n } : void 0;
	return document.createElementNS(t ?? "http://www.w3.org/1999/xhtml", e, r);
}
function Ir(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
// node_modules/svelte/src/internal/client/dom/elements/misc.js
function Lr(e) {
	D && /* @__PURE__ */ jr(e) !== null && Nr(e);
}
var Rr = !1;
function zr() {
	Rr || (Rr = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[zt]?.();
		});
	}, { capture: !0 }));
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function Br(e) {
	var t = B, n = V;
	_i(null), vi(null);
	try {
		return e();
	} finally {
		_i(t), vi(n);
	}
}
function Vr(e, t, n, r = n) {
	e.addEventListener(t, () => Br(n));
	let i = e[zt];
	e[zt] = i ? () => {
		i(), r(!0);
	} : () => r(!0), zr();
}
// node_modules/svelte/src/internal/client/reactivity/effects.js
function Hr(e) {
	V === null && (B === null && Kt(e), Gt()), mi && Wt(e);
}
function Ur(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function Wr(e, t) {
	var n = V;
	n !== null && n.f & 8192 && (e |= bt);
	var r = {
		ctx: gn,
		deps: null,
		nodes: null,
		f: e | vt | 512,
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
	M?.register_created_effect(r);
	var i = r;
	if (e & 4) Rn === null ? Hn.ensure().schedule(r) : Rn.push(r);
	else if (t !== null) {
		try {
			Fi(r);
		} catch (e) {
			throw ii(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= wt));
	}
	if (i !== null && (i.parent = n, n !== null && Ur(i, n), B !== null && B.f & 2 && !(e & 64))) {
		var a = B;
		(a.effects ??= []).push(i);
	}
	return r;
}
function Gr() {
	return B !== null && !gi;
}
function Kr(e) {
	let t = Wr(8, null);
	return En(t, _t), t.teardown = e, t;
}
function qr(e) {
	Hr("$effect");
	var t = V.f;
	if (!B && t & 32 && !(t & 32768)) {
		var n = gn;
		(n.e ??= []).push(e);
	} else return Jr(e);
}
function Jr(e) {
	return Wr(4 | Et, e);
}
function Yr(e) {
	Hn.ensure();
	let t = Wr(64 | Tt, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? si(t, () => {
			ii(t), n(void 0);
		}) : (ii(t), n(void 0));
	});
}
function Xr(e) {
	return Wr(4, e);
}
function Zr(e) {
	return Wr(At | Tt, e);
}
function Qr(e, t = 0) {
	return Wr(8 | t, e);
}
function z(e, t = [], n = [], r = []) {
	er(r, t, n, (t) => {
		Wr(8, () => e(...t.map(H)));
	});
}
function $r(e, t = 0) {
	return Wr(16 | t, e);
}
function ei(e) {
	return Wr(32 | Tt, e);
}
function ti(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = mi, n = B;
		hi(!0), _i(null);
		try {
			t.call(null);
		} finally {
			hi(e), _i(n);
		}
	}
}
function ni(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && Br(() => {
			e.abort(Bt);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : ii(n, t), n = r;
	}
}
function ri(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || ii(t), t = n;
	}
}
function ii(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (ai(e.nodes.start, e.nodes.end), n = !0), En(e, Ct), ni(e, t && !n), Pi(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	ti(e), e.f ^= Ct, e.f |= xt;
	var i = e.parent;
	i !== null && i.first !== null && oi(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function ai(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ Mr(e);
		e.remove(), e = n;
	}
}
function oi(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function si(e, t, n = !0) {
	var r = [];
	ci(e, r, !0);
	var i = () => {
		n && ii(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function ci(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= bt;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				ci(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function li(e) {
	ui(e, !0);
}
function ui(e, t) {
	if (e.f & 8192) {
		e.f ^= bt, e.f & 1024 || (En(e, vt), Hn.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			ui(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function di(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ Mr(n);
		t.append(n), n = i;
	}
}
// node_modules/svelte/src/internal/client/legacy.js
var fi = null, pi = !1, mi = !1;
function hi(e) {
	mi = e;
}
var B = null, gi = !1;
function _i(e) {
	B = e;
}
var V = null;
function vi(e) {
	V = e;
}
var yi = null;
function bi(e) {
	B !== null && (yi === null ? yi = [e] : yi.push(e));
}
var xi = null, Si = 0, Ci = null;
function wi(e) {
	Ci = e;
}
var Ti = 1, Ei = 0, Di = Ei;
function Oi(e) {
	Di = e;
}
function ki() {
	return ++Ti;
}
function Ai(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~Ot), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (Ai(a) && ur(a), a.wv > e.wv) return !0;
		}
		t & 512 && Pn === null && En(e, _t);
	}
	return !1;
}
function ji(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(yi !== null && it.call(yi, e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? ji(a, t, !1) : t === a && (n ? En(a, vt) : a.f & 1024 && En(a, yt), qn(a));
	}
}
function Mi(e) {
	var t = xi, n = Si, r = Ci, i = B, a = yi, o = gn, s = gi, c = Di, l = e.f;
	xi = null, Si = 0, Ci = null, B = l & 96 ? null : e, yi = null, _n(e.ctx), gi = !1, Di = ++Ei, e.ac !== null && (Br(() => {
		e.ac.abort(Bt);
	}), e.ac = null);
	try {
		e.f |= kt;
		var u = e.fn, d = u();
		e.f |= St;
		var f = e.deps, p = M?.is_fork;
		if (xi !== null) {
			var m;
			if (p || Pi(e, Si), f !== null && Si > 0) for (f.length = Si + xi.length, m = 0; m < xi.length; m++) f[Si + m] = xi[m];
			else e.deps = f = xi;
			if (Gr() && e.f & 512) for (m = Si; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && Si < f.length && (Pi(e, Si), f.length = Si);
		if (vn() && Ci !== null && !gi && f !== null && !(e.f & 6146)) for (m = 0; m < Ci.length; m++) ji(Ci[m], e);
		if (i !== null && i !== e) {
			if (Ei++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = Ei;
			if (t !== null) for (let e of t) e.rv = Ei;
			Ci !== null && (r === null ? r = Ci : r.push(...Ci));
		}
		return e.f & 8388608 && (e.f ^= jt), d;
	} catch (e) {
		return Cn(e);
	} finally {
		e.f ^= kt, xi = t, Si = n, Ci = r, B = i, yi = a, _n(o), gi = s, Di = c;
	}
}
function Ni(e, t) {
	let n = t.reactions;
	if (n !== null) {
		var r = rt.call(n, e);
		if (r !== -1) {
			var i = n.length - 1;
			i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
		}
	}
	if (n === null && t.f & 2 && (xi === null || !it.call(xi, t))) {
		var a = t;
		a.f & 512 && (a.f ^= 512, a.f &= ~Ot), a.v !== en && Dn(a), dr(a), Pi(a, 0);
	}
}
function Pi(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) Ni(e, n[r]);
}
function Fi(e) {
	var t = e.f;
	if (!(t & 16384)) {
		En(e, _t);
		var n = V, r = pi;
		V = e, pi = !0;
		try {
			t & 16777232 ? ri(e) : ni(e), ti(e);
			var i = Mi(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = Ti;
		} finally {
			pi = r, V = n;
		}
	}
}
async function Ii() {
	await Promise.resolve(), Un();
}
function H(e) {
	var t = !!(e.f & 2);
	if (fi?.add(e), B !== null && !gi && !(V !== null && V.f & 16384) && (yi === null || !it.call(yi, e))) {
		var n = B.deps;
		if (B.f & 2097152) e.rv < Ei && (e.rv = Ei, xi === null && n !== null && n[Si] === e ? Si++ : xi === null ? xi = [e] : xi.push(e));
		else {
			B.deps ??= [], it.call(B.deps, e) || B.deps.push(e);
			var r = e.reactions;
			r === null ? e.reactions = [B] : it.call(r, B) || r.push(B);
		}
	}
	if (mi && mr.has(e)) return mr.get(e);
	if (t) {
		var i = e;
		if (mi) {
			var a = i.v;
			return (!(i.f & 1024) && i.reactions !== null || Ri(i)) && (a = lr(i)), mr.set(i, a), a;
		}
		var o = !(i.f & 512) && !gi && B !== null && (pi || !!(B.f & 512)), s = (i.f & St) === 0;
		Ai(i) && (o && (i.f |= 512), ur(i)), o && !s && (fr(i), Li(i));
	}
	if (Pn?.has(e)) return Pn.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function Li(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (fr(t), Li(t));
}
function Ri(e) {
	if (e.v === en) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (mr.has(t) || t.f & 2 && Ri(t)) return !0;
	return !1;
}
function zi(e) {
	var t = gi;
	try {
		return gi = !0, e();
	} finally {
		gi = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var Bi = ["touchstart", "touchmove"];
function Vi(e) {
	return Bi.includes(e);
}
// node_modules/svelte/src/internal/client/dev/css.js
var Hi = Symbol("events"), Ui = /* @__PURE__ */ new Set(), Wi = /* @__PURE__ */ new Set();
function Gi(e) {
	if (!D) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function Ki(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Yi.call(t, e), !e.cancelBubble) return Br(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? xn(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function qi(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = Ki(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && Kr(() => {
		t.removeEventListener(e, o, a);
	});
}
function U(e, t, n) {
	(t[Hi] ??= {})[e] = n;
}
function W(e) {
	for (var t = 0; t < e.length; t++) Ui.add(e[t]);
	for (var n of Wi) n(e);
}
var Ji = null;
function Yi(e) {
	var t = this, n = t.ownerDocument, r = e.type, i = e.composedPath?.() || [], a = i[0] || e.target;
	Ji = e;
	var o = 0, s = Ji === e && e[Hi];
	if (s) {
		var c = i.indexOf(s);
		if (c !== -1 && (t === document || t === window)) {
			e[Hi] = t;
			return;
		}
		var l = i.indexOf(t);
		if (l === -1) return;
		c <= l && (o = c);
	}
	if (a = i[o] || e.target, a !== t) {
		ot(e, "currentTarget", {
			configurable: !0,
			get() {
				return a || n;
			}
		});
		var u = B, d = V;
		_i(null), vi(null);
		try {
			for (var f, p = []; a !== null;) {
				var m = a.assignedSlot || a.parentNode || a.host || null;
				try {
					var h = a[Hi]?.[r];
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
			e[Hi] = t, delete e.currentTarget, _i(u), vi(d);
		}
	}
}
// node_modules/svelte/src/internal/client/dom/reconciler.js
var Xi = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function Zi(e) {
	return Xi?.createHTML(e) ?? e;
}
function Qi(e) {
	var t = Fr("template");
	return t.innerHTML = Zi(e.replaceAll("<!>", "<!---->")), t.content;
}
// node_modules/svelte/src/internal/client/dom/template.js
function $i(e, t) {
	var n = V;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function G(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (D) return $i(O, null), O;
		i === void 0 && (i = Qi(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ jr(i)));
		var t = r || Er ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ jr(t), s = t.lastChild;
			$i(o, s);
		} else $i(t, t);
		return t;
	};
}
function ea(e = "") {
	if (!D) {
		var t = Ar(e + "");
		return $i(t, t), t;
	}
	var n = O;
	return n.nodeType === 3 ? Ir(n) : (n.before(n = Ar()), cn(n)), $i(n, n), n;
}
function ta() {
	if (D) return $i(O, null), O;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = Ar();
	return e.append(t, n), $i(t, n), e;
}
function K(e, t) {
	if (D) {
		var n = V;
		n.f & 32768 && n.nodes.end !== null || (n.nodes.end = O), ln();
	} else e !== null && e.before(t);
}
function q(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[Rt] ??= e.nodeValue) && (e[Rt] = n, e.nodeValue = `${n}`);
}
function na(e, t) {
	return ia(e, t);
}
var ra = /* @__PURE__ */ new Map();
function ia(e, { target: t, anchor: n, props: r = {}, events: i, context: a, intro: o = !0, transformError: s }) {
	kr();
	var c = void 0, l = Yr(() => {
		var o = n ?? t.appendChild(Ar());
		Qn(o, { pending: () => {} }, (t) => {
			A({});
			var n = gn;
			if (a && (n.c = a), i && (r.$$events = i), D && $i(t, null), c = e(t, r) || {}, D && (V.nodes.end = O, O === null || O.nodeType !== 8 || O.data !== "]")) throw rn(), $t;
			j();
		}, s);
		var l = /* @__PURE__ */ new Set(), u = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!l.has(r)) {
					l.add(r);
					var i = Vi(r);
					for (let e of [t, document]) {
						var a = ra.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), ra.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Yi, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return u(at(Ui)), Wi.add(u), () => {
			for (var e of l) for (let n of [t, document]) {
				var r = ra.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Yi), r.delete(e), r.size === 0 && ra.delete(n)) : r.set(e, i);
			}
			Wi.delete(u), o !== n && o.parentNode?.removeChild(o);
		};
	});
	return aa.set(c, l), c;
}
var aa = /* @__PURE__ */ new WeakMap();
function oa(e, t) {
	let n = aa.get(e);
	return n ? (aa.delete(e), n(t)) : Promise.resolve();
}
// node_modules/svelte/src/internal/client/dom/blocks/branches.js
var sa = class {
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
			if (n) li(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (ii(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						di(r, t), t.append(Ar()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else ii(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), si(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (ii(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = M, r = Pr();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = Ar();
				i.append(a), this.#n.set(e, {
					effect: ei(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, ei(() => t(this.anchor)));
		}
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else D && (this.anchor = O), this.#a(n);
	}
};
// node_modules/svelte/src/internal/client/dom/blocks/if.js
function J(e, t, n = !1) {
	var r;
	D && (r = O, ln());
	var i = new sa(e), a = n ? wt : 0;
	function o(e, t) {
		if (D) {
			var n = fn(r);
			if (e !== parseInt(n.substring(1))) {
				var a = dn();
				cn(a), i.anchor = a, sn(!1), i.ensure(e, t), sn(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	$r(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
// node_modules/svelte/src/internal/client/dom/blocks/key.js
var ca = Symbol("NaN");
function la(e, t, n) {
	D && ln();
	var r = new sa(e), i = !vn();
	$r(() => {
		var e = t();
		e !== e && (e = ca), i && typeof e == "object" && e && (e = {}), r.ensure(e, n);
	});
}
// node_modules/svelte/src/internal/client/dom/blocks/each.js
function ua(e, t) {
	return t;
}
function da(e, t, n) {
	for (var r = [], i = t.length, a, o = t.length, s = 0; s < i; s++) {
		let n = t[s];
		si(n, () => {
			if (a) {
				if (a.pending.delete(n), a.done.add(n), a.pending.size === 0) {
					var t = e.outrogroups;
					fa(e, at(a.done)), t.delete(a), t.size === 0 && (e.outrogroups = null);
				}
			} else --o;
		}, !1);
	}
	if (o === 0) {
		var c = r.length === 0 && n !== null;
		if (c) {
			var l = n, u = l.parentNode;
			Nr(u), u.append(l), e.items.clear();
		}
		fa(e, t, !c);
	} else a = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(a);
}
function fa(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= Dt, di(a, document.createDocumentFragment())) : ii(t[i], n);
	}
}
var pa;
function Y(e, t, n, r, i, a = null) {
	var o = e, s = /* @__PURE__ */ new Map();
	if (t & 4) {
		var c = e;
		o = D ? cn(/* @__PURE__ */ jr(c)) : c.appendChild(Ar());
	}
	D && ln();
	var l = null, u = /* @__PURE__ */ sr(() => {
		var e = n();
		return nt(e) ? e : e == null ? [] : at(e);
	}), d, f = /* @__PURE__ */ new Map(), p = !0;
	function m(e) {
		g.effect.f & 16384 || (g.pending.delete(e), g.fallback = l, ha(g, d, o, t, r), l !== null && (d.length === 0 ? l.f & 33554432 ? (l.f ^= Dt, _a(l, null, o)) : li(l) : si(l, () => {
			l = null;
		})));
	}
	function h(e) {
		g.pending.delete(e);
	}
	var g = {
		effect: $r(() => {
			d = H(u);
			var e = d.length;
			let c = !1;
			D && fn(o) === "[!" != (e === 0) && (o = dn(), cn(o), sn(!1), c = !0);
			for (var g = /* @__PURE__ */ new Set(), _ = M, v = Pr(), y = 0; y < e; y += 1) {
				D && O.nodeType === 8 && O.data === "]" && (o = O, c = !0, sn(!1));
				var b = d[y], x = r(b, y), S = p ? null : s.get(x);
				S ? (S.v && vr(S.v, b), S.i && vr(S.i, y), v && _.unskip_effect(S.e)) : (S = ga(s, p ? o : pa ??= Ar(), b, x, y, i, t, n), p || (S.e.f |= Dt), s.set(x, S)), g.add(x);
			}
			if (e === 0 && a && !l && (p ? l = ei(() => a(o)) : (l = ei(() => a(pa ??= Ar())), l.f |= Dt)), e > g.size && Ut("", "", ""), D && e > 0 && cn(dn()), !p) {
				if (f.set(_, g), v) {
					for (let [e, t] of s) g.has(e) || _.skip_effect(t.e);
					_.oncommit(m), _.ondiscard(h);
				} else m(_);
			}
			c && sn(!0), H(u);
		}),
		flags: t,
		items: s,
		pending: f,
		outrogroups: null,
		fallback: l
	};
	p = !1, D && (o = O);
}
function ma(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function ha(e, t, n, r, i) {
	var a = !!(r & 8), o = t.length, s = e.items, c = ma(e.effect.first), l, u = null, d, f = [], p = [], m, h, g, _;
	if (a) for (_ = 0; _ < o; _ += 1) m = t[_], h = i(m, _), g = s.get(h).e, g.f & 33554432 || (g.nodes?.a?.measure(), (d ??= /* @__PURE__ */ new Set()).add(g));
	for (_ = 0; _ < o; _ += 1) {
		if (m = t[_], h = i(m, _), g = s.get(h).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(g), t.done.delete(g);
		if (g.f & 8192 && (li(g), a && (g.nodes?.a?.unfix(), (d ??= /* @__PURE__ */ new Set()).delete(g))), g.f & 33554432) {
			if (g.f ^= Dt, g === c) _a(g, null, n);
			else {
				var v = u ? u.next : c;
				g === e.effect.last && (e.effect.last = g.prev), g.prev && (g.prev.next = g.next), g.next && (g.next.prev = g.prev), va(e, u, g), va(e, g, v), _a(g, v, n), u = g, f = [], p = [], c = ma(u.next);
				continue;
			}
		}
		if (g !== c) {
			if (l !== void 0 && l.has(g)) {
				if (f.length < p.length) {
					var y = p[0], b;
					u = y.prev;
					var x = f[0], S = f[f.length - 1];
					for (b = 0; b < f.length; b += 1) _a(f[b], y, n);
					for (b = 0; b < p.length; b += 1) l.delete(p[b]);
					va(e, x.prev, S.next), va(e, u, x), va(e, S, y), c = y, u = S, --_, f = [], p = [];
				} else l.delete(g), _a(g, c, n), va(e, g.prev, g.next), va(e, g, u === null ? e.effect.first : u.next), va(e, u, g), u = g;
				continue;
			}
			for (f = [], p = []; c !== null && c !== g;) (l ??= /* @__PURE__ */ new Set()).add(c), p.push(c), c = ma(c.next);
			if (c === null) continue;
		}
		g.f & 33554432 || f.push(g), u = g, c = ma(g.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (fa(e, at(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (c !== null || l !== void 0) {
		var C = [];
		if (l !== void 0) for (g of l) g.f & 8192 || C.push(g);
		for (; c !== null;) !(c.f & 8192) && c !== e.fallback && C.push(c), c = ma(c.next);
		var w = C.length;
		if (w > 0) {
			var ee = r & 4 && o === 0 ? n : null;
			if (a) {
				for (_ = 0; _ < w; _ += 1) C[_].nodes?.a?.measure();
				for (_ = 0; _ < w; _ += 1) C[_].nodes?.a?.fix();
			}
			da(e, C, ee);
		}
	}
	a && xn(() => {
		if (d !== void 0) for (g of d) g.nodes?.a?.apply();
	});
}
function ga(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? gr(n) : /* @__PURE__ */ _r(n, !1, !1) : null, l = o & 2 ? gr(i) : null;
	return {
		v: c,
		i: l,
		e: ei(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function _a(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ Mr(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function va(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
// node_modules/svelte/src/internal/client/dom/blocks/snippet.js
function ya(e, t, ...n) {
	var r = new sa(e);
	$r(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, wt);
}
// node_modules/svelte/src/internal/client/dom/css.js
function X(e, t) {
	Xr(() => {
		var n = e.getRootNode(), r = n.host ? n : n.head ?? n.ownerDocument.head;
		if (!r.querySelector("#" + t.hash)) {
			let e = Fr("style");
			e.id = t.hash, e.textContent = t.code, r.appendChild(e);
		}
	});
}
// node_modules/svelte/src/internal/shared/attributes.js
function ba(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function xa(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function Sa(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(xa)), i && c.push(...Object.keys(i).map(xa));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = xa(e.substring(l, u).trim());
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
		return r && (n += ba(r)), i && (n += ba(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
// node_modules/svelte/src/internal/client/dom/elements/style.js
function Ca(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function wa(e, t, n, r) {
	var i = e[Lt];
	if (D || i !== t) {
		var a = Sa(t, r);
		D && a === e.getAttribute("style") || (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[Lt] = t;
	} else r && (Array.isArray(r) ? (Ca(e, n?.[0], r[0]), Ca(e, n?.[1], r[1], "important")) : Ca(e, n, r));
	return r;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
function Ta(e, t, n = !1) {
	if (e.multiple) {
		if (t == null) return;
		if (!nt(t)) return an();
		for (var r of e.options) r.selected = t.includes(Oa(r));
	} else {
		for (r of e.options) if (wr(Oa(r), t)) {
			r.selected = !0;
			return;
		}
		n && t === void 0 || (e.selectedIndex = -1);
	}
}
function Ea(e) {
	var t = new MutationObserver(() => {
		Ta(e, e.__value);
	});
	t.observe(e, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["value"]
	}), Kr(() => {
		t.disconnect();
	});
}
function Da(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet(), i = !0;
	Vr(e, "change", (t) => {
		var i = t ? "[selected]" : ":checked", a;
		if (e.multiple) a = [].map.call(e.querySelectorAll(i), Oa);
		else {
			var o = e.querySelector(i) ?? e.querySelector("option:not([disabled])");
			a = o && Oa(o);
		}
		n(a), e.__value = a, M !== null && r.add(M);
	}), Xr(() => {
		var a = t();
		if (e === document.activeElement) {
			var o = M;
			if (r.has(o)) return;
		}
		if (Ta(e, a, i), i && a === void 0) {
			var s = e.querySelector(":checked");
			s !== null && (a = Oa(s), n(a));
		}
		e.__value = a, i = !1;
	}), Ea(e);
}
function Oa(e) {
	return "__value" in e ? e.__value : e.value;
}
// node_modules/svelte/src/internal/client/dom/elements/attributes.js
var ka = Symbol("is custom element"), Aa = Symbol("is html"), ja = Vt ? "link" : "LINK", Ma = Vt ? "progress" : "PROGRESS";
function Z(e) {
	if (D) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					Q(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					Q(e, "checked", null), e.checked = r;
				}
			}
		};
		e[zt] = n, xn(n), zr();
	}
}
function Na(e, t) {
	var n = Ia(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === Ma) && (e.value = t ?? "");
}
function Pa(e, t) {
	var n = Ia(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function Fa(e, t) {
	t ? e.hasAttribute("selected") || e.setAttribute("selected", "") : e.removeAttribute("selected");
}
function Q(e, t, n, r) {
	var i = Ia(e);
	D && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === ja) || i[t] !== (i[t] = n) && (t === "loading" && (e[Pt] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Ra(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function Ia(e) {
	return e[Ft] ??= {
		[ka]: e.nodeName.includes("-"),
		[Aa]: e.namespaceURI === tn
	};
}
var La = /* @__PURE__ */ new Map();
function Ra(e) {
	var t = e.getAttribute("is") || e.nodeName, n = La.get(t);
	if (n) return n;
	La.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var o in r = ct(i), r) r[o].set && o !== "innerHTML" && o !== "textContent" && o !== "innerText" && n.push(o);
		i = dt(i);
	}
	return n;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function za(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	Vr(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = Va(e) ? Ha(a) : a, n(a), M !== null && r.add(M), await Ii(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (D && e.defaultValue !== e.value || zi(t) == null && e.value) && (n(Va(e) ? Ha(e.value) : e.value), M !== null && r.add(M)), Qr(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = M;
			if (r.has(i)) return;
		}
		Va(e) && n === Ha(e.value) || (e.type !== "date" || n || e.value) && n !== e.value && (e.value = n ?? "");
	});
}
function Ba(e, t, n = t) {
	Vr(e, "change", (t) => {
		n(t ? e.defaultChecked : e.checked);
	}), (D && e.defaultChecked !== e.checked || zi(t) == null) && n(e.checked), Qr(() => {
		e.checked = !!t();
	});
}
function Va(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function Ha(e) {
	return e === "" ? null : +e;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function Ua(e, t) {
	return e === t || e?.[Mt] === t;
}
function Wa(e = {}, t, n, r) {
	var i = gn.r, a = V;
	return Xr(() => {
		var o, s;
		return Qr(() => {
			o = s, s = r?.() || [], zi(() => {
				Ua(n(...s), e) || (t(e, ...s), o && Ua(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && Ua(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
// node_modules/svelte/src/internal/client/reactivity/props.js
function Ga(e, t, n, r) {
	var i = !0, a = !!(n & 8), o = !!(n & 16), s = r, c = !0, l = void 0, u = () => o && i ? (l ??= /* @__PURE__ */ ir(r), H(l)) : (c && (c = !1, s = o ? zi(r) : r), s);
	let d;
	if (a) {
		var f = Mt in e || Nt in e;
		d = st(e, t)?.set ?? (f && t in e ? (n) => e[t] = n : void 0);
	}
	var p, m = !1;
	a ? [p, m] = jn(() => e[t]) : p = e[t], p === void 0 && r !== void 0 && (p = u(), d && (i && Jt(t), d(p)));
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
	var _ = !1, v = (n & 1 ? ir : sr)(() => (_ = !1, h()));
	a && H(v);
	var y = V;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? H(v) : i && a ? Sr(e) : e;
			return F(v, n), _ = !0, s !== void 0 && (s = n), e;
		}
		return mi && _ || y.f & 16384 ? v.v : H(v);
	});
}
// node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
// src/ui/canvas/sanitize.ts
var Ka = /* @__PURE__ */ new Set([
	"http:",
	"https:",
	"mailto:",
	"tel:"
]), qa = (e) => {
	if (typeof e != "string") return "";
	let t = e.replace(/[\u0000- \u007f-\u009f]/g, ""), n = /^([a-z][a-z0-9+.-]*):/i.exec(t)?.[1];
	return n === void 0 || Ka.has(`${n.toLowerCase()}:`) ? e.trim() : "";
}, Ja = (e) => typeof e == "string" ? e.replace(/[^\w\- :]/g, "").trim() : "", Ya = (e) => {
	let t = qa(e);
	return t !== "" && !/^(mailto|tel):/i.test(t) ? t : "";
}, Xa = (e) => typeof e == "string" ? e : typeof e == "number" ? String(e) : "", Za = (e) => e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;"), Qa = "allow-same-origin", $a = (e) => "<!doctype html><html><head><meta charset=\"utf-8\"><meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'none'; style-src * 'unsafe-inline'; img-src * data: blob:; font-src * data:\">" + e.map(Ya).filter((e) => e !== "").map((e) => `<link rel="stylesheet" href="${Za(e)}">`).join("") + "<style>body{margin:0;padding:12px;min-height:100vh;box-sizing:border-box}[data-ceiba-id]{cursor:default}[data-ceiba-id]:hover{outline:1px dashed #94a3b8}[data-ceiba-selected]{outline:2px solid #2563eb!important;outline-offset:2px}[data-ceiba-multiline]{white-space:pre-line}[contenteditable]{outline:2px solid #16a34a!important;outline-offset:2px;cursor:text}.ceiba-dragging,.ceiba-dragging *{user-select:none!important;cursor:grabbing!important}.ceiba-placeholder{padding:12px;border:1px dashed #94a3b8;color:#475569;font:13px system-ui;background:#f8fafc}@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}</style></head><body></body></html>", eo = /* @__PURE__ */ new Set([
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
]), to = /* @__PURE__ */ new Set(["text"]), no = (e, t) => !t.has(e.type) || e.children.length > 0 ? null : e.type === "heading" ? "text" : e.type === "text" ? "content" : e.type === "button" ? "label" : eo.has(e.type) || to.has(e.type) ? "content" : null, ro = (e) => to.has(e), io = (e, t) => {
	let n = e.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, "");
	return t ? n.replace(/\n$/, "") : n.replace(/\n+/g, " ");
}, ao = (e) => {
	let t = e.ownerDocument, n = t.createRange();
	n.selectNodeContents(e), n.collapse(!1);
	let r = t.getSelection();
	r?.removeAllRanges(), r?.addRange(n);
}, oo = {
	tag: "#slot",
	attrs: [],
	children: []
}, $ = (e, t = {}, n = []) => ({
	tag: e,
	attrs: Object.entries(t).filter((e) => e[1] !== null && e[1] !== void 0 && e[1] !== !1 && e[1] !== "").map(([e, t]) => [e, t === !0 || String(t)]),
	children: n.filter((e) => e !== null)
}), so = (e, t) => {
	let n = null, r = (t) => {
		let i = e.createElement(t.tag);
		for (let [e, n] of t.attrs) i.setAttribute(e, n === !0 ? "" : n);
		for (let a of t.children) if (a === oo) {
			let t = e.createComment("slot");
			i.append(t), n = {
				parent: i,
				before: t
			};
		} else i.append(typeof a == "string" ? e.createTextNode(a) : r(a));
		return i;
	}, i = r(t);
	return {
		el: i,
		slot: n ?? {
			parent: i,
			before: null
		}
	};
}, co = (e) => e.replace(/^[ \t\n\r\0\x0B]+|[ \t\n\r\0\x0B]+$/g, ""), lo = (e) => typeof e == "string" ? e : "", uo = (e) => typeof e == "string" ? e : typeof e == "number" ? String(e) : e === !0 ? "1" : "", fo = /^[ \t\n\r\v\f]*[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?[ \t\n\r\v\f]*$/, po = (e, t, n, r) => {
	let i = typeof e == "number" && Number.isFinite(e) ? Math.trunc(e) : typeof e == "string" && fo.test(e) ? Math.trunc(Number(e)) : t;
	return Math.max(n, Math.min(r, i));
}, mo = (e, t) => {
	let n = typeof e == "string" || typeof e == "number" ? String(e) : e === !0 ? "1" : null;
	return n !== null && t.includes(n) ? n : t[0];
}, ho = (e) => lo(e).replace(/\r/g, "").split("\n").flatMap((e, t) => t === 0 ? [e] : [$("br"), e]), go = (e, t) => co(`${e} ${lo(t)}`), _o = (e) => qa(e), vo = (e, t, n, r = "100vw") => {
	let i = _o(e[t]);
	if (i === "") return null;
	let a = lo(e.srcset), o = po(e.width, 0, 0, 2 ** 53 - 1), s = po(e.height, 0, 0, 2 ** 53 - 1), c = $("img", {
		src: i,
		srcset: a,
		sizes: a === "" ? "" : r,
		class: n,
		width: o || null,
		height: s || null,
		loading: "lazy",
		decoding: "async"
	});
	return {
		...c,
		attrs: [
			c.attrs[0],
			["alt", lo(e.alt)],
			...c.attrs.slice(1)
		]
	};
}, yo = (e) => {
	let t = v(e);
	return t === null ? "" : `background-image:${t}`;
}, bo = (e, t) => co(lo(e)) || t, xo = (e, t, n) => {
	let r = co(lo(e[t]));
	return r === "" ? n : r.replace(/\|/g, "");
}, So = {
	tabs: (e) => $("div", {
		class: go("cms-tabs", e.class),
		"data-cms-tabs": "1",
		"data-cms-label": co(lo(e.label))
	}, [oo]),
	tab_panel: (e) => $("section", { class: go("cms-tab-panel", e.class) }, [$("h3", { class: "cms-tab-title" }, [bo(e.title, "Tab")]), oo]),
	disclosures: (e) => $("div", {
		class: go("cms-accordion", e.class),
		"data-cms-single": e.single ?? !0 ? "1" : ""
	}, [oo]),
	disclosure: (e) => $("details", {
		class: go("cms-accordion-item", e.class),
		open: !!e.open && e.open !== "0"
	}, [$("summary", { class: "cms-accordion-title" }, [bo(e.title, "Item")]), $("div", { class: "cms-accordion-body" }, [oo])]),
	slideshow(e) {
		let t = e.autoplay && e.autoplay !== "0" ? po(e.interval, 6, 3, 15) * 1e3 : 0, n = [
			xo(e, "previousLabel", "Previous"),
			xo(e, "nextLabel", "Next"),
			xo(e, "pauseLabel", "Pause"),
			xo(e, "playLabel", "Play")
		];
		return $("div", {
			class: go("cms-carousel", e.class),
			role: "region",
			"aria-label": xo(e, "label", "Carousel"),
			"data-cms-carousel": String(t),
			"data-cms-labels": n.join("|")
		}, [$("div", { class: "cms-carousel-track" }, [oo])]);
	},
	slide: (e) => $("div", { class: go("cms-carousel-slide", e.class) }, [oo])
}, Co = (e, t) => co(lo(e)) || t, wo = {
	site_title: (e) => $("a", {
		href: _o(e.href ?? "/") || "/",
		class: go("cms-site-title navbar-brand", e.class)
	}, [Co(e.text, "Site")]),
	site_logo(e) {
		let t = Co(e.name, "Home"), n = po(e.height, 40, 16, 200), r = vo({
			image: e.image,
			alt: t,
			srcset: e.srcset
		}, "image", "d-block", `${n}px`), i = r === null ? t : {
			...r,
			attrs: [["style", `height:${n}px;width:auto`], ...r.attrs]
		};
		return $("a", {
			href: _o(e.href ?? "/") || "/",
			class: go("cms-site-logo navbar-brand", e.class)
		}, [i]);
	},
	search_form(e) {
		let t = Co(e.label, "Search");
		return $("form", {
			class: go("cms-search d-flex gap-2", e.class),
			role: "search",
			action: _o(e.action ?? "/buscar") || "/buscar",
			method: "get"
		}, [
			$("label", {
				class: "visually-hidden",
				for: "cms-search-q"
			}, [t]),
			$("input", {
				id: "cms-search-q",
				class: "form-control",
				type: "search",
				name: "q",
				placeholder: co(lo(e.placeholder))
			}),
			$("button", {
				type: "submit",
				class: "btn btn-outline-primary"
			}, [Co(e.button, t)])
		]);
	},
	site_menu(e) {
		let t = typeof e.slug == "string" && /^[a-z0-9_-]{1,100}$/i.test(e.slug) ? e.slug : "";
		return $("nav", {
			class: go("cms-site-menu", e.class),
			"aria-label": Co(e.label, "Main"),
			"data-cms-menu": t
		});
	}
}, To = (e, t) => typeof e == "string" && e !== "" ? e : t, Eo = (e) => typeof e == "object" && e && !Array.isArray(e) ? e : null, Do = (e) => ({
	tag: "option",
	attrs: [["value", ""]],
	children: [e]
}), Oo = (e, t, n = !1, r = null) => {
	let i = `page-item${e === null ? " disabled" : ""}${n ? " active" : ""}`, a = e === null || n ? $("span", {
		class: "page-link",
		"aria-current": n ? "page" : null
	}, [t]) : $("a", {
		class: "page-link",
		href: e,
		"aria-label": r
	}, [t]);
	return $("li", { class: i }, [a]);
}, ko = {
	query: (e) => $("div", {
		class: go("cms-query", e.class),
		"data-cms-query": lo(e.id),
		"data-cms-state": e._state === void 0 ? "error" : lo(e._state),
		"aria-live": "polite"
	}, [oo]),
	query_state(e) {
		let t = mo(e.show, [
			"empty",
			"results",
			"error"
		]);
		return $("div", {
			class: go(`cms-query-${t}`, e.class),
			role: t === "error" ? "status" : null
		}, [oo]);
	},
	pagination(e) {
		let t = Eo(e._pages);
		if (t === null) return null;
		let n = (e) => typeof e == "string" ? e : null, r = Array.isArray(t.links) ? t.links : [];
		return $("nav", { "aria-label": To(e.label, "Pages") }, [$("ul", { class: go("pagination", e.class) }, [
			Oo(n(t.prev), To(e.prev, "«"), !1, "Previous"),
			...r.map((e) => Oo(String(e.href ?? ""), String(e.label ?? ""), e.current === !0)),
			Oo(n(t.next), To(e.next, "»"), !1, "Next")
		])]);
	},
	query_filter(e) {
		let t = Eo(e._filter);
		if (t === null) return null;
		let n = lo(t.name), r = `cms-filter-${n.replace(/[^a-z0-9_]/g, "")}`, i = String(t.value ?? ""), a = Object.entries(Eo(t.hidden) ?? {}).map(([e, t]) => $("input", {
			type: "hidden",
			name: e,
			value: String(t)
		})), o = Array.isArray(t.options) ? t.options : [], s = t.kind === "select" ? $("select", {
			id: r,
			name: n,
			class: "form-select"
		}, [Do(typeof e.all == "string" ? e.all : "—"), ...o.map((e) => $("option", {
			value: String(e.value ?? ""),
			selected: String(e.value ?? "") === i
		}, [String(e.label ?? "")]))]) : $("input", {
			id: r,
			type: "search",
			name: n,
			class: "form-control",
			value: i,
			placeholder: typeof e.placeholder == "string" ? e.placeholder : null
		});
		return $("form", {
			class: go("cms-query-filter d-flex gap-2 align-items-end", e.class),
			method: "get"
		}, [
			...a,
			$("div", {}, [$("label", {
				class: "form-label",
				for: r
			}, [To(e.label, n)]), s]),
			$("button", {
				type: "submit",
				class: "btn btn-outline-primary"
			}, [To(e.button, "OK")])
		]);
	}
}, Ao = {
	...So,
	...wo,
	...ko,
	image(e) {
		let t = [
			e.fluid ?? !0 ? "img-fluid" : "",
			e.rounded ? "rounded" : "",
			co(lo(e.class))
		].filter((e) => e !== ""), n = co(lo(e.sizes));
		return vo(e, "src", t.join(" "), n === "" ? "100vw" : n);
	},
	divider(e) {
		let t = mo(e.style, [
			"solid",
			"dashed",
			"dotted"
		]);
		return $("hr", {
			class: go(`cms-divider my-${po(e.spacing, 4, 0, 5)}`, e.class),
			style: t === "solid" ? "" : `border-top-style:${t}`
		});
	},
	spacer: (e) => $("div", {
		class: go("cms-spacer", e.class),
		style: `height:${po(e.size, 32, 4, 400)}px`,
		"aria-hidden": "true"
	}),
	list(e) {
		let t = (Array.isArray(e.items) ? e.items : []).filter((e) => typeof e == "string").slice(0, 100), n = mo(e.variant, [
			"default",
			"unstyled",
			"inline"
		]), r = go(`cms-list${n === "default" ? "" : ` list-${n}`}`, e.class);
		return $(e.ordered ? "ol" : "ul", { class: r }, t.map((e) => $("li", { class: n === "inline" ? "list-inline-item" : "" }, [e])));
	},
	quote(e) {
		let t = co(lo(e.cite));
		return $("figure", { class: go("cms-quote", e.class) }, [$("blockquote", { class: "blockquote" }, [$("p", {}, ho(e.text))]), t === "" ? null : $("figcaption", { class: "blockquote-footer" }, [t])]);
	},
	card(e) {
		let t = co(lo(e.title)), n = co(lo(e.text)), r = co(lo(e.linkLabel)), i = _o(e.linkUrl);
		return $("div", { class: go("card", e.class) }, [vo(e, "image", "card-img-top", "(min-width: 768px) 33vw, 100vw"), $("div", { class: "card-body" }, [
			t === "" ? null : $("h3", { class: "card-title h5" }, [t]),
			n === "" ? null : $("p", { class: "card-text" }, ho(n)),
			oo,
			r === "" || i === "" ? null : $("a", {
				href: i,
				class: "btn btn-primary"
			}, [r])
		])]);
	},
	gallery(e) {
		let t = Number(mo(uo(e.columns ?? "3"), [
			"3",
			"2",
			"4"
		])), n = `(min-width: 768px) ${Math.floor(100 / t)}vw, 50vw`, r = (Array.isArray(e.items) ? e.items : []).filter((e) => typeof e == "object" && !!e && !Array.isArray(e)).slice(0, 60);
		return $("div", { class: go("cms-gallery row g-3", e.class) }, r.map((e) => {
			let r = vo(e, "image", "img-fluid rounded", n), i = co(lo(e.caption));
			return r === null ? null : $("figure", { class: `col-6 col-md-${12 / t} m-0` }, [r, i === "" ? null : $("figcaption", { class: "small text-muted mt-1" }, [i])]);
		}));
	},
	video(e) {
		let t = me(e.url);
		if (!t) return null;
		let n = co(lo(e.title)) || "Video", r = co(lo(e.playLabel)) || "Play video";
		return $("figure", { class: go("cms-video", e.class) }, [$("div", {
			class: "ratio ratio-16x9 cms-video-frame",
			"data-cms-video": t.embed,
			"data-cms-video-title": n,
			style: yo(e.poster)
		}, [$("button", {
			type: "button",
			class: "cms-video-play btn btn-dark"
		}, [r, $("span", { class: "visually-hidden" }, [`: ${n}`])])]), $("figcaption", { class: "small mt-1" }, [$("a", {
			href: t.watch,
			rel: "noopener",
			target: "_blank"
		}, [n])])]);
	}
}, jo = "/* ceiba-cms component styles (plan 05-C); the site design and custom CSS come after and may override them. */\n.cms-accordion-item{border:1px solid var(--bs-border-color,#dee2e6);border-radius:.375rem;margin-bottom:.5rem}\n.cms-accordion-title{cursor:pointer;font-weight:600;padding:.75rem 1rem}\n.cms-accordion-body{padding:0 1rem 1rem}\n.cms-carousel{position:relative}\n.cms-carousel-track{display:flex;gap:1rem;overflow-x:auto;scroll-snap-type:x mandatory}\n.cms-carousel-slide{flex:0 0 100%;scroll-snap-align:start}\n.cms-carousel[data-ready] .cms-carousel-track{overflow:hidden}\n.cms-carousel-controls{display:flex;gap:.5rem;justify-content:center;margin-top:.5rem}\n.cms-video-frame{background:#111 center/cover no-repeat}\n.cms-video-frame>.cms-video-play{top:50%;left:50%;width:auto;height:auto;transform:translate(-50%,-50%)}\n@media (prefers-reduced-motion:no-preference){.cms-carousel-track{scroll-behavior:smooth}}", Mo = /* @__PURE__ */ new Set(["src", "image"]), No = (e) => e == null || e === "" || e === 0 || e === !1 || e === "0", Po = (e, t, n = 0) => {
	let r = { ...e };
	for (let [i, a] of Object.entries(e)) {
		if (typeof a != "object" || !a) continue;
		if (!Ie(a)) {
			n < 8 && (r[i] = Array.isArray(a) ? a.map((e) => typeof e == "object" && e && !Array.isArray(e) ? Po(e, t, n + 1) : e) : Po(a, t, n + 1));
			continue;
		}
		let e = t[a.asset];
		r[i] = e?.url ?? "", e && Mo.has(i) && (r = Fo(r, e, a.alt));
	}
	return r;
}, Fo = (e, t, n) => {
	let r = typeof e.alt == "string" ? co(e.alt) : "", i = {
		...e,
		alt: n === void 0 ? r === "" ? t.alt : r : co(n)
	};
	return (e.srcset === void 0 || e.srcset === null) && t.srcset !== "" && (i.srcset = t.srcset), No(e.width) && No(e.height) && t.width !== null && t.height !== null && (i.width = t.width, i.height = t.height), i;
}, Io = /* @__PURE__ */ new Set(/* @__PURE__ */ "div.section.article.header.footer.nav.main.aside.h1.h2.h3.h4.h5.h6.p.span.strong.em.small.a.ul.ol.li.blockquote.figure.figcaption.code.pre.hr.br.img.label".split(".")), Lo = /* @__PURE__ */ new WeakMap(), Ro = (e) => {
	let t = e.fields.props;
	return typeof t == "object" && t && !Array.isArray(t) ? t : {};
}, zo = (e, t) => {
	let n = e.createElement("div");
	return n.className = "ceiba-placeholder", n.textContent = t, n;
}, Bo = (e, t, n, r, i, a = {}) => {
	let o = Po({
		...Ro(t),
		...a
	}, i), s = r ? Ao[t.type] : void 0;
	if (s) {
		let r = s(o);
		if (r === null) return zo(e, t.type === "image" ? n.emptyImage : n.empty(t.type));
		let { el: i, slot: a } = so(e, r);
		return (a.parent !== i || a.before !== null) && Lo.set(i, a), i.tagName === "DETAILS" && i.setAttribute("open", ""), i.classList.contains("cms-site-menu") && (i.textContent = n.menu(i.dataset.cmsMenu ?? "")), i;
	}
	let c = (t, n = "") => {
		let r = e.createElement(t), i = `${n} ${Ja(o.class)}`.trim();
		return i && (r.className = i), r;
	};
	switch (t.type) {
		case "container": return c("div", o.fluid ? "container-fluid" : "container");
		case "row": {
			let e = Ja(Xa(o.gutter));
			return c("div", `row ${/^[0-5]$/.test(e) ? `g-${e}` : e || "g-0"}`);
		}
		case "col": {
			let e = [
				"sm",
				"md",
				"lg",
				"xl"
			].map((e) => Number(o[e]) > 0 ? `col-${e}-${Number(o[e])}` : ""), t = o.xs === void 0 ? 12 : Number(o.xs);
			return c("div", [t > 0 ? `col-${t}` : "col", ...e].join(" ").replace(/\s+/g, " ").trim());
		}
		case "heading": {
			let e = c(`h${Math.min(6, Math.max(1, Number(o.level) || 2))}`);
			return e.textContent = Xa(o.text), e;
		}
		case "text": {
			let e = c("p");
			return e.textContent = Xa(o.content), e;
		}
		case "img": {
			let t = qa(o.src);
			if (t === "") return zo(e, n.emptyImage);
			let r = c("img");
			return r.src = t, r.alt = Xa(o.alt), r;
		}
		case "button": {
			let e = c("a", "btn btn-primary");
			return e.href = qa(o.url) || "#", e.textContent = Xa(o.label), e;
		}
		case "html": return zo(e, n.html);
	}
	if (!r || !Io.has(t.type)) return zo(e, n.unknown(t.type));
	let l = c(t.type);
	return t.type === "a" && (l.href = qa(o.href) || "#"), o.content !== void 0 && l.append(e.createTextNode(Xa(o.content))), l;
}, Vo = (e, t, n, r, i, a, o = {}, s = {}) => {
	let c = (l) => {
		let u = t.nodes[l];
		if (!u) return null;
		let d = Bo(e, u, i, n.has(u.type), o, s[l]);
		d.dataset.ceibaId = l;
		let f = u.fields.styles;
		if (a && typeof f == "object" && f && !Array.isArray(f) && d.classList.add(...Ze(l, f, a)), l === r && (d.dataset.ceibaSelected = ""), ro(u.type) && (d.dataset.ceibaMultiline = ""), d.className !== "ceiba-placeholder" && !["IMG", "HR"].includes(d.tagName)) {
			let e = Lo.get(d) ?? {
				parent: d,
				before: null
			};
			for (let t of u.children) {
				let n = c(t);
				n && e.parent.insertBefore(n, e.before);
			}
		}
		return d;
	}, l = t.rootIds.map(c).filter((e) => e !== null);
	e.body.replaceChildren(...l);
}, Ho = /* @__PURE__ */ G("<button type=\"button\" role=\"radio\" class=\"svelte-1cfnx8l\"> </button>"), Uo = /* @__PURE__ */ G("<div class=\"viewport svelte-1cfnx8l\" role=\"radiogroup\"><button type=\"button\" role=\"radio\" class=\"svelte-1cfnx8l\"> </button> <!></div>"), Wo = {
	hash: "svelte-1cfnx8l",
	code: ".viewport.svelte-1cfnx8l {display:flex;flex-wrap:wrap;gap:.25rem;margin-bottom:.5rem;}button.svelte-1cfnx8l {font:inherit;font-size:.75rem;padding:.2rem .5rem;border:1px solid var(--cpb-border);border-radius:999px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button[aria-checked='true'].svelte-1cfnx8l {background:var(--cpb-accent-soft);border-color:var(--cpb-accent);font-weight:600;}button.svelte-1cfnx8l:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Go(e, t) {
	A(t, !0), X(e, Wo);
	let n = Ga(t, "store", 7), r = /* @__PURE__ */ N(() => n().t);
	var i = Uo(), a = I(i), o = I(a, !0);
	k(a), Y(R(a, 2), 17, () => n().design.breakpoints, (e) => e.id, (e, t) => {
		var r = Ho(), i = I(r);
		k(r), z(() => {
			Q(r, "aria-checked", n().viewport === H(t).id), q(i, `${H(t).id ?? ""} · ${H(t).minWidth ?? ""}px`);
		}), U("click", r, () => {
			n().viewport = H(t).id;
		}), K(e, r);
	}), k(i), z((e, t) => {
		Q(i, "aria-label", e), Q(a, "aria-checked", n().viewport === null), q(o, t);
	}, [() => H(r)("viewport.label"), () => H(r)("viewport.base")]), U("click", a, () => {
		n().viewport = null;
	}), K(e, i), j();
}
W(["click"]);
// src/ui/canvas/Canvas.svelte
var Ko = /* @__PURE__ */ G("<div class=\"canvas svelte-1tv0kiv\"><p class=\"help svelte-1tv0kiv\"> </p> <!> <div class=\"stage svelte-1tv0kiv\"><iframe class=\"svelte-1tv0kiv\"></iframe></div></div>"), qo = {
	hash: "svelte-1tv0kiv",
	code: ".canvas.svelte-1tv0kiv {background:var(--cpb-canvas);padding:.5rem 1rem 1rem;min-height:0;display:flex;flex-direction:column;}.help.svelte-1tv0kiv {margin:0 0 .5rem;font-size:.75rem;color:var(--cpb-muted);}.stage.svelte-1tv0kiv {flex:1;overflow:auto;display:flex;justify-content:center;min-height:0;}iframe.svelte-1tv0kiv {flex:none;max-width:none;min-height:480px;height:100%;border:1px solid var(--cpb-border);border-radius:8px;background:#fff;}"
};
function Jo(e, t) {
	A(t, !0), X(e, qo);
	let n = Ga(t, "stylesheets", 19, () => []), r = /* @__PURE__ */ N(() => t.store.t), i = /* @__PURE__ */ P(void 0), a = /* @__PURE__ */ P(!1), o = /* @__PURE__ */ P(null), s = /* @__PURE__ */ N(() => $a(n())), c = /* @__PURE__ */ N(() => t.store.viewport === null ? 375 : t.store.design.breakpoints.find((e) => e.id === t.store.viewport)?.minWidth ?? 375);
	function l(e) {
		let n = e.head.querySelector("style[data-cms-design]");
		n || (n = e.createElement("style"), n.dataset.cmsDesign = "", e.head.append(n)), n.textContent = `${jo}\n${C(t.store.design, ue(t.store.session.toDocument().root), t.store.media.assetUrls).css}`;
	}
	let u = (e) => e?.closest?.("[data-ceiba-id]");
	function d(e) {
		let n = H(i)?.contentDocument, a = t.store.tree.nodes[e], s = a && t.store.catalogue ? no(a, t.store.catalogue) : null, c = n?.querySelector(`[data-ceiba-id="${CSS.escape(e)}"]`);
		if (!n || !a || !s || !c) return !1;
		t.store.select(e), F(o, e, !0);
		let l = ro(a.type);
		c.setAttribute("contenteditable", "plaintext-only"), c.setAttribute("aria-label", H(r)("announce.editing"));
		let u = () => {
			t.store.run({
				kind: "updateProps",
				id: e,
				set: { [s]: io(c.innerText, l) }
			});
		}, d = (n) => {
			c.removeEventListener("input", u), c.removeEventListener("keydown", f), c.removeEventListener("blur", p), c.removeAttribute("contenteditable"), F(o, null), t.store.announce("announce.editDone"), t.onEditEnd(e, n);
		}, f = (e) => {
			(e.key === "Escape" || e.key === "Enter" && (!l || e.ctrlKey || e.metaKey)) && (e.preventDefault(), d(!0));
		}, p = () => d(!1);
		return c.addEventListener("input", u), c.addEventListener("keydown", f), c.addEventListener("blur", p), c.focus(), ao(c), t.store.announce("announce.editing"), !0;
	}
	function f(e) {
		e.addEventListener("click", (e) => {
			e.preventDefault(), H(o) === null && t.store.select(u(e.target)?.dataset.ceibaId ?? null);
		}), e.addEventListener("dblclick", (e) => {
			let t = u(e.target)?.dataset.ceibaId;
			t && H(o) === null && d(t);
		}), e.addEventListener("pointerdown", (e) => {
			let n = u(e.target);
			n?.dataset.ceibaId && H(o) === null && t.drag.pressNode(e, n, n.dataset.ceibaId);
		}), e.addEventListener("submit", (e) => e.preventDefault()), e.addEventListener("auxclick", (e) => e.preventDefault()), e.addEventListener("dragstart", (e) => e.preventDefault());
	}
	function p() {
		let e = H(i)?.contentDocument;
		e && H(i) && (f(e), t.drag.attach(H(i)), F(a, !0));
	}
	qr(() => {
		let e = H(i)?.contentDocument, n = t.store.catalogue, s = t.store.tree, c = t.store.selection, u = t.store.design, d = t.store.media.resolved, f = t.store.data.previews, p = t.store.data.schemas;
		H(a) && e && n && H(o) === null && (t.store.media.ensure(_e(s, u)), t.store.data.ensure(s), Vo(e, s, n, c, {
			unknown: (e) => H(r)("canvas.unknown", { type: e }),
			html: H(r)("canvas.html"),
			emptyImage: H(r)("canvas.emptyImage"),
			empty: (e) => H(r)("canvas.empty", { type: e }),
			menu: (e) => H(r)("canvas.menu", { slug: e || "—" })
		}, u, d, Me(s, f, p)), l(e), c && e.querySelector(`[data-ceiba-id="${CSS.escape(c)}"]`)?.scrollIntoView({ block: "nearest" }));
	});
	var m = { startEditing: d }, h = Ko(), g = I(h), _ = I(g, !0);
	k(g);
	var v = R(g, 2);
	Go(v, { get store() {
		return t.store;
	} });
	var y = R(v, 2), b = I(y);
	let x;
	return Wa(b, (e) => F(i, e), () => H(i)), k(y), k(h), z((e, n) => {
		Q(g, "id", `${t.uid}-canvas-help`), q(_, e), Q(b, "title", n), Q(b, "sandbox", Qa), Q(b, "srcdoc", H(s)), Q(b, "aria-describedby", `${t.uid}-canvas-help`), x = wa(b, "", x, { width: `${H(c)}px` });
	}, [() => H(r)("canvas.help"), () => H(r)("canvas.title")]), qi("load", b, p), Gi(b), K(e, h), j(m);
}
// src/ui/model/insert.ts
var Yo = (e, t) => {
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
}, Xo = (e, t, n) => {
	let r = e.get(t);
	return !r?.isContainer || r.disallowedChildren.includes(n) ? !1 : r.allowedChildren.includes("*") || r.allowedChildren.includes(n);
}, Zo = (e, t, n, r) => {
	let i = n === null ? void 0 : e.nodes[n];
	if (!i) return {
		parent: null,
		index: e.rootIds.length
	};
	if (Xo(t, i.type, r)) return {
		parent: i.id,
		index: i.children.length
	};
	let a = w(e, i.parent);
	return {
		parent: i.parent,
		index: a.indexOf(i.id) + 1
	};
}, Qo = (e) => {
	let { id: t, _id: n, children: r, ...i } = e;
	return {
		...i,
		children: (r ?? []).map(Qo)
	};
}, $o = class {
	store;
	#e = /* @__PURE__ */ P([]);
	get templates() {
		return H(this.#e);
	}
	set templates(e) {
		F(this.#e, e);
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
		let i = Zo(this.store.tree, n, this.store.selection, r.type), a = this.store.session.commandContext;
		if (!a) return !1;
		try {
			e.reduce((e, t, n) => d(e, {
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
				nodes: [Qo(i)]
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
}, es = /* @__PURE__ */ G("<dialog class=\"svelte-o2xhl0\"><form method=\"dialog\" class=\"svelte-o2xhl0\"><h2 class=\"svelte-o2xhl0\"> </h2> <!> <div class=\"actions svelte-o2xhl0\"><button type=\"button\" class=\"svelte-o2xhl0\"> </button> <button type=\"submit\" class=\"primary svelte-o2xhl0\"> </button></div></form></dialog>"), ts = {
	hash: "svelte-o2xhl0",
	code: "dialog.svelte-o2xhl0 {border:1px solid var(--cpb-border);border-radius:10px;padding:1rem;width:min(560px, 90vw);color:inherit;font:inherit;}dialog.svelte-o2xhl0::backdrop {background:rgb(15 23 42 / .45);}h2.svelte-o2xhl0 {font-size:1rem;margin:0 0 .75rem;}.actions.svelte-o2xhl0 {display:flex;justify-content:flex-end;gap:.5rem;margin-top:1rem;}button.svelte-o2xhl0 {font:inherit;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.primary.svelte-o2xhl0 {background:var(--cpb-accent);border-color:var(--cpb-accent);color:#fff;}button.svelte-o2xhl0:disabled {opacity:.5;}.svelte-o2xhl0:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function ns(e, t) {
	A(t, !0), X(e, ts);
	let n = Ga(t, "open", 15, !1), r = Ga(t, "busy", 3, !1), i = /* @__PURE__ */ P(void 0), a = null;
	qr(() => {
		H(i) && (n() && !H(i).open ? (a = H(i).getRootNode().activeElement, H(i).showModal()) : !n() && H(i).open && H(i).close());
	});
	var o = es(), s = I(o), c = I(s), l = I(c, !0);
	k(c);
	var u = R(c, 2);
	ya(u, () => t.children);
	var d = R(u, 2), f = I(d), p = I(f, !0);
	k(f);
	var m = R(f, 2), h = I(m, !0);
	k(m), k(d), k(s), k(o), Wa(o, (e) => F(i, e), () => H(i)), z(() => {
		Q(o, "aria-labelledby", `${t.uid}-title`), Q(c, "id", `${t.uid}-title`), q(l, t.title), q(p, t.cancelLabel), m.disabled = r(), q(h, t.submitLabel);
	}), qi("close", o, () => {
		n(!1), a?.focus?.();
	}), qi("submit", s, (e) => {
		e.preventDefault(), t.onSubmit();
	}), U("click", f, () => {
		n(!1);
	}), K(e, o), j();
}
W(["click"]);
// src/ui/content/ImportDialog.svelte
var rs = /* @__PURE__ */ G("<p class=\"help svelte-c6zkzf\"> </p> <label class=\"svelte-c6zkzf\"> </label> <textarea rows=\"10\" spellcheck=\"false\" class=\"svelte-c6zkzf\"></textarea>", 1), is = {
	hash: "svelte-c6zkzf",
	code: ".help.svelte-c6zkzf {font-size:.8rem;margin:0 0 .5rem;}label.svelte-c6zkzf {display:block;font-size:.8rem;font-weight:600;margin-bottom:.25rem;}textarea.svelte-c6zkzf {width:100%;box-sizing:border-box;font:12px/1.4 ui-monospace, monospace;padding:.5rem;border:1px solid var(--cpb-border);border-radius:6px;}"
};
function as(e, t) {
	A(t, !0), X(e, is);
	let n = Ga(t, "open", 15, !1), r = /* @__PURE__ */ N(() => t.store.t), i = /* @__PURE__ */ P(""), a = /* @__PURE__ */ P(!1);
	async function o() {
		if (H(i).trim() === "") return;
		F(a, !0);
		let e = await t.content.importHtml(H(i));
		F(a, !1), e !== null && (e > 0 && t.store.announce("import.warnings", { count: e }), F(i, ""), n(!1));
	}
	{
		let s = /* @__PURE__ */ N(() => H(r)("import.title")), c = /* @__PURE__ */ N(() => `${t.uid}-import`), l = /* @__PURE__ */ N(() => H(r)("import.submit")), u = /* @__PURE__ */ N(() => H(r)("dialog.cancel"));
		ns(e, {
			get title() {
				return H(s);
			},
			get uid() {
				return H(c);
			},
			get submitLabel() {
				return H(l);
			},
			get cancelLabel() {
				return H(u);
			},
			get busy() {
				return H(a);
			},
			onSubmit: o,
			get open() {
				return n();
			},
			set open(e) {
				n(e);
			},
			children: (e, n) => {
				var a = rs(), o = L(a), s = I(o, !0);
				k(o);
				var c = R(o, 2), l = I(c, !0);
				k(c);
				var u = R(c, 2);
				Lr(u), z((e, n) => {
					q(s, e), Q(c, "for", `${t.uid}-import-html`), q(l, n), Q(u, "id", `${t.uid}-import-html`);
				}, [() => H(r)("import.help"), () => H(r)("import.field")]), za(u, () => H(i), (e) => F(i, e)), K(e, a);
			},
			$$slots: { default: !0 }
		});
	}
	j();
}
// src/ui/design/ops.ts
var os = /^[a-z][a-z0-9-]*(?:\.[a-z0-9-]+)*$/, ss = /^[a-z][a-z0-9-]{0,40}$/, cs = (e, t, n) => ({
	...e,
	tokens: {
		...e.tokens,
		[t]: n
	}
}), ls = (e, t) => {
	let n = { ...e.tokens };
	return delete n[t], {
		...e,
		tokens: n
	};
}, us = (e, t, n, r = {}) => ({
	...e,
	classes: {
		...e.classes,
		[t]: {
			name: n,
			styles: e.classes[t]?.styles ?? r
		}
	}
}), ds = (e, t, n) => {
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
}, fs = (e, t) => {
	let n = { ...e.classes };
	return delete n[t], {
		...e,
		classes: n
	};
}, ps = (e, t) => ({
	...e,
	breakpoints: t
}), ms = (e, t) => JSON.stringify(e ?? {}).includes(`{"token":${JSON.stringify(t)}}`), hs = (e, t) => [...Object.entries(e.tokens).filter(([e, n]) => e !== t && typeof n.value == "object" && n.value.token === t).map(([e]) => `token ${e}`), ...Object.entries(e.classes).filter(([, e]) => ms(e.styles, t)).map(([e, t]) => `class ${t.name ?? e}`)], gs = /* @__PURE__ */ G("<li class=\"svelte-l0fwje\"><code class=\"svelte-l0fwje\"> </code> <label class=\"svelte-l0fwje\"> <input type=\"number\" min=\"1\" max=\"4000\" class=\"svelte-l0fwje\"/></label></li>"), _s = /* @__PURE__ */ G("<ul class=\"svelte-l0fwje\"></ul>"), vs = {
	hash: "svelte-l0fwje",
	code: "ul.svelte-l0fwje {list-style:none;margin:0;padding:0;display:grid;gap:.35rem;}li.svelte-l0fwje {display:flex;align-items:center;gap:.5rem;font-size:.8rem;}label.svelte-l0fwje {display:flex;align-items:center;gap:.35rem;}input.svelte-l0fwje {width:6rem;font:inherit;font-size:.8rem;padding:.2rem .35rem;border:1px solid var(--cpb-border);border-radius:5px;}.svelte-l0fwje:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function ys(e, t) {
	A(t, !0), X(e, vs);
	let n = /* @__PURE__ */ N(() => t.store.t);
	function r(e, n) {
		let r = Number(n);
		Number.isInteger(r) && t.store.designSession.update(ps(t.store.design, t.store.design.breakpoints.map((t) => t.id === e ? {
			...t,
			minWidth: r
		} : t)));
	}
	var i = _s();
	Y(i, 21, () => t.store.design.breakpoints, (e) => e.id, (e, t) => {
		var i = gs(), a = I(i), o = I(a, !0);
		k(a);
		var s = R(a, 2), c = I(s), l = R(c);
		Z(l), k(s), k(i), z((e) => {
			q(o, H(t).id), q(c, `${e ?? ""} `), Na(l, H(t).minWidth);
		}, [() => H(n)("design.minWidth")]), U("change", l, (e) => r(H(t).id, e.currentTarget.value)), K(e, i);
	}), k(i), K(e, i), j();
}
W(["change"]);
// src/ui/styles/groups.ts
var bs = [
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
		properties: [
			"backgroundColor",
			"backgroundImage",
			"backgroundSize",
			"backgroundPosition",
			"backgroundRepeat"
		]
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
], xs = (e) => {
	let t = e.replace(/([A-Z])/g, " $1").toLowerCase();
	return t.charAt(0).toUpperCase() + t.slice(1);
}, Ss = (e, t) => {
	let n = t.trim();
	return (e === "number" || e === "lineHeight") && /^-?(\d+\.?\d*|\.\d+)$/.test(n) ? Number(n) : n;
}, Cs = /* @__PURE__ */ G("<img alt=\"\" class=\"thumb svelte-18w86nj\"/>"), ws = /* @__PURE__ */ G("<span class=\"thumb missing svelte-18w86nj\"> </span>"), Ts = /* @__PURE__ */ G("<span class=\"legacy svelte-18w86nj\"> </span>"), Es = /* @__PURE__ */ G("<button type=\"button\" class=\"svelte-18w86nj\">×</button>"), Ds = /* @__PURE__ */ G("<label class=\"svelte-18w86nj\"> </label> <input type=\"text\" class=\"svelte-18w86nj\"/>", 1), Os = /* @__PURE__ */ G("<label class=\"check svelte-18w86nj\"><input type=\"checkbox\" class=\"svelte-18w86nj\"/> </label> <!>", 1), ks = /* @__PURE__ */ G("<div class=\"picker svelte-18w86nj\" role=\"group\"><span class=\"label svelte-18w86nj\"> </span> <div class=\"row svelte-18w86nj\"><!> <!> <button type=\"button\" class=\"svelte-18w86nj\"> </button> <!></div> <!></div>"), As = {
	hash: "svelte-18w86nj",
	code: ".picker.svelte-18w86nj {display:grid;gap:.25rem;margin-bottom:.75rem;}.label.svelte-18w86nj, label.svelte-18w86nj {font-size:.8rem;font-weight:600;}.check.svelte-18w86nj {font-weight:400;display:flex;gap:.35rem;align-items:center;}.row.svelte-18w86nj {display:flex;gap:.35rem;align-items:center;}.thumb.svelte-18w86nj {width:48px;height:48px;object-fit:cover;border-radius:6px;border:1px solid var(--cpb-border);}.missing.svelte-18w86nj {display:grid;place-items:center;font-size:.6rem;color:var(--cpb-danger);text-align:center;}.legacy.svelte-18w86nj {flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:.75rem;color:var(--cpb-muted);}button.svelte-18w86nj, input[type='text'].svelte-18w86nj {font:inherit;font-size:.8rem;padding:.3rem .6rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}button.svelte-18w86nj {cursor:pointer;}.svelte-18w86nj:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function js(e, t) {
	A(t, !0), X(e, As);
	let n = Ga(t, "withAlt", 3, !1), r = /* @__PURE__ */ N(() => t.store.t), i = /* @__PURE__ */ N(() => Ie(t.value) ? t.value : null), a = /* @__PURE__ */ N(() => H(i) ? t.store.media.resolved[H(i).asset] : void 0), o = /* @__PURE__ */ N(() => typeof t.value == "string" && t.value !== "" ? t.value : null), s = /* @__PURE__ */ N(() => H(i)?.alt === "");
	function c() {
		t.store.media.pick(H(i), (e) => t.onChange(H(i)?.alt === void 0 ? { asset: e.asset } : {
			asset: e.asset,
			alt: H(i).alt
		}));
	}
	function l(e) {
		H(i) && t.onChange(e === void 0 ? { asset: H(i).asset } : {
			asset: H(i).asset,
			alt: e
		});
	}
	var u = ks(), d = I(u), f = I(d, !0);
	k(d);
	var p = R(d, 2), m = I(p), h = (e) => {
		var t = Cs();
		z(() => Q(t, "src", H(a).url)), K(e, t);
	}, g = (e) => {
		var t = ws(), n = I(t, !0);
		k(t), z((e) => q(n, e), [() => H(r)("media.missing")]), K(e, t);
	};
	J(m, (e) => {
		H(a) ? e(h) : H(i) && e(g, 1);
	});
	var _ = R(m, 2), v = (e) => {
		var t = Ts(), n = I(t, !0);
		k(t), z(() => {
			Q(t, "title", H(o)), q(n, H(o));
		}), K(e, t);
	};
	J(_, (e) => {
		H(o) && e(v);
	});
	var y = R(_, 2), b = I(y, !0);
	k(y);
	var x = R(y, 2), S = (e) => {
		var n = Es();
		z((e) => Q(n, "aria-label", e), [() => H(r)("media.removeFrom", { field: t.label })]), U("click", n, () => t.onChange(null)), K(e, n);
	};
	J(x, (e) => {
		(H(i) || H(o)) && e(S);
	}), k(p);
	var C = R(p, 2), w = (e) => {
		var n = Os(), o = L(n), c = I(o);
		Z(c);
		var u = R(c);
		k(o);
		var d = R(o, 2), f = (e) => {
			var n = Ds(), o = L(n), s = I(o, !0);
			k(o);
			var c = R(o, 2);
			Z(c), z((e) => {
				Q(o, "for", `${t.id}-alt`), q(s, e), Q(c, "id", `${t.id}-alt`), Na(c, H(i).alt ?? ""), Q(c, "placeholder", H(a)?.alt ?? "");
			}, [() => H(r)("media.useAlt")]), U("change", c, (e) => l(e.currentTarget.value.trim() === "" ? void 0 : e.currentTarget.value)), K(e, n);
		};
		J(d, (e) => {
			H(s) || e(f);
		}), z((e) => {
			Pa(c, H(s)), q(u, ` ${e ?? ""}`);
		}, [() => H(r)("media.decorative")]), U("change", c, (e) => l(e.currentTarget.checked ? "" : void 0)), K(e, n);
	};
	J(C, (e) => {
		H(i) && n() && e(w);
	}), k(u), z((e) => {
		Q(u, "aria-labelledby", `${t.id}-label`), Q(d, "id", `${t.id}-label`), q(f, t.label), Q(y, "id", t.id), q(b, e);
	}, [() => H(i) || H(o) ? H(r)("media.replace") : H(r)("media.choose")]), U("click", y, c), K(e, u), j();
}
W(["click", "change"]);
// src/ui/styles/StyleField.svelte
var Ms = /* @__PURE__ */ G("<option class=\"svelte-91oqxq\"> </option>"), Ns = /* @__PURE__ */ G("<select class=\"svelte-91oqxq\"><option class=\"svelte-91oqxq\"> </option><!></select>"), Ps = /* @__PURE__ */ G("<option class=\"svelte-91oqxq\"> </option>"), Fs = /* @__PURE__ */ G("<select class=\"svelte-91oqxq\"><option class=\"svelte-91oqxq\"> </option><!></select>"), Is = /* @__PURE__ */ G("<input class=\"svelte-91oqxq\"/>"), Ls = /* @__PURE__ */ G("<option class=\"svelte-91oqxq\"> </option>"), Rs = /* @__PURE__ */ G("<select class=\"svelte-91oqxq\"><option class=\"svelte-91oqxq\"> </option><!></select>"), zs = /* @__PURE__ */ G("<button type=\"button\" class=\"remove svelte-91oqxq\">×</button>"), Bs = /* @__PURE__ */ G("<p class=\"error svelte-91oqxq\" role=\"alert\"> </p>"), Vs = /* @__PURE__ */ G("<p class=\"origin svelte-91oqxq\"> </p>"), Hs = /* @__PURE__ */ G("<div class=\"field svelte-91oqxq\"><label class=\"svelte-91oqxq\"> </label> <div class=\"row svelte-91oqxq\"><!> <!> <!></div> <!></div>"), Us = {
	hash: "svelte-91oqxq",
	code: ".field.svelte-91oqxq {display:grid;gap:.2rem;margin:.4rem 0;}label.svelte-91oqxq {font-size:.75rem;font-weight:600;}.row.svelte-91oqxq {display:flex;gap:.25rem;}input.svelte-91oqxq, select.svelte-91oqxq {flex:1;min-width:0;font:inherit;font-size:.8rem;padding:.25rem .4rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}[aria-invalid='true'].svelte-91oqxq {border-color:var(--cpb-danger);}.remove.svelte-91oqxq {font:inherit;padding:0 .5rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);cursor:pointer;}.origin.svelte-91oqxq {margin:0;font-size:.7rem;color:var(--cpb-muted);}.error.svelte-91oqxq {margin:0;font-size:.7rem;color:var(--cpb-danger);}.svelte-91oqxq:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Ws(e, t) {
	A(t, !0), X(e, Us);
	let n = /* @__PURE__ */ N(() => t.store.t), r = /* @__PURE__ */ N(() => oe(t.styles, t.store.design, t.target, t.spec.name)), i = /* @__PURE__ */ N(() => H(r)?.origin === "own" ? H(r).value : void 0), o = /* @__PURE__ */ N(() => a(t.spec)), s = /* @__PURE__ */ N(() => Object.entries(t.store.design.tokens).filter(([, e]) => e.type === H(o)).map(([e]) => e)), c = /* @__PURE__ */ N(() => t.spec.kind === "keyword" ? Te.keywords[t.spec.name] ?? [] : []), l = /* @__PURE__ */ N(() => typeof H(i) == "object" && H(i) !== null && "token" in H(i) ? H(i).token : ""), u = /* @__PURE__ */ N(() => H(i) === void 0 || typeof H(i) == "object" ? "" : String(H(i))), d = (e) => typeof e == "object" ? "token" in e ? `{${e.token}}` : H(n)("media.asset") : String(e), f = /* @__PURE__ */ N(() => !H(r) || H(r).origin === "own" ? null : H(r).origin === "class" ? H(n)("styles.fromClass", { from: H(r).from }) : H(n)("styles.inherited", { from: H(r).from })), p = /* @__PURE__ */ P(null);
	function m(e) {
		e !== null && typeof e != "object" && Ee(t.spec, e) === null ? F(p, H(n)("styles.invalid"), !0) : (F(p, null), t.onSet($e(t.styles, t.target, t.spec.name, e)));
	}
	let h = (e) => m(e.trim() === "" ? null : Ss(t.spec.kind, e));
	var g = ta(), _ = L(g), v = (e) => {
		var n = ta(), r = L(n), a = (e) => {
			{
				let n = /* @__PURE__ */ N(() => xs(t.spec.name));
				js(e, {
					get store() {
						return t.store;
					},
					get id() {
						return t.id;
					},
					get label() {
						return H(n);
					},
					get value() {
						return H(i);
					},
					onChange: (e) => m(e === null || typeof e == "string" ? null : { asset: e.asset })
				});
			}
		};
		J(r, (e) => {
			t.store.media.available && e(a);
		}), K(e, n);
	}, y = (e) => {
		var a = Hs(), o = I(a), g = I(o, !0);
		k(o);
		var _ = R(o, 2), v = I(_), y = (e) => {
			var n = Ns(), i = I(n), a = I(i, !0);
			k(i), i.value = i.__value = "", Y(R(i), 16, () => H(s), (e) => e, (e, t) => {
				var n = Ms(), r = I(n, !0);
				k(n);
				var i = {};
				z(() => {
					q(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
				}), K(e, n);
			}), k(n);
			var o;
			Ea(n), z((e) => {
				Q(n, "id", t.id), q(a, e), o !== (o = H(l)) && (n.value = (n.__value = H(l)) ?? "", Ta(n, H(l)));
			}, [() => H(r) ? d(H(r).value) : "—"]), U("change", n, (e) => m(e.currentTarget.value === "" ? null : { token: e.currentTarget.value })), K(e, n);
		}, b = (e) => {
			var n = Fs(), i = I(n), a = I(i, !0);
			k(i), i.value = i.__value = "", Y(R(i), 16, () => H(c), (e) => e, (e, t) => {
				var n = Ps(), r = I(n, !0);
				k(n);
				var i = {};
				z(() => {
					q(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
				}), K(e, n);
			}), k(n);
			var o;
			Ea(n), z((e) => {
				Q(n, "id", t.id), q(a, e), o !== (o = H(u)) && (n.value = (n.__value = H(u)) ?? "", Ta(n, H(u)));
			}, [() => H(r) ? d(H(r).value) : "—"]), U("change", n, (e) => h(e.currentTarget.value)), K(e, n);
		}, x = (e) => {
			var n = Is();
			Z(n), z((e) => {
				Q(n, "id", t.id), Na(n, H(u)), Q(n, "placeholder", e), Q(n, "aria-invalid", H(p) !== null), Q(n, "aria-describedby", H(p) ? `${t.id}-error` : H(f) ? `${t.id}-origin` : void 0);
			}, [() => H(r) && H(r).origin !== "own" ? d(H(r).value) : ""]), U("change", n, (e) => h(e.currentTarget.value)), K(e, n);
		};
		J(v, (e) => {
			t.spec.kind === "token" ? e(y) : H(c).length > 0 ? e(b, 1) : e(x, -1);
		});
		var S = R(v, 2), C = (e) => {
			var r = Rs(), i = I(r), a = I(i, !0);
			k(i), i.value = i.__value = "", Y(R(i), 16, () => H(s), (e) => e, (e, t) => {
				var n = Ls(), r = I(n, !0);
				k(n);
				var i = {};
				z(() => {
					q(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
				}), K(e, n);
			}), k(r);
			var o;
			Ea(r), z((e, t) => {
				Q(r, "aria-label", e), q(a, t), o !== (o = H(l)) && (r.value = (r.__value = H(l)) ?? "", Ta(r, H(l)));
			}, [() => `${H(n)("styles.token")} · ${xs(t.spec.name)}`, () => H(n)("styles.literal")]), U("change", r, (e) => m(e.currentTarget.value === "" ? null : { token: e.currentTarget.value })), K(e, r);
		};
		J(S, (e) => {
			H(s).length > 0 && t.spec.kind !== "token" && e(C);
		});
		var w = R(S, 2), ee = (e) => {
			var r = zs();
			z((e) => Q(r, "aria-label", e), [() => H(n)("styles.remove", { property: xs(t.spec.name) })]), U("click", r, () => m(null)), K(e, r);
		};
		J(w, (e) => {
			H(i) !== void 0 && e(ee);
		}), k(_);
		var T = R(_, 2), te = (e) => {
			var n = Bs(), r = I(n, !0);
			k(n), z(() => {
				Q(n, "id", `${t.id}-error`), q(r, H(p));
			}), K(e, n);
		}, E = (e) => {
			var n = Vs(), r = I(n, !0);
			k(n), z(() => {
				Q(n, "id", `${t.id}-origin`), q(r, H(f));
			}), K(e, n);
		};
		J(T, (e) => {
			H(p) ? e(te) : H(f) && e(E, 1);
		}), k(a), z((e) => {
			Q(o, "for", t.id), q(g, e);
		}, [() => xs(t.spec.name)]), K(e, a);
	};
	J(_, (e) => {
		t.spec.kind === "image" ? e(v) : e(y, -1);
	}), K(e, g), j();
}
W(["change", "click"]);
// src/ui/styles/StylesPanel.svelte
var Gs = /* @__PURE__ */ G("<option class=\"svelte-tbe6xh\"> </option>"), Ks = /* @__PURE__ */ G("<option class=\"svelte-tbe6xh\"> </option>"), qs = /* @__PURE__ */ G("<details class=\"group svelte-tbe6xh\"><summary class=\"svelte-tbe6xh\"> </summary> <!></details>"), Js = /* @__PURE__ */ G("<details class=\"styles svelte-tbe6xh\" open=\"\"><summary class=\"svelte-tbe6xh\"> </summary> <div class=\"target svelte-tbe6xh\"><label class=\"svelte-tbe6xh\"> </label> <select class=\"svelte-tbe6xh\"><option class=\"svelte-tbe6xh\"> </option><!></select> <label class=\"svelte-tbe6xh\"> </label> <select class=\"svelte-tbe6xh\"><option class=\"svelte-tbe6xh\"> </option><!></select></div> <!> <!></details>"), Ys = {
	hash: "svelte-tbe6xh",
	code: ".styles.svelte-tbe6xh {margin-top:1rem;border-top:1px solid var(--cpb-border);padding-top:.5rem;}summary.svelte-tbe6xh {cursor:pointer;font-size:.8rem;font-weight:700;}.group.svelte-tbe6xh {margin:.35rem 0;padding-left:.25rem;}.group.svelte-tbe6xh summary:where(.svelte-tbe6xh) {font-weight:600;font-size:.78rem;}.target.svelte-tbe6xh {display:grid;grid-template-columns:auto 1fr;gap:.25rem .5rem;align-items:center;margin:.5rem 0;}label.svelte-tbe6xh {font-size:.75rem;font-weight:600;}select.svelte-tbe6xh {font:inherit;font-size:.8rem;padding:.25rem .4rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}.svelte-tbe6xh:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Xs(e, n) {
	A(n, !0), X(e, Ys);
	let r = Ga(n, "store", 7), i = /* @__PURE__ */ N(() => r().t), a = /* @__PURE__ */ N(() => r().styleState === null ? {
		breakpoint: r().viewport,
		state: null
	} : {
		breakpoint: null,
		state: r().styleState
	});
	var o = Js(), s = I(o), c = I(s, !0);
	k(s);
	var l = R(s, 2), u = I(l), d = I(u, !0);
	k(u);
	var f = R(u, 2), p = I(f), m = I(p, !0);
	k(p), p.value = p.__value = "", Y(R(p), 17, () => r().design.breakpoints, (e) => e.id, (e, t) => {
		var n = Gs(), r = I(n);
		k(n);
		var i = {};
		z(() => {
			q(r, `${H(t).id ?? ""} · ${H(t).minWidth ?? ""}px`), i !== (i = H(t).id) && (n.value = (n.__value = H(t).id) ?? "");
		}), K(e, n);
	}), k(f);
	var h;
	Ea(f);
	var g = R(f, 2), _ = I(g, !0);
	k(g);
	var v = R(g, 2), y = I(v), b = I(y, !0);
	k(y), y.value = y.__value = "", Y(R(y), 16, () => Te.states, (e) => e, (e, t) => {
		var n = Ks(), r = I(n, !0);
		k(n);
		var i = {};
		z(() => {
			q(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
		}), K(e, n);
	}), k(v);
	var x;
	Ea(v), k(l);
	var S = R(l, 2);
	ya(S, () => n.children ?? pt), Y(R(S, 2), 17, () => bs, (e) => e.key, (e, o) => {
		var s = qs(), c = I(s), l = I(c, !0);
		k(c), Y(R(c, 2), 16, () => H(o).properties, (e) => e, (e, i) => {
			let o = /* @__PURE__ */ N(() => t.get(i));
			var s = ta(), c = L(s), l = (e) => {
				{
					let t = /* @__PURE__ */ N(() => `${n.uid}-style-${i}`);
					Ws(e, {
						get store() {
							return r();
						},
						get styles() {
							return n.styles;
						},
						get target() {
							return H(a);
						},
						get spec() {
							return H(o);
						},
						get onSet() {
							return n.onSet;
						},
						get id() {
							return H(t);
						}
					});
				}
			};
			J(c, (e) => {
				H(o) && e(l);
			}), K(e, s);
		}), k(s), z((e) => q(l, e), [() => H(i)(H(o).key)]), K(e, s);
	}), k(o), z((e, t, i, a, o) => {
		q(c, e), Q(u, "for", `${n.uid}-bp`), q(d, t), Q(f, "id", `${n.uid}-bp`), q(m, i), h !== (h = r().viewport ?? "") && (f.value = (f.__value = r().viewport ?? "") ?? "", Ta(f, r().viewport ?? "")), Q(g, "for", `${n.uid}-state`), q(_, a), Q(v, "id", `${n.uid}-state`), v.disabled = r().viewport !== null, q(b, o), x !== (x = r().styleState ?? "") && (v.value = (v.__value = r().styleState ?? "") ?? "", Ta(v, r().styleState ?? ""));
	}, [
		() => n.title ?? H(i)("styles.title"),
		() => H(i)("styles.target"),
		() => H(i)("viewport.base"),
		() => H(i)("styles.state"),
		() => H(i)("styles.normal")
	]), U("change", f, (e) => {
		r().viewport = e.currentTarget.value || null, r().styleState = null;
	}), U("change", v, (e) => {
		r().styleState = e.currentTarget.value || null;
	}), K(e, o), j();
}
W(["change"]);
// src/ui/design/ClassesTab.svelte
var Zs = /* @__PURE__ */ G("<li class=\"svelte-9fzp9u\"><input class=\"svelte-9fzp9u\"/> <code class=\"svelte-9fzp9u\"> </code> <button type=\"button\" class=\"svelte-9fzp9u\">✎</button> <button type=\"button\" class=\"svelte-9fzp9u\">×</button></li>"), Qs = /* @__PURE__ */ G("<p class=\"message svelte-9fzp9u\" role=\"alert\"> </p>"), $s = /* @__PURE__ */ G("<ul class=\"svelte-9fzp9u\"></ul> <div class=\"add svelte-9fzp9u\"><input placeholder=\"card\" class=\"svelte-9fzp9u\"/> <input placeholder=\"Card\" class=\"svelte-9fzp9u\"/> <button type=\"button\" class=\"svelte-9fzp9u\"> </button></div> <!> <!>", 1), ec = {
	hash: "svelte-9fzp9u",
	code: "ul.svelte-9fzp9u {list-style:none;margin:0;padding:0;display:grid;gap:.25rem;}li.svelte-9fzp9u {display:grid;grid-template-columns:1fr auto auto auto;gap:.25rem;align-items:center;font-size:.78rem;}input.svelte-9fzp9u {font:inherit;font-size:.78rem;padding:.2rem .35rem;border:1px solid var(--cpb-border);border-radius:5px;min-width:0;}.add.svelte-9fzp9u {display:grid;grid-template-columns:1fr 1fr auto;gap:.25rem;margin-top:.5rem;}button.svelte-9fzp9u {font:inherit;font-size:.78rem;padding:.2rem .5rem;border:1px solid var(--cpb-border);border-radius:5px;background:var(--cpb-surface);cursor:pointer;}button[aria-pressed='true'].svelte-9fzp9u {background:var(--cpb-accent-soft);}.message.svelte-9fzp9u {color:var(--cpb-danger);font-size:.75rem;}.svelte-9fzp9u:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function tc(e, t) {
	A(t, !0), X(e, ec);
	let n = /* @__PURE__ */ N(() => t.store.t), r = /* @__PURE__ */ N(() => Object.entries(t.store.design.classes)), i = /* @__PURE__ */ P(null), a = /* @__PURE__ */ P(""), o = /* @__PURE__ */ P(""), s = /* @__PURE__ */ P(null);
	function c() {
		!ss.test(H(a)) || H(a) in t.store.design.classes ? F(s, H(n)("design.badId"), !0) : (F(s, null), t.store.designSession.update(us(t.store.design, H(a), H(o).trim() || H(a))), F(i, H(a), !0), F(a, ""), F(o, ""));
	}
	async function l(e) {
		let r = await t.store.session.transport.designUsages?.("class", e).catch(() => []) ?? [];
		r.length > 0 ? F(s, H(n)("design.inUse", {
			name: e,
			where: r.map((e) => e.title).join(", ")
		}), !0) : (F(s, null), H(i) === e && F(i, null), t.store.designSession.update(fs(t.store.design, e)));
	}
	var u = $s(), d = L(u);
	Y(d, 21, () => H(r), ([e, t]) => e, (e, r) => {
		var a = /* @__PURE__ */ N(() => gt(H(r), 2));
		let o = () => H(a)[0], s = () => H(a)[1];
		var c = Zs(), u = I(c);
		Z(u);
		var d = R(u, 2), f = I(d);
		k(d);
		var p = R(d, 2), m = R(p, 2);
		k(c), z((e, t, n) => {
			Q(u, "aria-label", e), Na(u, s().name ?? o()), q(f, `.${o() ?? ""}`), Q(p, "aria-pressed", H(i) === o()), Q(p, "aria-label", t), Q(m, "aria-label", n);
		}, [
			() => `${H(n)("design.name")} · ${o()}`,
			() => H(n)("design.edit", { name: s().name ?? o() }),
			() => H(n)("design.delete", { name: s().name ?? o() })
		]), U("change", u, (e) => t.store.designSession.update(us(t.store.design, o(), e.currentTarget.value))), U("click", p, () => {
			F(i, H(i) === o() ? null : o(), !0);
		}), U("click", m, () => l(o())), K(e, c);
	}), k(d);
	var f = R(d, 2), p = I(f);
	Z(p);
	var m = R(p, 2);
	Z(m);
	var h = R(m, 2), g = I(h, !0);
	k(h), k(f);
	var _ = R(f, 2), v = (e) => {
		var t = Qs(), n = I(t, !0);
		k(t), z(() => q(n, H(s))), K(e, t);
	};
	J(_, (e) => {
		H(s) && e(v);
	});
	var y = R(_, 2), b = (e) => {
		let r = /* @__PURE__ */ N(() => H(i));
		{
			let i = /* @__PURE__ */ N(() => `${t.uid}-class`), a = /* @__PURE__ */ N(() => t.store.design.classes[H(r)]?.styles), o = /* @__PURE__ */ N(() => H(n)("design.classStyles", { name: t.store.design.classes[H(r)]?.name ?? H(r) }));
			Xs(e, {
				get store() {
					return t.store;
				},
				get uid() {
					return H(i);
				},
				get styles() {
					return H(a);
				},
				get title() {
					return H(o);
				},
				onSet: (e) => t.store.designSession.update(ds(t.store.design, H(r), e))
			});
		}
	};
	J(y, (e) => {
		H(i) && t.store.design.classes[H(i)] && e(b);
	}), z((e, t, n) => {
		Q(p, "aria-label", e), Q(m, "aria-label", t), q(g, n);
	}, [
		() => H(n)("design.id"),
		() => H(n)("design.name"),
		() => H(n)("design.add")
	]), za(p, () => H(a), (e) => F(a, e)), za(m, () => H(o), (e) => F(o, e)), U("click", h, c), K(e, u), j();
}
W(["change", "click"]);
// src/ui/design/TokensTab.svelte
var nc = /* @__PURE__ */ G("<input class=\"svelte-1v1kt1m\"/>"), rc = /* @__PURE__ */ G("<tr class=\"svelte-1v1kt1m\"><th scope=\"row\" class=\"svelte-1v1kt1m\"> </th><td class=\"svelte-1v1kt1m\"> </td><td class=\"svelte-1v1kt1m\"><!></td><td class=\"svelte-1v1kt1m\"><button type=\"button\" class=\"svelte-1v1kt1m\">×</button></td></tr>"), ic = /* @__PURE__ */ G("<option class=\"svelte-1v1kt1m\"> </option>"), ac = /* @__PURE__ */ G("<p class=\"message svelte-1v1kt1m\" role=\"alert\"> </p>"), oc = /* @__PURE__ */ G("<table class=\"svelte-1v1kt1m\"><thead class=\"svelte-1v1kt1m\"><tr class=\"svelte-1v1kt1m\"><th scope=\"col\" class=\"svelte-1v1kt1m\"> </th><th scope=\"col\" class=\"svelte-1v1kt1m\"> </th><th scope=\"col\" class=\"svelte-1v1kt1m\"> </th><th class=\"svelte-1v1kt1m\"></th></tr></thead><tbody class=\"svelte-1v1kt1m\"></tbody></table> <div class=\"add svelte-1v1kt1m\"><input placeholder=\"color.accent\" class=\"svelte-1v1kt1m\"/> <select class=\"svelte-1v1kt1m\"></select> <input class=\"svelte-1v1kt1m\"/> <button type=\"button\" class=\"svelte-1v1kt1m\"> </button></div> <!>", 1), sc = {
	hash: "svelte-1v1kt1m",
	code: "table.svelte-1v1kt1m {width:100%;border-collapse:collapse;font-size:.78rem;}th.svelte-1v1kt1m, td.svelte-1v1kt1m {text-align:left;padding:.2rem;border-bottom:1px solid var(--cpb-border);}input.svelte-1v1kt1m, select.svelte-1v1kt1m {width:100%;box-sizing:border-box;font:inherit;font-size:.78rem;padding:.2rem .35rem;border:1px solid var(--cpb-border);border-radius:5px;}.add.svelte-1v1kt1m {display:grid;grid-template-columns:1fr auto 1fr auto;gap:.25rem;margin-top:.5rem;}button.svelte-1v1kt1m {font:inherit;font-size:.78rem;padding:.2rem .5rem;border:1px solid var(--cpb-border);border-radius:5px;background:var(--cpb-surface);cursor:pointer;}.message.svelte-1v1kt1m {color:var(--cpb-danger);font-size:.75rem;}.svelte-1v1kt1m:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function cc(e, t) {
	A(t, !0), X(e, sc);
	let n = /* @__PURE__ */ N(() => t.store.t), r = /* @__PURE__ */ N(() => Object.entries(t.store.design.tokens)), i = /* @__PURE__ */ P(""), a = /* @__PURE__ */ P("color"), o = /* @__PURE__ */ P(""), s = /* @__PURE__ */ P(null), c = (e, t) => ee(e, t) !== null;
	function l(e, r) {
		let i = t.store.design.tokens[e];
		i && (c(i.type, r) ? (F(s, null), t.store.designSession.update(cs(t.store.design, e, {
			...i,
			value: r
		}))) : F(s, H(n)("design.badValue"), !0));
	}
	function u() {
		!os.test(H(i)) || H(i) in t.store.design.tokens ? F(s, H(n)("design.badId"), !0) : c(H(a), H(o)) ? (F(s, null), t.store.designSession.update(cs(t.store.design, H(i), {
			type: H(a),
			value: H(o)
		})), F(i, ""), F(o, "")) : F(s, H(n)("design.badValue"), !0);
	}
	async function d(e) {
		let r = await t.store.session.transport.designUsages?.("token", e).catch(() => []) ?? [], i = [...hs(t.store.design, e), ...r.map((e) => e.title)];
		i.length > 0 ? F(s, H(n)("design.inUse", {
			name: e,
			where: i.join(", ")
		}), !0) : (F(s, null), t.store.designSession.update(ls(t.store.design, e)));
	}
	var f = oc(), p = L(f), m = I(p), h = I(m), g = I(h), _ = I(g, !0);
	k(g);
	var v = R(g), y = I(v, !0);
	k(v);
	var b = R(v), x = I(b, !0);
	k(b), un(), k(h), k(m);
	var S = R(m);
	Y(S, 21, () => H(r), ([e, t]) => e, (e, t) => {
		var r = /* @__PURE__ */ N(() => gt(H(t), 2));
		let i = () => H(r)[0], a = () => H(r)[1];
		var o = rc(), s = I(o), c = I(s, !0);
		k(s);
		var u = R(s), f = I(u, !0);
		k(u);
		var p = R(u), m = I(p), h = (e) => {
			var t = nc();
			Z(t), z((e) => {
				Q(t, "aria-label", e), Na(t, a().value);
			}, [() => `${H(n)("design.value")} · ${i()}`]), U("change", t, (e) => l(i(), e.currentTarget.value)), K(e, t);
		}, g = (e) => {
			var t = ea();
			z(() => q(t, `→ ${a().value.token ?? ""}`)), K(e, t);
		};
		J(m, (e) => {
			typeof a().value == "string" ? e(h) : e(g, -1);
		}), k(p);
		var _ = R(p), v = I(_);
		k(_), k(o), z((e) => {
			q(c, i()), q(f, a().type), Q(v, "aria-label", e);
		}, [() => H(n)("design.delete", { name: i() })]), U("click", v, () => d(i())), K(e, o);
	}), k(S), k(p);
	var C = R(p, 2), w = I(C);
	Z(w);
	var T = R(w, 2);
	Y(T, 20, () => Te.tokenTypes, (e) => e, (e, t) => {
		var n = ic(), r = I(n, !0);
		k(n);
		var i = {};
		z(() => {
			q(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
		}), K(e, n);
	}), k(T);
	var te = R(T, 2);
	Z(te);
	var E = R(te, 2), ne = I(E, !0);
	k(E), k(C);
	var re = R(C, 2), ie = (e) => {
		var t = ac(), n = I(t, !0);
		k(t), z(() => q(n, H(s))), K(e, t);
	};
	J(re, (e) => {
		H(s) && e(ie);
	}), z((e, n, r, i, a, o, s) => {
		q(_, e), q(y, n), q(x, r), Q(w, "aria-label", i), Q(T, "aria-label", a), Q(te, "aria-label", o), Q(te, "id", `${t.uid}-token-value`), q(ne, s);
	}, [
		() => H(n)("design.id"),
		() => H(n)("design.type"),
		() => H(n)("design.value"),
		() => H(n)("design.id"),
		() => H(n)("design.type"),
		() => H(n)("design.value"),
		() => H(n)("design.add")
	]), za(w, () => H(i), (e) => F(i, e)), Da(T, () => H(a), (e) => F(a, e)), za(te, () => H(o), (e) => F(o, e)), U("click", E, u), K(e, f), j();
}
W(["change", "click"]);
// src/ui/design/DesignPanel.svelte
var lc = /* @__PURE__ */ G("<button type=\"button\" role=\"tab\" class=\"svelte-m57uux\"> </button>"), uc = /* @__PURE__ */ G("<li class=\"svelte-m57uux\"><code class=\"svelte-m57uux\"> </code> </li>"), dc = /* @__PURE__ */ G("<div class=\"problems svelte-m57uux\" role=\"alert\"><p class=\"svelte-m57uux\"> </p> <ul class=\"svelte-m57uux\"></ul></div>"), fc = /* @__PURE__ */ G("<button type=\"button\" class=\"svelte-m57uux\"> </button>"), pc = /* @__PURE__ */ G("<section class=\"design svelte-m57uux\"><div class=\"head svelte-m57uux\"><h2 class=\"svelte-m57uux\"> </h2> <button type=\"button\" class=\"svelte-m57uux\">×</button></div> <p class=\"meta svelte-m57uux\"> </p> <p class=\"help svelte-m57uux\"> </p> <div class=\"tabs svelte-m57uux\" role=\"tablist\"></div> <div role=\"tabpanel\" class=\"svelte-m57uux\"><!></div> <!> <div class=\"actions svelte-m57uux\"><button type=\"button\" class=\"svelte-m57uux\"> </button> <button type=\"button\" class=\"primary svelte-m57uux\"> </button> <!></div></section>"), mc = {
	hash: "svelte-m57uux",
	code: ".design.svelte-m57uux {padding:.5rem .75rem;overflow:auto;border-left:1px solid var(--cpb-border);display:grid;gap:.5rem;align-content:start;}.head.svelte-m57uux {display:flex;justify-content:space-between;align-items:center;}h2.svelte-m57uux {font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin:0;color:var(--cpb-muted);}.meta.svelte-m57uux, .help.svelte-m57uux {margin:0;font-size:.75rem;color:var(--cpb-muted);}.tabs.svelte-m57uux {display:flex;gap:.25rem;}.tabs.svelte-m57uux button[aria-selected='true']:where(.svelte-m57uux) {background:var(--cpb-accent-soft);border-color:var(--cpb-accent);}.problems.svelte-m57uux {color:var(--cpb-danger);font-size:.75rem;}.problems.svelte-m57uux p:where(.svelte-m57uux) {margin:0;}.actions.svelte-m57uux {display:flex;flex-wrap:wrap;gap:.35rem;}button.svelte-m57uux {font:inherit;font-size:.8rem;padding:.3rem .6rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.primary.svelte-m57uux {background:var(--cpb-accent);border-color:var(--cpb-accent);color:#fff;}button.svelte-m57uux:disabled {opacity:.5;cursor:not-allowed;}.svelte-m57uux:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function hc(e, t) {
	A(t, !0), X(e, mc);
	let n = Ga(t, "store", 7), r = /* @__PURE__ */ N(() => n().t), i = /* @__PURE__ */ P("tokens"), a = /* @__PURE__ */ N(() => C(n().design, []).diagnostics), o = /* @__PURE__ */ N(() => !n().designDirty && n().designPublished !== n().designRevision && n().designRevision > 0 && typeof n().session.transport.publishDesign == "function");
	var s = pc(), c = I(s), l = I(c), u = I(l, !0);
	k(l);
	var d = R(l, 2);
	k(c);
	var f = R(c, 2), p = I(f);
	k(f);
	var m = R(f, 2), h = I(m, !0);
	k(m);
	var g = R(m, 2);
	Y(g, 20, () => [
		["tokens", "design.tokens"],
		["classes", "design.classes"],
		["breakpoints", "design.breakpoints"]
	], ([e, t]) => e, (e, n) => {
		var a = /* @__PURE__ */ N(() => gt(n, 2));
		let o = () => H(a)[0], s = () => H(a)[1];
		var c = lc(), l = I(c, !0);
		k(c), z((e) => {
			Q(c, "aria-selected", H(i) === o()), Q(c, "aria-controls", `${t.uid}-design-${o()}`), q(l, e);
		}, [() => H(r)(s())]), U("click", c, () => {
			F(i, o(), !0);
		}), K(e, c);
	}), k(g);
	var _ = R(g, 2), v = I(_), y = (e) => {
		cc(e, {
			get store() {
				return n();
			},
			get uid() {
				return t.uid;
			}
		});
	}, b = (e) => {
		tc(e, {
			get store() {
				return n();
			},
			get uid() {
				return t.uid;
			}
		});
	}, x = (e) => {
		ys(e, { get store() {
			return n();
		} });
	};
	J(v, (e) => {
		H(i) === "tokens" ? e(y) : H(i) === "classes" ? e(b, 1) : e(x, -1);
	}), k(_);
	var S = R(_, 2), w = (e) => {
		var t = dc(), n = I(t), i = I(n, !0);
		k(n);
		var o = R(n, 2);
		Y(o, 21, () => H(a), (e) => e.path, (e, t) => {
			var n = uc(), r = I(n), i = I(r, !0);
			k(r);
			var a = R(r);
			k(n), z(() => {
				q(i, H(t).path), q(a, ` · ${H(t).code ?? ""}`);
			}), K(e, n);
		}), k(o), k(t), z((e) => q(i, e), [() => H(r)("design.problems")]), K(e, t);
	};
	J(S, (e) => {
		H(a).length > 0 && e(w);
	});
	var ee = R(S, 2), T = I(ee), te = I(T, !0);
	k(T);
	var E = R(T, 2), ne = I(E, !0);
	k(E);
	var re = R(E, 2), ie = (e) => {
		var t = fc(), i = I(t, !0);
		k(t), z((e) => q(i, e), [() => H(r)("design.reload")]), U("click", t, () => n().designAction("reload")), K(e, t);
	};
	J(re, (e) => {
		n().designDirty && e(ie);
	}), k(ee), k(s), z((e, r, c, f, m, g, v) => {
		Q(s, "aria-labelledby", `${t.uid}-design-title`), Q(l, "id", `${t.uid}-design-title`), q(u, e), Q(d, "aria-label", r), q(p, `${c ?? ""} ·
    ${f ?? ""}`), q(h, m), Q(_, "id", `${t.uid}-design-${H(i)}`), T.disabled = !n().designDirty || H(a).length > 0 || !n().designSession.editable, q(te, g), E.disabled = !H(o), q(ne, v);
	}, [
		() => H(r)("design.title"),
		() => H(r)("design.close"),
		() => H(r)("design.revision", { revision: n().designRevision }),
		() => n().designPublished === null ? H(r)("design.notPublished") : H(r)("design.publishedAt", { revision: n().designPublished }),
		() => H(r)("design.help"),
		() => H(r)("design.save"),
		() => H(r)("design.publish")
	]), U("click", d, () => {
		n().designOpen = !1;
	}), U("click", T, () => n().designAction("save")), U("click", E, () => n().designAction("publish")), K(e, s), j();
}
W(["click"]);
// src/ui/content/TemplateDialog.svelte
var gc = /* @__PURE__ */ G("<label class=\"svelte-181fmze\"> </label> <input required=\"\" maxlength=\"200\" class=\"svelte-181fmze\"/> <label class=\"svelte-181fmze\"> </label> <input maxlength=\"100\" class=\"svelte-181fmze\"/>", 1), _c = {
	hash: "svelte-181fmze",
	code: "label.svelte-181fmze {display:block;font-size:.8rem;font-weight:600;margin:.5rem 0 .25rem;}input.svelte-181fmze {width:100%;box-sizing:border-box;font:inherit;padding:.35rem .5rem;border:1px solid var(--cpb-border);border-radius:6px;}"
};
function vc(e, t) {
	A(t, !0), X(e, _c);
	let n = Ga(t, "open", 15, !1), r = /* @__PURE__ */ N(() => t.store.t), i = /* @__PURE__ */ P(""), a = /* @__PURE__ */ P("general"), o = /* @__PURE__ */ P(!1);
	async function s() {
		if (!t.nodeId || H(i).trim() === "") return;
		F(o, !0);
		let e = await t.content.saveTemplate(t.nodeId, H(i).trim(), H(a).trim() || "general");
		F(o, !1), e && (F(i, ""), n(!1));
	}
	{
		let c = /* @__PURE__ */ N(() => H(r)("template.title")), l = /* @__PURE__ */ N(() => `${t.uid}-template`), u = /* @__PURE__ */ N(() => H(r)("template.submit")), d = /* @__PURE__ */ N(() => H(r)("dialog.cancel"));
		ns(e, {
			get title() {
				return H(c);
			},
			get uid() {
				return H(l);
			},
			get submitLabel() {
				return H(u);
			},
			get cancelLabel() {
				return H(d);
			},
			get busy() {
				return H(o);
			},
			onSubmit: s,
			get open() {
				return n();
			},
			set open(e) {
				n(e);
			},
			children: (e, n) => {
				var o = gc(), s = L(o), c = I(s, !0);
				k(s);
				var l = R(s, 2);
				Z(l);
				var u = R(l, 2), d = I(u, !0);
				k(u);
				var f = R(u, 2);
				Z(f), z((e, n) => {
					Q(s, "for", `${t.uid}-template-name`), q(c, e), Q(l, "id", `${t.uid}-template-name`), Q(u, "for", `${t.uid}-template-category`), q(d, n), Q(f, "id", `${t.uid}-template-category`);
				}, [() => H(r)("template.name"), () => H(r)("template.category")]), za(l, () => H(i), (e) => F(i, e)), za(f, () => H(a), (e) => F(a, e)), K(e, o);
			},
			$$slots: { default: !0 }
		});
	}
	j();
}
// src/ui/drag/indicator.ts
var yc = "ceiba-drop-indicator", bc = (e, t, n, r) => {
	let i = e.getElementById(yc);
	i || (i = e.createElement("div"), i.id = yc, i.setAttribute("aria-hidden", "true"), e.body.append(i));
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
}, xc = (e) => {
	e?.getElementById(yc)?.remove();
}, Sc = (e, t, n, r) => {
	let i = t <= 0 ? .5 : (n - e) / t;
	return r ? i < .25 ? "before" : i > .75 ? "after" : "inside" : i < .5 ? "before" : "after";
}, Cc = (e, t, n, r) => t.kind === "move" ? {
	kind: "move",
	id: t.id,
	parent: n,
	index: r
} : {
	kind: "insert",
	parent: n,
	index: r,
	node: t.node
}, wc = (e, t, n, r, i) => {
	let a;
	if (r === null || !e.nodes[r]) a = Cc(e, n, null, e.rootIds.length);
	else if (i === "inside") a = Cc(e, n, r, e.nodes[r]?.children.length ?? 0);
	else {
		let t = e.nodes[r]?.parent ?? null;
		a = Cc(e, n, t, w(e, t).indexOf(r) + +(i === "after"));
	}
	let o = r !== null && e.nodes[r] ? r : null;
	if (n.kind === "move" && a.kind === "move" && Tc(e, n.id, a.parent, a.index)) return {
		command: null,
		anchor: o,
		zone: i,
		refused: null
	};
	try {
		return d(e, a, t), {
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
			refused: e instanceof y ? e.code : "SERVER"
		};
	}
}, Tc = (e, t, n, r) => {
	if (e.nodes[t]?.parent !== n) return !1;
	let i = w(e, n).indexOf(t);
	return r === i || r === i + 1;
}, Ec = 5, Dc = class {
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
			!this.active && Math.hypot(e.clientX - r.x, e.clientY - r.y) < Ec || (this.active || this.begin({
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
			if (!this.active && Math.hypot(e.clientX - i.x, e.clientY - i.y) < Ec) return;
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
		let i = n.elementFromPoint(e, t)?.closest("[data-ceiba-id]") ?? null, a = i?.dataset.ceibaId ?? null, o = a ? this.store.tree.nodes[a] : void 0, s = i?.getBoundingClientRect(), c = o ? this.store.catalogue?.get(o.type)?.isContainer ?? !1 : !1, l = s ? Sc(s.top, s.height, t, c) : "inside";
		this.active.target = wc(this.store.tree, r, this.active.dragged, a, l), bc(n, i, l, this.active.target.refused !== null);
	}
	clearTarget() {
		this.active && (this.active.target = null), xc(this.doc);
	}
	finish(e) {
		let t = this.active;
		if (this.active = null, xc(this.doc), this.frame && (this.frame.style.pointerEvents = ""), this.doc?.body.classList.remove("ceiba-dragging"), document.removeEventListener("keydown", this.onKey, !0), this.doc?.removeEventListener("keydown", this.onKey, !0), !t) return;
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
}, Oc = /* @__PURE__ */ G("<li class=\"svelte-239l1j\"> <button type=\"button\" class=\"svelte-239l1j\">×</button></li>"), kc = /* @__PURE__ */ G("<option class=\"svelte-239l1j\"> </option>"), Ac = /* @__PURE__ */ G("<select class=\"svelte-239l1j\"><option class=\"svelte-239l1j\"> </option><!></select>"), jc = /* @__PURE__ */ G("<div class=\"classes svelte-239l1j\"><label class=\"svelte-239l1j\"> </label> <ul class=\"svelte-239l1j\"></ul> <!></div>"), Mc = {
	hash: "svelte-239l1j",
	code: ".classes.svelte-239l1j {margin:.5rem 0;display:grid;gap:.25rem;}label.svelte-239l1j {font-size:.75rem;font-weight:600;}ul.svelte-239l1j {list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:.25rem;}li.svelte-239l1j {font-size:.75rem;padding:.1rem .2rem .1rem .5rem;border-radius:999px;background:var(--cpb-accent-soft);display:flex;align-items:center;gap:.25rem;}button.svelte-239l1j {font:inherit;border:none;background:none;cursor:pointer;padding:0 .25rem;}select.svelte-239l1j {font:inherit;font-size:.8rem;padding:.25rem .4rem;border:1px solid var(--cpb-border);border-radius:6px;}.svelte-239l1j:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Nc(e, t) {
	A(t, !0), X(e, Mc);
	let n = /* @__PURE__ */ N(() => t.store.t), r = /* @__PURE__ */ N(() => t.node.fields.styles), i = /* @__PURE__ */ N(() => H(r)?.classes ?? []), a = /* @__PURE__ */ N(() => Object.entries(t.store.design.classes).filter(([e]) => !H(i).includes(e)));
	function o(e) {
		let n = qe(H(r), e);
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
	var s = ta(), c = L(s), l = (e) => {
		var r = jc(), s = I(r), c = I(s, !0);
		k(s);
		var l = R(s, 2);
		Y(l, 20, () => H(i), (e) => e, (e, r) => {
			var a = Oc(), s = I(a), c = R(s);
			k(a), z((e) => {
				q(s, `${t.store.design.classes[r]?.name ?? r ?? ""} `), Q(c, "aria-label", e);
			}, [() => H(n)("styles.removeClass", { name: t.store.design.classes[r]?.name ?? r })]), U("click", c, () => o(H(i).filter((e) => e !== r))), K(e, a);
		}), k(l);
		var u = R(l, 2), d = (e) => {
			var r = Ac(), s = I(r), c = I(s, !0);
			k(s), s.value = s.__value = "", Y(R(s), 17, () => H(a), ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ N(() => gt(H(t), 2));
				let r = () => H(n)[0], i = () => H(n)[1];
				var a = kc(), o = I(a, !0);
				k(a);
				var s = {};
				z(() => {
					q(o, i().name ?? r()), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
				}), K(e, a);
			}), k(r), r.value = r.__value = "", z((e) => {
				Q(r, "id", `${t.uid}-add-class`), q(c, e);
			}, [() => H(n)("styles.addClass")]), U("change", r, (e) => {
				e.currentTarget.value && o([...H(i), e.currentTarget.value]);
			}), K(e, r);
		};
		J(u, (e) => {
			H(a).length > 0 && e(d);
		}), k(r), z((e) => {
			Q(s, "for", `${t.uid}-add-class`), q(c, e);
		}, [() => H(n)("styles.classes")]), K(e, r);
	}, u = /* @__PURE__ */ N(() => Object.keys(t.store.design.classes).length > 0);
	J(c, (e) => {
		H(u) && e(l);
	}), K(e, s), j();
}
W(["click", "change"]);
// src/ui/inspector/advanced/loop.ts
var Pc = (e) => typeof e == "object" && e && !Array.isArray(e) ? e : {}, Fc = (e) => {
	let t = Pc(e), n = typeof t.source == "string" ? t.source : "", r = Pc(t.sort);
	return {
		sourceType: "query" in t ? "query" : n.startsWith("module:") ? "module" : n.startsWith("host:") ? "host" : "none",
		module: n.startsWith("module:") ? n.slice(7) : "",
		host: n.startsWith("host:") ? n.slice(5) : "",
		variable: typeof t.variable == "string" ? t.variable : "item",
		key: typeof t.key == "string" ? t.key : "id",
		limit: t.limit === void 0 || t.limit === null ? "" : String(t.limit),
		offset: t.offset === void 0 || t.offset === null ? "" : String(t.offset),
		sortColumn: typeof r.column == "string" ? r.column : "",
		sortDirection: r.direction === "ASC" ? "ASC" : "DESC",
		filters: Object.entries(Pc(t.filters)).map(([e, t]) => `${e}=${String(t)}`).join("\n")
	};
}, Ic = (e) => {
	if (e.trim() === "") return;
	let t = Number(e);
	return Number.isInteger(t) && t >= 0 ? t : null;
}, Lc = (e) => {
	if (e.sourceType === "none") return { loop: null };
	if (e.sourceType === "query") return /^[A-Za-z_][A-Za-z0-9_]{0,40}$/.test(e.variable.trim()) ? { loop: {
		query: "",
		variable: e.variable.trim()
	} } : { error: "loop.variable" };
	let t = (e.sourceType === "module" ? e.module : e.host).trim();
	if (!/^[a-z0-9][a-z0-9_.-]{0,80}$/.test(t)) return { error: "loop.source" };
	if (!/^[A-Za-z_][A-Za-z0-9_]{0,40}$/.test(e.variable.trim())) return { error: "loop.variable" };
	let n = {
		source: `${e.sourceType}:${t}`,
		variable: e.variable.trim(),
		key: e.key.trim() || "id"
	};
	for (let [t, r] of [["limit", e.limit], ["offset", e.offset]]) {
		let e = Ic(r);
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
}, Rc = /* @__PURE__ */ G("<div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input class=\"svelte-1v8f4it\"/></div>"), zc = /* @__PURE__ */ G("<div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input class=\"svelte-1v8f4it\"/></div>"), Bc = /* @__PURE__ */ G("<div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input class=\"svelte-1v8f4it\"/></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input inputmode=\"numeric\" class=\"svelte-1v8f4it\"/></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input inputmode=\"numeric\" class=\"svelte-1v8f4it\"/></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input class=\"svelte-1v8f4it\"/></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label> <select class=\"svelte-1v8f4it\"><option class=\"svelte-1v8f4it\">ASC</option><option class=\"svelte-1v8f4it\">DESC</option></select></div>", 1), Vc = /* @__PURE__ */ G("<div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><textarea rows=\"3\" class=\"svelte-1v8f4it\"></textarea></div>"), Hc = /* @__PURE__ */ G("<div class=\"grid svelte-1v8f4it\"><div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input class=\"svelte-1v8f4it\"/></div> <!></div> <!>", 1), Uc = /* @__PURE__ */ G("<p class=\"error svelte-1v8f4it\" role=\"alert\"> </p>"), Wc = /* @__PURE__ */ G("<details class=\"advanced svelte-1v8f4it\"><summary class=\"svelte-1v8f4it\"> </summary> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label> <select class=\"svelte-1v8f4it\"><option class=\"svelte-1v8f4it\"> </option><option class=\"svelte-1v8f4it\"> </option><option class=\"svelte-1v8f4it\"> </option><option class=\"svelte-1v8f4it\"> </option></select></div> <!> <!> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input class=\"svelte-1v8f4it\"/></div> <!> <button type=\"button\" class=\"svelte-1v8f4it\"> </button></details>"), Gc = {
	hash: "svelte-1v8f4it",
	code: ".advanced.svelte-1v8f4it {margin-top:1rem;border-top:1px solid var(--cpb-border);padding-top:.5rem;}summary.svelte-1v8f4it {cursor:pointer;font-size:.8rem;font-weight:700;}.grid.svelte-1v8f4it {display:grid;grid-template-columns:1fr 1fr;gap:0 .5rem;}.field.svelte-1v8f4it {display:grid;gap:.25rem;margin:.5rem 0;}label.svelte-1v8f4it {font-size:.75rem;font-weight:600;}input.svelte-1v8f4it, select.svelte-1v8f4it, textarea.svelte-1v8f4it {font:inherit;font-size:.8rem;padding:.3rem .45rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}.error.svelte-1v8f4it {color:var(--cpb-danger);font-size:.75rem;margin:0;}button.svelte-1v8f4it {font:inherit;font-size:.8rem;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}.svelte-1v8f4it:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Kc(e, t) {
	A(t, !0), X(e, Gc);
	let n = /* @__PURE__ */ N(() => t.store.t), r = Sr(zi(() => Fc(t.node.fields.loop))), i = /* @__PURE__ */ P(Sr(zi(() => typeof t.node.fields.condition == "string" ? t.node.fields.condition : ""))), a = /* @__PURE__ */ P(null), o = (e) => `${t.uid}-adv-${e}`;
	function s() {
		let e = Lc(r);
		if ("error" in e) {
			F(a, H(n)(e.error), !0);
			return;
		}
		F(a, null);
		let o = {}, s = [];
		e.loop ? o.loop = e.loop : s.push("loop"), H(i).trim() === "" ? s.push("condition") : o.condition = H(i).trim(), t.store.run({
			kind: "updateFields",
			id: t.node.id,
			set: o,
			unset: s
		});
	}
	var c = Wc(), l = I(c), u = I(l, !0);
	k(l);
	var d = R(l, 2), f = I(d), p = I(f, !0);
	k(f);
	var m = R(f, 2), h = I(m), g = I(h, !0);
	k(h), h.value = h.__value = "none";
	var _ = R(h), v = I(_, !0);
	k(_), _.value = _.__value = "query";
	var y = R(_), b = I(y, !0);
	k(y), y.value = y.__value = "module";
	var x = R(y), S = I(x, !0);
	k(x), x.value = x.__value = "host", k(m), k(d);
	var C = R(d, 2), w = (e) => {
		var t = Rc(), i = I(t), a = I(i, !0);
		k(i);
		var s = R(i);
		Z(s), k(t), z((e, t, n) => {
			Q(i, "for", e), q(a, t), Q(s, "id", n);
		}, [
			() => o("module"),
			() => H(n)("advanced.moduleSlug"),
			() => o("module")
		]), za(s, () => r.module, (e) => r.module = e), K(e, t);
	}, ee = (e) => {
		var t = zc(), i = I(t), a = I(i, !0);
		k(i);
		var s = R(i);
		Z(s), k(t), z((e, t, n) => {
			Q(i, "for", e), q(a, t), Q(s, "id", n);
		}, [
			() => o("host"),
			() => H(n)("advanced.hostSource"),
			() => o("host")
		]), za(s, () => r.host, (e) => r.host = e), K(e, t);
	};
	J(C, (e) => {
		r.sourceType === "module" ? e(w) : r.sourceType === "host" && e(ee, 1);
	});
	var T = R(C, 2), te = (e) => {
		var t = Hc(), i = L(t), a = I(i), s = I(a), c = I(s, !0);
		k(s);
		var l = R(s);
		Z(l), k(a);
		var u = R(a, 2), d = (e) => {
			var t = Bc(), i = L(t), a = I(i), s = I(a, !0);
			k(a);
			var c = R(a);
			Z(c), k(i);
			var l = R(i, 2), u = I(l), d = I(u, !0);
			k(u);
			var f = R(u);
			Z(f), k(l);
			var p = R(l, 2), m = I(p), h = I(m, !0);
			k(m);
			var g = R(m);
			Z(g), k(p);
			var _ = R(p, 2), v = I(_), y = I(v, !0);
			k(v);
			var b = R(v);
			Z(b), k(_);
			var x = R(_, 2), S = I(x), C = I(S, !0);
			k(S);
			var w = R(S, 2), ee = I(w);
			ee.value = ee.__value = "ASC";
			var T = R(ee);
			T.value = T.__value = "DESC", k(w), k(x), z((e, t, n, r, i, o, l, p, _, x, ee, T, te, E, ne) => {
				Q(a, "for", e), q(s, t), Q(c, "id", n), Q(u, "for", r), q(d, i), Q(f, "id", o), Q(m, "for", l), q(h, p), Q(g, "id", _), Q(v, "for", x), q(y, ee), Q(b, "id", T), Q(S, "for", te), q(C, E), Q(w, "id", ne);
			}, [
				() => o("key"),
				() => H(n)("advanced.key"),
				() => o("key"),
				() => o("limit"),
				() => H(n)("advanced.limit"),
				() => o("limit"),
				() => o("offset"),
				() => H(n)("advanced.offset"),
				() => o("offset"),
				() => o("sort"),
				() => H(n)("advanced.sort"),
				() => o("sort"),
				() => o("direction"),
				() => H(n)("advanced.direction"),
				() => o("direction")
			]), za(c, () => r.key, (e) => r.key = e), za(f, () => r.limit, (e) => r.limit = e), za(g, () => r.offset, (e) => r.offset = e), za(b, () => r.sortColumn, (e) => r.sortColumn = e), Da(w, () => r.sortDirection, (e) => r.sortDirection = e), K(e, t);
		};
		J(u, (e) => {
			r.sourceType !== "query" && e(d);
		}), k(i);
		var f = R(i, 2), p = (e) => {
			var t = Vc(), i = I(t), a = I(i, !0);
			k(i);
			var s = R(i);
			Lr(s), k(t), z((e, t, n) => {
				Q(i, "for", e), q(a, t), Q(s, "id", n);
			}, [
				() => o("filters"),
				() => H(n)("advanced.filters"),
				() => o("filters")
			]), za(s, () => r.filters, (e) => r.filters = e), K(e, t);
		};
		J(f, (e) => {
			r.sourceType !== "query" && e(p);
		}), z((e, t, n) => {
			Q(s, "for", e), q(c, t), Q(l, "id", n);
		}, [
			() => o("variable"),
			() => H(n)("advanced.variable"),
			() => o("variable")
		]), za(l, () => r.variable, (e) => r.variable = e), K(e, t);
	};
	J(T, (e) => {
		r.sourceType !== "none" && e(te);
	});
	var E = R(T, 2), ne = I(E), re = I(ne, !0);
	k(ne);
	var ie = R(ne);
	Z(ie), k(E);
	var ae = R(E, 2), oe = (e) => {
		var t = Uc(), n = I(t, !0);
		k(t), z(() => q(n, H(a))), K(e, t);
	};
	J(ae, (e) => {
		H(a) && e(oe);
	});
	var se = R(ae, 2), ce = I(se, !0);
	k(se), k(c), z((e, t, n, r, i, a, o, s, c, l, d, h) => {
		q(u, e), Q(f, "for", t), q(p, n), Q(m, "id", r), q(g, i), q(v, a), q(b, o), q(S, s), Q(ne, "for", c), q(re, l), Q(ie, "id", d), q(ce, h);
	}, [
		() => H(n)("advanced.title"),
		() => o("source"),
		() => H(n)("advanced.source"),
		() => o("source"),
		() => H(n)("advanced.none"),
		() => H(n)("advanced.query"),
		() => H(n)("advanced.module"),
		() => H(n)("advanced.host"),
		() => o("condition"),
		() => H(n)("advanced.condition"),
		() => o("condition"),
		() => H(n)("advanced.apply")
	]), Da(m, () => r.sourceType, (e) => r.sourceType = e), za(ie, () => H(i), (e) => F(i, e)), U("click", se, s), K(e, c), j();
}
W(["click"]);
// src/ui/data/BindingsPanel.svelte
var qc = /* @__PURE__ */ G("<option> </option>"), Jc = /* @__PURE__ */ G("<option> </option>"), Yc = /* @__PURE__ */ G("<select class=\"svelte-ioguqj\"><option> </option><!></select> <input class=\"svelte-ioguqj\"/>", 1), Xc = /* @__PURE__ */ G("<div class=\"prop svelte-ioguqj\"><label class=\"svelte-ioguqj\"> </label> <select class=\"svelte-ioguqj\"><option> </option><!><option> </option></select> <!></div>"), Zc = /* @__PURE__ */ G("<section class=\"bindings svelte-ioguqj\"><h3 class=\"svelte-ioguqj\"> </h3> <p class=\"hint svelte-ioguqj\"> </p> <!></section>"), Qc = {
	hash: "svelte-ioguqj",
	code: ".bindings.svelte-ioguqj {border-top:1px solid var(--cpb-border);padding-top:.5rem;margin-top:.5rem;}h3.svelte-ioguqj {font-size:.8rem;margin:0 0 .25rem;}.hint.svelte-ioguqj {font-size:.75rem;color:var(--cpb-muted);margin:0 0 .5rem;}.prop.svelte-ioguqj {display:grid;gap:.25rem;margin-bottom:.6rem;}label.svelte-ioguqj {font-size:.8rem;font-weight:600;}select.svelte-ioguqj, input.svelte-ioguqj {font:inherit;font-size:.85rem;padding:.3rem .45rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}"
};
function $c(e, t) {
	A(t, !0), X(e, Qc);
	let n = /* @__PURE__ */ N(() => t.store.t), r = /* @__PURE__ */ N(() => {
		for (let e = t.node.parent; e !== null; e = t.store.tree.nodes[e]?.parent ?? null) {
			let n = t.store.tree.nodes[e];
			if (n?.type === "query") return n.fields.props ?? {};
		}
		return null;
	}), i = /* @__PURE__ */ N(() => typeof H(r)?.source == "string" ? H(r).source : ""), a = /* @__PURE__ */ N(() => t.store.data.schemas[H(i)] ?? null), o = /* @__PURE__ */ N(() => t.store.catalogue?.get(t.node.type)), s = /* @__PURE__ */ N(() => H(o) ? Pe(H(o).editorControls) : []), c = /* @__PURE__ */ N(() => Ve(t.node.fields.bindings));
	qr(() => {
		H(i) !== "" && t.store.data.schema(H(i));
	});
	function l(e, n) {
		let r = {
			...H(c)[e] ?? { field: "" },
			...n
		};
		for (let e of Object.keys(r)) r[e] === void 0 && delete r[e];
		let i = fe(t.node.fields.bindings, e, r);
		t.store.run(i === null ? {
			kind: "updateFields",
			id: t.node.id,
			set: {},
			unset: ["bindings"]
		} : {
			kind: "updateFields",
			id: t.node.id,
			set: { bindings: i }
		});
	}
	var u = ta(), d = L(u), f = (e) => {
		var r = Zc(), i = I(r), o = I(i, !0);
		k(i);
		var u = R(i, 2), d = I(u, !0);
		k(u), Y(R(u, 2), 16, () => H(s), (e) => e, (e, r) => {
			let i = /* @__PURE__ */ N(() => H(c)[r]);
			var o = Xc(), s = I(o), u = I(s, !0);
			k(s);
			var d = R(s, 2), f = I(d), p = I(f, !0);
			k(f), f.value = f.__value = "";
			var m = R(f);
			Y(m, 17, () => H(a).fields, (e) => e.name, (e, t) => {
				var n = qc(), r = I(n, !0);
				k(n);
				var i = {};
				z(() => {
					q(r, H(t).label), i !== (i = H(t).name) && (n.value = (n.__value = H(t).name) ?? "");
				}), K(e, n);
			});
			var h = R(m), g = I(h, !0);
			k(h), h.value = h.__value = "_url", k(d);
			var _;
			Ea(d);
			var v = R(d, 2), y = (e) => {
				var t = Yc(), a = L(t), o = I(a), s = I(o, !0);
				k(o), o.value = o.__value = "", Y(R(o), 16, () => ce, (e) => e, (e, t) => {
					var n = Jc(), r = I(n, !0);
					k(n);
					var i = {};
					z(() => {
						q(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
					}), K(e, n);
				}), k(a);
				var c;
				Ea(a);
				var u = R(a, 2);
				Z(u), z((e, t, n, r) => {
					Q(a, "aria-label", e), q(s, t), c !== (c = H(i).transform ?? "") && (a.value = (a.__value = H(i).transform ?? "") ?? "", Ta(a, H(i).transform ?? "")), Q(u, "aria-label", n), Q(u, "placeholder", r), Na(u, H(i).fallback ?? "");
				}, [
					() => H(n)("data.transform"),
					() => H(n)("data.noTransform"),
					() => H(n)("data.fallback"),
					() => H(n)("data.fallback")
				]), U("change", a, (e) => l(r, { transform: e.currentTarget.value || void 0 })), U("change", u, (e) => l(r, { fallback: e.currentTarget.value || void 0 })), K(e, t);
			};
			J(v, (e) => {
				H(i) && e(y);
			}), k(o), z((e, n) => {
				Q(s, "for", `${t.uid}-bind-${r}`), q(u, r), Q(d, "id", `${t.uid}-bind-${r}`), q(p, e), q(g, n), _ !== (_ = H(i)?.field ?? "") && (d.value = (d.__value = H(i)?.field ?? "") ?? "", Ta(d, H(i)?.field ?? ""));
			}, [() => H(n)("data.noBinding"), () => H(n)("data.recordUrl")]), U("change", d, (e) => l(r, { field: e.currentTarget.value })), K(e, o);
		}), k(r), z((e, n) => {
			Q(r, "aria-labelledby", `${t.uid}-bind-title`), Q(i, "id", `${t.uid}-bind-title`), q(o, e), q(d, n);
		}, [() => H(n)("data.bindings"), () => H(n)("data.bindingsHint")]), K(e, r);
	};
	J(d, (e) => {
		H(r) && H(a) && H(s).length > 0 && e(f);
	}), K(e, u), j();
}
W(["change"]);
// src/ui/data/QueryRows.svelte
var el = /* @__PURE__ */ G("<option> </option>"), tl = /* @__PURE__ */ G("<option> </option>"), nl = /* @__PURE__ */ G("<option> </option>"), rl = /* @__PURE__ */ G("<select class=\"svelte-xccrf0\"></select>"), il = /* @__PURE__ */ G("<input class=\"svelte-xccrf0\"/>"), al = /* @__PURE__ */ G("<div class=\"row svelte-xccrf0\"><select class=\"svelte-xccrf0\"></select> <select class=\"svelte-xccrf0\"></select> <!> <button type=\"button\" class=\"svelte-xccrf0\"> </button></div>"), ol = /* @__PURE__ */ G("<option> </option>"), sl = /* @__PURE__ */ G("<div class=\"row svelte-xccrf0\"><select class=\"svelte-xccrf0\"></select> <select class=\"svelte-xccrf0\"><option> </option><option> </option></select> <button type=\"button\" class=\"svelte-xccrf0\"> </button></div>"), cl = /* @__PURE__ */ G("<button type=\"button\" class=\"svelte-xccrf0\"> </button>"), ll = /* @__PURE__ */ G("<option> </option>"), ul = /* @__PURE__ */ G("<option> </option>"), dl = /* @__PURE__ */ G("<select class=\"svelte-xccrf0\"></select> <select class=\"svelte-xccrf0\"></select>", 1), fl = /* @__PURE__ */ G("<div class=\"row svelte-xccrf0\"><input size=\"8\" class=\"svelte-xccrf0\"/> <select class=\"svelte-xccrf0\"><option> </option><option> </option></select> <!> <button type=\"button\" class=\"svelte-xccrf0\"> </button></div>"), pl = /* @__PURE__ */ G("<fieldset class=\"svelte-xccrf0\"><legend class=\"svelte-xccrf0\"> </legend> <!> <button type=\"button\" class=\"svelte-xccrf0\"> </button></fieldset> <fieldset class=\"svelte-xccrf0\"><legend class=\"svelte-xccrf0\"> </legend> <!> <!></fieldset> <fieldset class=\"svelte-xccrf0\"><legend class=\"svelte-xccrf0\"> </legend> <!> <button type=\"button\" class=\"svelte-xccrf0\"> </button></fieldset>", 1), ml = {
	hash: "svelte-xccrf0",
	code: "fieldset.svelte-xccrf0 {border:1px solid var(--cpb-border);border-radius:6px;padding:.4rem .5rem;margin:0 0 .6rem;}legend.svelte-xccrf0 {font-size:.75rem;font-weight:700;padding:0 .25rem;}.row.svelte-xccrf0 {display:flex;flex-wrap:wrap;gap:.25rem;margin-bottom:.35rem;}select.svelte-xccrf0, input.svelte-xccrf0, button.svelte-xccrf0 {font:inherit;font-size:.8rem;padding:.2rem .35rem;border:1px solid var(--cpb-border);border-radius:5px;background:var(--cpb-surface);color:inherit;}input.svelte-xccrf0 {min-width:0;flex:1 1 5rem;}"
};
function hl(e, t) {
	A(t, !0), X(e, ml);
	let n = (e) => t.fields.find((t) => t.name === e)?.operators ?? [], r = /* @__PURE__ */ N(() => t.fields.filter((e) => e.sortable)), i = /* @__PURE__ */ N(() => t.fields.filter((e) => e.operators.length > 0)), a = (e) => t.fields.find((t) => t.name === e)?.options ?? [];
	var o = pl(), s = L(o), c = I(s), l = I(c, !0);
	k(c);
	var u = R(c, 2);
	Y(u, 17, () => t.form.filters, ua, (e, r, o) => {
		var s = al(), c = I(s);
		Y(c, 21, () => H(i), (e) => e.name, (e, t) => {
			var n = el(), r = I(n, !0);
			k(n);
			var i = {};
			z(() => {
				q(r, H(t).label), i !== (i = H(t).name) && (n.value = (n.__value = H(t).name) ?? "");
			}), K(e, n);
		}), k(c);
		var l = R(c, 2);
		Y(l, 20, () => n(H(r).field), (e) => e, (e, t) => {
			var n = tl(), r = I(n, !0);
			k(n);
			var i = {};
			z(() => {
				q(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
			}), K(e, n);
		}), k(l);
		var u = R(l, 2), d = (e) => {
			var n = ta(), i = L(n), o = (e) => {
				var n = rl();
				Y(n, 20, () => a(H(r).field), (e) => e, (e, t) => {
					var n = nl(), r = I(n, !0);
					k(n);
					var i = {};
					z(() => {
						q(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
					}), K(e, n);
				}), k(n), z((e) => Q(n, "aria-label", e), [() => t.t("data.value")]), Da(n, () => H(r).value, (e) => H(r).value = e), K(e, n);
			}, s = /* @__PURE__ */ N(() => a(H(r).field).length > 0 && H(r).op !== "in"), c = (e) => {
				var n = il();
				Z(n), z((e) => Q(n, "aria-label", e), [() => t.t("data.value")]), za(n, () => H(r).value, (e) => H(r).value = e), K(e, n);
			};
			J(i, (e) => {
				H(s) ? e(o) : e(c, -1);
			}), K(e, n);
		}, f = /* @__PURE__ */ N(() => !["is_null", "not_null"].includes(H(r).op));
		J(u, (e) => {
			H(f) && e(d);
		});
		var p = R(u, 2), m = I(p, !0);
		k(p), k(s), z((e, n, r) => {
			Q(c, "aria-label", e), Q(c, "id", `${t.uid}-f${o}`), Q(l, "aria-label", n), q(m, r);
		}, [
			() => t.t("data.field"),
			() => t.t("data.operator"),
			() => t.t("data.remove")
		]), Da(c, () => H(r).field, (e) => H(r).field = e), Da(l, () => H(r).op, (e) => H(r).op = e), U("click", p, () => t.form.filters.splice(o, 1)), K(e, s);
	});
	var d = R(u, 2), f = I(d, !0);
	k(d), k(s);
	var p = R(s, 2), m = I(p), h = I(m, !0);
	k(m);
	var g = R(m, 2);
	Y(g, 17, () => t.form.sort, ua, (e, n, i) => {
		var a = sl(), o = I(a);
		Y(o, 21, () => H(r), (e) => e.name, (e, t) => {
			var n = ol(), r = I(n, !0);
			k(n);
			var i = {};
			z(() => {
				q(r, H(t).label), i !== (i = H(t).name) && (n.value = (n.__value = H(t).name) ?? "");
			}), K(e, n);
		}), k(o);
		var s = R(o, 2), c = I(s), l = I(c, !0);
		k(c), c.value = c.__value = "asc";
		var u = R(c), d = I(u, !0);
		k(u), u.value = u.__value = "desc", k(s);
		var f = R(s, 2), p = I(f, !0);
		k(f), k(a), z((e, t, n, r, i) => {
			Q(o, "aria-label", e), Q(s, "aria-label", t), q(l, n), q(d, r), q(p, i);
		}, [
			() => t.t("data.field"),
			() => t.t("data.sort"),
			() => t.t("data.asc"),
			() => t.t("data.desc"),
			() => t.t("data.remove")
		]), Da(o, () => H(n).field, (e) => H(n).field = e), Da(s, () => H(n).direction, (e) => H(n).direction = e), U("click", f, () => t.form.sort.splice(i, 1)), K(e, a);
	});
	var _ = R(g, 2), v = (e) => {
		var n = cl(), i = I(n, !0);
		k(n), z((e) => {
			n.disabled = H(r).length === 0, q(i, e);
		}, [() => t.t("data.add")]), U("click", n, () => t.form.sort.push({
			field: H(r)[0].name,
			direction: "asc"
		})), K(e, n);
	};
	J(_, (e) => {
		t.form.sort.length < 3 && e(v);
	}), k(p);
	var y = R(p, 2), b = I(y), x = I(b, !0);
	k(b);
	var S = R(b, 2);
	Y(S, 17, () => t.form.urlParams, ua, (e, r, a) => {
		var o = fl(), s = I(o);
		Z(s);
		var c = R(s, 2), l = I(c), u = I(l, !0);
		k(l), l.value = l.__value = "search";
		var d = R(l), f = I(d, !0);
		k(d), d.value = d.__value = "filter", k(c);
		var p = R(c, 2), m = (e) => {
			var a = dl(), o = L(a);
			Y(o, 21, () => H(i), (e) => e.name, (e, t) => {
				var n = ll(), r = I(n, !0);
				k(n);
				var i = {};
				z(() => {
					q(r, H(t).label), i !== (i = H(t).name) && (n.value = (n.__value = H(t).name) ?? "");
				}), K(e, n);
			}), k(o);
			var s = R(o, 2);
			Y(s, 20, () => n(H(r).field), (e) => e, (e, t) => {
				var n = ul(), r = I(n, !0);
				k(n);
				var i = {};
				z(() => {
					q(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
				}), K(e, n);
			}), k(s), z((e, t) => {
				Q(o, "aria-label", e), Q(s, "aria-label", t);
			}, [() => t.t("data.field"), () => t.t("data.operator")]), Da(o, () => H(r).field, (e) => H(r).field = e), Da(s, () => H(r).op, (e) => H(r).op = e), K(e, a);
		};
		J(p, (e) => {
			H(r).target === "filter" && e(m);
		});
		var h = R(p, 2), g = I(h, !0);
		k(h), k(o), z((e, t, n, r, i) => {
			Q(s, "aria-label", e), Q(c, "aria-label", t), q(u, n), q(f, r), q(g, i);
		}, [
			() => t.t("data.param"),
			() => t.t("data.operator"),
			() => t.t("data.search"),
			() => t.t("data.filter"),
			() => t.t("data.remove")
		]), za(s, () => H(r).param, (e) => H(r).param = e), Da(c, () => H(r).target, (e) => H(r).target = e), U("click", h, () => t.form.urlParams.splice(a, 1)), K(e, o);
	});
	var C = R(S, 2), w = I(C, !0);
	k(C), k(y), z((e, t, n, r, a) => {
		q(l, e), d.disabled = H(i).length === 0, q(f, t), q(h, n), q(x, r), q(w, a);
	}, [
		() => t.t("data.filters"),
		() => t.t("data.add"),
		() => t.t("data.sort"),
		() => t.t("data.urlParams"),
		() => t.t("data.add")
	]), U("click", d, () => t.form.filters.push({
		field: H(i)[0].name,
		op: H(i)[0].operators[0],
		value: ""
	})), U("click", C, () => t.form.urlParams.push({
		param: "",
		target: "search",
		field: H(i)[0]?.name ?? "",
		op: "eq"
	})), K(e, o), j();
}
W(["click"]);
// src/ui/data/QueryPanel.svelte
var gl = /* @__PURE__ */ G("<p class=\"hint svelte-1pyotqh\"> </p>"), _l = /* @__PURE__ */ G("<option> </option>"), vl = /* @__PURE__ */ G("<div class=\"field svelte-1pyotqh\"><label class=\"svelte-1pyotqh\"> </label><input class=\"svelte-1pyotqh\"/></div>"), yl = /* @__PURE__ */ G("<p class=\"error svelte-1pyotqh\" role=\"alert\"> </p>"), bl = /* @__PURE__ */ G("<div class=\"field svelte-1pyotqh\"><label class=\"svelte-1pyotqh\"> </label><input class=\"svelte-1pyotqh\"/></div> <div class=\"field svelte-1pyotqh\"><label class=\"svelte-1pyotqh\"> </label> <select class=\"svelte-1pyotqh\"><option> </option><option> </option><!></select></div> <div class=\"field svelte-1pyotqh\"><label class=\"svelte-1pyotqh\"> </label><input inputmode=\"numeric\" class=\"svelte-1pyotqh\"/></div> <label class=\"check svelte-1pyotqh\"><input type=\"checkbox\" class=\"svelte-1pyotqh\"/> </label> <!> <!> <!> <button type=\"button\" class=\"svelte-1pyotqh\"> </button> <p class=\"status svelte-1pyotqh\" role=\"status\"><!></p>", 1), xl = /* @__PURE__ */ G("<section class=\"query svelte-1pyotqh\"><h3 class=\"svelte-1pyotqh\"> </h3> <!></section>"), Sl = {
	hash: "svelte-1pyotqh",
	code: ".query.svelte-1pyotqh {border-top:1px solid var(--cpb-border);padding-top:.5rem;margin-top:.5rem;}h3.svelte-1pyotqh {font-size:.8rem;margin:0 0 .5rem;}.field.svelte-1pyotqh {display:grid;gap:.25rem;margin-bottom:.6rem;}label.svelte-1pyotqh {font-size:.8rem;font-weight:600;}.check.svelte-1pyotqh {display:flex;gap:.35rem;align-items:center;margin-bottom:.6rem;}input.svelte-1pyotqh, select.svelte-1pyotqh, button.svelte-1pyotqh {font:inherit;font-size:.85rem;padding:.3rem .45rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}.hint.svelte-1pyotqh, .status.svelte-1pyotqh {font-size:.8rem;color:var(--cpb-muted);}.error.svelte-1pyotqh {font-size:.8rem;color:var(--cpb-danger);}"
};
function Cl(e, t) {
	A(t, !0), X(e, Sl);
	let n = /* @__PURE__ */ N(() => t.store.t), r = Sr(zi(() => Ge(t.node.fields.props))), i = /* @__PURE__ */ N(() => t.store.data.schemas[r.source] ?? null), a = /* @__PURE__ */ P(null), o = (e) => `${t.uid}-q-${e}`, s = /* @__PURE__ */ N(() => t.node.fields.props ?? {}), c = /* @__PURE__ */ N(() => t.store.data.previews[String(H(s).id ?? "")]), l = /* @__PURE__ */ N(() => t.store.data.errors[String(H(s).id ?? "")]);
	qr(() => {
		t.store.data.loadSources();
	}), qr(() => {
		let e = r.source;
		e !== "" && t.store.data.schema(e);
	});
	function u() {
		let e = Oe(r, H(i));
		"error" in e ? F(a, H(n)(e.error, { row: (e.index ?? 0) + 1 }), !0) : (F(a, null), t.store.run({
			kind: "updateProps",
			id: t.node.id,
			set: {
				...H(s),
				...e.props
			}
		}));
	}
	var d = xl(), f = I(d), p = I(f, !0);
	k(f);
	var m = R(f, 2), h = (e) => {
		var t = gl(), r = I(t, !0);
		k(t), z((e) => q(r, e), [() => H(n)("data.unavailable")]), K(e, t);
	}, g = (e) => {
		var s = bl(), d = L(s), f = I(d), p = I(f, !0);
		k(f);
		var m = R(f);
		Z(m), k(d);
		var h = R(d, 2), g = I(h), _ = I(g, !0);
		k(g);
		var v = R(g, 2), y = I(v), b = I(y, !0);
		k(y), y.value = y.__value = "";
		var x = R(y), S = I(x, !0);
		k(x), x.value = x.__value = "@current", Y(R(x), 17, () => t.store.data.sources ?? [], (e) => e.id, (e, t) => {
			var n = _l(), r = I(n, !0);
			k(n);
			var i = {};
			z(() => {
				q(r, H(t).label), i !== (i = H(t).id) && (n.value = (n.__value = H(t).id) ?? "");
			}), K(e, n);
		}), k(v), k(h);
		var C = R(h, 2), w = I(C), ee = I(w, !0);
		k(w);
		var T = R(w);
		Z(T), k(C);
		var te = R(C, 2), E = I(te);
		Z(E);
		var ne = R(E);
		k(te);
		var re = R(te, 2), ie = (e) => {
			var t = vl(), i = I(t), a = I(i, !0);
			k(i);
			var s = R(i);
			Z(s), k(t), z((e, t, n) => {
				Q(i, "for", e), q(a, t), Q(s, "id", n);
			}, [
				() => o("page"),
				() => H(n)("data.pageParam"),
				() => o("page")
			]), za(s, () => r.pageParam, (e) => r.pageParam = e), K(e, t);
		};
		J(re, (e) => {
			r.pagination && e(ie);
		});
		var ae = R(re, 2), oe = (e) => {
			hl(e, {
				get form() {
					return r;
				},
				get fields() {
					return H(i).fields;
				},
				get t() {
					return H(n);
				},
				get uid() {
					return t.uid;
				}
			});
		};
		J(ae, (e) => {
			H(i) && e(oe);
		});
		var se = R(ae, 2), ce = (e) => {
			var t = yl(), n = I(t, !0);
			k(t), z(() => q(n, H(a))), K(e, t);
		};
		J(se, (e) => {
			H(a) && e(ce);
		});
		var le = R(se, 2), ue = I(le, !0);
		k(le);
		var de = R(le, 2), fe = I(de), pe = (e) => {
			var t = ea();
			z((e) => q(t, e), [() => H(n)("data.previewError", { code: H(l) })]), K(e, t);
		}, me = (e) => {
			var t = ea();
			z((e) => q(t, e), [() => H(n)("data.previewEmpty")]), K(e, t);
		}, he = (e) => {
			var t = ea();
			z((e) => q(t, e), [() => H(n)("data.preview", { count: H(c).pagination.total ?? H(c).items.length })]), K(e, t);
		};
		J(fe, (e) => {
			H(l) ? e(pe) : H(c)?.state === "empty" ? e(me, 1) : H(c) && e(he, 2);
		}), k(de), z((e, t, n, r, i, a, o, s, c, l, u, d, h) => {
			Q(f, "for", e), q(p, t), Q(m, "id", n), Q(g, "for", r), q(_, i), Q(v, "id", a), q(b, o), q(S, s), Q(w, "for", c), q(ee, l), Q(T, "id", u), q(ne, ` ${d ?? ""}`), q(ue, h);
		}, [
			() => o("id"),
			() => H(n)("data.id"),
			() => o("id"),
			() => o("source"),
			() => H(n)("data.source"),
			() => o("source"),
			() => H(n)("data.chooseSource"),
			() => H(n)("data.currentSource"),
			() => o("size"),
			() => H(n)("data.pageSize"),
			() => o("size"),
			() => H(n)("data.pagination"),
			() => H(n)("data.apply")
		]), za(m, () => r.id, (e) => r.id = e), Da(v, () => r.source, (e) => r.source = e), za(T, () => r.pageSize, (e) => r.pageSize = e), Ba(E, () => r.pagination, (e) => r.pagination = e), U("click", le, u), K(e, s);
	};
	J(m, (e) => {
		!t.store.data.available || t.store.data.sources !== null && t.store.data.sources.length === 0 ? e(h) : e(g, -1);
	}), k(d), z((e, t, n) => {
		Q(d, "aria-labelledby", e), Q(f, "id", t), q(p, n);
	}, [
		() => o("title"),
		() => o("title"),
		() => H(n)("data.title")
	]), K(e, d), j();
}
W(["click"]);
// src/ui/inspector/fields.ts
var wl = {
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
	media_picker: "media",
	media: "media",
	lines: "lines",
	media_list: "media_list"
}, Tl = /* @__PURE__ */ new Set([
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
]), El = (e) => e.charAt(0).toUpperCase() + e.slice(1).replace(/[_-]/g, " "), Dl = (e) => {
	let t = [], n = /* @__PURE__ */ new Set();
	for (let [r, i] of Object.entries(e.editorControls)) {
		let e = i, a = e.options?.map(String);
		t.push({
			key: r,
			label: e.label ?? El(r),
			control: wl[e.type ?? ""] ?? "text",
			...a ? { options: a } : {}
		}), n.add(r);
	}
	for (let [r, i] of Object.entries(e.propsSchema)) {
		if (n.has(r)) continue;
		let e = i, a = e.enum?.map(String);
		t.push({
			key: r,
			label: El(r),
			control: a ? "select" : wl[e.type ?? ""] ?? "text",
			...a ? { options: a } : {}
		}), n.add(r);
	}
	return Object.keys(e.propsSchema).length === 0 && Object.keys(e.editorControls).length === 0 && (Tl.has(e.type) && t.push({
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
}, Ol = (e, t) => {
	if (e.control === "checkbox") return { value: t === !0 };
	if (e.control === "lines") return { value: String(t).replace(/\r/g, "").split("\n").filter((e) => e.trim() !== "").slice(0, 100) };
	let n = String(t);
	if (e.control === "number") {
		if (n.trim() === "") return { value: null };
		let e = Number(n);
		return Number.isFinite(e) ? { value: e } : { error: "field.number" };
	}
	return (e.control === "url" || e.control === "media") && n.trim() !== "" && qa(n) === "" ? { error: "field.url" } : e.control === "select" && e.options && !e.options.includes(n) ? { error: "field.option" } : e.control === "select" && e.options?.every((e) => /^\d+$/.test(e)) ? { value: Number(n) } : { value: n };
}, kl = /* @__PURE__ */ G("<label class=\"svelte-1g42mo8\"><input type=\"checkbox\" class=\"svelte-1g42mo8\"/> </label>"), Al = /* @__PURE__ */ G("<textarea rows=\"3\" class=\"svelte-1g42mo8\"></textarea>"), jl = /* @__PURE__ */ G("<option> </option>"), Ml = /* @__PURE__ */ G("<select class=\"svelte-1g42mo8\"></select>"), Nl = /* @__PURE__ */ G("<input class=\"svelte-1g42mo8\"/>"), Pl = /* @__PURE__ */ G("<label class=\"svelte-1g42mo8\"> </label> <!>", 1), Fl = /* @__PURE__ */ G("<p class=\"error svelte-1g42mo8\" role=\"alert\"> </p>"), Il = /* @__PURE__ */ G("<div class=\"field svelte-1g42mo8\"><!> <!></div>"), Ll = {
	hash: "svelte-1g42mo8",
	code: ".field.svelte-1g42mo8 {display:grid;gap:.25rem;margin-bottom:.75rem;}label.svelte-1g42mo8 {font-size:.8rem;font-weight:600;}input.svelte-1g42mo8:not([type='checkbox']), textarea.svelte-1g42mo8, select.svelte-1g42mo8 {font:inherit;font-size:.875rem;padding:.35rem .5rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}[aria-invalid='true'].svelte-1g42mo8 {border-color:var(--cpb-danger);}input.svelte-1g42mo8:focus-visible, textarea.svelte-1g42mo8:focus-visible, select.svelte-1g42mo8:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}.error.svelte-1g42mo8 {color:var(--cpb-danger);font-size:.75rem;margin:0;}"
};
function Rl(e, t) {
	A(t, !0), X(e, Ll);
	let n = /* @__PURE__ */ P(null), r = /* @__PURE__ */ N(() => Array.isArray(t.value) ? t.value.filter((e) => typeof e == "string").join("\n") : t.value === null || t.value === void 0 || typeof t.value == "object" ? "" : String(t.value));
	function i(e) {
		let r = Ol(t.field, e);
		"error" in r ? F(n, t.t(r.error), !0) : (F(n, null), t.onChange(r.value));
	}
	var a = Il(), o = I(a), s = (e) => {
		var n = kl(), r = I(n);
		Z(r);
		var a = R(r);
		k(n), z(() => {
			Q(r, "id", t.id), Pa(r, t.value === !0), q(a, ` ${t.field.label ?? ""}`);
		}), U("change", r, (e) => i(e.currentTarget.checked)), K(e, n);
	}, c = (e) => {
		var a = Pl(), o = L(a), s = I(o, !0);
		k(o);
		var c = R(o, 2), l = (e) => {
			var a = Al();
			Lr(a), z(() => {
				Q(a, "id", t.id), Na(a, H(r)), Q(a, "aria-invalid", H(n) !== null), Q(a, "aria-describedby", H(n) ? `${t.id}-error` : void 0);
			}), U("input", a, (e) => {
				t.field.control !== "lines" && i(e.currentTarget.value);
			}), U("change", a, (e) => {
				t.field.control === "lines" && i(e.currentTarget.value);
			}), K(e, a);
		}, u = (e) => {
			var n = Ml();
			Y(n, 20, () => t.field.options ?? [], (e) => e, (e, t) => {
				var n = jl(), r = I(n, !0);
				k(n);
				var i = {};
				z(() => {
					q(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
				}), K(e, n);
			}), k(n);
			var a;
			Ea(n), z(() => {
				Q(n, "id", t.id), a !== (a = H(r)) && (n.value = (n.__value = H(r)) ?? "", Ta(n, H(r)));
			}), U("change", n, (e) => i(e.currentTarget.value)), K(e, n);
		}, d = (e) => {
			var a = Nl();
			Z(a), z(() => {
				Q(a, "id", t.id), Q(a, "type", t.field.control === "number" ? "number" : t.field.control === "url" || t.field.control === "media" ? "url" : "text"), Na(a, H(r)), Q(a, "aria-invalid", H(n) !== null), Q(a, "aria-describedby", H(n) ? `${t.id}-error` : void 0);
			}), U("input", a, (e) => i(e.currentTarget.value)), K(e, a);
		};
		J(c, (e) => {
			t.field.control === "textarea" || t.field.control === "lines" ? e(l) : t.field.control === "select" ? e(u, 1) : e(d, -1);
		}), z(() => {
			Q(o, "for", t.id), q(s, t.field.label);
		}), K(e, a);
	};
	J(o, (e) => {
		t.field.control === "checkbox" ? e(s) : e(c, -1);
	});
	var l = R(o, 2), u = (e) => {
		var r = Fl(), i = I(r, !0);
		k(r), z(() => {
			Q(r, "id", `${t.id}-error`), q(i, H(n));
		}), K(e, r);
	};
	J(l, (e) => {
		H(n) && e(u);
	}), k(a), K(e, a), j();
}
W(["change", "input"]);
// src/ui/media/GalleryField.svelte
var zl = /* @__PURE__ */ G("<img alt=\"\" class=\"svelte-18w9j5n\"/>"), Bl = /* @__PURE__ */ G("<span class=\"missing svelte-18w9j5n\"> </span>"), Vl = /* @__PURE__ */ G("<div class=\"item svelte-18w9j5n\" role=\"group\"><!> <div class=\"fields svelte-18w9j5n\"><label class=\"svelte-18w9j5n\"> </label> <input type=\"text\" class=\"svelte-18w9j5n\"/> <label class=\"svelte-18w9j5n\"> </label> <input type=\"text\" class=\"svelte-18w9j5n\"/> <div class=\"actions svelte-18w9j5n\"><button type=\"button\" class=\"svelte-18w9j5n\">↑</button> <button type=\"button\" class=\"svelte-18w9j5n\">↓</button> <button type=\"button\" class=\"svelte-18w9j5n\">×</button></div></div></div>"), Hl = /* @__PURE__ */ G("<p class=\"empty svelte-18w9j5n\"> </p>"), Ul = /* @__PURE__ */ G("<fieldset class=\"gallery svelte-18w9j5n\"><legend class=\"svelte-18w9j5n\"> </legend> <!> <button type=\"button\" class=\"svelte-18w9j5n\"> </button></fieldset>"), Wl = {
	hash: "svelte-18w9j5n",
	code: ".gallery.svelte-18w9j5n {border:1px solid var(--cpb-border);border-radius:6px;padding:.4rem .5rem;margin:0 0 .75rem;display:grid;gap:.5rem;}legend.svelte-18w9j5n {font-size:.8rem;font-weight:600;}.item.svelte-18w9j5n {display:grid;grid-template-columns:48px 1fr;gap:.4rem;}img.svelte-18w9j5n, .missing.svelte-18w9j5n {width:48px;height:48px;object-fit:cover;border-radius:6px;border:1px solid var(--cpb-border);font-size:.6rem;}.fields.svelte-18w9j5n {display:grid;gap:.15rem;}label.svelte-18w9j5n {font-size:.7rem;font-weight:600;}.actions.svelte-18w9j5n {display:flex;gap:.25rem;}input.svelte-18w9j5n, button.svelte-18w9j5n {font:inherit;font-size:.8rem;padding:.25rem .45rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}button.svelte-18w9j5n {cursor:pointer;justify-self:start;}button.svelte-18w9j5n:disabled {opacity:.4;}.empty.svelte-18w9j5n {margin:0;font-size:.8rem;color:var(--cpb-muted);}.svelte-18w9j5n:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Gl(e, t) {
	A(t, !0), X(e, Wl);
	let n = /* @__PURE__ */ N(() => t.store.t), r = /* @__PURE__ */ N(() => (Array.isArray(t.value) ? t.value : []).filter((e) => typeof e == "object" && !!e && Ie(e.image)));
	function i(e) {
		t.onChange(e.length === 0 ? null : e);
	}
	function a(e, t) {
		i(H(r).map((n, r) => {
			if (r !== e) return n;
			let i = {
				...n,
				...t
			};
			return i.caption === "" && delete i.caption, i;
		}));
	}
	function o(e, t) {
		let n = [...H(r)], [a] = n.splice(e, 1);
		n.splice(e + t, 0, a), i(n);
	}
	let s = () => t.store.media.pick(null, (e) => i([...H(r), { image: { asset: e.asset } }]));
	var c = Ul(), l = I(c), u = I(l, !0);
	k(l);
	var d = R(l, 2);
	Y(d, 17, () => H(r), ua, (e, s, c) => {
		let l = /* @__PURE__ */ N(() => t.store.media.resolved[H(s).image.asset]), u = /* @__PURE__ */ N(() => c + 1);
		var d = Vl(), f = I(d), p = (e) => {
			var t = zl();
			z(() => Q(t, "src", H(l).url)), K(e, t);
		}, m = (e) => {
			var t = Bl(), r = I(t, !0);
			k(t), z((e) => q(r, e), [() => H(n)("media.missing")]), K(e, t);
		};
		J(f, (e) => {
			H(l) ? e(p) : e(m, -1);
		});
		var h = R(f, 2), g = I(h), _ = I(g, !0);
		k(g);
		var v = R(g, 2);
		Z(v);
		var y = R(v, 2), b = I(y, !0);
		k(y);
		var x = R(y, 2);
		Z(x);
		var S = R(x, 2), C = I(S);
		C.disabled = c === 0;
		var w = R(C, 2), ee = R(w, 2);
		k(S), k(h), k(d), z((e, n, i, a, o, u) => {
			Q(d, "aria-label", e), Q(g, "for", `${t.id}-${c}-caption`), q(_, n), Q(v, "id", `${t.id}-${c}-caption`), Na(v, H(s).caption ?? ""), Q(y, "for", `${t.id}-${c}-alt`), q(b, i), Q(x, "id", `${t.id}-${c}-alt`), Na(x, H(s).image.alt ?? ""), Q(x, "placeholder", H(l)?.alt ?? ""), Q(C, "aria-label", a), Q(w, "aria-label", o), w.disabled = c === H(r).length - 1, Q(ee, "aria-label", u);
		}, [
			() => H(n)("gallery.item", { n: H(u) }),
			() => H(n)("gallery.caption"),
			() => H(n)("media.useAlt"),
			() => H(n)("gallery.up", { n: H(u) }),
			() => H(n)("gallery.down", { n: H(u) }),
			() => H(n)("gallery.remove", { n: H(u) })
		]), U("change", v, (e) => a(c, { caption: e.currentTarget.value.trim() })), U("change", x, (e) => a(c, { image: e.currentTarget.value.trim() === "" ? { asset: H(s).image.asset } : {
			asset: H(s).image.asset,
			alt: e.currentTarget.value
		} })), U("click", C, () => o(c, -1)), U("click", w, () => o(c, 1)), U("click", ee, () => i(H(r).filter((e, t) => t !== c))), K(e, d);
	}, (e) => {
		var r = Hl(), i = I(r, !0);
		k(r), z((e) => {
			Q(r, "id", `${t.id}-empty`), q(i, e);
		}, [() => H(n)("gallery.empty")]), K(e, r);
	});
	var f = R(d, 2), p = I(f, !0);
	k(f), k(c), z((e) => {
		Q(c, "aria-describedby", H(r).length === 0 ? `${t.id}-empty` : void 0), q(u, t.label), Q(f, "id", t.id), q(p, e);
	}, [() => H(n)("gallery.add")]), U("click", f, s), K(e, c), j();
}
W(["change", "click"]);
// src/ui/inspector/Inspector.svelte
var Kl = /* @__PURE__ */ G("<p class=\"hint svelte-2ghsnx\"> </p>"), ql = /* @__PURE__ */ G("<p class=\"locked svelte-2ghsnx\" role=\"note\"> </p>"), Jl = /* @__PURE__ */ G("<!> <!> <!>", 1), Yl = /* @__PURE__ */ G("<button type=\"button\" class=\"svelte-2ghsnx\"> </button>"), Xl = /* @__PURE__ */ G("<p class=\"type svelte-2ghsnx\"> </p> <div class=\"field svelte-2ghsnx\"><label class=\"svelte-2ghsnx\"> </label> <input type=\"text\" class=\"svelte-2ghsnx\"/></div> <!> <!> <div class=\"actions svelte-2ghsnx\"><button type=\"button\" class=\"svelte-2ghsnx\"> </button> <!> <button type=\"button\" class=\"danger svelte-2ghsnx\"> </button></div>", 1), Zl = /* @__PURE__ */ G("<section class=\"inspector svelte-2ghsnx\"><h2 class=\"svelte-2ghsnx\"> </h2> <!></section>"), Ql = {
	hash: "svelte-2ghsnx",
	code: ".inspector.svelte-2ghsnx {padding:.5rem .75rem;overflow:auto;border-left:1px solid var(--cpb-border);}h2.svelte-2ghsnx {font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin:0 0 .5rem;color:var(--cpb-muted);}.hint.svelte-2ghsnx, .locked.svelte-2ghsnx {font-size:.85rem;color:var(--cpb-muted);}.locked.svelte-2ghsnx {color:var(--cpb-danger);}.type.svelte-2ghsnx {font-weight:700;margin:0 0 .75rem;}.field.svelte-2ghsnx {display:grid;gap:.25rem;margin-bottom:.75rem;}label.svelte-2ghsnx {font-size:.8rem;font-weight:600;}input.svelte-2ghsnx {font:inherit;font-size:.875rem;padding:.35rem .5rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}.actions.svelte-2ghsnx {display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1rem;}button.svelte-2ghsnx {font:inherit;font-size:.8rem;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.danger.svelte-2ghsnx {color:var(--cpb-danger);}button.svelte-2ghsnx:focus-visible, input.svelte-2ghsnx:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function $l(e, t) {
	A(t, !0), X(e, Ql);
	let n = Ga(t, "canTemplates", 3, !1), r = /* @__PURE__ */ N(() => t.store.t), i = /* @__PURE__ */ N(() => t.store.selection ? t.store.tree.nodes[t.store.selection] : void 0), a = /* @__PURE__ */ N(() => H(i) ? t.store.catalogue?.get(H(i).type) : void 0), o = /* @__PURE__ */ N(() => H(a) ? Dl(H(a)) : []), s = /* @__PURE__ */ N(() => {
		let e = H(i)?.fields.props;
		return typeof e == "object" && e && !Array.isArray(e) ? e : {};
	});
	function c(e, n) {
		H(i) && (n === null || n === "" ? t.store.run({
			kind: "updateProps",
			id: H(i).id,
			set: {},
			unset: [e]
		}) : t.store.run({
			kind: "updateProps",
			id: H(i).id,
			set: { [e]: n }
		}));
	}
	function l(e) {
		if (!H(i)) return;
		let n = typeof H(i).fields.name == "string" ? H(i).fields.name : null;
		t.store.run({
			kind: "rename",
			id: H(i).id,
			name: n,
			label: e.trim() === "" ? null : e
		});
	}
	function u(e) {
		H(i) && t.store.run(e === null ? {
			kind: "updateFields",
			id: H(i).id,
			set: {},
			unset: ["styles"]
		} : {
			kind: "updateFields",
			id: H(i).id,
			set: { styles: e }
		});
	}
	function d() {
		H(i) && t.store.run({
			kind: "remove",
			id: H(i).id
		}, ["announce.removed"]) && t.onRemoved();
	}
	var f = Zl(), p = I(f), m = I(p, !0);
	k(p);
	var h = R(p, 2), g = (e) => {
		var t = Kl(), n = I(t, !0);
		k(t), z((e) => q(n, e), [() => H(r)("inspector.none")]), K(e, t);
	}, _ = (e) => {
		var f = ta();
		la(L(f), () => H(i).id, (e) => {
			var f = Xl(), p = L(f), m = I(p, !0);
			k(p);
			var h = R(p, 2), g = I(h), _ = I(g, !0);
			k(g);
			var v = R(g, 2);
			Z(v), k(h);
			var y = R(h, 2), b = (e) => {
				var t = ql(), n = I(t, !0);
				k(t), z((e) => q(n, e), [() => H(r)("inspector.locked")]), K(e, t);
			}, x = (e) => {
				Cl(e, {
					get store() {
						return t.store;
					},
					get node() {
						return H(i);
					},
					get uid() {
						return t.uid;
					}
				});
			}, S = (e) => {
				var n = ta();
				Y(L(n), 17, () => H(o), (e) => e.key, (e, n) => {
					var i = ta(), a = L(i), o = (e) => {
						{
							let r = /* @__PURE__ */ N(() => `${t.uid}-prop-${H(n).key}`), i = /* @__PURE__ */ N(() => H(n).key === "src" || H(n).key === "image");
							js(e, {
								get store() {
									return t.store;
								},
								get id() {
									return H(r);
								},
								get label() {
									return H(n).label;
								},
								get value() {
									return H(s)[H(n).key];
								},
								get withAlt() {
									return H(i);
								},
								onChange: (e) => c(H(n).key, e)
							});
						}
					}, l = (e) => {
						var r = ta(), i = L(r), a = (e) => {
							{
								let r = /* @__PURE__ */ N(() => `${t.uid}-prop-${H(n).key}`);
								Gl(e, {
									get store() {
										return t.store;
									},
									get id() {
										return H(r);
									},
									get label() {
										return H(n).label;
									},
									get value() {
										return H(s)[H(n).key];
									},
									onChange: (e) => c(H(n).key, e)
								});
							}
						};
						J(i, (e) => {
							t.store.media.available && e(a);
						}), K(e, r);
					}, u = (e) => {
						{
							let i = /* @__PURE__ */ N(() => `${t.uid}-prop-${H(n).key}`);
							Rl(e, {
								get field() {
									return H(n);
								},
								get t() {
									return H(r);
								},
								get id() {
									return H(i);
								},
								get value() {
									return H(s)[H(n).key];
								},
								onChange: (e) => c(H(n).key, e)
							});
						}
					};
					J(a, (e) => {
						H(n).control === "media" && t.store.media.available ? e(o) : H(n).control === "media_list" ? e(l, 1) : e(u, -1);
					}), K(e, i);
				}), K(e, n);
			};
			J(y, (e) => {
				H(a) ? H(i).type === "query" ? e(x, 1) : e(S, -1) : e(b);
			});
			var C = R(y, 2), w = (e) => {
				var n = Jl(), r = L(n);
				Xs(r, {
					get store() {
						return t.store;
					},
					get uid() {
						return t.uid;
					},
					get styles() {
						return H(i).fields.styles;
					},
					onSet: (e) => u(e),
					children: (e, n) => {
						Nc(e, {
							get store() {
								return t.store;
							},
							get node() {
								return H(i);
							},
							get uid() {
								return t.uid;
							}
						});
					},
					$$slots: { default: !0 }
				});
				var a = R(r, 2);
				$c(a, {
					get store() {
						return t.store;
					},
					get node() {
						return H(i);
					},
					get uid() {
						return t.uid;
					}
				}), Kc(R(a, 2), {
					get store() {
						return t.store;
					},
					get node() {
						return H(i);
					},
					get uid() {
						return t.uid;
					}
				}), K(e, n);
			};
			J(C, (e) => {
				H(a) && e(w);
			});
			var ee = R(C, 2), T = I(ee), te = I(T, !0);
			k(T);
			var E = R(T, 2), ne = (e) => {
				var n = Yl(), i = I(n, !0);
				k(n), z((e) => q(i, e), [() => H(r)("inspector.saveTemplate")]), U("click", n, function(...e) {
					t.onSaveTemplate?.apply(this, e);
				}), K(e, n);
			};
			J(E, (e) => {
				n() && e(ne);
			});
			var re = R(E, 2), ie = I(re, !0);
			k(re), k(ee), z((e, n, r) => {
				q(m, H(a)?.label ?? H(i).type), Q(g, "for", `${t.uid}-name`), q(_, e), Q(v, "id", `${t.uid}-name`), Na(v, typeof H(i).fields.label == "string" ? H(i).fields.label : ""), q(te, n), q(ie, r);
			}, [
				() => H(r)("inspector.name"),
				() => H(r)("inspector.duplicate"),
				() => H(r)("inspector.remove")
			]), U("input", v, (e) => l(e.currentTarget.value)), U("click", T, () => H(i) && t.store.run({
				kind: "duplicate",
				id: H(i).id
			})), U("click", re, d), K(e, f);
		}), K(e, f);
	};
	J(h, (e) => {
		H(i) ? e(_, -1) : e(g);
	}), k(f), z((e) => {
		Q(f, "aria-labelledby", `${t.uid}-inspector-title`), Q(p, "id", `${t.uid}-inspector-title`), q(m, e);
	}, [() => H(r)("inspector.title")]), K(e, f), j();
}
W(["input", "click"]);
// src/ui/media/browser.svelte.ts
var eu = class {
	store;
	#e = /* @__PURE__ */ P([]);
	get items() {
		return H(this.#e);
	}
	set items(e) {
		F(this.#e, e);
	}
	#t = /* @__PURE__ */ P(0);
	get total() {
		return H(this.#t);
	}
	set total(e) {
		F(this.#t, e, !0);
	}
	#n = /* @__PURE__ */ P("");
	get search() {
		return H(this.#n);
	}
	set search(e) {
		F(this.#n, e, !0);
	}
	#r = /* @__PURE__ */ P(!1);
	get loading() {
		return H(this.#r);
	}
	set loading(e) {
		F(this.#r, e, !0);
	}
	#i = /* @__PURE__ */ P(!1);
	get busy() {
		return H(this.#i);
	}
	set busy(e) {
		F(this.#i, e, !0);
	}
	#a = /* @__PURE__ */ P(null);
	get selected() {
		return H(this.#a);
	}
	set selected(e) {
		F(this.#a, e);
	}
	#o = /* @__PURE__ */ P("");
	get error() {
		return H(this.#o);
	}
	set error(e) {
		F(this.#o, e, !0);
	}
	page = 1;
	transport;
	constructor(e) {
		this.store = e, this.transport = e.session.transport;
	}
	get hasMore() {
		return this.items.length < this.total;
	}
	async load(e = !1) {
		if (this.transport.listMedia) {
			this.loading = !0, this.error = "";
			try {
				let t = await this.transport.listMedia(this.search.trim(), e ? this.page + 1 : 1);
				this.page = t.page, this.total = t.total, this.items = e ? [...this.items, ...t.items] : [...t.items];
			} catch (e) {
				this.fail(e);
			} finally {
				this.loading = !1;
			}
		}
	}
	select(e) {
		this.selected = e, this.error = "";
	}
	check(e, t) {
		let n = this.store.t;
		return t && !t.accept.includes(e.type) ? n("media.typeError") : t && e.size > t.maxBytes ? n("media.sizeError", { size: Math.round(t.maxBytes / 1048576) }) : null;
	}
	async upload(e, t) {
		return this.transport.uploadMedia ? this.act(async () => {
			let n = await this.transport.uploadMedia(e, t);
			return this.items = [n, ...this.items], this.total++, this.select(n), this.store.media.remember(n), this.store.announce("media.uploaded", { name: n.filename }), n;
		}) : null;
	}
	async describe(e) {
		let t = this.selected;
		t && this.transport.describeMedia && await this.act(async () => {
			let n = await this.transport.describeMedia(t.id, e);
			this.items = this.items.map((e) => e.id === n.id ? n : e), this.select(n), this.store.media.remember(n), this.store.announce("media.altSaved");
		});
	}
	async remove() {
		let e = this.selected;
		e && this.transport.deleteMedia && await this.act(async () => {
			try {
				await this.transport.deleteMedia(e.id);
			} catch (t) {
				if (t instanceof y && t.code === "MEDIA_IN_USE" && this.transport.mediaUsages) {
					let t = await this.transport.mediaUsages(e.id), n = this.store.t, r = [
						...t.pages.map((e) => `«${e.title || e.pageId}»`),
						...(t.layouts ?? []).map((e) => n("media.layout", { name: e.name || e.layoutId })),
						...t.design ? [n("media.design")] : []
					];
					this.error = this.store.t("media.usedIn", { where: r.join(", ") });
					return;
				}
				throw t;
			}
			this.items = this.items.filter((t) => t.id !== e.id), this.total--, this.select(null), this.store.media.forget(e.id), this.store.announce("media.deleted");
		});
	}
	async act(e) {
		this.busy = !0, this.error = "";
		try {
			return await e();
		} catch (e) {
			return this.fail(e), null;
		} finally {
			this.busy = !1;
		}
	}
	fail(e) {
		let t = this.store.t;
		this.error = e instanceof y && e.code === "VALIDATION_FAILED" && e.details.file === "TYPE" ? t("media.typeError") : t(`error.${e instanceof y ? e.code : "SERVER"}`);
	}
}, tu = /* @__PURE__ */ G("<button type=\"button\" class=\"tile svelte-7v01bt\"><img loading=\"lazy\" class=\"svelte-7v01bt\"/> <span class=\"svelte-7v01bt\"> </span></button>"), nu = /* @__PURE__ */ G("<p class=\"empty svelte-7v01bt\"> </p>"), ru = /* @__PURE__ */ G("<button type=\"button\" class=\"more svelte-7v01bt\"> </button>"), iu = /* @__PURE__ */ G("<div class=\"details svelte-7v01bt\" aria-live=\"polite\"><p class=\"svelte-7v01bt\"><strong class=\"svelte-7v01bt\"> </strong> <!></p> <label class=\"svelte-7v01bt\"> </label> <p class=\"help svelte-7v01bt\"> </p> <div class=\"row svelte-7v01bt\"><input type=\"text\" class=\"svelte-7v01bt\"/> <button type=\"button\" class=\"svelte-7v01bt\"> </button></div> <button type=\"button\" class=\"danger svelte-7v01bt\"> </button></div>"), au = /* @__PURE__ */ G("<p class=\"error svelte-7v01bt\" role=\"alert\"> </p>"), ou = /* @__PURE__ */ G("<div class=\"library svelte-7v01bt\"><label class=\"svelte-7v01bt\"> </label> <input type=\"search\" class=\"svelte-7v01bt\"/> <div class=\"grid svelte-7v01bt\" role=\"group\"></div> <!> <!> <!></div>"), su = {
	hash: "svelte-7v01bt",
	code: ".library.svelte-7v01bt {display:grid;gap:.35rem;align-content:start;min-width:0;}label.svelte-7v01bt {font-size:.8rem;font-weight:600;}.grid.svelte-7v01bt {display:grid;grid-template-columns:repeat(auto-fill, minmax(96px, 1fr));gap:.4rem;max-height:320px;overflow:auto;padding:2px;}.tile.svelte-7v01bt {display:grid;gap:.2rem;padding:.25rem;border:2px solid var(--cpb-border);border-radius:8px;background:var(--cpb-surface);cursor:pointer;font:inherit;font-size:.65rem;}.tile[aria-pressed='true'].svelte-7v01bt {border-color:var(--cpb-accent);background:var(--cpb-accent-soft);}.tile.svelte-7v01bt img:where(.svelte-7v01bt) {width:100%;aspect-ratio:1;object-fit:cover;border-radius:4px;}.tile.svelte-7v01bt span:where(.svelte-7v01bt) {overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}.details.svelte-7v01bt {display:grid;gap:.3rem;border-top:1px solid var(--cpb-border);padding-top:.4rem;font-size:.8rem;}.details.svelte-7v01bt p:where(.svelte-7v01bt) {margin:0;}.help.svelte-7v01bt {color:var(--cpb-muted);font-size:.75rem;}.row.svelte-7v01bt {display:flex;gap:.3rem;}input.svelte-7v01bt, button.svelte-7v01bt {font:inherit;font-size:.8rem;padding:.3rem .5rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}.row.svelte-7v01bt input:where(.svelte-7v01bt) {flex:1;min-width:0;}button.svelte-7v01bt {cursor:pointer;}.more.svelte-7v01bt, .danger.svelte-7v01bt {justify-self:start;}.danger.svelte-7v01bt {color:var(--cpb-danger);}.empty.svelte-7v01bt {font-size:.8rem;color:var(--cpb-muted);}.error.svelte-7v01bt {color:var(--cpb-danger);font-size:.75rem;margin:0;}.svelte-7v01bt:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function cu(e, t) {
	A(t, !0), X(e, su);
	let n = Ga(t, "browser", 7), r = /* @__PURE__ */ N(() => t.store.t), i = /* @__PURE__ */ N(() => n().selected), a = /* @__PURE__ */ P("");
	qr(() => {
		F(a, H(i)?.alt ?? "", !0);
	});
	let o;
	function s() {
		clearTimeout(o), o = setTimeout(() => void n().load(), 250);
	}
	var c = ou(), l = I(c), u = I(l, !0);
	k(l);
	var d = R(l, 2);
	Z(d);
	var f = R(d, 2);
	Y(f, 21, () => n().items, (e) => e.id, (e, t) => {
		var r = tu(), a = I(r), o = R(a, 2), s = I(o, !0);
		k(o), k(r), z(() => {
			Q(r, "aria-pressed", H(i)?.id === H(t).id), Q(r, "title", H(t).filename), Q(a, "src", H(t).thumbnail), Q(a, "alt", H(t).alt), q(s, H(t).filename);
		}), U("click", r, () => n().select(H(t))), K(e, r);
	}, (e) => {
		var t = ta(), i = L(t), a = (e) => {
			var t = nu(), n = I(t, !0);
			k(t), z((e) => q(n, e), [() => H(r)("media.empty")]), K(e, t);
		};
		J(i, (e) => {
			n().loading || e(a);
		}), K(e, t);
	}), k(f);
	var p = R(f, 2), m = (e) => {
		var t = ru(), i = I(t, !0);
		k(t), z((e) => {
			t.disabled = n().loading, q(i, e);
		}, [() => H(r)("media.more")]), U("click", t, () => void n().load(!0)), K(e, t);
	};
	J(p, (e) => {
		n().hasMore && e(m);
	});
	var h = R(p, 2), g = (e) => {
		var o = iu(), s = I(o), c = I(s), l = I(c, !0);
		k(c);
		var u = R(c, 2), d = (e) => {
			var t = ea();
			z((e) => q(t, `· ${e ?? ""}`), [() => H(r)("media.dimensions", {
				width: H(i).originalWidth,
				height: H(i).originalHeight
			})]), K(e, t);
		};
		J(u, (e) => {
			H(i).originalWidth && H(i).originalHeight && e(d);
		}), k(s);
		var f = R(s, 2), p = I(f, !0);
		k(f);
		var m = R(f, 2), h = I(m, !0);
		k(m);
		var g = R(m, 2), _ = I(g);
		Z(_);
		var v = R(_, 2), y = I(v, !0);
		k(v), k(g);
		var b = R(g, 2), x = I(b, !0);
		k(b), k(o), z((e, r, o, s, c) => {
			q(l, e), Q(f, "for", `${t.uid}-alt`), q(p, r), Q(m, "id", `${t.uid}-alt-help`), q(h, o), Q(_, "id", `${t.uid}-alt`), Q(_, "aria-describedby", `${t.uid}-alt-help`), v.disabled = n().busy || H(a) === H(i).alt, q(y, s), b.disabled = n().busy, q(x, c);
		}, [
			() => H(r)("media.selected", { name: H(i).filename }),
			() => H(r)("media.alt"),
			() => H(r)("media.altHelp"),
			() => H(r)("media.saveAlt"),
			() => H(r)("media.delete")
		]), za(_, () => H(a), (e) => F(a, e)), U("click", v, () => void n().describe(H(a))), U("click", b, () => void n().remove()), K(e, o);
	};
	J(h, (e) => {
		H(i) && e(g);
	});
	var _ = R(h, 2), v = (e) => {
		var t = au(), r = I(t, !0);
		k(t), z(() => q(r, n().error)), K(e, t);
	};
	J(_, (e) => {
		n().error && e(v);
	}), k(c), z((e, r) => {
		Q(l, "for", `${t.uid}-search`), q(u, e), Q(d, "id", `${t.uid}-search`), Q(f, "aria-label", r), Q(f, "aria-busy", n().loading);
	}, [() => H(r)("media.search"), () => H(r)("media.library")]), U("input", d, s), za(d, () => n().search, (e) => n().search = e), K(e, c), j();
}
W(["input", "click"]);
// src/ui/media/UploadForm.svelte
var lu = /* @__PURE__ */ G("<p class=\"error svelte-1l55g1o\" role=\"alert\"> </p>"), uu = /* @__PURE__ */ G("<label class=\"check svelte-1l55g1o\"><input type=\"checkbox\" class=\"svelte-1l55g1o\"/> </label>"), du = /* @__PURE__ */ G("<fieldset class=\"svelte-1l55g1o\"><legend class=\"svelte-1l55g1o\"> </legend> <!></fieldset>"), fu = /* @__PURE__ */ G("<form class=\"upload svelte-1l55g1o\"><h3 class=\"svelte-1l55g1o\"> </h3> <label class=\"svelte-1l55g1o\"> </label> <input type=\"file\" class=\"svelte-1l55g1o\"/> <!> <label class=\"svelte-1l55g1o\"> </label> <input type=\"text\" class=\"svelte-1l55g1o\"/> <!> <label class=\"check svelte-1l55g1o\"><input type=\"checkbox\" class=\"svelte-1l55g1o\"/> </label> <label class=\"check svelte-1l55g1o\"><input type=\"checkbox\" class=\"svelte-1l55g1o\"/> </label> <button type=\"submit\" class=\"svelte-1l55g1o\"> </button></form>"), pu = {
	hash: "svelte-1l55g1o",
	code: ".upload.svelte-1l55g1o {display:grid;gap:.3rem;padding:.5rem;border:1px solid var(--cpb-border);border-radius:8px;}h3.svelte-1l55g1o {font-size:.85rem;margin:0;}label.svelte-1l55g1o {font-size:.8rem;font-weight:600;}.check.svelte-1l55g1o {font-weight:400;display:flex;gap:.35rem;align-items:center;}fieldset.svelte-1l55g1o {border:1px solid var(--cpb-border);border-radius:6px;padding:.25rem .5rem;margin:0;}legend.svelte-1l55g1o {font-size:.8rem;font-weight:600;}input[type='text'].svelte-1l55g1o, button.svelte-1l55g1o {font:inherit;font-size:.8rem;padding:.3rem .5rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}button.svelte-1l55g1o {cursor:pointer;justify-self:start;}.error.svelte-1l55g1o {color:var(--cpb-danger);font-size:.75rem;margin:0;}.svelte-1l55g1o:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function mu(e, t) {
	A(t, !0), X(e, pu);
	let n = Ga(t, "browser", 7), r = /* @__PURE__ */ N(() => t.store.t), i = /* @__PURE__ */ P(void 0), a = /* @__PURE__ */ P(""), o = /* @__PURE__ */ P(Sr([])), s = /* @__PURE__ */ P(!0), c = /* @__PURE__ */ P(!0), l = /* @__PURE__ */ P("");
	qr(() => {
		t.settings && (F(o, [...t.settings.widths], !0), F(c, t.settings.webp, !0));
	});
	function u(e, t) {
		F(o, t ? [...H(o), e].sort((e, t) => e - t) : H(o).filter((t) => t !== e), !0);
	}
	async function d(e) {
		e.preventDefault(), e.stopPropagation();
		let r = H(i)?.files?.[0];
		r && (n().error = "", F(l, n().check(r, t.settings) ?? "", !0), H(l) === "" && await n().upload(r, {
			alt: H(a),
			widths: H(o),
			optimize: H(s),
			webp: H(c)
		}) && (F(a, ""), H(i) && (H(i).value = "")));
	}
	var f = fu(), p = I(f), m = I(p, !0);
	k(p);
	var h = R(p, 2), g = I(h, !0);
	k(h);
	var _ = R(h, 2);
	Wa(_, (e) => F(i, e), () => H(i));
	var v = R(_, 2), y = (e) => {
		var n = lu(), r = I(n, !0);
		k(n), z(() => {
			Q(n, "id", `${t.uid}-file-error`), q(r, H(l));
		}), K(e, n);
	};
	J(v, (e) => {
		H(l) && e(y);
	});
	var b = R(v, 2), x = I(b, !0);
	k(b);
	var S = R(b, 2);
	Z(S);
	var C = R(S, 2), w = (e) => {
		var n = du(), i = I(n), a = I(i, !0);
		k(i), Y(R(i, 2), 16, () => t.settings.widths, (e) => e, (e, t) => {
			var n = uu(), i = I(n);
			Z(i);
			var a = R(i);
			k(n), z((e, t) => {
				Pa(i, e), q(a, ` ${t ?? ""}`);
			}, [() => H(o).includes(t), () => H(r)("media.recommended", { width: t })]), U("change", i, (e) => u(t, e.currentTarget.checked)), K(e, n);
		}), k(n), z((e) => q(a, e), [() => H(r)("media.sizes")]), K(e, n);
	};
	J(C, (e) => {
		t.settings && e(w);
	});
	var ee = R(C, 2), T = I(ee);
	Z(T);
	var te = R(T);
	k(ee);
	var E = R(ee, 2), ne = I(E);
	Z(ne);
	var re = R(ne);
	k(E);
	var ie = R(E, 2), ae = I(ie, !0);
	k(ie), k(f), z((e, r, i, a, o, s, c) => {
		Q(f, "aria-labelledby", `${t.uid}-upload-title`), Q(p, "id", `${t.uid}-upload-title`), q(m, e), Q(h, "for", `${t.uid}-file`), q(g, r), Q(_, "id", `${t.uid}-file`), Q(_, "accept", i), Q(_, "aria-describedby", H(l) ? `${t.uid}-file-error` : void 0), Q(b, "for", `${t.uid}-upload-alt`), q(x, a), Q(S, "id", `${t.uid}-upload-alt`), q(te, ` ${o ?? ""}`), q(re, ` ${s ?? ""}`), ie.disabled = n().busy, q(ae, c);
	}, [
		() => H(r)("media.upload"),
		() => H(r)("media.file"),
		() => (t.settings?.accept ?? ["image/*"]).join(","),
		() => H(r)("media.alt"),
		() => H(r)("media.optimize"),
		() => H(r)("media.webp"),
		() => n().busy ? H(r)("media.uploading") : H(r)("media.upload")
	]), qi("submit", f, d), U("change", _, () => {
		F(l, "");
	}), za(S, () => H(a), (e) => F(a, e)), Ba(T, () => H(s), (e) => F(s, e)), Ba(ne, () => H(c), (e) => F(c, e)), K(e, f), j();
}
W(["change"]);
// src/ui/media/MediaDialog.svelte
var hu = /* @__PURE__ */ G("<dialog class=\"svelte-1iyaart\"><h2 class=\"svelte-1iyaart\"> </h2> <div class=\"body svelte-1iyaart\"><!> <!></div> <div class=\"actions svelte-1iyaart\"><button type=\"button\" class=\"svelte-1iyaart\"> </button> <button type=\"button\" class=\"primary svelte-1iyaart\"> </button></div></dialog>"), gu = {
	hash: "svelte-1iyaart",
	code: "dialog.svelte-1iyaart {border:1px solid var(--cpb-border);border-radius:10px;padding:1rem;width:min(860px, 94vw);color:inherit;font:inherit;}dialog.svelte-1iyaart::backdrop {background:rgb(15 23 42 / .45);}h2.svelte-1iyaart {font-size:1rem;margin:0 0 .75rem;}.body.svelte-1iyaart {display:grid;grid-template-columns:minmax(0, 1fr) 260px;gap:1rem;}.actions.svelte-1iyaart {display:flex;justify-content:flex-end;gap:.5rem;margin-top:1rem;}button.svelte-1iyaart {font:inherit;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.primary.svelte-1iyaart {background:var(--cpb-accent);border-color:var(--cpb-accent);color:#fff;}button.svelte-1iyaart:disabled {opacity:.5;}.svelte-1iyaart:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}\n  @media (max-width: 700px) {.body.svelte-1iyaart {grid-template-columns:1fr;} }"
};
function _u(e, t) {
	A(t, !0), X(e, gu);
	let n = /* @__PURE__ */ N(() => t.store.t), r = /* @__PURE__ */ N(() => new eu(t.store)), i = /* @__PURE__ */ P(void 0), a = null, o = /* @__PURE__ */ P(null), s = /* @__PURE__ */ N(() => t.store.media.request);
	qr(() => {
		H(i) && (H(s) && !H(i).open ? (a = H(i).getRootNode().activeElement, H(i).showModal(), zi(() => {
			H(r).select(null), H(r).load(), t.store.media.loadSettings().then((e) => {
				F(o, e);
			});
		})) : !H(s) && H(i).open && H(i).close());
	});
	function c() {
		let e = H(r).selected;
		e && H(s) && (t.store.media.remember(e), H(s).onPick({ asset: e.id }), t.store.media.close());
	}
	var l = hu(), u = I(l), d = I(u, !0);
	k(u);
	var f = R(u, 2), p = I(f);
	{
		let e = /* @__PURE__ */ N(() => `${t.uid}-media`);
		cu(p, {
			get store() {
				return t.store;
			},
			get browser() {
				return H(r);
			},
			get uid() {
				return H(e);
			}
		});
	}
	var m = R(p, 2);
	{
		let e = /* @__PURE__ */ N(() => `${t.uid}-media`);
		mu(m, {
			get store() {
				return t.store;
			},
			get browser() {
				return H(r);
			},
			get settings() {
				return H(o);
			},
			get uid() {
				return H(e);
			}
		});
	}
	k(f);
	var h = R(f, 2), g = I(h), _ = I(g, !0);
	k(g);
	var v = R(g, 2), y = I(v, !0);
	k(v), k(h), k(l), Wa(l, (e) => F(i, e), () => H(i)), z((e, n, i) => {
		Q(l, "aria-labelledby", `${t.uid}-media-title`), Q(u, "id", `${t.uid}-media-title`), q(d, e), q(_, n), v.disabled = !H(r).selected || H(r).busy, q(y, i);
	}, [
		() => H(n)("media.title"),
		() => H(n)("media.close"),
		() => H(n)("media.use")
	]), qi("close", l, () => {
		t.store.media.close(), a?.focus?.();
	}), U("click", g, () => t.store.media.close()), U("click", v, c), K(e, l), j();
}
W(["click"]);
// src/ui/site-parts/PartPreview.svelte
var vu = /* @__PURE__ */ G("<option> </option>"), yu = /* @__PURE__ */ G("<option> </option>"), bu = /* @__PURE__ */ G("<p class=\"note svelte-1fs2bjy\" role=\"status\"> </p>"), xu = /* @__PURE__ */ G("<!> <iframe class=\"svelte-1fs2bjy\"></iframe>", 1), Su = /* @__PURE__ */ G("<div class=\"preview svelte-1fs2bjy\"><label class=\"svelte-1fs2bjy\"> </label> <div class=\"row svelte-1fs2bjy\"><select class=\"svelte-1fs2bjy\"><!><!></select> <button type=\"button\" class=\"svelte-1fs2bjy\"> </button></div> <!></div>"), Cu = {
	hash: "svelte-1fs2bjy",
	code: ".preview.svelte-1fs2bjy {display:grid;gap:.3rem;border-top:1px solid var(--cpb-border);padding-top:.5rem;}label.svelte-1fs2bjy {font-size:.8rem;font-weight:600;}.row.svelte-1fs2bjy {display:flex;gap:.25rem;}select.svelte-1fs2bjy, button.svelte-1fs2bjy {font:inherit;font-size:.8rem;padding:.25rem .4rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;min-width:0;}select.svelte-1fs2bjy {flex:1;}button.svelte-1fs2bjy {cursor:pointer;}.note.svelte-1fs2bjy {margin:0;font-size:.75rem;color:var(--cpb-danger);}iframe.svelte-1fs2bjy {width:100%;height:260px;border:1px solid var(--cpb-border);border-radius:6px;background:#fff;}"
};
function wu(e, t) {
	A(t, !0), X(e, Cu);
	let n = /* @__PURE__ */ N(() => t.store.t), r = /* @__PURE__ */ N(() => t.store.part), i = /* @__PURE__ */ N(() => H(r).part?.kind === "not_found"), a = /* @__PURE__ */ P(""), o = (e) => e.replace(/<\/style/gi, "<\\/style"), s = /* @__PURE__ */ N(() => H(r).preview ? `<!doctype html><html><head><meta charset="utf-8"><style>${o(H(r).preview.css)}</style></head><body>${H(r).preview.html}</body></html>` : "");
	var c = Su(), l = I(c), u = I(l, !0);
	k(l);
	var d = R(l, 2), f = I(d), p = I(f), m = (e) => {
		var t = vu(), r = I(t, !0);
		k(t), t.value = t.__value = "", z((e) => q(r, e), [() => H(n)("parts.preview404")]), K(e, t);
	};
	J(p, (e) => {
		H(i) && e(m);
	}), Y(R(p), 17, () => H(r).pages, (e) => e.id, (e, t) => {
		var n = yu(), r = I(n, !0);
		k(n);
		var i = {};
		z(() => {
			q(r, H(t).path), i !== (i = H(t).id) && (n.value = (n.__value = H(t).id) ?? "");
		}), K(e, n);
	}), k(f);
	var h = R(f, 2), g = I(h, !0);
	k(h), k(d);
	var _ = R(d, 2), v = (e) => {
		var t = xu(), i = L(t), a = (e) => {
			var t = bu(), r = I(t, !0);
			k(t), z((e) => q(r, e), [() => H(n)("parts.notApplied")]), K(e, t);
		};
		J(i, (e) => {
			H(r).preview.applies || e(a);
		});
		var o = R(i, 2);
		z((e) => {
			Q(o, "title", e), Q(o, "sandbox", Qa), Q(o, "srcdoc", H(s));
		}, [() => H(n)("parts.previewFrame")]), K(e, t);
	};
	J(_, (e) => {
		H(r).preview && e(v);
	}), k(c), z((e, n) => {
		Q(l, "for", `${t.uid}-part-context`), q(u, e), Q(f, "id", `${t.uid}-part-context`), h.disabled = H(r).busy || !H(i) && H(a) === "", q(g, n);
	}, [() => H(n)("parts.preview"), () => H(n)("parts.previewShow")]), Da(f, () => H(a), (e) => F(a, e)), U("click", h, () => void H(r).showPreview(H(a) === "" ? null : H(a))), K(e, c), j();
}
W(["click"]);
// src/ui/site-parts/targets.ts
var Tu = [
	"site",
	"home",
	"pages",
	"path_prefix",
	"layouts",
	"routes",
	"sources"
], Eu = [
	"home",
	"pages",
	"layouts"
], Du = (e) => {
	switch (e) {
		case "pages":
		case "layouts":
		case "sources": return {
			type: e,
			ids: []
		};
		case "routes": return {
			type: e,
			names: []
		};
		case "path_prefix": return {
			type: e,
			value: "/"
		};
		default: return { type: e };
	}
}, Ou = (e) => e.split(",").map((e) => e.trim()).filter((e) => e !== ""), ku = /* @__PURE__ */ G("<option class=\"svelte-1hg9bbe\"> </option>"), Au = /* @__PURE__ */ G("<option class=\"svelte-1hg9bbe\"> </option>"), ju = /* @__PURE__ */ G("<select multiple=\"\" class=\"svelte-1hg9bbe\"></select>"), Mu = /* @__PURE__ */ G("<option class=\"svelte-1hg9bbe\"> </option>"), Nu = /* @__PURE__ */ G("<select multiple=\"\" class=\"svelte-1hg9bbe\"></select>"), Pu = /* @__PURE__ */ G("<option class=\"svelte-1hg9bbe\"> </option>"), Fu = /* @__PURE__ */ G("<select multiple=\"\" class=\"svelte-1hg9bbe\"></select>"), Iu = /* @__PURE__ */ G("<input class=\"svelte-1hg9bbe\"/>"), Lu = /* @__PURE__ */ G("<input placeholder=\"/cursos\" class=\"svelte-1hg9bbe\"/>"), Ru = /* @__PURE__ */ G("<div class=\"target svelte-1hg9bbe\"><select class=\"svelte-1hg9bbe\"></select> <!> <button type=\"button\" class=\"svelte-1hg9bbe\">×</button></div>"), zu = /* @__PURE__ */ G("<fieldset class=\"targets svelte-1hg9bbe\"><legend class=\"svelte-1hg9bbe\"> </legend> <!> <button type=\"button\" class=\"add svelte-1hg9bbe\"> </button></fieldset>"), Bu = {
	hash: "svelte-1hg9bbe",
	code: ".targets.svelte-1hg9bbe {border:1px solid var(--cpb-border);border-radius:6px;padding:.4rem .5rem;margin:0 0 .6rem;display:grid;gap:.35rem;}legend.svelte-1hg9bbe {font-size:.8rem;font-weight:600;}.target.svelte-1hg9bbe {display:grid;grid-template-columns:1fr 1fr auto;gap:.25rem;align-items:start;}.target[aria-invalid='true'].svelte-1hg9bbe {outline:2px solid var(--cpb-danger);border-radius:6px;}select.svelte-1hg9bbe, input.svelte-1hg9bbe, button.svelte-1hg9bbe {font:inherit;font-size:.78rem;padding:.25rem .4rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;min-width:0;}select[multiple].svelte-1hg9bbe {min-height:4.5rem;}button.svelte-1hg9bbe {cursor:pointer;}.add.svelte-1hg9bbe {justify-self:start;}.svelte-1hg9bbe:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Vu(e, t) {
	A(t, !0), X(e, Bu);
	let n = /* @__PURE__ */ N(() => t.store.t), r = /* @__PURE__ */ N(() => t.store.part), i = /* @__PURE__ */ N(() => Tu.filter((e) => !t.notFound || !Eu.includes(e))), a = (e) => H(r).errorPath.startsWith(`${t.id.split("-").pop()}.${e}`);
	qr(() => {
		t.store.data.loadSources();
	});
	let o = (e, n) => t.onChange(t.targets.map((t, r) => r === e ? n : t)), s = (e) => Array.from(e.currentTarget.selectedOptions, (e) => e.value);
	var c = zu(), l = I(c), u = I(l, !0);
	k(l);
	var d = R(l, 2);
	Y(d, 17, () => t.targets, ua, (e, c, l) => {
		let u = /* @__PURE__ */ N(() => l + 1);
		var d = Ru(), f = I(d);
		Y(f, 20, () => H(i), (e) => e, (e, t) => {
			var r = ku(), i = I(r, !0);
			k(r);
			var a = {};
			z((e) => {
				q(i, e), a !== (a = t) && (r.value = (r.__value = t) ?? "");
			}, [() => H(n)(`parts.target.${t}`)]), K(e, r);
		}), k(f);
		var p;
		Ea(f);
		var m = R(f, 2), h = (e) => {
			var t = ju();
			Y(t, 21, () => H(r).pages, (e) => e.id, (e, t) => {
				var n = Au(), r = I(n, !0);
				k(n);
				var i = {};
				z((e) => {
					Fa(n, e), q(r, H(t).path), i !== (i = H(t).id) && (n.value = (n.__value = H(t).id) ?? "");
				}, [() => H(c).ids.includes(H(t).id)]), K(e, n);
			}), k(t), z((e) => Q(t, "aria-label", e), [() => H(n)("parts.value", { n: H(u) })]), U("change", t, (e) => o(l, {
				type: "pages",
				ids: s(e)
			})), K(e, t);
		}, g = (e) => {
			var t = Nu();
			Y(t, 21, () => Object.entries(H(r).routes), ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ N(() => gt(H(t), 2));
				let r = () => H(n)[0], i = () => H(n)[1];
				var a = Mu(), o = I(a, !0);
				k(a);
				var s = {};
				z((e) => {
					Fa(a, e), q(o, i()), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
				}, [() => H(c).names.includes(r())]), K(e, a);
			}), k(t), z((e) => Q(t, "aria-label", e), [() => H(n)("parts.value", { n: H(u) })]), U("change", t, (e) => o(l, {
				type: "routes",
				names: s(e)
			})), K(e, t);
		}, _ = (e) => {
			var r = Fu();
			Y(r, 21, () => t.store.data.sources ?? [], (e) => e.id, (e, t) => {
				var n = Pu(), r = I(n, !0);
				k(n);
				var i = {};
				z((e) => {
					Fa(n, e), q(r, H(t).label), i !== (i = H(t).id) && (n.value = (n.__value = H(t).id) ?? "");
				}, [() => H(c).ids.includes(H(t).id)]), K(e, n);
			}), k(r), z((e) => Q(r, "aria-label", e), [() => H(n)("parts.value", { n: H(u) })]), U("change", r, (e) => o(l, {
				type: "sources",
				ids: s(e)
			})), K(e, r);
		}, v = (e) => {
			var t = Iu();
			Z(t), z((e, n) => {
				Q(t, "aria-label", e), Na(t, n);
			}, [() => H(n)("parts.value", { n: H(u) }), () => H(c).ids.join(", ")]), U("change", t, (e) => o(l, {
				type: "layouts",
				ids: Ou(e.currentTarget.value)
			})), K(e, t);
		}, y = (e) => {
			var t = Lu();
			Z(t), z((e) => {
				Q(t, "aria-label", e), Na(t, H(c).value);
			}, [() => H(n)("parts.value", { n: H(u) })]), U("change", t, (e) => o(l, {
				type: "path_prefix",
				value: e.currentTarget.value.trim()
			})), K(e, t);
		};
		J(m, (e) => {
			H(c).type === "pages" ? e(h) : H(c).type === "routes" ? e(g, 1) : H(c).type === "sources" ? e(_, 2) : H(c).type === "layouts" ? e(v, 3) : H(c).type === "path_prefix" && e(y, 4);
		});
		var b = R(m, 2);
		k(d), z((e, t, n) => {
			Q(d, "aria-invalid", e), Q(f, "aria-label", t), p !== (p = H(c).type) && (f.value = (f.__value = H(c).type) ?? "", Ta(f, H(c).type)), Q(b, "aria-label", n);
		}, [
			() => a(l),
			() => H(n)("parts.type", { n: H(u) }),
			() => H(n)("parts.remove", { n: H(u) })
		]), U("change", f, (e) => o(l, Du(e.currentTarget.value))), U("click", b, () => t.onChange(t.targets.filter((e, t) => t !== l))), K(e, d);
	});
	var f = R(d, 2), p = I(f, !0);
	k(f), k(c), z((e) => {
		q(u, t.legend), q(p, e);
	}, [() => H(n)("parts.add")]), U("click", f, () => t.onChange([...t.targets, Du(t.notFound ? "path_prefix" : "pages")])), K(e, c), j();
}
W(["change", "click"]);
// src/ui/site-parts/RulesPanel.svelte
var Hu = /* @__PURE__ */ G("<p class=\"kind svelte-uncu60\"> <!></p>"), Uu = /* @__PURE__ */ G("<option class=\"svelte-uncu60\"> </option>"), Wu = /* @__PURE__ */ G("<p class=\"error svelte-uncu60\" role=\"alert\"> </p>"), Gu = /* @__PURE__ */ G("<li class=\"svelte-uncu60\"> </li>"), Ku = /* @__PURE__ */ G("<li class=\"svelte-uncu60\"> </li>"), qu = /* @__PURE__ */ G("<p class=\"error svelte-uncu60\"> </p> <ul class=\"svelte-uncu60\"></ul>", 1), Ju = /* @__PURE__ */ G("<div class=\"impact svelte-uncu60\" role=\"status\"><p class=\"svelte-uncu60\"> </p> <ul class=\"svelte-uncu60\"></ul> <!></div>"), Yu = /* @__PURE__ */ G("<section class=\"panel svelte-uncu60\"><h2 class=\"svelte-uncu60\"> </h2> <!> <!> <!> <label class=\"svelte-uncu60\"> </label> <input class=\"svelte-uncu60\"/> <label class=\"svelte-uncu60\"> </label> <select class=\"svelte-uncu60\"></select> <p class=\"help svelte-uncu60\"> </p> <label class=\"svelte-uncu60\"> </label> <input type=\"number\" min=\"-100\" max=\"100\" class=\"svelte-uncu60\"/> <div class=\"actions svelte-uncu60\"><button type=\"button\" class=\"primary svelte-uncu60\"> </button> <button type=\"button\" class=\"svelte-uncu60\"> </button></div> <!> <!> <!></section>"), Xu = {
	hash: "svelte-uncu60",
	code: ".panel.svelte-uncu60 {padding:.5rem .75rem;overflow:auto;border-left:1px solid var(--cpb-border);display:grid;gap:.3rem;align-content:start;}h2.svelte-uncu60 {font-size:.85rem;margin:0;}.kind.svelte-uncu60, .help.svelte-uncu60 {margin:0;font-size:.75rem;color:var(--cpb-muted);}label.svelte-uncu60 {font-size:.8rem;font-weight:600;}input.svelte-uncu60, select.svelte-uncu60, button.svelte-uncu60 {font:inherit;font-size:.8rem;padding:.3rem .45rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}.actions.svelte-uncu60 {display:flex;gap:.35rem;margin-top:.3rem;}button.svelte-uncu60 {cursor:pointer;}button.primary.svelte-uncu60 {background:var(--cpb-accent);border-color:var(--cpb-accent);color:#fff;}button.svelte-uncu60:disabled {opacity:.5;}.error.svelte-uncu60 {color:var(--cpb-danger);font-size:.75rem;margin:0;}.impact.svelte-uncu60 {font-size:.75rem;border:1px solid var(--cpb-border);border-radius:6px;padding:.3rem .5rem;}.impact.svelte-uncu60 p:where(.svelte-uncu60) {margin:0 0 .2rem;}.impact.svelte-uncu60 ul:where(.svelte-uncu60) {margin:0;padding-left:1rem;max-height:8rem;overflow:auto;}.svelte-uncu60:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Zu(e, t) {
	A(t, !0), X(e, Xu);
	let n = /* @__PURE__ */ N(() => t.store.t), r = /* @__PURE__ */ N(() => t.store.part), i = /* @__PURE__ */ N(() => H(r).rules), a = /* @__PURE__ */ N(() => H(r).part?.kind === "not_found"), o = (e) => H(r).setRules({
		...H(i),
		...e
	}), s = (e) => e.join(", "), c = (e) => Object.entries(e).map(([e, t]) => `${e}: ${t ?? H(n)("parts.nothing")}`).join(" · ");
	var l = Yu(), u = I(l), d = I(u, !0);
	k(u);
	var f = R(u, 2), p = (e) => {
		var t = Hu(), i = I(t, !0), a = R(i), o = (e) => {
			var t = ea();
			z((e) => q(t, `· ${e ?? ""}`), [() => H(n)("parts.unpublishedRules")]), K(e, t);
		};
		J(a, (e) => {
			H(r).rulesUnpublished && e(o);
		}), k(t), z((e) => q(i, e), [() => H(n)(`parts.kind.${H(r).part.kind}`)]), K(e, t);
	};
	J(f, (e) => {
		H(r).part && e(p);
	});
	var m = R(f, 2);
	{
		let e = /* @__PURE__ */ N(() => `${t.uid}-include`), r = /* @__PURE__ */ N(() => H(n)("parts.include"));
		Vu(m, {
			get store() {
				return t.store;
			},
			get id() {
				return H(e);
			},
			get legend() {
				return H(r);
			},
			get notFound() {
				return H(a);
			},
			get targets() {
				return H(i).include;
			},
			onChange: (e) => o({ include: e })
		});
	}
	var h = R(m, 2);
	{
		let e = /* @__PURE__ */ N(() => `${t.uid}-exclude`), r = /* @__PURE__ */ N(() => H(n)("parts.exclude")), s = /* @__PURE__ */ N(() => H(i).exclude ?? []);
		Vu(h, {
			get store() {
				return t.store;
			},
			get id() {
				return H(e);
			},
			get legend() {
				return H(r);
			},
			get notFound() {
				return H(a);
			},
			get targets() {
				return H(s);
			},
			onChange: (e) => o({ exclude: e })
		});
	}
	var g = R(h, 2), _ = I(g, !0);
	k(g);
	var v = R(g, 2);
	Z(v);
	var y = R(v, 2), b = I(y, !0);
	k(y);
	var x = R(y, 2);
	Y(x, 20, () => [
		"any",
		"with",
		"without"
	], (e) => e, (e, t) => {
		var r = Uu(), i = I(r, !0);
		k(r);
		var a = {};
		z((e) => {
			q(i, e), a !== (a = t) && (r.value = (r.__value = t) ?? "");
		}, [() => H(n)(`parts.session.${t}`)]), K(e, r);
	}), k(x);
	var S;
	Ea(x);
	var C = R(x, 2), w = I(C, !0);
	k(C);
	var ee = R(C, 2), T = I(ee, !0);
	k(ee);
	var te = R(ee, 2);
	Z(te);
	var E = R(te, 2), ne = I(E), re = I(ne, !0);
	k(ne);
	var ie = R(ne, 2), ae = I(ie, !0);
	k(ie), k(E);
	var oe = R(E, 2), se = (e) => {
		var t = Wu(), n = I(t, !0);
		k(t), z(() => q(n, H(r).error)), K(e, t);
	};
	J(oe, (e) => {
		H(r).error && e(se);
	});
	var ce = R(oe, 2), le = (e) => {
		var t = Ju(), i = I(t), a = I(i, !0);
		k(i);
		var o = R(i, 2);
		Y(o, 21, () => H(r).impact.changes, ua, (e, t) => {
			var r = Gu(), i = I(r, !0);
			k(r), z((e) => q(i, e), [() => H(n)("parts.change", {
				path: H(t).context.path,
				before: c(H(t).before.parts),
				after: c(H(t).after.parts)
			})]), K(e, r);
		}), k(o);
		var l = R(o, 2), u = (e) => {
			var t = qu(), i = L(t), a = I(i, !0);
			k(i);
			var o = R(i, 2);
			Y(o, 21, () => H(r).impact.conflicts, ua, (e, t) => {
				var r = Ku(), i = I(r, !0);
				k(r), z((e) => q(i, e), [() => H(n)("parts.conflictAt", {
					path: H(t).context.path,
					parts: Object.values(H(t).parts).map(s).join(" / ")
				})]), K(e, r);
			}), k(o), z((e) => q(a, e), [() => H(n)("parts.conflicts")]), K(e, t);
		};
		J(l, (e) => {
			H(r).impact.conflicts.length > 0 && e(u);
		}), k(t), z((e) => q(a, e), [() => H(r).impact.total === 0 ? H(n)("parts.impactNone") : H(n)("parts.impactTotal", { total: H(r).impact.total })]), K(e, t);
	};
	J(ce, (e) => {
		H(r).impact && e(le);
	}), wu(R(ce, 2), {
		get store() {
			return t.store;
		},
		get uid() {
			return t.uid;
		}
	}), k(l), z((e, n, a, o, s, c, f, p) => {
		Q(l, "aria-labelledby", `${t.uid}-parts-title`), Q(u, "id", `${t.uid}-parts-title`), q(d, e), Q(g, "for", `${t.uid}-locales`), q(_, n), Q(v, "id", `${t.uid}-locales`), Na(v, a), Q(y, "for", `${t.uid}-session`), q(b, o), Q(x, "id", `${t.uid}-session`), Q(x, "aria-describedby", `${t.uid}-session-help`), S !== (S = H(i).session ?? "any") && (x.value = (x.__value = H(i).session ?? "any") ?? "", Ta(x, H(i).session ?? "any")), Q(C, "id", `${t.uid}-session-help`), q(w, s), Q(ee, "for", `${t.uid}-priority`), q(T, c), Q(te, "id", `${t.uid}-priority`), Na(te, H(i).priority ?? 0), ne.disabled = H(r).busy || !H(r).dirty, q(re, f), ie.disabled = H(r).busy, q(ae, p);
	}, [
		() => H(n)("parts.title", { name: H(r).part?.name ?? "" }),
		() => H(n)("parts.locales"),
		() => (H(i).locales ?? []).join(", "),
		() => H(n)("parts.session"),
		() => H(n)("parts.sessionHelp"),
		() => H(n)("parts.priority"),
		() => H(n)("parts.save"),
		() => H(n)("parts.impact")
	]), U("change", v, (e) => o({ locales: Ou(e.currentTarget.value) })), U("change", x, (e) => o({ session: e.currentTarget.value })), U("change", te, (e) => o({ priority: Math.trunc(Number(e.currentTarget.value) || 0) })), U("click", ne, () => void H(r).saveRules()), U("click", ie, () => void H(r).loadImpact()), K(e, l), j();
}
W(["change", "click"]);
// src/ui/palette/Palette.svelte
var Qu = /* @__PURE__ */ G("<button type=\"button\" class=\"wide svelte-om8jxl\"> </button>"), $u = /* @__PURE__ */ G("<li><button type=\"button\" class=\"svelte-om8jxl\"> </button></li>"), ed = /* @__PURE__ */ G("<h3 class=\"svelte-om8jxl\"> </h3> <ul class=\"svelte-om8jxl\"></ul>", 1), td = /* @__PURE__ */ G("<li><button type=\"button\" class=\"svelte-om8jxl\"> </button></li>"), nd = /* @__PURE__ */ G("<h3 class=\"svelte-om8jxl\"> </h3> <ul class=\"svelte-om8jxl\"></ul>", 1), rd = /* @__PURE__ */ G("<section class=\"palette svelte-om8jxl\" aria-labelledby=\"cpb-palette-title\"><h2 id=\"cpb-palette-title\" class=\"svelte-om8jxl\"> </h2> <!> <!> <!></section>"), id = {
	hash: "svelte-om8jxl",
	code: ".palette.svelte-om8jxl {padding:.5rem .75rem;overflow:auto;}h2.svelte-om8jxl {font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin:0 0 .5rem;color:var(--cpb-muted);}h3.svelte-om8jxl {font-size:.75rem;margin:.5rem 0 .25rem;color:var(--cpb-muted);text-transform:capitalize;}ul.svelte-om8jxl {list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2, 1fr);gap:.25rem;}button.svelte-om8jxl {touch-action:none;width:100%;font:inherit;font-size:.8rem;padding:.35rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;text-align:left;}button.svelte-om8jxl:hover {border-color:var(--cpb-accent);}.wide.svelte-om8jxl {margin-bottom:.5rem;text-align:center;}button.svelte-om8jxl:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function ad(e, t) {
	A(t, !0), X(e, id);
	let n = /* @__PURE__ */ N(() => t.store.t), r = [
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
	], i = /* @__PURE__ */ N(() => {
		let e = t.store.catalogue;
		if (!e) return [];
		let n = [...e.rules.values()].filter((e) => (e.label !== e.type || r.includes(e.type)) && e.type !== "html"), i = /* @__PURE__ */ new Map();
		for (let e of n) i.set(e.category, [...i.get(e.category) ?? [], e]);
		return [...i.entries()];
	});
	function a(e) {
		let n = t.store.catalogue;
		if (!n || t.drag.consumeClick()) return;
		let r = Zo(t.store.tree, n, t.store.selection, e.type);
		t.store.run({
			kind: "insert",
			...r,
			node: Yo(n, e.type)
		}, ["announce.inserted", { label: e.label }]) && t.store.selection && t.onInserted(t.store.selection);
	}
	var o = rd(), s = I(o), c = I(s, !0);
	k(s);
	var l = R(s, 2), u = (e) => {
		var r = Qu(), i = I(r, !0);
		k(r), z((e) => q(i, e), [() => H(n)("palette.import")]), U("click", r, function(...e) {
			t.onImport?.apply(this, e);
		}), K(e, r);
	};
	J(l, (e) => {
		t.content.canImport && e(u);
	});
	var d = R(l, 2), f = (e) => {
		var r = ed(), i = L(r), a = I(i, !0);
		k(i);
		var o = R(i, 2);
		Y(o, 21, () => t.content.templates, (e) => e.id, (e, r) => {
			var i = $u(), a = I(i), o = I(a, !0);
			k(a), k(i), z((e) => {
				Q(a, "aria-label", e), q(o, H(r).name);
			}, [() => H(n)("palette.insertTemplate", { name: H(r).name })]), U("click", a, () => {
				t.content.insertNodes(H(r).nodes, H(r).name) && t.store.selection && t.onInserted(t.store.selection);
			}), K(e, i);
		}), k(o), z((e) => q(a, e), [() => H(n)("palette.templates")]), K(e, r);
	};
	J(d, (e) => {
		t.content.canTemplates && t.content.templates.length > 0 && e(f);
	}), Y(R(d, 2), 17, () => H(i), ([e, t]) => e, (e, r) => {
		var i = /* @__PURE__ */ N(() => gt(H(r), 2));
		let o = () => H(i)[0], s = () => H(i)[1];
		var c = nd(), l = L(c), u = I(l, !0);
		k(l);
		var d = R(l, 2);
		Y(d, 21, s, (e) => e.type, (e, r) => {
			var i = td(), o = I(i), s = I(o, !0);
			k(o), k(i), z((e) => {
				Q(o, "aria-label", e), Q(o, "data-type", H(r).type), q(s, H(r).label);
			}, [() => H(n)("palette.insert", { label: H(r).label })]), U("click", o, () => a(H(r))), U("pointerdown", o, (e) => t.store.catalogue && t.drag.pressNew(e, {
				kind: "insert",
				node: Yo(t.store.catalogue, H(r).type)
			}, H(r).label)), K(e, i);
		}), k(d), z((e) => q(u, e), [() => o().replace(/_/g, " ")]), K(e, c);
	}), k(o), z((e) => q(c, e), [() => H(n)("palette.title")]), K(e, o), j();
}
W(["click", "pointerdown"]);
// src/ui/publish/ConflictBanner.svelte
var od = /* @__PURE__ */ G("<button type=\"button\" class=\"svelte-1ti6kqq\"> </button>"), sd = /* @__PURE__ */ G("<div class=\"conflict svelte-1ti6kqq\" role=\"alertdialog\" aria-modal=\"false\" tabindex=\"-1\"><strong> </strong> <p class=\"svelte-1ti6kqq\"> </p> <div class=\"actions svelte-1ti6kqq\"><button type=\"button\" class=\"primary svelte-1ti6kqq\"> </button> <button type=\"button\" class=\"svelte-1ti6kqq\"> </button> <!></div></div>"), cd = {
	hash: "svelte-1ti6kqq",
	code: ".conflict.svelte-1ti6kqq {margin:.5rem .75rem 0;padding:.75rem;border:2px solid var(--cpb-danger);border-radius:8px;background:#fef2f2;}.conflict.svelte-1ti6kqq:focus-visible {outline:2px solid var(--cpb-danger);outline-offset:2px;}p.svelte-1ti6kqq {margin:.25rem 0 .5rem;font-size:.875rem;}.actions.svelte-1ti6kqq {display:flex;flex-wrap:wrap;gap:.5rem;}button.svelte-1ti6kqq {font:inherit;font-size:.85rem;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.primary.svelte-1ti6kqq {background:var(--cpb-danger);border-color:var(--cpb-danger);color:#fff;}button.svelte-1ti6kqq:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:2px;}"
};
function ld(e, t) {
	A(t, !0), X(e, cd);
	let n = /* @__PURE__ */ N(() => t.store.t), r = /* @__PURE__ */ P(void 0);
	qr(() => {
		t.store.status === "conflict" && Ii().then(() => H(r)?.focus());
	});
	var i = ta(), a = L(i), o = (e) => {
		var i = sd(), a = I(i), o = I(a, !0);
		k(a);
		var s = R(a, 2), c = I(s, !0);
		k(s);
		var l = R(s, 2), u = I(l), d = I(u, !0);
		k(u);
		var f = R(u, 2), p = I(f, !0);
		k(f);
		var m = R(f, 2), h = (e) => {
			var r = od(), i = I(r, !0);
			k(r), z((e) => q(i, e), [() => H(n)("conflict.view")]), U("click", r, () => t.onView?.(t.store.conflictRevision)), K(e, r);
		};
		J(m, (e) => {
			t.onView && t.store.conflictRevision && e(h);
		}), k(l), k(i), Wa(i, (e) => F(r, e), () => H(r)), z((e, n, r, l) => {
			Q(i, "aria-labelledby", `${t.uid}-conflict-title`), Q(i, "aria-describedby", `${t.uid}-conflict-body`), Q(a, "id", `${t.uid}-conflict-title`), q(o, e), Q(s, "id", `${t.uid}-conflict-body`), q(c, n), q(d, r), q(p, l);
		}, [
			() => H(n)("conflict.title"),
			() => H(n)("conflict.body", {
				revision: t.store.conflictRevision ?? "?",
				base: t.store.revision
			}),
			() => H(n)("conflict.keepMine"),
			() => H(n)("conflict.takeTheirs")
		]), U("click", u, () => t.store.resolve("keep-mine")), U("click", f, () => t.store.resolve("take-theirs")), K(e, i);
	};
	J(a, (e) => {
		t.store.status === "conflict" && e(o);
	}), K(e, i), j();
}
W(["click"]);
// src/ui/publish/ServerView.svelte
var ud = /* @__PURE__ */ G("<p class=\"note svelte-ztrun4\"> </p>"), dd = /* @__PURE__ */ G("<p class=\"note svelte-ztrun4\" role=\"status\"> </p>"), fd = /* @__PURE__ */ G("<iframe sandbox=\"\" class=\"svelte-ztrun4\"></iframe>"), pd = /* @__PURE__ */ G("<div class=\"server svelte-ztrun4\"><div class=\"bar svelte-ztrun4\"><strong> </strong> <button type=\"button\" class=\"svelte-ztrun4\"> </button></div> <!> <!></div>"), md = {
	hash: "svelte-ztrun4",
	code: ".server.svelte-ztrun4 {background:var(--cpb-canvas);padding:.5rem 1rem 1rem;min-height:0;display:flex;flex-direction:column;gap:.5rem;}.bar.svelte-ztrun4 {display:flex;align-items:center;gap:.75rem;}.note.svelte-ztrun4 {margin:0;font-size:.8rem;color:var(--cpb-muted);}button.svelte-ztrun4 {margin-left:auto;font:inherit;font-size:.8rem;padding:.3rem .7rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}iframe.svelte-ztrun4 {flex:1;width:100%;min-height:480px;border:1px solid var(--cpb-border);border-radius:8px;background:#fff;}"
};
function hd(e, t) {
	A(t, !0), X(e, md);
	let n = Ga(t, "stylesheets", 19, () => []), r = /* @__PURE__ */ N(() => t.store.t), i = /* @__PURE__ */ P(null);
	qr(() => {
		let e = t.store.session.transport.render, n = t.revision;
		F(i, null), e && e.call(t.store.session.transport, t.store.session.pageId, n).then((e) => {
			n === t.revision && F(i, e, !0);
		}).catch((e) => t.store.fail(e));
	});
	let a = /* @__PURE__ */ N(() => H(i) === null ? "" : $a(n()).replace("</head>", `<style data-cms-page>${H(i).css.replace(/<\/style/gi, "<\\/style")}</style></head>`).replace("<body></body>", `<body>${H(i).html}</body>`));
	var o = pd(), s = I(o), c = I(s), l = I(c, !0);
	k(c);
	var u = R(c, 2), d = I(u, !0);
	k(u), k(s);
	var f = R(s, 2), p = (e) => {
		var t = ud(), n = I(t, !0);
		k(t), z((e) => q(n, e), [() => H(r)("server.dirty")]), K(e, t);
	};
	J(f, (e) => {
		t.store.dirty && e(p);
	});
	var m = R(f, 2), h = (e) => {
		var t = dd(), n = I(t, !0);
		k(t), z((e) => q(n, e), [() => H(r)("server.loading")]), K(e, t);
	}, g = (e) => {
		var t = fd();
		z((e) => {
			Q(t, "title", e), Q(t, "srcdoc", H(a));
		}, [() => H(r)("server.frame")]), K(e, t);
	};
	J(m, (e) => {
		H(i) === null ? e(h) : e(g, -1);
	}), k(o), z((e, t) => {
		q(l, e), q(d, t);
	}, [() => H(r)("server.title", { revision: t.revision }), () => H(r)("server.back")]), U("click", u, function(...e) {
		t.onBack?.apply(this, e);
	}), K(e, o), j();
}
W(["click"]);
// src/ui/model/flatten.ts
var gd = (e) => {
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
}, _d = (e) => {
	if (!(e.ctrlKey || e.metaKey) || e.altKey) return null;
	let t = e.key.toLowerCase();
	return t === "z" ? e.shiftKey ? { type: "redo" } : { type: "undo" } : t === "y" ? { type: "redo" } : null;
}, vd = (e, t, n) => {
	let r = gd(e), i = r[0];
	if (!i) return null;
	let a = t === null ? -1 : r.findIndex((e) => e.id === t), o = r[a];
	if (!o) return n.key === "ArrowDown" || n.key === "Home" ? {
		type: "select",
		id: i.id
	} : null;
	let s = e.nodes[o.id], c = w(e, o.parent), l = n.ctrlKey || n.metaKey;
	if (n.altKey && !l) switch (n.key) {
		case "ArrowUp": return o.index > 0 ? yd(o.id, o.parent, o.index - 1) : null;
		case "ArrowDown": return o.index < c.length - 1 ? yd(o.id, o.parent, o.index + 2) : null;
		case "ArrowRight": {
			let t = c[o.index - 1];
			return t ? yd(o.id, t, e.nodes[t]?.children.length ?? 0) : null;
		}
		case "ArrowLeft": {
			if (o.parent === null) return null;
			let t = e.nodes[o.parent], n = w(e, t?.parent ?? null);
			return yd(o.id, t?.parent ?? null, n.indexOf(o.parent) + 1);
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
	if (l || n.altKey) return _d(n);
	switch (n.key) {
		case "ArrowDown": return bd(r[a + 1]?.id);
		case "ArrowUp": return bd(r[a - 1]?.id);
		case "Home": return bd(i.id);
		case "End": return bd(r[r.length - 1]?.id);
		case "ArrowRight": return bd(s?.children[0]);
		case "ArrowLeft": return bd(o.parent ?? void 0);
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
}, yd = (e, t, n) => ({
	type: "command",
	command: {
		kind: "move",
		id: e,
		parent: t,
		index: n
	}
}), bd = (e) => e ? {
	type: "select",
	id: e
} : null, xd = /* @__PURE__ */ G("<p class=\"empty svelte-y2i8n1\"> </p>"), Sd = /* @__PURE__ */ G("<li role=\"treeitem\" class=\"svelte-y2i8n1\"> </li>"), Cd = /* @__PURE__ */ G("<ul role=\"tree\" aria-labelledby=\"cpb-structure-title\" aria-describedby=\"cpb-structure-help\" class=\"svelte-y2i8n1\"></ul>"), wd = /* @__PURE__ */ G("<section class=\"structure svelte-y2i8n1\" aria-labelledby=\"cpb-structure-title\"><h2 id=\"cpb-structure-title\" class=\"svelte-y2i8n1\"> </h2> <p class=\"help svelte-y2i8n1\" id=\"cpb-structure-help\"> </p> <!></section>"), Td = {
	hash: "svelte-y2i8n1",
	code: ".structure.svelte-y2i8n1 {padding:.5rem .75rem;overflow:auto;border-top:1px solid var(--cpb-border);}h2.svelte-y2i8n1 {font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin:0;color:var(--cpb-muted);}.help.svelte-y2i8n1, .empty.svelte-y2i8n1 {font-size:.75rem;color:var(--cpb-muted);margin:.25rem 0 .5rem;}ul.svelte-y2i8n1 {list-style:none;margin:0;padding:0;outline:none;}li.svelte-y2i8n1 {font-size:.85rem;padding:.25rem .375rem;border-radius:4px;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}li[aria-selected='true'].svelte-y2i8n1 {background:var(--cpb-accent-soft);color:var(--cpb-accent-strong);font-weight:600;}li.svelte-y2i8n1:focus-visible, ul.svelte-y2i8n1:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:-2px;}"
};
function Ed(e, t) {
	A(t, !0), X(e, Td);
	let n = /* @__PURE__ */ N(() => t.store.t), r = /* @__PURE__ */ N(() => gd(t.store.tree)), i = /* @__PURE__ */ P(void 0), a = (e) => {
		let n = t.store.tree.nodes[e];
		if (!n) return e;
		let r = typeof n.fields.label == "string" && n.fields.label !== "" ? n.fields.label : null, i = t.store.catalogue?.get(n.type);
		return r ? `${r} (${i?.label ?? n.type})` : i?.label ?? n.type;
	};
	async function o(e) {
		await Ii(), ((e ? H(i)?.querySelector(`[data-node-id="${CSS.escape(e)}"]`) : null) ?? H(i))?.focus();
	}
	async function s(e) {
		if ((e.key === "F2" || e.key === "Enter") && t.store.selection && !e.altKey) {
			t.onEdit(t.store.selection) && e.preventDefault();
			return;
		}
		let n = vd(t.store.tree, t.store.selection, e);
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
	var c = { focusItem: o }, l = wd(), u = I(l), d = I(u, !0);
	k(u);
	var f = R(u, 2), p = I(f, !0);
	k(f);
	var m = R(f, 2), h = (e) => {
		var t = xd(), r = I(t, !0);
		k(t), z((e) => q(r, e), [() => H(n)("structure.empty")]), K(e, t);
	}, g = (e) => {
		var n = Cd();
		Y(n, 21, () => H(r), (e) => e.id, (e, n) => {
			var r = Sd();
			let i;
			var o = I(r, !0);
			k(r), z((e) => {
				Q(r, "aria-level", H(n).depth), Q(r, "aria-setsize", H(n).siblings), Q(r, "aria-posinset", H(n).index + 1), Q(r, "aria-selected", t.store.selection === H(n).id), Q(r, "tabindex", t.store.selection === H(n).id ? 0 : -1), Q(r, "data-node-id", H(n).id), i = wa(r, "", i, { "padding-left": `${(H(n).depth - 1) * 14 + 6}px` }), q(o, e);
			}, [() => a(H(n).id)]), U("click", r, () => t.store.select(H(n).id)), qi("focus", r, () => t.store.selection !== H(n).id && t.store.select(H(n).id)), U("keydown", r, () => {}), K(e, r);
		}), k(n), Wa(n, (e) => F(i, e), () => H(i)), z(() => Q(n, "tabindex", t.store.selection ? -1 : 0)), U("keydown", n, s), K(e, n);
	};
	return J(m, (e) => {
		H(r).length === 0 ? e(h) : e(g, -1);
	}), k(l), z((e, t) => {
		q(d, e), q(p, t);
	}, [() => H(n)("structure.title"), () => H(n)("structure.help")]), K(e, l), j(c);
}
W(["keydown", "click"]);
// src/ui/toolbar/Toolbar.svelte
var Dd = /* @__PURE__ */ G("<button type=\"button\" class=\"primary svelte-ouhh5d\"> </button>"), Od = /* @__PURE__ */ G("<button type=\"button\" class=\"svelte-ouhh5d\"> </button>"), kd = /* @__PURE__ */ G("<button type=\"button\" class=\"svelte-ouhh5d\"> </button>"), Ad = /* @__PURE__ */ G("<button type=\"button\" class=\"svelte-ouhh5d\"> </button>"), jd = /* @__PURE__ */ G("<span class=\"revision svelte-ouhh5d\"> <span data-publication=\"\"> </span></span>"), Md = /* @__PURE__ */ G("<div class=\"toolbar svelte-ouhh5d\" role=\"toolbar\"><button type=\"button\" aria-keyshortcuts=\"Control+Z\" class=\"svelte-ouhh5d\"> </button> <button type=\"button\" aria-keyshortcuts=\"Control+Shift+Z\" class=\"svelte-ouhh5d\"> </button> <button type=\"button\" aria-keyshortcuts=\"Control+S\" class=\"svelte-ouhh5d\"> </button> <!> <!> <!> <!> <span class=\"status svelte-ouhh5d\"> </span> <!></div>"), Nd = {
	hash: "svelte-ouhh5d",
	code: ".toolbar.svelte-ouhh5d {display:flex;flex-wrap:wrap;gap:.5rem;align-items:center;padding:.5rem .75rem;border-bottom:1px solid var(--cpb-border);}button.svelte-ouhh5d {font:inherit;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.svelte-ouhh5d:disabled {opacity:.5;cursor:not-allowed;}button.primary.svelte-ouhh5d {background:var(--cpb-accent);border-color:var(--cpb-accent);color:#fff;}button[aria-pressed='true'].svelte-ouhh5d {background:var(--cpb-accent-soft);border-color:var(--cpb-accent);}button.svelte-ouhh5d:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:2px;}.status.svelte-ouhh5d {margin-left:auto;font-size:.875rem;}.status[data-status='conflict'].svelte-ouhh5d, .status[data-status='offline'].svelte-ouhh5d, .status[data-status='load-error'].svelte-ouhh5d {color:var(--cpb-danger);font-weight:600;}.revision.svelte-ouhh5d {font-size:.75rem;color:var(--cpb-muted);}"
};
function Pd(e, t) {
	A(t, !0), X(e, Nd);
	let n = Ga(t, "store", 7), r = /* @__PURE__ */ N(() => n().t), i = /* @__PURE__ */ N(() => n().publishedRevision === null ? H(r)("publication.none") : n().unpublished ? H(r)("publication.pending", { revision: n().publishedRevision }) : H(r)("publication.current"));
	var a = Md(), o = I(a), s = I(o, !0);
	k(o);
	var c = R(o, 2), l = I(c, !0);
	k(c);
	var u = R(c, 2), d = I(u, !0);
	k(u);
	var f = R(u, 2), p = (e) => {
		var t = Dd(), i = I(t, !0);
		k(t), z((e) => {
			t.disabled = n().publishing || n().status !== "ready" || !(n().unpublished || n().part?.rulesUnpublished), q(i, e);
		}, [() => n().publishing ? H(r)("toolbar.publishing") : H(r)("toolbar.publish")]), U("click", t, () => n().part ? n().part.publish() : n().publish()), K(e, t);
	};
	J(f, (e) => {
		n().canPublish && e(p);
	});
	var m = R(f, 2), h = (e) => {
		var t = Od(), i = I(t, !0);
		k(t), z((e) => {
			Q(t, "aria-pressed", n().part.open), q(i, e);
		}, [() => H(r)("parts.open")]), U("click", t, () => {
			n().part.open = !n().part.open;
		}), K(e, t);
	};
	J(m, (e) => {
		n().part && e(h);
	});
	var g = R(m, 2), _ = (e) => {
		var t = kd(), i = I(t, !0);
		k(t), z((e) => {
			Q(t, "aria-pressed", n().designOpen), q(i, e);
		}, [() => H(r)("design.open")]), U("click", t, () => {
			n().designOpen = !n().designOpen;
		}), K(e, t);
	};
	J(g, (e) => {
		n().designAvailable && e(_);
	});
	var v = R(g, 2), y = (e) => {
		var n = Ad(), i = I(n, !0);
		k(n), z((e) => {
			Q(n, "aria-pressed", t.serverView), q(i, e);
		}, [() => H(r)("toolbar.serverView")]), U("click", n, function(...e) {
			t.onServerView?.apply(this, e);
		}), K(e, n);
	};
	J(v, (e) => {
		t.onServerView && e(y);
	});
	var b = R(v, 2), x = I(b, !0);
	k(b);
	var S = R(b, 2), C = (e) => {
		var t = jd(), a = I(t), o = R(a), s = I(o, !0);
		k(o), k(t), z((e) => {
			q(a, `${e ?? ""} · `), q(s, H(i));
		}, [() => H(r)("toolbar.revision", { revision: n().revision })]), K(e, t);
	};
	J(S, (e) => {
		n().revision > 0 && e(C);
	}), k(a), z((e, t, r, i, f) => {
		Q(a, "aria-label", e), o.disabled = !n().canUndo, q(s, t), c.disabled = !n().canRedo, q(l, r), u.disabled = !n().dirty || n().status === "saving" || n().status === "conflict", q(d, i), Q(b, "data-status", n().status), q(x, f);
	}, [
		() => H(r)("editor.label"),
		() => H(r)("toolbar.undo"),
		() => H(r)("toolbar.redo"),
		() => H(r)("toolbar.save"),
		() => H(r)(`status.${n().status}`)
	]), U("click", o, () => n().undo()), U("click", c, () => n().redo()), U("click", u, () => n().save()), K(e, a), j();
}
W(["click"]);
// src/ui/Editor.svelte
var Fd = /* @__PURE__ */ G("<div class=\"editor svelte-b7je3p\" role=\"application\"><!> <!> <div class=\"body svelte-b7je3p\"><aside class=\"left svelte-b7je3p\"><!> <!></aside> <!> <!></div> <!> <!> <!> <div class=\"sr-only svelte-b7je3p\" aria-live=\"polite\"> </div> <div class=\"sr-only svelte-b7je3p\" aria-live=\"assertive\" role=\"alert\"> </div></div>"), Id = {
	hash: "svelte-b7je3p",
	code: ".editor.svelte-b7je3p {--cpb-border: #d4d4d8;--cpb-surface: #fff;--cpb-canvas: #f1f5f9;--cpb-muted: #52525b;--cpb-accent: #2563eb;--cpb-accent-soft: #dbeafe;--cpb-accent-strong: #1e3a8a;--cpb-danger: #b91c1c;font:14px/1.4 system-ui, sans-serif;color:#18181b;background:var(--cpb-surface);display:flex;flex-direction:column;height:100%;min-height:600px;border:1px solid var(--cpb-border);}.body.svelte-b7je3p {flex:1;display:grid;grid-template-columns:240px 1fr 280px;min-height:0;}.left.svelte-b7je3p {display:grid;grid-template-rows:minmax(0, 45%) minmax(0, 1fr);min-height:0;border-right:1px solid var(--cpb-border);}.sr-only.svelte-b7je3p {position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;}\n  @media (max-width: 900px) {.body.svelte-b7je3p {grid-template-columns:1fr;} }"
};
function Ld(e, t) {
	A(t, !0), X(e, Id);
	let n = Ga(t, "stylesheets", 19, () => []), r = /* @__PURE__ */ P(void 0), i = /* @__PURE__ */ P(void 0), a = /* @__PURE__ */ N(() => new Dc(t.store)), o = /* @__PURE__ */ N(() => new $o(t.store)), s = /* @__PURE__ */ P(!1), c = /* @__PURE__ */ P(!1), l = !1;
	qr(() => {
		t.store.status === "ready" && !l && (l = !0, H(o).loadTemplates());
	});
	let u = /* @__PURE__ */ P(null), d = /* @__PURE__ */ N(() => typeof t.store.session.transport.render == "function");
	function f(e) {
		if ((e.ctrlKey || e.metaKey) && !e.altKey && e.key.toLowerCase() === "s") {
			e.preventDefault(), t.store.dirty && t.store.save();
			return;
		}
		if (e.target?.closest("input, textarea, select, [contenteditable=\"true\"], [role=\"tree\"]")) return;
		let n = _d(e);
		n && (e.preventDefault(), n.type === "undo" ? t.store.undo() : n.type === "redo" && t.store.redo());
	}
	var p = Fd(), m = I(p);
	{
		let e = /* @__PURE__ */ N(() => H(u) !== null), n = /* @__PURE__ */ N(() => H(d) ? () => {
			F(u, H(u) === null ? t.store.revision : null, !0);
		} : null);
		Pd(m, {
			get store() {
				return t.store;
			},
			get serverView() {
				return H(e);
			},
			get onServerView() {
				return H(n);
			}
		});
	}
	var h = R(m, 2);
	{
		let e = /* @__PURE__ */ N(() => H(d) ? (e) => {
			F(u, e, !0);
		} : null);
		ld(h, {
			get store() {
				return t.store;
			},
			get uid() {
				return t.uid;
			},
			get onView() {
				return H(e);
			}
		});
	}
	var g = R(h, 2), _ = I(g), v = I(_);
	ad(v, {
		get store() {
			return t.store;
		},
		get drag() {
			return H(a);
		},
		get content() {
			return H(o);
		},
		onInserted: (e) => H(r)?.focusItem(e),
		onImport: () => {
			F(s, !0);
		}
	}), Wa(Ed(R(v, 2), {
		get store() {
			return t.store;
		},
		onEdit: (e) => H(i)?.startEditing(e) ?? !1
	}), (e) => F(r, e, !0), () => H(r)), k(_);
	var y = R(_, 2), b = (e) => {
		hd(e, {
			get store() {
				return t.store;
			},
			get revision() {
				return H(u);
			},
			get stylesheets() {
				return n();
			},
			onBack: () => {
				F(u, null);
			}
		});
	}, x = (e) => {
		Wa(Jo(e, {
			get store() {
				return t.store;
			},
			get drag() {
				return H(a);
			},
			get uid() {
				return t.uid;
			},
			get stylesheets() {
				return n();
			},
			onEditEnd: (e, t) => {
				t && H(r)?.focusItem(e);
			}
		}), (e) => F(i, e, !0), () => H(i));
	};
	J(y, (e) => {
		H(u) === null ? e(x, -1) : e(b);
	});
	var S = R(y, 2), C = (e) => {
		Zu(e, {
			get store() {
				return t.store;
			},
			get uid() {
				return t.uid;
			}
		});
	}, w = (e) => {
		hc(e, {
			get store() {
				return t.store;
			},
			get uid() {
				return t.uid;
			}
		});
	}, ee = (e) => {
		$l(e, {
			get store() {
				return t.store;
			},
			get uid() {
				return t.uid;
			},
			get canTemplates() {
				return H(o).canTemplates;
			},
			onRemoved: () => H(r)?.focusItem(t.store.selection),
			onSaveTemplate: () => {
				F(c, !0);
			}
		});
	};
	J(S, (e) => {
		t.store.part?.open ? e(C) : t.store.designOpen ? e(w, 1) : e(ee, -1);
	}), k(g);
	var T = R(g, 2);
	as(T, {
		get store() {
			return t.store;
		},
		get content() {
			return H(o);
		},
		get uid() {
			return t.uid;
		},
		get open() {
			return H(s);
		},
		set open(e) {
			F(s, e, !0);
		}
	});
	var te = R(T, 2);
	vc(te, {
		get store() {
			return t.store;
		},
		get content() {
			return H(o);
		},
		get uid() {
			return t.uid;
		},
		get nodeId() {
			return t.store.selection;
		},
		get open() {
			return H(c);
		},
		set open(e) {
			F(c, e, !0);
		}
	});
	var E = R(te, 2), ne = (e) => {
		_u(e, {
			get store() {
				return t.store;
			},
			get uid() {
				return t.uid;
			}
		});
	};
	J(E, (e) => {
		t.store.media.available && e(ne);
	});
	var re = R(E, 2), ie = I(re, !0);
	k(re);
	var ae = R(re, 2), oe = I(ae, !0);
	k(ae), k(p), z((e) => {
		Q(p, "aria-label", e), q(ie, t.store.message), q(oe, t.store.alert);
	}, [() => t.store.t("editor.label")]), U("keydown", p, f), K(e, p), j();
}
W(["keydown"]);
// src/ui/i18n/components.ts
var Rd = {
	"canvas.empty": "{type}: nada que mostrar todavía",
	"canvas.menu": "Menú «{slug}» (los enlaces se ven en la página publicada)",
	"gallery.add": "Añadir imagen",
	"gallery.empty": "Sin imágenes.",
	"gallery.item": "Imagen {n}",
	"gallery.caption": "Pie de foto",
	"gallery.up": "Subir imagen {n}",
	"gallery.down": "Bajar imagen {n}",
	"gallery.remove": "Quitar imagen {n}"
}, zd = {
	"canvas.empty": "{type}: nothing to show yet",
	"canvas.menu": "Menu «{slug}» (links show on the published page)",
	"gallery.add": "Add image",
	"gallery.empty": "No images.",
	"gallery.item": "Image {n}",
	"gallery.caption": "Caption",
	"gallery.up": "Move image {n} up",
	"gallery.down": "Move image {n} down",
	"gallery.remove": "Remove image {n}"
}, Bd = {
	"media.title": "Biblioteca de medios",
	"media.library": "Biblioteca",
	"media.upload": "Subir archivo",
	"media.search": "Buscar por nombre o texto alternativo",
	"media.empty": "No hay imágenes.",
	"media.more": "Cargar más",
	"media.use": "Usar esta imagen",
	"media.close": "Cerrar",
	"media.choose": "Elegir imagen",
	"media.replace": "Cambiar",
	"media.removeFrom": "Quitar imagen de {field}",
	"media.missing": "No disponible",
	"media.asset": "imagen",
	"media.decorative": "Decorativa (sin texto alternativo)",
	"media.useAlt": "Texto alternativo en esta página",
	"media.alt": "Texto alternativo",
	"media.altHelp": "Describe la imagen para quien no la ve. Se usa salvo que la página indique otro.",
	"media.saveAlt": "Guardar texto",
	"media.altSaved": "Texto alternativo guardado",
	"media.delete": "Eliminar archivo",
	"media.deleted": "Archivo eliminado",
	"media.usedIn": "No se puede eliminar: se usa en {where}.",
	"media.design": "el diseño del sitio",
	"media.layout": "el pie de la plantilla «{name}»",
	"media.file": "Archivo",
	"media.sizes": "Tamaños a generar",
	"media.recommended": "{width} px (recomendado)",
	"media.width": "{width} px",
	"media.optimize": "Optimizar (recomprimir y quitar metadatos)",
	"media.webp": "Convertir a WebP",
	"media.uploading": "Subiendo…",
	"media.uploaded": "Archivo subido: {name}",
	"media.typeError": "Solo se aceptan imágenes JPEG, PNG, GIF o WebP.",
	"media.sizeError": "El archivo supera {size} MB.",
	"media.dimensions": "{width} × {height} px",
	"media.selected": "Seleccionada: {name}",
	"error.MEDIA_IN_USE": "El archivo está en uso; quítalo de las páginas primero."
}, Vd = {
	"media.title": "Media library",
	"media.library": "Library",
	"media.upload": "Upload file",
	"media.search": "Search by name or alternative text",
	"media.empty": "No images.",
	"media.more": "Load more",
	"media.use": "Use this image",
	"media.close": "Close",
	"media.choose": "Choose image",
	"media.replace": "Replace",
	"media.removeFrom": "Remove image from {field}",
	"media.missing": "Unavailable",
	"media.asset": "image",
	"media.decorative": "Decorative (no alternative text)",
	"media.useAlt": "Alternative text on this page",
	"media.alt": "Alternative text",
	"media.altHelp": "Describe the image for people who cannot see it. Used unless the page sets another.",
	"media.saveAlt": "Save text",
	"media.altSaved": "Alternative text saved",
	"media.delete": "Delete file",
	"media.deleted": "File deleted",
	"media.usedIn": "Cannot delete: used in {where}.",
	"media.design": "the site design",
	"media.layout": "the footer of the layout «{name}»",
	"media.file": "File",
	"media.sizes": "Sizes to generate",
	"media.recommended": "{width} px (recommended)",
	"media.width": "{width} px",
	"media.optimize": "Optimize (recompress and strip metadata)",
	"media.webp": "Convert to WebP",
	"media.uploading": "Uploading…",
	"media.uploaded": "File uploaded: {name}",
	"media.typeError": "Only JPEG, PNG, GIF or WebP images are accepted.",
	"media.sizeError": "The file is larger than {size} MB.",
	"media.dimensions": "{width} × {height} px",
	"media.selected": "Selected: {name}",
	"error.MEDIA_IN_USE": "The file is in use; remove it from the pages first."
}, Hd = {
	"parts.open": "Reglas",
	"parts.title": "Dónde se usa «{name}»",
	"parts.kind.header": "Cabecera",
	"parts.kind.footer": "Pie",
	"parts.kind.not_found": "Página 404",
	"parts.kind.single": "Página de un registro",
	"parts.kind.archive": "Listado de una fuente",
	"parts.kind.search": "Resultados de búsqueda",
	"parts.target.sources": "Fuentes de datos",
	"parts.include": "Se usa en",
	"parts.exclude": "Excepto en",
	"parts.add": "Añadir",
	"parts.remove": "Quitar regla {n}",
	"parts.type": "Tipo de la regla {n}",
	"parts.target.site": "Todo el sitio",
	"parts.target.home": "Portada",
	"parts.target.pages": "Páginas",
	"parts.target.path_prefix": "Rutas que empiezan por",
	"parts.target.layouts": "Páginas con el layout",
	"parts.target.routes": "Rutas del sitio",
	"parts.value": "Valor de la regla {n}",
	"parts.locales": "Idiomas (vacío = todos; por ejemplo es, en)",
	"parts.session": "Visitantes",
	"parts.session.any": "Con o sin sesión",
	"parts.session.with": "Solo con sesión",
	"parts.session.without": "Solo sin sesión",
	"parts.sessionHelp": "Cambia lo que se ve, nunca quién puede entrar.",
	"parts.priority": "Prioridad (−100 a 100; gana la mayor)",
	"parts.save": "Guardar reglas",
	"parts.saved": "Reglas guardadas (sin publicar)",
	"parts.published": "Parte publicada",
	"parts.impact": "Ver impacto",
	"parts.impactTotal": "Al publicar cambian {total} contextos.",
	"parts.impactNone": "Publicar no cambia ninguna página.",
	"parts.conflicts": "Empates que impiden publicar",
	"parts.conflictAt": "{path}: {parts}",
	"parts.change": "{path}: {before} → {after}",
	"parts.nothing": "nada",
	"parts.preview": "Previsualizar en",
	"parts.previewShow": "Previsualizar",
	"parts.preview404": "Una página que no existe (404)",
	"parts.previewFrame": "Vista previa de la parte en contexto",
	"parts.notApplied": "Con estas reglas, la parte no se usa aquí.",
	"parts.invalid": "Regla no válida en {path} ({reason}).",
	"parts.unpublishedRules": "Hay reglas sin publicar.",
	"error.SITE_PART_CONFLICT": "Hay partes del mismo tipo empatadas; cambia su prioridad o sus reglas."
}, Ud = {
	"parts.open": "Rules",
	"parts.title": "Where «{name}» is used",
	"parts.kind.header": "Header",
	"parts.kind.footer": "Footer",
	"parts.kind.not_found": "404 page",
	"parts.kind.single": "Record page",
	"parts.kind.archive": "Source listing",
	"parts.kind.search": "Search results",
	"parts.target.sources": "Data sources",
	"parts.include": "Used on",
	"parts.exclude": "Except on",
	"parts.add": "Add",
	"parts.remove": "Remove rule {n}",
	"parts.type": "Type of rule {n}",
	"parts.target.site": "The whole site",
	"parts.target.home": "Home page",
	"parts.target.pages": "Pages",
	"parts.target.path_prefix": "Paths starting with",
	"parts.target.layouts": "Pages with the layout",
	"parts.target.routes": "Site routes",
	"parts.value": "Value of rule {n}",
	"parts.locales": "Languages (empty = all; e.g. es, en)",
	"parts.session": "Visitors",
	"parts.session.any": "With or without session",
	"parts.session.with": "Only with session",
	"parts.session.without": "Only without session",
	"parts.sessionHelp": "It changes what is shown, never who may enter.",
	"parts.priority": "Priority (−100 to 100; highest wins)",
	"parts.save": "Save rules",
	"parts.saved": "Rules saved (not published)",
	"parts.published": "Part published",
	"parts.impact": "Show impact",
	"parts.impactTotal": "Publishing changes {total} contexts.",
	"parts.impactNone": "Publishing changes no page.",
	"parts.conflicts": "Ties that block publishing",
	"parts.conflictAt": "{path}: {parts}",
	"parts.change": "{path}: {before} → {after}",
	"parts.nothing": "nothing",
	"parts.preview": "Preview on",
	"parts.previewShow": "Preview",
	"parts.preview404": "A page that does not exist (404)",
	"parts.previewFrame": "Preview of the part in context",
	"parts.notApplied": "With these rules, the part is not used here.",
	"parts.invalid": "Invalid rule at {path} ({reason}).",
	"parts.unpublishedRules": "There are unpublished rules.",
	"error.SITE_PART_CONFLICT": "Parts of the same kind tie; change their priority or their rules."
}, Wd = {
	"data.title": "Consulta",
	"data.unavailable": "Este sitio no tiene fuentes de datos.",
	"data.id": "Nombre de la consulta",
	"data.source": "Fuente",
	"data.chooseSource": "Elige una fuente…",
	"data.currentSource": "La fuente de esta página (listado o registro)",
	"data.recordUrl": "Dirección del registro",
	"data.pageSize": "Elementos por página",
	"data.pagination": "Dividir en páginas",
	"data.pageParam": "Parámetro de página en la URL",
	"data.filters": "Filtros",
	"data.sort": "Orden",
	"data.urlParams": "Filtros del visitante (parámetros de la URL)",
	"data.add": "Añadir",
	"data.remove": "Quitar",
	"data.field": "Campo",
	"data.operator": "Condición",
	"data.value": "Valor",
	"data.asc": "Ascendente",
	"data.desc": "Descendente",
	"data.param": "Parámetro",
	"data.search": "Búsqueda",
	"data.filter": "Filtro",
	"data.apply": "Aplicar",
	"data.preview": "{count} resultados (vista de un visitante)",
	"data.previewEmpty": "Sin resultados para un visitante.",
	"data.previewError": "La fuente no respondió o la consulta no es válida: {code}",
	"data.bindings": "Datos del elemento",
	"data.bindingsHint": "Muestra un campo de cada resultado en esta propiedad.",
	"data.noBinding": "Sin dato (texto fijo)",
	"data.transform": "Formato",
	"data.noTransform": "Tal cual",
	"data.fallback": "Si está vacío",
	"query.id": "El nombre usa minúsculas, números y _.",
	"query.source": "Elige una fuente.",
	"query.pageSize": "Tamaño de página fuera del límite de la fuente.",
	"query.field": "Campo no disponible en la fila {row}.",
	"query.operator": "Condición no válida para el campo en la fila {row}.",
	"query.param": "Parámetro de URL no válido o repetido.",
	"advanced.query": "Los resultados de la consulta"
}, Gd = {
	"data.title": "Query",
	"data.unavailable": "This site has no data sources.",
	"data.id": "Query name",
	"data.source": "Source",
	"data.chooseSource": "Choose a source…",
	"data.currentSource": "The source of this page (listing or record)",
	"data.recordUrl": "Record address",
	"data.pageSize": "Items per page",
	"data.pagination": "Split into pages",
	"data.pageParam": "Page parameter in the URL",
	"data.filters": "Filters",
	"data.sort": "Order",
	"data.urlParams": "Visitor filters (URL parameters)",
	"data.add": "Add",
	"data.remove": "Remove",
	"data.field": "Field",
	"data.operator": "Condition",
	"data.value": "Value",
	"data.asc": "Ascending",
	"data.desc": "Descending",
	"data.param": "Parameter",
	"data.search": "Search",
	"data.filter": "Filter",
	"data.apply": "Apply",
	"data.preview": "{count} results (as a visitor sees them)",
	"data.previewEmpty": "No results for a visitor.",
	"data.previewError": "The source did not answer or the query is invalid: {code}",
	"data.bindings": "Item data",
	"data.bindingsHint": "Show a field of each result in this property.",
	"data.noBinding": "No data (fixed text)",
	"data.transform": "Format",
	"data.noTransform": "As is",
	"data.fallback": "When empty",
	"query.id": "Use lowercase letters, digits and _.",
	"query.source": "Choose a source.",
	"query.pageSize": "Page size outside the source limit.",
	"query.field": "Field not available in row {row}.",
	"query.operator": "Condition not valid for the field in row {row}.",
	"query.param": "Invalid or repeated URL parameter.",
	"advanced.query": "The results of the query"
}, Kd = {
	...Vd,
	...zd,
	...Ud,
	...Gd,
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
	"advanced.host": "A source of the site",
	"advanced.moduleSlug": "Module (slug)",
	"advanced.hostSource": "Source (name)",
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
}, qd = {
	...Bd,
	...Rd,
	...Hd,
	...Wd,
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
	"advanced.host": "Una fuente del sitio",
	"advanced.moduleSlug": "Módulo (slug)",
	"advanced.hostSource": "Fuente (nombre)",
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
}, Jd = {
	es: qd,
	en: Kd
}, Yd = (e) => {
	let t = Jd[e.toLowerCase().split("-")[0] ?? "es"] ?? qd;
	return (e, n = {}) => t[e].replace(/\{(\w+)\}/g, (e, t) => String(n[t] ?? `{${t}}`));
}, Xd = class {
	transport;
	#e = /* @__PURE__ */ P({});
	get resolved() {
		return H(this.#e);
	}
	set resolved(e) {
		F(this.#e, e);
	}
	#t = /* @__PURE__ */ P(null);
	get settings() {
		return H(this.#t);
	}
	set settings(e) {
		F(this.#t, e);
	}
	#n = /* @__PURE__ */ P(null);
	get request() {
		return H(this.#n);
	}
	set request(e) {
		F(this.#n, e);
	}
	asked = /* @__PURE__ */ new Set();
	constructor(e) {
		this.transport = e;
	}
	get available() {
		return typeof this.transport.listMedia == "function";
	}
	async ensure(e) {
		let t = e.filter((e) => !this.asked.has(e));
		if (t.length !== 0 && this.transport.resolveMedia) {
			for (let e of t) this.asked.add(e);
			try {
				let e = await this.transport.resolveMedia(t);
				Object.keys(e).length > 0 && (this.resolved = {
					...this.resolved,
					...e
				});
			} catch {
				for (let e of t) this.asked.delete(e);
			}
		}
	}
	remember(e) {
		this.asked.add(e.id), this.resolved = {
			...this.resolved,
			[e.id]: e
		};
	}
	forget(e) {
		let { [e]: t, ...n } = this.resolved;
		this.resolved = n;
	}
	async loadSettings() {
		if (this.settings === null && this.transport.mediaSettings) try {
			this.settings = await this.transport.mediaSettings();
		} catch {
			return null;
		}
		return this.settings;
	}
	pick(e, t) {
		this.request = {
			current: e,
			onPick: t
		};
	}
	close() {
		this.request = null;
	}
	get assetUrls() {
		return Object.fromEntries(Object.entries(this.resolved).map(([e, t]) => [e, t.url]));
	}
}, Zd = class {
	transport;
	#e = /* @__PURE__ */ P(null);
	get sources() {
		return H(this.#e);
	}
	set sources(e) {
		F(this.#e, e);
	}
	#t = /* @__PURE__ */ P({});
	get schemas() {
		return H(this.#t);
	}
	set schemas(e) {
		F(this.#t, e);
	}
	#n = /* @__PURE__ */ P({});
	get previews() {
		return H(this.#n);
	}
	set previews(e) {
		F(this.#n, e);
	}
	#r = /* @__PURE__ */ P({});
	get errors() {
		return H(this.#r);
	}
	set errors(e) {
		F(this.#r, e);
	}
	asked = /* @__PURE__ */ new Map();
	askedSchemas = /* @__PURE__ */ new Set();
	constructor(e) {
		this.transport = e;
	}
	get available() {
		return typeof this.transport.listDataSources == "function";
	}
	async loadSources() {
		if (this.sources === null && this.transport.listDataSources) try {
			this.sources = await this.transport.listDataSources();
		} catch {
			this.sources = [];
		}
	}
	async schema(e) {
		if (this.schemas[e]) return this.schemas[e];
		if (e === "" || this.askedSchemas.has(e) || !this.transport.dataSourceSchema) return null;
		this.askedSchemas.add(e);
		try {
			let t = await this.transport.dataSourceSchema(e);
			return this.schemas = {
				...this.schemas,
				[e]: t
			}, t;
		} catch {
			return this.askedSchemas.delete(e), null;
		}
	}
	ensure(e) {
		if (this.transport.previewQuery) for (let t of Object.values(e.nodes)) {
			if (t.type !== "query") continue;
			let e = t.fields.props ?? {}, n = typeof e.id == "string" ? e.id : "", r = JSON.stringify(e);
			n !== "" && typeof e.source == "string" && e.source !== "" && this.asked.get(n) !== r && (this.asked.set(n, r), this.schema(e.source), this.preview(n, e));
		}
	}
	async preview(e, t) {
		try {
			let n = await this.transport.previewQuery(t);
			this.previews = {
				...this.previews,
				[e]: n
			};
			let { [e]: r, ...i } = this.errors;
			this.errors = i;
		} catch (t) {
			let n = t instanceof y ? t.details : {}, r = Object.entries(n).find(([e]) => ![
				"requestId",
				"apiCode",
				"status"
			].includes(e))?.[1] ?? n.apiCode ?? (t instanceof y ? t.code : "SERVER");
			this.errors = {
				...this.errors,
				[e]: String(r)
			}, this.previews = {
				...this.previews,
				[e]: {
					state: "error",
					items: [],
					pagination: {
						page: 1,
						page_size: 0,
						total: 0,
						pages: 0,
						has_more: !1
					}
				}
			};
		}
	}
}, Qd = class {
	session;
	t;
	#e = /* @__PURE__ */ P({
		nodes: {},
		rootIds: []
	});
	get tree() {
		return H(this.#e);
	}
	set tree(e) {
		F(this.#e, e);
	}
	#t = /* @__PURE__ */ P(null);
	get catalogue() {
		return H(this.#t);
	}
	set catalogue(e) {
		F(this.#t, e);
	}
	#n = /* @__PURE__ */ P(null);
	get selection() {
		return H(this.#n);
	}
	set selection(e) {
		F(this.#n, e, !0);
	}
	#r = /* @__PURE__ */ P("loading");
	get status() {
		return H(this.#r);
	}
	set status(e) {
		F(this.#r, e, !0);
	}
	#i = /* @__PURE__ */ P(!1);
	get dirty() {
		return H(this.#i);
	}
	set dirty(e) {
		F(this.#i, e, !0);
	}
	#a = /* @__PURE__ */ P(!1);
	get canUndo() {
		return H(this.#a);
	}
	set canUndo(e) {
		F(this.#a, e, !0);
	}
	#o = /* @__PURE__ */ P(!1);
	get canRedo() {
		return H(this.#o);
	}
	set canRedo(e) {
		F(this.#o, e, !0);
	}
	#s = /* @__PURE__ */ P(0);
	get revision() {
		return H(this.#s);
	}
	set revision(e) {
		F(this.#s, e, !0);
	}
	#c = /* @__PURE__ */ P(null);
	get publishedRevision() {
		return H(this.#c);
	}
	set publishedRevision(e) {
		F(this.#c, e, !0);
	}
	#l = /* @__PURE__ */ P(!1);
	get canPublish() {
		return H(this.#l);
	}
	set canPublish(e) {
		F(this.#l, e, !0);
	}
	#u = /* @__PURE__ */ P(!1);
	get publishing() {
		return H(this.#u);
	}
	set publishing(e) {
		F(this.#u, e, !0);
	}
	#d = /* @__PURE__ */ P(null);
	get conflictRevision() {
		return H(this.#d);
	}
	set conflictRevision(e) {
		F(this.#d, e, !0);
	}
	designSession;
	media;
	data;
	part = null;
	#f = /* @__PURE__ */ P(xe());
	get design() {
		return H(this.#f);
	}
	set design(e) {
		F(this.#f, e);
	}
	#p = /* @__PURE__ */ P(!1);
	get designDirty() {
		return H(this.#p);
	}
	set designDirty(e) {
		F(this.#p, e, !0);
	}
	#m = /* @__PURE__ */ P(null);
	get viewport() {
		return H(this.#m);
	}
	set viewport(e) {
		F(this.#m, e, !0);
	}
	#h = /* @__PURE__ */ P(null);
	get styleState() {
		return H(this.#h);
	}
	set styleState(e) {
		F(this.#h, e, !0);
	}
	#g = /* @__PURE__ */ P(!1);
	get designOpen() {
		return H(this.#g);
	}
	set designOpen(e) {
		F(this.#g, e, !0);
	}
	#_ = /* @__PURE__ */ P(!1);
	get designAvailable() {
		return H(this.#_);
	}
	set designAvailable(e) {
		F(this.#_, e, !0);
	}
	#v = /* @__PURE__ */ P(0);
	get designRevision() {
		return H(this.#v);
	}
	set designRevision(e) {
		F(this.#v, e, !0);
	}
	#y = /* @__PURE__ */ P(null);
	get designPublished() {
		return H(this.#y);
	}
	set designPublished(e) {
		F(this.#y, e, !0);
	}
	#b = /* @__PURE__ */ P("");
	get message() {
		return H(this.#b);
	}
	set message(e) {
		F(this.#b, e, !0);
	}
	#x = /* @__PURE__ */ P("");
	get alert() {
		return H(this.#x);
	}
	set alert(e) {
		F(this.#x, e, !0);
	}
	stops = [];
	constructor(e, t) {
		this.session = e, this.t = t, this.designSession = new Ae(e.transport), this.media = new Xd(e.transport), this.data = new Zd(e.transport), this.stops.push(this.designSession.events.on("change", () => {
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
	fail(e, t = e instanceof y ? e.code : "SERVER") {
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
}, $d = (e, t) => JSON.stringify(e) === JSON.stringify(t), ef = () => Array.from(globalThis.crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(16)), (e) => e.toString(16).padStart(2, "0")).join(""), tf = class {
	transport;
	id;
	#e = /* @__PURE__ */ P(!1);
	get open() {
		return H(this.#e);
	}
	set open(e) {
		F(this.#e, e, !0);
	}
	#t = /* @__PURE__ */ P(null);
	get part() {
		return H(this.#t);
	}
	set part(e) {
		F(this.#t, e);
	}
	#n = /* @__PURE__ */ P({ include: [{ type: "site" }] });
	get rules() {
		return H(this.#n);
	}
	set rules(e) {
		F(this.#n, e);
	}
	#r = /* @__PURE__ */ P(0);
	get version() {
		return H(this.#r);
	}
	set version(e) {
		F(this.#r, e, !0);
	}
	#i = /* @__PURE__ */ P(!1);
	get dirty() {
		return H(this.#i);
	}
	set dirty(e) {
		F(this.#i, e, !0);
	}
	#a = /* @__PURE__ */ P({});
	get routes() {
		return H(this.#a);
	}
	set routes(e) {
		F(this.#a, e);
	}
	#o = /* @__PURE__ */ P([]);
	get pages() {
		return H(this.#o);
	}
	set pages(e) {
		F(this.#o, e);
	}
	#s = /* @__PURE__ */ P(null);
	get impact() {
		return H(this.#s);
	}
	set impact(e) {
		F(this.#s, e);
	}
	#c = /* @__PURE__ */ P(null);
	get preview() {
		return H(this.#c);
	}
	set preview(e) {
		F(this.#c, e);
	}
	#l = /* @__PURE__ */ P("");
	get error() {
		return H(this.#l);
	}
	set error(e) {
		F(this.#l, e, !0);
	}
	#u = /* @__PURE__ */ P("");
	get errorPath() {
		return H(this.#u);
	}
	set errorPath(e) {
		F(this.#u, e, !0);
	}
	#d = /* @__PURE__ */ P(!1);
	get busy() {
		return H(this.#d);
	}
	set busy(e) {
		F(this.#d, e, !0);
	}
	store = null;
	constructor(e, t) {
		this.transport = e, this.id = t;
	}
	get rulesUnpublished() {
		return this.dirty || !$d(this.part?.rules, this.part?.publishedRules);
	}
	async load() {
		if (!this.transport.listSiteParts) return;
		let e = await this.transport.listSiteParts();
		this.routes = e.routes, this.pages = e.pages, this.part = e.parts.find((e) => e.id === this.id) ?? null, this.part && !this.dirty && (this.rules = this.part.rules, this.version = this.part.version);
	}
	setRules(e) {
		this.rules = e, this.dirty = !0, this.impact = null;
	}
	async saveRules() {
		return !this.dirty || !this.transport.saveSitePartRules || this.act(async () => {
			this.version = (await this.transport.saveSitePartRules(this.id, this.rules, this.version)).version, this.dirty = !1, await this.load(), this.store?.announce("parts.saved");
		});
	}
	async loadImpact() {
		this.transport.sitePartImpact && await this.act(async () => {
			(!this.dirty || await this.saveRules()) && (this.impact = await this.transport.sitePartImpact([this.id]));
		});
	}
	async showPreview(e) {
		let t = this.store;
		t && this.transport.previewSitePart && await this.act(async () => {
			t.dirty && await t.save(), (!this.dirty || await this.saveRules()) && (this.preview = await this.transport.previewSitePart(this.id, t.revision, e));
		});
	}
	async publishDocument(e, t) {
		if (this.dirty && !await this.saveRules()) throw new y("VALIDATION_FAILED", this.error);
		return await this.transport.publishSiteParts([{
			id: this.id,
			revision: e,
			rulesVersion: this.version
		}], t), await this.load(), { revision: e };
	}
	async publish() {
		let e = this.store;
		e && (e.dirty && await e.save(), e.unpublished ? await e.publish() : await this.act(async () => {
			await this.publishDocument(e.revision, ef()), e.announce("parts.published");
		}));
	}
	async act(e) {
		this.busy = !0, this.error = "", this.errorPath = "";
		try {
			return await e(), this.error === "";
		} catch (e) {
			let t = e instanceof y ? e : new y("SERVER", String(e)), n = Object.keys(t.details).find((e) => ![
				"status",
				"apiCode",
				"requestId",
				"currentRevision"
			].includes(e));
			this.errorPath = n ?? "";
			let r = this.store?.t;
			return this.error = r ? n ? r("parts.invalid", {
				path: n,
				reason: t.details[n] ?? ""
			}) : r(`error.${t.code}`) : t.message, t.code === "SITE_PART_CONFLICT" && this.transport.sitePartImpact && (this.impact = await this.transport.sitePartImpact([this.id])), !1;
		} finally {
			this.busy = !1;
		}
	}
}, nf = (e, t) => ({
	...e,
	publish: (e, n, r) => t.publishDocument(n, r)
}), rf = [
	"ready",
	"selection-change",
	"dirty-change",
	"save-start",
	"save-success",
	"save-error",
	"conflict",
	"publish-success",
	"publish-error"
], af = 0, of = class extends HTMLElement {
	#e = null;
	#t = null;
	#n = null;
	#r = null;
	#i = null;
	#a = `cpb${++af}`;
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
		let t = this.shadowRoot ?? this.attachShadow({ mode: "open" }), n = e.sitePart && e.transport.publishSiteParts ? new tf(e.transport, e.pageId) : null, r = new S(n ? {
			...e,
			transport: nf(e.transport, n)
		} : e);
		for (let e of rf) r.events.on(e, (t) => {
			let n = e === "save-error" || e === "publish-error" ? { code: t.error.code } : t;
			this.dispatchEvent(new CustomEvent(e, {
				detail: n,
				bubbles: !0,
				composed: !0
			}));
		});
		let i = new Qd(r, Yd(e.locale ?? "es"));
		n && (n.store = i, i.part = n, n.load().catch((e) => i.fail(e))), this.#n = r, this.#r = i, this.#t = na(Ld, {
			target: t,
			props: {
				store: i,
				uid: this.#a,
				stylesheets: e.stylesheets ?? []
			}
		}), r.load().then(() => {
			i.sync(), i.loadDesign(), e.autosave !== !1 && r.capabilities?.features.autosave !== !1 && (this.#i = new _(r, {
				...b,
				...e.autosave ?? {}
			}), this.#i.start());
		}, (e) => {
			i.sync(), i.fail(e);
		});
	}
	#s() {
		this.#i?.stop(), this.#i = null, this.#t && oa(this.#t), this.#r?.destroy(), this.#n?.destroy(), this.#t = null, this.#r = null, this.#n = null, this.shadowRoot?.replaceChildren();
	}
}, sf = (e = "ceiba-page-builder") => {
	customElements.get(e) || customElements.define(e, of);
};
// src/ui/index.ts
sf();
export { _ as Autosave, ye as BASE, of as CeibaPageBuilder, b as DEFAULT_AUTOSAVE, g as DEFAULT_BREAKPOINTS, ge as DEFAULT_HISTORY, te as EDITABLE_FIELDS, y as EditorError, S as EditorSession, t as PROPERTY_BY_NAME, rf as PUBLIC_EVENTS, ne as REFERENCE_PROPS, he as SCHEMA_VERSION, u as SERVER_LIMITS, Te as STYLE_MATRIX, Ae as SiteDesignSession, ce as TRANSFORMS, a as acceptedTokenType, We as afterRedo, Ne as afterUndo, d as applyCommand, ze as applyTransform, m as assertDepth, ie as assertEditable, re as assertKnown, ae as assertNewContent, Re as assertNodeCount, x as assertPlacement, p as assertSize, v as assetUrl, ve as attachRaw, Pe as bindableProps, Be as canRedo, we as canUndo, h as checkTree, w as childrenOf, _e as collectAssetIds, ue as collectStyledNodes, C as compileStyles, e as createCatalogue, E as createCommands, Ue as createEditor, l as createHttpTransport, xe as defaultDesign, sf as defineElement, Se as depthOf, oe as effectiveValue, le as emptyHistory, i as emptyTree, f as errorFromResponse, De as fail, Oe as formToQuery, pe as fromDocument, be as getNode, He as groupKeyOf, se as heightOf, Je as indexInParent, Xe as insertAt, Ie as isAssetRef, et as isSelfOrDescendant, Ee as literal, Le as measureRaw, r as nodeClass, de as nodeCount, ke as parseDocument, me as parseVideo, Me as previewProps, Ge as queryToForm, tt as randomIds, Ve as readBindings, Fe as record, n as sequentialIds, qe as setClasses, $e as setDeclaration, Ye as siteClass, Ce as stripTags, Ze as styleClassNames, Qe as subtreeIds, Ke as toDocument, je as toRaw, ee as tokenLiteral, s as tokenVariable, fe as withBinding, T as withChildren, c as withNode, o as withoutNodes };

//# sourceMappingURL=ceiba-page-builder.js.map