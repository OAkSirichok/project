window.addEventListener('load', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');

    // ดึงข้อมูลตะกร้าจาก localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<li>Your cart is empty</li>';
        cartSummary.innerText = 'Total: ฿0.00';
        checkoutButton.disabled = true;  // ปิดปุ่มถ้าไม่มีสินค้า
        checkoutButton.style.cursor = 'not-allowed';  // แสดงว่าไม่สามารถคลิกได้
    } else {
        let total = 0;
        cartItems.forEach(item => {
            // สร้างรายการสินค้าในตะกร้า
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" width="100">
                <span>${item.name}</span>
                <span>${item.price}</span>
            `;
            cartItemsContainer.appendChild(listItem);

            // คำนวณยอดรวม
            const price = parseFloat(item.price.replace('฿', '').replace(',', ''));
            total += price;
        });

        // แสดงยอดรวม
        cartSummary.innerText = `Total: ฿${total.toFixed(2)}`;
    }

    // เพิ่มฟังก์ชันให้ปุ่ม Checkout คลิกได้
    checkoutButton.addEventListener('click', () => {
        if (cartItems.length > 0) {
            // ถ้ามีสินค้าในตะกร้า, ย้ายไปยังหน้า checkout.html
            window.location.href = 'checkout.html';
        } else {
            alert('Your cart is empty! Please add some items to your cart first.');
        }
    });
});
