// pages/illustrated/illustrated.js
const utils = require('../../utils/util.js')
const config = require('../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contents:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  gettj: function(){

    let userid = wx.getStorageSync('userid')
    let cq_id = 'Lavfm32wP33p3gIN9ffVKQSB'

    let url = config.service.requesturl + "index/gettj?" + "userid=" + userid + "&cq_id=" + cq_id


    let that = this

    utils.getData(url,function(res){
      
      that.setData({
        contents:res.data.contents
      })

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.gettj()
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