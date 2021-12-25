let adrressContractMain = "0x67d2C7B013860EE3f6056Ba1dB41cB76D365cd59";
var adrressContractRopsten = "0xd3C96A4588AE35D72e06d2E46071b274F4af14f9";
var addressContractIOTA = "0xAfC8Bc679f8e8c34643b8C9786dE3A8d001E7eaC";

var contractController;
var day=["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"];
var coffee = ["Эспрессо","Американо","Каппучино","Латте","Раф"];
var contract_allcoffee;

function save() {
    var addWallet = $('#addWallet').val();
    var addDay = $('#addDay').val();
    var addCoffee = $('#addCoffee').val();
    console.log("addDay", addDay);
    console.log("addCoffee", addCoffee);
    contractController.setUser(addWallet, addDay, addCoffee).then((err, data) => {
        console.log("data", data);
    }).catch(function (error) {
        alert(error.message);
    });
}

function readUser() {
    var readWallet = $('#readWallet').val();
    $('#showResult').hide();
    contractController.getUser(readWallet).then((data) => {
        console.log("data", data);
        var contract_day = Number(data._day)
        var contract_coffee = Number(data._coffee)
        contract_allcoffee = data._allcoffee;
        console.log("data._day", contract_day);
        console.log("data._coffee", contract_coffee);
        console.log("data._allcoffee", contract_allcoffee);
        $('#showResult').show();
        $('#showDay').html(contract_day);
        $('#showCoffee').html(contract_coffee);
        $('#targetDay').html(day[contract_day]);
        $('#targetCoffee').html(coffee[contract_coffee]);
        generate_table();
    }).catch(function (error) {
        alert(error.message);
    });
}
function show(){
    let showday = $('#addDay').val();
    let showcoffee = $('#addCoffee').val();
        $('#showDay').html(showday);
        $('#showCoffee').html(showcoffee);
}

function startApp() {
    $('#showResult').hide();
    $('#debug').hide();
}

function clearusertable(){
    var readWallet = $('#readWallet').val();
    contractController.clearUserTable(readWallet).then((data) => {
        console.log("data", data);
    }).catch(function (error) {
        alert(error.message);
    });
}

function clearalltable(){
    contractController.clearAllTable().then((data) => {
        console.log("data", data);
    }).catch(function (error) {
        alert(error.message);
    });
}

function getalltable(){
    contractController.getAllTable().then((data) => {
        console.log("data", data);
        contract_allcoffee = data;
        console.log("contract_allcoffee", contract_allcoffee);
        generate_table();
    }).catch(function (error) {
        alert(error.message);
    });
}
  

window.addEventListener('load', async function () {
    window.ethereum.enable().then(provider = new ethers.providers.Web3Provider(window.ethereum));
    signer = provider.getSigner();
    current_network = ethereum.networkVersion;
    console.log("current_network", current_network);

    const accounts = await ethereum.request({ method: 'eth_accounts' });
    wallet = accounts[0];
    console.log("wallet", wallet);
    $('#wallet').html(wallet);

    initContracts();
})

function initContracts() {
    var addressContractController = {
        "1": adrressContractMain,
        "3": adrressContractRopsten,
        "1074": addressContractIOTA
    }
    $.ajax({
        url: 'abi.json',
        dataType: 'json',
        success: function (data) {
            var abiContract = data;
            var contractAddress = addressContractController[current_network];
            contractController = new ethers.Contract(contractAddress, abiContract, signer);
            startApp();
        }
    });
}

////////////////TABLE////////////////
function generate_table() {
    let day=["Таблица","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"];
    // get the reference for the body
    var body = document.getElementById("tablearr");
    // creates a <table> element and a <tbody> element
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
    console.log(body.childNodes);
    if(body.hasChildNodes()==true){
        body.removeChild( body.childNodes[0] );
    }
  
    // creating all cells
      // creates a table row
      var row = document.createElement("tr");
  
      for (var j = 0; j < 8; j++) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        var cell = document.createElement("td");
        var cellText = document.createTextNode(day[j]);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
  
      // add the row to the end of the table body
      tblBody.appendChild(row);

    for (var i = 0; i < 5; i++) {
        // creates a table row
        var row = document.createElement("tr");
        var cell = document.createElement("td");
        var cellText = document.createTextNode(coffee[i]);
        cell.appendChild(cellText);
        row.appendChild(cell);
        for (var j = 0; j < 7; j++) {
          // Create a <td> element and a text node, make the text
          // node the contents of the <td>, and put the <td> at
          // the end of the table row
          var cell = document.createElement("td");
          var cellText = document.createTextNode(contract_allcoffee[i][j]);
          cell.appendChild(cellText);
          row.appendChild(cell);
        }
    
        // add the row to the end of the table body
        tblBody.appendChild(row);
      }
  
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    body.append(tbl);
    // sets the border attribute of tbl to 2;
    tbl.setAttribute("border", "2");
  }
