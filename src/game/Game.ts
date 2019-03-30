// Liberapp 2019 - Tahiti Katagai
// ゲームシーン

const OBJECT_SIZE_PER_H = 1/7;

const SAVE_KEY_BESTSCORE = "tower-bestScore";

const BACK_COLOR = 0xeae7dc;    // index.htmlで設定
const FONT_COLOR = 0xe85a4f;
const BLOCK_COLOR = 0xd8c3a5;
const BLOCK_COLOR2 = 0xe98074;
const BLOCK_COLOR3 = 0x8e8d8a;

class Game {

    static loadSceneGamePlay() {
        new Score();
        new Player();
        new StartMessage();
    }
}
