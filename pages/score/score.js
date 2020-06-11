// pages/score/score.js
Page({
  data: {
    scores: [],
    projects: [],
    months: []
  },
  onLoad: function (options) {
    this.data.scores = this.getScores();
    this.data.projects = wx.xj.projects;
    this.data.months = wx.xj.months;
    this.setData(this.data);
  },
  getScores: function(){
    let projectScores = JSON.parse(JSON.stringify(wx.xj.allScoreArr));
    let projectMonthIndexs = wx.xj.projectMonthIndexs;
    for (let x = 0; x < projectScores.length; x++) {
      let realScores = projectScores[x];
      let isPass = false;//默认都没通过
      for (let i = realScores.length - 1; i >= 0; i--) {
        let scoreObj = realScores[i];
        if (!isPass){
          if (i > 0) {
            let prevObj = realScores[i - 1];
            if (scoreObj.currentScore == scoreObj.passingGrades && prevObj.currentScore == prevObj.passingGrades) {
              isPass = true;//如果有两个连续通过的则前边的都为通过
              projectMonthIndexs[x] = i;
            }
          }
        } else {
          scoreObj.resultScore = scoreObj.passingGrades;//如果有两项连续通过的则之前月龄的结果得分为通过得分
        }
      }
      projectScores[x] = realScores;
    }
    wx.xj.projectMonthIndexs = projectMonthIndexs;
    wx.xj.resultScoreArr = projectScores;//记录最后结果信息
    return projectScores;
  },
  onResultClick: function() {
    wx.navigateTo({
      url: '/pages/result/result'
    });
  }
})