
export const GameInfo = ({gameName='', gameData={}, users=[]}) => {
  console.log(users);
  return (
    <div>
      <p>Game: <b>{gameName}</b></p>
      <p>GM:
        {users.filter( (user) => 
          (gameData.gm != null && gameData.gm.includes(user.userID)))
          .map( (user, i) => (
            <b key={i}>{user.username}</b>
          ))
        }
      </p>
      
      <p>Players:</p>
      {users.filter( (user) => 
        (!(gameData.gm != null && gameData.gm.includes(user.userID))))
        .map( (user, i) => (
          <b key={i}>{user.username}</b>
        ))
      }
    </div>
  )
}
