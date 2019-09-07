import { Component, ConfigOptions, h } from "panel";

import { register } from "../safe-register";
import { useHistory, HistoryLocation } from "./manage-history";
import matchPath from "./match-path";
import { debug } from "../logger";

const kebab = (string: string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

interface PnlRouteAttributes {
  path: string;
  exact: boolean;
  element?: string;
}

interface PnlRouteState {
  location: HistoryLocation | null;
  template?: any;
}

export default class PnlRoute extends Component<PnlRouteState, {}, {}, PnlRouteAttributes> {
  static get attrsSchema() {
    return {
      ...super.attrsSchema,
      path: "string",
      exact: "boolean",
      element: "string",
    };
  }
  get config(): ConfigOptions<PnlRouteState, {}, PnlRouteAttributes> {
    return {
      defaultState: {
        location: null,
        template: null,
      },
      helpers: {
        isMatch: () => {
          const pathname = this.state.location ? this.state.location.pathname : null;
          const options = {
            path: this.attr("path"),
            exact: this.attr("exact"),
          };
          return matchPath(pathname, options);
        },
      },
      template: ({ $attr, $helpers }) => {
        const element = $attr("element");
        const template = this.state.template;
        const match = $helpers.isMatch();

        const path = this.attr("path");
        const isExact = this.attr("exact");
        debug({ currentPath: location.pathname, lookingFor: path, isExact, match });

        return match
          ? element
            ? h(element, {
                attrs: Object.entries(match.params).reduce(
                  (agg, [key, val]) => ({ ...agg, [kebab(key)]: val }),
                  {
                    "route-is-exact": match.isExact,
                    "route-url": match.url,
                    "route-path": match.path,
                  }
                ),
              })
            : template({
                route: { isExact: match.isExact, url: match.url, path: match.path },
                ...match.params,
              })
          : h("div");
      },
    };
  }

  constructor() {
    super();
    useHistory(location => {
      this.update({ location });
    });
  }

  set template(val: any) {
    this.update({ template: val });
  }
}

register("pnl-route", PnlRoute);
