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
            request('https://pokeapi.co/api/v2/pokemon-species/' + pokemonID, (err, r) => {
                if (r.statusCode == '200') {
                    let childBody = JSON.parse(r.body);
                    childBody.flavor_text_entries.some(flavour => {
                        if (flavour.language.name === 'en') {
                            pokemonDescription = flavour.flavor_text
                        }
                    })
                    request.post({ url: 'https://api.funtranslations.com/translate/shakespeare.json', form: { text: pokemonDescription } }, function (err, httpResponse, body) {
                        let translate = JSON.parse(body);
                        if (translate.contents) {
                            res.json({ name: pokemonName, description: translate.contents.translated })
                        }
                        else {

                            res.json({ name: pokemonName, desciption: translate })
                        }
                    })

                }
                else {
                    res.json({ Error: "Error while sending request!" })
                }
            })
        } else {
            res.json({ Error: "Error while sending request!" })
        }
    });
});


module.exports = router;