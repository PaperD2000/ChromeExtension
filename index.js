let myLinks = []

const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

const linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"))

if (linksFromLocalStorage){
    myLinks = linksFromLocalStorage
    render(myLinks)
}

function render(links){
    let listItems = ""
    for (let i = 0; i < links.length; i++){
        listItems += `
            <li>
                <a href= "${links[i]}" target="_blank"> ${links[i]} </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLinks = []
    render(myLinks)
})

inputBtn.addEventListener("click", function(){
    myLinks.push(inputEl.value)
    inputEl.value = "" 
    localStorage.setItem("myLinks", JSON.stringify(myLinks))
    render(myLinks)
})

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
        myLinks.push(tabs[0].url)
        localStorage.setItem("myLinks", JSON.stringify(myLinks))
        render(myLinks)
    })
})
