

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
    const { name, stats, allies } = countryData;
    
    const nation = await Nation.findOne({ name });
    
    if (!nation) {
        throw new Error("Nation not found");
    }
    
    console.log("name: " + name);
    console.log(stats);
    console.log(allies);
    let alliesCount;
    
    if (allies === undefined) {
        alliesCount = 0;
    }
    
    if (allies != undefined) {
        alliesCount = Object.keys(allies).length;
            for (let i = 0; i < alliesCount; i++) {
            console.log(allies[`Ally${i}`]);
        }
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
    
    
    

    // Find the nation by name
    
    
    var countryArmy = 0;
    var countryNavy = 0;
    
    nation.currAllies = nation.currAllies || [];

    // Refactored to use for...of for async operations
    
    
    nation.totalArmy = nation.army + countryArmy;
    nation.totalNavy = nation.navy + countryNavy;
    nation.totalTotal = nation.total + countryArmy + countryNavy;

    // Save the updated main nation
    await nation.save();
};

