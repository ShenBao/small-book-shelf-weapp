// pages/auth-login/auth-login.js

import api from '../../config/config.js';

Page({

    /**
     * 页面的初始数据
     */
    data: {

        loginWelcome: '../../images/welcome.png',

        loginBtnBg: '../../images/login-btn.png',

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        let that = this;

        wx.login({
            success: res => {
                console.log(res);
                this.setData({
                    code: res.code
                })
            }
        });

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
     * 获取用户信息
     */
    getUserInfoHandler: function (e) {

        console.log(e.detail);

        if (e.detail.errMsg !== "getUserInfo:ok") {

            wx.showToast({
                title: '授权失败,请重新授权',
                icon: 'none',
                duration: 3000
            });

            return;
        }

        let infoRes = e.detail;

        let data = {
            code: this.data.code, // 临时登录凭证
            rawData: infoRes.rawData, // 用户非敏感信息
            signature: infoRes.signature, // 签名
            encryptedData: infoRes.encryptedData, // 用户敏感信息
            iv: infoRes.iv // 解密算法的向量
        };

        console.log(data);

        this.reqUpdateUserInfo(data);

    },

    reqUpdateUserInfo: function (opts) {

        wx.request({
            url: api.loginUrl,
            data: opts,
            // method: 'POST',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: (res) => {

                let {
                    result,
                    skey,
                    userInfo
                } = res.data;

                if (result != 0) {

                    wx.showModal({
                        title: '提示',
                        content: `登录失败，请重新登录`,
                        confirmText: "知道了",
                        showCancel: false,
                        success: (res) => { }
                    });
                    return;
                };

                wx.showToast({
                    title: '授权成功',
                    icon: 'none',
                    duration: 3000
                });

                wx.setStorageSync('userInfo', JSON.stringify(userInfo));
                wx.setStorageSync('loginFlag', skey);

                wx.switchTab({
                    url: '/pages/books/books'
                })

            },
            fail: () => {
                wx.showModal({
                    title: '提示',
                    content: `登录出了点问题,请重新登录`,
                    confirmText: "知道了",
                    showCancel: false,
                    success: (res) => { }
                });
            },
            complete: () => {

            }
        })
    }
})