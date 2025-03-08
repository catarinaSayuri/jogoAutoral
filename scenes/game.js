// Definindo a classe da cena de jogo, que é onde a jogabilidade acontece
export class GameScene extends Phaser.Scene {
    // Definindo as variáveis da cena
    alturaJogo = 600;        // Altura da tela do jogo
    larguraJogo = 800;       // Largura da tela do jogo
    plataformas = [];        // Array para armazenar as plataformas do jogo
    borboleta;               // Variável para armazenar o sprite da borboleta
    pontuacao = 0;           // Variável para armazenar a pontuação do jogador
    placar;                  // Texto do placar que será exibido na tela
    jogoFinalizado = false;  // Flag para verificar se o jogo foi finalizado
    tempoRestante = 20;      // Tempo total do jogo (em segundos)
    cronometroTexto;         // Texto que mostra o tempo restante na tela
    temporizador;            // Variável para o temporizador

    constructor() {
        super("MainScene"); // Nome da cena, usado para referência
    }

    // Função para carregar os recursos necessários para a cena (imagens e sprites)
    preload() {
        this.load.image("fundo", "assets/fundo.jpg");                   // Imagem do fundo do jogo
        this.load.image("plataforma", "assets/tronco.png");            // Imagem da plataforma (tronco)
        this.load.spritesheet("grace_sprite", "assets/spritesheetGrace.png", { frameWidth: 64, frameHeight: 64 }); // Sprite do jogador
        this.load.image("borboleta", "assets/bug.png");                 // Imagem da borboleta
    }

    // Função chamada após o carregamento para configurar a cena
    create() {
        // Inicializa variáveis
        this.pontuacao = 0;
        this.jogoFinalizado = false;
        this.tempoRestante = 20;

        // Adiciona o fundo da cena, centralizado
        this.add.image(this.larguraJogo / 2, this.alturaJogo / 2, "fundo").setScale(1.5);

        // Criando o jogador, com a física do jogo (objeto animado)
        this.player = this.physics.add.sprite(this.larguraJogo / 2, 100, 'grace_sprite').setScale(1.3);
        this.player.setCollideWorldBounds(true); // Garante que o jogador não saia da tela

        // Criando as plataformas, definindo posição e hitbox personalizada
        this.plataformas[0] = this.physics.add.staticImage(200, 450, 'plataforma');
        this.plataformas[0].body.setSize(60, 20, true); // Reduzindo o tamanho da hitbox
        this.plataformas[0].setScale(0.3);

        this.plataformas[1] = this.physics.add.staticImage(580, 360, 'plataforma');
        this.plataformas[1].body.setSize(60, 20, true);
        this.plataformas[1].setScale(0.3);

        this.plataformas[2] = this.physics.add.staticImage(400, 250, 'plataforma');
        this.plataformas[2].body.setSize(60, 20, true);
        this.plataformas[2].setScale(0.3);

        // Adicionando colisões entre o jogador e as plataformas
        for (let i = 0; i < this.plataformas.length; i++) {
            this.physics.add.collider(this.player, this.plataformas[i]);
        }

        // Criando a borboleta, com física e colisões
        this.borboleta = this.physics.add.sprite(400, 150, 'borboleta').setScale(0.1);
        this.borboleta.setCollideWorldBounds(true); // Garante que a borboleta não sai da tela
        this.borboleta.setScale(0.3);
        // Adiciona colisões da borboleta com as plataformas
        this.physics.add.collider(this.borboleta, this.plataformas[0]);
        this.physics.add.collider(this.borboleta, this.plataformas[1]);
        this.physics.add.collider(this.borboleta, this.plataformas[2]);

        // Detecta o overlap entre o jogador e a borboleta
        this.physics.add.overlap(this.player, this.borboleta, this.coletarBorboleta, null, this);

        // Adicionando o placar que exibe a pontuação do jogador
        this.placar = this.add.text(50, 50, 'Pontuação: ' + this.pontuacao, {
            fontSize: '45px',
            fill: '#ff0000'
        });

        // Adicionando o cronômetro que exibe o tempo restante
        this.cronometroTexto = this.add.text(500, 50, 'Tempo: ' + this.tempoRestante, {
            fontSize: '45px',
            fill: '#ff0000'
        });

        // Configuração das teclas para movimentação do jogador
        this.cursors = this.input.keyboard.createCursorKeys();

        // Criando animações para o jogador
        if (this.textures.exists("grace_sprite")) {
            this.anims.create({
                key: 'direita',
                frames: this.anims.generateFrameNumbers('grace_sprite', { start: 5, end: 8 }),
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'esquerda',
                frames: this.anims.generateFrameNumbers('grace_sprite', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'parada',
                frames: [{ key: 'grace_sprite', frame: 4 }],
                frameRate: 20
            });
        } else {
            console.warn("Spritesheet 'grace_sprite' não carregado corretamente.");
        }
    }

    // Função chamada a cada quadro para atualizar a lógica do jogo
    update() {
        if (this.jogoFinalizado) return; // Se o jogo já terminou, não faz mais nada

        // Atualizando o cronômetro com base no tempo decorrido
        this.tempoRestante -= this.game.loop.delta / 1000;
        this.cronometroTexto.setText('Tempo: ' + Math.ceil(this.tempoRestante));

        // Verificando se o tempo acabou
        if (this.tempoRestante <= 0) {
            this.jogoFinalizado = true;
            this.cronometroTexto.setText('Tempo: 0');
            this.scene.start('EndScene', { resultado: "perdeu" }); // Inicia a tela de fim de jogo com "perdeu"
            return; // Impede qualquer outra ação após o fim do jogo
        }

        // Se a pontuação atingir 5 borboletas, o jogador vence
        if (this.pontuacao >= 5) {
            this.jogoFinalizado = true;
            this.scene.start('EndScene', { resultado: "ganhou" }); // Inicia a tela de fim de jogo com "ganhou"
            return; // Impede qualquer outra ação após o fim do jogo
        }

        // Movimentação do jogador com as teclas de seta
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('esquerda', true); // Animação para mover para a esquerda
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('direita', true); // Animação para mover para a direita
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('parada', true); // Animação para quando o jogador estiver parado
        }

        // Permite que o jogador pule quando pressionar a tecla para cima
        if (this.cursors.up.isDown && this.player.body.blocked.down) {
            this.player.setVelocityY(-400); // Impulso para o salto
        }
    }

    // Função chamada quando o jogador coleta a borboleta
    coletarBorboleta(player, borboleta) {
        console.log("Borboleta coletada!"); // Log de depuração
        // Move a borboleta para uma posição aleatória
        borboleta.setPosition(Phaser.Math.Between(100, 700), Phaser.Math.Between(100, 500));
        this.pontuacao += 1; // Incrementa a pontuação
        this.placar.setText('Pontuação: ' + this.pontuacao); // Atualiza o placar
    }
}
