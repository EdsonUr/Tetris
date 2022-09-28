//Vetor contendo todos os patterns da peça I:
const I = [
	[
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
	],
	[
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
	],
	[
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
	]
];

//Vetor contendo todos os patterns da peça J:
const J = [
	[
		[1, 0, 0],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 1],
		[0, 1, 0],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[0, 0, 1]
	],
	[
		[0, 1, 0],
		[0, 1, 0],
		[1, 1, 0]
	]
];

//Vetor contendo todos os patterns da peça L:
const L = [
	[
		[0, 0, 1],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 1]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[1, 0, 0]
	],
	[
		[1, 1, 0],
		[0, 1, 0],
		[0, 1, 0]
	]
];

//Vetor contendo todos os patterns da peça O (pattern único):
const O = [
	[
		[0, 0, 0, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 0, 0, 0],
	]
];

//Vetor contendo todos os patterns da peça S:
const S = [
	[
		[0, 1, 1],
		[1, 1, 0],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 1],
		[0, 0, 1]
	],
	[
		[0, 0, 0],
		[0, 1, 1],
		[1, 1, 0]
	],
	[
		[1, 0, 0],
		[1, 1, 0],
		[0, 1, 0]
	]
];

//Vetor contendo todos os patterns da peça T:
const T = [
	[
		[0, 1, 0],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 1, 0],
		[1, 1, 0],
		[0, 1, 0]
	]
];

//Vetor contendo todos os patterns da peça Z:
const Z = [
	[
		[1, 1, 0],
		[0, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 0, 1],
		[0, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 0],
		[0, 1, 1]
	],
	[
		[0, 1, 0],
		[1, 1, 0],
		[1, 0, 0]
	]
];

var estatistica = {
    I: 0,
    J: 0,
    L: 0,
    O: 0,
    S: 0,
    T: 0,
    Z: 0
}

//Possibilidades cor peças;
var cores = ["pink","aqua","red","green","yellow","brown"]

const PECAS = [
    [Z, "black"],
    [S, "black"],
    [T, "black"],
    [O, "black"],
    [L, "black"],
    [I, "black"],
    [J, "black"]
];

const LINHA = 20; //qtd de linhas
const COLUNA = 10; // qtd de colunas
const TAMANHO = 25; //lado do quadrado em pxs
const VAGO = "black"; // cor de um quadrado sem peça

var estatisticaa = document.getElementById("estatisticaa");
var qtdZ = document.getElementById("qtdZ");
var qtdS = document.getElementById("qtdS");
var qtdT = document.getElementById("qtdT");
var qtdO = document.getElementById("qtdO");
var qtdL = document.getElementById("qtdL");
var qtdI = document.getElementById("qtdI");
var qtdJ = document.getElementById("qtdJ");
var scoreCaixa = document.getElementById("score");
var nivelCaixa = document.getElementById("nivelNumber");
var linhasRemovidasCaixa = document.getElementById("linhasEliminadas");

var nivel = 1;
var linhasRemovidas = 0;
var score = 0;
var peca;
var tabuleiro = [];

var inicioDescida;
var fimDeJogo = false;

var tela = document.getElementById("tela");
var c = tela.getContext("2d");

iniciarTabuleiro();

desenharTabuleiro();
var jogar = document.getElementById("jogar");

function start(){
    playAudio("startGame");

    jogar.classList.add("hidde");
    jogar.disabled=true;
     
    onkeydown = controlarPeca;
    
    gerarPeca();
    
    inicioDescida = Date.now();
    
    descerPeca();
}

// Sub-rotinas (funções)

function iniciarTabuleiro() {
	for (var i = 0; i < LINHA; i++) {
		tabuleiro[i] = [];
		
		for (var j = 0; j < COLUNA; j++) {
            //todo quadrado = VAGO => black;
			tabuleiro[i][j] = VAGO;
		}
	}
}

function desenharTabuleiro(){
    for (var i = 0; i < LINHA; i++) {
        for (var j = 0; j < COLUNA; j++) {
            desenharQuadrado(j, i, tabuleiro[i][j]);
        }
    }
}

//x->número de quadrados da esquerda; y->número de quadrados do topo;
function desenharQuadrado(x, y, cor){
    c.fillStyle = cor;
    c.fillRect(x*TAMANHO, y*TAMANHO, TAMANHO, TAMANHO);

    c.strokeStyle = "grey";
    c.strokeRect(x*TAMANHO, y*TAMANHO, TAMANHO, TAMANHO);
}

