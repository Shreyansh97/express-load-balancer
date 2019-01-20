require('dotenv').config();

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const routes = require('./routes');
const response = require('./response-middleware');
const models = require('./models');

const app = express();

app.use(session({
  key: 'user_sid',
  resave: false,
  saveUninitialized: false,
  secret: 'session',
  cookie: {
    maxAge: 600000
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));

app.use(response);

//setting up the handlebars view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');

app.use('/',routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT,err=>{
  if(err)
    return console.error(err);
  console.log('Listening on port '+PORT);
});

models.sequelize.sync().then(
  ()=>{
    console.log('Models synced');
  },
  err=>{
    console.error('Models not synced');
  }
);
  