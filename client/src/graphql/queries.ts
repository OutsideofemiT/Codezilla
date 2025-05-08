import { gql } from '@apollo/client';

// Query to generate a new coding question
export const GENERATE_QUESTION = gql`
  query GenerateQuestion($track: String!, $level: String!, $minion: String!) {
    generateQuestion(track: $track, level: $level, minion: $minion) {
      question
      choices
      answer
    }
  }
`;

// (Optional bonus if someone else pulls user stats for leaderboard)
export const ME = gql`
  query Me {
    me {
      _id
      username
      correctAnswers
      wrongAnswers
    }
  }
`;


export const GET_USERS = gql`
query GetAllUsers {
  getAllUsers {
    correctAnswers
    username
    selectedAvatar
  }
}
`