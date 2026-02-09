// 全局状态
let currentLoginMode = 'password'; // 'password' 或 'code'
let countdownTimer = null;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initTabSwitch();
    initVerificationCode();
    initFormValidation();
    initPasswordToggle();
    initCloseButton();
    initInputEffects();
});

// 初始化标签切换功能
function initTabSwitch() {
    const tabs = document.querySelectorAll('.tab');
    const slider = document.querySelector('.tab-slider');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有标签的激活状态
            tabs.forEach(t => t.classList.remove('active'));
            // 激活当前标签
            this.classList.add('active');

            // 移动滑块
            const tabIndex = parseInt(this.getAttribute('data-index'));
            const tabType = this.getAttribute('data-tab');
            moveSlider(slider, tabIndex);

            // 切换表单显示
            handleTabSwitch(tabType);
            currentLoginMode = tabType;
        });
    });
}

// 移动滑块到指定标签
function moveSlider(slider, index) {
    // 计算滑块位置
    // 第一个标签：0px，第二个标签：64px (标签宽度) + 70px (gap) = 134px
    const positions = [0, 134];
    const position = positions[index] || 0;

    // 动态获取标签宽度
    const tabs = document.querySelectorAll('.tab');
    if (tabs[index]) {
        const tabWidth = tabs[index].offsetWidth;
        slider.style.width = `${tabWidth}px`;
    }

    slider.style.transform = `translateX(${position}px)`;
}

// 处理标签切换
function handleTabSwitch(tabType) {
    const passwordGroup = document.querySelector('.password-group');
    const verificationGroup = document.querySelector('.verification-group');
    const formOptions = document.querySelector('.form-options');

    if (tabType === 'code') {
        // 验证码登录模式
        passwordGroup.classList.add('hide');
        formOptions.classList.add('hide');

        // 延迟显示验证码输入框，让动画更流畅
        setTimeout(() => {
            verificationGroup.style.display = 'block';
            setTimeout(() => {
                verificationGroup.classList.remove('hide');
            }, 10);
        }, 300);
    } else {
        // 密码登录模式
        verificationGroup.classList.add('hide');

        // 延迟显示密码输入框
        setTimeout(() => {
            passwordGroup.style.display = 'block';
            passwordGroup.classList.remove('hide');
            formOptions.style.display = 'flex';
            formOptions.classList.remove('hide');

            // 隐藏验证码输入框
            setTimeout(() => {
                verificationGroup.style.display = 'none';
            }, 300);
        }, 300);
    }
}

// 初始化验证码发送功能
function initVerificationCode() {
    const sendCodeBtn = document.getElementById('sendCodeBtn');
    const phoneInput = document.getElementById('phoneInput');

    sendCodeBtn.addEventListener('click', function() {
        // 验证手机号
        const phone = phoneInput.value.trim();
        if (!phone) {
            showMessage('请先输入手机号');
            phoneInput.focus();
            return;
        }

        if (!/^1[3-9]\d{9}$/.test(phone)) {
            showMessage('请输入正确的手机号');
            phoneInput.focus();
            return;
        }

        // 发送验证码
        sendVerificationCode(phone);
    });
}

// 发送验证码
function sendVerificationCode(phone) {
    const sendCodeBtn = document.getElementById('sendCodeBtn');
    const sendText = sendCodeBtn.querySelector('.send-text');
    const countdownText = sendCodeBtn.querySelector('.countdown-text');

    // 这里应该调用后端 API 发送验证码
    console.log('发送验证码到:', phone);
    showMessage('验证码已发送');

    // 开始倒计时
    let countdown = 60;
    sendCodeBtn.classList.add('disabled');
    sendText.style.display = 'none';
    countdownText.style.display = 'inline';
    countdownText.textContent = `${countdown}s`;

    countdownTimer = setInterval(() => {
        countdown--;
        countdownText.textContent = `${countdown}s`;

        if (countdown <= 0) {
            clearInterval(countdownTimer);
            sendCodeBtn.classList.remove('disabled');
            sendText.style.display = 'inline';
            countdownText.style.display = 'none';
        }
    }, 1000);
}

// 密码显示/隐藏切换
function initPasswordToggle() {
    const passwordToggle = document.querySelector('.password-toggle');
    if (passwordToggle) {
        passwordToggle.addEventListener('click', togglePassword);
    }
}

function togglePassword() {
    const passwordInput = document.getElementById('passwordInput');
    const passwordToggle = document.querySelector('.password-toggle');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordToggle.style.opacity = '0.5';
    } else {
        passwordInput.type = 'password';
        passwordToggle.style.opacity = '1';
    }
}

// 初始化表单验证
function initFormValidation() {
    const loginForm = document.querySelector('.login-form');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const phoneInput = document.getElementById('phoneInput');
        const phone = phoneInput.value.trim();

        // 验证手机号
        if (!phone) {
            showMessage('请输入手机号');
            phoneInput.focus();
            return false;
        }

        if (!/^1[3-9]\d{9}$/.test(phone)) {
            showMessage('请输入正确的手机号');
            phoneInput.focus();
            return false;
        }

        // 根据登录模式验证不同字段
        if (currentLoginMode === 'password') {
            // 验证密码
            const passwordInput = document.getElementById('passwordInput');
            const password = passwordInput.value;

            if (!password) {
                showMessage('请输入密码');
                passwordInput.focus();
                return false;
            }

            if (password.length < 6) {
                showMessage('密码长度不能少于6位');
                passwordInput.focus();
                return false;
            }

            // 提交密码登录
            console.log('密码登录：', {
                phone: phone,
                password: password,
                rememberPassword: document.querySelector('.checkbox').checked
            });
        } else {
            // 验证验证码
            const verificationInput = document.getElementById('verificationInput');
            const code = verificationInput.value.trim();

            if (!code) {
                showMessage('请输入验证码');
                verificationInput.focus();
                return false;
            }

            if (!/^\d{6}$/.test(code)) {
                showMessage('请输入6位数字验证码');
                verificationInput.focus();
                return false;
            }

            // 提交验证码登录
            console.log('验证码登录：', {
                phone: phone,
                code: code
            });
        }

        // 验证通过，显示成功消息
        showMessage('登录成功！', 'success');
        return true;
    });
}

// 初始化关闭按钮
function initCloseButton() {
    const closeButton = document.querySelector('.close-button');
    closeButton.addEventListener('click', function() {
        if (confirm('确定要关闭登录框吗？')) {
            // 清理倒计时
            if (countdownTimer) {
                clearInterval(countdownTimer);
            }
            window.history.back();
        }
    });
}

// 初始化输入框焦点效果
function initInputEffects() {
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transition = 'all 0.3s';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transition = '';
        });
    });
}

// 显示消息提示
function showMessage(message, type = 'error') {
    // 创建消息元素
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-toast ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 12px 24px;
        background: ${type === 'success' ? '#52c41a' : '#ff4d4f'};
        color: white;
        border-radius: 4px;
        font-size: 14px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        animation: messageSlideIn 0.3s ease-out;
    `;

    document.body.appendChild(messageDiv);

    // 3秒后自动移除
    setTimeout(() => {
        messageDiv.style.animation = 'messageSlideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 3000);
}

// 添加消息动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes messageSlideIn {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }

    @keyframes messageSlideOut {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);
