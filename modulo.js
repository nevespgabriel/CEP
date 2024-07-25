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

const validarSigla = () => {
    while(true){
        const sigla = prompt("Digite a sigla do estado: ").trim().toUpperCase();
        if(sigla.length > 2){
            console.log("Sigla inválida.");
        } else{
            return sigla;
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

const alterar = (array, texto) => {
    const indice = encontrarIndice(array, texto + " que deseja alterar");
    array[i].nome = pedirNome("Digite o novo nome do " + texto + ": ");
    if(texto == "estado"){
        array[i].sigla =  validarSigla();
        array[i].indicePai = encontrarIndice(paises, "país");
    } else if(texto == "cidade"){
        array[i].indicePai = encontrarIndice(estados, "estado");
    }
    console.log("Alteração realizada com sucesso.");
}

const excluir = (array, texto, arrayFilho=undefined) => {
    const indice = encontrarIndice(array, texto + " que deseja excluir");
    let eliminados = 0;
    if(arrayFilho){
        arrayFilho.forEach((elementoFilho) => {
            if(elementoFilho.indicePai == indice){
                arrayFilho.splice(indice, 1);
                eliminados += 1;
            } else{
                elementoFilho.indice -= eliminados;
            }
        })
    }
    array.splice(indice, 1);
    for(let c=indice; c< array.length; c++){
        array[c].indice -= 1;
    }
}