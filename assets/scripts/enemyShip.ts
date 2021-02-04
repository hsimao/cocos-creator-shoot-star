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
  enemyLife: number = 3;
  @property
  shootFrequency: number = 3.0;
  @property
  duration: number = 0.5;
  @property
  moveAmountX: number = 300;
  @property
  moveAmountY: number = 75;

  moveEnemy: cc.ActionInterval;
  playAnimation: boolean = true;

  // 創建子彈
  shootBullets() {
    const bullet = cc.instantiate(this.yellowBullet);
    bullet.setPosition(this.node.position.x, this.node.position.y);
    this.node.parent.addChild(bullet);
  }

  setMovements() {
    const moveLeft = cc
      .moveBy(this.duration, cc.v2(-this.moveAmountX, -this.moveAmountY))
      .easing(cc.easeCircleActionInOut());
    const moveRight = cc
      .moveBy(this.duration, cc.v2(this.moveAmountX, -this.moveAmountY))
      .easing(cc.easeCircleActionInOut());

    return cc.repeatForever(cc.sequence(moveLeft, moveRight));
  }

  // 監聽碰撞
  onCollisionEnter(otherCollider, selfCollider) {
    // 如果碰撞的元素是綠色子彈, 敵機生命扣 1
    if (otherCollider.name === "greenbullet<PolygonCollider>") {
      this.enemyLife--;
      // 如果血扣到剩 0, 執行死亡邏輯
      if (this.enemyLife === 0 && this.playAnimation) {
        this.handleDie();
      }
    }

    // 如果碰撞到的是 player, 回到 Menu 場景
    if (otherCollider.name === "player<PolygonCollider>") {
      cc.director.loadScene("Menu");
    }
  }

  // 停止移動, 並播放爆炸動畫
  handleDie() {
    this.node.stopAllActions(); // 停止移動
    this.playAnimation = false;
    this.node.getComponent(cc.Animation).play();
  }

  // 爆炸動畫結束時會呼叫的方法
  removeExplosion() {
    this.node.destroy();
  }

  init() {
    // 執行移動
    this.moveEnemy = this.setMovements();
    this.node.runAction(this.moveEnemy);

    // 依據 shootFrequency 頻率, 持續發射子彈
    this.schedule(
      this.shootBullets,
      this.shootFrequency,
      cc.macro.REPEAT_FOREVER,
      3
    );

    cc.director.preloadScene("Menu");
  }

  handleGameEnd() {
    // 如果敵機移動到銀幕外面, 銷毀敵機, 轉到 Menu 場景
    if (
      Math.abs(this.node.position.y) >= this.node.parent.getContentSize().height
    ) {
      this.node.destroy();
      cc.director.loadScene("Menu");
    }
  }

  onLoad() {
    this.init();
  }

  start() {}

  update(dt) {
    this.handleGameEnd();
  }
}
