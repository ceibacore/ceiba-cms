import { $ as e, A as t, B as n, C as r, D as i, E as a, F as o, G as s, H as c, I as l, J as u, K as d, L as f, M as p, N as m, O as h, P as g, Q as _, R as v, S as y, T as b, U as x, V as S, W as C, X as w, Y as ee, Z as te, _ as ne, a as re, at as ie, b as ae, c as oe, ct as se, d as ce, dt as le, et as ue, f as de, ft as fe, g as pe, h as me, ht as he, i as ge, it as _e, j as ve, k as ye, l as be, lt as xe, m as Se, mt as Ce, n as we, nt as Te, o as Ee, ot as De, p as Oe, pt as ke, q as Ae, r as je, rt as Me, s as Ne, st as Pe, t as Fe, tt as Ie, u as Le, ut as Re, v as ze, w as Be, x as Ve, y as He, z as Ue } from "./shared/core.js";
// node_modules/svelte/src/internal/shared/utils.js
var We = Array.isArray, Ge = Array.prototype.indexOf, Ke = Array.prototype.includes, qe = Array.from, Je = Object.defineProperty, Ye = Object.getOwnPropertyDescriptor, Xe = Object.getOwnPropertyDescriptors, Ze = Object.prototype, Qe = Array.prototype, $e = Object.getPrototypeOf, et = Object.isExtensible, tt = () => {};
function nt(e) {
	for (var t = 0; t < e.length; t++) e[t]();
}
function rt() {
	var e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
function it(e, t) {
	if (Array.isArray(e)) return e;
	if (t === void 0 || !(Symbol.iterator in e)) return Array.from(e);
	let n = [];
	for (let r of e) if (n.push(r), n.length === t) break;
	return n;
}
var at = 1024, ot = 2048, st = 4096, ct = 8192, lt = 16384, ut = 32768, dt = 1 << 25, ft = 65536, pt = 1 << 19, mt = 1 << 20, ht = 1 << 25, gt = 65536, _t = 1 << 21, vt = 1 << 22, yt = 1 << 23, bt = Symbol("$state"), xt = Symbol("legacy props"), St = Symbol(""), Ct = Symbol("attributes"), wt = Symbol("class"), Tt = Symbol("style"), Et = Symbol("text"), Dt = Symbol("form reset"), Ot = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), kt = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
// node_modules/svelte/src/internal/client/errors.js
function At() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function jt(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function Mt(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function Nt() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Pt(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function Ft() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function It(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function Lt() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Rt() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function zt() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Bt() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
// node_modules/svelte/src/constants.js
var Vt = {}, T = Symbol("uninitialized"), Ht = "http://www.w3.org/1999/xhtml";
function Ut() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function Wt(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function Gt() {
	console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function Kt() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
// node_modules/svelte/src/internal/client/dom/hydration.js
var E = !1;
function qt(e) {
	E = e;
}
var D;
function Jt(e) {
	if (e === null) throw Wt(), Vt;
	return D = e;
}
function Yt() {
	return Jt(/* @__PURE__ */ vr(D));
}
function O(e) {
	if (E) {
		if (/* @__PURE__ */ vr(D) !== null) throw Wt(), Vt;
		D = e;
	}
}
function Xt(e = 1) {
	if (E) {
		for (var t = e, n = D; t--;) n = /* @__PURE__ */ vr(n);
		D = n;
	}
}
function Zt(e = !0) {
	for (var t = 0, n = D;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ vr(n);
		e && n.remove(), n = i;
	}
}
function Qt(e) {
	if (!e || e.nodeType !== 8) throw Wt(), Vt;
	return e.data;
}
// node_modules/svelte/src/internal/client/reactivity/equality.js
function $t(e) {
	return e === this.v;
}
function en(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function tn(e) {
	return !en(e, this.v);
}
// node_modules/svelte/src/internal/client/context.js
var nn = null;
function rn(e) {
	nn = e;
}
function k(e, t = !1, n) {
	nn = {
		p: nn,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: V,
		l: null
	};
}
function A(e) {
	var t = nn, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) Fr(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, nn = t.p, e ?? {};
}
function an() {
	return !0;
}
// node_modules/svelte/src/internal/client/dom/task.js
var on = [];
function sn() {
	var e = on;
	on = [], nt(e);
}
function cn(e) {
	if (on.length === 0 && !Sn) {
		var t = on;
		queueMicrotask(() => {
			t === on && sn();
		});
	}
	on.push(e);
}
function ln() {
	for (; on.length > 0;) sn();
}
function un(e) {
	var t = V;
	if (t === null) return B.f |= yt, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	dn(e, t);
}
function dn(e, t) {
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
var fn = ~(ot | st | at);
function j(e, t) {
	e.f = e.f & fn | t;
}
function pn(e) {
	e.f & 512 || e.deps === null ? j(e, at) : j(e, st);
}
// node_modules/svelte/src/internal/client/reactivity/utils.js
function mn(e) {
	if (e !== null) for (let t of e) t.f & 2 && t.f & 65536 && (t.f ^= gt, mn(t.deps));
}
function hn(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), mn(e.deps), j(e, at);
}
// node_modules/svelte/src/internal/client/reactivity/store.js
var gn = !1;
function _n(e) {
	var t = gn;
	try {
		return gn = !1, [e(), gn];
	} finally {
		gn = t;
	}
}
// node_modules/svelte/src/internal/client/reactivity/batch.js
var vn = null, M = null, yn = null, bn = null, xn = null, Sn = !1, Cn = !1, wn = null, Tn = null, En = 0, Dn = 1, On = class e {
	id = Dn++;
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
			for (var r of n.d) j(r, ot), t(r);
			for (r of n.m) j(r, st), t(r);
		}
		this.#m.add(e);
	}
	#_() {
		if (this.#e = !0, En++ > 1e3 && (this.#C(), An()), !this.#g()) {
			for (let e of this.#d) this.#f.delete(e), j(e, ot), this.schedule(e);
			for (let e of this.#f) j(e, st), this.schedule(e);
		}
		let t = this.#l;
		this.#l = [], this.apply();
		var n = wn = [], r = [], i = Tn = [];
		for (let e of t) try {
			this.#v(e, n, r);
		} catch (t) {
			throw Fn(e), t;
		}
		if (M = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (wn = null, Tn = null, this.#g()) {
			this.#x(r), this.#x(n);
			for (let [e, t] of this.#p) Pn(e, t);
			i.length > 0 && M.#_();
			return;
		}
		let o = this.#y();
		if (o) o.#b(this);
		else {
			this.#d.clear(), this.#f.clear();
			for (let e of this.#r) e(this);
			this.#r.clear(), yn = this, Mn(r), Mn(n), yn = null, this.#c?.resolve();
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
		e.f ^= at;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#p.has(r)) && r.fn !== null) {
				a ? r.f ^= at : i & 4 ? t.push(r) : hi(r) && (i & 16 && this.#f.add(r), bi(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#f.delete(i), j(i, ot), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#C(), M = this, this.#_();
	}
	#x(e) {
		for (var t = 0; t < e.length; t += 1) hn(e[t], this.#d, this.#f);
	}
	capture(e, t, n = !1) {
		e.v !== T && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), bn?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		M = this;
	}
	deactivate() {
		M = null, bn = null;
	}
	flush() {
		try {
			Cn = !0, M = this, this.#_();
		} finally {
			En = 0, xn = null, wn = null, Tn = null, Cn = !1, M = null, bn = null, er.clear();
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
		this.#h || (this.#h = !0, cn(() => {
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
		return (this.#c ??= rt()).promise;
	}
	static ensure() {
		if (M === null) {
			let t = M = new e();
			t.#S(), !Cn && !Sn && cn(() => {
				t.#e || t.flush();
			});
		}
		return M;
	}
	apply() {
		bn = null;
	}
	schedule(e) {
		if (xn = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) e.b.defer_effect(e);
		else {
			for (var t = e; t.parent !== null;) {
				t = t.parent;
				var n = t.f;
				if (wn !== null && t === V && (B === null || !(B.f & 2))) return;
				if (n & 96) {
					if (!(n & 1024)) return;
					t.f ^= at;
				}
			}
			this.#l.push(t);
		}
	}
	#S() {
		vn === null ? vn = this : (vn.#n = this, this.#t = vn), vn = this;
	}
	#C() {
		var e = this.#t, t = this.#n;
		e === null || (e.#n = t), t === null ? vn = e : t.#t = e, this.linked = !1;
	}
};
function kn(e) {
	var t = Sn;
	Sn = !0;
	try {
		var n;
		for (e && (M !== null && !M.is_fork && M.flush(), n = e());;) {
			if (ln(), M === null) return n;
			M.flush();
		}
	} finally {
		Sn = t;
	}
}
function An() {
	try {
		Ft();
	} catch (e) {
		dn(e, xn);
	}
}
var jn = null;
function Mn(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && hi(r) && (jn = /* @__PURE__ */ new Set(), bi(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Kr(r), jn?.size > 0)) {
				er.clear();
				for (let e of jn) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) jn.has(n) && (jn.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || bi(n);
					}
				}
				jn.clear();
			}
		}
		jn = null;
	}
}
function Nn(e) {
	M.schedule(e);
}
function Pn(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), j(e, at);
		for (var n = e.first; n !== null;) Pn(n, t), n = n.next;
	}
}
function Fn(e) {
	j(e, at);
	for (var t = e.first; t !== null;) Fn(t), t = t.next;
}
// node_modules/svelte/src/reactivity/create-subscriber.js
function In(e) {
	let t = 0, n = nr(0), r;
	return () => {
		Mr() && (U(n), zr(() => (t === 0 && (r = wi(() => e(() => or(n)))), t += 1, () => {
			cn(() => {
				--t, t === 0 && (r?.(), r = void 0, or(n));
			});
		})));
	};
}
// node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var Ln = ft | pt;
function Rn(e, t, n, r) {
	new zn(e, t, n, r);
}
var zn = class {
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
	#h = In(() => (this.#m = nr(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = V;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = V.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = Br(() => {
			if (E) {
				let e = this.#t;
				Yt();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, Ln), E && (this.#e = D);
	}
	#g() {
		try {
			this.#a = Vr(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed;
		t && (this.#s = Vr(() => {
			t(this.#e, () => e, () => () => {});
		}));
	}
	#v() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = Vr(() => e(this.#e)), cn(() => {
			var e = this.#c = document.createDocumentFragment(), t = gr();
			e.append(t), this.#a = this.#x(() => Vr(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, qr(this.#o, () => {
				this.#o = null;
			}), this.#b(M));
		}));
	}
	#y() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = Vr(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				Zr(this.#a, e);
				let t = this.#n.pending;
				this.#o = Vr(() => t(this.#e));
			} else this.#b(M);
		} catch (e) {
			this.error(e);
		}
	}
	#b(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		hn(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#x(e) {
		var t = V, n = B, r = nn;
		ii(this.#i), ri(this.#i), rn(this.#i.ctx);
		try {
			return On.ensure(), e();
		} catch (e) {
			return un(e), null;
		} finally {
			ii(t), ri(n), rn(r);
		}
	}
	#S(e, t) {
		this.has_pending_snippet() ? (this.#u += e, this.#u === 0 && (this.#b(t), this.#o && qr(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null))) : this.parent && this.parent.#S(e, t);
	}
	update_pending_count(e, t) {
		this.#S(e, t), this.#l += e, !this.#m || this.#d || (this.#d = !0, cn(() => {
			this.#d = !1, this.#m && ir(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), U(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		M?.is_fork ? (this.#a && M.skip_effect(this.#a), this.#o && M.skip_effect(this.#o), this.#s && M.skip_effect(this.#s), M.on_fork_commit(() => {
			this.#C(e);
		})) : this.#C(e);
	}
	#C(e) {
		this.#a &&= (z(this.#a), null), this.#o &&= (z(this.#o), null), this.#s &&= (z(this.#s), null), E && (Jt(this.#t), Xt(), Jt(Zt()));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var r = !1, i = !1;
		let a = () => {
			r ? Kt() : (r = !0, i && Bt(), this.#s !== null && qr(this.#s, () => {
				this.#s = null;
			}), this.#x(() => {
				this.#y();
			}));
		}, o = (e) => {
			try {
				i = !0, t?.(e, a), i = !1;
			} catch (e) {
				dn(e, this.#i && this.#i.parent);
			}
			n && (this.#s = this.#x(() => {
				try {
					return Vr(() => {
						var t = V;
						t.b = this, t.f |= 128, n(this.#e, () => e, () => a);
					});
				} catch (e) {
					return dn(e, this.#i.parent), null;
				}
			}));
		};
		cn(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				dn(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(o, (e) => dn(e, this.#i && this.#i.parent)) : o(t);
		});
	}
};
// node_modules/svelte/src/internal/client/reactivity/async.js
function Bn(e, t, n, r) {
	let i = an() ? Wn : qn;
	var a = e.filter((e) => !e.settled);
	if (n.length === 0 && a.length === 0) {
		r(t.map(i));
		return;
	}
	var o = V, s = Vn(), c = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function l(e) {
		if (!(o.f & 16384)) {
			s();
			try {
				r(e);
			} catch (e) {
				dn(e, o);
			}
			Hn();
		}
	}
	var u = Un();
	if (n.length === 0) {
		c.then(() => l(t.map(i))).finally(u);
		return;
	}
	function d() {
		Promise.all(n.map((e) => /* @__PURE__ */ Kn(e))).then((e) => l([...t.map(i), ...e])).catch((e) => dn(e, o)).finally(u);
	}
	c ? c.then(() => {
		s(), d(), Hn();
	}) : d();
}
function Vn() {
	var e = V, t = B, n = nn, r = M;
	return function(i = !0) {
		ii(e), ri(t), rn(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function Hn(e = !0) {
	ii(null), ri(null), rn(null), e && M?.deactivate();
}
function Un() {
	var e = V, t = e.b, n = M, r = t.is_rendered();
	return t.update_pending_count(1, n), n.increment(r, e), () => {
		t.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function Wn(e) {
	var t = 2 | ot;
	return V !== null && (V.f |= pt), {
		ctx: nn,
		deps: null,
		effects: null,
		equals: $t,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: T,
		wv: 0,
		parent: V,
		ac: null
	};
}
var Gn = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function Kn(e, t, n) {
	let r = V;
	r === null && At();
	var i = void 0, a = nr(T), o = !B, s = /* @__PURE__ */ new Set();
	return Rr(() => {
		var t = V, n = rt();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== Ot && n.reject(e);
			}).finally(Hn);
		} catch (e) {
			n.reject(e), Hn();
		}
		var c = M;
		if (o) {
			if (t.f & 32768) var l = Un();
			if (r.b.is_rendered()) c.async_deriveds.get(t)?.reject(Gn);
			else for (let e of s.values()) e.reject(Gn);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== Gn && (c.activate(), t ? (a.f |= yt, ir(a, t)) : (a.f & 8388608 && (a.f ^= yt), ir(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), Nr(() => {
		for (let e of s) e.reject(Gn);
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
	let t = /* @__PURE__ */ Wn(e);
	return oi(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function qn(e) {
	let t = /* @__PURE__ */ Wn(e);
	return t.equals = tn, t;
}
function Jn(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) z(t[n]);
	}
}
function Yn(e) {
	var t, n = V, r = e.parent;
	if (!ei && r !== null && e.v !== T && r.f & 24576) return Ut(), e.v;
	ii(r);
	try {
		e.f &= ~gt, Jn(e), t = _i(e);
	} finally {
		ii(n);
	}
	return t;
}
function Xn(e) {
	var t = Yn(e);
	!e.equals(t) && (e.wv = mi(), (!M?.is_fork || e.deps === null) && (M === null ? e.v = t : (M.capture(e, t, !0), yn?.capture(e, t, !0)), e.deps === null)) ? j(e, at) : ei || (bn === null ? pn(e) : (Mr() || M?.is_fork) && bn.set(e, t));
}
function Zn(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac?.abort(Ot), t.fn !== null && (t.teardown = tt), t.ac = null, yi(t, 0), Ur(t));
}
function Qn(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && bi(t);
}
// node_modules/svelte/src/internal/client/reactivity/sources.js
var $n = /* @__PURE__ */ new Set(), er = /* @__PURE__ */ new Map(), tr = !1;
function nr(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: $t,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function P(e, t) {
	let n = nr(e, t);
	return oi(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function rr(e, t = !1, n = !0) {
	let r = nr(e);
	return t || (r.equals = tn), r;
}
function F(e, t, n = !1) {
	return B !== null && (!ni || B.f & 131072) && an() && B.f & 4325394 && (ai === null || !Ke.call(ai, e)) && zt(), ir(e, n ? cr(t) : t, Tn);
}
function ir(e, t, n = null) {
	if (!e.equals(t)) {
		er.set(e, ei ? t : e.v);
		var r = On.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && Yn(t), bn === null && pn(t);
		}
		e.wv = mi(), sr(e, ot, n), an() && V !== null && V.f & 1024 && !(V.f & 96) && (ci === null ? li([e]) : ci.push(e)), !r.is_fork && $n.size > 0 && !tr && ar();
	}
	return t;
}
function ar() {
	tr = !1;
	for (let e of $n) {
		e.f & 1024 && j(e, st);
		let t;
		try {
			t = hi(e);
		} catch {
			t = !0;
		}
		t && bi(e);
	}
	$n.clear();
}
function or(e) {
	F(e, e.v + 1);
}
function sr(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = an(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (i || s !== V) {
			var l = (c & ot) === 0;
			if (l && j(s, t), c & 131072) $n.add(s);
			else if (c & 2) {
				var u = s;
				bn?.delete(u), c & 65536 || (c & 512 && (V === null || !(V.f & 2097152)) && (s.f |= gt), sr(u, st, n));
			} else if (l) {
				var d = s;
				c & 16 && jn !== null && jn.add(d), n === null ? Nn(d) : n.push(d);
			}
		}
	}
}
function cr(e) {
	if (typeof e != "object" || !e || bt in e) return e;
	let t = $e(e);
	if (t !== Ze && t !== Qe) return e;
	var n = /* @__PURE__ */ new Map(), r = We(e), i = /* @__PURE__ */ P(0), a = null, o = fi, s = (e) => {
		if (fi === o) return e();
		var t = B, n = fi;
		ri(null), pi(o);
		var r = e();
		return ri(t), pi(n), r;
	};
	return r && n.set("length", /* @__PURE__ */ P(e.length, a)), new Proxy(e, {
		defineProperty(e, t, r) {
			"value" in r && r.configurable !== !1 && r.enumerable !== !1 && r.writable !== !1 || Lt();
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
					let e = s(() => /* @__PURE__ */ P(T, a));
					n.set(t, e), or(i);
				}
			} else F(r, T), or(i);
			return !0;
		},
		get(t, r, i) {
			if (r === bt) return e;
			var o = n.get(r), c = r in t;
			if (o === void 0 && (!c || Ye(t, r)?.writable) && (o = s(() => /* @__PURE__ */ P(cr(c ? t[r] : T), a)), n.set(r, o)), o !== void 0) {
				var l = U(o);
				return l === T ? void 0 : l;
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
			if (t === bt) return !0;
			var r = n.get(t), i = r !== void 0 && r.v !== T || Reflect.has(e, t);
			return (r !== void 0 || V !== null && (!i || Ye(e, t)?.writable)) && (r === void 0 && (r = s(() => /* @__PURE__ */ P(i ? cr(e[t]) : T, a)), n.set(t, r)), U(r) === T) ? !1 : i;
		},
		set(e, t, o, c) {
			var l = n.get(t), u = t in e;
			if (r && t === "length") for (var d = o; d < l.v; d += 1) {
				var f = n.get(d + "");
				f === void 0 ? d in e && (f = s(() => /* @__PURE__ */ P(T, a)), n.set(d + "", f)) : F(f, T);
			}
			if (l === void 0) (!u || Ye(e, t)?.writable) && (l = s(() => /* @__PURE__ */ P(void 0, a)), F(l, cr(o)), n.set(t, l));
			else {
				u = l.v !== T;
				var p = s(() => cr(o));
				F(l, p);
			}
			var m = Reflect.getOwnPropertyDescriptor(e, t);
			if (m?.set && m.set.call(c, o), !u) {
				if (r && typeof t == "string") {
					var h = n.get("length"), g = Number(t);
					Number.isInteger(g) && g >= h.v && F(h, g + 1);
				}
				or(i);
			}
			return !0;
		},
		ownKeys(e) {
			U(i);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = n.get(e);
				return t === void 0 || t.v !== T;
			});
			for (var [r, a] of n) a.v !== T && !(r in e) && t.push(r);
			return t;
		},
		setPrototypeOf() {
			Rt();
		}
	});
}
function lr(e) {
	try {
		if (typeof e == "object" && e && bt in e) return e[bt];
	} catch {}
	return e;
}
function ur(e, t) {
	return Object.is(lr(e), lr(t));
}
var dr, fr, pr, mr;
function hr() {
	if (dr === void 0) {
		dr = window, fr = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		pr = Ye(t, "firstChild").get, mr = Ye(t, "nextSibling").get, et(e) && (e[wt] = void 0, e[Ct] = null, e[Tt] = void 0, e.__e = void 0), et(n) && (n[Et] = void 0);
	}
}
function gr(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function _r(e) {
	return pr.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function vr(e) {
	return mr.call(e);
}
function I(e, t) {
	if (!E) return /* @__PURE__ */ _r(e);
	var n = /* @__PURE__ */ _r(D);
	if (n === null) n = D.appendChild(gr());
	else if (t && n.nodeType !== 3) {
		var r = gr();
		return n?.before(r), Jt(r), r;
	}
	return t && Cr(n), Jt(n), n;
}
function yr(e, t = !1) {
	if (!E) {
		var n = /* @__PURE__ */ _r(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ vr(n) : n;
	}
	if (t) {
		if (D?.nodeType !== 3) {
			var r = gr();
			return D?.before(r), Jt(r), r;
		}
		Cr(D);
	}
	return D;
}
function L(e, t = 1, n = !1) {
	let r = E ? D : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ vr(r);
	if (!E) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = gr();
			return r === null ? i?.after(a) : r.before(a), Jt(a), a;
		}
		Cr(r);
	}
	return Jt(r), r;
}
function br(e) {
	e.textContent = "";
}
function xr() {
	return !1;
}
function Sr(e, t, n) {
	let r = n ? { is: n } : void 0;
	return document.createElementNS(t ?? "http://www.w3.org/1999/xhtml", e, r);
}
function Cr(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
// node_modules/svelte/src/internal/client/dom/elements/misc.js
function wr(e) {
	E && /* @__PURE__ */ _r(e) !== null && br(e);
}
var Tr = !1;
function Er() {
	Tr || (Tr = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[Dt]?.();
		});
	}, { capture: !0 }));
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function Dr(e) {
	var t = B, n = V;
	ri(null), ii(null);
	try {
		return e();
	} finally {
		ri(t), ii(n);
	}
}
function Or(e, t, n, r = n) {
	e.addEventListener(t, () => Dr(n));
	let i = e[Dt];
	e[Dt] = i ? () => {
		i(), r(!0);
	} : () => r(!0), Er();
}
// node_modules/svelte/src/internal/client/reactivity/effects.js
function kr(e) {
	V === null && (B === null && Pt(e), Nt()), ei && Mt(e);
}
function Ar(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function jr(e, t) {
	var n = V;
	n !== null && n.f & 8192 && (e |= ct);
	var r = {
		ctx: nn,
		deps: null,
		nodes: null,
		f: e | ot | 512,
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
	if (e & 4) wn === null ? On.ensure().schedule(r) : wn.push(r);
	else if (t !== null) {
		try {
			bi(r);
		} catch (e) {
			throw z(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= ft));
	}
	if (i !== null && (i.parent = n, n !== null && Ar(i, n), B !== null && B.f & 2 && !(e & 64))) {
		var a = B;
		(a.effects ??= []).push(i);
	}
	return r;
}
function Mr() {
	return B !== null && !ni;
}
function Nr(e) {
	let t = jr(8, null);
	return j(t, at), t.teardown = e, t;
}
function Pr(e) {
	kr("$effect");
	var t = V.f;
	if (!B && t & 32 && !(t & 32768)) {
		var n = nn;
		(n.e ??= []).push(e);
	} else return Fr(e);
}
function Fr(e) {
	return jr(4 | mt, e);
}
function Ir(e) {
	On.ensure();
	let t = jr(64 | pt, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? qr(t, () => {
			z(t), n(void 0);
		}) : (z(t), n(void 0));
	});
}
function Lr(e) {
	return jr(4, e);
}
function Rr(e) {
	return jr(vt | pt, e);
}
function zr(e, t = 0) {
	return jr(8 | t, e);
}
function R(e, t = [], n = [], r = []) {
	Bn(r, t, n, (t) => {
		jr(8, () => e(...t.map(U)));
	});
}
function Br(e, t = 0) {
	return jr(16 | t, e);
}
function Vr(e) {
	return jr(32 | pt, e);
}
function Hr(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = ei, n = B;
		ti(!0), ri(null);
		try {
			t.call(null);
		} finally {
			ti(e), ri(n);
		}
	}
}
function Ur(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && Dr(() => {
			e.abort(Ot);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : z(n, t), n = r;
	}
}
function Wr(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || z(t), t = n;
	}
}
function z(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Gr(e.nodes.start, e.nodes.end), n = !0), j(e, dt), Ur(e, t && !n), yi(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	Hr(e), e.f ^= dt, e.f |= lt;
	var i = e.parent;
	i !== null && i.first !== null && Kr(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Gr(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ vr(e);
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
		n && z(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Jr(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= ct;
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
		e.f ^= ct, e.f & 1024 || (j(e, ot), On.ensure().schedule(e));
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
		var i = n === r ? null : /* @__PURE__ */ vr(n);
		t.append(n), n = i;
	}
}
// node_modules/svelte/src/internal/client/legacy.js
var Qr = null, $r = !1, ei = !1;
function ti(e) {
	ei = e;
}
var B = null, ni = !1;
function ri(e) {
	B = e;
}
var V = null;
function ii(e) {
	V = e;
}
var ai = null;
function oi(e) {
	B !== null && (ai === null ? ai = [e] : ai.push(e));
}
var H = null, si = 0, ci = null;
function li(e) {
	ci = e;
}
var ui = 1, di = 0, fi = di;
function pi(e) {
	fi = e;
}
function mi() {
	return ++ui;
}
function hi(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~gt), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (hi(a) && Xn(a), a.wv > e.wv) return !0;
		}
		t & 512 && bn === null && j(e, at);
	}
	return !1;
}
function gi(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(ai !== null && Ke.call(ai, e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? gi(a, t, !1) : t === a && (n ? j(a, ot) : a.f & 1024 && j(a, st), Nn(a));
	}
}
function _i(e) {
	var t = H, n = si, r = ci, i = B, a = ai, o = nn, s = ni, c = fi, l = e.f;
	H = null, si = 0, ci = null, B = l & 96 ? null : e, ai = null, rn(e.ctx), ni = !1, fi = ++di, e.ac !== null && (Dr(() => {
		e.ac.abort(Ot);
	}), e.ac = null);
	try {
		e.f |= _t;
		var u = e.fn, d = u();
		e.f |= ut;
		var f = e.deps, p = M?.is_fork;
		if (H !== null) {
			var m;
			if (p || yi(e, si), f !== null && si > 0) for (f.length = si + H.length, m = 0; m < H.length; m++) f[si + m] = H[m];
			else e.deps = f = H;
			if (Mr() && e.f & 512) for (m = si; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && si < f.length && (yi(e, si), f.length = si);
		if (an() && ci !== null && !ni && f !== null && !(e.f & 6146)) for (m = 0; m < ci.length; m++) gi(ci[m], e);
		if (i !== null && i !== e) {
			if (di++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = di;
			if (t !== null) for (let e of t) e.rv = di;
			ci !== null && (r === null ? r = ci : r.push(...ci));
		}
		return e.f & 8388608 && (e.f ^= yt), d;
	} catch (e) {
		return un(e);
	} finally {
		e.f ^= _t, H = t, si = n, ci = r, B = i, ai = a, rn(o), ni = s, fi = c;
	}
}
function vi(e, t) {
	let n = t.reactions;
	if (n !== null) {
		var r = Ge.call(n, e);
		if (r !== -1) {
			var i = n.length - 1;
			i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
		}
	}
	if (n === null && t.f & 2 && (H === null || !Ke.call(H, t))) {
		var a = t;
		a.f & 512 && (a.f ^= 512, a.f &= ~gt), a.v !== T && pn(a), Zn(a), yi(a, 0);
	}
}
function yi(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) vi(e, n[r]);
}
function bi(e) {
	var t = e.f;
	if (!(t & 16384)) {
		j(e, at);
		var n = V, r = $r;
		V = e, $r = !0;
		try {
			t & 16777232 ? Wr(e) : Ur(e), Hr(e);
			var i = _i(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = ui;
		} finally {
			$r = r, V = n;
		}
	}
}
async function xi() {
	await Promise.resolve(), kn();
}
function U(e) {
	var t = !!(e.f & 2);
	if (Qr?.add(e), B !== null && !ni && !(V !== null && V.f & 16384) && (ai === null || !Ke.call(ai, e))) {
		var n = B.deps;
		if (B.f & 2097152) e.rv < di && (e.rv = di, H === null && n !== null && n[si] === e ? si++ : H === null ? H = [e] : H.push(e));
		else {
			B.deps ??= [], Ke.call(B.deps, e) || B.deps.push(e);
			var r = e.reactions;
			r === null ? e.reactions = [B] : Ke.call(r, B) || r.push(B);
		}
	}
	if (ei && er.has(e)) return er.get(e);
	if (t) {
		var i = e;
		if (ei) {
			var a = i.v;
			return (!(i.f & 1024) && i.reactions !== null || Ci(i)) && (a = Yn(i)), er.set(i, a), a;
		}
		var o = !(i.f & 512) && !ni && B !== null && ($r || !!(B.f & 512)), s = (i.f & ut) === 0;
		hi(i) && (o && (i.f |= 512), Xn(i)), o && !s && (Qn(i), Si(i));
	}
	if (bn?.has(e)) return bn.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function Si(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (Qn(t), Si(t));
}
function Ci(e) {
	if (e.v === T) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (er.has(t) || t.f & 2 && Ci(t)) return !0;
	return !1;
}
function wi(e) {
	var t = ni;
	try {
		return ni = !0, e();
	} finally {
		ni = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var Ti = ["touchstart", "touchmove"];
function Ei(e) {
	return Ti.includes(e);
}
// node_modules/svelte/src/internal/client/dev/css.js
var Di = Symbol("events"), Oi = /* @__PURE__ */ new Set(), ki = /* @__PURE__ */ new Set();
function Ai(e) {
	if (!E) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function ji(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Pi.call(t, e), !e.cancelBubble) return Dr(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? cn(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function Mi(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = ji(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && Nr(() => {
		t.removeEventListener(e, o, a);
	});
}
function W(e, t, n) {
	(t[Di] ??= {})[e] = n;
}
function G(e) {
	for (var t = 0; t < e.length; t++) Oi.add(e[t]);
	for (var n of ki) n(e);
}
var Ni = null;
function Pi(e) {
	var t = this, n = t.ownerDocument, r = e.type, i = e.composedPath?.() || [], a = i[0] || e.target;
	Ni = e;
	var o = 0, s = Ni === e && e[Di];
	if (s) {
		var c = i.indexOf(s);
		if (c !== -1 && (t === document || t === window)) {
			e[Di] = t;
			return;
		}
		var l = i.indexOf(t);
		if (l === -1) return;
		c <= l && (o = c);
	}
	if (a = i[o] || e.target, a !== t) {
		Je(e, "currentTarget", {
			configurable: !0,
			get() {
				return a || n;
			}
		});
		var u = B, d = V;
		ri(null), ii(null);
		try {
			for (var f, p = []; a !== null;) {
				var m = a.assignedSlot || a.parentNode || a.host || null;
				try {
					var h = a[Di]?.[r];
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
			e[Di] = t, delete e.currentTarget, ri(u), ii(d);
		}
	}
}
// node_modules/svelte/src/internal/client/dom/reconciler.js
var Fi = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function Ii(e) {
	return Fi?.createHTML(e) ?? e;
}
function Li(e) {
	var t = Sr("template");
	return t.innerHTML = Ii(e.replaceAll("<!>", "<!---->")), t.content;
}
// node_modules/svelte/src/internal/client/dom/template.js
function Ri(e, t) {
	var n = V;
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
		if (E) return Ri(D, null), D;
		i === void 0 && (i = Li(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ _r(i)));
		var t = r || fr ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ _r(t), s = t.lastChild;
			Ri(o, s);
		} else Ri(t, t);
		return t;
	};
}
function zi() {
	if (E) return Ri(D, null), D;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = gr();
	return e.append(t, n), Ri(t, n), e;
}
function q(e, t) {
	if (E) {
		var n = V;
		n.f & 32768 && n.nodes.end !== null || (n.nodes.end = D), Yt();
	} else e !== null && e.before(t);
}
function J(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[Et] ??= e.nodeValue) && (e[Et] = n, e.nodeValue = `${n}`);
}
function Bi(e, t) {
	return Hi(e, t);
}
var Vi = /* @__PURE__ */ new Map();
function Hi(e, { target: t, anchor: n, props: r = {}, events: i, context: a, intro: o = !0, transformError: s }) {
	hr();
	var c = void 0, l = Ir(() => {
		var o = n ?? t.appendChild(gr());
		Rn(o, { pending: () => {} }, (t) => {
			k({});
			var n = nn;
			if (a && (n.c = a), i && (r.$$events = i), E && Ri(t, null), c = e(t, r) || {}, E && (V.nodes.end = D, D === null || D.nodeType !== 8 || D.data !== "]")) throw Wt(), Vt;
			A();
		}, s);
		var l = /* @__PURE__ */ new Set(), u = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!l.has(r)) {
					l.add(r);
					var i = Ei(r);
					for (let e of [t, document]) {
						var a = Vi.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Vi.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Pi, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return u(qe(Oi)), ki.add(u), () => {
			for (var e of l) for (let n of [t, document]) {
				var r = Vi.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Pi), r.delete(e), r.size === 0 && Vi.delete(n)) : r.set(e, i);
			}
			ki.delete(u), o !== n && o.parentNode?.removeChild(o);
		};
	});
	return Ui.set(c, l), c;
}
var Ui = /* @__PURE__ */ new WeakMap();
function Wi(e, t) {
	let n = Ui.get(e);
	return n ? (Ui.delete(e), n(t)) : Promise.resolve();
}
// node_modules/svelte/src/internal/client/dom/blocks/branches.js
var Gi = class {
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
				r && (z(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						Zr(r, t), t.append(gr()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else z(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), qr(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (z(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = M, r = xr();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = gr();
				i.append(a), this.#n.set(e, {
					effect: Vr(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, Vr(() => t(this.anchor)));
		}
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else E && (this.anchor = D), this.#a(n);
	}
};
// node_modules/svelte/src/internal/client/dom/blocks/if.js
function Y(e, t, n = !1) {
	var r;
	E && (r = D, Yt());
	var i = new Gi(e), a = n ? ft : 0;
	function o(e, t) {
		if (E) {
			var n = Qt(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Zt();
				Jt(a), i.anchor = a, qt(!1), i.ensure(e, t), qt(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	Br(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
// node_modules/svelte/src/internal/client/dom/blocks/key.js
var Ki = Symbol("NaN");
function qi(e, t, n) {
	E && Yt();
	var r = new Gi(e), i = !an();
	Br(() => {
		var e = t();
		e !== e && (e = Ki), i && typeof e == "object" && e && (e = {}), r.ensure(e, n);
	});
}
// node_modules/svelte/src/internal/client/dom/blocks/each.js
function Ji(e, t, n) {
	for (var r = [], i = t.length, a, o = t.length, s = 0; s < i; s++) {
		let n = t[s];
		qr(n, () => {
			if (a) {
				if (a.pending.delete(n), a.done.add(n), a.pending.size === 0) {
					var t = e.outrogroups;
					Yi(e, qe(a.done)), t.delete(a), t.size === 0 && (e.outrogroups = null);
				}
			} else --o;
		}, !1);
	}
	if (o === 0) {
		var c = r.length === 0 && n !== null;
		if (c) {
			var l = n, u = l.parentNode;
			br(u), u.append(l), e.items.clear();
		}
		Yi(e, t, !c);
	} else a = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(a);
}
function Yi(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= ht, Zr(a, document.createDocumentFragment())) : z(t[i], n);
	}
}
var Xi;
function X(e, t, n, r, i, a = null) {
	var o = e, s = /* @__PURE__ */ new Map();
	if (t & 4) {
		var c = e;
		o = E ? Jt(/* @__PURE__ */ _r(c)) : c.appendChild(gr());
	}
	E && Yt();
	var l = null, u = /* @__PURE__ */ qn(() => {
		var e = n();
		return We(e) ? e : e == null ? [] : qe(e);
	}), d, f = /* @__PURE__ */ new Map(), p = !0;
	function m(e) {
		g.effect.f & 16384 || (g.pending.delete(e), g.fallback = l, Qi(g, d, o, t, r), l !== null && (d.length === 0 ? l.f & 33554432 ? (l.f ^= ht, ea(l, null, o)) : Yr(l) : qr(l, () => {
			l = null;
		})));
	}
	function h(e) {
		g.pending.delete(e);
	}
	var g = {
		effect: Br(() => {
			d = U(u);
			var e = d.length;
			let c = !1;
			E && Qt(o) === "[!" != (e === 0) && (o = Zt(), Jt(o), qt(!1), c = !0);
			for (var g = /* @__PURE__ */ new Set(), _ = M, v = xr(), y = 0; y < e; y += 1) {
				E && D.nodeType === 8 && D.data === "]" && (o = D, c = !0, qt(!1));
				var b = d[y], x = r(b, y), S = p ? null : s.get(x);
				S ? (S.v && ir(S.v, b), S.i && ir(S.i, y), v && _.unskip_effect(S.e)) : (S = $i(s, p ? o : Xi ??= gr(), b, x, y, i, t, n), p || (S.e.f |= ht), s.set(x, S)), g.add(x);
			}
			if (e === 0 && a && !l && (p ? l = Vr(() => a(o)) : (l = Vr(() => a(Xi ??= gr())), l.f |= ht)), e > g.size && jt("", "", ""), E && e > 0 && Jt(Zt()), !p) {
				if (f.set(_, g), v) {
					for (let [e, t] of s) g.has(e) || _.skip_effect(t.e);
					_.oncommit(m), _.ondiscard(h);
				} else m(_);
			}
			c && qt(!0), U(u);
		}),
		flags: t,
		items: s,
		pending: f,
		outrogroups: null,
		fallback: l
	};
	p = !1, E && (o = D);
}
function Zi(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Qi(e, t, n, r, i) {
	var a = !!(r & 8), o = t.length, s = e.items, c = Zi(e.effect.first), l, u = null, d, f = [], p = [], m, h, g, _;
	if (a) for (_ = 0; _ < o; _ += 1) m = t[_], h = i(m, _), g = s.get(h).e, g.f & 33554432 || (g.nodes?.a?.measure(), (d ??= /* @__PURE__ */ new Set()).add(g));
	for (_ = 0; _ < o; _ += 1) {
		if (m = t[_], h = i(m, _), g = s.get(h).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(g), t.done.delete(g);
		if (g.f & 8192 && (Yr(g), a && (g.nodes?.a?.unfix(), (d ??= /* @__PURE__ */ new Set()).delete(g))), g.f & 33554432) {
			if (g.f ^= ht, g === c) ea(g, null, n);
			else {
				var v = u ? u.next : c;
				g === e.effect.last && (e.effect.last = g.prev), g.prev && (g.prev.next = g.next), g.next && (g.next.prev = g.prev), ta(e, u, g), ta(e, g, v), ea(g, v, n), u = g, f = [], p = [], c = Zi(u.next);
				continue;
			}
		}
		if (g !== c) {
			if (l !== void 0 && l.has(g)) {
				if (f.length < p.length) {
					var y = p[0], b;
					u = y.prev;
					var x = f[0], S = f[f.length - 1];
					for (b = 0; b < f.length; b += 1) ea(f[b], y, n);
					for (b = 0; b < p.length; b += 1) l.delete(p[b]);
					ta(e, x.prev, S.next), ta(e, u, x), ta(e, S, y), c = y, u = S, --_, f = [], p = [];
				} else l.delete(g), ea(g, c, n), ta(e, g.prev, g.next), ta(e, g, u === null ? e.effect.first : u.next), ta(e, u, g), u = g;
				continue;
			}
			for (f = [], p = []; c !== null && c !== g;) (l ??= /* @__PURE__ */ new Set()).add(c), p.push(c), c = Zi(c.next);
			if (c === null) continue;
		}
		g.f & 33554432 || f.push(g), u = g, c = Zi(g.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Yi(e, qe(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (c !== null || l !== void 0) {
		var C = [];
		if (l !== void 0) for (g of l) g.f & 8192 || C.push(g);
		for (; c !== null;) !(c.f & 8192) && c !== e.fallback && C.push(c), c = Zi(c.next);
		var w = C.length;
		if (w > 0) {
			var ee = r & 4 && o === 0 ? n : null;
			if (a) {
				for (_ = 0; _ < w; _ += 1) C[_].nodes?.a?.measure();
				for (_ = 0; _ < w; _ += 1) C[_].nodes?.a?.fix();
			}
			Ji(e, C, ee);
		}
	}
	a && cn(() => {
		if (d !== void 0) for (g of d) g.nodes?.a?.apply();
	});
}
function $i(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? nr(n) : /* @__PURE__ */ rr(n, !1, !1) : null, l = o & 2 ? nr(i) : null;
	return {
		v: c,
		i: l,
		e: Vr(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function ea(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ vr(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function ta(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
// node_modules/svelte/src/internal/client/dom/blocks/snippet.js
function na(e, t, ...n) {
	var r = new Gi(e);
	Br(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, ft);
}
// node_modules/svelte/src/internal/client/dom/css.js
function Z(e, t) {
	Lr(() => {
		var n = e.getRootNode(), r = n.host ? n : n.head ?? n.ownerDocument.head;
		if (!r.querySelector("#" + t.hash)) {
			let e = Sr("style");
			e.id = t.hash, e.textContent = t.code, r.appendChild(e);
		}
	});
}
// node_modules/svelte/src/internal/shared/attributes.js
function ra(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function ia(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function aa(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(ia)), i && c.push(...Object.keys(i).map(ia));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = ia(e.substring(l, u).trim());
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
		return r && (n += ra(r)), i && (n += ra(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
// node_modules/svelte/src/internal/client/dom/elements/style.js
function oa(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function sa(e, t, n, r) {
	var i = e[Tt];
	if (E || i !== t) {
		var a = aa(t, r);
		E && a === e.getAttribute("style") || (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[Tt] = t;
	} else r && (Array.isArray(r) ? (oa(e, n?.[0], r[0]), oa(e, n?.[1], r[1], "important")) : oa(e, n, r));
	return r;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
function ca(e, t, n = !1) {
	if (e.multiple) {
		if (t == null) return;
		if (!We(t)) return Gt();
		for (var r of e.options) r.selected = t.includes(da(r));
	} else {
		for (r of e.options) if (ur(da(r), t)) {
			r.selected = !0;
			return;
		}
		n && t === void 0 || (e.selectedIndex = -1);
	}
}
function la(e) {
	var t = new MutationObserver(() => {
		ca(e, e.__value);
	});
	t.observe(e, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["value"]
	}), Nr(() => {
		t.disconnect();
	});
}
function ua(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet(), i = !0;
	Or(e, "change", (t) => {
		var i = t ? "[selected]" : ":checked", a;
		if (e.multiple) a = [].map.call(e.querySelectorAll(i), da);
		else {
			var o = e.querySelector(i) ?? e.querySelector("option:not([disabled])");
			a = o && da(o);
		}
		n(a), e.__value = a, M !== null && r.add(M);
	}), Lr(() => {
		var a = t();
		if (e === document.activeElement) {
			var o = M;
			if (r.has(o)) return;
		}
		if (ca(e, a, i), i && a === void 0) {
			var s = e.querySelector(":checked");
			s !== null && (a = da(s), n(a));
		}
		e.__value = a, i = !1;
	}), la(e);
}
function da(e) {
	return "__value" in e ? e.__value : e.value;
}
// node_modules/svelte/src/internal/client/dom/elements/attributes.js
var fa = Symbol("is custom element"), pa = Symbol("is html"), ma = kt ? "link" : "LINK", ha = kt ? "progress" : "PROGRESS";
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
		e[Dt] = n, cn(n), Er();
	}
}
function ga(e, t) {
	var n = va(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === ha) && (e.value = t ?? "");
}
function _a(e, t) {
	var n = va(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function $(e, t, n, r) {
	var i = va(e);
	E && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === ma) || i[t] !== (i[t] = n) && (t === "loading" && (e[St] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && ba(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function va(e) {
	return e[Ct] ??= {
		[fa]: e.nodeName.includes("-"),
		[pa]: e.namespaceURI === Ht
	};
}
var ya = /* @__PURE__ */ new Map();
function ba(e) {
	var t = e.getAttribute("is") || e.nodeName, n = ya.get(t);
	if (n) return n;
	ya.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var o in r = Xe(i), r) r[o].set && o !== "innerHTML" && o !== "textContent" && o !== "innerText" && n.push(o);
		i = $e(i);
	}
	return n;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function xa(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	Or(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = Sa(e) ? Ca(a) : a, n(a), M !== null && r.add(M), await xi(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (E && e.defaultValue !== e.value || wi(t) == null && e.value) && (n(Sa(e) ? Ca(e.value) : e.value), M !== null && r.add(M)), zr(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = M;
			if (r.has(i)) return;
		}
		Sa(e) && n === Ca(e.value) || (e.type !== "date" || n || e.value) && n !== e.value && (e.value = n ?? "");
	});
}
function Sa(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function Ca(e) {
	return e === "" ? null : +e;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function wa(e, t) {
	return e === t || e?.[bt] === t;
}
function Ta(e = {}, t, n, r) {
	var i = nn.r, a = V;
	return Lr(() => {
		var o, s;
		return zr(() => {
			o = s, s = r?.() || [], wi(() => {
				wa(n(...s), e) || (t(e, ...s), o && wa(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && wa(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
// node_modules/svelte/src/internal/client/reactivity/props.js
function Ea(e, t, n, r) {
	var i = !0, a = !!(n & 8), o = !!(n & 16), s = r, c = !0, l = void 0, u = () => o && i ? (l ??= /* @__PURE__ */ Wn(r), U(l)) : (c && (c = !1, s = o ? wi(r) : r), s);
	let d;
	if (a) {
		var f = bt in e || xt in e;
		d = Ye(e, t)?.set ?? (f && t in e ? (n) => e[t] = n : void 0);
	}
	var p, m = !1;
	a ? [p, m] = _n(() => e[t]) : p = e[t], p === void 0 && r !== void 0 && (p = u(), d && (i && It(t), d(p)));
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
	var _ = !1, v = (n & 1 ? Wn : qn)(() => (_ = !1, h()));
	a && U(v);
	var y = V;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? U(v) : i && a ? cr(e) : e;
			return F(v, n), _ = !0, s !== void 0 && (s = n), e;
		}
		return ei && _ || y.f & 16384 ? v.v : U(v);
	});
}
// node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
// src/ui/canvas/sanitize.ts
var Da = /* @__PURE__ */ new Set([
	"http:",
	"https:",
	"mailto:",
	"tel:"
]), Oa = (e) => {
	if (typeof e != "string") return "";
	let t = e.replace(/[\u0000- \u007f-\u009f]/g, ""), n = /^([a-z][a-z0-9+.-]*):/i.exec(t)?.[1];
	return n === void 0 || Da.has(`${n.toLowerCase()}:`) ? e.trim() : "";
}, ka = (e) => typeof e == "string" ? e.replace(/[^\w\- :]/g, "").trim() : "", Aa = (e) => {
	let t = Oa(e);
	return t !== "" && !/^(mailto|tel):/i.test(t) ? t : "";
}, ja = (e) => typeof e == "string" ? e : typeof e == "number" ? String(e) : "", Ma = (e) => e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;"), Na = "allow-same-origin", Pa = (e) => "<!doctype html><html><head><meta charset=\"utf-8\"><meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'none'; style-src * 'unsafe-inline'; img-src * data: blob:; font-src * data:\">" + e.map(Aa).filter((e) => e !== "").map((e) => `<link rel="stylesheet" href="${Ma(e)}">`).join("") + "<style>body{margin:0;padding:12px;min-height:100vh;box-sizing:border-box}[data-ceiba-id]{cursor:default}[data-ceiba-id]:hover{outline:1px dashed #94a3b8}[data-ceiba-selected]{outline:2px solid #2563eb!important;outline-offset:2px}[data-ceiba-multiline]{white-space:pre-line}[contenteditable]{outline:2px solid #16a34a!important;outline-offset:2px;cursor:text}.ceiba-dragging,.ceiba-dragging *{user-select:none!important;cursor:grabbing!important}.ceiba-placeholder{padding:12px;border:1px dashed #94a3b8;color:#475569;font:13px system-ui;background:#f8fafc}@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}</style></head><body></body></html>", Fa = /* @__PURE__ */ new Set([
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
]), Ia = /* @__PURE__ */ new Set(["text"]), La = (e, t) => !t.has(e.type) || e.children.length > 0 ? null : e.type === "heading" ? "text" : e.type === "text" ? "content" : e.type === "button" ? "label" : Fa.has(e.type) || Ia.has(e.type) ? "content" : null, Ra = (e) => Ia.has(e), za = (e, t) => {
	let n = e.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, "");
	return t ? n.replace(/\n$/, "") : n.replace(/\n+/g, " ");
}, Ba = (e) => {
	let t = e.ownerDocument, n = t.createRange();
	n.selectNodeContents(e), n.collapse(!1);
	let r = t.getSelection();
	r?.removeAllRanges(), r?.addRange(n);
}, Va = /* @__PURE__ */ new Set(/* @__PURE__ */ "div.section.article.header.footer.nav.main.aside.h1.h2.h3.h4.h5.h6.p.span.strong.em.small.a.ul.ol.li.blockquote.figure.figcaption.code.pre.hr.br.img.label".split(".")), Ha = (e) => {
	let t = e.fields.props;
	return typeof t == "object" && t && !Array.isArray(t) ? t : {};
}, Ua = (e, t) => {
	let n = e.createElement("div");
	return n.className = "ceiba-placeholder", n.textContent = t, n;
}, Wa = (e, t, n, r) => {
	let i = Ha(t), a = (t, n = "") => {
		let r = e.createElement(t), a = `${n} ${ka(i.class)}`.trim();
		return a && (r.className = a), r;
	};
	switch (t.type) {
		case "container": return a("div", i.fluid ? "container-fluid" : "container");
		case "row": {
			let e = ka(ja(i.gutter));
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
			return e.textContent = ja(i.text), e;
		}
		case "text": {
			let e = a("p");
			return e.textContent = ja(i.content), e;
		}
		case "image":
		case "img": {
			let t = Oa(i.src);
			if (t === "") return Ua(e, n.emptyImage);
			let r = a("img", "img-fluid");
			return r.src = t, r.alt = ja(i.alt), r;
		}
		case "button": {
			let e = a("a", "btn btn-primary");
			return e.href = Oa(i.url) || "#", e.textContent = ja(i.label), e;
		}
		case "html": return Ua(e, n.html);
	}
	if (!r || !Va.has(t.type)) return Ua(e, n.unknown(t.type));
	let o = a(t.type);
	return t.type === "a" && (o.href = Oa(i.href) || "#"), t.type === "img" && (o.src = Oa(i.src), o.alt = ja(i.alt)), i.content !== void 0 && o.append(e.createTextNode(ja(i.content))), o;
}, Ga = (e, t, n, r, i, a) => {
	let o = (s) => {
		let c = t.nodes[s];
		if (!c) return null;
		let l = Wa(e, c, i, n.has(c.type));
		l.dataset.ceibaId = s;
		let u = c.fields.styles;
		if (a && typeof u == "object" && u && !Array.isArray(u) && l.classList.add(...be(s, u, a)), s === r && (l.dataset.ceibaSelected = ""), Ra(c.type) && (l.dataset.ceibaMultiline = ""), l.className !== "ceiba-placeholder" && l.tagName !== "IMG") for (let e of c.children) {
			let t = o(e);
			t && l.append(t);
		}
		return l;
	}, s = t.rootIds.map(o).filter((e) => e !== null);
	e.body.replaceChildren(...s);
}, Ka = /* @__PURE__ */ K("<button type=\"button\" role=\"radio\" class=\"svelte-1cfnx8l\"> </button>"), qa = /* @__PURE__ */ K("<div class=\"viewport svelte-1cfnx8l\" role=\"radiogroup\"><button type=\"button\" role=\"radio\" class=\"svelte-1cfnx8l\"> </button> <!></div>"), Ja = {
	hash: "svelte-1cfnx8l",
	code: ".viewport.svelte-1cfnx8l {display:flex;flex-wrap:wrap;gap:.25rem;margin-bottom:.5rem;}button.svelte-1cfnx8l {font:inherit;font-size:.75rem;padding:.2rem .5rem;border:1px solid var(--cpb-border);border-radius:999px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button[aria-checked='true'].svelte-1cfnx8l {background:var(--cpb-accent-soft);border-color:var(--cpb-accent);font-weight:600;}button.svelte-1cfnx8l:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Ya(e, t) {
	k(t, !0), Z(e, Ja);
	let n = Ea(t, "store", 7), r = /* @__PURE__ */ N(() => n().t);
	var i = qa(), a = I(i), o = I(a, !0);
	O(a), X(L(a, 2), 17, () => n().design.breakpoints, (e) => e.id, (e, t) => {
		var r = Ka(), i = I(r);
		O(r), R(() => {
			$(r, "aria-checked", n().viewport === U(t).id), J(i, `${U(t).id ?? ""} · ${U(t).minWidth ?? ""}px`);
		}), W("click", r, () => {
			n().viewport = U(t).id;
		}), q(e, r);
	}), O(i), R((e, t) => {
		$(i, "aria-label", e), $(a, "aria-checked", n().viewport === null), J(o, t);
	}, [() => U(r)("viewport.label"), () => U(r)("viewport.base")]), W("click", a, () => {
		n().viewport = null;
	}), q(e, i), A();
}
G(["click"]);
// src/ui/canvas/Canvas.svelte
var Xa = /* @__PURE__ */ K("<div class=\"canvas svelte-1tv0kiv\"><p class=\"help svelte-1tv0kiv\"> </p> <!> <div class=\"stage svelte-1tv0kiv\"><iframe class=\"svelte-1tv0kiv\"></iframe></div></div>"), Za = {
	hash: "svelte-1tv0kiv",
	code: ".canvas.svelte-1tv0kiv {background:var(--cpb-canvas);padding:.5rem 1rem 1rem;min-height:0;display:flex;flex-direction:column;}.help.svelte-1tv0kiv {margin:0 0 .5rem;font-size:.75rem;color:var(--cpb-muted);}.stage.svelte-1tv0kiv {flex:1;overflow:auto;display:flex;justify-content:center;min-height:0;}iframe.svelte-1tv0kiv {flex:none;max-width:none;min-height:480px;height:100%;border:1px solid var(--cpb-border);border-radius:8px;background:#fff;}"
};
function Qa(e, t) {
	k(t, !0), Z(e, Za);
	let n = Ea(t, "stylesheets", 19, () => []), r = /* @__PURE__ */ N(() => t.store.t), i = /* @__PURE__ */ P(void 0), a = /* @__PURE__ */ P(!1), o = /* @__PURE__ */ P(null), s = /* @__PURE__ */ N(() => Pa(n())), c = /* @__PURE__ */ N(() => t.store.viewport === null ? 375 : t.store.design.breakpoints.find((e) => e.id === t.store.viewport)?.minWidth ?? 375);
	function l(e) {
		let n = e.head.querySelector("style[data-cms-design]");
		n || (n = e.createElement("style"), n.dataset.cmsDesign = "", e.head.append(n)), n.textContent = Le(t.store.design, oe(t.store.session.toDocument().root)).css;
	}
	let u = (e) => e?.closest?.("[data-ceiba-id]");
	function d(e) {
		let n = U(i)?.contentDocument, a = t.store.tree.nodes[e], s = a && t.store.catalogue ? La(a, t.store.catalogue) : null, c = n?.querySelector(`[data-ceiba-id="${CSS.escape(e)}"]`);
		if (!n || !a || !s || !c) return !1;
		t.store.select(e), F(o, e, !0);
		let l = Ra(a.type);
		c.setAttribute("contenteditable", "plaintext-only"), c.setAttribute("aria-label", U(r)("announce.editing"));
		let u = () => {
			t.store.run({
				kind: "updateProps",
				id: e,
				set: { [s]: za(c.innerText, l) }
			});
		}, d = (n) => {
			c.removeEventListener("input", u), c.removeEventListener("keydown", f), c.removeEventListener("blur", p), c.removeAttribute("contenteditable"), F(o, null), t.store.announce("announce.editDone"), t.onEditEnd(e, n);
		}, f = (e) => {
			(e.key === "Escape" || e.key === "Enter" && (!l || e.ctrlKey || e.metaKey)) && (e.preventDefault(), d(!0));
		}, p = () => d(!1);
		return c.addEventListener("input", u), c.addEventListener("keydown", f), c.addEventListener("blur", p), c.focus(), Ba(c), t.store.announce("announce.editing"), !0;
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
		e && U(i) && (f(e), t.drag.attach(U(i)), F(a, !0));
	}
	Pr(() => {
		let e = U(i)?.contentDocument, n = t.store.catalogue, s = t.store.tree, c = t.store.selection, u = t.store.design;
		U(a) && e && n && U(o) === null && (Ga(e, s, n, c, {
			unknown: (e) => U(r)("canvas.unknown", { type: e }),
			html: U(r)("canvas.html"),
			emptyImage: U(r)("canvas.emptyImage")
		}, u), l(e), c && e.querySelector(`[data-ceiba-id="${CSS.escape(c)}"]`)?.scrollIntoView({ block: "nearest" }));
	});
	var m = { startEditing: d }, h = Xa(), g = I(h), _ = I(g, !0);
	O(g);
	var v = L(g, 2);
	Ya(v, { get store() {
		return t.store;
	} });
	var y = L(v, 2), b = I(y);
	let x;
	return Ta(b, (e) => F(i, e), () => U(i)), O(y), O(h), R((e, n) => {
		$(g, "id", `${t.uid}-canvas-help`), J(_, e), $(b, "title", n), $(b, "sandbox", Na), $(b, "srcdoc", U(s)), $(b, "aria-describedby", `${t.uid}-canvas-help`), x = sa(b, "", x, { width: `${U(c)}px` });
	}, [() => U(r)("canvas.help"), () => U(r)("canvas.title")]), Mi("load", b, p), Ai(b), q(e, h), A(m);
}
// src/ui/model/insert.ts
var $a = (e, t) => {
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
}, eo = (e, t, n) => {
	let r = e.get(t);
	return !r?.isContainer || r.disallowedChildren.includes(n) ? !1 : r.allowedChildren.includes("*") || r.allowedChildren.includes(n);
}, to = (e, t, n, r) => {
	let i = n === null ? void 0 : e.nodes[n];
	if (!i) return {
		parent: null,
		index: e.rootIds.length
	};
	if (eo(t, i.type, r)) return {
		parent: i.id,
		index: i.children.length
	};
	let a = se(e, i.parent);
	return {
		parent: i.parent,
		index: a.indexOf(i.id) + 1
	};
}, no = (e) => {
	let { id: t, _id: n, children: r, ...i } = e;
	return {
		...i,
		children: (r ?? []).map(no)
	};
}, ro = class {
	store;
	#e = /* @__PURE__ */ P([]);
	get templates() {
		return U(this.#e);
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
		let i = to(this.store.tree, n, this.store.selection, r.type), a = this.store.session.commandContext;
		if (!a) return !1;
		try {
			e.reduce((e, t, n) => h(e, {
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
				nodes: [no(i)]
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
}, io = /* @__PURE__ */ K("<dialog class=\"svelte-o2xhl0\"><form method=\"dialog\" class=\"svelte-o2xhl0\"><h2 class=\"svelte-o2xhl0\"> </h2> <!> <div class=\"actions svelte-o2xhl0\"><button type=\"button\" class=\"svelte-o2xhl0\"> </button> <button type=\"submit\" class=\"primary svelte-o2xhl0\"> </button></div></form></dialog>"), ao = {
	hash: "svelte-o2xhl0",
	code: "dialog.svelte-o2xhl0 {border:1px solid var(--cpb-border);border-radius:10px;padding:1rem;width:min(560px, 90vw);color:inherit;font:inherit;}dialog.svelte-o2xhl0::backdrop {background:rgb(15 23 42 / .45);}h2.svelte-o2xhl0 {font-size:1rem;margin:0 0 .75rem;}.actions.svelte-o2xhl0 {display:flex;justify-content:flex-end;gap:.5rem;margin-top:1rem;}button.svelte-o2xhl0 {font:inherit;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.primary.svelte-o2xhl0 {background:var(--cpb-accent);border-color:var(--cpb-accent);color:#fff;}button.svelte-o2xhl0:disabled {opacity:.5;}.svelte-o2xhl0:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function oo(e, t) {
	k(t, !0), Z(e, ao);
	let n = Ea(t, "open", 15, !1), r = Ea(t, "busy", 3, !1), i = /* @__PURE__ */ P(void 0), a = null;
	Pr(() => {
		U(i) && (n() && !U(i).open ? (a = U(i).getRootNode().activeElement, U(i).showModal()) : !n() && U(i).open && U(i).close());
	});
	var o = io(), s = I(o), c = I(s), l = I(c, !0);
	O(c);
	var u = L(c, 2);
	na(u, () => t.children);
	var d = L(u, 2), f = I(d), p = I(f, !0);
	O(f);
	var m = L(f, 2), h = I(m, !0);
	O(m), O(d), O(s), O(o), Ta(o, (e) => F(i, e), () => U(i)), R(() => {
		$(o, "aria-labelledby", `${t.uid}-title`), $(c, "id", `${t.uid}-title`), J(l, t.title), J(p, t.cancelLabel), m.disabled = r(), J(h, t.submitLabel);
	}), Mi("close", o, () => {
		n(!1), a?.focus?.();
	}), Mi("submit", s, (e) => {
		e.preventDefault(), t.onSubmit();
	}), W("click", f, () => {
		n(!1);
	}), q(e, o), A();
}
G(["click"]);
// src/ui/content/ImportDialog.svelte
var so = /* @__PURE__ */ K("<p class=\"help svelte-c6zkzf\"> </p> <label class=\"svelte-c6zkzf\"> </label> <textarea rows=\"10\" spellcheck=\"false\" class=\"svelte-c6zkzf\"></textarea>", 1), co = {
	hash: "svelte-c6zkzf",
	code: ".help.svelte-c6zkzf {font-size:.8rem;margin:0 0 .5rem;}label.svelte-c6zkzf {display:block;font-size:.8rem;font-weight:600;margin-bottom:.25rem;}textarea.svelte-c6zkzf {width:100%;box-sizing:border-box;font:12px/1.4 ui-monospace, monospace;padding:.5rem;border:1px solid var(--cpb-border);border-radius:6px;}"
};
function lo(e, t) {
	k(t, !0), Z(e, co);
	let n = Ea(t, "open", 15, !1), r = /* @__PURE__ */ N(() => t.store.t), i = /* @__PURE__ */ P(""), a = /* @__PURE__ */ P(!1);
	async function o() {
		if (U(i).trim() === "") return;
		F(a, !0);
		let e = await t.content.importHtml(U(i));
		F(a, !1), e !== null && (e > 0 && t.store.announce("import.warnings", { count: e }), F(i, ""), n(!1));
	}
	{
		let s = /* @__PURE__ */ N(() => U(r)("import.title")), c = /* @__PURE__ */ N(() => `${t.uid}-import`), l = /* @__PURE__ */ N(() => U(r)("import.submit")), u = /* @__PURE__ */ N(() => U(r)("dialog.cancel"));
		oo(e, {
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
				var a = so(), o = yr(a), s = I(o, !0);
				O(o);
				var c = L(o, 2), l = I(c, !0);
				O(c);
				var u = L(c, 2);
				wr(u), R((e, n) => {
					J(s, e), $(c, "for", `${t.uid}-import-html`), J(l, n), $(u, "id", `${t.uid}-import-html`);
				}, [() => U(r)("import.help"), () => U(r)("import.field")]), xa(u, () => U(i), (e) => F(i, e)), q(e, a);
			},
			$$slots: { default: !0 }
		});
	}
	A();
}
// src/ui/content/TemplateDialog.svelte
var uo = /* @__PURE__ */ K("<label class=\"svelte-181fmze\"> </label> <input required=\"\" maxlength=\"200\" class=\"svelte-181fmze\"/> <label class=\"svelte-181fmze\"> </label> <input maxlength=\"100\" class=\"svelte-181fmze\"/>", 1), fo = {
	hash: "svelte-181fmze",
	code: "label.svelte-181fmze {display:block;font-size:.8rem;font-weight:600;margin:.5rem 0 .25rem;}input.svelte-181fmze {width:100%;box-sizing:border-box;font:inherit;padding:.35rem .5rem;border:1px solid var(--cpb-border);border-radius:6px;}"
};
function po(e, t) {
	k(t, !0), Z(e, fo);
	let n = Ea(t, "open", 15, !1), r = /* @__PURE__ */ N(() => t.store.t), i = /* @__PURE__ */ P(""), a = /* @__PURE__ */ P("general"), o = /* @__PURE__ */ P(!1);
	async function s() {
		if (!t.nodeId || U(i).trim() === "") return;
		F(o, !0);
		let e = await t.content.saveTemplate(t.nodeId, U(i).trim(), U(a).trim() || "general");
		F(o, !1), e && (F(i, ""), n(!1));
	}
	{
		let c = /* @__PURE__ */ N(() => U(r)("template.title")), l = /* @__PURE__ */ N(() => `${t.uid}-template`), u = /* @__PURE__ */ N(() => U(r)("template.submit")), d = /* @__PURE__ */ N(() => U(r)("dialog.cancel"));
		oo(e, {
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
				var o = uo(), s = yr(o), c = I(s, !0);
				O(s);
				var l = L(s, 2);
				Q(l);
				var u = L(l, 2), d = I(u, !0);
				O(u);
				var f = L(u, 2);
				Q(f), R((e, n) => {
					$(s, "for", `${t.uid}-template-name`), J(c, e), $(l, "id", `${t.uid}-template-name`), $(u, "for", `${t.uid}-template-category`), J(d, n), $(f, "id", `${t.uid}-template-category`);
				}, [() => U(r)("template.name"), () => U(r)("template.category")]), xa(l, () => U(i), (e) => F(i, e)), xa(f, () => U(a), (e) => F(a, e)), q(e, o);
			},
			$$slots: { default: !0 }
		});
	}
	A();
}
// src/ui/drag/indicator.ts
var mo = "ceiba-drop-indicator", ho = (e, t, n, r) => {
	let i = e.getElementById(mo);
	i || (i = e.createElement("div"), i.id = mo, i.setAttribute("aria-hidden", "true"), e.body.append(i));
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
}, go = (e) => {
	e?.getElementById(mo)?.remove();
}, _o = (e, t, n, r) => {
	let i = t <= 0 ? .5 : (n - e) / t;
	return r ? i < .25 ? "before" : i > .75 ? "after" : "inside" : i < .5 ? "before" : "after";
}, vo = (e, t, n, r) => t.kind === "move" ? {
	kind: "move",
	id: t.id,
	parent: n,
	index: r
} : {
	kind: "insert",
	parent: n,
	index: r,
	node: t.node
}, yo = (e, t, n, r, i) => {
	let a;
	if (r === null || !e.nodes[r]) a = vo(e, n, null, e.rootIds.length);
	else if (i === "inside") a = vo(e, n, r, e.nodes[r]?.children.length ?? 0);
	else {
		let t = e.nodes[r]?.parent ?? null;
		a = vo(e, n, t, se(e, t).indexOf(r) + +(i === "after"));
	}
	let o = r !== null && e.nodes[r] ? r : null;
	if (n.kind === "move" && a.kind === "move" && bo(e, n.id, a.parent, a.index)) return {
		command: null,
		anchor: o,
		zone: i,
		refused: null
	};
	try {
		return h(e, a, t), {
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
			refused: e instanceof Ce ? e.code : "SERVER"
		};
	}
}, bo = (e, t, n, r) => {
	if (e.nodes[t]?.parent !== n) return !1;
	let i = se(e, n).indexOf(t);
	return r === i || r === i + 1;
}, xo = 5, So = class {
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
			!this.active && Math.hypot(e.clientX - r.x, e.clientY - r.y) < xo || (this.active || this.begin({
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
			if (!this.active && Math.hypot(e.clientX - i.x, e.clientY - i.y) < xo) return;
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
		let i = n.elementFromPoint(e, t)?.closest("[data-ceiba-id]") ?? null, a = i?.dataset.ceibaId ?? null, o = a ? this.store.tree.nodes[a] : void 0, s = i?.getBoundingClientRect(), c = o ? this.store.catalogue?.get(o.type)?.isContainer ?? !1 : !1, l = s ? _o(s.top, s.height, t, c) : "inside";
		this.active.target = yo(this.store.tree, r, this.active.dragged, a, l), ho(n, i, l, this.active.target.refused !== null);
	}
	clearTarget() {
		this.active && (this.active.target = null), go(this.doc);
	}
	finish(e) {
		let t = this.active;
		if (this.active = null, go(this.doc), this.frame && (this.frame.style.pointerEvents = ""), this.doc?.body.classList.remove("ceiba-dragging"), document.removeEventListener("keydown", this.onKey, !0), this.doc?.removeEventListener("keydown", this.onKey, !0), !t) return;
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
}, Co = /* @__PURE__ */ K("<li class=\"svelte-239l1j\"> <button type=\"button\" class=\"svelte-239l1j\">×</button></li>"), wo = /* @__PURE__ */ K("<option class=\"svelte-239l1j\"> </option>"), To = /* @__PURE__ */ K("<select class=\"svelte-239l1j\"><option class=\"svelte-239l1j\"> </option><!></select>"), Eo = /* @__PURE__ */ K("<div class=\"classes svelte-239l1j\"><label class=\"svelte-239l1j\"> </label> <ul class=\"svelte-239l1j\"></ul> <!></div>"), Do = {
	hash: "svelte-239l1j",
	code: ".classes.svelte-239l1j {margin:.5rem 0;display:grid;gap:.25rem;}label.svelte-239l1j {font-size:.75rem;font-weight:600;}ul.svelte-239l1j {list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:.25rem;}li.svelte-239l1j {font-size:.75rem;padding:.1rem .2rem .1rem .5rem;border-radius:999px;background:var(--cpb-accent-soft);display:flex;align-items:center;gap:.25rem;}button.svelte-239l1j {font:inherit;border:none;background:none;cursor:pointer;padding:0 .25rem;}select.svelte-239l1j {font:inherit;font-size:.8rem;padding:.25rem .4rem;border:1px solid var(--cpb-border);border-radius:6px;}.svelte-239l1j:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Oo(e, t) {
	k(t, !0), Z(e, Do);
	let n = /* @__PURE__ */ N(() => t.store.t), r = /* @__PURE__ */ N(() => t.node.fields.styles), i = /* @__PURE__ */ N(() => U(r)?.classes ?? []), a = /* @__PURE__ */ N(() => Object.entries(t.store.design.classes).filter(([e]) => !U(i).includes(e)));
	function o(e) {
		let n = Ee(U(r), e);
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
	var s = zi(), c = yr(s), l = (e) => {
		var r = Eo(), s = I(r), c = I(s, !0);
		O(s);
		var l = L(s, 2);
		X(l, 20, () => U(i), (e) => e, (e, r) => {
			var a = Co(), s = I(a), c = L(s);
			O(a), R((e) => {
				J(s, `${t.store.design.classes[r]?.name ?? r ?? ""} `), $(c, "aria-label", e);
			}, [() => U(n)("styles.removeClass", { name: t.store.design.classes[r]?.name ?? r })]), W("click", c, () => o(U(i).filter((e) => e !== r))), q(e, a);
		}), O(l);
		var u = L(l, 2), d = (e) => {
			var r = To(), s = I(r), c = I(s, !0);
			O(s), s.value = s.__value = "", X(L(s), 17, () => U(a), ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ N(() => it(U(t), 2));
				let r = () => U(n)[0], i = () => U(n)[1];
				var a = wo(), o = I(a, !0);
				O(a);
				var s = {};
				R(() => {
					J(o, i().name ?? r()), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
				}), q(e, a);
			}), O(r), r.value = r.__value = "", R((e) => {
				$(r, "id", `${t.uid}-add-class`), J(c, e);
			}, [() => U(n)("styles.addClass")]), W("change", r, (e) => {
				e.currentTarget.value && o([...U(i), e.currentTarget.value]);
			}), q(e, r);
		};
		Y(u, (e) => {
			U(a).length > 0 && e(d);
		}), O(r), R((e) => {
			$(s, "for", `${t.uid}-add-class`), J(c, e);
		}, [() => U(n)("styles.classes")]), q(e, r);
	}, u = /* @__PURE__ */ N(() => Object.keys(t.store.design.classes).length > 0);
	Y(c, (e) => {
		U(u) && e(l);
	}), q(e, s), A();
}
G(["click", "change"]);
// src/ui/styles/groups.ts
var ko = [
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
], Ao = (e) => {
	let t = e.replace(/([A-Z])/g, " $1").toLowerCase();
	return t.charAt(0).toUpperCase() + t.slice(1);
}, jo = (e, t) => {
	let n = t.trim();
	return (e === "number" || e === "lineHeight") && /^-?(\d+\.?\d*|\.\d+)$/.test(n) ? Number(n) : n;
}, Mo = /* @__PURE__ */ K("<option class=\"svelte-91oqxq\"> </option>"), No = /* @__PURE__ */ K("<select class=\"svelte-91oqxq\"><option class=\"svelte-91oqxq\"> </option><!></select>"), Po = /* @__PURE__ */ K("<option class=\"svelte-91oqxq\"> </option>"), Fo = /* @__PURE__ */ K("<select class=\"svelte-91oqxq\"><option class=\"svelte-91oqxq\"> </option><!></select>"), Io = /* @__PURE__ */ K("<input class=\"svelte-91oqxq\"/>"), Lo = /* @__PURE__ */ K("<option class=\"svelte-91oqxq\"> </option>"), Ro = /* @__PURE__ */ K("<select class=\"svelte-91oqxq\"><option class=\"svelte-91oqxq\"> </option><!></select>"), zo = /* @__PURE__ */ K("<button type=\"button\" class=\"remove svelte-91oqxq\">×</button>"), Bo = /* @__PURE__ */ K("<p class=\"error svelte-91oqxq\" role=\"alert\"> </p>"), Vo = /* @__PURE__ */ K("<p class=\"origin svelte-91oqxq\"> </p>"), Ho = /* @__PURE__ */ K("<div class=\"field svelte-91oqxq\"><label class=\"svelte-91oqxq\"> </label> <div class=\"row svelte-91oqxq\"><!> <!> <!></div> <!></div>"), Uo = {
	hash: "svelte-91oqxq",
	code: ".field.svelte-91oqxq {display:grid;gap:.2rem;margin:.4rem 0;}label.svelte-91oqxq {font-size:.75rem;font-weight:600;}.row.svelte-91oqxq {display:flex;gap:.25rem;}input.svelte-91oqxq, select.svelte-91oqxq {flex:1;min-width:0;font:inherit;font-size:.8rem;padding:.25rem .4rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}[aria-invalid='true'].svelte-91oqxq {border-color:var(--cpb-danger);}.remove.svelte-91oqxq {font:inherit;padding:0 .5rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);cursor:pointer;}.origin.svelte-91oqxq {margin:0;font-size:.7rem;color:var(--cpb-muted);}.error.svelte-91oqxq {margin:0;font-size:.7rem;color:var(--cpb-danger);}.svelte-91oqxq:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Wo(e, t) {
	k(t, !0), Z(e, Uo);
	let n = /* @__PURE__ */ N(() => t.store.t), r = /* @__PURE__ */ N(() => t.node.fields.styles), i = /* @__PURE__ */ N(() => re(U(r), t.store.design, t.target, t.spec.name)), a = /* @__PURE__ */ N(() => U(i)?.origin === "own" ? U(i).value : void 0), o = /* @__PURE__ */ N(() => Se(t.spec)), s = /* @__PURE__ */ N(() => Object.entries(t.store.design.tokens).filter(([, e]) => e.type === U(o)).map(([e]) => e)), c = /* @__PURE__ */ N(() => t.spec.kind === "keyword" ? ne.keywords[t.spec.name] ?? [] : []), l = /* @__PURE__ */ N(() => typeof U(a) == "object" && U(a) !== null ? U(a).token : ""), u = /* @__PURE__ */ N(() => U(a) === void 0 || typeof U(a) == "object" ? "" : String(U(a))), d = (e) => typeof e == "object" ? `{${e.token}}` : String(e), f = /* @__PURE__ */ N(() => !U(i) || U(i).origin === "own" ? null : U(i).origin === "class" ? U(n)("styles.fromClass", { from: U(i).from }) : U(n)("styles.inherited", { from: U(i).from })), p = /* @__PURE__ */ P(null);
	function m(e) {
		if (e !== null && typeof e != "object" && me(t.spec, e) === null) {
			F(p, U(n)("styles.invalid"), !0);
			return;
		}
		F(p, null);
		let i = Ne(U(r), t.target, t.spec.name, e);
		t.store.run(i === null ? {
			kind: "updateFields",
			id: t.node.id,
			set: {},
			unset: ["styles"]
		} : {
			kind: "updateFields",
			id: t.node.id,
			set: { styles: i }
		});
	}
	let h = (e) => m(e.trim() === "" ? null : jo(t.spec.kind, e));
	var g = Ho(), _ = I(g), v = I(_, !0);
	O(_);
	var y = L(_, 2), b = I(y), x = (e) => {
		var n = No(), r = I(n), a = I(r, !0);
		O(r), r.value = r.__value = "", X(L(r), 16, () => U(s), (e) => e, (e, t) => {
			var n = Mo(), r = I(n, !0);
			O(n);
			var i = {};
			R(() => {
				J(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
			}), q(e, n);
		}), O(n);
		var o;
		la(n), R((e) => {
			$(n, "id", t.id), J(a, e), o !== (o = U(l)) && (n.value = (n.__value = U(l)) ?? "", ca(n, U(l)));
		}, [() => U(i) ? d(U(i).value) : "—"]), W("change", n, (e) => m(e.currentTarget.value === "" ? null : { token: e.currentTarget.value })), q(e, n);
	}, S = (e) => {
		var n = Fo(), r = I(n), a = I(r, !0);
		O(r), r.value = r.__value = "", X(L(r), 16, () => U(c), (e) => e, (e, t) => {
			var n = Po(), r = I(n, !0);
			O(n);
			var i = {};
			R(() => {
				J(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
			}), q(e, n);
		}), O(n);
		var o;
		la(n), R((e) => {
			$(n, "id", t.id), J(a, e), o !== (o = U(u)) && (n.value = (n.__value = U(u)) ?? "", ca(n, U(u)));
		}, [() => U(i) ? d(U(i).value) : "—"]), W("change", n, (e) => h(e.currentTarget.value)), q(e, n);
	}, C = (e) => {
		var n = Io();
		Q(n), R((e) => {
			$(n, "id", t.id), ga(n, U(u)), $(n, "placeholder", e), $(n, "aria-invalid", U(p) !== null), $(n, "aria-describedby", U(p) ? `${t.id}-error` : U(f) ? `${t.id}-origin` : void 0);
		}, [() => U(i) && U(i).origin !== "own" ? d(U(i).value) : ""]), W("change", n, (e) => h(e.currentTarget.value)), q(e, n);
	};
	Y(b, (e) => {
		t.spec.kind === "token" ? e(x) : U(c).length > 0 ? e(S, 1) : e(C, -1);
	});
	var w = L(b, 2), ee = (e) => {
		var r = Ro(), i = I(r), a = I(i, !0);
		O(i), i.value = i.__value = "", X(L(i), 16, () => U(s), (e) => e, (e, t) => {
			var n = Lo(), r = I(n, !0);
			O(n);
			var i = {};
			R(() => {
				J(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
			}), q(e, n);
		}), O(r);
		var o;
		la(r), R((e, t) => {
			$(r, "aria-label", e), J(a, t), o !== (o = U(l)) && (r.value = (r.__value = U(l)) ?? "", ca(r, U(l)));
		}, [() => `${U(n)("styles.token")} · ${Ao(t.spec.name)}`, () => U(n)("styles.literal")]), W("change", r, (e) => m(e.currentTarget.value === "" ? null : { token: e.currentTarget.value })), q(e, r);
	};
	Y(w, (e) => {
		U(s).length > 0 && t.spec.kind !== "token" && e(ee);
	});
	var te = L(w, 2), ie = (e) => {
		var r = zo();
		R((e) => $(r, "aria-label", e), [() => U(n)("styles.remove", { property: Ao(t.spec.name) })]), W("click", r, () => m(null)), q(e, r);
	};
	Y(te, (e) => {
		U(a) !== void 0 && e(ie);
	}), O(y);
	var ae = L(y, 2), oe = (e) => {
		var n = Bo(), r = I(n, !0);
		O(n), R(() => {
			$(n, "id", `${t.id}-error`), J(r, U(p));
		}), q(e, n);
	}, se = (e) => {
		var n = Vo(), r = I(n, !0);
		O(n), R(() => {
			$(n, "id", `${t.id}-origin`), J(r, U(f));
		}), q(e, n);
	};
	Y(ae, (e) => {
		U(p) ? e(oe) : U(f) && e(se, 1);
	}), O(g), R((e) => {
		$(_, "for", t.id), J(v, e);
	}, [() => Ao(t.spec.name)]), q(e, g), A();
}
G(["change", "click"]);
// src/ui/styles/StylesPanel.svelte
var Go = /* @__PURE__ */ K("<option class=\"svelte-tbe6xh\"> </option>"), Ko = /* @__PURE__ */ K("<option class=\"svelte-tbe6xh\"> </option>"), qo = /* @__PURE__ */ K("<details class=\"group svelte-tbe6xh\"><summary class=\"svelte-tbe6xh\"> </summary> <!></details>"), Jo = /* @__PURE__ */ K("<details class=\"styles svelte-tbe6xh\" open=\"\"><summary class=\"svelte-tbe6xh\"> </summary> <div class=\"target svelte-tbe6xh\"><label class=\"svelte-tbe6xh\"> </label> <select class=\"svelte-tbe6xh\"><option class=\"svelte-tbe6xh\"> </option><!></select> <label class=\"svelte-tbe6xh\"> </label> <select class=\"svelte-tbe6xh\"><option class=\"svelte-tbe6xh\"> </option><!></select></div> <!> <!></details>"), Yo = {
	hash: "svelte-tbe6xh",
	code: ".styles.svelte-tbe6xh {margin-top:1rem;border-top:1px solid var(--cpb-border);padding-top:.5rem;}summary.svelte-tbe6xh {cursor:pointer;font-size:.8rem;font-weight:700;}.group.svelte-tbe6xh {margin:.35rem 0;padding-left:.25rem;}.group.svelte-tbe6xh summary:where(.svelte-tbe6xh) {font-weight:600;font-size:.78rem;}.target.svelte-tbe6xh {display:grid;grid-template-columns:auto 1fr;gap:.25rem .5rem;align-items:center;margin:.5rem 0;}label.svelte-tbe6xh {font-size:.75rem;font-weight:600;}select.svelte-tbe6xh {font:inherit;font-size:.8rem;padding:.25rem .4rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}.svelte-tbe6xh:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Xo(e, t) {
	k(t, !0), Z(e, Yo);
	let n = Ea(t, "store", 7), r = /* @__PURE__ */ N(() => n().t), i = /* @__PURE__ */ N(() => n().styleState === null ? {
		breakpoint: n().viewport,
		state: null
	} : {
		breakpoint: null,
		state: n().styleState
	});
	var a = Jo(), o = I(a), s = I(o, !0);
	O(o);
	var c = L(o, 2), l = I(c), u = I(l, !0);
	O(l);
	var d = L(l, 2), f = I(d), p = I(f, !0);
	O(f), f.value = f.__value = "", X(L(f), 17, () => n().design.breakpoints, (e) => e.id, (e, t) => {
		var n = Go(), r = I(n);
		O(n);
		var i = {};
		R(() => {
			J(r, `${U(t).id ?? ""} · ${U(t).minWidth ?? ""}px`), i !== (i = U(t).id) && (n.value = (n.__value = U(t).id) ?? "");
		}), q(e, n);
	}), O(d);
	var m;
	la(d);
	var h = L(d, 2), g = I(h, !0);
	O(h);
	var _ = L(h, 2), v = I(_), y = I(v, !0);
	O(v), v.value = v.__value = "", X(L(v), 16, () => ne.states, (e) => e, (e, t) => {
		var n = Ko(), r = I(n, !0);
		O(n);
		var i = {};
		R(() => {
			J(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
		}), q(e, n);
	}), O(_);
	var b;
	la(_), O(c);
	var x = L(c, 2);
	Oo(x, {
		get store() {
			return n();
		},
		get node() {
			return t.node;
		},
		get uid() {
			return t.uid;
		}
	}), X(L(x, 2), 17, () => ko, (e) => e.key, (e, a) => {
		var o = qo(), s = I(o), c = I(s, !0);
		O(s), X(L(s, 2), 16, () => U(a).properties, (e) => e, (e, r) => {
			let a = /* @__PURE__ */ N(() => pe.get(r));
			var o = zi(), s = yr(o), c = (e) => {
				{
					let o = /* @__PURE__ */ N(() => `${t.uid}-style-${r}`);
					Wo(e, {
						get store() {
							return n();
						},
						get node() {
							return t.node;
						},
						get target() {
							return U(i);
						},
						get spec() {
							return U(a);
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
		}), O(o), R((e) => J(c, e), [() => U(r)(U(a).key)]), q(e, o);
	}), O(a), R((e, r, i, a, o) => {
		J(s, e), $(l, "for", `${t.uid}-bp`), J(u, r), $(d, "id", `${t.uid}-bp`), J(p, i), m !== (m = n().viewport ?? "") && (d.value = (d.__value = n().viewport ?? "") ?? "", ca(d, n().viewport ?? "")), $(h, "for", `${t.uid}-state`), J(g, a), $(_, "id", `${t.uid}-state`), _.disabled = n().viewport !== null, J(y, o), b !== (b = n().styleState ?? "") && (_.value = (_.__value = n().styleState ?? "") ?? "", ca(_, n().styleState ?? ""));
	}, [
		() => U(r)("styles.title"),
		() => U(r)("styles.target"),
		() => U(r)("viewport.base"),
		() => U(r)("styles.state"),
		() => U(r)("styles.normal")
	]), W("change", d, (e) => {
		n().viewport = e.currentTarget.value || null, n().styleState = null;
	}), W("change", _, (e) => {
		n().styleState = e.currentTarget.value || null;
	}), q(e, a), A();
}
G(["change"]);
// src/ui/inspector/advanced/loop.ts
var Zo = (e) => typeof e == "object" && e && !Array.isArray(e) ? e : {}, Qo = (e) => {
	let t = Zo(e), n = typeof t.source == "string" ? t.source : "", r = Zo(t.sort);
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
		filters: Object.entries(Zo(t.filters)).map(([e, t]) => `${e}=${String(t)}`).join("\n")
	};
}, $o = (e) => {
	if (e.trim() === "") return;
	let t = Number(e);
	return Number.isInteger(t) && t >= 0 ? t : null;
}, es = (e) => {
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
		let e = $o(r);
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
}, ts = /* @__PURE__ */ K("<div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input class=\"svelte-1v8f4it\"/></div>"), ns = /* @__PURE__ */ K("<div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input type=\"url\" class=\"svelte-1v8f4it\"/></div>"), rs = /* @__PURE__ */ K("<div class=\"grid svelte-1v8f4it\"><div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input class=\"svelte-1v8f4it\"/></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input class=\"svelte-1v8f4it\"/></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input inputmode=\"numeric\" class=\"svelte-1v8f4it\"/></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input inputmode=\"numeric\" class=\"svelte-1v8f4it\"/></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input class=\"svelte-1v8f4it\"/></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label> <select class=\"svelte-1v8f4it\"><option class=\"svelte-1v8f4it\">ASC</option><option class=\"svelte-1v8f4it\">DESC</option></select></div></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><textarea rows=\"3\" class=\"svelte-1v8f4it\"></textarea></div>", 1), is = /* @__PURE__ */ K("<p class=\"error svelte-1v8f4it\" role=\"alert\"> </p>"), as = /* @__PURE__ */ K("<details class=\"advanced svelte-1v8f4it\"><summary class=\"svelte-1v8f4it\"> </summary> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label> <select class=\"svelte-1v8f4it\"><option class=\"svelte-1v8f4it\"> </option><option class=\"svelte-1v8f4it\"> </option><option class=\"svelte-1v8f4it\"> </option></select></div> <!> <!> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input class=\"svelte-1v8f4it\"/></div> <!> <button type=\"button\" class=\"svelte-1v8f4it\"> </button></details>"), os = {
	hash: "svelte-1v8f4it",
	code: ".advanced.svelte-1v8f4it {margin-top:1rem;border-top:1px solid var(--cpb-border);padding-top:.5rem;}summary.svelte-1v8f4it {cursor:pointer;font-size:.8rem;font-weight:700;}.grid.svelte-1v8f4it {display:grid;grid-template-columns:1fr 1fr;gap:0 .5rem;}.field.svelte-1v8f4it {display:grid;gap:.25rem;margin:.5rem 0;}label.svelte-1v8f4it {font-size:.75rem;font-weight:600;}input.svelte-1v8f4it, select.svelte-1v8f4it, textarea.svelte-1v8f4it {font:inherit;font-size:.8rem;padding:.3rem .45rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}.error.svelte-1v8f4it {color:var(--cpb-danger);font-size:.75rem;margin:0;}button.svelte-1v8f4it {font:inherit;font-size:.8rem;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}.svelte-1v8f4it:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function ss(e, t) {
	k(t, !0), Z(e, os);
	let n = /* @__PURE__ */ N(() => t.store.t), r = cr(wi(() => Qo(t.node.fields.loop))), i = /* @__PURE__ */ P(cr(wi(() => typeof t.node.fields.condition == "string" ? t.node.fields.condition : ""))), a = /* @__PURE__ */ P(null), o = (e) => `${t.uid}-adv-${e}`;
	function s() {
		let e = es(r);
		if ("error" in e) {
			F(a, U(n)(e.error), !0);
			return;
		}
		F(a, null);
		let o = {}, s = [];
		e.loop ? o.loop = e.loop : s.push("loop"), U(i).trim() === "" ? s.push("condition") : o.condition = U(i).trim(), t.store.run({
			kind: "updateFields",
			id: t.node.id,
			set: o,
			unset: s
		});
	}
	var c = as(), l = I(c), u = I(l, !0);
	O(l);
	var d = L(l, 2), f = I(d), p = I(f, !0);
	O(f);
	var m = L(f, 2), h = I(m), g = I(h, !0);
	O(h), h.value = h.__value = "none";
	var _ = L(h), v = I(_, !0);
	O(_), _.value = _.__value = "module";
	var y = L(_), b = I(y, !0);
	O(y), y.value = y.__value = "api", O(m), O(d);
	var x = L(d, 2), S = (e) => {
		var t = ts(), i = I(t), a = I(i, !0);
		O(i);
		var s = L(i);
		Q(s), O(t), R((e, t, n) => {
			$(i, "for", e), J(a, t), $(s, "id", n);
		}, [
			() => o("module"),
			() => U(n)("advanced.moduleSlug"),
			() => o("module")
		]), xa(s, () => r.module, (e) => r.module = e), q(e, t);
	}, C = (e) => {
		var t = ns(), i = I(t), a = I(i, !0);
		O(i);
		var s = L(i);
		Q(s), O(t), R((e, t, n) => {
			$(i, "for", e), J(a, t), $(s, "id", n);
		}, [
			() => o("api"),
			() => U(n)("advanced.apiUrl"),
			() => o("api")
		]), xa(s, () => r.api, (e) => r.api = e), q(e, t);
	};
	Y(x, (e) => {
		r.sourceType === "module" ? e(S) : r.sourceType === "api" && e(C, 1);
	});
	var w = L(x, 2), ee = (e) => {
		var t = rs(), i = yr(t), a = I(i), s = I(a), c = I(s, !0);
		O(s);
		var l = L(s);
		Q(l), O(a);
		var u = L(a, 2), d = I(u), f = I(d, !0);
		O(d);
		var p = L(d);
		Q(p), O(u);
		var m = L(u, 2), h = I(m), g = I(h, !0);
		O(h);
		var _ = L(h);
		Q(_), O(m);
		var v = L(m, 2), y = I(v), b = I(y, !0);
		O(y);
		var x = L(y);
		Q(x), O(v);
		var S = L(v, 2), C = I(S), w = I(C, !0);
		O(C);
		var ee = L(C);
		Q(ee), O(S);
		var te = L(S, 2), ne = I(te), re = I(ne, !0);
		O(ne);
		var ie = L(ne, 2), ae = I(ie);
		ae.value = ae.__value = "ASC";
		var oe = L(ae);
		oe.value = oe.__value = "DESC", O(ie), O(te), O(i);
		var se = L(i, 2), ce = I(se), le = I(ce, !0);
		O(ce);
		var ue = L(ce);
		wr(ue), O(se), R((e, t, n, r, i, a, o, u, m, v, S, te, ae, oe, se, de, fe, pe, me, he, ge) => {
			$(s, "for", e), J(c, t), $(l, "id", n), $(d, "for", r), J(f, i), $(p, "id", a), $(h, "for", o), J(g, u), $(_, "id", m), $(y, "for", v), J(b, S), $(x, "id", te), $(C, "for", ae), J(w, oe), $(ee, "id", se), $(ne, "for", de), J(re, fe), $(ie, "id", pe), $(ce, "for", me), J(le, he), $(ue, "id", ge);
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
		]), xa(l, () => r.variable, (e) => r.variable = e), xa(p, () => r.key, (e) => r.key = e), xa(_, () => r.limit, (e) => r.limit = e), xa(x, () => r.offset, (e) => r.offset = e), xa(ee, () => r.sortColumn, (e) => r.sortColumn = e), ua(ie, () => r.sortDirection, (e) => r.sortDirection = e), xa(ue, () => r.filters, (e) => r.filters = e), q(e, t);
	};
	Y(w, (e) => {
		r.sourceType !== "none" && e(ee);
	});
	var te = L(w, 2), ne = I(te), re = I(ne, !0);
	O(ne);
	var ie = L(ne);
	Q(ie), O(te);
	var ae = L(te, 2), oe = (e) => {
		var t = is(), n = I(t, !0);
		O(t), R(() => J(n, U(a))), q(e, t);
	};
	Y(ae, (e) => {
		U(a) && e(oe);
	});
	var se = L(ae, 2), ce = I(se, !0);
	O(se), O(c), R((e, t, n, r, i, a, o, s, c, l, d) => {
		J(u, e), $(f, "for", t), J(p, n), $(m, "id", r), J(g, i), J(v, a), J(b, o), $(ne, "for", s), J(re, c), $(ie, "id", l), J(ce, d);
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
	]), ua(m, () => r.sourceType, (e) => r.sourceType = e), xa(ie, () => U(i), (e) => F(i, e)), W("click", se, s), q(e, c), A();
}
G(["click"]);
// src/ui/inspector/fields.ts
var cs = {
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
}, ls = /* @__PURE__ */ new Set([
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
]), us = (e) => e.charAt(0).toUpperCase() + e.slice(1).replace(/[_-]/g, " "), ds = (e) => {
	let t = [], n = /* @__PURE__ */ new Set();
	for (let [r, i] of Object.entries(e.editorControls)) {
		let e = i, a = e.options?.map(String);
		t.push({
			key: r,
			label: e.label ?? us(r),
			control: cs[e.type ?? ""] ?? "text",
			...a ? { options: a } : {}
		}), n.add(r);
	}
	for (let [r, i] of Object.entries(e.propsSchema)) {
		if (n.has(r)) continue;
		let e = i, a = e.enum?.map(String);
		t.push({
			key: r,
			label: us(r),
			control: a ? "select" : cs[e.type ?? ""] ?? "text",
			...a ? { options: a } : {}
		}), n.add(r);
	}
	return Object.keys(e.propsSchema).length === 0 && Object.keys(e.editorControls).length === 0 && (ls.has(e.type) && t.push({
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
}, fs = (e, t) => {
	if (e.control === "checkbox") return { value: t === !0 };
	let n = String(t);
	if (e.control === "number") {
		if (n.trim() === "") return { value: null };
		let e = Number(n);
		return Number.isFinite(e) ? { value: e } : { error: "field.number" };
	}
	return e.control === "url" && n.trim() !== "" && Oa(n) === "" ? { error: "field.url" } : e.control === "select" && e.options && !e.options.includes(n) ? { error: "field.option" } : e.control === "select" && e.options?.every((e) => /^\d+$/.test(e)) ? { value: Number(n) } : { value: n };
}, ps = /* @__PURE__ */ K("<label class=\"svelte-1g42mo8\"><input type=\"checkbox\" class=\"svelte-1g42mo8\"/> </label>"), ms = /* @__PURE__ */ K("<textarea rows=\"3\" class=\"svelte-1g42mo8\"></textarea>"), hs = /* @__PURE__ */ K("<option> </option>"), gs = /* @__PURE__ */ K("<select class=\"svelte-1g42mo8\"></select>"), _s = /* @__PURE__ */ K("<input class=\"svelte-1g42mo8\"/>"), vs = /* @__PURE__ */ K("<label class=\"svelte-1g42mo8\"> </label> <!>", 1), ys = /* @__PURE__ */ K("<p class=\"error svelte-1g42mo8\" role=\"alert\"> </p>"), bs = /* @__PURE__ */ K("<div class=\"field svelte-1g42mo8\"><!> <!></div>"), xs = {
	hash: "svelte-1g42mo8",
	code: ".field.svelte-1g42mo8 {display:grid;gap:.25rem;margin-bottom:.75rem;}label.svelte-1g42mo8 {font-size:.8rem;font-weight:600;}input.svelte-1g42mo8:not([type='checkbox']), textarea.svelte-1g42mo8, select.svelte-1g42mo8 {font:inherit;font-size:.875rem;padding:.35rem .5rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}[aria-invalid='true'].svelte-1g42mo8 {border-color:var(--cpb-danger);}input.svelte-1g42mo8:focus-visible, textarea.svelte-1g42mo8:focus-visible, select.svelte-1g42mo8:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}.error.svelte-1g42mo8 {color:var(--cpb-danger);font-size:.75rem;margin:0;}"
};
function Ss(e, t) {
	k(t, !0), Z(e, xs);
	let n = /* @__PURE__ */ P(null), r = /* @__PURE__ */ N(() => t.value === null || t.value === void 0 ? "" : String(t.value));
	function i(e) {
		let r = fs(t.field, e);
		"error" in r ? F(n, t.t(r.error), !0) : (F(n, null), t.onChange(r.value));
	}
	var a = bs(), o = I(a), s = (e) => {
		var n = ps(), r = I(n);
		Q(r);
		var a = L(r);
		O(n), R(() => {
			$(r, "id", t.id), _a(r, t.value === !0), J(a, ` ${t.field.label ?? ""}`);
		}), W("change", r, (e) => i(e.currentTarget.checked)), q(e, n);
	}, c = (e) => {
		var a = vs(), o = yr(a), s = I(o, !0);
		O(o);
		var c = L(o, 2), l = (e) => {
			var a = ms();
			wr(a), R(() => {
				$(a, "id", t.id), ga(a, U(r)), $(a, "aria-invalid", U(n) !== null), $(a, "aria-describedby", U(n) ? `${t.id}-error` : void 0);
			}), W("input", a, (e) => i(e.currentTarget.value)), q(e, a);
		}, u = (e) => {
			var n = gs();
			X(n, 20, () => t.field.options ?? [], (e) => e, (e, t) => {
				var n = hs(), r = I(n, !0);
				O(n);
				var i = {};
				R(() => {
					J(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
				}), q(e, n);
			}), O(n);
			var a;
			la(n), R(() => {
				$(n, "id", t.id), a !== (a = U(r)) && (n.value = (n.__value = U(r)) ?? "", ca(n, U(r)));
			}), W("change", n, (e) => i(e.currentTarget.value)), q(e, n);
		}, d = (e) => {
			var a = _s();
			Q(a), R(() => {
				$(a, "id", t.id), $(a, "type", t.field.control === "number" ? "number" : t.field.control === "url" ? "url" : "text"), ga(a, U(r)), $(a, "aria-invalid", U(n) !== null), $(a, "aria-describedby", U(n) ? `${t.id}-error` : void 0);
			}), W("input", a, (e) => i(e.currentTarget.value)), q(e, a);
		};
		Y(c, (e) => {
			t.field.control === "textarea" ? e(l) : t.field.control === "select" ? e(u, 1) : e(d, -1);
		}), R(() => {
			$(o, "for", t.id), J(s, t.field.label);
		}), q(e, a);
	};
	Y(o, (e) => {
		t.field.control === "checkbox" ? e(s) : e(c, -1);
	});
	var l = L(o, 2), u = (e) => {
		var r = ys(), i = I(r, !0);
		O(r), R(() => {
			$(r, "id", `${t.id}-error`), J(i, U(n));
		}), q(e, r);
	};
	Y(l, (e) => {
		U(n) && e(u);
	}), O(a), q(e, a), A();
}
G(["change", "input"]);
// src/ui/inspector/Inspector.svelte
var Cs = /* @__PURE__ */ K("<p class=\"hint svelte-2ghsnx\"> </p>"), ws = /* @__PURE__ */ K("<p class=\"locked svelte-2ghsnx\" role=\"note\"> </p>"), Ts = /* @__PURE__ */ K("<!><!>", 1), Es = /* @__PURE__ */ K("<button type=\"button\" class=\"svelte-2ghsnx\"> </button>"), Ds = /* @__PURE__ */ K("<p class=\"type svelte-2ghsnx\"> </p> <div class=\"field svelte-2ghsnx\"><label class=\"svelte-2ghsnx\"> </label> <input type=\"text\" class=\"svelte-2ghsnx\"/></div> <!> <!> <div class=\"actions svelte-2ghsnx\"><button type=\"button\" class=\"svelte-2ghsnx\"> </button> <!> <button type=\"button\" class=\"danger svelte-2ghsnx\"> </button></div>", 1), Os = /* @__PURE__ */ K("<section class=\"inspector svelte-2ghsnx\"><h2 class=\"svelte-2ghsnx\"> </h2> <!></section>"), ks = {
	hash: "svelte-2ghsnx",
	code: ".inspector.svelte-2ghsnx {padding:.5rem .75rem;overflow:auto;border-left:1px solid var(--cpb-border);}h2.svelte-2ghsnx {font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin:0 0 .5rem;color:var(--cpb-muted);}.hint.svelte-2ghsnx, .locked.svelte-2ghsnx {font-size:.85rem;color:var(--cpb-muted);}.locked.svelte-2ghsnx {color:var(--cpb-danger);}.type.svelte-2ghsnx {font-weight:700;margin:0 0 .75rem;}.field.svelte-2ghsnx {display:grid;gap:.25rem;margin-bottom:.75rem;}label.svelte-2ghsnx {font-size:.8rem;font-weight:600;}input.svelte-2ghsnx {font:inherit;font-size:.875rem;padding:.35rem .5rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}.actions.svelte-2ghsnx {display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1rem;}button.svelte-2ghsnx {font:inherit;font-size:.8rem;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.danger.svelte-2ghsnx {color:var(--cpb-danger);}button.svelte-2ghsnx:focus-visible, input.svelte-2ghsnx:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function As(e, t) {
	k(t, !0), Z(e, ks);
	let n = Ea(t, "canTemplates", 3, !1), r = /* @__PURE__ */ N(() => t.store.t), i = /* @__PURE__ */ N(() => t.store.selection ? t.store.tree.nodes[t.store.selection] : void 0), a = /* @__PURE__ */ N(() => U(i) ? t.store.catalogue?.get(U(i).type) : void 0), o = /* @__PURE__ */ N(() => U(a) ? ds(U(a)) : []), s = /* @__PURE__ */ N(() => {
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
	function u() {
		U(i) && t.store.run({
			kind: "remove",
			id: U(i).id
		}, ["announce.removed"]) && t.onRemoved();
	}
	var d = Os(), f = I(d), p = I(f, !0);
	O(f);
	var m = L(f, 2), h = (e) => {
		var t = Cs(), n = I(t, !0);
		O(t), R((e) => J(n, e), [() => U(r)("inspector.none")]), q(e, t);
	}, g = (e) => {
		var d = zi();
		qi(yr(d), () => U(i).id, (e) => {
			var d = Ds(), f = yr(d), p = I(f, !0);
			O(f);
			var m = L(f, 2), h = I(m), g = I(h, !0);
			O(h);
			var _ = L(h, 2);
			Q(_), O(m);
			var v = L(m, 2), y = (e) => {
				var t = ws(), n = I(t, !0);
				O(t), R((e) => J(n, e), [() => U(r)("inspector.locked")]), q(e, t);
			}, b = (e) => {
				var n = zi();
				X(yr(n), 17, () => U(o), (e) => e.key, (e, n) => {
					{
						let i = /* @__PURE__ */ N(() => `${t.uid}-prop-${U(n).key}`);
						Ss(e, {
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
			Y(v, (e) => {
				U(a) ? e(b, -1) : e(y);
			});
			var x = L(v, 2), S = (e) => {
				var n = Ts(), r = yr(n);
				Xo(r, {
					get store() {
						return t.store;
					},
					get node() {
						return U(i);
					},
					get uid() {
						return t.uid;
					}
				}), ss(L(r), {
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
			Y(x, (e) => {
				U(a) && e(S);
			});
			var C = L(x, 2), w = I(C), ee = I(w, !0);
			O(w);
			var te = L(w, 2), ne = (e) => {
				var n = Es(), i = I(n, !0);
				O(n), R((e) => J(i, e), [() => U(r)("inspector.saveTemplate")]), W("click", n, function(...e) {
					t.onSaveTemplate?.apply(this, e);
				}), q(e, n);
			};
			Y(te, (e) => {
				n() && e(ne);
			});
			var re = L(te, 2), ie = I(re, !0);
			O(re), O(C), R((e, n, r) => {
				J(p, U(a)?.label ?? U(i).type), $(h, "for", `${t.uid}-name`), J(g, e), $(_, "id", `${t.uid}-name`), ga(_, typeof U(i).fields.label == "string" ? U(i).fields.label : ""), J(ee, n), J(ie, r);
			}, [
				() => U(r)("inspector.name"),
				() => U(r)("inspector.duplicate"),
				() => U(r)("inspector.remove")
			]), W("input", _, (e) => l(e.currentTarget.value)), W("click", w, () => U(i) && t.store.run({
				kind: "duplicate",
				id: U(i).id
			})), W("click", re, u), q(e, d);
		}), q(e, d);
	};
	Y(m, (e) => {
		U(i) ? e(g, -1) : e(h);
	}), O(d), R((e) => {
		$(d, "aria-labelledby", `${t.uid}-inspector-title`), $(f, "id", `${t.uid}-inspector-title`), J(p, e);
	}, [() => U(r)("inspector.title")]), q(e, d), A();
}
G(["input", "click"]);
// src/ui/palette/Palette.svelte
var js = /* @__PURE__ */ K("<button type=\"button\" class=\"wide svelte-om8jxl\"> </button>"), Ms = /* @__PURE__ */ K("<li><button type=\"button\" class=\"svelte-om8jxl\"> </button></li>"), Ns = /* @__PURE__ */ K("<h3 class=\"svelte-om8jxl\"> </h3> <ul class=\"svelte-om8jxl\"></ul>", 1), Ps = /* @__PURE__ */ K("<li><button type=\"button\" class=\"svelte-om8jxl\"> </button></li>"), Fs = /* @__PURE__ */ K("<h3 class=\"svelte-om8jxl\"> </h3> <ul class=\"svelte-om8jxl\"></ul>", 1), Is = /* @__PURE__ */ K("<section class=\"palette svelte-om8jxl\" aria-labelledby=\"cpb-palette-title\"><h2 id=\"cpb-palette-title\" class=\"svelte-om8jxl\"> </h2> <!> <!> <!></section>"), Ls = {
	hash: "svelte-om8jxl",
	code: ".palette.svelte-om8jxl {padding:.5rem .75rem;overflow:auto;}h2.svelte-om8jxl {font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin:0 0 .5rem;color:var(--cpb-muted);}h3.svelte-om8jxl {font-size:.75rem;margin:.5rem 0 .25rem;color:var(--cpb-muted);text-transform:capitalize;}ul.svelte-om8jxl {list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2, 1fr);gap:.25rem;}button.svelte-om8jxl {touch-action:none;width:100%;font:inherit;font-size:.8rem;padding:.35rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;text-align:left;}button.svelte-om8jxl:hover {border-color:var(--cpb-accent);}.wide.svelte-om8jxl {margin-bottom:.5rem;text-align:center;}button.svelte-om8jxl:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Rs(e, t) {
	k(t, !0), Z(e, Ls);
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
		let r = to(t.store.tree, n, t.store.selection, e.type);
		t.store.run({
			kind: "insert",
			...r,
			node: $a(n, e.type)
		}, ["announce.inserted", { label: e.label }]) && t.store.selection && t.onInserted(t.store.selection);
	}
	var o = Is(), s = I(o), c = I(s, !0);
	O(s);
	var l = L(s, 2), u = (e) => {
		var r = js(), i = I(r, !0);
		O(r), R((e) => J(i, e), [() => U(n)("palette.import")]), W("click", r, function(...e) {
			t.onImport?.apply(this, e);
		}), q(e, r);
	};
	Y(l, (e) => {
		t.content.canImport && e(u);
	});
	var d = L(l, 2), f = (e) => {
		var r = Ns(), i = yr(r), a = I(i, !0);
		O(i);
		var o = L(i, 2);
		X(o, 21, () => t.content.templates, (e) => e.id, (e, r) => {
			var i = Ms(), a = I(i), o = I(a, !0);
			O(a), O(i), R((e) => {
				$(a, "aria-label", e), J(o, U(r).name);
			}, [() => U(n)("palette.insertTemplate", { name: U(r).name })]), W("click", a, () => {
				t.content.insertNodes(U(r).nodes, U(r).name) && t.store.selection && t.onInserted(t.store.selection);
			}), q(e, i);
		}), O(o), R((e) => J(a, e), [() => U(n)("palette.templates")]), q(e, r);
	};
	Y(d, (e) => {
		t.content.canTemplates && t.content.templates.length > 0 && e(f);
	}), X(L(d, 2), 17, () => U(i), ([e, t]) => e, (e, r) => {
		var i = /* @__PURE__ */ N(() => it(U(r), 2));
		let o = () => U(i)[0], s = () => U(i)[1];
		var c = Fs(), l = yr(c), u = I(l, !0);
		O(l);
		var d = L(l, 2);
		X(d, 21, s, (e) => e.type, (e, r) => {
			var i = Ps(), o = I(i), s = I(o, !0);
			O(o), O(i), R((e) => {
				$(o, "aria-label", e), $(o, "data-type", U(r).type), J(s, U(r).label);
			}, [() => U(n)("palette.insert", { label: U(r).label })]), W("click", o, () => a(U(r))), W("pointerdown", o, (e) => t.store.catalogue && t.drag.pressNew(e, {
				kind: "insert",
				node: $a(t.store.catalogue, U(r).type)
			}, U(r).label)), q(e, i);
		}), O(d), R((e) => J(u, e), [() => o().replace(/_/g, " ")]), q(e, c);
	}), O(o), R((e) => J(c, e), [() => U(n)("palette.title")]), q(e, o), A();
}
G(["click", "pointerdown"]);
// src/ui/publish/ConflictBanner.svelte
var zs = /* @__PURE__ */ K("<button type=\"button\" class=\"svelte-1ti6kqq\"> </button>"), Bs = /* @__PURE__ */ K("<div class=\"conflict svelte-1ti6kqq\" role=\"alertdialog\" aria-modal=\"false\" tabindex=\"-1\"><strong> </strong> <p class=\"svelte-1ti6kqq\"> </p> <div class=\"actions svelte-1ti6kqq\"><button type=\"button\" class=\"primary svelte-1ti6kqq\"> </button> <button type=\"button\" class=\"svelte-1ti6kqq\"> </button> <!></div></div>"), Vs = {
	hash: "svelte-1ti6kqq",
	code: ".conflict.svelte-1ti6kqq {margin:.5rem .75rem 0;padding:.75rem;border:2px solid var(--cpb-danger);border-radius:8px;background:#fef2f2;}.conflict.svelte-1ti6kqq:focus-visible {outline:2px solid var(--cpb-danger);outline-offset:2px;}p.svelte-1ti6kqq {margin:.25rem 0 .5rem;font-size:.875rem;}.actions.svelte-1ti6kqq {display:flex;flex-wrap:wrap;gap:.5rem;}button.svelte-1ti6kqq {font:inherit;font-size:.85rem;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.primary.svelte-1ti6kqq {background:var(--cpb-danger);border-color:var(--cpb-danger);color:#fff;}button.svelte-1ti6kqq:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:2px;}"
};
function Hs(e, t) {
	k(t, !0), Z(e, Vs);
	let n = /* @__PURE__ */ N(() => t.store.t), r = /* @__PURE__ */ P(void 0);
	Pr(() => {
		t.store.status === "conflict" && xi().then(() => U(r)?.focus());
	});
	var i = zi(), a = yr(i), o = (e) => {
		var i = Bs(), a = I(i), o = I(a, !0);
		O(a);
		var s = L(a, 2), c = I(s, !0);
		O(s);
		var l = L(s, 2), u = I(l), d = I(u, !0);
		O(u);
		var f = L(u, 2), p = I(f, !0);
		O(f);
		var m = L(f, 2), h = (e) => {
			var r = zs(), i = I(r, !0);
			O(r), R((e) => J(i, e), [() => U(n)("conflict.view")]), W("click", r, () => t.onView?.(t.store.conflictRevision)), q(e, r);
		};
		Y(m, (e) => {
			t.onView && t.store.conflictRevision && e(h);
		}), O(l), O(i), Ta(i, (e) => F(r, e), () => U(r)), R((e, n, r, l) => {
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
	}), q(e, i), A();
}
G(["click"]);
// src/ui/publish/ServerView.svelte
var Us = /* @__PURE__ */ K("<p class=\"note svelte-ztrun4\"> </p>"), Ws = /* @__PURE__ */ K("<p class=\"note svelte-ztrun4\" role=\"status\"> </p>"), Gs = /* @__PURE__ */ K("<iframe sandbox=\"\" class=\"svelte-ztrun4\"></iframe>"), Ks = /* @__PURE__ */ K("<div class=\"server svelte-ztrun4\"><div class=\"bar svelte-ztrun4\"><strong> </strong> <button type=\"button\" class=\"svelte-ztrun4\"> </button></div> <!> <!></div>"), qs = {
	hash: "svelte-ztrun4",
	code: ".server.svelte-ztrun4 {background:var(--cpb-canvas);padding:.5rem 1rem 1rem;min-height:0;display:flex;flex-direction:column;gap:.5rem;}.bar.svelte-ztrun4 {display:flex;align-items:center;gap:.75rem;}.note.svelte-ztrun4 {margin:0;font-size:.8rem;color:var(--cpb-muted);}button.svelte-ztrun4 {margin-left:auto;font:inherit;font-size:.8rem;padding:.3rem .7rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}iframe.svelte-ztrun4 {flex:1;width:100%;min-height:480px;border:1px solid var(--cpb-border);border-radius:8px;background:#fff;}"
};
function Js(e, t) {
	k(t, !0), Z(e, qs);
	let n = Ea(t, "stylesheets", 19, () => []), r = /* @__PURE__ */ N(() => t.store.t), i = /* @__PURE__ */ P(null);
	Pr(() => {
		let e = t.store.session.transport.render, n = t.revision;
		F(i, null), e && e.call(t.store.session.transport, t.store.session.pageId, n).then((e) => {
			n === t.revision && F(i, e, !0);
		}).catch((e) => t.store.fail(e));
	});
	let a = /* @__PURE__ */ N(() => U(i) === null ? "" : Pa(n()).replace("</head>", `<style data-cms-page>${U(i).css.replace(/<\/style/gi, "<\\/style")}</style></head>`).replace("<body></body>", `<body>${U(i).html}</body>`));
	var o = Ks(), s = I(o), c = I(s), l = I(c, !0);
	O(c);
	var u = L(c, 2), d = I(u, !0);
	O(u), O(s);
	var f = L(s, 2), p = (e) => {
		var t = Us(), n = I(t, !0);
		O(t), R((e) => J(n, e), [() => U(r)("server.dirty")]), q(e, t);
	};
	Y(f, (e) => {
		t.store.dirty && e(p);
	});
	var m = L(f, 2), h = (e) => {
		var t = Ws(), n = I(t, !0);
		O(t), R((e) => J(n, e), [() => U(r)("server.loading")]), q(e, t);
	}, g = (e) => {
		var t = Gs();
		R((e) => {
			$(t, "title", e), $(t, "srcdoc", U(a));
		}, [() => U(r)("server.frame")]), q(e, t);
	};
	Y(m, (e) => {
		U(i) === null ? e(h) : e(g, -1);
	}), O(o), R((e, t) => {
		J(l, e), J(d, t);
	}, [() => U(r)("server.title", { revision: t.revision }), () => U(r)("server.back")]), W("click", u, function(...e) {
		t.onBack?.apply(this, e);
	}), q(e, o), A();
}
G(["click"]);
// src/ui/model/flatten.ts
var Ys = (e) => {
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
}, Xs = (e) => {
	if (!(e.ctrlKey || e.metaKey) || e.altKey) return null;
	let t = e.key.toLowerCase();
	return t === "z" ? e.shiftKey ? { type: "redo" } : { type: "undo" } : t === "y" ? { type: "redo" } : null;
}, Zs = (e, t, n) => {
	let r = Ys(e), i = r[0];
	if (!i) return null;
	let a = t === null ? -1 : r.findIndex((e) => e.id === t), o = r[a];
	if (!o) return n.key === "ArrowDown" || n.key === "Home" ? {
		type: "select",
		id: i.id
	} : null;
	let s = e.nodes[o.id], c = se(e, o.parent), l = n.ctrlKey || n.metaKey;
	if (n.altKey && !l) switch (n.key) {
		case "ArrowUp": return o.index > 0 ? Qs(o.id, o.parent, o.index - 1) : null;
		case "ArrowDown": return o.index < c.length - 1 ? Qs(o.id, o.parent, o.index + 2) : null;
		case "ArrowRight": {
			let t = c[o.index - 1];
			return t ? Qs(o.id, t, e.nodes[t]?.children.length ?? 0) : null;
		}
		case "ArrowLeft": {
			if (o.parent === null) return null;
			let t = e.nodes[o.parent], n = se(e, t?.parent ?? null);
			return Qs(o.id, t?.parent ?? null, n.indexOf(o.parent) + 1);
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
	if (l || n.altKey) return Xs(n);
	switch (n.key) {
		case "ArrowDown": return $s(r[a + 1]?.id);
		case "ArrowUp": return $s(r[a - 1]?.id);
		case "Home": return $s(i.id);
		case "End": return $s(r[r.length - 1]?.id);
		case "ArrowRight": return $s(s?.children[0]);
		case "ArrowLeft": return $s(o.parent ?? void 0);
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
}, Qs = (e, t, n) => ({
	type: "command",
	command: {
		kind: "move",
		id: e,
		parent: t,
		index: n
	}
}), $s = (e) => e ? {
	type: "select",
	id: e
} : null, ec = /* @__PURE__ */ K("<p class=\"empty svelte-y2i8n1\"> </p>"), tc = /* @__PURE__ */ K("<li role=\"treeitem\" class=\"svelte-y2i8n1\"> </li>"), nc = /* @__PURE__ */ K("<ul role=\"tree\" aria-labelledby=\"cpb-structure-title\" aria-describedby=\"cpb-structure-help\" class=\"svelte-y2i8n1\"></ul>"), rc = /* @__PURE__ */ K("<section class=\"structure svelte-y2i8n1\" aria-labelledby=\"cpb-structure-title\"><h2 id=\"cpb-structure-title\" class=\"svelte-y2i8n1\"> </h2> <p class=\"help svelte-y2i8n1\" id=\"cpb-structure-help\"> </p> <!></section>"), ic = {
	hash: "svelte-y2i8n1",
	code: ".structure.svelte-y2i8n1 {padding:.5rem .75rem;overflow:auto;border-top:1px solid var(--cpb-border);}h2.svelte-y2i8n1 {font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin:0;color:var(--cpb-muted);}.help.svelte-y2i8n1, .empty.svelte-y2i8n1 {font-size:.75rem;color:var(--cpb-muted);margin:.25rem 0 .5rem;}ul.svelte-y2i8n1 {list-style:none;margin:0;padding:0;outline:none;}li.svelte-y2i8n1 {font-size:.85rem;padding:.25rem .375rem;border-radius:4px;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}li[aria-selected='true'].svelte-y2i8n1 {background:var(--cpb-accent-soft);color:var(--cpb-accent-strong);font-weight:600;}li.svelte-y2i8n1:focus-visible, ul.svelte-y2i8n1:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:-2px;}"
};
function ac(e, t) {
	k(t, !0), Z(e, ic);
	let n = /* @__PURE__ */ N(() => t.store.t), r = /* @__PURE__ */ N(() => Ys(t.store.tree)), i = /* @__PURE__ */ P(void 0), a = (e) => {
		let n = t.store.tree.nodes[e];
		if (!n) return e;
		let r = typeof n.fields.label == "string" && n.fields.label !== "" ? n.fields.label : null, i = t.store.catalogue?.get(n.type);
		return r ? `${r} (${i?.label ?? n.type})` : i?.label ?? n.type;
	};
	async function o(e) {
		await xi(), ((e ? U(i)?.querySelector(`[data-node-id="${CSS.escape(e)}"]`) : null) ?? U(i))?.focus();
	}
	async function s(e) {
		if ((e.key === "F2" || e.key === "Enter") && t.store.selection && !e.altKey) {
			t.onEdit(t.store.selection) && e.preventDefault();
			return;
		}
		let n = Zs(t.store.tree, t.store.selection, e);
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
	var c = { focusItem: o }, l = rc(), u = I(l), d = I(u, !0);
	O(u);
	var f = L(u, 2), p = I(f, !0);
	O(f);
	var m = L(f, 2), h = (e) => {
		var t = ec(), r = I(t, !0);
		O(t), R((e) => J(r, e), [() => U(n)("structure.empty")]), q(e, t);
	}, g = (e) => {
		var n = nc();
		X(n, 21, () => U(r), (e) => e.id, (e, n) => {
			var r = tc();
			let i;
			var o = I(r, !0);
			O(r), R((e) => {
				$(r, "aria-level", U(n).depth), $(r, "aria-setsize", U(n).siblings), $(r, "aria-posinset", U(n).index + 1), $(r, "aria-selected", t.store.selection === U(n).id), $(r, "tabindex", t.store.selection === U(n).id ? 0 : -1), $(r, "data-node-id", U(n).id), i = sa(r, "", i, { "padding-left": `${(U(n).depth - 1) * 14 + 6}px` }), J(o, e);
			}, [() => a(U(n).id)]), W("click", r, () => t.store.select(U(n).id)), Mi("focus", r, () => t.store.selection !== U(n).id && t.store.select(U(n).id)), W("keydown", r, () => {}), q(e, r);
		}), O(n), Ta(n, (e) => F(i, e), () => U(i)), R(() => $(n, "tabindex", t.store.selection ? -1 : 0)), W("keydown", n, s), q(e, n);
	};
	return Y(m, (e) => {
		U(r).length === 0 ? e(h) : e(g, -1);
	}), O(l), R((e, t) => {
		J(d, e), J(p, t);
	}, [() => U(n)("structure.title"), () => U(n)("structure.help")]), q(e, l), A(c);
}
G(["keydown", "click"]);
// src/ui/toolbar/Toolbar.svelte
var oc = /* @__PURE__ */ K("<button type=\"button\" class=\"primary svelte-ouhh5d\"> </button>"), sc = /* @__PURE__ */ K("<button type=\"button\" class=\"svelte-ouhh5d\"> </button>"), cc = /* @__PURE__ */ K("<span class=\"revision svelte-ouhh5d\"> <span data-publication=\"\"> </span></span>"), lc = /* @__PURE__ */ K("<div class=\"toolbar svelte-ouhh5d\" role=\"toolbar\"><button type=\"button\" aria-keyshortcuts=\"Control+Z\" class=\"svelte-ouhh5d\"> </button> <button type=\"button\" aria-keyshortcuts=\"Control+Shift+Z\" class=\"svelte-ouhh5d\"> </button> <button type=\"button\" aria-keyshortcuts=\"Control+S\" class=\"svelte-ouhh5d\"> </button> <!> <!> <span class=\"status svelte-ouhh5d\"> </span> <!></div>"), uc = {
	hash: "svelte-ouhh5d",
	code: ".toolbar.svelte-ouhh5d {display:flex;flex-wrap:wrap;gap:.5rem;align-items:center;padding:.5rem .75rem;border-bottom:1px solid var(--cpb-border);}button.svelte-ouhh5d {font:inherit;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.svelte-ouhh5d:disabled {opacity:.5;cursor:not-allowed;}button.primary.svelte-ouhh5d {background:var(--cpb-accent);border-color:var(--cpb-accent);color:#fff;}button[aria-pressed='true'].svelte-ouhh5d {background:var(--cpb-accent-soft);border-color:var(--cpb-accent);}button.svelte-ouhh5d:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:2px;}.status.svelte-ouhh5d {margin-left:auto;font-size:.875rem;}.status[data-status='conflict'].svelte-ouhh5d, .status[data-status='offline'].svelte-ouhh5d, .status[data-status='load-error'].svelte-ouhh5d {color:var(--cpb-danger);font-weight:600;}.revision.svelte-ouhh5d {font-size:.75rem;color:var(--cpb-muted);}"
};
function dc(e, t) {
	k(t, !0), Z(e, uc);
	let n = /* @__PURE__ */ N(() => t.store.t), r = /* @__PURE__ */ N(() => t.store.publishedRevision === null ? U(n)("publication.none") : t.store.unpublished ? U(n)("publication.pending", { revision: t.store.publishedRevision }) : U(n)("publication.current"));
	var i = lc(), a = I(i), o = I(a, !0);
	O(a);
	var s = L(a, 2), c = I(s, !0);
	O(s);
	var l = L(s, 2), u = I(l, !0);
	O(l);
	var d = L(l, 2), f = (e) => {
		var r = oc(), i = I(r, !0);
		O(r), R((e) => {
			r.disabled = t.store.publishing || t.store.status !== "ready" || !t.store.unpublished, J(i, e);
		}, [() => t.store.publishing ? U(n)("toolbar.publishing") : U(n)("toolbar.publish")]), W("click", r, () => t.store.publish()), q(e, r);
	};
	Y(d, (e) => {
		t.store.canPublish && e(f);
	});
	var p = L(d, 2), m = (e) => {
		var r = sc(), i = I(r, !0);
		O(r), R((e) => {
			$(r, "aria-pressed", t.serverView), J(i, e);
		}, [() => U(n)("toolbar.serverView")]), W("click", r, function(...e) {
			t.onServerView?.apply(this, e);
		}), q(e, r);
	};
	Y(p, (e) => {
		t.onServerView && e(m);
	});
	var h = L(p, 2), g = I(h, !0);
	O(h);
	var _ = L(h, 2), v = (e) => {
		var i = cc(), a = I(i), o = L(a), s = I(o, !0);
		O(o), O(i), R((e) => {
			J(a, `${e ?? ""} · `), J(s, U(r));
		}, [() => U(n)("toolbar.revision", { revision: t.store.revision })]), q(e, i);
	};
	Y(_, (e) => {
		t.store.revision > 0 && e(v);
	}), O(i), R((e, n, r, d, f) => {
		$(i, "aria-label", e), a.disabled = !t.store.canUndo, J(o, n), s.disabled = !t.store.canRedo, J(c, r), l.disabled = !t.store.dirty || t.store.status === "saving" || t.store.status === "conflict", J(u, d), $(h, "data-status", t.store.status), J(g, f);
	}, [
		() => U(n)("editor.label"),
		() => U(n)("toolbar.undo"),
		() => U(n)("toolbar.redo"),
		() => U(n)("toolbar.save"),
		() => U(n)(`status.${t.store.status}`)
	]), W("click", a, () => t.store.undo()), W("click", s, () => t.store.redo()), W("click", l, () => t.store.save()), q(e, i), A();
}
G(["click"]);
// src/ui/Editor.svelte
var fc = /* @__PURE__ */ K("<div class=\"editor svelte-b7je3p\" role=\"application\"><!> <!> <div class=\"body svelte-b7je3p\"><aside class=\"left svelte-b7je3p\"><!> <!></aside> <!> <!></div> <!> <!> <div class=\"sr-only svelte-b7je3p\" aria-live=\"polite\"> </div> <div class=\"sr-only svelte-b7je3p\" aria-live=\"assertive\" role=\"alert\"> </div></div>"), pc = {
	hash: "svelte-b7je3p",
	code: ".editor.svelte-b7je3p {--cpb-border: #d4d4d8;--cpb-surface: #fff;--cpb-canvas: #f1f5f9;--cpb-muted: #52525b;--cpb-accent: #2563eb;--cpb-accent-soft: #dbeafe;--cpb-accent-strong: #1e3a8a;--cpb-danger: #b91c1c;font:14px/1.4 system-ui, sans-serif;color:#18181b;background:var(--cpb-surface);display:flex;flex-direction:column;height:100%;min-height:600px;border:1px solid var(--cpb-border);}.body.svelte-b7je3p {flex:1;display:grid;grid-template-columns:240px 1fr 280px;min-height:0;}.left.svelte-b7je3p {display:grid;grid-template-rows:minmax(0, 45%) minmax(0, 1fr);min-height:0;border-right:1px solid var(--cpb-border);}.sr-only.svelte-b7je3p {position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;}\n  @media (max-width: 900px) {.body.svelte-b7je3p {grid-template-columns:1fr;} }"
};
function mc(e, t) {
	k(t, !0), Z(e, pc);
	let n = Ea(t, "stylesheets", 19, () => []), r = /* @__PURE__ */ P(void 0), i = /* @__PURE__ */ P(void 0), a = /* @__PURE__ */ N(() => new So(t.store)), o = /* @__PURE__ */ N(() => new ro(t.store)), s = /* @__PURE__ */ P(!1), c = /* @__PURE__ */ P(!1), l = !1;
	Pr(() => {
		t.store.status === "ready" && !l && (l = !0, U(o).loadTemplates());
	});
	let u = /* @__PURE__ */ P(null), d = /* @__PURE__ */ N(() => typeof t.store.session.transport.render == "function");
	function f(e) {
		if ((e.ctrlKey || e.metaKey) && !e.altKey && e.key.toLowerCase() === "s") {
			e.preventDefault(), t.store.dirty && t.store.save();
			return;
		}
		if (e.target?.closest("input, textarea, select, [contenteditable=\"true\"], [role=\"tree\"]")) return;
		let n = Xs(e);
		n && (e.preventDefault(), n.type === "undo" ? t.store.undo() : n.type === "redo" && t.store.redo());
	}
	var p = fc(), m = I(p);
	{
		let e = /* @__PURE__ */ N(() => U(u) !== null), n = /* @__PURE__ */ N(() => U(d) ? () => {
			F(u, U(u) === null ? t.store.revision : null, !0);
		} : null);
		dc(m, {
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
	var h = L(m, 2);
	{
		let e = /* @__PURE__ */ N(() => U(d) ? (e) => {
			F(u, e, !0);
		} : null);
		Hs(h, {
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
	var g = L(h, 2), _ = I(g), v = I(_);
	Rs(v, {
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
			F(s, !0);
		}
	}), Ta(ac(L(v, 2), {
		get store() {
			return t.store;
		},
		onEdit: (e) => U(i)?.startEditing(e) ?? !1
	}), (e) => F(r, e, !0), () => U(r)), O(_);
	var y = L(_, 2), b = (e) => {
		Js(e, {
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
				F(u, null);
			}
		});
	}, x = (e) => {
		Ta(Qa(e, {
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
		}), (e) => F(i, e, !0), () => U(i));
	};
	Y(y, (e) => {
		U(u) === null ? e(x, -1) : e(b);
	}), As(L(y, 2), {
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
			F(c, !0);
		}
	}), O(g);
	var S = L(g, 2);
	lo(S, {
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
			F(s, e, !0);
		}
	});
	var C = L(S, 2);
	po(C, {
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
			F(c, e, !0);
		}
	});
	var w = L(C, 2), ee = I(w, !0);
	O(w);
	var te = L(w, 2), ne = I(te, !0);
	O(te), O(p), R((e) => {
		$(p, "aria-label", e), J(ee, t.store.message), J(ne, t.store.alert);
	}, [() => t.store.t("editor.label")]), W("keydown", p, f), q(e, p), A();
}
G(["keydown"]);
// src/ui/i18n/en.ts
var hc = {
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
}, gc = {
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
}, _c = {
	es: gc,
	en: hc
}, vc = (e) => {
	let t = _c[e.toLowerCase().split("-")[0] ?? "es"] ?? gc;
	return (e, n = {}) => t[e].replace(/\{(\w+)\}/g, (e, t) => String(n[t] ?? `{${t}}`));
}, yc = class {
	session;
	t;
	#e = /* @__PURE__ */ P({
		nodes: {},
		rootIds: []
	});
	get tree() {
		return U(this.#e);
	}
	set tree(e) {
		F(this.#e, e);
	}
	#t = /* @__PURE__ */ P(null);
	get catalogue() {
		return U(this.#t);
	}
	set catalogue(e) {
		F(this.#t, e);
	}
	#n = /* @__PURE__ */ P(null);
	get selection() {
		return U(this.#n);
	}
	set selection(e) {
		F(this.#n, e, !0);
	}
	#r = /* @__PURE__ */ P("loading");
	get status() {
		return U(this.#r);
	}
	set status(e) {
		F(this.#r, e, !0);
	}
	#i = /* @__PURE__ */ P(!1);
	get dirty() {
		return U(this.#i);
	}
	set dirty(e) {
		F(this.#i, e, !0);
	}
	#a = /* @__PURE__ */ P(!1);
	get canUndo() {
		return U(this.#a);
	}
	set canUndo(e) {
		F(this.#a, e, !0);
	}
	#o = /* @__PURE__ */ P(!1);
	get canRedo() {
		return U(this.#o);
	}
	set canRedo(e) {
		F(this.#o, e, !0);
	}
	#s = /* @__PURE__ */ P(0);
	get revision() {
		return U(this.#s);
	}
	set revision(e) {
		F(this.#s, e, !0);
	}
	#c = /* @__PURE__ */ P(null);
	get publishedRevision() {
		return U(this.#c);
	}
	set publishedRevision(e) {
		F(this.#c, e, !0);
	}
	#l = /* @__PURE__ */ P(!1);
	get canPublish() {
		return U(this.#l);
	}
	set canPublish(e) {
		F(this.#l, e, !0);
	}
	#u = /* @__PURE__ */ P(!1);
	get publishing() {
		return U(this.#u);
	}
	set publishing(e) {
		F(this.#u, e, !0);
	}
	#d = /* @__PURE__ */ P(null);
	get conflictRevision() {
		return U(this.#d);
	}
	set conflictRevision(e) {
		F(this.#d, e, !0);
	}
	designSession;
	#f = /* @__PURE__ */ P(je());
	get design() {
		return U(this.#f);
	}
	set design(e) {
		F(this.#f, e);
	}
	#p = /* @__PURE__ */ P(!1);
	get designDirty() {
		return U(this.#p);
	}
	set designDirty(e) {
		F(this.#p, e, !0);
	}
	#m = /* @__PURE__ */ P(null);
	get viewport() {
		return U(this.#m);
	}
	set viewport(e) {
		F(this.#m, e, !0);
	}
	#h = /* @__PURE__ */ P(null);
	get styleState() {
		return U(this.#h);
	}
	set styleState(e) {
		F(this.#h, e, !0);
	}
	#g = /* @__PURE__ */ P("");
	get message() {
		return U(this.#g);
	}
	set message(e) {
		F(this.#g, e, !0);
	}
	#_ = /* @__PURE__ */ P("");
	get alert() {
		return U(this.#_);
	}
	set alert(e) {
		F(this.#_, e, !0);
	}
	stops = [];
	constructor(e, t) {
		this.session = e, this.t = t, this.designSession = new we(e.transport), this.stops.push(this.designSession.events.on("change", () => {
			this.design = this.designSession.design, this.designDirty = this.designSession.dirty;
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
	fail(e, t = e instanceof Ce ? e.code : "SERVER") {
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
}, bc = [
	"ready",
	"selection-change",
	"dirty-change",
	"save-start",
	"save-success",
	"save-error",
	"conflict",
	"publish-success",
	"publish-error"
], xc = 0, Sc = class extends HTMLElement {
	#e = null;
	#t = null;
	#n = null;
	#r = null;
	#i = null;
	#a = `cpb${++xc}`;
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
		let t = this.shadowRoot ?? this.attachShadow({ mode: "open" }), n = new Be(e);
		for (let e of bc) n.events.on(e, (t) => {
			let n = e === "save-error" || e === "publish-error" ? { code: t.error.code } : t;
			this.dispatchEvent(new CustomEvent(e, {
				detail: n,
				bubbles: !0,
				composed: !0
			}));
		});
		let r = new yc(n, vc(e.locale ?? "es"));
		this.#n = n, this.#r = r, this.#t = Bi(mc, {
			target: t,
			props: {
				store: r,
				uid: this.#a,
				stylesheets: e.stylesheets ?? []
			}
		}), n.load().then(() => {
			r.sync(), r.loadDesign(), e.autosave !== !1 && n.capabilities?.features.autosave !== !1 && (this.#i = new He(n, {
				...ae,
				...e.autosave ?? {}
			}), this.#i.start());
		}, (e) => {
			r.sync(), r.fail(e);
		});
	}
	#s() {
		this.#i?.stop(), this.#i = null, this.#t && Wi(this.#t), this.#r?.destroy(), this.#n?.destroy(), this.#t = null, this.#r = null, this.#n = null, this.shadowRoot?.replaceChildren();
	}
}, Cc = (e = "ceiba-page-builder") => {
	customElements.get(e) || customElements.define(e, Sc);
};
// src/ui/index.ts
Cc();
export { He as Autosave, ge as BASE, Sc as CeibaPageBuilder, ae as DEFAULT_AUTOSAVE, ze as DEFAULT_BREAKPOINTS, n as DEFAULT_HISTORY, ye as EDITABLE_FIELDS, Ce as EditorError, Be as EditorSession, pe as PROPERTY_BY_NAME, bc as PUBLIC_EVENTS, t as REFERENCE_PROPS, te as SCHEMA_VERSION, ve as SERVER_LIMITS, ne as STYLE_MATRIX, we as SiteDesignSession, Se as acceptedTokenType, S as afterRedo, c as afterUndo, h as applyCommand, p as assertDepth, o as assertEditable, l as assertKnown, f as assertNewContent, m as assertNodeCount, v as assertPlacement, g as assertSize, _ as attachRaw, x as canRedo, C as canUndo, r as checkTree, se as childrenOf, oe as collectStyledNodes, Le as compileStyles, Ue as createCatalogue, i as createCommands, Fe as createEditor, Ve as createHttpTransport, je as defaultDesign, Cc as defineElement, Ie as depthOf, re as effectiveValue, s as emptyHistory, xe as emptyTree, y as errorFromResponse, he as fail, u as fromDocument, Te as getNode, Ae as groupKeyOf, Me as heightOf, _e as indexInParent, Re as insertAt, ie as isSelfOrDescendant, me as literal, e as measureRaw, ce as nodeClass, De as nodeCount, ee as parseDocument, b as randomIds, d as record, a as sequentialIds, Ee as setClasses, Ne as setDeclaration, de as siteClass, be as styleClassNames, Pe as subtreeIds, w as toDocument, ue as toRaw, Oe as tokenVariable, le as withChildren, fe as withNode, ke as withoutNodes };

//# sourceMappingURL=ceiba-page-builder.js.map