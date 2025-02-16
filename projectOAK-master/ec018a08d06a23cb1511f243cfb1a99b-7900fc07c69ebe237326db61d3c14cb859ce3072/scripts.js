document.addEventListener("DOMContentLoaded", () => {
    // ดึงข้อมูลจาก localStorage (หากมี)
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // ฟังก์ชันอัปเดตการแสดงผลในตะกร้า
    function updateCartDisplay() {
        const cartItems = document.querySelector("#cart-items");
        const cartTotal = document.querySelector("#cart-total");
        
        // เคลียร์รายการเก่า
        cartItems.innerHTML = "";
        let total = 0;

        // แสดงสินค้าในตะกร้า
        cart.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
            cartItems.appendChild(li);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = `Total: $${total.toFixed(2)}`; // อัปเดตราคารวม
    }

    // ฟังก์ชันเพิ่มสินค้าลงในตะกร้า
    function addToCart(product) {
        const existingProduct = cart.find(item => item.name === product.name);

        if (existingProduct) {
            existingProduct.quantity += 1; // เพิ่มจำนวนสินค้า
        } else {
            cart.push(product); // เพิ่มสินค้าลงในตะกร้า
        }

        // บันทึกข้อมูลใน localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        alert(`${product.name} has been added to your cart!`);
        updateCartDisplay(); // อัปเดตการแสดงผลตะกร้า
    }

    // เพิ่มฟังก์ชันคลิกให้กับปุ่ม "Add to Cart"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productItem = button.closest('.product-item');
            const product = {
                name: productItem.querySelector('h2').textContent,
                price: parseFloat(productItem.querySelector('.price').textContent.replace(/[฿$,]/g, '')),
                image: productItem.querySelector('img').src,
                quantity: 1
            };
            addToCart(product);
        });
    });

    // อัปเดตข้อมูลในตะกร้าหลังโหลดหน้า
    updateCartDisplay();

    // ฟังก์ชันไปหน้า Checkout
    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty. Please add items before proceeding to checkout.');
            } else {
                window.location.href = 'checkout.html';
            }
        });
    }

    // ฟังก์ชันการแสดงรายการในหน้า Checkout
    if (document.body.contains(document.querySelector("#order-items"))) {
        const orderItems = document.querySelector("#order-items");
        const orderTotal = document.querySelector("#order-total");

        let total = 0;
        cart.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
            orderItems.appendChild(li);
            total += item.price * item.quantity;
        });

        orderTotal.textContent = `Total: $${total.toFixed(2)}`;

        // ฟอร์มยืนยันการสั่งซื้อ
        const checkoutForm = document.querySelector("#checkout-form");
        checkoutForm.addEventListener("submit", (event) => {
            event.preventDefault();
            alert("Thank you for your purchase!");
            localStorage.clear(); // ล้างตะกร้าหลังจากชำระเงิน
            window.location.href = "index.html"; // กลับไปหน้าแรก
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const orderItems = document.getElementById('order-items');
    const orderTotal = document.getElementById('order-total');
    const checkoutForm = document.getElementById('checkout-form');

    // โหลดข้อมูลจาก localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // เช็คว่ามีสินค้าในตะกร้าหรือไม่
    if (cart.length === 0) {
        orderItems.innerHTML = '<li>Your cart is empty.</li>';
        orderTotal.textContent = 'Total: ฿0.00';
        return;
    }

    let total = 0;

    cart.forEach(item => {
        if (!item.price || !item.quantity) return; // ป้องกันข้อมูลเสีย

        const li = document.createElement('li');
        li.textContent = `${item.name} - ฿${item.price.toFixed(2)} x ${item.quantity}`;
        orderItems.appendChild(li);

        total += item.price * item.quantity;
    });

    orderTotal.textContent = `Total: ฿${total.toFixed(2)}`;

    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const paymentMethod = document.getElementById('payment-method').value;

        if (!name || !address || !paymentMethod) {
            alert('Please fill in all shipping details.');
            return;
        }

        alert(`Thank you, ${name}! Your order has been placed.`);

        // ล้างตะกร้าหลังจากสั่งซื้อ
        localStorage.removeItem('cart');
        checkoutForm.reset();
        orderItems.innerHTML = '<li>Your cart is empty.</li>';
        orderTotal.textContent = 'Total: ฿0.00';
    });
});
