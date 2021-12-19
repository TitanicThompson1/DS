import React, { useState } from 'react';
import {
  Row, Col, Navbar,
} from 'react-bootstrap';

import SearchBar from '../SearchBar';
import {
  NavbarDesktop, NavbarButtons, NavbarNav, NavbarContainer, NavbarLink, ColContainer,
} from './style';

export default function NavbarCustomDesktop() {
  const [text, setText] = useState('');
  return (
    <NavbarDesktop expand="lg">
      <NavbarNav>
        <NavbarContainer>
          <Row>
            <Col md="4">
              <ColContainer>
                <Navbar.Brand href="/">Logo</Navbar.Brand>
              </ColContainer>
            </Col>
            <Col md="3">
              <ColContainer>
                <SearchBar text={text} setText={setText} />
              </ColContainer>
            </Col>
            <Col md="5">
              <NavbarButtons>
                <NavbarLink href="/help">Help</NavbarLink>
                <NavbarLink href="/">Patterns</NavbarLink>
                <NavbarLink href="/">Bookmarks</NavbarLink>
              </NavbarButtons>
            </Col>
          </Row>
        </NavbarContainer>
      </NavbarNav>
    </NavbarDesktop>
  );
}
