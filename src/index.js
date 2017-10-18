import {graphql, buildSchema} from 'graphql'
import Conf from './Schema.graphql'

const Schema = buildSchema(Conf)

const root = {hello: () => 'Hello world'}

graphql(
  Schema,
  '{hello}',
  root,
)
  .then((response) => console.log(response))