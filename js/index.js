$(function() {
    var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
    var nebpay = new NebPay();

    var dappAddress = "n1wRKDUxjFEq4DxyBpWEWyFQ42zKYCDpu6b";
    var txHash = "e47803c8e5dae1fd0ceeec5ddd2df3fc09648546d781f80289c6db96323c5087";
	
    $("#savebutton").click(function() {
        var articleTitle = $("#articleTitle").val();
        var articleContent = $("#articleContent").val();

        if (articleTitle == "") {
            alert("请输入文章标题。");
            return;
        }
        if (articleContent == "") {
            alert("请输入文章内容。");
            return;
        }
		
		articleContent= articleContent.replace(/\n/g,"<br>"); 
		
		/*
		if (articleContent.length < 5) {
			alert("文章内容太短，请输入50个字以上的文章。");
            return;
		}
		*/
		
        var to = dappAddress;
        var value = "0";
        var callFunction = "save";
        var callArgs = "[\"" + articleTitle + "\",\"" + articleContent + "\"]";
        nebpay.call(to, value, callFunction, callArgs, {
            listener: function(resp) {
                console.log(JSON.stringify(resp));
				alert("文章发表成功");
            }
        });
    });
	
	loadArticle();


});

function loadArticle(){
    var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
    var nebpay = new NebPay();

    var dappAddress = "n1wRKDUxjFEq4DxyBpWEWyFQ42zKYCDpu6b";
    var txHash = "e47803c8e5dae1fd0ceeec5ddd2df3fc09648546d781f80289c6db96323c5087";

        var to = dappAddress;
        var value = "0";
        var callFunction = "get";
        var callArgs = "[]";
        nebpay.simulateCall(to, value, callFunction, callArgs, {
            listener: function(resp) {
                //console.log(JSON.stringify(resp.result));
                var myArr = JSON.parse(resp.result);

                var tempStr = "";

                for (var i = 0; i < myArr.length; i++) {
                    if (i % 2 == 0) {
                        tempStr += '<div class="panel-body"> ';
                    } else {
                        tempStr += '<div class="panel-footer">';
                    }
					
					
					tempStr += '<h2>';
					tempStr += myArr[i].articleTitle;
					
					tempStr += '</h2>';
					tempStr += '<small><cite>' + '作者：' + myArr[i].author + '</cite></small>';
					tempStr += '<p><br>';
					tempStr += myArr[i].articleContent;
					tempStr += '</p>';
					tempStr += '<p>';
					if(myArr[i].payUserType == -1){
						tempStr += '<a class="btn" href="#" id="pay" onclick="payNas(';
						tempStr += myArr[i].index;
						tempStr += ')">支付 0.1NAS 阅读(一次付费，终生免费)</a>';
					}else if(myArr[i].payUserType == 1){
						tempStr += '<a class="btn"  id="pay" >你是原作者，不需要订阅 </a>';
					}else if(myArr[i].payUserType == 2){
						tempStr += '<a class="btn"  id="pay" >你已经订阅过，不需要再次订阅 </a>';
					}
					
					tempStr += '</p> </div> ';
                }
                console.log(tempStr);
                $("#searchresult").html(tempStr);
            }
        });
}

function payNas(index){
	var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
    var nebpay = new NebPay();

    var dappAddress = "n1wRKDUxjFEq4DxyBpWEWyFQ42zKYCDpu6b";
    var txHash = "e47803c8e5dae1fd0ceeec5ddd2df3fc09648546d781f80289c6db96323c5087";

        var to = dappAddress;
        var value = "0.1";
        var callFunction = "payNas";
        var callArgs = "[\"" + index + "\"]";
        nebpay.call(to, value, callFunction, callArgs, {
            listener: function(resp) {
                console.log(JSON.stringify(resp.result));
            }
        });
}