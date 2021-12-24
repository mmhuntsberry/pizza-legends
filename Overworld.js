class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
  }

  init() {
    console.log("Hello from the overworld", this);
    const image = new Image();
    image.onload = () => {
      this.ctx.drawImage(image, 0, 0);
    };
    image.src = "/images/maps/DemoLower.png";

    const x = 5;
    const y = 6;
    const hero = new Image();
    hero.onload = () => {
      this.ctx.drawImage(
        hero, // image draw pixels from
        0, // left cur
        0, // top cut
        32, // size of cut width
        32, // size of cut height
        x * 16 - 8, // compensate for grid
        y * 16 - 18, // compensate for grid
        32,
        32
      );
    };
    hero.src = "/images/characters/people/hero.png";

    // Cast shadow
    const shadow = new Image();
    shadow.onload = () => {
      this.ctx.drawImage(
        shadow, // image draw pixels from
        0, // left cur
        0, // top cut
        32, // size of cut width
        32, // size of cut height
        x * 16 - 8, // compensate for grid
        y * 16 - 18, // compensate for grid
        32,
        32
      );
    };
    shadow.src = "/images/characters/shadow.png";
  }
}
