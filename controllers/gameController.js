import Nation from '../models/Nation.js';
import User from '../models/User.js';

export const home = async (req, res) => {
    res.render('index');
    const nation = await Nation.find();
} 

export const start = async (req, res) => {
    res.render('start');
}

export const combatants = async (req, res) => {
    let { option1, option2 } = req.body;
//    let countryIsLandlocked = 'no';
    if (Object.keys(req.body).length === 0) {
        option1 = 'Atweena';
        option2 = 'Nurovia';
    }
    try {
        const nations = await Nation.find({ name: { $in: [option1, option2] } });
const otherNations = await Nation.find({ name: { $nin: [option1, option2] }, total: { $ne: 0 } });
        for (let i = 0; i< otherNations.length; i++) {
            console.log(otherNations[i].name)
        }
        
        
        res.render('chooseParticipants', { option1, option2, countries: otherNations });
    } catch (error) {
        console.error("Error:", error);
    }
}

export const profile = async (req, res) => {
    const nations = await Nation.find();
    res.render('profile', { nations });
}

export const about = async (req, res) => {
    res.render('about');
}
export const alliance = async (req, res) => {
    try {
        const countries = Object.keys(req.body).filter(key => key !== 'option1' && key !== 'option2');

        // Assuming option1 and option2 are also present in the request body
        const { option1, option2 } = req.body;
        
        let countryIsLandlocked = 'no';
        const nations = await Nation.find({ name: { $in: [option1, option2] } });
        const isAnyLandlocked = nations.some(nation => nation.isLandlocked === true);
        if (isAnyLandlocked) {
            countryIsLandlocked = 'yes';
        } 

        const country1 = await Nation.findOne({ name: { $in: [option1] } });
        const country2 = await Nation.findOne({ name: { $in: [option2] } });

        // Creating an object to hold countries grouped by their chosen options
        const countriesByOption = {
            [option1]: [],
            [option2]: [],
            Neutral: []
        };

        // Iterating over each country to group them by their chosen options
        countries.forEach(country => {
            const selectedOption = req.body[country];
            if (selectedOption === option1) {
                countriesByOption[option1].push(country);
                country1.currAllies.push({country});
            } else if (selectedOption === option2) {
                countriesByOption[option2].push(country);
                country2.currAllies.push({country});
            } else {
                countriesByOption['Neutral'].push(country);
            }
        });
        await country1.save();
        await country2.save();
        
        const countriesInOption1 = await Nation.find({ name: { $in: countriesByOption[option1] } });
        const countriesInOption2 = await Nation.find({ name: { $in: countriesByOption[option2] } });        
        
        // Logging countries grouped by their chosen options
        res.render('alliances', { option1, country1, option2, country2, countries, countriesByOption, countryIsLandlocked, countriesInOption1, countriesInOption2 });
    } catch (error) {
        console.error("Error:", error);
    }
    
}


