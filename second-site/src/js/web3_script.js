let adrressContractMain = "0x67d2C7B013860EE3f6056Ba1dB41cB76D365cd59";
var adrressContractRopsten = "0x0D758ea6B36C64a82Ea253bd87493C333FBC0218";
var addressContractIOTA = "0xAfC8Bc679f8e8c34643b8C9786dE3A8d001E7eaC";

var contractController;

function save() {
    var addWallet = $('#addWallet').val();
    var addDay = $('#addDay').val();
    var addCoffee = $('#addCoffee').val();
    console.log("addDay", addDay);
    console.log("addCoffee", addCoffee);
    contractController.setUser(addWallet, addDay, addCoffee).then((err, data) => {

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
        var contract_allcoffee = Array(data._allcoffee);
        let day=["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"];
        let coffee = ["Эспрессо","Американо","Каппучино","Латте","Раф"];
        console.log("data._day", contract_day);
        console.log("data._coffee", contract_coffee);
        console.log("data._allcoffee", contract_allcoffee);
        $('#showResult').show();
        $('#showDay').html(contract_day);
        $('#showCoffee').html(contract_coffee);
        $('#targetDay').html(day[contract_day]);
        $('#targetCoffee').html(coffee[contract_coffee]);
        $('#getallcoffee').html(contract_allcoffee)
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
