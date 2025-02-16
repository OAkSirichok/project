document.getElementById('payment-method').addEventListener('change', function() {
    const paymentMethod = this.value;
    const promptPayQRCode = document.getElementById('promptpay-qrcode');
    
    if (paymentMethod === 'promptpay') {
        promptPayQRCode.style.display = 'block';
    } else {
        promptPayQRCode.style.display = 'none';
    }
});

document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const attachment = document.getElementById('attachment').files[0];
    const paymentMethod = document.getElementById('payment-method').value;

    // Simple client-side validation
    if (name === '' || address === '' || email === '' || phone === '' || paymentMethod === '') {
        alert('Please fill in all required fields.');
        return;
    }

    // Mock order placement process
    // Replace this section with actual order placement logic
    alert('Order placed successfully!');

    // Optionally, you can handle the file upload here
    if (attachment) {
        const reader = new FileReader();
        reader.onload = function(e) {
            console.log('Image uploaded: ', e.target.result);
        };
        reader.readAsDataURL(attachment);
    }

    window.location.href = 'index.html'; // Redirect to home page after successful order placement
});