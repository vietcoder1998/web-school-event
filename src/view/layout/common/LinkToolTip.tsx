import React from 'react';

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

                    {props.name}
                </>

            )
        } else return <>
 
            {props.name}
           
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