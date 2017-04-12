$(function(){	
//	banner开始
    let bannerbox= $('.banner');   		 //获取大盒子box，因为只有一个，用的querySelector
    let bannerImg = $('.banner > .img > li');		//获取所有的轮播图片集合
	let circles = $('.circle > li');		//获取所有小点，成为一个集合
    let left = $('.banner a.left');			//获取两边的按钮 ，dom对象
	let right = $('.banner a.right');
    let ne = 0;										//设置图片和圆点加n++
    let nw=0;
    let flag = true;									//设置开关的初始值为真
    let move = function (way = "right") {                 //将给图片和小圆点.first设置样式的代码封装成了函数
        if (way == "right") {                           //如果向右轮播，则n循环加1，n++
            ne=nw+1;
            if (ne >= bannerImg.length) {                     //因为只有五张图片，只需要循环五次。n从0开始取值的，
                ne = 0;                                 // 所以当n取到5时，将n再次设置为0，就可以循环轮播了
            }
        }
        if (way == "left") {                             //图片轮播向左，n--
            ne=nw-1;
            if (ne < 0) {                                // 所以当n<0时，将n再次设置为4，就可以循环轮播了
                ne = bannerImg.length - 1;
            }
        }
        bannerImg.eq(ne).addClass('img-one').end().eq(nw).removeClass('img-one');
        circles.eq(ne).addClass('circle-one').end().eq(nw).removeClass('circle-one');
        nw=ne;
    };
    let tt = setInterval(move, 3000);					//调用move函数，将图片进行1.3秒的轮播

    bannerbox.hover(function () {
        clearInterval(tt);
    },function () {
        tt = setInterval(move, 3000);
    })

    circles.click(function () {
        bannerImg.eq($(this).index()).animate({opacity:1}).end().eq(nw).animate({opacity:0});
        circles.eq($(this).index()).addClass('circle-one').end().eq(nw).removeClass('circle-one');
        nw=$(this).index();
    })

    // 给左右按钮添加点击事件
    left.click(function (left) {
        if (flag) {                           //设置开关是为了给图片一个加载时间，等图片加载完再往后继续执行，鼠标连续点击没用
            flag = false;                     //当开关flag为真时即可以加载图片了，，然后关闭开关，等图片加载完后再开启开关
            move('left');
        }
    })
    right.click (function (right) {
        if (flag) {
            flag = false;
            move('right');
        }
    })
    bannerImg.on('transitionend',function () {
        flag=true;
    })
	
//	选项卡
		
//	特别推荐轮播开始
	let box=document.querySelector(".box");
	let spes=document.querySelectorAll(".special");
	function movel(){
		animate(box,{left:-190},500,function(){
			let first=spes[0];
			box.appendChild(first);
			box.style.left=0;
		});	
	}
	let t=setInterval(movel,3000)
	box.onmouseover=function(){
		clearInterval(t)
	}
	box.onmouseout=function(){
		t=setInterval(movel,2000)
	}
//	特别推荐轮播结束

//楼层选项卡
	function xxk(tag1s,tag2s){
	for(let i=0;i<tag1s.length;i++){
		tag1s[i].onmouseover=function(){			
			for(let j=0;j<tag2s.length;j++){
				tag1s[j].classList.remove(`first`);				
				tag2s[j].classList.remove(`first`);
			}
			this.classList.add(`first`);
			tag2s[i].classList.add(`first`);
		}		
	}	
}
	let floors=document.querySelectorAll(".floor");
	for(let i=0;i<floors.length;i++){
		let s=floors[i].querySelectorAll('.list');
		let f=floors[i].querySelectorAll('.F-r');
		xxk(s,f);
	}
})