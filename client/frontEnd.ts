function main(): void {

    window.onclick = function(event: MouseEvent):void{
        let elmt = event.target;
        let num:Number = parseInt(elmt.id);
        if(0 <= num && num <= 6){
            changeInfo(num);
        }
    }

    function changeInfo(num: Number): void{
        
        let selectedStage = document.getElementById(""+num+"");
        let info = document.getElementById(""+num+"0");
        let stageName = document.getElementById("stageName");
        let stageInfo = document.getElementById("stageInfo");

        stageInfo.style.visibility = "visible";

        stageName.innerHTML = selectedStage.innerHTML;
        stageInfo.innerHTML = info.innerHTML;
    }
}

main();
