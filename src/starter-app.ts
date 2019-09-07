import { Component, h } from "panel";

import "./components/jade-example";

class StarterApp extends Component<{}, {}, unknown, {}> {
  get config() {
    return {
      defaultState: {},
      template: () =>
        h("div.app", [h("div.about", [h("p", `This is a sample app.`)]), h("jade-example")]),
    };
  }
}

customElements.define("starter-app", StarterApp);
