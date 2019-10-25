import queryString from "query-string";

type Id = string;

function switchPath(x: string) {
  location.hash = `#${x}`;
}

function qsStringify(queries: { [k: string]: string }) {
  return queryString.stringify(queries);
}

// generated

// Generated with router-code-generator@0.2.4

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
  wide: {
    name: "wide",
    raw: "wide",
    path: () => `/wide`,
    go: () => switchPath(`/wide`),
  },
  tall: {
    name: "tall",
    raw: "tall",
    path: () => `/tall`,
    go: () => switchPath(`/tall`),
  },
  $: {
    name: "home",
    raw: "",
    path: () => `/`,
    go: () => switchPath(`/`),
  },
};

export type GenRouterTypeMain =
  | GenRouterTypeTree["basic"]
  | GenRouterTypeTree["paginated"]
  | GenRouterTypeTree["empty"]
  | GenRouterTypeTree["selected"]
  | GenRouterTypeTree["wholeBorders"]
  | GenRouterTypeTree["home"]
  | GenRouterTypeTree["wide"]
  | GenRouterTypeTree["tall"]
  | GenRouterTypeTree["$"];

export interface GenRouterTypeTree {
  basic: {
    name: "basic";
    params: {};
    query: {};
    next: null;
  };
  paginated: {
    name: "paginated";
    params: {};
    query: {};
    next: null;
  };
  empty: {
    name: "empty";
    params: {};
    query: {};
    next: null;
  };
  selected: {
    name: "selected";
    params: {};
    query: {};
    next: null;
  };
  wholeBorders: {
    name: "whole-borders";
    params: {};
    query: {};
    next: null;
  };
  home: {
    name: "home";
    params: {};
    query: {};
    next: null;
  };
  wide: {
    name: "wide";
    params: {};
    query: {};
    next: null;
  };
  tall: {
    name: "tall";
    params: {};
    query: {};
    next: null;
  };
  $: {
    name: "home";
    params: {};
    query: {};
    next: null;
  };
}
