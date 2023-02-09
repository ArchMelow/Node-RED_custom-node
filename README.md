# lighttalk
## 라이트토크(주)에서 개발한 노드입니다.
해당 노드에서는 다음과 같은 기능을 지원합니다.
* 라이트토크 기기의 mac 주소를 입력하면 주변의 이용가능한 기기와 노드가 연결됩니다.
* **입력으로 '{'startTime' : (시작 시간), 'endTime' : (끝나는 시간), 'outNo' : (제어하려고 하는 기기의 번호), 'value' : (1 또는 0) }'** 
와 같이 JSON 형태의 페이로드를 전달해 주면 startTime 부터 endTime 까지 기기를 value에 맞게 제어하는 스케쥴 하나를 형성합니다.
* 출력으로는 현 기기들의 상태를 볼 수 있습니다.
* 노드 설정에서 직접 스케쥴을 추가하실 수 있습니다. 

'''
[
    {
        "id": "a82e78520631c79d",
        "type": "tab",
        "label": "Flow 1",
        "disabled": false,
        "info": "",
        "env": []
    },
    {
        "id": "2f1ddb2a8ec1ed53",
        "type": "inject",
        "z": "a82e78520631c79d",
        "name": "command (light off)",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "{\"start_time\" : \"2022-08-19 20:38:00\", \"end_time\" : \"2022-08-19 17:38:20\" ,\"outNo\" : 2, \"value\" : 1}",
        "payloadType": "str",
        "x": 247,
        "y": 297,
        "wires": [
            [
                "8caa7c32475"
            ]
        ]
    },
    {
        "id": "a0ffd5f1fe617844",
        "type": "ui_led",
        "z": "a82e78520631c79d",
        "order": 0,
        "group": "e036ccde72136820",
        "width": 0,
        "height": 0,
        "label": "1",
        "labelPlacement": "left",
        "labelAlignment": "left",
        "colorForValue": [
            {
                "color": "#ff0000",
                "value": "0",
                "valueType": "num"
            },
            {
                "color": "#008000",
                "value": "1",
                "valueType": "num"
            }
        ],
        "allowColorForValueInMessage": false,
        "shape": "circle",
        "showGlow": true,
        "name": "",
        "x": 727.0028553009033,
        "y": 231.89935302734375,
        "wires": []
    },
    {
        "id": "1c35ba21e4cfc97f",
        "type": "ui_led",
        "z": "a82e78520631c79d",
        "order": 0,
        "group": "e036ccde72136820",
        "width": 0,
        "height": 0,
        "label": "2",
        "labelPlacement": "left",
        "labelAlignment": "left",
        "colorForValue": [
            {
                "color": "#ff0000",
                "value": "0",
                "valueType": "num"
            },
            {
                "color": "#008000",
                "value": "1",
                "valueType": "num"
            }
        ],
        "allowColorForValueInMessage": false,
        "shape": "circle",
        "showGlow": true,
        "name": "",
        "x": 733.733024597168,
        "y": 272.03430557250977,
        "wires": []
    },
    {
        "id": "02245ab07e790d07",
        "type": "ui_led",
        "z": "a82e78520631c79d",
        "order": 0,
        "group": "e036ccde72136820",
        "width": 0,
        "height": 0,
        "label": "3",
        "labelPlacement": "left",
        "labelAlignment": "left",
        "colorForValue": [
            {
                "color": "#ff0000",
                "value": "0",
                "valueType": "num"
            },
            {
                "color": "#008000",
                "value": "1",
                "valueType": "num"
            }
        ],
        "allowColorForValueInMessage": false,
        "shape": "circle",
        "showGlow": true,
        "name": "",
        "x": 734.7330131530762,
        "y": 318.03430557250977,
        "wires": []
    },
    {
        "id": "8f0329ab4052267d",
        "type": "ui_led",
        "z": "a82e78520631c79d",
        "order": 0,
        "group": "e036ccde72136820",
        "width": 0,
        "height": 0,
        "label": "4",
        "labelPlacement": "left",
        "labelAlignment": "left",
        "colorForValue": [
            {
                "color": "#ff0000",
                "value": "0",
                "valueType": "num"
            },
            {
                "color": "#008000",
                "value": "1",
                "valueType": "num"
            }
        ],
        "allowColorForValueInMessage": false,
        "shape": "circle",
        "showGlow": true,
        "name": "",
        "x": 723.7330341339111,
        "y": 367.0342597961426,
        "wires": []
    },
    {
        "id": "8caa7c32475",
        "type": "라이트토크",
        "z": "a82e78520631c79d",
        "name": "라이트토크",
        "startTime": "2022-10-05T10:20",
        "endTime": "2022-10-05T10:21",
        "heat": true,
        "cool": "",
        "exha": true,
        "led": "",
        "x": 504.2187957763672,
        "y": 299.0286293029785,
        "wires": [
            [
                "a0ffd5f1fe617844"
            ],
            [
                "1c35ba21e4cfc97f"
            ],
            [
                "02245ab07e790d07"
            ],
            [
                "8f0329ab4052267d"
            ]
        ]
    },
    {
        "id": "e036ccde72136820",
        "type": "ui_group",
        "name": "Default",
        "tab": "52fedc0fc5facd8a",
        "order": 1,
        "disp": true,
        "width": "6",
        "collapse": false,
        "className": ""
    },
    {
        "id": "52fedc0fc5facd8a",
        "type": "ui_tab",
        "name": "Home",
        "icon": "dashboard",
        "disabled": false,
        "hidden": false
    }
]
'''
