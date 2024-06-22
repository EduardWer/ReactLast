import React from 'react';
import ProductList from './ProductList';
import ContactForm from './ContactForm';
import { Container, Row, Col } from 'react-bootstrap';
import "./home.css"
import gif from "./MainFoto.gif"



function Home() {
  return (
    <Container>
        <img src={gif} alt='Computer' className="fotos"/>
      <Row className="my-4">
        <Col>
          <h2>Добро пожаловать в ReactGame</h2>
          <p>Найдите аккаунты на любой вкус</p>
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          <h3>Популярные товары</h3>
          <ProductList limit={10} />
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          <h3>Обратная связь</h3>
          <ContactForm />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
