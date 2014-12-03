if(localStorage.getItem("stageLevel") === null) {
    localStorage.setItem("stageLevel", 1);
    localStorage.setItem("monsterHealth", 10);
    localStorage.setItem("healthChanger", 10);
}

// Basik varibler
var game,
    ctx,
    temp = 1;
// Spel variabler
var monsterHealth = localStorage.getItem("monsterHealth"), healthChanger = localStorage.getItem("healthChanger"),
    dmg = [1, 0], // Index 0 = DPC, Index 1 = DPS.
    money = [0, 10, 1], // Index 0 = Money balance, Index 1 = antal pengar per level, Index 2 = Pengar per klick.
    cost = [80, 25, 35, 15], // index 0 = clickDMG, Index 1 = dpsUpgrade1, Index 2 = dpsUpgrade2,  Index 3 = moneyUpgrade.
    level = [0, 0, 0, 0], // Index 0 = clickLevel, Index 1 = DPSLevel, Index 2 = DPS2Level.
    stageLevel = localStorage.getItem("stageLevel");
rare = 0;

if(localStorage.getItem("dmg") === null) {
    localStorage.setItem("dmg", JSON.stringify(dmg));
    localStorage.setItem("money", JSON.stringify(money));
    localStorage.setItem("cost", JSON.stringify(cost));
    localStorage.setItem("level", JSON.stringify(level));
}

temp = localStorage.getItem("dmg");
dmg = JSON.parse(temp);
temp = localStorage.getItem("money");
money = JSON.parse(temp);
temp = localStorage.getItem("cost");
cost = JSON.parse(temp);
temp = localStorage.getItem("level");
level = JSON.parse(temp);

// Bild variabler
var computerImg;

function start() {
    game = document.getElementById('game');
    ctx = game.getContext('2d');


    computerImg = document.getElementById('computer');

    window.setInterval(update, 25);
    window.setInterval(dps, 100);
}

function paintComputer() {
    ctx.drawImage(computerImg, 730, 130, 480, 400);
}

function timer() {
    computerImg = document.getElementById('computer');
}

function exit() {
    document.getElementById('damage').innerHTML = " ";
}

function reset() {
    var startover = confirm("Are you sure you want to start over?");
    if(startover) {
        monsterHealth = 10, healthChanger = 10,
        dmg = [1, 0]; // Index 0 = DPC, Index 1 = DPS.
        money = [0, 10, 1]; // Index 0 = Money balance, Index 1 = antal pengar per level, Index 2 = Pengar per klick.
        cost = [80, 25, 35, 15]; // index 0 = clickDMG, Index 1 = dpsUpgrade1, Index 2 = dpsUpgrade2,  Index 3 = moneyUpgrade.
        level = [0, 0, 0, 0]; // Index 0 = clickLevel, Index 1 = DPSLevel, Index 2 = DPS2Level.
        stageLevel = 1;
    }
}


/////////////////////////////////////// POWER UPS ////////////////////////

function clickdmg() { // Cost index 0
    if(stageLevel >= 5) {
        if(money[0] >= cost[0]) {
            dmg[0] = dmg[0] + 35;
            money[0] -= cost[0];
            cost[0] += 20;
            level[0]++;
        }
    }
}

function dpsUpgrade1() {
    if(stageLevel >= 5) {
        if(money[0] >= cost[1]) {
            dmg[1] = dmg[1] + 20; // Lägger till 3 dps.
            money[0] -= cost[1]; // Tar betalt
            cost[1] += 5; // Nytt pris
            level[1]++; // Ökar leveln.
        }
    }
}

function dpsUpgrade2() {
    if(stageLevel >= 5) {
        if(money[0] >= cost[2]) {
            dmg[1] = dmg[1] + 50;
            money[0] -= cost[2];
            cost[2] += 10;
            level[2]++;
        }
    }
}

function moneyUpgrade() {
    if(stageLevel >= 5) {
        if(money[0] >= cost[3]) {
            money[2] = money[2] + 3; // Lägger till 3 MPC.
            money[0] -= cost[3]; // Tar betalt
            cost[3] += 50; // Nytt Pris
            level[3]++; // Ökar leveln.
        }
    }
}

//////////////////////////////////////////////////////////////////////////

