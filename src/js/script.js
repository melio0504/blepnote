tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
            },
        }
    }
}

document.querySelectorAll('#faq button').forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
        const icon = button.querySelector('svg');
        
        answer.classList.toggle('hidden');
        icon.classList.toggle('rotate-180');
    });
});

// Scroll-To-Top Button
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.remove("opacity-0", "invisible", "translate-y-4");
        scrollToTopBtn.classList.add("opacity-100", "visible", "translate-y-0");
    } else {
        scrollToTopBtn.classList.add("opacity-0", "invisible", "translate-y-4");
        scrollToTopBtn.classList.remove("opacity-100", "visible", "translate-y-0");
    }
});

scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const headerHeight = document.querySelector('nav').offsetHeight;
        
        if (pageYOffset >= (sectionTop - headerHeight - 50)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-blue-600', 'font-medium');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-blue-600', 'font-medium');
        }
    });
});