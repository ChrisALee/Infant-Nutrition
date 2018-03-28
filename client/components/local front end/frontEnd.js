function main() {
    window.onclick = function (event) {
        var elmt = event.target;
        var num = parseInt(elmt.id);
        if (0 <= num && num <= 6) {
            changeInfo(num);
        }
        else if (elmt.id == "customize") {
            window.location.href = "LoginSignUp.html";
        }
        else if (elmt.id == "newUser") {
            createAccount();
        }
        else if (elmt.id == "returningUser") {
            signIn();
        }
    };
    function changeInfo(num) {
        var selectedStage = document.getElementById("" + num + "");
        var info = document.getElementById("" + num + "0");
        var stageName = document.getElementById("stageName");
        var stageInfo = document.getElementById("stageInfo");
        stageInfo.style.visibility = "visible";
        if (num != 0) {
            stageName.innerHTML = selectedStage.innerHTML;
            stageInfo.style.width = "65%";
            stageInfo.style.marginLeft = "15%";
        }
        else {
            stageName.innerHTML = "";
            stageInfo.style.width = "90%";
            stageInfo.style.marginLeft = "2.5%";
        }
        stageInfo.innerHTML = info.innerHTML;
        if (stageInfo.innerHTML == "") {
            stageInfo.style.visibility = "hidden";
        }
    }
    function createAccount() {
        var firstName = document.getElementById("firstName").innerText;
        var lastName = document.getElementById("lastName").innerText;
        var email = document.getElementById("email").innerText;
        var password = document.getElementById("password").innerText;
        // create account in database here
        //then signIn
        login(email, password);
    }
    function signIn() {
        var email = document.getElementById("loginEmail").innerText;
        var password = document.getElementById("loginPass").innerText;
        //check creditials in database here
        window.location.href = "LoginSignUp.html";
    }
    function login(email, pass) {
        //check creditials in database here
        window.location.href = "FeedingGuidelines.html";
    }
}
main();