function mouseHandler() {

    var random  = Math.random();
    if(monsterHealth > 0 && random < 0.1) { // CRIT (10% chans)
        monsterHealth -= (dmg[0] * 2);
        document.getElementById('damage').innerHTML = (dmg[0] * 2);
        setTimeout(function(){exit()}, 400);
    } else if(monsterHealth > 0) { // Vanlig dmg
        monsterHealth -= dmg[0];
        document.getElementById('damage').innerHTML = dmg[0];
        setTimeout(function(){exit()}, 400);
    }

    if(monsterHealth <= 0 && rare === 0) {
        if(random < 0.05) { // 5% chans o få rare.
            rare = 1;
            money[0] += money[1];
            money[1] = money[1] + 10; // Ändrar antal pengar man får per level.
            monsterHealth = healthChanger*5;
            alert("RARE");
            computerImg = document.getElementById('rare');
        } else {
            money[0] += money[1];
            money[1] = money[1] + 10;
            monsterHealth = healthChanger*3;
            healthChanger = monsterHealth;

            computerImg = document.getElementById('computerCrashed');
            setTimeout(function(){timer()}, 1300);
        }

        stageLevel++;
    }

    if(monsterHealth <= 0 && rare === 1) { // RARE DÖD
        money[0] += money[1] + 500;
        monsterHealth = healthChanger*3;
        rare = 0;
        computerImg = document.getElementById('rareCrashed');
        setTimeout(function(){timer()}, 1300);
    } 



    // 10% chans o få 1kr varje gång man klickar
    if(random < 0.1) {
        money[0] += money[2]; // Ger pengar (klick pengar)
    }
}

function update() {
    ctx.clearRect(0, 0, game.width, game.height);
    paintComputer();

    // Öppen eller stängd butik
    if(stageLevel >= 5) {
        document.getElementById('clickcost').style.opacity = '1';
        document.getElementById('dpscost1').style.opacity = '1';
        document.getElementById('dpscost2').style.opacity = '1';
        document.getElementById('moneycost').style.opacity = '1';
        document.getElementById('clicklevel').style.opacity = '1';
        document.getElementById('dps1level').style.opacity = '1';
        document.getElementById('dps2level').style.opacity = '1';
        document.getElementById('moneylevel').style.opacity = '1';
        document.getElementById('money').style.opacity = '1';
        document.getElementById('dps').style.opacity = '1';
        document.getElementById('store').style.backgroundImage = "url('images/shop.jpg')";
    } else {
        document.getElementById('store').style.backgroundImage = "url('images/shopclosed.jpg')";
        document.getElementById('clickcost').style.opacity = '0.18';
        document.getElementById('dpscost1').style.opacity = '0.18';
        document.getElementById('dpscost2').style.opacity = '0.18';
        document.getElementById('moneycost').style.opacity = '0.18';
        document.getElementById('clicklevel').style.opacity = '0.18';
        document.getElementById('dps1level').style.opacity = '0.18';
        document.getElementById('dps2level').style.opacity = '0.18';
        document.getElementById('moneylevel').style.opacity = '0.18';
        document.getElementById('money').style.opacity = '0.18';
        document.getElementById('dps').style.opacity = '0.18';
    }

    // SPARA

    localStorage.setItem("stageLevel", stageLevel);
    localStorage.setItem("monsterHealth", monsterHealth);
    localStorage.setItem("healthChanger", healthChanger);
    localStorage.setItem("dmg", JSON.stringify(dmg));
    localStorage.setItem("money", JSON.stringify(money));
    localStorage.setItem("cost", JSON.stringify(cost));
    localStorage.setItem("level", JSON.stringify(level));

    // Information (DPS, DPC m.m)
    document.getElementById('dps').innerHTML = dmg[1]; // DPS
    document.getElementById('clickcost').innerHTML = cost[0] + '$'; // ClickDPC Cost
    document.getElementById('dpscost1').innerHTML = cost[1] + '$'; // DPSCost1
    document.getElementById('dpscost2').innerHTML = cost[2] + '$'; // dps2 cost;
    document.getElementById('moneycost').innerHTML = cost[3] + '$'; // MoneyUpgrade cost

    document.getElementById('clicklevel').innerHTML = level[0]; // ClickLevel
    document.getElementById('dps1level').innerHTML = level[1]; // dps1 Level.
    document.getElementById('dps2level').innerHTML = level[2]; // dps2 Level.
    document.getElementById('moneylevel').innerHTML = level[3]; // money Level.

    if(monsterHealth < 100000) {
        document.getElementById('health').innerHTML = 'HP: ' + monsterHealth;
    } else {
        document.getElementById('health').innerHTML = 'HP: ' + Math.round((monsterHealth / 1000)) + "k"
    }

    document.getElementById('money').innerHTML = money[0] + '$';
    document.getElementById('stageLevel').innerHTML = 'Stage: ' + stageLevel;
}

function dps() {
    if((monsterHealth - dmg[1]) <= 0) {
        monsterHealth = 0;
        mouseHandler();

    } else if(monsterHealth > 0) {
        monsterHealth -= (dmg[1]) / 10;

    }
    if(dmg[1] > 0) {
        var random  = Math.random();
        if(random < 0.05) {
            money[0] += money[2]; // Ger pengar (klick pengar)
        }
    }
}