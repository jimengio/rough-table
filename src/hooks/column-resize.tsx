import React, { useState, ReactNode, useRef } from "react";
import { useAtom } from "@jimengio/rex";

export let useColumnResize = () => {
  // Model

  let containerRef = useRef(null as HTMLDivElement);
  let sizesAtom = useAtom({} as { [k: string]: number });
  let movingStateAtom = useAtom(false);

  // Plugins

  // Controller

  return {
    containerRef,
    /** get column with by index */
    getSize: (idx: number) => {
      let sizeState = sizesAtom.current;
      // console.log("reading", i, sizeState);
      return sizeState[idx];
    },
    isMoving: () => {
      return movingStateAtom.current;
    },
    handleMouseDown: (idx: number, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      let el = containerRef.current.children[idx] as HTMLDivElement;
      // Caution, might have bugs in some very special cases, column item altering
      let slibling = containerRef.current.children[idx + 1] as HTMLDivElement;

      movingStateAtom.resetWith(true);

      let getBasis = (el: HTMLElement) => {
        return parseInt(el.style.flexBasis) || parseInt(getComputedStyle(el).flexBasis);
      };

      let width0 = el != null ? getBasis(el) || 200 : 200;
      let width1 = slibling != null ? getBasis(el) || 200 : 200;

      let x0 = event.clientX;

      let listener = (moveEvent: MouseEvent) => {
        let dx = moveEvent.clientX - x0;

        sizesAtom.swapWith((state) => {
          let newWidth = Math.round(width0 + dx);
          // seize with from right sibling column
          let newWidth1 = Math.round(width1 - dx);

          state[idx] = Math.max(20, newWidth);
          state[idx + 1] = Math.max(20, newWidth1);
        });
      };

      window.addEventListener("mouseup", () => {
        window.removeEventListener("mousemove", listener);
        movingStateAtom.resetWith(false);
      });

      window.addEventListener("mousemove", listener);
    },
  };
};
