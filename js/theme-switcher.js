document.addEventListener('DOMContentLoaded', function() {
    const themeSwitcher = document.getElementById('themeSwitcher');
    const themeIcon = themeSwitcher?.querySelector('.theme-switcher__icon');
    const themeText = themeSwitcher?.querySelector('.theme-switcher__text');
    
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeButton('dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        updateThemeButton('light');
    }
    
    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeButton(newTheme);
        });
    }
    
    function updateThemeButton(theme) {
        if (themeIcon && themeText) {
            if (theme === 'dark') {
                themeIcon.textContent = '🌙';
                themeText.textContent = 'Тёмная тема';
            } else {
                themeIcon.textContent = '☀️';
                themeText.textContent = 'Светлая тема';
            }
        }
    }
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            updateThemeButton(newTheme);
        }
    });
});