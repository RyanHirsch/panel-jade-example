import { Component, h } from "panel";
import { register } from "../safe-register";

export function createDummy(
  name: string,
  content: string = `This is dummy-${name} component.`,
  options = {}
) {
  class Dummy extends Component<{}, {}, unknown, {}> {
    get config() {
      return {
        defaultState: {},
        template: () => h("div", options, content),
      };
    }
  }

  register(`dummy-${name}`, Dummy);
}
