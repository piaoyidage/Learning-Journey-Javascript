
const hello = document.getElementById('hello')
let left = 0

const step = () => {
    left += 10
    if (left < 1000) {
        hello.style.left = left + 'px'
        requestAnimationFrame(step)
    }
}

step()