fetch('../../data/dados.json')
    .then(resposta => resposta.json())
    .then(dados => {
        const restaurantes = dados.restaurantes
        const container = document.getElementById('cardsRestaurantes')
        const inputPesquisa = document.getElementById('inputPesquisa')

        function gerarRestaurantes(lista) {
            container.innerHTML = ''
            lista.forEach(r => {
                container.innerHTML += `
                    <div class="cardRestaurante">
                        <img src="../../assets/img/${r.imagem}" alt="${r.nome}">
                        <div class="infoRestaurante">
                            <h2>${r.nome}</h2>
                            <p>${r.tipo}</p>
                            <span class="avaliacao">⭐ ${r.avaliacao}</span>
                        </div>
                        <button class="abrirMapa"
                            data-lat="${r.latitude}"
                            data-lng="${r.longitude}">
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

        gerarRestaurantes(restaurantes)

        inputPesquisa.addEventListener('input', function() {
            const termo = this.value.toLowerCase()
            const filtrados = restaurantes.filter(r => 
                r.nome.toLowerCase().includes(termo)
            )
            gerarRestaurantes(filtrados)
        })
    })