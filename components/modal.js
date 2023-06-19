import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import ModalCarousel from './modalCarousel';
import ReactMarkdown from "react-markdown";

const MessageModal = (props) => {
    console.log(props)
    // Timeline past event photos modal
    if (props.pastevent && props.pasteventphotos) {
      const pictures = props.pasteventphotos;
      
      return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Pictures from {props.location}!
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ModalCarousel 
                pictureData={pictures}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
    } else {
      // Welcome message modal
        return (
          <Modal
              {...props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  {props.messagedetails.subheading}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ReactMarkdown>
                  {props.messagedetails.message}
                </ReactMarkdown>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
              </Modal.Footer>
            </Modal>
        );
    }


};

export default MessageModal;