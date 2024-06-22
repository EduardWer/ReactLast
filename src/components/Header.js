import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { motion } from 'framer-motion';

function Header() {
  return (
    <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
    transition={{ type: 'spring', stiffness: 50, duration: 0.5 }} style={{ backgroundColor: '#00ff00', color: '#00ff00' }}>
      <Navbar bg="dark" expand="lg">
        <Navbar.Brand as={Link} to="/" style={{ color: '#00ff00' }}>ReactAccount</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/catalog" style={{ color: '#00ff00' }}>Каталог</Nav.Link>
            <Nav.Link as={Link} to="/" style={{ color: '#00ff00' }}>Главная</Nav.Link>
            <Nav.Link as={Link} to="/izbrannoe" style={{ color: '#00ff00' }}>Избранное</Nav.Link>
            <Nav.Link as={Link} to="/cart" style={{ color: '#00ff00' }}>Корзина</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </motion.div>

  );

}

export default Header;