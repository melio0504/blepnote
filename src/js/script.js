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