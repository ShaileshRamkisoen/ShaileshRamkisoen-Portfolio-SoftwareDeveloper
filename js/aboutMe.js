document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.skill-slide');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  const dotsContainer = document.querySelector('.carousel-dots');
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  let currentIndex = 0;
  let visibleSlides = [...slides];
  let autoPlayInterval;
  
  // Initialize all slides as blurred except the first one
  visibleSlides.forEach((slide, index) => {
    if (index !== 0) {
      slide.classList.add('blurred');
    }
  });
  
  // Make first slide active and ensure it's not blurred
  visibleSlides[0].classList.add('active');
  visibleSlides[0].classList.remove('blurred');
  
  function updateDots() {
      // Clear existing dots
      dotsContainer.innerHTML = '';
      
      // Create dots only for visible slides
      visibleSlides.forEach((_, index) => {
          const dot = document.createElement('div');
          dot.classList.add('dot');
          if (index === currentIndex) dot.classList.add('active');
          dot.addEventListener('click', () => goToSlide(index));
          dotsContainer.appendChild(dot);
      });
  }
  
  function updateActiveSlide() {
    visibleSlides.forEach((slide, index) => {
      // First remove all classes
      slide.classList.remove('active');
      slide.classList.remove('blurred');
      
      // Then add appropriate classes
      if (index === currentIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.add('blurred');
      }
    });
  }
  
  function goToSlide(index) {
      currentIndex = index;
      const slideWidth = visibleSlides[0].offsetWidth;
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      updateDots();
      updateActiveSlide();
  }
  
  function nextSlide() {
      currentIndex = (currentIndex + 1) % visibleSlides.length;
      goToSlide(currentIndex);
  }
  
  function prevSlide() {
      currentIndex = (currentIndex - 1 + visibleSlides.length) % visibleSlides.length;
      goToSlide(currentIndex);
  }
  
  // Function to start autoplay
  function startAutoPlay() {
    clearInterval(autoPlayInterval); // Clear any existing interval
    autoPlayInterval = setInterval(() => {
      if (document.hasFocus()) {
        nextSlide();
      }
    }, 10000);
  }
  
  // Filter functionality
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Reset timer when filter button is clicked
      startAutoPlay();
      
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      
      const filterValue = button.getAttribute('data-filter');
      
      // Reset visible slides array based on filter
      if (filterValue === 'all') {
        visibleSlides = [...slides];
      } else {
        visibleSlides = [...slides].filter(slide => 
          slide.getAttribute('data-category') === filterValue
        );
      }
      
      // Show/hide slides based on filter
      slides.forEach(slide => {
        if (filterValue === 'all' || slide.getAttribute('data-category') === filterValue) {
          slide.style.display = 'block';
        } else {
          slide.style.display = 'none';
        }
      });
      
      // Reset to first slide of filtered category
      currentIndex = 0;
      goToSlide(0);
      
      // Update dots for new filtered set
      updateDots();
    });
  });
  
  // Event listeners
  prevButton.addEventListener('click', prevSlide);
  nextButton.addEventListener('click', nextSlide);
  
  // Initialize dots
  updateDots();
  
  // Set initial active slide
  updateActiveSlide();
  
  // Start initial autoplay
  startAutoPlay();
});
