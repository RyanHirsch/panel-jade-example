import { Component, ConfigOptions, h } from "panel";

import { RoutableAttrs, routableAttrsSchema } from "../../routing/types";

import { createDummy } from "../dummy";
import { State, Attrs } from "./types";
import template from "./template.jade";

createDummy("child");

export default class ChildExample extends Component<State, {}, unknown, Attrs & RoutableAttrs> {
  static get attrsSchema() {
    return {
      ...super.attrsSchema,
      ...routableAttrsSchema,
    };
  }
  get config(): ConfigOptions<State, {}, Attrs & RoutableAttrs> {
    return {
      defaultState: {},
      template,
      helpers: {
        exact: () => h("h1", `Exactly here!`),
      },
    };
  }
}

customElements.define("child-example", ChildExample);
