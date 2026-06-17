addLayer("t", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,    
        points: new Decimal(0),                 // You can add more variables here to add them to your layer.            // "points" is the internal name for the main resource of the layer.
    }},

    color: "#f10909",                       // The color for this layer, which affects many elements.   // The name of this layer's main prestige resource.
    row: 0,                                 // The row this layer is on (0 is the first row).

    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.


    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.

    getPoints() { return player.a.points 

    },          //this code might be useless

    resource: "Abstract", // Name of prestige currency

    upgrades: {
        11: {
            currencyDisplayName: "points",
            currencyInternalName: "points",
            title: "The First Upgrade",
            description: "Unlock your first buyable.",
            cost: new Decimal(1),
            
        },
        12: {
            currencyDisplayName: "points",
            currencyInternalName: "points",
            title: "Stronger Gains",
            description: "Multiply the gain of The First Buyable based on it's levels.",
            cost: new Decimal(100),
            effect() {
                let amt = getBuyableAmount(this.layer, 31)
                let NewEffect = amt.div(5).add(1)
                if (hasUpgrade("t", 24)) NewEffect = NewEffect.mul(2)
                return NewEffect

            },
            unlocked() {return hasUpgrade("t", 11)},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
   
        },
        13: {
            currencyDisplayName: "points",
            currencyInternalName: "points",
            title: "The Next One!",
            description: "Unlock your second buyable.",
            cost: new Decimal(500),
            unlocked() {return hasUpgrade("t", 12)},

        },
        14: {
            currencyDisplayName: "points",
            currencyInternalName: "points",
            title: "More Of The First One",
            description: "Increase the max level of The First Buyable by 10.",
            cost: new Decimal(3000),
            unlocked() {return hasUpgrade("t", 13)},

        },
        21: {
            currencyDisplayName: "points",
            currencyInternalName: "points",
            title: "An Early Boost In Case You Need It!",
            description: "Double Point gain.",
            cost: new Decimal(50),
            unlocked() {return hasUpgrade("a", 11)},

        },
        22: {
            currencyDisplayName: "points",
            currencyInternalName: "points",
            title: "Another One?",
            description: "Unlock your third buyable.",
            cost: new Decimal(1000),
            unlocked() {return hasUpgrade("t", 21)},
        },
        23: {
            currencyDisplayName: "points",
            currencyInternalName: "points",
            title: "Even More Of The First One",
            description: "Increase the max level of The First Buyable by 20.",
            cost: new Decimal(30000),
            unlocked() {return hasUpgrade("t", 22)},
        },
        24: {
            currencyDisplayName: "points",
            currencyInternalName: "points",
            title: "Remember This Row?",
            description: "'Stronger Gains' is twice as strong.",
            cost: new Decimal(1).mul(10).pow(10),
            unlocked() {return hasUpgrade("a", 31) && hasUpgrade("t", 23)},
        },
        31: {
            currencyDisplayName: "points",
            currencyInternalName: "points",
            title: "More Doublers",
            description: "Half the price of 'The Second Buyable'.",
            cost: new Decimal(1000000),
            unlocked() {return hasUpgrade("a", 21)},
        },
        32: {
            currencyDisplayName: "points",
            currencyInternalName: "points",
            title: "The Most Doublers",
            description: "Half the price of 'The Second Buyable'.",
            cost: new Decimal(1000000000),
            unlocked() {return hasUpgrade("t", 31)},
            
        },
        33: {
            currencyDisplayName: "points",
            currencyInternalName: "points",
            title: "Everything Is Expensive Now!",
            description: "Half the price of 'The First Buyable'.",
            cost: new Decimal(10).pow(10).mul(1),
            unlocked() {return hasUpgrade("a", 31) && hasUpgrade("t", 32)},
            
        },
        34: {
            currencyDisplayName: "points",
            currencyInternalName: "points",
            title: "And Now, There's Nothing Left To Buy...",
            description: "Double Abstract Gain.",
            cost: new Decimal(10).pow(11).mul(3),
            unlocked() {return hasUpgrade("t", 33)},
            
        },
        41: {
            currencyDisplayName: "points",
            currencyInternalName: "points",
            title: "Abstract",
            description: "Allows you to Abstract; resetting your points, but gaining a new currency.",
            cost: new Decimal(7500),
            effect() {return player.a.unlockedOnce; true},
            unlocked() {return hasUpgrade("t", 14)},

        },
        42: {
            currencyDisplayName: "points",
            currencyInternalName: "points",
            title: "Didn't Think There'd Be An Upgrade Here?",
            description: "Double Point gain, as a treat.",
            cost: new Decimal(100000000),
            unlocked() {return hasUpgrade("a", 31) && hasUpgrade("t", 41)},

        },
        43: {
            currencyDisplayName: "points",
            currencyInternalName: "points",
            title: "There's STILL More?",
            description: "Increase the max level of 'The Third Buyable' by five.",
            cost: new Decimal(1000000000),
            unlocked() {return hasUpgrade("a", 31) && hasUpgrade("t", 42)},

        },
        44: {
            currencyDisplayName: "points",
            currencyInternalName: "points",
            title: "I Think This Is The Last One...",
            description: "Double Vitality Gain, if you have Vitality.",
            cost: new Decimal(10000000000),
            unlocked() {return hasUpgrade("a", 31) && hasUpgrade("t", 43)},

        },
    },

    buyables: {
        31: {
            currencyDisplayName: "points",
            currencyInternalName: "points",
            cost(x) { 
                let price = new Decimal(10).mul(1.75).mul(x).mul(x).add(10)
                if (getBuyableAmount(this.layer, this.id).gte(40)) price = price.mul(x)
                if (getBuyableAmount(this.layer, this.id).gte(60)) price = price.mul(x)
                if (getBuyableAmount(this.layer, this.id).gte(90)) price = price.mul(10)
                if (hasUpgrade("t", 33)) price = price.div(2)
                return price
            },
            
            purchaseLimit() {
            let Limit = new Decimal(10)
            if (hasUpgrade("t", 14)) Limit = Limit.add(10)
            if (hasUpgrade("t", 23)) Limit = Limit.add(20)
            if (hasUpgrade("a", 22)) Limit = Limit.add(20)
            Limit = Limit.add(buyableEffect('v', 12))
            return Limit

            },
            
            

            display() {
            const amt = getBuyableAmount(this.layer, this.id);
            const pl = this.purchaseLimit()
            return `Increase Point Gain by 1x each level.\n
                        Level: ${amt}/${pl}\n
                        Cost: ${format(this.cost(amt))} Points\n
                        Currently: x${format(this.effect(amt))}`;
            },
            canAfford() { return player.points.gte(this.cost()) },
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let BuyableMult = new Decimal(1).add(x)
                if (hasUpgrade('t', 12)) BuyableMult = BuyableMult.mul(upgradeEffect('t', 12))
                return (BuyableMult)},
            unlocked() {return hasUpgrade("t", 11)},
            title: "The First Buyable",

                
                
            },
        32: {
            currencyDisplayName: "points",
            currencyInternalName: "points",
            cost(x) { 
                let price = new Decimal(25).mul(2).mul(x + 2).mul(x + 1).mul(x).add(300)
                if (getBuyableAmount(this.layer, this.id).gte(3)) price = price.mul(x)
                if (getBuyableAmount(this.layer, this.id).gte(5)) price = price.mul(x).mul(x)
                if (getBuyableAmount(this.layer, this.id).gte(7)) price = price.mul(x).mul(2)
                if (getBuyableAmount(this.layer, this.id).gte(9)) price = price.mul(5)
                if (hasUpgrade("t", 31)) price = price.div(2)
                if (hasUpgrade("t", 32)) price = price.div(2)
                return price
            
            
            },
            purchaseLimit() {
                let limit = new Decimal(10)
                return limit
            },
            display() {
            const amt = getBuyableAmount(this.layer, this.id);
            const pl = this.purchaseLimit()
            return `Double point gain each level.\n
                        Level: ${amt}/${pl}\n
                        Cost: ${format(this.cost(amt))} Points\n
                        Currently: x${format(this.effect(amt))}`;
            },
            canAfford() { return player.points.gte(this.cost()) },
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let BuyableMult = new Decimal(2)
                return Decimal.pow(BuyableMult, x)},
            unlocked() {return hasUpgrade("t", 13)},
            title: "The Second Buyable",

                
                
            },     
        33: {
            currencyDisplayName: "points",
            currencyInternalName: "points",
            cost(x) { 
                
                let price = new Decimal(300).mul(2.25).mul(x + 3).mul(x + 2).mul(x).add(750)
                if (getBuyableAmount(this.layer, this.id).gte(5)) price = price.mul(x)
                return price
            },
            
            purchaseLimit() {
                let Limit = new Decimal(10)
                if (hasUpgrade("t", 43)) Limit = Limit.add(5)
                return Limit
            },
            
            

            display() {
            const amt = getBuyableAmount(this.layer, this.id);
            const pl = this.purchaseLimit()
            return `Increase Abstract Gain by 1x each level.\n
                        Level: ${amt}/${pl}\n
                        Cost: ${format(this.cost(amt))} Points\n
                        Currently: x${format(this.effect(amt))}`;
            },
            canAfford() { return player.points.gte(this.cost()) },
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let BuyableMult = new Decimal(1).add(x)
                return (BuyableMult)},
            unlocked() {return hasUpgrade("t", 22)},
            title: "The Third Buyable",

        },
    },   
})



