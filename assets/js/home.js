
fetch('./data/dados.json')
    .then(resposta => resposta.json())
    .then(dados => {



        // DATA DE HOJE
        const hoje = new Date()
        const diaFormatado = hoje.toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        })
        document.getElementById('dataHoje').textContent = diaFormatado

        //PROGRAMACAO DO DIA
        const hojeISO = hoje.toISOString().split('T')[0]
        const poloMulticultural = dados.polos[0]

        let diaHoje = poloMulticultural.programacao.find(d => d.dia === hojeISO)
        if (!diaHoje) {
            diaHoje = poloMulticultural.programacao[0]
        }

        const showsDestaque = diaHoje.shows.filter(show => show.destaque === true)
        const patrocinadores = dados.patrocinadores

        const showsComTipo = showsDestaque.map(show => ({ ...show, tipo: 'show' }))
        const patrocinadoresComTipo = patrocinadores.map(pat => ({ ...pat, tipo: 'patrocinador' }))

        const slides = [...showsComTipo, ...patrocinadoresComTipo]

        //CARROSEL
        let indiceAtual = 0
        let timer

        function mostrarSlide(indice) {
            const slide = slides[indice]
            const cardPrincipal = document.getElementById('cardPrincipal')

            cardPrincipal.style.opacity = '0'

            setTimeout(function () {
                if (slide.tipo === 'show') {
                    cardPrincipal.innerHTML = `
                        <img src="./assets/img/${slide.imagem}" alt="${slide.artista}">
                        <h2>${poloMulticultural.nome}</h2>
                        <h3>${slide.artista}</h3>
                        <time>${slide.horario}</time>
                    `
                } else {
                    cardPrincipal.innerHTML = `
                        <img src="./assets/img/${slide.logo}" alt="${slide.nome}">
                        <div class="badgePatrocinador">Patrocinador Oficial</div>
                        <h3>${slide.nome}</h3>
                    `
                }
                cardPrincipal.style.opacity = '1'
            }, 300)
        }

        function iniciarTimer() {
            timer = setInterval(function () {
                indiceAtual = indiceAtual + 1
                if (indiceAtual >= slides.length) indiceAtual = 0
                mostrarSlide(indiceAtual)
            }, 5000)
        }

        //ARRASTAR TELA
        const cardPrincipal = document.getElementById('cardPrincipal')
        let touchInicio = 0

        cardPrincipal.addEventListener('touchstart', function (e) {
            clearInterval(timer)
            touchInicio = e.touches[0].clientX
        })

        cardPrincipal.addEventListener('touchend', function (e) {
            const touchFim = e.changedTouches[0].clientX
            const diferenca = touchInicio - touchFim

            if (diferenca > 50) {
                indiceAtual = indiceAtual + 1
                if (indiceAtual >= slides.length) indiceAtual = 0
                mostrarSlide(indiceAtual)
            }

            if (diferenca < -50) {
                indiceAtual = indiceAtual - 1
                if (indiceAtual < 0) indiceAtual = slides.length - 1
                mostrarSlide(indiceAtual)
            }

            iniciarTimer()
        })

        mostrarSlide(indiceAtual)
        iniciarTimer()

        //PROXIMOS SHOWS
        const showsProximos = diaHoje.shows.filter(show => show.destaque === false)
        const proximosContainer = document.getElementById('proximosShows')

        showsProximos.forEach(show => {
            proximosContainer.innerHTML += `
                    <div class="cardShow">
                    <time>${show.horario}</time>
                    <div class="infoShow">
                        <h2>${poloMulticultural.nome}</h2>
                        <h3>${show.artista}</h3>
                    </div>
                    <button class="btnFavoritar"
                        data-artista="${show.artista}"
                        data-horario="${show.horario}"
                        data-polo="${poloMulticultural.nome}"
                        data-dia="${diaHoje.dia}"
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


        //BOTÕES FAVORITOS
        const botoesFavoritar = document.querySelectorAll('.btnFavoritar')
        botoesFavoritar.forEach(btnFav => {

            const favoritosAtuais = JSON.parse(localStorage.getItem('favoritos')) || []

            const jaFavoritado = favoritosAtuais.find(f => f.artista === btnFav.dataset.artista)

                if (jaFavoritado) {
                    btnFav.classList.add('favoritado')
            }


            btnFav.addEventListener('click', function () {
                this.classList.add('favoritado')

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