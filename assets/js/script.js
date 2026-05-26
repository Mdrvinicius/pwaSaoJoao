
        //BOTÕES DO MMENU
        const botoesMenu = document.querySelectorAll('.btnMenu')
    

        const atual = window.location.pathname
            botoesMenu.forEach(botao => { 
                if(atual.includes(botao.dataset.pagina)){
                    botao.classList.add('ativo')
                }

            })
            if (!document.querySelector('.btnMenu.ativo')) {
                botoesMenu[0].classList.add('ativo')
            }



        botoesMenu.forEach(botao => {
            botao.addEventListener('click', function () {
                botoesMenu.forEach(b => b.classList.remove('ativo'))
                this.classList.add('ativo')


                if(this.dataset.pagina === 'inicio'){
                    window.location.href= '/index.html'
                }else {
                    window.location.href = '/pages/' + this.dataset.pagina + '.html'
                }
            })
        })

    