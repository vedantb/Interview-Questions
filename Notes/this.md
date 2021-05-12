# `this`

`this` is not an author-time binding but a runtime binding. It is contextual based on the conditions of the function's invoation. `this` binding has nothing to do with where a function is declared, but has instead everything to do with the manner in which the function is called.

When a function is invoked, an activation record, also known as execution context, is created. This record contains information about where the function was called from (the call-stack), how the function was called, what parameters are passed etc. One of the properties of this record is the `this` reference which will be used for the duration of that function's execution.

**`this` is netither a reference to the function itself, not is it a reference to the function's lexical scope.**

## `this` all makes sense now

#### Call-site

To understand `this` binding, we have to understand the call-site: the location in code where a function is called (**not where it's declared**). We must inspect the call-site to answer the question: what's this `this` a reference to?

Finding the call-site is generally: "go locate where a function is called from", but it's not always that easy, as certain coding patterns can obscure the true call-site.

What's important is to think about the **call-stack** (the stack of functions that have been called to get us to the current moment in execution.) The call-site we care about is in the invocation before the currently executing function.

e.g.
```js
function baz() {
    // call-stack is: `baz`
    // so, our call-site is in the global scope

    console.log( "baz" );
    bar(); // <-- call-site for `bar`
}

function bar() {
    // call-stack is: `baz` -> `bar`
    // so, our call-site is in `baz`

    console.log( "bar" );
    foo(); // <-- call-site for `foo`
}

function foo() {
    // call-stack is: `baz` -> `bar` -> `foo`
    // so, our call-site is in `bar`

    console.log( "foo" );
}

baz(); // <-- call-site for `baz`
```

Take care when analyzing code to find the actual call-site (from the call-stack), because it's the only thing that matters for `this` binding.


### Nothing but Rules

We turn our attention now to how the call-site determines where `this` will point during the execution of a function.

You must inspect the call-site and determine which of 4 rules applies. We will first explain each of these 4 rules independently, and then we will illustrate their order of precedence, if multiple rules could apply to the call-site.

#### Default Binding

The first rule we will examine comes from the most common case of function calls: standalone function invocation. Think of this `this` rule as the default catch-all rule when none others apply.

```js
function foo() {
	console.log( this.a );
}

var a = 2;

foo(); // 2
```

The first thing to note, if you were not already aware, is that variables declared in the global scope, as `var a = 2` is, are synonymous with global-object properties of the same name. They're not copies of each other, they are each other. Think of it as two sides of the same coin.

Secondly, we see that when `foo()` is called, `this.a` resolves to our global variable `a`. Why? Because in this case, the *default binding* for `this` applies to the function call, and so points `this` to the global object.

How do we know that the *default binding* rule applies here? We examine the call-site to see how `foo()` is called. In our snippet, `foo()` is called with a plain, un-declared function reference. None of the other rules will apply here.

If `strict mode` is in effect, the global object is not eligible for the default binding, so the `this` is instead set to `undefined`.

```js
function foo() {
	"use strict";

	console.log( this.a );
}

var a = 2;

foo(); // TypeError: `this` is `undefined`
```

A subtle but important detail is: even though the overall `this` binding rules are entirely based on the call-site, the global object is only eligible for the default binding if the **contents** of `foo()` are not running in `strict mode`; the `strict mode` state of the call-site of `foo()` is irrelevant.


#### Implicit Binding

Another rule to consider is: does the call-site have a context object, also referred to as an owning or containing object, though these alternate terms could be slightly misleading.

```js
function foo() {
	console.log( this.a );
}

var obj = {
	a: 2,
	foo: foo
};

obj.foo(); // 2
```

Firstly, notice the manner in which `foo()` is declared and then later added as a reference property onto `obj`. Regardless of whether `foo()` is initially declared on `obj`, or added as a reference later, in neither case is the **function** really "owned" or "contained" by the `obj` object.

However, the call-site uses the `obj` context to **reference** the function, so you could say that the `obj` object "owns" or "contains" the function reference at the time the function is called.

Whatever you choose to call this pattern, at the point that foo() is called, it's preceded by an object reference to `obj`. When there is a context object for a function reference, the implicit binding rule says that it's that object which should be used for the function call's `this` binding.

Because `obj` is the `this` for the `foo()` call, `this.a` is synonymous with `obj.a`.

##### Implictly Lost
One of the most common frustrations that this binding creates is when an implicitly bound function loses that binding, which usually means it falls back to the default binding, of either the global object or undefined, depending on strict mode.

Consider:

```js
function foo() {
	console.log( this.a );
}

var obj = {
	a: 2,
	foo: foo
};

var bar = obj.foo; // function reference/alias!

var a = "oops, global"; // `a` also property on global object

bar(); // "oops, global"
```

Even though `bar` appears to be a reference to `obj.foo`, in fact, it's really just another reference to `foo` itself. Moreover, the call-site is what matters, and the call-site is `bar()`, which is a plain, un-decorated call and thus the default binding applies.

The more subtle, more common, and more unexpected way this occurs is when we consider passing a callback function:

```js
function foo() {
	console.log( this.a );
}

function doFoo(fn) {
	// `fn` is just another reference to `foo`

	fn(); // <-- call-site!
}

var obj = {
	a: 2,
	foo: foo
};

var a = "oops, global"; // `a` also property on global object

doFoo( obj.foo ); // "oops, global"
```

Parameter passing is just an implicit assignment, and since we're passing a function, it's an implicit reference assignment, so the end result is the same as the previous snippet.

What if the function you're passing your callback to is not your own, but built-in to the language? No difference, same outcome.

```js
function foo() {
	console.log( this.a );
}

var obj = {
	a: 2,
	foo: foo
};

var a = "oops, global"; // `a` also property on global object

setTimeout( obj.foo, 100 ); // "oops, global"
```

It's quite common that our function callbacks lose their this binding, as we've just seen.  But another way that `this` can surprise us is when the function we've passed our callback to intentionally changes the `this` for the call. Event handlers in popular JavaScript libraries are quite fond of forcing your callback to have a `this` which points to, for instance, the DOM element that triggered the event. While that may sometimes be useful, other times it can be downright infuriating. Unfortunately, these tools rarely let you choose.

Either way the `this` is changed unexpectedly, you are not really in control of how your callback function reference will be executed, so you have no way (yet) of controlling the call-site to give your intended binding. We'll see shortly a way of "fixing" that problem by fixing the `this`.


## Explicit Binding

With implicit binding as we just saw, we had to mutate the object in question to include a reference on itself to the function, and use this property function reference to indirectly (implicitly) bind `this` to the object.

But, what if you want to force a function call to use a particular object for the `this` binding, without putting a property function reference on the object?

"All" functions in the language have some utilities available to them (via their [[Prototype]] -- more on that later). which can be useful for this task. Specifically, functions have `call(..)` and `apply(..)` methods.

How do these utilities work? They both take, as their first parameter, an object to use for the `this`, and then invoke the function with that `this` specified. Since you are directly stating what you want `this` to be, we call it explicit binding.

Consider:

```js
function foo() {
	console.log( this.a );
}

var obj = {
	a: 2
};

foo.call( obj ); // 2
```

If you pass a simple primitive value (of type string, boolean, or number) as the `this` binding, the primitive value is wrapped in its object-form (`new String(..)`, `new Boolean(..)`, or `new Number(..)`, respectively). This is often referred to as "boxing".

Note: With respect to `this` binding, `call(..)` and `apply(..)` are identical. They do behave differently with their additional parameters, but that's not something we care about presently.

Unfortunately, explicit binding alone still doesn't offer any solution to the issue mentioned previously, of a function "losing" its intended this binding, or just having it paved over by a framework, etc.

##### Hard Binding

But a variation pattern around explicit binding actually does the trick. Consider:

```js
function foo() {
	console.log( this.a );
}

var obj = {
	a: 2
};

var bar = function() {
	foo.call( obj );
};

bar(); // 2
setTimeout( bar, 100 ); // 2

// `bar` hard binds `foo`'s `this` to `obj`
// so that it cannot be overriden
bar.call( window ); // 2
```

Let's examine how this variation works. We create a function bar() which, internally, manually calls foo.call(obj), thereby forcibly invoking foo with obj binding for this. No matter how you later invoke the function bar, it will always manually invoke foo with obj. This binding is both explicit and strong, so we call it hard binding.

The most typical way to wrap a function with a hard binding creates a pass-thru of any arguments passed and any return value received:

```js
function foo(something) {
	console.log( this.a, something );
	return this.a + something;
}

var obj = {
	a: 2
};

var bar = function() {
	return foo.apply( obj, arguments );
};

var b = bar( 3 ); // 2 3
console.log( b ); // 5
```

Another way to express this pattern is to create a re-usable helper:

```js
function foo(something) {
	console.log( this.a, something );
	return this.a + something;
}

// simple `bind` helper
function bind(fn, obj) {
	return function() {
		return fn.apply( obj, arguments );
	};
}

var obj = {
	a: 2
};

var bar = bind( foo, obj );

var b = bar( 3 ); // 2 3
console.log( b ); // 5
```

Since hard binding is such a common pattern, it's provided with a built-in utility as of ES5: Function.prototype.bind, and it's used like this:

```js
function foo(something) {
	console.log( this.a, something );
	return this.a + something;
}

var obj = {
	a: 2
};

var bar = foo.bind( obj );

var b = bar( 3 ); // 2 3
console.log( b ); // 5
```

`bind(..)` returns a new function that is hard-coded to call the original function with the this context set as you specified.

##### API Call Contexts
Many libraries' functions, and indeed many new built-in functions in the JavaScript language and host environment, provide an optional parameter, usually called "context", which is designed as a work-around for you not having to use bind(..) to ensure your callback function uses a particular this.

```js
function foo(el) {
	console.log( el, this.id );
}

var obj = {
	id: "awesome"
};

// use `obj` as `this` for `foo(..)` calls
[1, 2, 3].forEach( foo, obj ); // 1 awesome  2 awesome  3 awesome
```

Internally, these various functions almost certainly use explicit binding via call(..) or apply(..), saving you the trouble.

## `new` Binding

The fourth and final rule for this binding requires us to re-think a very common misconception about functions and objects in JavaScript.

In traditional class-oriented languages, "constructors" are special methods attached to classes, that when the class is instantiated with a new operator, the constructor of that class is called. This usually looks something like:

```js
something = new MyClass(..);
```

JS has a `new` operator, and the code pattern to use it looks basically identical to what we see in those class-oriented languages; most developers assume that JS's mechanism is doing something similar. However, there is really no connection to class-oriented functionality implied by `new` usage in JS.

First, let's re-define what a "constructor" in JS is. In JS, constructors are **just functions** that happen to be called with the `new` operator in front of them. They are not attached to classes, nor are they instantiating a class. They are not even special types of functions. They're just regular functions that are, in essence, hijacked by the use of `new` in their invocation.

For example, the `Number(...)` function acting as a constructor, from the spec:
`When Number is called as part of a new expression it is a constructor: it initialises the newly created object.`

So, pretty much any ol' function, including the built-in object functions like Number(..) can be called with new in front of it, and that makes that function call a constructor call. This is an important but subtle distinction: there's really no such thing as "constructor functions", but rather construction calls of functions.

When a function is invoked with `new` in front of it, otherwise known as a constructor call, the following things are done automatically:

1. a brand new object is created (aka, constructed) out of thin air
2. the newly constructed object is [[Prototype]]-linked
3. the newly constructed object is set as the this binding for that function call
4. unless the function returns its own alternate object, the new-invoked function call will automatically return the newly constructed object.

Consider this code:

```js
function foo(a) {
	this.a = a;
}

var bar = new foo( 2 );
console.log( bar.a ); // 2
```

By calling `foo(..)` with new in front of it, we've constructed a new object and set that new object as the `this` for the call of `foo(..)`. So `new` is the final way that a function call's this can be bound. We'll call this `new` binding.


## Everything In Order

So, now we've uncovered the 4 rules for binding this in function calls. All you need to do is find the call-site and inspect it to see which rule applies. But, what if the call-site has multiple eligible rules? There must be an order of precedence to these rules, and so we will next demonstrate what order to apply the rules.

It should be clear that the default binding is the lowest priority rule of the 4. So we'll just set that one aside.

Which is more precedent, implicit binding or explicit binding? Let's test it:

```js
function foo() {
	console.log( this.a );
}

var obj1 = {
	a: 2,
	foo: foo
};

var obj2 = {
	a: 3,
	foo: foo
};

obj1.foo(); // 2
obj2.foo(); // 3

obj1.foo.call( obj2 ); // 3
obj2.foo.call( obj1 ); // 2
```

So, explicit binding takes precedence over implicit binding, which means you should ask first if explicit binding applies before checking for implicit binding.

Now, we just need to figure out where new binding fits in the precedence.

```js
function foo(something) {
	this.a = something;
}

var obj1 = {
	foo: foo
};

var obj2 = {};

obj1.foo( 2 );
console.log( obj1.a ); // 2

obj1.foo.call( obj2, 3 );
console.log( obj2.a ); // 3

var bar = new obj1.foo( 4 );
console.log( obj1.a ); // 2
console.log( bar.a ); // 4
```

OK, `new` binding is more precedent than implicit binding. But do you think new binding is more or less precedent than explicit binding?

**Note:** new and call/apply cannot be used together, so `new foo.call(obj1)` is not allowed, to test new binding directly against explicit binding. But we can still use a hard binding to test the precedence of the two rules.

Before we explore that in a code listing, think back to how binding physically works, which is that `Function.prototype.bind(..)` creates a new wrapper function that is hard-coded to ignore its own `this` binding, and use a manual one we provide.

By that reasoning, it would seem obvious to assume that hard binding (which is a form of explicit binding) is more precedent than new binding, and thus cannot be overridden with new.

```js
function foo(something) {
	this.a = something;
}

var obj1 = {};

var bar = foo.bind( obj1 );
bar( 2 );
console.log( obj1.a ); // 2

var baz = new bar( 3 );
console.log( obj1.a ); // 2
console.log( baz.a ); // 3
```

Whoaa! `bar` is hard-bound against `obj1`, but `new bar(3)` did not change `obj1.a` to be `3` as we would have expected. Instead, the hard bound (to `obj1`) call to `bar(..)` is able to be overridden with `new`.
Since `new` was applied, we got the newly created object back, which we named `baz`, and we see in fact that `baz.a` has the value 3.

This should be surprising if you go back to our "fake" bind helper:

```js
function bind(fn, obj) {
	return function() {
		fn.apply( obj, arguments );
	};
}
```

If you reason about how the helper's code works, it does not have a way for a new operator call to override the hard-binding to obj as we just observed.

But the built-in `Function.prototype.bind(..)` as of ES5 is more sophisticated, quite a bit so in fact. It is able to determine whether or not the hard-bound function has been called with the `new` (resulting in a newly constructed object being its this), and if so, uses that newly created `this` rather than the previously specified hard binding for this.

Why is `new` being able to override hard binding useful?

The primary reason for this behavior is to create a function (that can be used with new for constructing objects) that essentially ignores the `this` hard binding but which presets some or all of the function's arguments. One of the capabilities of `bind(..)` is that any arguments passed after the first `this` binding argument are defaulted as standard arguments to the underlying function.

```js
function foo(p1,p2) {
	this.val = p1 + p2;
}

// using `null` here because we don't care about
// the `this` hard-binding in this scenario, and
// it will be overridden by the `new` call anyway!
var bar = foo.bind( null, "p1" );

var baz = new bar( "p2" );

baz.val; // p1p2
```


### Determining `this`

Now, we can summarize the rules for determining `this` from a function call's call-site, in their order of precedence. Ask these questions in this order, and stop when the first rule applies.

1. Is the function called with `new` (new binding)? If so, this is the newly constructed object.
`var bar = new foo()`

2. Is the function called with `call` or `apply` (explicit binding), even hidden inside a `bind` hard binding? If so, this is the explicitly specified object.
`var bar = foo.call(obj2)`

3. Is the function called with a context (implicit binding), otherwise known as an owning or containing object? If so, `this` is that context object.
`var bar = obj1.foo()`

4. Otherwise, default the `this` (default binding). If in `strict mode`, pick `undefined`, otherwise pick the `global object`.
`var bar = foo()`

That's it. That's all it takes to understand the rules of `this` binding for normal function calls. Well... almost.

### Binding Exceptions

**If you pass `null` or `undefined` as a `this` binding parameter to `call`, `apply`, or `bind`, those values are effectively ignored, and instead the default binding rule applies to the invocation.**

Arrow functions use lexical scoping for `this` binding, which means they adopt the `this` binding from the enclosing function call. Essentially, a syntactic replacement of `self = this` in pre-ES6 coding.

