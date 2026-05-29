fetch('../../data/dados.json')
    .then(resposta => resposta.json())
    .then(dados => {

        const pontos = dados.pontosTuristicos
        const  container = document.getElementById('cardsTurismo')


        pontos.forEach(ponto => {
            container.innerHTML += `
                <div class="cardTurismo">
                    <img src="../../assets/img/${ponto.imagem}" alt="${ponto.nome}">
                    <div class="infoTurismo">
                        <h2>${ponto.nome}</h2>
                        <p>${ponto.descricao}</p>
                        <button class="abrirMapa" 
                            data-lat="${ponto.latitude}" 
                            data-lng="${ponto.longitude}">
                            Ver no Mapa
                        </button>
                    </div>
                </div>
            `
        });

        document.querySelectorAll('.abrirMapa').forEach(btn => {
            btn.addEventListener('click', function() {
                window.open(
                    `https://www.google.com/maps/dir/?api=1&destination=${this.dataset.lat},${this.dataset.lng}`,
                    '_blank'
                )
            })
        })

    })