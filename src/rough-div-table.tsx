/** DivTable layouts with Flexbox
 * to render data with plenty of columns, use ScrollTable
 */

import React, { FC, ReactNode, CSSProperties, useRef, useState, useEffect, useLayoutEffect, Ref, MutableRefObject } from "react";
import { css, cx } from "emotion";
import { center, column, rowParted, row, expand } from "@jimengio/flex-styles";
import Pagination from "antd/lib/pagination";
import { PaginationProps } from "antd/lib/pagination";
import { ISimpleObject } from "./types";
import { mergeStyles, getWidthStyle, EmptyCell } from "./common";
import { LoadingIndicator, ClampText, IClampTextProps } from "@jimengio/jimo-basics";
import { CSSTransition } from "react-transition-group";
import EmptyPlaceholder from "./empty-placeholder";
import { useColumnResize } from "./hooks/column-resize";
import { GlobalThemeVariables } from "./theme";
import { getTableRenderer } from "./registered-renderer";
import { isFunction } from "lodash-es";

interface IColumnClampTextProps extends Partial<IClampTextProps> {
  text?: React.ReactNode;
}

export interface IRoughTableColumn<T = ISimpleObject> {
  title: ReactNode;
  hidden?: boolean;
  alignToRight?: boolean;
  clampText?: boolean;
  clampTextProps?: IColumnClampTextProps;
  width?: number | string;
  className?: string;
  style?: CSSProperties;
  dataIndex: keyof T;
  /** cell renderer in body
   * @param value
   * @param record, data of item
   * @param itemIndex, index of item in data list
   */
  render?: (value: any, record: T, itemIndex?: number) => ReactNode;
  /** for registered renderers */
  renderType?: string;
  renderOptions?: object;
}

type RoughDivTableProps<T = any> = FC<{
  className?: string;
  data: T[];
  /** Displayed in headers */
  columns: IRoughTableColumn<T>[];
  /** left/right padding in each row */
  rowPadding?: number;
  bodyClassName?: string;
  theme?: Partial<
    Pick<typeof GlobalThemeVariables, "cell" | "row" | "rowSelected" | "headerRow" | "resizeDragger" | "loadingCover" | "loadingDot" | "emptyPlaceholder">
  >;
  /** current need is to compute row color based on row index */
  customBodyRowStyle?: (idx: number) => CSSProperties;

  /** specical element to insert at body top and bottom, special style for scrolling table */
  bodyScrollingPad?: (position: "top" | "bottom") => ReactNode;
  /** ref to expose body scroll element */
  bodyRef?: MutableRefObject<HTMLDivElement>;

  rowKey?: keyof T;
  /** use `rowKey` to specify which field is used as row id */
  selectedKeys?: string[];
  onRowClick?: (record: any) => void;

  pageOptions?: PaginationProps;

  /** Default locale is "no data" */
  emptyLocale?: string;
  /** Display empty symbol rather than set it transparent */
  showEmptySymbol?: boolean;
  wholeBorders?: boolean;

  isLoading?: boolean;
  loadingElement?: React.ReactNode;

  /** detect and watch row width, try to make sure container div covers the whole row.
   * watching window resize might casuse performance issues. be careful in using.
   */
  watchRowResizing?: boolean;
}>;

