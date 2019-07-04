import * as React from "react";
import { Link as L, LinkProps } from "react-router-dom";

export interface CCLinkProps extends LinkProps {
  externalLink?: boolean;
}

export const Link: React.SFC<CCLinkProps> = ({ externalLink, ...props }) => {
  return externalLink ? (
    <a href={props.to as string}>{props.children}</a>
  ) : (
    <L
      {...{
        ...props
      } as LinkProps}
    />
  );
};
