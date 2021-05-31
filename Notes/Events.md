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
