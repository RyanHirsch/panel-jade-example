import { Component, h } from "panel";

import "./components/ry-example";

customElements.define(
  "example-app",
  class extends Component {
    get config() {
      return {
        defaultState: {
          value: "here",
        },
        template: () =>
          h("div.app", [
            h("div.about", [
              h(
                "p",
                `This is a sample app. The property is shadowed by the child and given a default value in both parent and child. After some time, the parent will update its state, and it will flow into the child`
              ),
            ]),
            this.child("ry-example"),
          ]),
      };
    }
    connectedCallback() {
      super.connectedCallback();
      setTimeout(() => this.update({ value: "there" }), 5000);
    }
  }
);
