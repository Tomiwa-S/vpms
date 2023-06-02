var mq2 = document.getElementById("mq2");
var mq7 = document.getElementById("mq7");
var mq135 = document.getElementById("mq135");

async function getThingSpeakData() {
    const url = "https://api.thingspeak.com/channels/2077841/feeds.json";
    const post = await fetch(url).then((res) => res.json());
    console.log(post);
    var field1 =[], field2 =[], field3 =[];
    const looper = (arr, pusher, field)=>arr.forEach((x)=>pusher.push(x[field]));
    looper(post["feeds"],field1,"field1");
    looper(post["feeds"],field2,"field2");
    looper(post["feeds"],field3,"field3");
    const mean = arr =>(arr.reduce((a,b)=>parseFloat(a)+parseFloat(b))/arr.length).toFixed(2);
    mq2.innerHTML = mean(field1);
    mq7.innerHTML = mean(field2);
    mq135.innerHTML = mean(field3);
    value();
    // var meter = document.getElementsByTagName("meter")[0];
    // var span = meter.previousElementSibling.previousElementSibling;
    // console.log(span.innerHTML);
    // meter.setAttribute("value",span.innerHTML);
    
};
getThingSpeakData();
function ch(){
    var meter = document.getElementsByTagName("meter")[0];
    var span = meter.previousElementSibling.previousElementSibling;
    console.log(span.innerHTML);
    // return meter.setAttribute("value",span.innerHTML);
    console.log(meter);
    console.log(span);
}
function value(){
    var meter = document.getElementsByTagName("meter");
    var arr = Object.entries(meter);
    arr.forEach((x)=> arr.indexOf(x)%2!=0??console.log(x[1]));
    // console.log(typeof(arr));
    // console.log(arr);
    // meter.forEach((x)=>{
    //     var span = x.previousElementSibling.previousElementSibling;
    //     meter.setAttribute("value",span.innerHTML);
    // })
}