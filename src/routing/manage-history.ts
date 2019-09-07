import { createHashHistory } from "history";

export interface HistoryLocation {
  pathname: string;
  search: string;
  hash: string;
}

export type HistoryAction = "PUSH" | "REPLACE" | "POP" | "INITIAL";
export type HistoryUnsubscribe = () => void;
export type ListenCallback = (location: HistoryLocation, action: HistoryAction) => void;

const history = createHashHistory({ hashType: "noslash" });

export function getLocation(): HistoryLocation {
  const { pathname, search, hash } = history.location;
  return {
    pathname,
    search,
    hash,
  };
}

export function useHistory(cb: ListenCallback): [HistoryLocation, HistoryUnsubscribe] {
  return [getLocation(), listen(cb)];
}

export function listen(cb: ListenCallback): HistoryUnsubscribe {
  const unsubscribe = history.listen(cb);
  cb(getLocation(), "INITIAL");
  return unsubscribe;
}

export function push(path: string) {
  return history.push(path);
}

export function replace(path: string) {
  return history.replace(path);
}
