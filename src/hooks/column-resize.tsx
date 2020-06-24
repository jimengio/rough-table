import React, { useState, ReactNode, useRef, useEffect } from "react";
import { useAtom, connectRex } from "@jimengio/rex";
import { css, cx } from "emotion";
import { GlobalThemeVariables } from "../theme";

/** Provide controls for column sizes */
export let useColumnResize = () => {
  // Model

  let containerRef = useRef(null as HTMLDivElement);
  let sizesAtom = useAtom({} as { [k: string]: number });
  let movingStateAtom = useAtom(false);

  // Plugins

  // Methods

  let handleMouseDown = (idx: number, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    let headercolumns = containerRef.current.children;
    let el = headercolumns[idx] as HTMLDivElement;
    // Caution, might have bugs in some very special cases, column item altering
    let tailChild = containerRef.current.lastElementChild as HTMLDivElement;

    movingStateAtom.resetWith(true);

    sizesAtom.swapWith((sizes) => {
      let children = headercolumns;
      for (let i in children) {
        let child = children[i] as HTMLDivElement;
        // read and store all column widths, bypass jumpy flexible widths
        sizes[i] = child.offsetWidth;
      }
    });

    let width0 = el?.offsetWidth ?? 200;
    let width1 = tailChild?.offsetWidth ?? 200;

    let x0 = event.clientX;

    let listener = (moveEvent: MouseEvent) => {
      let dx = moveEvent.clientX - x0;

      let newWidth = Math.round(width0 + dx);
      // seize with from right sibling column
      let slibingWidth = Math.round(width1 - dx);

      if (newWidth < 40 || slibingWidth < 40) {
        // meaningless when column width is too small
        return;
      }

      sizesAtom.swapWith((state) => {
        state[idx] = newWidth;
        state[headercolumns.length - 1] = slibingWidth;
      });
    };

    window.addEventListener("mouseup", () => {
      window.removeEventListener("mousemove", listener);
      movingStateAtom.resetWith(false);
    });

    window.addEventListener("mousemove", listener);
  };

  // Effects

  useEffect(() => {
    /** reset sizes when necessary, especially when page got resized, static sizes is not consistent */
    let onResize = () => {
      sizesAtom.resetWith({});
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // View

  let renderResizer = (idx: number) => {
    return (
      <div
        className={cx(styleResizeDragger, GlobalThemeVariables.resizeDragger)}
        onMouseDown={(event) => {
          handleMouseDown(idx, event);
        }}
      />
    );
  };

  // Controller

  return {
    containerRef,
    /** get column with by index */
    getSize: (idx: number) => {
      let sizeState = sizesAtom.current;
      return sizeState[idx];
    },
    isMoving: () => {
      return movingStateAtom.current;
    },
    resetSizeStates: () => {
      sizesAtom.resetWith({});
    },
    renderResizer,
    handleMouseDown,
  };
};

let styleResizeDragger = css`
  width: 2px;
  height: 14px;
  cursor: col-resize;
  border-right: 1px solid hsl(216, 14%, 93%);
  margin-right: -6px; /** since padding-right:8px */
`;
