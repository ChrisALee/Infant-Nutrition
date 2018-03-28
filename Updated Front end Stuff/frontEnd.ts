function main(): void {

    window.onclick = function(event: MouseEvent):void{
        let elmt = event.target;
        let num:Number = parseInt(elmt.id);
        if(0 <= num && num <= 6){
            changeInfo(num);
        }
        else if(elmt.id == "customize"){
            window.location.href = "LoginSignUp.html";
        }
        else if(elmt.id == "newUser"){
            createAccount();
        }
        else if(elmt.id == "returningUser"){
            signIn();
        }
    }

    function changeInfo(num: Number): void{
        
        let selectedStage = document.getElementById(""+num+"");
        let info = document.getElementById(""+num+"0");
        let stageName = document.getElementById("stageName");
        let stageInfo = document.getElementById("stageInfo");

        stageInfo.style.visibility = "visible";

        if(num != 0){
            stageName.innerHTML = selectedStage.innerHTML;
            stageInfo.style.width = "65%";
            stageInfo.style.marginLeft = "15%"
        } else{
            stageName.innerHTML = "";
            stageInfo.style.width = "90%";
            stageInfo.style.marginLeft = "2.5%"
            
        }
        stageInfo.innerHTML = info.innerHTML;
        
        if (stageInfo.innerHTML == ""){
            stageInfo.style.visibility = "hidden";
        }

    }

    function createAccount(): void{
        let firstName: String = document.getElementById("firstName").innerText;
        let lastName: String = document.getElementById("lastName").innerText;
        let email: String = document.getElementById("email").innerText;
        let password: String = document.getElementById("password").innerText;
        // create account in database here


        //then signIn
        login(email, password);
    }

    function signIn(): void{
        let email: String = document.getElementById("loginEmail").innerText;
        let password: String = document.getElementById("loginPass").innerText;
        //check creditials in database here
        window.location.href = "LoginSignUp.html";
    }

    function login(email:String, pass:String): void{
        
        //check creditials in database here
        window.location.href = "FeedingGuidelines.html";
    }
}

main();
