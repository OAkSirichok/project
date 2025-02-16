document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const attachment = document.getElementById('attachment').files[0];

    // Simple client-side validation
    if (name === '' || address === '' || email === '' || phone === '') {
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