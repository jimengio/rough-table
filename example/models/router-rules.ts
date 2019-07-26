import { IRouteRule } from "@jimengio/ruled-router";

export const routerRules: IRouteRule[] = [
  { path: "basic" },
  { path: "paginated" },
  { path: "empty" },
  { path: "selected" },
  { path: "whole-borders" },
  { path: "home" },
  { path: "wide" },
  { path: "tall" },
  { path: "", name: "home" },
];
