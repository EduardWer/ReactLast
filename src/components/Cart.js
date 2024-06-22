import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './card.css'

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
    <motion.div className="cart-container"
     initial={{ y: '100vh' }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 50, duration: 1.5 }}>
      <Container>
        <Row className="cart-row my-4 flex-grow-1">
          <Col>
            <h2 className="cart-title" style={{ color: '#020202' }}>Ваши будущие покупки</h2>
            {cart.length > 0 ? (
              <>
                {cart.map(product => (
                  <div key={product.id} className="cart-item mb-4" style={{ backgroundColor: '#333', borderRadius: '10px', padding: '10px' }}>
                    <h5 style={{ color: '#fff' }}>{product.name}</h5>
                    <p style={{ color: '#fff' }}>Цена за единицу: ${product.price}</p>
                    <Form.Control type="number" value={product.quantity} min="1" className="cart-quantity-input" style={{ backgroundColor: '#444', color: '#fff', borderColor: '#555' }}
                      onChange={(e) => updateQuantity(product.id, parseInt(e.target.value, 10))}/>
                    <Button variant="danger" className="mt-2" style={{ backgroundColor: '#662d91', borderColor: '#662d91' }} onClick={() => removeFromCart(product.id)}>Удалить</Button>
                  </div>
                ))}
                <h3 className="cart-total" style={{ color: '#020202' }}>Итог: ${total.toFixed(2)}</h3>
                <Button variant="primary" className="cart-checkout-button mt-2" style={{ backgroundColor: '#00ff00', borderColor: '#00ff00' }}>Оплатить</Button>
              </>
            ) : (
              <p className="cart-empty-text" style={{ color: '#020202' }}>Корзина пуста :(</p>
            )}
          </Col>
        </Row>
      </Container>
    </motion.div>


  );
}

export default Cart;