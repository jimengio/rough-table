import React, { useState, ReactNode, useRef } from "react";
import { useAtom, connectRex } from "@jimengio/rex";

/** Provide controls for column sizes */
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
      return sizeState[idx];
    },
    isMoving: () => {
      return movingStateAtom.current;
    },
    /** reset sizes when necessary, especially when page got resized, static sizes is not consistent */
    resetSizeStates: () => {
      sizesAtom.resetWith({});
    },
    handleMouseDown: (idx: number, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      let el = containerRef.current.children[idx] as HTMLDivElement;
      // Caution, might have bugs in some very special cases, column item altering
      let slibling = containerRef.current.children[idx + 1] as HTMLDivElement;

      movingStateAtom.resetWith(true);

      sizesAtom.swapWith((sizes) => {
        let children = containerRef.current.children;
        for (let i in children) {
          let child = children[i] as HTMLDivElement;
          // read and store all column widths, bypass jumpy flexible widths
          sizes[i] = child.offsetWidth;
        }
      });

      let width0 = el?.offsetWidth ?? 200;
      let width1 = slibling?.offsetWidth ?? 200;

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
          state[idx + 1] = slibingWidth;
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
