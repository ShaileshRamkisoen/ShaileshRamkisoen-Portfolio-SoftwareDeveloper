document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.querySelector('#submit-btn');
    const captchaError = document.querySelector('#captcha-error');
    const form = document.querySelector('.contact-form-wrapper');  // Dit moet de form zijn met de class 'contact-form'

    // Controleer of het formulier bestaat
    if (!form) {
        console.error("Formulier niet gevonden, probeer het later opnieuw!");
        return;  // Stop de uitvoering als het formulier niet gevonden wordt
    }

    // Zet de knop standaard uit
    submitButton.disabled = true;

    // Callback functie die wordt aangeroepen wanneer de captcha is voltooid
    window.enableSubmitButton = function() {
        submitButton.disabled = false;
        captchaError.style.visibility = 'hidden';  // Verberg de foutmelding als captcha is ingevuld
    };

    // Voeg een submit event listener toe aan het formulier
    form.addEventListener('submit', function (e) {
        // Controleer of de reCAPTCHA is ingevuld
        const response = grecaptcha.getResponse();
        if (response.length === 0) {
            e.preventDefault();  // Voorkom dat het formulier wordt verzonden
            captchaError.style.visibility = 'visible';  // Toon de foutmelding
        } else {
            captchaError.style.visibility = 'hidden';  // Verberg de foutmelding als captcha correct is ingevuld
        }
    });
});
