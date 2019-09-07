import { Component, ConfigOptions } from "panel";

import { createDummy } from "../dummy";
import { State, Attrs } from "./types";
import template from "./template.jade";

import "../child-example";

createDummy("foo", "This is really the home component");
createDummy("bar", "This is a different component for BAR");
createDummy("baz", "BAAZZ!!!");

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
