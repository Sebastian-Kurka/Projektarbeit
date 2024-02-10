const chatHistory = []

function showLoadingAnimation(targetElement) {
    const loadingElement = document.createElement('div')
    loadingElement.className = 'loading-animation'
    targetElement.appendChild(loadingElement)

    const dots = ['Bot: .', 'Bot: ..', 'Bot: ...']
    let currentDot = 0

    function updateDots() {
        loadingElement.textContent = dots[currentDot]
        currentDot = (currentDot + 1) % dots.length
    }

    const dotInterval = setInterval(updateDots, 500)

    return {
        stop: function () {
            clearInterval(dotInterval)
            targetElement.removeChild(loadingElement)
        }
    }
}

async function main(userInput) {

    const chatBox = document.getElementById('chatBox')
    const loadingAnimation = showLoadingAnimation(chatBox)

    try {
        const messages = chatHistory.map(([role, content]) => ({ role, content }))
        messages.push({ role: 'user', content: userInput })

        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo-1106',
                messages: messages,
            }),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const completion = await response.json();
        const completionText = completion.choices[0].message.content

        chatHistory.push(['user', userInput])
        chatHistory.push(['assistant', completionText])

        loadingAnimation.stop()
        return completionText

    } catch (error) {
        console.error(error)
        throw error
    }
}


function sendMessage() {
    try {
        var userInput = document.getElementById("userInput").value
        if (userInput.trim() !== "") {
            var chatBox = document.getElementById("chatBox")

            var userMessage = document.createElement("div")
            userMessage.className = "message user-message"
            userMessage.textContent = "You: " + userInput
            chatBox.appendChild(userMessage)

            document.getElementById("userInput").value = ""

            main(userInput)
                .then(answer => {
                    var botMessage = document.createElement('div')
                    botMessage.className = "message bot-message"
                    botMessage.textContent = "Bot: " + answer
                    chatBox.appendChild(botMessage)
                })
                .catch(error => console.error("Error in sendMessage:", error))
        }
    } catch (error) {
        console.error("Error in sendMessage:", error)
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const sendButton = document.getElementById('sendButton')
    const userInput = document.getElementById('userInput')
    sendButton.addEventListener('click', sendMessage)
    userInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            sendMessage()
        }
    })
})