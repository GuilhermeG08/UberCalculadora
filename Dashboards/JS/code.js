const graficoCustos = document.getElementById("graficoUm");
const exibicaoGanhoHoje = document.getElementById("exibicaoGanhoHoje");
const exibicaoGanhoMes = document.getElementById("exibicaoGanhoMes");
const exibicaoCustosTotais = document.getElementById("exibicaoCustosTotais");
const exibicaoGanhoPorKm = document.getElementById("exibicaoKmLitro");
const exibicaoLucroLiquido = document.getElementById("exibicaoLucroLiquido");
const exibicaoDiaGraficos = document.getElementById("exibicaoDiaGrafico");
const selectSemanas = document.getElementById("selectSemana");
const exibicaoDataPorData = document.getElementById('dataPorData');
const tabelaCorpo = document.getElementById('tabelaCorpo');
const tabelaFull = document.getElementById('tabelaFull');
//Referencias do registro de custos
    const stringCustoObj = localStorage.getItem("registroCusto");
    const registroCustoObj = JSON.parse(stringCustoObj);

    const stringGanhoObj = localStorage.getItem("registroGanho");
    const registroGanhoObj = JSON.parse(localStorage.getItem("registroGanho"));

    //Bloco para pegar a data atual do PC
    const instanciaDate = new Date();
    const instanciaDate2 = instanciaDate.getDate();
    const instanciaDate2String = instanciaDate2.toString();
    const instanciaDate2PadStart = instanciaDate2String.padStart(2, 0);
    const instanciaDate3 = instanciaDate.getMonth()+1;
    const instanciaDate3string = instanciaDate3.toString();
    const instanciaDate3padstart = instanciaDate3string.padStart(2, 0);
    const instanciaDate4 = instanciaDate.getFullYear();
    //Data do PC em formato de string para comparar com o input do cliente
    const dataFormatada = `${instanciaDate4}-${instanciaDate3padstart}-${instanciaDate2PadStart}`;


