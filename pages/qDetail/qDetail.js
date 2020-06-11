// pages/qDetail/qDetail.js
Page({
  data: {
    questions: []
  },
  onLoad: function (options) {
    this.data.questions = wx.xj.currentQuestions;
    this.data.project = options.project;
    this.setData(this.data);
  }
})