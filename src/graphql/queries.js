import {gql} from 'apollo-boost'

export const Message_Query = gql`
  query{
    message{
      from
      to
      body
    }
  }
`