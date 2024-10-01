// 确保在DOM加载完成后执行脚本
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    const API_KEY = "sk-vhrGidDNjGUvV186dDkVRFPx7p4T2ulJhhdnjzDVfaGmDaOP";
    const API_URL = "https://api.moonshot.cn/v1/chat/completions";

    // 获取DOM元素
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const voiceButton = document.getElementById('voiceButton');

    if (!chatMessages || !userInput || !sendButton || !voiceButton) {
        console.error('One or more required elements not found');
        return;
    }

    // 发送消息函数
    async function sendMessage() {
        console.log('sendMessage function called');
        const message = userInput.value.trim();
        if (message) {
            // 显示用户消息
            addMessage(message, 'user');
            userInput.value = '';

            try {
                // 调用Kimi API
                console.log('Sending request to API');
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${API_KEY}`
                    },
                    body: JSON.stringify({
                        model: "moonshot-v1-8k",
                        messages: [
                            {"role": "system", "content": "你是 Kimi，由 Moonshot AI 提供的人工智能助手，你更擅长中文和英文的对话。你会为用户提供安全，有帮助，准确的回答。同时，你会拒绝一切涉及恐怖主义，种族歧视，黄色暴力等问题的回答。Moonshot AI 为专有名词，不可翻译成其他语言。"},
                            {"role": "user", "content": message}
                        ],
                        temperature: 0.3,
                    })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('API response:', data);
                const aiReply = data.choices[0].message.content;
                addMessage(aiReply, 'ai');
            } catch (error) {
                console.error('Error:', error);
                addMessage('抱歉,出现了一些错误。请稍后再试。', 'ai');
            }
        }
    }

    // 添加以下代码来处理微信QR码图片
    const wechatIcon = document.querySelector('.wechat-icon');
    const wechatQR = document.querySelector('.wechat-qr');

    wechatQR.addEventListener('error', function() {
        console.error('WeChat QR image failed to load');
        this.style.display = 'none';
    });

    wechatIcon.addEventListener('mouseenter', function() {
        wechatQR.style.display = 'block';
    });

    wechatIcon.addEventListener('mouseleave', function() {
        wechatQR.style.display = 'none';
    });

    // 添加消息到聊天界面
    function addMessage(text, sender) {
        console.log(`Adding ${sender} message: ${text}`);
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'ai-message');
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // 事件监听器
    sendButton.addEventListener('click', sendMessage);
    console.log('Click event listener added to send button');

    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    console.log('Keypress event listener added to user input');

    voiceButton.addEventListener('click', function() {
        alert('语音输入功能正在开发中...');
    });

    // 初始欢迎消息
    addMessage('您好!我是0xLucifer AI助手。有什么我可以帮助您的吗?', 'ai');

    // 在现有的 DOMContentLoaded 事件监听器中添加以下代码
    const tiktokIcon = document.querySelector('.tiktok-icon');
    const tiktokQR = document.querySelector('.tiktok-qr');

    tiktokQR.addEventListener('error', function() {
        console.error('TikTok QR image failed to load');
        this.style.display = 'none';
    });

    tiktokIcon.addEventListener('mouseenter', function() {
        tiktokQR.style.display = 'block';
    });

    tiktokIcon.addEventListener('mouseleave', function() {
        tiktokQR.style.display = 'none';
    });
});