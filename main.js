let canvas = document.getElementById("canvas"); // Pega o ID canvas no HTML
let contexto = canvas.getContext("2d"); // Pegamos o contexto do desenho, esse é o método que retorna o tipo da "animação", usar o paramêtro "2d" significa que o objeto que será reproduzido será bidimensional
let desenhando = false; // variável que vai indentificar se estamos desenhando
let corSelecionada = "#000000";
const seletorDeCores = document.getElementById("seletorDeCores");
const botaoBorracha = document.getElementById("botaoBorracha");
const botaoPreencherFundo = document.getElementById("botaoPreencherFundo"); // Novo botão para preencher o fundo
let modoBorracha = false;
let formas = [];


document.getElementById("botaoPreencher").addEventListener("click", function () {
        // Preenche a última forma desenhada com a cor selecionada
        if (formas.length > 0) {
            contexto.fillStyle = corSelecionada;
            contexto.fill();
        }
    });

botaoBorracha.addEventListener("click", function () {
    modoBorracha = !modoBorracha; // Alterna entre modo de borracha e modo de desenho]
    if (modoBorracha) {
        contexto.lineWidth = 20; // Defina o tamanho desejado (por exemplo, 10)
        botaoBorracha.style.backgroundColor = "#828282"
    } else {
        contexto.lineWidth = 1; // Restaure o tamanho da linha ao desenhar
        botaoBorracha.style.backgroundColor = ""
    }
});


canvas.addEventListener("mousedown", function(event){
    //vamos usar o método addEventListener para ouvir nosso mouse, ele irá indentificar quando clicarmos
    desenhando = true; // desenho se torna verdade
    contexto.beginPath(); //a variável contexto junto com o metódo beginPath() indica que algo novo será criado
    contexto.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop); //nesse método, vamos dixer como o contexto irá funcionar,o clientX vai fornecer as coordenadas horizontais do mouse e o offsetLeft irá converter esse valor em pixel (px), a mesma coisa acontece comclientY na vertical.
})

canvas.addEventListener("mousemove", function(event){
    //função que indentifica quando movemos o mouse
    if(desenhando) {
        if (modoBorracha) {
            contexto.fillStyle = "#ffffff";
            contexto.strokeStyle = "#ffffff";
        } else {
            contexto.fillStyle = corSelecionada;
            contexto.strokeStyle = corSelecionada;
        }
        //esse if vai indentificar se estamos clicando quando movemos o mouse
        contexto.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        // o lineTo vai juntar as coordenadas e indentificar a linha que estamos traçando enquanto clicamos e movemos o mouse
        contexto.stroke();
        //traça a linha
    }
})

canvas.addEventListener("mouseup", function(event){
    // essa função indentifica quando não estamos mais clicando no mouse
    desenhando = false;
    if (modoBorracha) {
        contexto.fillStyle = "#ffffff";
        contexto.strokeStyle = "#ffffff";
    } else {
        contexto.fillStyle = corSelecionada;
        contexto.strokeStyle = corSelecionada;
        formas.push(contexto); // Armazena o caminho desenhado
    }
})

document.getElementById("seletorDeCores").addEventListener("input", function () {
    corSelecionada = this.value;
});

seletorDeCores.addEventListener("input", function () {
    contexto.fillStyle = seletorDeCores.value; // Define a cor de preenchimento para a cor selecionada
    contexto.strokeStyle = seletorDeCores.value; // Define a cor da linha para a cor selecionada
});

botaoPreencherFundo.addEventListener("click", function () {
    contexto.fillStyle = corSelecionada;
    contexto.fillRect(0, 0, canvas.width, canvas.height);
});

//---------------------