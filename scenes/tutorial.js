// Definindo a classe da cena de tutorial, que mostra instruções para o jogador
export class TutorialScene extends Phaser.Scene {
    // Definindo as variáveis da cena
    alturaJogo = 600;        // Altura da tela do jogo
    larguraJogo = 800;       // Largura da tela do jogo

    // Construtor da classe TutorialScene
    constructor() {
        super("TutorialScene"); // Nome da cena, usado para referência
    }

    // Função para carregar os recursos necessários para a cena (imagens)
    preload() {
        this.load.image("menu", "../assets/menubotao.png");               // Imagem do botão para voltar ao menu
        this.load.image("background", "../assets/fundotutorial.png");     // Imagem de fundo da tela de tutorial
    }

    // Função chamada após o carregamento para configurar a cena
    create() {
        // Adiciona o fundo da cena, centralizado
        this.add.image(this.larguraJogo / 2, this.alturaJogo / 2, "background").setScale(0.6);

        // Criando o botão para voltar ao menu, posicionado na parte inferior
        this.botaoMenu = this.add.image(this.larguraJogo / 2, 500, "menu").setScale(1.0).setInteractive();

        // Adiciona interatividade ao botão de menu
        this.botaoMenu.on("pointerover", () => {
            // Quando o mouse passa por cima, o cursor muda para um ponteiro
            this.input.setDefaultCursor("pointer");
        });

        this.botaoMenu.on("pointerout", () => {
            // Quando o mouse sai de cima do botão, o cursor volta ao padrão
            this.input.setDefaultCursor("default");
        });

        // Quando o botão é pressionado, a cena do tutorial é encerrada e o jogador volta para a cena de boas-vindas
        this.botaoMenu.on("pointerdown", () => {
            this.scene.start("WelcomeScene"); // Chama a cena "WelcomeScene", que provavelmente é o menu inicial
        });
    }

    // Função chamada a cada quadro, mas não há lógica adicional aqui
    update() {}
}
