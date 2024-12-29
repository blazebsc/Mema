document.addEventListener('DOMContentLoaded', () => {
    console.log('Welcome to Mema!');
    
    const ctaBtn = document.querySelector('.cta-btn');
    ctaBtn.addEventListener('click', () => {
      alert('Thank you for exploring Mema!');
    });

    const messageForm = document.querySelector('.message-form');
    const messageInput = document.querySelector('.message-form input');
    const messagesContainer = document.querySelector('.messages');

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const messageText = messageInput.value.trim();
        if (messageText !== '') {
            addMessage('You', messageText);
            messageInput.value = '';
        }
    });

    function addMessage(username, text) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        
        const usernameElement = document.createElement('span');
        usernameElement.classList.add('username');
        usernameElement.textContent = `${username}: `;
        
        const textElement = document.createElement('span');
        textElement.classList.add('text');
        textElement.textContent = text;
        
        messageElement.appendChild(usernameElement);
        messageElement.appendChild(textElement);
        messagesContainer.appendChild(messageElement);
        
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
});