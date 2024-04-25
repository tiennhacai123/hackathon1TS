"use strict";
class Player {
    constructor() {
        this.players = [];
        this.loadPlayers();
        this.renderPlayers();
        this.setupEventListeners();
    }
    loadPlayers() {
        const playersData = localStorage.getItem("players");
        if (playersData) {
            this.players = JSON.parse(playersData);
        }
    }
    savePlayers() {
        localStorage.setItem("players", JSON.stringify(this.players));
    }
    renderPlayers() {
        const playersContainer = document.getElementById("playersContainer");
        if (playersContainer) {
            playersContainer.innerHTML = "";
            this.players.forEach((player, index) => {
                const playerDiv = document.createElement("div");
                playerDiv.classList.add("player");
                playerDiv.innerHTML = `
                      <div class="left">
                          <button class="deletePlayerBtn" dataIndex="${index}">❌</button>&nbsp;
                          ♕&nbsp;<p>${player.name}</p>
                      </div>
                      <div class="right">
                          <button class="decreaseScoreBtn" dataIndex="${index}">➖</button>&nbsp;
                          <p>${player.score}</p>&nbsp;
                          <button class="increaseScoreBtn" dataIndex="${index}">➕</button>
                      </div>
                  `;
                playersContainer.appendChild(playerDiv);
                const hr = document.createElement("hr");
                playersContainer.appendChild(hr);
            });
            this.updateStats();
        }
    }
    setupEventListeners() {
        //createPlayer()
        const addPlayerBtn = document.getElementById("addPlayerBtn");
        if (addPlayerBtn) {
            addPlayerBtn.addEventListener("click", () => {
                const playerNameInput = document.getElementById("newPlayerName");
                const playerName = playerNameInput.value.trim();
                const idPlayer = Math.floor(Math.random() * 1000000);
                if (playerName !== "") {
                    const newPlayer = { id: idPlayer, name: playerName, score: 0 };
                    this.players.push(newPlayer);
                    this.savePlayers();
                    this.renderPlayers();
                    playerNameInput.value = "";
                }
            });
        }
        //deletePlayer()
        const playersContainer = document.getElementById("playersContainer");
        if (playersContainer) {
            playersContainer.addEventListener("click", (event) => {
                const target = event.target;
                if (target.classList.contains("deletePlayerBtn")) {
                    const index = parseInt(target.getAttribute("dataIndex") || "");
                    if (!isNaN(index) && index >= 0 && index < this.players.length) {
                        this.players.splice(index, 1);
                        this.savePlayers();
                        this.renderPlayers();
                    }
                    //updatePlayer();
                }
                else if (target.classList.contains("increaseScoreBtn")) {
                    const index = parseInt(target.getAttribute("dataIndex") || "");
                    if (!isNaN(index) && index >= 0 && index < this.players.length) {
                        this.players[index].score++;
                        this.savePlayers();
                        this.renderPlayers();
                    }
                }
                else if (target.classList.contains("decreaseScoreBtn")) {
                    const index = parseInt(target.getAttribute("dataIndex") || "");
                    if (!isNaN(index) &&
                        index >= 0 &&
                        index < this.players.length &&
                        this.players[index].score > 0) {
                        this.players[index].score--;
                        this.savePlayers();
                        this.renderPlayers();
                    }
                }
            });
        }
    }
    updateStats() {
        const playerCount = document.getElementById("playerCount");
        const totalPoints = document.getElementById("totalPoints");
        if (playerCount && totalPoints) {
            playerCount.innerText = `Players: ${this.players.length}`;
            totalPoints.innerText = `Total points: ${this.getTotalPoints()}`;
        }
    }
    getTotalPoints() {
        return this.players.reduce((total, player) => total + player.score, 0);
    }
}
new Player();
