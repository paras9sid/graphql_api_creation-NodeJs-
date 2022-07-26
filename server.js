const express = require('express');
const {ApolloServer , gql} = require('apollo-server-express'); // apollo server
const cors = require('cors'); //handle cors origin request
const dotEnv = require('dotenv'); // handling environment variable
const http = require('http');
const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');
const db = require('./config/mongoose');
const {verifyUser} = require('./helper');
const jwt = require('jsonwebtoken');


// dotEnv.config();

// - await with async always -- start server function
async function startApolloServer (typeDefs, resolvers)  {
    const apolloServer = new ApolloServer({
         typeDefs,
         resolvers,
         context:async({ req }) => {
          await verifyUser(req)
          return{
            email:req.email,
            loggedInUserId:req.loggedInUserId
          }
         }
       
    });
    await apolloServer.start()
   
    const app = express()
    
    app.use(cors())
   
    app.use(express.json());
     
    apolloServer.applyMiddleware({ app, path: '/graphql' })
   
    const port =  3000;
       
    await new Promise(resolve =>
      app.listen(port, function()  {
        console.log(`Server listening on port: ${port}`)
        console.log(`GraphQL endpoint: ${apolloServer.graphqlPath}`)
      })
    )
}
   
startApolloServer(typeDefs, resolvers)

//updation and deletion of car by logged in user in db is in progress-- 