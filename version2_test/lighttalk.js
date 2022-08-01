module.exports = function(RED) {
    "use strict";
    function lighttalk(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var received = "";
        var mqtt    = require('mqtt');
        //var mongo   = require('mongodb');
        var url     = "";
        var database = "";
        var collectionName = "";
        var savedData = "";
        var nodeContext = this.context();
        //var date = new Date();
        //console.log("Date : " + date);
        
        var start = String(config.startTime);
        var end = String(config.endTime);
        var startArr = start.split(',');
        var endArr = end.split(',');
        console.log(typeof startArr);
        if (startArr.length != 2 || endArr.length != 2) {
            node.warn('에러 1 : 스케쥴 입력이 올바르지 않습니다. 다시 입력해주세요.');
        } else {
            var sFrontArr = startArr[0].split('/');
            var sRearArr = startArr[1].split(':');
            var eFrontArr = endArr[0].split('/');
            var eRearArr = endArr[1].split(':');
        }
        if (sFrontArr.length != 3 || sRearArr.length != 3 || eFrontArr.length != 3 || eRearArr.length != 3) {
            node.warn('에러 2 : 스케쥴 입력이 올바르지 않습니다. 다시 입력해주세요.');
        } else {
            var startYear = sFrontArr[0];
            var startMonth = sFrontArr[1];
            var startDay = sFrontArr[2];
            var startHour = sRearArr[0];
            var startMin = sRearArr[1];
            var startSec = sRearArr[2];
            var endYear = eFrontArr[0];
            var endMonth = eFrontArr[1];
            var endDay = eFrontArr[2];
            var endHour = eRearArr[0];
            var endMin = eRearArr[1];
            var endSec = eRearArr[2];
            console.log(startYear, startMonth, startDay, startHour, startMin, startSec, endYear, endMonth, endDay, endHour, endMin, endSec);
        }

        
        node.connstatusSet = 0; //status set? (to prevent repetitive status actions)
        node.savedMsgEventFlag = false;
        node.msgStack = [];
        var client  = mqtt.connect("mqtt://broker.mqtt-dashboard.com");
        var outputs = [0, 0, 0, 0]; //initialize to 0s
        //var configNode = RED.nodes.getNode(config);
        console.log(config.id);

        var outTopic= "LightTalk-" + String(config.id) + "-out";
        var inTopic = "LightTalk-" + String(config.id) + "-in";
        console.log(outTopic);
        console.log(inTopic);

          

        client.on('message',function(outTopic, msg, packet){
            console.log("connStatus : " + node.connstatusSet);
            if (!node.connstatusSet) {
                node.status({fill:"green",shape:"dot",text:"연결됨"});
                node.connstatusSet = 1;
            }
            client.publish("LightTalk-sendMac", inTopic); //send Node-RED the topic with the MAC Addr.
            nodeContext.set("isValidMsg", true);
            console.log(msg != null);
            console.log("Message arrived : " + msg);
            console.log("With the topic of "+ outTopic);
            received = JSON.parse(String(msg));
            for (var i = 0; i < 4; i++)
                outputs[i] = Number(received.out[i]); 
            var msg1 = {};
            var msg2 = {};
            var msg3 = {};
            var msg4 = {};
            msg1.payload = outputs[0];
            msg2.payload = outputs[1];
            msg3.payload = outputs[2];
            msg4.payload = outputs[3];
            node.send([msg1, msg2, msg3, msg4]);
        });

        

        client.on("connect",function(){	
            console.log("connected  "+ client.connected);
            nodeContext.set("isValidMsg", false); //reset the status
            console.log(outTopic);
            client.subscribe(outTopic,{qos:0}); 
        });
        //handle errors
        client.on("error",function(error){
	        console.log("Can't connect" + error);
	        process.exit(1)});


        node.on('close', function() {
            node.connstatusSet = 0;
            node.status({}); //clear the status of a node
            node.status({fill:"yellow",shape:"ring",text:"연결 중.."});
            client.end();
            client  = mqtt.connect("mqtt://broker.mqtt-dashboard.com");
            // tidy up any state
        });


        node.on('input', function(msg) {
            console.log(msg.payload);
            client.publish(inTopic, msg.payload);
            //node.send(msg);
        });
    }
    RED.nodes.registerType("라이트토크",lighttalk);
}