addLayer("a", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer 
        unlockedOnce: false,
        points: new Decimal(0), 
    }},

    color: "#4f20d1",                       // The color for this layer, which affects many elements.
    resource: "Abstract",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).

    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(10000),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    update(diff) {
    if (hasUpgrade("t", 41)) player.a.unlockedOnce = true
    },
    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5, 
    
                 // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        
        let aGain = new Decimal(1)             
        aGain = aGain.mul(buyableEffect('t', 33))      
        if(hasUpgrade("v", 16)) aGain = aGain.mul(2)
        if(hasUpgrade("t", 34)) aGain = aGain.mul(2)                                     // Returns the exponent to your gain of the prestige resource.
        return aGain                                               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {   
        return new Decimal(1)

    },

    layerShown() { return player.a.unlockedOnce},          // Returns a bool for if this layer's node should be visible in the tree.

    upgrades: {
        11: {
            title: "More Upgrades!",
            description: "Unlock more Point upgrades.",
            cost: new Decimal(1),
            unlocked: true
        },
        12: {
            title: "A Simple Upgrade",
            description: "Triple your point gain.",
            cost: new Decimal(25),
            
        },
        13: {
            title: "Finally, Something To Get Excited About!",
            description: "Increases point gain based on Abstract.",
            cost: new Decimal(10),
            effect() {
                return player[this.layer].points.add(1).pow(0.25)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            
        },
        21: {
            title: "Even More Upgrades!",
            description: "Unlock even more Point upgrades.",
            cost: new Decimal(1000),
            unlocked() {return hasUpgrade("a", 11)},
            
        },
        22: {
            title: "A Simple Upgrade, For The Late Game",
            description: "Increase the max level of The First Buyable by +20.",
            cost: new Decimal(80),
            unlocked() {return hasUpgrade("a", 12)},
            
        },
        23: {
            title: "Something To Get Really Excited About",
            description: "Unlock Vitality.",
            cost: new Decimal(200),
            unlocked() {return hasUpgrade("a", 13)},
            
            
        },
        31: {
            title: "A Few More Upgrades Couldn't hurt...",
            description: "Unlock a few more upgrades.",
            cost: new Decimal(10000),
            unlocked() {return hasUpgrade("a", 21)},
            
        },
        32: {
            title: "All For Not",
            description: "Unlock the next prestige layer.",
            cost: new Decimal(1500000),
            unlocked() {return hasUpgrade("a", 22)},
            //NOT IMPLEMENTED
            
        },

        33: {
            title: "Try To Stay Excited",
            description: "Increase the max level of 'More Vitality' by 30.",
            cost: new Decimal(60000),
            unlocked() {return hasUpgrade("a", 23)},
            
            
        },
    },
})

