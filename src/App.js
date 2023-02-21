import './App.css';
import {AiTwotoneMinusCircle} from 'react-icons/ai'
import { useState } from 'react';

function App() {
  const [playerId, setPlayerId] = useState(1)
  const [player1, setPlayer1] = useState(['15','17','20','22','24','26',])
  const [player2, setPlayer2] = useState(['64','66','51','53','55','57',])
  const [playerClick, setPlayerClick] = useState("")
  const [king, setKing] = useState([])
 
  // const [player1, setPlayer1] = useState(['00','02','04','06','11','13','15','17','20','22','24','26',])
  // const [player2, setPlayer2] = useState(['71','73','75','77','60','62','64','66','51','53','55','57',])


  function onSelect(e){
    const currentPlay = e
    const currentPlayerY = parseInt(e[0])
    const currentPlayerX = parseInt(e[1])
    const playerY = parseInt(playerClick[0])
    const playerX = parseInt(playerClick[1])
    let allow = true
    const player1King = ['71', '73', '75', '77']
    const player2King = ['00', '02', '04', '06']

    // set previous player position
    if (playerClick !== e) {
      setPlayerClick(e)
    }

    function move(ev) {
      const playerRight = currentPlayerX - playerX === 2
      const playerLeft = currentPlayerX - playerX === -2
      const singleMove1 = playerY + 1 === currentPlayerY && (playerX + 1 === currentPlayerX || playerX - 1 === currentPlayerX)
      const singleMove2 = playerY - 1 === currentPlayerY && (playerX + 1 === currentPlayerX || playerX - 1 === currentPlayerX)
      const doubleMove1 = playerY + 2 === currentPlayerY && (playerX + 2 === currentPlayerX || playerX - 2 === currentPlayerX)
      const doubleMove2 = playerY - 2 === currentPlayerY && (playerX + 2 === currentPlayerX || playerX - 2 === currentPlayerX)
      // player 1
      function movePiece(player, enemyPlayer) {
        if (enemyPlayer.includes(currentPlay) || player.includes(currentPlay)) {
        }else{
          // when move set replace king with currentPlay
          if (king.includes(playerClick) || king.includes(playerClick)) {
            const index = king.indexOf(playerClick)
            if (index !== -1) {
              king[index] = currentPlay
            }
            console.log('king move');
          }
          const index = player.indexOf(playerClick)
          if (index !== -1) {
            player[index] = currentPlay
          }
      
          setPlayerId(ev === 1 ? 2: 1)
        }

      }
      function deletePiece(player, enemyPlayer, enemyLocation , setplayer) {
        if (enemyPlayer.includes(currentPlay) || player.includes(currentPlay)) {
        }else{
          if (enemyPlayer.includes(enemyLocation) ) {
            movePiece(player, enemyPlayer)      
            const getLocation = enemyPlayer.filter((x)=> x !== enemyLocation)
            setplayer(getLocation);       
          }
        }
      }

      function manditoryPlay(player, enemyPlayer, y1, y2, id) {
        player.forEach(el => {
          // get enemy location
          const y = parseInt(el[0])
          const x = parseInt(el[1])  
          const enLocalRight1 = `${( y+y1) + '' + (x+1)}`
          const enLocalLeft1 = `${( y+y1) + '' + (x-1)}`
          const enLocalRight2 = `${( y+y2) + '' + (x+2)}`
          const enLocalLeft2 = `${( y+y2) + '' + (x-2)}`
          const right = !player.includes(enLocalRight2) && !enemyPlayer.includes(enLocalRight2) && enemyPlayer.includes(enLocalRight1)
          const left = !player.includes(enLocalLeft2) && !enemyPlayer.includes(enLocalLeft2) && enemyPlayer.includes(enLocalLeft1)
          // only get value inside the board
          if (((x+1) > 7 || (x+2) > 7) || (x-1) < 0 || (x-2) < 0) {             
          }else{
            // to check if enemy or current player is in the selected spot
            if ((right) || (left)) {
              // if manditory play detected dont allow it
              setPlayerId(id)
              console.log('manditory');
              allow = false
            }else{
              setPlayerId(ev === 1 ? 2: 1)
            }
          }
        });
      }


      if (ev === 1) {
        //detect if player 1 can becomes a king 
        if (player1King.includes(currentPlay)) {
          setKing([...king, currentPlay])
        }
        const y1 = +1
        const y2 = +2
        if(singleMove1){
          console.log('single');
          // foreach loop to detect if a manditory play is required
          manditoryPlay(player1, player2, y1, y2, ev)
          // if manditory play is not detected proceed
          if (allow) {
            movePiece(player1, player2)             
          }
          allow = true
        }
        if (singleMove2 && king.includes(playerClick)) {
          console.log('back');
          manditoryPlay(player1, player2, -1, -2, ev)
          if (allow) {
            movePiece(player1, player2)             
          }
          allow = true

        }
        //double move
        if(doubleMove1){
          //if enemyplayer is detected on click 
          if (!player2.includes(currentPlay) ) {
            if (playerRight) {
              const enemyLocation = `${(currentPlayerY -1) + '' + (currentPlayerX - 1)}`
              deletePiece(player1, player2,enemyLocation, setPlayer2)

            }
            if (playerLeft) {
              const enemyLocation = `${(currentPlayerY -1) + '' + (currentPlayerX + 1)}`
              deletePiece(player1, player2,enemyLocation, setPlayer2)
            }
          }
          manditoryPlay(player1, player2, y1, y2, ev)
        }
        if (doubleMove2 && king.includes(playerClick)) {
          if (playerRight) {
            const enemyLocation = `${(currentPlayerY +1) + '' + (currentPlayerX - 1)}`
            deletePiece(player1, player2,enemyLocation, setPlayer2)

          }
          if (playerLeft) {
            const enemyLocation = `${(currentPlayerY +1) + '' + (currentPlayerX + 1)}`
            deletePiece(player1, player2,enemyLocation, setPlayer2)
          }
          manditoryPlay(player1, player2, -1, -2, ev)
        }
  
      }
      //player2y1
      if (ev === 2) {
        const y1 = -1
        const y2 = -2
        if (player2King.includes(currentPlay)) {
          setKing([...king, currentPlay])
        }
        //if first click
        if(singleMove2){
          // if enemy is detected
          manditoryPlay(player2, player1, y1, y2, ev)
          if (allow) {
            movePiece(player2, player1)                 
          }
          allow = true
        }
        if (singleMove1 && king.includes(playerClick)) {
          console.log('back');
          manditoryPlay(player2, player1, +1, +2, ev)
          if (allow) {
            movePiece(player2, player1)             
          }
          allow = true

        }
        //double move
        if(doubleMove2){
          if (!player1.includes(currentPlay) ) {
            if (playerRight) {
              const enemyLocation = `${(currentPlayerY + 1) + '' + (currentPlayerX - 1)}`
              deletePiece(player2, player1,enemyLocation, setPlayer1)
            }
            if (playerLeft) {
              const enemyLocation = `${(currentPlayerY + 1) + '' + (currentPlayerX + 1)}`
              deletePiece(player2, player1,enemyLocation, setPlayer1)
            }
          }
          manditoryPlay(player2, player1, y1, y2, ev)
        }
        if (doubleMove1 && king.includes(playerClick)) {
          if (playerRight) {
            const enemyLocation = `${(currentPlayerY - 1) + '' + (currentPlayerX - 1)}`
            deletePiece(player2, player1,enemyLocation, setPlayer1)
          }
          if (playerLeft) {
            const enemyLocation = `${(currentPlayerY - 1) + '' + (currentPlayerX + 1)}`
            deletePiece(player2, player1,enemyLocation, setPlayer1)
          }
          manditoryPlay(player2, player1, +1, +2, ev)
        }
      }
    }

    // get next play position
    if (player1.includes(playerClick) && playerId === 1) {
      move(1)
    }
    if (player2.includes(playerClick) && playerId === 2) {
      move(2)
    }

  }
  return (
    <div className="App">
      <div className="board-cont">
        <div className="board">
          {
            new Array(8).fill(0).map((column,columnKey)=>{
              return <div key={columnKey} className="squares">
                {new Array(8).fill(0).map((row,rowKey)=>{
                  const id = columnKey + rowKey
                  const idSrt = `${rowKey}${columnKey}`
                  const y = rowKey
                  const x = columnKey
                  const pawnImg1 = <AiTwotoneMinusCircle size={45} color={'white'}/>
                  const pawnImg2 = <AiTwotoneMinusCircle size={45} color={'black'}/>
                  return (
                    <div 
                      key={rowKey}
                      onClick={()=>{onSelect(idSrt)}}
                      id={idSrt}
                      className='square' 
                      style={((id) % 2 === 0) ? {backgroundColor:'rgb(163, 162, 162)', color: "white"}: {backgroundColor:'white'}} >
                        <div className='playerImg'>
                          {player1.includes(idSrt) ? pawnImg1 : ''}
                          {player2.includes(idSrt) ? pawnImg2 : ''}
                        </div>
                    </div>)
                }).reverse()}
              </div>
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
