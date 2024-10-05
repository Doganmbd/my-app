import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

function NotificationForm() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Bildirim Oluştur
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bildirim Oluştur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} controlId="formNotificationType">
              <Form.Label column sm={3}>
                Bildirim Türü:
              </Form.Label>
              <Col sm={9}>
                <Form.Control as="select" defaultValue="Arıza Bildirimi">
                  <option>Arıza Bildirimi</option>
                  <option>Diğer Bildirim Türü</option>
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formEquipment">
              <Form.Label column sm={3}>
                Ekipman:
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="text" placeholder="Ekipman girin" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formCatalogDetail">
              <Form.Label column sm={3}>
                Katalog Detayı:
              </Form.Label>
              <Col sm={9}>
                <Form.Control as="select">
                  <option>Seçiniz...</option>
                  <option>Katalog Detayı 1</option>
                  <option>Katalog Detayı 2</option>
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formResponsibleWorkPlace">
              <Form.Label column sm={3}>
                Sorumlu İş Yeri:
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="text" placeholder="Sorumlu iş yeri girin" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formRequestCreatorID">
              <Form.Label column sm={3}>
                Talebi Oluşturan Sicil No:
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="text" placeholder="Sicil No girin" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formDescription">
              <Form.Label column sm={3}>
                Açıklama:
              </Form.Label>
              <Col sm={9}>
                <Form.Control as="textarea" rows={3} placeholder="Açıklama girin" />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NotificationForm;