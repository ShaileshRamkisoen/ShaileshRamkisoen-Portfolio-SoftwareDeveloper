document.addEventListener('DOMContentLoaded', function() {
    const loader = document.querySelector('.loader-wrapper');
    const mainContent = document.querySelector('main');
    const typewriterText = document.querySelector('.typewriter');
    let timeoutDone = false;
    let loadingDone = false;

    // Check if visited during this session
    const hasVisitedThisSession = sessionStorage.getItem('hasVisitedThisSession');

    // Get the current page path
    const currentPath = window.location.pathname;
    const previousPath = sessionStorage.getItem('previousPath');

    // If navigating between internal pages, skip loader
    if (previousPath && hasVisitedThisSession) {
        loader.style.display = 'none';
        if (mainContent) {
            mainContent.style.opacity = '1';
        }
        if (typewriterText) {
            typewriterText.style.opacity = '1';
            typewriterText.style.animation = 'typing 2.8s steps(60, end) forwards, blink-caret 0.75s step-end infinite';
        }
        document.body.classList.add('content-loaded');
    } else {
        // First visit in this session - show loader
        sessionStorage.setItem('hasVisitedThisSession', 'true');

        // Initially hide the main content and typewriter text
        if (mainContent) {
            mainContent.style.opacity = '0';
            mainContent.style.transition = 'opacity 0.5s ease-in';
        }
        
        if (typewriterText) {
            typewriterText.style.opacity = '0';
            typewriterText.style.animation = 'none';
        }

        // Set minimum loading time of 7 seconds
        setTimeout(() => {
            timeoutDone = true;
            if (loadingDone) hideLoader();
        }, 7000);

        // Check when page is fully loaded
        window.addEventListener('load', () => {
            loadingDone = true;
            if (timeoutDone) hideLoader();
        });
    }

    // Store current path for next navigation
    sessionStorage.setItem('previousPath', currentPath);

    function hideLoader() {
        loader.classList.add('loaded');
        
        // After loader fades out, show the main content and start typewriter
        setTimeout(() => {
            loader.style.display = 'none';
            if (mainContent) {
                mainContent.style.opacity = '1';
            }
            // Start typewriter animation
            if (typewriterText) {
                typewriterText.style.opacity = '1';
                typewriterText.style.animation = 'typing 2.8s steps(60, end) forwards, blink-caret 0.75s step-end infinite';
            }
            // Trigger any other animations that should start after load
            document.body.classList.add('content-loaded');
        }, 500);
    }
}); 