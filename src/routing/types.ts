export interface RoutableAttrs {
  "route-is-exact": boolean;
  "route-url": string;
  "route-path": string;
}

export const routableAttrsSchema = {
  "route-is-exact": `boolean`,
  "route-url": `string`,
  "route-path": `string`,
};
