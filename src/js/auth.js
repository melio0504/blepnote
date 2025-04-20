document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        window.location.href = '../index.html';
        return;
    }

    // Update profile picture everywhere on the page
    const profilePictures = document.querySelectorAll('.profile-picture, .profile-picture-sidebar');
    profilePictures.forEach(img => {
        if (currentUser.profilePicture) {
            img.src = currentUser.profilePicture;
        }
    });

    // Update user name everywhere
    const profileNames = document.querySelectorAll('.profile-name');
    if (currentUser.name) {
        profileNames.forEach(el => {
            el.textContent = currentUser.name;
        });
    }
});