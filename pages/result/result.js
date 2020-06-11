// pages/result/result.js
Page({
  data: {
    selectedRadio: -1,//默认一个没选
    radio0: 0,
    radio1: 0,
    radio2: 0,
    companyName: null,
    docterName: null,
    userInfo: {},
    today: '',
    currentMonthAge: 0.0,
    mentalAges: [],
    projectRecommends: [],
    userDQs: [],//发育商
    userDQdetail: ''
  },
  onLoad: function (options) {
    // this.setCurrentData();
  },
  setCurrentData: function() {
    this.data.currentMonthAge = wx.xj.realMonthAge;
    //设置训练意见
    this.setProjectRecommends();
    //设置智龄
    this.setMentalAges();
    //设置发育商
    this.setQD();
    //设置检测时间
    let today = wx.xj.todayDate();
    this.data.today = this.dateFormateWithDate(today);
    //设置用户信息
    this.setUserInfo();
    //刷新数据
    this.setData(this.data);
  },
  setQD: function() {
    let userDQs = [];
    let MAs = this.data.mentalAges;
    let realMAge = this.data.currentMonthAge;
    for (let i = 0; i < MAs.length; i++) {
      const MA = MAs[i];
      let QD = this.mathQD(MA, realMAge);
      userDQs.push(QD);
      if (i == MAs.length - 1){//最后一项
        this.setUserDQdetail(QD);
      }
    }
    this.data.userDQs = userDQs;
  },
  mathQD: function(MA, realMAge) {//MA智龄，realMAge真是月龄
    if (realMAge == 0) {//被除数为0时默认替换为1
      realMAge = 1;
    }
    return (MA / realMAge * 100).toFixed(1);
  },
  setUserDQdetail: function(QD) {
    let userDQdetail = '';
    if (QD >= 130){
      userDQdetail = '优秀';
    } else if (QD >= 110 && QD <= 129){
      userDQdetail = '良好';
    } else if (QD >= 96 && QD <= 109){
      userDQdetail = '正常智力';
    } else if (QD >= 86 && QD <= 95){
      userDQdetail = '可以赶上正常';
    } else if (QD >= 76 && QD <= 85){
      userDQdetail = '边缘智力';
    } else if (QD >= 55 && QD <= 75){
      userDQdetail = '轻度障碍';
    } else if (QD >= 40 && QD <= 54){
      userDQdetail = '中度障碍';
    } else if (QD >= 26 && QD <= 39){
      userDQdetail = '重度障碍';
    } else {
      userDQdetail = '极重度障碍';
    }
    this.data.userDQdetail = userDQdetail;
  },
  setProjectRecommends: function() {
    let projectMonthIndexs = wx.xj.projectMonthIndexs;
    let questions = wx.xj.questions;
    let projectRecommends = new Array();
    for (let i = 0; i < projectMonthIndexs.length; i++) {
      const index = projectMonthIndexs[i];
      if (index < questions.length - 1){//如果通过的非最后一个月龄
        let recommendString = '';
        let qArr = questions[index + 1][i];
        for (let l = 0; l < qArr.length; l++) {
          const title = qArr[l].title;
          recommendString += title + '，';
        }
        recommendString = recommendString.substring(0, recommendString.length - 1);
        projectRecommends.push(recommendString);
      } else {
        projectRecommends.push('无');
      }
    }
    this.data.projectRecommends = projectRecommends;
  },
  setPorjectMonthAges: function() {
    let projectMonthIndexs = wx.xj.projectMonthIndexs;
    let projectMonthAges = new Array();
    let allMonthAge = 0;
    for (let i = 0; i < projectMonthIndexs.length; i++) {
      const index = projectMonthIndexs[i];
      let monthAge = wx.xj.months[index];
      projectMonthAges.push(monthAge);
      allMonthAge += monthAge;
    }
    let average = (allMonthAge / projectMonthAges.length).toFixed(1);
    projectMonthAges.push(average);
    this.data.projectMonthAges = projectMonthAges;
  },
  setMentalAges: function() {
    let mentalAges = new Array();
    let resultScoreArr = wx.xj.resultScoreArr;
    let allProjectScore = 0;
    for (let i = 0; i < resultScoreArr.length; i++) {
      let proScoreArr = resultScoreArr[i];
      let proScore = 0;
      for (let j = 0; j < proScoreArr.length; j++) {
        const score = proScoreArr[j].resultScore;
        proScore += score;
      }
      allProjectScore += proScore;
      mentalAges.push(proScore);
    }
    let average = (allProjectScore / mentalAges.length).toFixed(1);
    mentalAges.push(average);
    this.data.mentalAges = mentalAges;
  },
  setUserInfo: function(){
    let userInfo = wx.xj.userInfo;
    userInfo.userSex = userInfo.sex == 1 ? '男' : '女';
    this.data.userInfo = userInfo;
    userInfo.date = this.dateFormateWithDate(userInfo.date);
  },
  dateFormateWithDate: function(date){
    let dateArr = date.split("-");
    if(dateArr.length < 3){
      return date;
    }
    let dateFormate = dateArr[0] + ' 年 ' + dateArr[1] + ' 月 ' + dateArr[2] + ' 日';
    return dateFormate;
  },
  onRadioClick: function(e){
    let index = e.currentTarget.dataset.index;
    if (this.selectedRadio == -1) {//如果一个没选
      this.data[`radio${index}`] = 1;
      this.selectedRadio = index;
    } else {
      if (this.selectedRadio == index) {//如果反选
        this.data[`radio${index}`] = 0;
        this.selectedRadio = -1;
      } else {//直选中一个，其它取消选中
        this.selectedRadio = index;
        for (let i = 0; i < 3; i++) {
          if (index == i){
            this.data[`radio${index}`] = 1;
          } else {
            this.data[`radio${i}`] = 0;
          }
        }
      }
    }
    this.setData(this.data);
  },
  companyNameValueChange: function(e){
    let companyName = e.detail.value;
    this.data.companyName = companyName;
    this.setData({
      companyName
    });
  },
  drawImage: function() {
  // wx.saveImageToPhotosAlbum({
  //   filePath: url,
  //   success(res) {
  //       wx.showToast({
  //           title: '保存成功',
  //           icon: 'success'
  //       })
  //   },
  //   fail () {
  //       wx.showToast({
  //           title: '保存失败',
  //           icon: 'none'
  //       })
  //   }
  // });
  }
})