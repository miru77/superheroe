import React from 'react'

import {Modal, Icon} from "semantic-ui-react";

export default function BasicModal(props) {

    const {show, setShow, title, children, ...rest} = props;

    const onClose = () => setShow(false);
    return (
        <Modal className="basic-modal"    closeOnEscape= {false}
        closeOnDimmerClick= {false} open={show} onClose={onClose} {...rest}>
            <Modal.Header>
                <span>{title}</span>   
            </Modal.Header>
            <Modal.Content>{children} </Modal.Content>
        </Modal>
    )
}
 