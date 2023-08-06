
let copyText = document.querySelector('.input-group');

copyText.querySelectorAll("button").addEventListner("click", function(){
    let input = copyText.querySelector("input.text");
    input.select();

    document.execCommand("copy");
    copyText.classList.add("active")
    window.getSelection().removeAllRanges()
    setTimeout(function(){
        copyText.classList.remove("active")
    }, 2500)
})