addLayer("v", {
    startData() { return {    
        unlocked: true,              // startData is a function that returns default data for a layer. 
        points: new Decimal(0),      
        maxV: new Decimal(10)
    }},

    color: "#580a0a",                       // The color for this layer, which affects many elements.   // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).

    type: "none", 
    resource: "Vitality",

    layerShown(){return hasUpgrade("a", 23)},

    tabFormat: [
        "main-display",
        ["bar", "bigBar"],
        "blank",
        "buyables",
        "blank",
        "upgrades"
    ],




    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
    let vGain = new Decimal(1)  
    if (hasUpgrade("t", 44)) vGain = vGain.mul(2)
    return vGain
    },

    maxVGainMult() {
    let internalVMax = new Decimal(10)
    internalVMax = internalVMax.add(buyableEffect('v', 11))
    if (hasUpgrade("v", 12)) internalVMax = internalVMax.mul(upgradeEffect("v", 12))
    
    return internalVMax
    },

    
    gainExp() {
        return new Decimal(1)   
    },

    update(diff) {
    if (player.v.points.lt(player.v.maxV)) player.v.points = player.v.points.add(this.gainMult().mul(diff))
    if (player.v.points.gt(player.v.maxV)) player.v.points = player.v.maxV
    player.v.maxV = this.maxVGainMult()

    //add a bar for this
    },

bars: {
    bigBar: {
        direction: RIGHT,
        width: 925,
        height: 100,
        progress() {
            return player.v.points.min(player.v.maxV).div(player.v.maxV).toNumber()
        },
        display() {
            return `${format(player.v.points)}/${format(player.v.maxV)}`
        },
        fillStyle() {
            return { "background-color": "  #cc1d1d" }
        },

        borderStyle() {
            return { "border-color": "#500c15" }
        },
            
    },
    
},
//return player.v.points.div(player.v.maxV).mul(100)
//text() { return `Progress: ${format(player.v.points)}/${format(player.v.maxV)}`; },
    upgrades: {
        11: {
            title: "More Vitality...",
            description: "Unlock a new first Vitality buyable.",
            cost: new Decimal(10),
            
            //just make it +1x 
        },
        12: {
            title: "A Vital Upgrade",
            description: "Points increase Vitality Max.",
            cost: new Decimal(15),
            unlocked() {return hasUpgrade("v", 11)},
            effect() {
                return player.points.add(1).pow(0.01)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "A Point Upgrade",
            description: "Vitality increases Points.",
            cost: new Decimal(20),
            unlocked() {return hasUpgrade('v', '12')},
            effect() {
                return player.v.points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "A Good Use For Vitality",
            description: "Unlock your a new Vitality buyable.",
            cost: new Decimal(25),
            unlocked() {return hasUpgrade('v', '13')},
        },
        15: {
            title: "Another Good Use For Vitality!",
            description: "Double Point gain.",
            cost: new Decimal(40),
            unlocked() {return hasUpgrade('v', '14')},
        },
        16: {
            title: "A Third Good Use For Vitality",
            description: "Double Abstract gain.",
            cost: new Decimal(50),
            unlocked() {return hasUpgrade('v', '15')},
        },
        17: {
            title: "The Best Use For Vitality",
            description: "Unlock a new Vitality buyable.",
            cost: new Decimal(60),
            unlocked() {return hasUpgrade('v', '16')},
        },
        21: {
            title: "Stronger, Better...",
            description: "Unlock a new prestige layer.",
            cost: new Decimal(100),
            unlocked() {return hasUpgrade('v', '17')},
            //not implemented yet
        },

    },


    buyables: {
        11: {
            currencyDisplayName: "Vitality",
            currencyInternalName: "Vitality",
            

            cost(x) { 
                let price = new Decimal(x).add(10)
                
                return price
            },
            
            purchaseLimit() {
            let Limit = new Decimal(30)
            if (hasUpgrade("a", 33)) Limit = Limit.add(30)
            return Limit

            },
            
            

            display() {
            const amt = getBuyableAmount(this.layer, this.id);
            const pl = this.purchaseLimit()
            return `Increase Max Vitality by 1 each level.\n
                        Level: ${amt}/${pl}\n
                        Cost: ${format(this.cost(amt))} Vitality\n
                        Currently: +${format(this.effect(amt))}`;
            },
            canAfford() { return player.v.points.gte(this.cost()) },
            buy() {
                player.v.points = player.v.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                
                return x},
            unlocked() {return hasUpgrade("v", 11)},
            title: "More Vitality",

                
                
            },
        12: {
            currencyDisplayName: "Vitality",
            currencyInternalName: "Vitality",
            

            cost(x) { 
                let price = new Decimal(x).mul(5).add(30)
                if (getBuyableAmount(this.layer, this.id).gte(40)) price = price.mul(x)
                return price
            },
            
            purchaseLimit() {
            let Limit = new Decimal(4)
            return Limit

            },
            
            

            display() {
            const amt = getBuyableAmount(this.layer, this.id);
            const pl = this.purchaseLimit()
            return `Increase 'The First Buyable' max by 10 per level.\n
                        Level: ${amt}/${pl}\n
                        Cost: ${format(this.cost(amt))} Vitality\n
                        Currently: +${format(this.effect(amt))}`;
            },
            canAfford() { return player.v.points.gte(this.cost()) },
            buy() {
                player.v.points = player.v.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                
                return x.mul(10)},
            unlocked() {return hasUpgrade("v", 14)},
            title: "More Max",

                
                
            },
        13: {
            currencyDisplayName: "Vitality",
            currencyInternalName: "Vitality",
            

            cost(x) { 
                let price = new Decimal(50).add(x * 7).mul(1.25)
                if (getBuyableAmount(this.layer, this.id).gte(40)) price = price.mul(x)
                return price
            },
            
            purchaseLimit() {
            let Limit = new Decimal(100)
            return Limit

            },
            
            

            display() {
            const amt = getBuyableAmount(this.layer, this.id);
            const pl = this.purchaseLimit()
            return `Increase Point Gain by +1x each level.\n
                        Level: ${amt}/${pl}\n
                        Cost: ${format(this.cost(amt))} Vitality\n
                        Currently: x${format(this.effect(amt))}`;
            },
            canAfford() { return player.v.points.gte(this.cost()) },
            buy() {
                player.v.points = player.v.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                
                return x.add(1)},
            unlocked() {return hasUpgrade("v", 17)},
            title: "More Points",

                
                
            },
    }

})

//MAKE THE FIRST ONE DOESNT SAY 0 ABSTRACT ANYMORE AHAHAHHaa\
//autobuy the first buyable on next reset?