document.addEventListener('DOMContentLoaded', ()=>{
    let slides = document.querySelector('.slides')
    let dots = document.querySelector('.dots')
    const prev = document.querySelector('.prev')
    const next = document.querySelector('.next')
    let slideCount = document.querySelectorAll('.slide').length
    let currentSlide = 0

    for(let i=0; i<slideCount; i++){
        let div = document.createElement('div')
        if (i==0){
            div.classList.add('active')
        }
        div.classList.add('dot')
        div.setAttribute('data-index', i)
        dots.append(div)
    }

    let dot = document.querySelectorAll('.dot')

    function updateslider (index) {
        if (index >= slideCount){
            currentSlide = 0
        }
        else if (index < 0){
            currentSlide = slideCount - 1
        }
        else{
            currentSlide = index
        }
        slides.style.transform = `translateX(${-currentSlide * 100}%)`;
        dot.forEach(dot => dot.classList.remove('active'));
        dot[currentSlide].classList.add('active');
    }

    let autoplayID = setInterval(()=>{
        updateslider(currentSlide + 1) 
    },2000)

    function restartAutoplay(){
        clearInterval(autoplayID)
        autoplayID = setInterval(()=>{
            updateslider(currentSlide + 1) 
        },2000)
    }

    prev.onclick = () => {
        updateslider(currentSlide - 1)
        restartAutoplay()
    }

    next.onclick = () => {
        updateslider(currentSlide + 1)
        restartAutoplay()
    }

    dot.forEach(currentDot => {
        currentDot.addEventListener('click', ()=>{
            let index = parseInt(currentDot.getAttribute('data-index'))
            updateslider(index)
            restartAutoplay()
        })
    })
})