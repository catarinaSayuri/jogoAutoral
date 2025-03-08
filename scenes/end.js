// Definindo a classe da cena final, que mostra o resultado do jogo
export class EndScene extends Phaser.Scene {
    // Definindo as variáveis da cena
    alturaJogo = 600;        // Altura da tela do jogo
    larguraJogo = 800;       // Largura da tela do jogo

    // Construtor da classe EndScene
    constructor() {
        super("EndScene"); // Nome da cena, usado para referência
    }

    // Função chamada quando a cena é iniciada, recebe dados da cena anterior
    init(data) {
        this.resultado = data.resultado; // O resultado (ganhou ou perdeu) vem da cena de jogo (GameScene)
    }

    // Função para carregar os recursos necessários para a cena (imagens)
    preload() {
        // Carregando imagens que serão usadas na cena
        this.load.image("paisagem", "../assets/paisagem.png");       // Imagem de fundo
        this.load.image("computador", "../assets/fundoflorestainicial.jpg"); // Imagem do fundo específico
        this.load.image("perdeu", "../assets/perdeu.png");           // Imagem de "perdeu"
        this.load.image("ganhou", "../assets/ganhou.png");           // Imagem de "ganhou"
        this.load.image("menu", "../assets/menubotao.png");         // Botão de "Menu"
        this.load.image("restart", "../assets/RESTART.png");        // Botão de "Restart"
    }

    // Função chamada após o carregamento dos recursos para configurar a cena
    create() {
        // Adiciona o fundo da cena, centralizado
        this.add.image(this.larguraJogo / 2, this.alturaJogo / 2, "computador").setScale(0.6);

        // Definindo a posição para exibir o resultado (mais para baixo)
        let yResultado = 300;

        // Exibindo a imagem de "ganhou" ou "perdeu" dependendo do resultado
        if (this.resultado === "ganhou") {
            this.add.image(this.larguraJogo / 2, yResultado, "ganhou").setScale(1);
        } else if (this.resultado === "perdeu") {
            this.add.image(this.larguraJogo / 2, yResultado, "perdeu").setScale(1);
        }

        // Ajustes para a posição e espaçamento dos botões
        let espacamento = 200; // Aumenta o espaçamento entre os botões
        let yBotoes = 450;     // Ajusta a posição vertical dos botões

        // Botão "Menu" que leva o jogador de volta à tela inicial
        this.botaoMenu = this.add.image(this.larguraJogo / 2 - espacamento / 2, yBotoes, "menu").setScale(1.0).setInteractive();

        // Botão "Restart" para reiniciar o jogo
        this.botaoRestart = this.add.image(this.larguraJogo / 2 + espacamento / 2, yBotoes, "restart").setScale(1.0).setInteractive();

        // Adicionando eventos para interatividade do botão "Menu"
        this.botaoMenu.on("pointerover", () => {
            // Quando o mouse passa por cima, o cursor muda para um ponteiro
            this.input.setDefaultCursor("pointer");
        });
        this.botaoMenu.on("pointerout", () => {
            // Quando o mouse sai de cima, o cursor volta ao padrão
            this.input.setDefaultCursor("default");
        });
        // Quando o botão é pressionado, a cena de boas-vindas é carregada
        this.botaoMenu.on("pointerdown", () => {
            this.scene.start("WelcomeScene"); // Chama a cena "WelcomeScene", que provavelmente é o menu inicial
        });

        // Adicionando eventos para interatividade do botão "Restart"
        this.botaoRestart.on("pointerover", () => {
            // Quando o mouse passa por cima, o cursor muda para um ponteiro
            this.input.setDefaultCursor("pointer");
        });
        this.botaoRestart.on("pointerout", () => {
            // Quando o mouse sai de cima, o cursor volta ao padrão
            this.input.setDefaultCursor("default");
        });
        // Quando o botão é pressionado, reinicia a cena de jogo
        this.botaoRestart.on("pointerdown", () => {
            this.scene.stop("EndScene");    // Para a cena de fim de jogo
            this.scene.start("MainScene");  // Chama a cena principal do jogo (reinicia o jogo)
        });
    }

    // Função chamada a cada quadro, mas não há lógica adicional aqui
    update() {}
}
