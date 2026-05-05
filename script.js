const modelosPlacas = [
    {
        src: 'imagens/placa_particular.png',
        nome: 'Placa Mercosul Particular',
        tipo: 'carro',
        cor: '#1a1a1a'
    },
    {
        src: 'imagens/placa_comercial.png',
        nome: 'Placa Mercosul Comercial',
        tipo: 'carro',
        cor: '#cc1122'
    },
    {
        src: 'imagens/placa_oficial.png',
        nome: 'Placa Mercosul Oficial',
        tipo: 'carro',
        cor: '#1a6bbf'
    },
    {
        src: 'imagens/placa-colecionador-preta.png',
        nome: 'Placa Mercosul Colecionador Original',
        tipo: 'carro',
        cor: '#f1f1f1'
    },
    {
        src: 'imagens/placa_colecionador.png',
        nome: 'Placa Mercosul Colecionador Modificado ',
        tipo: 'carro',
        cor: '#b0a0a8'
    },
    {
        src: 'imagens/placa_especial.png',
        nome: 'Placa Mercosul Especial',
        tipo: 'carro',
        cor: '#1a8c3a'
    },
    {
        src: 'imagens/placa_diplomatico.png',
        nome: 'Placa Mercosul Diplomático',
        tipo: 'carro',
        cor: '#e08000'
    },
    {
        src: 'imagens/moto_particular.png',
        nome: 'Placa Moto Particular',
        tipo: 'moto',
        cor: '#000000'
    },
    {
        src: 'imagens/moto_comercial.png',
        nome: 'Placa Moto Comercial',
        tipo: 'moto',
        cor: '#cc1122'
    },
    {
        src: 'imagens/moto_oficial.png',
        nome: 'Placa Moto Oficial',
        tipo: 'moto',
        cor: '#1a6bbf'
    },
    {
        src: 'imagens/moto-colecionador-preta.png',
        nome: 'Placa Moto Colecionador Original',
        tipo: 'moto',
        cor: '#f1f1f1'
    },
    {
        src: 'imagens/moto_colecionador.png',
        nome: 'Placa Moto Colecionador Modificado',
        tipo: 'moto',
        cor: '#b0a0a8'
    },
    {
        src: 'imagens/moto_especial.png',
        nome: 'Placa Moto Especial',
        tipo: 'moto',
        cor: '#1a8c3a'
    },
    {
        src: 'imagens/moto_diplomatico.png',
        nome: 'Placa Moto Diplomático',
        tipo: 'moto',
        cor: '#e08000'
    },
];


/* --- SIMULADOR --- */

const inputPlaca = document.getElementById('inputPlaca');
const displayPlaca = document.getElementById('placaTexto');
const imgFundoSim = document.getElementById('placaFundoSim');
const nomeModeloSim = document.getElementById('nomeModeloPlaca');
const containerSim = document.getElementById('placaContainerSim');
const simPrev = document.getElementById('simPrev');
const simNext = document.getElementById('simNext');

let simIndex = 0;
let simTransicionando = false;

function atualizarInterfaceSimulador(direcao = 0) {
    if (!imgFundoSim || !nomeModeloSim) return;

    const modelo = modelosPlacas[simIndex];
    const sairX = direcao > 0 ? '-60px' : '60px';
    const entrarX = direcao > 0 ? '60px' : '-60px';

    containerSim.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    containerSim.style.opacity = '0';
    containerSim.style.transform = `translateX(${sairX})`;

    setTimeout(() => {
        imgFundoSim.src = modelo.src;
        nomeModeloSim.innerText = modelo.nome;
        containerSim.className = `placa-base tipo-${modelo.tipo}`;
        displayPlaca.style.color = modelo.cor;

        const valor = inputPlaca.value.toUpperCase() || 'ABC1D23';
        if (modelo.tipo === 'moto' && valor.length > 3) {
            displayPlaca.innerHTML = valor.substring(0, 3) + '<br>' + valor.substring(3);
        } else {
            displayPlaca.innerText = valor;
        }

        containerSim.style.transform = `translateX(${entrarX})`;
        containerSim.style.opacity = '0';

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                containerSim.style.transition = 'opacity 0.3s ease, transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                containerSim.style.opacity = '1';
                containerSim.style.transform = 'translateX(0)';
                simTransicionando = false;
            });
        });
    }, 260);
}

if (inputPlaca && displayPlaca) {
    inputPlaca.addEventListener('input', (e) => {
        const valor = e.target.value.toUpperCase();
        const modeloAtual = modelosPlacas[simIndex];

        if (modeloAtual.tipo === 'moto' && valor.length > 3) {
            displayPlaca.innerHTML = valor.substring(0, 3) + '<br>' + valor.substring(3);
        } else {
            displayPlaca.innerText = valor || 'ABC1D23';
            displayPlaca.style.display = 'block';
        }
    });
}

if (simNext && simPrev) {
    simNext.addEventListener('click', () => {
        if (simTransicionando) return;
        simTransicionando = true;
        simIndex = (simIndex + 1) % modelosPlacas.length;
        atualizarInterfaceSimulador(1);
    });
    simPrev.addEventListener('click', () => {
        if (simTransicionando) return;
        simTransicionando = true;
        simIndex = (simIndex - 1 + modelosPlacas.length) % modelosPlacas.length;
        atualizarInterfaceSimulador(-1);
    });
}


/* --- SCROLL REVEAL --- */

function inicializarScrollReveal() {
    const elementos = document.querySelectorAll(
        '.card, .about-section, .about-image, .about-content, ' +
        '.maps-section, .simulador-section, .section-header, ' +
        '.input-container-side, .simulador-visual, .map-container'
    );

    elementos.forEach((el) => {
        el.classList.add('reveal');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    elementos.forEach((el) => observer.observe(el));
}

function inicializarRevealCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.1}s`;
    });
}


/* --- INICIALIZAÇÃO --- */

document.addEventListener('DOMContentLoaded', () => {
  
    atualizarInterfaceSimulador();
    inicializarScrollReveal();
    inicializarRevealCards();
});