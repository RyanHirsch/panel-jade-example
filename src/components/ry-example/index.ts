import { Component, ConfigOptions } from "panel";

import { State, Attrs } from "./types";
import template from "./template.jade";

export default class RyExample extends Component<State, {}, unknown, Attrs> {
  get config(): ConfigOptions<State> {
    return {
      defaultState: {
        value: "eleventy",
      },
      template,
    };
  }
}

customElements.define("ry-example", RyExample);
