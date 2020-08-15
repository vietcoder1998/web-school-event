import React from "react";
import { limitString } from "../../../utils/limitString";

export default function Title(props) {
  return (
    <div className="text-inner">
      <p>{limitString(props.title, 50) }</p>
    </div>
  );
}
