export function register(name: string, componentClass: Function) {
  if (!customElements.get(name)) {
    customElements.define(name, componentClass);
  } else {
    console.warn(`Attempted to redefine custom element ${name}`);
  }
  return componentClass;
}
