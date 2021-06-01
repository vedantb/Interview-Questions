# Events

## High Level DOM Concepts

An Event is a signal that something has occurred in the browser.
There are many categories of events:

1. User Events such as `click`
2. System Events such as `DomContentLoaded`

Events are dispatched to event targets. EventTarget is an interface that is implemented by a number of foundational objects in the browser, such as window,
document, element and XMLHttpRequest. When an object implements the EventTarget interface, it allows that object to be the target of events as well as enabling other pieces of code to listen for particular events that hit that object.

Code that is registered to listen for events that hit an event target is known as an event listener. The term event handler is a name for a particular method of adding an event listener. In practice, it is common to see the term event handler used interchangably with the term event listener.

Event targets can exist as their own objects, and they can also participate in a tree, such as when elements participate in a document.

In the DOM Events Visualizer, there's a setup with 4 event targets. There's a root level event target called parent, which has a single child called Child. Child is an event target that also has two children, first-grandchild and second-grandchild.

Events have a corresponding target. You can set the target of an event by using this drop-down in the event panel. Generally, events flow through event targets in three separate phases. In the first phase, the event travels down through the event targets towards the target of the event. This is known as the capture phase.

When the event hits the event target, it then travels through the target. This is the second phase known as the target phase. After that's completed, then the event goes back up to the root event target in the bubble phase. If I dispatch an event, you can see how the event traveled through the event targets.

Each event target in the visualizer has two Add buttons for adding an event listener either in the capture phase of the event or in the bubble phase of the event. Not all events have all three phases.
If I come over here and I disable the bubbles attribute, so setting it to false on the event, when I dispatch the event, you will see that the event goes through the capture phase and target phase, but it does not continue into the bubble phase.

## Listen to Events using HTML Attribute Event Handlers

It is possible to write code in HTML attributes that will be executed when a matching event occurs.

```html
<button onClick="console.log('clicked');" type="button">Call to Action Button</button>
```

Different element types allow different event handler attributes to be set. Window, document, and all HTML elements implement the `GlobalEventHandlers` mixin which provides a common set of HTML event handler attributes like `onClick` and `onLoad`.

```html
<button onClick="" onLoad="" type="button">Call to Action Button</button>
```

HTML event handler attributes are a way to define an EventListener in the bubble phase of an event. You cannot use these types of EventListener bindings to listen to events in the capture phase of an event.

This style of event binding is also known as a DOM-0 event handler and is referred to as event handler content attributes in formal specifications.

A HTML event handler attributes string can be any JavaScript function body. That is any code, you would normally be able to put inside of a function. There are some fairly magic values that you can use in your HTML event handler attributes string.

You get access to an event object, which represents the `ActiveEvent`. `This` runtime context of your function is set to the element that the event handler is bound to, which in our case, is the button element.

```html
<button onClick="console.log(this, event);" type="button">Call to action button</button>
```

You can think about how your attribute string is executed by looking at this approximation. Here I have an `execute` function, which takes an `event` as its only argument. Then inside of the `execute` function, I'm calling `eval` and then passing in a string, in this case, `console.log` this element.

Now, here I have the `execute` function. I'm going to do `.call` which lets me set the this context for the function and I'm going to set it to be the `button` element. Then I'm going to pass in as the argument to the function, a fake event that I've created.

```js
function execute(event) {
  // -> Your code goes here
  eval("Your code in HTML attributes will run in here");
}

// event -> the event object
// this -> being set to the current element
execute.call(document.querySelector("button"), {
  type: "Fake Event"
});
```

A helpful way to think about how your code is executed inside of HTML attributes is that your code's going to run in here. It's going to be provided with an event object and it's `this` context is going to be set to be the element that the event handler was bound to.

Within HTML event handler attributes, you can execute any function body you like. However, it is common to execute a named function that you have defined somewhere else. In this case, I'm trying to call a `myOnClick` function.

```html
<button onClick="myOnClick()" type="button">Call to action button</button>
```

```js
function myOnClick() {
  console.log("I am in the global scope");
}
```

In order for this code to work, I have a function named `myOnClick` accessible on the global scope. If the function you are trying to call from within your html attribute event handler does not exist on the global scope, then a `ReferenceError` will be thrown when your attribute string is executed.

One way for a function to be available on the global scope is to define it at the root level, which means not putting your function inside of any other scopes. You can see that my `myOnClick` function has been added to the global `window` object.

```js
function myOnClick() {
  console.log("I am in the global scope");
}

console.log("myOnClick", window.myOnClick === myOnClick); // true
```

Here, I have a function called `outer`, and inside it, I'm declaring a function called `inAnInnerScope`. `inAnInnerScope` is not accessible on the global scope. It is hidden inside of the scope that the outer function has created, so I cannot look up in an inner scope on the window object.

When I'm trying to look up the `inAnInnerScope` function in the global scope, it doesn't exist. It's coming up as `undefined`.

```js
function outer() {
  function inAnInnerScope() {
    console.log("I am not accessible in the global scope");
  }
}
console.log("inAnInnerScope", window.inAnInnerScope); // undefined
```

A bug can occur with this approach of creating global functions when you minify your code. Code minifiers will commonly mangle function names to ensure the smallest amount of code is sent over the wire to your users. Unfortunately, this can break your attempts to use a named function in the global scope.

In this case, my function name has been mangled to the character `a`, however, over in my html, I'm still trying to call `myOnClick`, which no longer exists. Because of the minifier, I've broken the link between my html and my JavaScript file. Modern minifiers commonly won't mangle root level function names. Not mangling root level function names is not a guarantee for every minifier that will ever exist. Also, you might change an option for a minifier that can result in top-level function names being mangled without you realizing.

A safer option for defining functions in the global scope is to add a named property to the global `window` object directly. Minifiers should not minify object properties. You can sidestep the function name mangling concern by using this approach. Attaching functions to the window directly also lets you write your global functions inside of nested scopes, which is pretty commonplace in module systems.

```js
function outer() {
  // I can add to the global scope without needing
  // to defined a function at the root level
  window.myOnClick = function myOnClick() {
    console.log("on click");
  };
}
outer();
```

Here, I have a function called outer, which is creating a new scope. Inside of that function, I am assigning a `myOnClick` property to the global window object directly in order to expose this function in the global scope.

Generally speaking, for clarity, I recommend explicitly attaching something to the `window` if you want it to be in the global scope. Then it doesn't matter where the code is actually placed in your application.

Now, let's say you have everything wired up and working correctly. A challenge with HTML event handler attributes is that it is easy to accidently break the link between the HTML attribute string and any global functions that it is calling.

Let's say, as part of array factor, I'm changing the name of `myOnClick` to `buttonClick`. I have now broken the link between my HTML file, which is expecting a global function named `myOnClick`. Now my global function, `myOnClick` doesn't exist. It's now called `buttonClick`. Now, I'm going to get a `ReferenceError`, because `myOnClick` doesn't exist on the global scope.

