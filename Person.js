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
    if (this.movingProgressRemaing > 0) {
      this.updatePosition();
    } else {
      // More cases for starting to walk will go here

      // Case: We're keyboard ready and have an arrow pressed
      if (
        state.map.isCutscenePlaying === false &&
        this.isPlayerControlled &&
        state.arrow
      ) {
        this.startBehavior(state, {
          type: "walk",
          direction: state.arrow,
        });
      }
      this.updateSprite(state);
    }
  }

  startBehavior(state, behavior) {
    // Set character direction to whatever behavior has
    this.direction = behavior.direction;
    // Stop if space isn't free
    if (behavior.type === "walk") {
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
        behavior.retry && setTimeout(() => this.startBehavior(state, behavior));
        return;
      }

      // Ready to Walk
      state.map.moveWall(this.x, this.y, this.direction);
      this.movingProgressRemaing = 16;
      this.updateSprite(state);
    }

    if (behavior.type === "stand") {
      setTimeout(() => {
        utils.emitEvent("PersonStandComplete", {
          whoId: this.id,
        });
      }, behavior.time);
    }
  }

  updatePosition() {
    if (this.movingProgressRemaing > 0) {
      const [property, change] = this.directionUpdate[this.direction];
      this[property] += change;
      this.movingProgressRemaing -= 1;
    }

    if (this.movingProgressRemaing === 0) {
      // we finished walking!
      utils.emitEvent("PersonWalkingComplete", {
        whoId: this.id,
      });
    }
  }

  updateSprite() {
    if (this.movingProgressRemaing > 0) {
      this.sprite.setAnimation("walk-" + this.direction);
      return;
    }

    this.sprite.setAnimation("idle-" + this.direction);
  }
}
