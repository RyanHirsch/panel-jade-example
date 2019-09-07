// *.styl files are extracted into separate .css files and don't export anything
// for shadow dommed components, they need `import css from 'index.styl?inline'`
declare module "*.styl?inline" {
  //
  const css: any;
  export default css;
}

// typescript is silently failing trying to import {VNode} from 'snabbdom/vnode'
// this fails the module declaration and causes compilation issues
// leaving the declaration as (any) => any function for the moment.
declare module "*.jade" {
  const template: (scope: any) => any;
  export default template;
}

declare module "*.pug" {
  const template: (scope: any) => any;
  export default template;
}

declare module "*.svg" {
  const svg: string;
  export default svg;
}
