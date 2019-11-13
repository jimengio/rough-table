import queryString from "query-string";

type Id = string;

function switchPath(x: string) {
  location.hash = `#${x}`;
}

function qsStringify(queries: { [k: string]: string }) {
  return queryString.stringify(queries);
}

// generated

// Generated with router-code-generator@0.2.5

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
  treeTable: {
    name: "tree-table",
    raw: "tree-table",
    path: () => `/tree-table`,
    go: () => switchPath(`/tree-table`),
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
  | GenRouterTypeTree["selected"]
  | GenRouterTypeTree["wholeBorders"]
  | GenRouterTypeTree["home"]
  | GenRouterTypeTree["wide"]
  | GenRouterTypeTree["tall"]
  | GenRouterTypeTree["treeTable"]
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
  treeTable: {
    name: "tree-table";
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