var todasPecas = [];

var next1 = document.getElementById("next1");
var next2 = document.getElementById("next2");
var next3 = document.getElementById("next3");

function nextPiece(r,p){
    if(todasPecas[r] == 0){
        p.setAttribute('src', 'Z.png')
    }
    else if(todasPecas[r] == 1){
        p.setAttribute('src', 'S.png')
    }
    else if(todasPecas[r] == 2){
        p.setAttribute('src', 'T.png')
    }
    else if(todasPecas[r] == 3){
        p.setAttribute('src', 'O.png')
    }
    else if(todasPecas[r] == 4){
        p.setAttribute('src', 'L.png')
    }
    else if(todasPecas[r] == 5){
        p.setAttribute('src', 'I.png')
    }
    else{
        p.setAttribute('src', 'J.png')
    }
}

function gerarPeca(){
    if(todasPecas.length == 0 || todasPecas.length<3){
        for(var i=0; i<4;i++){
            var indice = Math.floor(Math.random() * PECAS.length); // gerando um indice aleatorio para ser usado (de 0 -> 6).
            todasPecas.push(indice);
        }
    }
    //PRÓXIMAS PEÇAS
    nextPiece(1,next1);
    nextPiece(2,next2);
    nextPiece(3,next3);

    //define as características da peça ativa.
    var r = todasPecas.shift();
        peca = {
            tetramino : PECAS[r][0],
            cor : cores[parseInt((Math.random()*5))],
            tetraminoN : 0, // começa pelo primeiro pattern
            tetraminoAtivo : [[]],
            x : 3,
            y : -2
        };


	peca.tetraminoAtivo = peca.tetramino[peca.tetraminoN];
    //lógica parte estatística
    if(r == 0){
        estatistica.Z++;
    }
    else if(r == 1){
        estatistica.S++;
    }
    else if(r == 2){
        estatistica.T++;
    }
    else if(r == 3){
        estatistica.O++;
    }
    else if(r == 4){
        estatistica.L++;
    }
    else if(r == 5){
        estatistica.I++;
    }
    else{
        estatistica.J++;
    }

    //update na parte de estatística
    qtdZ.innerHTML = estatistica.Z;
    qtdS.innerHTML = estatistica.S;
    qtdT.innerHTML = estatistica.T;
    qtdO.innerHTML = estatistica.O;
    qtdL.innerHTML = estatistica.L;
    qtdI.innerHTML = estatistica.I;
    qtdJ.innerHTML = estatistica.J;
}

var tempo = 1000;

//controla a lógica de descida da peça
function descerPeca(){
    var agora = Date.now();
    //diferença do tempo atual com a última vez que a peça desceu
    var delta = agora - inicioDescida;
	//checar se já passou 1s(1000ms)
    if (delta > tempo) {
        moverAbaixo();
        inicioDescida = Date.now();
    }
	
    if (!fimDeJogo) {
        requestAnimationFrame(descerPeca);
    }
}

function descerForte(){
    if(!colisao(0,1,peca.tetraminoAtivo)){
        apagarPeca();
        while(!colisao(0,1,peca.tetraminoAtivo)){
            peca.y++;
            score += 2;
            scoreCaixa.innerHTML = score;
        }
        desenharPeca();
    }
    else{
        travarPeca();
        gerarPeca();
    }
    moverAbaixo();
}

function moverAbaixo(){
    if (!colisao(0, 1, peca.tetraminoAtivo)) {
        apagarPeca();
        peca.y++;
        desenharPeca();
    } else {
        travarPeca();
        gerarPeca();
    }
    
}

function moverDireita(){
    if (!colisao(1, 0, peca.tetraminoAtivo)) {
        apagarPeca();
        peca.x++;
        desenharPeca();
    }
}

function moverEsquerda(){
    if (!colisao(-1, 0, peca.tetraminoAtivo)) {
        apagarPeca();
        peca.x--;
        desenharPeca();
    }
}

function colisao(x, y, p){
    //passar por todo o tetromino ativo.
    for (var i = 0; i < p.length; i++) {
        for (var j = 0; j < p.length; j++) {
            //checar se o quadrado é vazio. Se for, continua.
            if (!p[i][j]) {
                continue;
            }
			
            //novas coordenadas das peças após o movimento.
            var novoX = peca.x + j + x;
            var novoY = peca.y + i + y;
			
            //checar se o novo X está dentro do tabuleiro.
            if (novoX < 0 || novoX >= COLUNA || novoY >= LINHA) {
                return true;
            }
			
            //pula se o novoY for maior que 0. Crasharia o jogo.
            if (novoY < 0) {
                continue;
            }
			
            //checar se já existe uma peça nas novas coordenadas.
            if (tabuleiro[novoY][novoX] != VAGO) {
                return true;
            }
        }
    }
	
    return false;
}

