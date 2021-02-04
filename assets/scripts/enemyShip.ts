// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Prefab)
  yellowBullet: cc.Prefab = null;

  @property
  shootFrequency: number = 3.0;

  // 創建子彈
  shootBullets() {
    const bullet = cc.instantiate(this.yellowBullet);
    bullet.setPosition(this.node.position.x, this.node.position.y);
    this.node.parent.addChild(bullet);
  }

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    // 依據 shootFrequency 頻率, 發射子彈
    this.schedule(
      this.shootBullets,
      this.shootFrequency,
      cc.macro.REPEAT_FOREVER,
      0
    );
  }

  start() {}

  // update (dt) {}
}