const exibicaoPainelResumo = () => {
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
            exibicaoLucroLiquido.innerText = `R$ 0`;
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

    const organizadorDatas = () => {
        let objetoDiasTrabalhados = []; //Esse é o objeto principal, nele estarao todos os dias trabalhados do usuario

        //Condicional pra salvar o maior length, sendo do registro de custo ou de ganho
        if(registroCustoObj.length > registroGanhoObj.length){
            lengthRegistro = registroCustoObj.length;
        }else{
            lengthRegistro = registroGanhoObj.length;
        }

        //Loop usado pra registrar todo o conteudo da tabela de custos dentro do objeto
        for(let i = 0; i < registroCustoObj.length; i++){
            objetoDiasTrabalhados.push({data: registroCustoObj[i].data, custo: registroCustoObj[i].valor});
        }

        //Nesse loop, caso uma das datas do objeto de dias trabalhados seja igual a uma das datas do registro de ganhos, ele vai puxar só o valor do ganho pra si mesmo
        for(let i = 0; i < objetoDiasTrabalhados.length; i++){
            for(let j = 0; j < registroGanhoObj.length; j++){
                if(objetoDiasTrabalhados[i].data == registroGanhoObj[j].data){
                    objetoDiasTrabalhados[i].ganho = registroGanhoObj[j].valor;
                }
            }
        }

        //Nesse loop o vetor encontrado vai receber indices do objeto de dias trabalhados, esses indices sao as ocorrencias de datas iguais, que nao podem ser passadas pra dentro do objeto final
        let encontrado = [];
        for(let i = 0; i < registroGanhoObj.length; i++){
            for(let j = 0; j < objetoDiasTrabalhados.length; j++){
                if(registroGanhoObj[i].data == objetoDiasTrabalhados[j].data){
                    encontrado.push([i]);
                    break;
                }
            }
        }

        //Nesse loop o objeto de dias trabalhados recebe tudo que for diferente do vetor encontrado, filtrando só conteudo certo
        for(let i = 0; i < registroGanhoObj.length; i++){
            for(let j = 0; j < encontrado.length; j++){
                if(i != encontrado[j]){
                objetoDiasTrabalhados.push({data: registroGanhoObj[i].data, ganho: registroGanhoObj[i].valor});
            }
            }
        }
        
        //Sort pra ordenar o objeto da data menor para a maior
        let objetoDiasTrabalhadosOrdenado = objetoDiasTrabalhados.sort((a,b) => {
            const dataA = new Date(a.data);
            const dataB = new Date(b.data);
            return dataA - dataB;
        });
        
        //Aqui começa o código pra manipular a segunda-feira, visando ter uma semana completa na exibicao dos graficos.
        const primeiraData = new Date(objetoDiasTrabalhadosOrdenado[0].data);
        let diaSemana = primeiraData.getDay();
        let dataFinal;
        if(diaSemana == 1){
            dataFinal = new Date(primeiraData);
        }else if(diaSemana == 0){
            let segundaData = new Date(primeiraData);
            let diaMes = segundaData.getDate();
            let diaSemanaDois = segundaData.getDay();
            for(let i = 6; i != 0; i--){
                segundaData.setDate(diaMes-1);
                diaMes = diaMes-1;
                diaSemanaDois = segundaData.getDay();
                if(diaSemanaDois == 1){
                    dataFinal = new Date(segundaData);
                    break;
                }
            }
        }else{
            let segundaData = new Date(primeiraData);
            let diaMes = segundaData.getDate();
            let diaSemanaDois = segundaData.getDay();
            for(let i = 6; i > 1; i--){
                segundaData.setDate(diaMes-1);
                diaMes = diaMes-1;
                diaSemanaDois = segundaData.getDay();
                if(diaSemanaDois == 1){
                    dataFinal = new Date(segundaData);
                    break;
                }
            }
        }
        
        //Aqui comeca o codigo para manipular a ultima data do objeto ordenado
        let ultimaData = new Date(objetoDiasTrabalhadosOrdenado[objetoDiasTrabalhadosOrdenado.length-1].data);
        while (ultimaData.getDay() != 1){
            ultimaData.setDate(ultimaData.getDate() +1)
        }
        ultimaData.toDateString();
        objetoDiasTrabalhadosOrdenado[objetoDiasTrabalhadosOrdenado.length-1].data = ultimaData;
        
        
        function gerarIntervaloDatas(dataInicio, dataFim) {
            const datas = [];
  
            // Cria cópias para não alterar os objetos originais
            let atual = new Date(dataInicio);
            const fim = new Date(dataFim);

            while (atual <= fim) {
                datas.push({data: new Date(atual), custo: 0, ganho: 0}); // cria uma cópia da data
                atual.setDate(atual.getDate() + 1); // avança 1 dia
            }
            return datas;
        }
        const respFuncaoDatas = gerarIntervaloDatas(dataFinal, objetoDiasTrabalhadosOrdenado[objetoDiasTrabalhadosOrdenado.length-1].data);
        return respFuncaoDatas;
    }
    const retornoOrganizarDatas = organizadorDatas();
    
    const funcaoAdicionarCustoEganho = () => {
        for(let i = 0; i < retornoOrganizarDatas.length; i++){
        let data = new Date(retornoOrganizarDatas[i].data);
        
        for(let j = 0; j < registroCustoObj.length; j++){
            let data2 = new Date(registroCustoObj[j].data);
            data2.setDate(data2.getDate()+1);
            
            if(data.getTime() == data2.getTime()){
                retornoOrganizarDatas[i].custo = Number(registroCustoObj[j].valor);
            }
        }
    }

    for(let i = 0; i < retornoOrganizarDatas.length; i++){
        let data = new Date(retornoOrganizarDatas[i].data);
        
        for(let j = 0; j < registroGanhoObj.length; j++){
            let data2 = new Date(registroGanhoObj[j].data);
            data2.setDate(data2.getDate()+1);
            
            if(data.getTime() == data2.getTime()){
                retornoOrganizarDatas[i].ganho = Number(registroGanhoObj[j].valor);
            }
        }
    }

    let vetorOrdenadoDiasTrabalhados = [{}];
    for(let i = 0; i < (retornoOrganizarDatas.length-1)/7; i++){
        vetorOrdenadoDiasTrabalhados[i] = {semana: i+1, dados: []};
    }

    let acumulador = 0;
    for(let i = 0; i < vetorOrdenadoDiasTrabalhados.length; i++){
        for(let j = 0; j < retornoOrganizarDatas.length; j++){
            acumulador += 1;
            vetorOrdenadoDiasTrabalhados[i].dados.push({dia: j+1, data: retornoOrganizarDatas[acumulador]});
            if(vetorOrdenadoDiasTrabalhados[i].dados.length == 7){
                break;
            }
        }
    }

    return vetorOrdenadoDiasTrabalhados;
    }

    const retornoAdicionarCustoGanho = funcaoAdicionarCustoEganho();
    
    const criadorSelectSemanas = (semanasTrabalhadas) => {
        for(let i = 0; i < semanasTrabalhadas.length; i++){
            let semanaAtual = semanasTrabalhadas[i];
            let novaOpcao = document.createElement('option');
            novaOpcao.value = semanaAtual.semana;
            novaOpcao.textContent = `Semana ${semanaAtual.semana}`;
            selectSemanas.appendChild(novaOpcao);
        }
    }
    criadorSelectSemanas(retornoAdicionarCustoGanho);
    
    
    
    
    

    const ctx = document.getElementById('graficoUm');

const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
    datasets: [{
      label: 'Custos',
      data: [], // Exemplo de dados de custos
      backgroundColor: 'rgba(128, 128, 128, 0.7)', // Cor para a barra de custos
      borderColor: 'rgba(128, 128, 128, 0.7)',
      borderWidth: 1
    },{
      label: 'Ganhos',
      data: [], // Exemplo de dados de ganhos
      backgroundColor: 'rgba(44, 44, 44, 0.7)', // Cor para a barra de ganhos
      borderColor: 'rgba(44, 44, 44, 0.7)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
})

selectSemanas.addEventListener('change', (e) => {
        const valorSelecionado = e.target.value;
        const semanaEncontrada = retornoAdicionarCustoGanho.find(semana => semana.semana == valorSelecionado);
        let vetorVirgem = [];
        let vetorVirgem2 = [];
        for(let i = 0; i < 7; i++){
            vetorVirgem.push(semanaEncontrada.dados[i].data.custo);
        }
        for(let i = 0; i < 7; i++){
            vetorVirgem2.push(semanaEncontrada.dados[i].data.ganho);
        }
        myChart.data.datasets[0].data = vetorVirgem;
        myChart.data.datasets[1].data = vetorVirgem2;
        myChart.update();
        
        let objetoDiaUm = new Date(semanaEncontrada.dados[0].data.data)
        let objetoDiaDois = new Date(semanaEncontrada.dados[6].data.data)
        let diaUm = objetoDiaUm.getDate();
        let mesUm = objetoDiaUm.getMonth().toString();
        let diaDois = objetoDiaDois.getDate();
        let mesDois = objetoDiaDois.getMonth().toString();
        let stringCompleta = `(${diaUm}/${mesUm.padStart(2, 0)} - ${diaDois}/${mesDois.padStart(2, 0)})`;
        
        exibicaoDataPorData.innerText = stringCompleta;

        if(tabelaFull.rows.length > 1){
        for(let i = 0; i < 7; i++){
            tabelaFull.deleteRow(-1);
        }
    }
    console.log(semanaEncontrada)
        for(let i = 0; i < 7; i++){
                const newRow = tabelaCorpo.insertRow();
                const newCell = newRow.insertCell();
                const newCell2 = newRow.insertCell();
                const newCell3 = newRow.insertCell();
                const newCell4 = newRow.insertCell();
                const newCell5 = newRow.insertCell();
                const objetoDataPuro = new Date(semanaEncontrada.dados[i].data.data);
                const dia = objetoDataPuro.getDate();
                const mes = objetoDataPuro.getMonth();
                const ano = objetoDataPuro.getFullYear();
                let stringFinal = `${dia}/${mes}/${ano}`;
                newCell.textContent = stringFinal;
                newCell2.textContent = i;
                newCell3.textContent = semanaEncontrada.dados[i].data.ganho;
                newCell4.textContent = semanaEncontrada.dados[i].data.custo;
                newCell5.textContent = (semanaEncontrada.dados[i].data.ganho - semanaEncontrada.dados[i].data.custo);
            }
    })
    
    
    
};

funcaoExibicaoGraficos();