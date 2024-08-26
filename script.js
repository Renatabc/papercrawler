let draggedElement = null;
let offsetX = 0;
let offsetY = 0;
let isDragging = false;

function flipCard(card) {
    card.classList.toggle('flipped');
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function setupMonsterPile() {
    const pile1 = document.getElementById('pile1');
    
    const monsters = [
        '<div class="card monster1"></div>',
        '<div class="card monster2"></div>',
        '<div class="card monster3"></div>',
        '<div class="card monster4"></div>'  // Esta é a carta que deve sempre permanecer na primeira posição
    ];
    
    const firstCard = monsters.pop();           // Remove a última carta (que deve ser a primeira)
    const shuffledMonsters = shuffle(monsters); // Embaralha as três outras cartas
    shuffledMonsters.unshift(firstCard);        // Insere a última carta no início da lista

    pile1.innerHTML = shuffledMonsters.join('');
}

function setupSecondPile() {
    const pile2 = document.getElementById('pile2');
    
    const cards = [
        '<div class="card room"></div>',       // Carta de sala
        '<div class="card room1"></div>',
        '<div class="card room2"></div>',
        '<div class="card room3"></div>',
        '<div class="card room4"></div>',
        '<div class="card room5"></div>',
        '<div class="card room6"></div>',       // Mais cartas de sala (adicione quantas quiser)
        '<div class="card minion"></div>',     // Carta de monstrinho
        '<div class="card minion1"></div>',     // Mais cartas de monstrinho (adicione quantas quiser)
        '<div class="card merchant"></div>'    // Carta de mercador
    ];
    
    const shuffledCards = shuffle(cards);
    pile2.innerHTML = shuffledCards.join('');
}

document.addEventListener('mousedown', function(event) {
    if (event.target.classList.contains('card')) {
        draggedElement = event.target;
        offsetX = event.clientX - draggedElement.getBoundingClientRect().left;
        offsetY = event.clientY - draggedElement.getBoundingClientRect().top;
        isDragging = false;
    }
});

document.addEventListener('mousemove', function(event) {
    if (draggedElement) {
        isDragging = true;
        draggedElement.style.left = `${event.clientX - offsetX}px`;
        draggedElement.style.top = `${event.clientY - offsetY}px`;
    }
});

document.addEventListener('mouseup', function() {
    draggedElement = null;
});

document.addEventListener('dblclick', function(event) {
    if (event.target.classList.contains('card') && !isDragging) {
        flipCard(event.target);
    }
});

document.addEventListener('mouseover', function(event) {
    if (event.target.classList.contains('card') && event.target.classList.contains('flipped')) {
        event.target.classList.add('zoom');
    }
});

document.addEventListener('mouseout', function(event) {
    if (event.target.classList.contains('card') && event.target.classList.contains('flipped')) {
        event.target.classList.remove('zoom');
    }
});

window.onload = function() {
    setupMonsterPile();
    setupSecondPile();
};
