const getEle = (id) => {
    return document.getElementById(id)
}
listColor = [
    'red',
    'green',
    'blue',
    'yellow',
    'pink'
]
let table = document.querySelector('.drawingTable')
let lose = document.querySelector('.lose')
let totalLose = 0
let totalWin = 0
let colorTable = getEle('colorTable')
let chosingColor = getEle('chosingColor')
let totalBomb = getEle('totalBomb')
let totalBombNextToPixel = 0
size = 10


function clearRows() {
    const allRows = document.querySelectorAll('tr');
    allRows.forEach((row) => {
        row.remove();
    });
}

function drawingTable(size) {
    clearRows()
    boardGame = []
    arrayBomb = []
    totalBombs = 0;
    for (let i = 0; i < size; i++) {
        const row = []
        for (let j = 0; j < size; j++) {
            const column = document.createElement('div')
            column.dataset.status = 'hidden'
            column.dataset.line = i;
            column.dataset.column = j;
            column.dataset.setBoom = false
            column.dataset.value = 0
            pixel = {
                i,
                j,
                column,
            }
            row.push(pixel)
        }
        boardGame.push(row)
    }
    displayBomb()
    table.style.setProperty('--size', size)
    boardGame.forEach(row => {
        row.forEach(pixel => {
            table.append(pixel.column)
        })
    })
    
    displayGame()
}

function displayGame(){
    table.addEventListener('click',function(e){
        if(e.target.dataset.setBoom === false && e.target.dataset.value === 0){
            e.target.dataset.status = 'marked'
        }else if(e.target.dataset.setBoom === true){
            alert('you lose')
        }else if(e.target.dataset.value != 0){
            e.target.dataset.status = 'number'
            e.target.innerHTML = e.target.dataset.value
        }
    })
}

function displayBomb() {
    for (let i = 0; i < 10; i++) {
        bomb = {
            i: Math.floor(Math.random() * 10),
            j: Math.floor(Math.random() * 10),
        }
        arrayBomb.push(bomb)
    }
    arrayBomb.forEach(bomb => {
        const boom = boardGame[bomb.i][bomb.j]
        boom.column.dataset.setBoom = true
        getTopPixel(bomb.i, bomb.j, boardGame)
        getRightPixel(bomb.i, bomb.j, boardGame)
        getLeftPixel(bomb.i, bomb.j, boardGame)
        getBottomPixel(bomb.i, bomb.j, boardGame)
        getTopRightPixel(bomb.i, bomb.j, boardGame)
        getTopLeftPixel(bomb.i, bomb.j, boardGame)
        getBottomRightPixel(bomb.i, bomb.j, boardGame)
        getBottomLeftPixel(bomb.i, bomb.j, boardGame)
    })
}

