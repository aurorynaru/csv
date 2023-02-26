const convertBtn = document.getElementById('convert-el')
const fileNameElement = document.getElementById('input-el')
const popup = document.getElementById('myPopup')
let fileName = null
const loadFile = () => {
    fileName = fileNameElement.value.slice(12)

    console.log(fileName)
}

const convertFile = () => {
    popup.classList.toggle('hidden')
    fetch(`./${fileName}`)
        .then((response) => response.text())
        .then((csvString) => {
            const newCsvString = csvString.replace(csvString.split('\n')[0], '')
            let rows = newCsvString.split('\n')
            let headers = rows[0].split(',')

            let data = []
            for (let i = 2; i < rows.length; i++) {
                let row = rows[i].split(',')
                let obj = {}
                for (let j = 0; j < headers.length; j++) {
                    const ticker = row[2]
                    const removeText = (obj[headers[j]] = row[j])
                    const solVolume = row[7]
                    const tradeCount = row[9]
                    const volumeUSDT = row[8]
                    const newArray = row.filter((elem) => {
                        return (
                            elem != removeText &&
                            elem != ticker &&
                            elem != solVolume &&
                            elem != tradeCount &&
                            elem != volumeUSDT
                        )
                    })
                    newArray.push(parseInt(volumeUSDT))
                    newArray.push(parseInt(volumeUSDT))
                    data.push(newArray.join(','))
                }
            }

            data.reverse()
            data.join()
            let final = ''
            data.forEach((elem) => {
                final += elem + '\n'
            })
            final = final.replace(
                final.split('\n')[0],
                'Date,Open,High,Low,Close,Adj Close,Volume'
            )
            console.log(final)
            const blob = new Blob([final], { type: 'text/csv' })
            const url = URL.createObjectURL(blob)

            const link = document.createElement('a')
            link.download = `${fileName
                .replace('Binance', '')
                .replace('_', '')
                .replace('_d', '')}`
            link.href = url
            link.click()
        })
}

const convert = () => {
    if (fileName) {
        const arr = fileName.split('.')
        const isCsvFile = arr.find((elem) => elem === 'csv')
        if (isCsvFile) {
            convertFile()
        } else {
            popup.classList.toggle('show')
        }
    } else {
        popup.classList.toggle('show')
    }
}

convertBtn.addEventListener('click', convert)
