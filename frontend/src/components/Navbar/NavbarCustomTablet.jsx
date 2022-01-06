import React from 'react';
import {
  Row, Col, Navbar,
} from 'react-bootstrap';
import { BsListUl, BsBookmark } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import SearchBar from '../SearchBar';
import {
  NavbarTablet, NavbarNav, NavbarContainer, NavbarLink, NavbarButtons, ColContainer,
} from './style';

export default function NavbarCustomDesktop() {
  const navigate = useNavigate();

  const onKeyUp = (e) => {
    if (e.key === 'Enter') {
      navigate('/search');
    }
  };

  return (
    <NavbarTablet expand="lg">
      <NavbarNav>
        <NavbarContainer>
          <Row>
            <Col xs="4" md="6">
              <ColContainer>
                <Navbar.Brand href="/">Logo</Navbar.Brand>
              </ColContainer>
            </Col>
            <Col xs="6" md="4">
              <ColContainer>
                <SearchBar onKeyUp={onKeyUp} />
              </ColContainer>
            </Col>
            <Col xs="2" md="2">
              <NavbarButtons>
                <NavbarLink href="/"><BsListUl /></NavbarLink>
                <NavbarLink href="/bookmarks"><BsBookmark /></NavbarLink>
              </NavbarButtons>
            </Col>
          </Row>
        </NavbarContainer>
      </NavbarNav>
    </NavbarTablet>
  );
}
