import react from 'react'
import '../App.css'
import checkerTable from '../Images/checker-table.png'

function Main() {
    return(
        <div className="main">
            <h1>Welcome to Checkers Masters</h1>
            <img src={checkerTable} alt="" />
            <ul>
                <li><a href="http://localhost:3000/singlePlayer"> Single Player</a></li>
                <li><a href="http://localhost:3000/Board"> Player VS Player</a></li>
                <li><a href="http://localhost:3000/singlePlayer"> Online</a></li>
            </ul>
        </div>
    )
}

export default Main