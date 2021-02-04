// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property
  bulletSpeed: number = 0;

  // 監聽碰撞
  onCollisionEnter(otherCollider, selfCollider) {
    console.log("onCollisionEnter");
    // player 跟子彈碰撞
    if (
      otherCollider.name === "player<PolygonCollider>" &&
      selfCollider.name === "Bullet<PolygonCollider>"
    ) {
      cc.director.loadScene("Menu");
    }

    // 子彈碰撞到敵機, 子彈要銷毀
    switch (otherCollider.name) {
      case "alienship3<PolygonCollider>":
      case "alienship4<PolygonCollider>":
      case "alienship5<PolygonCollider>":
        this.node.destroy();
        break;
    }
  }

  init() {
    cc.director.preloadScene("Menu");
  }

  // LIFE-CYCLE CALLBACKS:
  onLoad() {
    this.init();
  }

  start() {}

  update(dt: number) {
    this.handleMove(dt);
  }

  handleMove(dt: number) {
    this.node.setPosition(
      this.node.position.x,
      (this.node.position.y += this.bulletSpeed * dt)
    );

    if (this.node.position.y >= this.node.parent.getContentSize().height) {
      this.node.destroy();
    }
  }
}
