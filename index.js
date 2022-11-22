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
let table = getEle('drawingTable')
let colorTable = getEle('colorTable')
let chosingColor = getEle('chosingColor')
let height = 10;
let width = 10;

function clearRows() {
    const allRows = document.querySelectorAll('tr');
    allRows.forEach((row) => {
        row.remove();
    });
}

function drawingTable(height, width) {
    clearRows()
    for (let i = 1; i <= height; i++) {
        const row = document.createElement('tr')
        for (let j = 1; j <= width; j++) {
            const column = document.createElement('td')
            column.classList.add('pixel')
            row.appendChild(column)
        }
        row.classList.add('pixel')
        table.append(row)
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
displayListColor(listColor)
drawingTable(height, width)
handleApplyColor()