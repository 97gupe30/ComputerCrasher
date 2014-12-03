if(localStorage.getItem("stageLevel") === null) {
    localStorage.setItem("stageLevel", 1);
    localStorage.setItem("monsterHealth", 10);
    localStorage.setItem("healthChanger", 10);
    localStorage.setItem("rare", 0);
}

// Basik varibler
var game,
    ctx,
    temp = 1,
    picture,
    pictureCrashed;
// Spel variabler
var monsterHealth = localStorage.getItem("monsterHealth"), healthChanger = localStorage.getItem("healthChanger"),
    dmg = [1, 1], // Index 0 = DPC, Index 1 = DPS.
    money = [0, 10, 1], // Index 0 = Money balance, Index 1 = antal pengar per level, Index 2 = Pengar per klick.
    cost = [80, 25, 35, 15], // index 0 = clickDMG, Index 1 = dpsUpgrade1, Index 2 = dpsUpgrade2,  Index 3 = moneyUpgrade.
    level = [0, 0, 0, 0], // Index 0 = clickLevel, Index 1 = DPSLevel, Index 2 = DPS2Level.
    stageLevel = localStorage.getItem("stageLevel"),
    rare = localStorage.getItem("rare");

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


    computerImg = document.getElementById('computerlvl1');

    window.setInterval(update, 25);
    window.setInterval(dps, 100);
}

function paintComputer() {
    ctx.drawImage(computerImg, 730, 130, 480, 400);
}

function timer() {
    computerImg = picture;
}

function exit() {
    document.getElementById('damage').innerHTML = " ";
}

function reset() {
    var startover = confirm("Are you sure you want to start over?");
    if(startover) {
        monsterHealth = 10, healthChanger = 10,
        dmg = [1, 1]; // Index 0 = DPC, Index 1 = DPS.
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
            dmg[0] = dmg[0] * 1.7;
            money[0] -= cost[0];
            cost[0] = cost[0] * 1.5;
            level[0]++;
        }
    }
}

function dpsUpgrade1() {
    if(stageLevel >= 5) {
        if(money[0] >= cost[1]) {
            dmg[1] = dmg[1] * 1.3; // Lägger till 3 dps.
            money[0] -= cost[1]; // Tar betalt
            cost[1] = cost[1] * 1.3; // Nytt pris
            level[1]++; // Ökar leveln.
        }
    }
}

function dpsUpgrade2() {
    if(stageLevel >= 5) {
        if(money[0] >= cost[2]) {
            dmg[1] = dmg[1] * 1.5;
            money[0] -= cost[2];
            cost[2] = cost[2] * 1.2;
            level[2]++;
        }
    }
}

function moneyUpgrade() {
    if(stageLevel >= 5) {
        if(money[0] >= cost[3]) {
            money[2] = money[2] * 1.8; // Lägger till 3 MPC.
            money[0] -= cost[3]; // Tar betalt
            cost[3] = cost[3] * 2.2; // Nytt Pris
            level[3]++; // Ökar leveln.
        }
    }
}

//////////////////////////////////////////////////////////////////////////

function mouseHandler() {

    var random  = Math.random();
    if(monsterHealth > 0 && random < 0.1) { // CRIT (10% chans)
        monsterHealth -= (dmg[0] * 2);
        document.getElementById('damage').innerHTML = Math.round(dmg[0] * 2);
        setTimeout(function(){exit()}, 400);
    } else if(monsterHealth > 0) { // Vanlig dmg
        monsterHealth -= dmg[0];
        document.getElementById('damage').innerHTML = Math.round(dmg[0]);
        setTimeout(function(){exit()}, 400);
    }

    if(monsterHealth <= 0 && rare == 0) {
        if(random < 0.05) { // 5% chans o få rare.
            rare = 1;
            money[0] += money[1];
            money[1] = money[1] * 1.8; // Ändrar antal pengar man får per level.
            monsterHealth = healthChanger*5;
            alert("RARE");
            computerImg = document.getElementById('rare');
        } else {
            money[0] += money[1];
            money[1] = money[1] + 1.8;
            monsterHealth = healthChanger*3;
            healthChanger = monsterHealth;

            computerImg = pictureCrashed;
            setTimeout(function(){timer()}, 1300);
        }

        stageLevel++;
    }

    if(monsterHealth <= 0 && rare == 1) { // RARE DÖD
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
    
    // Ändrar bilder (datorn).
    if(stageLevel < 5) {
        picture = document.getElementById('computerlvl1');
        pictureCrashed = document.getElementById('computerlvl1Crashed');
    } else if(stageLevel < 10) {
        picture = document.getElementById('computer');
        pictureCrashed = document.getElementById('computerCrashed');
    } else {
        picture = document.getElementById('computer');
        pictureCrashed = document.getElementById('computerCrashed');
    }

    
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
    document.getElementById('clickcost').innerHTML = Math.round(cost[0]) + '$'; // ClickDPC Cost
    document.getElementById('dpscost1').innerHTML = Math.round(cost[1]) + '$'; // DPSCost1
    document.getElementById('dpscost2').innerHTML = Math.round(cost[2]) + '$'; // dps2 cost;
    document.getElementById('moneycost').innerHTML = Math.round(cost[3]) + '$'; // MoneyUpgrade cost

    document.getElementById('clicklevel').innerHTML = level[0]; // ClickLevel
    document.getElementById('dps1level').innerHTML = level[1]; // dps1 Level.
    document.getElementById('dps2level').innerHTML = level[2]; // dps2 Level.
    document.getElementById('moneylevel').innerHTML = level[3]; // money Level.

    
    if(monsterHealth < 100000) {
        document.getElementById('health').innerHTML = 'HP: ' + Math.round(monsterHealth);
    } else if(monsterHealth < 10000000) {
        document.getElementById('health').innerHTML = 'HP: ' + Math.round((monsterHealth / 1000)) + "k"
    } else if(monsterHealth < 1000000000) {
        document.getElementById('health').innerHTML = 'HP: ' + Math.round((monsterHealth / 1000000)) + "M"
    } else {
        document.getElementById('health').innerHTML = 'HP: ' + Math.round((monsterHealth / 1000000000)) + "G"
    }
        
    if(dmg[1] < 10000) {
        document.getElementById('dps').innerHTML = Math.round(dmg[1]); // DPS
    } else if(dmg[1] < 10000000) {
        document.getElementById('dps').innerHTML = Math.round((dmg[1] / 100)) / 10 + "k";
    } else if(dmg[1] < 1000000000) {
        document.getElementById('dps').innerHTML = Math.round((dmg[1] / 100000)) / 10 + "M";
    }

    document.getElementById('money').innerHTML = Math.round(money[0]) + '$';
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