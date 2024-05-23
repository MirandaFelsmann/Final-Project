import express from 'express';
import * as auth from '../controllers/authController.js';
import * as game from '../controllers/gameController.js';
import Nation from '../models/Nation.js';

const router = express.Router();

router.get('/login', auth.login);
router.post('/login', auth.verifyLogin);
router.get('/register', auth.register);
router.post('/register', auth.verifyRegister);
router.get('/logout', auth.logout);

router.get('/changePassword', auth.changePassword);
router.post('/updatePassword', auth.updatePassword);

router.get('/', auth.isAuthenticated, game.home);
router.get('/startGame', game.start);
router.post('/combatants', game.combatants);
//router.get('/about', game.about);
router.get('/profile', game.profile);

router.get('/country-details/:name', async (req, res) => {
    try {
        const nationName = req.params.name;
        
//        console.log(nationName);
        
        // Using findOne instead of find
        const nation = await Nation.findOne({ name: nationName });
//        console.log(nation.moral);
//        console.log(nation.originalStats);
        
        if (nation) {
            if (req.headers['hx-request']) {
                
//                res.send(`<p>${nation.total}</p>`);
                res.send(`<img id="img" style="border: 1px solid grey" src="images/${nation.name}.png">
                          <div id="textInfo">
                                <h2>${nation.name}</h2>
                                <p id="description1" style="font-family: Kumbh Sans; text-align: justify">${nation.description}</p>
                                <div id="stats1">
                                    <p style="text-align: center">${nation.originalStats.army}<br><span style="font-family: Kumbh Sans">army</span></p>
                                    <p style="text-align: center">${nation.originalStats.navy}<br><span style="font-family: Kumbh Sans">navy</span></p>
                                    <p style="text-align: center">${nation.originalStats.moral}<br><span style="font-family: Kumbh Sans">moral</span></p>
                                </div>
                                <div id="stats2">
                                    <p style="text-align: center">${nation.originalStats.army}<br><span style="font-family: Kumbh Sans">army</span></p>
                                    <p style="text-align: center">${nation.originalStats.navy}<br><span style="font-family: Kumbh Sans">navy</span></p>
                                    <p style="text-align: center">${nation.originalStats.moral}<br><span style="font-family: Kumbh Sans">moral</span></p>
                                </div>
                            </div>`);
            } else {
                console.log('hello');
                res.render('countryDetailsPage', { nation });
            }
        } else {
            res.status(404).send('Nation not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/alliances', game.alliance);

//router.post('/results', game.results);
router.post('/submit', game.submit);

router.get('/api/getCountryData', async (req, res) => {
    try {
        const country1 = await Country.findOne({ name: 'Country1' });
        res.json(country1);
    } catch (error) {
        console.error('Failed to get country data', error);
        res.status(500).send('Internal server error');
    } 
});

router.post('/aftermath', game.aftermath);
router.post('/new-round', game.newRound);

router.post('/next', game.next)

router.get('/reset', game.reset)

router.get('/about', game.about);

router.get('/finishFake', game.finishFake)

//router.get('/login', game.loginFake)
//router.get('/register', game.registerFake)



export default router;
