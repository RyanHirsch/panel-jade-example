import { Component, ConfigOptions } from "panel";

import { State, Attrs } from "./types";
import template from "./template.jade";

export default class JadeExample extends Component<State, {}, unknown, Attrs> {
  get config(): ConfigOptions<State> {
    return {
      defaultState: {
        value: "eleventy",
      },
      template,
    };
  }
}

customElements.define("jade-example", JadeExample);
