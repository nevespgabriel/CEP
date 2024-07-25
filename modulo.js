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
        if(sigla.length != 2){
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
        estado.sigla =  validarSigla();
        estado.indicePai = encontrarIndice(paises, "país");
        estados.push(estado);
    } else{
        console.log("Não há nenhum país cadastrado, portanto não é possível criar o estado.");
    }
}

const retornaArray = (cep) => {
    switch(cep){
        case '1':
            return paises;
        case '2':
            return estados;
        case '3':
            return cidades;
    }
}

const criarCidade = () => {
    if(temArray(estados)){
        const cep = {};
        cidade.indice = cidades.length
        cidade.nome = pedirNome("Digite o nome da cidade");
        cidade.indicePai = encontrarIndice(estados, "estado");
        cidades.push(cidade);
    } else{
        console.log("Não há nenhum estado cadastrado, portanto não é possível criar a cidade.");
    }
}

const listar = (array, texto) => {
    console.log(texto);
    if(array.length > 0){
        array.forEach(elemento => {
            console.log("==========================");
            console.log("Índice: " + elemento.indice);
            console.log("Nome: " + elemento.nome);
            if(array == estados){
                console.log("Sigla: " + elemento.sigla);
            } if(array != paises){
                console.log("Índice do " + texto.toLowerCase().replace("s", "") + ": " + elemento.indicePai);
            }
            console.log("==========================");
        });
    } else{
        console.log("Não há " + texto.toLowerCase());
    }
        
}

const criar = (cep) => {
    switch(cep){
        case '1':
            criarPais()
            break;
        case '2':
            criarEstado();
            break;
        case '3':
            criarCidade();
            break;
    }
}

const alterar = (array, texto) => {
    const indice = encontrarIndice(array, texto + " que deseja alterar");
    array[indice].nome = pedirNome("Digite o novo nome do " + texto + ": ");
    if(texto == "estado"){
        array[indice].sigla =  validarSigla();
        array[indice].indicePai = encontrarIndice(paises, "país");
    } else if(texto == "cidade"){
        array[indice].indicePai = encontrarIndice(estados, "estado");
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

const switchExcluir = (cep) => {
    switch(cep){
        case '1':
            excluir(paises, "país", estados);
            break;
        case '2':
            criarEstado(estados, "estado", cidades);
            break;
        case '3':
            criarCidade(cidades, "cidade", paises);
            break;
    }
}

const crud = (cep, texto) => {
    const array = retornaArray(cep);
    while(true){
        console.log(`
        [1] Adicionar ${texto}
        [2] Listar ${texto}
        [3] Alterar ${texto}
        [4] Excluir ${texto}
        [5] Voltar
        `)
        const opcao = prompt("Digite a opção que deseja: ").trim();
        switch(opcao){
            case '1':
                criar(cep)
                break;
            case '2':
                listar(array, texto.toUpperCase() + "s");
                break;
            case '3':
                alterar(array, texto);
                break;
            case '4':
                switchExcluir(cep)
                break;
            case '5':
                return;
            default:
                console.log("Opção inválida.");
        }
    }
}

module.exports = {
    crud
}