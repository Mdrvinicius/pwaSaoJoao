const favoritos = JSON.parse(localStorage.getItem('favoritos')) || []
const listaFavoritos = document.getElementById('listaFavoritos')


function gerarlistaFavoritos(lista) {
    const container = document.getElementById('listaFavoritos')
    container.innerHTML = ''

    
    lista.forEach(listFav => {
        const novaData = new Date(listFav.dia + 'T12:00:00')
        const numeroDia = novaData.toLocaleDateString('pt-BR', { 'day': 'numeric' })
        const diaSemana = novaData.toLocaleDateString('pt-BR', { 'weekday': 'short' })
        .toUpperCase()
        .replace('.', '')

        
        
        container.innerHTML += `
        <div class="cardListaFav">
            <div id="dataShowFav">
            <h2>${numeroDia}</h2>
            <span>${diaSemana}</span>
            </div>
                <img src="../assets/img/${listFav.imagem}" alt="${listFav.artista}">
                    <div id="infoShowFav">
                    <h3>${listFav.artista}</h3>
                    <h4>${listFav.polo}</h4>
                    <time>${listFav.horario}</time>
                    </div>
                        <button class="btnFavoritar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                        </svg>
                        </button>
        </div>
        `
        const botoesFavoritar = document.querySelectorAll('.btnFavoritar')
        botoesFavoritar.forEach(btnFav =>   {
        btnFav.classList.add('favoritado')

        btnFav.addEventListener('click', function (){
            const artista = this.closest('.cardListaFav')

            const favoritos = JSON.parse(localStorage.getItem('favoritos')) || []
            const novaLista = favoritos.filter(f => f.artista !== artista.querySelector('h3').textContent)

            localStorage.setItem('favoritos', JSON.stringify(novaLista))

            artista.remove()
        })
    })

    });


}

gerarlistaFavoritos(JSON.parse(localStorage.getItem('favoritos')) || [])

const btnsFiltro = document.querySelectorAll('.btnFiltro')

btnsFiltro.forEach(btn => {
    btn.addEventListener('click', function() {
        
        btnsFiltro.forEach(b => b.classList.remove('ativo'))
        this.classList.add('ativo')

        if (this.dataset.filtro === 'hoje') {
            const favoritosAtualizados = JSON.parse(localStorage.getItem('favoritos')) || []
            const hojeISO = new Date().toISOString().split('T')[0]
            const favoritosHoje = favoritosAtualizados.filter(f => f.dia === hojeISO)
            gerarlistaFavoritos(JSON.parse(localStorage.getItem('favoritos')) || [])
                if (favoritosHoje.length === 0) {
                document.getElementById('listaFavoritos').innerHTML = '<p class="semFavoritos">Nenhum show favorito para hoje!</p>'
                }
        } else {
            gerarlistaFavoritos(JSON.parse(localStorage.getItem('favoritos')) || [])
        }
    })
})

    

    