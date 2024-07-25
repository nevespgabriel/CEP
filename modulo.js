const cidades = [];
const estados = [];
const paises = [];
const prompt = require("prompt-sync")();

const pedirNome = (texto) => {
    while(true){
        const nome = prompt(texto).trim();
        if(nome != ""){
            return nome
        } else{
            console.log("Nome inválido.");
        }
    }
}

const encontrarIndice = (array, texto) => {
    while(true){
        const indice = prompt("Digite o índice do " + texto + ": ");
        if(indice < array.length && indice >= 0 && !isNaN(indice)){
            return indice;
        } else{
            console.log("Índice do " + texto + " não encontrado.");
        }
    }
}

const temArray = (array) => array.length > 0;

const criarPais = () => {
    const pais = {}
    pais.indice = paises.length;
    pais.nome = pedirNome("Digite o nome do país: ");
    paises.push(pais);
}

const criarEstado = () => {
    if(temArray(paises)){
        const estado = {};
        estado.indice = estados.length;
        estado.nome = pedirNome("Digite o nome do estado: ");
        estado.indicePai = encontrarIndice(paises, "país");
    } else{
        console.log("Não há nenhum país cadastrado, portanto não é possível criar o estado.");
    }
}

const criarCidade = () => {
    if(temArray(estados)){
        const cidade = {};
        cidade.indice = cidades.length
        cidade.nome = pedirNome("Digite o nome da cidade");
        cidade.indicePai = encontrarIndice(estados, "estado");
    } else{
        console.log("Não há nenhum estado cadastrado, portanto não é possível criar a cidade.");
    }
}

const listar = (array, texto) => {
    console.log(texto);
    array.forEach(elemento => {
        console.log("==========================");
        console.log("Índice: " + elemento.indice);
        console.log("Nome: " + elemento.nome);
        if(texto == "ESTADOS"){
            console.log("Sigla: " + elemento.sigla);
        } if(texto != "PAÍSES"){
            console.log("Índice do " + texto.toLowerCase().replace("s", "") + ": " + elemento.indicePai);
        }
        console.log("==========================");
    });
}