These types of broken links are easy to do, because the only thing linking your HTML event handler attribute to your global function is the name of the function. Broken links can be hard to spot in a codebase unless you have additional tooling, such as automated tests that are executing the events.

Another gotcha I've bumped into a few times using HTML event handler attributes is forgetting to actually execute a global function that you're trying to call. While this code may look right, it's not actually executing the `myOnClick` function.

```html
<button onclick="myOnClick" type="button">Call to action button</button>
```

If we come back to my approximation of what the browser is doing with our event handler attributes, if I am passing in `myOnClick` into my eval function, that actually becomes an identifier, `myOnClick`, which doesn't do anything by itself.

```js
function execute(event) {
  // -> Your code goes here
  eval("myOnClick");
}

// event -> the event object
// this -> being set to the current element
execute.call(document.querySelector("button"), {
  type: "Fake Event"
});
```

Some other drawbacks of HTML attribute event handlers is that you can only add a single event handler attribute of a particular event type. We can only have one `onClick` handler to listen for click events, which sort of sucks at scale.

With this approach, you can also end up with larger HTML files as you are sprinkling lots of JavaScript in your HTML, sometimes repeating yourself a fair bit. However, compression such as Gzip does reduce the cost of any repetition. In order to remove a HTML attribute event handler, all you need to do is remove the attribute.

```js
const button = document.querySelector("button");
if (button === null) {
  throw new Error("Unable to find button");
}
button.removeAttribute("onclick");
```

To get access to the `button` HTML element, I am calling `document.querySelector` and passing in the string `button`, which is a `type selector` and will match elements with the button node name. QuerySelector can return `null` if no elements are found that match the provided selector.

Before I use the result of my querySelector call, I am doing a null check. In this case, I am going to throw an error if I couldn't find a button. If my program continues on past the guard, then I know I have a button HTML element and I can interact with it safely.

## LISTEN TO EVENTS USING OBJECT PROPERTY EVENT HANDLERS

HTML attributes often have 2 representations. One representation is the HTML attribute itself and they are named "content attributes".

```html
<!-- id: content attributes -->
<button id="my-button" type="button">Call to action button</button>
```

The other representation of these HTML attributes is properties on corresponding JS DOM objects. These object properties are named "IDL attributes" (Interface Description Language).

```js
// IDL attribute (object property)
console.log("button id: ", button.id);
```

As with the ID HTML attribute, event handler attribtues such as `onclick` also have a corresponding `onclick` object property. Here I am creating an object property event handler by assigning a function to the `onclick` property of the button object.

```js
// Object property event handler
button.onclick = function onClick(event) {
  console.log("");
};
```

Object property event handlers are a way to define an event listener in the bubble phase of an event. This is the same as HTML attribute event handlers. You cannot use this type of binding to listen to events in the capture phase.

Object property event handlers are also classified as DOM-0 event handlers alongside HTML attribute event handlers. The object property event handler function is provided with the event as the first and only argument to the function. The `this` context of the callback function is set to the element that the event handler is bound to.

```js
// Object property event handler
button.onclick = function onClick(event) {
  console.log(this === button); // true
};
```

Because we're expressing out event handler function in JavaScript, we are free to modify the this binding of our function if we want to. Here I'm using `.bind` to set the `this` context of the event handler function to be `myThis`.

```js
const myThis = {};
// Object property event handler
button.onclick = function onClick(event) {
  console.log(this === myThis); // true
}.bind(myThis);
```

Now when my event handler executes, the `this` context inside of the event handler is now `myThis` rather than the default binding which would have been the `button` element.

Sometime people might unintentionally override the `this` runtime context in the event handler function by using arrow functions. Arrow functions lock the `this` context of a function to its parents scope. So, in this `onclick` function, it's `this` runtime context is always set to its parents scope and we have lost the default `this` binding which would have been `button`.

```js
const parentThis = this;
button.onclick = () => {
  console.log(this === parentThis); // true
};
```

However, in practice, overriding the `this` value in event handlers generally isn't a big deal. You can often simply tell by looking at how the code is authored to know what element the event handler is bound to. So, in this case it's pretty cleat we're bound to button or parents scope.

**You can also lean on the `event.currentTarget` property which is a reference to the element the event handler is bound to**. In our case, this will be button.

With the object property event handler, you can only add a single event handler per event type to an event. You cannot set two onclicks for example. Only being able to have one event handler for an event type becomes problematic in larger projects.
This is common code in some projects.

```js
button.onclick = function first(event) {
  console.log("first");
};

const previous = button.onclick;
button.onclick = function second(event) {
  if (previous) {
    previous.call(this, event);
  }
  console.log("second");
};
```

This acrobatics is no longer needed when using the `eventTarget` `addEventListener` API which we will get to soon.

To remove an object property event handler, you assign the corresponding object property to `null`.

```js
button.onclick = null;
```

## UNDERSTAND THE RELATIONSHIP BETWEEN HTML ATTRIBUTE AND OBJECT PROPERTY EVENT HANDLERS

HTML attribute event handlers and object property event handlers are linked ways of expressing an event handler binding. On close inspection, there are some interesting characteristics to their relationship.

First, you can only use one binding mechanism or the other. You cannot have both. Setting one will override the other. Here, I am rendering my HTML with an onclick attribute on my button element. For now, there's no JS. When we click on the button, we see that the code in the `onclick` attribute being called.

```html
<button onclick="console.log('onclick: html attribute');" type="button">Call to action button</button>
```

When we add in the JS file again. Here we have an `onclick` property to the button element.

```js
const button = document.querySelector("button");

if (button === null) {
  throw new Error("Unable to find button");
}

button.onclick = function onClick(event) {
  console.log("onclick: element property"); // true
};
```

Now, when we click on the button only the element property event handler is being called. The object property assignemnt has replaced the `onclick` HTML attribute event handler. After the assignment of `onclick`, I am now going to set the buttons `onclick` HTML attribute again from within the JS.

```js
const button = document.querySelector("button");

if (button === null) {
  throw new Error("Unable to find button");
}

button.onclick = function onClick(event) {
  console.log("onclick: element property"); // true
};

button.setAttribute("onclick", "console.log('onclick:html attribute is back')");
```

Now when we click the button, the new html attribute event handler is called and not the property assignment.

If I have an HTML attribute event handler, I can clear that event handler in 2 different ways. Firstly, I can remove the attribute completely to unbind the event.

```js
button.removeAttribute("onclick");
```

I can also clear the event handler by setting the `onclick` property on my button element to `null`.

```js
button.onclick = null;
```

If we take a look at our HTML in the inspector, we see that the `onclick` HTML attribute is sitting there happily unmodified even though the event handler has been unbound. This behavior is different to other element properties such as `id`.

```html
<button id="original-id" onclick="console.log('onclick: html attribute');" type="button">Call to action button</button>
```

