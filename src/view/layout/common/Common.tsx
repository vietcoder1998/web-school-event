import React, { CSSProperties } from 'react';
import moment from 'moment';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Icon, notification } from 'antd';
import { limitString } from '../../../utils/limitString';

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

export function JobType(props: { children?: any, width?: any, fontSize?: any }) {
    let style: CSSProperties = {
        fontSize: props.fontSize ? props.fontSize : '0.8em',
        textAlign: 'center',
        width: props.width ? props.width : '100%',
        display: 'inline-block',
        position: 'relative',
        margin: '5px 0',
        borderRadius: '3px',
        padding: '2px 2px'

    };
    let label;
    switch (props.children) {
        case 'FULLTIME':
            style.color = 'white';
            style.backgroundColor = '#06bbe4';
            label = 'FULLTIME';
            break;

        case 'PARTTIME':
            style.color = 'white';
            style.backgroundColor = '#00b33c';
            label = 'PARTTIME';
            break;

        case 'INTERNSHIP':
            style.color = 'white';
            style.backgroundColor = '#ff9933';
            label = 'THỰC TẬP';
            break;

        default:
            break;
    }

    return <div style={style}>{label}</div>
}

export function DangerousWord(props?: { size?: number }) {
    return (<label style={{ color: 'red' }}>({props && props.size >= 0 ? props.size : ''})</label>)
}

export function ConnerDiv(props?: { title?: string }) {
    return (
        <div className="conner">
            <div className="bg-triagle" />
            <div className="tt">{props.title}</div>
        </div>

    )
}

export function OnDiv(props?: {
    onClick?: Function,
    loading?: Function,
    src?: any;
    alt?: string
}) {
    return <div className="push-on" onClick={() => props.onClick ? props.onClick() : undefined}>
        <LazyLoadImage className="on-image" src={require("./../../../assets/image/video/pngegg.png")} alt={props.alt} />
        <LazyLoadImage className="base-inside" src={props.src} alt={props.alt} />
        <div className="on-bound" />
    </div>
}


export function LiCopy(
    props?:
        {
            copy?: string,
            children?: any,
            title?: string,
            show?: boolean,
        }
) {
    return (
        props.copy ?
            <CopyToClipboard text={props.copy}
                onCopy={() => notification.info({ message: props.title ? props.title : "Sao chép thành công", description: limitString(props.copy, 30) })}
            >
                <li className="profile-info">{props.children} <Icon type="copy" /></li>
            </CopyToClipboard> : <li className="profile-info">{props.children}</li>
    )
}