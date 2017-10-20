import express from 'express'
import {graphql, buildSchema} from 'graphql'
import graphqlHTTP from 'express-graphql'
import Conf from './Schema.graphql'

const schema = buildSchema(Conf),
      app = express(),
      port = process.env.port || 3000;


class User {
  constructor(id, name) {
    this.id = id
    this.name = name
  }
}

let fakeUsers = [{id: 0, name: "Erick"}, {id: 1, name: "Alejandro"}]
let contador = 2

const root = {
  getUsers: ({id}) => {
    if(id !== undefined) {
      let user = fakeUsers.find((user) => {
        return user.id === id
      })
      return [user]
    } else {
      return fakeUsers
    }
  },
  createUser: ({name}) => {
    let user = new User(contador ,name)
    fakeUsers.push(user)
    contador++
    return user
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
