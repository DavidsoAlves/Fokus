const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const musicaFoco = document.getElementById('alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.getElementById('start-pause')
const iniciarPausarBT = document.querySelector('#start-pause span')
const iconeIniciarPausar = document.querySelector('.app__card-primary-butto-icon')
const tempoTela = document.getElementById('timer')
const audioPlay = new Audio('/sons/play.wav')
const audioPause = new Audio('/sons/pause.mp3')
const audioFim = new Audio('/sons/beep.mp3')


let tempoDecorridoSegundos = 1500
let intervaloId = null

musica.loop = true;

musicaFoco.addEventListener('change', () =>{
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
})

focoBt.addEventListener('click', () =>{
    tempoDecorridoSegundos = 1500;
    alterarContexto('foco')
    focoBt.classList.add('active')
})
curtoBt.addEventListener('click', () =>{
    tempoDecorridoSegundos = 300;
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})
longoBt.addEventListener('click', () =>{
    tempoDecorridoSegundos = 900;
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto){
    mostrarTempo();
    botoes.forEach( (contexto) =>{
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src',`/imagens/${contexto}.png`)
    switch(contexto){
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>            
            `
            break;
        default:
            break;
    }
}

const contagemRegressiva = () =>{
    if(tempoDecorridoSegundos <= 0 ){
        // audioFim.play();
        alert('Tempo finalizado!')
        zerar()
        return
    }
    tempoDecorridoSegundos -= 1  
    mostrarTempo()
}

function iniciarPausar(){

    if(intervaloId){
        audioPause.play();
        zerar();
        return
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva,1000)
    iniciarPausarBT.textContent = "Pausar"
    iconeIniciarPausar.setAttribute('src',`/imagens/pause.png`)
    
}

startPauseBt.addEventListener('click', iniciarPausar);

function zerar(){
    clearInterval(intervaloId)
    iniciarPausarBT.textContent = "Começar"
    iconeIniciarPausar.setAttribute('src',`/imagens/play_arrow.png`)
    intervaloId = null
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoSegundos * 1000)
    const tempoFormatado = tempo.toLocaleString('pt-br',{minute: '2-digit',second: '2-digit'})
    tempoTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo();
