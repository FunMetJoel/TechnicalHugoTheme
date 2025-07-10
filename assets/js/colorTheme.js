document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('theme-toggle');
    const userPref = localStorage.getItem('theme');

    // Apply stored preference or fallback to system
    function setInitialTheme() {
        if (userPref) {
            document.documentElement.setAttribute('data-theme', userPref);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }

    // Toggle and store preference
    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleTheme);
    }
    setInitialTheme();
});
