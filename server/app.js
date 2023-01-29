const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config()
console.log(process.env) 

const app = express();
app.use(cors());


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

mongoose.connect(process.env.DB_URI)
mongoose.connection.once('open', () => {
    console.log('connected to database');
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening on port ${process.env.SERVER_PORT}`);
});