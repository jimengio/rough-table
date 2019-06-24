import queryString from "query-string";

type Id = string;

function switchPath(x: string) {
  location.hash = `#${x}`;
}

function qsStringify(queries: { [k: string]: string }) {
  return queryString.stringify(queries);
}

// generated

export let genRouter = {
  basic: {
    name: "basic",
    raw: "basic",
    path: () => `/basic`,
    go: () => switchPath(`/basic`),
  },
  paginated: {
    name: "paginated",
    raw: "paginated",
    path: () => `/paginated`,
    go: () => switchPath(`/paginated`),
  },
  empty: {
    name: "empty",
    raw: "empty",
    path: () => `/empty`,
    go: () => switchPath(`/empty`),
  },
  selected: {
    name: "selected",
    raw: "selected",
    path: () => `/selected`,
    go: () => switchPath(`/selected`),
  },
  wholeBorders: {
    name: "whole-borders",
    raw: "whole-borders",
    path: () => `/whole-borders`,
    go: () => switchPath(`/whole-borders`),
  },
  home: {
    name: "home",
    raw: "home",
    path: () => `/home`,
    go: () => switchPath(`/home`),
  },
  _: {
    name: "home",
    raw: "",
    path: () => `/`,
    go: () => switchPath(`/`),
  },
};
