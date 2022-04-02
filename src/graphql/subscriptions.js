import {gql} from 'apollo-boost'

export const Message_Subscription = gql`
  subscription{
    message{
      mutation
      data{
        from
        to
        body
      }
    }
  }
`