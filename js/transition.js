document.addEventListener('DOMContentLoaded', function() {
    // Анимация перехода между страницами
    const links = document.querySelectorAll('a[href^=""]:not([target="_blank"])');
    const overlay = document.querySelector('.transition-overlay');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        if (this.href === window.location.href) return;
        
        e.preventDefault();
        overlay.classList.add('active');
        
        setTimeout(() => {
          window.location.href = this.href;
        }, 500);
      });
    });
    
    // Убираем оверлей при загрузке страницы
    setTimeout(() => {
      overlay.classList.remove('active');
    }, 100);
  });