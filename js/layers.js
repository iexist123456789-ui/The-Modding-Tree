addLayer("t", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.            // "points" is the internal name for the main resource of the layer.
    }},

    color: "#f10909",                       // The color for this layer, which affects many elements.   // The name of this layer's main prestige resource.
    row: 0,                                 // The row this layer is on (0 is the first row).
    startData() { return {
		points: new Decimal(0),
    }},
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
                const amt = getBuyableAmount(this.layer, 31)
                const NewEffect = amt.div(5).add(1)
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
            

        },
        22: {
            currencyDisplayName: "points",
            currencyInternalName: "points",
            title: "Another One?",
            description: "Unlock your third buyable.",
            cost: new Decimal(250),
            unlocked() {return hasUpgrade("t", 21)},
        },
        23: {
            currencyDisplayName: "points",
            currencyInternalName: "points",
            title: "",
            description: "",
            cost: new Decimal(30000),
            unlocked() {return hasUpgrade("t", 22)},
        },
        31: {
            currencyDisplayName: "points",
            currencyInternalName: "points",
            title: "Abstract",
            description: "Allows you to Abstract; resetting your points, but gaining a new currency.",
            cost: new Decimal(7500),
            effect() {return player.a.unlockedOnce; true},
            unlocked() {return hasUpgrade("t", 14)},

        },
    },

    buyables: {
        31: {
            currencyDisplayName: "points",
            currencyInternalName: "points",
            cost(x) { return new Decimal(10).mul(1.75).mul(x).mul(x).add(10)},
            
            purchaseLimit() {
            let Limit = new Decimal(10)
            if (hasUpgrade("t", 14)) Limit = Limit.add(10)
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
            cost(x) { return new Decimal(100).mul(2).mul(x + 2).mul(x + 1).mul(x).mul(x-1).add(100)},
            purchaseLimit: 10,
            display() {
            const amt = getBuyableAmount(this.layer, this.id);
            const pl = this.purchaseLimit
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
            cost(x) { return new Decimal(300).mul(2.25).mul(x + 3).mul(x + 2).mul(x + 1).mul(x).add(750)},
            
            purchaseLimit: 10,
            
            

            display() {
            const amt = getBuyableAmount(this.layer, this.id);
            const pl = this.purchaseLimit
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
    if (hasUpgrade("t", 31)) player.a.unlockedOnce = true
    },
    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5, 
    
                 // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        
        let aGain = new Decimal(1)             
        aGain = aGain.mul(buyableEffect('t', 33))                                       // Returns the exponent to your gain of the prestige resource.
        return aGain                                               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {   
        return new Decimal(1)

    },

    layerShown() { return player.a.unlockedOnce},          // Returns a bool for if this layer's node should be visible in the tree.

    upgrades: {
        11: {
            title: "A Whole New Layer",
            description: "Unlock more Point upgrades.",
            cost: new Decimal(1),
            unlocked: true
        },
    },
})



//MAKE THE FIRST ONE DOESNT SAY 0 ABSTRACT ANYMORE AHAHAHHaa