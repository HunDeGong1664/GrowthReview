const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    userName: null,
    userSex: null,
    userNation: null,
    date: null,
    region: ['陕西省', '西安市', '莲湖区'],
    phoneNumber: null,
    address: null
  },
  onLoad: function (){
    this.data.date = this.getTodayDate();
    wx.xj.todayDate = () => {
      return this.getTodayDate();
    };
    this.setData(this.data);
  },
  getTodayDate: function(){
    let now = new Date();
    let nowString = `${now.getFullYear()}-${this.dateWithNum(now.getMonth() + 1)}-${this.dateWithNum(now.getDate())}`;
    return nowString;
  },
  dateWithNum: function(num){//自动补零
    return (Array(2).join(0) + num).slice(-2);
  },
  NameInput(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  SexSelect(e) {
    this.setData({
      userSex: e.detail.value
    })
  },
  NationChange(e) {
    this.setData({
      userNation: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  PhoneNumberChange: function(e) {
    this.setData({
      phoneNumber: e.detail.value
    })
  },
  AddressChange: function(e) {
    this.setData({
      address: e.detail.value
    });
  },
  ConfirmClick: function(e) {
    if (!this.data.userName){
      wx.showToast({
        title: '请输入儿童姓名',
        icon: 'none'
      });
      return;
    }
    if (!this.data.userSex) {
      wx.showToast({
        title: '请选择儿童性别',
        icon: 'none'
      });
      return;
    }
    if (!this.data.userNation){
      wx.showToast({
        title: '请输入民族',
        icon: 'none'
      });
      return;
    }
    // if (!this.data.phoneNumber) {
    //   wx.showToast({
    //     title: '请输入联系电话',
    //     icon: 'none'
    //   });
    //   return;
    // }
    let obj = {
      username: this.data.userName,
      sex: this.data.userSex,
      nation: this.data.userNation,
      date: this.data.date,
      region: this.data.region,
      phonenumber: this.data.phoneNumber,
      address: this.address
    }
    wx.xj.userInfo = obj;
    let url = '../question/question?obj=' + JSON.stringify(obj);
    wx.navigateTo({
      url: url
    })
  }
})