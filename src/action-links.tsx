import React, { SFC } from "react";
import { css, cx } from "emotion";
import { rowCenter, interpose } from "@jimengio/shared-utils";
import Space from "./space";

export interface IActionLinkItem {
  text: string;
  /** hidden or null item to skip rendering the link */
  hidden?: boolean;
  onClick: () => void;
}

let ActionLinks: SFC<{
  actions: IActionLinkItem[];
  className?: string;
  spaced?: boolean;
}> = (props) => {
  let actions = props.actions.filter((x) => {
    if (x == null) return false;
    if (x.hidden != null && x.hidden === true) return false;
    return true;
  });

  // null for rendering spaces...
  let items: (IActionLinkItem)[] = interpose(actions, null);

  return (
    <div className={cx(styleContainer, props.className)}>
      {items.map((item, idx) => {
        if (item == null) {
          if (props.spaced) {
            return <Space key={idx} width={8} />;
          } else {
            return <span key={idx} className={styleSeperator} />;
          }
        } else {
          return (
            <a className={styleLink} key={idx} onClick={item.onClick}>
              {item.text}
            </a>
          );
        }
      })}
    </div>
  );
};

export default ActionLinks;

const styleSeperator = css`
  margin: 0 8px;
  width: 1px;
  height: 14px;
  background-color: #e8e8e8;
  display: inline-block;
`;

let styleLink = css`
  font-size: 14px;
  color: rgba(35, 143, 243, 1);
  cursor: pointer;
`;

let styleContainer = css`
  display: inline-block;
`;
