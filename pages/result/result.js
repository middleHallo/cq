// pages/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:'',
    backurl:'',
    name:'',
    canvasHidden:true,
    resultHidden:true,
    screenWidth:375
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

    let tempfile = wx.getStorageSync('tempfilepath')
    let name = wx.getStorageSync('finalname')

    let currentdata = wx.getStorageSync('currentdata')
    let backimgurl = currentdata.backimg
    let that = this
    wx.downloadFile({
      url: backimgurl,
      success:res=>{
        that.setData({
          backurl: res.tempFilePath,
          url: tempfile,
          name: name
        })
        
        that.savephotos()
      }
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    

    let that = this
    wx.getSystemInfo({
      success: res => {
        that.setData({
          screenWidth: res.screenWidth
        })
      }
    })

  },

  savephotos:function(){
    wx.showLoading({
      title: '加载中...',
    })
    var that = this;
    //设置画板显示，才能开始绘图
    that.setData({
      canvasHidden: false
    })
    var unit = that.data.screenWidth
    var path = that.data.url
    var name = this.data.name
    var w = 750;
    var h = 1205;

    var context = wx.createCanvasContext('share')


    var back = this.data.backurl
    
    context.drawImage(back,0,0,w,h)
    //462.5
    context.drawImage(path, 15, 200, 750, 800)

    var minicodepath = '/images/minicode.png'

    context.drawImage(minicodepath,500,821,223,179)
    
    context.setFontSize(54)
    context.setFillStyle("#000000")
    context.setTextAlign('center')
    context.fillText(name, 375, 135)  //绘制文字

    context.save()

    //把画板内容绘制成图片，并回调 画板图片路径
    context.draw(false, function () {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: w,
        height: h,
        destWidth: w,
        destHeight:  h,
        canvasId: 'share',
        success: function (res) {
          
          if (!res.tempFilePath) {
            wx.showModal({
              title: '提示',
              content: '图片绘制中，请稍后重试',
              showCancel: false
            })
          }
          wx.hideLoading()
          that.setData({
            url: res.tempFilePath,
            canvasHidden: true,
            resultHidden:false
          })
          
        },
        fail:function(){
          wx.showModal({
            title: '出错啦...',
            content: '请退出后重试！',
            showCancel: false
          })
        }
      })
    });
  },

  /**
   * 保存图片到相册
   */
  savephotostoab:function(){
    var path = this.data.url
    wx.saveImageToPhotosAlbum({
      filePath: path,
      success:res=>{
        wx.showModal({
          title: '保存成功!',
          content: '快去发朋友圈炫一下吧~',
          showCancel:false
        })
      }
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
    let currentdata = wx.getStorageSync('currentdata')
    let cqtype = currentdata.cq_list_type
    let sharetitle = currentdata.cq_list_title
    let cqid = currentdata.cq_list_id

    let path = '/pages/detail/detail?cq_from=1&cq_type=' + cqtype + "&cq_id=" + cqid

    console.log(path)
    return {
      title: sharetitle,
      path: '/pages/detail/detail?cq_from=1&cq_type=' + cqtype + "&cq_id=" + cqid
    }
  }
})