Here, the button has the `id` of "original-id" and we can also see it in the elements panel. If I change the value of this `id` inside of my JavaScript to change the id, you see that the HTML was udpated to reflect this new value. Interestingly, you can execute an HTML attribute event handler function directly by executing the corresponding object property event handler. If the event handler was created through object property assignment, then in this case, the `onclick` function would call that one.

```html
<button id="original-id" onclick="console.log('onclick: html attribute');" type="button">Call to action button</button>
```

```js
button.onclick();
```

The utility of this behavior is super limited. You're not actually creating, dispatching the event but you're just executing the `onclick` function. Let's change the onclick to log the `this` runtime context and the `event`.

```html
<button onclick="console.log(this, event);" type="button">Call to action button</button>
```

If we then examine the console, we see that the `this` runtime context is still set correctly which is the `button`, the element the event handler is bound to. But our event object is `undefined` which makes sense because we're not creating any events or passing events to this function. Technically, you can pass it an event too. However, the ability to execute event handlers directly has extremely limited utility. I personally have never written code like this.

## ADD AN EVENT LISTENER WITH `addEventListener`

Event targets such as elements have an `addEventListener` API which allows you to add multiple event listeners to a single event target as well as giving you a lot of control over the event listener binding.
Event listeners created with `addEventListener` are also known as DOM2/DOM2+ event listeners.

There are 3 arguments to the `addEventListener` function. The first is a string which is the type of event you'll be binding to. e.g. 'click'. The second argument is the event listener function or object. There's also an optional third argument which gives you more control on the binding.
When adding an event listener with the `addEventListener` API, the event listener will be added in the bubble phase by default which is the same as HTML attribute event handlers and object property event handlers.
The second argument to `addEventListener` can either be a function or an object which implements the event listner interface .e.g an object with the `handleEvent` function property.

In practice, there isn't much use of passing an object with the `handleEvent` function property. It seems to be overwhelmingly common practice to use a function as the second argument.

```js
function onClick() {
  console.log("clicked");
}

const listener = {
  handleEvent: function onClick(event) {
    console.log("called from handleEvent");
  }
};

button.addEventListener("click", onClick);
button.addEventListener("click", listener);
```

You can technically modify the event listener's `handleEvent` property after the listener has been bound. However, I cannot think of any reason why we would really want to do this.

```js
const listener = {
  handleEvent: function onClick(event) {
    console.log("called from handleEvent");
  }
};

button.addEventListener("click", listener);

listener.handleEvent = function onClick(event) {
  console.log("why?");
};
```

If you provide a function to `addEventListener`, then in just the same way as object property handlers, your function is provided with an event as its only argument and the `this` runtime context of the function is set to the element your event listener is bound to which in our case is the button.

The `this` binding is a default binding. Here, I am locking the `this` to be the `myThis` object I have created.

```js
const myThis: {custom: true}
function onClick(event) {
  console.log(this, event); // myThis
}

button.addEventListener("click", onClick.bind(myThis));
```

Things are a bit different when you use a listener object. Unlike our function, the `this` runtime context in our `handleEvent` function is NOT set the to the element the event listener is bound to. Rather, it is set to the `eventListener` object itself. In order to get the element the event listener is bound to, you can use `event.currentTarget` property.

The `this` keyword operating differently between event listener objects and functions could potentially be a gotcha if your event listener object was borrowing a function that you were also using as an event listener.

```js
function onClick(event) {
  console.log(this, event);
}

const listener = {
  handleEvent: onClick
};

button.addEventListener("click", onClick);
button.addEventListener("click", listener);
```

Now, when the button is clicked, `onClick` has a different `this` for both the listeners. This is a rare problem to come across because the listener object is rarely used. But, the differing behaviors of `this` keyword inside of the executed listener function is something to keep in mind.

The third argument to `addEventListener` can either be an `addEventListener` options object or a boolean value.
The addEventListener options object has 3 optional properties.
The `capture` property allows you to specify whether an event listener will be called in the capture phase or the bubble phase of an event. If the `capture` value is true, then the eventlistener will be called in the capture phase. If it's false, the event listener will be called in the bubble phase. The default value is `false`.

Another property is `once`. When it is set to `true`, an event listener will automatically be unbound after it has been called a single time. Default is `false`.

```js
let count = 0;
function onClick(event) {
  console.log(`Clicked times: ${++count}`);
}

button.addEventListener("click", onClick, {
  once: true
});
```

Another property of this object is `passive`. Generally speaking the passive value defaults to `false`. But in some cases it defaults to `true`. We will cover passive events in detail in another lesson.
For now, all you need to know is that you can set a passive property on the add event listener options object to mark the event listener as passive.

When just a single boolean is passed as the third argument, it signifies whether the event will be bound in the capture phase or the bubble phase of the event. A `true` value means the listener will be called in the capture phase. A `false` value means the listener will be called in the bubble phase. For clarity it is always better to use the options object syntax.

This next example is also using the parent element which sits above the button in the DOM.

```js
const button = document.querySelector("button");
const parent = document.querySelector(".parent");

if (button === null || parent === null) {
  throw new Error("Unable to find elements");
}

function onClick() {
  console.log("clicked");
}

button.addEventListener("click", onClick, {
  capture: true
});
button.addEventListener("click", onClick, {
  capture: true
});
parent.addEventListener("click", onClick, {
  capture: true
});
```

When creating an eventListener to an event target., you pass in an event type, a listner reference and a capture value. These 4 thigs - event target, event name, listener reference and capture value uniquely identify an event listener.
You cannot add two event listeners with the same 4 things. If you change any of the 4 of the uniquely identifying properties of the event listener, you will create a new event listener.

Passing in two differnet functions as listeners also works.

It does not matter how you pass the capture value. It can be either through the options object, the boolean value as the final argument or the default. They are not considered unique.

```js
button.addEventListener("click", onClick, {
  capture: false
});
button.addEventListener("click", onClick, false);
button.addEventListener("click", onClick);

// only one event listener created
```

In the next example, we have 2 listener objects where the 2nd listener uses the handleevent from the first listener.

```js
const listener = {
  handleEvent: function onClick(event) {
    console.log("first");
  }
};

const listener2 = {
  handleEvent: listener.handleEvent
};

button.addEventListener("click", listener);
button.addEventListener("click", listener2);
```

In this case `first` is logged twice. Hmm. This is because `addEventListener` is doing the reference check on the event listener object and not the `handleEvent` function.

## Remove an Event Listener with `removeEventListener`

In order to remove an event listener from an event target, we use the `removeEventListener` API. In order to correctly remove an event listener, you need to use the four uniquely identifying attributes of an event listener that you used with your `addEventListener` call. That is the event target, the event name, the listener reference and the capture value.

```js
button.removeEventListener("click", onClick, { capture: true });
```

When it comes to the capture value that you provide to `removeEventListener`, it does not matter how you express the capture value, only that it is the equivalent value that you used with `addEventListener`. Unfortunately, the `removeEventListener` API gives no indication as to whether a removal was successful. If you mess anything up, you won't know about it.

