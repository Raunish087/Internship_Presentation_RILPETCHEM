/* app.js - Presentation Interactive Logic & Presenter Mode Synchronization */

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide-canvas');
  const navItems = document.querySelectorAll('.slide-nav-item');
  const prevBtn = document.getElementById('btn-prev');
  const nextBtn = document.getElementById('btn-next');
  const progressBar = document.getElementById('progress-bar');
  const slideCounter = document.getElementById('slide-counter');
  
  const toggleNotesBtn = document.getElementById('btn-toggle-notes');
  const toggleSidebarBtn = document.getElementById('btn-toggle-sidebar');
  const fullscreenBtn = document.getElementById('btn-fullscreen');
  
  const notesSidebar = document.getElementById('notes-sidebar');
  const slideSidebar = document.getElementById('slide-sidebar');
  const notesContent = document.getElementById('notes-content');
  
  let currentSlideIndex = 0;
  
  // Update slide rendering
  function updateSlide(index) {
    if (index < 0 || index >= slides.length) return;
    
    // Deactivate current slide
    slides[currentSlideIndex].classList.remove('active');
    navItems[currentSlideIndex].classList.remove('active');
    
    // Activate new slide
    currentSlideIndex = index;
    slides[currentSlideIndex].classList.add('active');
    navItems[currentSlideIndex].classList.add('active');
    
    // Sync Speaker Notes
    const activeSlide = slides[currentSlideIndex];
    const notesHtml = activeSlide.querySelector('.speaker-notes').innerHTML;
    notesContent.innerHTML = notesHtml;
    
    // Sync Navigation Footer
    const slideNumber = currentSlideIndex + 1;
    slideCounter.textContent = `Slide ${slideNumber} of ${slides.length}`;
    
    const progressPercent = (slideNumber / slides.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
    
    // Scroll sidebar item into view
    navItems[currentSlideIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  
  // Navigation Event Handlers
  function nextSlide() {
    if (currentSlideIndex < slides.length - 1) {
      updateSlide(currentSlideIndex + 1);
    }
  }
  
  function prevSlide() {
    if (currentSlideIndex > 0) {
      updateSlide(currentSlideIndex - 1);
    }
  }
  
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  
  // Keyboard Controls
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
      e.preventDefault();
      prevSlide();
    }
  });
  
  // Sidebar clicks
  navItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      updateSlide(index);
    });
  });
  
  // UI Panels Toggles
  toggleNotesBtn.addEventListener('click', () => {
    notesSidebar.classList.toggle('collapsed');
    toggleNotesBtn.classList.toggle('active');
  });
  
  toggleSidebarBtn.addEventListener('click', () => {
    slideSidebar.classList.toggle('collapsed');
    toggleSidebarBtn.classList.toggle('active');
  });
  
  // Fullscreen toggle
  fullscreenBtn.addEventListener('click', () => {
    const mainSection = document.querySelector('.presentation-stage');
    if (!document.fullscreenElement) {
      mainSection.requestFullscreen().catch(err => {
        alert(`Error enabling fullscreen mode: ${err.message}`);
      });
      fullscreenBtn.textContent = 'Exit Fullscreen';
    } else {
      document.exitFullscreen();
      fullscreenBtn.textContent = 'Fullscreen';
    }
  });
  
  // Monitor fullscreen change to restore button text
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      fullscreenBtn.textContent = 'Fullscreen';
    }
  });
  
  // Initial slide load
  updateSlide(0);
});
