import { gql } from '@apollo/client';

// Mutation to update player stats
export const UPDATE_STATS = gql`
  mutation UpdateStats($isCorrect: Boolean!) {
    updateStats(isCorrect: $isCorrect) {
      correctAnswers
      wrongAnswers
    }
  }
`;

// Mutation to login
export const LOGIN = gql`
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;

// Mutation to add a new user
export const ADD_USER = gql`
  mutation AddUser($input: UserInput!) {
    addUser(input: $input) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Mutation to create a new character
export const CREATE_CHARACTER = gql`
  mutation CreateCharacter($name: String!, $picture: String!, $voice: String!) {
    createCharacter(name: $name, picture: $picture, voice: $voice) {
      _id
      name
      picture
      voice
    }
  }
`;

// Mutation to delete a character
export const DELETE_CHARACTER = gql`
  mutation DeleteCharacter($id: ID!) {
    deleteCharacter(id: $id) {
      _id
      name
    }
  }
`;
