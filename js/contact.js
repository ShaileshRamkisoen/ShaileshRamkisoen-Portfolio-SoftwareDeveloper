document.addEventListener('DOMContentLoaded', function() {
    const messageArea = document.getElementById('message');
    const wordCount = document.getElementById('word-count');
    const form = document.querySelector('.contact-form');
    const submitButton = document.querySelector('.submit-btn');
    const privacyCheckbox = document.querySelector('input[name="privacy"]');
    const MAX_CHARS = 2000;

    // Initially disable submit button
    submitButton.disabled = true;
    submitButton.style.opacity = '0.5';
    submitButton.style.cursor = 'not-allowed';

    // Function to check if all conditions are met
    function updateSubmitButton() {
        const isMessageValid = messageArea.value.length > 0 && messageArea.value.length <= MAX_CHARS;
        const isPrivacyAccepted = privacyCheckbox.checked;
        const isCaptchaCompleted = grecaptcha && grecaptcha.getResponse().length > 0;

        if (isMessageValid && isPrivacyAccepted && isCaptchaCompleted) {
            submitButton.disabled = false;
            submitButton.style.opacity = '1';
            submitButton.style.cursor = 'pointer';
        } else {
            submitButton.disabled = true;
            submitButton.style.opacity = '0.5';
            submitButton.style.cursor = 'not-allowed';
        }
    }

    // Prevent typing more than 2000 characters
    messageArea.addEventListener('input', function() {
        if (this.value.length > MAX_CHARS) {
            this.value = this.value.substring(0, MAX_CHARS);
        }
        wordCount.textContent = `(${this.value.length}/${MAX_CHARS} characters)`;
        updateSubmitButton();
    });

    // Check when privacy policy checkbox changes
    privacyCheckbox.addEventListener('change', updateSubmitButton);

    // Callback for reCAPTCHA
    window.enableSubmitButton = function() {
        updateSubmitButton();
    };

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const isMessageValid = messageArea.value.length > 0 && messageArea.value.length <= MAX_CHARS;
        const isPrivacyAccepted = privacyCheckbox.checked;
        const isCaptchaCompleted = grecaptcha && grecaptcha.getResponse().length > 0;

        if (!isMessageValid || !isPrivacyAccepted || !isCaptchaCompleted) {
            let errorMessage = 'Please complete all required fields:\n';
            if (!isMessageValid) errorMessage += '- Message (max 2000 characters)\n';
            if (!isPrivacyAccepted) errorMessage += '- Accept Privacy Policy\n';
            if (!isCaptchaCompleted) errorMessage += '- Complete CAPTCHA';
            alert(errorMessage);
            return;
        }

        // Clear form before submission
        localStorage.setItem('formSubmitted', 'true');
        
        // Submit the form traditionally
        form.submit();
    });

    // Check if form was just submitted and clear if needed
    if (localStorage.getItem('formSubmitted') === 'true') {
        form.reset();
        if (typeof grecaptcha !== 'undefined') {
            grecaptcha.reset();
        }
        wordCount.textContent = `(0/${MAX_CHARS} characters)`;
        updateSubmitButton();
        localStorage.removeItem('formSubmitted');
    }
}); 