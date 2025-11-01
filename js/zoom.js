// Seleciona todas as imagens do catálogo (AGORA com a classe 'card-img-top' do Bootstrap)
const imagens = document.querySelectorAll('.card-img-top');

// Cria o modal dinamicamente
const modal = document.createElement('div');
modal.id = 'zoomModal';
// CLASSE CONVERTIDA: Usando classes de modal do Bootstrap no CSS (d-none, fixed, etc)
// e a classe 'zoom-modal' customizada para o z-index e fundo
modal.className = 'd-none position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center zoom-modal';
modal.innerHTML = `
  <div class="position-relative w-100 d-flex justify-content-center align-items-center" style="max-width: 1140px;">
        <button id="prevImage" class="btn btn-lg text-white position-absolute start-0 ms-2 ms-md-4 fs-3 fw-bold opacity-75 hover-opacity-100 select-none z-3" style="font-size: 3rem; line-height: 1; border: none;">&#10094;</button>
    <img id="zoomedImage" src="" alt="Zoom"
      class="img-fluid rounded-3 shadow-lg transition-transform-opacity" style="max-height: 90vh;">
    <button id="nextImage" class="btn btn-lg text-white position-absolute end-0 me-2 me-md-4 fs-3 fw-bold opacity-75 hover-opacity-100 select-none z-3" style="font-size: 3rem; line-height: 1; border: none;">&#10095;</button>
        <button id="closeModal" class="btn btn-sm text-white position-absolute top-0 end-0 me-3 mt-2 fs-3 fw-bold opacity-75 hover-opacity-100" style="font-size: 2rem; line-height: 1; border: none;">&times;</button>
  </div>
`;
document.body.appendChild(modal);

// Referências internas
const zoomedImage = modal.querySelector('#zoomedImage');
const closeModal = modal.querySelector('#closeModal');
const prevBtn = modal.querySelector('#prevImage');
const nextBtn = modal.querySelector('#nextImage');

let imagemAtual = 0;

// Função: abrir modal
function abrirModal(index) {
  imagemAtual = index;
  zoomedImage.src = imagens[imagemAtual].src;
  modal.classList.remove('d-none'); // Esconde -> Mostra
}

// Função: fechar modal
function fecharModal() {
  modal.classList.add('d-none'); // Mostra -> Esconde
}

// Função: mostrar anterior
function imagemAnterior() {
  imagemAtual = (imagemAtual - 1 + imagens.length) % imagens.length;
  transicaoImagem();
}

// Função: mostrar próxima
function proximaImagem() {
  imagemAtual = (imagemAtual + 1) % imagens.length;
  transicaoImagem();
}

// Transição suave (replicando o efeito de fade)
function transicaoImagem() {
  zoomedImage.style.opacity = '0'; // Adiciona 'opacity-0'
  setTimeout(() => {
    zoomedImage.src = imagens[imagemAtual].src;
    zoomedImage.style.opacity = '1'; // Remove 'opacity-0'
  }, 200);
}

// Eventos
imagens.forEach((img, index) => {
  // Adicionando classe de cursor manualmente, pois o Bootstrap não tem
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => abrirModal(index));
});

closeModal.addEventListener('click', fecharModal);
prevBtn.addEventListener('click', imagemAnterior);
nextBtn.addEventListener('click', proximaImagem);

// Fecha clicando fora
modal.addEventListener('click', (e) => {
  if (e.target === modal) fecharModal();
});

// Navegação por teclado (← → Esc)
document.addEventListener('keydown', (e) => {
  if (modal.classList.contains('d-none')) return;
  if (e.key === 'ArrowLeft') imagemAnterior();
  if (e.key === 'ArrowRight') proximaImagem();
  if (e.key === 'Escape') fecharModal();
});


// =======================================================
// CONTROLE DO POP-UP DE PROMOÇÃO AMIL (ADAPTAÇÃO)
// =======================================================

const promoModal = document.getElementById('promoAmilModal');
const promoContent = document.getElementById('promoAmilContent');

// Função para Abrir o Pop-up
function abrirPromoAmil() {
  // Verifica se o modal de zoom está aberto (d-none)
  if (modal.classList.contains('d-none')) {
    promoModal.classList.remove('d-none'); // Remove 'hidden' -> d-none
    promoModal.classList.add('d-flex'); // Adiciona d-flex
    // Efeitos de escala removidos no JS, usaremos apenas o CSS
  }
}

// Função para Fechar o Pop-up
function fecharPromoAmil() {
  promoModal.classList.remove('d-flex');
  promoModal.classList.add('d-none');
}

// Configuração do Comportamento Automático
const tempoParaAbrirPromo = 2000; // 2 segundos após o DOM
const tempoParaFecharPromo = 6000; // Fica 6 segundos aberto

// Garante que o script roda sem conflitar com window.onload ou outros eventos
document.addEventListener('DOMContentLoaded', function () {

  // Inicia a abertura automática
  setTimeout(function () {
    abrirPromoAmil();

    // Inicia o temporizador para fechar
    setTimeout(function () {
      fecharPromoAmil();
    }, tempoParaFecharPromo);

  }, tempoParaAbrirPromo);
});

// Fecha clicando fora (para este modal específico)
promoModal.addEventListener('click', (e) => {
  if (e.target === promoModal) fecharPromoAmil();
});

// Navegação por teclado: Fecha a promoção com ESC
document.addEventListener('keydown', (e) => {
  if (promoModal.classList.contains('d-none')) return; // Confere se está fechado
  if (e.key === 'Escape') fecharPromoAmil();
});