export const submit = async (req, res) => {
    try {
        await deleteAllies(req.body.country1);
        await deleteAllies(req.body.country2);
        
        await processCountry(req.body.country1);
        await processCountry(req.body.country2);

        
        const countryName1 = req.body.country1.name;
        const nation1 = await Nation.findOne({ name: { $in: [countryName1] } });
         
        const countryName2 = req.body.country2.name;
        const nation2 = await Nation.findOne({ name: { $in: [countryName2] } });        

//        res.status(200).json({ message: "Both nations updated successfully" });
        
        
        res.render('results', { nation1, nation2,
                               country1: req.body.country1.name, 
                               country2: req.body.country2.name, 
                               army1: nation1.totalArmy, 
                               navy1: nation1.totalNavy, 
                               total1: nation1.totalTotal, 
                               moral1: nation1.moral,
                               numAllies1: nation1.currAllies.length,
                               army2: nation2.totalArmy, 
                               navy2: nation2.totalNavy,
                               total2: nation2.totalTotal,
                               moral2: nation2.moral, 
                               numAllies2: nation2.currAllies.length })
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteAllies = async (countryData) => {
    const { name } = countryData;

    // Find the nation by name
    const nation = await Nation.findOne({ name });

    if (!nation) {
        throw new Error("Nation not found");
    }

    // Clear currAllies property
    nation.currAllies = [];
    
    // Save the updated nation
    await nation.save();
}

const processCountry = async (countryData) => {
    
    try {
        const { name, stats, allies } = countryData;

        const nation = await Nation.findOne({ name });

        if (!nation) {
            throw new Error("Nation not found");
        }

        console.log("name: " + name);
        console.log(stats);
        console.log(allies);

        let alliesCount;

        var countryArmy = 0;
        var countryNavy = 0;


        if (allies === undefined) {
            alliesCount = 0;
        }

        if (allies != undefined) {
            const alliesCount = Object.keys(allies).length;

            for (let i = 0; i < alliesCount; i++) {
                console.log(allies[`Ally${i}`]);
            }

            // Find the nation by name




            console.log(countryArmy);
            console.log("countryArmy");

            nation.currAllies = nation.currAllies || [];

            // Refactored to use for...of for async operations
            for (const allyKey of Object.keys(allies)) {
                const ally = allies[allyKey];
                const name = ally.name;
                console.log(".....");
                console.log(name);
                const allyInList = await Nation.findOne({ name: name })
                console.log("--")
                console.log(allyInList.army);
                console.log("--")

                nation.currAllies.push({
                    name: ally.name,
                    armyDonate: ally.army,
                    navyDonate: ally.navy,
                    inReturn: ally.reward,
                    army: allyInList.army,
                    navy: allyInList.navy,
                });

                countryArmy += parseInt(ally.army, 10);
                countryNavy += parseInt(ally.navy, 10);



                // Find the ally nation to update its army and navy
                const allyObject = await Nation.findOne({ name: ally.name });
                if (!allyObject) {
                    throw new Error(`Ally Nation ${ally.name} not found`);
                }

                allyObject.army -= parseInt(ally.army, 10);
                allyObject.navy -= parseInt(ally.navy, 10);
                allyObject.total = allyObject.total - parseInt(ally.army, 10) - parseInt(ally.navy, 10);

                console.log(allyObject.army);

                // Save the updated ally nation
                await allyObject.save();
            }
        }

        nation.totalArmy = nation.army + countryArmy;
        nation.totalNavy = nation.navy + countryNavy;
        nation.totalTotal = nation.total + countryArmy + countryNavy;

        // Save the updated main nation
        await nation.save();
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
        
};


export const aftermath = async (req, res) => {
    try {
        if (req.body.stalemate === "true") {
            res.render('stalemate', { country1: req.body.country1, country2: req.body.country2 })
        } else {
            const { country1, country2, winner, loser } = req.body;
            var armyEarned = 0;
            var navyEarned = 0;
            const losingNation = await Nation.findOne({ name: loser });
            const winningNation = await Nation.findOne({ name: winner });

            armyEarned = (losingNation.army) + Math.ceil((losingNation.totalArmy - losingNation.army)/5);
            navyEarned = (losingNation.navy) + Math.ceil((losingNation.totalNavy - losingNation.navy)/5);

            losingNation.army = 0;
            losingNation.navy = 0;
            losingNation.total = 0;
            losingNation.totalArmy = 0;
            losingNation.totalNavy = 0;
            losingNation.totalTotal = 0;


            const winAllies = [];
            const loseAllies = [];
            const neutCountries = [];
            const owePoints = [];
            
            var allNationsNotLose = await Nation.find({ total: { $ne: 0 } });
            var allNations = await Nation.find();
            allNationsNotLose = allNationsNotLose.filter(nation => nation.name !== losingNation.name);
            allNations = allNations.filter(nation => nation.name !== winningNation.name);
            allNations = allNations.filter(nation => nation.name !== losingNation.name);

            for (let i = 0; i < winningNation.currAllies.length; i++) {
                let winAllyName = winningNation.currAllies[i].name;
                if (winningNation.currAllies[i].inReturn === "military") {
                    owePoints.push(winAllyName);
                }
                let winAlly = await Nation.findOne({ name: winAllyName });
                winAllies.push(winAlly);
                allNations = allNations.filter(nation => nation.name !== winAllyName);
            }

            for (let x = 0; x < losingNation.currAllies.length; x++) {
                let loseAllyName = losingNation.currAllies[x].name;
                let loseAlly = await Nation.findOne({ name: loseAllyName });
                loseAllies.push(loseAlly);
                allNations = allNations.filter(nation => nation.name !== loseAllyName);
            }

            const numNations = allNations.length;

            await losingNation.save();
            res.render('aftermath', { winningNation, losingNation, armyEarned, navyEarned, winAllies, loseAllies, allNations, allNationsNotLose, owePoints });
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
};

export const newRound = async (req, res) => {
    try {
        if (req.body.origin === "win") {
            const winnerName = req.body.victor;
            const winner = await Nation.findOne({ name: winnerName });
            const nations = await Nation.find();

            const body = req.body;
        //    console.log(body.victor);
        //    console.log(body.armyLeft);
        //    console.log(body.navyLeft);
        //    console.log(body[`${winner.name}Army`]);
        //    console.log(body[`${winner.name}Navy`]);
        //    console.log(body[`${winner.name}Moral`]);
        //    console.log(body[`${winner.name}Total`]); 

            winner.army = body[`${winner.name}Army`];
            winner.navy = body[`${winner.name}Navy`];
            winner.moral = body[`${winner.name}Moral`];
            winner.total = body[`${winner.name}Total`];

            console.log(winner)

            await winner.save(); 

        //    console.log(body.armyLeft);
        //    console.log(body.armyLeft);
        //    console.log(body.armyLeft);
        //    


        //    console.log(winner.currAllies);
            for (let i = 0; i < winner.currAllies.length; i++) {
                const allyName = winner.currAllies[i].name;
                const allyArmyKey = allyName + "Army";
                const allyNavyKey = allyName + "Navy";
                const allyTotalKey = allyName + "Total";
                const allyArmyEarned = req.body[allyArmyKey];
                const allyNavyEarned = req.body[allyNavyKey];
                const allyTotalEarned = req.body[allyTotalKey];
        //        console.log(allyArmyEarned);
                const allyObj = await Nation.findOne({ name: allyName });

                console.log("allyObj name: ");
                console.log(allyObj.name);
                console.log("xxx");
                allyObj.army = parseInt(allyArmyEarned, 10);
                allyObj.navy = parseInt(allyNavyEarned, 10);
                allyObj.total = parseInt(allyTotalEarned, 10);
                await allyObj.save();
                console.log(allyObj);
                console.log("---")
            }

            for (let x = 0; x < nations.length; x++) {
                const nation = await Nation.findOne({ name: nations[x].name });
                console.log(nation);
                console.log(nation.name);
                nation.totalArmy = nation.army;
                nation.totalNavy = nation.navy;
                nation.totalTotal = nation.total;
                await nation.save();
                console.log(nation.army);
                console.log(nation.totalArmy);
                console.log(",,,,,,,,")
            } 

            const lostCountryName = req.body.LOST;
            const lostCountry = await Nation.findOne({ name: lostCountryName });
            lostCountry.moral = 0;
            await lostCountry.save();
            const refugeCountryName = req.body.refugeeAccept;
        //    console.log(refugeCountryName);
            const refugeCountry = await Nation.findOne({ name: refugeCountryName });
        //    console.log(refugeCountry);
            refugeCountry.moral += parseInt(req.body.moralValue)
            refugeCountry.total += parseInt(req.body.moralValue);
            refugeCountry.totalTotal += parseInt(req.body.moralValue);

            const topCountries = await Nation.find().sort({ total: -1 }).limit(2);
            const lowCountry = await Nation.find({ total: { $ne: 0 } }).sort({ total: 1 }).limit(1);
            await refugeCountry.save();
            console.log(refugeCountry)

            const stillIn = await Nation.find({ total: { $ne: 0 }});
            const eliminated = await Nation.find({ total: 0 }); 

            for(let i = 0; i < stillIn.length; i++) {
        //                console.log(stillIn[i].name);
        //                console.log(stillIn[i].total);
                    }
        //    console.log(stillIn.length);
        //    console.log("still in length");

            if (stillIn.length === 1) {
                console.log(stillIn);
                console.log(stillIn[0].army);

                const stillInStats = {
                    name: stillIn[0].name,
                    army: stillIn[0].army,
                    moral: stillIn[0].moral,
                    total: stillIn[0].total,
                }

                console.log(stillInStats); 

                res.render('finish', { stillIn, eliminated, stillInStats });
            } else {
                res.render('newround', { content: req.body, nations, winner, topCountries, lowCountry, stillIn, eliminated } );
            }
        } else {
            console.log("stalemate");
            const nations = await Nation.find();
            const topCountries = await Nation.find().sort({ total: -1 }).limit(2);
            const lowCountry = await Nation.find({ total: { $ne: 0 } }).sort({ total: 1 }).limit(1);
            const stillIn = await Nation.find({ total: { $ne: 0 }});
            const eliminated = await Nation.find({ total: 0 }); 
            if (stillIn.length === 1) {
                console.log(stillIn);
                console.log(stillIn[0].army);

                const stillInStats = {
                    name: stillIn[0].name,
                    army: stillIn[0].army,
                    moral: stillIn[0].moral,
                    total: stillIn[0].total,
                }

                console.log(stillInStats); 

                res.render('finish', { stillIn, eliminated, stillInStats });
            } else {
                res.render('newround', { nations, topCountries, lowCountry, stillIn, eliminated } );
            }

        }
    } catch (error) {
        console.error("Error:", error);
    }
    
    
    
    
//    const refugeCountry = await Nation.findOne({ name: req.body.refugeCountryName })
//    refugeCountry.moral = refugeCountry.moral + refug
    
}

export const next = async (req, res) => {
    console.log(req.body)
}

export const reset = async (req, res) => {
    try {
        const nations = await Nation.find();
        nations[0].army = 700;
        nations[0].navy = 600;
        nations[0].moral = 240;
        nations[0].total = 1540;
        nations[0].totalArmy = 700;
        nations[0].totalNavy = 600;
        nations[0].totalTotal = 1540;

        nations[1].army = 1000;
        nations[1].navy = 0;
        nations[1].moral = 240;
        nations[1].total = 1240;
        nations[1].totalArmy = 1000;
        nations[1].totalNavy = 0;
        nations[1].totalTotal = 1240;

        nations[2].army = 800;
        nations[2].navy = 700;
        nations[2].moral = 240;
        nations[2].total = 1740;
        nations[2].totalArmy = 800;
        nations[2].totalNavy = 700;
        nations[2].totalTotal = 1740;

        nations[3].army = 460;
        nations[3].navy = 400;
        nations[3].moral = 240;
        nations[3].total = 1100;
        nations[3].totalArmy = 460;
        nations[3].totalNavy = 400;
        nations[3].totalTotal = 1100;

        nations[4].army = 520;
        nations[4].navy = 400;
        nations[4].moral = 240;
        nations[4].total = 1160;
        nations[4].totalArmy = 520;
        nations[4].totalNavy = 400;
        nations[4].totalTotal = 1160;

        nations[5].army = 500;
        nations[5].navy = 1000;
        nations[5].moral = 240;
        nations[5].total = 1740;
        nations[5].totalArmy = 500;
        nations[5].totalNavy = 1000;
        nations[5].totalTotal = 1740;

        nations[6].army = 500;
        nations[6].navy = 500;
        nations[6].moral = 240;
        nations[6].total = 1240;
        nations[6].totalArmy = 500;
        nations[6].totalNavy = 500;
        nations[6].totalTotal = 1240;

        for (const nation of nations) {
            await nation.save();
        }    

        res.redirect('/');
    } catch (error) {
        console.error("Error:", error);
    }
    
}


export const finishFake = async (req, res) => {
    const stillIn = await Nation.find({ name: "Andros" });
    
    const stillInStats = {
        name: stillIn[0].name,
        army: stillIn[0].army,
        navy: stillIn[0].navy,
        moral: stillIn[0].moral,
        total: stillIn[0].total,
    }
        
    console.log(stillInStats);
    
    
    const eliminated = await Nation.find({ name: { $ne: stillIn.name } }); 
       
        res.render('finish', { stillIn, eliminated, stillInStats });
    }


export const loginFake = async (req, res) => {
    res.render('loginFake');
}


export const registerFake = async (req, res) => {
    res.render('registerFake');
}
