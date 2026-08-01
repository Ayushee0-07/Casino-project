const express = require('express');
const bodyParser = require('body-parser');
// const functions = require('firebase-functions')
const cors = require('cors');
const path = require('path');
const passport = require('passport');

const {initializeServerSocket} = require('./controllers/WebsocketController');

require('dotenv').config();

const app = express();
// install middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

// install passport
app.use(passport.initialize());
require('./config/passport.config')(passport);

// routers

const gameRouter =  require('./routes/api/GameRouter');
const memberRouter = require('./routes/api/MemberRouter');
const tournamentRouter = require('./routes/api/TournamentRouter');


// database
const db = require("./models/Model");

const { initGames } = require('./core/Game');

db.sequelize.sync().then(() => {
    console.log("MYSQL Database synchronized");
    // initGames();
});
// install apis
app.use('/api/account',memberRouter);
app.use('/api/game',gameRouter);
app.use('/api/tournament', tournamentRouter);

// static folders

const assetFolder = path.resolve(__dirname,'./build/');
app.use('/uploads', express.static('uploads'));
app.use('/images', express.static('uploads/images'));
app.use(express.static(assetFolder));
app.use("*", express.static(assetFolder));

// run server
const port = process.env.PORT || 5602;
const server = app.listen(port,()=>{
     console.log(`🚀 Backend running on http://localhost:${port}`);
    initializeServerSocket(server);
});