let RoughDivTable: RoughDivTableProps = (props) => {
  let scrollRef = useRef<HTMLDivElement>();

  let [rowMinWidth, setRowMinWidth] = useState(0);

  let [scrollSize, setScrollSize] = useState(0);

  let columnResizePlugin = useColumnResize();
  /** this element MUST container header columns, and children can be accessed by index.
   * 注意: 当前节点对应 header columns 的容易节点, 使用 index 能直接访问 childrenNodes.
   */
  let headerRef = useRef(null as HTMLDivElement);

  let configuredProps = RoughDivTable.defaultProps;

  /** Methods */

  let handleScroll = () => {
    let leftOffset = scrollRef.current.scrollLeft;
    headerRef.current.scrollLeft = leftOffset;
  };

  let checkRowWidth = () => {
    let someMinWidth: number;
    if (headerRef.current.scrollWidth > headerRef.current.clientWidth) {
      someMinWidth = headerRef.current.scrollWidth;
    }
    setRowMinWidth(someMinWidth);
  };

  /** Effects */

  useEffect(() => {
    if (props.watchRowResizing) {
      checkRowWidth();
    }
  });

  useEffect(() => {
    if (props.watchRowResizing) {
      let onResize = () => {
        checkRowWidth();
      };
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
      };
    }
  }, []);

  // align widths of header columns and body columns by fixed scrollbar area
  useLayoutEffect(() => {
    let scrollbarWidth = scrollRef.current.offsetWidth - scrollRef.current.clientWidth;
    // change size as fast as possible, in case of shaking
    headerRef.current.style.paddingRight = `${(props.rowPadding ?? configuredProps.rowPadding) + scrollbarWidth}px`;
    if (scrollbarWidth !== scrollSize) {
      setScrollSize(scrollbarWidth);
    }
  });

  /** Renderers */

  let renderPagination = () => {
    let { pageOptions } = props;
    return (
      <div className={stylePageArea}>
        <div className={rowParted}>
          <span />
          <Pagination
            size={pageOptions.size || "small"}
            showQuickJumper={pageOptions.showQuickJumper != null ? pageOptions.showQuickJumper : true}
            {...pageOptions}
          />
        </div>
      </div>
    );
  };

  const { selectedKeys, rowPadding = configuredProps.rowPadding, rowKey = "id" } = props;
  let columns = props.columns.filter((col) => col != null && !col.hidden);

  let hasData = props.data?.length > 0;

  let rowPaddingStyle: CSSProperties = {};
  let headerRowPaddingStyle: CSSProperties = {};
  if (rowPadding != null) {
    rowPaddingStyle = { paddingLeft: rowPadding, paddingRight: rowPadding };
    headerRowPaddingStyle = { paddingLeft: rowPadding, paddingRight: rowPadding + scrollSize };
  }

  let showEmptySymbol = props.showEmptySymbol != null ? props.showEmptySymbol : configuredProps.showEmptySymbol;
  let wholeBorders = props.wholeBorders != null ? props.wholeBorders : configuredProps.wholeBorders;

  let getDraggerStyle = (idx: number) => {
    return { flexBasis: columnResizePlugin.getSize(idx) };
  };

  let headElements = (
    <div
      className={cx(row, styleRow, GlobalThemeVariables.row, props.theme?.row, styleHeaderBar, GlobalThemeVariables.headerRow, props.theme?.headerRow)}
      style={mergeStyles(headerRowPaddingStyle, { cursor: columnResizePlugin.isMoving() ? "col-resize" : undefined })}
      ref={(el) => {
        columnResizePlugin.containerRef.current = el;
        headerRef.current = el;
      }}
    >
      {columns.map((columnConfig, idx) => {
        // do not show resizer after last column
        let showResizer = idx < columns.length - 1;

        return (
          <div
            key={idx}
            className={cx(
              rowParted,
              styleCell,
              columnConfig.alignToRight && styleAlignRight,
              GlobalThemeVariables.cell,
              props.theme?.cell,
              columnConfig.className
            )}
            style={mergeStyles(getWidthStyle(columnConfig.width), columnConfig.style, getDraggerStyle(idx))}
          >
            {columnConfig.title || <EmptyCell showSymbol />}
            {showResizer ? columnResizePlugin.renderResizer(idx, props.theme?.resizeDragger) : null}
          </div>
        );
      })}
    </div>
  );

  let bodyElements: ReactNode = props.isLoading ? (
    <div className={styleLoadingEmpty} />
  ) : (
    <EmptyPlaceholder emptyLocale={props.emptyLocale || configuredProps.emptyLocale} className={cx(styleAreaBottom, props.theme?.emptyPlaceholder)} />
  );

  if (hasData) {
    bodyElements = props.data?.map((record, idx) => {
      let rowStateClassName: string;
      if (selectedKeys != null && selectedKeys.includes(record[rowKey])) {
        rowStateClassName = cx(styleSelectedRow, GlobalThemeVariables.rowSelected, props.theme?.rowSelected);
      }

      return (
        <div
          key={idx}
          className={cx(row, styleRow, GlobalThemeVariables.row, props.onRowClick != null && styleCursorPointer, props.theme?.row, rowStateClassName)}
          style={mergeStyles({ minWidth: rowMinWidth }, rowPaddingStyle, props.customBodyRowStyle?.(idx))}
          onClick={props.onRowClick != null ? () => props.onRowClick(record) : null}
        >
          {columns.map((columnConfig, colIdx) => {
            let textValue = record[columnConfig.dataIndex as string];
            let renderedValue: ReactNode = textValue;

            if (columnConfig.render != null) {
              renderedValue = columnConfig.render(textValue, record, idx);
            }

            renderedValue = (() => {
              if (renderedValue == null || renderedValue === "") {
                return <EmptyCell showSymbol={showEmptySymbol} />;
              }
              if (columnConfig.clampText) {
                return <ClampText addTooltip={true} {...columnConfig.clampTextProps} text={renderedValue} tooltipText={textValue} />;
              }
              /** if render function is present, do not activate renderType */
              if (columnConfig.render == null && columnConfig.renderType != null) {
                let renderFn = getTableRenderer(columnConfig.renderType);
                if (isFunction(renderFn)) {
                  return renderFn(textValue, columnConfig.renderOptions || {});
                }
                return renderedValue;
              }

              return renderedValue;
            })();

            return (
              <div
                key={colIdx}
                className={cx(styleCell, columnConfig.alignToRight && styleAlignRight, GlobalThemeVariables.cell, props.theme?.cell, columnConfig.className)}
                style={mergeStyles(getWidthStyle(columnConfig.width), columnConfig.style, getDraggerStyle(colIdx))}
              >
                {renderedValue}
              </div>
            );
          })}
        </div>
      );
    });
  }

  return (
    <>
      <div className={cx(expand, column, styleTable, wholeBorders ? styleWholeBorders : null, props.className)} data-area="rough-table">
        {headElements}
        <div
          ref={(el) => {
            scrollRef.current = el;
            if (props.bodyRef != null) {
              props.bodyRef.current = el;
            }
          }}
          className={cx(styleBody, props.bodyClassName)}
          onScroll={(event) => handleScroll()}
        >
          {props.bodyScrollingPad?.("top")}
          {bodyElements}
          {props.bodyScrollingPad?.("bottom")}
        </div>

        {props.isLoading ? (
          <>
            {configuredProps.loadingElement ? (
              <div className={cx(center, styleCover)}>{configuredProps.loadingElement}</div>
            ) : (
              <>
                {props.loadingElement ? (
                  <div className={cx(center, styleCover, GlobalThemeVariables.loadingCover, props.theme?.loadingCover)}>{props.loadingElement}</div>
                ) : (
                  <CSSTransition in={props.isLoading} timeout={200} classNames="fade-in-out" unmountOnExit>
                    <div className={cx(center, styleCover, GlobalThemeVariables.loadingCover, props.theme?.loadingCover)}>
                      <LoadingIndicator dotClassName={cx(GlobalThemeVariables.loadingDot, props.theme?.loadingDot)} />
                    </div>
                  </CSSTransition>
                )}
              </>
            )}
          </>
        ) : null}
      </div>
      {props.pageOptions != null ? renderPagination() : null}
    </>
  );
};

