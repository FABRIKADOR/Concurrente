const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub")
    .build();

const chatWindow = document.getElementById("chat-window");
const sendButton = document.getElementById("sendButton");
const messageInput = document.getElementById("messageInput");
const usernameInput = document.getElementById("username");

// Recibir mensajes del servidor
connection.on("ReceiveMessage", (user, message) => {
    const messageDiv = document.createElement("div");
    if (user === usernameInput.value) {
        messageDiv.className = "user-message";
    } else {
        messageDiv.className = "other-message";
    }
    messageDiv.textContent = `${user}: ${message}`;
    chatWindow.appendChild(messageDiv);

    // Auto-scroll al último mensaje
    chatWindow.scrollTop = chatWindow.scrollHeight;
});

// Enviar mensaje al servidor
const sendMessage = async () => {
    const user = usernameInput.value.trim();
    const message = messageInput.value.trim();

    if (!user || !message) {
        alert("Por favor, ingresa un nombre y un mensaje.");
        return;
    }

    await connection.invoke("SendMessage", user, message);
    messageInput.value = ""; // Limpiar campo de entrada
};

// Manejar clic en el botón "Enviar"
sendButton.addEventListener("click", sendMessage);

// Manejar la tecla "Enter" en el campo de mensaje
messageInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});

// Iniciar conexión
connection.start().catch(err => console.error(err.toString()));
