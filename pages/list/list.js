// pages/list/list.js
const utils = require('../../utils/util.js')
const configs = require('../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentpage:1,
    totalpage:1,
    cqlist:[],
    animationHidden:true,
    viewHidden:false,
    loading:false
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
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
    this.setData({
      viewHidden: false,
      loading: false
    })
    this.getcplist(1)
  },
  /**
   * 获取列表信息
   */
  getcplist:function(mypage){
    
    var url = configs.service.requesturl + "index/cqlist?page=" + mypage
    var that = this
    utils.getData(url,function(res){
      let datas = res.data
      if (datas.code !== 200){
        utils.myshowmodel(datas.error_title, datas.error_message)
        return 1
      }
      that.setData({
        currentpage: datas.current_page,
        totalpage: datas.total_page,
        cqlist: datas.lists
      })
    })
  },

  /**
   * 点击跳转
   */
  gotest: function(event){
    
    let idx = event.currentTarget.dataset.idx - 0
    let currentdata = this.data.cqlist[idx]
    /**
     * 设置缓存信息，减轻服务器的压力以及减少网络请求的次数，达到优化的目的
     * 跳转路径中的type用来区分不同的进入方式，一个是列表进入，0代表列表进入
     * 另外一个是 从分享中进入，1代表从分享方式中进入
     */
    wx.setStorageSync('currentdata', currentdata)
    let cqid = currentdata['cq_list_id']
    let cqtype = currentdata['cq_list_type']
    var url = '../detail/detail?cq_from=0&cq_type=' + cqtype + '&cq_id=' + cqid

   this.setData({
     viewHidden: true,
     loading: true
   })

   setTimeout(function () {
     wx.navigateTo({
       url: url,
     })
   }, 1300)
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