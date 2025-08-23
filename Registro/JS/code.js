//Referencias do formulario de informacoes do carro.
const inputModelo = document.getElementById("inModelo");
const inputAno = document.getElementById("inAno");
const selectCombustivel = document.getElementById("selectCombustivel");
const inputConsumo = document.getElementById("inConsumo");
const btProximo = document.getElementById("botaoProximo");
const containerFormulario = document.getElementById("containerInfoVeiculo");
const containerRegistroCustos = document.getElementById("containerRegistroCustos");

//Referencias do formulario de registro de custos.
const inputTipoGasto = document.getElementById("selectTipoGasto");
const inputTipoPagamento = document.getElementById("selectTipoPagamento");
const inputObservacao = document.getElementById("inObservacao");
const inputDataCusto = document.getElementById("inDataCusto");
const inputValorCusto = document.getElementById("inValorCusto");
const btConcluirCusto = document.getElementById("btConcluirCusto");

containerFormulario.style.display = "none";
containerRegistroCustos.style.display = "none";

const escolhaRegistro = () => {
  containerFormulario.style.display = "none";
  containerRegistroCustos.style.display = "none";
  const divPai = document.createElement("div");
  divPai.className = "divPaiButtons";
  document.body.appendChild(divPai);

  const btCusto = document.createElement("button");
  btCusto.textContent = "REGISTRAR CUSTO";

  const img = document.createElement("img");
  img.src = "../images/subtract-color-icon.png";
  img.width = "70";
  btCusto.appendChild(img);
  
  btCusto.prepend(img);

  btCusto.className = "registerButton";

  const btGanho = document.createElement("button");
  btGanho.textContent = "REGISTRAR GANHO";

  const img2 = document.createElement("img");
  img2.src = "../images/addition-color-icon.png";
  img2.width = "70";
  btGanho.appendChild(img2);
  
  btGanho.prepend(img2);

  btGanho.className = "registerButton";

  btCusto.onclick = function() {
    btCusto.style.display = "none";
    btGanho.style.display = "none";
    containerRegistroCustos.style.display = "flex";
  }
  btGanho.onclick = function() {
    btGanho.style.display = "none"; 
    btCusto.style.display = "none";
    //containerRegistroCustos.style.display = "flex";

  }
  divPai.appendChild(btGanho)
  divPai.appendChild(btCusto)
};

//Funcao para dar load na pagina, caso já tenha algo registrado dentro do storage, significa que o registro do veiculo ja foi preenchido, entao ele tira o container da tela e joga os botoes para escolha.
const load = () => {
    if(localStorage.getItem("acesso")){
        escolhaRegistro();
    }else{
        containerFormulario.style.display = "flex";
    }


};

load();

//Funcao para o botao proximo do registro de informaçoes do veiculo, quando ja tiver preenchido ele vai sumir junto com o formulario.
const proximo = () => {
    const returnFunction = verifyInputs();
    if(returnFunction != undefined){
        alert(returnFunction);
        return;
    }

    localStorage.setItem("acesso", "acessado")
    let infoCarroObj = {};
    infoCarroObj.modelo = inputModelo.value;
    infoCarroObj.ano = Number(inputAno.value);
    infoCarroObj.tipoCombustivel = selectCombustivel.value;
    infoCarroObj.consumoMedio = Number(inputConsumo.value);
    const infoCarroObjJSON = JSON.stringify(infoCarroObj);
    localStorage.setItem("infoCarro", infoCarroObjJSON);
    load();
};


//Verificar todos os inputs e retornar um alerta caso tenha algum invalido.
const verifyInputs = () => {
  let stringFinal = "";

  if (inputModelo.value === "" || !isNaN(inputModelo.value)) {
    stringFinal += "Campo de modelo do veículo inválido.\n";
  }

  if (inputAno.value === "" || isNaN(inputAno.value)) {
    stringFinal += "Campo de ano do veículo inválido.\n";
  }

  if (selectCombustivel.value === "") {
    stringFinal += "Campo de seleção de tipo de combustível inválido.\n";
  }

  if (inputConsumo.value === "" || isNaN(inputConsumo.value)) {
    stringFinal += "Campo de consumo do veículo inválido.\n";
  }

  if(stringFinal.length > 1){
     return stringFinal;
  }

};

const verifyInputsCusto = () => {
  let stringFinal = "";

  if (inputTipoGasto.value == "") {
    stringFinal += "Campo de tipo de gasto inválido.\n";
  }

  if (inputDataCusto.value == "") {
    stringFinal += "Campo de data inválido.\n";
  }

  if (inputValorCusto.value == "" || isNaN(inputValorCusto.value)) {
    stringFinal += "Campo de valor do custo inválido.\n";
  }

  if(stringFinal.length > 1){
     return stringFinal;
  }
};

//Função para completar o registro dos custos do usuário, transforma tudo em string com json e manda para o localstorage um array de objetos.
btConcluirCusto.addEventListener("click", () => {
  let registroCustoObj = [{}];
  const returnFunction = verifyInputsCusto();
  if(returnFunction != undefined){
        alert(returnFunction);
        return;
    }
  
  if(localStorage.getItem("registroCusto")){
    let registroObjeto = JSON.parse(localStorage.getItem("registroCusto"));
    let novoRegistro = {tipoGasto: inputTipoGasto.value, formaPagamento: inputTipoPagamento.value, observacao: inputObservacao.value, data: inputDataCusto.value, valor: inputValorCusto.value};
    registroObjeto.push(novoRegistro);
    localStorage.setItem("registroCusto", JSON.stringify(registroObjeto));
  }else{
    let novoRegistro = [{tipoGasto: inputTipoGasto.value, formaPagamento: inputTipoPagamento.value, observacao: inputObservacao.value, data: inputDataCusto.value, valor: inputValorCusto.value}]; 
    localStorage.setItem("registroCusto", JSON.stringify(novoRegistro));
  }
});

