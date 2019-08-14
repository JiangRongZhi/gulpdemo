App.Init = function(imgJson) {
	// $("img[data-src]").each(function() {
	// 	$(this).attr("src", $(this).attr("data-src"));
	// });
	$('.loading').fadeOut();
	App.OrientationChange();
	window.addEventListener('orientationchange', App.OrientationChange);
};

// var a = [];
// for (var i = 0; i < 10; i++) {
// 	a[i] = function () {
// 		console.log(i);
// 	};
// }
// a[6]()

var a = [];
for (let i = 0; i < 10; i++) {
	a[i] = function () {
		console.log(i);
	};
}
a[6](); // 6

