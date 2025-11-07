// Wait for the DOM to be ready before running any code
document.addEventListener("DOMContentLoaded", function () {

    // --- 1. EMAILJS INITIALIZATION ---
    (function(){
       //EmailJS Public Key
       emailjs.init({
         publicKey: "31kLts5M15PU-Fysd",
       });
    })();

    // --- 2. INTERSECTION OBSERVER & TYPING EFFECT ---
    const nameEl = document.querySelector("#NameRole h3");
    const roleEl = document.querySelector("#NameRole h4");
    let nameText = "";
    let roleText = "";
    let typingStarted = false; 

    if (nameEl && roleEl) {
        nameText = nameEl.textContent;
        roleText = roleEl.textContent;
        nameEl.textContent = "";
        roleEl.textContent = "";
    }

    function typeEffect(element, text, speed, callback) {
        let i = 0;
        const pauseTime = 1000;
        element.classList.add("typing-effect");

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                element.classList.remove("typing-effect");
                if (callback) {
                    setTimeout(callback, pauseTime);
                }
            }
        }
        type();
    }

    function startTyping() {
        typeEffect(nameEl, nameText, 100, null);
        typeEffect(roleEl, roleText, 75, null); 
    }

    // This is the IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                if (entry.target.id === 'NameRole' && !typingStarted) {
                    typingStarted = true;
                    startTyping();
                }
            } else {
                entry.target.classList.remove('in-view');
            }
        });
});

    const blocksToWatch = document.querySelectorAll('.block, .lblock, .rblock');
    blocksToWatch.forEach((el) => observer.observe(el));


    // --- 3. PROJECT GALLERY MODAL SCRIPT ---
    const galleryModal = document.getElementById('projectGalleryModal');
    const modalTitle = document.getElementById('projectModalTitle');
    const carouselInner = document.getElementById('galleryCarouselInner');
    const modalDescription = document.getElementById('projectModalDescription');
    const modalFeatures = document.getElementById('projectModalFeatures');
    const modalStack = document.getElementById('projectModalStack');
    const modalRole = document.getElementById('projectModalRole');

    // This code now correctly runs *inside* DOMContentLoaded
    if (galleryModal) {
        galleryModal.addEventListener('show.bs.modal', function (event) {
            const row = event.relatedTarget;
            
            const title = row.getAttribute('data-project-title');
            const images = row.getAttribute('data-images').split(',');
            const description = row.getAttribute('data-description');
            const features = row.getAttribute('data-features').split('?');
            const stack = row.getAttribute('data-stack').split('?');
            const role = row.getAttribute('data-role');

            modalTitle.textContent = title;
            modalDescription.textContent = description;
            modalRole.textContent = role;
            
            carouselInner.innerHTML = '';
            images.forEach((imageUrl, index) => {
                const carouselItem = document.createElement('div');
                carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
                
                const img = document.createElement('img');
                img.src = imageUrl;
                img.className = 'd-block w-100 rounded-4';
                img.alt = `${title} screenshot ${index + 1}`;
                
                carouselItem.appendChild(img);
                carouselInner.appendChild(carouselItem);
            });
            
            modalFeatures.innerHTML = '';
            features.forEach(featureText => {
                const li = document.createElement('li');
                li.textContent = featureText.trim();
                modalFeatures.appendChild(li);
            });

            modalStack.innerHTML = '';
            stack.forEach(techText => {
                const span = document.createElement('span');
                span.className = 'badge bg-secondary m-1';
                span.textContent = techText.trim();
                modalStack.appendChild(span);
            });
        });
    }

    // --- 4. PARTICLES, CONTACT FORM, & ANIMATIONS ---

    // Hero Section Particles
    tsParticles.load("particles-hero", {
        fullScreen: false, 
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: ["#FFFFFF", "#a7bfff"] },
            shape: { type: "circle" },
            opacity: { value: { min: 0.1, max: 0.6 }, random: true },
            size: { value: { min: 2, max: 12 }, random: true },
            links: { enable: false },
            move: { enable: true, speed: 1, direction: "none", out_mode: "out" }
        },
        interactivity: {
            events: { onhover: { enable: true, mode: "repulse" } },
            modes: { repulse: { distance: 100 } }
        },
        retina_detect: true,
        background: { color: "transparent" }
    });

    // Contact Section Particles
    tsParticles.load("particles-contact", {
        fullScreen: false,
        particles: {
            number: { value: window.innerWidth < 768 ? 60 : 150 },
            color: { value: ["#FFFFFF", "#0d6efd"] },
            shape: { type: "circle" },
            opacity: { value: 0.4, random: true },
            size: { value: 2, random: true },
            links: { enable: true, distance: 120, color: "#ffffff", opacity: 0.3, width: 1 },
            move: { enable: true, speed: 2, direction: "none", out_mode: "out" }
        },
        interactivity: {
            detectsOn: "window",
            events: { onhover: { enable: true, mode: "grab" } },
            modes: { grab: { distance: 140, links: { opacity: 0.7 } } }
        },
        retina_detect: true,
        pauseOnBlur: false,
        pauseOnOutsideViewport: false,
        background: { color: "transparent" }
    });

// Keep contactParticles responsive and visible after resize/orientation
let resizeTimer;

window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const contactSection = document.getElementById("Contact");
    if (contactSection && contactSection.offsetParent !== null) {
      contactParticles(); // just re-run your existing setup
    }
  }, 400);
});

