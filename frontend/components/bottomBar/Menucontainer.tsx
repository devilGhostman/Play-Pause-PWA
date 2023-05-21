import Link from "next/link";

import {
  ReactElement,
  JSXElementConstructor,
} from "react";


export const Menucontainer = (props: {
  name: string ;
  isHome: string;
  link: string ;
  icon:
    | string
    | ReactElement<any, string | JSXElementConstructor<any>>;
}) => {
  return (
    <li className={props.isHome ? `active` : ``}>
      <a>
        <Link href={props.link}>
          <span className="icon">{props.icon}</span>
        </Link>
        <span className="name">{props.name}</span>
      </a>
    </li>
  );
};
