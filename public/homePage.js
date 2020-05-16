'use strict';

 const logoutBtn = new LogoutButton();

 logoutBtn.action = f => ApiConnector.logout(function(e){
    if(e.success === true) {
        location.reload();
    }
});

 ApiConnector.current(function(e){
    if (e.success === true) {
        ProfileWidget.showProfile(e.data);
    }
});

 let RB = new RatesBoard();

 setInterval(function(){ApiConnector.getStocks(function(e){
    if (e.success === true) {
        RB.clearTable();
        RB.fillTable(e.data);
    }
});}(), 60000);

 let MM = new MoneyManager();

 MM.addMoneyCallback = data => ApiConnector.addMoney(data, function(e){
    if (e.success === false) {
        MM.setMessage(true, "Ошибка");
    } else {
        ProfileWidget.showProfile(e.data);
        MM.setMessage(false, "Успешно");
    }
});

 MM.conversionMoneyCallback = data => ApiConnector.convertMoney(data, function(e){
    if (e.success === false) {
        MM.setMessage(true, "Ошибка");
    } else {
        ProfileWidget.showProfile(e.data);
        MM.setMessage(false, "Успешно");
    }
});

 MM.sendMoneyCallback = data => ApiConnector.transferMoney(data, function(e){
    if (e.success === false) {
        MM.setMessage(true, "Ошибка");
    } else {
        ProfileWidget.showProfile(e.data);
        MM.setMessage(false, "Успешно");
    }
});

 let FW = new FavoritesWidget();

 ApiConnector.getFavorites(function(e){
    if (e.success === true) {
        FW.clearTable();
        FW.fillTable(e.data);
        MM.updateUsersList(e.data);
    }
}); 

 FW.addUserCallback = f => ApiConnector.addUserToFavorites(f,function(e){
    if (e.success === true) {
        FW.clearTable();
        FW.fillTable(e.data);
        MM.updateUsersList(e.data);
        FW.setMessage(false, "Успешно");
    } else {
        FW.setMessage(true, "Ошибка");
    }
});

 FW.removeUserCallback = f => ApiConnector.removeUserFromFavorites(f,function(e){
    if (e.success === true) {
        FW.clearTable();
        FW.fillTable(e.data);
        MM.updateUsersList(e.data);
        FW.setMessage(false, "Успешно");
    } else {
        FW.setMessage(true, "Ошибка");
    }
});
