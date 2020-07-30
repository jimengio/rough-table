import queryString from "query-string";

type Id = string;

function switchPath(x: string) {
  location.hash = `#${x}`;
}

function qsStringify(queries: { [k: string]: string }) {
  return queryString.stringify(queries);
}

// generated

// Generated with router-code-generator@0.2.7

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
  rowResizing: {
    name: "row-resizing",
    raw: "row-resizing",
    path: () => `/row-resizing`,
    go: () => switchPath(`/row-resizing`),
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
  actionLinks: {
    name: "action-links",
    raw: "action-links",
    path: () => `/action-links`,
    go: () => switchPath(`/action-links`),
  },
  columnWidth: {
    name: "column-width",
    raw: "column-width",
    path: () => `/column-width`,
    go: () => switchPath(`/column-width`),
  },
  loading: {
    name: "loading",
    raw: "loading",
    path: () => `/loading`,
    go: () => switchPath(`/loading`),
  },
  configure: {
    name: "configure",
    raw: "configure",
    path: () => `/configure`,
    go: () => switchPath(`/configure`),
  },
  emptyPlaceholder: {
    name: "empty-placeholder",
    raw: "empty-placeholder",
    path: () => `/empty-placeholder`,
    go: () => switchPath(`/empty-placeholder`),
  },
  customTheme: {
    name: "custom-theme",
    raw: "custom-theme",
    path: () => `/custom-theme`,
    go: () => switchPath(`/custom-theme`),
  },
  registeredRenderer: {
    name: "registered-renderer",
    raw: "registered-renderer",
    path: () => `/registered-renderer`,
    go: () => switchPath(`/registered-renderer`),
  },
  alignToRight: {
    name: "align-to-right",
    raw: "align-to-right",
    path: () => `/align-to-right`,
    go: () => switchPath(`/align-to-right`),
  },
  $: {
    name: "home",
    raw: "",
    path: () => `/`,
    go: () => switchPath(`/`),
  },
};

/** Deprecating, use GenRouterTypeTree["next"] instead */
export type GenRouterTypeMain = GenRouterTypeTree["next"];

export interface GenRouterTypeTree {
  next:
    | GenRouterTypeTree["basic"]
    | GenRouterTypeTree["paginated"]
    | GenRouterTypeTree["selected"]
    | GenRouterTypeTree["wholeBorders"]
    | GenRouterTypeTree["home"]
    | GenRouterTypeTree["wide"]
    | GenRouterTypeTree["rowResizing"]
    | GenRouterTypeTree["tall"]
    | GenRouterTypeTree["treeTable"]
    | GenRouterTypeTree["actionLinks"]
    | GenRouterTypeTree["columnWidth"]
    | GenRouterTypeTree["loading"]
    | GenRouterTypeTree["configure"]
    | GenRouterTypeTree["emptyPlaceholder"]
    | GenRouterTypeTree["customTheme"]
    | GenRouterTypeTree["registeredRenderer"]
    | GenRouterTypeTree["alignToRight"]
    | GenRouterTypeTree["$"];
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
  rowResizing: {
    name: "row-resizing";
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
  actionLinks: {
    name: "action-links";
    params: {};
    query: {};
    next: null;
  };
  columnWidth: {
    name: "column-width";
    params: {};
    query: {};
    next: null;
  };
  loading: {
    name: "loading";
    params: {};
    query: {};
    next: null;
  };
  configure: {
    name: "configure";
    params: {};
    query: {};
    next: null;
  };
  emptyPlaceholder: {
    name: "empty-placeholder";
    params: {};
    query: {};
    next: null;
  };
  customTheme: {
    name: "custom-theme";
    params: {};
    query: {};
    next: null;
  };
  registeredRenderer: {
    name: "registered-renderer";
    params: {};
    query: {};
    next: null;
  };
  alignToRight: {
    name: "align-to-right";
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
