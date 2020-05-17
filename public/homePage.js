'use strict';

const logoutBtn = new LogoutButton();

logoutBtn.action = f => ApiConnector.logout(function(response){
    if(response.success) {
        location.reload();
    }
});

ApiConnector.current(function(response){
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

let ratesBoard = new RatesBoard();

setInterval(function(){ApiConnector.getStocks(function(response){
    if (response.success) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
    }
});}(), 60000);

let moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = data => ApiConnector.addMoney(data, function(response){
    if (!response.success) {
        moneyManager.setMessage(true, response.data);
    } else {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(false, "Успешное добавление средств");
    }
});

moneyManager.conversionMoneyCallback = data => ApiConnector.convertMoney(data, function(response){
    if (!response.success) {
        moneyManager.setMessage(true, response.data);
    } else {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(false, "Успешный перевод средств");
    }
});

moneyManager.sendMoneyCallback = data => ApiConnector.transferMoney(data, function(response){
    if (!response.success) {
        console.log(response);
        moneyManager.setMessage(true, response.data);
    } else {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(false, "Успешная отправка средств");
    }
});

let favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(function(response){
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
}); 

favoritesWidget.addUserCallback = f => ApiConnector.addUserToFavorites(f,function(response){
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        favoritesWidget.setMessage(false, "Успешное добавление в избранные");
    } else {
        favoritesWidget.setMessage(true, response.data);
    }
});

favoritesWidget.removeUserCallback = f => ApiConnector.removeUserFromFavorites(f,function(response){
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        favoritesWidget.setMessage(false, "Успешное удаление из избранные");
    } else {
        favoritesWidget.setMessage(true, response.data);
    }
});
