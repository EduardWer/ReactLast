import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Table, Form } from 'react-bootstrap';
import { motion } from 'framer-motion';

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/cart')
      .then(response => {
        setCart(response.data);
        updateTotal(response.data);
      })
      .catch(error => {
        console.error('Error fetching cart data:', error);
      });
  }, []);

  const updateTotal = (cartItems) => {
    const totalCost = cartItems.reduce((sum, product) => sum + (parseFloat(product.price) * parseInt(product.quantity, 10)), 0);
    setTotal(isNaN(totalCost) ? 0 : totalCost);
  };

  const removeFromCart = (productId) => {
    axios.delete(`http://localhost:5000/cart/${productId}`)
      .then(() => {
        const updatedCart = cart.filter(product => product.id !== productId);
        setCart(updatedCart);
        updateTotal(updatedCart);
      })
      .catch(error => {
        console.error('Error removing product from cart:', error);
      });
  };

  const updateQuantity = (productId, newQuantity) => {
    const updatedCart = cart.map(product => {
      if (product.id === productId) {
        return { ...product, quantity: newQuantity };
      }
      return product;
    });

    setCart(updatedCart);
    updateTotal(updatedCart);

    const updatedProduct = updatedCart.find(product => product.id === productId);

    axios.put(`http://localhost:5000/cart/${productId}`, updatedProduct)
      .catch(error => {
        console.error('Error updating product quantity:', error);
      });
  };

  return (
    <motion.div className="d-flex flex-column flex-grow-1"
     initial={{ y: '-100vh' }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 50, duration: 1.5 }}>
      <Container>
        <Row className="my-4 flex-grow-1">
          <Col>
            <h2>Ваша корзина:</h2>
            {cart.length > 0 ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Название</th>
                    <th>Цена за единицу</th>
                    <th>Количество</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(product => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                      <td>
                        <Form.Control type="number" value={product.quantity} min="1"
                          onChange={(e) => updateQuantity(product.id, parseInt(e.target.value, 10))}/>
                      </td>
                      <td><Button variant="danger" onClick={() => removeFromCart(product.id)}>Удалить</Button></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : ( <p>Корзина пуста :(</p> )}
            <h3>Итог: ${total.toFixed(2)}</h3>
            <Button variant="primary" className="mt-2">Оплатить</Button>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
}

export default Cart;