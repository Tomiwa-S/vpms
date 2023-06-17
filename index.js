document.cookie = "cookieName=value; SameSite=None; Secure";
var mq2 = document.getElementById("mq2");
var mq7 = document.getElementById("mq7");
var mq135 = document.getElementById("mq135");
var sent = false;
var mq2 = false;
var mq7 = false;
var mq135 = false;
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
    looper(post["feeds"],field4,"field4");
    var thres = field4[99];
    if(thres>0){
        if(thres==1 && !mq2){
            Threshold("LPG");
            mq2=true;
        }
        else if(thres==2 && !mq7){
            Threshold("CO");
            mq7=true;
        }
        else if(thres==3 && !mq135){
            Threshold("CO2");
            mq135=true;
        }
    }
};
setInterval(function(){
    getThingSpeakData();
},500);
const emailContent = `
Dear Oluwatomiwa,\n\n<br> 
\n\n <br>
We hope this email finds you well. We are writing to bring an urgent matter to your attention regarding your vehicle's recent emissions test results.\n\n
Our advanced vehicle pollution monitoring system, integrated with Internet of Things (IoT) technology, has detected that your vehicle's pollution levels have exceeded the established threshold. This indicates a potential issue with your vehicle's emissions control system or the need for maintenance to ensure compliance with environmental regulations.\n\n <br>
As an environmentally conscious organization, we take vehicle pollution seriously, and we strive to maintain a cleaner and healthier environment for all. Excessive emissions from vehicles contribute to air pollution, which can have adverse effects on both human health and the environment.\n\n <br>
We kindly request your immediate attention to this matter. We recommend that you take the following actions:\n\n <br>
\n\n <br>
1. Have your vehicle inspected by a certified mechanic or authorized service center to diagnose and rectify any potential issues with the emissions control system.\n <br> \n\n <br>
2. Ensure that your vehicle is maintained and serviced regularly according to the manufacturer's recommendations.\n <br> \n\n <br>
3. Adhere to proper driving practices, such as avoiding excessive idling and aggressive acceleration, to minimize pollution emissions.\n\n <br> \n\n <br>
Taking prompt action not only helps in mitigating environmental pollution but also ensures that your vehicle remains compliant with local regulations, avoiding any potential penalties or restrictions on its usage.\n\n <br>
We encourage you to prioritize the maintenance of your vehicle's emissions control system and its overall environmental impact. By doing so, you will contribute to a cleaner and healthier environment for everyone.\n\n <br>
If you have any questions or require assistance regarding emission standards, certified service centers, or any other related information, please feel free to contact us. We are here to help and support you.\n\n <br>
Please note that failure to address this issue will result in you being fined by the FRSC.\n\n <br>
You can monitor your vehicle emission levels be clicking <a href="https://tomiwa-s.github.io/vpms">here</a>\n\n <br>
Thank you for your immediate attention to this matter and for your commitment to a greener future.
\n\n <br>
\n\n <br>
\n\n <br>
Best regards,\n\n <br>
VPMS team\n <br>
`;
function Threshold(gas="carbon emission"){
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "timmeysam@gmail.com",
        Password : "C009E876011C08AF3AB0E2993A272DCAF312",
        To : 'ermasterde@gmail.com',
        From : "timmeysam@gmail.com",
        Subject : "Urgent Notification: Excessive Vehicle Pollution Detected",
        Body : emailContent
      }).then(
      message => alert("Notice: Vehicle "+gas+" threshold exceeded!!")
      );
        sent =true;
    };
