import { Component, ConfigOptions } from "panel";

import { CounterAttrs, CounterState } from "./types";
import template from "./index.jade";
import "./index.styl";

export default class Counter extends Component<CounterState, {}, unknown, CounterAttrs> {
  static get attrsSchema() {
    return {
      ...super.attrsSchema,
    };
  }

  get config(): ConfigOptions<CounterState> {
    return {
      template,
      defaultState: {
        count: 0,
      },
      helpers: {
        handleCounterChangeClick: (val: number) =>
          this.update(({ count }) => ({ count: count + val })),
      },
    };
  }
}

customElements.define(`hello-world`, Counter);
