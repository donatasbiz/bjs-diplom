'use strict';
const userForm = new UserForm();
userForm.loginFormCallback = data => ApiConnector.login(data, function(e) {
    if (e.success === true) {
        location.reload();
    } else {
        userForm.setLoginErrorMessage("Ошибка входа");
    }
});
userForm.registerFormCallback = data => ApiConnector.register(data, function(e) {
    if (e.success === true) {
        location.reload();
    } else {
        userForm.setRegisterErrorMessage("Пользователь уже существует");
    }
});
