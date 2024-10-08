import React from 'react';
import { Button, Popover, OverlayTrigger } from 'react-bootstrap';

function PopUpDetails() {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Kesinti süresine ilişkin ayrıntılar</Popover.Header>
      <Popover.Body>
        <p><strong>Giriş tipi:</strong> Zaman aralığı</p>
        <p><strong>Açıklamalar:</strong> ---</p>
        <p><strong>Çarpan:</strong> 100%</p>
        <p><strong>Bildiren/değiştiren:</strong> MIIUSER</p>
        <p><strong>Son bildirim tarihi/saati:</strong> Oct 5, 2024, 8:00:14 AM</p>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="details-button">
      {/* Pop-up açacak buton */}
      
      <OverlayTrigger trigger="click" placement="left" overlay={popover}>
        <Button variant="info">Ayrıntı</Button>
      </OverlayTrigger>
    </div>
  );
}

export default PopUpDetails;