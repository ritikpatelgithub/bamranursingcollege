document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navbar = document.querySelector(".navbar");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
      
      // Prevent body scrolling when menu is open
      if (hamburger.classList.contains("active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    });
  }

  // Close mobile menu when clicking a link
  const navItems = document.querySelectorAll(".nav-links a");
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      if (hamburger && hamburger.classList.contains("active")) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });
  });

  // Sticky Navbar background change on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Highlight active link based on current page
  const updateActiveLink = () => {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split("/").pop() || "index.html";
    
    navItems.forEach(link => {
      const linkHref = link.getAttribute("href");
      if (linkHref === currentPage) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };
  
  updateActiveLink();

  // Scroll Animations (Fade-in on scroll)
  const fadeElements = document.querySelectorAll(".fade-in");
  const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("appear");
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  fadeElements.forEach(el => {
    appearOnScroll.observe(el);
  });
  
  // Initialize Page Specific Scripts
  initCarousel();
  initForms();
});

// Simple Slider for Homepage
function initCarousel() {
  const slides = document.querySelectorAll('.hero-slide');
  let currentSlide = 0;

  if (slides.length > 1) {
    // Show first slide
    slides[0].classList.add('active');
    
    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, 5000); // 5 seconds per slide
  } else if (slides.length === 1) {
    slides[0].classList.add('active');
  }
}

// Form Validations
function initForms() {
  const admissionForm = document.getElementById("admissionForm");
  const contactForm = document.getElementById("contactForm");

  if (admissionForm) {
    admissionForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const email = document.getElementById("email").value.trim();
      
      if (!name || !phone || !email) {
        alert("Please fill in all required fields.");
        return;
      }

      if (phone.length < 10) {
        alert("Please enter a valid 10-digit phone number.");
        return;
      }
      
      // Simulate form submission
      alert("Admission Application Submitted Successfully! Our team will contact you soon.");
      admissionForm.reset();
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        alert("Please fill in all required fields.");
        return;
      }

      // Simulate form submission
      alert("Thank you for contacting Bamra Nursing College. We have received your message and will get back to you shortly.");
      contactForm.reset();
    });
  }
}
