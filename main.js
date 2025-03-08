// Importando as cenas do jogo a partir de arquivos separados
import { GameScene } from "./scenes/game.js";          // A cena principal do jogo
import { WelcomeScene } from "./scenes/welcome.js";    // A cena de boas-vindas
import { EndScene } from "./scenes/end.js";            // A cena de fim de jogo
import { TutorialScene } from "./scenes/tutorial.js";  // A cena do tutorial

const config = {
    // Tipo de renderização: Phaser pode usar WebGL ou Canvas dependendo do dispositivo
    type: Phaser.AUTO, 
    
    // Definindo a largura e altura da tela do jogo
    width: 800,    // Largura da tela em pixels
    height: 600,   // Altura da tela em pixels
    
    // Cor de fundo do jogo (escuro, para melhor contraste)
    backgroundColor: "#1a1a1a", // Cor hexadecimal para o fundo da tela

    // Configurações para uso de pixel art (importante para jogos estilo retro)
    pixelArt: true,       // Define que a arte é em pixel, o que ajuda o Phaser a otimizar o desempenho
    roundPixel: false,    // Não arredonda os pixels (pode ser útil em alguns casos)

    // Configuração de escala da tela
    scale: {
        mode: Phaser.Scale.FIT,         // Faz com que o jogo se ajuste para caber na tela sem cortar
        autoCenter: Phaser.Scale.CENTER_BOTH // Centraliza o jogo tanto vertical quanto horizontalmente
    },

    // Configuração do sistema de física do jogo
    physics: {
        default: "arcade", // Usa o sistema de física Arcade, otimizado para jogos 2D simples
        arcade: {
            gravity: { y: 400 },  // Aplica uma gravidade para os objetos (400 pixels por segundo)
            debug: false          // Desativa o modo de depuração da física (não exibe linhas de colisão)
        }
    },

    // Definindo as cenas do jogo (a ordem importa)
    scene: [WelcomeScene, TutorialScene, GameScene, EndScene]  
};

const game = new Phaser.Game(config);  // Inicia o jogo com a configuração especificada
