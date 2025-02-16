document.addEventListener('DOMContentLoaded', () => {
    const orderItems = document.getElementById('order-items');
    const orderTotal = document.getElementById('order-total');
    const checkoutForm = document.getElementById('checkout-form');

    // Load cart items from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Render cart items
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ฿${item.price} x ${item.quantity}`;
        orderItems.appendChild(li);

        // แปลงราคาจาก string เป็น number (ตัดสัญลักษณ์ "฿" ออกถ้ามี)
        let price = parseFloat(item.price.toString().replace(/[^0-9.]/g, ''));
        total += price * item.quantity;
    });

    // Display total
    orderTotal.textContent = `Total: ฿${total.toFixed(2)}`;

    // Handle form submission
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const paymentMethod = document.getElementById('payment-method').value;

        if (!name || !address || !paymentMethod) {
            alert('Please fill in all shipping details.');
            return;
        }

        // Simulate order processing
        alert(`Thank you, ${name}! Your order has been placed.`);

        // Clear the cart and form
        localStorage.removeItem('cart');
        checkoutForm.reset();
        orderItems.innerHTML = '';
        orderTotal.textContent = 'Total: ฿0.00';
    });
});
