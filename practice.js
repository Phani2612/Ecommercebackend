const Inputbox = document.querySelector("input")

let counter = 0

var timer



Inputbox.addEventListener("keypress" , function()
{
    clearInterval(timer)

    timer = setTimeout(function()
    {
        counter++

        console.log(counter)

        console.log("Got response from the server")
    },3000)
})


