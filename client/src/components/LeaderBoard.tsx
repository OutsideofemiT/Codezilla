import "../styles/leaderboard.css";
// import { useBodyClass } from '../utils/useBodyClass';
import { useQuery } from "@apollo/client";
import { GET_USERS } from "@/graphql/queries";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';




function LeaderBoard() {
  const navigate = useNavigate();

  const { loading, data } = useQuery(GET_USERS);

  const allUsers = data?.getAllUsers || [];

  useEffect(() => {
    document.body.classList.add('gameover-background');
    return () => {
      document.body.classList.remove('gameover-background');
    };
  }, []);

  if (loading) return <p>Loading...</p>;

  const sortedUsers = [...allUsers].sort((a, b) => b.correctAnswers - a.correctAnswers);

  console.log(allUsers);


  return (
    <div className="leaderboard-page">
      <div className="leaderboard-container">
        <h2 className="leaderboard-subtitle">Leaderboard</h2>
        <div className="leaderboard-actions">
          {sortedUsers.map((user: any, index: number) => {
            if (index < 5) {
              return (
                <div className="player-info">
                  <img src={user.selectedAvatar} />
                  <p>{user.username}</p>
                  <img src="/public/assets/dans_gold_star.png" />
                  <p>{user.correctAnswers}</p>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>

        <br />
      <button
        className="btn main-menu-btn"
        onClick={() => {
          navigate("/map");
        }}
      >
        Main Menu
      </button>
      </div>

    </div>
  );
}

export default LeaderBoard;

// // import React, { useState } from 'react';
// // import { useQuery } from '@apollo/client';
// // import { GET_USERS } from '../graphql/queries'; // Adjust the import path as necessary

// function LeaderBoard() {

// //     interface IUser {
// //         _id: string;
// //         username: string;
// //         correctAnswers: number;
// //         avatar: string; // Assuming you have an avatar property
// //     }

// //     // Data for leaderboard
// //    /* const [leaderboardData, setLeaderboardData] = useState([
// //         { _id: 'kjhd63r9bhsef', username: 'Player1', correctAnswers: 100 },
// //         { username: 'Player2', score: 90 },
// //         { username: 'Player4', score: 70 },
// //         { username: 'Player5', score: 60 },
// //     ]);
// //     */
// //     // Fetch leaderboard data from the server (mocked for now)
// //     const [leaderboardData, setLeaderboardData] = useState([]);

// //     // How do we get the data from the server?

// //     const { loading, data, error } = useQuery<IUser[] | undefined>(GET_USERS);

// //     if (loading) return <p>Loading...</p>;
// //     if (error) return <p>Error: {error.message}</p>;
// //     // const { loading, data, errer } = useQuery(GET_LEADERBOARD_DATA, {
// //     //     variables: { difficulty_lvl: 'easy' }, // Example variable
// //     // );
// //     const users = data?.users || [];

// //     // Sort the leaderboard data by score in descending order - by what measurement (?)
// //     const sortedLeaderboard = users.sort((a: number, b: number) => b.correctAnswers - a.correctAnswers);

// //   return (
// //     <div>
// //       { sortedLeaderboard.length > 0 ? sortedLeaderboard.map(user: IUser => (
// //         <div className="leaderboard-container">
// //             <div className="leaderboard-item" key={user._id}>
// //                 <img src={user.avatar} alt="Avatar" className="avatar" /> {/* Assuming you have an avatar property */}
// //                 <span className="username">{user.username}</span>
// //                 <span className="score">{user.correctAnswers}</span>
// //             </div>
// //         ))
// //         </div>
// //         }
// //     </div>

// //   )
// }

//  export default LeaderBoard
