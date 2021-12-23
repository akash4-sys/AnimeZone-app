burger = document.querySelector('.burger')
navlist = document.querySelector('.nav-list')

burger.addEventListener('click', ()=>{

    navlist.classList.toggle('invisible');

});

top = document.querySelector("#tothetop");

top.addEventListener("click", function() {

    // window.scrollTo(0,0);
    window.scrollTo({

        top:0,
        left:0,
        behaviour:"smooth"
    });

});