function getSelectetModel() {
    var selectedModel = document.querySelector('input[name="model"]:checked');
    var model = 'gpt-3.5-turbo-1106'
    if (selectedModel.value == '4') {
        model = 'gpt-4-0613'
    }
    return model
}

function getLanguage() {
    var language = ''
    if (document.getElementById('translate').checked) {
        language = document.getElementById('auswahlliste').value
    }
    return language
}

async function main(userInput) {
    console.log('main is called')
    try {

        const maxTokens = parseInt(document.getElementById('tokens').value)
        const temperature = parseFloat(document.getElementById('slider').value)
        const model = getSelectetModel()
        const language = getLanguage()
        console.log(model)

        const messages = [
            { "role": "system", "content": `You are a helpful assistant.` },
            { "role": "user", "content": userInput }
        ]
        if (language) {
            const messages = [
                { "role": "system", "content": `Translate the quser message to ${language}` },
                { "role": "user", "content": userInput }
            ]
        }

        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'model': model,
                'messages': messages,
                'max_tokens': maxTokens,
                'temperature': temperature
            }),
        })

        if (!response.ok) {
            console.log('response not ok')
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const completion = await response.json()
        console.log(completion, userInput)
        if (completion.choices && completion.choices.length > 0) {
            const completionText = completion.choices[0].message.content;
            return completionText;
        } else {
            throw new Error('Invalid API response: no choices');
        }

    } catch (error) {
        console.error(error)
        throw error
    }
}

function sendMessage() {
    try {
        var userInput = document.getElementById("userInput").value
        if (userInput.trim() !== "") {
            var response = document.getElementById('assistantResponse')

            main(userInput)
                .then(answer => {
                    response.textContent = answer
                    console.log(answer);
                })
                .catch(error => console.error("Error in sendMessage:", error))
        }
    } catch (error) {
        console.error("Error in sendMessage:", error)
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const generateButton = document.getElementById('generate')
    generateButton.addEventListener('click', sendMessage)
})