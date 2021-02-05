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

  spawnShips() {
    const ships = [this.alienship1, this.alienship2, this.alienship3];
    const random = Math.floor(Math.random() * ships.length);
    const newShip = cc.instantiate(ships[random]);
    const randomX = [170, 0, 170];
    const randX = Math.floor(Math.random() * randomX.length);
    console.log(randX);

    newShip.setPosition(
      randX,
      this.node.position.y + newShip.getContentSize().height * 2
    );

    this.node.addChild(newShip);
  }

  onLoad() {
    const manager = cc.director.getCollisionManager();
    manager.enabled = true;
  }

  start() {}

  // update (dt) {}
}