function apagarPeca(){
    preencherPeca(VAGO);
}

function desenharPeca(){
    preencherPeca(peca.cor);
}

function preencherPeca(cor) {
    for (var i = 0; i < peca.tetraminoAtivo.length; i++) {
        for (var j = 0; j < peca.tetraminoAtivo.length; j++) {
            //se a posição de uma peça estiver com 1 nessas coordenadas, desenhar! (linha, coluna).
            if (peca.tetraminoAtivo[i][j]) {
                desenharQuadrado(peca.x + j, peca.y + i, cor);
            }
        }
    }
}


var tela = document.getElementById("tela");
var GameOver = document.getElementById("Game");
var scoreGameOver = document.getElementById("scoreGameOver");

function travarPeca(){
    var contagem = 0;
    for (var i = 0; i < peca.tetraminoAtivo.length; i++) {
        for (var j = 0; j < peca.tetraminoAtivo.length; j++) {
            // pula os quadrados vazios.
            if (!peca.tetraminoAtivo[i][j]) { 
                continue;
            }

            //peças que vão ser travadas no topo do tabuleiro (GAME OVER!).
            if (peca.y + i < 0) {
                pauseAudio("startGame");
                playAudio("gameOver");
                fimDeJogo = true; // para parar o request animation frame.
                tela.classList.add("hidde");
                scoreGameOver.innerHTML = score;
                GameOver.classList.remove("hidde");
                estatisticaa.classList.remove("hidde");
                break;
            }

            //trava as cores da peça no tabuleiro nas coordenadas da peça.
            tabuleiro[peca.y+i][peca.x+j] = peca.cor;
            playAudio("fall");
        }
    }

    //toda vez que uma peça é travada, é necessário checar se um linha foi completada.
    for (var i = 0; i < LINHA; i++) {
        var linhaCheia = true;
		
        for (var j = 0; j < COLUNA; j++) {
            linhaCheia = linhaCheia && (tabuleiro[i][j] != VAGO);
        }
		
        // se a linha estiver completa, as linhas são movidas para baixo.
        if (linhaCheia) {
            for (var y = i; y > 1; y--) { // y = i -> linha que foi completa.
                for (var j = 0; j < COLUNA; j++) {
                    tabuleiro[y][j] = tabuleiro[y-1][j]; //move para baixo. linha dbaixo == linha dcima.
                }
            }
			
            //cria a primeira linha dnv, já que ela não tinha nada acima.
            for (var j = 0; j < COLUNA; j++) {
                tabuleiro[0][j] = VAGO;
            }
            
            playAudio("linhasRemovidas");
            contagem++;
            linhasRemovidas++;
            linhasRemovidasCaixa.innerHTML = linhasRemovidas;
            if(linhasRemovidas == 10){
                nivel++;
                tempo *= 0.8;
                console.log(tempo);
                playAudio("levelUp");
                linhasRemovidas = 0;
                linhasRemovidasCaixa.innerHTML = linhasRemovidas;
                nivelCaixa.innerHTML = nivel;
            }
        }
    }
    if(contagem == 1){
        score += 100*nivel;
    }
    else if(contagem == 2){
        score += 300*nivel;
    }
    else if(contagem == 3){
        score += 500*nivel;
    }
    else if(contagem == 4){
        score += 800*nivel;
    }
	//update no tabuleiro
    desenharTabuleiro();
    //update no score
    scoreCaixa.innerHTML = score;
}

function rodarPeca(){
    var proximoPadrao = peca.tetramino[(peca.tetraminoN + 1) % peca.tetramino.length];
    var recuo = 0;

    if (colisao(0, 0, proximoPadrao)) {
        if (peca.x > COLUNA/2) { //a colisão está acontecendo na parede direita.
            recuo = -1; //Joga para esquerda.
        } else {
            recuo = 1;
        }
    }
    
    if (!colisao(recuo, 0, proximoPadrao)) {
        apagarPeca();
        peca.x += recuo;
        peca.tetraminoN = (peca.tetraminoN + 1) % peca.tetramino.length;
        peca.tetraminoAtivo = peca.tetramino[peca.tetraminoN];
        desenharPeca();
    }
}

