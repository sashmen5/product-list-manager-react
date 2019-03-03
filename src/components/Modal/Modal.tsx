import * as React from 'react';
import './Modal.css';

interface ModalProps {
    text: string;
    btnText: string;
    handleBtnClicked: (e) => void;
}
export default ({ text, btnText, handleBtnClicked }: ModalProps) => {
    const body = document.body;
    const html = document.documentElement;
    const height = Math.max( body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight );
    return  (
        <div className="Modal" style={{height: `${height}px`}}>
            <div className="Area">
                <span>{text}</span>
                <button onClick={handleBtnClicked}>{btnText}</button>
            </div>
        </div>
    )
}