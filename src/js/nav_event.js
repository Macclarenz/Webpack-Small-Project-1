const navHamburger = document.querySelector('.nav-hamburger-btn')
const navList = document.querySelector('.nav-container')

navHamburger.addEventListener('click', () => {
    return navList.classList.toggle('nav-open')
})

navHamburger.addEventListener('focusout', () => {
    return navList.classList.toggle('nav-open')
})