fetch('../data/dados.json')
    .then(resposta => resposta.json())
    .then(dados => {

        const dadosPolos = dados.polos
        const container = document.getElementById('cardPolos')


        function gerarPolos() {
            container.innerHTML = ''


            dadosPolos.forEach(pl => {

                container.innerHTML += `
                <div class="cardsPolos">
                    <div class="img">
                        <img src="../assets/img/${pl.img}">
                
                    </div>
                        <div class="infoPolos">
                            <h2>${pl.nome}</h2>
                            <h3>${pl.descricao}</h3>
                        </div>
                            <button class="abrirMapa"
                            data-lat="${pl.latitude}"
                            data-lng="${pl.longitude}">
                                Abrir Localização
                            </button>    
                </div>
                
                `

            })
        }


        function ativarBotaoMapa() {
            const botaoMapa = document.querySelectorAll('.abrirMapa')

            botaoMapa.forEach(botao => {
                botao.addEventListener('click', function () {
                    const lat = botao.dataset.lat;
                    const lng = botao.dataset.lng;

                    window.open(
                        `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
                        '_blank'
                    );
                })

            })

        }
        gerarPolos()
        ativarBotaoMapa()









    })
