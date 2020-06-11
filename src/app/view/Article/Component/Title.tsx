import React from "react";
import './Title.scss'
export default function Title(props) {
  return (
    <div className="text-inner">
      <p>{props.title}</p>
    </div>
  );
}
