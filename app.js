//app.js
App({
  onLaunch: function() {
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
         	this.globalData.Custom = capsule;
        	this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
        	this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    });

    //创建小橘对象
    wx.xj = {};
    //准备数据
    wx.xj.standard = this.getStandard();
    wx.xj.months = this.getMonths();
    wx.xj.projects = this.getProjects();
    wx.xj.questions = this.getQuestions();
    wx.xj.questionDetails = this.getQuestionDetails();
    wx.xj.initScoreArr = this.initAllScoreArr();//所有选项的得分数组
    wx.xj.realMonthAge = 1;//真实月龄默认是1
    wx.xj.projectMonthIndexs = this.getProjectMonthIndexs();//设置各个项目的测试月龄
  },
  initAllScoreArr: function() {
    let scoreArr = new Array();//创建一个存储得分的数组
    let projects = this.getProjects();
    let months = this.getMonths();
    for (let i = 0; i < projects.length; i++) {
      let projectScores = new Array();
      for (let j = 0; j < months.length; j++) {
        let scoreObj = {
          currentScore: 0,//默认都是0分
          passingGrades: this.getProjectScore(months[j]),
          resultScore: 0//结果得分，如果有两项连续通过的则之前月龄的结果得分为通过得分
        };
        projectScores.push(scoreObj);
      }
      scoreArr.push(projectScores);
    }
    return scoreArr;
  },
  getProjectScore: function(monthAge){
    if (monthAge >= 1 && monthAge <= 12) {
      return 1.0;
    } else if (monthAge >= 15 && monthAge <= 36) {
      return 3.0;
    } else {
      return 6.0;
    }
  },
  getStandard: function () {
    return {
      code: 'WS/T 580—2017',
      title: '中华人民共和国卫生行业标准',
      chineseName: '0 岁~6 岁儿童发育行为评估量表',
      englishName: 'Developmental scale for children aged 0-6 years',
      pubTime: '2017 - 10 - 12',
      useTime: '2018 - 04 - 01',
      pubMechanism: '中华人民共和国国家卫生和计划生育委员会'
    };
  },
  getMonths: function () {
    return [
      1, 2, 3, 4, 5, 6, 7,
      8, 9, 10, 11, 12, 15,
      18, 21, 24, 27, 30, 33,
      36, 42, 48, 54, 60, 66,
      72, 78, 84
    ];
  },
  getProjects: function () {
    return [
      '大运动',
      '精细动作',
      '适应能力',
      '语言',
      '社会行为'
    ];
  },
  getProjectMonthIndexs: function() {//默认下标都是-1
    return [
      -1,
      -1,
      -1,
      -1,
      -1
    ];
  },
  getQuestions: function() {
    return [
      [
        [
          {
            id: 1,
            title: '抬肩坐起头竖直片刻',
            annotate: null
          }, {
            id: 2,
            title: '俯卧头部翘动',
            annotate: null
          }
        ], [
          {
            id: 3,
            title: '触碰手掌紧握拳',
            annotate: null
          }, {
            id: 4,
            title: '手的自然状态',
            annotate: null
          }
        ], [
          {
            id: 5,
            title: '看黑白靶',
            annotate: '2'
          }, {
            id: 6,
            title: '眼跟红球过中线',
            annotate: null
          }
        ], [
          {
            id: 7,
            title: '自发细小喉音',
            annotate: '1'
          }, {
            id: 8,
            title: '听声音有反应',
            annotate: '2'
          }
        ], [
          {
            id: 9,
            title: '对发声的人有注视',
            annotate: null
          }, {
            id: 10,
            title: '眼跟踪走动的人',
            annotate: null
          }
        ]
      ], [
        [
          {
            id: 11,
            title: '拉腕坐起头竖直短时',
            annotate: null
          }, {
            id: 12,
            title: '俯卧头抬离床面',
            annotate: null
          }
        ], [
          {
            id: 13,
            title: '花铃棒留握片刻',
            annotate: null
          }, {
            id: 14,
            title: '拇指轻叩可分开',
            annotate: '2'
          }
        ], [
          {
            id: 15,
            title: '即刻注意大玩具',
            annotate: null
          }, {
            id: 16,
            title: '眼跟红球上下移动',
            annotate: '2'
          }
        ], [
          {
            id: 17,
            title: '发 a、o、e 等母音',
            annotate: '1'
          }, {
            id: 18,
            title: '听声音有复杂反应',
            annotate: null
          }
        ], [
          {
            id: 19,
            title: '自发微笑',
            annotate: null
          }, {
            id: 20,
            title: '逗引时有反应',
            annotate: null
          }
        ]
      ], [
        [
          {
            id: 21,
            title: '抱直头稳',
            annotate: null
          }, {
            id: 22,
            title: '俯卧抬头 45°',
            annotate: null
          }
        ], [
          {
            id: 23,
            title: '花铃棒留握 30s',
            annotate: null
          }, {
            id: 24,
            title: '两手搭在一起',
            annotate: null
          }
        ], [
          {
            id: 25,
            title: '即刻注意胸前玩具',
            annotate: null
          }, {
            id: 26,
            title: '眼跟红球 180°',
            annotate: null
          }
        ], [
          {
            id: 27,
            title: '笑出声',
            annotate: '1'
          }
        ], [
          {
            id: 28,
            title: '见人会笑',
            annotate: null
          }, {
            id: 29,
            title: '灵敏模样',
            annotate: null
          }
        ]
      ], [
        [
          {
            id: 30,
            title: '扶腋可站立片刻',
            annotate: null
          }, {
            id: 31,
            title: '俯卧抬头 90°',
            annotate: null
          }
        ], [
          {
            id: 32,
            title: '摇动并注视花铃棒',
            annotate: null
          }, {
            id: 33,
            title: '试图抓物',
            annotate: null
          }
        ], [
          {
            id: 34,
            title: '目光对视',
            annotate: '2'
          }, {
            id: 35,
            title: '高声叫',
            annotate: '1'
          }
        ], [
          {
            id: 36,
            title: '伊语作声',
            annotate: '1'
          }, {
            id: 37,
            title: '找到声源',
            annotate: null
          }
        ], [
          {
            id: 38,
            title: '注视镜中人像',
            annotate: null
          }, {
            id: 39,
            title: '认亲人',
            annotate: '1'
          }
        ]
      ], [
        [
          {
            id: 40,
            title: '轻拉腕部即坐起',
            annotate: null
          }, {
            id: 41,
            title: '独坐头身前倾',
            annotate: null
          }
        ], [
          {
            id: 42,
            title: '抓住近处玩具',
            annotate: null
          }, {
            id: 43,
            title: '玩手',
            annotate: null
          }
        ], [
          {
            id: 44,
            title: '注意小丸',
            annotate: null
          }, {
            id: 45,
            title: '拿住一积木注视另一积木',
            annotate: null
          }
        ], [
          {
            id: 46,
            title: '对人及物发声',
            annotate: '1'
          }
        ], [
          {
            id: 47,
            title: '对镜有游戏反应',
            annotate: null
          }, {
            id: 48,
            title: '见食物兴奋',
            annotate: '1'
          }
        ]
      ], [
        [
          {
            id: 49,
            title: '仰卧翻身',
            annotate: '1'
          }, {
            id: 50,
            title: '会拍桌子',
            annotate: null
          }
        ], [
          {
            id: 51,
            title: '会撕揉纸张',
            annotate: null
          }, {
            id: 52,
            title: '耙弄到桌上一积木',
            annotate: null
          }
        ], [
          {
            id: 53,
            title: '两手拿住积木',
            annotate: null
          }, {
            id: 54,
            title: '寻找失落的玩具',
            annotate: null
          }
        ], [
          {
            id: 55,
            title: '叫名字转头',
            annotate: null
          }, {
            id: 56,
            title: '理解手势',
            annotate: null
          }
        ], [
          {
            id: 57,
            title: '自喂食物',
            annotate: '1'
          }, {
            id: 58,
            title: '会躲猫猫',
            annotate: null
          }
        ]
      ], [
        [
          {
            id: 59,
            title: '悬垂落地姿势',
            annotate: '2'
          }, {
            id: 60,
            title: '独坐直',
            annotate: null
          }
        ], [
          {
            id: 61,
            title: '耙弄到小丸',
            annotate: null
          }, {
            id: 62,
            title: '自取一积木，再取另一块',
            annotate: null
          }
        ], [
          {
            id: 63,
            title: '积木换手',
            annotate: null
          }, {
            id: 64,
            title: '伸手够远处玩具',
            annotate: null
          }
        ], [
          {
            id: 65,
            title: '发 da-da、ma-ma 等无所指',
            annotate: '1'
          }
        ], [
          {
            id: 66,
            title: '抱脚玩',
            annotate: null
          }, {
            id: 67,
            title: '能认生人',
            annotate: '1'
          }
        ]
      ], [
        [
          {
            id: 68,
            title: '双手扶物可站立',
            annotate: null
          }, {
            id: 69,
            title: '独坐自如',
            annotate: null
          }
        ], [
          {
            id: 70,
            title: '拇他指捏小丸',
            annotate: null
          }, {
            id: 71,
            title: '试图取第三块积木',
            annotate: null
          }
        ], [
          {
            id: 72,
            title: '有意识地摇铃',
            annotate: null
          }, {
            id: 73,
            title: '持续用手追逐玩具',
            annotate: null
          }
        ], [
          {
            id: 74,
            title: '模仿声音',
            annotate: '1'
          }, {
            id: 75,
            title: '可用动作手势表达(2/3)',
            annotate: '1'
          }
        ], [
          {
            id: 76,
            title: '懂得成人面部表情',
            annotate: null
          }
        ]
      ], [
        [
          {
            id: 77,
            title: '拉双手会走',
            annotate: null
          }, {
            id: 78,
            title: '会爬',
            annotate: null
          }
        ], [
          {
            id: 79,
            title: '拇食指捏小丸',
            annotate: null
          }, {
            id: 80,
            title: '从杯中取出积木',
            annotate: null
          }
        ], [
          {
            id: 81,
            title: '积木对敲',
            annotate: null
          }, {
            id: 82,
            title: '拨弄铃舌',
            annotate: null
          }
        ], [
          {
            id: 83,
            title: '会欢迎',
            annotate: '1'
          }, {
            id: 84,
            title: '会再见',
            annotate: '1'
          }
        ], [
          {
            id: 85,
            title: '表示不要',
            annotate: '1'
          }
        ]
      ], [
        [
          {
            id: 86,
            title: '保护性支撑',
            annotate: '2'
          }, {
            id: 87,
            title: '自己坐起',
            annotate: null
          }
        ], [
          {
            id: 88,
            title: '拇食指动作熟练',
            annotate: null
          }
        ], [
          {
            id: 89,
            title: '拿掉扣积木杯玩积木',
            annotate: null
          }, {
            id: 90,
            title: '寻找盒内东西',
            annotate: null
          }
        ], [
          {
            id: 91,
            title: '模仿发语声',
            annotate: '1'
          }
        ], [
          {
            id: 92,
            title: '懂得常见物及人名称',
            annotate: null
          }, {
            id: 93,
            title: '按指令取东西',
            annotate: null
          }
        ]
      ], [
        [
          {
            id: 94,
            title: '独站片刻',
            annotate: null
          }, {
            id: 95,
            title: '扶物下蹲取物',
            annotate: null
          }
        ], [
          {
            id: 96,
            title: '积木放入杯中',
            annotate: null
          }
        ], [
          {
            id: 97,
            title: '打开包积木的方巾',
            annotate: null
          }, {
            id: 98,
            title: '模仿拍娃娃',
            annotate: null
          }
        ], [
          {
            id: 99,
            title: '有意识地发一个字音',
            annotate: '1'
          }, {
            id: 100,
            title: '懂得“不”',
            annotate: '1'
          }
        ], [
          {
            id: 101,
            title: '会从杯中喝水',
            annotate: '1'
          }, {
            id: 102,
            title: '会摘帽子',
            annotate: null
          }
        ]
      ], [
        [
          {
            id: 103,
            title: '独站稳',
            annotate: null
          }, {
            id: 104,
            title: '牵一手可走',
            annotate: null
          }
        ], [
          {
            id: 105,
            title: '全掌握笔留笔道',
            annotate: null
          }, {
            id: 106,
            title: '试把小丸投小瓶',
            annotate: null
          }
        ], [
          {
            id: 107,
            title: '盖瓶盖',
            annotate: null
          }
        ], [
          {
            id: 108,
            title: '叫爸爸妈妈有所指',
            annotate: '1'
          }, {
            id: 109,
            title: '向他/她要东西知道给',
            annotate: null
          }
        ], [
          {
            id: 110,
            title: '穿衣知配合',
            annotate: '1'
          }, {
            id: 111,
            title: '共同注意',
            annotate: '1'
          }
        ]
      ], [
        [
          {
            id: 112,
            title: '独走自如',
            annotate: null
          }
        ], [
          {
            id: 113,
            title: '自发乱画',
            annotate: null
          }, {
            id: 114,
            title: '从瓶中拿到小丸',
            annotate: null
          }
        ], [
          {
            id: 115,
            title: '翻书两次',
            annotate: null
          }, {
            id: 116,
            title: '盖上圆盒',
            annotate: null
          }
        ], [
          {
            id: 117,
            title: '会指眼耳鼻口手',
            annotate: null
          }, {
            id: 118,
            title: '说 3~5 个字',
            annotate: '1'
          }
        ], [
          {
            id: 119,
            title: '会脱袜子',
            annotate: '1'
          }
        ]
      ], [
        [
          {
            id: 120,
            title: '扔球无方向',
            annotate: null
          }
        ], [
          {
            id: 121,
            title: '模仿画道道',
            annotate: null
          }
        ], [
          {
            id: 122,
            title: '积木搭高四块',
            annotate: null
          }, {
            id: 123,
            title: '正放圆积木入型板',
            annotate: null
          }
        ], [
          {
            id: 124,
            title: '懂得三个投向',
            annotate: null
          }, {
            id: 125,
            title: '说十个字词',
            annotate: '1'
          }
        ], [
          {
            id: 126,
            title: '白天能控制大小便',
            annotate: '1'
          }, {
            id: 127,
            title: '会用匙',
            annotate: '1'
          }
        ]
      ], [
        [
          {
            id: 128,
            title: '脚尖走',
            annotate: '1'
          }, {
            id: 129,
            title: '扶楼梯上楼',
            annotate: null
          }
        ], [
          {
            id: 130,
            title: '水晶线穿扣眼',
            annotate: null
          }, {
            id: 131,
            title: '模仿拉拉锁',
            annotate: null
          }
        ], [
          {
            id: 132,
            title: '积木搭高 7~8 块',
            annotate: null
          }, {
            id: 133,
            title: '知道红色',
            annotate: null
          }
        ], [
          {
            id: 134,
            title: '回答简单问题',
            annotate: null
          }, {
            id: 135,
            title: '说 3~5 个字的句子',
            annotate: '1'
          }
        ], [
          {
            id: 136,
            title: '能表示个人需要',
            annotate: '1'
          }, {
            id: 137,
            title: '想象性游戏',
            annotate: '1'
          }
        ]
      ], [
        [
          {
            id: 138,
            title: '双足跳离地面',
            annotate: null
          }
        ], [
          {
            id: 139,
            title: '穿过扣眼后拉线',
            annotate: null
          }
        ], [
          {
            id: 140,
            title: '一页页翻书',
            annotate: null
          }, {
            id: 141,
            title: '倒放圆积木入型板',
            annotate: null
          }
        ], [
          {
            id: 142,
            title: '说两句以上诗或儿歌',
            annotate: null
          }, {
            id: 143,
            title: '说常见物用途(碗笔凳球)',
            annotate: null
          }
        ], [
          {
            id: 144,
            title: '会打招呼',
            annotate: null
          }, {
            id: 145,
            title: '问“这是什么?”',
            annotate: '1'
          }
        ]
      ], [
        [
          {
            id: 146,
            title: '独自上楼',
            annotate: null
          }, {
            id: 147,
            title: '独自下楼',
            annotate: null
          }
        ], [
          {
            id: 148,
            title: '模仿画竖道',
            annotate: null
          }, {
            id: 149,
            title: '对拉锁',
            annotate: null
          }
        ], [
          {
            id: 150,
            title: '认识大小',
            annotate: null
          }, {
            id: 151,
            title: '正放型板',
            annotate: null
          }
        ], [
          {
            id: 152,
            title: '说 7~10 个字的句子',
            annotate: null
          }, {
            id: 153,
            title: '理解指令',
            annotate: null
          }
        ], [
          {
            id: 154,
            title: '脱单衣或裤',
            annotate: '1'
          }, {
            id: 155,
            title: '开始有是非观念',
            annotate: null
          }
        ]
      ], [
        [
          {
            id: 156,
            title: '独脚站 2s',
            annotate: null
          }
        ], [
          {
            id: 157,
            title: '穿扣子 3~5 个',
            annotate: null
          }, {
            id: 158,
            title: '模仿搭桥',
            annotate: null
          }
        ], [
          {
            id: 159,
            title: '知道 1 与许多',
            annotate: null
          }, {
            id: 160,
            title: '倒放型板',
            annotate: null
          }
        ], [
          {
            id: 161,
            title: '说出图片 10 样',
            annotate: null
          }, {
            id: 162,
            title: '说自己名字',
            annotate: null
          }
        ], [
          {
            id: 163,
            title: '来回倒水不洒',
            annotate: null
          }, {
            id: 164,
            title: '女孩扔果皮',
            annotate: null
          }
        ]
      ], [
        [
          {
            id: 165,
            title: '立定跳远',
            annotate: null
          }
        ], [
          {
            id: 166,
            title: '模仿画圆',
            annotate: null
          }, {
            id: 167,
            title: '拉拉锁',
            annotate: null
          }
        ], [
          {
            id: 168,
            title: '积木搭高 10 块',
            annotate: null
          }, {
            id: 169,
            title: '连续执行三个命令',
            annotate: null
          }
        ], [
          {
            id: 170,
            title: '说出性别',
            annotate: null
          }, {
            id: 171,
            title: '分清“里”“外”',
            annotate: null
          }
        ], [
          {
            id: 172,
            title: '会穿鞋',
            annotate: null
          }, {
            id: 173,
            title: '解扣子',
            annotate: null
          }
        ]
      ], [
        [
          {
            id: 174,
            title: '双脚交替跳',
            annotate: null
          }
        ], [
          {
            id: 175,
            title: '模仿画交叉线',
            annotate: null
          }, {
            id: 176,
            title: '会拧螺丝',
            annotate: null
          }
        ], [
          {
            id: 177,
            title: '懂得“3”',
            annotate: null
          }, {
            id: 178,
            title: '认识两种颜色',
            annotate: null
          }
        ], [
          {
            id: 179,
            title: '说出图片 14 样',
            annotate: null
          }, {
            id: 180,
            title: '发音基本清楚',
            annotate: null
          }
        ], [
          {
            id: 181,
            title: '懂得“饿了、冷了、累了”',
            annotate: null
          }, {
            id: 182,
            title: '扣扣子',
            annotate: null
          }
        ]
      ], [
        [
          {
            id: 183,
            title: '交替上楼',
            annotate: null
          }, {
            id: 184,
            title: '并足从楼梯末级跳下',
            annotate: null
          }
        ], [
          {
            id: 185,
            title: '拼圆形、正方形',
            annotate: null
          }, {
            id: 186,
            title: '会用剪刀',
            annotate: null
          }
        ], [
          {
            id: 187,
            title: '懂得“5”',
            annotate: null
          }, {
            id: 188,
            title: '认识四种颜色',
            annotate: null
          }
        ], [
          {
            id: 189,
            title: '会说反义词',
            annotate: null
          }, {
            id: 190,
            title: '说出图形(△○□)',
            annotate: null
          }
        ], [
          {
            id: 191,
            title: '会穿上衣',
            annotate: '1'
          }, {
            id: 192,
            title: '吃饭之前为什么要洗手?',
            annotate: null
          }
        ]
      ], [
        [
          {
            id: 193,
            title: '独脚站 5s',
            annotate: null
          }, {
            id: 194,
            title: '并足从楼梯末级跳下稳',
            annotate: null
          }
        ], [
          {
            id: 195,
            title: '模仿画方形',
            annotate: null
          }, {
            id: 196,
            title: '照图组装螺丝',
            annotate: null
          }
        ], [
          {
            id: 197,
            title: '找不同(3 个)',
            annotate: null
          }, {
            id: 198,
            title: '图画补缺(3/6)',
            annotate: null
          }
        ], [
          {
            id: 199,
            title: '模仿说复合句',
            annotate: null
          }, {
            id: 200,
            title: '锅、手机、眼睛的用途',
            annotate: null
          }
        ], [
          {
            id: 201,
            title: '会做集体游戏',
            annotate: '1'
          }, {
            id: 202,
            title: '分辨男女厕所',
            annotate: null
          }
        ]
      ], [
        [
          {
            id: 203,
            title: '独脚站 10s',
            annotate: null
          }, {
            id: 204,
            title: '足尖对足跟向前走 2m',
            annotate: null
          }
        ], [
          {
            id: 205,
            title: '折纸边角整齐',
            annotate: null
          }, {
            id: 206,
            title: '筷子夹花生米',
            annotate: null
          }
        ], [
          {
            id: 207,
            title: '类同',
            annotate: null
          }, {
            id: 208,
            title: '图画补缺(4/6)',
            annotate: null
          }
        ], [
          {
            id: 209,
            title: '会漱口',
            annotate: null
          }, {
            id: 210,
            title: '会认识数字',
            annotate: null
          }
        ], [
          {
            id: 211,
            title: '懂得上午、下午',
            annotate: null
          }, {
            id: 212,
            title: '数手指',
            annotate: null
          }
        ]
      ], [
        [
          {
            id: 213,
            title: '单脚跳',
            annotate: null
          }, {
            id: 214,
            title: '踩踏板',
            annotate: null
          }
        ], [
          {
            id: 215,
            title: '照图拼椭圆形',
            annotate: null
          }, {
            id: 216,
            title: '试剪圆形',
            annotate: null
          }
        ], [
          {
            id: 217,
            title: '找不同(5 个)',
            annotate: null
          }, {
            id: 218,
            title: '图画补缺(5/6)',
            annotate: null
          }
        ], [
          {
            id: 219,
            title: '你姓什么?',
            annotate: null
          }, {
            di: 220,
            title: '说出两种圆形的东西',
            annotate: null
          }
        ], [
          {
            id: 221,
            title: '你家住哪里?',
            annotate: null
          }
        ]
      ], [
        [
          {
            id: 222,
            title: '接球',
            annotate: null
          }, {
            id: 223,
            title: '足尖对足跟向后走 2m',
            annotate: null
          }
        ], [
          {
            id: 224,
            title: '会写自己的名字',
            annotate: null
          }, {
            id: 225,
            title: '剪平滑圆形',
            annotate: null
          }
        ], [
          {
            id: 226,
            title: '树间站人',
            annotate: null
          }, {
            id: 227,
            title: '十字切苹果',
            annotate: null
          }
        ], [
          {
            id: 228,
            title: '知道自己属相',
            annotate: null
          }, {
            id: 229,
            title: '倒数数字',
            annotate: null
          }
        ], [
          {
            id: 230,
            title: '为什么要走人行横道?',
            annotate: null
          }, {
            id: 231,
            title: '鸡在水中游',
            annotate: null
          }
        ]
      ], [
        [
          {
            id: 232,
            title: '抱肘连续跳',
            annotate: null
          }, {
            id: 233,
            title: '拍球(2 个)',
            annotate: null
          }
        ], [
          {
            id: 234,
            title: '拼长方形',
            annotate: null
          }, {
            id: 235,
            title: '临摹组合图形',
            annotate: null
          }
        ], [
          {
            id: 236,
            title: '找不同(7 个)',
            annotate: null
          }, {
            id: 237,
            title: '知道左右',
            annotate: null
          }
        ], [
          {
            id: 238,
            title: '描述图画内容',
            annotate: null
          }, {
            id: 239,
            title: '上班、窗、苹果、香蕉(2/3)',
            annotate: null
          }
        ], [
          {
            id: 240,
            title: '一年有哪四个季节?',
            annotate: null
          }, {
            id: 241,
            title: '认识标识',
            annotate: null
          }
        ]
      ], [
        [
          {
            id: 242,
            title: '踢带绳的球',
            annotate: null
          }, {
            id: 243,
            title: '拍球(5 个)',
            annotate: null
          }
        ], [
          {
            id: 244,
            title: '临摹六边形',
            annotate: null
          }, {
            id: 245,
            title: '试打活结',
            annotate: null
          }
        ], [
          {
            id: 246,
            title: '图形类比',
            annotate: null
          }, {
            id: 247,
            title: '面粉的用途',
            annotate: null
          }
        ], [
          {
            id: 248,
            title: '归纳图画主题',
            annotate: null
          }, {
            id: 249,
            title: '认识钟表',
            annotate: null
          }
        ], [
          {
            id: 250,
            title: '懂得星期几',
            annotate: null
          }, {
            id: 251,
            title: '雨中看书',
            annotate: null
          }
        ]
      ], [
        [
          {
            id: 252,
            title: '连续踢带绳的球',
            annotate: null
          }, {
            id: 253,
            title: '交替踩踏板',
            annotate: null
          }
        ], [
          {
            id: 254,
            title: '学翻绳',
            annotate: null
          }, {
            id: 255,
            title: '打活结',
            annotate: null
          }
        ], [
          {
            id: 256,
            title: '数字类比',
            annotate: null
          }, {
            id: 257,
            title: '什么动物没有脚?',
            annotate: null
          }
        ], [
          {
            id: 258,
            title: '为什么要进行预防接种?',
            annotate: null
          }, {
            id: 259,
            title: '毛衣、裤、鞋共同点',
            annotate: null
          }
        ], [
          {
            id: 260,
            title: '紧急电话',
            annotate: null
          }, {
            id: 261,
            title: '猫头鹰抓老鼠',
            annotate: null
          }
        ]
      ]
    ];
  },
  getQuestionDetails: function () {
    return [
      {
        detail: '婴儿仰卧，主试者面向婴儿站立，对婴儿微笑、说话， 直到婴儿注视到主试者的脸。这时主试者轻轻握住婴儿 双肩(四指并拢置于肩胛骨外侧，食指不能触碰颈部)， 将婴儿拉坐起来，观察婴儿控制头的能力',
        meetConditions: '婴儿头可竖直保持2s或以上'
      }, {
        detail: '婴儿俯卧，前臂屈曲支撑，用玩具逗引婴儿抬头，观察 其反应',
        meetConditions: '婴儿有头部翘动即可通过'
      }, {
        detail: '婴儿仰卧，主试者将食指从尺侧放入婴儿手掌中',
        meetConditions: '婴儿能将拳头握紧'
      }, {
        detail: '主试者观察婴儿清醒时手的自然状态',
        meetConditions: '双手拇指内收不达掌心，无发 紧即通过'
      }, {
        detail: '婴儿仰卧，主试者将黑白靶拿在距婴儿脸部上方20cm处 移动，吸引婴儿注意',
        meetConditions: '婴儿眼睛可明确注视黑白靶'
      }, {
        detail: '婴儿仰卧，主试者手提红球，在婴儿脸部上方20cm处轻 轻晃动以引起婴儿注意，然后把红球慢慢移动，从头的 一侧沿着弧形，移向中央，再移向头的另一侧，观察婴 儿头部和眼睛的活动。',
        meetConditions: '当主试者把红球移向中央时， 婴儿用眼睛跟踪看着红球转 过中线，三试一成'
      }, {
        detail: '婴儿仰卧、清醒。注意其发音',
        meetConditions: '观察或询问，小儿能发出任何 一种细小柔和的喉音'
      }, {
        detail: '婴儿仰卧，在其一侧耳上方10cm~15cm处轻摇铜铃，观 察婴儿的反应。(双侧均做，一侧通过即可)',
        meetConditions: '婴儿听到铃声有一种或多种 反应'
      }, {
        detail: '主试者面对婴儿的脸微笑并对其说话。但不能触碰婴儿 的面孔或身体',
        meetConditions: '婴儿能注视主试者的脸'
      }, {
        detail: '婴儿横放在床上或斜躺在家长臂弯里，主试者站立(直 立位，勿弯腰)逗引婴儿引起其注意后左右走动，观察 婴儿眼睛是否追随主试者',
        meetConditions: '眼睛随走动的人转动'
      }, {
        detail: '婴儿仰卧，主试者将拇指置于婴儿掌心，余四指握住腕 部轻拉婴儿坐起，观察婴儿控制头部的能力',
        meetConditions: '当把婴儿拉起成坐位时婴儿 头可自行竖直，保持5s或以上'
      }, {
        detail: '婴儿俯卧，前臂屈曲支撑，用玩具逗引婴儿抬头，观察 其反应',
        meetConditions: '婴儿可自行将头抬离床面达 2s或以上。'
      }, {
        detail: '婴儿仰卧，将花铃棒放在婴儿手中',
        meetConditions: '握住花铃棒不松手达2s或以 上'
      }, {
        detail: '主试者分别轻叩婴儿双手手背，观察拇指自然放松的状 态',
        meetConditions: '婴儿双手握拳稍紧，拇指稍内 收，但经轻叩即可打开'
      }, {
        detail: '婴儿仰卧，用娃娃在婴儿脸部上方20cm处晃动，观察其 反应。',
        meetConditions: '可立刻注意到娃娃，三试一成'
      }, {
        detail: '婴儿仰卧，主试者提起红球，在婴儿脸部上方20cm处轻 轻晃动以引起婴儿注意，先慢慢向上移动，然后再从头 顶向下颏处移动',
        meetConditions: '婴儿眼睛能上或下跟随红球'
      }, {
        detail: '询问或逗引婴儿发音',
        meetConditions: '能从喉部发出a、o、e等元音 来'
      }, {
        detail: '婴儿仰卧，在其一侧耳上方10cm~15cm处轻摇铜铃，观 察婴儿的反应。(双侧均做，一侧通过即可)',
        meetConditions: '婴儿听到声音有表情和肢体 动作的变化'
      }, {
        detail: '观察或询问婴儿在无外界逗引时是否有自发微笑的情况',
        meetConditions: '婴儿能自发出现微笑，但不一 定出声。睡眠时微笑不通过'
      }, {
        detail: '婴儿仰卧，主试者弯腰，对婴儿点头微笑或说话进行逗 引，观察其反应。但不能触碰婴儿的面孔或身体',
        meetConditions: '经逗引，婴儿会出现微笑、发 声、手脚乱动等一种或多种表 现'
      }, {
        detail: '竖抱婴儿，观察婴儿控制头部的能力',
        meetConditions: '能将头举正并稳定10s或以上'
      }, {
        detail: '婴儿俯卧，前臂屈曲支撑，头正中位，用玩具逗引婴儿 抬头，观察其反应',
        meetConditions: '头可自行抬离床面，面部与床 面成45°，持续5s或以上'
      }, {
        detail: '婴儿仰卧或侧卧，将花铃棒放入婴儿手中',
        meetConditions: '婴儿能握住花铃棒30s，不借 助床面的支持'
      }, {
        detail: '婴儿仰卧，主试者观察婴儿双手是否能够自发搭在一起， 或主试者将其两手搭在一起，随即松手，观察婴儿双手 状态。',
        meetConditions: '婴儿能将双手搭在一起，保持 3s~4s'
      }, {
        detail: '婴儿仰卧，主试者将娃娃在婴儿身体上方20cm处沿中线 自下向上移动。当玩具到婴儿乳头连线至下颏之间时， 观察婴儿反应',
        meetConditions: '当娃娃移动至婴儿乳头连线 至下颌之间时，立即注意即可 通过'
      }, {
        detail: '婴儿仰卧，主试者手提红球，在婴儿脸部上方20cm处轻轻晃 动以引起婴儿注意，然后把红球慢慢移动，从头的一侧沿着 弧形，移向中央，再移向头的另一侧，观察婴儿头部和眼睛 的活动',
        meetConditions: '婴儿用眼及头跟随红球转动 180°，三试一成'
      }, {
        detail: '逗引婴儿笑，但不得接触身体',
        meetConditions: '观察或询问，婴儿能发出“咯咯”笑声'
      }, {
        detail: '主试者面对婴儿，不做出接近性的社交行为或动作，观察婴儿在无人逗引时的表情',
        meetConditions: '婴儿见到人自行笑起来'
      }, {
        detail: '主试者观察婴儿在不经逗引的情况下，对周围人和环境的反应',
        meetConditions: '婴儿不经逗引可观察周围环 境，眼会东张西望'
      }, {
        detail: '主试者扶婴儿腋下，置于立位后放松手的支持，观察其 反应',
        meetConditions: '婴儿可用自己双腿支持大部 分体重达2s或以上'
      }, {
        detail: '婴儿俯卧，前臂屈曲支撑，头正中位，用玩具逗引婴儿 抬头，观察其反应',
        meetConditions: '头可自行抬离床面，面部与床 面呈90°，持续5s或以上'
      }, {
        detail: '抱坐，将花铃棒放入婴儿手中，鼓励婴儿摇动',
        meetConditions: '婴儿能注视花铃棒，并摇动数下'
      }, {
        detail: '婴儿仰卧，将花铃棒拿到婴儿可及的范围内，观察婴儿反应，但不能触碰婴儿',
        meetConditions: '婴儿手臂试图抬起或有手抓 动作即可通过'
      }, {
        detail: '主试者或母亲对婴儿说话，观察婴儿是否与人对视',
        meetConditions: '婴儿能与成人对视，并保持5s或以上'
      }, {
        detail: '观察或询问婴儿在高兴或不满时的发音',
        meetConditions: '会高声叫(非高调尖叫)'
      }, {
        detail: '观察婴儿安静时的发音',
        meetConditions: '观察或询问，婴儿会类似自言 自语，无音节、无意义'
      }, {
        detail: '抱坐，主试者在婴儿耳后上方15cm处轻摇铜铃，观察其 反应',
        meetConditions: '可回头找到声源，一侧耳通过 即可'
      }, {
        detail: '将无边镜子横放在婴儿面前约20cm处，主试者或母亲可在镜中逗引婴儿，观察婴儿反应',
        meetConditions: '婴儿可经逗引或自发注视镜中人像'
      }, {
        detail: '观察婴儿在看到母亲或其他亲人或听到亲人声音后的表 情变化',
        meetConditions: '观察或询问，在见到母亲或其他亲人时，婴儿会变得高兴起 来'
      }, {
        detail: '婴儿仰卧，主试者握住腕部，轻拉到坐的位置',
        meetConditions: '婴儿自己能主动用力坐起，拉坐过程中无头部后滞现象'
      }, {
        detail: '将婴儿以坐姿置于床上',
        meetConditions: '独坐保持5s或以上，头身向前 倾'
      }, {
        detail: '抱坐，婴儿手置于桌上。玩具(如花铃棒)放在距离婴儿手掌一侧2.5cm处，鼓励婴儿取玩具',
        meetConditions: '婴儿可用一手或双手抓住玩 具'
      }, {
        detail: '观察婴儿能否把双手放在一起互相玩弄',
        meetConditions: '婴儿会自发将双手抱到一起玩'
      }, {
        detail: '桌面上放一小丸，主试者指点小丸或把小丸动来动去， 以引起婴儿注意',
        meetConditions: '婴儿明确地注意到小丸'
      }, {
        detail: '抱坐，婴儿手置于桌上，主试者先放一块积木在婴儿手 中，再放另一块积木于桌上婴儿可及范围内，适当逗引， 观察婴儿对第二块积木的反应',
        meetConditions: '婴儿拿着放在手中的第一块 积木，当第二块积木靠近时， 目光明确地注视第二块积木'
      }, {
        detail: '观察或询问婴儿看到熟悉的人或玩具时的发音',
        meetConditions: '观察或询问，婴儿会发出象说 话般的声音，如伊伊呀呀、ma、 pa、ba等辅元结合音'
      }, {
        detail: '将无边镜子竖放在婴儿面前约20cm处，主试者及家长影 像不能在镜内出现，观察婴儿反应',
        meetConditions: '对镜中自己的影像有面部表 情变化或伴有肢体动作。'
      }, {
        detail: '观察婴儿看到奶瓶、饼干、水等食物时的反应',
        meetConditions: '观察或询问，当婴儿看到奶瓶 或母亲乳房时，表现出高兴要 吃的样子'
      }, {
        detail: '婴儿仰卧，用玩具逗引其翻身',
        meetConditions: '观察或询问，婴儿可从仰卧自 行翻到俯卧位'
      }, {
        detail: '抱坐，主试者示范拍打桌面，鼓励婴儿照样做',
        meetConditions: '婴儿经示范后或自发拍打桌 面，并拍响'
      }, {
        detail: '将一张28g粉色打字纸放入婴儿手中，使婴儿能抓住纸， 观察婴儿反应',
        meetConditions: '能用双手反复揉搓纸张两次 或以上，或将纸撕破'
      }, {
        detail: '抱坐，放一积木在婴儿容易够到的桌面上，观察婴儿反 应',
        meetConditions: '婴儿伸出手触碰到积木并抓 握到'
      }, {
        detail: '抱坐，先后递给婴儿两块积木，婴儿自己拿或被动放在 手中均可',
        meetConditions: '婴儿一手拿一块积木，保持在 手里10s或以上'
      }, {
        detail: '以红球逗引婴儿注意，红球位置应与婴儿双眼在同一水 平线上。主试者手提红球，当婴儿注意到红球后，立即 松手使红球落地，此时主试者的手保持原姿势，观察婴 儿反应',
        meetConditions: '红球落地后，婴儿立即低下头 寻找红球'
      }, {
        detail: '主试者或家长在婴儿背后呼唤其名字，观察其反应',
        meetConditions: '婴儿会转头寻找呼唤的人'
      }, {
        detail: '主试者或妈妈(带养人)伸手表示要抱，不得出声提示，观察婴儿反应',
        meetConditions: '婴儿理解并将手伸向主试者 或妈妈(带养人)，二试一成'
      }, {
        detail: '观察或询问婴儿拿到一块饼干或其他能拿住的食物时， 能否送至口中并咀嚼',
        meetConditions: '能将饼干送入口中并咀嚼，有 张嘴咬的动作而不是吸吮'
      }, {
        detail: '主试者把自己的脸藏在一张中心有孔的A4纸后面(孔直 径0.5cm)，呼唤婴儿名字，婴儿听到声音，观望时，主 试者沿纸边在纸的同一侧反复出现两次并逗引说“喵、 喵”，第三次呼唤婴儿名字后从纸孔观察婴儿表情',
        meetConditions: '第三次呼唤婴儿时，婴儿视线 再次转向主试者刚才露脸的 方向'
      }, {
        detail: '扶腋下使婴儿呈悬空位，足离床面20cm~30cm，立位瞬 时落下，观察脚落地瞬时的姿势',
        meetConditions: '婴儿能全脚掌着地'
      }, {
        detail: '将婴儿以坐姿置于床上',
        meetConditions: '独坐时背直，无需手支撑床 面，保持1min或以上'
      }, {
        detail: '抱坐，将一小丸放在桌上，鼓励婴儿取',
        meetConditions: '婴儿用所有手指弯曲做耙弄、 搔抓动作，最后成功地用全掌 抓到小丸'
      }, {
        detail: '抱坐，出示一积木给婴儿，抓住后，再出示另一块，观 察其反应',
        meetConditions: '婴儿主动伸手去抓桌上的积 木，第一块积木握住并保留在 手中后，又成功地用另一只手 抓住第二块积木'
      }, {
        detail: '抱坐，出示一积木给婴儿，婴儿拿住后，再向拿积木的 手前出示另一块积木，观察其反应',
        meetConditions: '婴儿将第一块积木传到另一 只手后，再去拿第二块积木'
      }, {
        detail: '抱坐，将一玩具放于婴儿手恰好够不到的桌面上，观察 其反应',
        meetConditions: '欠身取，并能拿到玩具'
      }, {
        detail: '观察婴儿在清醒状态时的发声情况',
        meetConditions: '观察或询问，婴儿会发 da-da 、ma-ma的双唇音，但 无所指'
      }, {
        detail: '婴儿仰卧，观察其是否会自发或在主试者协助下将脚放 入手中后玩脚',
        meetConditions: '婴儿能抱住脚玩或吸吮'
      }, {
        detail: '观察或询问婴儿对陌生人的反应',
        meetConditions: '婴儿有拒抱、哭、不高兴或惊 奇等表现'
      }, {
        detail: '将婴儿置于床上，协助婴儿双手抓握栏杆，胸部不靠栏 杆，呈站立姿势观察',
        meetConditions: '双手扶栏杆支撑全身重量，保 持站立位5s或以上'
      }, {
        detail: '婴儿坐位，用玩具逗引，婴儿上身可自由转动取物，或 轻轻将婴儿肩头向对侧推，观察其侧平衡',
        meetConditions: '独坐时无须手支撑，上身可自 由转动取物或侧推后回正保 持平衡不倒'
      }, {
        detail: '抱坐，将一小丸放在桌上，鼓励婴儿取',
        meetConditions: '婴儿会用拇他指捏起小丸'
      }, {
        detail: '连续出示两块积木后婴儿均能拿到，再出示第三块积木 鼓励婴儿取',
        meetConditions: '有要取第三块积木的表现，不 一定能取到，前两块仍保留在 手中'
      }, {
        detail: '主试者示范摇铃，鼓励婴儿照样做',
        meetConditions: '婴儿能够有意识地摇铃'
      }, {
        detail: '以玩具逗引婴儿来取，将要取到时，主试者将玩具移动 到稍远的地方，观察其反应',
        meetConditions: '婴儿持续追逐玩具，力图拿 到，但不一定取到'
      }, {
        detail: '观察或询问婴儿是否会模仿咳嗽、弄舌的声音',
        meetConditions: '观察或询问，婴儿能模仿发出 类似声音'
      }, {
        detail: '主试者询问家长，婴儿是否常有主动伸手表示要抱;摊 开手表示没有;咂咂嘴表示好吃等动作手势',
        meetConditions: '三问中，有两项表现即可通过'
      }, {
        detail: '主试者或家长对婴儿训斥或赞许，观察其反应',
        meetConditions: '婴儿表现出委屈或兴奋等反 应'
      }, {
        detail: '站立位，主试者牵婴儿双手，牵手时不过多给力，鼓励 婴儿向前行走',
        meetConditions: '婴儿可自己用力，较协调地移 动双腿，向前行走三步或以上'
      }, {
        detail: '婴儿俯卧，用玩具逗引婴儿爬',
        meetConditions: '婴儿能将腹部抬离床面，四点 支撑向前爬行(膝手爬)'
      }, {
        detail: '抱坐，将一小丸放在桌上，鼓励婴儿取',
        meetConditions: '婴儿会用拇食指捏起小丸'
      }, {
        detail: '主试者在婴儿注视下将积木放入杯中，鼓励婴儿取出',
        meetConditions: '婴儿能自行将积木取出，不能 倒出'
      }, {
        detail: '主试者出示两块积木，示范积木对敲后，让婴儿一手拿 一块，鼓励其照样做',
        meetConditions: '婴儿能把双手合到中线，互敲 积木，对击可不十分准确'
      }, {
        detail: '主试者轻摇铜铃以引起婴儿注意，然后将铜铃递给婴儿，观察其对铜铃的反应',
        meetConditions: '婴儿有意识寻找并拨弄或拿 捏铃舌'
      }, {
        detail: '主试者只说欢迎，不做手势示范，鼓励婴儿以手势表示',
        meetConditions: '观察或询问，婴儿能够做出欢 迎的手势'
      }, {
        detail: '主试者只说再见，不做手势示范，鼓励婴儿以手势表示',
        meetConditions: '观察或询问，婴儿能够做出再 见的手势'
      }, {
        detail: '观察或询问婴儿对不感兴趣的物品的反应',
        meetConditions: '观察或询问，婴儿对不要之物 有摇头或推开的动作'
      }, {
        detail: '主试者站立在床或桌边，由婴儿背后扶持其腋下抱起， 然后快速做俯冲动作，观察婴儿反应',
        meetConditions: '婴儿出现双手张开，向前伸 臂，类似保护自己的动作'
      }, {
        detail: '将婴儿置于俯卧位，用玩具逗引，观察婴儿能否坐起',
        meetConditions: '无需协助，婴儿能较协调地从 俯卧位坐起，并坐稳'
      }, {
        detail: '抱坐，将一小丸放在桌上，鼓励婴儿取',
        meetConditions: '婴儿会用拇食指的指端协调、熟练且迅速地对捏起小丸'
      }, {
        detail: '积木放在桌上，在婴儿注视下用杯子盖住积木，杯子的 把手对着婴儿，鼓励婴儿取积木',
        meetConditions: '婴儿能主动拿掉杯子，取出藏 在杯子里面的积木'
      }, {
        detail: '在婴儿面前摇响装有硬币的盒，然后避开婴儿将硬币取 出，给婴儿空盒，观察其反应',
        meetConditions: '婴儿能明确地寻找盒内的硬 币'
      }, {
        detail: '观察或询问婴儿是否会模仿“妈妈”、“爸爸”、“拿”、 “走”等语音',
        meetConditions: '观察或询问，婴儿能模仿发语 声'
      }, {
        detail: '主试者问婴儿 “妈妈在哪里?”“灯在哪里?”“阿姨 在哪里?”等人或物的名称，观察其反应',
        meetConditions: '婴儿会用眼睛注视或指出2种 或以上的人或物'
      }, {
        detail: '将娃娃、球和杯子并排放在婴儿双手可及的桌面上，鼓 励婴儿按指令取其中的一件。(每样东西交替问两次， 不能连续问)',
        meetConditions: '婴儿能理解指令并成功拿对 其中一种或一种以上物品'
      }, {
        detail: '将婴儿置于立位，待婴儿站稳后松开双手，观察其站立 情况',
        meetConditions: '婴儿能独自站立2s或以上'
      }, {
        detail: '婴儿手扶围栏站立，不得倚靠。将玩具放在其脚边，鼓 励婴儿下蹲取物',
        meetConditions: '一手扶栏杆蹲下，用另一只手 捡玩具，并能再站起来'
      }, {
        detail: '主试者示范将积木放入杯中，鼓励婴儿照样做',
        meetConditions: '婴儿能有意识地将积木放入 杯中并撒开手'
      }, {
        detail: '在婴儿注视下用方巾包起一积木，然后打开，再包上， 鼓励婴儿找',
        meetConditions: '婴儿有意识地打开包积木的 方巾，寻找积木，成功将积木 拿到手'
      }, {
        detail: '主试者示范拍娃娃，鼓励婴儿照样做',
        meetConditions: '婴儿学大人样子轻拍娃娃'
      }, {
        detail: '观察或询问婴儿有意识的发音情况',
        meetConditions: '观察或询问，有意识并正确地 发出相应的字音，如爸、妈、 拿、走、姨、奶、汪汪等'
      }, {
        detail: '婴儿取一玩具玩时，主试者说“不动”、“不拿”，不 要做手势，观察或询问其反应',
        meetConditions: '观察或询问，婴儿会停止拿取 玩具的动作'
      }, {
        detail: '观察或询问婴儿能否从成人拿的杯子里喝到水',
        meetConditions: '观察或询问，婴儿能从杯中喝 到水'
      }, {
        detail: '主试者将帽子戴在婴儿头上，观察其能否摘下帽子',
        meetConditions: '婴儿能用单手或双手摘下帽 子'
      }, {
        detail: '将小儿置于立位，待小儿站稳后松开双手，观察其站立 情况',
        meetConditions: '独自站立10s或以上，允许身 体轻微晃动'
      }, {
        detail: '主试者牵小儿一只手行走，不要用力，观察其行走情况',
        meetConditions: '小儿自己迈步，牵一手能协调 地移动双腿，至少向前迈三步 以上'
      }, {
        detail: '主试者示范用笔在纸上画道，鼓励小儿模仿',
        meetConditions: '小儿握笔在纸上留下笔道即 可'
      }, {
        detail: '出示一小丸及30ml广口试剂瓶，主试者拿瓶，示范并指 点将小丸放入瓶内，鼓励小儿照样做',
        meetConditions: '小儿捏住小丸试往瓶内投放，但不一定成功'
      }, {
        detail: '瓶盖翻放在桌上，主试者示范将瓶盖盖在瓶上，鼓励小 儿照样做',
        meetConditions: '小儿会将瓶盖翻正后盖在瓶 上'
      }, {
        detail: '观察或询问小儿见到妈妈、爸爸时，是否会有意识并准 确地叫出',
        meetConditions: '小儿会主动地称呼爸爸或妈 妈'
      }, {
        detail: '将一玩具放入小儿手中，然后主试者或家长对小儿说“把 某某东西给我”，不要伸手去拿，观察小儿反应',
        meetConditions: '经要求，小儿把玩具主动递给 主试者或家长，并主动松手'
      }, {
        detail: '观察或询问成人给小儿穿衣时的配合情况',
        meetConditions: '穿衣时小儿合作，会有伸手、 伸腿等配合动作，不一定穿进 去'
      }, {
        detail: '观察或询问，对家长指示的某一场景或过程，小儿能否 与家长一起关注',
        meetConditions: '小儿有共同注意过程'
      }, {
        detail: '观察小儿走路的情况',
        meetConditions: '小儿行走自如，不左右摇摆，会控制步速，不惯性前冲'
      }, {
        detail: '主试者出示纸和笔，鼓励小儿画画',
        meetConditions: '小儿能用笔在纸上自行乱画'
      }, {
        detail: '出示装有小丸的30ml广口试剂瓶，递给小儿，说“阿姨 想要豆豆(小丸)怎么办?”或“把豆豆给妈妈”。鼓 励小儿将小丸取出，但不能说倒出',
        meetConditions: '小儿能将小丸拿出或倒出'
      }, {
        detail: '主试者示范翻书，鼓励小儿照样做',
        meetConditions: '做出翻书动作两次或以上'
      }, {
        detail: '主试者示范将圆盒盖好，鼓励小儿照样做',
        meetConditions: '小儿会将圆盒盖上，并盖严'
      }, {
        detail: '主试者问小儿“眼在哪儿?”“耳在哪儿?”“鼻子在 哪儿?”等，观察其反应',
        meetConditions: '能正确指出3个或3个以上身 体部位'
      }, {
        detail: '观察或询问小儿有意识讲话的情况',
        meetConditions: '有意识地说3~5个字(妈、爸 除外)'
      }, {
        detail: '观察或询问小儿脱袜子的方法',
        meetConditions: '观察或询问，小儿能正确且有 意识地脱下袜子'
      }, {
        detail: '主试者示范过肩扔球，鼓励小儿照样做',
        meetConditions: '小儿举手过肩扔球，可无方向'
      }, {
        detail: '主试者示范用蜡笔画出一无方向道道，鼓励小儿模仿',
        meetConditions: '小儿能画出道道，起止自如，方向不限'
      }, {
        detail: '示范搭高两块积木，推倒后一块一块出示积木，鼓励小 儿搭高',
        meetConditions: '小儿搭高四块积木或以上，三 试一成'
      }, {
        detail: '在型板圆孔下方放一圆积木，圆孔靠近小儿身体。主试 者对小儿说“这是小朋友的家(指型板面而不是圆孔)， 请帮这个小朋友(指圆积木)找到自己的家”，不示范',
        meetConditions: '不经指点，能正确将圆积木一 次性放入孔内'
      }, {
        detail: '请小儿把三块积木分别递给妈妈、阿姨、放在桌子上， 妈妈阿姨不能伸手要',
        meetConditions: '小儿会正确地将积木送到要 求的地方'
      }, {
        detail: '观察或询问小儿有意识讲话的情况并记录',
        meetConditions: '有意识说10个或以上单字或 词(爸、妈除外)'
      }, {
        detail: '观察或询问小儿大小便控制情况，或询问白天是否尿湿 裤子',
        meetConditions: '经人提醒或主动示意大小便，白天基本不尿湿裤子'
      }, {
        detail: '观察或询问小儿是否会自己用匙',
        meetConditions: '小儿能自己用匙吃饭，允许少 量遗洒'
      }, {
        detail: '主试者示范用脚尖行走，鼓励小儿照样做',
        meetConditions: '小儿能用脚尖连续行走三步 以上，脚跟不得着地'
      }, {
        detail: '在楼梯上放一玩具，鼓励小儿上楼去取',
        meetConditions: '小儿能扶楼梯扶手，熟练地上 三阶以上台阶。'
      }, {
        detail: '主试者示范用水晶线穿过扣眼，鼓励小儿照样做',
        meetConditions: '小儿能将水晶线穿过扣眼 0.5cm以上'
      }, {
        detail: '示范拉拉锁，拉上、拉下各一次。主试者固定拉锁两端，鼓励小儿照样做',
        meetConditions: '小儿能双手配合将锁头来回 移动，超过全拉锁的一半'
      }, {
        detail: '示范搭高两块积木，推倒后一块一块出示积木，鼓励小 儿搭高',
        meetConditions: '小儿搭高7~8块积木，三试一 成'
      }, {
        detail: '出示红、黄、蓝、绿四色图片，问小儿“哪个是红色?”',
        meetConditions: '小儿能在四色图片中正确指 出红色'
      }, {
        detail: '主试者问“这是什么(球)?”“那是谁(带小儿者)?” “爸爸干什么去了(上班)?”',
        meetConditions: '小儿均能正确回答'
      }, {
        detail: '观察或询问小儿有意识说话的情况',
        meetConditions: '小儿能有意识地说出3~5个 字的句子，有主谓语'
      }, {
        detail: '观察或询问小儿是否会明确表示自己的需要',
        meetConditions: '小儿会说出三种或以上的需 要，如“吃饭、喝水、玩汽车、 上街”等，可伴手势'
      }, {
        detail: '观察或询问小儿是否有想象性游戏，如假装给娃娃或动 物玩具喂饭、盖被子、打针等',
        meetConditions: '小儿有想象性游戏'
      }, {
        detail: '主试者示范双足同时离地跳起，鼓励小儿照样做',
        meetConditions: '小儿会双足同时跳离地面，同 时落地，两次以上'
      }, {
        detail: '主试者示范用水晶线穿过扣眼，并将线拉出，鼓励小儿 照样做',
        meetConditions: '小儿能将水晶线穿过扣眼，并 能将线拉出'
      }, {
        detail: '主试者示范一页页翻书，鼓励小儿照样做',
        meetConditions: '小儿会用手捻书页，每次一 页，连续翻书三页或以上'
      }, {
        detail: '在小儿能正放圆积木入型板的基础上，将型板倒转 180°。圆积木仍在原处，主试者对小儿说“这是小朋友 的家(指型板)，请帮这个小朋友(指圆积木)找到自 己的家”，不示范',
        meetConditions: '型板倒转后，小儿能正确将圆 积木一次性放入圆孔内'
      }, {
        detail: '鼓励小儿说唐诗或儿歌',
        meetConditions: '小儿能自发或稍经提示开头 后完整说出两句或以上唐诗 或儿歌'
      }, {
        detail: '主试者分别提问小儿碗、笔、板凳、球的用途',
        meetConditions: '小儿会说出三种或以上物品 的用途'
      }, {
        detail: '示范或不示范小儿见人打招呼',
        meetConditions: '小儿会自发或模仿说“你好”、 “再见”等'
      }, {
        detail: '观察或询问，小儿在见到某物时，是否能自发提问“这 是什么?”',
        meetConditions: '小儿会自发提出问题，主动问 “这是什么?”'
      }, {
        detail: '鼓励小儿不扶扶手上楼梯，可示范',
        meetConditions: '不扶扶手，稳定地上楼梯三阶 或以上'
      }, {
        detail: '鼓励小儿不扶扶手下楼梯，可示范',
        meetConditions: '不扶扶手，稳定地下楼梯三阶 或以上'
      }, {
        detail: '主试者与小儿同向，示范画一垂直线，注意测查纸张放 正，鼓励小儿模仿',
        meetConditions: '小儿能画竖线，长度>2.5cm， 所画线与垂直线的夹角应 <30°'
      }, {
        detail: '出示打开的拉锁，示范将拉锁对好，鼓励小儿照样做',
        meetConditions: '小儿能将拉锁头部分或全部 插进锁孔'
      }, {
        detail: '主试者向小儿出示大小圆片，请小儿把大的给妈妈或阿 姨',
        meetConditions: '小儿会正确把大的给妈妈或 阿姨，三试二成'
      }, {
        detail: '将圆、方、三角形三块积木放在与型板相应的孔旁，主 试者对小儿说“这是小朋友的家(指型板)，请帮这些 小朋友(指三块积木)找到自己的家”，不示范。放置 三角型积木方向要与型板一致',
        meetConditions: '小儿能一次性正确放入相应 孔内，仅等腰三角形可提示'
      }, {
        detail: '主试者说一句话“星期天妈妈带我去公园”，可重复一 遍，鼓励小儿复述',
        meetConditions: '小儿能复述出7个字及以上， 不影响句意表达'
      }, {
        detail: '主试者对小儿说“请举举你的手”和“请抬抬你的脚”，可重复指令一遍，但不能有示范的动作，观察小儿反应',
        meetConditions: '小儿能按指令做出举手或抬 脚动作'
      }, {
        detail: '观察或询问小儿是否会自己脱上衣或裤子',
        meetConditions: '小儿不用帮忙，自己脱掉单衣 或单裤'
      }, {
        detail: '主试者问小儿“打人对不对?”，观察小儿的反应或回 答',
        meetConditions: '小儿摇头或说出不对'
      }, {
        detail: '主试者示范用独脚站立，鼓励小儿照样做',
        meetConditions: '小儿不扶任何物体可单脚站 立2s或以上'
      }, {
        detail: '主试者示范连续穿扣3~5个，鼓励小儿照样做',
        meetConditions: '小儿能较熟练穿扣并拉过线3 个或以上'
      }, {
        detail: '示范用下面二块，上面一块共三块积木搭成有孔的桥， 并保留模型，鼓励小儿照样做。主试者不得提示桥孔',
        meetConditions: '小儿能搭出有孔的桥'
      }, {
        detail: '一块和数块积木分放两边，请小儿指出哪边是多的，再 指另一边问“这是几个?”',
        meetConditions: '小儿先正确指出哪一边多，后 回答“是1个”'
      }, {
        detail: '在小儿正放三块积木入型板的基础上，将型板倒转 180°，三块积木仍在原处，主试者对小儿说“这是小朋 友的家(指型板)，请帮这些小朋友(指三块积木)找 到自己的家”，不示范',
        meetConditions: '小儿能一次性正确放入翻转 后型板的相应孔内，仅等腰三 角形可提示'
      }, {
        detail: '出示图片，依次指给小儿看，鼓励其说出图片名称',
        meetConditions: '小儿能正确说出10样及以上。 记录1.北极熊2.树叶3.小鸡 4.青蛙5.螳螂6.猕猴桃7.树 8.房子9.雨伞10.壶11.铅笔 12.钥匙13.打印机14.刀15. 电脑16.管钳17.轮船18.毛笔 和砚台19.国旗20.脚21.嘴唇 22.步枪23.雪花24中国结'
      }, {
        detail: '主试者问小儿“你叫什么名字?”',
        meetConditions: '小儿能正确回答自己的大名'
      }, {
        detail: '在一个无把儿的杯中注入1/3杯水，主试者示范将水倒入 另一杯中，来回各倒一次，鼓励小儿照样做',
        meetConditions: '小儿会将水来回倒两次，不洒 水'
      }, {
        detail: '出示图片，问小儿 “乱扔垃圾是不对的，你看这个小女 孩吃完的果皮应该扔哪儿?”，鼓励小儿回答',
        meetConditions: '小儿能正确回答或指出应该 扔垃圾筐'
      }, {
        detail: '主试者示范跳过16开白纸(20cm宽)，鼓励小儿照样做',
        meetConditions: '小儿双足同时离地跳起跃过 纸，不得踩到纸'
      }, {
        detail: '主试者示范画一圆形，鼓励小儿模仿',
        meetConditions: '小儿所画圆二头相交，为闭合 圆形，不能明显成角'
      }, {
        detail: '出示打开的拉锁，示范将拉锁对好并拉上，鼓励小儿照 样做',
        meetConditions: '小儿能将拉锁头全部插进锁 孔，并有拉的意识'
      }, {
        detail: '示范搭高二块积木，推倒后一块一块出示积木，鼓励小 儿搭高。允许试三次',
        meetConditions: '小儿能搭高积木10块。三试一 成'
      }, {
        detail: '嘱小儿做三件事擦桌子、摇铃、把门打开，可再重复命 令一遍。小儿开始做后，不能再提醒或给予暗示',
        meetConditions: '小儿会做每件事情，没有遗忘 任何一项，但顺序可颠倒'
      }, {
        detail: '主试者问小儿性别，若是女孩问“你是女孩还是男孩?”; 若是男孩问“你是男孩还是女孩?”',
        meetConditions: '小儿能正确说出自己的性别'
      }, {
        detail: '主试者将一小丸放入30毫升广口试剂瓶内问“小丸是在 瓶里?还是在瓶外?”',
        meetConditions: '小儿会正确说出是在里边'
      }, {
        detail: '主试者将小儿鞋脱下，鞋尖对着小儿，鼓励其穿上',
        meetConditions: '小儿会穿进鞋并将鞋提上，不 要求分左右'
      }, {
        detail: '出示娃娃，鼓励小儿解扣子，主试者应辅助小儿固定娃 娃衣服',
        meetConditions: '小儿会自己解开某一个扣子'
      }, {
        detail: '主试者示范以高抬腿姿势原地交替跳起，鼓励小儿照样 做',
        meetConditions: '小儿可双足交替跳起，双脚离 地5cm'
      }, {
        detail: '主试者与小儿同向示范画交叉线，鼓励小儿模仿',
        meetConditions: '小儿能画出两直线并相交成 角，直线线条较连续'
      }, {
        detail: '主试者出示螺丝、螺母，嘱其拧上。如小儿不会，可示 范',
        meetConditions: '小儿能双手配合将螺丝、螺母 组装起来'
      }, {
        detail: '主试者出示三块积木，问小儿“这是几块?”',
        meetConditions: '小儿能正确说出“三块”'
      }, {
        detail: '出示红、黄、蓝、绿四色图片，先从非红色开始问，避 免顺口溜出，请小儿说出各为何种颜色',
        meetConditions: '能正确说出两种或以上颜色'
      }, {
        detail: '出示图片，依次指给小儿看，鼓励其说出图片名称',
        meetConditions: '小儿能正确说出14样及以上。 记录1.北极熊2.树叶3.小鸡 4.青蛙5.螳螂6.猕猴桃7.树 8.房子9.雨伞10.壶11.铅笔 12.钥匙13.打印机14.刀15. 电脑16.管钳17.轮船18.毛笔 和砚台19.国旗20.脚21.嘴唇 22.步枪23.雪花24中国结'
      }, {
        detail: '观察小儿在说话时的发音情况',
        meetConditions: '小儿会发清楚大多数语音，不 影响交流'
      }, {
        detail: '主试者依次问“饿了怎么办?冷了怎么办?累了怎么 办?”',
        meetConditions: '小儿能正确回答两问或以上 吃饭、穿衣、休息等'
      }, {
        detail: '出示娃娃，鼓励小儿扣扣子，主试者应辅助小儿固定娃 娃衣服',
        meetConditions: '小儿能自己扣上娃娃的某一 个扣子'
      }, {
        detail: '主试者示范不扶扶手，双足交替上楼，鼓励小儿照样做',
        meetConditions: '小儿上台阶交替用脚，一步一 台阶，可交替上楼三阶或以上'
      }, {
        detail: '主试者示范站在楼梯末级，双足并拢跳至地面，鼓励小 儿照样做',
        meetConditions: '小儿双足并拢跳至地面，双足 落地后两脚间距离小于10cm'
      }, {
        detail: '主试者让小儿用4块塑料板拼圆形，用2块等边三角形板 拼正方形，共限时2min',
        meetConditions: '两个图形均要拼对'
      }, {
        detail: '主试者示范用打印纸剪一直线，鼓励小儿照样做',
        meetConditions: '小儿能够剪出直线，长度大于 10cm，与主剪方向角度小于 15°'
      }, {
        detail: '主试者出示五块积木，问小儿“这是几块?”',
        meetConditions: '小儿能正确说出“五块”'
      }, {
        detail: '主试者出示红、黄、蓝、绿四色图片，先从非红色开始 问，避免顺口溜出，请小儿说出各为何种颜色',
        meetConditions: '四种颜色全部答对'
      }, {
        detail: '主试者分别问(1)火是热的，冰呢?(2)大象的鼻子 是长的，小兔的尾巴呢?(3)头发是黑的，牙齿呢?(4) 木头是硬的，棉花呢?',
        meetConditions: '四题中答对两个或以上'
      }, {
        detail: '主试者依次出示积木△〇□，问小儿“这是什么形状?”',
        meetConditions: '小儿能正确回答三个图形的 名称'
      }, {
        detail: '观察小儿是否会穿上衣',
        meetConditions: '小儿无需大人帮忙，会穿上衣 并将扣子扣好或拉锁拉好'
      }, {
        detail: '主试者问小儿“吃饭之前为什么要洗手”?',
        meetConditions: '小儿能回答出原因“为避免生 病”等'
      }, {
        detail: '主试者示范用独脚站立，鼓励小儿照样做',
        meetConditions: '小儿独脚站立5s或以上，身体 稳定'
      }, {
        detail: '主试者示范站在楼梯末级，双足并拢跳至地面，鼓励小 儿照样做',
        meetConditions: '小儿双足并拢跳至地面，双足 落地后两脚间距离小于5cm， 并站稳'
      }, {
        detail: '主试者示范画一正方形，鼓励小儿模仿',
        meetConditions: '小儿能基本模仿画出，所画图 形允许稍有倾斜，有一个角可 以<45°'
      }, {
        detail: '主试者出示组装好的螺丝图片5s后收起，将分开的螺丝、 平垫和螺母交给小儿，请小儿凭记忆组装。主试者可针 对落下的零件提示“还有呢?”',
        meetConditions: '小儿无需提示或稍经提示后 自行将螺丝、平垫、螺母按顺 序组装起来'
      }, {
        detail: '出示找不同图画，主试者问小儿两张图画有什么不同之 处?小熊示教，限时2min',
        meetConditions: '能找到包括示教内容的3处不 同或以上'
      }, {
        detail: '出示补缺图片，主试者问小儿各图中缺什么?第一幅图 示教',
        meetConditions: '要求说对包括示教内容的三 幅图或以上'
      }, {
        detail: '主试者说一句话“妈妈叫我一定不要和小朋友打架”， 可重复一遍，鼓励小儿复述',
        meetConditions: '小儿能够复述较完整的复合 句，偶尔漏字/错字'
      }, {
        detail: '主试者问(1)锅是做什么用的?(2)手机是干什么用 的?(3)眼睛有什么作用?',
        meetConditions: '三问均正确。'
      }, {
        detail: '观察或询问小儿能否做集体游戏',
        meetConditions: '小儿能主动参加集体游戏，并 能遵守游戏规则'
      }, {
        detail: '出示男女厕所标识图片，问小儿应该进哪个厕所，并提 问“为什么”',
        meetConditions: '小儿能正确识别标志并用语 言表达出性别意义'
      }, {
        detail: '主试者示范用独脚站立，鼓励小儿照样做',
        meetConditions: '小儿独脚站立10s或以上，身 体稳定'
      }, {
        detail: '主试者示范，脚跟对脚尖向前走直线，鼓励小儿照样做',
        meetConditions: '小儿能脚跟对脚尖向前走2m (六步)，允许身体有小幅晃 动'
      }, {
        detail: '主试者示范用一长方形纸横竖对齐各折一次，鼓励小儿 照样做',
        meetConditions: '小儿折纸基本成长方形，折纸 边差距<1cm，纸边夹角< 15°'
      }, {
        detail: '主试者鼓励小儿用筷子夹花生米，从桌子上夹到盒子里，连做三遍',
        meetConditions: '小儿熟练地夹起三次以上，过 程中无掉落'
      }, {
        detail: '主试者给小儿一个圆形扣子，然后出示第一组模板(包 括圆型、方型、三角型)，问“你手里的东西和我这些 东西哪些是一类的?为什么?”然后收起，再出示第二 组模版(包括方型钮扣、三角型、方型)，提问同上',
        meetConditions: '两问均答对'
      }, {
        detail: '出示补缺图片，主试者问小儿各图中缺什么?第一幅图 示教',
        meetConditions: '要求说对包括示教内容的四 幅图或以上'
      }, {
        detail: '观察小儿是否会漱口',
        meetConditions: '小儿能灵活左右漱口并将水 吐出'
      }, {
        detail: '主试者出示图片，随意指出10以内数字，让小儿认',
        meetConditions: '小儿全部正确答出'
      }, {
        detail: '如在上午测试，主试者问(1)现在是上午还是下午?(2) 太阳落山是在下午还是上午? 如在下午测试，则主试 者问(1)现在是下午还是上午?(2)太阳升起是在上 午还是下午?',
        meetConditions: '两问均回答正确'
      }, {
        detail: '主试者问小儿一只手有几个手指，如答对，再问两只手 有几个手指',
        meetConditions: '小儿会心算出两手有十个手 指'
      }, {
        detail: '主试者示范原地单脚跳，鼓励小儿照样做',
        meetConditions: '小儿能单脚连续跳3次或以 上，可伸开双臂保持平衡，允 许小儿在一脚范围内跳动'
      }, {
        detail: '主试者示范在一级台阶上以同一只脚上下台阶，鼓励小 儿照样做',
        meetConditions: '小儿以同一只脚能稳当并较 熟练地完成3组，可稍有停顿'
      }, {
        detail: '将事先画好的椭圆形放在小儿面前，瞩其将6块塑料片按 图分别放进去，不予提醒，限时2min',
        meetConditions: '小儿全部拼对'
      }, {
        detail: '主试者给小儿出示一张已画好圆形(直径7.5cm米)的1/2 A4打印纸，鼓励小儿将圆形剪下(附原图)',
        meetConditions: '小儿能剪出大致圆形，允许出 角'
      }, {
        detail: '出示找不同图画，主试者问小儿两张图画有什么不同之 处?小熊示教。限时2min',
        meetConditions: '能找到包括示教内容的5处不 同或以上'
      }, {
        detail: '出示补缺图片，主试者问小儿各图中缺什么?第一幅图 示教',
        meetConditions: '要求说对包括示教内容的五 幅图或以上'
      }, {
        detail: '主试者问小儿“你姓什么?”',
        meetConditions: '小儿正确回答出姓，连名带姓 不能通过'
      }, {
        detail: '主试者让小儿说出两种圆形的东西',
        meetConditions: '小儿能说出两种或以上圆形 的东西'
      }, {
        detail: '主试者问小儿“你家住在哪里?”，或追问“你再说详 细些，我怎么送你回家呢?”',
        meetConditions: '小儿说出的住址可使他人较 容易找到'
      }, {
        detail: '主试者示范用双手而非前胸接球，然后与小儿相距一米，将球拍给小儿，鼓励小儿用手接住球',
        meetConditions: '小儿用手接住球，三次中接住 一次即可，用双臂或用前胸接 球不通过'
      }, {
        detail: '主试者示范，脚跟对脚尖向后走直线，鼓励小儿照样做',
        meetConditions: '小儿能脚跟对脚尖向后走2m (六步)，允许身体有小幅晃 动'
      }, {
        detail: '主试者让小儿写出自己的名字',
        meetConditions: '小儿能正确写出自己的名字。'
      }, {
        detail: '主试者给小儿出示一张已画好圆形(直径7.5cm)的1/2 A4 打印纸，鼓励小儿将圆形剪下(附原图)',
        meetConditions: '小儿能剪出平滑的圆形，无成 角、毛边'
      }, {
        detail: '主试者问小儿“两棵树之间站一个人，一排三棵树之间 站几个人?”',
        meetConditions: '小儿回答“两个人。”'
      }, {
        detail: '主试者问小儿“将一个苹果十字切开是几块?”如小儿 不理解，主试者可用手势比划提示',
        meetConditions: '不经提示或仅在主试者手势 比划提示后答“四块”'
      }, {
        detail: '主试者问小儿“你是属什么的?”',
        meetConditions: '小儿能正确说出自己的属相'
      }, {
        detail: '主试者先示教“你会倒着数数吗?1、2、3倒数就是„„3、 2、1，现在请你从24开始倒数，24、23、22、21„„”， 鼓励小儿完成倒数',
        meetConditions: '小儿能较流利地正确数出 13~1'
      }, {
        detail: '主试者问小儿:“过马路为什么要走人行横道?”',
        meetConditions: '小儿能正确回答。为了安全，如怕被汽车撞了等'
      }, {
        detail: '出示鸡在水中游图画，主试者问小儿画的对不对，如回 答“不对”，问哪里画错了',
        meetConditions: '小儿能正确回答鸡不能在水 里游泳'
      }, {
        detail: '主试者示范原地抱肘单脚跳，鼓励小儿照样做',
        meetConditions: '小儿抱肘单脚原地连续跳3次 或以上，基本在原地跳动'
      }, {
        detail: '主试者示范拍球，鼓励小儿照样做(向下扔落地的第一 下不算拍球)。允许试三次',
        meetConditions: '小儿连续拍球2个或以上'
      }, {
        detail: '主试者让小儿用2块非等边三角形板拼长方形，出示时要 求短边相对，限时2min',
        meetConditions: '小儿拼对长方形'
      }, {
        detail: '主试者出示正方形和圆形的组合图形，鼓励小儿临摹。',
        meetConditions: '小儿能画出，无转向'
      }, {
        detail: '出示找不同图画，主试者问小儿两张图画有什么不同之 处?小熊示教。限时2min',
        meetConditions: '能找到包括示教内容的7处不 同或以上'
      }, {
        detail: '主试者让小儿用左手摸右耳朵，右手摸左耳朵，右手摸 右腿',
        meetConditions: '小儿全部做对'
      }, {
        detail: '主试者出示三幅连环画，然后对小儿说“这三幅图连起 来讲了一个故事，请你给我讲一讲故事的内容是什么? 小猴子为什么哭了?”若小儿回答第一问后不再答，可 再追问“小猴子为什么哭了?”',
        meetConditions: '能分别描述每张图画的基本 内容'
      }, {
        detail: '主试者问(1)人为什么要上班?—挣钱或建设国家(2) 房子为什么要有窗户?—透光或通风(3)苹果和香蕉有 什么共同点?—水果',
        meetConditions: '答对两题或以上。 (1)挣钱或建设国家;(2) 透光或通风;(3)水果'
      }, {
        detail: '主试者问小儿一年有哪四个季节',
        meetConditions: '春、夏、秋、冬，顺序可以颠 倒'
      }, {
        detail: '依次出示两组标识图片，问“哪一个是代表危险的标志? 为什么?”',
        meetConditions: '两组图均正确指出危险的标 志，并说对理由'
      }, {
        detail: '主试者示范用一手提绳，将球停稳，以内踝及足弓内侧 来踢球，鼓励小儿照样做。如小儿用足外侧踢，可示范 更正一次姿势',
        meetConditions: '小儿连续用足内踝踢球2个或 以上'
      }, {
        detail: '主试者示范拍球，鼓励小儿照样做(向下扔落地的第一 下不算拍球)。允许试三次',
        meetConditions: '小儿连续拍球5个或以上'
      }, {
        detail: '主试者出示六边形图形，鼓励小儿临摹',
        meetConditions: '小儿可临摹出六边形，6个角 均画得好，连接线平直'
      }, {
        detail: '出示一双筷子和一根绳，主试者示范用绳将筷子以活结 方式捆上，鼓励小儿照样做。小儿打结时主试者应辅助 固定筷子',
        meetConditions: '经示范后，小儿能用活结将筷 子捆上'
      }, {
        detail: '主试者出示图形，问右边的4幅图中哪一幅放在左边空白 处合适。第一题示教',
        meetConditions: '小儿能指对包括第一题在内 的三道题或以上'
      }, {
        detail: '主试者问小儿“面粉能做哪些东西?”',
        meetConditions: '小儿能回答两种或以上'
      }, {
        detail: '主试者出示三幅连环画，然后对小儿说“这三幅图连起 来讲了一个故事，请你给我讲一讲故事的内容是什么? 小猴子为什么哭了?”若小儿回答第一问后不再答，可 再追问“小猴子为什么哭了?”',
        meetConditions: '能明确理解故事的主题'
      }, {
        detail: '主试者请小儿看钟表图辨认时间',
        meetConditions: '小儿能辨认两张图或以上所 表示的时间'
      }, {
        detail: '主试者先告诉小儿今天是星期几，然后提问“请告诉我 后天是星期几?明天是星期几?”',
        meetConditions: '小儿均能正确说出'
      }, {
        detail: '出示雨中看书图片，主试者问小儿画的对不对，如回答 “不对”，问哪里画错了',
        meetConditions: '小儿能正确回答下雨了，不能 在雨里看书，会淋湿、生病、 书湿了'
      }, {
        detail: '主试者示范用一手提绳，将球停稳，以内踝及足弓内侧 来踢球，鼓励小儿照样做。如小儿用足外侧踢，可示范 更正一次姿势',
        meetConditions: '小儿用足内踝踢球3个或以 上，踢一下落地一下'
      }, {
        detail: '主试者示范在一级台阶上交替换脚上下共3组(示范时主 试者要边喊口号边示范)，请小儿照样做，若小儿不会 两脚交替可提醒小儿“换脚”',
        meetConditions: '小儿能稳当并较熟练地两脚 交替完成3组，可稍有停顿'
      }, {
        detail: '主试者示范将一根绳子做翻绳最初级模式，鼓励小儿跟 着做',
        meetConditions: '小儿能跟着主试者一步一步， 或在主试者示范后自行做到 中指挑绳'
      }, {
        detail: '出示一双筷子和一根绳，鼓励其用绳将筷子以活结方式 捆上，小儿打结时主试者应辅助固定筷子',
        meetConditions: '无需示范，小儿能用活结将筷 子捆上'
      }, {
        detail: '主试者出示图形，问下边的4幅图中哪一幅放在上边空白 处合适。第一题示教',
        meetConditions: '小儿能指对包括第一题在内 的三道题或以上'
      }, {
        detail: '主试者问小儿“什么动物没有脚?”(脚定义为走路用 的)',
        meetConditions: '小儿回答蛇、鱼等两类或以上 没有脚的动物'
      }, {
        detail: '主试者问小儿“小朋友为什么要打预防针?”',
        meetConditions: '小儿能表达出预防生病/感冒 或打预防针可以不生病等'
      }, {
        detail: '主试者问小儿“毛衣、长裤和鞋有什么共同之处?”',
        meetConditions: '小儿回答都是穿的、能保暖'
      }, {
        detail: '主试者分别问小儿火警、匪警(找警察帮助)、急救电 话是多少?',
        meetConditions: '小儿能正确回答出两种或以 上电话号码'
      }, {
        detail: '出示猫头鹰抓老鼠图片，主试者问小儿画的对不对，如 回答“不对”，问哪里画错了',
        meetConditions: '小儿能正确回答猫头鹰白天 睡觉，不会在白天出来抓老鼠'
      }
    ];
  },
  globalData: {
    userInfo: null
  }
})