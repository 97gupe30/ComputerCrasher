// Basik varibler
var game,
    ctx;

// Spel variabler
var monsterHealth = 10, healthChanger = 10,
    dmg = [1, 0] // Index 0 = DPC, Index 1 = DPS.
money = 0,
    cost = [20, 25], // index 0 = clickDMG, Index 1 = dpsUpgrade1.
    level = [0, 0]; // Index 0 = clickLevel, Index 1 = DPSLevel.
// Bild variabler
var computerImg;

function start() {
    game = document.getElementById("game");
    ctx = game.getContext("2d");

    computerImg = document.getElementById("computer");

    window.setInterval(update, 25);
    window.setInterval(dps, 1000);
}

/////////////////////////////////////// POWER UPS ////////////////////////

function clickdmg() { // Cost index 0
    if(money >= cost[0]) {
        dmg[0] = dmg[0] * 2;
        money -= cost[0];
        cost[0] += 10;
        level[0]++;
    }
}

function dpsUpgrade1() {
    if(money >= cost[1]) {
        dmg[1] = dmg[1] + 1;
        money -= cost[1];
        cost[1] += 5;
        level[1]++;
    }
}





//////////////////////////////////////////////////////////////////////////

function timer() {
    computerImg = document.getElementById("computer");
}

function mouseHandler() {

    if(monsterHealth > 0) {
        monsterHealth -= dmg[0];
    }

    // Pengar när monster är död
    if(monsterHealth <= 0) {
        // Pengar och resetar hp:et till det gamla * 2
        money += 10;
        monsterHealth = healthChanger*3;
        healthChanger = monsterHealth;

        // Ändrar bild till död bilden
        computerImg = document.getElementById("computerCrashed");
        setTimeout(function(){timer()},1300);

    }

    // 10% chans o få 1kr varje gång man klickar
    var random  = Math.random();
    if(random < 0.1) {
        money += 1;
    }
}

function paintComputer() {
    ctx.drawImage(computerImg, 730, 130, 480, 400);
}

function update() {
    ctx.clearRect(0, 0, game.width, game.height);
    paintComputer();

    // Information (DPS, DPC m.m)
    document.getElementById("dps").innerHTML = dmg[1];
    document.getElementById("clickcost").innerHTML = cost[0] + "$"; // ClickDPC Cost
    document.getElementById("dpscost1").innerHTML = cost[1] + "$"; // DPSCost1

    document.getElementById("clicklevel").innerHTML = level[0]; // ClickLevel

    document.getElementById("health").innerHTML = "HP: " + monsterHealth;
    document.getElementById("money").innerHTML = money + "$";
}

function dps() {
    if(monsterHealth > 0) {
        monsterHealth -= dmg[1];
    } else {
        mouseHandler();
    }
    if(dmg[1] > 0) {
        var random  = Math.random();
        if(random < 0.1) {
            money += 1;
        }
    }
}