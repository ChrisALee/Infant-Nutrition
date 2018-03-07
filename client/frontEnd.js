function main() {
    window.onclick = function (event) {
        var elmt = event.target;
        var num = parseInt(elmt.id);
        if (0 <= num && num <= 6) {
            changeInfo(num);
        }
    };
    function changeInfo(num) {
        var selectedStage = document.getElementById("" + num + "");
        var info = document.getElementById("" + num + "0");
        var stageName = document.getElementById("stageName");
        var stageInfo = document.getElementById("stageInfo");
        stageInfo.style.visibility = "visible";
        stageName.innerHTML = selectedStage.innerHTML;
        stageInfo.innerHTML = info.innerHTML;
        if (stageInfo.innerHTML == "") {
            stageInfo.style.visibility = "hidden";
        }
    }
}
main();
