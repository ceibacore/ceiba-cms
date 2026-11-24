import { $ as e, A as t, B as n, C as r, D as i, E as a, F as o, G as s, H as c, I as l, J as u, K as d, L as f, M as p, N as m, O as h, P as g, Q as _, R as v, S as y, T as b, U as x, V as S, W as C, X as ee, Y as w, Z as T, _ as E, _t as te, a as ne, at as re, b as ie, c as ae, ct as oe, d as se, dt as ce, et as le, f as ue, ft as de, g as fe, gt as pe, h as me, ht as he, i as ge, it as _e, j as ve, k as ye, l as be, lt as xe, m as Se, mt as Ce, n as we, nt as Te, o as Ee, ot as De, p as Oe, pt as ke, q as Ae, r as je, rt as Me, s as Ne, st as Pe, t as Fe, tt as Ie, u as Le, ut as Re, v as ze, vt as Be, w as Ve, x as He, y as Ue, z as We } from "./shared/core.js";
// node_modules/svelte/src/internal/shared/utils.js
var Ge = Array.isArray, Ke = Array.prototype.indexOf, qe = Array.prototype.includes, Je = Array.from, Ye = Object.defineProperty, Xe = Object.getOwnPropertyDescriptor, Ze = Object.getOwnPropertyDescriptors, Qe = Object.prototype, $e = Array.prototype, et = Object.getPrototypeOf, tt = Object.isExtensible, nt = () => {};
function rt(e) {
	for (var t = 0; t < e.length; t++) e[t]();
}
function it() {
	var e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
function at(e, t) {
	if (Array.isArray(e)) return e;
	if (t === void 0 || !(Symbol.iterator in e)) return Array.from(e);
	let n = [];
	for (let r of e) if (n.push(r), n.length === t) break;
	return n;
}
var ot = 1024, st = 2048, ct = 4096, lt = 8192, ut = 16384, dt = 32768, ft = 1 << 25, pt = 65536, mt = 1 << 19, ht = 1 << 20, gt = 1 << 25, _t = 65536, vt = 1 << 21, yt = 1 << 22, bt = 1 << 23, xt = Symbol("$state"), St = Symbol("legacy props"), Ct = Symbol(""), wt = Symbol("attributes"), Tt = Symbol("class"), Et = Symbol("style"), Dt = Symbol("text"), Ot = Symbol("form reset"), kt = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), At = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
// node_modules/svelte/src/internal/client/errors.js
function jt() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function Mt(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function Nt(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function Pt() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Ft(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function It() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Lt(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function Rt() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function zt() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function Bt() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Vt() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
// node_modules/svelte/src/constants.js
var Ht = {}, Ut = Symbol("uninitialized"), Wt = "http://www.w3.org/1999/xhtml";
function Gt() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function Kt(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function qt() {
	console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function Jt() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
// node_modules/svelte/src/internal/client/dom/hydration.js
var D = !1;
function Yt(e) {
	D = e;
}
var O;
function Xt(e) {
	if (e === null) throw Kt(), Ht;
	return O = e;
}
function Zt() {
	return Xt(/* @__PURE__ */ br(O));
}
function k(e) {
	if (D) {
		if (/* @__PURE__ */ br(O) !== null) throw Kt(), Ht;
		O = e;
	}
}
function Qt(e = 1) {
	if (D) {
		for (var t = e, n = O; t--;) n = /* @__PURE__ */ br(n);
		O = n;
	}
}
function $t(e = !0) {
	for (var t = 0, n = O;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ br(n);
		e && n.remove(), n = i;
	}
}
function en(e) {
	if (!e || e.nodeType !== 8) throw Kt(), Ht;
	return e.data;
}
// node_modules/svelte/src/internal/client/reactivity/equality.js
function tn(e) {
	return e === this.v;
}
function nn(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function rn(e) {
	return !nn(e, this.v);
}
// node_modules/svelte/src/internal/client/context.js
var an = null;
function on(e) {
	an = e;
}
function A(e, t = !1, n) {
	an = {
		p: an,
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
	var t = an, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) Ir(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, an = t.p, e ?? {};
}
function sn() {
	return !0;
}
// node_modules/svelte/src/internal/client/dom/task.js
var cn = [];
function ln() {
	var e = cn;
	cn = [], rt(e);
}
function un(e) {
	if (cn.length === 0 && !wn) {
		var t = cn;
		queueMicrotask(() => {
			t === cn && ln();
		});
	}
	cn.push(e);
}
function dn() {
	for (; cn.length > 0;) ln();
}
function fn(e) {
	var t = H;
	if (t === null) return V.f |= bt, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	pn(e, t);
}
function pn(e, t) {
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
var mn = ~(st | ct | ot);
function M(e, t) {
	e.f = e.f & mn | t;
}
function hn(e) {
	e.f & 512 || e.deps === null ? M(e, ot) : M(e, ct);
}
// node_modules/svelte/src/internal/client/reactivity/utils.js
function gn(e) {
	if (e !== null) for (let t of e) t.f & 2 && t.f & 65536 && (t.f ^= _t, gn(t.deps));
}
function _n(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), gn(e.deps), M(e, ot);
}
// node_modules/svelte/src/internal/client/reactivity/store.js
var vn = !1;
function yn(e) {
	var t = vn;
	try {
		return vn = !1, [e(), vn];
	} finally {
		vn = t;
	}
}
// node_modules/svelte/src/internal/client/reactivity/batch.js
var bn = null, N = null, xn = null, Sn = null, Cn = null, wn = !1, Tn = !1, En = null, Dn = null, On = 0, kn = 1, An = class e {
	id = kn++;
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
			for (var r of n.d) M(r, st), t(r);
			for (r of n.m) M(r, ct), t(r);
		}
		this.#m.add(e);
	}
	#_() {
		if (this.#e = !0, On++ > 1e3 && (this.#C(), Mn()), !this.#g()) {
			for (let e of this.#d) this.#f.delete(e), M(e, st), this.schedule(e);
			for (let e of this.#f) M(e, ct), this.schedule(e);
		}
		let t = this.#l;
		this.#l = [], this.apply();
		var n = En = [], r = [], i = Dn = [];
		for (let e of t) try {
			this.#v(e, n, r);
		} catch (t) {
			throw Ln(e), t;
		}
		if (N = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (En = null, Dn = null, this.#g()) {
			this.#x(r), this.#x(n);
			for (let [e, t] of this.#p) In(e, t);
			i.length > 0 && N.#_();
			return;
		}
		let o = this.#y();
		if (o) o.#b(this);
		else {
			this.#d.clear(), this.#f.clear();
			for (let e of this.#r) e(this);
			this.#r.clear(), xn = this, Pn(r), Pn(n), xn = null, this.#c?.resolve();
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
		e.f ^= ot;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#p.has(r)) && r.fn !== null) {
				a ? r.f ^= ot : i & 4 ? t.push(r) : vi(r) && (i & 16 && this.#f.add(r), Ci(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#f.delete(i), M(i, st), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#C(), N = this, this.#_();
	}
	#x(e) {
		for (var t = 0; t < e.length; t += 1) _n(e[t], this.#d, this.#f);
	}
	capture(e, t, n = !1) {
		e.v !== Ut && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), Sn?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		N = this;
	}
	deactivate() {
		N = null, Sn = null;
	}
	flush() {
		try {
			Tn = !0, N = this, this.#_();
		} finally {
			On = 0, Cn = null, En = null, Dn = null, Tn = !1, N = null, Sn = null, nr.clear();
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
		this.#h || (this.#h = !0, un(() => {
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
		return (this.#c ??= it()).promise;
	}
	static ensure() {
		if (N === null) {
			let t = N = new e();
			t.#S(), !Tn && !wn && un(() => {
				t.#e || t.flush();
			});
		}
		return N;
	}
	apply() {
		Sn = null;
	}
	schedule(e) {
		if (Cn = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) e.b.defer_effect(e);
		else {
			for (var t = e; t.parent !== null;) {
				t = t.parent;
				var n = t.f;
				if (En !== null && t === H && (V === null || !(V.f & 2))) return;
				if (n & 96) {
					if (!(n & 1024)) return;
					t.f ^= ot;
				}
			}
			this.#l.push(t);
		}
	}
	#S() {
		bn === null ? bn = this : (bn.#n = this, this.#t = bn), bn = this;
	}
	#C() {
		var e = this.#t, t = this.#n;
		e === null || (e.#n = t), t === null ? bn = e : t.#t = e, this.linked = !1;
	}
};
function jn(e) {
	var t = wn;
	wn = !0;
	try {
		var n;
		for (e && (N !== null && !N.is_fork && N.flush(), n = e());;) {
			if (dn(), N === null) return n;
			N.flush();
		}
	} finally {
		wn = t;
	}
}
function Mn() {
	try {
		It();
	} catch (e) {
		pn(e, Cn);
	}
}
var Nn = null;
function Pn(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && vi(r) && (Nn = /* @__PURE__ */ new Set(), Ci(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Jr(r), Nn?.size > 0)) {
				nr.clear();
				for (let e of Nn) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Nn.has(n) && (Nn.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || Ci(n);
					}
				}
				Nn.clear();
			}
		}
		Nn = null;
	}
}
function Fn(e) {
	N.schedule(e);
}
function In(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), M(e, ot);
		for (var n = e.first; n !== null;) In(n, t), n = n.next;
	}
}
function Ln(e) {
	M(e, ot);
	for (var t = e.first; t !== null;) Ln(t), t = t.next;
}
// node_modules/svelte/src/reactivity/create-subscriber.js
function Rn(e) {
	let t = 0, n = ir(0), r;
	return () => {
		Nr() && (U(n), Br(() => (t === 0 && (r = Di(() => e(() => cr(n)))), t += 1, () => {
			un(() => {
				--t, t === 0 && (r?.(), r = void 0, cr(n));
			});
		})));
	};
}
// node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var zn = pt | mt;
function Bn(e, t, n, r) {
	new Vn(e, t, n, r);
}
var Vn = class {
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
	#h = Rn(() => (this.#m = ir(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = H;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = H.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = Vr(() => {
			if (D) {
				let e = this.#t;
				Zt();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, zn), D && (this.#e = O);
	}
	#g() {
		try {
			this.#a = Hr(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed;
		t && (this.#s = Hr(() => {
			t(this.#e, () => e, () => () => {});
		}));
	}
	#v() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = Hr(() => e(this.#e)), un(() => {
			var e = this.#c = document.createDocumentFragment(), t = vr();
			e.append(t), this.#a = this.#x(() => Hr(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, Yr(this.#o, () => {
				this.#o = null;
			}), this.#b(N));
		}));
	}
	#y() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = Hr(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				$r(this.#a, e);
				let t = this.#n.pending;
				this.#o = Hr(() => t(this.#e));
			} else this.#b(N);
		} catch (e) {
			this.error(e);
		}
	}
	#b(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		_n(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#x(e) {
		var t = H, n = V, r = an;
		oi(this.#i), ai(this.#i), on(this.#i.ctx);
		try {
			return An.ensure(), e();
		} catch (e) {
			return fn(e), null;
		} finally {
			oi(t), ai(n), on(r);
		}
	}
	#S(e, t) {
		this.has_pending_snippet() ? (this.#u += e, this.#u === 0 && (this.#b(t), this.#o && Yr(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null))) : this.parent && this.parent.#S(e, t);
	}
	update_pending_count(e, t) {
		this.#S(e, t), this.#l += e, !this.#m || this.#d || (this.#d = !0, un(() => {
			this.#d = !1, this.#m && or(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), U(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		N?.is_fork ? (this.#a && N.skip_effect(this.#a), this.#o && N.skip_effect(this.#o), this.#s && N.skip_effect(this.#s), N.on_fork_commit(() => {
			this.#C(e);
		})) : this.#C(e);
	}
	#C(e) {
		this.#a &&= (Kr(this.#a), null), this.#o &&= (Kr(this.#o), null), this.#s &&= (Kr(this.#s), null), D && (Xt(this.#t), Qt(), Xt($t()));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var r = !1, i = !1;
		let a = () => {
			r ? Jt() : (r = !0, i && Vt(), this.#s !== null && Yr(this.#s, () => {
				this.#s = null;
			}), this.#x(() => {
				this.#y();
			}));
		}, o = (e) => {
			try {
				i = !0, t?.(e, a), i = !1;
			} catch (e) {
				pn(e, this.#i && this.#i.parent);
			}
			n && (this.#s = this.#x(() => {
				try {
					return Hr(() => {
						var t = H;
						t.b = this, t.f |= 128, n(this.#e, () => e, () => a);
					});
				} catch (e) {
					return pn(e, this.#i.parent), null;
				}
			}));
		};
		un(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				pn(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(o, (e) => pn(e, this.#i && this.#i.parent)) : o(t);
		});
	}
};
// node_modules/svelte/src/internal/client/reactivity/async.js
function Hn(e, t, n, r) {
	let i = sn() ? Kn : Yn;
	var a = e.filter((e) => !e.settled);
	if (n.length === 0 && a.length === 0) {
		r(t.map(i));
		return;
	}
	var o = H, s = Un(), c = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function l(e) {
		if (!(o.f & 16384)) {
			s();
			try {
				r(e);
			} catch (e) {
				pn(e, o);
			}
			Wn();
		}
	}
	var u = Gn();
	if (n.length === 0) {
		c.then(() => l(t.map(i))).finally(u);
		return;
	}
	function d() {
		Promise.all(n.map((e) => /* @__PURE__ */ Jn(e))).then((e) => l([...t.map(i), ...e])).catch((e) => pn(e, o)).finally(u);
	}
	c ? c.then(() => {
		s(), d(), Wn();
	}) : d();
}
function Un() {
	var e = H, t = V, n = an, r = N;
	return function(i = !0) {
		oi(e), ai(t), on(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function Wn(e = !0) {
	oi(null), ai(null), on(null), e && N?.deactivate();
}
function Gn() {
	var e = H, t = e.b, n = N, r = t.is_rendered();
	return t.update_pending_count(1, n), n.increment(r, e), () => {
		t.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function Kn(e) {
	var t = 2 | st;
	return H !== null && (H.f |= mt), {
		ctx: an,
		deps: null,
		effects: null,
		equals: tn,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: Ut,
		wv: 0,
		parent: H,
		ac: null
	};
}
var qn = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function Jn(e, t, n) {
	let r = H;
	r === null && jt();
	var i = void 0, a = ir(Ut), o = !V, s = /* @__PURE__ */ new Set();
	return zr(() => {
		var t = H, n = it();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== kt && n.reject(e);
			}).finally(Wn);
		} catch (e) {
			n.reject(e), Wn();
		}
		var c = N;
		if (o) {
			if (t.f & 32768) var l = Gn();
			if (r.b.is_rendered()) c.async_deriveds.get(t)?.reject(qn);
			else for (let e of s.values()) e.reject(qn);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== qn && (c.activate(), t ? (a.f |= bt, or(a, t)) : (a.f & 8388608 && (a.f ^= bt), or(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), Pr(() => {
		for (let e of s) e.reject(qn);
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
	let t = /* @__PURE__ */ Kn(e);
	return ci(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function Yn(e) {
	let t = /* @__PURE__ */ Kn(e);
	return t.equals = rn, t;
}
function Xn(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) Kr(t[n]);
	}
}
function Zn(e) {
	var t, n = H, r = e.parent;
	if (!ni && r !== null && e.v !== Ut && r.f & 24576) return Gt(), e.v;
	oi(r);
	try {
		e.f &= ~_t, Xn(e), t = bi(e);
	} finally {
		oi(n);
	}
	return t;
}
function Qn(e) {
	var t = Zn(e);
	!e.equals(t) && (e.wv = _i(), (!N?.is_fork || e.deps === null) && (N === null ? e.v = t : (N.capture(e, t, !0), xn?.capture(e, t, !0)), e.deps === null)) ? M(e, ot) : ni || (Sn === null ? hn(e) : (Nr() || N?.is_fork) && Sn.set(e, t));
}
function $n(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac?.abort(kt), t.fn !== null && (t.teardown = nt), t.ac = null, Si(t, 0), Wr(t));
}
function er(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && Ci(t);
}
// node_modules/svelte/src/internal/client/reactivity/sources.js
var tr = /* @__PURE__ */ new Set(), nr = /* @__PURE__ */ new Map(), rr = !1;
function ir(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: tn,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function F(e, t) {
	let n = ir(e, t);
	return ci(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function ar(e, t = !1, n = !0) {
	let r = ir(e);
	return t || (r.equals = rn), r;
}
function I(e, t, n = !1) {
	return V !== null && (!ii || V.f & 131072) && sn() && V.f & 4325394 && (si === null || !qe.call(si, e)) && Bt(), or(e, n ? ur(t) : t, Dn);
}
function or(e, t, n = null) {
	if (!e.equals(t)) {
		nr.set(e, ni ? t : e.v);
		var r = An.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && Zn(t), Sn === null && hn(t);
		}
		e.wv = _i(), lr(e, st, n), sn() && H !== null && H.f & 1024 && !(H.f & 96) && (di === null ? fi([e]) : di.push(e)), !r.is_fork && tr.size > 0 && !rr && sr();
	}
	return t;
}
function sr() {
	rr = !1;
	for (let e of tr) {
		e.f & 1024 && M(e, ct);
		let t;
		try {
			t = vi(e);
		} catch {
			t = !0;
		}
		t && Ci(e);
	}
	tr.clear();
}
function cr(e) {
	I(e, e.v + 1);
}
function lr(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = sn(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (i || s !== H) {
			var l = (c & st) === 0;
			if (l && M(s, t), c & 131072) tr.add(s);
			else if (c & 2) {
				var u = s;
				Sn?.delete(u), c & 65536 || (c & 512 && (H === null || !(H.f & 2097152)) && (s.f |= _t), lr(u, ct, n));
			} else if (l) {
				var d = s;
				c & 16 && Nn !== null && Nn.add(d), n === null ? Fn(d) : n.push(d);
			}
		}
	}
}
function ur(e) {
	if (typeof e != "object" || !e || xt in e) return e;
	let t = et(e);
	if (t !== Qe && t !== $e) return e;
	var n = /* @__PURE__ */ new Map(), r = Ge(e), i = /* @__PURE__ */ F(0), a = null, o = hi, s = (e) => {
		if (hi === o) return e();
		var t = V, n = hi;
		ai(null), gi(o);
		var r = e();
		return ai(t), gi(n), r;
	};
	return r && n.set("length", /* @__PURE__ */ F(e.length, a)), new Proxy(e, {
		defineProperty(e, t, r) {
			"value" in r && r.configurable !== !1 && r.enumerable !== !1 && r.writable !== !1 || Rt();
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
					let e = s(() => /* @__PURE__ */ F(Ut, a));
					n.set(t, e), cr(i);
				}
			} else I(r, Ut), cr(i);
			return !0;
		},
		get(t, r, i) {
			if (r === xt) return e;
			var o = n.get(r), c = r in t;
			if (o === void 0 && (!c || Xe(t, r)?.writable) && (o = s(() => /* @__PURE__ */ F(ur(c ? t[r] : Ut), a)), n.set(r, o)), o !== void 0) {
				var l = U(o);
				return l === Ut ? void 0 : l;
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
				if (a !== void 0 && o !== Ut) return {
					enumerable: !0,
					configurable: !0,
					value: o,
					writable: !0
				};
			}
			return r;
		},
		has(e, t) {
			if (t === xt) return !0;
			var r = n.get(t), i = r !== void 0 && r.v !== Ut || Reflect.has(e, t);
			return (r !== void 0 || H !== null && (!i || Xe(e, t)?.writable)) && (r === void 0 && (r = s(() => /* @__PURE__ */ F(i ? ur(e[t]) : Ut, a)), n.set(t, r)), U(r) === Ut) ? !1 : i;
		},
		set(e, t, o, c) {
			var l = n.get(t), u = t in e;
			if (r && t === "length") for (var d = o; d < l.v; d += 1) {
				var f = n.get(d + "");
				f === void 0 ? d in e && (f = s(() => /* @__PURE__ */ F(Ut, a)), n.set(d + "", f)) : I(f, Ut);
			}
			if (l === void 0) (!u || Xe(e, t)?.writable) && (l = s(() => /* @__PURE__ */ F(void 0, a)), I(l, ur(o)), n.set(t, l));
			else {
				u = l.v !== Ut;
				var p = s(() => ur(o));
				I(l, p);
			}
			var m = Reflect.getOwnPropertyDescriptor(e, t);
			if (m?.set && m.set.call(c, o), !u) {
				if (r && typeof t == "string") {
					var h = n.get("length"), g = Number(t);
					Number.isInteger(g) && g >= h.v && I(h, g + 1);
				}
				cr(i);
			}
			return !0;
		},
		ownKeys(e) {
			U(i);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = n.get(e);
				return t === void 0 || t.v !== Ut;
			});
			for (var [r, a] of n) a.v !== Ut && !(r in e) && t.push(r);
			return t;
		},
		setPrototypeOf() {
			zt();
		}
	});
}
function dr(e) {
	try {
		if (typeof e == "object" && e && xt in e) return e[xt];
	} catch {}
	return e;
}
function fr(e, t) {
	return Object.is(dr(e), dr(t));
}
var pr, mr, hr, gr;
function _r() {
	if (pr === void 0) {
		pr = window, mr = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		hr = Xe(t, "firstChild").get, gr = Xe(t, "nextSibling").get, tt(e) && (e[Tt] = void 0, e[wt] = null, e[Et] = void 0, e.__e = void 0), tt(n) && (n[Dt] = void 0);
	}
}
function vr(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function yr(e) {
	return hr.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function br(e) {
	return gr.call(e);
}
function L(e, t) {
	if (!D) return /* @__PURE__ */ yr(e);
	var n = /* @__PURE__ */ yr(O);
	if (n === null) n = O.appendChild(vr());
	else if (t && n.nodeType !== 3) {
		var r = vr();
		return n?.before(r), Xt(r), r;
	}
	return t && wr(n), Xt(n), n;
}
function R(e, t = !1) {
	if (!D) {
		var n = /* @__PURE__ */ yr(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ br(n) : n;
	}
	if (t) {
		if (O?.nodeType !== 3) {
			var r = vr();
			return O?.before(r), Xt(r), r;
		}
		wr(O);
	}
	return O;
}
function z(e, t = 1, n = !1) {
	let r = D ? O : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ br(r);
	if (!D) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = vr();
			return r === null ? i?.after(a) : r.before(a), Xt(a), a;
		}
		wr(r);
	}
	return Xt(r), r;
}
function xr(e) {
	e.textContent = "";
}
function Sr() {
	return !1;
}
function Cr(e, t, n) {
	let r = n ? { is: n } : void 0;
	return document.createElementNS(t ?? "http://www.w3.org/1999/xhtml", e, r);
}
function wr(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
// node_modules/svelte/src/internal/client/dom/elements/misc.js
function Tr(e) {
	D && /* @__PURE__ */ yr(e) !== null && xr(e);
}
var Er = !1;
function Dr() {
	Er || (Er = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[Ot]?.();
		});
	}, { capture: !0 }));
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function Or(e) {
	var t = V, n = H;
	ai(null), oi(null);
	try {
		return e();
	} finally {
		ai(t), oi(n);
	}
}
function kr(e, t, n, r = n) {
	e.addEventListener(t, () => Or(n));
	let i = e[Ot];
	e[Ot] = i ? () => {
		i(), r(!0);
	} : () => r(!0), Dr();
}
// node_modules/svelte/src/internal/client/reactivity/effects.js
function Ar(e) {
	H === null && (V === null && Ft(e), Pt()), ni && Nt(e);
}
function jr(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function Mr(e, t) {
	var n = H;
	n !== null && n.f & 8192 && (e |= lt);
	var r = {
		ctx: an,
		deps: null,
		nodes: null,
		f: e | st | 512,
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
	if (e & 4) En === null ? An.ensure().schedule(r) : En.push(r);
	else if (t !== null) {
		try {
			Ci(r);
		} catch (e) {
			throw Kr(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= pt));
	}
	if (i !== null && (i.parent = n, n !== null && jr(i, n), V !== null && V.f & 2 && !(e & 64))) {
		var a = V;
		(a.effects ??= []).push(i);
	}
	return r;
}
function Nr() {
	return V !== null && !ii;
}
function Pr(e) {
	let t = Mr(8, null);
	return M(t, ot), t.teardown = e, t;
}
function Fr(e) {
	Ar("$effect");
	var t = H.f;
	if (!V && t & 32 && !(t & 32768)) {
		var n = an;
		(n.e ??= []).push(e);
	} else return Ir(e);
}
function Ir(e) {
	return Mr(4 | ht, e);
}
function Lr(e) {
	An.ensure();
	let t = Mr(64 | mt, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Yr(t, () => {
			Kr(t), n(void 0);
		}) : (Kr(t), n(void 0));
	});
}
function Rr(e) {
	return Mr(4, e);
}
function zr(e) {
	return Mr(yt | mt, e);
}
function Br(e, t = 0) {
	return Mr(8 | t, e);
}
function B(e, t = [], n = [], r = []) {
	Hn(r, t, n, (t) => {
		Mr(8, () => e(...t.map(U)));
	});
}
function Vr(e, t = 0) {
	return Mr(16 | t, e);
}
function Hr(e) {
	return Mr(32 | mt, e);
}
function Ur(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = ni, n = V;
		ri(!0), ai(null);
		try {
			t.call(null);
		} finally {
			ri(e), ai(n);
		}
	}
}
function Wr(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && Or(() => {
			e.abort(kt);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : Kr(n, t), n = r;
	}
}
function Gr(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || Kr(t), t = n;
	}
}
function Kr(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (qr(e.nodes.start, e.nodes.end), n = !0), M(e, ft), Wr(e, t && !n), Si(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	Ur(e), e.f ^= ft, e.f |= ut;
	var i = e.parent;
	i !== null && i.first !== null && Jr(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function qr(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ br(e);
		e.remove(), e = n;
	}
}
function Jr(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Yr(e, t, n = !0) {
	var r = [];
	Xr(e, r, !0);
	var i = () => {
		n && Kr(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Xr(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= lt;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				Xr(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function Zr(e) {
	Qr(e, !0);
}
function Qr(e, t) {
	if (e.f & 8192) {
		e.f ^= lt, e.f & 1024 || (M(e, st), An.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			Qr(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function $r(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ br(n);
		t.append(n), n = i;
	}
}
// node_modules/svelte/src/internal/client/legacy.js
var ei = null, ti = !1, ni = !1;
function ri(e) {
	ni = e;
}
var V = null, ii = !1;
function ai(e) {
	V = e;
}
var H = null;
function oi(e) {
	H = e;
}
var si = null;
function ci(e) {
	V !== null && (si === null ? si = [e] : si.push(e));
}
var li = null, ui = 0, di = null;
function fi(e) {
	di = e;
}
var pi = 1, mi = 0, hi = mi;
function gi(e) {
	hi = e;
}
function _i() {
	return ++pi;
}
function vi(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~_t), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (vi(a) && Qn(a), a.wv > e.wv) return !0;
		}
		t & 512 && Sn === null && M(e, ot);
	}
	return !1;
}
function yi(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(si !== null && qe.call(si, e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? yi(a, t, !1) : t === a && (n ? M(a, st) : a.f & 1024 && M(a, ct), Fn(a));
	}
}
function bi(e) {
	var t = li, n = ui, r = di, i = V, a = si, o = an, s = ii, c = hi, l = e.f;
	li = null, ui = 0, di = null, V = l & 96 ? null : e, si = null, on(e.ctx), ii = !1, hi = ++mi, e.ac !== null && (Or(() => {
		e.ac.abort(kt);
	}), e.ac = null);
	try {
		e.f |= vt;
		var u = e.fn, d = u();
		e.f |= dt;
		var f = e.deps, p = N?.is_fork;
		if (li !== null) {
			var m;
			if (p || Si(e, ui), f !== null && ui > 0) for (f.length = ui + li.length, m = 0; m < li.length; m++) f[ui + m] = li[m];
			else e.deps = f = li;
			if (Nr() && e.f & 512) for (m = ui; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && ui < f.length && (Si(e, ui), f.length = ui);
		if (sn() && di !== null && !ii && f !== null && !(e.f & 6146)) for (m = 0; m < di.length; m++) yi(di[m], e);
		if (i !== null && i !== e) {
			if (mi++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = mi;
			if (t !== null) for (let e of t) e.rv = mi;
			di !== null && (r === null ? r = di : r.push(...di));
		}
		return e.f & 8388608 && (e.f ^= bt), d;
	} catch (e) {
		return fn(e);
	} finally {
		e.f ^= vt, li = t, ui = n, di = r, V = i, si = a, on(o), ii = s, hi = c;
	}
}
function xi(e, t) {
	let n = t.reactions;
	if (n !== null) {
		var r = Ke.call(n, e);
		if (r !== -1) {
			var i = n.length - 1;
			i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
		}
	}
	if (n === null && t.f & 2 && (li === null || !qe.call(li, t))) {
		var a = t;
		a.f & 512 && (a.f ^= 512, a.f &= ~_t), a.v !== Ut && hn(a), $n(a), Si(a, 0);
	}
}
function Si(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) xi(e, n[r]);
}
function Ci(e) {
	var t = e.f;
	if (!(t & 16384)) {
		M(e, ot);
		var n = H, r = ti;
		H = e, ti = !0;
		try {
			t & 16777232 ? Gr(e) : Wr(e), Ur(e);
			var i = bi(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = pi;
		} finally {
			ti = r, H = n;
		}
	}
}
async function wi() {
	await Promise.resolve(), jn();
}
function U(e) {
	var t = !!(e.f & 2);
	if (ei?.add(e), V !== null && !ii && !(H !== null && H.f & 16384) && (si === null || !qe.call(si, e))) {
		var n = V.deps;
		if (V.f & 2097152) e.rv < mi && (e.rv = mi, li === null && n !== null && n[ui] === e ? ui++ : li === null ? li = [e] : li.push(e));
		else {
			V.deps ??= [], qe.call(V.deps, e) || V.deps.push(e);
			var r = e.reactions;
			r === null ? e.reactions = [V] : qe.call(r, V) || r.push(V);
		}
	}
	if (ni && nr.has(e)) return nr.get(e);
	if (t) {
		var i = e;
		if (ni) {
			var a = i.v;
			return (!(i.f & 1024) && i.reactions !== null || Ei(i)) && (a = Zn(i)), nr.set(i, a), a;
		}
		var o = !(i.f & 512) && !ii && V !== null && (ti || !!(V.f & 512)), s = (i.f & dt) === 0;
		vi(i) && (o && (i.f |= 512), Qn(i)), o && !s && (er(i), Ti(i));
	}
	if (Sn?.has(e)) return Sn.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function Ti(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (er(t), Ti(t));
}
function Ei(e) {
	if (e.v === Ut) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (nr.has(t) || t.f & 2 && Ei(t)) return !0;
	return !1;
}
function Di(e) {
	var t = ii;
	try {
		return ii = !0, e();
	} finally {
		ii = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var Oi = ["touchstart", "touchmove"];
function ki(e) {
	return Oi.includes(e);
}
// node_modules/svelte/src/internal/client/dev/css.js
var Ai = Symbol("events"), ji = /* @__PURE__ */ new Set(), Mi = /* @__PURE__ */ new Set();
function Ni(e) {
	if (!D) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function Pi(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Li.call(t, e), !e.cancelBubble) return Or(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? un(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function Fi(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = Pi(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && Pr(() => {
		t.removeEventListener(e, o, a);
	});
}
function W(e, t, n) {
	(t[Ai] ??= {})[e] = n;
}
function G(e) {
	for (var t = 0; t < e.length; t++) ji.add(e[t]);
	for (var n of Mi) n(e);
}
var Ii = null;
function Li(e) {
	var t = this, n = t.ownerDocument, r = e.type, i = e.composedPath?.() || [], a = i[0] || e.target;
	Ii = e;
	var o = 0, s = Ii === e && e[Ai];
	if (s) {
		var c = i.indexOf(s);
		if (c !== -1 && (t === document || t === window)) {
			e[Ai] = t;
			return;
		}
		var l = i.indexOf(t);
		if (l === -1) return;
		c <= l && (o = c);
	}
	if (a = i[o] || e.target, a !== t) {
		Ye(e, "currentTarget", {
			configurable: !0,
			get() {
				return a || n;
			}
		});
		var u = V, d = H;
		ai(null), oi(null);
		try {
			for (var f, p = []; a !== null;) {
				var m = a.assignedSlot || a.parentNode || a.host || null;
				try {
					var h = a[Ai]?.[r];
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
			e[Ai] = t, delete e.currentTarget, ai(u), oi(d);
		}
	}
}
// node_modules/svelte/src/internal/client/dom/reconciler.js
var Ri = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function zi(e) {
	return Ri?.createHTML(e) ?? e;
}
function Bi(e) {
	var t = Cr("template");
	return t.innerHTML = zi(e.replaceAll("<!>", "<!---->")), t.content;
}
// node_modules/svelte/src/internal/client/dom/template.js
function Vi(e, t) {
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
		if (D) return Vi(O, null), O;
		i === void 0 && (i = Bi(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ yr(i)));
		var t = r || mr ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ yr(t), s = t.lastChild;
			Vi(o, s);
		} else Vi(t, t);
		return t;
	};
}
function Hi(e = "") {
	if (!D) {
		var t = vr(e + "");
		return Vi(t, t), t;
	}
	var n = O;
	return n.nodeType === 3 ? wr(n) : (n.before(n = vr()), Xt(n)), Vi(n, n), n;
}
function Ui() {
	if (D) return Vi(O, null), O;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = vr();
	return e.append(t, n), Vi(t, n), e;
}
function q(e, t) {
	if (D) {
		var n = H;
		n.f & 32768 && n.nodes.end !== null || (n.nodes.end = O), Zt();
	} else e !== null && e.before(t);
}
function J(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[Dt] ??= e.nodeValue) && (e[Dt] = n, e.nodeValue = `${n}`);
}
function Wi(e, t) {
	return Ki(e, t);
}
var Gi = /* @__PURE__ */ new Map();
function Ki(e, { target: t, anchor: n, props: r = {}, events: i, context: a, intro: o = !0, transformError: s }) {
	_r();
	var c = void 0, l = Lr(() => {
		var o = n ?? t.appendChild(vr());
		Bn(o, { pending: () => {} }, (t) => {
			A({});
			var n = an;
			if (a && (n.c = a), i && (r.$$events = i), D && Vi(t, null), c = e(t, r) || {}, D && (H.nodes.end = O, O === null || O.nodeType !== 8 || O.data !== "]")) throw Kt(), Ht;
			j();
		}, s);
		var l = /* @__PURE__ */ new Set(), u = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!l.has(r)) {
					l.add(r);
					var i = ki(r);
					for (let e of [t, document]) {
						var a = Gi.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Gi.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Li, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return u(Je(ji)), Mi.add(u), () => {
			for (var e of l) for (let n of [t, document]) {
				var r = Gi.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Li), r.delete(e), r.size === 0 && Gi.delete(n)) : r.set(e, i);
			}
			Mi.delete(u), o !== n && o.parentNode?.removeChild(o);
		};
	});
	return qi.set(c, l), c;
}
var qi = /* @__PURE__ */ new WeakMap();
function Ji(e, t) {
	let n = qi.get(e);
	return n ? (qi.delete(e), n(t)) : Promise.resolve();
}
// node_modules/svelte/src/internal/client/dom/blocks/branches.js
var Yi = class {
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
			if (n) Zr(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (Kr(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						$r(r, t), t.append(vr()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else Kr(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), Yr(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (Kr(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = N, r = Sr();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = vr();
				i.append(a), this.#n.set(e, {
					effect: Hr(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, Hr(() => t(this.anchor)));
		}
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else D && (this.anchor = O), this.#a(n);
	}
};
// node_modules/svelte/src/internal/client/dom/blocks/if.js
function Y(e, t, n = !1) {
	var r;
	D && (r = O, Zt());
	var i = new Yi(e), a = n ? pt : 0;
	function o(e, t) {
		if (D) {
			var n = en(r);
			if (e !== parseInt(n.substring(1))) {
				var a = $t();
				Xt(a), i.anchor = a, Yt(!1), i.ensure(e, t), Yt(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	Vr(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
// node_modules/svelte/src/internal/client/dom/blocks/key.js
var Xi = Symbol("NaN");
function Zi(e, t, n) {
	D && Zt();
	var r = new Yi(e), i = !sn();
	Vr(() => {
		var e = t();
		e !== e && (e = Xi), i && typeof e == "object" && e && (e = {}), r.ensure(e, n);
	});
}
// node_modules/svelte/src/internal/client/dom/blocks/each.js
function Qi(e, t, n) {
	for (var r = [], i = t.length, a, o = t.length, s = 0; s < i; s++) {
		let n = t[s];
		Yr(n, () => {
			if (a) {
				if (a.pending.delete(n), a.done.add(n), a.pending.size === 0) {
					var t = e.outrogroups;
					$i(e, Je(a.done)), t.delete(a), t.size === 0 && (e.outrogroups = null);
				}
			} else --o;
		}, !1);
	}
	if (o === 0) {
		var c = r.length === 0 && n !== null;
		if (c) {
			var l = n, u = l.parentNode;
			xr(u), u.append(l), e.items.clear();
		}
		$i(e, t, !c);
	} else a = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(a);
}
function $i(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= gt, $r(a, document.createDocumentFragment())) : Kr(t[i], n);
	}
}
var ea;
function X(e, t, n, r, i, a = null) {
	var o = e, s = /* @__PURE__ */ new Map();
	if (t & 4) {
		var c = e;
		o = D ? Xt(/* @__PURE__ */ yr(c)) : c.appendChild(vr());
	}
	D && Zt();
	var l = null, u = /* @__PURE__ */ Yn(() => {
		var e = n();
		return Ge(e) ? e : e == null ? [] : Je(e);
	}), d, f = /* @__PURE__ */ new Map(), p = !0;
	function m(e) {
		g.effect.f & 16384 || (g.pending.delete(e), g.fallback = l, na(g, d, o, t, r), l !== null && (d.length === 0 ? l.f & 33554432 ? (l.f ^= gt, ia(l, null, o)) : Zr(l) : Yr(l, () => {
			l = null;
		})));
	}
	function h(e) {
		g.pending.delete(e);
	}
	var g = {
		effect: Vr(() => {
			d = U(u);
			var e = d.length;
			let c = !1;
			D && en(o) === "[!" != (e === 0) && (o = $t(), Xt(o), Yt(!1), c = !0);
			for (var g = /* @__PURE__ */ new Set(), _ = N, v = Sr(), y = 0; y < e; y += 1) {
				D && O.nodeType === 8 && O.data === "]" && (o = O, c = !0, Yt(!1));
				var b = d[y], x = r(b, y), S = p ? null : s.get(x);
				S ? (S.v && or(S.v, b), S.i && or(S.i, y), v && _.unskip_effect(S.e)) : (S = ra(s, p ? o : ea ??= vr(), b, x, y, i, t, n), p || (S.e.f |= gt), s.set(x, S)), g.add(x);
			}
			if (e === 0 && a && !l && (p ? l = Hr(() => a(o)) : (l = Hr(() => a(ea ??= vr())), l.f |= gt)), e > g.size && Mt("", "", ""), D && e > 0 && Xt($t()), !p) {
				if (f.set(_, g), v) {
					for (let [e, t] of s) g.has(e) || _.skip_effect(t.e);
					_.oncommit(m), _.ondiscard(h);
				} else m(_);
			}
			c && Yt(!0), U(u);
		}),
		flags: t,
		items: s,
		pending: f,
		outrogroups: null,
		fallback: l
	};
	p = !1, D && (o = O);
}
function ta(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function na(e, t, n, r, i) {
	var a = !!(r & 8), o = t.length, s = e.items, c = ta(e.effect.first), l, u = null, d, f = [], p = [], m, h, g, _;
	if (a) for (_ = 0; _ < o; _ += 1) m = t[_], h = i(m, _), g = s.get(h).e, g.f & 33554432 || (g.nodes?.a?.measure(), (d ??= /* @__PURE__ */ new Set()).add(g));
	for (_ = 0; _ < o; _ += 1) {
		if (m = t[_], h = i(m, _), g = s.get(h).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(g), t.done.delete(g);
		if (g.f & 8192 && (Zr(g), a && (g.nodes?.a?.unfix(), (d ??= /* @__PURE__ */ new Set()).delete(g))), g.f & 33554432) {
			if (g.f ^= gt, g === c) ia(g, null, n);
			else {
				var v = u ? u.next : c;
				g === e.effect.last && (e.effect.last = g.prev), g.prev && (g.prev.next = g.next), g.next && (g.next.prev = g.prev), aa(e, u, g), aa(e, g, v), ia(g, v, n), u = g, f = [], p = [], c = ta(u.next);
				continue;
			}
		}
		if (g !== c) {
			if (l !== void 0 && l.has(g)) {
				if (f.length < p.length) {
					var y = p[0], b;
					u = y.prev;
					var x = f[0], S = f[f.length - 1];
					for (b = 0; b < f.length; b += 1) ia(f[b], y, n);
					for (b = 0; b < p.length; b += 1) l.delete(p[b]);
					aa(e, x.prev, S.next), aa(e, u, x), aa(e, S, y), c = y, u = S, --_, f = [], p = [];
				} else l.delete(g), ia(g, c, n), aa(e, g.prev, g.next), aa(e, g, u === null ? e.effect.first : u.next), aa(e, u, g), u = g;
				continue;
			}
			for (f = [], p = []; c !== null && c !== g;) (l ??= /* @__PURE__ */ new Set()).add(c), p.push(c), c = ta(c.next);
			if (c === null) continue;
		}
		g.f & 33554432 || f.push(g), u = g, c = ta(g.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && ($i(e, Je(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (c !== null || l !== void 0) {
		var C = [];
		if (l !== void 0) for (g of l) g.f & 8192 || C.push(g);
		for (; c !== null;) !(c.f & 8192) && c !== e.fallback && C.push(c), c = ta(c.next);
		var ee = C.length;
		if (ee > 0) {
			var w = r & 4 && o === 0 ? n : null;
			if (a) {
				for (_ = 0; _ < ee; _ += 1) C[_].nodes?.a?.measure();
				for (_ = 0; _ < ee; _ += 1) C[_].nodes?.a?.fix();
			}
			Qi(e, C, w);
		}
	}
	a && un(() => {
		if (d !== void 0) for (g of d) g.nodes?.a?.apply();
	});
}
function ra(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? ir(n) : /* @__PURE__ */ ar(n, !1, !1) : null, l = o & 2 ? ir(i) : null;
	return {
		v: c,
		i: l,
		e: Hr(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function ia(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ br(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function aa(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
// node_modules/svelte/src/internal/client/dom/blocks/snippet.js
function oa(e, t, ...n) {
	var r = new Yi(e);
	Vr(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, pt);
}
// node_modules/svelte/src/internal/client/dom/css.js
function Z(e, t) {
	Rr(() => {
		var n = e.getRootNode(), r = n.host ? n : n.head ?? n.ownerDocument.head;
		if (!r.querySelector("#" + t.hash)) {
			let e = Cr("style");
			e.id = t.hash, e.textContent = t.code, r.appendChild(e);
		}
	});
}
// node_modules/svelte/src/internal/shared/attributes.js
function sa(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function ca(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function la(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(ca)), i && c.push(...Object.keys(i).map(ca));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = ca(e.substring(l, u).trim());
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
		return r && (n += sa(r)), i && (n += sa(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
// node_modules/svelte/src/internal/client/dom/elements/style.js
function ua(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function da(e, t, n, r) {
	var i = e[Et];
	if (D || i !== t) {
		var a = la(t, r);
		D && a === e.getAttribute("style") || (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[Et] = t;
	} else r && (Array.isArray(r) ? (ua(e, n?.[0], r[0]), ua(e, n?.[1], r[1], "important")) : ua(e, n, r));
	return r;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
function fa(e, t, n = !1) {
	if (e.multiple) {
		if (t == null) return;
		if (!Ge(t)) return qt();
		for (var r of e.options) r.selected = t.includes(ha(r));
	} else {
		for (r of e.options) if (fr(ha(r), t)) {
			r.selected = !0;
			return;
		}
		n && t === void 0 || (e.selectedIndex = -1);
	}
}
function pa(e) {
	var t = new MutationObserver(() => {
		fa(e, e.__value);
	});
	t.observe(e, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["value"]
	}), Pr(() => {
		t.disconnect();
	});
}
function ma(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet(), i = !0;
	kr(e, "change", (t) => {
		var i = t ? "[selected]" : ":checked", a;
		if (e.multiple) a = [].map.call(e.querySelectorAll(i), ha);
		else {
			var o = e.querySelector(i) ?? e.querySelector("option:not([disabled])");
			a = o && ha(o);
		}
		n(a), e.__value = a, N !== null && r.add(N);
	}), Rr(() => {
		var a = t();
		if (e === document.activeElement) {
			var o = N;
			if (r.has(o)) return;
		}
		if (fa(e, a, i), i && a === void 0) {
			var s = e.querySelector(":checked");
			s !== null && (a = ha(s), n(a));
		}
		e.__value = a, i = !1;
	}), pa(e);
}
function ha(e) {
	return "__value" in e ? e.__value : e.value;
}
// node_modules/svelte/src/internal/client/dom/elements/attributes.js
var ga = Symbol("is custom element"), _a = Symbol("is html"), va = At ? "link" : "LINK", ya = At ? "progress" : "PROGRESS";
function Q(e) {
	if (D) {
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
		e[Ot] = n, un(n), Dr();
	}
}
function ba(e, t) {
	var n = Sa(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === ya) && (e.value = t ?? "");
}
function xa(e, t) {
	var n = Sa(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function $(e, t, n, r) {
	var i = Sa(e);
	D && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === va) || i[t] !== (i[t] = n) && (t === "loading" && (e[Ct] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && wa(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function Sa(e) {
	return e[wt] ??= {
		[ga]: e.nodeName.includes("-"),
		[_a]: e.namespaceURI === Wt
	};
}
var Ca = /* @__PURE__ */ new Map();
function wa(e) {
	var t = e.getAttribute("is") || e.nodeName, n = Ca.get(t);
	if (n) return n;
	Ca.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var o in r = Ze(i), r) r[o].set && o !== "innerHTML" && o !== "textContent" && o !== "innerText" && n.push(o);
		i = et(i);
	}
	return n;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function Ta(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	kr(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = Da(e) ? Oa(a) : a, n(a), N !== null && r.add(N), await wi(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (D && e.defaultValue !== e.value || Di(t) == null && e.value) && (n(Da(e) ? Oa(e.value) : e.value), N !== null && r.add(N)), Br(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = N;
			if (r.has(i)) return;
		}
		Da(e) && n === Oa(e.value) || (e.type !== "date" || n || e.value) && n !== e.value && (e.value = n ?? "");
	});
}
function Ea(e, t, n = t) {
	kr(e, "change", (t) => {
		n(t ? e.defaultChecked : e.checked);
	}), (D && e.defaultChecked !== e.checked || Di(t) == null) && n(e.checked), Br(() => {
		e.checked = !!t();
	});
}
function Da(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function Oa(e) {
	return e === "" ? null : +e;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function ka(e, t) {
	return e === t || e?.[xt] === t;
}
function Aa(e = {}, t, n, r) {
	var i = an.r, a = H;
	return Rr(() => {
		var o, s;
		return Br(() => {
			o = s, s = r?.() || [], Di(() => {
				ka(n(...s), e) || (t(e, ...s), o && ka(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && ka(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
// node_modules/svelte/src/internal/client/reactivity/props.js
function ja(e, t, n, r) {
	var i = !0, a = !!(n & 8), o = !!(n & 16), s = r, c = !0, l = void 0, u = () => o && i ? (l ??= /* @__PURE__ */ Kn(r), U(l)) : (c && (c = !1, s = o ? Di(r) : r), s);
	let d;
	if (a) {
		var f = xt in e || St in e;
		d = Xe(e, t)?.set ?? (f && t in e ? (n) => e[t] = n : void 0);
	}
	var p, m = !1;
	a ? [p, m] = yn(() => e[t]) : p = e[t], p === void 0 && r !== void 0 && (p = u(), d && (i && Lt(t), d(p)));
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
	var _ = !1, v = (n & 1 ? Kn : Yn)(() => (_ = !1, h()));
	a && U(v);
	var y = H;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? U(v) : i && a ? ur(e) : e;
			return I(v, n), _ = !0, s !== void 0 && (s = n), e;
		}
		return ni && _ || y.f & 16384 ? v.v : U(v);
	});
}
// node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
// src/ui/canvas/sanitize.ts
var Ma = /* @__PURE__ */ new Set([
	"http:",
	"https:",
	"mailto:",
	"tel:"
]), Na = (e) => {
	if (typeof e != "string") return "";
	let t = e.replace(/[\u0000- \u007f-\u009f]/g, ""), n = /^([a-z][a-z0-9+.-]*):/i.exec(t)?.[1];
	return n === void 0 || Ma.has(`${n.toLowerCase()}:`) ? e.trim() : "";
}, Pa = (e) => typeof e == "string" ? e.replace(/[^\w\- :]/g, "").trim() : "", Fa = (e) => {
	let t = Na(e);
	return t !== "" && !/^(mailto|tel):/i.test(t) ? t : "";
}, Ia = (e) => typeof e == "string" ? e : typeof e == "number" ? String(e) : "", La = (e) => e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;"), Ra = "allow-same-origin", za = (e) => "<!doctype html><html><head><meta charset=\"utf-8\"><meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'none'; style-src * 'unsafe-inline'; img-src * data: blob:; font-src * data:\">" + e.map(Fa).filter((e) => e !== "").map((e) => `<link rel="stylesheet" href="${La(e)}">`).join("") + "<style>body{margin:0;padding:12px;min-height:100vh;box-sizing:border-box}[data-ceiba-id]{cursor:default}[data-ceiba-id]:hover{outline:1px dashed #94a3b8}[data-ceiba-selected]{outline:2px solid #2563eb!important;outline-offset:2px}[data-ceiba-multiline]{white-space:pre-line}[contenteditable]{outline:2px solid #16a34a!important;outline-offset:2px;cursor:text}.ceiba-dragging,.ceiba-dragging *{user-select:none!important;cursor:grabbing!important}.ceiba-placeholder{padding:12px;border:1px dashed #94a3b8;color:#475569;font:13px system-ui;background:#f8fafc}@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}</style></head><body></body></html>", Ba = /* @__PURE__ */ new Set([
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
]), Va = /* @__PURE__ */ new Set(["text"]), Ha = (e, t) => !t.has(e.type) || e.children.length > 0 ? null : e.type === "heading" ? "text" : e.type === "text" ? "content" : e.type === "button" ? "label" : Ba.has(e.type) || Va.has(e.type) ? "content" : null, Ua = (e) => Va.has(e), Wa = (e, t) => {
	let n = e.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, "");
	return t ? n.replace(/\n$/, "") : n.replace(/\n+/g, " ");
}, Ga = (e) => {
	let t = e.ownerDocument, n = t.createRange();
	n.selectNodeContents(e), n.collapse(!1);
	let r = t.getSelection();
	r?.removeAllRanges(), r?.addRange(n);
}, Ka = /* @__PURE__ */ new Set(/* @__PURE__ */ "div.section.article.header.footer.nav.main.aside.h1.h2.h3.h4.h5.h6.p.span.strong.em.small.a.ul.ol.li.blockquote.figure.figcaption.code.pre.hr.br.img.label".split(".")), qa = (e) => {
	let t = e.fields.props;
	return typeof t == "object" && t && !Array.isArray(t) ? t : {};
}, Ja = (e, t) => {
	let n = e.createElement("div");
	return n.className = "ceiba-placeholder", n.textContent = t, n;
}, Ya = (e, t) => {
	let n = e.src;
	if (!je(n)) return {
		src: Na(n),
		alt: Ia(e.alt)
	};
	let r = t[n.asset], i = n.alt === void 0 ? Ia(e.alt) === "" ? r?.alt ?? "" : Ia(e.alt) : n.alt;
	return {
		src: r ? Na(r.url) : "",
		alt: i
	};
}, Xa = (e, t, n, r, i) => {
	let a = qa(t), o = (t, n = "") => {
		let r = e.createElement(t), i = `${n} ${Pa(a.class)}`.trim();
		return i && (r.className = i), r;
	};
	switch (t.type) {
		case "container": return o("div", a.fluid ? "container-fluid" : "container");
		case "row": {
			let e = Pa(Ia(a.gutter));
			return o("div", `row ${/^[0-5]$/.test(e) ? `g-${e}` : e || "g-0"}`);
		}
		case "col": {
			let e = [
				"sm",
				"md",
				"lg",
				"xl"
			].map((e) => Number(a[e]) > 0 ? `col-${e}-${Number(a[e])}` : ""), t = a.xs === void 0 ? 12 : Number(a.xs);
			return o("div", [t > 0 ? `col-${t}` : "col", ...e].join(" ").replace(/\s+/g, " ").trim());
		}
		case "heading": {
			let e = o(`h${Math.min(6, Math.max(1, Number(a.level) || 2))}`);
			return e.textContent = Ia(a.text), e;
		}
		case "text": {
			let e = o("p");
			return e.textContent = Ia(a.content), e;
		}
		case "image":
		case "img": {
			let { src: r, alt: s } = Ya(a, i);
			if (r === "") return Ja(e, n.emptyImage);
			let c = o("img", t.type === "image" ? "img-fluid" : "");
			return c.src = r, c.alt = s, c;
		}
		case "button": {
			let e = o("a", "btn btn-primary");
			return e.href = Na(a.url) || "#", e.textContent = Ia(a.label), e;
		}
		case "html": return Ja(e, n.html);
	}
	if (!r || !Ka.has(t.type)) return Ja(e, n.unknown(t.type));
	let s = o(t.type);
	return t.type === "a" && (s.href = Na(a.href) || "#"), a.content !== void 0 && s.append(e.createTextNode(Ia(a.content))), s;
}, Za = (e, t, n, r, i, a, o = {}) => {
	let s = (c) => {
		let l = t.nodes[c];
		if (!l) return null;
		let u = Xa(e, l, i, n.has(l.type), o);
		u.dataset.ceibaId = c;
		let d = l.fields.styles;
		if (a && typeof d == "object" && d && !Array.isArray(d) && u.classList.add(...se(c, d, a)), c === r && (u.dataset.ceibaSelected = ""), Ua(l.type) && (u.dataset.ceibaMultiline = ""), u.className !== "ceiba-placeholder" && u.tagName !== "IMG") for (let e of l.children) {
			let t = s(e);
			t && u.append(t);
		}
		return u;
	}, c = t.rootIds.map(s).filter((e) => e !== null);
	e.body.replaceChildren(...c);
}, Qa = /* @__PURE__ */ K("<button type=\"button\" role=\"radio\" class=\"svelte-1cfnx8l\"> </button>"), $a = /* @__PURE__ */ K("<div class=\"viewport svelte-1cfnx8l\" role=\"radiogroup\"><button type=\"button\" role=\"radio\" class=\"svelte-1cfnx8l\"> </button> <!></div>"), eo = {
	hash: "svelte-1cfnx8l",
	code: ".viewport.svelte-1cfnx8l {display:flex;flex-wrap:wrap;gap:.25rem;margin-bottom:.5rem;}button.svelte-1cfnx8l {font:inherit;font-size:.75rem;padding:.2rem .5rem;border:1px solid var(--cpb-border);border-radius:999px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button[aria-checked='true'].svelte-1cfnx8l {background:var(--cpb-accent-soft);border-color:var(--cpb-accent);font-weight:600;}button.svelte-1cfnx8l:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function to(e, t) {
	A(t, !0), Z(e, eo);
	let n = ja(t, "store", 7), r = /* @__PURE__ */ P(() => n().t);
	var i = $a(), a = L(i), o = L(a, !0);
	k(a), X(z(a, 2), 17, () => n().design.breakpoints, (e) => e.id, (e, t) => {
		var r = Qa(), i = L(r);
		k(r), B(() => {
			$(r, "aria-checked", n().viewport === U(t).id), J(i, `${U(t).id ?? ""} · ${U(t).minWidth ?? ""}px`);
		}), W("click", r, () => {
			n().viewport = U(t).id;
		}), q(e, r);
	}), k(i), B((e, t) => {
		$(i, "aria-label", e), $(a, "aria-checked", n().viewport === null), J(o, t);
	}, [() => U(r)("viewport.label"), () => U(r)("viewport.base")]), W("click", a, () => {
		n().viewport = null;
	}), q(e, i), j();
}
G(["click"]);
// src/ui/canvas/Canvas.svelte
var no = /* @__PURE__ */ K("<div class=\"canvas svelte-1tv0kiv\"><p class=\"help svelte-1tv0kiv\"> </p> <!> <div class=\"stage svelte-1tv0kiv\"><iframe class=\"svelte-1tv0kiv\"></iframe></div></div>"), ro = {
	hash: "svelte-1tv0kiv",
	code: ".canvas.svelte-1tv0kiv {background:var(--cpb-canvas);padding:.5rem 1rem 1rem;min-height:0;display:flex;flex-direction:column;}.help.svelte-1tv0kiv {margin:0 0 .5rem;font-size:.75rem;color:var(--cpb-muted);}.stage.svelte-1tv0kiv {flex:1;overflow:auto;display:flex;justify-content:center;min-height:0;}iframe.svelte-1tv0kiv {flex:none;max-width:none;min-height:480px;height:100%;border:1px solid var(--cpb-border);border-radius:8px;background:#fff;}"
};
function io(e, t) {
	A(t, !0), Z(e, ro);
	let n = ja(t, "stylesheets", 19, () => []), r = /* @__PURE__ */ P(() => t.store.t), i = /* @__PURE__ */ F(void 0), a = /* @__PURE__ */ F(!1), o = /* @__PURE__ */ F(null), s = /* @__PURE__ */ P(() => za(n())), c = /* @__PURE__ */ P(() => t.store.viewport === null ? 375 : t.store.design.breakpoints.find((e) => e.id === t.store.viewport)?.minWidth ?? 375);
	function l(e) {
		let n = e.head.querySelector("style[data-cms-design]");
		n || (n = e.createElement("style"), n.dataset.cmsDesign = "", e.head.append(n)), n.textContent = ue(t.store.design, Le(t.store.session.toDocument().root), t.store.media.assetUrls).css;
	}
	let u = (e) => e?.closest?.("[data-ceiba-id]");
	function d(e) {
		let n = U(i)?.contentDocument, a = t.store.tree.nodes[e], s = a && t.store.catalogue ? Ha(a, t.store.catalogue) : null, c = n?.querySelector(`[data-ceiba-id="${CSS.escape(e)}"]`);
		if (!n || !a || !s || !c) return !1;
		t.store.select(e), I(o, e, !0);
		let l = Ua(a.type);
		c.setAttribute("contenteditable", "plaintext-only"), c.setAttribute("aria-label", U(r)("announce.editing"));
		let u = () => {
			t.store.run({
				kind: "updateProps",
				id: e,
				set: { [s]: Wa(c.innerText, l) }
			});
		}, d = (n) => {
			c.removeEventListener("input", u), c.removeEventListener("keydown", f), c.removeEventListener("blur", p), c.removeAttribute("contenteditable"), I(o, null), t.store.announce("announce.editDone"), t.onEditEnd(e, n);
		}, f = (e) => {
			(e.key === "Escape" || e.key === "Enter" && (!l || e.ctrlKey || e.metaKey)) && (e.preventDefault(), d(!0));
		}, p = () => d(!1);
		return c.addEventListener("input", u), c.addEventListener("keydown", f), c.addEventListener("blur", p), c.focus(), Ga(c), t.store.announce("announce.editing"), !0;
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
		e && U(i) && (f(e), t.drag.attach(U(i)), I(a, !0));
	}
	Fr(() => {
		let e = U(i)?.contentDocument, n = t.store.catalogue, s = t.store.tree, c = t.store.selection, u = t.store.design, d = t.store.media.resolved;
		U(a) && e && n && U(o) === null && (t.store.media.ensure(we(s, u)), Za(e, s, n, c, {
			unknown: (e) => U(r)("canvas.unknown", { type: e }),
			html: U(r)("canvas.html"),
			emptyImage: U(r)("canvas.emptyImage")
		}, u, d), l(e), c && e.querySelector(`[data-ceiba-id="${CSS.escape(c)}"]`)?.scrollIntoView({ block: "nearest" }));
	});
	var m = { startEditing: d }, h = no(), g = L(h), _ = L(g, !0);
	k(g);
	var v = z(g, 2);
	to(v, { get store() {
		return t.store;
	} });
	var y = z(v, 2), b = L(y);
	let x;
	return Aa(b, (e) => I(i, e), () => U(i)), k(y), k(h), B((e, n) => {
		$(g, "id", `${t.uid}-canvas-help`), J(_, e), $(b, "title", n), $(b, "sandbox", Ra), $(b, "srcdoc", U(s)), $(b, "aria-describedby", `${t.uid}-canvas-help`), x = da(b, "", x, { width: `${U(c)}px` });
	}, [() => U(r)("canvas.help"), () => U(r)("canvas.title")]), Fi("load", b, p), Ni(b), q(e, h), j(m);
}
// src/ui/model/insert.ts
var ao = (e, t) => {
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
}, oo = (e, t, n) => {
	let r = e.get(t);
	return !r?.isContainer || r.disallowedChildren.includes(n) ? !1 : r.allowedChildren.includes("*") || r.allowedChildren.includes(n);
}, so = (e, t, n, r) => {
	let i = n === null ? void 0 : e.nodes[n];
	if (!i) return {
		parent: null,
		index: e.rootIds.length
	};
	if (oo(t, i.type, r)) return {
		parent: i.id,
		index: i.children.length
	};
	let a = ce(e, i.parent);
	return {
		parent: i.parent,
		index: a.indexOf(i.id) + 1
	};
}, co = (e) => {
	let { id: t, _id: n, children: r, ...i } = e;
	return {
		...i,
		children: (r ?? []).map(co)
	};
}, lo = class {
	store;
	#e = /* @__PURE__ */ F([]);
	get templates() {
		return U(this.#e);
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
		let i = so(this.store.tree, n, this.store.selection, r.type), a = this.store.session.commandContext;
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
				nodes: [co(i)]
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
}, uo = /* @__PURE__ */ K("<dialog class=\"svelte-o2xhl0\"><form method=\"dialog\" class=\"svelte-o2xhl0\"><h2 class=\"svelte-o2xhl0\"> </h2> <!> <div class=\"actions svelte-o2xhl0\"><button type=\"button\" class=\"svelte-o2xhl0\"> </button> <button type=\"submit\" class=\"primary svelte-o2xhl0\"> </button></div></form></dialog>"), fo = {
	hash: "svelte-o2xhl0",
	code: "dialog.svelte-o2xhl0 {border:1px solid var(--cpb-border);border-radius:10px;padding:1rem;width:min(560px, 90vw);color:inherit;font:inherit;}dialog.svelte-o2xhl0::backdrop {background:rgb(15 23 42 / .45);}h2.svelte-o2xhl0 {font-size:1rem;margin:0 0 .75rem;}.actions.svelte-o2xhl0 {display:flex;justify-content:flex-end;gap:.5rem;margin-top:1rem;}button.svelte-o2xhl0 {font:inherit;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.primary.svelte-o2xhl0 {background:var(--cpb-accent);border-color:var(--cpb-accent);color:#fff;}button.svelte-o2xhl0:disabled {opacity:.5;}.svelte-o2xhl0:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function po(e, t) {
	A(t, !0), Z(e, fo);
	let n = ja(t, "open", 15, !1), r = ja(t, "busy", 3, !1), i = /* @__PURE__ */ F(void 0), a = null;
	Fr(() => {
		U(i) && (n() && !U(i).open ? (a = U(i).getRootNode().activeElement, U(i).showModal()) : !n() && U(i).open && U(i).close());
	});
	var o = uo(), s = L(o), c = L(s), l = L(c, !0);
	k(c);
	var u = z(c, 2);
	oa(u, () => t.children);
	var d = z(u, 2), f = L(d), p = L(f, !0);
	k(f);
	var m = z(f, 2), h = L(m, !0);
	k(m), k(d), k(s), k(o), Aa(o, (e) => I(i, e), () => U(i)), B(() => {
		$(o, "aria-labelledby", `${t.uid}-title`), $(c, "id", `${t.uid}-title`), J(l, t.title), J(p, t.cancelLabel), m.disabled = r(), J(h, t.submitLabel);
	}), Fi("close", o, () => {
		n(!1), a?.focus?.();
	}), Fi("submit", s, (e) => {
		e.preventDefault(), t.onSubmit();
	}), W("click", f, () => {
		n(!1);
	}), q(e, o), j();
}
G(["click"]);
// src/ui/content/ImportDialog.svelte
var mo = /* @__PURE__ */ K("<p class=\"help svelte-c6zkzf\"> </p> <label class=\"svelte-c6zkzf\"> </label> <textarea rows=\"10\" spellcheck=\"false\" class=\"svelte-c6zkzf\"></textarea>", 1), ho = {
	hash: "svelte-c6zkzf",
	code: ".help.svelte-c6zkzf {font-size:.8rem;margin:0 0 .5rem;}label.svelte-c6zkzf {display:block;font-size:.8rem;font-weight:600;margin-bottom:.25rem;}textarea.svelte-c6zkzf {width:100%;box-sizing:border-box;font:12px/1.4 ui-monospace, monospace;padding:.5rem;border:1px solid var(--cpb-border);border-radius:6px;}"
};
function go(e, t) {
	A(t, !0), Z(e, ho);
	let n = ja(t, "open", 15, !1), r = /* @__PURE__ */ P(() => t.store.t), i = /* @__PURE__ */ F(""), a = /* @__PURE__ */ F(!1);
	async function o() {
		if (U(i).trim() === "") return;
		I(a, !0);
		let e = await t.content.importHtml(U(i));
		I(a, !1), e !== null && (e > 0 && t.store.announce("import.warnings", { count: e }), I(i, ""), n(!1));
	}
	{
		let s = /* @__PURE__ */ P(() => U(r)("import.title")), c = /* @__PURE__ */ P(() => `${t.uid}-import`), l = /* @__PURE__ */ P(() => U(r)("import.submit")), u = /* @__PURE__ */ P(() => U(r)("dialog.cancel"));
		po(e, {
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
				var a = mo(), o = R(a), s = L(o, !0);
				k(o);
				var c = z(o, 2), l = L(c, !0);
				k(c);
				var u = z(c, 2);
				Tr(u), B((e, n) => {
					J(s, e), $(c, "for", `${t.uid}-import-html`), J(l, n), $(u, "id", `${t.uid}-import-html`);
				}, [() => U(r)("import.help"), () => U(r)("import.field")]), Ta(u, () => U(i), (e) => I(i, e)), q(e, a);
			},
			$$slots: { default: !0 }
		});
	}
	j();
}
// src/ui/design/ops.ts
var _o = /^[a-z][a-z0-9-]*(?:\.[a-z0-9-]+)*$/, vo = /^[a-z][a-z0-9-]{0,40}$/, yo = (e, t, n) => ({
	...e,
	tokens: {
		...e.tokens,
		[t]: n
	}
}), bo = (e, t) => {
	let n = { ...e.tokens };
	return delete n[t], {
		...e,
		tokens: n
	};
}, xo = (e, t, n, r = {}) => ({
	...e,
	classes: {
		...e.classes,
		[t]: {
			name: n,
			styles: e.classes[t]?.styles ?? r
		}
	}
}), So = (e, t, n) => {
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
}, Co = (e, t) => {
	let n = { ...e.classes };
	return delete n[t], {
		...e,
		classes: n
	};
}, wo = (e, t) => ({
	...e,
	breakpoints: t
}), To = (e, t) => JSON.stringify(e ?? {}).includes(`{"token":${JSON.stringify(t)}}`), Eo = (e, t) => [...Object.entries(e.tokens).filter(([e, n]) => e !== t && typeof n.value == "object" && n.value.token === t).map(([e]) => `token ${e}`), ...Object.entries(e.classes).filter(([, e]) => To(e.styles, t)).map(([e, t]) => `class ${t.name ?? e}`)], Do = /* @__PURE__ */ K("<li class=\"svelte-l0fwje\"><code class=\"svelte-l0fwje\"> </code> <label class=\"svelte-l0fwje\"> <input type=\"number\" min=\"1\" max=\"4000\" class=\"svelte-l0fwje\"/></label></li>"), Oo = /* @__PURE__ */ K("<ul class=\"svelte-l0fwje\"></ul>"), ko = {
	hash: "svelte-l0fwje",
	code: "ul.svelte-l0fwje {list-style:none;margin:0;padding:0;display:grid;gap:.35rem;}li.svelte-l0fwje {display:flex;align-items:center;gap:.5rem;font-size:.8rem;}label.svelte-l0fwje {display:flex;align-items:center;gap:.35rem;}input.svelte-l0fwje {width:6rem;font:inherit;font-size:.8rem;padding:.2rem .35rem;border:1px solid var(--cpb-border);border-radius:5px;}.svelte-l0fwje:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Ao(e, t) {
	A(t, !0), Z(e, ko);
	let n = /* @__PURE__ */ P(() => t.store.t);
	function r(e, n) {
		let r = Number(n);
		Number.isInteger(r) && t.store.designSession.update(wo(t.store.design, t.store.design.breakpoints.map((t) => t.id === e ? {
			...t,
			minWidth: r
		} : t)));
	}
	var i = Oo();
	X(i, 21, () => t.store.design.breakpoints, (e) => e.id, (e, t) => {
		var i = Do(), a = L(i), o = L(a, !0);
		k(a);
		var s = z(a, 2), c = L(s), l = z(c);
		Q(l), k(s), k(i), B((e) => {
			J(o, U(t).id), J(c, `${e ?? ""} `), ba(l, U(t).minWidth);
		}, [() => U(n)("design.minWidth")]), W("change", l, (e) => r(U(t).id, e.currentTarget.value)), q(e, i);
	}), k(i), q(e, i), j();
}
G(["change"]);
// src/ui/styles/groups.ts
var jo = [
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
], Mo = (e) => {
	let t = e.replace(/([A-Z])/g, " $1").toLowerCase();
	return t.charAt(0).toUpperCase() + t.slice(1);
}, No = (e, t) => {
	let n = t.trim();
	return (e === "number" || e === "lineHeight") && /^-?(\d+\.?\d*|\.\d+)$/.test(n) ? Number(n) : n;
}, Po = /* @__PURE__ */ K("<img alt=\"\" class=\"thumb svelte-18w86nj\"/>"), Fo = /* @__PURE__ */ K("<span class=\"thumb missing svelte-18w86nj\"> </span>"), Io = /* @__PURE__ */ K("<span class=\"legacy svelte-18w86nj\"> </span>"), Lo = /* @__PURE__ */ K("<button type=\"button\" class=\"svelte-18w86nj\">×</button>"), Ro = /* @__PURE__ */ K("<label class=\"svelte-18w86nj\"> </label> <input type=\"text\" class=\"svelte-18w86nj\"/>", 1), zo = /* @__PURE__ */ K("<label class=\"check svelte-18w86nj\"><input type=\"checkbox\" class=\"svelte-18w86nj\"/> </label> <!>", 1), Bo = /* @__PURE__ */ K("<div class=\"picker svelte-18w86nj\" role=\"group\"><span class=\"label svelte-18w86nj\"> </span> <div class=\"row svelte-18w86nj\"><!> <!> <button type=\"button\" class=\"svelte-18w86nj\"> </button> <!></div> <!></div>"), Vo = {
	hash: "svelte-18w86nj",
	code: ".picker.svelte-18w86nj {display:grid;gap:.25rem;margin-bottom:.75rem;}.label.svelte-18w86nj, label.svelte-18w86nj {font-size:.8rem;font-weight:600;}.check.svelte-18w86nj {font-weight:400;display:flex;gap:.35rem;align-items:center;}.row.svelte-18w86nj {display:flex;gap:.35rem;align-items:center;}.thumb.svelte-18w86nj {width:48px;height:48px;object-fit:cover;border-radius:6px;border:1px solid var(--cpb-border);}.missing.svelte-18w86nj {display:grid;place-items:center;font-size:.6rem;color:var(--cpb-danger);text-align:center;}.legacy.svelte-18w86nj {flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:.75rem;color:var(--cpb-muted);}button.svelte-18w86nj, input[type='text'].svelte-18w86nj {font:inherit;font-size:.8rem;padding:.3rem .6rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}button.svelte-18w86nj {cursor:pointer;}.svelte-18w86nj:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Ho(e, t) {
	A(t, !0), Z(e, Vo);
	let n = ja(t, "withAlt", 3, !1), r = /* @__PURE__ */ P(() => t.store.t), i = /* @__PURE__ */ P(() => je(t.value) ? t.value : null), a = /* @__PURE__ */ P(() => U(i) ? t.store.media.resolved[U(i).asset] : void 0), o = /* @__PURE__ */ P(() => typeof t.value == "string" && t.value !== "" ? t.value : null), s = /* @__PURE__ */ P(() => U(i)?.alt === "");
	function c() {
		t.store.media.pick(U(i), (e) => t.onChange(U(i)?.alt === void 0 ? { asset: e.asset } : {
			asset: e.asset,
			alt: U(i).alt
		}));
	}
	function l(e) {
		U(i) && t.onChange(e === void 0 ? { asset: U(i).asset } : {
			asset: U(i).asset,
			alt: e
		});
	}
	var u = Bo(), d = L(u), f = L(d, !0);
	k(d);
	var p = z(d, 2), m = L(p), h = (e) => {
		var t = Po();
		B(() => $(t, "src", U(a).url)), q(e, t);
	}, g = (e) => {
		var t = Fo(), n = L(t, !0);
		k(t), B((e) => J(n, e), [() => U(r)("media.missing")]), q(e, t);
	};
	Y(m, (e) => {
		U(a) ? e(h) : U(i) && e(g, 1);
	});
	var _ = z(m, 2), v = (e) => {
		var t = Io(), n = L(t, !0);
		k(t), B(() => {
			$(t, "title", U(o)), J(n, U(o));
		}), q(e, t);
	};
	Y(_, (e) => {
		U(o) && e(v);
	});
	var y = z(_, 2), b = L(y, !0);
	k(y);
	var x = z(y, 2), S = (e) => {
		var n = Lo();
		B((e) => $(n, "aria-label", e), [() => U(r)("media.removeFrom", { field: t.label })]), W("click", n, () => t.onChange(null)), q(e, n);
	};
	Y(x, (e) => {
		(U(i) || U(o)) && e(S);
	}), k(p);
	var C = z(p, 2), ee = (e) => {
		var n = zo(), o = R(n), c = L(o);
		Q(c);
		var u = z(c);
		k(o);
		var d = z(o, 2), f = (e) => {
			var n = Ro(), o = R(n), s = L(o, !0);
			k(o);
			var c = z(o, 2);
			Q(c), B((e) => {
				$(o, "for", `${t.id}-alt`), J(s, e), $(c, "id", `${t.id}-alt`), ba(c, U(i).alt ?? ""), $(c, "placeholder", U(a)?.alt ?? "");
			}, [() => U(r)("media.useAlt")]), W("change", c, (e) => l(e.currentTarget.value.trim() === "" ? void 0 : e.currentTarget.value)), q(e, n);
		};
		Y(d, (e) => {
			U(s) || e(f);
		}), B((e) => {
			xa(c, U(s)), J(u, ` ${e ?? ""}`);
		}, [() => U(r)("media.decorative")]), W("change", c, (e) => l(e.currentTarget.checked ? "" : void 0)), q(e, n);
	};
	Y(C, (e) => {
		U(i) && n() && e(ee);
	}), k(u), B((e) => {
		$(u, "aria-labelledby", `${t.id}-label`), $(d, "id", `${t.id}-label`), J(f, t.label), $(y, "id", t.id), J(b, e);
	}, [() => U(i) || U(o) ? U(r)("media.replace") : U(r)("media.choose")]), W("click", y, c), q(e, u), j();
}
G(["click", "change"]);
// src/ui/styles/StyleField.svelte
var Uo = /* @__PURE__ */ K("<option class=\"svelte-91oqxq\"> </option>"), Wo = /* @__PURE__ */ K("<select class=\"svelte-91oqxq\"><option class=\"svelte-91oqxq\"> </option><!></select>"), Go = /* @__PURE__ */ K("<option class=\"svelte-91oqxq\"> </option>"), Ko = /* @__PURE__ */ K("<select class=\"svelte-91oqxq\"><option class=\"svelte-91oqxq\"> </option><!></select>"), qo = /* @__PURE__ */ K("<input class=\"svelte-91oqxq\"/>"), Jo = /* @__PURE__ */ K("<option class=\"svelte-91oqxq\"> </option>"), Yo = /* @__PURE__ */ K("<select class=\"svelte-91oqxq\"><option class=\"svelte-91oqxq\"> </option><!></select>"), Xo = /* @__PURE__ */ K("<button type=\"button\" class=\"remove svelte-91oqxq\">×</button>"), Zo = /* @__PURE__ */ K("<p class=\"error svelte-91oqxq\" role=\"alert\"> </p>"), Qo = /* @__PURE__ */ K("<p class=\"origin svelte-91oqxq\"> </p>"), $o = /* @__PURE__ */ K("<div class=\"field svelte-91oqxq\"><label class=\"svelte-91oqxq\"> </label> <div class=\"row svelte-91oqxq\"><!> <!> <!></div> <!></div>"), es = {
	hash: "svelte-91oqxq",
	code: ".field.svelte-91oqxq {display:grid;gap:.2rem;margin:.4rem 0;}label.svelte-91oqxq {font-size:.75rem;font-weight:600;}.row.svelte-91oqxq {display:flex;gap:.25rem;}input.svelte-91oqxq, select.svelte-91oqxq {flex:1;min-width:0;font:inherit;font-size:.8rem;padding:.25rem .4rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}[aria-invalid='true'].svelte-91oqxq {border-color:var(--cpb-danger);}.remove.svelte-91oqxq {font:inherit;padding:0 .5rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);cursor:pointer;}.origin.svelte-91oqxq {margin:0;font-size:.7rem;color:var(--cpb-muted);}.error.svelte-91oqxq {margin:0;font-size:.7rem;color:var(--cpb-danger);}.svelte-91oqxq:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function ts(e, t) {
	A(t, !0), Z(e, es);
	let n = /* @__PURE__ */ P(() => t.store.t), r = /* @__PURE__ */ P(() => Ne(t.styles, t.store.design, t.target, t.spec.name)), i = /* @__PURE__ */ P(() => U(r)?.origin === "own" ? U(r).value : void 0), a = /* @__PURE__ */ P(() => E(t.spec)), o = /* @__PURE__ */ P(() => Object.entries(t.store.design.tokens).filter(([, e]) => e.type === U(a)).map(([e]) => e)), s = /* @__PURE__ */ P(() => t.spec.kind === "keyword" ? ie.keywords[t.spec.name] ?? [] : []), c = /* @__PURE__ */ P(() => typeof U(i) == "object" && U(i) !== null && "token" in U(i) ? U(i).token : ""), l = /* @__PURE__ */ P(() => U(i) === void 0 || typeof U(i) == "object" ? "" : String(U(i))), u = (e) => typeof e == "object" ? "token" in e ? `{${e.token}}` : U(n)("media.asset") : String(e), d = /* @__PURE__ */ P(() => !U(r) || U(r).origin === "own" ? null : U(r).origin === "class" ? U(n)("styles.fromClass", { from: U(r).from }) : U(n)("styles.inherited", { from: U(r).from })), f = /* @__PURE__ */ F(null);
	function p(e) {
		e !== null && typeof e != "object" && ze(t.spec, e) === null ? I(f, U(n)("styles.invalid"), !0) : (I(f, null), t.onSet(be(t.styles, t.target, t.spec.name, e)));
	}
	let m = (e) => p(e.trim() === "" ? null : No(t.spec.kind, e));
	var h = Ui(), g = R(h), _ = (e) => {
		var n = Ui(), r = R(n), a = (e) => {
			{
				let n = /* @__PURE__ */ P(() => Mo(t.spec.name));
				Ho(e, {
					get store() {
						return t.store;
					},
					get id() {
						return t.id;
					},
					get label() {
						return U(n);
					},
					get value() {
						return U(i);
					},
					onChange: (e) => p(e === null || typeof e == "string" ? null : { asset: e.asset })
				});
			}
		};
		Y(r, (e) => {
			t.store.media.available && e(a);
		}), q(e, n);
	}, v = (e) => {
		var a = $o(), h = L(a), g = L(h, !0);
		k(h);
		var _ = z(h, 2), v = L(_), y = (e) => {
			var n = Wo(), i = L(n), a = L(i, !0);
			k(i), i.value = i.__value = "", X(z(i), 16, () => U(o), (e) => e, (e, t) => {
				var n = Uo(), r = L(n, !0);
				k(n);
				var i = {};
				B(() => {
					J(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
				}), q(e, n);
			}), k(n);
			var s;
			pa(n), B((e) => {
				$(n, "id", t.id), J(a, e), s !== (s = U(c)) && (n.value = (n.__value = U(c)) ?? "", fa(n, U(c)));
			}, [() => U(r) ? u(U(r).value) : "—"]), W("change", n, (e) => p(e.currentTarget.value === "" ? null : { token: e.currentTarget.value })), q(e, n);
		}, b = (e) => {
			var n = Ko(), i = L(n), a = L(i, !0);
			k(i), i.value = i.__value = "", X(z(i), 16, () => U(s), (e) => e, (e, t) => {
				var n = Go(), r = L(n, !0);
				k(n);
				var i = {};
				B(() => {
					J(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
				}), q(e, n);
			}), k(n);
			var o;
			pa(n), B((e) => {
				$(n, "id", t.id), J(a, e), o !== (o = U(l)) && (n.value = (n.__value = U(l)) ?? "", fa(n, U(l)));
			}, [() => U(r) ? u(U(r).value) : "—"]), W("change", n, (e) => m(e.currentTarget.value)), q(e, n);
		}, x = (e) => {
			var n = qo();
			Q(n), B((e) => {
				$(n, "id", t.id), ba(n, U(l)), $(n, "placeholder", e), $(n, "aria-invalid", U(f) !== null), $(n, "aria-describedby", U(f) ? `${t.id}-error` : U(d) ? `${t.id}-origin` : void 0);
			}, [() => U(r) && U(r).origin !== "own" ? u(U(r).value) : ""]), W("change", n, (e) => m(e.currentTarget.value)), q(e, n);
		};
		Y(v, (e) => {
			t.spec.kind === "token" ? e(y) : U(s).length > 0 ? e(b, 1) : e(x, -1);
		});
		var S = z(v, 2), C = (e) => {
			var r = Yo(), i = L(r), a = L(i, !0);
			k(i), i.value = i.__value = "", X(z(i), 16, () => U(o), (e) => e, (e, t) => {
				var n = Jo(), r = L(n, !0);
				k(n);
				var i = {};
				B(() => {
					J(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
				}), q(e, n);
			}), k(r);
			var s;
			pa(r), B((e, t) => {
				$(r, "aria-label", e), J(a, t), s !== (s = U(c)) && (r.value = (r.__value = U(c)) ?? "", fa(r, U(c)));
			}, [() => `${U(n)("styles.token")} · ${Mo(t.spec.name)}`, () => U(n)("styles.literal")]), W("change", r, (e) => p(e.currentTarget.value === "" ? null : { token: e.currentTarget.value })), q(e, r);
		};
		Y(S, (e) => {
			U(o).length > 0 && t.spec.kind !== "token" && e(C);
		});
		var ee = z(S, 2), w = (e) => {
			var r = Xo();
			B((e) => $(r, "aria-label", e), [() => U(n)("styles.remove", { property: Mo(t.spec.name) })]), W("click", r, () => p(null)), q(e, r);
		};
		Y(ee, (e) => {
			U(i) !== void 0 && e(w);
		}), k(_);
		var T = z(_, 2), E = (e) => {
			var n = Zo(), r = L(n, !0);
			k(n), B(() => {
				$(n, "id", `${t.id}-error`), J(r, U(f));
			}), q(e, n);
		}, te = (e) => {
			var n = Qo(), r = L(n, !0);
			k(n), B(() => {
				$(n, "id", `${t.id}-origin`), J(r, U(d));
			}), q(e, n);
		};
		Y(T, (e) => {
			U(f) ? e(E) : U(d) && e(te, 1);
		}), k(a), B((e) => {
			$(h, "for", t.id), J(g, e);
		}, [() => Mo(t.spec.name)]), q(e, a);
	};
	Y(g, (e) => {
		t.spec.kind === "image" ? e(_) : e(v, -1);
	}), q(e, h), j();
}
G(["change", "click"]);
// src/ui/styles/StylesPanel.svelte
var ns = /* @__PURE__ */ K("<option class=\"svelte-tbe6xh\"> </option>"), rs = /* @__PURE__ */ K("<option class=\"svelte-tbe6xh\"> </option>"), is = /* @__PURE__ */ K("<details class=\"group svelte-tbe6xh\"><summary class=\"svelte-tbe6xh\"> </summary> <!></details>"), as = /* @__PURE__ */ K("<details class=\"styles svelte-tbe6xh\" open=\"\"><summary class=\"svelte-tbe6xh\"> </summary> <div class=\"target svelte-tbe6xh\"><label class=\"svelte-tbe6xh\"> </label> <select class=\"svelte-tbe6xh\"><option class=\"svelte-tbe6xh\"> </option><!></select> <label class=\"svelte-tbe6xh\"> </label> <select class=\"svelte-tbe6xh\"><option class=\"svelte-tbe6xh\"> </option><!></select></div> <!> <!></details>"), os = {
	hash: "svelte-tbe6xh",
	code: ".styles.svelte-tbe6xh {margin-top:1rem;border-top:1px solid var(--cpb-border);padding-top:.5rem;}summary.svelte-tbe6xh {cursor:pointer;font-size:.8rem;font-weight:700;}.group.svelte-tbe6xh {margin:.35rem 0;padding-left:.25rem;}.group.svelte-tbe6xh summary:where(.svelte-tbe6xh) {font-weight:600;font-size:.78rem;}.target.svelte-tbe6xh {display:grid;grid-template-columns:auto 1fr;gap:.25rem .5rem;align-items:center;margin:.5rem 0;}label.svelte-tbe6xh {font-size:.75rem;font-weight:600;}select.svelte-tbe6xh {font:inherit;font-size:.8rem;padding:.25rem .4rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}.svelte-tbe6xh:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function ss(e, t) {
	A(t, !0), Z(e, os);
	let n = ja(t, "store", 7), r = /* @__PURE__ */ P(() => n().t), i = /* @__PURE__ */ P(() => n().styleState === null ? {
		breakpoint: n().viewport,
		state: null
	} : {
		breakpoint: null,
		state: n().styleState
	});
	var a = as(), o = L(a), s = L(o, !0);
	k(o);
	var c = z(o, 2), l = L(c), u = L(l, !0);
	k(l);
	var d = z(l, 2), f = L(d), p = L(f, !0);
	k(f), f.value = f.__value = "", X(z(f), 17, () => n().design.breakpoints, (e) => e.id, (e, t) => {
		var n = ns(), r = L(n);
		k(n);
		var i = {};
		B(() => {
			J(r, `${U(t).id ?? ""} · ${U(t).minWidth ?? ""}px`), i !== (i = U(t).id) && (n.value = (n.__value = U(t).id) ?? "");
		}), q(e, n);
	}), k(d);
	var m;
	pa(d);
	var h = z(d, 2), g = L(h, !0);
	k(h);
	var _ = z(h, 2), v = L(_), y = L(v, !0);
	k(v), v.value = v.__value = "", X(z(v), 16, () => ie.states, (e) => e, (e, t) => {
		var n = rs(), r = L(n, !0);
		k(n);
		var i = {};
		B(() => {
			J(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
		}), q(e, n);
	}), k(_);
	var b;
	pa(_), k(c);
	var x = z(c, 2);
	oa(x, () => t.children ?? nt), X(z(x, 2), 17, () => jo, (e) => e.key, (e, a) => {
		var o = is(), s = L(o), c = L(s, !0);
		k(s), X(z(s, 2), 16, () => U(a).properties, (e) => e, (e, r) => {
			let a = /* @__PURE__ */ P(() => Ue.get(r));
			var o = Ui(), s = R(o), c = (e) => {
				{
					let o = /* @__PURE__ */ P(() => `${t.uid}-style-${r}`);
					ts(e, {
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
		}), k(o), B((e) => J(c, e), [() => U(r)(U(a).key)]), q(e, o);
	}), k(a), B((e, r, i, a, o) => {
		J(s, e), $(l, "for", `${t.uid}-bp`), J(u, r), $(d, "id", `${t.uid}-bp`), J(p, i), m !== (m = n().viewport ?? "") && (d.value = (d.__value = n().viewport ?? "") ?? "", fa(d, n().viewport ?? "")), $(h, "for", `${t.uid}-state`), J(g, a), $(_, "id", `${t.uid}-state`), _.disabled = n().viewport !== null, J(y, o), b !== (b = n().styleState ?? "") && (_.value = (_.__value = n().styleState ?? "") ?? "", fa(_, n().styleState ?? ""));
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
	}), q(e, a), j();
}
G(["change"]);
// src/ui/design/ClassesTab.svelte
var cs = /* @__PURE__ */ K("<li class=\"svelte-9fzp9u\"><input class=\"svelte-9fzp9u\"/> <code class=\"svelte-9fzp9u\"> </code> <button type=\"button\" class=\"svelte-9fzp9u\">✎</button> <button type=\"button\" class=\"svelte-9fzp9u\">×</button></li>"), ls = /* @__PURE__ */ K("<p class=\"message svelte-9fzp9u\" role=\"alert\"> </p>"), us = /* @__PURE__ */ K("<ul class=\"svelte-9fzp9u\"></ul> <div class=\"add svelte-9fzp9u\"><input placeholder=\"card\" class=\"svelte-9fzp9u\"/> <input placeholder=\"Card\" class=\"svelte-9fzp9u\"/> <button type=\"button\" class=\"svelte-9fzp9u\"> </button></div> <!> <!>", 1), ds = {
	hash: "svelte-9fzp9u",
	code: "ul.svelte-9fzp9u {list-style:none;margin:0;padding:0;display:grid;gap:.25rem;}li.svelte-9fzp9u {display:grid;grid-template-columns:1fr auto auto auto;gap:.25rem;align-items:center;font-size:.78rem;}input.svelte-9fzp9u {font:inherit;font-size:.78rem;padding:.2rem .35rem;border:1px solid var(--cpb-border);border-radius:5px;min-width:0;}.add.svelte-9fzp9u {display:grid;grid-template-columns:1fr 1fr auto;gap:.25rem;margin-top:.5rem;}button.svelte-9fzp9u {font:inherit;font-size:.78rem;padding:.2rem .5rem;border:1px solid var(--cpb-border);border-radius:5px;background:var(--cpb-surface);cursor:pointer;}button[aria-pressed='true'].svelte-9fzp9u {background:var(--cpb-accent-soft);}.message.svelte-9fzp9u {color:var(--cpb-danger);font-size:.75rem;}.svelte-9fzp9u:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function fs(e, t) {
	A(t, !0), Z(e, ds);
	let n = /* @__PURE__ */ P(() => t.store.t), r = /* @__PURE__ */ P(() => Object.entries(t.store.design.classes)), i = /* @__PURE__ */ F(null), a = /* @__PURE__ */ F(""), o = /* @__PURE__ */ F(""), s = /* @__PURE__ */ F(null);
	function c() {
		!vo.test(U(a)) || U(a) in t.store.design.classes ? I(s, U(n)("design.badId"), !0) : (I(s, null), t.store.designSession.update(xo(t.store.design, U(a), U(o).trim() || U(a))), I(i, U(a), !0), I(a, ""), I(o, ""));
	}
	async function l(e) {
		let r = await t.store.session.transport.designUsages?.("class", e).catch(() => []) ?? [];
		r.length > 0 ? I(s, U(n)("design.inUse", {
			name: e,
			where: r.map((e) => e.title).join(", ")
		}), !0) : (I(s, null), U(i) === e && I(i, null), t.store.designSession.update(Co(t.store.design, e)));
	}
	var u = us(), d = R(u);
	X(d, 21, () => U(r), ([e, t]) => e, (e, r) => {
		var a = /* @__PURE__ */ P(() => at(U(r), 2));
		let o = () => U(a)[0], s = () => U(a)[1];
		var c = cs(), u = L(c);
		Q(u);
		var d = z(u, 2), f = L(d);
		k(d);
		var p = z(d, 2), m = z(p, 2);
		k(c), B((e, t, n) => {
			$(u, "aria-label", e), ba(u, s().name ?? o()), J(f, `.${o() ?? ""}`), $(p, "aria-pressed", U(i) === o()), $(p, "aria-label", t), $(m, "aria-label", n);
		}, [
			() => `${U(n)("design.name")} · ${o()}`,
			() => U(n)("design.edit", { name: s().name ?? o() }),
			() => U(n)("design.delete", { name: s().name ?? o() })
		]), W("change", u, (e) => t.store.designSession.update(xo(t.store.design, o(), e.currentTarget.value))), W("click", p, () => {
			I(i, U(i) === o() ? null : o(), !0);
		}), W("click", m, () => l(o())), q(e, c);
	}), k(d);
	var f = z(d, 2), p = L(f);
	Q(p);
	var m = z(p, 2);
	Q(m);
	var h = z(m, 2), g = L(h, !0);
	k(h), k(f);
	var _ = z(f, 2), v = (e) => {
		var t = ls(), n = L(t, !0);
		k(t), B(() => J(n, U(s))), q(e, t);
	};
	Y(_, (e) => {
		U(s) && e(v);
	});
	var y = z(_, 2), b = (e) => {
		let r = /* @__PURE__ */ P(() => U(i));
		{
			let i = /* @__PURE__ */ P(() => `${t.uid}-class`), a = /* @__PURE__ */ P(() => t.store.design.classes[U(r)]?.styles), o = /* @__PURE__ */ P(() => U(n)("design.classStyles", { name: t.store.design.classes[U(r)]?.name ?? U(r) }));
			ss(e, {
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
				onSet: (e) => t.store.designSession.update(So(t.store.design, U(r), e))
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
	]), Ta(p, () => U(a), (e) => I(a, e)), Ta(m, () => U(o), (e) => I(o, e)), W("click", h, c), q(e, u), j();
}
G(["change", "click"]);
// src/ui/design/TokensTab.svelte
var ps = /* @__PURE__ */ K("<input class=\"svelte-1v1kt1m\"/>"), ms = /* @__PURE__ */ K("<tr class=\"svelte-1v1kt1m\"><th scope=\"row\" class=\"svelte-1v1kt1m\"> </th><td class=\"svelte-1v1kt1m\"> </td><td class=\"svelte-1v1kt1m\"><!></td><td class=\"svelte-1v1kt1m\"><button type=\"button\" class=\"svelte-1v1kt1m\">×</button></td></tr>"), hs = /* @__PURE__ */ K("<option class=\"svelte-1v1kt1m\"> </option>"), gs = /* @__PURE__ */ K("<p class=\"message svelte-1v1kt1m\" role=\"alert\"> </p>"), _s = /* @__PURE__ */ K("<table class=\"svelte-1v1kt1m\"><thead class=\"svelte-1v1kt1m\"><tr class=\"svelte-1v1kt1m\"><th scope=\"col\" class=\"svelte-1v1kt1m\"> </th><th scope=\"col\" class=\"svelte-1v1kt1m\"> </th><th scope=\"col\" class=\"svelte-1v1kt1m\"> </th><th class=\"svelte-1v1kt1m\"></th></tr></thead><tbody class=\"svelte-1v1kt1m\"></tbody></table> <div class=\"add svelte-1v1kt1m\"><input placeholder=\"color.accent\" class=\"svelte-1v1kt1m\"/> <select class=\"svelte-1v1kt1m\"></select> <input class=\"svelte-1v1kt1m\"/> <button type=\"button\" class=\"svelte-1v1kt1m\"> </button></div> <!>", 1), vs = {
	hash: "svelte-1v1kt1m",
	code: "table.svelte-1v1kt1m {width:100%;border-collapse:collapse;font-size:.78rem;}th.svelte-1v1kt1m, td.svelte-1v1kt1m {text-align:left;padding:.2rem;border-bottom:1px solid var(--cpb-border);}input.svelte-1v1kt1m, select.svelte-1v1kt1m {width:100%;box-sizing:border-box;font:inherit;font-size:.78rem;padding:.2rem .35rem;border:1px solid var(--cpb-border);border-radius:5px;}.add.svelte-1v1kt1m {display:grid;grid-template-columns:1fr auto 1fr auto;gap:.25rem;margin-top:.5rem;}button.svelte-1v1kt1m {font:inherit;font-size:.78rem;padding:.2rem .5rem;border:1px solid var(--cpb-border);border-radius:5px;background:var(--cpb-surface);cursor:pointer;}.message.svelte-1v1kt1m {color:var(--cpb-danger);font-size:.75rem;}.svelte-1v1kt1m:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function ys(e, t) {
	A(t, !0), Z(e, vs);
	let n = /* @__PURE__ */ P(() => t.store.t), r = /* @__PURE__ */ P(() => Object.entries(t.store.design.tokens)), i = /* @__PURE__ */ F(""), a = /* @__PURE__ */ F("color"), o = /* @__PURE__ */ F(""), s = /* @__PURE__ */ F(null), c = (e, t) => me(e, t) !== null;
	function l(e, r) {
		let i = t.store.design.tokens[e];
		i && (c(i.type, r) ? (I(s, null), t.store.designSession.update(yo(t.store.design, e, {
			...i,
			value: r
		}))) : I(s, U(n)("design.badValue"), !0));
	}
	function u() {
		!_o.test(U(i)) || U(i) in t.store.design.tokens ? I(s, U(n)("design.badId"), !0) : c(U(a), U(o)) ? (I(s, null), t.store.designSession.update(yo(t.store.design, U(i), {
			type: U(a),
			value: U(o)
		})), I(i, ""), I(o, "")) : I(s, U(n)("design.badValue"), !0);
	}
	async function d(e) {
		let r = await t.store.session.transport.designUsages?.("token", e).catch(() => []) ?? [], i = [...Eo(t.store.design, e), ...r.map((e) => e.title)];
		i.length > 0 ? I(s, U(n)("design.inUse", {
			name: e,
			where: i.join(", ")
		}), !0) : (I(s, null), t.store.designSession.update(bo(t.store.design, e)));
	}
	var f = _s(), p = R(f), m = L(p), h = L(m), g = L(h), _ = L(g, !0);
	k(g);
	var v = z(g), y = L(v, !0);
	k(v);
	var b = z(v), x = L(b, !0);
	k(b), Qt(), k(h), k(m);
	var S = z(m);
	X(S, 21, () => U(r), ([e, t]) => e, (e, t) => {
		var r = /* @__PURE__ */ P(() => at(U(t), 2));
		let i = () => U(r)[0], a = () => U(r)[1];
		var o = ms(), s = L(o), c = L(s, !0);
		k(s);
		var u = z(s), f = L(u, !0);
		k(u);
		var p = z(u), m = L(p), h = (e) => {
			var t = ps();
			Q(t), B((e) => {
				$(t, "aria-label", e), ba(t, a().value);
			}, [() => `${U(n)("design.value")} · ${i()}`]), W("change", t, (e) => l(i(), e.currentTarget.value)), q(e, t);
		}, g = (e) => {
			var t = Hi();
			B(() => J(t, `→ ${a().value.token ?? ""}`)), q(e, t);
		};
		Y(m, (e) => {
			typeof a().value == "string" ? e(h) : e(g, -1);
		}), k(p);
		var _ = z(p), v = L(_);
		k(_), k(o), B((e) => {
			J(c, i()), J(f, a().type), $(v, "aria-label", e);
		}, [() => U(n)("design.delete", { name: i() })]), W("click", v, () => d(i())), q(e, o);
	}), k(S), k(p);
	var C = z(p, 2), ee = L(C);
	Q(ee);
	var w = z(ee, 2);
	X(w, 20, () => ie.tokenTypes, (e) => e, (e, t) => {
		var n = hs(), r = L(n, !0);
		k(n);
		var i = {};
		B(() => {
			J(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
		}), q(e, n);
	}), k(w);
	var T = z(w, 2);
	Q(T);
	var E = z(T, 2), te = L(E, !0);
	k(E), k(C);
	var ne = z(C, 2), re = (e) => {
		var t = gs(), n = L(t, !0);
		k(t), B(() => J(n, U(s))), q(e, t);
	};
	Y(ne, (e) => {
		U(s) && e(re);
	}), B((e, n, r, i, a, o, s) => {
		J(_, e), J(y, n), J(x, r), $(ee, "aria-label", i), $(w, "aria-label", a), $(T, "aria-label", o), $(T, "id", `${t.uid}-token-value`), J(te, s);
	}, [
		() => U(n)("design.id"),
		() => U(n)("design.type"),
		() => U(n)("design.value"),
		() => U(n)("design.id"),
		() => U(n)("design.type"),
		() => U(n)("design.value"),
		() => U(n)("design.add")
	]), Ta(ee, () => U(i), (e) => I(i, e)), ma(w, () => U(a), (e) => I(a, e)), Ta(T, () => U(o), (e) => I(o, e)), W("click", E, u), q(e, f), j();
}
G(["change", "click"]);
// src/ui/design/DesignPanel.svelte
var bs = /* @__PURE__ */ K("<button type=\"button\" role=\"tab\" class=\"svelte-m57uux\"> </button>"), xs = /* @__PURE__ */ K("<li class=\"svelte-m57uux\"><code class=\"svelte-m57uux\"> </code> </li>"), Ss = /* @__PURE__ */ K("<div class=\"problems svelte-m57uux\" role=\"alert\"><p class=\"svelte-m57uux\"> </p> <ul class=\"svelte-m57uux\"></ul></div>"), Cs = /* @__PURE__ */ K("<button type=\"button\" class=\"svelte-m57uux\"> </button>"), ws = /* @__PURE__ */ K("<section class=\"design svelte-m57uux\"><div class=\"head svelte-m57uux\"><h2 class=\"svelte-m57uux\"> </h2> <button type=\"button\" class=\"svelte-m57uux\">×</button></div> <p class=\"meta svelte-m57uux\"> </p> <p class=\"help svelte-m57uux\"> </p> <div class=\"tabs svelte-m57uux\" role=\"tablist\"></div> <div role=\"tabpanel\" class=\"svelte-m57uux\"><!></div> <!> <div class=\"actions svelte-m57uux\"><button type=\"button\" class=\"svelte-m57uux\"> </button> <button type=\"button\" class=\"primary svelte-m57uux\"> </button> <!></div></section>"), Ts = {
	hash: "svelte-m57uux",
	code: ".design.svelte-m57uux {padding:.5rem .75rem;overflow:auto;border-left:1px solid var(--cpb-border);display:grid;gap:.5rem;align-content:start;}.head.svelte-m57uux {display:flex;justify-content:space-between;align-items:center;}h2.svelte-m57uux {font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin:0;color:var(--cpb-muted);}.meta.svelte-m57uux, .help.svelte-m57uux {margin:0;font-size:.75rem;color:var(--cpb-muted);}.tabs.svelte-m57uux {display:flex;gap:.25rem;}.tabs.svelte-m57uux button[aria-selected='true']:where(.svelte-m57uux) {background:var(--cpb-accent-soft);border-color:var(--cpb-accent);}.problems.svelte-m57uux {color:var(--cpb-danger);font-size:.75rem;}.problems.svelte-m57uux p:where(.svelte-m57uux) {margin:0;}.actions.svelte-m57uux {display:flex;flex-wrap:wrap;gap:.35rem;}button.svelte-m57uux {font:inherit;font-size:.8rem;padding:.3rem .6rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.primary.svelte-m57uux {background:var(--cpb-accent);border-color:var(--cpb-accent);color:#fff;}button.svelte-m57uux:disabled {opacity:.5;cursor:not-allowed;}.svelte-m57uux:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Es(e, t) {
	A(t, !0), Z(e, Ts);
	let n = ja(t, "store", 7), r = /* @__PURE__ */ P(() => n().t), i = /* @__PURE__ */ F("tokens"), a = /* @__PURE__ */ P(() => ue(n().design, []).diagnostics), o = /* @__PURE__ */ P(() => !n().designDirty && n().designPublished !== n().designRevision && n().designRevision > 0 && typeof n().session.transport.publishDesign == "function");
	var s = ws(), c = L(s), l = L(c), u = L(l, !0);
	k(l);
	var d = z(l, 2);
	k(c);
	var f = z(c, 2), p = L(f);
	k(f);
	var m = z(f, 2), h = L(m, !0);
	k(m);
	var g = z(m, 2);
	X(g, 20, () => [
		["tokens", "design.tokens"],
		["classes", "design.classes"],
		["breakpoints", "design.breakpoints"]
	], ([e, t]) => e, (e, n) => {
		var a = /* @__PURE__ */ P(() => at(n, 2));
		let o = () => U(a)[0], s = () => U(a)[1];
		var c = bs(), l = L(c, !0);
		k(c), B((e) => {
			$(c, "aria-selected", U(i) === o()), $(c, "aria-controls", `${t.uid}-design-${o()}`), J(l, e);
		}, [() => U(r)(s())]), W("click", c, () => {
			I(i, o(), !0);
		}), q(e, c);
	}), k(g);
	var _ = z(g, 2), v = L(_), y = (e) => {
		ys(e, {
			get store() {
				return n();
			},
			get uid() {
				return t.uid;
			}
		});
	}, b = (e) => {
		fs(e, {
			get store() {
				return n();
			},
			get uid() {
				return t.uid;
			}
		});
	}, x = (e) => {
		Ao(e, { get store() {
			return n();
		} });
	};
	Y(v, (e) => {
		U(i) === "tokens" ? e(y) : U(i) === "classes" ? e(b, 1) : e(x, -1);
	}), k(_);
	var S = z(_, 2), C = (e) => {
		var t = Ss(), n = L(t), i = L(n, !0);
		k(n);
		var o = z(n, 2);
		X(o, 21, () => U(a), (e) => e.path, (e, t) => {
			var n = xs(), r = L(n), i = L(r, !0);
			k(r);
			var a = z(r);
			k(n), B(() => {
				J(i, U(t).path), J(a, ` · ${U(t).code ?? ""}`);
			}), q(e, n);
		}), k(o), k(t), B((e) => J(i, e), [() => U(r)("design.problems")]), q(e, t);
	};
	Y(S, (e) => {
		U(a).length > 0 && e(C);
	});
	var ee = z(S, 2), w = L(ee), T = L(w, !0);
	k(w);
	var E = z(w, 2), te = L(E, !0);
	k(E);
	var ne = z(E, 2), re = (e) => {
		var t = Cs(), i = L(t, !0);
		k(t), B((e) => J(i, e), [() => U(r)("design.reload")]), W("click", t, () => n().designAction("reload")), q(e, t);
	};
	Y(ne, (e) => {
		n().designDirty && e(re);
	}), k(ee), k(s), B((e, r, c, f, m, g, v) => {
		$(s, "aria-labelledby", `${t.uid}-design-title`), $(l, "id", `${t.uid}-design-title`), J(u, e), $(d, "aria-label", r), J(p, `${c ?? ""} ·
    ${f ?? ""}`), J(h, m), $(_, "id", `${t.uid}-design-${U(i)}`), w.disabled = !n().designDirty || U(a).length > 0 || !n().designSession.editable, J(T, g), E.disabled = !U(o), J(te, v);
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
	}), W("click", w, () => n().designAction("save")), W("click", E, () => n().designAction("publish")), q(e, s), j();
}
G(["click"]);
// src/ui/content/TemplateDialog.svelte
var Ds = /* @__PURE__ */ K("<label class=\"svelte-181fmze\"> </label> <input required=\"\" maxlength=\"200\" class=\"svelte-181fmze\"/> <label class=\"svelte-181fmze\"> </label> <input maxlength=\"100\" class=\"svelte-181fmze\"/>", 1), Os = {
	hash: "svelte-181fmze",
	code: "label.svelte-181fmze {display:block;font-size:.8rem;font-weight:600;margin:.5rem 0 .25rem;}input.svelte-181fmze {width:100%;box-sizing:border-box;font:inherit;padding:.35rem .5rem;border:1px solid var(--cpb-border);border-radius:6px;}"
};
function ks(e, t) {
	A(t, !0), Z(e, Os);
	let n = ja(t, "open", 15, !1), r = /* @__PURE__ */ P(() => t.store.t), i = /* @__PURE__ */ F(""), a = /* @__PURE__ */ F("general"), o = /* @__PURE__ */ F(!1);
	async function s() {
		if (!t.nodeId || U(i).trim() === "") return;
		I(o, !0);
		let e = await t.content.saveTemplate(t.nodeId, U(i).trim(), U(a).trim() || "general");
		I(o, !1), e && (I(i, ""), n(!1));
	}
	{
		let c = /* @__PURE__ */ P(() => U(r)("template.title")), l = /* @__PURE__ */ P(() => `${t.uid}-template`), u = /* @__PURE__ */ P(() => U(r)("template.submit")), d = /* @__PURE__ */ P(() => U(r)("dialog.cancel"));
		po(e, {
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
				var o = Ds(), s = R(o), c = L(s, !0);
				k(s);
				var l = z(s, 2);
				Q(l);
				var u = z(l, 2), d = L(u, !0);
				k(u);
				var f = z(u, 2);
				Q(f), B((e, n) => {
					$(s, "for", `${t.uid}-template-name`), J(c, e), $(l, "id", `${t.uid}-template-name`), $(u, "for", `${t.uid}-template-category`), J(d, n), $(f, "id", `${t.uid}-template-category`);
				}, [() => U(r)("template.name"), () => U(r)("template.category")]), Ta(l, () => U(i), (e) => I(i, e)), Ta(f, () => U(a), (e) => I(a, e)), q(e, o);
			},
			$$slots: { default: !0 }
		});
	}
	j();
}
// src/ui/drag/indicator.ts
var As = "ceiba-drop-indicator", js = (e, t, n, r) => {
	let i = e.getElementById(As);
	i || (i = e.createElement("div"), i.id = As, i.setAttribute("aria-hidden", "true"), e.body.append(i));
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
}, Ms = (e) => {
	e?.getElementById(As)?.remove();
}, Ns = (e, t, n, r) => {
	let i = t <= 0 ? .5 : (n - e) / t;
	return r ? i < .25 ? "before" : i > .75 ? "after" : "inside" : i < .5 ? "before" : "after";
}, Ps = (e, t, n, r) => t.kind === "move" ? {
	kind: "move",
	id: t.id,
	parent: n,
	index: r
} : {
	kind: "insert",
	parent: n,
	index: r,
	node: t.node
}, Fs = (e, t, n, r, i) => {
	let a;
	if (r === null || !e.nodes[r]) a = Ps(e, n, null, e.rootIds.length);
	else if (i === "inside") a = Ps(e, n, r, e.nodes[r]?.children.length ?? 0);
	else {
		let t = e.nodes[r]?.parent ?? null;
		a = Ps(e, n, t, ce(e, t).indexOf(r) + +(i === "after"));
	}
	let o = r !== null && e.nodes[r] ? r : null;
	if (n.kind === "move" && a.kind === "move" && Is(e, n.id, a.parent, a.index)) return {
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
			refused: e instanceof te ? e.code : "SERVER"
		};
	}
}, Is = (e, t, n, r) => {
	if (e.nodes[t]?.parent !== n) return !1;
	let i = ce(e, n).indexOf(t);
	return r === i || r === i + 1;
}, Ls = 5, Rs = class {
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
			!this.active && Math.hypot(e.clientX - r.x, e.clientY - r.y) < Ls || (this.active || this.begin({
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
			if (!this.active && Math.hypot(e.clientX - i.x, e.clientY - i.y) < Ls) return;
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
		let i = n.elementFromPoint(e, t)?.closest("[data-ceiba-id]") ?? null, a = i?.dataset.ceibaId ?? null, o = a ? this.store.tree.nodes[a] : void 0, s = i?.getBoundingClientRect(), c = o ? this.store.catalogue?.get(o.type)?.isContainer ?? !1 : !1, l = s ? Ns(s.top, s.height, t, c) : "inside";
		this.active.target = Fs(this.store.tree, r, this.active.dragged, a, l), js(n, i, l, this.active.target.refused !== null);
	}
	clearTarget() {
		this.active && (this.active.target = null), Ms(this.doc);
	}
	finish(e) {
		let t = this.active;
		if (this.active = null, Ms(this.doc), this.frame && (this.frame.style.pointerEvents = ""), this.doc?.body.classList.remove("ceiba-dragging"), document.removeEventListener("keydown", this.onKey, !0), this.doc?.removeEventListener("keydown", this.onKey, !0), !t) return;
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
}, zs = /* @__PURE__ */ K("<li class=\"svelte-239l1j\"> <button type=\"button\" class=\"svelte-239l1j\">×</button></li>"), Bs = /* @__PURE__ */ K("<option class=\"svelte-239l1j\"> </option>"), Vs = /* @__PURE__ */ K("<select class=\"svelte-239l1j\"><option class=\"svelte-239l1j\"> </option><!></select>"), Hs = /* @__PURE__ */ K("<div class=\"classes svelte-239l1j\"><label class=\"svelte-239l1j\"> </label> <ul class=\"svelte-239l1j\"></ul> <!></div>"), Us = {
	hash: "svelte-239l1j",
	code: ".classes.svelte-239l1j {margin:.5rem 0;display:grid;gap:.25rem;}label.svelte-239l1j {font-size:.75rem;font-weight:600;}ul.svelte-239l1j {list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:.25rem;}li.svelte-239l1j {font-size:.75rem;padding:.1rem .2rem .1rem .5rem;border-radius:999px;background:var(--cpb-accent-soft);display:flex;align-items:center;gap:.25rem;}button.svelte-239l1j {font:inherit;border:none;background:none;cursor:pointer;padding:0 .25rem;}select.svelte-239l1j {font:inherit;font-size:.8rem;padding:.25rem .4rem;border:1px solid var(--cpb-border);border-radius:6px;}.svelte-239l1j:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Ws(e, t) {
	A(t, !0), Z(e, Us);
	let n = /* @__PURE__ */ P(() => t.store.t), r = /* @__PURE__ */ P(() => t.node.fields.styles), i = /* @__PURE__ */ P(() => U(r)?.classes ?? []), a = /* @__PURE__ */ P(() => Object.entries(t.store.design.classes).filter(([e]) => !U(i).includes(e)));
	function o(e) {
		let n = ae(U(r), e);
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
	var s = Ui(), c = R(s), l = (e) => {
		var r = Hs(), s = L(r), c = L(s, !0);
		k(s);
		var l = z(s, 2);
		X(l, 20, () => U(i), (e) => e, (e, r) => {
			var a = zs(), s = L(a), c = z(s);
			k(a), B((e) => {
				J(s, `${t.store.design.classes[r]?.name ?? r ?? ""} `), $(c, "aria-label", e);
			}, [() => U(n)("styles.removeClass", { name: t.store.design.classes[r]?.name ?? r })]), W("click", c, () => o(U(i).filter((e) => e !== r))), q(e, a);
		}), k(l);
		var u = z(l, 2), d = (e) => {
			var r = Vs(), s = L(r), c = L(s, !0);
			k(s), s.value = s.__value = "", X(z(s), 17, () => U(a), ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ P(() => at(U(t), 2));
				let r = () => U(n)[0], i = () => U(n)[1];
				var a = Bs(), o = L(a, !0);
				k(a);
				var s = {};
				B(() => {
					J(o, i().name ?? r()), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
				}), q(e, a);
			}), k(r), r.value = r.__value = "", B((e) => {
				$(r, "id", `${t.uid}-add-class`), J(c, e);
			}, [() => U(n)("styles.addClass")]), W("change", r, (e) => {
				e.currentTarget.value && o([...U(i), e.currentTarget.value]);
			}), q(e, r);
		};
		Y(u, (e) => {
			U(a).length > 0 && e(d);
		}), k(r), B((e) => {
			$(s, "for", `${t.uid}-add-class`), J(c, e);
		}, [() => U(n)("styles.classes")]), q(e, r);
	}, u = /* @__PURE__ */ P(() => Object.keys(t.store.design.classes).length > 0);
	Y(c, (e) => {
		U(u) && e(l);
	}), q(e, s), j();
}
G(["click", "change"]);
// src/ui/inspector/advanced/loop.ts
var Gs = (e) => typeof e == "object" && e && !Array.isArray(e) ? e : {}, Ks = (e) => {
	let t = Gs(e), n = typeof t.source == "string" ? t.source : "", r = Gs(t.sort);
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
		filters: Object.entries(Gs(t.filters)).map(([e, t]) => `${e}=${String(t)}`).join("\n")
	};
}, qs = (e) => {
	if (e.trim() === "") return;
	let t = Number(e);
	return Number.isInteger(t) && t >= 0 ? t : null;
}, Js = (e) => {
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
		let e = qs(r);
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
}, Ys = /* @__PURE__ */ K("<div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input class=\"svelte-1v8f4it\"/></div>"), Xs = /* @__PURE__ */ K("<div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input type=\"url\" class=\"svelte-1v8f4it\"/></div>"), Zs = /* @__PURE__ */ K("<div class=\"grid svelte-1v8f4it\"><div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input class=\"svelte-1v8f4it\"/></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input class=\"svelte-1v8f4it\"/></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input inputmode=\"numeric\" class=\"svelte-1v8f4it\"/></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input inputmode=\"numeric\" class=\"svelte-1v8f4it\"/></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input class=\"svelte-1v8f4it\"/></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label> <select class=\"svelte-1v8f4it\"><option class=\"svelte-1v8f4it\">ASC</option><option class=\"svelte-1v8f4it\">DESC</option></select></div></div> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><textarea rows=\"3\" class=\"svelte-1v8f4it\"></textarea></div>", 1), Qs = /* @__PURE__ */ K("<p class=\"error svelte-1v8f4it\" role=\"alert\"> </p>"), $s = /* @__PURE__ */ K("<details class=\"advanced svelte-1v8f4it\"><summary class=\"svelte-1v8f4it\"> </summary> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label> <select class=\"svelte-1v8f4it\"><option class=\"svelte-1v8f4it\"> </option><option class=\"svelte-1v8f4it\"> </option><option class=\"svelte-1v8f4it\"> </option></select></div> <!> <!> <div class=\"field svelte-1v8f4it\"><label class=\"svelte-1v8f4it\"> </label><input class=\"svelte-1v8f4it\"/></div> <!> <button type=\"button\" class=\"svelte-1v8f4it\"> </button></details>"), ec = {
	hash: "svelte-1v8f4it",
	code: ".advanced.svelte-1v8f4it {margin-top:1rem;border-top:1px solid var(--cpb-border);padding-top:.5rem;}summary.svelte-1v8f4it {cursor:pointer;font-size:.8rem;font-weight:700;}.grid.svelte-1v8f4it {display:grid;grid-template-columns:1fr 1fr;gap:0 .5rem;}.field.svelte-1v8f4it {display:grid;gap:.25rem;margin:.5rem 0;}label.svelte-1v8f4it {font-size:.75rem;font-weight:600;}input.svelte-1v8f4it, select.svelte-1v8f4it, textarea.svelte-1v8f4it {font:inherit;font-size:.8rem;padding:.3rem .45rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}.error.svelte-1v8f4it {color:var(--cpb-danger);font-size:.75rem;margin:0;}button.svelte-1v8f4it {font:inherit;font-size:.8rem;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}.svelte-1v8f4it:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function tc(e, t) {
	A(t, !0), Z(e, ec);
	let n = /* @__PURE__ */ P(() => t.store.t), r = ur(Di(() => Ks(t.node.fields.loop))), i = /* @__PURE__ */ F(ur(Di(() => typeof t.node.fields.condition == "string" ? t.node.fields.condition : ""))), a = /* @__PURE__ */ F(null), o = (e) => `${t.uid}-adv-${e}`;
	function s() {
		let e = Js(r);
		if ("error" in e) {
			I(a, U(n)(e.error), !0);
			return;
		}
		I(a, null);
		let o = {}, s = [];
		e.loop ? o.loop = e.loop : s.push("loop"), U(i).trim() === "" ? s.push("condition") : o.condition = U(i).trim(), t.store.run({
			kind: "updateFields",
			id: t.node.id,
			set: o,
			unset: s
		});
	}
	var c = $s(), l = L(c), u = L(l, !0);
	k(l);
	var d = z(l, 2), f = L(d), p = L(f, !0);
	k(f);
	var m = z(f, 2), h = L(m), g = L(h, !0);
	k(h), h.value = h.__value = "none";
	var _ = z(h), v = L(_, !0);
	k(_), _.value = _.__value = "module";
	var y = z(_), b = L(y, !0);
	k(y), y.value = y.__value = "api", k(m), k(d);
	var x = z(d, 2), S = (e) => {
		var t = Ys(), i = L(t), a = L(i, !0);
		k(i);
		var s = z(i);
		Q(s), k(t), B((e, t, n) => {
			$(i, "for", e), J(a, t), $(s, "id", n);
		}, [
			() => o("module"),
			() => U(n)("advanced.moduleSlug"),
			() => o("module")
		]), Ta(s, () => r.module, (e) => r.module = e), q(e, t);
	}, C = (e) => {
		var t = Xs(), i = L(t), a = L(i, !0);
		k(i);
		var s = z(i);
		Q(s), k(t), B((e, t, n) => {
			$(i, "for", e), J(a, t), $(s, "id", n);
		}, [
			() => o("api"),
			() => U(n)("advanced.apiUrl"),
			() => o("api")
		]), Ta(s, () => r.api, (e) => r.api = e), q(e, t);
	};
	Y(x, (e) => {
		r.sourceType === "module" ? e(S) : r.sourceType === "api" && e(C, 1);
	});
	var ee = z(x, 2), w = (e) => {
		var t = Zs(), i = R(t), a = L(i), s = L(a), c = L(s, !0);
		k(s);
		var l = z(s);
		Q(l), k(a);
		var u = z(a, 2), d = L(u), f = L(d, !0);
		k(d);
		var p = z(d);
		Q(p), k(u);
		var m = z(u, 2), h = L(m), g = L(h, !0);
		k(h);
		var _ = z(h);
		Q(_), k(m);
		var v = z(m, 2), y = L(v), b = L(y, !0);
		k(y);
		var x = z(y);
		Q(x), k(v);
		var S = z(v, 2), C = L(S), ee = L(C, !0);
		k(C);
		var w = z(C);
		Q(w), k(S);
		var T = z(S, 2), E = L(T), te = L(E, !0);
		k(E);
		var ne = z(E, 2), re = L(ne);
		re.value = re.__value = "ASC";
		var ie = z(re);
		ie.value = ie.__value = "DESC", k(ne), k(T), k(i);
		var ae = z(i, 2), oe = L(ae), se = L(oe, !0);
		k(oe);
		var ce = z(oe);
		Tr(ce), k(ae), B((e, t, n, r, i, a, o, u, m, v, S, T, re, ie, ae, le, ue, de, fe, pe, me) => {
			$(s, "for", e), J(c, t), $(l, "id", n), $(d, "for", r), J(f, i), $(p, "id", a), $(h, "for", o), J(g, u), $(_, "id", m), $(y, "for", v), J(b, S), $(x, "id", T), $(C, "for", re), J(ee, ie), $(w, "id", ae), $(E, "for", le), J(te, ue), $(ne, "id", de), $(oe, "for", fe), J(se, pe), $(ce, "id", me);
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
		]), Ta(l, () => r.variable, (e) => r.variable = e), Ta(p, () => r.key, (e) => r.key = e), Ta(_, () => r.limit, (e) => r.limit = e), Ta(x, () => r.offset, (e) => r.offset = e), Ta(w, () => r.sortColumn, (e) => r.sortColumn = e), ma(ne, () => r.sortDirection, (e) => r.sortDirection = e), Ta(ce, () => r.filters, (e) => r.filters = e), q(e, t);
	};
	Y(ee, (e) => {
		r.sourceType !== "none" && e(w);
	});
	var T = z(ee, 2), E = L(T), te = L(E, !0);
	k(E);
	var ne = z(E);
	Q(ne), k(T);
	var re = z(T, 2), ie = (e) => {
		var t = Qs(), n = L(t, !0);
		k(t), B(() => J(n, U(a))), q(e, t);
	};
	Y(re, (e) => {
		U(a) && e(ie);
	});
	var ae = z(re, 2), oe = L(ae, !0);
	k(ae), k(c), B((e, t, n, r, i, a, o, s, c, l, d) => {
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
	]), ma(m, () => r.sourceType, (e) => r.sourceType = e), Ta(ne, () => U(i), (e) => I(i, e)), W("click", ae, s), q(e, c), j();
}
G(["click"]);
// src/ui/inspector/fields.ts
var nc = {
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
	media: "media"
}, rc = /* @__PURE__ */ new Set([
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
]), ic = (e) => e.charAt(0).toUpperCase() + e.slice(1).replace(/[_-]/g, " "), ac = (e) => {
	let t = [], n = /* @__PURE__ */ new Set();
	for (let [r, i] of Object.entries(e.editorControls)) {
		let e = i, a = e.options?.map(String);
		t.push({
			key: r,
			label: e.label ?? ic(r),
			control: nc[e.type ?? ""] ?? "text",
			...a ? { options: a } : {}
		}), n.add(r);
	}
	for (let [r, i] of Object.entries(e.propsSchema)) {
		if (n.has(r)) continue;
		let e = i, a = e.enum?.map(String);
		t.push({
			key: r,
			label: ic(r),
			control: a ? "select" : nc[e.type ?? ""] ?? "text",
			...a ? { options: a } : {}
		}), n.add(r);
	}
	return Object.keys(e.propsSchema).length === 0 && Object.keys(e.editorControls).length === 0 && (rc.has(e.type) && t.push({
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
}, oc = (e, t) => {
	if (e.control === "checkbox") return { value: t === !0 };
	let n = String(t);
	if (e.control === "number") {
		if (n.trim() === "") return { value: null };
		let e = Number(n);
		return Number.isFinite(e) ? { value: e } : { error: "field.number" };
	}
	return (e.control === "url" || e.control === "media") && n.trim() !== "" && Na(n) === "" ? { error: "field.url" } : e.control === "select" && e.options && !e.options.includes(n) ? { error: "field.option" } : e.control === "select" && e.options?.every((e) => /^\d+$/.test(e)) ? { value: Number(n) } : { value: n };
}, sc = /* @__PURE__ */ K("<label class=\"svelte-1g42mo8\"><input type=\"checkbox\" class=\"svelte-1g42mo8\"/> </label>"), cc = /* @__PURE__ */ K("<textarea rows=\"3\" class=\"svelte-1g42mo8\"></textarea>"), lc = /* @__PURE__ */ K("<option> </option>"), uc = /* @__PURE__ */ K("<select class=\"svelte-1g42mo8\"></select>"), dc = /* @__PURE__ */ K("<input class=\"svelte-1g42mo8\"/>"), fc = /* @__PURE__ */ K("<label class=\"svelte-1g42mo8\"> </label> <!>", 1), pc = /* @__PURE__ */ K("<p class=\"error svelte-1g42mo8\" role=\"alert\"> </p>"), mc = /* @__PURE__ */ K("<div class=\"field svelte-1g42mo8\"><!> <!></div>"), hc = {
	hash: "svelte-1g42mo8",
	code: ".field.svelte-1g42mo8 {display:grid;gap:.25rem;margin-bottom:.75rem;}label.svelte-1g42mo8 {font-size:.8rem;font-weight:600;}input.svelte-1g42mo8:not([type='checkbox']), textarea.svelte-1g42mo8, select.svelte-1g42mo8 {font:inherit;font-size:.875rem;padding:.35rem .5rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}[aria-invalid='true'].svelte-1g42mo8 {border-color:var(--cpb-danger);}input.svelte-1g42mo8:focus-visible, textarea.svelte-1g42mo8:focus-visible, select.svelte-1g42mo8:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}.error.svelte-1g42mo8 {color:var(--cpb-danger);font-size:.75rem;margin:0;}"
};
function gc(e, t) {
	A(t, !0), Z(e, hc);
	let n = /* @__PURE__ */ F(null), r = /* @__PURE__ */ P(() => t.value === null || t.value === void 0 || typeof t.value == "object" ? "" : String(t.value));
	function i(e) {
		let r = oc(t.field, e);
		"error" in r ? I(n, t.t(r.error), !0) : (I(n, null), t.onChange(r.value));
	}
	var a = mc(), o = L(a), s = (e) => {
		var n = sc(), r = L(n);
		Q(r);
		var a = z(r);
		k(n), B(() => {
			$(r, "id", t.id), xa(r, t.value === !0), J(a, ` ${t.field.label ?? ""}`);
		}), W("change", r, (e) => i(e.currentTarget.checked)), q(e, n);
	}, c = (e) => {
		var a = fc(), o = R(a), s = L(o, !0);
		k(o);
		var c = z(o, 2), l = (e) => {
			var a = cc();
			Tr(a), B(() => {
				$(a, "id", t.id), ba(a, U(r)), $(a, "aria-invalid", U(n) !== null), $(a, "aria-describedby", U(n) ? `${t.id}-error` : void 0);
			}), W("input", a, (e) => i(e.currentTarget.value)), q(e, a);
		}, u = (e) => {
			var n = uc();
			X(n, 20, () => t.field.options ?? [], (e) => e, (e, t) => {
				var n = lc(), r = L(n, !0);
				k(n);
				var i = {};
				B(() => {
					J(r, t), i !== (i = t) && (n.value = (n.__value = t) ?? "");
				}), q(e, n);
			}), k(n);
			var a;
			pa(n), B(() => {
				$(n, "id", t.id), a !== (a = U(r)) && (n.value = (n.__value = U(r)) ?? "", fa(n, U(r)));
			}), W("change", n, (e) => i(e.currentTarget.value)), q(e, n);
		}, d = (e) => {
			var a = dc();
			Q(a), B(() => {
				$(a, "id", t.id), $(a, "type", t.field.control === "number" ? "number" : t.field.control === "url" || t.field.control === "media" ? "url" : "text"), ba(a, U(r)), $(a, "aria-invalid", U(n) !== null), $(a, "aria-describedby", U(n) ? `${t.id}-error` : void 0);
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
		var r = pc(), i = L(r, !0);
		k(r), B(() => {
			$(r, "id", `${t.id}-error`), J(i, U(n));
		}), q(e, r);
	};
	Y(l, (e) => {
		U(n) && e(u);
	}), k(a), q(e, a), j();
}
G(["change", "input"]);
// src/ui/inspector/Inspector.svelte
var _c = /* @__PURE__ */ K("<p class=\"hint svelte-2ghsnx\"> </p>"), vc = /* @__PURE__ */ K("<p class=\"locked svelte-2ghsnx\" role=\"note\"> </p>"), yc = /* @__PURE__ */ K("<!> <!>", 1), bc = /* @__PURE__ */ K("<button type=\"button\" class=\"svelte-2ghsnx\"> </button>"), xc = /* @__PURE__ */ K("<p class=\"type svelte-2ghsnx\"> </p> <div class=\"field svelte-2ghsnx\"><label class=\"svelte-2ghsnx\"> </label> <input type=\"text\" class=\"svelte-2ghsnx\"/></div> <!> <!> <div class=\"actions svelte-2ghsnx\"><button type=\"button\" class=\"svelte-2ghsnx\"> </button> <!> <button type=\"button\" class=\"danger svelte-2ghsnx\"> </button></div>", 1), Sc = /* @__PURE__ */ K("<section class=\"inspector svelte-2ghsnx\"><h2 class=\"svelte-2ghsnx\"> </h2> <!></section>"), Cc = {
	hash: "svelte-2ghsnx",
	code: ".inspector.svelte-2ghsnx {padding:.5rem .75rem;overflow:auto;border-left:1px solid var(--cpb-border);}h2.svelte-2ghsnx {font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin:0 0 .5rem;color:var(--cpb-muted);}.hint.svelte-2ghsnx, .locked.svelte-2ghsnx {font-size:.85rem;color:var(--cpb-muted);}.locked.svelte-2ghsnx {color:var(--cpb-danger);}.type.svelte-2ghsnx {font-weight:700;margin:0 0 .75rem;}.field.svelte-2ghsnx {display:grid;gap:.25rem;margin-bottom:.75rem;}label.svelte-2ghsnx {font-size:.8rem;font-weight:600;}input.svelte-2ghsnx {font:inherit;font-size:.875rem;padding:.35rem .5rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}.actions.svelte-2ghsnx {display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1rem;}button.svelte-2ghsnx {font:inherit;font-size:.8rem;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.danger.svelte-2ghsnx {color:var(--cpb-danger);}button.svelte-2ghsnx:focus-visible, input.svelte-2ghsnx:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function wc(e, t) {
	A(t, !0), Z(e, Cc);
	let n = ja(t, "canTemplates", 3, !1), r = /* @__PURE__ */ P(() => t.store.t), i = /* @__PURE__ */ P(() => t.store.selection ? t.store.tree.nodes[t.store.selection] : void 0), a = /* @__PURE__ */ P(() => U(i) ? t.store.catalogue?.get(U(i).type) : void 0), o = /* @__PURE__ */ P(() => U(a) ? ac(U(a)) : []), s = /* @__PURE__ */ P(() => {
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
	var f = Sc(), p = L(f), m = L(p, !0);
	k(p);
	var h = z(p, 2), g = (e) => {
		var t = _c(), n = L(t, !0);
		k(t), B((e) => J(n, e), [() => U(r)("inspector.none")]), q(e, t);
	}, _ = (e) => {
		var f = Ui();
		Zi(R(f), () => U(i).id, (e) => {
			var f = xc(), p = R(f), m = L(p, !0);
			k(p);
			var h = z(p, 2), g = L(h), _ = L(g, !0);
			k(g);
			var v = z(g, 2);
			Q(v), k(h);
			var y = z(h, 2), b = (e) => {
				var t = vc(), n = L(t, !0);
				k(t), B((e) => J(n, e), [() => U(r)("inspector.locked")]), q(e, t);
			}, x = (e) => {
				var n = Ui();
				X(R(n), 17, () => U(o), (e) => e.key, (e, n) => {
					var i = Ui(), a = R(i), o = (e) => {
						{
							let r = /* @__PURE__ */ P(() => `${t.uid}-prop-${U(n).key}`), i = /* @__PURE__ */ P(() => U(n).key === "src" || U(n).key === "image");
							Ho(e, {
								get store() {
									return t.store;
								},
								get id() {
									return U(r);
								},
								get label() {
									return U(n).label;
								},
								get value() {
									return U(s)[U(n).key];
								},
								get withAlt() {
									return U(i);
								},
								onChange: (e) => c(U(n).key, e)
							});
						}
					}, l = (e) => {
						{
							let i = /* @__PURE__ */ P(() => `${t.uid}-prop-${U(n).key}`);
							gc(e, {
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
					};
					Y(a, (e) => {
						U(n).control === "media" && t.store.media.available ? e(o) : e(l, -1);
					}), q(e, i);
				}), q(e, n);
			};
			Y(y, (e) => {
				U(a) ? e(x, -1) : e(b);
			});
			var S = z(y, 2), C = (e) => {
				var n = yc(), r = R(n);
				ss(r, {
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
						Ws(e, {
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
				}), tc(z(r, 2), {
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
			var ee = z(S, 2), w = L(ee), T = L(w, !0);
			k(w);
			var E = z(w, 2), te = (e) => {
				var n = bc(), i = L(n, !0);
				k(n), B((e) => J(i, e), [() => U(r)("inspector.saveTemplate")]), W("click", n, function(...e) {
					t.onSaveTemplate?.apply(this, e);
				}), q(e, n);
			};
			Y(E, (e) => {
				n() && e(te);
			});
			var ne = z(E, 2), re = L(ne, !0);
			k(ne), k(ee), B((e, n, r) => {
				J(m, U(a)?.label ?? U(i).type), $(g, "for", `${t.uid}-name`), J(_, e), $(v, "id", `${t.uid}-name`), ba(v, typeof U(i).fields.label == "string" ? U(i).fields.label : ""), J(T, n), J(re, r);
			}, [
				() => U(r)("inspector.name"),
				() => U(r)("inspector.duplicate"),
				() => U(r)("inspector.remove")
			]), W("input", v, (e) => l(e.currentTarget.value)), W("click", w, () => U(i) && t.store.run({
				kind: "duplicate",
				id: U(i).id
			})), W("click", ne, d), q(e, f);
		}), q(e, f);
	};
	Y(h, (e) => {
		U(i) ? e(_, -1) : e(g);
	}), k(f), B((e) => {
		$(f, "aria-labelledby", `${t.uid}-inspector-title`), $(p, "id", `${t.uid}-inspector-title`), J(m, e);
	}, [() => U(r)("inspector.title")]), q(e, f), j();
}
G(["input", "click"]);
// src/ui/media/browser.svelte.ts
var Tc = class {
	store;
	#e = /* @__PURE__ */ F([]);
	get items() {
		return U(this.#e);
	}
	set items(e) {
		I(this.#e, e);
	}
	#t = /* @__PURE__ */ F(0);
	get total() {
		return U(this.#t);
	}
	set total(e) {
		I(this.#t, e, !0);
	}
	#n = /* @__PURE__ */ F("");
	get search() {
		return U(this.#n);
	}
	set search(e) {
		I(this.#n, e, !0);
	}
	#r = /* @__PURE__ */ F(!1);
	get loading() {
		return U(this.#r);
	}
	set loading(e) {
		I(this.#r, e, !0);
	}
	#i = /* @__PURE__ */ F(!1);
	get busy() {
		return U(this.#i);
	}
	set busy(e) {
		I(this.#i, e, !0);
	}
	#a = /* @__PURE__ */ F(null);
	get selected() {
		return U(this.#a);
	}
	set selected(e) {
		I(this.#a, e);
	}
	#o = /* @__PURE__ */ F("");
	get error() {
		return U(this.#o);
	}
	set error(e) {
		I(this.#o, e, !0);
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
				if (t instanceof te && t.code === "MEDIA_IN_USE" && this.transport.mediaUsages) {
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
		this.error = e instanceof te && e.code === "VALIDATION_FAILED" && e.details.file === "TYPE" ? t("media.typeError") : t(`error.${e instanceof te ? e.code : "SERVER"}`);
	}
}, Ec = /* @__PURE__ */ K("<button type=\"button\" class=\"tile svelte-7v01bt\"><img loading=\"lazy\" class=\"svelte-7v01bt\"/> <span class=\"svelte-7v01bt\"> </span></button>"), Dc = /* @__PURE__ */ K("<p class=\"empty svelte-7v01bt\"> </p>"), Oc = /* @__PURE__ */ K("<button type=\"button\" class=\"more svelte-7v01bt\"> </button>"), kc = /* @__PURE__ */ K("<div class=\"details svelte-7v01bt\" aria-live=\"polite\"><p class=\"svelte-7v01bt\"><strong class=\"svelte-7v01bt\"> </strong> <!></p> <label class=\"svelte-7v01bt\"> </label> <p class=\"help svelte-7v01bt\"> </p> <div class=\"row svelte-7v01bt\"><input type=\"text\" class=\"svelte-7v01bt\"/> <button type=\"button\" class=\"svelte-7v01bt\"> </button></div> <button type=\"button\" class=\"danger svelte-7v01bt\"> </button></div>"), Ac = /* @__PURE__ */ K("<p class=\"error svelte-7v01bt\" role=\"alert\"> </p>"), jc = /* @__PURE__ */ K("<div class=\"library svelte-7v01bt\"><label class=\"svelte-7v01bt\"> </label> <input type=\"search\" class=\"svelte-7v01bt\"/> <div class=\"grid svelte-7v01bt\" role=\"group\"></div> <!> <!> <!></div>"), Mc = {
	hash: "svelte-7v01bt",
	code: ".library.svelte-7v01bt {display:grid;gap:.35rem;align-content:start;min-width:0;}label.svelte-7v01bt {font-size:.8rem;font-weight:600;}.grid.svelte-7v01bt {display:grid;grid-template-columns:repeat(auto-fill, minmax(96px, 1fr));gap:.4rem;max-height:320px;overflow:auto;padding:2px;}.tile.svelte-7v01bt {display:grid;gap:.2rem;padding:.25rem;border:2px solid var(--cpb-border);border-radius:8px;background:var(--cpb-surface);cursor:pointer;font:inherit;font-size:.65rem;}.tile[aria-pressed='true'].svelte-7v01bt {border-color:var(--cpb-accent);background:var(--cpb-accent-soft);}.tile.svelte-7v01bt img:where(.svelte-7v01bt) {width:100%;aspect-ratio:1;object-fit:cover;border-radius:4px;}.tile.svelte-7v01bt span:where(.svelte-7v01bt) {overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}.details.svelte-7v01bt {display:grid;gap:.3rem;border-top:1px solid var(--cpb-border);padding-top:.4rem;font-size:.8rem;}.details.svelte-7v01bt p:where(.svelte-7v01bt) {margin:0;}.help.svelte-7v01bt {color:var(--cpb-muted);font-size:.75rem;}.row.svelte-7v01bt {display:flex;gap:.3rem;}input.svelte-7v01bt, button.svelte-7v01bt {font:inherit;font-size:.8rem;padding:.3rem .5rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}.row.svelte-7v01bt input:where(.svelte-7v01bt) {flex:1;min-width:0;}button.svelte-7v01bt {cursor:pointer;}.more.svelte-7v01bt, .danger.svelte-7v01bt {justify-self:start;}.danger.svelte-7v01bt {color:var(--cpb-danger);}.empty.svelte-7v01bt {font-size:.8rem;color:var(--cpb-muted);}.error.svelte-7v01bt {color:var(--cpb-danger);font-size:.75rem;margin:0;}.svelte-7v01bt:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Nc(e, t) {
	A(t, !0), Z(e, Mc);
	let n = ja(t, "browser", 7), r = /* @__PURE__ */ P(() => t.store.t), i = /* @__PURE__ */ P(() => n().selected), a = /* @__PURE__ */ F("");
	Fr(() => {
		I(a, U(i)?.alt ?? "", !0);
	});
	let o;
	function s() {
		clearTimeout(o), o = setTimeout(() => void n().load(), 250);
	}
	var c = jc(), l = L(c), u = L(l, !0);
	k(l);
	var d = z(l, 2);
	Q(d);
	var f = z(d, 2);
	X(f, 21, () => n().items, (e) => e.id, (e, t) => {
		var r = Ec(), a = L(r), o = z(a, 2), s = L(o, !0);
		k(o), k(r), B(() => {
			$(r, "aria-pressed", U(i)?.id === U(t).id), $(r, "title", U(t).filename), $(a, "src", U(t).thumbnail), $(a, "alt", U(t).alt), J(s, U(t).filename);
		}), W("click", r, () => n().select(U(t))), q(e, r);
	}, (e) => {
		var t = Ui(), i = R(t), a = (e) => {
			var t = Dc(), n = L(t, !0);
			k(t), B((e) => J(n, e), [() => U(r)("media.empty")]), q(e, t);
		};
		Y(i, (e) => {
			n().loading || e(a);
		}), q(e, t);
	}), k(f);
	var p = z(f, 2), m = (e) => {
		var t = Oc(), i = L(t, !0);
		k(t), B((e) => {
			t.disabled = n().loading, J(i, e);
		}, [() => U(r)("media.more")]), W("click", t, () => void n().load(!0)), q(e, t);
	};
	Y(p, (e) => {
		n().hasMore && e(m);
	});
	var h = z(p, 2), g = (e) => {
		var o = kc(), s = L(o), c = L(s), l = L(c, !0);
		k(c);
		var u = z(c, 2), d = (e) => {
			var t = Hi();
			B((e) => J(t, `· ${e ?? ""}`), [() => U(r)("media.dimensions", {
				width: U(i).originalWidth,
				height: U(i).originalHeight
			})]), q(e, t);
		};
		Y(u, (e) => {
			U(i).originalWidth && U(i).originalHeight && e(d);
		}), k(s);
		var f = z(s, 2), p = L(f, !0);
		k(f);
		var m = z(f, 2), h = L(m, !0);
		k(m);
		var g = z(m, 2), _ = L(g);
		Q(_);
		var v = z(_, 2), y = L(v, !0);
		k(v), k(g);
		var b = z(g, 2), x = L(b, !0);
		k(b), k(o), B((e, r, o, s, c) => {
			J(l, e), $(f, "for", `${t.uid}-alt`), J(p, r), $(m, "id", `${t.uid}-alt-help`), J(h, o), $(_, "id", `${t.uid}-alt`), $(_, "aria-describedby", `${t.uid}-alt-help`), v.disabled = n().busy || U(a) === U(i).alt, J(y, s), b.disabled = n().busy, J(x, c);
		}, [
			() => U(r)("media.selected", { name: U(i).filename }),
			() => U(r)("media.alt"),
			() => U(r)("media.altHelp"),
			() => U(r)("media.saveAlt"),
			() => U(r)("media.delete")
		]), Ta(_, () => U(a), (e) => I(a, e)), W("click", v, () => void n().describe(U(a))), W("click", b, () => void n().remove()), q(e, o);
	};
	Y(h, (e) => {
		U(i) && e(g);
	});
	var _ = z(h, 2), v = (e) => {
		var t = Ac(), r = L(t, !0);
		k(t), B(() => J(r, n().error)), q(e, t);
	};
	Y(_, (e) => {
		n().error && e(v);
	}), k(c), B((e, r) => {
		$(l, "for", `${t.uid}-search`), J(u, e), $(d, "id", `${t.uid}-search`), $(f, "aria-label", r), $(f, "aria-busy", n().loading);
	}, [() => U(r)("media.search"), () => U(r)("media.library")]), W("input", d, s), Ta(d, () => n().search, (e) => n().search = e), q(e, c), j();
}
G(["input", "click"]);
// src/ui/media/UploadForm.svelte
var Pc = /* @__PURE__ */ K("<p class=\"error svelte-1l55g1o\" role=\"alert\"> </p>"), Fc = /* @__PURE__ */ K("<label class=\"check svelte-1l55g1o\"><input type=\"checkbox\" class=\"svelte-1l55g1o\"/> </label>"), Ic = /* @__PURE__ */ K("<fieldset class=\"svelte-1l55g1o\"><legend class=\"svelte-1l55g1o\"> </legend> <!></fieldset>"), Lc = /* @__PURE__ */ K("<form class=\"upload svelte-1l55g1o\"><h3 class=\"svelte-1l55g1o\"> </h3> <label class=\"svelte-1l55g1o\"> </label> <input type=\"file\" class=\"svelte-1l55g1o\"/> <!> <label class=\"svelte-1l55g1o\"> </label> <input type=\"text\" class=\"svelte-1l55g1o\"/> <!> <label class=\"check svelte-1l55g1o\"><input type=\"checkbox\" class=\"svelte-1l55g1o\"/> </label> <label class=\"check svelte-1l55g1o\"><input type=\"checkbox\" class=\"svelte-1l55g1o\"/> </label> <button type=\"submit\" class=\"svelte-1l55g1o\"> </button></form>"), Rc = {
	hash: "svelte-1l55g1o",
	code: ".upload.svelte-1l55g1o {display:grid;gap:.3rem;padding:.5rem;border:1px solid var(--cpb-border);border-radius:8px;}h3.svelte-1l55g1o {font-size:.85rem;margin:0;}label.svelte-1l55g1o {font-size:.8rem;font-weight:600;}.check.svelte-1l55g1o {font-weight:400;display:flex;gap:.35rem;align-items:center;}fieldset.svelte-1l55g1o {border:1px solid var(--cpb-border);border-radius:6px;padding:.25rem .5rem;margin:0;}legend.svelte-1l55g1o {font-size:.8rem;font-weight:600;}input[type='text'].svelte-1l55g1o, button.svelte-1l55g1o {font:inherit;font-size:.8rem;padding:.3rem .5rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;}button.svelte-1l55g1o {cursor:pointer;justify-self:start;}.error.svelte-1l55g1o {color:var(--cpb-danger);font-size:.75rem;margin:0;}.svelte-1l55g1o:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function zc(e, t) {
	A(t, !0), Z(e, Rc);
	let n = ja(t, "browser", 7), r = /* @__PURE__ */ P(() => t.store.t), i = /* @__PURE__ */ F(void 0), a = /* @__PURE__ */ F(""), o = /* @__PURE__ */ F(ur([])), s = /* @__PURE__ */ F(!0), c = /* @__PURE__ */ F(!0), l = /* @__PURE__ */ F("");
	Fr(() => {
		t.settings && (I(o, [...t.settings.widths], !0), I(c, t.settings.webp, !0));
	});
	function u(e, t) {
		I(o, t ? [...U(o), e].sort((e, t) => e - t) : U(o).filter((t) => t !== e), !0);
	}
	async function d(e) {
		e.preventDefault(), e.stopPropagation();
		let r = U(i)?.files?.[0];
		r && (n().error = "", I(l, n().check(r, t.settings) ?? "", !0), U(l) === "" && await n().upload(r, {
			alt: U(a),
			widths: U(o),
			optimize: U(s),
			webp: U(c)
		}) && (I(a, ""), U(i) && (U(i).value = "")));
	}
	var f = Lc(), p = L(f), m = L(p, !0);
	k(p);
	var h = z(p, 2), g = L(h, !0);
	k(h);
	var _ = z(h, 2);
	Aa(_, (e) => I(i, e), () => U(i));
	var v = z(_, 2), y = (e) => {
		var n = Pc(), r = L(n, !0);
		k(n), B(() => {
			$(n, "id", `${t.uid}-file-error`), J(r, U(l));
		}), q(e, n);
	};
	Y(v, (e) => {
		U(l) && e(y);
	});
	var b = z(v, 2), x = L(b, !0);
	k(b);
	var S = z(b, 2);
	Q(S);
	var C = z(S, 2), ee = (e) => {
		var n = Ic(), i = L(n), a = L(i, !0);
		k(i), X(z(i, 2), 16, () => t.settings.widths, (e) => e, (e, t) => {
			var n = Fc(), i = L(n);
			Q(i);
			var a = z(i);
			k(n), B((e, t) => {
				xa(i, e), J(a, ` ${t ?? ""}`);
			}, [() => U(o).includes(t), () => U(r)("media.recommended", { width: t })]), W("change", i, (e) => u(t, e.currentTarget.checked)), q(e, n);
		}), k(n), B((e) => J(a, e), [() => U(r)("media.sizes")]), q(e, n);
	};
	Y(C, (e) => {
		t.settings && e(ee);
	});
	var w = z(C, 2), T = L(w);
	Q(T);
	var E = z(T);
	k(w);
	var te = z(w, 2), ne = L(te);
	Q(ne);
	var re = z(ne);
	k(te);
	var ie = z(te, 2), ae = L(ie, !0);
	k(ie), k(f), B((e, r, i, a, o, s, c) => {
		$(f, "aria-labelledby", `${t.uid}-upload-title`), $(p, "id", `${t.uid}-upload-title`), J(m, e), $(h, "for", `${t.uid}-file`), J(g, r), $(_, "id", `${t.uid}-file`), $(_, "accept", i), $(_, "aria-describedby", U(l) ? `${t.uid}-file-error` : void 0), $(b, "for", `${t.uid}-upload-alt`), J(x, a), $(S, "id", `${t.uid}-upload-alt`), J(E, ` ${o ?? ""}`), J(re, ` ${s ?? ""}`), ie.disabled = n().busy, J(ae, c);
	}, [
		() => U(r)("media.upload"),
		() => U(r)("media.file"),
		() => (t.settings?.accept ?? ["image/*"]).join(","),
		() => U(r)("media.alt"),
		() => U(r)("media.optimize"),
		() => U(r)("media.webp"),
		() => n().busy ? U(r)("media.uploading") : U(r)("media.upload")
	]), Fi("submit", f, d), W("change", _, () => {
		I(l, "");
	}), Ta(S, () => U(a), (e) => I(a, e)), Ea(T, () => U(s), (e) => I(s, e)), Ea(ne, () => U(c), (e) => I(c, e)), q(e, f), j();
}
G(["change"]);
// src/ui/media/MediaDialog.svelte
var Bc = /* @__PURE__ */ K("<dialog class=\"svelte-1iyaart\"><h2 class=\"svelte-1iyaart\"> </h2> <div class=\"body svelte-1iyaart\"><!> <!></div> <div class=\"actions svelte-1iyaart\"><button type=\"button\" class=\"svelte-1iyaart\"> </button> <button type=\"button\" class=\"primary svelte-1iyaart\"> </button></div></dialog>"), Vc = {
	hash: "svelte-1iyaart",
	code: "dialog.svelte-1iyaart {border:1px solid var(--cpb-border);border-radius:10px;padding:1rem;width:min(860px, 94vw);color:inherit;font:inherit;}dialog.svelte-1iyaart::backdrop {background:rgb(15 23 42 / .45);}h2.svelte-1iyaart {font-size:1rem;margin:0 0 .75rem;}.body.svelte-1iyaart {display:grid;grid-template-columns:minmax(0, 1fr) 260px;gap:1rem;}.actions.svelte-1iyaart {display:flex;justify-content:flex-end;gap:.5rem;margin-top:1rem;}button.svelte-1iyaart {font:inherit;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.primary.svelte-1iyaart {background:var(--cpb-accent);border-color:var(--cpb-accent);color:#fff;}button.svelte-1iyaart:disabled {opacity:.5;}.svelte-1iyaart:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}\n  @media (max-width: 700px) {.body.svelte-1iyaart {grid-template-columns:1fr;} }"
};
function Hc(e, t) {
	A(t, !0), Z(e, Vc);
	let n = /* @__PURE__ */ P(() => t.store.t), r = /* @__PURE__ */ P(() => new Tc(t.store)), i = /* @__PURE__ */ F(void 0), a = null, o = /* @__PURE__ */ F(null), s = /* @__PURE__ */ P(() => t.store.media.request);
	Fr(() => {
		U(i) && (U(s) && !U(i).open ? (a = U(i).getRootNode().activeElement, U(i).showModal(), Di(() => {
			U(r).select(null), U(r).load(), t.store.media.loadSettings().then((e) => {
				I(o, e);
			});
		})) : !U(s) && U(i).open && U(i).close());
	});
	function c() {
		let e = U(r).selected;
		e && U(s) && (t.store.media.remember(e), U(s).onPick({ asset: e.id }), t.store.media.close());
	}
	var l = Bc(), u = L(l), d = L(u, !0);
	k(u);
	var f = z(u, 2), p = L(f);
	{
		let e = /* @__PURE__ */ P(() => `${t.uid}-media`);
		Nc(p, {
			get store() {
				return t.store;
			},
			get browser() {
				return U(r);
			},
			get uid() {
				return U(e);
			}
		});
	}
	var m = z(p, 2);
	{
		let e = /* @__PURE__ */ P(() => `${t.uid}-media`);
		zc(m, {
			get store() {
				return t.store;
			},
			get browser() {
				return U(r);
			},
			get settings() {
				return U(o);
			},
			get uid() {
				return U(e);
			}
		});
	}
	k(f);
	var h = z(f, 2), g = L(h), _ = L(g, !0);
	k(g);
	var v = z(g, 2), y = L(v, !0);
	k(v), k(h), k(l), Aa(l, (e) => I(i, e), () => U(i)), B((e, n, i) => {
		$(l, "aria-labelledby", `${t.uid}-media-title`), $(u, "id", `${t.uid}-media-title`), J(d, e), J(_, n), v.disabled = !U(r).selected || U(r).busy, J(y, i);
	}, [
		() => U(n)("media.title"),
		() => U(n)("media.close"),
		() => U(n)("media.use")
	]), Fi("close", l, () => {
		t.store.media.close(), a?.focus?.();
	}), W("click", g, () => t.store.media.close()), W("click", v, c), q(e, l), j();
}
G(["click"]);
// src/ui/palette/Palette.svelte
var Uc = /* @__PURE__ */ K("<button type=\"button\" class=\"wide svelte-om8jxl\"> </button>"), Wc = /* @__PURE__ */ K("<li><button type=\"button\" class=\"svelte-om8jxl\"> </button></li>"), Gc = /* @__PURE__ */ K("<h3 class=\"svelte-om8jxl\"> </h3> <ul class=\"svelte-om8jxl\"></ul>", 1), Kc = /* @__PURE__ */ K("<li><button type=\"button\" class=\"svelte-om8jxl\"> </button></li>"), qc = /* @__PURE__ */ K("<h3 class=\"svelte-om8jxl\"> </h3> <ul class=\"svelte-om8jxl\"></ul>", 1), Jc = /* @__PURE__ */ K("<section class=\"palette svelte-om8jxl\" aria-labelledby=\"cpb-palette-title\"><h2 id=\"cpb-palette-title\" class=\"svelte-om8jxl\"> </h2> <!> <!> <!></section>"), Yc = {
	hash: "svelte-om8jxl",
	code: ".palette.svelte-om8jxl {padding:.5rem .75rem;overflow:auto;}h2.svelte-om8jxl {font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin:0 0 .5rem;color:var(--cpb-muted);}h3.svelte-om8jxl {font-size:.75rem;margin:.5rem 0 .25rem;color:var(--cpb-muted);text-transform:capitalize;}ul.svelte-om8jxl {list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2, 1fr);gap:.25rem;}button.svelte-om8jxl {touch-action:none;width:100%;font:inherit;font-size:.8rem;padding:.35rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;text-align:left;}button.svelte-om8jxl:hover {border-color:var(--cpb-accent);}.wide.svelte-om8jxl {margin-bottom:.5rem;text-align:center;}button.svelte-om8jxl:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:1px;}"
};
function Xc(e, t) {
	A(t, !0), Z(e, Yc);
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
		let r = so(t.store.tree, n, t.store.selection, e.type);
		t.store.run({
			kind: "insert",
			...r,
			node: ao(n, e.type)
		}, ["announce.inserted", { label: e.label }]) && t.store.selection && t.onInserted(t.store.selection);
	}
	var o = Jc(), s = L(o), c = L(s, !0);
	k(s);
	var l = z(s, 2), u = (e) => {
		var r = Uc(), i = L(r, !0);
		k(r), B((e) => J(i, e), [() => U(n)("palette.import")]), W("click", r, function(...e) {
			t.onImport?.apply(this, e);
		}), q(e, r);
	};
	Y(l, (e) => {
		t.content.canImport && e(u);
	});
	var d = z(l, 2), f = (e) => {
		var r = Gc(), i = R(r), a = L(i, !0);
		k(i);
		var o = z(i, 2);
		X(o, 21, () => t.content.templates, (e) => e.id, (e, r) => {
			var i = Wc(), a = L(i), o = L(a, !0);
			k(a), k(i), B((e) => {
				$(a, "aria-label", e), J(o, U(r).name);
			}, [() => U(n)("palette.insertTemplate", { name: U(r).name })]), W("click", a, () => {
				t.content.insertNodes(U(r).nodes, U(r).name) && t.store.selection && t.onInserted(t.store.selection);
			}), q(e, i);
		}), k(o), B((e) => J(a, e), [() => U(n)("palette.templates")]), q(e, r);
	};
	Y(d, (e) => {
		t.content.canTemplates && t.content.templates.length > 0 && e(f);
	}), X(z(d, 2), 17, () => U(i), ([e, t]) => e, (e, r) => {
		var i = /* @__PURE__ */ P(() => at(U(r), 2));
		let o = () => U(i)[0], s = () => U(i)[1];
		var c = qc(), l = R(c), u = L(l, !0);
		k(l);
		var d = z(l, 2);
		X(d, 21, s, (e) => e.type, (e, r) => {
			var i = Kc(), o = L(i), s = L(o, !0);
			k(o), k(i), B((e) => {
				$(o, "aria-label", e), $(o, "data-type", U(r).type), J(s, U(r).label);
			}, [() => U(n)("palette.insert", { label: U(r).label })]), W("click", o, () => a(U(r))), W("pointerdown", o, (e) => t.store.catalogue && t.drag.pressNew(e, {
				kind: "insert",
				node: ao(t.store.catalogue, U(r).type)
			}, U(r).label)), q(e, i);
		}), k(d), B((e) => J(u, e), [() => o().replace(/_/g, " ")]), q(e, c);
	}), k(o), B((e) => J(c, e), [() => U(n)("palette.title")]), q(e, o), j();
}
G(["click", "pointerdown"]);
// src/ui/publish/ConflictBanner.svelte
var Zc = /* @__PURE__ */ K("<button type=\"button\" class=\"svelte-1ti6kqq\"> </button>"), Qc = /* @__PURE__ */ K("<div class=\"conflict svelte-1ti6kqq\" role=\"alertdialog\" aria-modal=\"false\" tabindex=\"-1\"><strong> </strong> <p class=\"svelte-1ti6kqq\"> </p> <div class=\"actions svelte-1ti6kqq\"><button type=\"button\" class=\"primary svelte-1ti6kqq\"> </button> <button type=\"button\" class=\"svelte-1ti6kqq\"> </button> <!></div></div>"), $c = {
	hash: "svelte-1ti6kqq",
	code: ".conflict.svelte-1ti6kqq {margin:.5rem .75rem 0;padding:.75rem;border:2px solid var(--cpb-danger);border-radius:8px;background:#fef2f2;}.conflict.svelte-1ti6kqq:focus-visible {outline:2px solid var(--cpb-danger);outline-offset:2px;}p.svelte-1ti6kqq {margin:.25rem 0 .5rem;font-size:.875rem;}.actions.svelte-1ti6kqq {display:flex;flex-wrap:wrap;gap:.5rem;}button.svelte-1ti6kqq {font:inherit;font-size:.85rem;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.primary.svelte-1ti6kqq {background:var(--cpb-danger);border-color:var(--cpb-danger);color:#fff;}button.svelte-1ti6kqq:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:2px;}"
};
function el(e, t) {
	A(t, !0), Z(e, $c);
	let n = /* @__PURE__ */ P(() => t.store.t), r = /* @__PURE__ */ F(void 0);
	Fr(() => {
		t.store.status === "conflict" && wi().then(() => U(r)?.focus());
	});
	var i = Ui(), a = R(i), o = (e) => {
		var i = Qc(), a = L(i), o = L(a, !0);
		k(a);
		var s = z(a, 2), c = L(s, !0);
		k(s);
		var l = z(s, 2), u = L(l), d = L(u, !0);
		k(u);
		var f = z(u, 2), p = L(f, !0);
		k(f);
		var m = z(f, 2), h = (e) => {
			var r = Zc(), i = L(r, !0);
			k(r), B((e) => J(i, e), [() => U(n)("conflict.view")]), W("click", r, () => t.onView?.(t.store.conflictRevision)), q(e, r);
		};
		Y(m, (e) => {
			t.onView && t.store.conflictRevision && e(h);
		}), k(l), k(i), Aa(i, (e) => I(r, e), () => U(r)), B((e, n, r, l) => {
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
	}), q(e, i), j();
}
G(["click"]);
// src/ui/publish/ServerView.svelte
var tl = /* @__PURE__ */ K("<p class=\"note svelte-ztrun4\"> </p>"), nl = /* @__PURE__ */ K("<p class=\"note svelte-ztrun4\" role=\"status\"> </p>"), rl = /* @__PURE__ */ K("<iframe sandbox=\"\" class=\"svelte-ztrun4\"></iframe>"), il = /* @__PURE__ */ K("<div class=\"server svelte-ztrun4\"><div class=\"bar svelte-ztrun4\"><strong> </strong> <button type=\"button\" class=\"svelte-ztrun4\"> </button></div> <!> <!></div>"), al = {
	hash: "svelte-ztrun4",
	code: ".server.svelte-ztrun4 {background:var(--cpb-canvas);padding:.5rem 1rem 1rem;min-height:0;display:flex;flex-direction:column;gap:.5rem;}.bar.svelte-ztrun4 {display:flex;align-items:center;gap:.75rem;}.note.svelte-ztrun4 {margin:0;font-size:.8rem;color:var(--cpb-muted);}button.svelte-ztrun4 {margin-left:auto;font:inherit;font-size:.8rem;padding:.3rem .7rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}iframe.svelte-ztrun4 {flex:1;width:100%;min-height:480px;border:1px solid var(--cpb-border);border-radius:8px;background:#fff;}"
};
function ol(e, t) {
	A(t, !0), Z(e, al);
	let n = ja(t, "stylesheets", 19, () => []), r = /* @__PURE__ */ P(() => t.store.t), i = /* @__PURE__ */ F(null);
	Fr(() => {
		let e = t.store.session.transport.render, n = t.revision;
		I(i, null), e && e.call(t.store.session.transport, t.store.session.pageId, n).then((e) => {
			n === t.revision && I(i, e, !0);
		}).catch((e) => t.store.fail(e));
	});
	let a = /* @__PURE__ */ P(() => U(i) === null ? "" : za(n()).replace("</head>", `<style data-cms-page>${U(i).css.replace(/<\/style/gi, "<\\/style")}</style></head>`).replace("<body></body>", `<body>${U(i).html}</body>`));
	var o = il(), s = L(o), c = L(s), l = L(c, !0);
	k(c);
	var u = z(c, 2), d = L(u, !0);
	k(u), k(s);
	var f = z(s, 2), p = (e) => {
		var t = tl(), n = L(t, !0);
		k(t), B((e) => J(n, e), [() => U(r)("server.dirty")]), q(e, t);
	};
	Y(f, (e) => {
		t.store.dirty && e(p);
	});
	var m = z(f, 2), h = (e) => {
		var t = nl(), n = L(t, !0);
		k(t), B((e) => J(n, e), [() => U(r)("server.loading")]), q(e, t);
	}, g = (e) => {
		var t = rl();
		B((e) => {
			$(t, "title", e), $(t, "srcdoc", U(a));
		}, [() => U(r)("server.frame")]), q(e, t);
	};
	Y(m, (e) => {
		U(i) === null ? e(h) : e(g, -1);
	}), k(o), B((e, t) => {
		J(l, e), J(d, t);
	}, [() => U(r)("server.title", { revision: t.revision }), () => U(r)("server.back")]), W("click", u, function(...e) {
		t.onBack?.apply(this, e);
	}), q(e, o), j();
}
G(["click"]);
// src/ui/model/flatten.ts
var sl = (e) => {
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
}, cl = (e) => {
	if (!(e.ctrlKey || e.metaKey) || e.altKey) return null;
	let t = e.key.toLowerCase();
	return t === "z" ? e.shiftKey ? { type: "redo" } : { type: "undo" } : t === "y" ? { type: "redo" } : null;
}, ll = (e, t, n) => {
	let r = sl(e), i = r[0];
	if (!i) return null;
	let a = t === null ? -1 : r.findIndex((e) => e.id === t), o = r[a];
	if (!o) return n.key === "ArrowDown" || n.key === "Home" ? {
		type: "select",
		id: i.id
	} : null;
	let s = e.nodes[o.id], c = ce(e, o.parent), l = n.ctrlKey || n.metaKey;
	if (n.altKey && !l) switch (n.key) {
		case "ArrowUp": return o.index > 0 ? ul(o.id, o.parent, o.index - 1) : null;
		case "ArrowDown": return o.index < c.length - 1 ? ul(o.id, o.parent, o.index + 2) : null;
		case "ArrowRight": {
			let t = c[o.index - 1];
			return t ? ul(o.id, t, e.nodes[t]?.children.length ?? 0) : null;
		}
		case "ArrowLeft": {
			if (o.parent === null) return null;
			let t = e.nodes[o.parent], n = ce(e, t?.parent ?? null);
			return ul(o.id, t?.parent ?? null, n.indexOf(o.parent) + 1);
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
	if (l || n.altKey) return cl(n);
	switch (n.key) {
		case "ArrowDown": return dl(r[a + 1]?.id);
		case "ArrowUp": return dl(r[a - 1]?.id);
		case "Home": return dl(i.id);
		case "End": return dl(r[r.length - 1]?.id);
		case "ArrowRight": return dl(s?.children[0]);
		case "ArrowLeft": return dl(o.parent ?? void 0);
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
}, ul = (e, t, n) => ({
	type: "command",
	command: {
		kind: "move",
		id: e,
		parent: t,
		index: n
	}
}), dl = (e) => e ? {
	type: "select",
	id: e
} : null, fl = /* @__PURE__ */ K("<p class=\"empty svelte-y2i8n1\"> </p>"), pl = /* @__PURE__ */ K("<li role=\"treeitem\" class=\"svelte-y2i8n1\"> </li>"), ml = /* @__PURE__ */ K("<ul role=\"tree\" aria-labelledby=\"cpb-structure-title\" aria-describedby=\"cpb-structure-help\" class=\"svelte-y2i8n1\"></ul>"), hl = /* @__PURE__ */ K("<section class=\"structure svelte-y2i8n1\" aria-labelledby=\"cpb-structure-title\"><h2 id=\"cpb-structure-title\" class=\"svelte-y2i8n1\"> </h2> <p class=\"help svelte-y2i8n1\" id=\"cpb-structure-help\"> </p> <!></section>"), gl = {
	hash: "svelte-y2i8n1",
	code: ".structure.svelte-y2i8n1 {padding:.5rem .75rem;overflow:auto;border-top:1px solid var(--cpb-border);}h2.svelte-y2i8n1 {font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin:0;color:var(--cpb-muted);}.help.svelte-y2i8n1, .empty.svelte-y2i8n1 {font-size:.75rem;color:var(--cpb-muted);margin:.25rem 0 .5rem;}ul.svelte-y2i8n1 {list-style:none;margin:0;padding:0;outline:none;}li.svelte-y2i8n1 {font-size:.85rem;padding:.25rem .375rem;border-radius:4px;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}li[aria-selected='true'].svelte-y2i8n1 {background:var(--cpb-accent-soft);color:var(--cpb-accent-strong);font-weight:600;}li.svelte-y2i8n1:focus-visible, ul.svelte-y2i8n1:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:-2px;}"
};
function _l(e, t) {
	A(t, !0), Z(e, gl);
	let n = /* @__PURE__ */ P(() => t.store.t), r = /* @__PURE__ */ P(() => sl(t.store.tree)), i = /* @__PURE__ */ F(void 0), a = (e) => {
		let n = t.store.tree.nodes[e];
		if (!n) return e;
		let r = typeof n.fields.label == "string" && n.fields.label !== "" ? n.fields.label : null, i = t.store.catalogue?.get(n.type);
		return r ? `${r} (${i?.label ?? n.type})` : i?.label ?? n.type;
	};
	async function o(e) {
		await wi(), ((e ? U(i)?.querySelector(`[data-node-id="${CSS.escape(e)}"]`) : null) ?? U(i))?.focus();
	}
	async function s(e) {
		if ((e.key === "F2" || e.key === "Enter") && t.store.selection && !e.altKey) {
			t.onEdit(t.store.selection) && e.preventDefault();
			return;
		}
		let n = ll(t.store.tree, t.store.selection, e);
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
	var c = { focusItem: o }, l = hl(), u = L(l), d = L(u, !0);
	k(u);
	var f = z(u, 2), p = L(f, !0);
	k(f);
	var m = z(f, 2), h = (e) => {
		var t = fl(), r = L(t, !0);
		k(t), B((e) => J(r, e), [() => U(n)("structure.empty")]), q(e, t);
	}, g = (e) => {
		var n = ml();
		X(n, 21, () => U(r), (e) => e.id, (e, n) => {
			var r = pl();
			let i;
			var o = L(r, !0);
			k(r), B((e) => {
				$(r, "aria-level", U(n).depth), $(r, "aria-setsize", U(n).siblings), $(r, "aria-posinset", U(n).index + 1), $(r, "aria-selected", t.store.selection === U(n).id), $(r, "tabindex", t.store.selection === U(n).id ? 0 : -1), $(r, "data-node-id", U(n).id), i = da(r, "", i, { "padding-left": `${(U(n).depth - 1) * 14 + 6}px` }), J(o, e);
			}, [() => a(U(n).id)]), W("click", r, () => t.store.select(U(n).id)), Fi("focus", r, () => t.store.selection !== U(n).id && t.store.select(U(n).id)), W("keydown", r, () => {}), q(e, r);
		}), k(n), Aa(n, (e) => I(i, e), () => U(i)), B(() => $(n, "tabindex", t.store.selection ? -1 : 0)), W("keydown", n, s), q(e, n);
	};
	return Y(m, (e) => {
		U(r).length === 0 ? e(h) : e(g, -1);
	}), k(l), B((e, t) => {
		J(d, e), J(p, t);
	}, [() => U(n)("structure.title"), () => U(n)("structure.help")]), q(e, l), j(c);
}
G(["keydown", "click"]);
// src/ui/toolbar/Toolbar.svelte
var vl = /* @__PURE__ */ K("<button type=\"button\" class=\"primary svelte-ouhh5d\"> </button>"), yl = /* @__PURE__ */ K("<button type=\"button\" class=\"svelte-ouhh5d\"> </button>"), bl = /* @__PURE__ */ K("<button type=\"button\" class=\"svelte-ouhh5d\"> </button>"), xl = /* @__PURE__ */ K("<span class=\"revision svelte-ouhh5d\"> <span data-publication=\"\"> </span></span>"), Sl = /* @__PURE__ */ K("<div class=\"toolbar svelte-ouhh5d\" role=\"toolbar\"><button type=\"button\" aria-keyshortcuts=\"Control+Z\" class=\"svelte-ouhh5d\"> </button> <button type=\"button\" aria-keyshortcuts=\"Control+Shift+Z\" class=\"svelte-ouhh5d\"> </button> <button type=\"button\" aria-keyshortcuts=\"Control+S\" class=\"svelte-ouhh5d\"> </button> <!> <!> <!> <span class=\"status svelte-ouhh5d\"> </span> <!></div>"), Cl = {
	hash: "svelte-ouhh5d",
	code: ".toolbar.svelte-ouhh5d {display:flex;flex-wrap:wrap;gap:.5rem;align-items:center;padding:.5rem .75rem;border-bottom:1px solid var(--cpb-border);}button.svelte-ouhh5d {font:inherit;padding:.35rem .75rem;border:1px solid var(--cpb-border);border-radius:6px;background:var(--cpb-surface);color:inherit;cursor:pointer;}button.svelte-ouhh5d:disabled {opacity:.5;cursor:not-allowed;}button.primary.svelte-ouhh5d {background:var(--cpb-accent);border-color:var(--cpb-accent);color:#fff;}button[aria-pressed='true'].svelte-ouhh5d {background:var(--cpb-accent-soft);border-color:var(--cpb-accent);}button.svelte-ouhh5d:focus-visible {outline:2px solid var(--cpb-accent);outline-offset:2px;}.status.svelte-ouhh5d {margin-left:auto;font-size:.875rem;}.status[data-status='conflict'].svelte-ouhh5d, .status[data-status='offline'].svelte-ouhh5d, .status[data-status='load-error'].svelte-ouhh5d {color:var(--cpb-danger);font-weight:600;}.revision.svelte-ouhh5d {font-size:.75rem;color:var(--cpb-muted);}"
};
function wl(e, t) {
	A(t, !0), Z(e, Cl);
	let n = ja(t, "store", 7), r = /* @__PURE__ */ P(() => n().t), i = /* @__PURE__ */ P(() => n().publishedRevision === null ? U(r)("publication.none") : n().unpublished ? U(r)("publication.pending", { revision: n().publishedRevision }) : U(r)("publication.current"));
	var a = Sl(), o = L(a), s = L(o, !0);
	k(o);
	var c = z(o, 2), l = L(c, !0);
	k(c);
	var u = z(c, 2), d = L(u, !0);
	k(u);
	var f = z(u, 2), p = (e) => {
		var t = vl(), i = L(t, !0);
		k(t), B((e) => {
			t.disabled = n().publishing || n().status !== "ready" || !n().unpublished, J(i, e);
		}, [() => n().publishing ? U(r)("toolbar.publishing") : U(r)("toolbar.publish")]), W("click", t, () => n().publish()), q(e, t);
	};
	Y(f, (e) => {
		n().canPublish && e(p);
	});
	var m = z(f, 2), h = (e) => {
		var t = yl(), i = L(t, !0);
		k(t), B((e) => {
			$(t, "aria-pressed", n().designOpen), J(i, e);
		}, [() => U(r)("design.open")]), W("click", t, () => {
			n().designOpen = !n().designOpen;
		}), q(e, t);
	};
	Y(m, (e) => {
		n().designAvailable && e(h);
	});
	var g = z(m, 2), _ = (e) => {
		var n = bl(), i = L(n, !0);
		k(n), B((e) => {
			$(n, "aria-pressed", t.serverView), J(i, e);
		}, [() => U(r)("toolbar.serverView")]), W("click", n, function(...e) {
			t.onServerView?.apply(this, e);
		}), q(e, n);
	};
	Y(g, (e) => {
		t.onServerView && e(_);
	});
	var v = z(g, 2), y = L(v, !0);
	k(v);
	var b = z(v, 2), x = (e) => {
		var t = xl(), a = L(t), o = z(a), s = L(o, !0);
		k(o), k(t), B((e) => {
			J(a, `${e ?? ""} · `), J(s, U(i));
		}, [() => U(r)("toolbar.revision", { revision: n().revision })]), q(e, t);
	};
	Y(b, (e) => {
		n().revision > 0 && e(x);
	}), k(a), B((e, t, r, i, f) => {
		$(a, "aria-label", e), o.disabled = !n().canUndo, J(s, t), c.disabled = !n().canRedo, J(l, r), u.disabled = !n().dirty || n().status === "saving" || n().status === "conflict", J(d, i), $(v, "data-status", n().status), J(y, f);
	}, [
		() => U(r)("editor.label"),
		() => U(r)("toolbar.undo"),
		() => U(r)("toolbar.redo"),
		() => U(r)("toolbar.save"),
		() => U(r)(`status.${n().status}`)
	]), W("click", o, () => n().undo()), W("click", c, () => n().redo()), W("click", u, () => n().save()), q(e, a), j();
}
G(["click"]);
// src/ui/Editor.svelte
var Tl = /* @__PURE__ */ K("<div class=\"editor svelte-b7je3p\" role=\"application\"><!> <!> <div class=\"body svelte-b7je3p\"><aside class=\"left svelte-b7je3p\"><!> <!></aside> <!> <!></div> <!> <!> <!> <div class=\"sr-only svelte-b7je3p\" aria-live=\"polite\"> </div> <div class=\"sr-only svelte-b7je3p\" aria-live=\"assertive\" role=\"alert\"> </div></div>"), El = {
	hash: "svelte-b7je3p",
	code: ".editor.svelte-b7je3p {--cpb-border: #d4d4d8;--cpb-surface: #fff;--cpb-canvas: #f1f5f9;--cpb-muted: #52525b;--cpb-accent: #2563eb;--cpb-accent-soft: #dbeafe;--cpb-accent-strong: #1e3a8a;--cpb-danger: #b91c1c;font:14px/1.4 system-ui, sans-serif;color:#18181b;background:var(--cpb-surface);display:flex;flex-direction:column;height:100%;min-height:600px;border:1px solid var(--cpb-border);}.body.svelte-b7je3p {flex:1;display:grid;grid-template-columns:240px 1fr 280px;min-height:0;}.left.svelte-b7je3p {display:grid;grid-template-rows:minmax(0, 45%) minmax(0, 1fr);min-height:0;border-right:1px solid var(--cpb-border);}.sr-only.svelte-b7je3p {position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;}\n  @media (max-width: 900px) {.body.svelte-b7je3p {grid-template-columns:1fr;} }"
};
function Dl(e, t) {
	A(t, !0), Z(e, El);
	let n = ja(t, "stylesheets", 19, () => []), r = /* @__PURE__ */ F(void 0), i = /* @__PURE__ */ F(void 0), a = /* @__PURE__ */ P(() => new Rs(t.store)), o = /* @__PURE__ */ P(() => new lo(t.store)), s = /* @__PURE__ */ F(!1), c = /* @__PURE__ */ F(!1), l = !1;
	Fr(() => {
		t.store.status === "ready" && !l && (l = !0, U(o).loadTemplates());
	});
	let u = /* @__PURE__ */ F(null), d = /* @__PURE__ */ P(() => typeof t.store.session.transport.render == "function");
	function f(e) {
		if ((e.ctrlKey || e.metaKey) && !e.altKey && e.key.toLowerCase() === "s") {
			e.preventDefault(), t.store.dirty && t.store.save();
			return;
		}
		if (e.target?.closest("input, textarea, select, [contenteditable=\"true\"], [role=\"tree\"]")) return;
		let n = cl(e);
		n && (e.preventDefault(), n.type === "undo" ? t.store.undo() : n.type === "redo" && t.store.redo());
	}
	var p = Tl(), m = L(p);
	{
		let e = /* @__PURE__ */ P(() => U(u) !== null), n = /* @__PURE__ */ P(() => U(d) ? () => {
			I(u, U(u) === null ? t.store.revision : null, !0);
		} : null);
		wl(m, {
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
		let e = /* @__PURE__ */ P(() => U(d) ? (e) => {
			I(u, e, !0);
		} : null);
		el(h, {
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
	var g = z(h, 2), _ = L(g), v = L(_);
	Xc(v, {
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
			I(s, !0);
		}
	}), Aa(_l(z(v, 2), {
		get store() {
			return t.store;
		},
		onEdit: (e) => U(i)?.startEditing(e) ?? !1
	}), (e) => I(r, e, !0), () => U(r)), k(_);
	var y = z(_, 2), b = (e) => {
		ol(e, {
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
				I(u, null);
			}
		});
	}, x = (e) => {
		Aa(io(e, {
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
		}), (e) => I(i, e, !0), () => U(i));
	};
	Y(y, (e) => {
		U(u) === null ? e(x, -1) : e(b);
	});
	var S = z(y, 2), C = (e) => {
		Es(e, {
			get store() {
				return t.store;
			},
			get uid() {
				return t.uid;
			}
		});
	}, ee = (e) => {
		wc(e, {
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
				I(c, !0);
			}
		});
	};
	Y(S, (e) => {
		t.store.designOpen ? e(C) : e(ee, -1);
	}), k(g);
	var w = z(g, 2);
	go(w, {
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
			I(s, e, !0);
		}
	});
	var T = z(w, 2);
	ks(T, {
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
			I(c, e, !0);
		}
	});
	var E = z(T, 2), te = (e) => {
		Hc(e, {
			get store() {
				return t.store;
			},
			get uid() {
				return t.uid;
			}
		});
	};
	Y(E, (e) => {
		t.store.media.available && e(te);
	});
	var ne = z(E, 2), re = L(ne, !0);
	k(ne);
	var ie = z(ne, 2), ae = L(ie, !0);
	k(ie), k(p), B((e) => {
		$(p, "aria-label", e), J(re, t.store.message), J(ae, t.store.alert);
	}, [() => t.store.t("editor.label")]), W("keydown", p, f), q(e, p), j();
}
G(["keydown"]);
// src/ui/i18n/media.ts
var Ol = {
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
}, kl = {
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
}, Al = {
	...Ol,
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
}, jl = {
	es: Al,
	en: kl
}, Ml = (e) => {
	let t = jl[e.toLowerCase().split("-")[0] ?? "es"] ?? Al;
	return (e, n = {}) => t[e].replace(/\{(\w+)\}/g, (e, t) => String(n[t] ?? `{${t}}`));
}, Nl = class {
	transport;
	#e = /* @__PURE__ */ F({});
	get resolved() {
		return U(this.#e);
	}
	set resolved(e) {
		I(this.#e, e);
	}
	#t = /* @__PURE__ */ F(null);
	get settings() {
		return U(this.#t);
	}
	set settings(e) {
		I(this.#t, e);
	}
	#n = /* @__PURE__ */ F(null);
	get request() {
		return U(this.#n);
	}
	set request(e) {
		I(this.#n, e);
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
}, Pl = class {
	session;
	t;
	#e = /* @__PURE__ */ F({
		nodes: {},
		rootIds: []
	});
	get tree() {
		return U(this.#e);
	}
	set tree(e) {
		I(this.#e, e);
	}
	#t = /* @__PURE__ */ F(null);
	get catalogue() {
		return U(this.#t);
	}
	set catalogue(e) {
		I(this.#t, e);
	}
	#n = /* @__PURE__ */ F(null);
	get selection() {
		return U(this.#n);
	}
	set selection(e) {
		I(this.#n, e, !0);
	}
	#r = /* @__PURE__ */ F("loading");
	get status() {
		return U(this.#r);
	}
	set status(e) {
		I(this.#r, e, !0);
	}
	#i = /* @__PURE__ */ F(!1);
	get dirty() {
		return U(this.#i);
	}
	set dirty(e) {
		I(this.#i, e, !0);
	}
	#a = /* @__PURE__ */ F(!1);
	get canUndo() {
		return U(this.#a);
	}
	set canUndo(e) {
		I(this.#a, e, !0);
	}
	#o = /* @__PURE__ */ F(!1);
	get canRedo() {
		return U(this.#o);
	}
	set canRedo(e) {
		I(this.#o, e, !0);
	}
	#s = /* @__PURE__ */ F(0);
	get revision() {
		return U(this.#s);
	}
	set revision(e) {
		I(this.#s, e, !0);
	}
	#c = /* @__PURE__ */ F(null);
	get publishedRevision() {
		return U(this.#c);
	}
	set publishedRevision(e) {
		I(this.#c, e, !0);
	}
	#l = /* @__PURE__ */ F(!1);
	get canPublish() {
		return U(this.#l);
	}
	set canPublish(e) {
		I(this.#l, e, !0);
	}
	#u = /* @__PURE__ */ F(!1);
	get publishing() {
		return U(this.#u);
	}
	set publishing(e) {
		I(this.#u, e, !0);
	}
	#d = /* @__PURE__ */ F(null);
	get conflictRevision() {
		return U(this.#d);
	}
	set conflictRevision(e) {
		I(this.#d, e, !0);
	}
	designSession;
	media;
	#f = /* @__PURE__ */ F(ne());
	get design() {
		return U(this.#f);
	}
	set design(e) {
		I(this.#f, e);
	}
	#p = /* @__PURE__ */ F(!1);
	get designDirty() {
		return U(this.#p);
	}
	set designDirty(e) {
		I(this.#p, e, !0);
	}
	#m = /* @__PURE__ */ F(null);
	get viewport() {
		return U(this.#m);
	}
	set viewport(e) {
		I(this.#m, e, !0);
	}
	#h = /* @__PURE__ */ F(null);
	get styleState() {
		return U(this.#h);
	}
	set styleState(e) {
		I(this.#h, e, !0);
	}
	#g = /* @__PURE__ */ F(!1);
	get designOpen() {
		return U(this.#g);
	}
	set designOpen(e) {
		I(this.#g, e, !0);
	}
	#_ = /* @__PURE__ */ F(!1);
	get designAvailable() {
		return U(this.#_);
	}
	set designAvailable(e) {
		I(this.#_, e, !0);
	}
	#v = /* @__PURE__ */ F(0);
	get designRevision() {
		return U(this.#v);
	}
	set designRevision(e) {
		I(this.#v, e, !0);
	}
	#y = /* @__PURE__ */ F(null);
	get designPublished() {
		return U(this.#y);
	}
	set designPublished(e) {
		I(this.#y, e, !0);
	}
	#b = /* @__PURE__ */ F("");
	get message() {
		return U(this.#b);
	}
	set message(e) {
		I(this.#b, e, !0);
	}
	#x = /* @__PURE__ */ F("");
	get alert() {
		return U(this.#x);
	}
	set alert(e) {
		I(this.#x, e, !0);
	}
	stops = [];
	constructor(e, t) {
		this.session = e, this.t = t, this.designSession = new ge(e.transport), this.media = new Nl(e.transport), this.stops.push(this.designSession.events.on("change", () => {
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
	fail(e, t = e instanceof te ? e.code : "SERVER") {
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
}, Fl = [
	"ready",
	"selection-change",
	"dirty-change",
	"save-start",
	"save-success",
	"save-error",
	"conflict",
	"publish-success",
	"publish-error"
], Il = 0, Ll = class extends HTMLElement {
	#e = null;
	#t = null;
	#n = null;
	#r = null;
	#i = null;
	#a = `cpb${++Il}`;
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
		let t = this.shadowRoot ?? this.attachShadow({ mode: "open" }), n = new i(e);
		for (let e of Fl) n.events.on(e, (t) => {
			let n = e === "save-error" || e === "publish-error" ? { code: t.error.code } : t;
			this.dispatchEvent(new CustomEvent(e, {
				detail: n,
				bubbles: !0,
				composed: !0
			}));
		});
		let a = new Pl(n, Ml(e.locale ?? "es"));
		this.#n = n, this.#r = a, this.#t = Wi(Dl, {
			target: t,
			props: {
				store: a,
				uid: this.#a,
				stylesheets: e.stylesheets ?? []
			}
		}), n.load().then(() => {
			a.sync(), a.loadDesign(), e.autosave !== !1 && n.capabilities?.features.autosave !== !1 && (this.#i = new y(n, {
				...r,
				...e.autosave ?? {}
			}), this.#i.start());
		}, (e) => {
			a.sync(), a.fail(e);
		});
	}
	#s() {
		this.#i?.stop(), this.#i = null, this.#t && Ji(this.#t), this.#r?.destroy(), this.#n?.destroy(), this.#t = null, this.#r = null, this.#n = null, this.shadowRoot?.replaceChildren();
	}
}, Rl = (e = "ceiba-page-builder") => {
	customElements.get(e) || customElements.define(e, Ll);
};
// src/ui/index.ts
Rl();
export { y as Autosave, Ee as BASE, Ll as CeibaPageBuilder, r as DEFAULT_AUTOSAVE, He as DEFAULT_BREAKPOINTS, x as DEFAULT_HISTORY, p as EDITABLE_FIELDS, te as EditorError, i as EditorSession, Ue as PROPERTY_BY_NAME, Fl as PUBLIC_EVENTS, m as REFERENCE_PROPS, le as SCHEMA_VERSION, g as SERVER_LIMITS, ie as STYLE_MATRIX, ge as SiteDesignSession, E as acceptedTokenType, C as afterRedo, s as afterUndo, ve as applyCommand, o as assertDepth, v as assertEditable, We as assertKnown, n as assertNewContent, l as assertNodeCount, S as assertPlacement, f as assertSize, Ie as attachRaw, d as canRedo, Ae as canUndo, a as checkTree, ce as childrenOf, we as collectAssetIds, Le as collectStyledNodes, ue as compileStyles, c as createCatalogue, t as createCommands, Fe as createEditor, Ve as createHttpTransport, ne as defaultDesign, Rl as defineElement, _e as depthOf, Ne as effectiveValue, u as emptyHistory, de as emptyTree, b as errorFromResponse, Be as fail, T as fromDocument, re as getNode, ee as groupKeyOf, De as heightOf, Pe as indexInParent, ke as insertAt, je as isAssetRef, oe as isSelfOrDescendant, ze as literal, Te as measureRaw, Oe as nodeClass, xe as nodeCount, _ as parseDocument, h as randomIds, w as record, ye as sequentialIds, ae as setClasses, be as setDeclaration, Se as siteClass, se as styleClassNames, Re as subtreeIds, e as toDocument, Me as toRaw, me as tokenLiteral, fe as tokenVariable, Ce as withChildren, he as withNode, pe as withoutNodes };

//# sourceMappingURL=ceiba-page-builder.js.map