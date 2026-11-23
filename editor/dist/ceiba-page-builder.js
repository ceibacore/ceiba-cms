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
	return E(/* @__PURE__ */ Qn(T));
}
function D(e) {
	if (w) {
		if (/* @__PURE__ */ Qn(T) !== null) throw Et(), Ct;
		T = e;
	}
}
function jt(e = 1) {
	if (w) {
		for (var t = e, n = T; t--;) n = /* @__PURE__ */ Qn(n);
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
		var i = /* @__PURE__ */ Qn(n);
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
		for (var r of n) mr(r);
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
	if (Vt.length === 0 && !nn) {
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
	if (t === null) return V.f |= tt, e;
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
var $t = null, A = null, en = null, j = null, tn = null, nn = !1, rn = !1, an = null, on = null, sn = 0, cn = 1, ln = class e {
	id = cn++;
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
		if (this.#e = !0, sn++ > 1e3 && (this.#C(), dn()), !this.#g()) {
			for (let e of this.#d) this.#f.delete(e), k(e, He), this.schedule(e);
			for (let e of this.#f) k(e, Ue), this.schedule(e);
		}
		let t = this.#l;
		this.#l = [], this.apply();
		var n = an = [], r = [], i = on = [];
		for (let e of t) try {
			this.#v(e, n, r);
		} catch (t) {
			throw gn(e), t;
		}
		if (A = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (an = null, on = null, this.#g()) {
			this.#x(r), this.#x(n);
			for (let [e, t] of this.#p) hn(e, t);
			i.length > 0 && A.#_();
			return;
		}
		let o = this.#y();
		if (o) o.#b(this);
		else {
			this.#d.clear(), this.#f.clear();
			for (let e of this.#r) e(this);
			this.#r.clear(), en = this, pn(r), pn(n), en = null, this.#c?.resolve();
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
		e.v !== C && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), j?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		A = this;
	}
	deactivate() {
		A = null, j = null;
	}
	flush() {
		try {
			rn = !0, A = this, this.#_();
		} finally {
			sn = 0, tn = null, an = null, on = null, rn = !1, A = null, j = null, Fn.clear();
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
			t.#S(), !rn && !nn && Ut(() => {
				t.#e || t.flush();
			});
		}
		return A;
	}
	apply() {
		j = null;
	}
	schedule(e) {
		if (tn = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) e.b.defer_effect(e);
		else {
			for (var t = e; t.parent !== null;) {
				t = t.parent;
				var n = t.f;
				if (an !== null && t === U && (V === null || !(V.f & 2))) return;
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
function un(e) {
	var t = nn;
	nn = !0;
	try {
		var n;
		for (e && (A !== null && !A.is_fork && A.flush(), n = e());;) {
			if (Wt(), A === null) return n;
			A.flush();
		}
	} finally {
		nn = t;
	}
}
function dn() {
	try {
		_t();
	} catch (e) {
		Kt(e, tn);
	}
}
var fn = null;
function pn(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && Ur(r) && (fn = /* @__PURE__ */ new Set(), Jr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && wr(r), fn?.size > 0)) {
				Fn.clear();
				for (let e of fn) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) fn.has(n) && (fn.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || Jr(n);
					}
				}
				fn.clear();
			}
		}
		fn = null;
	}
}
function mn(e) {
	A.schedule(e);
}
function hn(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), k(e, S);
		for (var n = e.first; n !== null;) hn(n, t), n = n.next;
	}
}
function gn(e) {
	k(e, S);
	for (var t = e.first; t !== null;) gn(t), t = t.next;
}
// node_modules/svelte/src/reactivity/create-subscriber.js
function _n(e) {
	let t = 0, n = Ln(0), r;
	return () => {
		dr() && (J(n), vr(() => (t === 0 && (r = Qr(() => e(() => Vn(n)))), t += 1, () => {
			Ut(() => {
				--t, t === 0 && (r?.(), r = void 0, Vn(n));
			});
		})));
	};
}
// node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var vn = Je | Ye;
function yn(e, t, n, r) {
	new bn(e, t, n, r);
}
var bn = class {
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
	#h = _n(() => (this.#m = Ln(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = U;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = U.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = yr(() => {
			if (w) {
				let e = this.#t;
				At();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, vn), w && (this.#e = T);
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
		e && (this.is_pending = !0, this.#o = z(() => e(this.#e)), Ut(() => {
			var e = this.#c = document.createDocumentFragment(), t = F();
			e.append(t), this.#a = this.#x(() => z(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, Tr(this.#o, () => {
				this.#o = null;
			}), this.#b(A));
		}));
	}
	#y() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = z(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				kr(this.#a, e);
				let t = this.#n.pending;
				this.#o = z(() => t(this.#e));
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
		var t = U, n = V, r = O;
		Fr(this.#i), H(this.#i), Lt(this.#i.ctx);
		try {
			return ln.ensure(), e();
		} catch (e) {
			return Gt(e), null;
		} finally {
			Fr(t), H(n), Lt(r);
		}
	}
	#S(e, t) {
		this.has_pending_snippet() ? (this.#u += e, this.#u === 0 && (this.#b(t), this.#o && Tr(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null))) : this.parent && this.parent.#S(e, t);
	}
	update_pending_count(e, t) {
		this.#S(e, t), this.#l += e, !this.#m || this.#d || (this.#d = !0, Ut(() => {
			this.#d = !1, this.#m && zn(this.#m, this.#l);
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
		this.#a &&= (B(this.#a), null), this.#o &&= (B(this.#o), null), this.#s &&= (B(this.#s), null), w && (E(this.#t), jt(), E(Mt()));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var r = !1, i = !1;
		let a = () => {
			r ? Ot() : (r = !0, i && St(), this.#s !== null && Tr(this.#s, () => {
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
					return z(() => {
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
function xn(e, t, n, r) {
	let i = Bt() ? Tn : On;
	var a = e.filter((e) => !e.settled);
	if (n.length === 0 && a.length === 0) {
		r(t.map(i));
		return;
	}
	var o = U, s = Sn(), c = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function l(e) {
		if (!(o.f & 16384)) {
			s();
			try {
				r(e);
			} catch (e) {
				Kt(e, o);
			}
			Cn();
		}
	}
	var u = wn();
	if (n.length === 0) {
		c.then(() => l(t.map(i))).finally(u);
		return;
	}
	function d() {
		Promise.all(n.map((e) => /* @__PURE__ */ Dn(e))).then((e) => l([...t.map(i), ...e])).catch((e) => Kt(e, o)).finally(u);
	}
	c ? c.then(() => {
		s(), d(), Cn();
	}) : d();
}
function Sn() {
	var e = U, t = V, n = O, r = A;
	return function(i = !0) {
		Fr(e), H(t), Lt(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function Cn(e = !0) {
	Fr(null), H(null), Lt(null), e && A?.deactivate();
}
function wn() {
	var e = U, t = e.b, n = A, r = t.is_rendered();
	return t.update_pending_count(1, n), n.increment(r, e), () => {
		t.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function Tn(e) {
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
var En = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function Dn(e, t, n) {
	let r = U;
	r === null && ft();
	var i = void 0, a = Ln(C), o = !V, s = /* @__PURE__ */ new Set();
	return _r(() => {
		var t = U, n = Be();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== ut && n.reject(e);
			}).finally(Cn);
		} catch (e) {
			n.reject(e), Cn();
		}
		var c = A;
		if (o) {
			if (t.f & 32768) var l = wn();
			if (r.b.is_rendered()) c.async_deriveds.get(t)?.reject(En);
			else for (let e of s.values()) e.reject(En);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== En && (c.activate(), t ? (a.f |= tt, zn(a, t)) : (a.f & 8388608 && (a.f ^= tt), zn(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), fr(() => {
		for (let e of s) e.reject(En);
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
	let t = /* @__PURE__ */ Tn(e);
	return Ir(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function On(e) {
	let t = /* @__PURE__ */ Tn(e);
	return t.equals = It, t;
}
function kn(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) B(t[n]);
	}
}
function An(e) {
	var t, n = U, r = e.parent;
	if (!Mr && r !== null && e.v !== C && r.f & 24576) return Tt(), e.v;
	Fr(r);
	try {
		e.f &= ~Qe, kn(e), t = Gr(e);
	} finally {
		Fr(n);
	}
	return t;
}
function jn(e) {
	var t = An(e);
	!e.equals(t) && (e.wv = Hr(), (!A?.is_fork || e.deps === null) && (A === null ? e.v = t : (A.capture(e, t, !0), en?.capture(e, t, !0)), e.deps === null)) ? k(e, S) : Mr || (j === null ? Jt(e) : (dr() || A?.is_fork) && j.set(e, t));
}
function Mn(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac?.abort(ut), t.fn !== null && (t.teardown = Re), t.ac = null, qr(t, 0), xr(t));
}
function Nn(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && Jr(t);
}
// node_modules/svelte/src/internal/client/reactivity/sources.js
var Pn = /* @__PURE__ */ new Set(), Fn = /* @__PURE__ */ new Map(), In = !1;
function Ln(e, t) {
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
function N(e, t) {
	let n = Ln(e, t);
	return Ir(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Rn(e, t = !1, n = !0) {
	let r = Ln(e);
	return t || (r.equals = It), r;
}
function P(e, t, n = !1) {
	return V !== null && (!Pr || V.f & 131072) && Bt() && V.f & 4325394 && (W === null || !ke.call(W, e)) && xt(), zn(e, n ? Un(t) : t, on);
}
function zn(e, t, n = null) {
	if (!e.equals(t)) {
		Fn.set(e, Mr ? t : e.v);
		var r = ln.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && An(t), j === null && Jt(t);
		}
		e.wv = Hr(), Hn(e, He, n), Bt() && U !== null && U.f & 1024 && !(U.f & 96) && (q === null ? Lr([e]) : q.push(e)), !r.is_fork && Pn.size > 0 && !In && Bn();
	}
	return t;
}
function Bn() {
	In = !1;
	for (let e of Pn) {
		e.f & 1024 && k(e, Ue);
		let t;
		try {
			t = Ur(e);
		} catch {
			t = !0;
		}
		t && Jr(e);
	}
	Pn.clear();
}
function Vn(e) {
	P(e, e.v + 1);
}
function Hn(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Bt(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (i || s !== U) {
			var l = (c & He) === 0;
			if (l && k(s, t), c & 131072) Pn.add(s);
			else if (c & 2) {
				var u = s;
				j?.delete(u), c & 65536 || (c & 512 && (U === null || !(U.f & 2097152)) && (s.f |= Qe), Hn(u, Ue, n));
			} else if (l) {
				var d = s;
				c & 16 && fn !== null && fn.add(d), n === null ? mn(d) : n.push(d);
			}
		}
	}
}
function Un(e) {
	if (typeof e != "object" || !e || nt in e) return e;
	let t = Ie(e);
	if (t !== Pe && t !== Fe) return e;
	var n = /* @__PURE__ */ new Map(), r = De(e), i = /* @__PURE__ */ N(0), a = null, o = Br, s = (e) => {
		if (Br === o) return e();
		var t = V, n = Br;
		H(null), Vr(o);
		var r = e();
		return H(t), Vr(n), r;
	};
	return r && n.set("length", /* @__PURE__ */ N(e.length, a)), new Proxy(e, {
		defineProperty(e, t, r) {
			"value" in r && r.configurable !== !1 && r.enumerable !== !1 && r.writable !== !1 || yt();
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
					let e = s(() => /* @__PURE__ */ N(C, a));
					n.set(t, e), Vn(i);
				}
			} else P(r, C), Vn(i);
			return !0;
		},
		get(t, r, i) {
			if (r === nt) return e;
			var o = n.get(r), c = r in t;
			if (o === void 0 && (!c || Me(t, r)?.writable) && (o = s(() => /* @__PURE__ */ N(Un(c ? t[r] : C), a)), n.set(r, o)), o !== void 0) {
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
			return (r !== void 0 || U !== null && (!i || Me(e, t)?.writable)) && (r === void 0 && (r = s(() => /* @__PURE__ */ N(i ? Un(e[t]) : C, a)), n.set(t, r)), J(r) === C) ? !1 : i;
		},
		set(e, t, o, c) {
			var l = n.get(t), u = t in e;
			if (r && t === "length") for (var d = o; d < l.v; d += 1) {
				var f = n.get(d + "");
				f === void 0 ? d in e && (f = s(() => /* @__PURE__ */ N(C, a)), n.set(d + "", f)) : P(f, C);
			}
			if (l === void 0) (!u || Me(e, t)?.writable) && (l = s(() => /* @__PURE__ */ N(void 0, a)), P(l, Un(o)), n.set(t, l));
			else {
				u = l.v !== C;
				var p = s(() => Un(o));
				P(l, p);
			}
			var m = Reflect.getOwnPropertyDescriptor(e, t);
			if (m?.set && m.set.call(c, o), !u) {
				if (r && typeof t == "string") {
					var h = n.get("length"), g = Number(t);
					Number.isInteger(g) && g >= h.v && P(h, g + 1);
				}
				Vn(i);
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
function Wn(e) {
	try {
		if (typeof e == "object" && e && nt in e) return e[nt];
	} catch {}
	return e;
}
function Gn(e, t) {
	return Object.is(Wn(e), Wn(t));
}
var Kn, qn, Jn, Yn;
function Xn() {
	if (Kn === void 0) {
		Kn = window, qn = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		Jn = Me(t, "firstChild").get, Yn = Me(t, "nextSibling").get, Le(e) && (e[ot] = void 0, e[at] = null, e[st] = void 0, e.__e = void 0), Le(n) && (n[ct] = void 0);
	}
}
function F(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function Zn(e) {
	return Jn.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function Qn(e) {
	return Yn.call(e);
}
function I(e, t) {
	if (!w) return /* @__PURE__ */ Zn(e);
	var n = /* @__PURE__ */ Zn(T);
	if (n === null) n = T.appendChild(F());
	else if (t && n.nodeType !== 3) {
		var r = F();
		return n?.before(r), E(r), r;
	}
	return t && rr(n), E(n), n;
}
function $n(e, t = !1) {
	if (!w) {
		var n = /* @__PURE__ */ Zn(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ Qn(n) : n;
	}
	if (t) {
		if (T?.nodeType !== 3) {
			var r = F();
			return T?.before(r), E(r), r;
		}
		rr(T);
	}
	return T;
}
function L(e, t = 1, n = !1) {
	let r = w ? T : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ Qn(r);
	if (!w) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = F();
			return r === null ? i?.after(a) : r.before(a), E(a), a;
		}
		rr(r);
	}
	return E(r), r;
}
function er(e) {
	e.textContent = "";
}
function tr() {
	return !1;
}
function nr(e, t, n) {
	let r = n ? { is: n } : void 0;
	return document.createElementNS(t ?? "http://www.w3.org/1999/xhtml", e, r);
}
function rr(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
// node_modules/svelte/src/internal/client/dom/elements/misc.js
function ir(e) {
	w && /* @__PURE__ */ Zn(e) !== null && er(e);
}
var ar = !1;
function or() {
	ar || (ar = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[lt]?.();
		});
	}, { capture: !0 }));
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function sr(e) {
	var t = V, n = U;
	H(null), Fr(null);
	try {
		return e();
	} finally {
		H(t), Fr(n);
	}
}
// node_modules/svelte/src/internal/client/reactivity/effects.js
function cr(e) {
	U === null && (V === null && gt(e), ht()), Mr && mt(e);
}
function lr(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function ur(e, t) {
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
	if (e & 4) an === null ? ln.ensure().schedule(r) : an.push(r);
	else if (t !== null) {
		try {
			Jr(r);
		} catch (e) {
			throw B(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= Je));
	}
	if (i !== null && (i.parent = n, n !== null && lr(i, n), V !== null && V.f & 2 && !(e & 64))) {
		var a = V;
		(a.effects ??= []).push(i);
	}
	return r;
}
function dr() {
	return V !== null && !Pr;
}
function fr(e) {
	let t = ur(8, null);
	return k(t, S), t.teardown = e, t;
}
function pr(e) {
	cr("$effect");
	var t = U.f;
	if (!V && t & 32 && !(t & 32768)) {
		var n = O;
		(n.e ??= []).push(e);
	} else return mr(e);
}
function mr(e) {
	return ur(4 | Xe, e);
}
function hr(e) {
	ln.ensure();
	let t = ur(64 | Ye, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Tr(t, () => {
			B(t), n(void 0);
		}) : (B(t), n(void 0));
	});
}
function gr(e) {
	return ur(4, e);
}
function _r(e) {
	return ur(et | Ye, e);
}
function vr(e, t = 0) {
	return ur(8 | t, e);
}
function R(e, t = [], n = [], r = []) {
	xn(r, t, n, (t) => {
		ur(8, () => e(...t.map(J)));
	});
}
function yr(e, t = 0) {
	return ur(16 | t, e);
}
function z(e) {
	return ur(32 | Ye, e);
}
function br(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = Mr, n = V;
		Nr(!0), H(null);
		try {
			t.call(null);
		} finally {
			Nr(e), H(n);
		}
	}
}
function xr(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && sr(() => {
			e.abort(ut);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : B(n, t), n = r;
	}
}
function Sr(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || B(t), t = n;
	}
}
function B(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Cr(e.nodes.start, e.nodes.end), n = !0), k(e, qe), xr(e, t && !n), qr(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	br(e), e.f ^= qe, e.f |= Ge;
	var i = e.parent;
	i !== null && i.first !== null && wr(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Cr(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ Qn(e);
		e.remove(), e = n;
	}
}
function wr(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Tr(e, t, n = !0) {
	var r = [];
	Er(e, r, !0);
	var i = () => {
		n && B(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Er(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= We;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				Er(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function Dr(e) {
	Or(e, !0);
}
function Or(e, t) {
	if (e.f & 8192) {
		e.f ^= We, e.f & 1024 || (k(e, He), ln.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			Or(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function kr(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ Qn(n);
		t.append(n), n = i;
	}
}
// node_modules/svelte/src/internal/client/legacy.js
var Ar = null, jr = !1, Mr = !1;
function Nr(e) {
	Mr = e;
}
var V = null, Pr = !1;
function H(e) {
	V = e;
}
var U = null;
function Fr(e) {
	U = e;
}
var W = null;
function Ir(e) {
	V !== null && (W === null ? W = [e] : W.push(e));
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
			if (Ur(a) && jn(a), a.wv > e.wv) return !0;
		}
		t & 512 && j === null && k(e, S);
	}
	return !1;
}
function Wr(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(W !== null && ke.call(W, e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? Wr(a, t, !1) : t === a && (n ? k(a, He) : a.f & 1024 && k(a, Ue), mn(a));
	}
}
function Gr(e) {
	var t = G, n = K, r = q, i = V, a = W, o = O, s = Pr, c = Br, l = e.f;
	G = null, K = 0, q = null, V = l & 96 ? null : e, W = null, Lt(e.ctx), Pr = !1, Br = ++zr, e.ac !== null && (sr(() => {
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
			if (dr() && e.f & 512) for (m = K; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && K < f.length && (qr(e, K), f.length = K);
		if (Bt() && q !== null && !Pr && f !== null && !(e.f & 6146)) for (m = 0; m < q.length; m++) Wr(q[m], e);
		if (i !== null && i !== e) {
			if (zr++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = zr;
			if (t !== null) for (let e of t) e.rv = zr;
			q !== null && (r === null ? r = q : r.push(...q));
		}
		return e.f & 8388608 && (e.f ^= tt), d;
	} catch (e) {
		return Gt(e);
	} finally {
		e.f ^= $e, G = t, K = n, q = r, V = i, W = a, Lt(o), Pr = s, Br = c;
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
		a.f & 512 && (a.f ^= 512, a.f &= ~Qe), a.v !== C && Jt(a), Mn(a), qr(a, 0);
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
		var n = U, r = jr;
		U = e, jr = !0;
		try {
			t & 16777232 ? Sr(e) : xr(e), br(e);
			var i = Gr(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = Rr;
		} finally {
			jr = r, U = n;
		}
	}
}
async function Yr() {
	await Promise.resolve(), un();
}
function J(e) {
	var t = !!(e.f & 2);
	if (Ar?.add(e), V !== null && !Pr && !(U !== null && U.f & 16384) && (W === null || !ke.call(W, e))) {
		var n = V.deps;
		if (V.f & 2097152) e.rv < zr && (e.rv = zr, G === null && n !== null && n[K] === e ? K++ : G === null ? G = [e] : G.push(e));
		else {
			V.deps ??= [], ke.call(V.deps, e) || V.deps.push(e);
			var r = e.reactions;
			r === null ? e.reactions = [V] : ke.call(r, V) || r.push(V);
		}
	}
	if (Mr && Fn.has(e)) return Fn.get(e);
	if (t) {
		var i = e;
		if (Mr) {
			var a = i.v;
			return (!(i.f & 1024) && i.reactions !== null || Zr(i)) && (a = An(i)), Fn.set(i, a), a;
		}
		var o = !(i.f & 512) && !Pr && V !== null && (jr || !!(V.f & 512)), s = (i.f & Ke) === 0;
		Ur(i) && (o && (i.f |= 512), jn(i)), o && !s && (Nn(i), Xr(i));
	}
	if (j?.has(e)) return j.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function Xr(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (Nn(t), Xr(t));
}
function Zr(e) {
	if (e.v === C) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Fn.has(t) || t.f & 2 && Zr(t)) return !0;
	return !1;
}
function Qr(e) {
	var t = Pr;
	try {
		return Pr = !0, e();
	} finally {
		Pr = t;
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
		if (r.capture || li.call(t, e), !e.cancelBubble) return sr(() => n?.call(this, e));
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
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && fr(() => {
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
		var u = V, d = U;
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
	var t = nr("template");
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
		i === void 0 && (i = fi(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ Zn(i)));
		var t = r || qn ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ Zn(t), s = t.lastChild;
			pi(o, s);
		} else pi(t, t);
		return t;
	};
}
function mi() {
	if (w) return pi(T, null), T;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = F();
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
	Xn();
	var c = void 0, l = hr(() => {
		var o = n ?? t.appendChild(F());
		yn(o, { pending: () => {} }, (t) => {
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
			if (n) Dr(n), this.#r.delete(t);
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
						kr(r, t), t.append(F()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else B(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), Tr(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (B(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = A, r = tr();
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
	yr(() => {
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
	yr(() => {
		var e = t();
		e !== e && (e = Si), i && typeof e == "object" && e && (e = {}), r.ensure(e, n);
	});
}
// node_modules/svelte/src/internal/client/dom/blocks/each.js
function wi(e, t, n) {
	for (var r = [], i = t.length, a, o = t.length, s = 0; s < i; s++) {
		let n = t[s];
		Tr(n, () => {
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
			er(u), u.append(l), e.items.clear();
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
		r?.has(a) ? (a.f |= Ze, kr(a, document.createDocumentFragment())) : B(t[i], n);
	}
}
var Ei;
function Di(e, t, n, r, i, a = null) {
	var o = e, s = /* @__PURE__ */ new Map();
	if (t & 4) {
		var c = e;
		o = w ? E(/* @__PURE__ */ Zn(c)) : c.appendChild(F());
	}
	w && At();
	var l = null, u = /* @__PURE__ */ On(() => {
		var e = n();
		return De(e) ? e : e == null ? [] : Ae(e);
	}), d, f = /* @__PURE__ */ new Map(), p = !0;
	function m(e) {
		g.effect.f & 16384 || (g.pending.delete(e), g.fallback = l, ki(g, d, o, t, r), l !== null && (d.length === 0 ? l.f & 33554432 ? (l.f ^= Ze, ji(l, null, o)) : Dr(l) : Tr(l, () => {
			l = null;
		})));
	}
	function h(e) {
		g.pending.delete(e);
	}
	var g = {
		effect: yr(() => {
			d = J(u);
			var e = d.length;
			let c = !1;
			w && Nt(o) === "[!" != (e === 0) && (o = Mt(), E(o), kt(!1), c = !0);
			for (var g = /* @__PURE__ */ new Set(), _ = A, v = tr(), y = 0; y < e; y += 1) {
				w && T.nodeType === 8 && T.data === "]" && (o = T, c = !0, kt(!1));
				var b = d[y], ee = r(b, y), x = p ? null : s.get(ee);
				x ? (x.v && zn(x.v, b), x.i && zn(x.i, y), v && _.unskip_effect(x.e)) : (x = Ai(s, p ? o : Ei ??= F(), b, ee, y, i, t, n), p || (x.e.f |= Ze), s.set(ee, x)), g.add(ee);
			}
			if (e === 0 && a && !l && (p ? l = z(() => a(o)) : (l = z(() => a(Ei ??= F())), l.f |= Ze)), e > g.size && pt("", "", ""), w && e > 0 && E(Mt()), !p) {
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
		if (g.f & 8192 && (Dr(g), a && (g.nodes?.a?.unfix(), (d ??= /* @__PURE__ */ new Set()).delete(g))), g.f & 33554432) {
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
	var c = o & 1 ? o & 16 ? Ln(n) : /* @__PURE__ */ Rn(n, !1, !1) : null, l = o & 2 ? Ln(i) : null;
	return {
		v: c,
		i: l,
		e: z(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function ji(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ Qn(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Mi(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
// node_modules/svelte/src/internal/client/dom/css.js
function Ni(e, t) {
	gr(() => {
		var n = e.getRootNode(), r = n.host ? n : n.head ?? n.ownerDocument.head;
		if (!r.querySelector("#" + t.hash)) {
			let e = nr("style");
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
		for (r of e.options) if (Gn(Vi(r), t)) {
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
	}), fr(() => {
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
		e[lt] = n, Ut(n), or();
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
	return gr(() => {
		var o, s;
		return vr(() => {
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
	var i = !0, a = !!(n & 8), o = !!(n & 16), s = r, c = !0, l = void 0, u = () => o && i ? (l ??= /* @__PURE__ */ Tn(r), J(l)) : (c && (c = !1, s = o ? Qr(r) : r), s);
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
	var _ = !1, v = (n & 1 ? Tn : On)(() => (_ = !1, h()));
	a && J(v);
	var y = U;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? J(v) : i && a ? Un(e) : e;
			return P(v, n), _ = !0, s !== void 0 && (s = n), e;
		}
		return Mr && _ || y.f & 16384 ? v.v : J(v);
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
}, aa = (e) => typeof e == "string" ? e : typeof e == "number" ? String(e) : "", oa = (e) => e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;"), sa = "allow-same-origin", ca = (e) => "<!doctype html><html><head><meta charset=\"utf-8\"><meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'none'; style-src * 'unsafe-inline'; img-src * data: blob:; font-src * data:\">" + e.map(ia).filter((e) => e !== "").map((e) => `<link rel="stylesheet" href="${oa(e)}">`).join("") + "<style>body{margin:0;padding:12px;min-height:100vh;box-sizing:border-box}[data-ceiba-id]{cursor:default}[data-ceiba-id]:hover{outline:1px dashed #94a3b8}[data-ceiba-selected]{outline:2px solid #2563eb!important;outline-offset:2px}[data-ceiba-multiline]{white-space:pre-line}[contenteditable]{outline:2px solid #16a34a!important;outline-offset:2px;cursor:text}.ceiba-dragging,.ceiba-dragging *{user-select:none!important;cursor:grabbing!important}.ceiba-placeholder{padding:12px;border:1px dashed #94a3b8;color:#475569;font:13px system-ui;background:#f8fafc}@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}</style></head><body></body></html>", la = /* @__PURE__ */ new Set([
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
	"figcaption"
]), ua = /* @__PURE__ */ new Set([
	"text",
	"p",
	"blockquote",
	"code"
]), da = (e, t) => !t.has(e.type) || e.children.length > 0 ? null : e.type === "heading" ? "text" : e.type === "text" ? "content" : e.type === "button" ? "label" : la.has(e.type) || ua.has(e.type) ? "content" : null, fa = (e) => ua.has(e), pa = (e, t) => {
	let n = e.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, "");
	return t ? n.replace(/\n$/, "") : n.replace(/\n+/g, " ");
}, ma = (e) => {
	let t = e.ownerDocument, n = t.createRange();
	n.selectNodeContents(e), n.collapse(!1);
	let r = t.getSelection();
	r?.removeAllRanges(), r?.addRange(n);
}, ha = /* @__PURE__ */ new Set(/* @__PURE__ */ "div.section.article.header.footer.nav.main.aside.h1.h2.h3.h4.h5.h6.p.span.strong.em.small.a.ul.ol.li.blockquote.figure.figcaption.code.pre.hr.br.img.label".split(".")), ga = (e) => {
	let t = e.fields.props;
	return typeof t == "object" && t && !Array.isArray(t) ? t : {};
}, _a = (e, t) => {
	let n = e.createElement("div");
	return n.className = "ceiba-placeholder", n.textContent = t, n;
}, va = (e, t, n, r) => {
	let i = ga(t), a = (t, n = "") => {
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
			if (t === "") return _a(e, n.emptyImage);
			let r = a("img", "img-fluid");
			return r.src = t, r.alt = aa(i.alt), r;
		}
		case "button": {
			let e = a("a", "btn btn-primary");
			return e.href = na(i.url) || "#", e.textContent = aa(i.label), e;
		}
		case "html": return _a(e, n.html);
	}
	if (!r || !ha.has(t.type)) return _a(e, n.unknown(t.type));
	let o = a(t.type);
	return t.type === "a" && (o.href = na(i.href) || "#"), t.type === "img" && (o.src = na(i.src), o.alt = aa(i.alt)), i.content !== void 0 && o.append(e.createTextNode(aa(i.content))), o;
}, ya = (e, t, n, r, i) => {
	let a = (o) => {
		let s = t.nodes[o];
		if (!s) return null;
		let c = va(e, s, i, n.has(s.type));
		if (c.dataset.ceibaId = o, o === r && (c.dataset.ceibaSelected = ""), fa(s.type) && (c.dataset.ceibaMultiline = ""), c.className !== "ceiba-placeholder" && c.tagName !== "IMG") for (let e of s.children) {
			let t = a(e);
			t && c.append(t);
		}
		return c;
	}, o = t.rootIds.map(a).filter((e) => e !== null);
	e.body.replaceChildren(...o);
}, ba = /* @__PURE__ */ X("<div class=\"canvas svelte-1tv0kiv\"><p class=\"help svelte-1tv0kiv\"> </p> <iframe class=\"svelte-1tv0kiv\"></iframe></div>"), xa = {
	hash: "svelte-1tv0kiv",
	code: ".canvas.svelte-1tv0kiv {background:var(--cpb-canvas);padding:.5rem 1rem 1rem;min-height:0;display:flex;flex-direction:column;}.help.svelte-1tv0kiv {margin:0 0 .5rem;font-size:.75rem;color:var(--cpb-muted);}iframe.svelte-1tv0kiv {flex:1;width:100%;min-height:480px;border:1px solid var(--cpb-border);border-radius:8px;background:#fff;}"
};
function Sa(e, t) {
	Rt(t, !0), Ni(e, xa);
	let n = ea(t, "stylesheets", 19, () => []), r = /* @__PURE__ */ M(() => t.store.t), i = /* @__PURE__ */ N(void 0), a = /* @__PURE__ */ N(!1), o = /* @__PURE__ */ N(null), s = /* @__PURE__ */ M(() => ca(n())), c = (e) => e?.closest?.("[data-ceiba-id]");
	function l(e) {
		let n = J(i)?.contentDocument, a = t.store.tree.nodes[e], s = a && t.store.catalogue ? da(a, t.store.catalogue) : null, c = n?.querySelector(`[data-ceiba-id="${CSS.escape(e)}"]`);
		if (!n || !a || !s || !c) return !1;
		t.store.select(e), P(o, e, !0);
		let l = fa(a.type);
		c.setAttribute("contenteditable", "plaintext-only"), c.setAttribute("aria-label", J(r)("announce.editing"));
		let u = () => {
			t.store.run({
				kind: "updateProps",
				id: e,
				set: { [s]: pa(c.innerText, l) }
			});
		}, d = (n) => {
			c.removeEventListener("input", u), c.removeEventListener("keydown", f), c.removeEventListener("blur", p), c.removeAttribute("contenteditable"), P(o, null), t.store.announce("announce.editDone"), t.onEditEnd(e, n);
		}, f = (e) => {
			(e.key === "Escape" || e.key === "Enter" && (!l || e.ctrlKey || e.metaKey)) && (e.preventDefault(), d(!0));
		}, p = () => d(!1);
		return c.addEventListener("input", u), c.addEventListener("keydown", f), c.addEventListener("blur", p), c.focus(), ma(c), t.store.announce("announce.editing"), !0;
	}
	function u(e) {
		e.addEventListener("click", (e) => {
			e.preventDefault(), J(o) === null && t.store.select(c(e.target)?.dataset.ceibaId ?? null);
		}), e.addEventListener("dblclick", (e) => {
			let t = c(e.target)?.dataset.ceibaId;
			t && J(o) === null && l(t);
		}), e.addEventListener("pointerdown", (e) => {
			let n = c(e.target);
			n?.dataset.ceibaId && J(o) === null && t.drag.pressNode(e, n, n.dataset.ceibaId);
		}), e.addEventListener("submit", (e) => e.preventDefault()), e.addEventListener("auxclick", (e) => e.preventDefault()), e.addEventListener("dragstart", (e) => e.preventDefault());
	}
	function d() {
		let e = J(i)?.contentDocument;
		e && J(i) && (u(e), t.drag.attach(J(i)), P(a, !0));
	}
	pr(() => {
		let e = J(i)?.contentDocument, n = t.store.catalogue, s = t.store.tree, c = t.store.selection;
		J(a) && e && n && J(o) === null && (ya(e, s, n, c, {
			unknown: (e) => J(r)("canvas.unknown", { type: e }),
			html: J(r)("canvas.html"),
			emptyImage: J(r)("canvas.emptyImage")
		}), c && e.querySelector(`[data-ceiba-id="${CSS.escape(c)}"]`)?.scrollIntoView({ block: "nearest" }));
	});
	var f = { startEditing: l }, p = ba(), m = I(p), h = I(m, !0);
	D(m);
	var g = L(m, 2);
	return $i(g, (e) => P(i, e), () => J(i)), D(p), R((e, n) => {
		$(m, "id", `${t.uid}-canvas-help`), Q(h, e), $(g, "title", n), $(g, "sandbox", sa), $(g, "srcdoc", J(s)), $(g, "aria-describedby", `${t.uid}-canvas-help`);
	}, [() => J(r)("canvas.help"), () => J(r)("canvas.title")]), oi("load", g, d), ii(g), Z(e, p), zt(f);
}
// src/ui/drag/indicator.ts
var Ca = "ceiba-drop-indicator", wa = (e, t, n, r) => {
	let i = e.getElementById(Ca);
	i || (i = e.createElement("div"), i.id = Ca, i.setAttribute("aria-hidden", "true"), e.body.append(i));
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
}, Ta = (e) => {
	e?.getElementById(Ca)?.remove();
}, Ea = (e, t, n, r) => {
	let i = t <= 0 ? .5 : (n - e) / t;
	return r ? i < .25 ? "before" : i > .75 ? "after" : "inside" : i < .5 ? "before" : "after";
}, Da = (e, t, n, r) => t.kind === "move" ? {
	kind: "move",
	id: t.id,
	parent: n,
	index: r
} : {
	kind: "insert",
	parent: n,
	index: r,
	node: t.node
}, Oa = (e, t, n, r, i) => {
	let a;
	if (r === null || !e.nodes[r]) a = Da(e, n, null, e.rootIds.length);
	else if (i === "inside") a = Da(e, n, r, e.nodes[r]?.children.length ?? 0);
	else {
		let t = e.nodes[r]?.parent ?? null;
		a = Da(e, n, t, s(e, t).indexOf(r) + +(i === "after"));
	}
	let o = r !== null && e.nodes[r] ? r : null;
	if (n.kind === "move" && a.kind === "move" && ka(e, n.id, a.parent, a.index)) return {
		command: null,
		anchor: o,
		zone: i,
		refused: null
	};
	try {
		return fe(e, a, t), {
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
			refused: e instanceof l ? e.code : "SERVER"
		};
	}
}, ka = (e, t, n, r) => {
	if (e.nodes[t]?.parent !== n) return !1;
	let i = s(e, n).indexOf(t);
	return r === i || r === i + 1;
}, Aa = 5, ja = class {
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
			!this.active && Math.hypot(e.clientX - r.x, e.clientY - r.y) < Aa || (this.active || this.begin({
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
			if (!this.active && Math.hypot(e.clientX - i.x, e.clientY - i.y) < Aa) return;
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
		let i = n.elementFromPoint(e, t)?.closest("[data-ceiba-id]") ?? null, a = i?.dataset.ceibaId ?? null, o = a ? this.store.tree.nodes[a] : void 0, s = i?.getBoundingClientRect(), c = o ? this.store.catalogue?.get(o.type)?.isContainer ?? !1 : !1, l = s ? Ea(s.top, s.height, t, c) : "inside";
		this.active.target = Oa(this.store.tree, r, this.active.dragged, a, l), wa(n, i, l, this.active.target.refused !== null);
	}
	clearTarget() {
		this.active && (this.active.target = null), Ta(this.doc);
	}
	finish(e) {
		let t = this.active;
		if (this.active = null, Ta(this.doc), this.frame && (this.frame.style.pointerEvents = ""), this.doc?.body.classList.remove("ceiba-dragging"), document.removeEventListener("keydown", this.onKey, !0), this.doc?.removeEventListener("keydown", this.onKey, !0), !t) return;
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
}, Ma = {
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
}, Na = /* @__PURE__ */ new Set([
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
]), Pa = (e) => e.charAt(0).toUpperCase() + e.slice(1).replace(/[_-]/g, " "), Fa = (e) => {
	let t = [], n = /* @__PURE__ */ new Set();
	for (let [r, i] of Object.entries(e.editorControls)) {
		let e = i, a = e.options?.map(String);
		t.push({
			key: r,
			label: e.label ?? Pa(r),
			control: Ma[e.type ?? ""] ?? "text",
			...a ? { options: a } : {}
		}), n.add(r);
	}
	for (let [r, i] of Object.entries(e.propsSchema)) {
		if (n.has(r)) continue;
		let e = i, a = e.enum?.map(String);
		t.push({
			key: r,
			label: Pa(r),
			control: a ? "select" : Ma[e.type ?? ""] ?? "text",
			...a ? { options: a } : {}
		}), n.add(r);
	}
	return Object.keys(e.propsSchema).length === 0 && Object.keys(e.editorControls).length === 0 && (Na.has(e.type) && t.push({
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
}, Ia = (e, t) => {
	if (e.control === "checkbox") return { value: t === !0 };
	let n = String(t);
	if (e.control === "number") {
		if (n.trim() === "") return { value: null };
		let e = Number(n);
		return Number.isFinite(e) ? { value: e } : { error: "field.number" };
	}
	return e.control === "url" && n.trim() !== "" && na(n) === "" ? { error: "field.url" } : e.control === "select" && e.options && !e.options.includes(n) ? { error: "field.option" } : e.control === "select" && e.options?.every((e) => /^\d+$/.test(e)) ? { value: Number(n) } : { value: n };
}, La = /* @__PURE__ */ X("<label class=\"svelte-1g42mo8\"><input type=\"checkbox\" class=\"svelte-1g42mo8\"/> </label>"), Ra = /* @__PURE__ */ X("<textarea rows=\"3\" class=\"svelte-1g42mo8\"></textarea>"), za = /* @__PURE__ */ X("<option> </option>"), Ba = /* @__PURE__ */ X("<select class=\"svelte-1g42mo8\"></select>"), Va = /* @__PURE__ */ X("<input class=\"svelte-1g42mo8\"/>"), Ha = /* @__PURE__ */ X("<label class=\"svelte-1g42mo8\"> </label> <!>", 1), Ua = /* @__PURE__ */ X("<p class=\"error svelte-1g42mo8\" role=\"alert\"> </p>"), Wa = /* @__PURE__ */ X("<div class=\"field svelte-1g42mo8\"><!> <!></div>"), Ga = {
	hash: "svelte-1g42mo8",
	code: ".field.svelte-1g42mo8 {display:grid;gap:.25rem;margin-bottom:.75rem;}label.svelte-1g42mo8 {font-size:.8rem;font-weight:600;}input.svelte-1g42mo8:not([type='checkbox']), textarea.svelte-1g42mo8, select.svelte-1g42mo8 {font:inherit;font-size:.875rem;padding:.35rem .5rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}[aria-invalid='true'].svelte-1g42mo8 {border-color:var(--cpb-danger);}input.svelte-1g42mo8:focus-visible, textarea.svelte-1g42mo8:focus-visible, select.svelte-1g42mo8:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}.error.svelte-1g42mo8 {color:var(--cpb-danger);font-size:.75rem;margin:0;}"
};
function Ka(e, t) {
	Rt(t, !0), Ni(e, Ga);
	let n = /* @__PURE__ */ N(null), r = /* @__PURE__ */ M(() => t.value === null || t.value === void 0 ? "" : String(t.value));
	function i(e) {
		let r = Ia(t.field, e);
		"error" in r ? P(n, t.t(r.error), !0) : (P(n, null), t.onChange(r.value));
	}
	var a = Wa(), o = I(a), s = (e) => {
		var n = La(), r = I(n);
		Ki(r);
		var a = L(r);
		D(n), R(() => {
			$(r, "id", t.id), Ji(r, t.value === !0), Q(a, ` ${t.field.label ?? ""}`);
		}), Y("change", r, (e) => i(e.currentTarget.checked)), Z(e, n);
	}, c = (e) => {
		var a = Ha(), o = $n(a), s = I(o, !0);
		D(o);
		var c = L(o, 2), l = (e) => {
			var a = Ra();
			ir(a), R(() => {
				$(a, "id", t.id), qi(a, J(r)), $(a, "aria-invalid", J(n) !== null), $(a, "aria-describedby", J(n) ? `${t.id}-error` : void 0);
			}), Y("input", a, (e) => i(e.currentTarget.value)), Z(e, a);
		}, u = (e) => {
			var n = Ba();
			Di(n, 20, () => t.field.options ?? [], (e) => e, (e, t) => {
				var n = za(), r = I(n, !0);
				D(n);
				var i = {};
				R(() => {
					Q(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
				}), Z(e, n);
			}), D(n);
			var a;
			Bi(n), R(() => {
				$(n, "id", t.id), a !== (a = J(r)) && (n.value = (n.__value = J(r)) ?? "", zi(n, J(r)));
			}), Y("change", n, (e) => i(e.currentTarget.value)), Z(e, n);
		}, d = (e) => {
			var a = Va();
			Ki(a), R(() => {
				$(a, "id", t.id), $(a, "type", t.field.control === "number" ? "number" : t.field.control === "url" ? "url" : "text"), qi(a, J(r)), $(a, "aria-invalid", J(n) !== null), $(a, "aria-describedby", J(n) ? `${t.id}-error` : void 0);
			}), Y("input", a, (e) => i(e.currentTarget.value)), Z(e, a);
		};
		xi(c, (e) => {
			t.field.control === "textarea" ? e(l) : t.field.control === "select" ? e(u, 1) : e(d, -1);
		}), R(() => {
			$(o, "for", t.id), Q(s, t.field.label);
		}), Z(e, a);
	};
	xi(o, (e) => {
		t.field.control === "checkbox" ? e(s) : e(c, -1);
	});
	var l = L(o, 2), u = (e) => {
		var r = Ua(), i = I(r, !0);
		D(r), R(() => {
			$(r, "id", `${t.id}-error`), Q(i, J(n));
		}), Z(e, r);
	};
	xi(l, (e) => {
		J(n) && e(u);
	}), D(a), Z(e, a), zt();
}
si(["change", "input"]);
// src/ui/inspector/Inspector.svelte
var qa = /* @__PURE__ */ X("<p class=\"hint svelte-2ghsnx\"> </p>"), Ja = /* @__PURE__ */ X("<p class=\"locked svelte-2ghsnx\" role=\"note\"> </p>"), Ya = /* @__PURE__ */ X("<p class=\"type svelte-2ghsnx\"> </p> <div class=\"field svelte-2ghsnx\"><label class=\"svelte-2ghsnx\"> </label> <input type=\"text\" class=\"svelte-2ghsnx\"/></div> <!> <div class=\"actions svelte-2ghsnx\"><button type=\"button\" class=\"svelte-2ghsnx\"> </button> <button type=\"button\" class=\"danger svelte-2ghsnx\"> </button></div>", 1), Xa = /* @__PURE__ */ X("<section class=\"inspector svelte-2ghsnx\"><h2 class=\"svelte-2ghsnx\"> </h2> <!></section>"), Za = {
	hash: "svelte-2ghsnx",
	code: ".inspector.svelte-2ghsnx {padding:.5rem .75rem;overflow:auto;border-left:1px solid var(--cpb-border);}h2.svelte-2ghsnx {font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin:0 0 .5rem;color:var(--cpb-muted);}.hint.svelte-2ghsnx, .locked.svelte-2ghsnx {font-size:.85rem;color:var(--cpb-muted);}.locked.svelte-2ghsnx {color:var(--cpb-danger);}.type.svelte-2ghsnx {font-weight:700;margin:0 0 .75rem;}.field.svelte-2ghsnx {display:grid;gap:.25rem;margin-bottom:.75rem;}label.svelte-2ghsnx {font-size:.8rem;font-weight:600;}input.svelte-2ghsnx {font:inherit;font-size:.875rem;padding:.35rem .5rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}.actions.svelte-2ghsnx {display:flex;gap:.5rem;margin-top:1rem;}button.svelte-2ghsnx {font:inherit;font-size:.8rem;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.danger.svelte-2ghsnx {color:var(--cpb-danger);}button.svelte-2ghsnx:focus-visible, input.svelte-2ghsnx:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Qa(e, t) {
	Rt(t, !0), Ni(e, Za);
	let n = /* @__PURE__ */ M(() => t.store.t), r = /* @__PURE__ */ M(() => t.store.selection ? t.store.tree.nodes[t.store.selection] : void 0), i = /* @__PURE__ */ M(() => J(r) ? t.store.catalogue?.get(J(r).type) : void 0), a = /* @__PURE__ */ M(() => J(i) ? Fa(J(i)) : []), o = /* @__PURE__ */ M(() => {
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
	var u = Xa(), d = I(u), f = I(d, !0);
	D(d);
	var p = L(d, 2), m = (e) => {
		var t = qa(), r = I(t, !0);
		D(t), R((e) => Q(r, e), [() => J(n)("inspector.none")]), Z(e, t);
	}, h = (e) => {
		var u = mi();
		Ci($n(u), () => J(r).id, (e) => {
			var u = Ya(), d = $n(u), f = I(d, !0);
			D(d);
			var p = L(d, 2), m = I(p), h = I(m, !0);
			D(m);
			var g = L(m, 2);
			Ki(g), D(p);
			var _ = L(p, 2), v = (e) => {
				var t = Ja(), r = I(t, !0);
				D(t), R((e) => Q(r, e), [() => J(n)("inspector.locked")]), Z(e, t);
			}, y = (e) => {
				var r = mi();
				Di($n(r), 17, () => J(a), (e) => e.key, (e, r) => {
					{
						let i = /* @__PURE__ */ M(() => `${t.uid}-prop-${J(r).key}`);
						Ka(e, {
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
			var b = L(_, 2), ee = I(b), x = I(ee, !0);
			D(ee);
			var te = L(ee, 2), ne = I(te, !0);
			D(te), D(b), R((e, n, a) => {
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
	}), D(u), R((e) => {
		$(u, "aria-labelledby", `${t.uid}-inspector-title`), $(d, "id", `${t.uid}-inspector-title`), Q(f, e);
	}, [() => J(n)("inspector.title")]), Z(e, u), zt();
}
si(["input", "click"]);
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
	let a = s(e, i.parent);
	return {
		parent: i.parent,
		index: a.indexOf(i.id) + 1
	};
}, no = /* @__PURE__ */ X("<li><button type=\"button\" class=\"svelte-om8jxl\"> </button></li>"), ro = /* @__PURE__ */ X("<h3 class=\"svelte-om8jxl\"> </h3> <ul class=\"svelte-om8jxl\"></ul>", 1), io = /* @__PURE__ */ X("<section class=\"palette svelte-om8jxl\" aria-labelledby=\"cpb-palette-title\"><h2 id=\"cpb-palette-title\" class=\"svelte-om8jxl\"> </h2> <!></section>"), ao = {
	hash: "svelte-om8jxl",
	code: ".palette.svelte-om8jxl {padding:.5rem .75rem;overflow:auto;}h2.svelte-om8jxl {font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin:0 0 .5rem;color:var(--cpb-muted);}h3.svelte-om8jxl {font-size:.75rem;margin:.5rem 0 .25rem;color:var(--cpb-muted);text-transform:capitalize;}ul.svelte-om8jxl {list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2, 1fr);gap:.25rem;}button.svelte-om8jxl {touch-action:none;width:100%;font:inherit;font-size:.8rem;padding:.35rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;text-align:left;}button.svelte-om8jxl:hover {border-color:var(--cpb-accent);}button.svelte-om8jxl:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function oo(e, t) {
	Rt(t, !0), Ni(e, ao);
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
		let r = to(t.store.tree, n, t.store.selection, e.type);
		t.store.run({
			kind: "insert",
			...r,
			node: $a(n, e.type)
		}, ["announce.inserted", { label: e.label }]) && t.store.selection && t.onInserted(t.store.selection);
	}
	var o = io(), s = I(o), c = I(s, !0);
	D(s), Di(L(s, 2), 17, () => J(i), ([e, t]) => e, (e, r) => {
		var i = /* @__PURE__ */ M(() => Ve(J(r), 2));
		let o = () => J(i)[0], s = () => J(i)[1];
		var c = ro(), l = $n(c), u = I(l, !0);
		D(l);
		var d = L(l, 2);
		Di(d, 21, s, (e) => e.type, (e, r) => {
			var i = no(), o = I(i), s = I(o, !0);
			D(o), D(i), R((e) => {
				$(o, "aria-label", e), $(o, "data-type", J(r).type), Q(s, J(r).label);
			}, [() => J(n)("palette.insert", { label: J(r).label })]), Y("click", o, () => a(J(r))), Y("pointerdown", o, (e) => t.store.catalogue && t.drag.pressNew(e, {
				kind: "insert",
				node: $a(t.store.catalogue, J(r).type)
			}, J(r).label)), Z(e, i);
		}), D(d), R((e) => Q(u, e), [() => o().replace(/_/g, " ")]), Z(e, c);
	}), D(o), R((e) => Q(c, e), [() => J(n)("palette.title")]), Z(e, o), zt();
}
si(["click", "pointerdown"]);
// src/ui/model/flatten.ts
var so = (e) => {
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
}, co = (e) => {
	if (!(e.ctrlKey || e.metaKey) || e.altKey) return null;
	let t = e.key.toLowerCase();
	return t === "z" ? e.shiftKey ? { type: "redo" } : { type: "undo" } : t === "y" ? { type: "redo" } : null;
}, lo = (e, t, n) => {
	let r = so(e), i = r[0];
	if (!i) return null;
	let a = t === null ? -1 : r.findIndex((e) => e.id === t), o = r[a];
	if (!o) return n.key === "ArrowDown" || n.key === "Home" ? {
		type: "select",
		id: i.id
	} : null;
	let c = e.nodes[o.id], l = s(e, o.parent), u = n.ctrlKey || n.metaKey;
	if (n.altKey && !u) switch (n.key) {
		case "ArrowUp": return o.index > 0 ? uo(o.id, o.parent, o.index - 1) : null;
		case "ArrowDown": return o.index < l.length - 1 ? uo(o.id, o.parent, o.index + 2) : null;
		case "ArrowRight": {
			let t = l[o.index - 1];
			return t ? uo(o.id, t, e.nodes[t]?.children.length ?? 0) : null;
		}
		case "ArrowLeft": {
			if (o.parent === null) return null;
			let t = e.nodes[o.parent], n = s(e, t?.parent ?? null);
			return uo(o.id, t?.parent ?? null, n.indexOf(o.parent) + 1);
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
	if (u || n.altKey) return co(n);
	switch (n.key) {
		case "ArrowDown": return fo(r[a + 1]?.id);
		case "ArrowUp": return fo(r[a - 1]?.id);
		case "Home": return fo(i.id);
		case "End": return fo(r[r.length - 1]?.id);
		case "ArrowRight": return fo(c?.children[0]);
		case "ArrowLeft": return fo(o.parent ?? void 0);
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
}, uo = (e, t, n) => ({
	type: "command",
	command: {
		kind: "move",
		id: e,
		parent: t,
		index: n
	}
}), fo = (e) => e ? {
	type: "select",
	id: e
} : null, po = /* @__PURE__ */ X("<p class=\"empty svelte-y2i8n1\"> </p>"), mo = /* @__PURE__ */ X("<li role=\"treeitem\" class=\"svelte-y2i8n1\"> </li>"), ho = /* @__PURE__ */ X("<ul role=\"tree\" aria-labelledby=\"cpb-structure-title\" aria-describedby=\"cpb-structure-help\" class=\"svelte-y2i8n1\"></ul>"), go = /* @__PURE__ */ X("<section class=\"structure svelte-y2i8n1\" aria-labelledby=\"cpb-structure-title\"><h2 id=\"cpb-structure-title\" class=\"svelte-y2i8n1\"> </h2> <p class=\"help svelte-y2i8n1\" id=\"cpb-structure-help\"> </p> <!></section>"), _o = {
	hash: "svelte-y2i8n1",
	code: ".structure.svelte-y2i8n1 {padding:.5rem .75rem;overflow:auto;border-top:1px solid var(--cpb-border);}h2.svelte-y2i8n1 {font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin:0;color:var(--cpb-muted);}.help.svelte-y2i8n1, .empty.svelte-y2i8n1 {font-size:.75rem;color:var(--cpb-muted);margin:.25rem 0 .5rem;}ul.svelte-y2i8n1 {list-style:none;margin:0;padding:0;outline:none;}li.svelte-y2i8n1 {font-size:.85rem;padding:.25rem .375rem;border-radius:4px;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}li[aria-selected='true'].svelte-y2i8n1 {background:var(--cpb-accent-soft);color:var(--cpb-accent-strong);font-weight:600;}li.svelte-y2i8n1:focus-visible, ul.svelte-y2i8n1:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:-2px;}"
};
function vo(e, t) {
	Rt(t, !0), Ni(e, _o);
	let n = /* @__PURE__ */ M(() => t.store.t), r = /* @__PURE__ */ M(() => so(t.store.tree)), i = /* @__PURE__ */ N(void 0), a = (e) => {
		let n = t.store.tree.nodes[e];
		if (!n) return e;
		let r = typeof n.fields.name == "string" && n.fields.name !== "" ? n.fields.name : null, i = t.store.catalogue?.get(n.type);
		return r ? `${r} (${i?.label ?? n.type})` : i?.label ?? n.type;
	};
	async function o(e) {
		await Yr(), ((e ? J(i)?.querySelector(`[data-node-id="${CSS.escape(e)}"]`) : null) ?? J(i))?.focus();
	}
	async function s(e) {
		if ((e.key === "F2" || e.key === "Enter") && t.store.selection && !e.altKey) {
			t.onEdit(t.store.selection) && e.preventDefault();
			return;
		}
		let n = lo(t.store.tree, t.store.selection, e);
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
	var c = { focusItem: o }, l = go(), u = I(l), d = I(u, !0);
	D(u);
	var f = L(u, 2), p = I(f, !0);
	D(f);
	var m = L(f, 2), h = (e) => {
		var t = po(), r = I(t, !0);
		D(t), R((e) => Q(r, e), [() => J(n)("structure.empty")]), Z(e, t);
	}, g = (e) => {
		var n = ho();
		Di(n, 21, () => J(r), (e) => e.id, (e, n) => {
			var r = mo();
			let i;
			var o = I(r, !0);
			D(r), R((e) => {
				$(r, "aria-level", J(n).depth), $(r, "aria-setsize", J(n).siblings), $(r, "aria-posinset", J(n).index + 1), $(r, "aria-selected", t.store.selection === J(n).id), $(r, "tabindex", t.store.selection === J(n).id ? 0 : -1), $(r, "data-node-id", J(n).id), i = Ri(r, "", i, { "padding-left": `${(J(n).depth - 1) * 14 + 6}px` }), Q(o, e);
			}, [() => a(J(n).id)]), Y("click", r, () => t.store.select(J(n).id)), oi("focus", r, () => t.store.selection !== J(n).id && t.store.select(J(n).id)), Y("keydown", r, () => {}), Z(e, r);
		}), D(n), $i(n, (e) => P(i, e), () => J(i)), R(() => $(n, "tabindex", t.store.selection ? -1 : 0)), Y("keydown", n, s), Z(e, n);
	};
	return xi(m, (e) => {
		J(r).length === 0 ? e(h) : e(g, -1);
	}), D(l), R((e, t) => {
		Q(d, e), Q(p, t);
	}, [() => J(n)("structure.title"), () => J(n)("structure.help")]), Z(e, l), zt(c);
}
si(["keydown", "click"]);
// src/ui/toolbar/Toolbar.svelte
var yo = /* @__PURE__ */ X("<span class=\"revision svelte-ouhh5d\"> </span>"), bo = /* @__PURE__ */ X("<div class=\"toolbar svelte-ouhh5d\" role=\"toolbar\"><button type=\"button\" aria-keyshortcuts=\"Control+Z\" class=\"svelte-ouhh5d\"> </button> <button type=\"button\" aria-keyshortcuts=\"Control+Shift+Z\" class=\"svelte-ouhh5d\"> </button> <button type=\"button\" class=\"primary svelte-ouhh5d\"> </button> <span class=\"status svelte-ouhh5d\"> </span> <!></div>"), xo = {
	hash: "svelte-ouhh5d",
	code: ".toolbar.svelte-ouhh5d {display:flex;gap:.5rem;align-items:center;padding:.5rem .75rem;border-bottom:1px solid var(--cpb-border);}button.svelte-ouhh5d {font:inherit;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.svelte-ouhh5d:disabled {opacity:.5;cursor:not-allowed;}button.primary.svelte-ouhh5d {background:var(--cpb-accent);border-color:var(--cpb-accent);color:#fff;}button.svelte-ouhh5d:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:2px;}.status.svelte-ouhh5d {margin-left:auto;font-size:.875rem;}.status[data-status='conflict'].svelte-ouhh5d, .status[data-status='offline'].svelte-ouhh5d, .status[data-status='load-error'].svelte-ouhh5d {color:var(--cpb-danger);font-weight:600;}.revision.svelte-ouhh5d {font-size:.75rem;color:var(--cpb-muted);}"
};
function So(e, t) {
	Rt(t, !0), Ni(e, xo);
	let n = /* @__PURE__ */ M(() => t.store.t);
	var r = bo(), i = I(r), a = I(i, !0);
	D(i);
	var o = L(i, 2), s = I(o, !0);
	D(o);
	var c = L(o, 2), l = I(c, !0);
	D(c);
	var u = L(c, 2), d = I(u, !0);
	D(u);
	var f = L(u, 2), p = (e) => {
		var r = yo(), i = I(r, !0);
		D(r), R((e) => Q(i, e), [() => J(n)("toolbar.revision", { revision: t.store.revision })]), Z(e, r);
	};
	xi(f, (e) => {
		t.store.revision > 0 && e(p);
	}), D(r), R((e, n, f, p, m) => {
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
var Co = /* @__PURE__ */ X("<div class=\"editor svelte-b7je3p\" role=\"application\"><!> <div class=\"body svelte-b7je3p\"><aside class=\"left svelte-b7je3p\"><!> <!></aside> <!> <!></div> <div class=\"sr-only svelte-b7je3p\" aria-live=\"polite\"> </div> <div class=\"sr-only svelte-b7je3p\" aria-live=\"assertive\" role=\"alert\"> </div></div>"), wo = {
	hash: "svelte-b7je3p",
	code: ".editor.svelte-b7je3p {--cpb-border: #d4d4d8;--cpb-surface: #fff;--cpb-canvas: #f1f5f9;--cpb-muted: #52525b;--cpb-accent: #2563eb;--cpb-accent-soft: #dbeafe;--cpb-accent-strong: #1e3a8a;--cpb-danger: #b91c1c;font:14px/1.4 system-ui, sans-serif;color:#18181b;background:var(--cpb-surface);display:flex;flex-direction:column;height:100%;min-height:600px;border:1px solid var(--cpb-border);}.body.svelte-b7je3p {flex:1;display:grid;grid-template-columns:240px 1fr 280px;min-height:0;}.left.svelte-b7je3p {display:grid;grid-template-rows:minmax(0, 45%) minmax(0, 1fr);min-height:0;border-right:1px solid var(--cpb-border);}.sr-only.svelte-b7je3p {position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;}\n  @media (max-width: 900px) {.body.svelte-b7je3p {grid-template-columns:1fr;} }"
};
function To(e, t) {
	Rt(t, !0), Ni(e, wo);
	let n = ea(t, "stylesheets", 19, () => []), r = /* @__PURE__ */ N(void 0), i = /* @__PURE__ */ N(void 0), a = /* @__PURE__ */ M(() => new ja(t.store));
	function o(e) {
		if (e.target?.closest("input, textarea, select, [contenteditable=\"true\"], [role=\"tree\"]")) return;
		let n = co(e);
		n && (e.preventDefault(), n.type === "undo" ? t.store.undo() : n.type === "redo" && t.store.redo());
	}
	var s = Co(), c = I(s);
	So(c, { get store() {
		return t.store;
	} });
	var l = L(c, 2), u = I(l), d = I(u);
	oo(d, {
		get store() {
			return t.store;
		},
		get drag() {
			return J(a);
		},
		onInserted: (e) => J(r)?.focusItem(e)
	}), $i(vo(L(d, 2), {
		get store() {
			return t.store;
		},
		onEdit: (e) => J(i)?.startEditing(e) ?? !1
	}), (e) => P(r, e, !0), () => J(r)), D(u);
	var f = L(u, 2);
	$i(Sa(f, {
		get store() {
			return t.store;
		},
		get drag() {
			return J(a);
		},
		get uid() {
			return t.uid;
		},
		get stylesheets() {
			return n();
		},
		onEditEnd: (e, t) => {
			t && J(r)?.focusItem(e);
		}
	}), (e) => P(i, e, !0), () => J(i)), Qa(L(f, 2), {
		get store() {
			return t.store;
		},
		get uid() {
			return t.uid;
		},
		onRemoved: () => J(r)?.focusItem(t.store.selection)
	}), D(l);
	var p = L(l, 2), m = I(p, !0);
	D(p);
	var h = L(p, 2), g = I(h, !0);
	D(h), D(s), R((e) => {
		$(s, "aria-label", e), Q(m, t.store.message), Q(g, t.store.alert);
	}, [() => t.store.t("editor.label")]), Y("keydown", s, o), Z(e, s), zt();
}
si(["keydown"]);
// src/ui/i18n/en.ts
var Eo = {
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
	"error.VALIDATION_FAILED": "The server rejected the page.",
	"error.AUTHORIZATION_DENIED": "You do not have permission for this action.",
	"error.NETWORK": "Offline. Your changes are still here.",
	"error.SERVER": "Server error. Your changes are still here."
}, Do = {
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
	"error.VALIDATION_FAILED": "El servidor rechazó la página.",
	"error.AUTHORIZATION_DENIED": "No tienes permiso para esta acción.",
	"error.NETWORK": "Sin conexión. Tus cambios siguen aquí.",
	"error.SERVER": "Error del servidor. Tus cambios siguen aquí."
}, Oo = {
	es: Do,
	en: Eo
}, ko = (e) => {
	let t = Oo[e.toLowerCase().split("-")[0] ?? "es"] ?? Do;
	return (e, n = {}) => t[e].replace(/\{(\w+)\}/g, (e, t) => String(n[t] ?? `{${t}}`));
}, Ao = class {
	session;
	t;
	#e = /* @__PURE__ */ N({
		nodes: {},
		rootIds: []
	});
	get tree() {
		return J(this.#e);
	}
	set tree(e) {
		P(this.#e, e);
	}
	#t = /* @__PURE__ */ N(null);
	get catalogue() {
		return J(this.#t);
	}
	set catalogue(e) {
		P(this.#t, e);
	}
	#n = /* @__PURE__ */ N(null);
	get selection() {
		return J(this.#n);
	}
	set selection(e) {
		P(this.#n, e, !0);
	}
	#r = /* @__PURE__ */ N("loading");
	get status() {
		return J(this.#r);
	}
	set status(e) {
		P(this.#r, e, !0);
	}
	#i = /* @__PURE__ */ N(!1);
	get dirty() {
		return J(this.#i);
	}
	set dirty(e) {
		P(this.#i, e, !0);
	}
	#a = /* @__PURE__ */ N(!1);
	get canUndo() {
		return J(this.#a);
	}
	set canUndo(e) {
		P(this.#a, e, !0);
	}
	#o = /* @__PURE__ */ N(!1);
	get canRedo() {
		return J(this.#o);
	}
	set canRedo(e) {
		P(this.#o, e, !0);
	}
	#s = /* @__PURE__ */ N(0);
	get revision() {
		return J(this.#s);
	}
	set revision(e) {
		P(this.#s, e, !0);
	}
	#c = /* @__PURE__ */ N("");
	get message() {
		return J(this.#c);
	}
	set message(e) {
		P(this.#c, e, !0);
	}
	#l = /* @__PURE__ */ N("");
	get alert() {
		return J(this.#l);
	}
	set alert(e) {
		P(this.#l, e, !0);
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
	fail(e, t = e instanceof l ? e.code : "SERVER") {
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
}, jo = [
	"ready",
	"selection-change",
	"dirty-change",
	"save-start",
	"save-success",
	"save-error",
	"conflict"
], Mo = 0, No = class extends HTMLElement {
	#e = null;
	#t = null;
	#n = null;
	#r = null;
	#i = `cpb${++Mo}`;
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
		for (let e of jo) n.events.on(e, (t) => {
			let n = e === "save-error" ? { code: t.error.code } : t;
			this.dispatchEvent(new CustomEvent(e, {
				detail: n,
				bubbles: !0,
				composed: !0
			}));
		});
		let r = new Ao(n, ko(e.locale ?? "es"));
		this.#n = n, this.#r = r, this.#t = hi(To, {
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
}, Po = (e = "ceiba-page-builder") => {
	customElements.get(e) || customElements.define(e, No);
};
// src/ui/index.ts
Po();
export { No as CeibaPageBuilder, re as DEFAULT_HISTORY, l as EditorError, ne as EditorSession, jo as PUBLIC_EVENTS, xe as REFERENCE_PROPS, ue as SCHEMA_VERSION, ae as SERVER_LIMITS, we as afterRedo, _ as afterUndo, fe as applyCommand, oe as assertDepth, ce as assertEditable, se as assertKnown, te as assertNewContent, ge as assertNodeCount, Se as assertPlacement, pe as assertSize, f as attachRaw, n as canRedo, Ce as canUndo, le as checkTree, s as childrenOf, Te as createCatalogue, ie as createCommands, be as createEditor, me as createHttpTransport, Po as defineElement, a as depthOf, v as emptyHistory, y as emptyTree, ve as errorFromResponse, x as fail, m as fromDocument, c as getNode, r as groupKeyOf, d as heightOf, g as indexInParent, ee as insertAt, Ee as isSelfOrDescendant, p as measureRaw, t as nodeCount, de as parseDocument, he as randomIds, i as record, ye as sequentialIds, b as subtreeIds, e as toDocument, h as toRaw, o as withChildren, u as withNode, _e as withoutNodes };

//# sourceMappingURL=ceiba-page-builder.js.map