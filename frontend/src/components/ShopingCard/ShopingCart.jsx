import React, { useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Checkbox, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Product 1', price: 100, quantity: 1, isSelected: false },
        { id: 2, name: 'Product 2', price: 200, quantity: 1, isSelected: false },
    ]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleCartModal = () => setIsCartOpen(!isCartOpen);

    const handleQuantityChange = (itemId, delta) => {
        setCartItems(cartItems.map(item =>
            item.id === itemId ? { ...item, quantity: Math.max(item.quantity + delta, 1) } : item
        ));
    };

    const handleSelectItem = (itemId) => {
        setCartItems(cartItems.map(item =>
            item.id === itemId ? { ...item, isSelected: !item.isSelected } : item
        ));
    };

    const handleRemoveItem = (itemId) => {
        setCartItems(cartItems.filter(item => item.id !== itemId));
    };

    const handleCheckout = () => {
        const selectedItems = cartItems.filter(item => item.isSelected);
        console.log("Selected items for checkout:", selectedItems);
        // Send `selectedItems` to the next step (e.g., checkout page)
        toggleCartModal();
    };

    const totalCost = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <>
            <ShoppingBasketIcon style={{ marginLeft: "2vw" }} onClick={toggleCartModal} />

            <Modal show={isCartOpen} onClose={toggleCartModal}>
                <Modal.Header>Корзина</Modal.Header>
                <Modal.Body>
                    {cartItems.length === 0 ? (
                        <p>Корзина пуста</p>
                    ) : (
                        <>
                            {cartItems.map((item) => (
                                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                    <Checkbox
                                        checked={item.isSelected}
                                        onChange={() => handleSelectItem(item.id)}
                                    />
                                    <span>{item.name}</span>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <IconButton onClick={() => handleQuantityChange(item.id, -1)}>-</IconButton>
                                        <TextField value={item.quantity} style={{ width: '40px' }} disabled />
                                        <IconButton onClick={() => handleQuantityChange(item.id, 1)}>+</IconButton>
                                    </div>
                                    <span>{item.price * item.quantity} ₽</span>
                                    <IconButton onClick={() => handleRemoveItem(item.id)}><DeleteIcon /></IconButton>
                                </div>
                            ))}
                            <div style={{ marginTop: '20px', textAlign: 'right' }}>
                                <strong>Общая стоимость: {totalCost} ₽</strong>
                            </div>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCheckout} disabled={cartItems.every(item => !item.isSelected)}>
                        Оформить заказ
                    </Button>
                    <Button color="gray" onClick={toggleCartModal}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ShoppingCart;