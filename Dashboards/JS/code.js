const graficoCustos = document.getElementById("graficoUm");
const exibicaoGanhoHoje = document.getElementById("exibicaoGanhoHoje");
const exibicaoGanhoMes = document.getElementById("exibicaoGanhoMes");
const exibicaoCustosTotais = document.getElementById("exibicaoCustosTotais");
const exibicaoGanhoPorKm = document.getElementById("exibicaoKmLitro");
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
        let soma = 0;
        for(let i = 0; i < registroGanhoObj.length; i++){
            if(registroGanhoObj[i].data == dataFormatada){
                soma += Number(registroGanhoObj[i].valor);
            }
        }

        if(soma > 0){
            exibicaoGanhoHoje.innerText = `R$ ${soma}`;
        }else{
            exibicaoGanhoHoje.innerText = `R$ 0`
        }

    }
    funcaoExibicaoGanhoHoje();

    const funcaoExibicaoGanhoMes = () => {
        let soma = 0;
        for(let i = 0; i < registroGanhoObj.length; i++){
            const mesBruto = new Date(registroGanhoObj[i].data);
            const mesFinal = mesBruto.getMonth()+1;
            if(mesFinal == instanciaDate3){
                soma += Number(registroGanhoObj[i].valor);
            }
        }

        if(soma > 0){
            exibicaoGanhoMes.innerText = `R$ ${soma}`;
        }else{
            exibicaoGanhoMes.innerText = `R$ 0`;
        }
        return soma;
    }
    funcaoExibicaoGanhoMes();


    const funcaoCustosTotaisMes = () => {
        let soma = 0;
        for(let i = 0; i < registroCustoObj.length; i++){
            const mesBruto = new Date(registroCustoObj[i].data);
            const mesFinal = mesBruto.getMonth()+1;
            if(mesFinal == instanciaDate3){
                soma += Number(registroCustoObj[i].valor);
            }
        }

        if(soma > 0){
            exibicaoCustosTotais.innerText = `R$ -${soma}`;
        }else{
            exibicaoCustosTotais.innerText = `R$ -0`;
        }
        return soma;
    }
    funcaoCustosTotaisMes();

    const funcaoGanhoPorKm = () => {
        let soma = 0;
        let somaValorMensal = 0;
        for(let i = 0; i < registroGanhoObj.length; i++){
            const mesBruto = new Date(registroGanhoObj[i].data);
            const mesFinal = mesBruto.getMonth()+1;
            if(mesFinal == instanciaDate3){
                soma += Number(registroGanhoObj[i].km);
                somaValorMensal += Number(registroGanhoObj[i].valor);
            }
        }

        if(soma > 0){
            exibicaoGanhoPorKm.innerText = `R$ ${(somaValorMensal/soma).toFixed(2)}`;
        }else{
            exibicaoGanhoPorKm.innerText = `R$ 0`;
        }
    }
    funcaoGanhoPorKm();

    const funcaoLucroLiquido = () => {
        const retornoFuncaoGanhoMensal = funcaoExibicaoGanhoMes();
        const retornoFuncaoCustosMensal = funcaoCustosTotaisMes();
        let somaFinal = (retornoFuncaoGanhoMensal-retornoFuncaoCustosMensal).toFixed(2);
        
        if(somaFinal > 0){
            exibicaoLucroLiquido.innerText = `R$ ${somaFinal}`;
            exibicaoLucroLiquido.className = "estiloExibicao";
        }else if(somaFinal < 0){
            exibicaoLucroLiquido.innerText = `R$ -${somaFinal}`;
            exibicaoLucroLiquido.className = "estiloExibicaoRed";
        }else{
            exibicaoLucroLiquido.innerText = "N/A";
            exibicaoLucroLiquido.className = "estiloExibicaoRed";
        }


    }
    funcaoLucroLiquido();
}
exibicaoPainelResumo();

const funcaoExibicaoGraficos = () => {
    
  




}

funcaoExibicaoGraficos();