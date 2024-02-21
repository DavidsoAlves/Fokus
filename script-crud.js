const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const formTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTarefa = document.querySelector('.app__section-task-list');
const BtnCancelar = document.querySelector('.app__form-footer__button--cancel')

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []

function atualizarTarefas(){
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

function criarElementoTarefa(tarefa){
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
        <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>
    `
    const paragrafo = document.createElement('p')
    paragrafo.textContent = tarefa.descricao
    paragrafo.classList.add('app__section-task-list-item-description')

    const botao = document.createElement('button')
    const imagemBotao = document.createElement('img')
    botao.classList.add('app_button-edit')
    imagemBotao.setAttribute('src', '/imagens/edit.png')

    botao.onclick = () => {
        const novaDescricao = prompt("Qual o novo nome da tarefa?")
        if(novaDescricao){
            paragrafo.textContent = novaDescricao;
            tarefa.descricao = novaDescricao;
            atualizarTarefas()
        }else{
            alert("Tarefa vazia, tente novamente!")
        }

    }

    botao.append(imagemBotao)

    li.append(svg)
    li.append(paragrafo)
    li.append(botao)

    return li;
}

btnAdicionarTarefa.addEventListener('click', () => {
    formTarefa.classList.toggle('hidden');
})

function limparForms(){
    formTarefa.classList.toggle('hidden');
    textArea.value = '';
}

BtnCancelar.addEventListener('click',limparForms)

formTarefa.addEventListener('submit', (evento) =>{
    evento.preventDefault();
    const tarefa = {
        descricao: textArea.value
    }
    tarefas.push(tarefa)
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefa.append(elementoTarefa)
    atualizarTarefas()
    textArea.value = '';
    formTarefa.classList.add('hidden')
})

tarefas.forEach(tarefa =>{
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefa.append(elementoTarefa);
})
