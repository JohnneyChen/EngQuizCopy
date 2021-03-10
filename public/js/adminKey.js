const adminKeyInput = document.querySelector('#adminKeyInput')
const adminToggle = document.querySelector('#toggleAdmin')

adminToggle.addEventListener('click', function () {
    adminKeyInput.classList.toggle('adminKeyInput')
})