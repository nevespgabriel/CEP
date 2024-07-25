const prompt = require("prompt-sync")();
const modulo = require("./modulo.js");

while(true){
    console.log(`
    [1] País
    [2] Estado
    [3] Município
    [4] Sair
    `)
    const opcao = prompt().trim();
    switch(opcao){
        case '1':
            modulo.crud(opcao, "país");
            break;
        case '2':
            modulo.crud(opcao, "estado");
            break;
        case '3':
            modulo.crud(opcao, "município");
            break;
        case '4':
            process.exit();
        default:
            console.log("Opção inválida.");
    }
}