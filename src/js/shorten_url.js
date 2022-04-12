import { ResultElement } from "./shorten_create_elements"

const shortenInputText = document.querySelector('#shortenInputText')
const shortSubmitBtn = document.querySelector('#shortenSubmitBtn')
const shortenForm = document.querySelector('#shortenForm')

shortenForm.addEventListener('submit', e => {
    e.preventDefault()
    const urlToShorten = shortenInputText?.value
    if (!urlToShorten) return errorMessage('Please add a link')
    return shortenIt(urlToShorten)
})

shortenInputText.addEventListener('input', e => {
    if (shortenInputText.classList.contains('shorten-text-error')) {
        shortenInputText.classList.remove('shorten-text-error')
        document.querySelector('.shorten-message').innerText = ''
    }

    return
})

async function shortenIt(input) {
    const url = 'https://api.shrtco.de/v2/'
    const data = 'shorten?url='+input
    const endpoint = url + data

    // GET/POST: https://api.shrtco.de/v2/shorten?url=example.org/very/long/link.html

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            cache: 'no-cache'  
        })

        if (response.ok) {
            const jsonResponse = await response.json()
            
            const Result =  new ResultElement(jsonResponse)
            const create = await Result.createElement()
            return await Result.appendElement(create)
        } else throw new Error('Invalid input. Please try again')
    } catch(err) {
        errorMessage(err.message)
    } finally {
        shortenInputText.value = ''
    }
}

function errorMessage(message) {
    const shortenMessage = document.querySelector('.shorten-message')
    shortenInputText.classList.add('shorten-text-error')
    return shortenMessage.innerText = message
}


