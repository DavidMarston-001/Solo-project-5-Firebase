import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://database-project-2fd82-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const messagesInDB = ref(database, "messages")

const commentEl = document.getElementById("comment");
const button = document.getElementById("publishBtn");
const messagesList = document.getElementById("interactionsList");

onValue(messagesInDB, function(snapshot) {
    let messagesArray = Object.values(snapshot.val())
    
    clearMessagesList()
    
    for(let i = 0; i < messagesArray.length; i++) {
        let storedInDBMessages = messagesArray[i]
        addComments(storedInDBMessages)
    }
});

function clearMessagesList() {
    messagesList.innerHTML = ""
}

button.addEventListener("click", function() {
    let inputComment = commentEl.value 
    push(messagesInDB, inputComment)
    
    clearInputField()

}); 

function clearInputField() {
    commentEl.value = ""
    fromEl.value = ""
    toEl.value = ""
}

function addComments(inputCommentValue) {
    messagesList.innerHTML += `
    <div class="union">
        <p>${inputCommentValue}</p>
    </div>
    `
}