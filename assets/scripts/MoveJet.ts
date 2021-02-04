// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

interface Direction {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
}

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property
  direction: Direction = {
    left: false,
    right: false,
    up: false,
    down: false,
  };

  init() {
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.moveJet, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.stopJet, this);
  }

  moveJet(event) {
    switch (event.keyCode) {
      case cc.macro.KEY.left:
        this.direction.left = true;
        break;
      case cc.macro.KEY.right:
        this.direction.right = true;
        break;
      case cc.macro.KEY.up:
        this.direction.up = true;
        break;
      case cc.macro.KEY.down:
        this.direction.down = true;
        break;
    }
  }

  stopJet(event) {
    switch (event.keyCode) {
      case cc.macro.KEY.left:
        this.direction.left = false;
        break;
      case cc.macro.KEY.right:
        this.direction.right = false;
        break;
      case cc.macro.KEY.up:
        this.direction.up = false;
        break;
      case cc.macro.KEY.down:
        this.direction.down = false;
        break;
    }
  }

  handleMoveJet(dt: number) {
    const { x, y } = this.node.position;

    if (this.direction.left) {
      this.node.setPosition(x - 300 * dt, y);
    }

    if (this.direction.right) {
      this.node.setPosition(x + 300 * dt, y);
    }

    if (this.direction.up) {
      this.node.setPosition(x, y + 300 * dt);
    }

    if (this.direction.down) {
      this.node.setPosition(x, y - 300 * dt);
    }
  }

  onLoad() {
    this.init();
  }

  start() {}

  update(dt: number) {
    this.handleMoveJet(dt);
  }
}
