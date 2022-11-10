import { buildSchema } from 'graphql'

const mutationSchema = `
type Mutation {
  addBrincess(brincess: BrincessInput!): Brincess
  editBrincess(brincess: BrincessInput!): Brincess
  clearDataBase: [Brincess]
}

input BrincessInput {
  name: String!,
  backgroundColor: BackgroundInput!,
  eyes: EyesInput!,
  mouth: MouthInput!,
  hair: HairInput!,
  authorId: String,
  id: String,
}
input BackgroundInput {string: String!, imgSrc: String}
input EyesInput {right: BackgroundInput!, left: BackgroundInput!}
input MouthInput {up: BackgroundInput!, down: BackgroundInput!}
input HairInput {style: String!, color: BackgroundInput!}
`

const querySchema = `
type Query {
  brincesses: [Brincess],
  brincess(id: String!): Brincess,
  numberOfBrincessesInDataBase: Int,

  hello: String @deprecated(reason: "hello was the initial implementation and only for testing purposes, Use \`brincesses\` instead."),
}

type Brincess {
  id: String,
  name: String,
  backgroundColor: Background,
  eyes: Eyes,
  mouth: Mouth,
  hair: Hair
}
type Background {string: String!, imgSrc: String}
type Eyes {right: Background, left: Background}
type Mouth {up: Background, down: Background}
type Hair {style: String, color: Background}
`

export const schema = buildSchema(querySchema + mutationSchema)
