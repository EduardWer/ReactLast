import React from 'react';
import { motion } from 'framer-motion';
import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <motion.footer className="footer" initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
      <Container>
        <p>&copy; 2024 ReactGame.company . Все права защищены.</p>
      </Container>
    </motion.footer>
  );
}

export default Footer;