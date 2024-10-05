import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

function EditPopup() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    {/* variant="primary" 
    style={{ backgroundColor: 'transparent', border: 'none', color: 'inherit' }} 
     */}
      <Button variant="secondary"  onClick={handleShow}>
        Düzenle
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Kesinti Süresini Düzenle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} controlId="formWorkUnit">
              <Form.Label column sm={3}>
                Çalışma birimi:
              </Form.Label>
              <Col sm={9}>
                <Form.Control plaintext readOnly defaultValue="PARKE3" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formType">
              <Form.Label column sm={3}>
                Tip:
              </Form.Label>
              <Col sm={9}>
                <Form.Control as="select">
                  <option>Seçiniz...</option>
                  <option>Tip 1</option>
                  <option>Tip 2</option>
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formReasonCode">
              <Form.Label column sm={3}>
                Neden kodu:
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="text" placeholder="Neden kodu girin" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formStartTime">
              <Form.Label column sm={3}>
                Başlangıç zamanı:
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="time" defaultValue="08:00" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formDuration">
              <Form.Label column sm={3}>
                Dakika cinsinden süre:
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="number" min="0" placeholder="0" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formEndTime">
              <Form.Label column sm={3}>
                Bitiş zamanı:
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="time" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPersonnelSize">
              <Form.Label column sm={3}>
                Personel hacmi:
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="number" step="0.01" placeholder="0.00" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formStandardDuration">
              <Form.Label column sm={3}>
                Dakika cinsinden standart süre:
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="number" placeholder="0" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formAffectsLine">
              <Form.Label column sm={3}>
                Hatta etki ediyor:
              </Form.Label>
              <Col sm={9}>
                <Form.Check type="checkbox" label="" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formOrder">
              <Form.Label column sm={3}>
                İlgili sipariş:
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="text" placeholder="Sipariş no girin" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formComments">
              <Form.Label column sm={3}>
                Açıklamalar:
              </Form.Label>
              <Col sm={9}>
                <Form.Control as="textarea" rows={3} defaultValue="---" />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            İptal et
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Tamam
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditPopup;

