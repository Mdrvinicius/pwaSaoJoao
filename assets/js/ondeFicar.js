fetch('../../data/dados.json')
    .then(resposta => resposta.json())
    .then(dados => {

        const hoteis = dados.descancar
        const container = document.getElementById('cardsHoteis')
        const inputPesquisa = document.getElementById('inputPesquisa')

        function gerarHoteis(lista) {
            container.innerHTML = ''

            lista.forEach(h => {
                container.innerHTML += `
                    <div class="cardHotel">
                        <img src="../../assets/img/${h.imagem}" alt="${h.nome}">
                        <div class="infoHotel">
                            <h2>${h.nome}</h2>
                            <p>${h.tipo}</p>
                            <span class="avaliacao">⭐ ${h.avaliacao}</span>
                        </div>
                        <button class="abrirMapa"
                            data-lat="${h.latitude}"
                            data-lng="${h.longitude}">
                            Ver no Mapa
                        </button>
                    </div>
                `
            })

            document.querySelectorAll('.abrirMapa').forEach(btn => {
                btn.addEventListener('click', function() {
                    window.open(
                        `https://www.google.com/maps/dir/?api=1&destination=${this.dataset.lat},${this.dataset.lng}`,
                        '_blank'
                    )
                })
            })
        }

        gerarHoteis(hoteis)

        inputPesquisa.addEventListener('input', function() {
            const termo = this.value.toLowerCase()
            const filtrados = hoteis.filter(h => 
                h.nome.toLowerCase().includes(termo)
            )
            gerarHoteis(filtrados)
        })
    })