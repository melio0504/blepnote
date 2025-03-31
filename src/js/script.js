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