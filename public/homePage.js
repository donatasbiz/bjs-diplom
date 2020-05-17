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
        moneyManager.setMessage(false, "РЈСЃРїРµС€РЅРѕРµ РґРѕР±Р°РІР»РµРЅРёРµ СЃСЂРµРґСЃС‚РІ");
    }
});

moneyManager.conversionMoneyCallback = data => ApiConnector.convertMoney(data, function(response){
    if (!response.success) {
        moneyManager.setMessage(true, response.data);
    } else {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(false, "РЈСЃРїРµС€РЅС‹Р№ РїРµСЂРµРІРѕРґ СЃСЂРµРґСЃС‚РІ");
    }
});

moneyManager.sendMoneyCallback = data => ApiConnector.transferMoney(data, function(response){
    if (!response.success) {
        console.log(response);
        moneyManager.setMessage(true, response.data);
    } else {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(false, "РЈСЃРїРµС€РЅР°СЏ РѕС‚РїСЂР°РІРєР° СЃСЂРµРґСЃС‚РІ");
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
        favoritesWidget.setMessage(false, "РЈСЃРїРµС€РЅРѕРµ РґРѕР±Р°РІР»РµРЅРёРµ РІ РёР·Р±СЂР°РЅРЅС‹Рµ");
    } else {
        favoritesWidget.setMessage(true, response.data);
    }
});

favoritesWidget.removeUserCallback = f => ApiConnector.removeUserFromFavorites(f,function(response){
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        favoritesWidget.setMessage(false, "РЈСЃРїРµС€РЅРѕРµ СѓРґР°Р»РµРЅРёРµ РёР· РёР·Р±СЂР°РЅРЅС‹Рµ");
    } else {
        favoritesWidget.setMessage(true, response.data);
    }
});
