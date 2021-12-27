class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
  }

  startGameLoop() {
    const step = () => {
      // Clear canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Establish camera person
      const cameraPerson = this.map.gameObjects.hero;

      // Draw Game Objects
      Object.values(this.map.gameObjects).forEach((object) => {
        object.update({
          arrow: this.directionInput.direction,
          map: this.map,
        });
      });

      // Draw lower layer
      this.map.drawLowerImage(this.ctx, cameraPerson);

      // Draw Game Objects
      Object.values(this.map.gameObjects).forEach((object) => {
        object.sprite.draw(this.ctx, cameraPerson);
      });

      // Draw upper layer
      this.map.drawUpperImage(this.ctx, cameraPerson);

      requestAnimationFrame(() => {
        step();
      });
    };
    step();
  }

  bindActionInput() {
    new KeyPressListener("Enter", () => {
      // IS there a person here to talk to?
      this.map.checkForActionCutscene();
    });
  }

  bindHeroPositionCheck() {
    document.addEventListener("PersonWalkingComplete", (e) => {
      if (e.detail.whoId === "hero") {
        // Hero's position has changed
        this.map.checkForFootstepCutscene();
      }
    });
  }

  startMap(mapConfig) {
    // console.log("Hello from the overworld", this);
    this.map = new OverworldMap(mapConfig);
    this.map.overworld = this;
    this.map.mountObjects();
  }

  init() {
    // console.log("Hello from the overworld", this);
    this.startMap(window.OverworldMaps.DemoRoom);

    this.bindActionInput();
    this.bindHeroPositionCheck();

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startGameLoop();
    // this.map.startCutscene([
    //   { who: "npc2", type: "walk", direction: "left" },
    //   { who: "npc2", type: "stand", direction: "down" },
    //   { who: "hero", type: "walk", direction: "down" },
    //   { who: "hero", type: "walk", direction: "down" },
    //   { who: "hero", type: "walk", direction: "down" },
    //   { who: "npc1", type: "walk", direction: "left" },
    //   { who: "npc1", type: "walk", direction: "left" },
    //   { who: "npc1", type: "stand", direction: "up", time: 100 },
    //   { type: "textMessage", text: "Hey!  What are you doing?!?" },
    // ]);
  }
}
