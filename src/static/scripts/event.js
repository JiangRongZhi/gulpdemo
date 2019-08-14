/* 获取图片数组 */
// App.GetImgArray = function() {
//     $.ajax({
//         url: '/api/getimgpath.php',
//         dataType: "json",
//         async: false,
//         success: function(res) {
//             App.arr = res;
//         },
//         error: function(res) {
//             console.log('Ajax Error');
//         }
//     });
// };

// App.GetImgArray();

// /**图片预加载**/
// App.LoadingAnim = function(loaded, loadMax) {
//     $(".loading-plan span").html(parseInt((loaded / loadMax) * 100));
// };
// App.Loading = function(index, callIn, callback) {
//     var loaded = 0,
//         loadMax = App.arr.length,
//         animImgs = [];

//     for (var i = 0; i < loadMax; i++) {
//         var oImg = new Image();
//         oImg.onload = function() {
//             loaded++;
//             callIn && callIn(loaded, loadMax);
//             if (loaded == loadMax) callback && callback(animImgs);
//         };

//         oImg.src = App.arr[i];
//         if (i > index) animImgs.push(oImg);
//     }
// };
// App.Loading(0, function(loaded, loadMax) {
//     App.LoadingAnim(loaded, loadMax);
// }, function(imgJson) {
//     App.Init(imgJson);
// });
/*获取url参数*/
App.GetQueryString = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r !== null) return unescape(r[2]);
    return null;
};
/*判断手机横屏竖屏*/
App.OrientationChange = function() {
    switch (window.orientation) {
        case 180:
        case 0:
            $(".landscape").hide();
            break;
        case 90:
        case -90:
            $(".landscape").show();
            break;
    }
};
/*弹出框*/
App.Alert = function(message, t) {
    t == 0 ? layer.open({
        content: message,
        skin: 'msg',
        time: 2
    }) : layer.open({
        content: message,
        btn: ['OK']
    });
};
/**音乐**/
// App.Initmusit = function(src, name) {
//     window[name] = new Audio();
//     window[name].src = src;
//     window[name].controls = true;
//     window[name].loop = "loop";
//     window[name].pause();
//     window[name].volume = 1;
//     document.addEventListener("WeixinJSBridgeReady", function() {
//         window[name].pause();
//         window[name].play();
//     }, false);

//     document.addEventListener('YixinJSBridgeReady', function() {
//         window[name].pause();
//         window[name].play();
//     }, false);
// };