// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.AudioClip)
  clickAudio: cc.AudioClip = null;

  handlePlay() {
    cc.audioEngine.playEffect(this.clickAudio, false);
    cc.director.loadScene("game");
  }

  onLoad() {
    cc.director.preloadScene("game");

    this.node.on("touchstart", this.handlePlay, this);
  }
}
