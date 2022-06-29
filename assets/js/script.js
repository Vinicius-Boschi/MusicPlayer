import {musics} from '../js/musicas.js'

let player =  {
    musicPlayer: document.querySelector('#musicPlayer'),
    progress: document.querySelector('#progress'),
    timeSeconds: document.querySelector('.minutes_seconds'),
    timeFull: document.querySelector('.minutes_full'),
    backMusic: document.querySelector('.backMusic'),
    playMusic: document.querySelector('.playMusic'),
    skipMusic: document.querySelector('.skipMusic'),
    song: document.querySelector('#song'),
    artist: document.querySelector('.artist'),
    titleMusic: document.querySelector('.titleMusic'),
    image: document.querySelector('.image')
}

// Tempo das músicas.
function convertTime() {
    let minutes = Math.floor(musicPlayer.duration / 60)
    let secondsAudio = Math.floor(musicPlayer.duration % 60)
    let beginner = Math.floor(musicPlayer.currentTime / 60)
    let full = Math.floor(musicPlayer.currentTime % 60)

    if (beginner < 10) {
        beginner = '0' + beginner
    }
    if (full < 10) {
        full = '0' + full
    }
    if (secondsAudio < 10) {
        secondsAudio = '0' + secondsAudio
    }
    if (minutes < 10) {
        minutes = '0' + minutes
    }

    player.timeSeconds.innerText = `${beginner}:${full}`
    player.timeFull.innerText = `${minutes}:${secondsAudio}`
}

// Intervalo para executar as funções.
setInterval(convertTime, 1000)

// Carrega a barra de progresso de acordo com o passar da música.
function timeMusic() {
    musicPlayer.currentTime = progress.value
}

// Barra de progresso das músicas
function progressMusic() {
    progress.max = musicPlayer.duration
    progress.value = musicPlayer.currentTime
}

setInterval(progressMusic, 100)

// Inicia e pausa a música.
let playing = false

function playMusics() {
    if (playing == false) {
        player.playMusic.setAttribute('src', 'assets/img/pause.png') // Vai trocar o play pelo pause.
        musicPlayer.play() // Vai tocar a música.
        return (playing = true) // Vai retorna o playing como verdadeiro.
    } else {
        player.playMusic.setAttribute('src', 'assets/img/play.png') // Vai trocar o pause pelo play.
        musicPlayer.pause()
        return (playing = false)
    }
}

// Função pra pular para a próxima música.
let index = 0
function nextMusics() {
    index++

    if (index >= musics.length) {
        index = 0
    }

    song.src = musics[index].src
    player.artist.innerText = musics[index].name
    player.titleMusic.innerText = musics[index].music
    player.image.src = musics[index].photo

    musicPlayer.load()
    playMusics()
}

// Função para voltar a música anterior.
function backMusics() {
    index--

    if (index < 0) {
        alert('Não é possível voltar mais!')
    }

    song.src = musics[index].src
    player.artist.innerText = musics[index].name
    player.titleMusic.innerText = musics[index].music
    player.image.src = musics[index].photo

    musicPlayer.load()
    playMusics()
}

// Vai carregar a primeira música
window.onload = () => {
    song.src = musics[index].src
    player.artist.innerText = musics[index].name
    player.titleMusic.innerText = musics[index].music
    player.image.src = musics[index].photo
}

player.playMusic.addEventListener('click', playMusics)
player.skipMusic.addEventListener('click', nextMusics)
player.backMusic.addEventListener('click', backMusics)
progress.addEventListener('progress', timeMusic)