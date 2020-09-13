const express = require('express'),
    request = require('request');
router = express.Router();

// ========== Register Route ==========
router.get('/:_name', (req, res) => {

    let pokemonName = req.params._name;
    let pokemonDescription = '';

    request('https://pokeapi.co/api/v2/pokemon/' + pokemonName, (error, response) => {
        if (response.statusCode == '200') {
            let mainBody = JSON.parse(response.body)
            let pokemonID = mainBody.id;

        } else {
            res.json({ Error: "Error while sending request!" })
        }
    });
});


module.exports = router;