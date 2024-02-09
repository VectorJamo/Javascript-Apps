let cell_status = ['', '', '', '', '', '', '', '', '']
const winning_combinations = [
    [1, 2, 3],[4, 5, 6],[7, 8, 9],
    [1, 4, 7],[2, 5, 8],[3, 6, 9],
    [1, 5, 9],[3, 5, 7]
]
let turn = 'X'
let game_draw = false

function checkIfWin() {
    let status = false
    winning_combinations.forEach(winning_array => {
        if(cell_status[winning_array[0]-1] == turn && cell_status[winning_array[1]-1] == turn 
            && cell_status[winning_array[2]-1] == turn){
            alert(`Player ${turn} wins the game!`)
            
            // Reset
            cell_status.forEach((array, index, value) => {
                cell_status[index] = ''
                document.querySelector(`.cell-${index+1}`).innerHTML = '' 
            })

            console.log(`All cells reset done: ${cell_status}`)
            status = true
        }
    })

    // Check for game draw
    game_draw = cell_status.every(state => {
        return state != ''
    })
    return status
}

function makeComputerMove(val){
    console.log(`Computer playing ${turn} on cell ${val+1}`)

    cell_status[val] = turn
    document.querySelector(`.cell-${val+1}`).innerHTML = turn

    // Check if game won
    checkIfWin()

    // Change the turns
    if(turn == 'X'){
        turn = 'O'
    }else{
        turn = 'X'
    }    
}
function onCellClick(val, element){
    if(element.innerHTML == ''){
        // Update and render the state
        cell_status[val-1] = turn
        element.innerHTML = turn

        // Check if game won
        if(checkIfWin()){
            console.log("YOU WON!")
        }else{
            console.log("You didnt win!")
            // Change the turns
            if(turn == 'X'){
                turn = 'O'
            }else{
                turn = 'X'
            }
    
            // Implement computer moves 
            let smart_move_index = Math.floor(Math.random()*9)
            while((cell_status[smart_move_index] == 'X' || cell_status[smart_move_index] == 'O') && !game_draw){
                smart_move_index = Math.floor(Math.random()*9)
            }
            winning_combinations.forEach(combination => {
                console.log(`Check for pattern: ${combination}`)
                if((cell_status[combination[0]-1] == 'X' && cell_status[combination[1]-1] == 'X' && cell_status[combination[2]-1] == '') || 
                (cell_status[combination[0]-1] == 'O' && cell_status[combination[1]-1] == 'O' && cell_status[combination[2]-1] == '')){
                    console.log("PATTERN FOUND!")

                    smart_move_index = combination[2]-1
                }else if((cell_status[combination[0]-1] == 'X' && cell_status[combination[2]-1] == 'X' && cell_status[combination[1]-1] == '') || 
                (cell_status[combination[0]-1] == 'O' && cell_status[combination[2]-1] == 'O' && cell_status[combination[1]-1] == '')){
                    console.log("PATTERN FOUND!")

                    smart_move_index = combination[1]-1
                }else if((cell_status[combination[1]-1] == 'X' && cell_status[combination[2]-1] == 'X' && cell_status[combination[0]-1] == '') 
                || (cell_status[combination[1]-1] == 'O' && cell_status[combination[2]-1] == 'O' && cell_status[combination[0]-1] == '')){
                    console.log("PATTERN FOUND!")

                    smart_move_index = combination[0]-1
                }else{
                    console.log('No double pattern found')
                }
            })
            makeComputerMove(smart_move_index)

            if(game_draw){
                // Reset
                cell_status.forEach((array, index, value) => {
                    cell_status[index] = ''
                    document.querySelector(`.cell-${index+1}`).innerHTML = '' 
                })
                game_draw = false
            }
        }
    }
}