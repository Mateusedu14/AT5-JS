/* Avaliação 1 - Crie um algoritmo de pagamento em que se cadastre prestadores
de serviço, pegando os seguintes dados: nome completo, um número do PIS/PASEP, o
valor da sua hora trabalhada e a quantidade de horas trabalhadas de 5 a 50 pessoas.
No fim dos cadastros deve-se mostrar os dados, o valor bruto do serviço e o líquido
descontado na página html dos cadastrados. */

function calcularINSS(totalRecebido) {
    let inss = 0;

    if (totalRecebido <= 1100) {
        inss = totalRecebido * 0.075;
    } else if (totalRecebido <= 2203.48) {
        inss = totalRecebido * 0.09;
    } else if (totalRecebido <= 3305.22) {
        inss = totalRecebido * 0.12;
    } else {
        inss = totalRecebido * 0.14;
    }

    return inss;
}

function calcularIRPF(totalRecebido) {
    let irpf = 0;

    if (totalRecebido <= 1903.98) {
        irpf = 0; // Isento
    } else if (totalRecebido <= 2826.65) {
        irpf = (totalRecebido - 1903.98) * 0.075;
    } else if (totalRecebido <= 3751.05) {
        irpf = (totalRecebido - 2826.65) * 0.15 + (2826.65 - 1903.98) * 0.075;
    } else if (totalRecebido <= 4664.68) {
        irpf = (totalRecebido - 3751.05) * 0.225 + (3751.05 - 2826.65) * 0.15 + (2826.65 - 1903.98) * 0.075;
    } else {
        irpf = (totalRecebido - 4664.68) * 0.275 + (4664.68 - 3751.05) * 0.225 + (3751.05 - 2826.65) * 0.15 + (2826.65 - 1903.98) * 0.075;
    }

    return irpf;
}

function lerNomesNumerosHoraTrabQuantHorasTrab() {
    let continuar = true;
    let contador = 0;
    let prestadores = [];

    do {
        let prestador = {};
        contador++;

        
        let nome = prompt("Informe o nome do prestador de serviço:");
        nome = nome.trim();
        
        
        while (nome.length < 3 || !/\s/.test(nome)) {
            nome = prompt("Informe um nome Válido (mínimo 3 caracteres e com pelo menos um espaço):");
        }
        prestador["nome"] = nome;

        
        let numeropispasep;
        do {
            numeropispasep = prompt("Informe o número do PIS/PASEP (11 dígitos):");
            if (numeropispasep.length > 11) {
                alert("O número do PIS/PASEP deve ter exatamente 11 dígitos.");
            }
        } while (numeropispasep.length !== 11 || !/^\d{11}$/.test(numeropispasep));

        prestador["numeropispasep"] = numeropispasep; 

        
        let valorHoraTrab = prompt("Informe o valor da hora trabalhada:");
        while (isNaN(valorHoraTrab) || (parseFloat(valorHoraTrab) < 20 || parseFloat(valorHoraTrab) > 500)) {
            valorHoraTrab = prompt("Informe um valor entre R$20,00 e R$500,00:");
        }
        prestador["valorHoraTrabalhada"] = parseFloat(valorHoraTrab);

        
        let horaTrab = prompt("Informe a quantidade de horas trabalhadas:");
        while (isNaN(horaTrab) || (parseFloat(horaTrab) < 20 || parseFloat(horaTrab) > 200)) {
            horaTrab = prompt("Informe uma quantidade de horas válida entre 20 e 200:");
        }
        prestador["horaTrabalhada"] = parseFloat(horaTrab);

        
        let totalRecebido = prestador.valorHoraTrabalhada * prestador.horaTrabalhada;
        prestador["totalRecebido"] = totalRecebido;

        
        prestador["inss"] = calcularINSS(totalRecebido);

       
        prestador["iss"] = totalRecebido * 0.05;

        
        prestador["irpf"] = calcularIRPF(totalRecebido);

        
        prestador["liquido"] = totalRecebido - (prestador.inss + prestador.iss + prestador.irpf);

        
        prestadores.push(prestador);

        
        continuar = (contador < 2) || (contador < 50 && confirm("Deseja continuar o cadastro?"));

    } while (continuar);

    return prestadores;
}

function exibirPrestadores(listaprestadores) {
    let mensagem = "";
    for (let i = 0; i < listaprestadores.length; i++) {
        let pres = listaprestadores[i];
        mensagem += `
            Nome: ${pres["nome"]} <br/>
            Número PIS/PASEP: ${pres["numeropispasep"]} <br/>
            Valor Hora Trabalhada: R$${pres["valorHoraTrabalhada"].toFixed(2)} <br/>
            Hora Trabalhada: ${pres["horaTrabalhada"]} <br/>
            Total Recebido: R$${pres["totalRecebido"].toFixed(2)} <br/>
            INSS: R$${pres["inss"].toFixed(2)} <br/>
            ISS: R$${pres["iss"].toFixed(2)} <br/>
            IRPF: R$${pres["irpf"].toFixed(2)} <br/>
            Valor Líquido: R$${pres["liquido"].toFixed(2)} <br/>
            <br/><br/> 
        `;
    }
    document.write(mensagem); 

let lista = lerNomesNumerosHoraTrabQuantHorasTrab();
exibirPrestadores(lista);

console.log(lista);


