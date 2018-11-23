
const hello = document.getElementById('hello')
const hi = document.getElementById('hi')
let left1 = 0
let left2 = 0

const myAnimation = (milliseconds, callback) => {
    setTimeout(callback, milliseconds)
}

const step = () => {
    if (left1 < 1000) {
        left1 += 10
    } else {
        left1 = 0
    }
    hello.style.left = left1 + 'px'
    requestAnimationFrame(step)
}


const step2 = () => {
    if (left2 < 1000) {
        left2 += 10
    } else {
        left2 = 0
    }
    hi.style.left = left2 + 'px'
    myAnimation(16.67, step2)
}

step()

step2()