There are a few gotchas I've seen when trying to remove event listeners with `removeEventListener`. Firstly, you need to pass in the same event listener reference to `removeEventListener` as you did to `addEventListener` in order to remove it.

I've seen it come up a few times where a function is provided to `removeEventListener` that looks the same as the one that you've added with `addEventListener`. However, they're two different functions with two different references.

```js
button.addEventListener("click", () => console.log("clicked"), { capture: true });
button.removeEventListener("click", () => console.log("clicked"), { capture: true });
```

This gotcha seems to be more common when using arrow functions. They are different functions with different references.

Generally speaking, it's pretty dangerous to create functions in the second argument to `addEventListener`. This is because you lose reference to the function reference after you have created it.

Another common gotcha is not passing in the correct capture value. This is surprisingly easy to do when the add and remove event listener calls are not right next to each other. This bug is super hard to detect as remove event listener gives no indication of whether the unbinding was successful.

In order to remove the gotchaas with event listeners, this little helper is useful. This ensures that the 4 unqiuely identifying things are always the same for the remove event listener call.

```js
export default function bind(target, { type, listener, options }) {
  target.addEventListener(type, listener, options);

  return function unbind() {
    target.removeEventListener(type, listener, options);
  };
}
```

```js
import bind from "./bind";

const button = document.querySelector("button");
if (button === null) {
  throw new Error("Unable to find button");
}

function onClick(event) {
  console.log("clicked");
}

const unbindButtonClick = bind(button, {
  type: "click",
  listener: onClick,
  options: { capture: true }
});

unbindButtonClick();
```

This helper also unlocks safer usage of functions to directly use in your binding. Because the helper has access to that function and so it can correctly pass it to removeEventListener

```js
const unbindButtonClick = bind(button, {
  type: "click",
  listener: () => {
    console.log("clicked");
  },
  options: { capture: true }
});

unbindButtonClick();
```

There's the `bind-event-listener` package on npm which does exactly this. The package also has a `bindAll` variant which takes an event target as well as an array of bindings. It returns you back a single function which when executed will unbind all of these event listeners in the same go.

```js
const unbind = bindAll(button, [
  {
    type: "mouseup",
    listener: () => console.log("mouse up")
  },
  {
    type: "mousedown",
    listener: () => console.log("mouse down")
  }
]);

unbind();
```

## Choose an Event Listener Mechanism

It is possible to listen for events using HTML attribute event handlers, element property event handlers, and `addEventListener`. I almost always use `addEventListener` to listen to events, as it allows multiple event listeners to be added to a single event target, as well as providing a lot more control over the binding.

You're often free to choose what mechanism you like to listen to events. However, some events do not have corresponding HTML attributes or element properties. You will need to use `addEventListener` in that case. For example, `DOMContentLoaded` has no corresponding HTML attribute or element property event handler, so you'll need to use `addEventListener` to listen for that event.

A good place to see what event listener mechanisms you have available to you is the MDN event reference. Firstly, I'm going to look up the click event. I can come in here, and I can see it. Click has a corresponding event handler property. I can go into here and find out a bit more about that.

