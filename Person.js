class Person extends GameObject {
  constructor(config) {
    super(config);

    this.movingProgressRemaing = 0;
    this.isPlayerControlled = config.isPlayerControlled || false;

    this.directionUpdate = {
      up: ["y", -1],
      down: ["y", 1],
      left: ["x", -1],
      right: ["x", 1],
    };
  }

  update(state) {
    this.updatePosition();

    if (
      this.isPlayerControlled &&
      this.movingProgressRemaing === 0 &&
      state.arrow
    ) {
      this.direction = state.arrow;
      this.movingProgressRemaing = 16;
    }
  }

  updatePosition() {
    if (this.movingProgressRemaing > 0) {
      const [property, change] = this.directionUpdate[this.direction];
      this[property] += change;
      this.movingProgressRemaing -= 1;
    }
  }
}
