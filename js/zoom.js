// Seleciona todas as imagens do catálogo
const imagens = document.querySelectorAll('.bg-white img');

// Cria o modal dinamicamente
const modal = document.createElement('div');
modal.id = 'zoomModal';
modal.className = 'hidden fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4';
modal.innerHTML = `
  <div class="relative max-w-6xl w-full flex items-center justify-center">
    <!-- Botões de navegação -->
    <button id="prevImage" class="absolute left-2 md:left-6 text-white text-4xl font-bold z-50 hover:text-gray-300 select-none">&#10094;</button>
    <img id="zoomedImage" src="" alt="Zoom"
      class="max-h-[90vh] w-auto mx-auto rounded-lg shadow-lg transform transition-all duration-300 ease-in-out scale-100 opacity-100">
    <button id="nextImage" class="absolute right-2 md:right-6 text-white text-4xl font-bold z-50 hover:text-gray-300 select-none">&#10095;</button>
    <!-- Botão fechar -->
    <button id="closeModal" class="absolute top-2 right-4 text-white text-4xl font-bold z-50 hover:text-gray-300">&times;</button>
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
  modal.classList.remove('hidden');
}

// Função: fechar modal
function fecharModal() {
  modal.classList.add('hidden');
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

// Transição suave com Tailwind
function transicaoImagem() {
  zoomedImage.classList.add('opacity-0', 'scale-95');
  setTimeout(() => {
    zoomedImage.src = imagens[imagemAtual].src;
    zoomedImage.classList.remove('opacity-0', 'scale-95');
  }, 200);
}

// Eventos
imagens.forEach((img, index) => {
  img.classList.add('cursor-pointer');
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
  if (modal.classList.contains('hidden')) return;
  if (e.key === 'ArrowLeft') imagemAnterior();
  if (e.key === 'ArrowRight') proximaImagem();
  if (e.key === 'Escape') fecharModal();
});


// =======================================================
// CONTROLE DO POP-UP DE PROMOÇÃO AMIL (NOVO CÓDIGO)
// =======================================================

const promoModal = document.getElementById('promoAmilModal');
const promoContent = document.getElementById('promoAmilContent');

// Função para Abrir o Pop-up
function abrirPromoAmil() {
  // Verifica se o modal de zoom (seu script) está aberto. Se estiver, NÃO abra o pop-up da Amil.
  if (modal.classList.contains('hidden')) {
    promoModal.classList.remove('hidden');
    promoContent.classList.remove('scale-95');
    promoContent.classList.add('scale-100');
  }
}

// Função para Fechar o Pop-up
function fecharPromoAmil() {
  promoContent.classList.remove('scale-100');
  promoContent.classList.add('scale-95');

  setTimeout(() => {
    promoModal.classList.add('hidden');
  }, 300);
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
  if (promoModal.classList.contains('hidden')) return;
  if (e.key === 'Escape') fecharPromoAmil();
});