// ========== Requiring all the packages ==========
const express = require('express'),
    bodyParser = require('body-parser'),
    port = process.env.port || 8080;

const app = express();


// ========== Middlewares Setting ==========
app.use(bodyParser.json());

// ========== Routes Configuration ==========
const PokemonRoutes = require('./routes/pokemonRoutes');
app.use('/api/pokemon', PokemonRoutes);

// ========== Listening the app at port ==========
app.listen(port, () => console.log(`Listeing at port : ${port}`));