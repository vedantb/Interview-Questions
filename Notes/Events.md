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

Different element types allow different event handler attributes to be set. Window, document, and all HTML elements implement the GlobalEventHandlers mixin which provides a common set of HTML event handler attributes like onClick and onLoad.

HTML event handler attributes are a way to define an EventListener in the bubble phase of an event. You cannot use these types of EventListener bindings to listen to events in the capture phase of an event.

This style of event binding is also known as a DOM-0 event handler and is referred to as event handler content attributes in formal specifications.

A HTML event handler attributes string can be any JavaScript function body. That is any code, you would normally be able to put inside of a function. There are some fairly magic values that you can use in your HTML event handler attributes string.

You get access to an event object, which represents the ActiveEvent. This runtime context of your function is set to the element that the event handler is bound to, which in our case, is the button element.

You can think about how your attribute string is executed by looking at this approximation. Here I have an `execute` function, which takes an `event` as its only argument. Then inside of the `execute` function, I'm calling `eval` and then passing in a string, in this case, `console.log` this element.

Now, here I have the `execute` function. I'm going to do `.call` which lets me set the this context for the function and I'm going to set it to be the `button` element. Then I'm going to pass in as the argument to the function, a fake event that I've created.

A helpful way to think about how your code is executed inside of HTML attributes is that your code's going to run in here. It's going to be provided with an event object and it's this context is going to be set to be the element that the event handler was bound to.

Within HTML event handler attributes, you can execute any function body you like. However, it is common to execute a named function that you have defined somewhere else. In this case, I'm trying to call a `myOnClick` function.

In order for this code to work, I have a function named `myOnClick` accessible on the global scope. If the function you are trying to call from within your html attribute event handler does not exist on the global scope, then a `ReferenceError` will be thrown when your attribute string is executed.

One way for a function to be available on the global scope is to define it at the root level, which means not putting your function inside of any other scopes. You can see that my `myOnClick` function has been added to the global window object.

Here, I have a function called outer, and inside it, I'm declaring a function called in an inner scope. In an inner scope is not accessible on the global scope. It is hidden inside of the scope that the outer function has created, so I cannot look up in an inner scope on the window object.

When I'm trying to look up the in an inner scope function in the global scope, it doesn't exist. It's coming up as `undefined`.

A bug can occur with this approach of creating global functions when you minify your code. Code minifiers will commonly mangle function names to ensure the smallest amount of code is sent over the wire to your users. Unfortunately, this can break your attempts to use a named function in the global scope.

In this case, my function name has been mangled to the character `a`, however, over in my html, I'm still trying to call `myOnClick`, which no longer exists. Because of the minifier, I've broken the link between my html and my JavaScript file. Modern minifiers commonly won't mangle root level function names. Not mangling root level function names is not a guarantee for every minifier that will ever exist. Also, you might change an option for a minifier that can result in top-level function names being mangled without you realizing.

A safer option for defining functions in the global scope is to add a named property to the global window object directly. Minifiers should not minify object properties. You can sidestep the function name mangling concern by using this approach. Attaching functions to the window directly also lets you write your global functions inside of nested scopes, which is pretty commonplace in module systems.

Here, I have a function called outer, which is creating a new scope. Inside of that function, I am assigning a `myOnClick` property to the global window object directly in order to expose this function in the global scope.

Generally speaking, for clarity, I recommend explicitly attaching something to the window if you want it to be in the global scope. Then it doesn't matter where the code is actually placed in your application.

Now, let's say you have everything wired up and working correctly. A challenge with HTML event handler attributes is that it is easy to accidently break the link between the HTML attribute string and any global functions that it is calling.

Let's say, as part of array factor, I'm changing the name of `myOnClick` to `buttonClick`. I have now broken the link between my HTML file, which is expecting a global function named `myOnClick`. Now my global function, `myOnClick` doesn't exist. It's now called `buttonClick`. Now, I'm going to get a `ReferenceError`, because `myOnClick` doesn't exist on the global scope.

These types of broken links are easy to do, because the only thing linking your HTML event handler attribute to your global function is the name of the function. Broken links can be hard to spot in a codebase unless you have additional tooling, such as automated tests that are executing the events.

Another gotcha I've bumped into a few times using HTML event handler attributes is forgetting to actually execute a global function that you're trying to call. While this code may look right, it's not actually executing the `myOnClick` function.

If we come back to my approximation of what the browser is doing with our event handler attributes, if I am passing in `myOnClick` into my eval function, that actually becomes an identifier, `myOnClick`, which doesn't do anything by itself.

Some other drawbacks of HTML attribute event handlers is that you can only add a single event handler attribute of a particular event type. We can only have one `onClick` handler to listen for click events, which sucks at scale.

With this approach, you can also end up with larger HTML files as you are sprinkling lots of JavaScript in your HTML, sometimes repeating yourself a fair bit. However, compression such as Gzip does reduce the cost of any repetition. In order to remove a HTML attribute event handler, all you need to do is remove the attribute.

To get access to the `button` HTML element, I am calling `document.querySelector` and passing in the string `button`, which is a type selector and will match elements with the `button.nodeName`. QuerySelector can return `null` if no elements are found that match the provided selector.

Before I use the result of my querySelector call, I am doing a null check. In this case, I am going to throw an error if I couldn't find a button. If my program continues on past the guard, then I know I have a button HTML element and I can interact with it safely.
