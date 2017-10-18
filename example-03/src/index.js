import express from 'express'
import {graphql, buildSchema} from 'graphql'
import graphqlHTTP from 'express-graphql'
import Conf from './Schema.graphql'

const schema = buildSchema(Conf),
      app = express(),
      port = process.env.port || 3000;

const root = {
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
  },
  random: () => {
    return Math.random();
  },
  rollThreeDice: () => {
    return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
  }
}

app
  .set("port", port)
  .use("/graphql", graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  }))

  .listen(app.get("port"), (error) => {
    console.log(error)
  }, () => {console.log(`App running port: ${app.get("port")}`)})
