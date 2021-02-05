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
  alienship1: cc.Prefab = null;
  @property(cc.Prefab)
  alienship2: cc.Prefab = null;
  @property(cc.Prefab)
  alienship3: cc.Prefab = null;
  @property(cc.Prefab)
  boss: cc.Prefab = null;

  spawnCount: number = 0;

  spawnShips() {
    const ships = [this.alienship1, this.alienship2, this.alienship3];
    const random = Math.floor(Math.random() * ships.length);
    const newShip = cc.instantiate(ships[random]);
    const randomX = [170, 0, -170];
    const randX = Math.floor(Math.random() * randomX.length);

    newShip.setPosition(
      randX,
      this.node.position.y * 2 + newShip.getContentSize().height * 2
    );

    this.node.addChild(newShip);

    this.spawnCount++;
    if (this.spawnCount >= 5) {
      this.spawnBoss();
    }
  }

  getRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  spawnBoss() {
    this.spawnCount = 0;
    const newBoss = cc.instantiate(this.boss);
    newBoss.setPosition(
      this.getRandom(-this.node.position.x, this.node.position.x),
      this.node.position.y * 2 + newBoss.getContentSize().height
    );
    this.node.addChild(newBoss);
  }

  onLoad() {
    console.log("onLoad");
    const manager = cc.director.getCollisionManager();
    manager.enabled = true;
  }

  start() {}

  // update (dt) {}
}
