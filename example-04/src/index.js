import express from 'express'
import {graphql, buildSchema} from 'graphql'
import graphqlHTTP from 'express-graphql'
import Conf from './Schema.graphql'

const schema = buildSchema(Conf),
      app = express(),
      port = process.env.port || 3000;

const root = {
  withArgs(args) {
    return typeof(args.name) === "string" ? args.name : "not name defined"
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
