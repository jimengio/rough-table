import { ReactNode } from "react";
import { isFunction } from "lodash-es";

type FuncCellRenderer = (value: any, options: any) => ReactNode;

let cellRenderers: { [k: string]: FuncCellRenderer } = {};

export let registerRoughTableRenderer = (type: string, f: FuncCellRenderer) => {
  if (cellRenderers[type] != null) {
    console.warn("[RoughTable] overwriting render type", type, cellRenderers[type], f);
  }
  cellRenderers[type] = f;
};

export let getTableRenderer = (type: string): FuncCellRenderer => {
  if (isFunction(cellRenderers[type])) {
    return cellRenderers[type];
  }
  console.warn("[RoughTable] unknown render type", JSON.stringify(type), "among", Object.keys(cellRenderers), "resolved to", cellRenderers[type]);
  return null;
};