function rodarPecaEsquerda(){
    var proximoPadrao = peca.tetramino[(peca.tetraminoN + 3) % peca.tetramino.length];
    var recuo = 0;

    if (colisao(0, 0, proximoPadrao)) {
        if (peca.x > COLUNA/2) { //a colisão está acontecendo na parede direita.
            recuo = -1;
        } else {
            recuo = 1;
        }
    }
    
    if (!colisao(recuo, 0, proximoPadrao)) {
        apagarPeca();
        peca.x += recuo;
        peca.tetraminoN = (peca.tetraminoN + 3) % peca.tetramino.length;
        peca.tetraminoAtivo = peca.tetramino[peca.tetraminoN];
        desenharPeca();
    }
}

function controlarPeca(evento){
	var tecla = evento.keyCode;
	if(!fimDeJogo){
        if (tecla == 37) {
            playAudio("move");
            moverEsquerda();
            inicioDescida = Date.now();
        } else if (tecla == 38) {
            rodarPeca();
            playAudio("rotate");
            inicioDescida = Date.now();
        } else if (tecla == 39) {
            playAudio("move");
            moverDireita();
            inicioDescida = Date.now();
        } else if (tecla == 40) {
            playAudio("move");
            moverAbaixo();
            score += 1;
            scoreCaixa.innerHTML = score;
        }
        else if(tecla == 32){
            descerForte();
        }
        else if(tecla == 90){
            rodarPecaEsquerda();
            playAudio("rotate");
        }
    }
}

var linhasRemovida = document.getElementById("linhasremovidas");
var gameOver = document.getElementById("gameOver");
var startGame = document.getElementById("startGame");
var levelUp = document.getElementById("levelUp");
var fall = document.getElementById("fall");
var move = document.getElementById("move");
var rotate = document.getElementById("rotate");
var Rank = document.getElementById("Rank");

function playAudio(audio) {
    if(audio === "linhasRemovidas"){
        linhasRemovida.play(); 
    }
    else if(audio == "gameOver"){
        gameOver.play();
    } 
    else if(audio == "startGame"){
        startGame.play();
    } 
    else if(audio == "levelUp"){
        levelUp.play();
    }
    else if(audio == "fall"){
        fall.play();
    }
    else if(audio == "move"){
        move.play();
    }
    else if(audio == "rotate"){
        rotate.play();
    }
}

function pauseAudio(audio){
    if(audio == "startGame"){
        startGame.pause();
    }
}

//Persistencia de Dados ---> RANK (LocalStorage)
localStorage.getItem("vetor");
var vetor = localStorage.getItem("vetor") ?  JSON.parse(localStorage.getItem("vetor")) : [];

var nome1 = document.getElementById("nome1");
var pt1 = document.getElementById("pt1");
var nome2 = document.getElementById("nome2");
var pt2 = document.getElementById("pt2");
var nome3 = document.getElementById("nome3");
var pt3 = document.getElementById("pt3");
var nome3 = document.getElementById("nome3");
var pt4 = document.getElementById("pt4");
var nome4 = document.getElementById("nome4");
var pt5 = document.getElementById("pt5");
var nome5 = document.getElementById("nome5");

//Bubble Sort para ordenação --> Botão "Enviar" HTML.
function bubbleSort(items){
    GameOver.classList.add("hidde");
    Rank.classList.remove("hidde");
    var iniciais = document.getElementById("iniciais").value;
    var pontos = score;
    items.push({name: iniciais,score: pontos});

    var aux;

    for (var i = 0; i < items.length-1; i++) {
        for (var j = 0; j < items.length-1-i; j++) {
            if (parseInt(items[j].score) < parseInt(items[j+1].score)) {
                aux = items[j];
                items[j] = items[j+1];
                items[j+1] = aux;
            }
        }
    }

    localStorage.setItem("vetor",JSON.stringify(items));
    console.log("storage: ", localStorage.getItem("vetor"));
    console.log("itens: ",items);
    
    //Mostrar o resultado na tela de rank.
    nome1.innerHTML = items[0].name;
    pt1.innerHTML = items[0].score;
    nome2.innerHTML = items[1].name;
    pt2.innerHTML = items[1].score;
    nome3.innerHTML = items[2].name;
    pt3.innerHTML = items[2].score;
    nome4.innerHTML = items[3].name;
    pt4.innerHTML = items[3].score;
    nome5.innerHTML = items[4].name;
    pt5.innerHTML = items[4].score;
      
}