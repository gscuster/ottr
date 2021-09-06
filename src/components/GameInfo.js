import './GameInfo.css';

export const GameInfo = ({gameName='', gameData={}, users=[]}) => {
  console.log(users);
  return (
    <div className='game-info'>
      <p>Game:&nbsp;<b>{gameName}</b></p>
      <p>GM:&nbsp;
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
