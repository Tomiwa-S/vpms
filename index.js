document.cookie = "cookieName=value; SameSite=None; Secure";
var mq2 = document.getElementById("mq2");
var mq7 = document.getElementById("mq7");
var mq135 = document.getElementById("mq135");
var sent = false;
var threshold = 15;
async function getThingSpeakData() {
    const url = "https://api.thingspeak.com/channels/2077841/feeds.json";
    const post = await fetch(url).then((res) => res.json());
    var field1 =[], field2 =[], field3 =[];
    const looper = (arr, pusher, field)=>arr.forEach((x)=>pusher.push(x[field]));
    looper(post["feeds"],field1,"field1");
    looper(post["feeds"],field2,"field2");
    looper(post["feeds"],field3,"field3");
    mq2.innerHTML = field1[99];
    mq7.innerHTML = field2[99];
    mq135.innerHTML = field3[99];
    if(field1[99]>=threshold&&!sent){
        Threshold();
    };
};
setInterval(getThingSpeakData,500);
function Threshold(){
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "timmeysam@gmail.com",
        Password : "C009E876011C08AF3AB0E2993A272DCAF312",
        To : 'ermasterde@gmail.com',
        From : "timmeysam@gmail.com",
        Subject : "ALERT- Vehicle Pollution Threshold exceeded",
        Body : "Hi Tomiwa,"+ "\n" +"You should consider having your vehicle checked as it voiolates the FRSC pollution limit.\n This is a warning. Your data would soon be sent to the FRSC for prosecution if no action is taken to mitigate this."
      }).then(
      message => alert("limit exceeded")
      );
        sent =true;
    };
