const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub")
    .build();

const messagesDiv = document.getElementById("messages");
const sendButton = document.getElementById("sendButton");
const messageInput = document.getElementById("messageInput");
const usernameInput = document.getElementById("username");

// Recibir mensajes del servidor
connection.on("ReceiveMessage", (user, message) => {
    const msg = document.createElement("div");
    msg.textContent = `${user}: ${message}`;
    messagesDiv.appendChild(msg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

// Enviar mensaje al servidor
sendButton.addEventListener("click", async () => {
    const user = usernameInput.value;
    const message = messageInput.value;

    if (user && message) {
        await connection.invoke("SendMessage", user, message);
        messageInput.value = "";
    } else {
        alert("Por favor, ingresa un nombre y un mensaje.");
    }
});

// Iniciar conexión
connection.start().catch(err => console.error(err.toString()));
