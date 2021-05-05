import React from 'react'

import {Modal, Icon} from "semantic-ui-react";

export default function DetalleModal(props) {

    const {show, setShow, title, children, ...rest} = props;

    const onClose = () => setShow(false);
    return (
        <Modal className="detalle-modal" open={show} onClose={onClose} {...rest}>
            <Modal.Header>
                <span>{title}</span> <Icon  name="close" onClick={onClose}/>
            </Modal.Header>
            <Modal.Content>{children}</Modal.Content>
        </Modal>
    )
}
