App.ShareData = {
    'Title': '',
    'Desc': '',
    'Coshow': '',
    'Image': location.protocol + '//' + location.hostname + '/images/share.jpg',
    'ShareLink': location.protocol + '//' + location.hostname + '/index.html'
};
/*初始化微信分享*/
App.initWeChatShare = function(ShareData) {
    var urlx = location.href.split('#')[0];
    var urla = encodeURIComponent(urlx);
    $.ajax({
        url: 'http://wx.validation.energytrust.com.cn/?s=/Admin/Wx/ajaxWxqm&jsonpcallback=?',
        //url: 'https://validation.energytrust.com.cn/?s=/Admin/Wx/ajaxWxqm&jsonpcallback=?',
        type: 'POST',
        dataType: 'jsonp',
        data: {
            url: urla
        },
        success: function(data) {
            wx.config({
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.wxnonceStr,
                signature: data.wsSha1,
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'hideMenuItems',
                    'chooseImage',
                    'hideAllNonBaseMenuItem',
                    'uploadImage',
                    'startRecord',
                    'stopRecord',
                    'translateVoice',
                    'addCard',
                    'chooseCard',
                    'openCard',
                    'hideOptionMenu',
                    'showOptionMenu',
                    'hideMenuItems',
                    'showMenuItems',
                    'hideAllNonBaseMenuItem',
                    'showAllNonBaseMenuItem'
                ]
            });
            wx.error(function(res) {
                $.scojs_message(res.errMsg, $.scojs_message.TYPE_ERROR);
            });
        }
    });

    wx.ready(function() {
        wx.onMenuShareAppMessage({
            title: ShareData.Title,
            desc: ShareData.Desc,
            link: ShareData.ShareLink,
            imgUrl: ShareData.Image,
            type: 'link',
            trigger: function(res) {},
            success: function(res) {},
            cancel: function(res) {},
            fail: function(res) {}
        });
        wx.onMenuShareTimeline({
            title: ShareData.Coshow,
            link: ShareData.ShareLink,
            imgUrl: ShareData.Image,
            trigger: function(res) {},
            success: function(res) {},
            cancel: function(res) {},
            fail: function(res) {}
        });
    });
};
App.initWeChatShare(App.ShareData);