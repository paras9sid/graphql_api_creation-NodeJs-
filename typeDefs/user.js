const { gql } = require('apollo-server-express');

module.exports = gql`
    extend type Query{
       user:User
    }

    extend type Mutation{
        signup(input : signupInput):User
        login(input: loginInput) : Token
    }

    input signupInput{
        name:String!
        email:String!
        password:String!
    }

    input loginInput{
        email:String!
        password:String!
    }
    type Token{
        token:String!
    }
        
    type User{
        id:ID!
        name:String!
        email:String!
        myCar:[Car!]
    }
`;