// pages/question/question.js
Page({
  data: {
    monthAge: 1,
    currentIndex: 0,
    question: [],
    projects: [],
    scores: [],
    checks: []
  },
  onLoad: function (options) {
    wx.xj.allScoreArr = JSON.parse(JSON.stringify(wx.xj.initScoreArr));//初始化得分数组
    wx.xj.scores = new Object();//每次进入先清空存储的选项
    this.data.projects = wx.xj.projects;
    let userinfo = JSON.parse(options.obj);
    //获取月龄
    let monthObj = this.getCurrentMonthAge(userinfo.date);
    let monthAge = monthObj.num;
    let index = monthObj.index;
    this.data.currentIndex = index;
    this.setMonthAgeData(monthAge);
  },
  getChecks: function (aArr, monthAge) {
    let scores = wx.xj.scores;
    let checks = new Array();
    if(!scores) return checks;
    let monthScores = scores[`${monthAge}`];
    if (!monthScores) return checks;
    for (let i = 0; i < aArr.length; i++) {
      const projectQ = aArr[i];
      let qScoreArr = [];
      for (let j = 0; j < projectQ.length; j++) {
        qScoreArr.push('');
      }
      if(monthScores.hasOwnProperty(`${i}`)) {
        const qScores = monthScores[`${i}`];
        if(qScores && qScores.length > 0){
          for (let l = 0; l < qScores.length; l++) {
            qScoreArr[parseInt(qScores[l])] = 'checked';
          }
        }
      }
      checks.push(qScoreArr);
    }
    return checks;
  },
  setMonthAgeData: function(monthAge) {
    this.data.monthAge = monthAge;
    let question = this.getQuestion(monthAge);
    let scores = new Array();
    let pScore = this.getProjectScore(monthAge);
    for (let i = 0; i < question.length; i++) {
      let pItems = question[i];
      let score = this.getQuestionScore(pItems, pScore);
      scores.push(score);
    }
    this.data.scores = scores;
    this.data.question = question;
    this.data.checks = this.getChecks(question, monthAge);
    this.setData(this.data);
  },
  onPrevClick: function() {
    let index = this.data.currentIndex;
    if (index == 0){
      return;
    }
    index--;
    let monthAge = wx.xj.months[index];
    this.data.currentIndex = index;
    this.setMonthAgeData(monthAge);
  },
  onNextClick: function() {
    let index = this.data.currentIndex;
    let months = wx.xj.months;
    if (index == months.length - 1){
      return;
    }
    index++;
    let monthAge = months[index];
    this.data.currentIndex = index;
    this.setMonthAgeData(monthAge);
  },
  getQuestion: function(month){
    let question = wx.xj.questions[this.data.currentIndex];
    return question;
  },
  getMonthAge: function(oldDate, nowDate){
    var startDate = oldDate.getDate() + oldDate.getHours() / 24 + oldDate.getMinutes() / 24 / 60;
    var endDate = nowDate.getDate() + nowDate.getHours() / 24 + nowDate.getMinutes() / 24 / 60;
    var date2Mon = endDate - startDate;
    return ((nowDate.getYear() - oldDate.getYear()) * 12 + nowDate.getMonth() - oldDate.getMonth() + date2Mon).toFixed(1);
  },
  getCurrentMonthAge: function(date){
    // let oldDate = new Date(date).getTime();
    // console.log(oldDate);
    // let nowDate = new Date().getTime();
    // console.log(nowDate);
    let oldDate = new Date(date);
    let nowDate = new Date();
    let monthAge = this.getMonthAge(oldDate, nowDate);
    wx.xj.realMonthAge = monthAge;//存储真实月龄
    let months = wx.xj.months;
    let minMA = months[0];
    let maxMA = months[months.length - 1];
    if (monthAge < minMA) {
      return {
        num: minMA,
        index: 0
      };
    } else if (monthAge > maxMA) {
      return {
        num: maxMA,
        index: months.length - 1
      };
    }
    //最接近的对象
    let closeMonthObj = this.findCloseNumber(months, monthAge);
    return closeMonthObj;
  },
  findCloseNumber: function (arr, num) {
    var index = 0;//保留最接近的数值
    var d_value = Number.MAX_VALUE;//保留差值最大值，默认为最大的值
    for (let i = 0; i < arr.length; i++) {
      var new_d_value = Math.abs( arr[i] - num );//新差值
      if (new_d_value <= d_value) {
        if (new_d_value === d_value && arr[i] < arr[index]) {//如果新差值与就差值一样，则取大的下标
          continue;
        }
        index = i;
        d_value = new_d_value;
      }
    }
    return {
      num: arr[index],
      index: index
    };//返回最接近的数值及下标
  },
  checkboxChange: function(e) {
    let projectIndex = e.currentTarget.id;
    let scores = wx.xj.scores;//存储选项
    if (!scores){
      scores = new Object();
    }
    let monthScore = scores[`${this.data.monthAge}`];
    if (!monthScore) {
      monthScore = new Object();
    }
    monthScore[`${projectIndex}`] = e.detail.value;
    scores[`${this.data.monthAge}`] = monthScore;
    wx.xj.scores = scores;
    this.setAllScores(projectIndex, e.detail.value);
  },
  /**
   * projectIndex 项目下标
   * selectedArr 选中的数组
  */
  setAllScores: function(projectIndex, selectedArr) {
    let questionScore = this.data.scores[projectIndex];
    let projectScore = 0;
    for (let i = 0; i < selectedArr.length; i++) {
      projectScore += parseFloat(questionScore);
    }
    let allScoreArr = wx.xj.allScoreArr;
    let scoreObj = {
      currentScore: projectScore,
      passingGrades: this.getProjectScore(this.data.monthAge),
      resultScore: projectScore//结果得分，如果有两项连续通过的则之前月龄的结果得分为通过得分
    };
    allScoreArr[projectIndex][this.data.currentIndex] = scoreObj;
    wx.xj.allScoreArr = allScoreArr;
  },
  OnDetailClick: function(e) {
    let index = e.currentTarget.dataset.index;
    let questions = new Array();
    let currentProject = this.data.question[index];
    for (let i = 0; i < currentProject.length; i++) {
      let qData = currentProject[i];
      let qID = qData.id;
      let title = qData.title;
      let annotate = qData.annotate;
      let qDetailData = wx.xj.questionDetails[qID - 1];
      let detail = qDetailData.detail;
      let meetConditions = qDetailData.meetConditions;
      let obj = {
        title,
        annotate,
        detail,
        meetConditions
      }
      questions.push(obj);
    }
    wx.xj.currentQuestions = questions;
    let url = `/pages/qDetail/qDetail?project=${this.data.projects[index]}`;
    wx.navigateTo({
      url: url
    });
  },
  OnNextClick: function(e){
    wx.navigateTo({
      url: '/pages/score/score'
    });
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
  getQuestionScore: function(arr, pScore) {
    let score = pScore / arr.length;
    return score.toFixed(1);
  }
})