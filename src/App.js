import './App.css';
import { useState } from 'react';
import checkerPiece1 from './Images/checker-piece-1.svg'
import checkerPiece2 from './Images/checker-piece-2.svg'
import checkerPieceKing1 from './Images/checker-piece-king-1.svg'
import checkerPieceKing2 from './Images/checker-piece-king-2.svg'

function App() {
  const [playerId, setPlayerId] = useState(1)
  // const [player1, setPlayer1] = useState(['60'])
  // const [player2, setPlayer2] = useState(['73'])
  const [playerClick, setPlayerClick] = useState("")
  const [king, setKing] = useState([])
 
  const [player1, setPlayer1] = useState(['00','02','04','06','11','13','15','17','20','22','24','26',])
  const [player2, setPlayer2] = useState(['71','73','75','77','60','62','64','66','51','53','55','57',])

  //GameOver
  if (player1.length === 0 || player2.length === 0) {
    setPlayer1(['00','02','04','06','11','13','15','17','20','22','24','26',])
    setPlayer2(['71','73','75','77','60','62','64','66','51','53','55','57',])
    setPlayerId(1)
    setKing([])
    setPlayerClick("")
    alert(`Gameover Player ${player1.length === 0 ? 2 : 1} Won`);

  }

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
          if (enemyPlayer.length === 0) {
            alert('gameover')
          }
          if (king.includes(playerClick) || king.includes(playerClick)) {
            const index = king.indexOf(playerClick)
            if (index !== -1) {
              king[index] = currentPlay
            }
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

      function manditoryPlay(player, enemyPlayer, y1, y2, id, k1,k2) {
        for (let i = 0; i < player.length; i++) {
          const el = player[i];
          // get enemy location
          const kings = king.includes(el)
          const currentKings = king.includes(currentPlay)
          const y = parseInt(el[0])
          const x = parseInt(el[1])  
          const enRight1 = `${( y+(y1)) + '' + (x+1)}`
          const enLeft1 = `${( y+(y1)) + '' + (x-1)}`
          const enRight2 = `${( y+(y2)) + '' + (x+2)}`
          const enLeft2 = `${( y+(y2)) + '' + (x-2)}`
          const kingEnRight1 = `${( y+(k1)) + '' + (x+1)}`
          const kingEnLeft1 = `${( y+(k1)) + '' + (x-1)}`
          const kingEnRight2 = `${( y+(k2)) + '' + (x+2)}`
          const kingEnLeft2 = `${( y+(k2)) + '' + (x-2)}`
          const right = !player.includes(enRight2) && !enemyPlayer.includes(enRight2) && enemyPlayer.includes(enRight1)
          const left = !player.includes(enLeft2) && !enemyPlayer.includes(enLeft2) && enemyPlayer.includes(enLeft1)
          const kingRight = !player.includes(kingEnRight2) && !enemyPlayer.includes(kingEnRight2) && enemyPlayer.includes(kingEnRight1) && kings
          const kingLeft = !player.includes(kingEnLeft2) && !enemyPlayer.includes(kingEnLeft2) && enemyPlayer.includes(kingEnLeft1) && kings
          // only the last player can move again
          function isManditory() {  
            setPlayerId(id)
            console.log("no move");
            allow = false  
          }

          // only get value inside the board
          if (((x-2) < 0 || (x+2) > 7)) {
            if (((x+2) > 7) || (x+1) > 7) {  
              if(left && !currentKings){
                if (!player.includes(currentPlay)) {
                  isManditory()   
                  console.log('left-in');             
                }else if(currentPlay === el) {
                  isManditory()   
                  console.log('blocked');             
                }
              }
              
            }
            if((x-2) < 0 || (x-1 < 0)){
              if (right && !currentKings) {
                if (!player.includes(currentPlay)) {
                  isManditory()   
                  console.log('right-in');             
                }else if(currentPlay === el) {
                  isManditory()   
                  console.log('blocked');             
                }
              }
            }                   
          }
          else{
            // to check if enemy or current player is in the selected spot
            if ((right || left)) {
              if (!currentKings) {
                if (!player.includes(currentPlay)) {
                  isManditory()   
                  console.log('blocked');             
                }else if(currentPlay === el) {
                  isManditory()   
                  console.log('blocked');             
                }

              }
              if (currentKings) {
                if (right && left) {
                  isManditory()
                }
              }
              if (kingRight || kingLeft) {
                console.log('kings');
              }
            }

            if ((kingRight|| kingLeft)) {
              console.log('real king');
              isManditory()            
            }

          }
        }
      }


      if (ev === 1) {
        //detect if player 1 can becomes a king 
        if (player1King.includes(currentPlay)) {
          setKing([...king, currentPlay])
        }
        const y1 = +1
        const y2 = +2
        const k1 = -1
        const k2 = -2
        if(singleMove1){
          // foreach loop to detect if a manditory play is required
          manditoryPlay(player1, player2, y1, y2, ev, k1, k2)
          // if manditory play is not detected proceed
          if (allow) {
            movePiece(player1, player2)             
          }
          allow = true
        }
        //king
        if (singleMove2 && king.includes(playerClick)) {
          manditoryPlay(player1, player2, y1, y2, ev, k1,k2)
          if (allow) {
            movePiece(player1, player2)             
          }
          allow = true

        }
        //double move
        if(doubleMove1){
          //if enemyplayer is detected on click 
          if (!player2.includes(currentPlay) ) {
            if (allow) {
              if (playerRight) {
                const enemyLocation = `${(currentPlayerY -1) + '' + (currentPlayerX - 1)}`
                deletePiece(player1, player2,enemyLocation, setPlayer2)
  
              }
              if (playerLeft) {
                const enemyLocation = `${(currentPlayerY -1) + '' + (currentPlayerX + 1)}`
                deletePiece(player1, player2,enemyLocation, setPlayer2)
              }
            }
            manditoryPlay(player1, player2, y1, y2, ev, k1, k2)
            allow = true
          }
        }
        if (doubleMove2 && king.includes(playerClick)) {
          if (allow) {
            if (playerRight) {
              const enemyLocation = `${(currentPlayerY +1) + '' + (currentPlayerX - 1)}`
              deletePiece(player1, player2,enemyLocation, setPlayer2)

            }
            if (playerLeft) {
              const enemyLocation = `${(currentPlayerY +1) + '' + (currentPlayerX + 1)}`
              deletePiece(player1, player2,enemyLocation, setPlayer2)
            }
          }
          manditoryPlay(player1, player2, y1, y2, ev, k1, k2)
          allow = true
        }
      }
      //player2y1
      if (ev === 2) {
        const y1 = -1
        const y2 = -2
        const k1 = +1
        const k2 = +2
        
        if (player2King.includes(currentPlay)) {
          setKing([...king, currentPlay])
        }
        //if first click
        if(singleMove2){
          // if enemy is detected
          manditoryPlay(player2, player1, y1, y2, ev, k1 ,k2)
          if (allow) {
            movePiece(player2, player1)                 
          }
          allow = true
        }
        if (singleMove1 && king.includes(playerClick)) {
          console.log('back');
          manditoryPlay(player2, player1, y1, y2, ev, k1 ,k2)
          if (allow) {
            movePiece(player2, player1)             
          }
          allow = true

        }
        //double move
        if(doubleMove2){
          if (!player1.includes(currentPlay) ) {
            if (allow) {
              if (playerRight) {
                const enemyLocation = `${(currentPlayerY + 1) + '' + (currentPlayerX - 1)}`
                deletePiece(player2, player1,enemyLocation, setPlayer1)
              }
              if (playerLeft) {
                const enemyLocation = `${(currentPlayerY + 1) + '' + (currentPlayerX + 1)}`
                deletePiece(player2, player1,enemyLocation, setPlayer1)
              }
            }
            manditoryPlay(player2, player1, y1, y2, ev, k1 ,k2)
            allow = true
          }
        }
        if (doubleMove1 && king.includes(playerClick)) {
          if (allow) {
            if (playerRight) {
              const enemyLocation = `${(currentPlayerY - 1) + '' + (currentPlayerX - 1)}`
              deletePiece(player2, player1,enemyLocation, setPlayer1)
            }
            if (playerLeft) {
              const enemyLocation = `${(currentPlayerY - 1) + '' + (currentPlayerX + 1)}`
              deletePiece(player2, player1,enemyLocation, setPlayer1)
            }
          }
          manditoryPlay(player2, player1, y1, y2, ev, k1 ,k2)
          allow = true
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
      <div className="player">
        <h1>Player 1</h1>
        <div>
          <img className={playerId === 1 ? 'check' : '' } src={ playerId === 1 ? checkerPiece1 : ''} alt="" />
        </div>

      </div>

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
                  const pawnImg1 = <img src={king.includes(idSrt) ? checkerPieceKing1 : checkerPiece1} style={{width : '60px'}} alt="" />
                  const pawnImg2 = <img src={king.includes(idSrt) ? checkerPieceKing2 : checkerPiece2} style={{width : '60px'}} alt="" />
                  return (
                    <div 
                      key={rowKey}
                      onClick={()=>{onSelect(idSrt)}}
                      id={idSrt}
                      className='square' 
                      style={((id) % 2 === 0) ? {backgroundColor:'rgb(163, 162, 162)', color: "white"}: {backgroundColor:'white'}} >
                        <div className='playerImg'>
                          {/* {y}{x} */}

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

      <div className="player">
          <h1>Player 2</h1>
          <div>
            <img className={playerId === 2 ? 'check' : '' } src={playerId === 2 ? checkerPiece2 : ''} alt="" />
          </div>
      </div>
    </div>
  );
}

export default App;
