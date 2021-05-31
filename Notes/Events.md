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
