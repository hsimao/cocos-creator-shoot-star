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
  // bullets
  @property(cc.Prefab)
  greenBullet: cc.Prefab = null;

  // 創建子彈
  shootBullets() {
    const bullet = cc.instantiate(this.greenBullet);
    bullet.setPosition(this.node.position.x, this.node.position.y);
    this.node.parent.addChild(bullet);
  }

  @property
  direction: Direction = {
    left: false,
    right: false,
    up: false,
    down: false,
  };

  init() {
    // 監聽鍵盤事件
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.moveJet, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.stopJet, this);

    // 監聽父層 canvas touch 事件
    this.node.parent.on("touchstart", this.handleTouch, this);
    this.node.parent.on("touchend", this.handleStopTouch, this);

    // 每 0.2 秒創建一個子彈
    this.schedule(this.shootBullets, 0.2, cc.macro.REPEAT_FOREVER, 0);
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

  handleTouch(event) {
    if (event.getLocationX() < this.node.parent.getContentSize().width / 2) {
      this.direction.left = true;
    }
    if (event.getLocationX() > this.node.parent.getContentSize().width / 2) {
      this.direction.right = true;
    }
  }

  handleStopTouch() {
    this.direction.left = false;
    this.direction.right = false;
  }

  onLoad() {
    this.init();
  }

  start() {}

  update(dt: number) {
    this.handleMoveJet(dt);
  }
}
