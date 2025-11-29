document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('main-nav');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        
        const spans = menuToggle.querySelectorAll('span');
        if (nav.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(12px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-12px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    atualizarEstatisticas();
    
    const observer = new MutationObserver(atualizarEstatisticas);
    observer.observe(document.body, { childList: true, subtree: true });
});

function atualizarEstatisticas() {
    const totalRedacoes = 15;
    const redacoes = document.querySelectorAll('.card-redacao');
    
    let redacoesCompletas = 0;
    redacoes.forEach(redacao => {
        const placeholder = redacao.querySelector('.placeholder');
        if (placeholder && placeholder.textContent.trim() !== '[Espaço para sua redação]') {
            redacoesCompletas++;
        }
    });
    
    const taxaConclusao = Math.round((redacoesCompletas / totalRedacoes) * 100);
    
    document.getElementById('redacoes-completas').textContent = redacoesCompletas;
    document.getElementById('taxa-conclusao').textContent = taxaConclusao + '%';
}