let customizableDefaultProps = {
  rowPadding: 24,
  emptyLocale: undefined as string,
  showEmptySymbol: false,
  wholeBorders: false,
  loadingElement: undefined as ReactNode,
};

RoughDivTable.defaultProps = customizableDefaultProps;

/** 页面级别添加 DivTable 组件的默认值 */
export let configureDivTableProps = (props: Partial<typeof customizableDefaultProps>) => {
  Object.assign(RoughDivTable.defaultProps, props);
};

export default RoughDivTable;

const styleCell = css`
  padding: 10px 8px;
  line-height: 20px;
  flex-basis: 100px;
  flex-shrink: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
`;

const styleHeaderBar = css`
  font-weight: bold;
  background-color: hsla(0, 0%, 97%, 1);
  border: none;
  border-bottom: 1px solid hsla(216, 14%, 93%, 1);
  overflow: hidden;
  color: hsla(0, 0%, 20%, 1);
  user-select: none;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const styleBody = css`
  color: rgba(0, 0, 0, 0.65);
  flex: 1;
  overflow-y: auto;
`;

const styleRow = css`
  padding-left: 80px;
  border-bottom: 1px solid hsla(0, 0%, 91%, 1);
  width: 100%;
  color: hsla(0, 0%, 20%, 1);
  transition-property: background-color;
  transition-duration: 240ms;

  &:hover {
    background-color: hsla(220, 53%, 97%, 1);
  }
`;

let styleWholeBorders = css`
  border-left: 1px solid #e5e5e5;
  border-right: 1px solid #e5e5e5;
  border-top: 1px solid #e5e5e5;
`;

const styleCursorPointer = css`
  cursor: pointer;
`;

const styleSelectedRow = css`
  background-color: hsla(220, 53%, 97%, 1);
`;

let stylePageArea = css`
  padding: 16px 0;
  .ant-pagination-options-quick-jumper input {
    margin: 0 0 0 8px;
  }
`;

/** requires Chrome 46 */
let styleContentArea = css`
  min-width: max-content;
`;

let styleTable = css`
  position: relative;
  border-radius: 1px;

  .fade-in-out-enter {
    opacity: 0;
  }
  .fade-in-out-enter-active {
    opacity: 1;
    transition: opacity 200ms;
  }
  .fade-in-out-exit {
    opacity: 1;
  }
  .fade-in-out-exit-active {
    opacity: 0;
    transition: opacity 200ms;
  }
`;

let styleCover = css`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: hsla(0, 0%, 100%, 0.65);
`;

let styleLoadingEmpty = css`
  min-height: 80px;
`;

let styleAreaBottom = css`
  border-bottom: 1px solid hsla(216, 14%, 93%, 1);
`;

let styleAlignRight = css`
  justify-content: flex-end;
  text-align: right;
  padding-right: 20px;
`;
