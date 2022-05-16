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
const TAMANHO = 30; //lado do quadrado em pxs
const VAGO = "black"; // cor de um quadrado sem peça

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

function start(){
    playAudio("startGame");

    document.getElementById("jogar").disabled=true;
     
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

function desenharQuadrado(x, y, cor){
    c.fillStyle = cor;
    c.fillRect(x*TAMANHO, y*TAMANHO, TAMANHO, TAMANHO);

    c.strokeStyle = "grey";
    c.strokeRect(x*TAMANHO, y*TAMANHO, TAMANHO, TAMANHO);
}

function gerarPeca(){
    var r = Math.floor(Math.random() * PECAS.length); // gerando um indice aleatorio para ser usado (de 0 -> 6).
	
	peca = {
		tetramino : PECAS[r][0],
		cor : cores[parseInt((Math.random()*5))],
		tetraminoN : 0, // começa pelo primeiro pattern
		tetraminoAtivo : [[]],
		x : 3,
		y : -2
	};
	
	peca.tetraminoAtivo = peca.tetramino[peca.tetraminoN];
}


//controla a lógica de descida da peça
function descerPeca(){
    var agora = Date.now();
    //diferença do tempo atual com a última vez que a peça desceu
    var delta = agora - inicioDescida;
	//checar se já passou 1s(1000ms)
    if (delta > 1380 - (nivel * 380)) {
        moverAbaixo();
        inicioDescida = Date.now();
    }
	
    if (!fimDeJogo) {
        requestAnimationFrame(descerPeca);
    }
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
            if (peca.tetraminoAtivo[i][j]) {
                desenharQuadrado(peca.x + j, peca.y + i, cor);
            }
        }
    }
}

function travarPeca(){
    for (var i = 0; i < peca.tetraminoAtivo.length; i++) {
        for (var j = 0; j < peca.tetraminoAtivo.length; j++) {
            // pula os quadrados vazios.
            if (!peca.tetraminoAtivo[i][j]) {
                continue;
            }

            //peças que vão ser travadas no topo do tabuleiro (GAME OVER!).
            if (peca.y + i < 0) {
                playAudio("gameOver");
                alert("GAME OVER!");
                fimDeJogo = true; // para parar o request animation frame.
                break;
            }

            //trava as cores da peça nas coordenadas.
            tabuleiro[peca.y+i][peca.x+j] = peca.cor;
        }
    }

    for (var i = 0; i < LINHA; i++) {
        var linhaCheia = true;
		
        for (var j = 0; j < COLUNA; j++) {
            linhaCheia = linhaCheia && (tabuleiro[i][j] != VAGO);
        }
		
        // se a linha estiver completa, a linha é movida para baixo.
        if (linhaCheia) {
            for (var y = i; y > 1; y--) {
                for (var j = 0; j < COLUNA; j++) {
                    tabuleiro[y][j] = tabuleiro[y-1][j];
                }
            }
			
            for (var j = 0; j < COLUNA; j++) {
                tabuleiro[0][j] = VAGO;
            }
            playAudio("linhasRemovidas");
            score += 100*nivel;
            linhasRemovidas++;
            linhasRemovidasCaixa.innerHTML = linhasRemovidas;
            if(linhasRemovidas == 10){
                nivel++;
                linhasRemovidas = 0;
                nivelCaixa.innerHTML = nivel;
            }
        }
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
            recuo = -1;
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

function controlarPeca(evento){
	var tecla = evento.keyCode;
	
    if (tecla == 37) {
        moverEsquerda();
        inicioDescida = Date.now();
    } else if (tecla == 38 || tecla == 90) {
        rodarPeca();
        inicioDescida = Date.now();
    } else if (tecla == 39) {
        moverDireita();
        inicioDescida = Date.now();
    } else if (tecla == 40) {
        moverAbaixo();
    }
}

var linhasRemovida = document.getElementById("linhasremovidas");
var gameOver = document.getElementById("gameOver");
var startGame = document.getElementById("startGame");

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
}