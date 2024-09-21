/* Avaliação 2 - Houve um vestibular para ingresso de alunos na instituição
beaseado em 5 matérias: Natureza, Humanas, Linguagens, Matermática e Redação com notas de 0 a 1000.
Precisa-se de um sistema que cadastre o nome completo, número de inscrição, ano de nascimento e as matérias com as notas dos vestibulandos de 5 até 20 pessoas.

A mensagem "Aprovado", nas matérias acima de 550;
A mensagem "Reprovado", nas matérias acima de 400;
A mensagem "Recuperação", nas matérias acima de 401 e 549.

Exiba todos os dados cadastrados e os seus resultados na página HTML. */


const form = document.getElementById('form');
const resultadosDiv = document.getElementById('resultados');
let totalAlunos = 0;

form.onsubmit = function(event) {
    event.preventDefault();

    if (totalAlunos >= 20) {
        alert('Limite de 20 alunos atingido.');
        return;
    }

    const nome = document.getElementById('nome').value;
    const inscricao = document.getElementById('inscricao').value;
    const anoNascimento = Number(document.getElementById('anoNascimento').value);

    // Verifica se o ano de nascimento está entre 1901 e 2007
    if (anoNascimento < 1901 || anoNascimento > 2007) {
        alert('Ano de nascimento deve estar entre 1901 e 2007.');
        return;
    }

    // Verifica se o número de inscrição tem 10 dígitos e começa com "2024"
    if (!/^(2024)\d{6}$/.test(inscricao)) {
        alert('Número de inscrição deve ter 10 dígitos e começar com 2024.');
        return;
    }

    const notas = [
        { nome: 'Natureza', valor: Number(document.getElementById('natureza').value) },
        { nome: 'Humanas', valor: Number(document.getElementById('humanas').value) },
        { nome: 'Linguagens', valor: Number(document.getElementById('linguagens').value) },
        { nome: 'Matemática', valor: Number(document.getElementById('matematica').value) },
        { nome: 'Redação', valor: Number(document.getElementById('redacao').value) }
    ];

    let resultadoTexto = `<div class="resultado">
        <strong>Nome:</strong> ${nome}<br/>
        <strong>Nº Inscrição:</strong> ${inscricao}<br/>
        <strong>Ano Nascimento:</strong> ${anoNascimento}<br/>`;

    for (let nota of notas) {
        let status;
        if (nota.valor > 550) status = "Aprovado";
        else if (nota.valor > 400) status = "Recuperação";
        else status = "Reprovado";

        resultadoTexto += `<strong>${nota.nome}:</strong> ${nota.valor} (${status})<br/>`;
    }

    resultadoTexto += `</div>`;
    resultadosDiv.innerHTML += resultadoTexto;

    totalAlunos++;
    form.reset();
};

