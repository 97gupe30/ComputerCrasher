// Basik varibler
var game,
    ctx;

// Spel variabler
var monsterHealth = 10, healthChanger = 10,
    dmg = [1, 0], // Index 0 = DPC, Index 1 = DPS.
    money = [0, 10, 1], // Index 0 = Money balance, Index 1 = antal pengar per level, Index 2 = Pengar per klick.
    cost = [20, 25, 35, 15], // index 0 = clickDMG, Index 1 = dpsUpgrade1, Index 2 = dpsUpgrade2,  Index 3 = moneyUpgrade.
    level = [0, 0, 0, 0]; // Index 0 = clickLevel, Index 1 = DPSLevel, Index 2 = DPS2Level.
// Bild variabler
var computerImg;

function start() {
    game = document.getElementById('game');
    ctx = game.getContext('2d');
    
    computerImg = document.getElementById('computer');
    
    window.setInterval(update, 25);
    window.setInterval(dps, 1000);
}

/////////////////////////////////////// POWER UPS ////////////////////////

function clickdmg() { // Cost index 0
    if(money[0] >= cost[0]) {
        dmg[0] = dmg[0] * 2;
        money[0] -= cost[0];
        cost[0] += 45;
        level[0]++;
    }
}

function dpsUpgrade1() {
    if(money[0] >= cost[1]) {
        dmg[1] = dmg[1] + 1; // Lägger till 1 dps.
        money[0] -= cost[1]; // Tar betalt
        cost[1] += 5; // Nytt pris
        level[1]++; // Ökar leveln.
    }
}

function dpsUpgrade2() {
    if(money[0] >= cost[2]) {
        dmg[1] = dmg[1] + 5;
        money[0] -= cost[2];
        cost[2] += 10;
        level[2]++;
    }
}

function moneyUpgrade() {
    if(money[0] >= cost[3]) {
        money[2] = money[2] + 3; // Lägger till 3 MPC.
        money[0] -= cost[3]; // Tar betalt
        cost[3] += 50; // Nytt Pris
        level[3]++; // Ökar leveln.
    }
}

//////////////////////////////////////////////////////////////////////////

function timer() {
    computerImg = document.getElementById('computer');
}

function mouseHandler() {
    
    var random  = Math.random();
    if(monsterHealth > 0 && random < 0.03) { // CRIT (3% chans)
        monsterHealth -= dmg[0] + 10;
        
    } else if(monsterHealth > 0) { // Vanlig dmg
        monsterHealth -= dmg[0];
    }

    if(monsterHealth <= 0) {
        // Pengar och resetar hp:et till det gamla * 2
        money[0] += money[1];
        money[1] = money[1] + 10; // Ändrar antal pengar man får per level.
        monsterHealth = healthChanger*3;
        healthChanger = monsterHealth;

        // Ändrar bild till död bilden
        computerImg = document.getElementById('computerCrashed');
        setTimeout(function(){timer()}, 1300);

    }

    // 10% chans o få 1kr varje gång man klickar
    if(random < 0.1) {
        money[0] += money[2]; // Ger pengar (klick pengar)
    }
}

function paintComputer() {
    ctx.drawImage(computerImg, 730, 130, 480, 400);
}

function update() {
    ctx.clearRect(0, 0, game.width, game.height);
    paintComputer();

    // Information (DPS, DPC m.m)
    document.getElementById('dps').innerHTML = dmg[1];
    document.getElementById('clickcost').innerHTML = cost[0] + '$'; // ClickDPC Cost
    document.getElementById('dpscost1').innerHTML = cost[1] + '$'; // DPSCost1
    document.getElementById('dpscost2').innerHTML = cost[2] + '$'; // dps2 cost;
    document.getElementById('moneycost').innerHTML = cost[3] + '$'; // MoneyUpgrade cost

    document.getElementById('clicklevel').innerHTML = level[0]; // ClickLevel
    document.getElementById('dps1level').innerHTML = level[1]; // dps1 Level.
    document.getElementById('dps2level').innerHTML = level[2]; // dps2 Level.
    document.getElementById('moneylevel').innerHTML = level[3]; // money Level.
    
    document.getElementById('health').innerHTML = 'HP: ' + monsterHealth;
    document.getElementById('money').innerHTML = money[0] + '$';
}

function dps() {
    if((monsterHealth - dmg[1]) <= 0) {
        monsterHealth = 0;
        mouseHandler();
        
    } else if(monsterHealth > 0) {
        monsterHealth -= dmg[1];
        
    }
    if(dmg[1] > 0) {
        var random  = Math.random();
        if(random < 0.1) {
            money[0] += money[2]; // Ger pengar (klick pengar)
        }
    }
}