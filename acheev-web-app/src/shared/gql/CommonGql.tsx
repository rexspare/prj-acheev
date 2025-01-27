import gql from 'graphql-tag';

gql`

  fragment GenericUserFields on User {
    id
    firstName
    lastName
    fullName
    email
    phoneNumber
    admin
    restrictedAdmin
    createdAt
  }

  fragment CurrentUserFields on User {
    ...GenericUserFields
  }

  query Me {
    me { 
      token
      user {
        ...CurrentUserFields
      }
    }
  }

  mutation Login($phoneNumber: String!, $password: String!) {
    login(phoneNumber: $phoneNumber, password: $password) {
      token
      user {
        ...CurrentUserFields
      } 
    }
  }

  mutation Register($userInput: UserInput!) {
    register(userInput: $userInput) {
      token
      user {
        ...CurrentUserFields
      } 
    }
  }

  mutation AdminModifyUser($userId: String, $modifyUserInput: AdminModifyUserInput!) {
    adminModifyUser(modifyUserInput: $modifyUserInput, userId: $userId) {
      ...GenericUserFields
    }
  }

`;
