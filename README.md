# Panel with Routing

Things are sort of working at this point. Was running into weird behavior when the `pnl-route` component was returning null rather than an actual `vnode` when I didn't want anything rendered. Now it just returns an empty `div`.

Now this issue is on "unmounting" nested routes. For example, if you go to `#child/nested` then click a link to `#`. The following error happens:

```
Uncaught DOMException: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.
    at HTMLElement.disconnectedCallback (http://localhost:8080/bundle.js:4070:17)
    at Object.removeChild (http://localhost:8080/bundle.js:4973:10)
    at rmCb (http://localhost:8080/bundle.js:5419:21)
    at removeVnodes (http://localhost:8080/bundle.js:5504:25)
    at patch (http://localhost:8080/bundle.js:5643:17)
    at DOMPatcher.render (http://localhost:8080/bundle.js:4611:7)
    at http://localhost:8080/bundle.js:4588:28
```

which appears to be a `disconnectedCallback` running

```js
  if (this.domPatcher) {
    this.el.removeChild(this.domPatcher.el);
    this.domPatcher.disconnect();
  }
```

## Running

1. `yarn install`
2. `yarn start`
3. Open browser <http://localhost:8080/>
