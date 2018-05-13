$(function() {
    var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
    var nebpay = new NebPay();

    var dappAddress = "n1wRKDUxjFEq4DxyBpWEWyFQ42zKYCDpu6b";
    var txHash = "e47803c8e5dae1fd0ceeec5ddd2df3fc09648546d781f80289c6db96323c5087";
	
    $("#withdrawbutton").click(function() {
        var nasAddress = $("#nasAddress").val();
        var nasAmount = $("#nasAmount").val();

        if (nasAddress == "") {
            alert("请输入NAS收款地址。");
            return;
        }
        if (nasAmount == "") {
            alert("请输入NAS数量。");
            return;
        }
		
		
        var to = dappAddress;
        var value = "0";
        var callFunction = "withdraw";
        var callArgs = "[\"" + nasAddress + "\",\"" + nasAmount + "\"]";
        nebpay.call(to, value, callFunction, callArgs, {
            listener: function(resp) {
                console.log(JSON.stringify(resp));
				alert("请到钱包查询提款是否到账");
            }
        });
    });


});
