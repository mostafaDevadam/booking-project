import React, { SyntheticEvent } from 'react'
import { Button, Form, Image, Modal } from 'react-bootstrap';
import { useAppSelector } from '../hooks/useRedux';

type PROPS = {
    show: boolean
    handleShow: () => void
    handleClose: () => void
    children?: React.ReactNode
    message?: string,
    backRemoveValue?: (val: boolean) => void

}

const MessageModal: React.FC<PROPS> = ({ show, handleShow, handleClose, message, backRemoveValue }) => {

    const roomSelector = useAppSelector((state) => state.room.data)




    const handleClick = (e: any) => {
        // send the bool value to the roomsPage
        if (e.target.id == 'yes') {
            console.log('msg Modal remove btn:', e.target)
            // remove
            console.log('msg modal room doc:', roomSelector.doc)
            backRemoveValue && backRemoveValue(true)
            handleClose()

        } else if (e.target.id == 'no') {
            backRemoveValue && backRemoveValue(false)
            handleClose()
        }

        //handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                {message && <h5>{message}</h5>}

            </Modal.Body>
            <Modal.Footer className='d-flex flex-row justify-content-between'>
                <Button variant="secondary" onClick={handleClick} id="no" value="no" defaultChecked={true}>
                    No
                </Button>
                <Button variant="secondary" onClick={handleClick} id="yes" value="yes">
                    Yes
                </Button>
                { /*<Button variant="primary" onClick={handleClose}>
        Save Changes
      </Button>*/}
            </Modal.Footer>
        </Modal>
    )
}

export default MessageModal
