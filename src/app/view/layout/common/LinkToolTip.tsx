import React, { CSSProperties } from 'react';
import $ from 'jquery';

export default function LinkToolTip(props: {
    title?: string, name?: any,
    placement?: "top" | "bottom"
    transform?: string
}) {
    let position = "";
    if (props.placement) {
        position = props.placement
    }

    const text = () => {
        if (props.placement === "top") {
            return (
                <>
                    <div className="tooltiptext">
                        {props.title}
                    </div>
                    {props.name}
                </>

            )
        } else return <>
            {props.name}
            <div className="tooltiptext">
                {props.title}
            </div>
        </>
    }

    return (
        <div
            className={`config-tooltip ${position}`}
            //@ts-ignore
            style={{ textTransform: props.transform ? props.transform : "" }}
        >
           {text()}
        </div>
    )
}