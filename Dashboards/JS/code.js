const graficoCustos = document.getElementById("graficoUm");
const exibicaoGanhoHoje = document.getElementById("exibicaoGanhoHoje");
const exibicaoGanhoMes = document.getElementById("exibicaoGanhoMes");
const exibicaoCustosTotais = document.getElementById("exibicaoCustosTotais");
const exibicaoLucroLiquido = document.getElementById("exibicaoLucroLiquido");

const exibicaoPainelResumo = () => {
    //Referencias do registro de custos
    const stringCustoObj = localStorage.getItem("registroCusto");
    const registroCustoObj = JSON.parse(stringCustoObj);

    const stringGanhoObj = localStorage.getItem("registroGanho");
    const registroGanhoObj = JSON.parse(localStorage.getItem("registroGanho"));

    //Bloco para pegar a data atual do PC
    const instanciaDate = new Date();
    const instanciaDate2 = instanciaDate.getDate();
    const instanciaDate3 = instanciaDate.getMonth()+1;
    const instanciaDate3string = instanciaDate3.toString();
    const instanciaDate3padstart = instanciaDate3string.padStart(2, 0);
    const instanciaDate4 = instanciaDate.getFullYear();
    //Data do PC em formato de string para comparar com o input do cliente
    const dataFormatada = `${instanciaDate4}-${instanciaDate3padstart}-${instanciaDate2}`;
    
    const funcaoExibicaoGanhoHoje = () => {
    registroGanhoObj.forEach(element => {
        if(element.data == dataFormatada){
            let index = element.data.indexOf(dataFormatada)
            const valor = Number(registroGanhoObj[index].valor);
            exibicaoGanhoHoje.innerText = `R$ ${valor.toFixed(2)}`;
            }else{
            exibicaoGanhoHoje.innerText = `R$ 0`;
            }
        });
    }
    funcaoExibicaoGanhoHoje();

    const funcaoExibicaoGanhoMes = () => {
        



    }
    
    

    
}

exibicaoPainelResumo();
