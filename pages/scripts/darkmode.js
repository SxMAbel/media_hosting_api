const darkModeToggle = document.getElementById('dark-mode-toggle');
    const toggleSlider = document.querySelector('.toggle-slider');

    darkModeToggle.addEventListener('change', function () {
      if (this.checked) {
        document.body.classList.add('dark-mode');
        toggleSlider.classList.remove('sun-mode');
        toggleSlider.classList.add('moon-mode');
      } else {
        document.body.classList.remove('dark-mode');
        toggleSlider.classList.remove('moon-mode');
        toggleSlider.classList.add('sun-mode');
      }
    });
