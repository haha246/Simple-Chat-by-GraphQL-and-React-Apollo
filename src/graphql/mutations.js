import {gql} from 'apollo-boost'

export const Message_Create = gql`
  mutation createMessage(
    $from: String!
    $to: String!
    $body: String!
  ){
    createMessage(
      data:{
        from: $from
        to: $to
        body: $body
      }
    ){
      from
      to
      body
    }
  }
`