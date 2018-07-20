// pages/detail/detail.js
const utils = require('../../utils/util.js')
const config = require('../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   * cqtype 1 带男女选项  0 只有姓名选项,默认1
   * cqfrom 0 从列表页面进入当前 1 从分享页面进入当前,默认0
   */
  data: {
    
    name: '后米米米米',
    gender: 0,

    // 示例图的url
    example:'',

    // 背景图的url
    backimg:'',
    index:0,
    cqid:'',
    cqtype: '1',
    cqfrom:'0',
    cqdetail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      cqtype:options.cq_type - 0,
      cqfrom: options.cq_from,
      cqid:options.cq_id
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 检查是否授权，未授权则提示，让用户决定是否去授权
    this.checkSuthority()

    // 获取详细信息
    this.getdetail()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    /**
     * 初始化用户信息
     */
    this.inituserdata()
  },

  /**
   * 获取详细信息
   * 如果cqfrom=0，则不进行数据请求
   * 如果cqfrom=1，则进行数据请求（代表从分享页面进来，之前没有缓存过相关数据）
   */
  getdetail:function(){
    
    let cqfrom = this.data.cqfrom
    if (cqfrom == '0'){
      let cqdetail = wx.getStorageSync('currentdata')
      this.setData({
        cqdetail: cqdetail,
        example: cqdetail.cq_list_img_url,
        backimg: cqdetail.backimg
      })
    }else{
      this.getdetaildata()
    }
  },

  /**
   * 获取信息
   */
  getdetaildata:function(){
    let cqid = this.data.cqid
    let url = config.service.requesturl + "index/cqdesc?cqid=" + cqid

    let that = this
    utils.getData(url,function(res){
        let data = res.data
        if (data.code != 200){
          utils.myshowmodel(data.error_title, data.error_message)
          return 0
        }

        // 添加缓存
        wx.setStorageSync('currentdata', res.data.detail)
        
        // 这部分加入了由分享进来的页面导致的问题
        that.setData({
          backimg:res.data.detail.backimg,
          example: res.data.detail.cq_list_img_url
        })
    })
  },
  /**
   * 检查是否已经授权
   */
  checkSuthority:function(){

    // 此部分数据仅需调用一次即可
    let userdata = wx.getStorageSync('userid')
    if(userdata == ''){
      
      wx.showModal({
        title: '当前未授权',
        content: '为了您得到更好的服务，是否跳转页面进行授权？', 
        success:function(res){
          if(res.cancel){
            return 0
          }
          // 跳转授权页面
          wx.navigateTo({
            url: '/pages/authorize/authorize',
          })
        }
      })
    }
  },

  /**
   * 初始化用户信息
   */
  inituserdata:function(){
    let userinfo = wx.getStorageSync('userinfo')
    if (userinfo == ''){
      return 0
    }
    this.setData({
      name:userinfo.nickName,
      gender:userinfo.gender - 1
    })
  },
  /**
   * 点击跳转下页
   */
  tryonce:function(){

    let userid = wx.getStorageSync('userid')

    if (userid == ''){
        wx.showModal({
          title: '尚未授权使用',
          content: '请调整页面进行授权',
          showCancel:false,
          success:function(res){
            if (res.confirm){
              wx.navigateTo({
                url: '/pages/authorize/authorize',
              })
            }
          }
        })
        return 0;
    }

    wx.showLoading({
      title: '加载中...',
    })

    let name = this.data.name
    let gender = this.data.gender
    let cqid = this.data.cqid

    let url = config.service.requesturl + "index/cqresult"
    let nickname = this.data.name
    // 用以测试
    // console.log(url + "?cqid=" + cqid)
    let paramas = {
      nickname:name,
      gender:gender,
      cqid:cqid
    }

    utils.post(url, paramas,function(res){
      let data = res.data

      if (data.code != 200){
        utils.myshowmodel(data.error_title, data.error_message)
        wx.hideLoading()
        return 0
      }
      
      wx.downloadFile({
        url	: data.imgurl,
        success:function(result){
          wx.hideLoading()
          wx.setStorageSync('tempfilepath', result.tempFilePath)
          wx.setStorageSync('finalname', nickname)
          // 跳转
          wx.navigateTo({
            url: '../result/result',
          })
        },
        fail:function(){
          utils.myshowmodel('下载测试结果图片失败', '请检查网络环境或者重试！')
        },
        complete:function(){
          utils.hidemyloading()
        }
      })
    },function(){
    })
  },

  /**
   * 监听输入框的输入删除事件
   */
  inputname:function(res){
    this.setData({
      name:res.detail.value
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
    
  },

  /**
   * 关闭当前页面
   */
  closeCurrent:function(){
    wx.redirectTo({
      url: '/pages/list/list',
    })
  },

  /**
   * 性别选择
  */
  selectewoman:function(){
    this.setData({
      gender:1
    })
  },
  selectman:function(){
    this.setData({
      gender:0
    })
  }
})