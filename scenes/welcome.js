// Definindo a classe da cena de Boas-vindas, que é uma das cenas do jogo
export class WelcomeScene extends Phaser.Scene {
    // Definindo as dimensões da tela do jogo
    alturaJogo = 600;  // Altura da tela em pixels
    larguraJogo = 800; // Largura da tela em pixels

    // Construtor da cena, que é chamado quando a cena é iniciada
    constructor() {
        // O nome dado à cena é "WelcomeScene", que será usado para referenciá-la em outras partes do jogo
        super("WelcomeScene");
    }

    // Função que carrega os recursos (imagens, sons, etc.) necessários para a cena
    preload() {
        // Carregando as imagens necessárias para a cena
        this.load.image("paisagem", "../assets/paisagem.png");            // Imagem de fundo da paisagem
        this.load.image("computador", "../assets/fundoflorestainicial.jpg"); // Imagem do fundo da cena com tema de floresta
        this.load.image("play", "../assets/jogarbotao.png");             // Imagem do botão "Jogar"
        this.load.image("tutorial", "../assets/tutorialbotao.png");     // Imagem do botão "Tutorial"
    }

    // Função que cria os elementos visuais e interativos da cena
    create() {
        // Adicionando o fundo da cena, centralizado com a escala definida
        this.add.image(this.larguraJogo / 2, this.alturaJogo / 2, "computador").setScale(0.6);

        // Criando o botão "Jogar", centralizado na tela
        this.botaoJogar = this.add.image(this.larguraJogo / 2, 290, "play").setInteractive();

        // Configuração de interatividade do botão "Jogar"
        // Quando o cursor do mouse passar sobre o botão, o cursor será alterado para um ponteiro
        this.botaoJogar.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });

        // Quando o cursor do mouse sair de cima do botão, o cursor volta ao normal
        this.botaoJogar.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });

        // Quando o botão for pressionado, a cena "MainScene" será iniciada
        this.botaoJogar.on("pointerdown", () => {
            this.scene.start("MainScene");  // Chama a cena principal do jogo
        });

        // Criando o botão "Tutorial", centralizado na tela abaixo do botão "Jogar"
        this.botaoTutorial = this.add.image(this.larguraJogo / 2, 350, "tutorial").setInteractive();

        // Configuração de interatividade do botão "Tutorial"
        this.botaoTutorial.on("pointerover", () => {
            this.input.setDefaultCursor("pointer"); // Cursor se torna ponteiro ao passar por cima
        });

        // Quando o cursor sair do botão, o cursor volta ao normal
        this.botaoTutorial.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });

        // Quando o botão for pressionado, a cena "TutorialScene" será iniciada
        this.botaoTutorial.on("pointerdown", () => {
            this.scene.start("TutorialScene");  // Chama a cena de tutorial do jogo
        });
    }

    // Função de atualização da cena (não usada nesta cena, mas necessária para a estrutura do Phaser)
    update() {}
}
