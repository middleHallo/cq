// pages/authorize/authorize.js
const utils = require('../../utils/util.js')
const config = require('../../utils/config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    wx.login({
      success: res => {
        that.setData({
          code: res.code
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 用户授权返回函数
   */
  getdata:function(e){
    if (e.detail.errMsg == 'getUserInfo:fail auth deny'){
      return 0
    }
//////////////////////////////
    let that = this
    wx.showLoading({
      title: '登录中...',
    })

    let code = that.data.code
    let userinfo = e.detail.userInfo
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
    utils.post(url, params, function (res) {
      if (res.data.code == 200) {
        wx.setStorageSync('userid', res.data.userid)
        wx.setStorageSync('userinfo', userinfo)
        wx.navigateBack({})
      } else {
        wx.showModal({
          title: '登录失败!',
          content: '请在之后重试!',
        })
        wx.clearStorageSync('userid')
        wx.clearStorageSync('userinfo')
        wx.showModal({
          title: '登录失败!',
          content: '请重试，是否重试?',
          confirmText:'重新登录',
          cancelText:'退出此页',
          success:res=>{
            if(res.confirm){

            }else{
              wx.navigateBack({})
            }
          }
        })
      }
    }, function () {
      wx.hideLoading()
    })
/////////////////////////////
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