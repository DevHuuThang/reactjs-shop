import React, { Fragment, useEffect } from 'react';
import { withRouter } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';

import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';

import {
  setSortBy,
  setFilterBy,
  setPageToLoad,
} from '../../store/actions/header';
import { loadProducts } from '../../store/actions/products';
import { config } from '../../services/config';

import './styles.css';

const Header = ({
  location,
  header,
  loadProducts,
  setSortBy,
  setFilterBy,
  setPageToLoad,
}) => {
  const { pathname } = location;

  function setBrandFilterClick(val) {
    setFilterBy({ brand: val, color: header.filterBy.color });
    setPageToLoad(0);
    loadProducts(
      {
        page: { index: 0, size: config.pageSize },
        filter: { brand: val, color: header.filterBy.color },
        sort: { ...header.sortBy },
      },
      false,
    );
    window.scrollTo(0, 0);
  }

  function setColorFilterClick(val) {
    setFilterBy({ color: val, brand: header.filterBy.brand });
    setPageToLoad(0);
    loadProducts(
      {
        page: { index: 0, size: config.pageSize },
        filter: { color: val, brand: header.filterBy.brand },
        sort: { ...header.sortBy },
      },
      false,
    );
    window.scrollTo(0, 0);
  }

  function setSortClick(key, direction) {
    setSortBy({ key, direction });
    setPageToLoad(0);
    loadProducts(
      {
        page: { index: 0, size: config.pageSize },
        filter: { ...header.filterBy },
        sort: { key, direction },
      },
      false,
    );
    window.scrollTo(0, 0);
  }

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="primary"
      variant="dark"
      fixed="top"
    >
      <Container>
        <Navbar.Brand href="/home">Lure shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" activeKey={pathname}>
            <LinkContainer to="/home">
              <Nav.Link>
                <i className="fa fa-home"></i> Home
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/products">
              <Nav.Link>
                <i className="fa fa-product-hunt"></i> Products
              </Nav.Link>
            </LinkContainer>
            <NavDropdown
              disabled={pathname !== '/products'}
              title="Sort"
              id="collasible-nav-dropdown"
            >
              {[
                { label: 'price (asc)', key: 'price', direction: 'asc' },
                { label: 'price (desc)', key: 'price', direction: 'desc' },
                { label: 'weight (asc)', key: 'weight', direction: 'asc' },
                { label: 'weight (desc)', key: 'weight', direction: 'desc' },
                { label: 'size (asc)', key: 'size', direction: 'asc' },
                { label: 'size (desc)', key: 'size', direction: 'desc' },
                { label: 'none', key: 'none', direction: 'asc' },
              ].map((item, i) => (
                <NavDropdown.Item
                  active={
                    header.sortBy.key === item.key &&
                    header.sortBy.direction === item.direction
                  }
                  key={i}
                  onClick={() => setSortClick(item.key, item.direction)}
                >
                  {item.label}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <NavDropdown
              disabled={pathname !== '/products'}
              title="Brand"
              id="collasible-nav-dropdown"
            >
              {[
                { label: 'Rapala', filter: 'rapala' },
                { label: 'Heddon', filter: 'heddon' },
                { label: 'Cotton Cordell', filter: 'cottoncordel' },
                { label: 'Rebel', filter: 'rebel' },
                { label: 'Mepps', filter: 'mepps' },
                { label: 'none', filter: 'none' },
              ].map((item, i) => (
                <NavDropdown.Item
                  active={header.filterBy.brand === item.filter}
                  key={i}
                  onClick={() => setBrandFilterClick(item.filter)}
                >
                  {item.label}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <NavDropdown
              disabled={pathname !== '/products'}
              title="Color"
              id="collasible-nav-dropdown"
            >
              {[
                { label: 'red', filter: 'red' },
                { label: 'blue', filter: 'blue' },
                { label: 'green', filter: 'green' },
                { label: 'yellow', filter: 'yellow' },
                { label: 'brown', filter: 'brown' },
                { label: 'black', filter: 'black' },
                { label: 'white', filter: 'white' },
                { label: 'any', filter: 'none' },
              ].map((item, i) => (
                <NavDropdown.Item
                  active={header.filterBy.color === item.filter}
                  key={i}
                  onClick={() => setColorFilterClick(item.filter)}
                >
                  {item.label}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default connect(
  state => ({
    header: state.headerReducer,
  }),
  {
    setSortBy,
    setFilterBy,
    setPageToLoad,
    loadProducts,
  },
)(withRouter(Header));
