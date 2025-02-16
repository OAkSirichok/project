let cart = JSON.parse(localStorage.getItem('cart')) || [];  // ใช้ข้อมูลจาก localStorage ถ้ามี

// ดึงปุ่มและจำนวนในตะกร้า
const cartIcon = document.getElementById('cart-icon');
const cartCount = document.getElementById('cart-count');
const cartSidebar = document.getElementById('cart-sidebar');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const closeCartButton = document.getElementById('close-cart');
const checkoutButton = document.getElementById('checkout-button');

// ฟังก์ชั่นเพิ่มสินค้าในตะกร้า
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const product = {
            name: this.getAttribute('data-name'),
            image: this.getAttribute('data-image'),
            price: parseInt(this.getAttribute('data-price').replace('฿', '')),
            quantity: 1 // เพิ่มจำนวนสินค้าตั้งแต่เริ่มต้นเป็น 1
        };

        // เช็คว่าสินค้าตัวนี้มีอยู่ในตะกร้าหรือยัง
        const existingProduct = cart.find(item => item.name === product.name);
        if (existingProduct) {
            existingProduct.quantity++; // ถ้ามีอยู่แล้วเพิ่มจำนวน
        } else {
            cart.push(product); // ถ้ายังไม่มีเพิ่มสินค้าใหม่
        }
        saveCart(); // บันทึกตะกร้าใน localStorage
        updateCart();
    });
});

// อัปเดตข้อมูลในตะกร้า
function updateCart() {
    // อัปเดตจำนวนในตะกร้า
    cartCount.textContent = cart.length;

    // คำนวณราคาและแสดงรายการสินค้าในตะกร้า
    let total = 0;
    cartItemsContainer.innerHTML = '';
    cart.forEach((product, index) => {
        total += product.price * product.quantity;
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.name}">
                <div class="item-details">
                    <h4>${product.name}</h4>
                    <p>฿${product.price} x ${product.quantity}</p>
                </div>
                <div class="modify-quantity">
                    <button class="increase-quantity" data-index="${index}">+</button>
                    <span>${product.quantity}</span>
                    <button class="decrease-quantity" data-index="${index}">-</button>
                </div>
                <button class="remove-item" data-index="${index}">Remove</button>
            </div>
        `;
    });

    cartTotal.textContent = `฿${total}`; // อัปเดตราคารวม
}

// ฟังก์ชั่นเพิ่มจำนวนสินค้า
cartItemsContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('increase-quantity')) {
        const itemIndex = event.target.getAttribute('data-index');
        cart[itemIndex].quantity++;
        saveCart(); // บันทึกการเปลี่ยนแปลงใน localStorage
        updateCart();
    }

    if (event.target.classList.contains('decrease-quantity')) {
        const itemIndex = event.target.getAttribute('data-index');
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity--;
        } else {
            cart.splice(itemIndex, 1); // ลบสินค้าหากจำนวนเป็น 0
        }
        saveCart(); // บันทึกการเปลี่ยนแปลงใน localStorage
        updateCart();
    }

    if (event.target.classList.contains('remove-item')) {
        const itemIndex = event.target.getAttribute('data-index');
        cart.splice(itemIndex, 1); // ลบสินค้าจากอาร์เรย์
        saveCart(); // บันทึกการเปลี่ยนแปลงใน localStorage
        updateCart();
    }
});

// ฟังก์ชั่นเปิด/ปิดตะกร้า
cartIcon.addEventListener('click', function() {
    cartSidebar.style.display = cartSidebar.style.display === 'block' ? 'none' : 'block';
    updateCart(); // อัปเดตตะกร้าเมื่อเปิด
});

// ฟังก์ชั่นปิดตะกร้า
closeCartButton.addEventListener('click', function() {
    cartSidebar.style.display = 'none';
});

// ฟังก์ชั่นบันทึกข้อมูลใน LocalStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));  // บันทึกข้อมูลตะกร้าลง localStorage
}

// แสดงตะกร้าหลังจากรีเฟรชหน้า
window.addEventListener('load', () => {
    if (cart.length > 0) {
        updateCart();  // อัปเดตข้อมูลในตะกร้าเมื่อโหลดหน้าใหม่
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            window.location.href = 'checkout.html';
        });
    }
});


