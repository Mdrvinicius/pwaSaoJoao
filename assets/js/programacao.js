fetch('../data/dados.json')
    .then(resposta => resposta.json())
    .then(dados => {

        const programacaoCompleta = dados.polos[0].programacao
        const nomePolo = dados.polos[0].nome
        const todosPolos = dados.polos
        const filtroDia = document.getElementById('filtroScroll')



        function gerarBotoesDias() {
            filtroDia.innerHTML = ''

            programacaoCompleta.forEach(dias => {
                const novaData = new Date(dias.dia + 'T12:00:00')
                const numeroDia = novaData.toLocaleString('pt-BR', { day: 'numeric' })
                const diaSemana = novaData.toLocaleString('pt-BR', { weekday: 'short' })
                    .toUpperCase()
                    .replace('.', '')

                filtroDia.innerHTML += `
                    <button class='botaoDias' data-dia="${dias.dia}">
                        <h2>${numeroDia}</h2>
                        <span>${diaSemana}</span>
                    </button>
                `
            })


            const botoesDia = document.querySelectorAll('.botaoDias')
            botoesDia.forEach(btn => {
                btn.addEventListener('click', function () {
                    botoesDia.forEach(b => b.classList.remove('ativo'))
                    this.classList.add('ativo')
                    const diaClicado = programacaoCompleta.find(d => d.dia === this.dataset.dia)
                    gerarProgramacao(diaClicado)
                })
            })
        }


        const btnsFiltro = document.querySelectorAll('.btnFiltro')
        btnsFiltro.forEach(btn => {
            btn.addEventListener('click', function () {
                btnsFiltro.forEach(b => b.classList.remove('ativo'))
                this.classList.add('ativo')


                if (this.dataset.filtro === 'polo') {
                    filtroDia.innerHTML = ''
                    todosPolos.forEach(polo => {
                        filtroDia.innerHTML += `
                            <button class='botaoPolos' data-polo="${polo.id}">
                                <span>${polo.nome}</span>
                            </button>
                        `
                    })

                    const botoesPolos = document.querySelectorAll('.botaoPolos')
                    botoesPolos.forEach(btn => {
                        btn.addEventListener('click', function () {
                            botoesPolos.forEach(b => b.classList.remove('ativo'))
                            this.classList.add('ativo')
                            const poloClicado = todosPolos.find(p => p.id === this.dataset.polo)
                            gerarProgramacaoPolo(poloClicado)
                        })
                    })

                } else {
                    gerarBotoesDias()

                    const hojeISO = new Date().toISOString().split('T')[0]
                    let diaInicial = programacaoCompleta.find(d => d.dia === hojeISO)
                    if (!diaInicial) diaInicial = programacaoCompleta[0]

                    const botaoInicial = document.querySelector(`.botaoDias[data-dia="${diaInicial.dia}"]`)
                    botaoInicial.classList.add('ativo')
                    gerarProgramacao(diaInicial)
                }
                const primeiroPoloBtn = document.querySelector('.botaoPolos')
                primeiroPoloBtn.classList.add('ativo')
                gerarProgramacaoPolo(todosPolos[0])
            })


        })



        gerarBotoesDias()

        const hojeISO = new Date().toISOString().split('T')[0]
        let diaInicial = programacaoCompleta.find(d => d.dia === hojeISO)
        if (!diaInicial) diaInicial = programacaoCompleta[0]

        const botaoInicial = document.querySelector(`.botaoDias[data-dia="${diaInicial.dia}"]`)
        botaoInicial.classList.add('ativo')
        gerarProgramacao(diaInicial)


        function gerarProgramacao(dia) {
            const container = document.getElementById('programacao')
            container.innerHTML = ''

            dia.shows.forEach(show => {
               container.innerHTML += `
                        <div class="cardProgramacao">
                            <img src="../assets/img/${show.imagem}" alt="${show.artista}" class="imgArtistaProg">
                            <div class="infoShowProgramacao">
                                <h3>${nomePolo}</h3>
                                <h4>${show.artista}</h4>
                                <time>${show.horario}</time>
                            </div>
                            <button class="btnFavoritar"
                                data-artista="${show.artista}"
                                data-horario="${show.horario}"
                                data-polo="${nomePolo}"
                                data-dia="${dia.dia}"
                                data-imagem="${show.imagem}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                                </svg>
                            </button>
                        </div>
                    `
            })


            const btnFavoritar = document.querySelectorAll('.btnFavoritar')
            btnFavoritar.forEach(btn => {
                const favoritosAtuais = JSON.parse(localStorage.getItem('favoritos')) || []
                const jaFavoritado = favoritosAtuais.find(f => f.artista === btn.dataset.artista)
                if (jaFavoritado) btn.classList.add('favoritado')

                btn.addEventListener('click', function () {
                    const show = {
                        artista: this.dataset.artista,
                        horario: this.dataset.horario,
                        polo: this.dataset.polo,
                        dia: this.dataset.dia,
                        imagem: this.dataset.imagem
                    }

                    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || []
                    const jaExiste = favoritos.find(f => f.artista === show.artista)

                    if (jaExiste) {
                        const novaLista = favoritos.filter(f => f.artista !== show.artista)
                        localStorage.setItem('favoritos', JSON.stringify(novaLista))
                        this.classList.remove('favoritado')
                    } else {
                        favoritos.push(show)
                        localStorage.setItem('favoritos', JSON.stringify(favoritos))
                        this.classList.add('favoritado')
                    }
                })
            })
        }


        function gerarProgramacaoPolo(polo) {
            const container = document.getElementById('programacao')
            container.innerHTML = ''

            polo.programacao.forEach(dia => {
                const novaData = new Date(dia.dia + 'T12:00:00')
                const diaFormatado = novaData.toLocaleDateString('pt-BR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long'
                })

                container.innerHTML += `<h2 class="tituloDia">${diaFormatado}</h2>`

                dia.shows.forEach(show => {
                    container.innerHTML += `
                            <div class="cardProgramacao">
                                <img src="../assets/img/${show.imagem}" alt="${show.artista}" class="imgArtistaProg">
                                <div class="infoShowProgramacao">
                                    <h3>${polo.nome}</h3>
                                    <h4>${show.artista}</h4>
                                    <time>${show.horario}</time>
                                </div>
                                <button class="btnFavoritar"
                                    data-artista="${show.artista}"
                                    data-horario="${show.horario}"
                                    data-polo="${polo.nome}"
                                    data-dia="${dia.dia}"
                                    data-imagem="${show.imagem}">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                                    </svg>
                                </button>
                            </div>
                        `
                })
                const btnFavoritar = document.querySelectorAll('.btnFavoritar')
                btnFavoritar.forEach(btn => {
                    const favoritosAtuais = JSON.parse(localStorage.getItem('favoritos')) || []
                    const jaFavoritado = favoritosAtuais.find(f => f.artista === btn.dataset.artista)
                    if (jaFavoritado) btn.classList.add('favoritado')

                    btn.addEventListener('click', function () {
                        const show = {
                            artista: this.dataset.artista,
                            horario: this.dataset.horario,
                            polo: this.dataset.polo,
                            dia: this.dataset.dia,
                            imagem: this.dataset.imagem
                        }

                        const favoritos = JSON.parse(localStorage.getItem('favoritos')) || []
                        const jaExiste = favoritos.find(f => f.artista === show.artista)

                        if (jaExiste) {
                            const novaLista = favoritos.filter(f => f.artista !== show.artista)
                            localStorage.setItem('favoritos', JSON.stringify(novaLista))
                            this.classList.remove('favoritado')
                        } else {
                            favoritos.push(show)
                            localStorage.setItem('favoritos', JSON.stringify(favoritos))
                            this.classList.add('favoritado')
                        }
                    })
                })
            })
        }


    })