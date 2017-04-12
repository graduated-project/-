$(function(){
//	banner开始
	
	
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
})