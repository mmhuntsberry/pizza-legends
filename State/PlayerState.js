class PlayerState {
  constructor() {
    this.pizzas = {
      p1: {
        pizzaId: "s001",
        hp: 1,
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
      p3: {
        pizzaId: "f001",
        hp: 50,
        maxHp: 50,
        xp: 20,
        maxXp: 100,
        level: 1,
        status: null,
      },
    };
    this.storyFlags = {};
    this.lineup = ["p1"];
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

  addPizza(pizzaId) {
    const newId = `p${Date.now()}` + Math.floor(Math.random() * 999999);
    this.pizzas[newId] = {
      pizzaId,
      hp: 50,
      maxHp: 50,
      xp: 100,
      maxXp: 100,
      level: 1,
      status: null,
    };

    if (this.lineup.length < 3) {
      this.lineup.push(newId);
    }

    utils.emitEvent("LineupChanged");
    console.log(this);
  }

  moveToFront(futureFrontId) {
    this.lineup = this.lineup.filter((id) => id !== futureFrontId);
    this.lineup.unshift(futureFrontId);
    utils.emitEvent("LineupChanged");
  }

  swapLineup(oldId, incomingId) {
    const oldIndex = this.lineup.indexOf(oldId);
    this.lineup[oldIndex] = incomingId;
    utils.emitEvent("LineupChanged");
  }
}

window.playerState = new PlayerState();
