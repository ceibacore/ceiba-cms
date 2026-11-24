import { $ as e, A as t, B as n, C as r, D as i, E as a, F as o, G as s, H as c, I as l, J as u, K as d, L as f, M as p, N as m, O as h, P as g, Q as _, R as v, S as y, T as b, U as x, V as S, W as C, X as w, Y as T, Z as ee, _ as E, _t as te, a as ne, at as re, b as ie, bt as ae, c as oe, ct as se, d as ce, dt as le, et as ue, f as de, ft as fe, g as pe, gt as me, h as he, ht as ge, i as _e, it as ve, j as ye, k as be, l as xe, lt as Se, m as Ce, mt as we, n as Te, nt as Ee, o as De, ot as Oe, p as ke, pt as Ae, q as je, r as Me, rt as Ne, s as Pe, st as Fe, t as Ie, tt as Le, u as Re, ut as ze, v as Be, vt as Ve, w as He, x as Ue, y as We, yt as Ge, z as Ke } from "./shared/core.js";
// node_modules/svelte/src/internal/shared/utils.js
var qe = Array.isArray, Je = Array.prototype.indexOf, Ye = Array.prototype.includes, Xe = Array.from, Ze = Object.defineProperty, Qe = Object.getOwnPropertyDescriptor, $e = Object.getOwnPropertyDescriptors, et = Object.prototype, tt = Array.prototype, nt = Object.getPrototypeOf, rt = Object.isExtensible, it = () => {};
function at(e) {
	for (var t = 0; t < e.length; t++) e[t]();
}
function ot() {
	var e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
function st(e, t) {
	if (Array.isArray(e)) return e;
	if (t === void 0 || !(Symbol.iterator in e)) return Array.from(e);
	let n = [];
	for (let r of e) if (n.push(r), n.length === t) break;
	return n;
}
var ct = 1024, lt = 2048, ut = 4096, dt = 8192, ft = 16384, pt = 32768, mt = 1 << 25, ht = 65536, gt = 1 << 19, _t = 1 << 20, vt = 1 << 25, yt = 65536, bt = 1 << 21, xt = 1 << 22, St = 1 << 23, Ct = Symbol("$state"), wt = Symbol("legacy props"), Tt = Symbol(""), Et = Symbol("attributes"), Dt = Symbol("class"), Ot = Symbol("style"), kt = Symbol("text"), At = Symbol("form reset"), jt = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), Mt = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
// node_modules/svelte/src/internal/client/errors.js
function Nt() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function Pt(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function Ft(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function It() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Lt(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function Rt() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function zt(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function Bt() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Vt() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function Ht() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Ut() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
// node_modules/svelte/src/constants.js
var Wt = {}, Gt = Symbol("uninitialized"), Kt = "http://www.w3.org/1999/xhtml";
function qt() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function Jt(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function Yt() {
	console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function Xt() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
// node_modules/svelte/src/internal/client/dom/hydration.js
var D = !1;
function Zt(e) {
	D = e;
}
var O;
function Qt(e) {
	if (e === null) throw Jt(), Wt;
	return O = e;
}
function $t() {
	return Qt(/* @__PURE__ */ Cr(O));
}
function k(e) {
	if (D) {
		if (/* @__PURE__ */ Cr(O) !== null) throw Jt(), Wt;
		O = e;
	}
}
function en(e = 1) {
	if (D) {
		for (var t = e, n = O; t--;) n = /* @__PURE__ */ Cr(n);
		O = n;
	}
}
function tn(e = !0) {
	for (var t = 0, n = O;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ Cr(n);
		e && n.remove(), n = i;
	}
}
function nn(e) {
	if (!e || e.nodeType !== 8) throw Jt(), Wt;
	return e.data;
}
// node_modules/svelte/src/internal/client/reactivity/equality.js
function rn(e) {
	return e === this.v;
}
function an(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function on(e) {
	return !an(e, this.v);
}
// node_modules/svelte/src/internal/client/context.js
var sn = null;
function cn(e) {
	sn = e;
}
function A(e, t = !1, n) {
	sn = {
		p: sn,
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
	var t = sn, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) zr(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, sn = t.p, e ?? {};
}
function ln() {
	return !0;
}
// node_modules/svelte/src/internal/client/dom/task.js
var un = [];
function dn() {
	var e = un;
	un = [], at(e);
}
function fn(e) {
	if (un.length === 0 && !Dn) {
		var t = un;
		queueMicrotask(() => {
			t === un && dn();
		});
	}
	un.push(e);
}
function pn() {
	for (; un.length > 0;) dn();
}
function mn(e) {
	var t = V;
	if (t === null) return B.f |= St, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	hn(e, t);
}
function hn(e, t) {
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
var gn = ~(lt | ut | ct);
function _n(e, t) {
	e.f = e.f & gn | t;
}
function vn(e) {
	e.f & 512 || e.deps === null ? _n(e, ct) : _n(e, ut);
}
// node_modules/svelte/src/internal/client/reactivity/utils.js
function yn(e) {
	if (e !== null) for (let t of e) t.f & 2 && t.f & 65536 && (t.f ^= yt, yn(t.deps));
}
function bn(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), yn(e.deps), _n(e, ct);
}
// node_modules/svelte/src/internal/client/reactivity/store.js
var xn = !1;
function Sn(e) {
	var t = xn;
	try {
		return xn = !1, [e(), xn];
	} finally {
		xn = t;
	}
}
// node_modules/svelte/src/internal/client/reactivity/batch.js
var Cn = null, M = null, wn = null, Tn = null, En = null, Dn = !1, On = !1, kn = null, An = null, jn = 0, Mn = 1, Nn = class e {
	id = Mn++;
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
			for (var r of n.d) _n(r, lt), t(r);
			for (r of n.m) _n(r, ut), t(r);
		}
		this.#m.add(e);
	}
	#_() {
		if (this.#e = !0, jn++ > 1e3 && (this.#C(), Fn()), !this.#g()) {
			for (let e of this.#d) this.#f.delete(e), _n(e, lt), this.schedule(e);
			for (let e of this.#f) _n(e, ut), this.schedule(e);
		}
		let t = this.#l;
		this.#l = [], this.apply();
		var n = kn = [], r = [], i = An = [];
		for (let e of t) try {
			this.#v(e, n, r);
		} catch (t) {
			throw Bn(e), t;
		}
		if (M = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (kn = null, An = null, this.#g()) {
			this.#x(r), this.#x(n);
			for (let [e, t] of this.#p) zn(e, t);
			i.length > 0 && M.#_();
			return;
		}
		let o = this.#y();
		if (o) o.#b(this);
		else {
			this.#d.clear(), this.#f.clear();
			for (let e of this.#r) e(this);
			this.#r.clear(), wn = this, Ln(r), Ln(n), wn = null, this.#c?.resolve();
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
		e.f ^= ct;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#p.has(r)) && r.fn !== null) {
				a ? r.f ^= ct : i & 4 ? t.push(r) : xi(r) && (i & 16 && this.#f.add(r), Ei(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#f.delete(i), _n(i, lt), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#C(), M = this, this.#_();
	}
	#x(e) {
		for (var t = 0; t < e.length; t += 1) bn(e[t], this.#d, this.#f);
	}
	capture(e, t, n = !1) {
		e.v !== Gt && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), Tn?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		M = this;
	}
	deactivate() {
		M = null, Tn = null;
	}
	flush() {
		try {
			On = !0, M = this, this.#_();
		} finally {
			jn = 0, En = null, kn = null, An = null, On = !1, M = null, Tn = null, ar.clear();
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
		this.#h || (this.#h = !0, fn(() => {
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
		return (this.#c ??= ot()).promise;
	}
	static ensure() {
		if (M === null) {
			let t = M = new e();
			t.#S(), !On && !Dn && fn(() => {
				t.#e || t.flush();
			});
		}
		return M;
	}
	apply() {
		Tn = null;
	}
	schedule(e) {
		if (En = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) e.b.defer_effect(e);
		else {
			for (var t = e; t.parent !== null;) {
				t = t.parent;
				var n = t.f;
				if (kn !== null && t === V && (B === null || !(B.f & 2))) return;
				if (n & 96) {
					if (!(n & 1024)) return;
					t.f ^= ct;
				}
			}
			this.#l.push(t);
		}
	}
	#S() {
		Cn === null ? Cn = this : (Cn.#n = this, this.#t = Cn), Cn = this;
	}
	#C() {
		var e = this.#t, t = this.#n;
		e === null || (e.#n = t), t === null ? Cn = e : t.#t = e, this.linked = !1;
	}
};
function Pn(e) {
	var t = Dn;
	Dn = !0;
	try {
		var n;
		for (e && (M !== null && !M.is_fork && M.flush(), n = e());;) {
			if (pn(), M === null) return n;
			M.flush();
		}
	} finally {
		Dn = t;
	}
}
function Fn() {
	try {
		Rt();
	} catch (e) {
		hn(e, En);
	}
}
var In = null;
function Ln(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && xi(r) && (In = /* @__PURE__ */ new Set(), Ei(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Zr(r), In?.size > 0)) {
				ar.clear();
				for (let e of In) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) In.has(n) && (In.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || Ei(n);
					}
				}
				In.clear();
			}
		}
		In = null;
	}
}
function Rn(e) {
	M.schedule(e);
}
function zn(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), _n(e, ct);
		for (var n = e.first; n !== null;) zn(n, t), n = n.next;
	}
}
function Bn(e) {
	_n(e, ct);
	for (var t = e.first; t !== null;) Bn(t), t = t.next;
}
// node_modules/svelte/src/reactivity/create-subscriber.js
function Vn(e) {
	let t = 0, n = sr(0), r;
	return () => {
		Ir() && (H(n), Ur(() => (t === 0 && (r = Ai(() => e(() => dr(n)))), t += 1, () => {
			fn(() => {
				--t, t === 0 && (r?.(), r = void 0, dr(n));
			});
		})));
	};
}
// node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var Hn = ht | gt;
function Un(e, t, n, r) {
	new Wn(e, t, n, r);
}
var Wn = class {
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
	#h = Vn(() => (this.#m = sr(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = V;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = V.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = Wr(() => {
			if (D) {
				let e = this.#t;
				$t();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, Hn), D && (this.#e = O);
	}
	#g() {
		try {
			this.#a = Gr(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed;
		t && (this.#s = Gr(() => {
			t(this.#e, () => e, () => () => {});
		}));
	}
	#v() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = Gr(() => e(this.#e)), fn(() => {
			var e = this.#c = document.createDocumentFragment(), t = xr();
			e.append(t), this.#a = this.#x(() => Gr(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, Qr(this.#o, () => {
				this.#o = null;
			}), this.#b(M));
		}));
	}
	#y() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = Gr(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				ni(this.#a, e);
				let t = this.#n.pending;
				this.#o = Gr(() => t(this.#e));
			} else this.#b(M);
		} catch (e) {
			this.error(e);
		}
	}
	#b(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		bn(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#x(e) {
		var t = V, n = B, r = sn;
		li(this.#i), ci(this.#i), cn(this.#i.ctx);
		try {
			return Nn.ensure(), e();
		} catch (e) {
			return mn(e), null;
		} finally {
			li(t), ci(n), cn(r);
		}
	}
	#S(e, t) {
		this.has_pending_snippet() ? (this.#u += e, this.#u === 0 && (this.#b(t), this.#o && Qr(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null))) : this.parent && this.parent.#S(e, t);
	}
	update_pending_count(e, t) {
		this.#S(e, t), this.#l += e, !this.#m || this.#d || (this.#d = !0, fn(() => {
			this.#d = !1, this.#m && lr(this.#m, this.#l);
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
		this.#a &&= (Yr(this.#a), null), this.#o &&= (Yr(this.#o), null), this.#s &&= (Yr(this.#s), null), D && (Qt(this.#t), en(), Qt(tn()));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var r = !1, i = !1;
		let a = () => {
			r ? Xt() : (r = !0, i && Ut(), this.#s !== null && Qr(this.#s, () => {
				this.#s = null;
			}), this.#x(() => {
				this.#y();
			}));
		}, o = (e) => {
			try {
				i = !0, t?.(e, a), i = !1;
			} catch (e) {
				hn(e, this.#i && this.#i.parent);
			}
			n && (this.#s = this.#x(() => {
				try {
					return Gr(() => {
						var t = V;
						t.b = this, t.f |= 128, n(this.#e, () => e, () => a);
					});
				} catch (e) {
					return hn(e, this.#i.parent), null;
				}
			}));
		};
		fn(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				hn(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(o, (e) => hn(e, this.#i && this.#i.parent)) : o(t);
		});
	}
};
// node_modules/svelte/src/internal/client/reactivity/async.js
function Gn(e, t, n, r) {
	let i = ln() ? Yn : Qn;
	var a = e.filter((e) => !e.settled);
	if (n.length === 0 && a.length === 0) {
		r(t.map(i));
		return;
	}
	var o = V, s = Kn(), c = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function l(e) {
		if (!(o.f & 16384)) {
			s();
			try {
				r(e);
			} catch (e) {
				hn(e, o);
			}
			qn();
		}
	}
	var u = Jn();
	if (n.length === 0) {
		c.then(() => l(t.map(i))).finally(u);
		return;
	}
	function d() {
		Promise.all(n.map((e) => /* @__PURE__ */ Zn(e))).then((e) => l([...t.map(i), ...e])).catch((e) => hn(e, o)).finally(u);
	}
	c ? c.then(() => {
		s(), d(), qn();
	}) : d();
}
function Kn() {
	var e = V, t = B, n = sn, r = M;
	return function(i = !0) {
		li(e), ci(t), cn(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function qn(e = !0) {
	li(null), ci(null), cn(null), e && M?.deactivate();
}
function Jn() {
	var e = V, t = e.b, n = M, r = t.is_rendered();
	return t.update_pending_count(1, n), n.increment(r, e), () => {
		t.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function Yn(e) {
	var t = 2 | lt;
	return V !== null && (V.f |= gt), {
		ctx: sn,
		deps: null,
		effects: null,
		equals: rn,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: Gt,
		wv: 0,
		parent: V,
		ac: null
	};
}
var Xn = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function Zn(e, t, n) {
	let r = V;
	r === null && Nt();
	var i = void 0, a = sr(Gt), o = !B, s = /* @__PURE__ */ new Set();
	return Hr(() => {
		var t = V, n = ot();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== jt && n.reject(e);
			}).finally(qn);
		} catch (e) {
			n.reject(e), qn();
		}
		var c = M;
		if (o) {
			if (t.f & 32768) var l = Jn();
			if (r.b.is_rendered()) c.async_deriveds.get(t)?.reject(Xn);
			else for (let e of s.values()) e.reject(Xn);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== Xn && (c.activate(), t ? (a.f |= St, lr(a, t)) : (a.f & 8388608 && (a.f ^= St), lr(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), Lr(() => {
		for (let e of s) e.reject(Xn);
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
	let t = /* @__PURE__ */ Yn(e);
	return di(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function Qn(e) {
	let t = /* @__PURE__ */ Yn(e);
	return t.equals = on, t;
}
function $n(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) Yr(t[n]);
	}
}
function er(e) {
	var t, n = V, r = e.parent;
	if (!ai && r !== null && e.v !== Gt && r.f & 24576) return qt(), e.v;
	li(r);
	try {
		e.f &= ~yt, $n(e), t = Ci(e);
	} finally {
		li(n);
	}
	return t;
}
function tr(e) {
	var t = er(e);
	!e.equals(t) && (e.wv = bi(), (!M?.is_fork || e.deps === null) && (M === null ? e.v = t : (M.capture(e, t, !0), wn?.capture(e, t, !0)), e.deps === null)) ? _n(e, ct) : ai || (Tn === null ? vn(e) : (Ir() || M?.is_fork) && Tn.set(e, t));
}
function nr(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac?.abort(jt), t.fn !== null && (t.teardown = it), t.ac = null, Ti(t, 0), qr(t));
}
function rr(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && Ei(t);
}
// node_modules/svelte/src/internal/client/reactivity/sources.js
var ir = /* @__PURE__ */ new Set(), ar = /* @__PURE__ */ new Map(), or = !1;
function sr(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: rn,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function P(e, t) {
	let n = sr(e, t);
	return di(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function cr(e, t = !1, n = !0) {
	let r = sr(e);
	return t || (r.equals = on), r;
}
function F(e, t, n = !1) {
	return B !== null && (!si || B.f & 131072) && ln() && B.f & 4325394 && (ui === null || !Ye.call(ui, e)) && Ht(), lr(e, n ? pr(t) : t, An);
}
function lr(e, t, n = null) {
	if (!e.equals(t)) {
		ar.set(e, ai ? t : e.v);
		var r = Nn.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && er(t), Tn === null && vn(t);
		}
		e.wv = bi(), fr(e, lt, n), ln() && V !== null && V.f & 1024 && !(V.f & 96) && (mi === null ? hi([e]) : mi.push(e)), !r.is_fork && ir.size > 0 && !or && ur();
	}
	return t;
}
function ur() {
	or = !1;
	for (let e of ir) {
		e.f & 1024 && _n(e, ut);
		let t;
		try {
			t = xi(e);
		} catch {
			t = !0;
		}
		t && Ei(e);
	}
	ir.clear();
}
function dr(e) {
	F(e, e.v + 1);
}
function fr(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = ln(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (i || s !== V) {
			var l = (c & lt) === 0;
			if (l && _n(s, t), c & 131072) ir.add(s);
			else if (c & 2) {
				var u = s;
				Tn?.delete(u), c & 65536 || (c & 512 && (V === null || !(V.f & 2097152)) && (s.f |= yt), fr(u, ut, n));
			} else if (l) {
				var d = s;
				c & 16 && In !== null && In.add(d), n === null ? Rn(d) : n.push(d);
			}
		}
	}
}
function pr(e) {
	if (typeof e != "object" || !e || Ct in e) return e;
	let t = nt(e);
	if (t !== et && t !== tt) return e;
	var n = /* @__PURE__ */ new Map(), r = qe(e), i = /* @__PURE__ */ P(0), a = null, o = vi, s = (e) => {
		if (vi === o) return e();
		var t = B, n = vi;
		ci(null), yi(o);
		var r = e();
		return ci(t), yi(n), r;
	};
	return r && n.set("length", /* @__PURE__ */ P(e.length, a)), new Proxy(e, {
		defineProperty(e, t, r) {
			"value" in r && r.configurable !== !1 && r.enumerable !== !1 && r.writable !== !1 || Bt();
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
					let e = s(() => /* @__PURE__ */ P(Gt, a));
					n.set(t, e), dr(i);
				}
			} else F(r, Gt), dr(i);
			return !0;
		},
		get(t, r, i) {
			if (r === Ct) return e;
			var o = n.get(r), c = r in t;
			if (o === void 0 && (!c || Qe(t, r)?.writable) && (o = s(() => /* @__PURE__ */ P(pr(c ? t[r] : Gt), a)), n.set(r, o)), o !== void 0) {
				var l = H(o);
				return l === Gt ? void 0 : l;
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
				if (a !== void 0 && o !== Gt) return {
					enumerable: !0,
					configurable: !0,
					value: o,
					writable: !0
				};
			}
			return r;
		},
		has(e, t) {
			if (t === Ct) return !0;
			var r = n.get(t), i = r !== void 0 && r.v !== Gt || Reflect.has(e, t);
			return (r !== void 0 || V !== null && (!i || Qe(e, t)?.writable)) && (r === void 0 && (r = s(() => /* @__PURE__ */ P(i ? pr(e[t]) : Gt, a)), n.set(t, r)), H(r) === Gt) ? !1 : i;
		},
		set(e, t, o, c) {
			var l = n.get(t), u = t in e;
			if (r && t === "length") for (var d = o; d < l.v; d += 1) {
				var f = n.get(d + "");
				f === void 0 ? d in e && (f = s(() => /* @__PURE__ */ P(Gt, a)), n.set(d + "", f)) : F(f, Gt);
			}
			if (l === void 0) (!u || Qe(e, t)?.writable) && (l = s(() => /* @__PURE__ */ P(void 0, a)), F(l, pr(o)), n.set(t, l));
			else {
				u = l.v !== Gt;
				var p = s(() => pr(o));
				F(l, p);
			}
			var m = Reflect.getOwnPropertyDescriptor(e, t);
			if (m?.set && m.set.call(c, o), !u) {
				if (r && typeof t == "string") {
					var h = n.get("length"), g = Number(t);
					Number.isInteger(g) && g >= h.v && F(h, g + 1);
				}
				dr(i);
			}
			return !0;
		},
		ownKeys(e) {
			H(i);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = n.get(e);
				return t === void 0 || t.v !== Gt;
			});
			for (var [r, a] of n) a.v !== Gt && !(r in e) && t.push(r);
			return t;
		},
		setPrototypeOf() {
			Vt();
		}
	});
}
function mr(e) {
	try {
		if (typeof e == "object" && e && Ct in e) return e[Ct];
	} catch {}
	return e;
}
function hr(e, t) {
	return Object.is(mr(e), mr(t));
}
var gr, _r, vr, yr;
function br() {
	if (gr === void 0) {
		gr = window, _r = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		vr = Qe(t, "firstChild").get, yr = Qe(t, "nextSibling").get, rt(e) && (e[Dt] = void 0, e[Et] = null, e[Ot] = void 0, e.__e = void 0), rt(n) && (n[kt] = void 0);
	}
}
function xr(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function Sr(e) {
	return vr.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function Cr(e) {
	return yr.call(e);
}
function I(e, t) {
	if (!D) return /* @__PURE__ */ Sr(e);
	var n = /* @__PURE__ */ Sr(O);
	if (n === null) n = O.appendChild(xr());
	else if (t && n.nodeType !== 3) {
		var r = xr();
		return n?.before(r), Qt(r), r;
	}
	return t && Dr(n), Qt(n), n;
}
function L(e, t = !1) {
	if (!D) {
		var n = /* @__PURE__ */ Sr(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ Cr(n) : n;
	}
	if (t) {
		if (O?.nodeType !== 3) {
			var r = xr();
			return O?.before(r), Qt(r), r;
		}
		Dr(O);
	}
	return O;
}
function R(e, t = 1, n = !1) {
	let r = D ? O : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ Cr(r);
	if (!D) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = xr();
			return r === null ? i?.after(a) : r.before(a), Qt(a), a;
		}
		Dr(r);
	}
	return Qt(r), r;
}
function wr(e) {
	e.textContent = "";
}
function Tr() {
	return !1;
}
function Er(e, t, n) {
	let r = n ? { is: n } : void 0;
	return document.createElementNS(t ?? "http://www.w3.org/1999/xhtml", e, r);
}
function Dr(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
// node_modules/svelte/src/internal/client/dom/elements/misc.js
function Or(e) {
	D && /* @__PURE__ */ Sr(e) !== null && wr(e);
}
var kr = !1;
function Ar() {
	kr || (kr = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[At]?.();
		});
	}, { capture: !0 }));
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function jr(e) {
	var t = B, n = V;
	ci(null), li(null);
	try {
		return e();
	} finally {
		ci(t), li(n);
	}
}
function Mr(e, t, n, r = n) {
	e.addEventListener(t, () => jr(n));
	let i = e[At];
	e[At] = i ? () => {
		i(), r(!0);
	} : () => r(!0), Ar();
}
// node_modules/svelte/src/internal/client/reactivity/effects.js
function Nr(e) {
	V === null && (B === null && Lt(e), It()), ai && Ft(e);
}
function Pr(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function Fr(e, t) {
	var n = V;
	n !== null && n.f & 8192 && (e |= dt);
	var r = {
		ctx: sn,
		deps: null,
		nodes: null,
		f: e | lt | 512,
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
	if (e & 4) kn === null ? Nn.ensure().schedule(r) : kn.push(r);
	else if (t !== null) {
		try {
			Ei(r);
		} catch (e) {
			throw Yr(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= ht));
	}
	if (i !== null && (i.parent = n, n !== null && Pr(i, n), B !== null && B.f & 2 && !(e & 64))) {
		var a = B;
		(a.effects ??= []).push(i);
	}
	return r;
}
function Ir() {
	return B !== null && !si;
}
function Lr(e) {
	let t = Fr(8, null);
	return _n(t, ct), t.teardown = e, t;
}
function Rr(e) {
	Nr("$effect");
	var t = V.f;
	if (!B && t & 32 && !(t & 32768)) {
		var n = sn;
		(n.e ??= []).push(e);
	} else return zr(e);
}
function zr(e) {
	return Fr(4 | _t, e);
}
function Br(e) {
	Nn.ensure();
	let t = Fr(64 | gt, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Qr(t, () => {
			Yr(t), n(void 0);
		}) : (Yr(t), n(void 0));
	});
}
function Vr(e) {
	return Fr(4, e);
}
function Hr(e) {
	return Fr(xt | gt, e);
}
function Ur(e, t = 0) {
	return Fr(8 | t, e);
}
function z(e, t = [], n = [], r = []) {
	Gn(r, t, n, (t) => {
		Fr(8, () => e(...t.map(H)));
	});
}
function Wr(e, t = 0) {
	return Fr(16 | t, e);
}
function Gr(e) {
	return Fr(32 | gt, e);
}
function Kr(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = ai, n = B;
		oi(!0), ci(null);
		try {
			t.call(null);
		} finally {
			oi(e), ci(n);
		}
	}
}
function qr(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && jr(() => {
			e.abort(jt);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : Yr(n, t), n = r;
	}
}
function Jr(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || Yr(t), t = n;
	}
}
function Yr(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Xr(e.nodes.start, e.nodes.end), n = !0), _n(e, mt), qr(e, t && !n), Ti(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	Kr(e), e.f ^= mt, e.f |= ft;
	var i = e.parent;
	i !== null && i.first !== null && Zr(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Xr(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ Cr(e);
		e.remove(), e = n;
	}
}
function Zr(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Qr(e, t, n = !0) {
	var r = [];
	$r(e, r, !0);
	var i = () => {
		n && Yr(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function $r(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= dt;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				$r(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function ei(e) {
	ti(e, !0);
}
function ti(e, t) {
	if (e.f & 8192) {
		e.f ^= dt, e.f & 1024 || (_n(e, lt), Nn.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			ti(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function ni(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ Cr(n);
		t.append(n), n = i;
	}
}
// node_modules/svelte/src/internal/client/legacy.js
var ri = null, ii = !1, ai = !1;
function oi(e) {
	ai = e;
}
var B = null, si = !1;
function ci(e) {
	B = e;
}
var V = null;
function li(e) {
	V = e;
}
var ui = null;
function di(e) {
	B !== null && (ui === null ? ui = [e] : ui.push(e));
}
var fi = null, pi = 0, mi = null;
function hi(e) {
	mi = e;
}
var gi = 1, _i = 0, vi = _i;
function yi(e) {
	vi = e;
}
function bi() {
	return ++gi;
}
function xi(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~yt), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (xi(a) && tr(a), a.wv > e.wv) return !0;
		}
		t & 512 && Tn === null && _n(e, ct);
	}
	return !1;
}
function Si(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(ui !== null && Ye.call(ui, e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? Si(a, t, !1) : t === a && (n ? _n(a, lt) : a.f & 1024 && _n(a, ut), Rn(a));
	}
}
function Ci(e) {
	var t = fi, n = pi, r = mi, i = B, a = ui, o = sn, s = si, c = vi, l = e.f;
	fi = null, pi = 0, mi = null, B = l & 96 ? null : e, ui = null, cn(e.ctx), si = !1, vi = ++_i, e.ac !== null && (jr(() => {
		e.ac.abort(jt);
	}), e.ac = null);
	try {
		e.f |= bt;
		var u = e.fn, d = u();
		e.f |= pt;
		var f = e.deps, p = M?.is_fork;
		if (fi !== null) {
			var m;
			if (p || Ti(e, pi), f !== null && pi > 0) for (f.length = pi + fi.length, m = 0; m < fi.length; m++) f[pi + m] = fi[m];
			else e.deps = f = fi;
			if (Ir() && e.f & 512) for (m = pi; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && pi < f.length && (Ti(e, pi), f.length = pi);
		if (ln() && mi !== null && !si && f !== null && !(e.f & 6146)) for (m = 0; m < mi.length; m++) Si(mi[m], e);
		if (i !== null && i !== e) {
			if (_i++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = _i;
			if (t !== null) for (let e of t) e.rv = _i;
			mi !== null && (r === null ? r = mi : r.push(...mi));
		}
		return e.f & 8388608 && (e.f ^= St), d;
	} catch (e) {
		return mn(e);
	} finally {
		e.f ^= bt, fi = t, pi = n, mi = r, B = i, ui = a, cn(o), si = s, vi = c;
	}
}
function wi(e, t) {
	let n = t.reactions;
	if (n !== null) {
		var r = Je.call(n, e);
		if (r !== -1) {
			var i = n.length - 1;
			i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
		}
	}
	if (n === null && t.f & 2 && (fi === null || !Ye.call(fi, t))) {
		var a = t;
		a.f & 512 && (a.f ^= 512, a.f &= ~yt), a.v !== Gt && vn(a), nr(a), Ti(a, 0);
	}
}
function Ti(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) wi(e, n[r]);
}
function Ei(e) {
	var t = e.f;
	if (!(t & 16384)) {
		_n(e, ct);
		var n = V, r = ii;
		V = e, ii = !0;
		try {
			t & 16777232 ? Jr(e) : qr(e), Kr(e);
			var i = Ci(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = gi;
		} finally {
			ii = r, V = n;
		}
	}
}
async function Di() {
	await Promise.resolve(), Pn();
}
function H(e) {
	var t = !!(e.f & 2);
	if (ri?.add(e), B !== null && !si && !(V !== null && V.f & 16384) && (ui === null || !Ye.call(ui, e))) {
		var n = B.deps;
		if (B.f & 2097152) e.rv < _i && (e.rv = _i, fi === null && n !== null && n[pi] === e ? pi++ : fi === null ? fi = [e] : fi.push(e));
		else {
			B.deps ??= [], Ye.call(B.deps, e) || B.deps.push(e);
			var r = e.reactions;
			r === null ? e.reactions = [B] : Ye.call(r, B) || r.push(B);
		}
	}
	if (ai && ar.has(e)) return ar.get(e);
	if (t) {
		var i = e;
		if (ai) {
			var a = i.v;
			return (!(i.f & 1024) && i.reactions !== null || ki(i)) && (a = er(i)), ar.set(i, a), a;
		}
		var o = !(i.f & 512) && !si && B !== null && (ii || !!(B.f & 512)), s = (i.f & pt) === 0;
		xi(i) && (o && (i.f |= 512), tr(i)), o && !s && (rr(i), Oi(i));
	}
	if (Tn?.has(e)) return Tn.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function Oi(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (rr(t), Oi(t));
}
function ki(e) {
	if (e.v === Gt) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (ar.has(t) || t.f & 2 && ki(t)) return !0;
	return !1;
}
function Ai(e) {
	var t = si;
	try {
		return si = !0, e();
	} finally {
		si = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var ji = ["touchstart", "touchmove"];
function Mi(e) {
	return ji.includes(e);
}
// node_modules/svelte/src/internal/client/dev/css.js
var Ni = Symbol("events"), Pi = /* @__PURE__ */ new Set(), Fi = /* @__PURE__ */ new Set();
function Ii(e) {
	if (!D) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function Li(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Bi.call(t, e), !e.cancelBubble) return jr(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? fn(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function Ri(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = Li(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && Lr(() => {
		t.removeEventListener(e, o, a);
	});
}
function U(e, t, n) {
	(t[Ni] ??= {})[e] = n;
}
function W(e) {
	for (var t = 0; t < e.length; t++) Pi.add(e[t]);
	for (var n of Fi) n(e);
}
var zi = null;
function Bi(e) {
	var t = this, n = t.ownerDocument, r = e.type, i = e.composedPath?.() || [], a = i[0] || e.target;
	zi = e;
	var o = 0, s = zi === e && e[Ni];
	if (s) {
		var c = i.indexOf(s);
		if (c !== -1 && (t === document || t === window)) {
			e[Ni] = t;
			return;
		}
		var l = i.indexOf(t);
		if (l === -1) return;
		c <= l && (o = c);
	}
	if (a = i[o] || e.target, a !== t) {
		Ze(e, "currentTarget", {
			configurable: !0,
			get() {
				return a || n;
			}
		});
		var u = B, d = V;
		ci(null), li(null);
		try {
			for (var f, p = []; a !== null;) {
				var m = a.assignedSlot || a.parentNode || a.host || null;
				try {
					var h = a[Ni]?.[r];
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
			e[Ni] = t, delete e.currentTarget, ci(u), li(d);
		}
	}
}
// node_modules/svelte/src/internal/client/dom/reconciler.js
var Vi = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function Hi(e) {
	return Vi?.createHTML(e) ?? e;
}
function Ui(e) {
	var t = Er("template");
	return t.innerHTML = Hi(e.replaceAll("<!>", "<!---->")), t.content;
}
// node_modules/svelte/src/internal/client/dom/template.js
function Wi(e, t) {
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
		if (D) return Wi(O, null), O;
		i === void 0 && (i = Ui(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ Sr(i)));
		var t = r || _r ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ Sr(t), s = t.lastChild;
			Wi(o, s);
		} else Wi(t, t);
		return t;
	};
}
function Gi(e = "") {
	if (!D) {
		var t = xr(e + "");
		return Wi(t, t), t;
	}
	var n = O;
	return n.nodeType === 3 ? Dr(n) : (n.before(n = xr()), Qt(n)), Wi(n, n), n;
}
function Ki() {
	if (D) return Wi(O, null), O;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = xr();
	return e.append(t, n), Wi(t, n), e;
}
function K(e, t) {
	if (D) {
		var n = V;
		n.f & 32768 && n.nodes.end !== null || (n.nodes.end = O), $t();
	} else e !== null && e.before(t);
}
function q(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[kt] ??= e.nodeValue) && (e[kt] = n, e.nodeValue = `${n}`);
}
function qi(e, t) {
	return Yi(e, t);
}
var Ji = /* @__PURE__ */ new Map();
function Yi(e, { target: t, anchor: n, props: r = {}, events: i, context: a, intro: o = !0, transformError: s }) {
	br();
	var c = void 0, l = Br(() => {
		var o = n ?? t.appendChild(xr());
		Un(o, { pending: () => {} }, (t) => {
			A({});
			var n = sn;
			if (a && (n.c = a), i && (r.$$events = i), D && Wi(t, null), c = e(t, r) || {}, D && (V.nodes.end = O, O === null || O.nodeType !== 8 || O.data !== "]")) throw Jt(), Wt;
			j();
		}, s);
		var l = /* @__PURE__ */ new Set(), u = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!l.has(r)) {
					l.add(r);
					var i = Mi(r);
					for (let e of [t, document]) {
						var a = Ji.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Ji.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Bi, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return u(Xe(Pi)), Fi.add(u), () => {
			for (var e of l) for (let n of [t, document]) {
				var r = Ji.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Bi), r.delete(e), r.size === 0 && Ji.delete(n)) : r.set(e, i);
			}
			Fi.delete(u), o !== n && o.parentNode?.removeChild(o);
		};
	});
	return Xi.set(c, l), c;
}
var Xi = /* @__PURE__ */ new WeakMap();
function Zi(e, t) {
	let n = Xi.get(e);
	return n ? (Xi.delete(e), n(t)) : Promise.resolve();
}
// node_modules/svelte/src/internal/client/dom/blocks/branches.js
var Qi = class {
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
			if (n) ei(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (Yr(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						ni(r, t), t.append(xr()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else Yr(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), Qr(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (Yr(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = M, r = Tr();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = xr();
				i.append(a), this.#n.set(e, {
					effect: Gr(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, Gr(() => t(this.anchor)));
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
	D && (r = O, $t());
	var i = new Qi(e), a = n ? ht : 0;
	function o(e, t) {
		if (D) {
			var n = nn(r);
			if (e !== parseInt(n.substring(1))) {
				var a = tn();
				Qt(a), i.anchor = a, Zt(!1), i.ensure(e, t), Zt(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	Wr(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
// node_modules/svelte/src/internal/client/dom/blocks/key.js
var $i = Symbol("NaN");
function ea(e, t, n) {
	D && $t();
	var r = new Qi(e), i = !ln();
	Wr(() => {
		var e = t();
		e !== e && (e = $i), i && typeof e == "object" && e && (e = {}), r.ensure(e, n);
	});
}
// node_modules/svelte/src/internal/client/dom/blocks/each.js
function ta(e, t) {
	return t;
}
function na(e, t, n) {
	for (var r = [], i = t.length, a, o = t.length, s = 0; s < i; s++) {
		let n = t[s];
		Qr(n, () => {
			if (a) {
				if (a.pending.delete(n), a.done.add(n), a.pending.size === 0) {
					var t = e.outrogroups;
					ra(e, Xe(a.done)), t.delete(a), t.size === 0 && (e.outrogroups = null);
				}
			} else --o;
		}, !1);
	}
	if (o === 0) {
		var c = r.length === 0 && n !== null;
		if (c) {
			var l = n, u = l.parentNode;
			wr(u), u.append(l), e.items.clear();
		}
		ra(e, t, !c);
	} else a = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(a);
}
function ra(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= vt, ni(a, document.createDocumentFragment())) : Yr(t[i], n);
	}
}
var ia;
function Y(e, t, n, r, i, a = null) {
	var o = e, s = /* @__PURE__ */ new Map();
	if (t & 4) {
		var c = e;
		o = D ? Qt(/* @__PURE__ */ Sr(c)) : c.appendChild(xr());
	}
	D && $t();
	var l = null, u = /* @__PURE__ */ Qn(() => {
		var e = n();
		return qe(e) ? e : e == null ? [] : Xe(e);
	}), d, f = /* @__PURE__ */ new Map(), p = !0;
	function m(e) {
		g.effect.f & 16384 || (g.pending.delete(e), g.fallback = l, oa(g, d, o, t, r), l !== null && (d.length === 0 ? l.f & 33554432 ? (l.f ^= vt, ca(l, null, o)) : ei(l) : Qr(l, () => {
			l = null;
		})));
	}
	function h(e) {
		g.pending.delete(e);
	}
	var g = {
		effect: Wr(() => {
			d = H(u);
			var e = d.length;
			let c = !1;
			D && nn(o) === "[!" != (e === 0) && (o = tn(), Qt(o), Zt(!1), c = !0);
			for (var g = /* @__PURE__ */ new Set(), _ = M, v = Tr(), y = 0; y < e; y += 1) {
				D && O.nodeType === 8 && O.data === "]" && (o = O, c = !0, Zt(!1));
				var b = d[y], x = r(b, y), S = p ? null : s.get(x);
				S ? (S.v && lr(S.v, b), S.i && lr(S.i, y), v && _.unskip_effect(S.e)) : (S = sa(s, p ? o : ia ??= xr(), b, x, y, i, t, n), p || (S.e.f |= vt), s.set(x, S)), g.add(x);
			}
			if (e === 0 && a && !l && (p ? l = Gr(() => a(o)) : (l = Gr(() => a(ia ??= xr())), l.f |= vt)), e > g.size && Pt("", "", ""), D && e > 0 && Qt(tn()), !p) {
				if (f.set(_, g), v) {
					for (let [e, t] of s) g.has(e) || _.skip_effect(t.e);
					_.oncommit(m), _.ondiscard(h);
				} else m(_);
			}
			c && Zt(!0), H(u);
		}),
		flags: t,
		items: s,
		pending: f,
		outrogroups: null,
		fallback: l
	};
	p = !1, D && (o = O);
}
function aa(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function oa(e, t, n, r, i) {
	var a = !!(r & 8), o = t.length, s = e.items, c = aa(e.effect.first), l, u = null, d, f = [], p = [], m, h, g, _;
	if (a) for (_ = 0; _ < o; _ += 1) m = t[_], h = i(m, _), g = s.get(h).e, g.f & 33554432 || (g.nodes?.a?.measure(), (d ??= /* @__PURE__ */ new Set()).add(g));
	for (_ = 0; _ < o; _ += 1) {
		if (m = t[_], h = i(m, _), g = s.get(h).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(g), t.done.delete(g);
		if (g.f & 8192 && (ei(g), a && (g.nodes?.a?.unfix(), (d ??= /* @__PURE__ */ new Set()).delete(g))), g.f & 33554432) {
			if (g.f ^= vt, g === c) ca(g, null, n);
			else {
				var v = u ? u.next : c;
				g === e.effect.last && (e.effect.last = g.prev), g.prev && (g.prev.next = g.next), g.next && (g.next.prev = g.prev), la(e, u, g), la(e, g, v), ca(g, v, n), u = g, f = [], p = [], c = aa(u.next);
				continue;
			}
		}
		if (g !== c) {
			if (l !== void 0 && l.has(g)) {
				if (f.length < p.length) {
					var y = p[0], b;
					u = y.prev;
					var x = f[0], S = f[f.length - 1];
					for (b = 0; b < f.length; b += 1) ca(f[b], y, n);
					for (b = 0; b < p.length; b += 1) l.delete(p[b]);
					la(e, x.prev, S.next), la(e, u, x), la(e, S, y), c = y, u = S, --_, f = [], p = [];
				} else l.delete(g), ca(g, c, n), la(e, g.prev, g.next), la(e, g, u === null ? e.effect.first : u.next), la(e, u, g), u = g;
				continue;
			}
			for (f = [], p = []; c !== null && c !== g;) (l ??= /* @__PURE__ */ new Set()).add(c), p.push(c), c = aa(c.next);
			if (c === null) continue;
		}
		g.f & 33554432 || f.push(g), u = g, c = aa(g.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (ra(e, Xe(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (c !== null || l !== void 0) {
		var C = [];
		if (l !== void 0) for (g of l) g.f & 8192 || C.push(g);
		for (; c !== null;) !(c.f & 8192) && c !== e.fallback && C.push(c), c = aa(c.next);
		var w = C.length;
		if (w > 0) {
			var T = r & 4 && o === 0 ? n : null;
			if (a) {
				for (_ = 0; _ < w; _ += 1) C[_].nodes?.a?.measure();
				for (_ = 0; _ < w; _ += 1) C[_].nodes?.a?.fix();
			}
			na(e, C, T);
		}
	}
	a && fn(() => {
		if (d !== void 0) for (g of d) g.nodes?.a?.apply();
	});
}
function sa(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? sr(n) : /* @__PURE__ */ cr(n, !1, !1) : null, l = o & 2 ? sr(i) : null;
	return {
		v: c,
		i: l,
		e: Gr(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function ca(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ Cr(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function la(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
// node_modules/svelte/src/internal/client/dom/blocks/snippet.js
function ua(e, t, ...n) {
	var r = new Qi(e);
	Wr(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, ht);
}
// node_modules/svelte/src/internal/client/dom/css.js
function X(e, t) {
	Vr(() => {
		var n = e.getRootNode(), r = n.host ? n : n.head ?? n.ownerDocument.head;
		if (!r.querySelector("#" + t.hash)) {
			let e = Er("style");
			e.id = t.hash, e.textContent = t.code, r.appendChild(e);
		}
	});
}
// node_modules/svelte/src/internal/shared/attributes.js
function da(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function fa(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function pa(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(fa)), i && c.push(...Object.keys(i).map(fa));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = fa(e.substring(l, u).trim());
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
		return r && (n += da(r)), i && (n += da(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
// node_modules/svelte/src/internal/client/dom/elements/style.js
function ma(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function ha(e, t, n, r) {
	var i = e[Ot];
	if (D || i !== t) {
		var a = pa(t, r);
		D && a === e.getAttribute("style") || (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[Ot] = t;
	} else r && (Array.isArray(r) ? (ma(e, n?.[0], r[0]), ma(e, n?.[1], r[1], "important")) : ma(e, n, r));
	return r;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
function ga(e, t, n = !1) {
	if (e.multiple) {
		if (t == null) return;
		if (!qe(t)) return Yt();
		for (var r of e.options) r.selected = t.includes(ya(r));
	} else {
		for (r of e.options) if (hr(ya(r), t)) {
			r.selected = !0;
			return;
		}
		n && t === void 0 || (e.selectedIndex = -1);
	}
}
function _a(e) {
	var t = new MutationObserver(() => {
		ga(e, e.__value);
	});
	t.observe(e, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["value"]
	}), Lr(() => {
		t.disconnect();
	});
}
function va(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet(), i = !0;
	Mr(e, "change", (t) => {
		var i = t ? "[selected]" : ":checked", a;
		if (e.multiple) a = [].map.call(e.querySelectorAll(i), ya);
		else {
			var o = e.querySelector(i) ?? e.querySelector("option:not([disabled])");
			a = o && ya(o);
		}
		n(a), e.__value = a, M !== null && r.add(M);
	}), Vr(() => {
		var a = t();
		if (e === document.activeElement) {
			var o = M;
			if (r.has(o)) return;
		}
		if (ga(e, a, i), i && a === void 0) {
			var s = e.querySelector(":checked");
			s !== null && (a = ya(s), n(a));
		}
		e.__value = a, i = !1;
	}), _a(e);
}
function ya(e) {
	return "__value" in e ? e.__value : e.value;
}
// node_modules/svelte/src/internal/client/dom/elements/attributes.js
var ba = Symbol("is custom element"), xa = Symbol("is html"), Sa = Mt ? "link" : "LINK", Ca = Mt ? "progress" : "PROGRESS";
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
		e[At] = n, fn(n), Ar();
	}
}
function wa(e, t) {
	var n = Ea(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === Ca) && (e.value = t ?? "");
}
function Ta(e, t) {
	var n = Ea(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function Q(e, t, n, r) {
	var i = Ea(e);
	D && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === Sa) || i[t] !== (i[t] = n) && (t === "loading" && (e[Tt] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Oa(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function Ea(e) {
	return e[Et] ??= {
		[ba]: e.nodeName.includes("-"),
		[xa]: e.namespaceURI === Kt
	};
}
var Da = /* @__PURE__ */ new Map();
function Oa(e) {
	var t = e.getAttribute("is") || e.nodeName, n = Da.get(t);
	if (n) return n;
	Da.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var o in r = $e(i), r) r[o].set && o !== "innerHTML" && o !== "textContent" && o !== "innerText" && n.push(o);
		i = nt(i);
	}
	return n;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function ka(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	Mr(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = ja(e) ? Ma(a) : a, n(a), M !== null && r.add(M), await Di(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (D && e.defaultValue !== e.value || Ai(t) == null && e.value) && (n(ja(e) ? Ma(e.value) : e.value), M !== null && r.add(M)), Ur(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = M;
			if (r.has(i)) return;
		}
		ja(e) && n === Ma(e.value) || (e.type !== "date" || n || e.value) && n !== e.value && (e.value = n ?? "");
	});
}
function Aa(e, t, n = t) {
	Mr(e, "change", (t) => {
		n(t ? e.defaultChecked : e.checked);
	}), (D && e.defaultChecked !== e.checked || Ai(t) == null) && n(e.checked), Ur(() => {
		e.checked = !!t();
	});
}
function ja(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function Ma(e) {
	return e === "" ? null : +e;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function Na(e, t) {
	return e === t || e?.[Ct] === t;
}
function Pa(e = {}, t, n, r) {
	var i = sn.r, a = V;
	return Vr(() => {
		var o, s;
		return Ur(() => {
			o = s, s = r?.() || [], Ai(() => {
				Na(n(...s), e) || (t(e, ...s), o && Na(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && Na(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
// node_modules/svelte/src/internal/client/reactivity/props.js
function Fa(e, t, n, r) {
	var i = !0, a = !!(n & 8), o = !!(n & 16), s = r, c = !0, l = void 0, u = () => o && i ? (l ??= /* @__PURE__ */ Yn(r), H(l)) : (c && (c = !1, s = o ? Ai(r) : r), s);
	let d;
	if (a) {
		var f = Ct in e || wt in e;
		d = Qe(e, t)?.set ?? (f && t in e ? (n) => e[t] = n : void 0);
	}
	var p, m = !1;
	a ? [p, m] = Sn(() => e[t]) : p = e[t], p === void 0 && r !== void 0 && (p = u(), d && (i && zt(t), d(p)));
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
	var _ = !1, v = (n & 1 ? Yn : Qn)(() => (_ = !1, h()));
	a && H(v);
	var y = V;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? H(v) : i && a ? pr(e) : e;
			return F(v, n), _ = !0, s !== void 0 && (s = n), e;
		}
		return ai && _ || y.f & 16384 ? v.v : H(v);
	});
}
// node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
// src/ui/canvas/sanitize.ts
var Ia = /* @__PURE__ */ new Set([
	"http:",
	"https:",
	"mailto:",
	"tel:"
]), La = (e) => {
	if (typeof e != "string") return "";
	let t = e.replace(/[\u0000- \u007f-\u009f]/g, ""), n = /^([a-z][a-z0-9+.-]*):/i.exec(t)?.[1];
	return n === void 0 || Ia.has(`${n.toLowerCase()}:`) ? e.trim() : "";
}, Ra = (e) => typeof e == "string" ? e.replace(/[^\w\- :]/g, "").trim() : "", za = (e) => {
	let t = La(e);
	return t !== "" && !/^(mailto|tel):/i.test(t) ? t : "";
}, Ba = (e) => typeof e == "string" ? e : typeof e == "number" ? String(e) : "", Va = (e) => e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;"), Ha = "allow-same-origin", Ua = (e) => "<!doctype html><html><head><meta charset=\"utf-8\"><meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'none'; style-src * 'unsafe-inline'; img-src * data: blob:; font-src * data:\">" + e.map(za).filter((e) => e !== "").map((e) => `<link rel="stylesheet" href="${Va(e)}">`).join("") + "<style>body{margin:0;padding:12px;min-height:100vh;box-sizing:border-box}[data-ceiba-id]{cursor:default}[data-ceiba-id]:hover{outline:1px dashed #94a3b8}[data-ceiba-selected]{outline:2px solid #2563eb!important;outline-offset:2px}[data-ceiba-multiline]{white-space:pre-line}[contenteditable]{outline:2px solid #16a34a!important;outline-offset:2px;cursor:text}.ceiba-dragging,.ceiba-dragging *{user-select:none!important;cursor:grabbing!important}.ceiba-placeholder{padding:12px;border:1px dashed #94a3b8;color:#475569;font:13px system-ui;background:#f8fafc}@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}</style></head><body></body></html>", Wa = /* @__PURE__ */ new Set([
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
]), Ga = /* @__PURE__ */ new Set(["text"]), Ka = (e, t) => !t.has(e.type) || e.children.length > 0 ? null : e.type === "heading" ? "text" : e.type === "text" ? "content" : e.type === "button" ? "label" : Wa.has(e.type) || Ga.has(e.type) ? "content" : null, qa = (e) => Ga.has(e), Ja = (e, t) => {
	let n = e.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, "");
	return t ? n.replace(/\n$/, "") : n.replace(/\n+/g, " ");
}, Ya = (e) => {
	let t = e.ownerDocument, n = t.createRange();
	n.selectNodeContents(e), n.collapse(!1);
	let r = t.getSelection();
	r?.removeAllRanges(), r?.addRange(n);
}, Xa = {
	tag: "#slot",
	attrs: [],
	children: []
}, $ = (e, t = {}, n = []) => ({
	tag: e,
	attrs: Object.entries(t).filter((e) => e[1] !== null && e[1] !== void 0 && e[1] !== !1 && e[1] !== "").map(([e, t]) => [e, String(t)]),
	children: n.filter((e) => e !== null)
}), Za = (e, t) => {
	let n = null, r = (t) => {
		let i = e.createElement(t.tag);
		for (let [e, n] of t.attrs) i.setAttribute(e, n);
		for (let a of t.children) if (a === Xa) {
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
}, Qa = (e) => e.replace(/^[ \t\n\r\0\x0B]+|[ \t\n\r\0\x0B]+$/g, ""), $a = (e) => typeof e == "string" ? e : "", eo = (e) => typeof e == "string" ? e : typeof e == "number" ? String(e) : e === !0 ? "1" : "", to = /^[ \t\n\r\v\f]*[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?[ \t\n\r\v\f]*$/, no = (e, t, n, r) => {
	let i = typeof e == "number" && Number.isFinite(e) ? Math.trunc(e) : typeof e == "string" && to.test(e) ? Math.trunc(Number(e)) : t;
	return Math.max(n, Math.min(r, i));
}, ro = (e, t) => {
	let n = typeof e == "string" || typeof e == "number" ? String(e) : e === !0 ? "1" : null;
	return n !== null && t.includes(n) ? n : t[0];
}, io = (e) => $a(e).replace(/\r/g, "").split("\n").flatMap((e, t) => t === 0 ? [e] : [$("br"), e]), ao = (e, t) => Qa(`${e} ${$a(t)}`), oo = (e) => La(e), so = (e, t, n, r = "100vw") => {
	let i = oo(e[t]);
	if (i === "") return null;
	let a = $a(e.srcset), o = no(e.width, 0, 0, 2 ** 53 - 1), s = no(e.height, 0, 0, 2 ** 53 - 1), c = $("img", {
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
			["alt", $a(e.alt)],
			...c.attrs.slice(1)
		]
	};
}, co = (e) => {
	let t = We(e);
	return t === null ? "" : `background-image:${t}`;
}, lo = {
	image(e) {
		let t = [
			e.fluid ?? !0 ? "img-fluid" : "",
			e.rounded ? "rounded" : "",
			Qa($a(e.class))
		].filter((e) => e !== ""), n = Qa($a(e.sizes));
		return so(e, "src", t.join(" "), n === "" ? "100vw" : n);
	},
	divider(e) {
		let t = ro(e.style, [
			"solid",
			"dashed",
			"dotted"
		]);
		return $("hr", {
			class: ao(`cms-divider my-${no(e.spacing, 4, 0, 5)}`, e.class),
			style: t === "solid" ? "" : `border-top-style:${t}`
		});
	},
	spacer: (e) => $("div", {
		class: ao("cms-spacer", e.class),
		style: `height:${no(e.size, 32, 4, 400)}px`,
		"aria-hidden": "true"
	}),
	list(e) {
		let t = (Array.isArray(e.items) ? e.items : []).filter((e) => typeof e == "string").slice(0, 100), n = ro(e.variant, [
			"default",
			"unstyled",
			"inline"
		]), r = ao(`cms-list${n === "default" ? "" : ` list-${n}`}`, e.class);
		return $(e.ordered ? "ol" : "ul", { class: r }, t.map((e) => $("li", { class: n === "inline" ? "list-inline-item" : "" }, [e])));
	},
	quote(e) {
		let t = Qa($a(e.cite));
		return $("figure", { class: ao("cms-quote", e.class) }, [$("blockquote", { class: "blockquote" }, [$("p", {}, io(e.text))]), t === "" ? null : $("figcaption", { class: "blockquote-footer" }, [t])]);
	},
	card(e) {
		let t = Qa($a(e.title)), n = Qa($a(e.text)), r = Qa($a(e.linkLabel)), i = oo(e.linkUrl);
		return $("div", { class: ao("card", e.class) }, [so(e, "image", "card-img-top", "(min-width: 768px) 33vw, 100vw"), $("div", { class: "card-body" }, [
			t === "" ? null : $("h3", { class: "card-title h5" }, [t]),
			n === "" ? null : $("p", { class: "card-text" }, io(n)),
			Xa,
			r === "" || i === "" ? null : $("a", {
				href: i,
				class: "btn btn-primary"
			}, [r])
		])]);
	},
	gallery(e) {
		let t = Number(ro(eo(e.columns ?? "3"), [
			"3",
			"2",
			"4"
		])), n = `(min-width: 768px) ${Math.floor(100 / t)}vw, 50vw`, r = (Array.isArray(e.items) ? e.items : []).filter((e) => typeof e == "object" && !!e && !Array.isArray(e)).slice(0, 60);
		return $("div", { class: ao("cms-gallery row g-3", e.class) }, r.map((e) => {
			let r = so(e, "image", "img-fluid rounded", n), i = Qa($a(e.caption));
			return r === null ? null : $("figure", { class: `col-6 col-md-${12 / t} m-0` }, [r, i === "" ? null : $("figcaption", { class: "small text-muted mt-1" }, [i])]);
		}));
	},
	video(e) {
		let t = Te(e.url);
		if (!t) return null;
		let n = Qa($a(e.title)) || "Video", r = Qa($a(e.playLabel)) || "Play video";
		return $("figure", { class: ao("cms-video", e.class) }, [$("div", {
			class: "ratio ratio-16x9 cms-video-frame",
			"data-cms-video": t.embed,
			"data-cms-video-title": n,
			style: co(e.poster)
		}, [$("button", {
			type: "button",
			class: "cms-video-play btn btn-dark"
		}, [r, $("span", { class: "visually-hidden" }, [`: ${n}`])])]), $("figcaption", { class: "small mt-1" }, [$("a", {
			href: t.watch,
			rel: "noopener",
			target: "_blank"
		}, [n])])]);
	}
}, uo = /* @__PURE__ */ new Set(["src", "image"]), fo = (e) => e == null || e === "" || e === 0 || e === !1 || e === "0", po = (e, t, n = 0) => {
	let r = { ...e };
	for (let [i, a] of Object.entries(e)) {
		if (typeof a != "object" || !a) continue;
		if (!_e(a)) {
			n < 8 && (r[i] = Array.isArray(a) ? a.map((e) => typeof e == "object" && e && !Array.isArray(e) ? po(e, t, n + 1) : e) : po(a, t, n + 1));
			continue;
		}
		let e = t[a.asset];
		r[i] = e?.url ?? "", e && uo.has(i) && (r = mo(r, e, a.alt));
	}
	return r;
}, mo = (e, t, n) => {
	let r = typeof e.alt == "string" ? Qa(e.alt) : "", i = {
		...e,
		alt: n === void 0 ? r === "" ? t.alt : r : Qa(n)
	};
	return (e.srcset === void 0 || e.srcset === null) && t.srcset !== "" && (i.srcset = t.srcset), fo(e.width) && fo(e.height) && t.width !== null && t.height !== null && (i.width = t.width, i.height = t.height), i;
}, ho = /* @__PURE__ */ new Set(/* @__PURE__ */ "div.section.article.header.footer.nav.main.aside.h1.h2.h3.h4.h5.h6.p.span.strong.em.small.a.ul.ol.li.blockquote.figure.figcaption.code.pre.hr.br.img.label".split(".")), go = /* @__PURE__ */ new WeakMap(), _o = (e) => {
	let t = e.fields.props;
	return typeof t == "object" && t && !Array.isArray(t) ? t : {};
}, vo = (e, t) => {
	let n = e.createElement("div");
	return n.className = "ceiba-placeholder", n.textContent = t, n;
}, yo = (e, t, n, r, i) => {
	let a = po(_o(t), i), o = r ? lo[t.type] : void 0;
	if (o) {
		let r = o(a);
		if (r === null) return vo(e, t.type === "image" ? n.emptyImage : n.empty(t.type));
		let { el: i, slot: s } = Za(e, r);
		return (s.parent !== i || s.before !== null) && go.set(i, s), i;
	}
	let s = (t, n = "") => {
		let r = e.createElement(t), i = `${n} ${Ra(a.class)}`.trim();
		return i && (r.className = i), r;
	};
	switch (t.type) {
		case "container": return s("div", a.fluid ? "container-fluid" : "container");
		case "row": {
			let e = Ra(Ba(a.gutter));
			return s("div", `row ${/^[0-5]$/.test(e) ? `g-${e}` : e || "g-0"}`);
		}
		case "col": {
			let e = [
				"sm",
				"md",
				"lg",
				"xl"
			].map((e) => Number(a[e]) > 0 ? `col-${e}-${Number(a[e])}` : ""), t = a.xs === void 0 ? 12 : Number(a.xs);
			return s("div", [t > 0 ? `col-${t}` : "col", ...e].join(" ").replace(/\s+/g, " ").trim());
		}
		case "heading": {
			let e = s(`h${Math.min(6, Math.max(1, Number(a.level) || 2))}`);
			return e.textContent = Ba(a.text), e;
		}
		case "text": {
			let e = s("p");
			return e.textContent = Ba(a.content), e;
		}
		case "img": {
			let t = La(a.src);
			if (t === "") return vo(e, n.emptyImage);
			let r = s("img");
			return r.src = t, r.alt = Ba(a.alt), r;
		}
		case "button": {
			let e = s("a", "btn btn-primary");
			return e.href = La(a.url) || "#", e.textContent = Ba(a.label), e;
		}
		case "html": return vo(e, n.html);
	}
	if (!r || !ho.has(t.type)) return vo(e, n.unknown(t.type));
	let c = s(t.type);
	return t.type === "a" && (c.href = La(a.href) || "#"), a.content !== void 0 && c.append(e.createTextNode(Ba(a.content))), c;
}, bo = (e, t, n, r, i, a, o = {}) => {
	let s = (c) => {
		let l = t.nodes[c];
		if (!l) return null;
		let u = yo(e, l, i, n.has(l.type), o);
		u.dataset.ceibaId = c;
		let d = l.fields.styles;
		if (a && typeof d == "object" && d && !Array.isArray(d) && u.classList.add(...de(c, d, a)), c === r && (u.dataset.ceibaSelected = ""), qa(l.type) && (u.dataset.ceibaMultiline = ""), u.className !== "ceiba-placeholder" && !["IMG", "HR"].includes(u.tagName)) {
			let e = go.get(u) ?? {
				parent: u,
				before: null
			};
			for (let t of l.children) {
				let n = s(t);
				n && e.parent.insertBefore(n, e.before);
			}
		}
		return u;
	}, c = t.rootIds.map(s).filter((e) => e !== null);
	e.body.replaceChildren(...c);
}, xo = /* @__PURE__ */ G("<button type=\"button\" role=\"radio\" class=\"svelte-1cfnx8l\"> </button>"), So = /* @__PURE__ */ G("<div class=\"viewport svelte-1cfnx8l\" role=\"radiogroup\"><button type=\"button\" role=\"radio\" class=\"svelte-1cfnx8l\"> </button> <!></div>"), Co = {
	hash: "svelte-1cfnx8l",
	code: ".viewport.svelte-1cfnx8l {display:flex;flex-wrap:wrap;gap:.25rem;margin-bottom:.5rem;}button.svelte-1cfnx8l {font:inherit;font-size:.75rem;padding:.2rem .5rem;border:1px solid var(--cpb-border);border-radius:999px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button[aria-checked='true'].svelte-1cfnx8l {background:var(--cpb-accent-soft);border-color:var(--cpb-accent);font-weight:600;}button.svelte-1cfnx8l:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function wo(e, t) {
	A(t, !0), X(e, Co);
	let n = Fa(t, "store", 7), r = /* @__PURE__ */ N(() => n().t);
	var i = So(), a = I(i), o = I(a, !0);
	k(a), Y(R(a, 2), 17, () => n().design.breakpoints, (e) => e.id, (e, t) => {
		var r = xo(), i = I(r);
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
var To = /* @__PURE__ */ G("<div class=\"canvas svelte-1tv0kiv\"><p class=\"help svelte-1tv0kiv\"> </p> <!> <div class=\"stage svelte-1tv0kiv\"><iframe class=\"svelte-1tv0kiv\"></iframe></div></div>"), Eo = {
	hash: "svelte-1tv0kiv",
	code: ".canvas.svelte-1tv0kiv {background:var(--cpb-canvas);padding:.5rem 1rem 1rem;min-height:0;display:flex;flex-direction:column;}.help.svelte-1tv0kiv {margin:0 0 .5rem;font-size:.75rem;color:var(--cpb-muted);}.stage.svelte-1tv0kiv {flex:1;overflow:auto;display:flex;justify-content:center;min-height:0;}iframe.svelte-1tv0kiv {flex:none;max-width:none;min-height:480px;height:100%;border:1px solid var(--cpb-border);border-radius:8px;background:#fff;}"
};
function Do(e, t) {
	A(t, !0), X(e, Eo);
	let n = Fa(t, "stylesheets", 19, () => []), r = /* @__PURE__ */ N(() => t.store.t), i = /* @__PURE__ */ P(void 0), a = /* @__PURE__ */ P(!1), o = /* @__PURE__ */ P(null), s = /* @__PURE__ */ N(() => Ua(n())), c = /* @__PURE__ */ N(() => t.store.viewport === null ? 375 : t.store.design.breakpoints.find((e) => e.id === t.store.viewport)?.minWidth ?? 375);
	function l(e) {
		let n = e.head.querySelector("style[data-cms-design]");
		n || (n = e.createElement("style"), n.dataset.cmsDesign = "", e.head.append(n)), n.textContent = ke(t.store.design, ce(t.store.session.toDocument().root), t.store.media.assetUrls).css;
	}
	let u = (e) => e?.closest?.("[data-ceiba-id]");
	function d(e) {
		let n = H(i)?.contentDocument, a = t.store.tree.nodes[e], s = a && t.store.catalogue ? Ka(a, t.store.catalogue) : null, c = n?.querySelector(`[data-ceiba-id="${CSS.escape(e)}"]`);
		if (!n || !a || !s || !c) return !1;
		t.store.select(e), F(o, e, !0);
		let l = qa(a.type);
		c.setAttribute("contenteditable", "plaintext-only"), c.setAttribute("aria-label", H(r)("announce.editing"));
		let u = () => {
			t.store.run({
				kind: "updateProps",
				id: e,
				set: { [s]: Ja(c.innerText, l) }
			});
		}, d = (n) => {
			c.removeEventListener("input", u), c.removeEventListener("keydown", f), c.removeEventListener("blur", p), c.removeAttribute("contenteditable"), F(o, null), t.store.announce("announce.editDone"), t.onEditEnd(e, n);
		}, f = (e) => {
			(e.key === "Escape" || e.key === "Enter" && (!l || e.ctrlKey || e.metaKey)) && (e.preventDefault(), d(!0));
		}, p = () => d(!1);
		return c.addEventListener("input", u), c.addEventListener("keydown", f), c.addEventListener("blur", p), c.focus(), Ya(c), t.store.announce("announce.editing"), !0;
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
	Rr(() => {
		let e = H(i)?.contentDocument, n = t.store.catalogue, s = t.store.tree, c = t.store.selection, u = t.store.design, d = t.store.media.resolved;
		H(a) && e && n && H(o) === null && (t.store.media.ensure(Me(s, u)), bo(e, s, n, c, {
			unknown: (e) => H(r)("canvas.unknown", { type: e }),
			html: H(r)("canvas.html"),
			emptyImage: H(r)("canvas.emptyImage"),
			empty: (e) => H(r)("canvas.empty", { type: e })
		}, u, d), l(e), c && e.querySelector(`[data-ceiba-id="${CSS.escape(c)}"]`)?.scrollIntoView({ block: "nearest" }));
	});
	var m = { startEditing: d }, h = To(), g = I(h), _ = I(g, !0);
	k(g);
	var v = R(g, 2);
	wo(v, { get store() {
		return t.store;
	} });
	var y = R(v, 2), b = I(y);
	let x;
	return Pa(b, (e) => F(i, e), () => H(i)), k(y), k(h), z((e, n) => {
		Q(g, "id", `${t.uid}-canvas-help`), q(_, e), Q(b, "title", n), Q(b, "sandbox", Ha), Q(b, "srcdoc", H(s)), Q(b, "aria-describedby", `${t.uid}-canvas-help`), x = ha(b, "", x, { width: `${H(c)}px` });
	}, [() => H(r)("canvas.help"), () => H(r)("canvas.title")]), Ri("load", b, p), Ii(b), K(e, h), j(m);
}
// src/ui/model/insert.ts
var Oo = (e, t) => {
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
}, ko = (e, t, n) => {
	let r = e.get(t);
	return !r?.isContainer || r.disallowedChildren.includes(n) ? !1 : r.allowedChildren.includes("*") || r.allowedChildren.includes(n);
}, Ao = (e, t, n, r) => {
	let i = n === null ? void 0 : e.nodes[n];
	if (!i) return {
		parent: null,
		index: e.rootIds.length
	};
	if (ko(t, i.type, r)) return {
		parent: i.id,
		index: i.children.length
	};
	let a = Ae(e, i.parent);
	return {
		parent: i.parent,
		index: a.indexOf(i.id) + 1
	};
}, jo = (e) => {
	let { id: t, _id: n, children: r, ...i } = e;
	return {
		...i,
		children: (r ?? []).map(jo)
	};
}, Mo = class {
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
		let i = Ao(this.store.tree, n, this.store.selection, r.type), a = this.store.session.commandContext;
		if (!a) return !1;
		try {
			e.reduce((e, t, n) => m(e, {
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
				nodes: [jo(i)]
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
}, No = /* @__PURE__ */ G("<dialog class=\"svelte-o2xhl0\"><form method=\"dialog\" class=\"svelte-o2xhl0\"><h2 class=\"svelte-o2xhl0\"> </h2> <!> <div class=\"actions svelte-o2xhl0\"><button type=\"button\" class=\"svelte-o2xhl0\"> </button> <button type=\"submit\" class=\"primary svelte-o2xhl0\"> </button></div></form></dialog>"), Po = {
	hash: "svelte-o2xhl0",
	code: "dialog.svelte-o2xhl0 {border:1px solid var(--cpb-border);border-radius:10px;padding:1rem;width:min(560px, 90vw);color:inherit;font:inherit;}dialog.svelte-o2xhl0::backdrop {background:rgb(15 23 42 / .45);}h2.svelte-o2xhl0 {font-size:1rem;margin:0 0 .75rem;}.actions.svelte-o2xhl0 {display:flex;justify-content:flex-end;gap:.5rem;margin-top:1rem;}button.svelte-o2xhl0 {font:inherit;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.primary.svelte-o2xhl0 {background:var(--cpb-accent);border-color:var(--cpb-accent);color:#fff;}button.svelte-o2xhl0:disabled {opacity:.5;}.svelte-o2xhl0:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Fo(e, t) {
	A(t, !0), X(e, Po);
	let n = Fa(t, "open", 15, !1), r = Fa(t, "busy", 3, !1), i = /* @__PURE__ */ P(void 0), a = null;
	Rr(() => {
		H(i) && (n() && !H(i).open ? (a = H(i).getRootNode().activeElement, H(i).showModal()) : !n() && H(i).open && H(i).close());
	});
	var o = No(), s = I(o), c = I(s), l = I(c, !0);
	k(c);
	var u = R(c, 2);
	ua(u, () => t.children);
	var d = R(u, 2), f = I(d), p = I(f, !0);
	k(f);
	var m = R(f, 2), h = I(m, !0);
	k(m), k(d), k(s), k(o), Pa(o, (e) => F(i, e), () => H(i)), z(() => {
		Q(o, "aria-labelledby", `${t.uid}-title`), Q(c, "id", `${t.uid}-title`), q(l, t.title), q(p, t.cancelLabel), m.disabled = r(), q(h, t.submitLabel);
	}), Ri("close", o, () => {
		n(!1), a?.focus?.();
	}), Ri("submit", s, (e) => {
		e.preventDefault(), t.onSubmit();
	}), U("click", f, () => {
		n(!1);
	}), K(e, o), j();
}
W(["click"]);
// src/ui/content/ImportDialog.svelte
var Io = /* @__PURE__ */ G("<p class=\"help svelte-c6zkzf\"> </p> <label class=\"svelte-c6zkzf\"> </label> <textarea rows=\"10\" spellcheck=\"false\" class=\"svelte-c6zkzf\"></textarea>", 1), Lo = {
	hash: "svelte-c6zkzf",
	code: ".help.svelte-c6zkzf {font-size:.8rem;margin:0 0 .5rem;}label.svelte-c6zkzf {display:block;font-size:.8rem;font-weight:600;margin-bottom:.25rem;}textarea.svelte-c6zkzf {width:100%;box-sizing:border-box;font:12px/1.4 ui-monospace, monospace;padding:.5rem;border:1px solid var(--cpb-border);border-radius:6px;}"
};
function Ro(e, t) {
	A(t, !0), X(e, Lo);
	let n = Fa(t, "open", 15, !1), r = /* @__PURE__ */ N(() => t.store.t), i = /* @__PURE__ */ P(""), a = /* @__PURE__ */ P(!1);
	async function o() {
		if (H(i).trim() === "") return;
		F(a, !0);
		let e = await t.content.importHtml(H(i));
		F(a, !1), e !== null && (e > 0 && t.store.announce("import.warnings", { count: e }), F(i, ""), n(!1));
	}
	{
		let s = /* @__PURE__ */ N(() => H(r)("import.title")), c = /* @__PURE__ */ N(() => `${t.uid}-import`), l = /* @__PURE__ */ N(() => H(r)("import.submit")), u = /* @__PURE__ */ N(() => H(r)("dialog.cancel"));
		Fo(e, {
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
				var a = Io(), o = L(a), s = I(o, !0);
				k(o);
				var c = R(o, 2), l = I(c, !0);
				k(c);
				var u = R(c, 2);
				Or(u), z((e, n) => {
					q(s, e), Q(c, "for", `${t.uid}-import-html`), q(l, n), Q(u, "id", `${t.uid}-import-html`);
				}, [() => H(r)("import.help"), () => H(r)("import.field")]), ka(u, () => H(i), (e) => F(i, e)), K(e, a);
			},
			$$slots: { default: !0 }
		});
	}
	j();
}
// src/ui/design/ops.ts
var zo = /^[a-z][a-z0-9-]*(?:\.[a-z0-9-]+)*$/, Bo = /^[a-z][a-z0-9-]{0,40}$/, Vo = (e, t, n) => ({
	...e,
	tokens: {
		...e.tokens,
		[t]: n
	}
}), Ho = (e, t) => {
	let n = { ...e.tokens };
	return delete n[t], {
		...e,
		tokens: n
	};
}, Uo = (e, t, n, r = {}) => ({
	...e,
	classes: {
		...e.classes,
		[t]: {
			name: n,
			styles: e.classes[t]?.styles ?? r
		}
	}
}), Wo = (e, t, n) => {
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
}, Go = (e, t) => {
	let n = { ...e.classes };
	return delete n[t], {
		...e,
		classes: n
	};
}, Ko = (e, t) => ({
	...e,
	breakpoints: t
}), qo = (e, t) => JSON.stringify(e ?? {}).includes(`{"token":${JSON.stringify(t)}}`), Jo = (e, t) => [...Object.entries(e.tokens).filter(([e, n]) => e !== t && typeof n.value == "object" && n.value.token === t).map(([e]) => `token ${e}`), ...Object.entries(e.classes).filter(([, e]) => qo(e.styles, t)).map(([e, t]) => `class ${t.name ?? e}`)], Yo = /* @__PURE__ */ G("<li class=\"svelte-l0fwje\"><code class=\"svelte-l0fwje\"> </code> <label class=\"svelte-l0fwje\"> <input type=\"number\" min=\"1\" max=\"4000\" class=\"svelte-l0fwje\"/></label></li>"), Xo = /* @__PURE__ */ G("<ul class=\"svelte-l0fwje\"></ul>"), Zo = {
	hash: "svelte-l0fwje",
	code: "ul.svelte-l0fwje {list-style:none;margin:0;padding:0;display:grid;gap:.35rem;}li.svelte-l0fwje {display:flex;align-items:center;gap:.5rem;font-size:.8rem;}label.svelte-l0fwje {display:flex;align-items:center;gap:.35rem;}input.svelte-l0fwje {width:6rem;font:inherit;font-size:.8rem;padding:.2rem .35rem;border:1px solid var(--cpb-border);border-radius:5px;}.svelte-l0fwje:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Qo(e, t) {
	A(t, !0), X(e, Zo);
	let n = /* @__PURE__ */ N(() => t.store.t);
	function r(e, n) {
		let r = Number(n);
		Number.isInteger(r) && t.store.designSession.update(Ko(t.store.design, t.store.design.breakpoints.map((t) => t.id === e ? {
			...t,
			minWidth: r
		} : t)));
	}
	var i = Xo();
	Y(i, 21, () => t.store.design.breakpoints, (e) => e.id, (e, t) => {
		var i = Yo(), a = I(i), o = I(a, !0);
		k(a);
		var s = R(a, 2), c = I(s), l = R(c);
		Z(l), k(s), k(i), z((e) => {
			q(o, H(t).id), q(c, `${e ?? ""} `), wa(l, H(t).minWidth);
		}, [() => H(n)("design.minWidth")]), U("change", l, (e) => r(H(t).id, e.currentTarget.value)), K(e, i);
	}), k(i), K(e, i), j();
}
W(["change"]);
// src/ui/styles/groups.ts
var $o = [
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
], es = (e) => {
	let t = e.replace(/([A-Z])/g, " $1").toLowerCase();
	return t.charAt(0).toUpperCase() + t.slice(1);
}, ts = (e, t) => {
	let n = t.trim();
	return (e === "number" || e === "lineHeight") && /^-?(\d+\.?\d*|\.\d+)$/.test(n) ? Number(n) : n;
}, ns = /* @__PURE__ */ G("<img alt=\"\" class=\"thumb svelte-18w86nj\"/>"), rs = /* @__PURE__ */ G("<span class=\"thumb missing svelte-18w86nj\"> </span>"), is = /* @__PURE__ */ G("<span class=\"legacy svelte-18w86nj\"> </span>"), as = /* @__PURE__ */ G("<button type=\"button\" class=\"svelte-18w86nj\">×</button>"), os = /* @__PURE__ */ G("<label class=\"svelte-18w86nj\"> </label> <input type=\"text\" class=\"svelte-18w86nj\"/>", 1), ss = /* @__PURE__ */ G("<label class=\"check svelte-18w86nj\"><input type=\"checkbox\" class=\"svelte-18w86nj\"/> </label> <!>", 1), cs = /* @__PURE__ */ G("<div class=\"picker svelte-18w86nj\" role=\"group\"><span class=\"label svelte-18w86nj\"> </span> <div class=\"row svelte-18w86nj\"><!> <!> <button type=\"button\" class=\"svelte-18w86nj\"> </button> <!></div> <!></div>"), ls = {
	hash: "svelte-18w86nj",
	code: ".picker.svelte-18w86nj {display:grid;gap:.25rem;margin-bottom:.75rem;}.label.svelte-18w86nj, label.svelte-18w86nj {font-size:.8rem;font-weight:600;}.check.svelte-18w86nj {font-weight:400;display:flex;gap:.35rem;align-items:center;}.row.svelte-18w86nj {display:flex;gap:.35rem;align-items:center;}.thumb.svelte-18w86nj {width:48px;height:48px;object-fit:cover;border-radius:6px;border:1px solid var(--cpb-border);}.missing.svelte-18w86nj {display:grid;place-items:center;font-size:.6rem;color:var(--cpb-danger);text-align:center;}.legacy.svelte-18w86nj {flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:.75rem;color:var(--cpb-muted);}button.svelte-18w86nj, input[type='text'].svelte-18w86nj {font:inherit;font-size:.8rem;padding:.3rem .6rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}button.svelte-18w86nj {cursor:pointer;}.svelte-18w86nj:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function us(e, t) {
	A(t, !0), X(e, ls);
	let n = Fa(t, "withAlt", 3, !1), r = /* @__PURE__ */ N(() => t.store.t), i = /* @__PURE__ */ N(() => _e(t.value) ? t.value : null), a = /* @__PURE__ */ N(() => H(i) ? t.store.media.resolved[H(i).asset] : void 0), o = /* @__PURE__ */ N(() => typeof t.value == "string" && t.value !== "" ? t.value : null), s = /* @__PURE__ */ N(() => H(i)?.alt === "");
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
	var u = cs(), d = I(u), f = I(d, !0);
	k(d);
	var p = R(d, 2), m = I(p), h = (e) => {
		var t = ns();
		z(() => Q(t, "src", H(a).url)), K(e, t);
	}, g = (e) => {
		var t = rs(), n = I(t, !0);
		k(t), z((e) => q(n, e), [() => H(r)("media.missing")]), K(e, t);
	};
	J(m, (e) => {
		H(a) ? e(h) : H(i) && e(g, 1);
	});
	var _ = R(m, 2), v = (e) => {
		var t = is(), n = I(t, !0);
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
		var n = as();
		z((e) => Q(n, "aria-label", e), [() => H(r)("media.removeFrom", { field: t.label })]), U("click", n, () => t.onChange(null)), K(e, n);
	};
	J(x, (e) => {
		(H(i) || H(o)) && e(S);
	}), k(p);
	var C = R(p, 2), w = (e) => {
		var n = ss(), o = L(n), c = I(o);
		Z(c);
		var u = R(c);
		k(o);
		var d = R(o, 2), f = (e) => {
			var n = os(), o = L(n), s = I(o, !0);
			k(o);
			var c = R(o, 2);
			Z(c), z((e) => {
				Q(o, "for", `${t.id}-alt`), q(s, e), Q(c, "id", `${t.id}-alt`), wa(c, H(i).alt ?? ""), Q(c, "placeholder", H(a)?.alt ?? "");
			}, [() => H(r)("media.useAlt")]), U("change", c, (e) => l(e.currentTarget.value.trim() === "" ? void 0 : e.currentTarget.value)), K(e, n);
		};
		J(d, (e) => {
			H(s) || e(f);
		}), z((e) => {
			Ta(c, H(s)), q(u, ` ${e ?? ""}`);
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
var ds = /* @__PURE__ */ G("<option class=\"svelte-91oqxq\"> </option>"), fs = /* @__PURE__ */ G("<select class=\"svelte-91oqxq\"><option class=\"svelte-91oqxq\"> </option><!></select>"), ps = /* @__PURE__ */ G("<option class=\"svelte-91oqxq\"> </option>"), ms = /* @__PURE__ */ G("<select class=\"svelte-91oqxq\"><option class=\"svelte-91oqxq\"> </option><!></select>"), hs = /* @__PURE__ */ G("<input class=\"svelte-91oqxq\"/>"), gs = /* @__PURE__ */ G("<option class=\"svelte-91oqxq\"> </option>"), _s = /* @__PURE__ */ G("<select class=\"svelte-91oqxq\"><option class=\"svelte-91oqxq\"> </option><!></select>"), vs = /* @__PURE__ */ G("<button type=\"button\" class=\"remove svelte-91oqxq\">×</button>"), ys = /* @__PURE__ */ G("<p class=\"error svelte-91oqxq\" role=\"alert\"> </p>"), bs = /* @__PURE__ */ G("<p class=\"origin svelte-91oqxq\"> </p>"), xs = /* @__PURE__ */ G("<div class=\"field svelte-91oqxq\"><label class=\"svelte-91oqxq\"> </label> <div class=\"row svelte-91oqxq\"><!> <!> <!></div> <!></div>"), Ss = {
	hash: "svelte-91oqxq",
	code: ".field.svelte-91oqxq {display:grid;gap:.2rem;margin:.4rem 0;}label.svelte-91oqxq {font-size:.75rem;font-weight:600;}.row.svelte-91oqxq {display:flex;gap:.25rem;}input.svelte-91oqxq, select.svelte-91oqxq {flex:1;min-width:0;font:inherit;font-size:.8rem;padding:.25rem .4rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}[aria-invalid='true'].svelte-91oqxq {border-color:var(--cpb-danger);}.remove.svelte-91oqxq {font:inherit;padding:0 .5rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);cursor:pointer;}.origin.svelte-91oqxq {margin:0;font-size:.7rem;color:var(--cpb-muted);}.error.svelte-91oqxq {margin:0;font-size:.7rem;color:var(--cpb-danger);}.svelte-91oqxq:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Cs(e, t) {
	A(t, !0), X(e, Ss);
	let n = /* @__PURE__ */ N(() => t.store.t), r = /* @__PURE__ */ N(() => oe(t.styles, t.store.design, t.target, t.spec.name)), i = /* @__PURE__ */ N(() => H(r)?.origin === "own" ? H(r).value : void 0), a = /* @__PURE__ */ N(() => Be(t.spec)), o = /* @__PURE__ */ N(() => Object.entries(t.store.design.tokens).filter(([, e]) => e.type === H(a)).map(([e]) => e)), s = /* @__PURE__ */ N(() => t.spec.kind === "keyword" ? y.keywords[t.spec.name] ?? [] : []), c = /* @__PURE__ */ N(() => typeof H(i) == "object" && H(i) !== null && "token" in H(i) ? H(i).token : ""), l = /* @__PURE__ */ N(() => H(i) === void 0 || typeof H(i) == "object" ? "" : String(H(i))), u = (e) => typeof e == "object" ? "token" in e ? `{${e.token}}` : H(n)("media.asset") : String(e), d = /* @__PURE__ */ N(() => !H(r) || H(r).origin === "own" ? null : H(r).origin === "class" ? H(n)("styles.fromClass", { from: H(r).from }) : H(n)("styles.inherited", { from: H(r).from })), f = /* @__PURE__ */ P(null);
	function p(e) {
		e !== null && typeof e != "object" && ie(t.spec, e) === null ? F(f, H(n)("styles.invalid"), !0) : (F(f, null), t.onSet(Re(t.styles, t.target, t.spec.name, e)));
	}
	let m = (e) => p(e.trim() === "" ? null : ts(t.spec.kind, e));
	var h = Ki(), g = L(h), _ = (e) => {
		var n = Ki(), r = L(n), a = (e) => {
			{
				let n = /* @__PURE__ */ N(() => es(t.spec.name));
				us(e, {
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
					onChange: (e) => p(e === null || typeof e == "string" ? null : { asset: e.asset })
				});
			}
		};
		J(r, (e) => {
			t.store.media.available && e(a);
		}), K(e, n);
	}, v = (e) => {
		var a = xs(), h = I(a), g = I(h, !0);
		k(h);
		var _ = R(h, 2), v = I(_), y = (e) => {
			var n = fs(), i = I(n), a = I(i, !0);
			k(i), i.value = i.__value = "", Y(R(i), 16, () => H(o), (e) => e, (e, t) => {
				var n = ds(), r = I(n, !0);
				k(n);
				var i = {};
				z(() => {
					q(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
				}), K(e, n);
			}), k(n);
			var s;
			_a(n), z((e) => {
				Q(n, "id", t.id), q(a, e), s !== (s = H(c)) && (n.value = (n.__value = H(c)) ?? "", ga(n, H(c)));
			}, [() => H(r) ? u(H(r).value) : "—"]), U("change", n, (e) => p(e.currentTarget.value === "" ? null : { token: e.currentTarget.value })), K(e, n);
		}, b = (e) => {
			var n = ms(), i = I(n), a = I(i, !0);
			k(i), i.value = i.__value = "", Y(R(i), 16, () => H(s), (e) => e, (e, t) => {
				var n = ps(), r = I(n, !0);
				k(n);
				var i = {};
				z(() => {
					q(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
				}), K(e, n);
			}), k(n);
			var o;
			_a(n), z((e) => {
				Q(n, "id", t.id), q(a, e), o !== (o = H(l)) && (n.value = (n.__value = H(l)) ?? "", ga(n, H(l)));
			}, [() => H(r) ? u(H(r).value) : "—"]), U("change", n, (e) => m(e.currentTarget.value)), K(e, n);
		}, x = (e) => {
			var n = hs();
			Z(n), z((e) => {
				Q(n, "id", t.id), wa(n, H(l)), Q(n, "placeholder", e), Q(n, "aria-invalid", H(f) !== null), Q(n, "aria-describedby", H(f) ? `${t.id}-error` : H(d) ? `${t.id}-origin` : void 0);
			}, [() => H(r) && H(r).origin !== "own" ? u(H(r).value) : ""]), U("change", n, (e) => m(e.currentTarget.value)), K(e, n);
		};
		J(v, (e) => {
			t.spec.kind === "token" ? e(y) : H(s).length > 0 ? e(b, 1) : e(x, -1);
		});
		var S = R(v, 2), C = (e) => {
			var r = _s(), i = I(r), a = I(i, !0);
			k(i), i.value = i.__value = "", Y(R(i), 16, () => H(o), (e) => e, (e, t) => {
				var n = gs(), r = I(n, !0);
				k(n);
				var i = {};
				z(() => {
					q(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
				}), K(e, n);
			}), k(r);
			var s;
			_a(r), z((e, t) => {
				Q(r, "aria-label", e), q(a, t), s !== (s = H(c)) && (r.value = (r.__value = H(c)) ?? "", ga(r, H(c)));
			}, [() => `${H(n)("styles.token")} · ${es(t.spec.name)}`, () => H(n)("styles.literal")]), U("change", r, (e) => p(e.currentTarget.value === "" ? null : { token: e.currentTarget.value })), K(e, r);
		};
		J(S, (e) => {
			H(o).length > 0 && t.spec.kind !== "token" && e(C);
		});
		var w = R(S, 2), T = (e) => {
			var r = vs();
			z((e) => Q(r, "aria-label", e), [() => H(n)("styles.remove", { property: es(t.spec.name) })]), U("click", r, () => p(null)), K(e, r);
		};
		J(w, (e) => {
			H(i) !== void 0 && e(T);
		}), k(_);
		var ee = R(_, 2), E = (e) => {
			var n = ys(), r = I(n, !0);
			k(n), z(() => {
				Q(n, "id", `${t.id}-error`), q(r, H(f));
			}), K(e, n);
		}, te = (e) => {
			var n = bs(), r = I(n, !0);
			k(n), z(() => {
				Q(n, "id", `${t.id}-origin`), q(r, H(d));
			}), K(e, n);
		};
		J(ee, (e) => {
			H(f) ? e(E) : H(d) && e(te, 1);
		}), k(a), z((e) => {
			Q(h, "for", t.id), q(g, e);
		}, [() => es(t.spec.name)]), K(e, a);
	};
	J(g, (e) => {
		t.spec.kind === "image" ? e(_) : e(v, -1);
	}), K(e, h), j();
}
W(["change", "click"]);
// src/ui/styles/StylesPanel.svelte
var ws = /* @__PURE__ */ G("<option class=\"svelte-tbe6xh\"> </option>"), Ts = /* @__PURE__ */ G("<option class=\"svelte-tbe6xh\"> </option>"), Es = /* @__PURE__ */ G("<details class=\"group svelte-tbe6xh\"><summary class=\"svelte-tbe6xh\"> </summary> <!></details>"), Ds = /* @__PURE__ */ G("<details class=\"styles svelte-tbe6xh\" open=\"\"><summary class=\"svelte-tbe6xh\"> </summary> <div class=\"target svelte-tbe6xh\"><label class=\"svelte-tbe6xh\"> </label> <select class=\"svelte-tbe6xh\"><option class=\"svelte-tbe6xh\"> </option><!></select> <label class=\"svelte-tbe6xh\"> </label> <select class=\"svelte-tbe6xh\"><option class=\"svelte-tbe6xh\"> </option><!></select></div> <!> <!></details>"), Os = {
	hash: "svelte-tbe6xh",
	code: ".styles.svelte-tbe6xh {margin-top:1rem;border-top:1px solid var(--cpb-border);padding-top:.5rem;}summary.svelte-tbe6xh {cursor:pointer;font-size:.8rem;font-weight:700;}.group.svelte-tbe6xh {margin:.35rem 0;padding-left:.25rem;}.group.svelte-tbe6xh summary:where(.svelte-tbe6xh) {font-weight:600;font-size:.78rem;}.target.svelte-tbe6xh {display:grid;grid-template-columns:auto 1fr;gap:.25rem .5rem;align-items:center;margin:.5rem 0;}label.svelte-tbe6xh {font-size:.75rem;font-weight:600;}select.svelte-tbe6xh {font:inherit;font-size:.8rem;padding:.25rem .4rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}.svelte-tbe6xh:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function ks(e, t) {
	A(t, !0), X(e, Os);
	let n = Fa(t, "store", 7), r = /* @__PURE__ */ N(() => n().t), i = /* @__PURE__ */ N(() => n().styleState === null ? {
		breakpoint: n().viewport,
		state: null
	} : {
		breakpoint: null,
		state: n().styleState
	});
	var a = Ds(), o = I(a), s = I(o, !0);
	k(o);
	var c = R(o, 2), l = I(c), u = I(l, !0);
	k(l);
	var d = R(l, 2), f = I(d), p = I(f, !0);
	k(f), f.value = f.__value = "", Y(R(f), 17, () => n().design.breakpoints, (e) => e.id, (e, t) => {
		var n = ws(), r = I(n);
		k(n);
		var i = {};
		z(() => {
			q(r, `${H(t).id ?? ""} · ${H(t).minWidth ?? ""}px`), i !== (i = H(t).id) && (n.value = (n.__value = H(t).id) ?? "");
		}), K(e, n);
	}), k(d);
	var m;
	_a(d);
	var h = R(d, 2), g = I(h, !0);
	k(h);
	var _ = R(h, 2), v = I(_), b = I(v, !0);
	k(v), v.value = v.__value = "", Y(R(v), 16, () => y.states, (e) => e, (e, t) => {
		var n = Ts(), r = I(n, !0);
		k(n);
		var i = {};
		z(() => {
			q(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
		}), K(e, n);
	}), k(_);
	var x;
	_a(_), k(c);
	var S = R(c, 2);
	ua(S, () => t.children ?? it), Y(R(S, 2), 17, () => $o, (e) => e.key, (e, a) => {
		var o = Es(), s = I(o), c = I(s, !0);
		k(s), Y(R(s, 2), 16, () => H(a).properties, (e) => e, (e, r) => {
			let a = /* @__PURE__ */ N(() => Ue.get(r));
			var o = Ki(), s = L(o), c = (e) => {
				{
					let o = /* @__PURE__ */ N(() => `${t.uid}-style-${r}`);
					Cs(e, {
						get store() {
							return n();
						},
						get styles() {
							return t.styles;
						},
						get target() {
							return H(i);
						},
						get spec() {
							return H(a);
						},
						get onSet() {
							return t.onSet;
						},
						get id() {
							return H(o);
						}
					});
				}
			};
			J(s, (e) => {
				H(a) && e(c);
			}), K(e, o);
		}), k(o), z((e) => q(c, e), [() => H(r)(H(a).key)]), K(e, o);
	}), k(a), z((e, r, i, a, o) => {
		q(s, e), Q(l, "for", `${t.uid}-bp`), q(u, r), Q(d, "id", `${t.uid}-bp`), q(p, i), m !== (m = n().viewport ?? "") && (d.value = (d.__value = n().viewport ?? "") ?? "", ga(d, n().viewport ?? "")), Q(h, "for", `${t.uid}-state`), q(g, a), Q(_, "id", `${t.uid}-state`), _.disabled = n().viewport !== null, q(b, o), x !== (x = n().styleState ?? "") && (_.value = (_.__value = n().styleState ?? "") ?? "", ga(_, n().styleState ?? ""));
	}, [
		() => t.title ?? H(r)("styles.title"),
		() => H(r)("styles.target"),
		() => H(r)("viewport.base"),
		() => H(r)("styles.state"),
		() => H(r)("styles.normal")
	]), U("change", d, (e) => {
		n().viewport = e.currentTarget.value || null, n().styleState = null;
	}), U("change", _, (e) => {
		n().styleState = e.currentTarget.value || null;
	}), K(e, a), j();
}
W(["change"]);
// src/ui/design/ClassesTab.svelte
var As = /* @__PURE__ */ G("<li class=\"svelte-9fzp9u\"><input class=\"svelte-9fzp9u\"/> <code class=\"svelte-9fzp9u\"> </code> <button type=\"button\" class=\"svelte-9fzp9u\">✎</button> <button type=\"button\" class=\"svelte-9fzp9u\">×</button></li>"), js = /* @__PURE__ */ G("<p class=\"message svelte-9fzp9u\" role=\"alert\"> </p>"), Ms = /* @__PURE__ */ G("<ul class=\"svelte-9fzp9u\"></ul> <div class=\"add svelte-9fzp9u\"><input placeholder=\"card\" class=\"svelte-9fzp9u\"/> <input placeholder=\"Card\" class=\"svelte-9fzp9u\"/> <button type=\"button\" class=\"svelte-9fzp9u\"> </button></div> <!> <!>", 1), Ns = {
	hash: "svelte-9fzp9u",
	code: "ul.svelte-9fzp9u {list-style:none;margin:0;padding:0;display:grid;gap:.25rem;}li.svelte-9fzp9u {display:grid;grid-template-columns:1fr auto auto auto;gap:.25rem;align-items:center;font-size:.78rem;}input.svelte-9fzp9u {font:inherit;font-size:.78rem;padding:.2rem .35rem;border:1px solid var(--cpb-border);border-radius:5px;min-width:0;}.add.svelte-9fzp9u {display:grid;grid-template-columns:1fr 1fr auto;gap:.25rem;margin-top:.5rem;}button.svelte-9fzp9u {font:inherit;font-size:.78rem;padding:.2rem .5rem;border:1px solid var(--cpb-border);border-radius:5px;background:var(--cpb-surface);cursor:pointer;}button[aria-pressed='true'].svelte-9fzp9u {background:var(--cpb-accent-soft);}.message.svelte-9fzp9u {color:var(--cpb-danger);font-size:.75rem;}.svelte-9fzp9u:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Ps(e, t) {
	A(t, !0), X(e, Ns);
	let n = /* @__PURE__ */ N(() => t.store.t), r = /* @__PURE__ */ N(() => Object.entries(t.store.design.classes)), i = /* @__PURE__ */ P(null), a = /* @__PURE__ */ P(""), o = /* @__PURE__ */ P(""), s = /* @__PURE__ */ P(null);
	function c() {
		!Bo.test(H(a)) || H(a) in t.store.design.classes ? F(s, H(n)("design.badId"), !0) : (F(s, null), t.store.designSession.update(Uo(t.store.design, H(a), H(o).trim() || H(a))), F(i, H(a), !0), F(a, ""), F(o, ""));
	}
	async function l(e) {
		let r = await t.store.session.transport.designUsages?.("class", e).catch(() => []) ?? [];
		r.length > 0 ? F(s, H(n)("design.inUse", {
			name: e,
			where: r.map((e) => e.title).join(", ")
		}), !0) : (F(s, null), H(i) === e && F(i, null), t.store.designSession.update(Go(t.store.design, e)));
	}
	var u = Ms(), d = L(u);
	Y(d, 21, () => H(r), ([e, t]) => e, (e, r) => {
		var a = /* @__PURE__ */ N(() => st(H(r), 2));
		let o = () => H(a)[0], s = () => H(a)[1];
		var c = As(), u = I(c);
		Z(u);
		var d = R(u, 2), f = I(d);
		k(d);
		var p = R(d, 2), m = R(p, 2);
		k(c), z((e, t, n) => {
			Q(u, "aria-label", e), wa(u, s().name ?? o()), q(f, `.${o() ?? ""}`), Q(p, "aria-pressed", H(i) === o()), Q(p, "aria-label", t), Q(m, "aria-label", n);
		}, [
			() => `${H(n)("design.name")} · ${o()}`,
			() => H(n)("design.edit", { name: s().name ?? o() }),
			() => H(n)("design.delete", { name: s().name ?? o() })
		]), U("change", u, (e) => t.store.designSession.update(Uo(t.store.design, o(), e.currentTarget.value))), U("click", p, () => {
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
		var t = js(), n = I(t, !0);
		k(t), z(() => q(n, H(s))), K(e, t);
	};
	J(_, (e) => {
		H(s) && e(v);
	});
	var y = R(_, 2), b = (e) => {
		let r = /* @__PURE__ */ N(() => H(i));
		{
			let i = /* @__PURE__ */ N(() => `${t.uid}-class`), a = /* @__PURE__ */ N(() => t.store.design.classes[H(r)]?.styles), o = /* @__PURE__ */ N(() => H(n)("design.classStyles", { name: t.store.design.classes[H(r)]?.name ?? H(r) }));
			ks(e, {
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
				onSet: (e) => t.store.designSession.update(Wo(t.store.design, H(r), e))
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
	]), ka(p, () => H(a), (e) => F(a, e)), ka(m, () => H(o), (e) => F(o, e)), U("click", h, c), K(e, u), j();
}
W(["change", "click"]);
// src/ui/design/TokensTab.svelte
var Fs = /* @__PURE__ */ G("<input class=\"svelte-1v1kt1m\"/>"), Is = /* @__PURE__ */ G("<tr class=\"svelte-1v1kt1m\"><th scope=\"row\" class=\"svelte-1v1kt1m\"> </th><td class=\"svelte-1v1kt1m\"> </td><td class=\"svelte-1v1kt1m\"><!></td><td class=\"svelte-1v1kt1m\"><button type=\"button\" class=\"svelte-1v1kt1m\">×</button></td></tr>"), Ls = /* @__PURE__ */ G("<option class=\"svelte-1v1kt1m\"> </option>"), Rs = /* @__PURE__ */ G("<p class=\"message svelte-1v1kt1m\" role=\"alert\"> </p>"), zs = /* @__PURE__ */ G("<table class=\"svelte-1v1kt1m\"><thead class=\"svelte-1v1kt1m\"><tr class=\"svelte-1v1kt1m\"><th scope=\"col\" class=\"svelte-1v1kt1m\"> </th><th scope=\"col\" class=\"svelte-1v1kt1m\"> </th><th scope=\"col\" class=\"svelte-1v1kt1m\"> </th><th class=\"svelte-1v1kt1m\"></th></tr></thead><tbody class=\"svelte-1v1kt1m\"></tbody></table> <div class=\"add svelte-1v1kt1m\"><input placeholder=\"color.accent\" class=\"svelte-1v1kt1m\"/> <select class=\"svelte-1v1kt1m\"></select> <input class=\"svelte-1v1kt1m\"/> <button type=\"button\" class=\"svelte-1v1kt1m\"> </button></div> <!>", 1), Bs = {
	hash: "svelte-1v1kt1m",
	code: "table.svelte-1v1kt1m {width:100%;border-collapse:collapse;font-size:.78rem;}th.svelte-1v1kt1m, td.svelte-1v1kt1m {text-align:left;padding:.2rem;border-bottom:1px solid var(--cpb-border);}input.svelte-1v1kt1m, select.svelte-1v1kt1m {width:100%;box-sizing:border-box;font:inherit;font-size:.78rem;padding:.2rem .35rem;border:1px solid var(--cpb-border);border-radius:5px;}.add.svelte-1v1kt1m {display:grid;grid-template-columns:1fr auto 1fr auto;gap:.25rem;margin-top:.5rem;}button.svelte-1v1kt1m {font:inherit;font-size:.78rem;padding:.2rem .5rem;border:1px solid var(--cpb-border);border-radius:5px;background:var(--cpb-surface);cursor:pointer;}.message.svelte-1v1kt1m {color:var(--cpb-danger);font-size:.75rem;}.svelte-1v1kt1m:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Vs(e, t) {
	A(t, !0), X(e, Bs);
	let n = /* @__PURE__ */ N(() => t.store.t), r = /* @__PURE__ */ N(() => Object.entries(t.store.design.tokens)), i = /* @__PURE__ */ P(""), a = /* @__PURE__ */ P("color"), o = /* @__PURE__ */ P(""), s = /* @__PURE__ */ P(null), c = (e, t) => pe(e, t) !== null;
	function l(e, r) {
		let i = t.store.design.tokens[e];
		i && (c(i.type, r) ? (F(s, null), t.store.designSession.update(Vo(t.store.design, e, {
			...i,
			value: r
		}))) : F(s, H(n)("design.badValue"), !0));
	}
	function u() {
		!zo.test(H(i)) || H(i) in t.store.design.tokens ? F(s, H(n)("design.badId"), !0) : c(H(a), H(o)) ? (F(s, null), t.store.designSession.update(Vo(t.store.design, H(i), {
			type: H(a),
			value: H(o)
		})), F(i, ""), F(o, "")) : F(s, H(n)("design.badValue"), !0);
	}
	async function d(e) {
		let r = await t.store.session.transport.designUsages?.("token", e).catch(() => []) ?? [], i = [...Jo(t.store.design, e), ...r.map((e) => e.title)];
		i.length > 0 ? F(s, H(n)("design.inUse", {
			name: e,
			where: i.join(", ")
		}), !0) : (F(s, null), t.store.designSession.update(Ho(t.store.design, e)));
	}
	var f = zs(), p = L(f), m = I(p), h = I(m), g = I(h), _ = I(g, !0);
	k(g);
	var v = R(g), b = I(v, !0);
	k(v);
	var x = R(v), S = I(x, !0);
	k(x), en(), k(h), k(m);
	var C = R(m);
	Y(C, 21, () => H(r), ([e, t]) => e, (e, t) => {
		var r = /* @__PURE__ */ N(() => st(H(t), 2));
		let i = () => H(r)[0], a = () => H(r)[1];
		var o = Is(), s = I(o), c = I(s, !0);
		k(s);
		var u = R(s), f = I(u, !0);
		k(u);
		var p = R(u), m = I(p), h = (e) => {
			var t = Fs();
			Z(t), z((e) => {
				Q(t, "aria-label", e), wa(t, a().value);
			}, [() => `${H(n)("design.value")} · ${i()}`]), U("change", t, (e) => l(i(), e.currentTarget.value)), K(e, t);
		}, g = (e) => {
			var t = Gi();
			z(() => q(t, `→ ${a().value.token ?? ""}`)), K(e, t);
		};
		J(m, (e) => {
			typeof a().value == "string" ? e(h) : e(g, -1);
		}), k(p);
		var _ = R(p), v = I(_);
		k(_), k(o), z((e) => {
			q(c, i()), q(f, a().type), Q(v, "aria-label", e);
		}, [() => H(n)("design.delete", { name: i() })]), U("click", v, () => d(i())), K(e, o);
	}), k(C), k(p);
	var w = R(p, 2), T = I(w);
	Z(T);
	var ee = R(T, 2);
	Y(ee, 20, () => y.tokenTypes, (e) => e, (e, t) => {
		var n = Ls(), r = I(n, !0);
		k(n);
		var i = {};
		z(() => {
			q(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
		}), K(e, n);
	}), k(ee);
	var E = R(ee, 2);
	Z(E);
	var te = R(E, 2), ne = I(te, !0);
	k(te), k(w);
	var re = R(w, 2), ie = (e) => {
		var t = Rs(), n = I(t, !0);
		k(t), z(() => q(n, H(s))), K(e, t);
	};
	J(re, (e) => {
		H(s) && e(ie);
	}), z((e, n, r, i, a, o, s) => {
		q(_, e), q(b, n), q(S, r), Q(T, "aria-label", i), Q(ee, "aria-label", a), Q(E, "aria-label", o), Q(E, "id", `${t.uid}-token-value`), q(ne, s);
	}, [
		() => H(n)("design.id"),
		() => H(n)("design.type"),
		() => H(n)("design.value"),
		() => H(n)("design.id"),
		() => H(n)("design.type"),
		() => H(n)("design.value"),
		() => H(n)("design.add")
	]), ka(T, () => H(i), (e) => F(i, e)), va(ee, () => H(a), (e) => F(a, e)), ka(E, () => H(o), (e) => F(o, e)), U("click", te, u), K(e, f), j();
}
W(["change", "click"]);
// src/ui/design/DesignPanel.svelte
var Hs = /* @__PURE__ */ G("<button type=\"button\" role=\"tab\" class=\"svelte-m57uux\"> </button>"), Us = /* @__PURE__ */ G("<li class=\"svelte-m57uux\"><code class=\"svelte-m57uux\"> </code> </li>"), Ws = /* @__PURE__ */ G("<div class=\"problems svelte-m57uux\" role=\"alert\"><p class=\"svelte-m57uux\"> </p> <ul class=\"svelte-m57uux\"></ul></div>"), Gs = /* @__PURE__ */ G("<button type=\"button\" class=\"svelte-m57uux\"> </button>"), Ks = /* @__PURE__ */ G("<section class=\"design svelte-m57uux\"><div class=\"head svelte-m57uux\"><h2 class=\"svelte-m57uux\"> </h2> <button type=\"button\" class=\"svelte-m57uux\">×</button></div> <p class=\"meta svelte-m57uux\"> </p> <p class=\"help svelte-m57uux\"> </p> <div class=\"tabs svelte-m57uux\" role=\"tablist\"></div> <div role=\"tabpanel\" class=\"svelte-m57uux\"><!></div> <!> <div class=\"actions svelte-m57uux\"><button type=\"button\" class=\"svelte-m57uux\"> </button> <button type=\"button\" class=\"primary svelte-m57uux\"> </button> <!></div></section>"), qs = {
	hash: "svelte-m57uux",
	code: ".design.svelte-m57uux {padding:.5rem .75rem;overflow:auto;border-left:1px solid var(--cpb-border);display:grid;gap:.5rem;align-content:start;}.head.svelte-m57uux {display:flex;justify-content:space-between;align-items:center;}h2.svelte-m57uux {font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin:0;color:var(--cpb-muted);}.meta.svelte-m57uux, .help.svelte-m57uux {margin:0;font-size:.75rem;color:var(--cpb-muted);}.tabs.svelte-m57uux {display:flex;gap:.25rem;}.tabs.svelte-m57uux button[aria-selected='true']:where(.svelte-m57uux) {background:var(--cpb-accent-soft);border-color:var(--cpb-accent);}.problems.svelte-m57uux {color:var(--cpb-danger);font-size:.75rem;}.problems.svelte-m57uux p:where(.svelte-m57uux) {margin:0;}.actions.svelte-m57uux {display:flex;flex-wrap:wrap;gap:.35rem;}button.svelte-m57uux {font:inherit;font-size:.8rem;padding:.3rem .6rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.primary.svelte-m57uux {background:var(--cpb-accent);border-color:var(--cpb-accent);color:#fff;}button.svelte-m57uux:disabled {opacity:.5;cursor:not-allowed;}.svelte-m57uux:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Js(e, t) {
	A(t, !0), X(e, qs);
	let n = Fa(t, "store", 7), r = /* @__PURE__ */ N(() => n().t), i = /* @__PURE__ */ P("tokens"), a = /* @__PURE__ */ N(() => ke(n().design, []).diagnostics), o = /* @__PURE__ */ N(() => !n().designDirty && n().designPublished !== n().designRevision && n().designRevision > 0 && typeof n().session.transport.publishDesign == "function");
	var s = Ks(), c = I(s), l = I(c), u = I(l, !0);
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
		var a = /* @__PURE__ */ N(() => st(n, 2));
		let o = () => H(a)[0], s = () => H(a)[1];
		var c = Hs(), l = I(c, !0);
		k(c), z((e) => {
			Q(c, "aria-selected", H(i) === o()), Q(c, "aria-controls", `${t.uid}-design-${o()}`), q(l, e);
		}, [() => H(r)(s())]), U("click", c, () => {
			F(i, o(), !0);
		}), K(e, c);
	}), k(g);
	var _ = R(g, 2), v = I(_), y = (e) => {
		Vs(e, {
			get store() {
				return n();
			},
			get uid() {
				return t.uid;
			}
		});
	}, b = (e) => {
		Ps(e, {
			get store() {
				return n();
			},
			get uid() {
				return t.uid;
			}
		});
	}, x = (e) => {
		Qo(e, { get store() {
			return n();
		} });
	};
	J(v, (e) => {
		H(i) === "tokens" ? e(y) : H(i) === "classes" ? e(b, 1) : e(x, -1);
	}), k(_);
	var S = R(_, 2), C = (e) => {
		var t = Ws(), n = I(t), i = I(n, !0);
		k(n);
		var o = R(n, 2);
		Y(o, 21, () => H(a), (e) => e.path, (e, t) => {
			var n = Us(), r = I(n), i = I(r, !0);
			k(r);
			var a = R(r);
			k(n), z(() => {
				q(i, H(t).path), q(a, ` · ${H(t).code ?? ""}`);
			}), K(e, n);
		}), k(o), k(t), z((e) => q(i, e), [() => H(r)("design.problems")]), K(e, t);
	};
	J(S, (e) => {
		H(a).length > 0 && e(C);
	});
	var w = R(S, 2), T = I(w), ee = I(T, !0);
	k(T);
	var E = R(T, 2), te = I(E, !0);
	k(E);
	var ne = R(E, 2), re = (e) => {
		var t = Gs(), i = I(t, !0);
		k(t), z((e) => q(i, e), [() => H(r)("design.reload")]), U("click", t, () => n().designAction("reload")), K(e, t);
	};
	J(ne, (e) => {
		n().designDirty && e(re);
	}), k(w), k(s), z((e, r, c, f, m, g, v) => {
		Q(s, "aria-labelledby", `${t.uid}-design-title`), Q(l, "id", `${t.uid}-design-title`), q(u, e), Q(d, "aria-label", r), q(p, `${c ?? ""} ·
    ${f ?? ""}`), q(h, m), Q(_, "id", `${t.uid}-design-${H(i)}`), T.disabled = !n().designDirty || H(a).length > 0 || !n().designSession.editable, q(ee, g), E.disabled = !H(o), q(te, v);
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
var Ys = /* @__PURE__ */ G("<label class=\"svelte-181fmze\"> </label> <input required=\"\" maxlength=\"200\" class=\"svelte-181fmze\"/> <label class=\"svelte-181fmze\"> </label> <input maxlength=\"100\" class=\"svelte-181fmze\"/>", 1), Xs = {
	hash: "svelte-181fmze",
	code: "label.svelte-181fmze {display:block;font-size:.8rem;font-weight:600;margin:.5rem 0 .25rem;}input.svelte-181fmze {width:100%;box-sizing:border-box;font:inherit;padding:.35rem .5rem;border:1px solid var(--cpb-border);border-radius:6px;}"
};
function Zs(e, t) {
	A(t, !0), X(e, Xs);
	let n = Fa(t, "open", 15, !1), r = /* @__PURE__ */ N(() => t.store.t), i = /* @__PURE__ */ P(""), a = /* @__PURE__ */ P("general"), o = /* @__PURE__ */ P(!1);
	async function s() {
		if (!t.nodeId || H(i).trim() === "") return;
		F(o, !0);
		let e = await t.content.saveTemplate(t.nodeId, H(i).trim(), H(a).trim() || "general");
		F(o, !1), e && (F(i, ""), n(!1));
	}
	{
		let c = /* @__PURE__ */ N(() => H(r)("template.title")), l = /* @__PURE__ */ N(() => `${t.uid}-template`), u = /* @__PURE__ */ N(() => H(r)("template.submit")), d = /* @__PURE__ */ N(() => H(r)("dialog.cancel"));
		Fo(e, {
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
				var o = Ys(), s = L(o), c = I(s, !0);
				k(s);
				var l = R(s, 2);
				Z(l);
				var u = R(l, 2), d = I(u, !0);
				k(u);
				var f = R(u, 2);
				Z(f), z((e, n) => {
					Q(s, "for", `${t.uid}-template-name`), q(c, e), Q(l, "id", `${t.uid}-template-name`), Q(u, "for", `${t.uid}-template-category`), q(d, n), Q(f, "id", `${t.uid}-template-category`);
				}, [() => H(r)("template.name"), () => H(r)("template.category")]), ka(l, () => H(i), (e) => F(i, e)), ka(f, () => H(a), (e) => F(a, e)), K(e, o);
			},
			$$slots: { default: !0 }
		});
	}
	j();
}
// src/ui/drag/indicator.ts
var Qs = "ceiba-drop-indicator", $s = (e, t, n, r) => {
	let i = e.getElementById(Qs);
	i || (i = e.createElement("div"), i.id = Qs, i.setAttribute("aria-hidden", "true"), e.body.append(i));
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
}, ec = (e) => {
	e?.getElementById(Qs)?.remove();
}, tc = (e, t, n, r) => {
	let i = t <= 0 ? .5 : (n - e) / t;
	return r ? i < .25 ? "before" : i > .75 ? "after" : "inside" : i < .5 ? "before" : "after";
}, nc = (e, t, n, r) => t.kind === "move" ? {
	kind: "move",
	id: t.id,
	parent: n,
	index: r
} : {
	kind: "insert",
	parent: n,
	index: r,
	node: t.node
}, rc = (e, t, n, r, i) => {
	let a;
	if (r === null || !e.nodes[r]) a = nc(e, n, null, e.rootIds.length);
	else if (i === "inside") a = nc(e, n, r, e.nodes[r]?.children.length ?? 0);
	else {
		let t = e.nodes[r]?.parent ?? null;
		a = nc(e, n, t, Ae(e, t).indexOf(r) + +(i === "after"));
	}
	let o = r !== null && e.nodes[r] ? r : null;
	if (n.kind === "move" && a.kind === "move" && ic(e, n.id, a.parent, a.index)) return {
		command: null,
		anchor: o,
		zone: i,
		refused: null
	};
	try {
		return m(e, a, t), {
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
			refused: e instanceof Ge ? e.code : "SERVER"
		};
	}
}, ic = (e, t, n, r) => {
	if (e.nodes[t]?.parent !== n) return !1;
	let i = Ae(e, n).indexOf(t);
	return r === i || r === i + 1;
}, ac = 5, oc = class {
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
			!this.active && Math.hypot(e.clientX - r.x, e.clientY - r.y) < ac || (this.active || this.begin({
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
			if (!this.active && Math.hypot(e.clientX - i.x, e.clientY - i.y) < ac) return;
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
		let i = n.elementFromPoint(e, t)?.closest("[data-ceiba-id]") ?? null, a = i?.dataset.ceibaId ?? null, o = a ? this.store.tree.nodes[a] : void 0, s = i?.getBoundingClientRect(), c = o ? this.store.catalogue?.get(o.type)?.isContainer ?? !1 : !1, l = s ? tc(s.top, s.height, t, c) : "inside";
		this.active.target = rc(this.store.tree, r, this.active.dragged, a, l), $s(n, i, l, this.active.target.refused !== null);
	}
	clearTarget() {
		this.active && (this.active.target = null), ec(this.doc);
	}
	finish(e) {
		let t = this.active;
		if (this.active = null, ec(this.doc), this.frame && (this.frame.style.pointerEvents = ""), this.doc?.body.classList.remove("ceiba-dragging"), document.removeEventListener("keydown", this.onKey, !0), this.doc?.removeEventListener("keydown", this.onKey, !0), !t) return;
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
}, sc = /* @__PURE__ */ G("<li class=\"svelte-239l1j\"> <button type=\"button\" class=\"svelte-239l1j\">×</button></li>"), cc = /* @__PURE__ */ G("<option class=\"svelte-239l1j\"> </option>"), lc = /* @__PURE__ */ G("<select class=\"svelte-239l1j\"><option class=\"svelte-239l1j\"> </option><!></select>"), uc = /* @__PURE__ */ G("<div class=\"classes svelte-239l1j\"><label class=\"svelte-239l1j\"> </label> <ul class=\"svelte-239l1j\"></ul> <!></div>"), dc = {
	hash: "svelte-239l1j",
	code: ".classes.svelte-239l1j {margin:.5rem 0;display:grid;gap:.25rem;}label.svelte-239l1j {font-size:.75rem;font-weight:600;}ul.svelte-239l1j {list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:.25rem;}li.svelte-239l1j {font-size:.75rem;padding:.1rem .2rem .1rem .5rem;border-radius:999px;background:var(--cpb-accent-soft);display:flex;align-items:center;gap:.25rem;}button.svelte-239l1j {font:inherit;border:none;background:none;cursor:pointer;padding:0 .25rem;}select.svelte-239l1j {font:inherit;font-size:.8rem;padding:.25rem .4rem;border:1px solid var(--cpb-border);border-radius:6px;}.svelte-239l1j:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function fc(e, t) {
	A(t, !0), X(e, dc);
	let n = /* @__PURE__ */ N(() => t.store.t), r = /* @__PURE__ */ N(() => t.node.fields.styles), i = /* @__PURE__ */ N(() => H(r)?.classes ?? []), a = /* @__PURE__ */ N(() => Object.entries(t.store.design.classes).filter(([e]) => !H(i).includes(e)));
	function o(e) {
		let n = xe(H(r), e);
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
	var s = Ki(), c = L(s), l = (e) => {
		var r = uc(), s = I(r), c = I(s, !0);
		k(s);
		var l = R(s, 2);
		Y(l, 20, () => H(i), (e) => e, (e, r) => {
			var a = sc(), s = I(a), c = R(s);
			k(a), z((e) => {
				q(s, `${t.store.design.classes[r]?.name ?? r ?? ""} `), Q(c, "aria-label", e);
			}, [() => H(n)("styles.removeClass", { name: t.store.design.classes[r]?.name ?? r })]), U("click", c, () => o(H(i).filter((e) => e !== r))), K(e, a);
		}), k(l);
		var u = R(l, 2), d = (e) => {
			var r = lc(), s = I(r), c = I(s, !0);
			k(s), s.value = s.__value = "", Y(R(s), 17, () => H(a), ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ N(() => st(H(t), 2));
				let r = () => H(n)[0], i = () => H(n)[1];
				var a = cc(), o = I(a, !0);
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
var pc = (e) => typeof e == "object" && e && !Array.isArray(e) ? e : {}, mc = (e) => {
	let t = pc(e), n = typeof t.source == "string" ? t.source : "", r = pc(t.sort);
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
		filters: Object.entries(pc(t.filters)).map(([e, t]) => `${e}=${String(t)}`).join("\n")
	};
}, hc = (e) => {
	if (e.trim() === "") return;
	let t = Number(e);
	return Number.isInteger(t) && t >= 0 ? t : null;
}, gc = (e) => {
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
		let e = hc(r);
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
}, _c = /* @__PURE__ */ G("<div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input class=\"svelte-1v8f4it\"/></div>"), vc = /* @__PURE__ */ G("<div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input type=\"url\" class=\"svelte-1v8f4it\"/></div>"), yc = /* @__PURE__ */ G("<div class=\"grid svelte-1v8f4it\"><div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input class=\"svelte-1v8f4it\"/></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input class=\"svelte-1v8f4it\"/></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input inputmode=\"numeric\" class=\"svelte-1v8f4it\"/></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input inputmode=\"numeric\" class=\"svelte-1v8f4it\"/></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input class=\"svelte-1v8f4it\"/></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label> <select class=\"svelte-1v8f4it\"><option class=\"svelte-1v8f4it\">ASC</option><option class=\"svelte-1v8f4it\">DESC</option></select></div></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><textarea rows=\"3\" class=\"svelte-1v8f4it\"></textarea></div>", 1), bc = /* @__PURE__ */ G("<p class=\"error svelte-1v8f4it\" role=\"alert\"> </p>"), xc = /* @__PURE__ */ G("<details class=\"advanced svelte-1v8f4it\"><summary class=\"svelte-1v8f4it\"> </summary> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label> <select class=\"svelte-1v8f4it\"><option class=\"svelte-1v8f4it\"> </option><option class=\"svelte-1v8f4it\"> </option><option class=\"svelte-1v8f4it\"> </option></select></div> <!> <!> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input class=\"svelte-1v8f4it\"/></div> <!> <button type=\"button\" class=\"svelte-1v8f4it\"> </button></details>"), Sc = {
	hash: "svelte-1v8f4it",
	code: ".advanced.svelte-1v8f4it {margin-top:1rem;border-top:1px solid var(--cpb-border);padding-top:.5rem;}summary.svelte-1v8f4it {cursor:pointer;font-size:.8rem;font-weight:700;}.grid.svelte-1v8f4it {display:grid;grid-template-columns:1fr 1fr;gap:0 .5rem;}.field.svelte-1v8f4it {display:grid;gap:.25rem;margin:.5rem 0;}label.svelte-1v8f4it {font-size:.75rem;font-weight:600;}input.svelte-1v8f4it, select.svelte-1v8f4it, textarea.svelte-1v8f4it {font:inherit;font-size:.8rem;padding:.3rem .45rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}.error.svelte-1v8f4it {color:var(--cpb-danger);font-size:.75rem;margin:0;}button.svelte-1v8f4it {font:inherit;font-size:.8rem;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}.svelte-1v8f4it:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Cc(e, t) {
	A(t, !0), X(e, Sc);
	let n = /* @__PURE__ */ N(() => t.store.t), r = pr(Ai(() => mc(t.node.fields.loop))), i = /* @__PURE__ */ P(pr(Ai(() => typeof t.node.fields.condition == "string" ? t.node.fields.condition : ""))), a = /* @__PURE__ */ P(null), o = (e) => `${t.uid}-adv-${e}`;
	function s() {
		let e = gc(r);
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
	var c = xc(), l = I(c), u = I(l, !0);
	k(l);
	var d = R(l, 2), f = I(d), p = I(f, !0);
	k(f);
	var m = R(f, 2), h = I(m), g = I(h, !0);
	k(h), h.value = h.__value = "none";
	var _ = R(h), v = I(_, !0);
	k(_), _.value = _.__value = "module";
	var y = R(_), b = I(y, !0);
	k(y), y.value = y.__value = "api", k(m), k(d);
	var x = R(d, 2), S = (e) => {
		var t = _c(), i = I(t), a = I(i, !0);
		k(i);
		var s = R(i);
		Z(s), k(t), z((e, t, n) => {
			Q(i, "for", e), q(a, t), Q(s, "id", n);
		}, [
			() => o("module"),
			() => H(n)("advanced.moduleSlug"),
			() => o("module")
		]), ka(s, () => r.module, (e) => r.module = e), K(e, t);
	}, C = (e) => {
		var t = vc(), i = I(t), a = I(i, !0);
		k(i);
		var s = R(i);
		Z(s), k(t), z((e, t, n) => {
			Q(i, "for", e), q(a, t), Q(s, "id", n);
		}, [
			() => o("api"),
			() => H(n)("advanced.apiUrl"),
			() => o("api")
		]), ka(s, () => r.api, (e) => r.api = e), K(e, t);
	};
	J(x, (e) => {
		r.sourceType === "module" ? e(S) : r.sourceType === "api" && e(C, 1);
	});
	var w = R(x, 2), T = (e) => {
		var t = yc(), i = L(t), a = I(i), s = I(a), c = I(s, !0);
		k(s);
		var l = R(s);
		Z(l), k(a);
		var u = R(a, 2), d = I(u), f = I(d, !0);
		k(d);
		var p = R(d);
		Z(p), k(u);
		var m = R(u, 2), h = I(m), g = I(h, !0);
		k(h);
		var _ = R(h);
		Z(_), k(m);
		var v = R(m, 2), y = I(v), b = I(y, !0);
		k(y);
		var x = R(y);
		Z(x), k(v);
		var S = R(v, 2), C = I(S), w = I(C, !0);
		k(C);
		var T = R(C);
		Z(T), k(S);
		var ee = R(S, 2), E = I(ee), te = I(E, !0);
		k(E);
		var ne = R(E, 2), re = I(ne);
		re.value = re.__value = "ASC";
		var ie = R(re);
		ie.value = ie.__value = "DESC", k(ne), k(ee), k(i);
		var ae = R(i, 2), oe = I(ae), se = I(oe, !0);
		k(oe);
		var ce = R(oe);
		Or(ce), k(ae), z((e, t, n, r, i, a, o, u, m, v, S, ee, re, ie, ae, le, ue, de, fe, pe, me) => {
			Q(s, "for", e), q(c, t), Q(l, "id", n), Q(d, "for", r), q(f, i), Q(p, "id", a), Q(h, "for", o), q(g, u), Q(_, "id", m), Q(y, "for", v), q(b, S), Q(x, "id", ee), Q(C, "for", re), q(w, ie), Q(T, "id", ae), Q(E, "for", le), q(te, ue), Q(ne, "id", de), Q(oe, "for", fe), q(se, pe), Q(ce, "id", me);
		}, [
			() => o("variable"),
			() => H(n)("advanced.variable"),
			() => o("variable"),
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
			() => o("direction"),
			() => o("filters"),
			() => H(n)("advanced.filters"),
			() => o("filters")
		]), ka(l, () => r.variable, (e) => r.variable = e), ka(p, () => r.key, (e) => r.key = e), ka(_, () => r.limit, (e) => r.limit = e), ka(x, () => r.offset, (e) => r.offset = e), ka(T, () => r.sortColumn, (e) => r.sortColumn = e), va(ne, () => r.sortDirection, (e) => r.sortDirection = e), ka(ce, () => r.filters, (e) => r.filters = e), K(e, t);
	};
	J(w, (e) => {
		r.sourceType !== "none" && e(T);
	});
	var ee = R(w, 2), E = I(ee), te = I(E, !0);
	k(E);
	var ne = R(E);
	Z(ne), k(ee);
	var re = R(ee, 2), ie = (e) => {
		var t = bc(), n = I(t, !0);
		k(t), z(() => q(n, H(a))), K(e, t);
	};
	J(re, (e) => {
		H(a) && e(ie);
	});
	var ae = R(re, 2), oe = I(ae, !0);
	k(ae), k(c), z((e, t, n, r, i, a, o, s, c, l, d) => {
		q(u, e), Q(f, "for", t), q(p, n), Q(m, "id", r), q(g, i), q(v, a), q(b, o), Q(E, "for", s), q(te, c), Q(ne, "id", l), q(oe, d);
	}, [
		() => H(n)("advanced.title"),
		() => o("source"),
		() => H(n)("advanced.source"),
		() => o("source"),
		() => H(n)("advanced.none"),
		() => H(n)("advanced.module"),
		() => H(n)("advanced.api"),
		() => o("condition"),
		() => H(n)("advanced.condition"),
		() => o("condition"),
		() => H(n)("advanced.apply")
	]), va(m, () => r.sourceType, (e) => r.sourceType = e), ka(ne, () => H(i), (e) => F(i, e)), U("click", ae, s), K(e, c), j();
}
W(["click"]);
// src/ui/inspector/fields.ts
var wc = {
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
}, Tc = /* @__PURE__ */ new Set([
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
]), Ec = (e) => e.charAt(0).toUpperCase() + e.slice(1).replace(/[_-]/g, " "), Dc = (e) => {
	let t = [], n = /* @__PURE__ */ new Set();
	for (let [r, i] of Object.entries(e.editorControls)) {
		let e = i, a = e.options?.map(String);
		t.push({
			key: r,
			label: e.label ?? Ec(r),
			control: wc[e.type ?? ""] ?? "text",
			...a ? { options: a } : {}
		}), n.add(r);
	}
	for (let [r, i] of Object.entries(e.propsSchema)) {
		if (n.has(r)) continue;
		let e = i, a = e.enum?.map(String);
		t.push({
			key: r,
			label: Ec(r),
			control: a ? "select" : wc[e.type ?? ""] ?? "text",
			...a ? { options: a } : {}
		}), n.add(r);
	}
	return Object.keys(e.propsSchema).length === 0 && Object.keys(e.editorControls).length === 0 && (Tc.has(e.type) && t.push({
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
}, Oc = (e, t) => {
	if (e.control === "checkbox") return { value: t === !0 };
	if (e.control === "lines") return { value: String(t).replace(/\r/g, "").split("\n").filter((e) => e.trim() !== "").slice(0, 100) };
	let n = String(t);
	if (e.control === "number") {
		if (n.trim() === "") return { value: null };
		let e = Number(n);
		return Number.isFinite(e) ? { value: e } : { error: "field.number" };
	}
	return (e.control === "url" || e.control === "media") && n.trim() !== "" && La(n) === "" ? { error: "field.url" } : e.control === "select" && e.options && !e.options.includes(n) ? { error: "field.option" } : e.control === "select" && e.options?.every((e) => /^\d+$/.test(e)) ? { value: Number(n) } : { value: n };
}, kc = /* @__PURE__ */ G("<label class=\"svelte-1g42mo8\"><input type=\"checkbox\" class=\"svelte-1g42mo8\"/> </label>"), Ac = /* @__PURE__ */ G("<textarea rows=\"3\" class=\"svelte-1g42mo8\"></textarea>"), jc = /* @__PURE__ */ G("<option> </option>"), Mc = /* @__PURE__ */ G("<select class=\"svelte-1g42mo8\"></select>"), Nc = /* @__PURE__ */ G("<input class=\"svelte-1g42mo8\"/>"), Pc = /* @__PURE__ */ G("<label class=\"svelte-1g42mo8\"> </label> <!>", 1), Fc = /* @__PURE__ */ G("<p class=\"error svelte-1g42mo8\" role=\"alert\"> </p>"), Ic = /* @__PURE__ */ G("<div class=\"field svelte-1g42mo8\"><!> <!></div>"), Lc = {
	hash: "svelte-1g42mo8",
	code: ".field.svelte-1g42mo8 {display:grid;gap:.25rem;margin-bottom:.75rem;}label.svelte-1g42mo8 {font-size:.8rem;font-weight:600;}input.svelte-1g42mo8:not([type='checkbox']), textarea.svelte-1g42mo8, select.svelte-1g42mo8 {font:inherit;font-size:.875rem;padding:.35rem .5rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}[aria-invalid='true'].svelte-1g42mo8 {border-color:var(--cpb-danger);}input.svelte-1g42mo8:focus-visible, textarea.svelte-1g42mo8:focus-visible, select.svelte-1g42mo8:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}.error.svelte-1g42mo8 {color:var(--cpb-danger);font-size:.75rem;margin:0;}"
};
function Rc(e, t) {
	A(t, !0), X(e, Lc);
	let n = /* @__PURE__ */ P(null), r = /* @__PURE__ */ N(() => Array.isArray(t.value) ? t.value.filter((e) => typeof e == "string").join("\n") : t.value === null || t.value === void 0 || typeof t.value == "object" ? "" : String(t.value));
	function i(e) {
		let r = Oc(t.field, e);
		"error" in r ? F(n, t.t(r.error), !0) : (F(n, null), t.onChange(r.value));
	}
	var a = Ic(), o = I(a), s = (e) => {
		var n = kc(), r = I(n);
		Z(r);
		var a = R(r);
		k(n), z(() => {
			Q(r, "id", t.id), Ta(r, t.value === !0), q(a, ` ${t.field.label ?? ""}`);
		}), U("change", r, (e) => i(e.currentTarget.checked)), K(e, n);
	}, c = (e) => {
		var a = Pc(), o = L(a), s = I(o, !0);
		k(o);
		var c = R(o, 2), l = (e) => {
			var a = Ac();
			Or(a), z(() => {
				Q(a, "id", t.id), wa(a, H(r)), Q(a, "aria-invalid", H(n) !== null), Q(a, "aria-describedby", H(n) ? `${t.id}-error` : void 0);
			}), U("input", a, (e) => {
				t.field.control !== "lines" && i(e.currentTarget.value);
			}), U("change", a, (e) => {
				t.field.control === "lines" && i(e.currentTarget.value);
			}), K(e, a);
		}, u = (e) => {
			var n = Mc();
			Y(n, 20, () => t.field.options ?? [], (e) => e, (e, t) => {
				var n = jc(), r = I(n, !0);
				k(n);
				var i = {};
				z(() => {
					q(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
				}), K(e, n);
			}), k(n);
			var a;
			_a(n), z(() => {
				Q(n, "id", t.id), a !== (a = H(r)) && (n.value = (n.__value = H(r)) ?? "", ga(n, H(r)));
			}), U("change", n, (e) => i(e.currentTarget.value)), K(e, n);
		}, d = (e) => {
			var a = Nc();
			Z(a), z(() => {
				Q(a, "id", t.id), Q(a, "type", t.field.control === "number" ? "number" : t.field.control === "url" || t.field.control === "media" ? "url" : "text"), wa(a, H(r)), Q(a, "aria-invalid", H(n) !== null), Q(a, "aria-describedby", H(n) ? `${t.id}-error` : void 0);
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
		var r = Fc(), i = I(r, !0);
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
var zc = /* @__PURE__ */ G("<img alt=\"\" class=\"svelte-18w9j5n\"/>"), Bc = /* @__PURE__ */ G("<span class=\"missing svelte-18w9j5n\"> </span>"), Vc = /* @__PURE__ */ G("<div class=\"item svelte-18w9j5n\" role=\"group\"><!> <div class=\"fields svelte-18w9j5n\"><label class=\"svelte-18w9j5n\"> </label> <input type=\"text\" class=\"svelte-18w9j5n\"/> <label class=\"svelte-18w9j5n\"> </label> <input type=\"text\" class=\"svelte-18w9j5n\"/> <div class=\"actions svelte-18w9j5n\"><button type=\"button\" class=\"svelte-18w9j5n\">↑</button> <button type=\"button\" class=\"svelte-18w9j5n\">↓</button> <button type=\"button\" class=\"svelte-18w9j5n\">×</button></div></div></div>"), Hc = /* @__PURE__ */ G("<p class=\"empty svelte-18w9j5n\"> </p>"), Uc = /* @__PURE__ */ G("<fieldset class=\"gallery svelte-18w9j5n\"><legend class=\"svelte-18w9j5n\"> </legend> <!> <button type=\"button\" class=\"svelte-18w9j5n\"> </button></fieldset>"), Wc = {
	hash: "svelte-18w9j5n",
	code: ".gallery.svelte-18w9j5n {border:1px solid var(--cpb-border);border-radius:6px;padding:.4rem .5rem;margin:0 0 .75rem;display:grid;gap:.5rem;}legend.svelte-18w9j5n {font-size:.8rem;font-weight:600;}.item.svelte-18w9j5n {display:grid;grid-template-columns:48px 1fr;gap:.4rem;}img.svelte-18w9j5n, .missing.svelte-18w9j5n {width:48px;height:48px;object-fit:cover;border-radius:6px;border:1px solid var(--cpb-border);font-size:.6rem;}.fields.svelte-18w9j5n {display:grid;gap:.15rem;}label.svelte-18w9j5n {font-size:.7rem;font-weight:600;}.actions.svelte-18w9j5n {display:flex;gap:.25rem;}input.svelte-18w9j5n, button.svelte-18w9j5n {font:inherit;font-size:.8rem;padding:.25rem .45rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}button.svelte-18w9j5n {cursor:pointer;justify-self:start;}button.svelte-18w9j5n:disabled {opacity:.4;}.empty.svelte-18w9j5n {margin:0;font-size:.8rem;color:var(--cpb-muted);}.svelte-18w9j5n:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Gc(e, t) {
	A(t, !0), X(e, Wc);
	let n = /* @__PURE__ */ N(() => t.store.t), r = /* @__PURE__ */ N(() => (Array.isArray(t.value) ? t.value : []).filter((e) => typeof e == "object" && !!e && _e(e.image)));
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
	var c = Uc(), l = I(c), u = I(l, !0);
	k(l);
	var d = R(l, 2);
	Y(d, 17, () => H(r), ta, (e, s, c) => {
		let l = /* @__PURE__ */ N(() => t.store.media.resolved[H(s).image.asset]), u = /* @__PURE__ */ N(() => c + 1);
		var d = Vc(), f = I(d), p = (e) => {
			var t = zc();
			z(() => Q(t, "src", H(l).url)), K(e, t);
		}, m = (e) => {
			var t = Bc(), r = I(t, !0);
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
		var w = R(C, 2), T = R(w, 2);
		k(S), k(h), k(d), z((e, n, i, a, o, u) => {
			Q(d, "aria-label", e), Q(g, "for", `${t.id}-${c}-caption`), q(_, n), Q(v, "id", `${t.id}-${c}-caption`), wa(v, H(s).caption ?? ""), Q(y, "for", `${t.id}-${c}-alt`), q(b, i), Q(x, "id", `${t.id}-${c}-alt`), wa(x, H(s).image.alt ?? ""), Q(x, "placeholder", H(l)?.alt ?? ""), Q(C, "aria-label", a), Q(w, "aria-label", o), w.disabled = c === H(r).length - 1, Q(T, "aria-label", u);
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
		} })), U("click", C, () => o(c, -1)), U("click", w, () => o(c, 1)), U("click", T, () => i(H(r).filter((e, t) => t !== c))), K(e, d);
	}, (e) => {
		var r = Hc(), i = I(r, !0);
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
var Kc = /* @__PURE__ */ G("<p class=\"hint svelte-2ghsnx\"> </p>"), qc = /* @__PURE__ */ G("<p class=\"locked svelte-2ghsnx\" role=\"note\"> </p>"), Jc = /* @__PURE__ */ G("<!> <!>", 1), Yc = /* @__PURE__ */ G("<button type=\"button\" class=\"svelte-2ghsnx\"> </button>"), Xc = /* @__PURE__ */ G("<p class=\"type svelte-2ghsnx\"> </p> <div class=\"field svelte-2ghsnx\"><label class=\"svelte-2ghsnx\"> </label> <input type=\"text\" class=\"svelte-2ghsnx\"/></div> <!> <!> <div class=\"actions svelte-2ghsnx\"><button type=\"button\" class=\"svelte-2ghsnx\"> </button> <!> <button type=\"button\" class=\"danger svelte-2ghsnx\"> </button></div>", 1), Zc = /* @__PURE__ */ G("<section class=\"inspector svelte-2ghsnx\"><h2 class=\"svelte-2ghsnx\"> </h2> <!></section>"), Qc = {
	hash: "svelte-2ghsnx",
	code: ".inspector.svelte-2ghsnx {padding:.5rem .75rem;overflow:auto;border-left:1px solid var(--cpb-border);}h2.svelte-2ghsnx {font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin:0 0 .5rem;color:var(--cpb-muted);}.hint.svelte-2ghsnx, .locked.svelte-2ghsnx {font-size:.85rem;color:var(--cpb-muted);}.locked.svelte-2ghsnx {color:var(--cpb-danger);}.type.svelte-2ghsnx {font-weight:700;margin:0 0 .75rem;}.field.svelte-2ghsnx {display:grid;gap:.25rem;margin-bottom:.75rem;}label.svelte-2ghsnx {font-size:.8rem;font-weight:600;}input.svelte-2ghsnx {font:inherit;font-size:.875rem;padding:.35rem .5rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}.actions.svelte-2ghsnx {display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1rem;}button.svelte-2ghsnx {font:inherit;font-size:.8rem;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.danger.svelte-2ghsnx {color:var(--cpb-danger);}button.svelte-2ghsnx:focus-visible, input.svelte-2ghsnx:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function $c(e, t) {
	A(t, !0), X(e, Qc);
	let n = Fa(t, "canTemplates", 3, !1), r = /* @__PURE__ */ N(() => t.store.t), i = /* @__PURE__ */ N(() => t.store.selection ? t.store.tree.nodes[t.store.selection] : void 0), a = /* @__PURE__ */ N(() => H(i) ? t.store.catalogue?.get(H(i).type) : void 0), o = /* @__PURE__ */ N(() => H(a) ? Dc(H(a)) : []), s = /* @__PURE__ */ N(() => {
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
	var f = Zc(), p = I(f), m = I(p, !0);
	k(p);
	var h = R(p, 2), g = (e) => {
		var t = Kc(), n = I(t, !0);
		k(t), z((e) => q(n, e), [() => H(r)("inspector.none")]), K(e, t);
	}, _ = (e) => {
		var f = Ki();
		ea(L(f), () => H(i).id, (e) => {
			var f = Xc(), p = L(f), m = I(p, !0);
			k(p);
			var h = R(p, 2), g = I(h), _ = I(g, !0);
			k(g);
			var v = R(g, 2);
			Z(v), k(h);
			var y = R(h, 2), b = (e) => {
				var t = qc(), n = I(t, !0);
				k(t), z((e) => q(n, e), [() => H(r)("inspector.locked")]), K(e, t);
			}, x = (e) => {
				var n = Ki();
				Y(L(n), 17, () => H(o), (e) => e.key, (e, n) => {
					var i = Ki(), a = L(i), o = (e) => {
						{
							let r = /* @__PURE__ */ N(() => `${t.uid}-prop-${H(n).key}`), i = /* @__PURE__ */ N(() => H(n).key === "src" || H(n).key === "image");
							us(e, {
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
						var r = Ki(), i = L(r), a = (e) => {
							{
								let r = /* @__PURE__ */ N(() => `${t.uid}-prop-${H(n).key}`);
								Gc(e, {
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
							Rc(e, {
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
				H(a) ? e(x, -1) : e(b);
			});
			var S = R(y, 2), C = (e) => {
				var n = Jc(), r = L(n);
				ks(r, {
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
						fc(e, {
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
				}), Cc(R(r, 2), {
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
			J(S, (e) => {
				H(a) && e(C);
			});
			var w = R(S, 2), T = I(w), ee = I(T, !0);
			k(T);
			var E = R(T, 2), te = (e) => {
				var n = Yc(), i = I(n, !0);
				k(n), z((e) => q(i, e), [() => H(r)("inspector.saveTemplate")]), U("click", n, function(...e) {
					t.onSaveTemplate?.apply(this, e);
				}), K(e, n);
			};
			J(E, (e) => {
				n() && e(te);
			});
			var ne = R(E, 2), re = I(ne, !0);
			k(ne), k(w), z((e, n, r) => {
				q(m, H(a)?.label ?? H(i).type), Q(g, "for", `${t.uid}-name`), q(_, e), Q(v, "id", `${t.uid}-name`), wa(v, typeof H(i).fields.label == "string" ? H(i).fields.label : ""), q(ee, n), q(re, r);
			}, [
				() => H(r)("inspector.name"),
				() => H(r)("inspector.duplicate"),
				() => H(r)("inspector.remove")
			]), U("input", v, (e) => l(e.currentTarget.value)), U("click", T, () => H(i) && t.store.run({
				kind: "duplicate",
				id: H(i).id
			})), U("click", ne, d), K(e, f);
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
var el = class {
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
				if (t instanceof Ge && t.code === "MEDIA_IN_USE" && this.transport.mediaUsages) {
					let t = await this.transport.mediaUsages(e.id), n = [...t.pages.map((e) => `«${e.title || e.pageId}»`), ...t.design ? [this.store.t("media.design")] : []];
					this.error = this.store.t("media.usedIn", { where: n.join(", ") });
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
		this.error = e instanceof Ge && e.code === "VALIDATION_FAILED" && e.details.file === "TYPE" ? t("media.typeError") : t(`error.${e instanceof Ge ? e.code : "SERVER"}`);
	}
}, tl = /* @__PURE__ */ G("<button type=\"button\" class=\"tile svelte-7v01bt\"><img loading=\"lazy\" class=\"svelte-7v01bt\"/> <span class=\"svelte-7v01bt\"> </span></button>"), nl = /* @__PURE__ */ G("<p class=\"empty svelte-7v01bt\"> </p>"), rl = /* @__PURE__ */ G("<button type=\"button\" class=\"more svelte-7v01bt\"> </button>"), il = /* @__PURE__ */ G("<div class=\"details svelte-7v01bt\" aria-live=\"polite\"><p class=\"svelte-7v01bt\"><strong class=\"svelte-7v01bt\"> </strong> <!></p> <label class=\"svelte-7v01bt\"> </label> <p class=\"help svelte-7v01bt\"> </p> <div class=\"row svelte-7v01bt\"><input type=\"text\" class=\"svelte-7v01bt\"/> <button type=\"button\" class=\"svelte-7v01bt\"> </button></div> <button type=\"button\" class=\"danger svelte-7v01bt\"> </button></div>"), al = /* @__PURE__ */ G("<p class=\"error svelte-7v01bt\" role=\"alert\"> </p>"), ol = /* @__PURE__ */ G("<div class=\"library svelte-7v01bt\"><label class=\"svelte-7v01bt\"> </label> <input type=\"search\" class=\"svelte-7v01bt\"/> <div class=\"grid svelte-7v01bt\" role=\"group\"></div> <!> <!> <!></div>"), sl = {
	hash: "svelte-7v01bt",
	code: ".library.svelte-7v01bt {display:grid;gap:.35rem;align-content:start;min-width:0;}label.svelte-7v01bt {font-size:.8rem;font-weight:600;}.grid.svelte-7v01bt {display:grid;grid-template-columns:repeat(auto-fill, minmax(96px, 1fr));gap:.4rem;max-height:320px;overflow:auto;padding:2px;}.tile.svelte-7v01bt {display:grid;gap:.2rem;padding:.25rem;border:2px solid var(--cpb-border);border-radius:8px;background:var(--cpb-surface);cursor:pointer;font:inherit;font-size:.65rem;}.tile[aria-pressed='true'].svelte-7v01bt {border-color:var(--cpb-accent);background:var(--cpb-accent-soft);}.tile.svelte-7v01bt img:where(.svelte-7v01bt) {width:100%;aspect-ratio:1;object-fit:cover;border-radius:4px;}.tile.svelte-7v01bt span:where(.svelte-7v01bt) {overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}.details.svelte-7v01bt {display:grid;gap:.3rem;border-top:1px solid var(--cpb-border);padding-top:.4rem;font-size:.8rem;}.details.svelte-7v01bt p:where(.svelte-7v01bt) {margin:0;}.help.svelte-7v01bt {color:var(--cpb-muted);font-size:.75rem;}.row.svelte-7v01bt {display:flex;gap:.3rem;}input.svelte-7v01bt, button.svelte-7v01bt {font:inherit;font-size:.8rem;padding:.3rem .5rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}.row.svelte-7v01bt input:where(.svelte-7v01bt) {flex:1;min-width:0;}button.svelte-7v01bt {cursor:pointer;}.more.svelte-7v01bt, .danger.svelte-7v01bt {justify-self:start;}.danger.svelte-7v01bt {color:var(--cpb-danger);}.empty.svelte-7v01bt {font-size:.8rem;color:var(--cpb-muted);}.error.svelte-7v01bt {color:var(--cpb-danger);font-size:.75rem;margin:0;}.svelte-7v01bt:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function cl(e, t) {
	A(t, !0), X(e, sl);
	let n = Fa(t, "browser", 7), r = /* @__PURE__ */ N(() => t.store.t), i = /* @__PURE__ */ N(() => n().selected), a = /* @__PURE__ */ P("");
	Rr(() => {
		F(a, H(i)?.alt ?? "", !0);
	});
	let o;
	function s() {
		clearTimeout(o), o = setTimeout(() => void n().load(), 250);
	}
	var c = ol(), l = I(c), u = I(l, !0);
	k(l);
	var d = R(l, 2);
	Z(d);
	var f = R(d, 2);
	Y(f, 21, () => n().items, (e) => e.id, (e, t) => {
		var r = tl(), a = I(r), o = R(a, 2), s = I(o, !0);
		k(o), k(r), z(() => {
			Q(r, "aria-pressed", H(i)?.id === H(t).id), Q(r, "title", H(t).filename), Q(a, "src", H(t).thumbnail), Q(a, "alt", H(t).alt), q(s, H(t).filename);
		}), U("click", r, () => n().select(H(t))), K(e, r);
	}, (e) => {
		var t = Ki(), i = L(t), a = (e) => {
			var t = nl(), n = I(t, !0);
			k(t), z((e) => q(n, e), [() => H(r)("media.empty")]), K(e, t);
		};
		J(i, (e) => {
			n().loading || e(a);
		}), K(e, t);
	}), k(f);
	var p = R(f, 2), m = (e) => {
		var t = rl(), i = I(t, !0);
		k(t), z((e) => {
			t.disabled = n().loading, q(i, e);
		}, [() => H(r)("media.more")]), U("click", t, () => void n().load(!0)), K(e, t);
	};
	J(p, (e) => {
		n().hasMore && e(m);
	});
	var h = R(p, 2), g = (e) => {
		var o = il(), s = I(o), c = I(s), l = I(c, !0);
		k(c);
		var u = R(c, 2), d = (e) => {
			var t = Gi();
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
		]), ka(_, () => H(a), (e) => F(a, e)), U("click", v, () => void n().describe(H(a))), U("click", b, () => void n().remove()), K(e, o);
	};
	J(h, (e) => {
		H(i) && e(g);
	});
	var _ = R(h, 2), v = (e) => {
		var t = al(), r = I(t, !0);
		k(t), z(() => q(r, n().error)), K(e, t);
	};
	J(_, (e) => {
		n().error && e(v);
	}), k(c), z((e, r) => {
		Q(l, "for", `${t.uid}-search`), q(u, e), Q(d, "id", `${t.uid}-search`), Q(f, "aria-label", r), Q(f, "aria-busy", n().loading);
	}, [() => H(r)("media.search"), () => H(r)("media.library")]), U("input", d, s), ka(d, () => n().search, (e) => n().search = e), K(e, c), j();
}
W(["input", "click"]);
// src/ui/media/UploadForm.svelte
var ll = /* @__PURE__ */ G("<p class=\"error svelte-1l55g1o\" role=\"alert\"> </p>"), ul = /* @__PURE__ */ G("<label class=\"check svelte-1l55g1o\"><input type=\"checkbox\" class=\"svelte-1l55g1o\"/> </label>"), dl = /* @__PURE__ */ G("<fieldset class=\"svelte-1l55g1o\"><legend class=\"svelte-1l55g1o\"> </legend> <!></fieldset>"), fl = /* @__PURE__ */ G("<form class=\"upload svelte-1l55g1o\"><h3 class=\"svelte-1l55g1o\"> </h3> <label class=\"svelte-1l55g1o\"> </label> <input type=\"file\" class=\"svelte-1l55g1o\"/> <!> <label class=\"svelte-1l55g1o\"> </label> <input type=\"text\" class=\"svelte-1l55g1o\"/> <!> <label class=\"check svelte-1l55g1o\"><input type=\"checkbox\" class=\"svelte-1l55g1o\"/> </label> <label class=\"check svelte-1l55g1o\"><input type=\"checkbox\" class=\"svelte-1l55g1o\"/> </label> <button type=\"submit\" class=\"svelte-1l55g1o\"> </button></form>"), pl = {
	hash: "svelte-1l55g1o",
	code: ".upload.svelte-1l55g1o {display:grid;gap:.3rem;padding:.5rem;border:1px solid var(--cpb-border);border-radius:8px;}h3.svelte-1l55g1o {font-size:.85rem;margin:0;}label.svelte-1l55g1o {font-size:.8rem;font-weight:600;}.check.svelte-1l55g1o {font-weight:400;display:flex;gap:.35rem;align-items:center;}fieldset.svelte-1l55g1o {border:1px solid var(--cpb-border);border-radius:6px;padding:.25rem .5rem;margin:0;}legend.svelte-1l55g1o {font-size:.8rem;font-weight:600;}input[type='text'].svelte-1l55g1o, button.svelte-1l55g1o {font:inherit;font-size:.8rem;padding:.3rem .5rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}button.svelte-1l55g1o {cursor:pointer;justify-self:start;}.error.svelte-1l55g1o {color:var(--cpb-danger);font-size:.75rem;margin:0;}.svelte-1l55g1o:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function ml(e, t) {
	A(t, !0), X(e, pl);
	let n = Fa(t, "browser", 7), r = /* @__PURE__ */ N(() => t.store.t), i = /* @__PURE__ */ P(void 0), a = /* @__PURE__ */ P(""), o = /* @__PURE__ */ P(pr([])), s = /* @__PURE__ */ P(!0), c = /* @__PURE__ */ P(!0), l = /* @__PURE__ */ P("");
	Rr(() => {
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
	var f = fl(), p = I(f), m = I(p, !0);
	k(p);
	var h = R(p, 2), g = I(h, !0);
	k(h);
	var _ = R(h, 2);
	Pa(_, (e) => F(i, e), () => H(i));
	var v = R(_, 2), y = (e) => {
		var n = ll(), r = I(n, !0);
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
		var n = dl(), i = I(n), a = I(i, !0);
		k(i), Y(R(i, 2), 16, () => t.settings.widths, (e) => e, (e, t) => {
			var n = ul(), i = I(n);
			Z(i);
			var a = R(i);
			k(n), z((e, t) => {
				Ta(i, e), q(a, ` ${t ?? ""}`);
			}, [() => H(o).includes(t), () => H(r)("media.recommended", { width: t })]), U("change", i, (e) => u(t, e.currentTarget.checked)), K(e, n);
		}), k(n), z((e) => q(a, e), [() => H(r)("media.sizes")]), K(e, n);
	};
	J(C, (e) => {
		t.settings && e(w);
	});
	var T = R(C, 2), ee = I(T);
	Z(ee);
	var E = R(ee);
	k(T);
	var te = R(T, 2), ne = I(te);
	Z(ne);
	var re = R(ne);
	k(te);
	var ie = R(te, 2), ae = I(ie, !0);
	k(ie), k(f), z((e, r, i, a, o, s, c) => {
		Q(f, "aria-labelledby", `${t.uid}-upload-title`), Q(p, "id", `${t.uid}-upload-title`), q(m, e), Q(h, "for", `${t.uid}-file`), q(g, r), Q(_, "id", `${t.uid}-file`), Q(_, "accept", i), Q(_, "aria-describedby", H(l) ? `${t.uid}-file-error` : void 0), Q(b, "for", `${t.uid}-upload-alt`), q(x, a), Q(S, "id", `${t.uid}-upload-alt`), q(E, ` ${o ?? ""}`), q(re, ` ${s ?? ""}`), ie.disabled = n().busy, q(ae, c);
	}, [
		() => H(r)("media.upload"),
		() => H(r)("media.file"),
		() => (t.settings?.accept ?? ["image/*"]).join(","),
		() => H(r)("media.alt"),
		() => H(r)("media.optimize"),
		() => H(r)("media.webp"),
		() => n().busy ? H(r)("media.uploading") : H(r)("media.upload")
	]), Ri("submit", f, d), U("change", _, () => {
		F(l, "");
	}), ka(S, () => H(a), (e) => F(a, e)), Aa(ee, () => H(s), (e) => F(s, e)), Aa(ne, () => H(c), (e) => F(c, e)), K(e, f), j();
}
W(["change"]);
// src/ui/media/MediaDialog.svelte
var hl = /* @__PURE__ */ G("<dialog class=\"svelte-1iyaart\"><h2 class=\"svelte-1iyaart\"> </h2> <div class=\"body svelte-1iyaart\"><!> <!></div> <div class=\"actions svelte-1iyaart\"><button type=\"button\" class=\"svelte-1iyaart\"> </button> <button type=\"button\" class=\"primary svelte-1iyaart\"> </button></div></dialog>"), gl = {
	hash: "svelte-1iyaart",
	code: "dialog.svelte-1iyaart {border:1px solid var(--cpb-border);border-radius:10px;padding:1rem;width:min(860px, 94vw);color:inherit;font:inherit;}dialog.svelte-1iyaart::backdrop {background:rgb(15 23 42 / .45);}h2.svelte-1iyaart {font-size:1rem;margin:0 0 .75rem;}.body.svelte-1iyaart {display:grid;grid-template-columns:minmax(0, 1fr) 260px;gap:1rem;}.actions.svelte-1iyaart {display:flex;justify-content:flex-end;gap:.5rem;margin-top:1rem;}button.svelte-1iyaart {font:inherit;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.primary.svelte-1iyaart {background:var(--cpb-accent);border-color:var(--cpb-accent);color:#fff;}button.svelte-1iyaart:disabled {opacity:.5;}.svelte-1iyaart:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}\n  @media (max-width: 700px) {.body.svelte-1iyaart {grid-template-columns:1fr;} }"
};
function _l(e, t) {
	A(t, !0), X(e, gl);
	let n = /* @__PURE__ */ N(() => t.store.t), r = /* @__PURE__ */ N(() => new el(t.store)), i = /* @__PURE__ */ P(void 0), a = null, o = /* @__PURE__ */ P(null), s = /* @__PURE__ */ N(() => t.store.media.request);
	Rr(() => {
		H(i) && (H(s) && !H(i).open ? (a = H(i).getRootNode().activeElement, H(i).showModal(), Ai(() => {
			H(r).select(null), H(r).load(), t.store.media.loadSettings().then((e) => {
				F(o, e);
			});
		})) : !H(s) && H(i).open && H(i).close());
	});
	function c() {
		let e = H(r).selected;
		e && H(s) && (t.store.media.remember(e), H(s).onPick({ asset: e.id }), t.store.media.close());
	}
	var l = hl(), u = I(l), d = I(u, !0);
	k(u);
	var f = R(u, 2), p = I(f);
	{
		let e = /* @__PURE__ */ N(() => `${t.uid}-media`);
		cl(p, {
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
		ml(m, {
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
	k(v), k(h), k(l), Pa(l, (e) => F(i, e), () => H(i)), z((e, n, i) => {
		Q(l, "aria-labelledby", `${t.uid}-media-title`), Q(u, "id", `${t.uid}-media-title`), q(d, e), q(_, n), v.disabled = !H(r).selected || H(r).busy, q(y, i);
	}, [
		() => H(n)("media.title"),
		() => H(n)("media.close"),
		() => H(n)("media.use")
	]), Ri("close", l, () => {
		t.store.media.close(), a?.focus?.();
	}), U("click", g, () => t.store.media.close()), U("click", v, c), K(e, l), j();
}
W(["click"]);
// src/ui/palette/Palette.svelte
var vl = /* @__PURE__ */ G("<button type=\"button\" class=\"wide svelte-om8jxl\"> </button>"), yl = /* @__PURE__ */ G("<li><button type=\"button\" class=\"svelte-om8jxl\"> </button></li>"), bl = /* @__PURE__ */ G("<h3 class=\"svelte-om8jxl\"> </h3> <ul class=\"svelte-om8jxl\"></ul>", 1), xl = /* @__PURE__ */ G("<li><button type=\"button\" class=\"svelte-om8jxl\"> </button></li>"), Sl = /* @__PURE__ */ G("<h3 class=\"svelte-om8jxl\"> </h3> <ul class=\"svelte-om8jxl\"></ul>", 1), Cl = /* @__PURE__ */ G("<section class=\"palette svelte-om8jxl\" aria-labelledby=\"cpb-palette-title\"><h2 id=\"cpb-palette-title\" class=\"svelte-om8jxl\"> </h2> <!> <!> <!></section>"), wl = {
	hash: "svelte-om8jxl",
	code: ".palette.svelte-om8jxl {padding:.5rem .75rem;overflow:auto;}h2.svelte-om8jxl {font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin:0 0 .5rem;color:var(--cpb-muted);}h3.svelte-om8jxl {font-size:.75rem;margin:.5rem 0 .25rem;color:var(--cpb-muted);text-transform:capitalize;}ul.svelte-om8jxl {list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2, 1fr);gap:.25rem;}button.svelte-om8jxl {touch-action:none;width:100%;font:inherit;font-size:.8rem;padding:.35rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;text-align:left;}button.svelte-om8jxl:hover {border-color:var(--cpb-accent);}.wide.svelte-om8jxl {margin-bottom:.5rem;text-align:center;}button.svelte-om8jxl:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Tl(e, t) {
	A(t, !0), X(e, wl);
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
		let r = Ao(t.store.tree, n, t.store.selection, e.type);
		t.store.run({
			kind: "insert",
			...r,
			node: Oo(n, e.type)
		}, ["announce.inserted", { label: e.label }]) && t.store.selection && t.onInserted(t.store.selection);
	}
	var o = Cl(), s = I(o), c = I(s, !0);
	k(s);
	var l = R(s, 2), u = (e) => {
		var r = vl(), i = I(r, !0);
		k(r), z((e) => q(i, e), [() => H(n)("palette.import")]), U("click", r, function(...e) {
			t.onImport?.apply(this, e);
		}), K(e, r);
	};
	J(l, (e) => {
		t.content.canImport && e(u);
	});
	var d = R(l, 2), f = (e) => {
		var r = bl(), i = L(r), a = I(i, !0);
		k(i);
		var o = R(i, 2);
		Y(o, 21, () => t.content.templates, (e) => e.id, (e, r) => {
			var i = yl(), a = I(i), o = I(a, !0);
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
		var i = /* @__PURE__ */ N(() => st(H(r), 2));
		let o = () => H(i)[0], s = () => H(i)[1];
		var c = Sl(), l = L(c), u = I(l, !0);
		k(l);
		var d = R(l, 2);
		Y(d, 21, s, (e) => e.type, (e, r) => {
			var i = xl(), o = I(i), s = I(o, !0);
			k(o), k(i), z((e) => {
				Q(o, "aria-label", e), Q(o, "data-type", H(r).type), q(s, H(r).label);
			}, [() => H(n)("palette.insert", { label: H(r).label })]), U("click", o, () => a(H(r))), U("pointerdown", o, (e) => t.store.catalogue && t.drag.pressNew(e, {
				kind: "insert",
				node: Oo(t.store.catalogue, H(r).type)
			}, H(r).label)), K(e, i);
		}), k(d), z((e) => q(u, e), [() => o().replace(/_/g, " ")]), K(e, c);
	}), k(o), z((e) => q(c, e), [() => H(n)("palette.title")]), K(e, o), j();
}
W(["click", "pointerdown"]);
// src/ui/publish/ConflictBanner.svelte
var El = /* @__PURE__ */ G("<button type=\"button\" class=\"svelte-1ti6kqq\"> </button>"), Dl = /* @__PURE__ */ G("<div class=\"conflict svelte-1ti6kqq\" role=\"alertdialog\" aria-modal=\"false\" tabindex=\"-1\"><strong> </strong> <p class=\"svelte-1ti6kqq\"> </p> <div class=\"actions svelte-1ti6kqq\"><button type=\"button\" class=\"primary svelte-1ti6kqq\"> </button> <button type=\"button\" class=\"svelte-1ti6kqq\"> </button> <!></div></div>"), Ol = {
	hash: "svelte-1ti6kqq",
	code: ".conflict.svelte-1ti6kqq {margin:.5rem .75rem 0;padding:.75rem;border:2px solid var(--cpb-danger);border-radius:8px;background:#fef2f2;}.conflict.svelte-1ti6kqq:focus-visible {outline:2px solid var(--cpb-danger);outline-offset:2px;}p.svelte-1ti6kqq {margin:.25rem 0 .5rem;font-size:.875rem;}.actions.svelte-1ti6kqq {display:flex;flex-wrap:wrap;gap:.5rem;}button.svelte-1ti6kqq {font:inherit;font-size:.85rem;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.primary.svelte-1ti6kqq {background:var(--cpb-danger);border-color:var(--cpb-danger);color:#fff;}button.svelte-1ti6kqq:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:2px;}"
};
function kl(e, t) {
	A(t, !0), X(e, Ol);
	let n = /* @__PURE__ */ N(() => t.store.t), r = /* @__PURE__ */ P(void 0);
	Rr(() => {
		t.store.status === "conflict" && Di().then(() => H(r)?.focus());
	});
	var i = Ki(), a = L(i), o = (e) => {
		var i = Dl(), a = I(i), o = I(a, !0);
		k(a);
		var s = R(a, 2), c = I(s, !0);
		k(s);
		var l = R(s, 2), u = I(l), d = I(u, !0);
		k(u);
		var f = R(u, 2), p = I(f, !0);
		k(f);
		var m = R(f, 2), h = (e) => {
			var r = El(), i = I(r, !0);
			k(r), z((e) => q(i, e), [() => H(n)("conflict.view")]), U("click", r, () => t.onView?.(t.store.conflictRevision)), K(e, r);
		};
		J(m, (e) => {
			t.onView && t.store.conflictRevision && e(h);
		}), k(l), k(i), Pa(i, (e) => F(r, e), () => H(r)), z((e, n, r, l) => {
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
var Al = /* @__PURE__ */ G("<p class=\"note svelte-ztrun4\"> </p>"), jl = /* @__PURE__ */ G("<p class=\"note svelte-ztrun4\" role=\"status\"> </p>"), Ml = /* @__PURE__ */ G("<iframe sandbox=\"\" class=\"svelte-ztrun4\"></iframe>"), Nl = /* @__PURE__ */ G("<div class=\"server svelte-ztrun4\"><div class=\"bar svelte-ztrun4\"><strong> </strong> <button type=\"button\" class=\"svelte-ztrun4\"> </button></div> <!> <!></div>"), Pl = {
	hash: "svelte-ztrun4",
	code: ".server.svelte-ztrun4 {background:var(--cpb-canvas);padding:.5rem 1rem 1rem;min-height:0;display:flex;flex-direction:column;gap:.5rem;}.bar.svelte-ztrun4 {display:flex;align-items:center;gap:.75rem;}.note.svelte-ztrun4 {margin:0;font-size:.8rem;color:var(--cpb-muted);}button.svelte-ztrun4 {margin-left:auto;font:inherit;font-size:.8rem;padding:.3rem .7rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}iframe.svelte-ztrun4 {flex:1;width:100%;min-height:480px;border:1px solid var(--cpb-border);border-radius:8px;background:#fff;}"
};
function Fl(e, t) {
	A(t, !0), X(e, Pl);
	let n = Fa(t, "stylesheets", 19, () => []), r = /* @__PURE__ */ N(() => t.store.t), i = /* @__PURE__ */ P(null);
	Rr(() => {
		let e = t.store.session.transport.render, n = t.revision;
		F(i, null), e && e.call(t.store.session.transport, t.store.session.pageId, n).then((e) => {
			n === t.revision && F(i, e, !0);
		}).catch((e) => t.store.fail(e));
	});
	let a = /* @__PURE__ */ N(() => H(i) === null ? "" : Ua(n()).replace("</head>", `<style data-cms-page>${H(i).css.replace(/<\/style/gi, "<\\/style")}</style></head>`).replace("<body></body>", `<body>${H(i).html}</body>`));
	var o = Nl(), s = I(o), c = I(s), l = I(c, !0);
	k(c);
	var u = R(c, 2), d = I(u, !0);
	k(u), k(s);
	var f = R(s, 2), p = (e) => {
		var t = Al(), n = I(t, !0);
		k(t), z((e) => q(n, e), [() => H(r)("server.dirty")]), K(e, t);
	};
	J(f, (e) => {
		t.store.dirty && e(p);
	});
	var m = R(f, 2), h = (e) => {
		var t = jl(), n = I(t, !0);
		k(t), z((e) => q(n, e), [() => H(r)("server.loading")]), K(e, t);
	}, g = (e) => {
		var t = Ml();
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
var Il = (e) => {
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
}, Ll = (e) => {
	if (!(e.ctrlKey || e.metaKey) || e.altKey) return null;
	let t = e.key.toLowerCase();
	return t === "z" ? e.shiftKey ? { type: "redo" } : { type: "undo" } : t === "y" ? { type: "redo" } : null;
}, Rl = (e, t, n) => {
	let r = Il(e), i = r[0];
	if (!i) return null;
	let a = t === null ? -1 : r.findIndex((e) => e.id === t), o = r[a];
	if (!o) return n.key === "ArrowDown" || n.key === "Home" ? {
		type: "select",
		id: i.id
	} : null;
	let s = e.nodes[o.id], c = Ae(e, o.parent), l = n.ctrlKey || n.metaKey;
	if (n.altKey && !l) switch (n.key) {
		case "ArrowUp": return o.index > 0 ? zl(o.id, o.parent, o.index - 1) : null;
		case "ArrowDown": return o.index < c.length - 1 ? zl(o.id, o.parent, o.index + 2) : null;
		case "ArrowRight": {
			let t = c[o.index - 1];
			return t ? zl(o.id, t, e.nodes[t]?.children.length ?? 0) : null;
		}
		case "ArrowLeft": {
			if (o.parent === null) return null;
			let t = e.nodes[o.parent], n = Ae(e, t?.parent ?? null);
			return zl(o.id, t?.parent ?? null, n.indexOf(o.parent) + 1);
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
	if (l || n.altKey) return Ll(n);
	switch (n.key) {
		case "ArrowDown": return Bl(r[a + 1]?.id);
		case "ArrowUp": return Bl(r[a - 1]?.id);
		case "Home": return Bl(i.id);
		case "End": return Bl(r[r.length - 1]?.id);
		case "ArrowRight": return Bl(s?.children[0]);
		case "ArrowLeft": return Bl(o.parent ?? void 0);
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
}, zl = (e, t, n) => ({
	type: "command",
	command: {
		kind: "move",
		id: e,
		parent: t,
		index: n
	}
}), Bl = (e) => e ? {
	type: "select",
	id: e
} : null, Vl = /* @__PURE__ */ G("<p class=\"empty svelte-y2i8n1\"> </p>"), Hl = /* @__PURE__ */ G("<li role=\"treeitem\" class=\"svelte-y2i8n1\"> </li>"), Ul = /* @__PURE__ */ G("<ul role=\"tree\" aria-labelledby=\"cpb-structure-title\" aria-describedby=\"cpb-structure-help\" class=\"svelte-y2i8n1\"></ul>"), Wl = /* @__PURE__ */ G("<section class=\"structure svelte-y2i8n1\" aria-labelledby=\"cpb-structure-title\"><h2 id=\"cpb-structure-title\" class=\"svelte-y2i8n1\"> </h2> <p class=\"help svelte-y2i8n1\" id=\"cpb-structure-help\"> </p> <!></section>"), Gl = {
	hash: "svelte-y2i8n1",
	code: ".structure.svelte-y2i8n1 {padding:.5rem .75rem;overflow:auto;border-top:1px solid var(--cpb-border);}h2.svelte-y2i8n1 {font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin:0;color:var(--cpb-muted);}.help.svelte-y2i8n1, .empty.svelte-y2i8n1 {font-size:.75rem;color:var(--cpb-muted);margin:.25rem 0 .5rem;}ul.svelte-y2i8n1 {list-style:none;margin:0;padding:0;outline:none;}li.svelte-y2i8n1 {font-size:.85rem;padding:.25rem .375rem;border-radius:4px;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}li[aria-selected='true'].svelte-y2i8n1 {background:var(--cpb-accent-soft);color:var(--cpb-accent-strong);font-weight:600;}li.svelte-y2i8n1:focus-visible, ul.svelte-y2i8n1:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:-2px;}"
};
function Kl(e, t) {
	A(t, !0), X(e, Gl);
	let n = /* @__PURE__ */ N(() => t.store.t), r = /* @__PURE__ */ N(() => Il(t.store.tree)), i = /* @__PURE__ */ P(void 0), a = (e) => {
		let n = t.store.tree.nodes[e];
		if (!n) return e;
		let r = typeof n.fields.label == "string" && n.fields.label !== "" ? n.fields.label : null, i = t.store.catalogue?.get(n.type);
		return r ? `${r} (${i?.label ?? n.type})` : i?.label ?? n.type;
	};
	async function o(e) {
		await Di(), ((e ? H(i)?.querySelector(`[data-node-id="${CSS.escape(e)}"]`) : null) ?? H(i))?.focus();
	}
	async function s(e) {
		if ((e.key === "F2" || e.key === "Enter") && t.store.selection && !e.altKey) {
			t.onEdit(t.store.selection) && e.preventDefault();
			return;
		}
		let n = Rl(t.store.tree, t.store.selection, e);
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
	var c = { focusItem: o }, l = Wl(), u = I(l), d = I(u, !0);
	k(u);
	var f = R(u, 2), p = I(f, !0);
	k(f);
	var m = R(f, 2), h = (e) => {
		var t = Vl(), r = I(t, !0);
		k(t), z((e) => q(r, e), [() => H(n)("structure.empty")]), K(e, t);
	}, g = (e) => {
		var n = Ul();
		Y(n, 21, () => H(r), (e) => e.id, (e, n) => {
			var r = Hl();
			let i;
			var o = I(r, !0);
			k(r), z((e) => {
				Q(r, "aria-level", H(n).depth), Q(r, "aria-setsize", H(n).siblings), Q(r, "aria-posinset", H(n).index + 1), Q(r, "aria-selected", t.store.selection === H(n).id), Q(r, "tabindex", t.store.selection === H(n).id ? 0 : -1), Q(r, "data-node-id", H(n).id), i = ha(r, "", i, { "padding-left": `${(H(n).depth - 1) * 14 + 6}px` }), q(o, e);
			}, [() => a(H(n).id)]), U("click", r, () => t.store.select(H(n).id)), Ri("focus", r, () => t.store.selection !== H(n).id && t.store.select(H(n).id)), U("keydown", r, () => {}), K(e, r);
		}), k(n), Pa(n, (e) => F(i, e), () => H(i)), z(() => Q(n, "tabindex", t.store.selection ? -1 : 0)), U("keydown", n, s), K(e, n);
	};
	return J(m, (e) => {
		H(r).length === 0 ? e(h) : e(g, -1);
	}), k(l), z((e, t) => {
		q(d, e), q(p, t);
	}, [() => H(n)("structure.title"), () => H(n)("structure.help")]), K(e, l), j(c);
}
W(["keydown", "click"]);
// src/ui/toolbar/Toolbar.svelte
var ql = /* @__PURE__ */ G("<button type=\"button\" class=\"primary svelte-ouhh5d\"> </button>"), Jl = /* @__PURE__ */ G("<button type=\"button\" class=\"svelte-ouhh5d\"> </button>"), Yl = /* @__PURE__ */ G("<button type=\"button\" class=\"svelte-ouhh5d\"> </button>"), Xl = /* @__PURE__ */ G("<span class=\"revision svelte-ouhh5d\"> <span data-publication=\"\"> </span></span>"), Zl = /* @__PURE__ */ G("<div class=\"toolbar svelte-ouhh5d\" role=\"toolbar\"><button type=\"button\" aria-keyshortcuts=\"Control+Z\" class=\"svelte-ouhh5d\"> </button> <button type=\"button\" aria-keyshortcuts=\"Control+Shift+Z\" class=\"svelte-ouhh5d\"> </button> <button type=\"button\" aria-keyshortcuts=\"Control+S\" class=\"svelte-ouhh5d\"> </button> <!> <!> <!> <span class=\"status svelte-ouhh5d\"> </span> <!></div>"), Ql = {
	hash: "svelte-ouhh5d",
	code: ".toolbar.svelte-ouhh5d {display:flex;flex-wrap:wrap;gap:.5rem;align-items:center;padding:.5rem .75rem;border-bottom:1px solid var(--cpb-border);}button.svelte-ouhh5d {font:inherit;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.svelte-ouhh5d:disabled {opacity:.5;cursor:not-allowed;}button.primary.svelte-ouhh5d {background:var(--cpb-accent);border-color:var(--cpb-accent);color:#fff;}button[aria-pressed='true'].svelte-ouhh5d {background:var(--cpb-accent-soft);border-color:var(--cpb-accent);}button.svelte-ouhh5d:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:2px;}.status.svelte-ouhh5d {margin-left:auto;font-size:.875rem;}.status[data-status='conflict'].svelte-ouhh5d, .status[data-status='offline'].svelte-ouhh5d, .status[data-status='load-error'].svelte-ouhh5d {color:var(--cpb-danger);font-weight:600;}.revision.svelte-ouhh5d {font-size:.75rem;color:var(--cpb-muted);}"
};
function $l(e, t) {
	A(t, !0), X(e, Ql);
	let n = Fa(t, "store", 7), r = /* @__PURE__ */ N(() => n().t), i = /* @__PURE__ */ N(() => n().publishedRevision === null ? H(r)("publication.none") : n().unpublished ? H(r)("publication.pending", { revision: n().publishedRevision }) : H(r)("publication.current"));
	var a = Zl(), o = I(a), s = I(o, !0);
	k(o);
	var c = R(o, 2), l = I(c, !0);
	k(c);
	var u = R(c, 2), d = I(u, !0);
	k(u);
	var f = R(u, 2), p = (e) => {
		var t = ql(), i = I(t, !0);
		k(t), z((e) => {
			t.disabled = n().publishing || n().status !== "ready" || !n().unpublished, q(i, e);
		}, [() => n().publishing ? H(r)("toolbar.publishing") : H(r)("toolbar.publish")]), U("click", t, () => n().publish()), K(e, t);
	};
	J(f, (e) => {
		n().canPublish && e(p);
	});
	var m = R(f, 2), h = (e) => {
		var t = Jl(), i = I(t, !0);
		k(t), z((e) => {
			Q(t, "aria-pressed", n().designOpen), q(i, e);
		}, [() => H(r)("design.open")]), U("click", t, () => {
			n().designOpen = !n().designOpen;
		}), K(e, t);
	};
	J(m, (e) => {
		n().designAvailable && e(h);
	});
	var g = R(m, 2), _ = (e) => {
		var n = Yl(), i = I(n, !0);
		k(n), z((e) => {
			Q(n, "aria-pressed", t.serverView), q(i, e);
		}, [() => H(r)("toolbar.serverView")]), U("click", n, function(...e) {
			t.onServerView?.apply(this, e);
		}), K(e, n);
	};
	J(g, (e) => {
		t.onServerView && e(_);
	});
	var v = R(g, 2), y = I(v, !0);
	k(v);
	var b = R(v, 2), x = (e) => {
		var t = Xl(), a = I(t), o = R(a), s = I(o, !0);
		k(o), k(t), z((e) => {
			q(a, `${e ?? ""} · `), q(s, H(i));
		}, [() => H(r)("toolbar.revision", { revision: n().revision })]), K(e, t);
	};
	J(b, (e) => {
		n().revision > 0 && e(x);
	}), k(a), z((e, t, r, i, f) => {
		Q(a, "aria-label", e), o.disabled = !n().canUndo, q(s, t), c.disabled = !n().canRedo, q(l, r), u.disabled = !n().dirty || n().status === "saving" || n().status === "conflict", q(d, i), Q(v, "data-status", n().status), q(y, f);
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
var eu = /* @__PURE__ */ G("<div class=\"editor svelte-b7je3p\" role=\"application\"><!> <!> <div class=\"body svelte-b7je3p\"><aside class=\"left svelte-b7je3p\"><!> <!></aside> <!> <!></div> <!> <!> <!> <div class=\"sr-only svelte-b7je3p\" aria-live=\"polite\"> </div> <div class=\"sr-only svelte-b7je3p\" aria-live=\"assertive\" role=\"alert\"> </div></div>"), tu = {
	hash: "svelte-b7je3p",
	code: ".editor.svelte-b7je3p {--cpb-border: #d4d4d8;--cpb-surface: #fff;--cpb-canvas: #f1f5f9;--cpb-muted: #52525b;--cpb-accent: #2563eb;--cpb-accent-soft: #dbeafe;--cpb-accent-strong: #1e3a8a;--cpb-danger: #b91c1c;font:14px/1.4 system-ui, sans-serif;color:#18181b;background:var(--cpb-surface);display:flex;flex-direction:column;height:100%;min-height:600px;border:1px solid var(--cpb-border);}.body.svelte-b7je3p {flex:1;display:grid;grid-template-columns:240px 1fr 280px;min-height:0;}.left.svelte-b7je3p {display:grid;grid-template-rows:minmax(0, 45%) minmax(0, 1fr);min-height:0;border-right:1px solid var(--cpb-border);}.sr-only.svelte-b7je3p {position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;}\n  @media (max-width: 900px) {.body.svelte-b7je3p {grid-template-columns:1fr;} }"
};
function nu(e, t) {
	A(t, !0), X(e, tu);
	let n = Fa(t, "stylesheets", 19, () => []), r = /* @__PURE__ */ P(void 0), i = /* @__PURE__ */ P(void 0), a = /* @__PURE__ */ N(() => new oc(t.store)), o = /* @__PURE__ */ N(() => new Mo(t.store)), s = /* @__PURE__ */ P(!1), c = /* @__PURE__ */ P(!1), l = !1;
	Rr(() => {
		t.store.status === "ready" && !l && (l = !0, H(o).loadTemplates());
	});
	let u = /* @__PURE__ */ P(null), d = /* @__PURE__ */ N(() => typeof t.store.session.transport.render == "function");
	function f(e) {
		if ((e.ctrlKey || e.metaKey) && !e.altKey && e.key.toLowerCase() === "s") {
			e.preventDefault(), t.store.dirty && t.store.save();
			return;
		}
		if (e.target?.closest("input, textarea, select, [contenteditable=\"true\"], [role=\"tree\"]")) return;
		let n = Ll(e);
		n && (e.preventDefault(), n.type === "undo" ? t.store.undo() : n.type === "redo" && t.store.redo());
	}
	var p = eu(), m = I(p);
	{
		let e = /* @__PURE__ */ N(() => H(u) !== null), n = /* @__PURE__ */ N(() => H(d) ? () => {
			F(u, H(u) === null ? t.store.revision : null, !0);
		} : null);
		$l(m, {
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
		kl(h, {
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
	Tl(v, {
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
	}), Pa(Kl(R(v, 2), {
		get store() {
			return t.store;
		},
		onEdit: (e) => H(i)?.startEditing(e) ?? !1
	}), (e) => F(r, e, !0), () => H(r)), k(_);
	var y = R(_, 2), b = (e) => {
		Fl(e, {
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
		Pa(Do(e, {
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
		Js(e, {
			get store() {
				return t.store;
			},
			get uid() {
				return t.uid;
			}
		});
	}, w = (e) => {
		$c(e, {
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
		t.store.designOpen ? e(C) : e(w, -1);
	}), k(g);
	var T = R(g, 2);
	Ro(T, {
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
	var ee = R(T, 2);
	Zs(ee, {
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
	var E = R(ee, 2), te = (e) => {
		_l(e, {
			get store() {
				return t.store;
			},
			get uid() {
				return t.uid;
			}
		});
	};
	J(E, (e) => {
		t.store.media.available && e(te);
	});
	var ne = R(E, 2), re = I(ne, !0);
	k(ne);
	var ie = R(ne, 2), ae = I(ie, !0);
	k(ie), k(p), z((e) => {
		Q(p, "aria-label", e), q(re, t.store.message), q(ae, t.store.alert);
	}, [() => t.store.t("editor.label")]), U("keydown", p, f), K(e, p), j();
}
W(["keydown"]);
// src/ui/i18n/components.ts
var ru = {
	"canvas.empty": "{type}: nada que mostrar todavía",
	"gallery.add": "Añadir imagen",
	"gallery.empty": "Sin imágenes.",
	"gallery.item": "Imagen {n}",
	"gallery.caption": "Pie de foto",
	"gallery.up": "Subir imagen {n}",
	"gallery.down": "Bajar imagen {n}",
	"gallery.remove": "Quitar imagen {n}"
}, iu = {
	"canvas.empty": "{type}: nothing to show yet",
	"gallery.add": "Add image",
	"gallery.empty": "No images.",
	"gallery.item": "Image {n}",
	"gallery.caption": "Caption",
	"gallery.up": "Move image {n} up",
	"gallery.down": "Move image {n} down",
	"gallery.remove": "Remove image {n}"
}, au = {
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
}, ou = {
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
	"error.MEDIA_IN_USE": "The file is in use; remove it from the pages first.",
	...iu,
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
}, su = {
	...au,
	...ru,
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
}, cu = {
	es: su,
	en: ou
}, lu = (e) => {
	let t = cu[e.toLowerCase().split("-")[0] ?? "es"] ?? su;
	return (e, n = {}) => t[e].replace(/\{(\w+)\}/g, (e, t) => String(n[t] ?? `{${t}}`));
}, uu = class {
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
}, du = class {
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
	#f = /* @__PURE__ */ P(De());
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
		this.session = e, this.t = t, this.designSession = new ne(e.transport), this.media = new uu(e.transport), this.stops.push(this.designSession.events.on("change", () => {
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
	fail(e, t = e instanceof Ge ? e.code : "SERVER") {
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
}, fu = [
	"ready",
	"selection-change",
	"dirty-change",
	"save-start",
	"save-success",
	"save-error",
	"conflict",
	"publish-success",
	"publish-error"
], pu = 0, mu = class extends HTMLElement {
	#e = null;
	#t = null;
	#n = null;
	#r = null;
	#i = null;
	#a = `cpb${++pu}`;
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
		for (let e of fu) n.events.on(e, (t) => {
			let n = e === "save-error" || e === "publish-error" ? { code: t.error.code } : t;
			this.dispatchEvent(new CustomEvent(e, {
				detail: n,
				bubbles: !0,
				composed: !0
			}));
		});
		let r = new du(n, lu(e.locale ?? "es"));
		this.#n = n, this.#r = r, this.#t = qi(nu, {
			target: t,
			props: {
				store: r,
				uid: this.#a,
				stylesheets: e.stylesheets ?? []
			}
		}), n.load().then(() => {
			r.sync(), r.loadDesign(), e.autosave !== !1 && n.capabilities?.features.autosave !== !1 && (this.#i = new He(n, {
				...b,
				...e.autosave ?? {}
			}), this.#i.start());
		}, (e) => {
			r.sync(), r.fail(e);
		});
	}
	#s() {
		this.#i?.stop(), this.#i = null, this.#t && Zi(this.#t), this.#r?.destroy(), this.#n?.destroy(), this.#t = null, this.#r = null, this.#n = null, this.shadowRoot?.replaceChildren();
	}
}, hu = (e = "ceiba-page-builder") => {
	customElements.get(e) || customElements.define(e, mu);
};
// src/ui/index.ts
hu();
export { He as Autosave, Pe as BASE, mu as CeibaPageBuilder, b as DEFAULT_AUTOSAVE, r as DEFAULT_BREAKPOINTS, s as DEFAULT_HISTORY, g as EDITABLE_FIELDS, Ge as EditorError, be as EditorSession, Ue as PROPERTY_BY_NAME, fu as PUBLIC_EVENTS, o as REFERENCE_PROPS, Ee as SCHEMA_VERSION, l as SERVER_LIMITS, y as STYLE_MATRIX, ne as SiteDesignSession, Be as acceptedTokenType, d as afterRedo, je as afterUndo, m as applyCommand, f as assertDepth, n as assertEditable, S as assertKnown, c as assertNewContent, v as assertNodeCount, x as assertPlacement, Ke as assertSize, We as assetUrl, Ne as attachRaw, u as canRedo, T as canUndo, h as checkTree, Ae as childrenOf, Me as collectAssetIds, ce as collectStyledNodes, ke as compileStyles, C as createCatalogue, p as createCommands, Ie as createEditor, a as createHttpTransport, De as defaultDesign, hu as defineElement, Oe as depthOf, oe as effectiveValue, w as emptyHistory, we as emptyTree, i as errorFromResponse, ae as fail, e as fromDocument, Fe as getNode, _ as groupKeyOf, se as heightOf, Se as indexInParent, ge as insertAt, _e as isAssetRef, ze as isSelfOrDescendant, ie as literal, ve as measureRaw, Ce as nodeClass, le as nodeCount, ue as parseDocument, Te as parseVideo, t as randomIds, ee as record, ye as sequentialIds, xe as setClasses, Re as setDeclaration, he as siteClass, de as styleClassNames, fe as subtreeIds, Le as toDocument, re as toRaw, pe as tokenLiteral, E as tokenVariable, me as withChildren, te as withNode, Ve as withoutNodes };

//# sourceMappingURL=ceiba-page-builder.js.map