document.addEventListener("DOMContentLoaded", () => {
    const loader = document.querySelector(".loader");
    const heroContent = document.querySelector(".hero-content"); // Hero-content selecteren
    const navbar = document.querySelector(".navbar");
    const content = document.querySelector(".content");
    
    const typewriterText = ['Full-Stack', 'Web', 'Developer'];
    const targetElement = document.querySelector('.hero-content h1');

    // Functie om tekst te typen
    const typeText = (text, i = 0, callback) => {
        if (i < text.length) {
            targetElement.innerHTML += text.charAt(i); // Voeg één karakter toe
            setTimeout(() => typeText(text, i + 1, callback), 100); // Snelheid aanpassen
        } else if (callback) {
            callback(); // Roep de callback aan als de tekst is getypt
        }
    };

    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Simuleer laadproces
    setTimeout(() => {
        // Verwijder de loader met fade-out
        loader.style.opacity = "0";
        loader.style.transition = "opacity 1s ease-in-out";

        setTimeout(() => {
            loader.style.display = "none"; // Loader volledig verwijderen na fade-out

            // Fade-in van de navbar
            navbar.style.display = "flex";
            navbar.style.opacity = "0";
            navbar.style.transition = "opacity 1s ease-in-out";

            setTimeout(() => {
                navbar.style.opacity = "1"; // Fade-in van de navbar
            }, 100);

            // Toon de inhoud
            content.style.display = "block";
            setTimeout(() => {
                content.style.opacity = "1"; // Fade-in van de content

                // Voeg de fade-in class toe aan hero-content en trigger de animatie voor h1 en p
                heroContent.classList.add("fade-in"); // Activeer CSS-animatie

                // Begin de typewriter animatie
                typeText(typewriterText[0], 0, () => {
                    setTimeout(() => {
                        targetElement.innerHTML += ' '; // Voeg een spatie toe
                        typeText(typewriterText[1], 0, () => {
                            setTimeout(() => {
                                targetElement.innerHTML += ' '; // Voeg een spatie toe
                                typeText(typewriterText[2], 0); // Typ het laatste deel
                            }, 500);
                        });
                    }, 500);
                });

            }, 500); // Wacht even voordat je de content laat verschijnen

            document.body.classList.remove("loading"); // Sta scrollen weer toe
        }, 1000); // Wacht nog even na de fade-out voor de loader
    }, 3000); // Simuleer een 3-seconden laadproces
});