function getTopPixel(i, j, boardGame) {
    console.log(boardGame[i][j])
    if (i > 0) {
        const topPosition = boardGame[i - 1][j]
        if(boardGame[i][j] != topPosition){
            topPosition.column.dataset.value = Number(topPosition.column.dataset.value) + 1
        }
        return topPosition
    }
}
function getRightPixel(i, j, boardGame) {
    if (j < 9) {
        const rightPosition = boardGame[i][j + 1]
        if(boardGame[i][j] != rightPosition){
            rightPosition.column.dataset.value = Number(rightPosition.column.dataset.value) + 1
        }
        return rightPosition
    }
}
function getLeftPixel(i, j, boardGame) {
    if (j > 0) {
        const leftPosition = boardGame[i][j - 1]
        if(boardGame[i][j] != leftPosition){
            leftPosition.column.dataset.value = Number(leftPosition.column.dataset.value) + 1
        }
        return leftPosition
    }
}
function getBottomPixel(i, j, boardGame) {
    if (i < 9) {
        const bottomPosition = boardGame[i + 1][j]
        if(boardGame[i][j] != bottomPosition){
            bottomPosition.column.dataset.value = Number(bottomPosition.column.dataset.value) + 1
        }
        return bottomPosition
    }
}
function getTopRightPixel(i, j, boardGame) {
    if (i > 0 && j < 9) {
        const topRightPixel = boardGame[i - 1][j + 1]
        if(boardGame[i][j] != topRightPixel){
            topRightPixel.column.dataset.value = Number(topRightPixel.column.dataset.value) + 1
        }
        return topRightPixel
    }
}
function getTopLeftPixel(i, j, boardGame) {
    if (i > 0 && j > 0) {
        const topLeftPixel = boardGame[i - 1][j - 1]
        if(boardGame[i][j] != topLeftPixel){
            topLeftPixel.column.dataset.value = Number(topLeftPixel.column.dataset.value) + 1
        }
        return topLeftPixel
    }
}
function getBottomRightPixel(i, j, boardGame) {
    if (i < 9 && j < 9) {
        const bottomRightPixel = boardGame[i + 1][j + 1]
        if(boardGame[i][j] != bottomRightPixel){
            bottomRightPixel.column.dataset.value = Number(bottomRightPixel.column.dataset.value) + 1
        }
        return bottomRightPixel
    }
}
function getBottomLeftPixel(i, j, boardGame) {
    if (i < 9 && j > 0) {
        const bottomLeftPixel = boardGame[i + 1][j - 1]
        if(boardGame[i][j] != bottomLeftPixel){
            bottomLeftPixel.column.dataset.value = Number(bottomLeftPixel.column.dataset.value) + 1
        }
        return bottomLeftPixel
    }
}
function displayListColor(listColor) {
    for (let i = 0; i < listColor.length; i++) {
        const colorPixel = document.createElement('div')
        colorPixel.classList.add('pixel')
        colorPixel.style.backgroundColor = listColor[i]
        colorTable.appendChild(colorPixel)
    }
}
function handleApplyColor() {
    colorPicked = 'rgb(61, 61, 61)'
    colorTable.addEventListener('click', function (e) {
        colorPicked = e.target.style.backgroundColor
        chosingColor.innerHTML = e.target.style.backgroundColor
    })
    table.addEventListener('click', function (e) {
        e.target.style.backgroundColor = colorPicked;

    })

}
function automaticChangingDrawing() {
    $('td')[0].style.backgroundColor = 'green';
    $('td')[9].style.backgroundColor = 'green';
    $('td')[11].style.backgroundColor = 'green';
    $('td')[18].style.backgroundColor = 'green';
    $('td')[22].style.backgroundColor = 'green';
    $('td')[27].style.backgroundColor = 'green';
    $('td')[33].style.backgroundColor = 'green';
    $('td')[36].style.backgroundColor = 'green';
    $('td')[44].style.backgroundColor = 'green';
    $('td')[45].style.backgroundColor = 'green';
    $('td')[54].style.backgroundColor = 'green';
    $('td')[55].style.backgroundColor = 'green';
    $('td')[63].style.backgroundColor = 'green';
    $('td')[66].style.backgroundColor = 'green';
    $('td')[72].style.backgroundColor = 'green';
    $('td')[77].style.backgroundColor = 'green';
    $('td')[81].style.backgroundColor = 'green';
    $('td')[88].style.backgroundColor = 'green';
    $('td')[90].style.backgroundColor = 'green';
    $('td')[99].style.backgroundColor = 'green';

    $('td')[4].style.backgroundColor = 'blue';
    $('td')[14].style.backgroundColor = 'blue';
    $('td')[24].style.backgroundColor = 'blue';
    $('td')[34].style.backgroundColor = 'blue';
    $('td')[64].style.backgroundColor = 'blue';
    $('td')[74].style.backgroundColor = 'blue';
    $('td')[84].style.backgroundColor = 'blue';
    $('td')[94].style.backgroundColor = 'blue';

    $('td')[5].style.backgroundColor = 'red';
    $('td')[15].style.backgroundColor = 'red';
    $('td')[25].style.backgroundColor = 'red';
    $('td')[35].style.backgroundColor = 'red';
    $('td')[65].style.backgroundColor = 'red';
    $('td')[75].style.backgroundColor = 'red';
    $('td')[85].style.backgroundColor = 'red';
    $('td')[95].style.backgroundColor = 'red';

}
function automaticDrawing() {
    document.querySelectorAll('td')[0].style.backgroundColor = 'red';
    document.querySelectorAll('td')[9].style.backgroundColor = 'red';
    document.querySelectorAll('td')[11].style.backgroundColor = 'red';
    document.querySelectorAll('td')[18].style.backgroundColor = 'red';
    document.querySelectorAll('td')[22].style.backgroundColor = 'red';
    document.querySelectorAll('td')[27].style.backgroundColor = 'red';
    document.querySelectorAll('td')[33].style.backgroundColor = 'red';
    document.querySelectorAll('td')[36].style.backgroundColor = 'red';
    document.querySelectorAll('td')[44].style.backgroundColor = 'red';
    document.querySelectorAll('td')[45].style.backgroundColor = 'red';
    document.querySelectorAll('td')[54].style.backgroundColor = 'red';
    document.querySelectorAll('td')[55].style.backgroundColor = 'red';
    document.querySelectorAll('td')[63].style.backgroundColor = 'red';
    document.querySelectorAll('td')[66].style.backgroundColor = 'red';
    document.querySelectorAll('td')[72].style.backgroundColor = 'red';
    document.querySelectorAll('td')[77].style.backgroundColor = 'red';
    document.querySelectorAll('td')[81].style.backgroundColor = 'red';
    document.querySelectorAll('td')[88].style.backgroundColor = 'red';
    document.querySelectorAll('td')[90].style.backgroundColor = 'red';
    document.querySelectorAll('td')[99].style.backgroundColor = 'red';

    document.querySelectorAll('td')[4].style.backgroundColor = 'green';
    document.querySelectorAll('td')[14].style.backgroundColor = 'green';
    document.querySelectorAll('td')[24].style.backgroundColor = 'green';
    document.querySelectorAll('td')[34].style.backgroundColor = 'green';
    document.querySelectorAll('td')[64].style.backgroundColor = 'green';
    document.querySelectorAll('td')[74].style.backgroundColor = 'green';
    document.querySelectorAll('td')[84].style.backgroundColor = 'green';
    document.querySelectorAll('td')[94].style.backgroundColor = 'green';

    document.querySelectorAll('td')[5].style.backgroundColor = 'blue';
    document.querySelectorAll('td')[15].style.backgroundColor = 'blue';
    document.querySelectorAll('td')[25].style.backgroundColor = 'blue';
    document.querySelectorAll('td')[35].style.backgroundColor = 'blue';
    document.querySelectorAll('td')[65].style.backgroundColor = 'blue';
    document.querySelectorAll('td')[75].style.backgroundColor = 'blue';
    document.querySelectorAll('td')[85].style.backgroundColor = 'blue';
    document.querySelectorAll('td')[95].style.backgroundColor = 'blue';

}
function animationTransition() {
    $('td')[0].style.transition = 'all .5s';
    $('td')[9].style.transition = 'all .5s';
    $('td')[11].style.transition = 'all .5s';
    $('td')[18].style.transition = 'all .5s';
    $('td')[22].style.transition = 'all .5s';
    $('td')[27].style.transition = 'all .5s';
    $('td')[33].style.transition = 'all .5s';
    $('td')[36].style.transition = 'all .5s';
    $('td')[44].style.transition = 'all .5s';
    $('td')[45].style.transition = 'all .5s';
    $('td')[54].style.transition = 'all .5s';
    $('td')[55].style.transition = 'all .5s';
    $('td')[63].style.transition = 'all .5s';
    $('td')[66].style.transition = 'all .5s';
    $('td')[72].style.transition = 'all .5s';
    $('td')[77].style.transition = 'all .5s';
    $('td')[81].style.transition = 'all .5s';
    $('td')[88].style.transition = 'all .5s';
    $('td')[90].style.transition = 'all .5s';
    $('td')[99].style.transition = 'all .5s';

    $('td')[4].style.transition = 'all .5s';
    $('td')[14].style.transition = 'all .5s';
    $('td')[24].style.transition = 'all .5s';
    $('td')[34].style.transition = 'all .5s';
    $('td')[64].style.transition = 'all .5s';
    $('td')[74].style.transition = 'all .5s';
    $('td')[84].style.transition = 'all .5s';
    $('td')[94].style.transition = 'all .5s';

    $('td')[5].style.transition = 'all .5s';
    $('td')[15].style.transition = 'all .5s';
    $('td')[25].style.transition = 'all .5s';
    $('td')[35].style.transition = 'all .5s';
    $('td')[65].style.transition = 'all .5s';
    $('td')[75].style.transition = 'all .5s';
    $('td')[85].style.transition = 'all .5s';
    $('td')[95].style.transition = 'all .5s';
}
function animationDrawing() {
    automaticDrawing()
    animationTransition()
    setTimeout(() => { automaticChangingDrawing() }, 1000)
    setTimeout(() => { automaticDrawing() }, 2000)
    setTimeout(() => { animationTransition() }, 2000)
}
displayListColor(listColor)
drawingTable(size)
handleApplyColor()