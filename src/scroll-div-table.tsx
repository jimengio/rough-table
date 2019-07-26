/** Table which supports horizontal scrolling.
 * code splitted from DivTable
 */

import React, { ReactNode } from "react";
import { css, cx } from "emotion";
import { center, column, flex, rowParted, row } from "@jimengio/shared-utils";
import { Pagination } from "antd";
import JimoIcon, { EJimoIcon } from "@jimengio/jimo-icons";
import { PaginationProps } from "antd/lib/pagination";

interface IProps {
  className?: string;
  data: { [k: string]: any }[];
  /** Displayed in headers */
  labels: (string | ReactNode)[];
  renderColumns: (record: any, idx?: number) => (string | ReactNode)[];
  rowPadding?: number;
  /** Use number of string to specify CSS width */
  columnWidths?: any[];
  lastColumnWidth?: number;
  styleCell?: string;
  wholeBorders?: boolean;
  /** Display empty symbol rather than set it transparent */
  showEmptySymbol?: boolean;
  selectedKeys?: string[];
  rowKey?: string;
  onRowClick?: (record: any) => void;
  setRowClassName?: (record: any) => string;
  pageOptions?: PaginationProps;
  /** Default locale is "no data" */
  emptyLocale?: string;
}

interface IState {}

export default class ScrollDivTable extends React.Component<IProps, IState> {
  render() {
    const { selectedKeys, rowPadding = 80, columnWidths = [], showEmptySymbol, rowKey = "id", labels } = this.props;

    let hasData = this.props.data.length > 0;

    let getColumnWidthStyle = (idx: number) => {
      let width = columnWidths[idx];
      if (idx + 1 === labels.length) {
        width = this.props.lastColumnWidth;
      }

      if (width != null) {
        return { width };
      } else {
        return { flexGrow: 1 };
      }
    };

    let rowPaddingStyle = {};
    if (rowPadding != null) {
      rowPaddingStyle = { paddingLeft: rowPadding, paddingRight: rowPadding };
    }

    let headElement = (
      <div className={cx(row, styleRow, styleHeaderBar)} style={rowPaddingStyle}>
        {labels.map((label, idx) => {
          return (
            <div key={idx} className={cx(styleCell, this.props.styleCell)} style={getColumnWidthStyle(idx)}>
              {label || <span className={styleEmptyCell}>_</span>}
            </div>
          );
        })}
      </div>
    );

    let bodyElement: any = this.renderNoData();

    if (hasData) {
      bodyElement = this.props.data.map((record, idx) => {
        let cells = this.props.renderColumns(record, idx);

        let rowClassName: string;
        if (selectedKeys != null && selectedKeys.includes(record[rowKey])) {
          rowClassName = styleSelectedRow;
        }

        return (
          <div
            key={idx}
            className={cx(row, styleRow, this.props.onRowClick != null && styleCursorPointer, rowClassName)}
            style={rowPaddingStyle}
            onClick={this.props.onRowClick != null ? () => this.props.onRowClick(record) : null}
          >
            {cells.map((cell, cellIdx) => {
              return (
                <div key={cellIdx} className={cx(styleCell, this.props.styleCell)} style={getColumnWidthStyle(cellIdx)}>
                  {cell != null ? cell : <span className={cx(styleEmptyCell, showEmptySymbol ? null : styleTransparent)}>-</span>}
                </div>
              );
            })}
          </div>
        );
      });
    }

    return (
      <div className={cx(flex, column, styleContainer, this.props.wholeBorders ? styleWholeBorders : null, this.props.className)}>
        <div className={cx(flex, column)}>
          <div className={styleContentArea}>
            {headElement}
            <div className={styleBody}>{bodyElement}</div>
          </div>
        </div>
        {this.props.pageOptions != null ? this.renderPagination() : null}
      </div>
    );
  }

  renderPagination() {
    let { pageOptions } = this.props;
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
  }

  renderNoData() {
    return (
      <div className={cx(center, padding16, styleEmpty)}>
        <JimoIcon name={EJimoIcon.emptyData} className={styleEmptyIcon} />
        <span>{this.props.emptyLocale || "No data"}</span>
      </div>
    );
  }
}

const styleCell = css`
  padding: 10px 8px;
  line-height: 20px;
  flex-basis: 100px;
  flex-shrink: 0;
`;

const styleHeaderBar = css`
  font-weight: bold;
  background-color: #f2f2f2;
  border: none;
  border-bottom: 1px solid #e5e5e5;
`;

const styleBody = css`
  color: rgba(0, 0, 0, 0.65);
`;

const styleRow = css`
  &:hover {
    background-color: #e6f7ff;
  }

  padding-left: 80px;
  border-bottom: 1px solid #e5e5e5;

  width: 100%;
`;

let styleWholeBorders = css`
  border-left: 1px solid #e5e5e5;
  border-right: 1px solid #e5e5e5;
`;

const styleCursorPointer = css`
  cursor: pointer;
`;

const styleEmpty = css`
  color: #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  font-size: 12px;
`;

const styleEmptyCell = css`
  user-select: none;
`;

let styleTransparent = css`
  color: transparent;
`;

const styleContainer = null;

const styleSelectedRow = css`
  background-color: #e6f7ff;
`;

let padding16 = css`
  padding: 16px;
`;

let stylePageArea = css`
  padding: 16px 8px;
`;

let styleEmptyIcon = css`
  font-size: 80px;
  margin-bottom: 8px;
`;

/** requires Chrome 46 */
let styleContentArea = css`
  min-width: max-content;
`;