window.addEventListener("orientationchange", () => {
  setTimeout(() => {
    const contactSection = document.getElementById("Contact");
    if (contactSection && contactSection.offsetParent !== null) {
      contactParticles();
    }
  }, 400);
});


    // Keep contact particles visible after resize/orientation
let contactResizeTimer;

const restoreContactParticles = () => {
  const instance = tsParticles.dom().find(p => p.id === "particles-contact");
  if (!instance) return;

  const canvas = instance.canvas.element;
  const section = document.getElementById("Contact");

  // Only refresh if canvas height collapsed or section changed height
  if (canvas && (canvas.offsetHeight === 0 || canvas.height !== section.offsetHeight)) {
    instance.refresh();
  }
};

window.addEventListener("resize", () => {
  clearTimeout(contactResizeTimer);
  contactResizeTimer = setTimeout(restoreContactParticles, 600);
});

window.addEventListener("orientationchange", () => {
  setTimeout(restoreContactParticles, 600);
});


    // Contact Form Script
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault(); 
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = "Sending...";
            submitButton.disabled = true;

            const serviceID = 'service_mg1wh7s';
            const templateID = 'template_5zoqett';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    submitButton.textContent = "Message Sent! ✅";
                    alert('Message sent successfully!');
                    contactForm.reset();
                    setTimeout(() => {
                        submitButton.textContent = originalButtonText;
                        submitButton.disabled = false;
                    }, 3000);
                }, (err) => {
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                    alert('Failed to send message. Please try again.\n' + JSON.stringify(err));
                });
        });
    }

    // Holo Tilt Effect
    const card = document.getElementById("picture");
    if (card) {
        card.addEventListener("mousemove", function (e) {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const rotateY = (x - 0.5) * 30; 
            const rotateX = (0.5 - y) * 30; 
            const xPercent = x * 100;
            const yPercent = y * 100;
            const xOppoPercent = (1 - x) * 100;
            const yOppoPercent = (1 - y) * 100;
            
            card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
            card.style.setProperty('--x', `${xPercent}%`);
            card.style.setProperty('--y', `${yPercent}%`);
            card.style.setProperty('--x-oppo', `${xOppoPercent}%`);
            card.style.setProperty('--y-oppo', `${yOppoPercent}%`);
        });

        card.addEventListener("mouseleave", function () {
            card.style.transform = "rotateY(0deg) rotateX(0deg)";
            card.style.setProperty('--x', `50%`);
            card.style.setProperty('--y', `50%`);
            card.style.setProperty('--x-oppo', `50%`);
            card.style.setProperty('--y-oppo', `50%`);
        });
    }

    // Navbar Scroll Effect
    const nav = document.querySelector('.navbar');
    const homeSection = document.getElementById('Home');
    if (nav && homeSection) {
        const homeSectionHeight = homeSection.offsetHeight;
        window.addEventListener('scroll', function() {
            const triggerPoint = homeSectionHeight * 0.8; 
            if (window.scrollY > triggerPoint) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // Parallax Effect
    const heroParticles = document.getElementById("particles-hero");
    const blueSphere = document.getElementById("blue-sphere");
    const purpleSphere = document.getElementById("purple-sphere");
    const sphere3 = document.getElementById("sphere-3");
    const sphere4 = document.getElementById("sphere-4");
    const sphere5 = document.getElementById("sphere-5");

    if (heroParticles || blueSphere || purpleSphere || sphere3 || sphere4 || sphere5) {
        window.addEventListener("scroll", function() {
            let scrollPosition = window.scrollY;
            if (heroParticles) { heroParticles.style.transform = `translateY(${scrollPosition * 0.5}px)`; }
            if (purpleSphere) { purpleSphere.style.transform = `translateY(${scrollPosition * 0.65}px)`; }
            if (sphere3) { sphere3.style.transform = `translateY(${scrollPosition * 0.55}px)`; }
            if (blueSphere) { blueSphere.style.transform = `translateY(${scrollPosition * 0.4}px)`; }
            if (sphere5) { sphere5.style.transform = `translateY(${scrollPosition * 0.25}px)`; }
            if (sphere4) { sphere4.style.transform = `translateY(${scrollPosition * 0.15}px)`; }
        });
    }

    // Contact Parallax Effect
    const contactSection = document.getElementById("Contact");
    const contactParticles = document.getElementById("particles-contact");
    const contactSphere1 = document.getElementById("contact-sphere-1");
    const contactSphere2 = document.getElementById("contact-sphere-2");
    const contactSphere3 = document.getElementById("contact-sphere-3");

    if (contactSection && (contactParticles || contactSphere1 || contactSphere2 || contactSphere3)) {
        const contactSectionTop = contactSection.offsetTop;
        
        window.addEventListener("scroll", function() {
            const startParallax = contactSectionTop - window.innerHeight;
            if (window.scrollY > startParallax) {
                let relativeScroll = window.scrollY - startParallax;
                if (contactParticles) { contactParticles.style.transform = `translateY(${relativeScroll * 0.5}px)`; }
                if (contactSphere2) { contactSphere2.style.transform = `translateY(${relativeScroll * 0.6}px)`; }
                if (contactSphere1) { contactSphere1.style.transform = `translateY(${relativeScroll * 0.4}px)`; }
                if (contactSphere3) { contactSphere3.style.transform = `translateY(${relativeScroll * 0.2}px)`; }
            }
        });
    }
    
});