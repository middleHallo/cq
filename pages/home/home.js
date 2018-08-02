// pages/home/home.js
const config = require('../../utils/config.js')
const utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgpath:'',
    code:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this
    let userid = wx.getStorageSync('userid')
    if (userid == '') {
      wx.login({
        success: res => {
          that.setData({
            code: res.code
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    let userid = wx.getStorageSync('userid')
    if(userid != ''){
      wx.redirectTo({
        url: '/pages/list/list',
      })
    }
  },

  montage:function(){
    wx.navigateTo({
      url: '/pages/montage/montage',
    })
  },

  goto:function(e){


    let that = this
    if(e.detail.errMsg == 'getUserInfo:ok'){

      
      wx.showLoading({
        title: '登录中...',
      })
      let code = this.data.code
      let userinfo = e.detail.userInfo
      wx.setStorageSync('userinfo', userinfo)
      let nickname = userinfo.nickName
      let gender = userinfo.gender
      let city = userinfo.city
      let province = userinfo.province
      let country = userinfo.country
      let avatarurl = userinfo.avatarUrl

      let url = config.service.requesturl + "index/login"

      let params = {
        code: code,
        nickname: nickname,
        gender: gender,
        city: city,
        province: province,
        country: country,
        avatarurl: avatarurl
      }
      utils.post(url,params,function(res){
        if(res.data.code == 200){
          wx.setStorageSync('userid', res.data.userid)
        }else{
          wx.showModal({
            title: '登录失败!',
            content: '请在之后重试!',
          })
        }
        
      },function(){
        wx.hideLoading()
      })
    }

    // 不可回退的方式跳转
    wx.redirectTo({
      url: '/pages/list/list',
    })

  },
  /**
   * 进入未来属性
   */
  feature:function(){
    wx.navigateTo({
      url: '/pages/test/test',
    })
  },

 /**
  * test
  /pages/detail/detail?cq_from=1&cq_type=0&cq_id=VyC9jJNBYzzVqd2XybFp6g0W
  */
  gototest:function(){
    let path = '/pages/detail/detail?cq_from=1&cq_type=0&cq_id=M97cErLbLEqo1GJaGMCn5WzS'
    wx.navigateTo({
      url: path,
    })
  },

  gotostart:function(){
    wx.navigateTo({
      url: '/pages/start/start',
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})