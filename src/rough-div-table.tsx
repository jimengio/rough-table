import React, { ReactNode } from "react";
import { css, cx } from "emotion";
import { center, column, flex, rowParted, row } from "@jimengio/shared-utils";
import { Pagination } from "antd";

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
  /** Display empty symbol rather than set it transparent */
  showEmptySymbol?: boolean;
  selectedKeys?: string[];
  rowKey?: string;
  onRowClick?: (record: any) => void;
  setRowClassName?: (record: any) => string;
  pageOptions?: {
    current: number;
    total: number;
    pageSize: number;
    onChange: (x: number) => void;
  };
  /** Default locale is "no data" */
  emptyLocale?: string;
}

interface IState {}

export default class RoughDivTable extends React.Component<IProps, IState> {
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
        return { flex: 1 };
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
                  {cell || <span className={cx(styleEmptyCell, showEmptySymbol ? null : styleTransparent)}>-</span>}
                </div>
              );
            })}
          </div>
        );
      });
    }

    return (
      <div className={cx(flex, column, styleContainer, this.props.className)}>
        {headElement}
        <div className={styleBody}>{bodyElement}</div>
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
            size="small"
            showQuickJumper
            current={pageOptions.current}
            total={pageOptions.total}
            pageSize={pageOptions.pageSize}
            onChange={pageOptions.onChange}
          />
        </div>
      </div>
    );
  }

  renderNoData() {
    return <div className={cx(center, padding16, styleEmpty)}>{this.props.emptyLocale || "No data"}</div>;
  }
}

const styleCell = css`
  padding: 12px 8px;
  line-height: 21px;
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
`;

const styleCursorPointer = css`
  cursor: pointer;
`;

const styleEmpty = css`
  color: #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
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
