const imageSelection = document.querySelector('.images-section')
const loadingSpinner = document.querySelector('.loading-spinner')

loadingSpinner.style.display = 'none'

async function getImages() {
    loadingSpinner.style.display = 'block'

    try {
        const response = await fetch('http://localhost:3000/api/images/generations', {
            model: "dall-e-2",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: userInput.value,
                n: 2,
                size: "1024x1024"
            })

        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()
        data?.data.forEach(imageObject => {
            appendImage(imageObject.url)
        })

    } catch (error) {
        console.error(error)
    } finally {
        loadingSpinner.style.display = 'none'
    }
}

const appendImage = (imageUrl) => {
    const imageContainer = document.createElement("div")
    imageContainer.classList.add("image-container")
    const imageElement = document.createElement("img")
    imageElement.setAttribute("src", imageUrl)
    imageContainer.append(imageElement)
    imageSelection.append(imageContainer)
}

document.addEventListener("DOMContentLoaded", function () {
    const sendButton = document.getElementById("sendButton");
    const userInput = document.getElementById("userInput");

    sendButton.addEventListener("click", getImages)

    userInput.addEventListener("keydown", function (event) {
        if (event.key === 'Enter') {
            getImages()
        }
    })
})