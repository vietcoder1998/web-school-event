import React, { CSSProperties } from 'react';
import moment from 'moment';

export const Titlelabel = (props) => {
    return <label className="title-label">{" " + props.value + " "}</label>
}

export const IptLetter = (props?: { value?: any }) => {
    return <span className="important-letter">{" " + props.value + " "}</span>
}

export const IptLetterP = (props?: { children?: any }) => {
    return <p className="important-letter">{" " + props.children + " "}</p>
}


export const FirstLetter = (props) => {
    return <span className="first-letter">{" " + props.value + " "}</span>
}

export const IconLabel = (props) => {
    return <div className="icon_label">{props.icon}</div>
}

export const NotUpdate = (props?: { msg?: string }) => {
    const { msg } = props;
    return <span style={{ fontSize: '0.8 rem', fontStyle: 'italic' }}>{msg ? msg : 'Chưa cập nhật'}</span>
}

export function Loading() {
    return (
        <div className='loading'>
            Loadding...
        </div>
    )
}

export function Timer(props) {
    return (
        <label className='timer'>
            {props.value && moment(props.value).format('DD/MM/YYYY')}
        </label>
    )
}

export function JobType(props: {children?: any}) {
    let style: CSSProperties = {
        color: 'black',
        backgroundColor: 'white',
        borderRadius: 3,
        padding: 3,
        margin: '3px 0',
        fontSize: '0.8em',
        textAlign: 'center'
    }
    switch (props.children) {
        case 'FULLTIME':
            style.color = 'white';
            style.backgroundColor = '#06bbe4';
            break;

        case 'PARTTIME':
            style.color = 'black';
            style.backgroundColor = 'greenyellow';
            break;
        case 'INTERNSHIP':
            style.color = 'black';
            style.backgroundColor = '#d400d473';
            break;

        default:
            break;
    }

    return <div style={style}>{props.children}</div>
}

export function DangerousWord(props?: { size?: number }) {
    return (<label style={{ color: 'red' }}>({props && props.size >= 0 ? props.size : ''})</label>)
}
