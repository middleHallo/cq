// pages/test/test.js
const utils = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    featurHidden:true,
    canvasHidden:true,
    imageurl:'',
    tempfileurl:'',
    attrsinfo:[{x:290,y:180,size:14},
               {x:562,y:243,size:30},
               {x:168,y:317,size:24},
               {x:642,y:410,size:14},
               {x:102,y:515,size:14},
               {x:250,y:675,size:14},
               {x:575,y:625,size:24}],
    texts:[],
    result:''
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
    this.getwords()
  },

  /**
   * 获取词汇信息
   */
  getwords:function(){
    wx.showLoading({
      title: '加载中..',
    })
    let baseurl = getApp().globalData.baseurl
    let url = baseurl + "index/getwords?wlsx_ht_id=2fjaoej43joijaf2&t=" + "12"
    let that = this
    utils.getData(url,function(res){
        let wordsdata = res.data
        if(wordsdata.code == 200){
          that.setData({
            texts:wordsdata.words,
            result:wordsdata.result
          })
          that.downloadimg()
        }else{
          wx.hideLoading()
          wx.showModal({
            title: data.error_title,
            content: data.error_message,
            showCancel:false
          })
        }
    })
  },

  /**
   * 下载图片
   */
  downloadimg:function(){
    let that = this
    let url = "https://xcxa.guokehuyu.com/public/uploads/wlsx/tempfile.png"
    wx.downloadFile({
      url: url,
      success:function(res){
        that.setData({
          tempfileurl: res.tempFilePath,
          canvasHidden: false
        })
        that.initsomething()
      },
      fail:function(){
        wx.hideLoading()
        wx.showModal({
          title: '请求出错',
          content: data.error_message,
          showCancel: false
        })
      }
    })
  },

  /**
   * 初始化某些配置信息
   */
  initsomething:function(){
      wx.showLoading({
        title: '加载中...',
      })
      this.createpic()
  },
  /**
   * 画图
   */
  createpic:function(){

    let that = this
    // 创建画布
    let canvasContext = wx.createCanvasContext('feature')

    // 绘制图片
    let url = that.data.tempfileurl
    canvasContext.drawImage(url,0,0,750,1108)

    // 绘制文字
    canvasContext.setFillStyle("#FFFFFF")
    canvasContext.setTextAlign('center')
    canvasContext.setTextBaseline('middle')

    
    let attrsinfo = this.data.attrsinfo
    let texts = this.data.texts

    // for循环绘制文字
    for (let i = 0; i < attrsinfo.length; i++){
      let attr = attrsinfo[i]
      let size = attr.size * 1.1
      let x = attr.x
      let y = attr.y
      
      let text = texts[i]
      canvasContext.setFontSize(size)
      canvasContext.fillText(text, x, y)  //绘制文字
    }
    let result = this.data.result
    let length = result.length
    let len = Math.ceil((length * 3) /5.0)

    let newstring1 = result.substring(0, len)
    let newstring2 = result.substring(len, length)

    canvasContext.setFontSize(30)
    canvasContext.fillText(newstring1, 390, 775)
    canvasContext.fillText(newstring2, 390, 815)
    canvasContext.save()

    let w = 750
    let h = 1108
    //把画板内容绘制成图片，并回调 画板图片路径
    canvasContext.draw(false, function () {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: w,
        height: h,
        destWidth: w,
        destHeight: h,
        canvasId: 'feature',
        success: function (res) {
          if (!res.tempFilePath) {
            wx.showModal({
              title: '提示',
              content: '图片绘制出错，请稍后重试',
              showCancel: false
            })
            return 0
          }
          wx.hideLoading()
          that.setData({
            imageurl: res.tempFilePath,
            canvasHidden: true,
            featurHidden: false
          })
        },
        fail: function () {
          wx.showModal({
            title: '出错啦...',
            content: '请退出后重试！',
            showCancel: false
          })
        }
      })
    })
  },

  /**
   * 预览图片
   */
  preimage:function(){
    let url = this.data.imageurl
    let urls = []
    urls.push(url)
    wx.previewImage({
      urls: urls,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 创建canvas画布，加载图片，将属性画上去
   */


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