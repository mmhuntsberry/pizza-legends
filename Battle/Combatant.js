class Combatant {
  constructor(config, battle) {
    this.battle = battle;
    Object.keys(config).forEach((key) => {
      this[key] = config[key];
    });

    // If we didn't receive hp assume they have maxHp
    this.hp = typeof this.hp === "undefined" ? this.maxHp : this.hp;
  }

  get hpPercent() {
    const percent = (this.hp / this.maxHp) * 100;
    // We need to account for if hp is less than 0
    return percent > 0 ? percent : 0;
  }

  get xpPercent() {
    return (this.xp / this.maxXp) * 100;
  }

  get isActive() {
    return this.battle?.activeCombatants[this.team] === this.id;
  }

  get givesXp() {
    return this.level * 20;
  }

  createElement() {
    this.hudElement = document.createElement("div");
    this.hudElement.classList.add("Combatant");
    this.hudElement.setAttribute("data-combatant", this.id);
    this.hudElement.setAttribute("data-team", this.team);
    this.hudElement.innerHTML = `
    <p class="Combatant__name">${this.name}</p>
    <p class="Combatant__level"></p>
    <div class="Combatant__character__crop">
      <img src="${this.src}" alt="${this.name}" class="Combatant__character" />
    </div>
    <img src="${this.icon}" alt="${this.type}" class="Combatant__type" />
      <svg viewBox="0 0 26 3" class="Combatant__life-container">
        <rect x=0 y=0 width="0%" height=1 fill="#82ff71"/>
        <rect x=0 y=1 width="0%" height=2 fill="#3ef126"/>
      </svg>
      <svg viewBox="0 0 26 2" class="Combatant__xp-container">
        <rect x=0 y=0 width="0%" height=1 fill="#ffd76a"/>
        <rect x=0 y=1 width="0%" height=1 fill="#ffc934"/>
      </svg>
      <p class="Combatant__status"></p>
    `;

    this.pizzaElement = document.createElement("img");
    this.pizzaElement.classList.add("Pizza");
    this.pizzaElement.setAttribute("src", this.src);
    this.pizzaElement.setAttribute("alt", this.name);
    this.pizzaElement.setAttribute("data-team", this.team);

    this.hpFills = this.hudElement.querySelectorAll(
      ".Combatant__life-container > rect"
    );

    this.xpFills = this.hudElement.querySelectorAll(
      ".Combatant__xp-container > rect"
    );
  }

  update(changes = {}) {
    // Update anyting incoming
    Object.keys(changes).forEach((key) => {
      this[key] = changes[key];
    });

    // Update active flag to show correct pizza & hud
    this.hudElement.setAttribute("data-active", this.isActive);
    this.pizzaElement.setAttribute("data-active", this.isActive);

    // Update HP & XP percent fills
    this.hpFills.forEach((rect) => {
      rect.style.width = `${this.hpPercent}%`;
    });

    this.xpFills.forEach((rect) => {
      rect.style.width = `${this.xpPercent}%`;
    });

    // Update level on screen
    this.hudElement.querySelector(".Combatant__level").innerHTML = this.level;

    // Update status
    const statusElement = this.hudElement.querySelector(".Combatant__status");
    if (this.status) {
      statusElement.innerHTML = this.status.type;
      statusElement.style.display = "block";
    } else {
      statusElement.innerHTML = "";
      statusElement.style.display = "block";
    }
  }

  getPostEvents() {
    if (this.status?.type === "saucy") {
      return [
        { type: "textMessage", text: "Feelin' saucy!" },
        { type: "stateChange", recover: 5, onCaster: true },
      ];
    }

    return [];
  }

  getReplacedEvents(originalEvents) {
    if (
      this.status?.type === "clumsy" &&
      utils.randomFromArray([true, false, false])
    ) {
      return [{ type: "textMessage", text: `${this.name} flops over!` }];
    }
    return originalEvents;
  }

  decrementStatus() {
    if (this.status?.expiresIn > 0) {
      this.status.expiresIn -= 1;
      if (this.status.expiresIn === 0) {
        this.update({
          status: null,
        });

        return {
          type: "textMessage",
          text: "Status expired",
        };
      }
    }

    return null;
  }

  init(container) {
    this.createElement();
    container.appendChild(this.hudElement);
    container.appendChild(this.pizzaElement);
    this.update();
  }
}
