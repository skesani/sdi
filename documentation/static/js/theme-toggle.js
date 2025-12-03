// Theme Toggle Functionality - Works with any Hugo theme
(function() {
  'use strict';

  // Get theme from localStorage or default to 'light'
  const getTheme = () => {
    return localStorage.getItem('theme') || 'light';
  };

  // Set theme
  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateToggleIcon(theme);
    applyThemeStyles(theme);
  };

  // Apply theme styles dynamically
  const applyThemeStyles = (theme) => {
    const isDark = theme === 'dark';
    
    // Update CSS variables
    const root = document.documentElement;
    if (isDark) {
      root.style.setProperty('--bg-color', '#0a2540');
      root.style.setProperty('--text-color', '#ffffff');
      root.style.setProperty('--code-bg', '#1a1f35');
      root.style.setProperty('--code-text', '#e6ebf1');
      root.style.setProperty('--border-color', '#2d3748');
      root.style.setProperty('--link-color', '#7c3aed');
      root.style.setProperty('--sidebar-bg', '#0f172a');
      root.style.setProperty('--sidebar-text', '#e6ebf1');
      root.style.setProperty('--header-bg', '#0a2540');
      root.style.setProperty('--code-block-bg', '#1a1f35');
    } else {
      root.style.setProperty('--bg-color', '#ffffff');
      root.style.setProperty('--text-color', '#0a2540');
      root.style.setProperty('--code-bg', '#f6f9fc');
      root.style.setProperty('--code-text', '#0a2540');
      root.style.setProperty('--border-color', '#e6ebf1');
      root.style.setProperty('--link-color', '#635bff');
      root.style.setProperty('--sidebar-bg', '#fafbfc');
      root.style.setProperty('--sidebar-text', '#0a2540');
      root.style.setProperty('--header-bg', '#ffffff');
      root.style.setProperty('--code-block-bg', '#f6f9fc');
    }

    // Apply styles to body and common elements
    document.body.style.backgroundColor = isDark ? '#0a2540' : '#ffffff';
    document.body.style.color = isDark ? '#ffffff' : '#0a2540';
    
    // Style code blocks
    document.querySelectorAll('pre, code').forEach(el => {
      el.style.backgroundColor = isDark ? '#1a1f35' : '#f6f9fc';
      el.style.color = isDark ? '#e6ebf1' : '#0a2540';
    });

    // Style links
    document.querySelectorAll('a').forEach(el => {
      el.style.color = isDark ? '#7c3aed' : '#635bff';
    });

    // Style tables
    document.querySelectorAll('table th').forEach(el => {
      el.style.backgroundColor = isDark ? '#1a1f35' : '#f6f9fc';
      el.style.color = isDark ? '#e6ebf1' : '#0a2540';
    });
  };

  // Update toggle icon based on theme
  const updateToggleIcon = (theme) => {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    const icon = toggle.querySelector('svg');
    if (!icon) return;

    if (theme === 'dark') {
      // Sun icon for dark mode (click to switch to light)
      icon.innerHTML = `
        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
      `;
      toggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
      // Moon icon for light mode (click to switch to dark)
      icon.innerHTML = `
        <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10 10 0 01-19.47 0 .75.75 0 01.982-.98zM15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
      `;
      toggle.setAttribute('aria-label', 'Switch to dark mode');
    }
  };

  // Toggle theme
  const toggleTheme = () => {
    const currentTheme = getTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  // Create toggle button
  const createToggleButton = () => {
    const toggle = document.createElement('button');
    toggle.id = 'theme-toggle';
    toggle.className = 'theme-toggle';
    toggle.setAttribute('aria-label', 'Toggle theme');
    toggle.onclick = toggleTheme;

    // Add SVG icon
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('viewBox', '0 0 24 24');
    icon.setAttribute('fill', 'currentColor');
    icon.setAttribute('width', '24');
    icon.setAttribute('height', '24');
    toggle.appendChild(icon);

    document.body.appendChild(toggle);
    return toggle;
  };

  // Initialize theme on page load
  const initTheme = () => {
    const theme = getTheme();
    setTheme(theme);

    // Create toggle button if it doesn't exist
    if (!document.getElementById('theme-toggle')) {
      createToggleButton();
      updateToggleIcon(theme);
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }
})();
