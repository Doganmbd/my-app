import React from 'react';
import { Dropdown, DropdownButton, Button } from 'react-bootstrap'; // Gerekli Bootstrap bileşenleri

const HamburgerMenu = ({ userName }) => {
  return (
    <div className="user-menu d-flex align-items-center">
      <DropdownButton id="dropdown-basic-button" title={userName} variant="primary" className="mr-2">
        <Dropdown.Item href="#">Profil</Dropdown.Item>
        <Dropdown.Item href="#">Ayarlar</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="#">Çıkış</Dropdown.Item>
      </DropdownButton>
      <Button variant="outline-danger">Log Out</Button>
    </div>
  );
};

export default HamburgerMenu;
