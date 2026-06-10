const CACHE_NAME = 'saojoao-v1'

const ARQUIVOS = [
    '/',
    '/index.html',
    '/pages/programacao.html',
    '/pages/polos.html',
    '/pages/favoritos.html',
    '/pages/mais.html',
    '/pages/mais/turismo.html',
    '/pages/mais/ondeComer.html',
    '/pages/mais/ondeFicar.html',
    '/pages/mais/sobreArcoverde.html',
    '/pages/mais/sobreSaoJoao.html',
    '/pages/mais/desenvolvedor.html',
    '/assets/css/style.css',
    '/assets/js/script.js',
    '/assets/js/home.js',
    '/assets/js/programacao.js',
    '/assets/js/polos.js',
    '/assets/js/favoritos.js',
    '/assets/js/turismo.js',
    '/assets/js/ondeComer.js',
    '/assets/js/ondeFicar.js',
    '/data/dados.json'
]


self.addEventListener('install', evento => {
    evento.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ARQUIVOS))
    )
})


self.addEventListener('activate', evento => {
    evento.waitUntil(
        caches.keys().then(chaves => {
            return Promise.all(
                chaves
                    .filter(chave => chave !== CACHE_NAME)
                    .map(chave => caches.delete(chave))
            )
        })
    )
})


self.addEventListener('fetch', evento => {
    evento.respondWith(
        caches.match(evento.request)
            .then(resposta => {
                if (resposta) return resposta
                return fetch(evento.request)
            })
    )
})