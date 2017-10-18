import express from 'express'
import {graphql, buildSchema} from 'graphql'
import graphqlHTTP from 'express-graphql'
import Conf from './Schema.graphql'

const schema = buildSchema(Conf),
      app = express(),
      port = process.env.port || 3000;

class UserResolver {
  constructor(id, name) {
    this.name = name;
    this.id = id;
    this.country = "Guatemala",
    this.city = "Guatemala City"
  }

  greet({greet}) {
    return `I greet this way: ${greet}`
  }
}

const root = {
  getUser: ({id, name}) => {
    return new UserResolver(id, name)
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
