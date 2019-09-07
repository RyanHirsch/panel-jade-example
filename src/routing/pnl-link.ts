import { Component, ConfigOptions, h } from "panel";

import { register } from "../safe-register";
import { push, replace, useHistory } from "./manage-history";

function isModifiedEvent(event: any) {
  return Boolean(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

interface PnlLinkState {
  currentPath: string;
}

interface PnlLinkAttributes {
  to: string;
  replace: boolean;
  target?: string;
}

export default class PnlLink extends Component<PnlLinkState, {}, {}, PnlLinkAttributes> {
  static get attrsSchema() {
    return {
      ...super.attrsSchema,
      to: "string",
      target: "string",
      replace: "boolean",
    };
  }
  get config(): ConfigOptions<PnlLinkState, {}, PnlLinkAttributes> {
    return {
      useShadowDom: true,
      defaultState: {
        currentPath: "",
      },
      helpers: {
        getDesiredLocation: () => {
          const to = this.attr("to");
          const currentLocation = this.state.currentPath;
          return to.startsWith("/")
            ? to
            : currentLocation.endsWith(to)
            ? currentLocation
            : `${currentLocation}/${to}`;
        },
        handleClick: (ev: any) => {
          const target = this.attr("target");
          const replaceLocation = this.attr("replace");
          const currentLocation = this.state.currentPath;
          const desiredLocation = this.helpers!.getDesiredLocation();
          if (
            !ev.defaultPrevented && // onClick prevented default
            ev.button === 0 && // ignore everything but left clicks
            (!target || target === "_self") && // let browser handle "target=_blank" etc.
            !isModifiedEvent(ev) // ignore clicks with modifier keys
          ) {
            ev.preventDefault();
            if (currentLocation !== desiredLocation) {
              if (replaceLocation) {
                replace(desiredLocation);
              } else {
                push(desiredLocation);
              }
            }
          }
        },
      },

      template: ({ $attr, $helpers }) => {
        const target = $attr("target");
        return h(
          "a",
          {
            attrs: {
              href: `#${$helpers.getDesiredLocation().substr(1)}`,
              target: target || undefined,
            },
            on: {
              click: $helpers.handleClick,
            },
          },
          [h("slot")]
        );
      },
    };
  }

  constructor() {
    super();
    useHistory(({ pathname }) => this.update({ currentPath: pathname }));
  }
}

register("pnl-link", PnlLink);
