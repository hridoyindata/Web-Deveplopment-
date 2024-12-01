document.addEventListener('DOMContentLoaded', () => {
    const deliveryPickup = document.getElementById('delivery-pickup');
    const deliveryAddressField = document.getElementById('deliveryAddressField');
    const sameAsDelivery = document.getElementById('sameAsDelivery');
    const billingAddress = document.getElementById('billing-address');
    const billingPostcode = document.getElementById('billing-postcode');
    const deliveryAddress = document.getElementById('delivery-address');
    const deliveryPostcode = document.getElementById('delivery-postcode');
    const paymentMethod = document.getElementById('payment-method');
    const creditCardField = document.getElementById('creditCardField');
    const cardType = document.getElementById('card-type');
    const creditCard = document.getElementById('credit-card');
    const postcodeField = document.getElementById('postcode');

    if (deliveryAddressField) deliveryAddressField.style.display = 'none';

    // Hide credit card fields initially
    if (creditCardField) creditCardField.style.display = 'none';

    // Toggle delivery address based on delivery/pickup selection
    if (deliveryPickup) {
        deliveryPickup.addEventListener('change', () => {
            if (deliveryPickup.value === 'delivery') {
                deliveryAddressField.style.display = 'block';
            } else {
                deliveryAddressField.style.display = 'none';
                deliveryAddress.value = '';
                deliveryPostcode.value = '';
            }
        });
    }

    // Toggle billing address based on same as delivery checkbox
    if (sameAsDelivery) {
        sameAsDelivery.addEventListener('change', () => {
            if (sameAsDelivery.checked) {
                if (deliveryAddress.value && deliveryPostcode.value) {
                    billingAddress.value = deliveryAddress.value;
                    billingPostcode.value = deliveryPostcode.value;
                } else {
                    alert('Please enter your delivery address and postcode first');
                    sameAsDelivery.checked = false;
                }
            } else {
                billingAddress.value = '';
                billingPostcode.value = '';
            }
        });
    }

    // Toggle credit card fields based on payment method selection
    if (paymentMethod) {
        paymentMethod.addEventListener('change', () => {
            if (paymentMethod.value === 'online') {
                creditCardField.style.display = 'block';
            } else {
                creditCardField.style.display = 'none';
                cardType.value = '';
                creditCard.value = '';
            }
        });
    }

    // Form validation for order form
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            let errors = [];

            // Ensure no required fields are left blank
            const requiredOrderFields = ['delivery-pickup', 'billing-address', 'contact-number', 'email-receipt'];
            for (const fieldId of requiredOrderFields) {
                const field = document.getElementById(fieldId);
                if (!field || !field.value.trim()) {
                    errors.push(`${fieldId.replace('-', ' ')} cannot be empty.`);
                }
            }

            // Validate postcode to be exactly 4 digits (billing postcode should always be 4 digits)
            const postcodePattern = /^\d{4}$/; // Regular expression to check if postcode is exactly 4 digits

            // Check billing postcode
            const billingPostcodeValue = billingPostcode.value.trim();
            if (!postcodePattern.test(billingPostcodeValue)) {
                errors.push('Billing postcode must be exactly 4 digits.');
            }

            // Validate delivery postcode if delivery is selected
            if (deliveryPickup && deliveryPickup.value === 'delivery') {
                const deliveryPostcodeValue = deliveryPostcode.value.trim();
                if (!postcodePattern.test(deliveryPostcodeValue)) {
                    errors.push('Delivery postcode must be exactly 4 digits.');
                }
            }

            // Validate credit card fields if payment method is online
            if (paymentMethod && paymentMethod.value === 'online') {
                if (cardType.value === 'amex' && creditCard.value.length !== 15) {
                    errors.push('American Express card number must be 15 digits long.');
                } else if ((cardType.value === 'visa' || cardType.value === 'mastercard') && creditCard.value.length !== 16) {
                    errors.push('Visa and MasterCard numbers must be 16 digits long.');
                }
            }

            // Display all errors together
            if (errors.length > 0) {
                alert(errors.join('\n'));
                e.preventDefault();
            }
        });
    }

    // --- Password Validation for Register Form ---
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            let errors = [];

            const passwordInput = document.getElementById('password');
            if (passwordInput) {
                const password = passwordInput.value;

                // Validate password: must be at least 7 characters long
                if (password.length < 7) {
                    errors.push('Password must be at least 7 characters long.');
                }
            }

            // Ensure no required fields are left blank
            const requiredFields = ['username', 'password', 'email'];
            for (const fieldId of requiredFields) {
                const field = document.getElementById(fieldId);
                if (!field || !field.value.trim()) {
                    errors.push(`${fieldId.charAt(0).toUpperCase() + fieldId.slice(1)} cannot be empty.`);
                }
            }

            // Display all errors together
            if (errors.length > 0) {
                alert(errors.join('\n'));
                e.preventDefault();
            }
        });
    }
});
