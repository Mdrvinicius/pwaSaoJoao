const CACHE_NAME = 'saojoao-v1'

const ARQUIVOS = [
    '/',
    '/index.html',
    '/pages/home.html',
    '/pages/programacao.html',
    '/pages/polos.html',
    '/pages/favoritos.html',
    '/pages/mais.html',
    '/pages/mais/turismo.html',
    '/pages/mais/onde-comer.html',
    '/pages/mais/onde-ficar.html',
    '/pages/mais/sobre-arcoverde.html',
    '/pages/mais/desenvolvedor.html',
    '/assets/css/style.css',
    '/assets/js/script.js',
    '/assets/js/home.js',
    '/assets/js/programacao.js',
    '/assets/js/polos.js',
    '/assets/js/favoritos.js',
    '/assets/js/turismo.js',
    '/assets/js/onde-comer.js',
    '/assets/js/onde-ficar.js',
    '/data/dados.json'
]

// instala o service worker e cacheia os arquivos
self.addEventListener('install', evento => {
    evento.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ARQUIVOS))
    )
})

// ativa e limpa caches antigos
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

// intercepta requisições — tenta cache primeiro, depois rede
self.addEventListener('fetch', evento => {
    evento.respondWith(
        caches.match(evento.request)
            .then(resposta => {
                if (resposta) return resposta
                return fetch(evento.request)
            })
    )
})