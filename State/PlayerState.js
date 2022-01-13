class PlayerState {
  constructor() {
    this.pizzas = {
      p1: {
        pizzaId: "s001",
        hp: 40,
        maxHp: 50,
        xp: 90,
        maxXp: 100,
        level: 1,
        status: {
          type: "saucy",
        },
      },
      p2: {
        pizzaId: "v001",
        hp: 50,
        maxHp: 50,
        xp: 20,
        maxXp: 100,
        level: 1,
        status: null,
      },
    };
    this.lineup = ["p1", "p2"];
    this.items = [
      {
        actionId: "item_recoverStatus",
        instanceId: "item1",
      },
      {
        actionId: "item_recoverStatus",
        instanceId: "item2",
      },
      {
        actionId: "item_recoverStatus",
        instanceId: "item3",
      },
    ];
  }
}

window.playerState = new PlayerState();