[MDN Event Reference](https://developer.mozilla.org/en-US/docs/Web/Events)

## The Execution Order of Event Listeners

Event listeners added to an event target are called in the same order that they were bound in. It does not matter what mechanism you use to create an event listener. The order in which they are bound will be the order in which the event listeners are called.

```js
const button = document.querySelector("button");
if (button === null) {
  throw new Error("Unable to find button");
}

button.addEventListener("click", function onClick() {
  console.log("addEventListener 1");
});

button.onClick = function onClick() {
  console.log("onclick");
};

button.addEventListener("click", function onClick() {
  console.log("addEventListener 2");
});

// Output
// addEventListener 1
// onclick
// addEventListener 2
```

The output matches the order in which the event listeners are bound.

Another example:

```js
function first() {
  console.log("first");
}

function second() {
  console.log("second");
}

button.addEventListener("click", first);
button.addEventListener("click", second);

// this does nothing
button.addEventListener("click", first);

// OUTPIT:
// first
// second
```

The last call is redundant and does not create a new event listener. It does not impact the original bind order.

Example:

```js
function first() {
  console.log("first");
}

function second() {
  console.log("second");
}

button.addEventListener("click", first);
button.addEventListener("click", second);

button.removeEventListener("click", first);
button.addEventListener("click", first);

// Output:
// second
// first
```

In this case second is output before first.

Example:

```js
button.onclick = function onClick1() {
  console.log("onclick 1");
};

button.addEventListener("click", function onClick() {
  console.log("addEventListener");
});

// OUTPUT
// onclick 1
// addEventListener

button.onclick = function onClick2() {
  console.log("onclick 2");
};

// INTERESTING!!!
// OUTPUT
// onclick 2
// addEventListener

button.setAttribute("onclick", "console.log('html attribute')");

// ANOTHER INTERESTING OUTPUT:
// html attribute
// addEventListener
```

If you change an HTML attribute or an object property event handler, then the original bind order is respected. It's best to call the bottom 2 calls as reassignments of this original binding.

If you explicitly unbind an HTML attribute or an element property event handler, then it's original bind order is lost.

```js
button.onclick = function onClick1() {
  console.log("onclick 1");
};

button.addEventListener("click", function onClick() {
  console.log("addEventListener");
});

button.onclick = null;

button.onclick = function onClick2() {
  console.log("onclick 2");
};

// OUTPUT:
// addEventListener
// onclick 2
```

## The Execution Order of Event Listeners in the Target Phase

when an event target participates in a tree of event targets. An event has three phases.

A capture phase as the event moves down towards the event target, the target phase as the event travels through the event target, and then the bubble phase as the event travels back up towards the root.

The target phase of an event has some really interesting characteristics. Firstly, it's not possible to add event listeners explicitly in the target phase. You can only add them in the capture phase or in the bubble phase. Event listeners will be called in the target phase as a byproduct of being attached to the target of the event.

When on the target of an event, all event listeners attached to that event target will be called in the target phase. However, event listeners added in the capture phase will be executed before listeners that were added in the bubble phase even though they're all called in the same target phase of the event.

Another perhaps unexpected behavior is that even if an event does not bubble, event listeners added in the bubble phase of an event will still be executed on the event target, and they'll be called in the target phase.

You can see up here (Event Visualizer), there were other event listeners added to parents of the first grandchild event target which weren't executed, but the event listeners added in the bubble phase on the event target were executed.

## Event Object

Event handlers and event listeners are provided with an event object. Every event object gives you a lot of information about an event as well as mechanisms to impact the event itself. Firstly, the event constructor has four constants. These represent the different states that an event can be in.

```js
console.log(Event.NONE);
console.log(Event.CAPTURING_PHASE);
console.log(Event.AT_TARGET);
console.log(Event.BUBBLING_PHASE);
```

`Event.NONE` is when the event has not yet been dispatched or has finished dispatching. We have capturing phase which is when the event is in the capture phase, at target which is when we're in the target phase, and bubbling phase when we're in the bubbling phase. These properties map to integers, which I've logged out here in the console, so zero, one, two and three.

Taking a look at properties on the event object, firstly, we have the `eventPhase`, which matches the phase the event is currently in.

Another property on the event object is `type` which matches the event type the event listener was aded for.

```js
const map = {
  [Event.NONE]: "none",
  [Event.CAPTURING_PHASE]: "capture",
  [Event.AT_TARGET]: "target",
  [Event.BUBBLING_PHASE]: "bubble"
};

function onClick(event) {
  console.log("eventPhase", map[event.eventPhase]); // "capture"
  console.log(event.type); // "click"
}

parent.addEventListener("click", onClick, {
  capture: true
});
```

The next two properties we look at are `target` and `currentTarget`. These properties are super useful.
`event.target` points at the event target in which the event is occurring and where the event is sort of traveling to. `Event.currentTarget` matches the event target that this event listener was added to. Here, I'm adding an event listener to the parent element.

```js
function onClick(event) {
  console.log("target: ", event.target); // where you've clicked
  console.log("currentTarget: ", event.currentTarget); // parent
}

parent.addEventListener("click", onClick, {
  capture: false
});
```

If you clicked on the button, the `event.target` is `button` and `event.currentTarget` is always parent. If you click on the parent div instead, `event.target` is `parent` too.

Next up we have the three event innate properties, bubbles, cancelable and composed. Bubbles is a boolean which is set to true if the event will have a bubble phase and it will be set to false if it won't have a bubbles phase.
Cancelable is another boolean property which is set to true if the event can be canceled and false if it cannot be canceled. We will conver canceling events in another lesson.

Composed is a boolean value which reflects wether an event will travel through the boundaries of a web components shadow DOM. If you're not working with web components, this property isn't all that useful.

```js
function onClick(event) {
  console.log("bubbles: ", event.bubbles);
  console.log("cancelable: ", event.cancelable);
  console.log("componsed: ", event.composed);
}
```

The `isTrusted` property of an event is a boolean which reveals whether the event was created by the browser itself or whether it was manually created by another piece of code.

When you manually trigger the event from code, the `isTrusted` flag is false. If the browser has triggered the event, it is true. We talk about event creation and dispatching events in the Synthetic events lesson.

```js
function onClick(event) {
  console.log("isTrusted: ", event.isTrusted);
}
parent.addEventListener("click", onClick, { capture: false });

button.click(); // isTrusted: false
```

Events have a timestamp property which represent the time in ms when the event was created. This time is relative to the origin of the page.

For events created by the browser, the creation time and the dispatch time are the same. However, for manually created events the creation of an event and the dispatching of that event might be separated by a long period of time. The `timestamp` property is for when the event is **created** and not dispatched.

```js
function onClick(event) {
  console.log("timestamp: ", event.timeStamp);
}
```

Events have a `defaultPrevented` property which will be set to `true` when an event is canceled.
The misleadingly named `returnValue` property of an event also represents whether an event was canceled. However, `returnValue` is set to `false` when an event is canceled and `true` when an event is not canceled. This is the inverse of `defaultPrevented`.

Every event has a single shared event object. Every HTML attribute event handler, element property event handler, and event listener on the event path will be provided with an event object that shares the exact same reference.The shared event object will mutate as it flows through event listeners and event targets, as well as in response to side effects such as canceling an event.

When the event is called, `currentTarget` was the parent as expected but at a later time in the future the `event.currentTarget` property was `null`. The `currentTarget` property changes as the event flows through the event listeners and it is also set to `null` when the event is finished dispatching. This is a common gotcha!

The root cause is that the `event` object is mutating. So if you need to hold on to that event object and need to refer to an event property, capturing the value in a local variable works

```js
function onClick(event) {
  console.log("event.currentTarget: ", event.currentTarget); // parent
  const captured = event.currentTarget;

  setTimeout(() => {
    console.warn("After setTimeout");
    console.log("event.currentTarget: ", event.currentTarget); // null
    console.log("captured currentTarget: ", captured); // parent
  });
}

parent.addEventListener("click", onClick, { capture: false });
```

Event objects also have a number of methods you can use. The first one is `composedPath` which returns an array of event targets that an event will travel through during an event. The returned array starts with the target of the event and then works up the tree of event targets.

```js
function onClick(event) {
  // button, child, parent, body, html, document, window
  console.log("Composed Path: ", event.composedPath());
}

parent.addEventListener("click", onClick, { capture: false });
```

There doesn't need to be any event listeners on these targets for it to be included in the event path. The composed path function will return the same event path regardless of which event target the event listener is added to. In this case, the event listener was added to the parent, but the target was the button inside the parent. This will only return the composed path when the event is being dispatched. Once the event has finished, or it hasn't been dispatched yet, this will return `[]`.

Another method is `preventDefault()` which will cancel an event if it is cancelable.

It's also possible for an eventListener to stop an event on the event path using the `stopPropagation` and `stopImmediatePropagation` functions. I'll cover these functions and their behavior in more detail in the Stopping Events Lesson.

In addition to the base event properties, different event types add their own additional properties, constants, and methods to the event object. Here, I'm adding a `clickEventListener`. I'm going to log that event out to the console.

```js
function onClick(event) {
  console.log(event);
}

parent.addEventListener("click", onClick, { capture: false });
```

The click event uses the MouseEvent interface and MDN Event reference is a great place to check all proeprties you have available.

## Log Events to the Console

Comong back to logging the click event to the console, you might have noticed that the `eventPhase` is 0 which is None. You would have expected this event to be in the bubble phase. The `currentTarget` property is also set to null even though it should have been the parent element because that's the event target the event listener was bound to.
The reason we're seeing these values is that both Chrome and Firefox evaluate the properties on an object that you've logged to the console when you first expand it. Now, because the event has finished dispatching, the `currentTarget` phase has been cleared and the `eventPhase` is 0. In Chrome there's a small "i" icon and if you hover over it, it says "this value was evaluated upon first expanding. It may have changed since then."

I'm going into this behavior in detail because I've been burned by this before where I've logged an event to the console and read the properties on here not understanding that these properties are not at the point which I did the `console.log` but at the point at which I expanded the object.
The safest thing to avoid this is to log out explicit properties separately.

## Cancel Events

If an event is cancellable, then it can be cancelled by event listeners. Cancelling an event is a way to opt out of the default behavior associated with an event.

In the visualizer, I'm going to add some event listeners. In one of them, I'm going to cancel the event using `preventDefault`. We'll get to `preventDefault` soon but for now all we need to know is that we are cancelling the event.

If I come up here and I dispatch the event, we'll see that even though this event listener did in fact cancel the event, the event continued to flow through the event path and all of the subsequent event listeners were still executed.

In my example application, I'm going to add a hyperlink to my DOM events.dev visualizer. When I click on the hyperlink, it will navigate to that visualizer.

Events have an internal cancelled flag. When an event is created, the internal cancelled flag is set to false. If an event is cancelled, then the internal cancelled flag is set to true. The clearest way to cancel an event is using the event.preventDefault method.

Here, I'm using the `querySelector` API to get access to our anchor element, and then adding a click eventListener to the anchor, which is going to execute this `onClick` function, which we'll call, `event.preventDefault`. When I come over to my app and I click the hyperlink, you'll see that I'm no longer navigating to that url. The default action of navigating to the href on the anchor tag was prevented.

```js
const anchor = document.querySelector("a");

function onClick(event) {
  event.preventDefault();
}

anchor.addEventListener("click", onClick);
```

The internal "canceled" flag of an event is exposed through the `defaultPrevented` property.

```js
const anchor = document.querySelector("a");

function onClick(event) {
  console.log("canceled?", event.preventDefaulted); // false
  event.preventDefault();
  console.log("canceled?", event.preventDefaulted); // true
}

anchor.addEventListener("click", onClick);
```

Another way to cancel an event is to use the discouraged legacy behavior of setting the `event.returnValue` property to false. You can also read the `event.returnValue` property to know if the event has been canceled.
The name `returnValue` is super misleading as this property does not intrinsically reflect what value you return from your event listeners. Returning `true` or `false` from an event listener has no bearing on the `returnValue`.

I recommend always using `preventDefault` to cancel an event and using the `defaultPrevented` property to understand if an event has been canceled.

```js
const anchor = document.querySelector("a");

function onClick(event) {
  console.log("canceled?", event.preventDefaulted); // false
  console.log("canceled?", event.returnValue); // true
  event.returnValue = false;
  console.log("canceled?", event.preventDefaulted); // true
  console.log("canceled?", event.returnValue); // false
}

anchor.addEventListener("click", onClick);
```

If you return false from an event listener created with `addEventListener`, then this `return false` does absolutely nothing.

```js
function onClick(event) {
  return false;
}
anchor.addEventListener("click", onClick);
```

Interestingly, returning false from an element property event handler does cancel an event. This prevents the navigation from happening.

```js
anchor.onclick = function onClick(event) {
  return false;
};
```

If you return false from html attribute event handler, then the event will also be canceled.

```html
<a onclick="return false;" href="https://domevents.dev"> Go to domevents.dev </a>
```

Now, I'm changing the `onclick` html attribute event handler so that it's calling a global function called `myOnClick`. In this case, when I click on the anchor, we see that the navigation goes through and wasn't prevented.

```html
<a onclick="myOnClick(event);" href="https://domevents.dev"> Go to domevents.dev </a>
```

```js
window.myOnClick = function myOnClick(event) {
  return false;
};
```

We see that the onclick attribute was only calling this function. It wasn't returning a value that this `myOnClick` function returned. The `myOnClick` is returning `false`. But then the false value is not being returned by this attribute.

The following code when you return the value prevents the navigation

```html
<a onclick="return myOnClick(event);" href="https://domevents.dev"> Go to domevents.dev </a>
```

```js
window.myOnClick = function myOnClick(event) {
  return false;
};
```

I think it's super confusing to lean on the `return false` behavior to cancel an event. Especially considering that it only works for some of the event binding mechanisms. Your code will be much more understandable if you simply lean on `event.preventDefault()` to cancel events. This also works for all of the different event binding mechanisms.

Regardless of what mechanism you were using to cancel an event, when the internal canceled flag of an event is set to true, then that event will always continue to be canceled. You cannot "uncancel" an event.

Calling `event.preventDefault()` for an event that is not cancelable doesn't do anything.

To know if the event is cancelable, you can read the `event.cancelable` property. However, often you want to know if a particular event is able to be canceled ahead of time. To know ahead of time, refer to the MDN Events Reference page.

## Cancel Bespoke Events

The `error` and `beforeunload` events have their own bespoke approaches to cancelling an event because nothing is easy.

First up, error events. Here I'm creating a constant called `value`, where I'm assigning that to be something. Something is not defined, so this is going to create a reference error which we're seeing over here.

```js
const value = something; // ReferenceError
```

The default behavior of this reference error is that an uncaught reference error is being logged to the console. Here I'm adding an `onerror` element property event handler, and I'm assigning it a function called `whoops()`, just for fun.

```js
window.onerror = function whoops() {
  return false;
};
```

Inside this function, I'm going to return false in order to try and cancel that event. If I refresh the page, I'll see that I'm still getting an uncaught reference error. Something is not defined. The default behavior of logging out something is not defined is still happening.

It turns out for our `window.onerror`, you do actually have to return `true` rather than `false` in order to cancel the event. We know `window.onerror` is not provided with an `error` event, so this is legitimately the only way to cancel an error event from a `window.onerror` element property event handler.

Alternatively, you can use `addEventListener` to listen for error events on the window and you will be provided with the error event and you can call `event.preventDefault()` to cancel it.

```js
window.addEventListener("error", function whoops(event) {
  event.preventDefault();
});

const value = something;
```

`onerror` element property event handlers on other elements behave just as other element property event handlers, so return `false` will cancel the event. These ones are also provided with the error event itself unlike window.onerror, so you can leverage the standard `event.preventDefault` to cancel an event.

```js
button.onerror = function whoops(event) {
  event.preventDefault(); // OR
  // return false;
};
```

Things get even stranger with the `beforeunload` event. Cancelling the beforeunload event requests the browser to prompt the user to ask whether they meant to close the page. Here I'm creating an onbeforeunload element property event handler. I'm assigning a function called onbeforeunload.

```js
window.onbeforeunload = function onbeforeunload(event) {
  return false;
};
```

I'm going to return false to try and cancel the event just like other element property event handlers. When I come over here, I try and reload the page. Return false did cancel that event, and I'm seeing this pop up.

What's different about beforeunload is that I can return almost anything from this function to cancel the event. I could return true, return a number, return a string, return an object, it's all good. When I try and refresh the page, cool, the event got cancelled.

You have to return either `undefined` or `null` in order for this function to not cancel the event. If I come over here and refresh the page, I'll see I didn't get that big warning pop up because the event was not cancelled.

You might be thinking, "Hey, rather than returning false or returning some other value, why don't I just do event.preventDefault? That's the standard way of cancelling events, right?" Not for `onbeforeunload`. Here, I'm going to call `event.preventDefault`, refresh the page, and boom. No warning, event wasn't cancelled.

Let's try `addEventListener` for `beforeunload`. I'm going to try and use `event.preventDefault` in order to cancel this event so that I get that little pop-up. I'm going to refresh the page, nope. That didn't work either. Well, it doesn't work in Chrome but cancels the event in Firefox. In order to cancel this event in Chrome as of now
we can assign any value we want to `event.returnValue` to cancel the event.

```js
window.addEventListener("beforeunload", function onBeforeUnload(event) {
  event.returnValue = "hello world"; // cancels the event
  event.preventDefault(); //doesn't work
});
```

Note: Beforeunload is a huge mess but if you need the event you gotta do what you gotta do.

## Stop Events

It is possible for you to stop an event from continuing along the event path. You can stop an event by using event.`stopPropagation()` and `event.stopImmediatePropagation()`. The visualizer makes it really clear how the `stopPropagation` and `stopImmediatePropagation` functions work.

Firstly, I'm going to add a few event listeners. When I dispatch the event, I see that the event flows through the event targets ordered by the event phase, so firstly, a capture phase, target phase and then bubble phase. While on an event target, event listeners are executed in the order in which they were added to that event target.

If I come over here and I change this event listener so that it calls `stopPropagation`, let's see what happens. I dispatch the event. We'll see it hits this event listener and keeps going, and then it stops here. `stopPropagation` stops an event from continuing along an event path. It stops the event after the event listeners on the current event target in the current phase of the event have been executed.

We'll see here that my second event listener called stopPropagation, and then these following three event listeners were called, but all of the rest of the event listeners along the event path were not called. I'll change this event listener, so it's no longer calling stopPropagation. Instead, I'm going to make this listener in the child call stopPropagation.

This event listener will be executed in the target phase. If I dispatch the event, I'll see it's very similar to what we saw before. These three event listeners are executed. These two event listeners were called after this event listener called stopPropagation, but this event listener over here, which is still in the same phase, so the target phase, was not executed.

his matches the spec and also the behavior that you'll see in Safari. However, in Chrome and Firefox, at the time of writing, this event listener will be executed if this event listener over here calls `event.stopPropagation`.

Given the varied behaviors across browsers, if an event listener on the target which was added in the capture phase calls `event.stopPropagation`, then event listeners added to the target in the bubble phase may or may not be called. If we come back to this event listener and we call `stopImmediatePropagation` rather than `stopPropagation`, let's have a look and see what happens.

The event hits the event listener and then stops immediately. You'll see that these subsequent event listeners on the same event target in the same event phase were not called. `stopImmediatePropagation` is a more forceful version of `stopPropagation`. It will stop straightaway. No other event listeners are called.

This behavior is consistent across browsers, where calling `stopImmediatePropagation` on an event listener on the target of an event will result in no further event listeners being called.

Something to keep in mind is that stopping an event is not the same thing as canceling an event. They're two independent side effects on the event object. Stopping an event on the event path will not cancel the event. It will not opt out of the default behavior for that event. Vice versa, as well, if I cancel an event, then that will not stop the event from continuing along the event path.

It's also completely allowed for an event listener to stop an event and cancel an event. Over here, we'll see that this event listener is canceling the event as well as stopping the event.

---

In this setup, we have two modules adding event listeners to the `window` object, which is an event target. Module1 is adding a mouseup event listener in the capture phase. Module2 is adding a mousedown event listener in the bubble phase and a mouseup event listener in the bubble phase. These two modules don't know anything about each other.

Example on how mousedown events and stopPropagation can break module 2.

Stopping events on the event path is a powerful feature of the DOM event system. However, you need to be careful when stopping events, as you can end up breaking other parts of your application that expect events to flow in a particular way.

## Event Delegation Pattern

Here I'm adding a click event listener to the button. Inside of my `onclick` function, I'm going to call this `addButton` function. What this `addButton` function is going to do is it's going to create a new button element. It's going to set the text of the button to be "Created button" and then this incremented count variable that I've stored up here.

```js
const button = document.querySelector("button");
const child = document.querySelector(".child");

if (button === null || child === null) {
  throw new Error("Unable to find elements");
}

let count = 0;
function addButton() {
  const newButton = document.createElement("button");
  newButton.innerText = `Created Button ${++count}`;
  child.appendChild(newButton);
}

button.addEventListener("click", function onClick() {
  addButton();
});
```

It's going to add the new button to the child element. The child element is the immediate parent of our button element. I'm getting access to that child element by using the querySelector API and passing in the class name of that element. When I click the button, I see that I'm able to add more and more buttons to the page.

I'd like to change this application so that when I click on any of these buttons, they would also add new buttons. If I click on them now, they don't do anything.

The first thing I can do is add a new click event listener to all of these created buttons, which themselves will call `addButton` when they're clicked. Now I can click on these created buttons and they will also create new buttons.

```js
const button = document.querySelector("button");
const child = document.querySelector(".child");

if (button === null || child === null) {
  throw new Error("Unable to find elements");
}

let count = 0;
function addButton() {
  const newButton = document.createElement("button");
  newButton.innerText = `Created Button ${++count}`;
  newButton.addEventListener("click", function onClick(event) {
    addButton();
  });
  child.appendChild(newButton);
}

button.addEventListener("click", function onClick() {
  addButton();
});
```

This approach works fine. I'm creating new click event listeners for each new button. A drawback to this approach is that when I was dynamically adding content, I needed to manually add the event listeners. Even though I'm not doing it here, at some point I will need to unwire these events too.

An alternative pattern is called event delegation which sounds scary but is actually just a really clever leveraging of the DOM event system. We know that an event has 3 phases: capture phase where they work down through the tree towards the target, the target phase where they go through the event target and the bubble phase where they go back up to the root event target. The event delegation pattern leverages this event flow.

Rather than adding a click event listener to the button, we can add it to the parent of the button which is the "child" element. Now, whenever a click event hits the child element it will add a button

```js
const button = document.querySelector("button");
const child = document.querySelector(".child");

if (button === null || child === null) {
  throw new Error("Unable to find elements");
}

let count = 0;
function addButton() {
  const newButton = document.createElement("button");
  newButton.innerText = `Created Button ${++count}`;
  child.appendChild(newButton);
}

child.addEventListener("click", function onClick() {
  addButton();
});
```

We're not done yet. With this, I can click anywhere in this child element to create new buttons and not just buttons. That's not what we want.
So we can add a guard and the purpose of the guard is to establish that the target of the event is a button

```js
child.addEventListener("click", function onClick() {
  if (event.target instanceof Element && event.target.tagName === "BUTTON") {
    addButton();
  }
});
```

Just a reminder, the target of the event will be where the event is heading to or the source of the event which when we click on a button will be the button. When I click on the original button, I'll see I'm now adding new buttons, and I can click on these buttons to add more buttons, but if I click somewhere else in the child element, I'm not adding a button.

These guards are a bit of a tripping point for this pattern. Say if I come over to my `index.html` and I wrap the content of my button inside of a span. When I click on the button, the tag name of the target will be span and not button, because the target of the event is the inner span and not the button outside it.
To get around this problem we can use the `.closest` API. What this will do is check if the event target is itself a button or is sitting inside a button.

```js
child.addEventListener("click", function onClick() {
  if (event.target instanceof Element && event.target.closest("button")) {
    addButton();
  }
});
```

A few other things of note. We could have added the click event listener to any parent element even the window and the behavior would still be the same. Keep in mind that the higher up in DOM tree you add the event listener, the mroe robust this guard will need to be to ensure you're matching what you're expecting to match.

The event delegation pattern is also a really interesting performance optimization. Because now rather than needing to add a new event listener to every single button, we have a single event listener for all of our buttons.

The event delegation pattern is adding an event listener higher in your event listener tree and leveraging the fact that this event listener higher in the tree will get access to where the event was traveling to, the event target.

## Create and Dispatch Synthetic Events

The browser automatically creates and dispatches events in response to user and system actions. It is also possible for you to create and dispatch your own events. Manually created events are commonly referred to as, synthetic events. Creating an event is quite straightforward.

Here I'm creating a new event by calling new and then the event constructor and passing in my event name. You can dispatch events on event targets by using the `dispatchEvent` function, which takes an event object as its only argument. On my button I've added an event listener for the hello event, which I've created here and I'm dispatching.

In my `onHello` function, I'm logging out the event to the console. If I come over here, I can see that I'm getting an event logging out. It's got the stuff in here that I roughly expect to see.

```js
const button = document.querySelector("button");
const child = document.querySelector(".child");
if (button === null || child === null) {
  throw new Error("Unable to find elements");
}

function onHello(event) {
  console.log(event);
}

button.addEventListener("hello", onHello);

const event = new Event("hello");
button.dispatchEvent(event);
```

When creating an event, we can use the event constructor passing in the name of the event we want to create, as well as an optional event init object which has three optional properties.
We have the bubbles boolean property which controls whether or not the event will have a bubble phase. It defaults to false. It also has the cancelable boolean property which dictates whether an event can be canceled. This also defaults to false. We have the composed boolean property which dictates whether an event will travel through the boundariees of a web components shadow DOM. This also defaults to false.

```js
const event = new Event("hello", {
  bubbles: false,
  cancelable: false,
  composed: false
});
```

When we dispatch an event, the `event.target` property gets set to the event target we're dispatching the event on.
button in this case. The type of the event will be set to 'hello' which matches what you pass in the event constructor.

```js
button.dispatchEvent(event);
```

DIfferent categories of events can have their own constructors. These different constructors support the 3 base event init propeties as well as event specific properties.

```js
const event = new MouseEvent("click", {
  bubbles: false,
  cancelable: false,
  composed: false,
  button: 0
});
```

You can use the event constructor to create events of lots of different types. In this case, I'm creating a click event and this will in fact get picked up by this click event listener added to the button.

```js
function onClick(event) {
  console.log(event);
}

button.addEventListener("click", onClick);
button.dispatchEvent(new Event("click"));
```

However, you cannot set any of the standard mouseEvent constructor properties, so if my `onClick` function was expecting `event.button` to be set, it's not being set there.

Even if you try this it won't pass through

```js
button.dispatchEvent(new Event("click", { button: 0 }));
```

Here, I'm dispatching an event that's created with a new mouse event constructor, which will give all of the mouse event properties their default values. You can see that event.button is getting printed out at zero, which is its default value. It's always safest to use the appropriate event constructor for a given event. That way, event listeners will always be provided with the appropriate event object for that event type.

```js
function onClick(event) {
  console.log(event.button);
}

button.addEventListener("click", onClick);
button.dispatchEvent(new Event("click", { button: 0 })); // undefined
button.dispatchEvent(new MouseEvent("click")); // 0
```

If you want to create your own domain specific events, the first-class way of doing that is using the custom event constructor. The custom event constructor is almost identical to the events constructor, except it also lets you pass in a `detail` object property in the event init object. This detail property can be any value you want.

```js
function onHello(event) {
  console.log(event);
}

button.addEventListener("hello", onHello);

const event = new CustomEvent("hello", {
  detail: { hello: "there" }
});

button.dispatchEvent(event);
```

So dispatching a click event against a button which participates in our DOM will cause the event to travel down from the window in the capture phase towards the button, through the button in the target phase and then back up to the window in the bubble phase.

To demonstrate that that is indeed happening, I've added a click event listener to the parent element, and I've added that event listener in the capture phase, as the event is going down towards the button. Inside of the onClick function, I'm going to log out the event target, which I expect to be the button element, which is the event target that we're dispatching our event against. If we come over here to the console, we'll see that our parent element was hit, so the event did go through the different phases, and the event.target property was set to the button element, which is what we expected.

```js
function onClick(event) {
  console.log("target: ", event.target);
}

parent.addEventListener("click", onClick, {
  capture: true
});

const event = new MouseEvent("click", {
  bubbles: true
});

button.dispatchEvent(event);
```

Now, the `onClick` function is going to cancel the event using `preventDefault`. So how can we find out if the event was indeed canceled? Because we have access to the event object, we can look at the event.defaultPrevented proeprty.

```js
function onClick(event) {
  event.preventDefault();
}

parent.addEventListener("click", onClick, {
  capture: true
});

const event = new MouseEvent("click", {
  bubbles: true
});

button.dispatchEvent(event);
console.log("canceled?", event.defaultPrevented); // false
```

false is not what we expected since we canceled the event. We didn't actually cancel the event because `cancelable` is `false` by default. If we override it and make it cancelable, it will be set to true.

`dispatchEvent` also returns a boolean value which represents whether an event was canceled. A true value means that the event was allowed and a false value means that the event was canceled.

```js
function onClick(event) {
  event.preventDefault();
}

parent.addEventListener("click", onClick, {
  capture: true
});

const event = new MouseEvent("click", {
  bubbles: true,
  cancelable: true
});

const allowed = button.dispatchEvent(event);
console.log("canceled?", !allowed);
```

Some event targets like HTML elements have a first class API for quickly creating and dispatching events. These APIs do not let you control the properties of the event. These shortcut APIs are quick and easy but they are also fairly limited in their flexibility and utility.

```js
button.click(); // dispatches the event equivalent to
button.dispatchEvent("click", {
  bubbles: true,
  cancelable: true,
  composed: true
});
```

When manually creating an event, the `event.isTrusted` property is set to `false`. This allows listeners to know if it was created by the browser or if it is syntehtic.

As we mentioned earlier the `event.timestamp` property is when the event is created (using `new`) and not when it is dispatched.

Most SyntheticEvents do not trigger the default browser actions associated with the event type. The exception to this rule is synthetic click events, which will trigger the default behavior for a click event.
This behavior is the same whether you dispatch the event manually or use the shortcut API.

## Deprecated Event Creation Mechanisms

```js
const deprecated = document.createEvent("Event");
// (type, bubbles, cancelable)
deprecated.initEvent("hello", true, false);

const deprecatedMouseEvent = document.createEvent("MouseEvent");
deprecatedMouseEvent.initMouseEvent(
  //type
  "click",
  //bubbles
  undefined,
  //cancelable
  undefined,
  //view
  undefined,
  //...
  //button
  1
);

const event = new MouseEvent("click", { button: 1 });
```

## Events are Dispatched Synchronously
