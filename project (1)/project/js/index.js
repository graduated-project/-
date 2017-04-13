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
    let move = function (way='right') {                 //将给图片和小圆点.first设置样式的代码封装成了函数
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

    //封装的选项卡函数
    function xuanxiangka(parent) {
        let lis = $('.tab-top li',parent);  //获取nav导航栏li元素集合
        let uls = $('.control ul.tab-bottom',parent);//获取导航具体内容部分的具体内容ul集合
        lis.mouseover(function () {
            lis.removeClass('first').eq($(this).index()).addClass('first');
            uls.css('display','none').eq($(this).index()).css('display','block');
        })
    }
	xuanxiangka($('.tab'));


    // 右侧固定栏
    $('.fixed-r > div').hover(function () {
        $(this).find('div').css({display:'block'});
    },function () {
        $(this).find('div').css({display:'none'});
    })
    let m;
    $('section.fixed-r > ul.center > li',).hover(function () {
         // m=setTimeout(function () {
            $(this).children('div').animate({right:40}).css({display:'block'});
        // },200)

    },function () {
        // clearTimeout(m);
        $(this).children('div').css({right:80,display:'none'});
    })

    $('section.fixed-r > ul.btom > li:nth-child(1)').hover(function () {
        $(this).children('div.code').css({display:'block'});
    },function () {
        $(this).children('div.code').css({display:'none'});
    })
    $('section.fixed-r > ul.btom > li:nth-child(1)~li').hover(function () {
        $(this).children('div').animate({right:40}).css({display:'block'});
    },function () {
        $(this).children('div').css({right:80,display:'none'});
    })



    // 左侧固定栏(楼层跳转)
    let floors=document.querySelectorAll('.floor');  //获取所有楼层
    // console.log(floors)
    let fixL=document.querySelector('section.fixed-l');
    let fixLis=document.querySelectorAll('section.fixed-l > ul.fix-list > li');  //获取左侧固定栏
    console.log(fixLis)
    let current;
    // let topfixed=document.querySelector('section.top');
    // console.log(topfixed);
    let arr=[...floors].map(function(value){  //利用map将每层楼的offsetTop放到数组中
        return value.offsetTop;
    });                                        //每层楼的高度的数组利用arr的下标来对应
    let sign=true,signone=true,signtwo=false;
    //scrollTop+400>=offsetTop
    //offsetTop=screenheigh+scrollTop-150;
    //监测滚轮是否滚动
    $(window).triggerHandler('scroll');
    window.onscroll=function () {
        let obj=document.body.scrollTop==0?document.documentElement:document.body;
        let scrollTop=obj.scrollTop;
        // console.log(scrollTop);
        //如果滚轮的高度
        // scrollTop=offsetTop 显示的是楼层刚好消失的高度
        //scrollTop+500>=floors[0].offsetTop 将滚轮加500，就是楼层刚好出现了一点
        if(scrollTop+500>=arr[0]){
            fixL.style.display='block';
            if(signone){
                signone=false;
                // animate(topfixed,{height:50},50,function () {
                //     signtwo=true;
                // });
            }
        }else{
            fixL.style.display='none';
            if(signtwo){
                signtwo=false;
                // animate(topfixed,{height:0},50,function () {
                //     signone=true;
                // });
            }
        }
        //循环判断每层楼的高度
        if(sign){
            for(let i=0;i<arr.length;i++){

                if(scrollTop+500>=arr[i]){
                    fixLis.forEach(function(value){
                        value.classList.remove('color');

                    })
                    fixLis[i].classList.add('color');
                    current=i;
                }
            }

        }

    }
    fixLis.forEach(function (value,index) {
        value.onclick=function(){
            sign=false;
            current=index;
            let height=floors[index].offsetTop;
            animate(document.body,{scrollTop:height},500,function () {
                sign=true;
            })
        }
        value.onmouseover=function () {
            this.classList.add('color');
        }
        value.onmouseout=function () {
            if(current!=index){
                this.classList.remove('color');
            }
        }

    })


    // 购物车
    let shopping=$('section.search > .inside-w > a.cart');
    shopping.click(function () {
        $(this).find('div.down').toggleClass('block')
    })
})


