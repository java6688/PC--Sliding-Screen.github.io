window.onload = function(){
	var headerNode = document.querySelector("#header");
	var arrow = document.querySelector("#header>.nav-wrap>.arrow");
	var liNodes = document.querySelectorAll("#header>.nav-wrap>.nav>.list>li");
	var ups = document.querySelectorAll("#header>.nav-wrap>.nav>.list .up");
	var contentNode = document.querySelector("#content");
	var contentList = document.querySelector("#content>.list");
	var contentDivs = document.querySelectorAll("#content>.list>div");
	var teamLis = document.querySelectorAll("#content>.list>.team-bg>.team>.team3>ul>li");
	var team3 = document.querySelector("#content>.list>.team-bg>.team>.team3");
	var scrollDots =document.querySelectorAll("#content>.scroll-dot>span");
	var musicBtn = document.querySelector("#header>.nav-wrap>.music");
	var audio = document.querySelector("#header>.nav-wrap>.music audio");
	var line = document.querySelector("#start .line");
	var startUp = document.querySelector("#start .up");
	var startDown = document.querySelector("#start .down");
  // 轮播图
  var banner = document.getElementsByClassName('banner')[0]
  var bannerDot = document.getElementsByClassName('dot')
  var step = 0
  var index = 0
  var timer = null
  var scollTime = 3000
	/*定时器标识*/
	var timer1 = null;
	var timer2 = null;
	/*把点击事件页面下标同步给滚轮事件*/
	var now = 0;
  
	//开机动画
	startMove();
	function startMove(){
		var arr = ['bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','about1.jpg','about2.jpg','about3.jpg','about4.jpg','worksimg1.jpg','worksimg2.jpg','worksimg3.jpg','worksimg4.jpg','team.png','greenLine.png'];
		var flag = 0;
		for(var i=0;i<arr.length;i++){
			var img = new Image();
			img.src = "img/"+arr[i];
			img.onload = function(){
				flag++;
				line.style.width = (flag/arr.length)*100+"%";
			}
		}
		line.addEventListener("transitionend",function(){
			startUp.style.height = 0;
			startDown.style.height = 0;
      if (!line.remove) {
        line.style.display = 'none'
      } else {
        line.remove();
      }
			arrAni[0].inAni();
		})
		startUp.addEventListener("transitionend",function(){
      if (!line.remove) {
        line.style.display = 'none'
      } else {
        start.remove();
      }
		})
    
    // 轮播图
    // let解决闭包问题
    for (let i = 0; i < bannerDot.length; i++) {
      bannerDot[i].onclick = function() {
        clearInterval(timer)
        for (var j = 0; j < bannerDot.length; j++) {
          bannerDot[j].classList.remove('active')
        }
        dotActive(i)
        step = 90 * i
        banner.style.transform = 'rotateY(-' + step + 'deg)'
        timer = setInterval(dotMove, scollTime)
      }
    }
    timer = setInterval(dotMove, scollTime)
    banner.addEventListener('mouseover', function() {
      clearInterval(timer)
    })
    banner.addEventListener('mouseleave', function() {
      timer = setInterval(dotMove, scollTime)
    })
	}
  function dotMove() {
    step += 90
    banner.style.transform = 'rotateY(-'+step+'deg)'
    step >= 360 ? 0 : step
    dotActive()
  }
  function dotActive(dotIndex) {
    // toggleClass(bannerDot[index], 'active')
    for (var i = 0; i < bannerDot.length; i++) {
      bannerDot[i].classList.remove('active')
    }
    if (dotIndex || dotIndex === 0) {
      index = dotIndex
    } else {
      index += 1
    }
    if (index > bannerDot.length-1) {
      index = 0
    }
    bannerDot[index].classList.add('active')
    // toggleClass(bannerDot[index], 'active')
  }
  
	musicBtn.onclick = function(){
		if(audio.paused){
			audio.play();
			this.style.backgroundImage = "url(img/musicon.gif)";
		}else{
			audio.pause();
			this.style.backgroundImage = "url(img/musicoff.gif)";
		}
	}
	//出入场
	arrAni = [
    // 第一屏
		{
			outAni:function(){
				// var banner = document.querySelector(".home .banner");
				var dot = document.querySelector(".home .icon");
				banner.style.transform = "translateY(-400px)";
				dot.style.transform = "translateY(100px)";
				banner.style.transition = "1s transform";
				dot.style.transition = "1s transform";
        clearInterval(timer)
			},
			inAni:function(){
				// var banner = document.querySelector(".home .banner");
				var dot = document.querySelector(".home .icon");
				banner.style.transform = "translateY(0px)";
				dot.style.transform = "translateY(0px)";
				banner.style.transition = "1s transform";
				dot.style.transition = "1s transform";
        clearInterval(timer)
        timer = setInterval(dotMove, scollTime)
			}
		},
    // 第二屏
		{
			outAni:function(){
				var plane1 = document.querySelector("#content .course-bg .plane1");
				var plane2 = document.querySelector("#content .course-bg .plane2");
				var plane3 = document.querySelector("#content .course-bg .plane3");
				plane1.style.transform = "translate(-200px,-100px)";
				plane2.style.transform = "translate(-200px,100px)";
				plane3.style.transform = "translate(200px,-100px)";
			},
			inAni:function(){
				var plane1 = document.querySelector("#content .course-bg .plane1");
				var plane2 = document.querySelector("#content .course-bg .plane2");
				var plane3 = document.querySelector("#content .course-bg .plane3");
				plane1.style.transform = "translate(0px,0px)";
				plane2.style.transform = "translate(0px,0px)";
				plane3.style.transform = "translate(0px,0px)";
			}
		},
    // 第三屏
		{
			outAni:function(){
				var pencel1 = document.querySelector("#content .works .pencel1");
				var pencel2 = document.querySelector("#content .works .pencel2");
				var pencel3 = document.querySelector("#content .works .pencel3");
				pencel1.style.transform = "translateY(-100px)";
				pencel2.style.transform = "translateY(100px)";
				pencel3.style.transform = "translateY(100px)";
				pencel1.style.transition = "1s transform";
				pencel2.style.transition = "1s transform";
				pencel3.style.transition = "1s transform";
			},
			inAni:function(){
				var pencel1 = document.querySelector("#content .works .pencel1");
				var pencel2 = document.querySelector("#content .works .pencel2");
				var pencel3 = document.querySelector("#content .works .pencel3");
				pencel1.style.transform = "translateY(0px)";
				pencel2.style.transform = "translateY(0px)";
				pencel3.style.transform = "translateY(0px)";
				pencel1.style.transition = "1s transform";
				pencel2.style.transition = "1s transform";
				pencel3.style.transition = "1s transform";
			}
		},
    // 第四屏
		{
			outAni:function(){
				var items = document.querySelectorAll(".about3 .item");
				items[0].style.transform = "rotate(30deg)";
				items[1].style.transform = "rotate(-30deg)";
				items[0].style.transition = "1s transform";
				items[1].style.transition = "1s transform";
			},
			inAni:function(){
				var items = document.querySelectorAll(".about3 .item");
				items[0].style.transform = "rotate(0deg)";
				items[1].style.transform = "rotate(0deg)";
				items[0].style.transition = "1s transform";
				items[1].style.transition = "1s transform";
			}
		},
    // 第五屏
		{
			outAni:function(){
				var team1 = document.querySelector(".team .team1");
				var team2 = document.querySelector(".team .team2");
				team1.style.transform = "translateX(-200px)";
				team2.style.transform = "translateX(200px)";
				team1.style.transition = "1s transform";
				team2.style.transition = "1s transform";
			},
			inAni:function(){
				var team1 = document.querySelector(".team .team1");
				var team2 = document.querySelector(".team .team2");
				team1.style.transform = "translateX(0px)";
				team2.style.transform = "translateX(0px)";
				team1.style.transition = "1s transform";
				team2.style.transition = "1s transform";
			}
		},
	]
	
	for(var i=0;i<arrAni.length;i++){
		arrAni[i]["outAni"]();
	}

	//第五屏
	team();
	function team(){
		var oc = null;
		for(var i=0; i<teamLis.length; i++){
			teamLis[i].onmouseenter = function(){
				for(var i=0; i<teamLis.length; i++){
					teamLis[i].style.opacity = .3;
				}
				this.style.opacity = 1;
				oc.style.left = this.offsetLeft + "px";
				oc.style.bottom = 0 + "px";
			}
		}
		team3.onmouseenter = function(){
			createCanvas();
			maopao();
		}
		team3.onmouseleave = function(){
			for(var i=0; i<teamLis.length; i++){
				teamLis[i].style.opacity = 1;
			}
			removeCanvas();
		}
		//创建canvas
		function createCanvas(){
			if(!oc){
				oc = document.createElement("canvas");
				team3.appendChild(oc);
				oc.width = teamLis[0].offsetWidth;
				oc.height = teamLis[0].offsetHeight;
			}
		}
		//删除canvas
		function removeCanvas(){
			oc.remove();
			oc = null;
			clearInterval(timer1);
			clearInterval(timer2);
		}
		//冒泡效果
		function maopao(){
			if(oc.getContext){
				var ctx = oc.getContext('2d');
				var arr = [];
				timer1 = setInterval(function(){
					ctx.clearRect(0,0,oc.width,oc.height);
					//控制动画
					for(var i=0; i<arr.length; i++){
						arr[i].deg+=13;
						if(arr[i].y<=60){
							arr.splice(i,1);
						}
						arr[i].y = arr[i].startY - (arr[i].deg*Math.PI/180)*arr[i].step;
						arr[i].x = arr[i].startX + Math.sin(arr[i].deg*Math.PI/180 )*arr[i].step*3;
					}
					
					//绘制图形
					for(var i=0; i<arr.length; i++){
						ctx.save();
						ctx.fillStyle = "rgba("+arr[i].red+","+arr[i].green+","+arr[i].blue+","+arr[i].alpha+")";
						ctx.beginPath();
						ctx.arc(arr[i].x,arr[i].y,arr[i].r,0,2*Math.PI);
						ctx.fill();
						ctx.restore();
					}
				},1000/60)
				
				//控制绘制速度
				timer2 = setInterval(function(){
					var r = Math.random()*10;
					var x = Math.random()*oc.width;
					var y = oc.height-r;
					var red = Math.round(Math.random()*255);
					var green = Math.round(Math.random()*255);
					var blue = Math.round(Math.random()*255);
					var alpha = 1;
					var deg = 0;
					var step = Math.random()*10+10;
					var startX = x;
					var startY = y;
					arr.push({
						x:x,
						y:y,
						r:r,
						red:red,
						green:green,
						blue:blue,
						alpha:alpha,
						deg:deg,
						step:step,
						startX:startX,
						startY:startY,
					});
				},100)
			}
		}
	}
	

	
	//头部
	header();
	function header(){
		arrow.style.left = liNodes[0].offsetLeft + liNodes[0].offsetWidth/2 - arrow.offsetWidth/2 + "px";
		ups[0].style.width = "100%";
		for(var i=0; i<liNodes.length; i++){
			//解决异步执行下标问题
			liNodes[i].index = i;
			liNodes[i].onclick = function(){
				now = this.index;
				console.log("点击now="+now)
				arrow.style.left = liNodes[now].offsetLeft + liNodes[now].offsetWidth/2 - arrow.offsetWidth/2 + "px";
				move(now);
				addDotBK(now);
			}
		}
	}
	//翻页小圆点
	scrollDot(0);
	function scrollDot(index){
		scrollDots[index].classList.add("active");
		for(var i=0; i<scrollDots.length; i++){
			scrollDots[i].index = i;
			scrollDots[i].onclick = function(){
				now = this.index;
				arrow.style.left = liNodes[now].offsetLeft + liNodes[now].offsetWidth/2 - arrow.offsetWidth/2 + "px";
				move(now);
				addDotBK(now);
			}
		}
	}
	function addDotBK(index){
		for(var i=0; i<scrollDots.length; i++){
			scrollDots[i].classList.remove("active");
		}
		scrollDots[index].classList.add("active");
	}
	
	window.onresize = function(){
		header();
		content();
	}
	
	//导航条宽度和内容区动画
	function move(index){
		for(var i=0; i<ups.length; i++){
			ups[i].style.width = 0;
		}
		ups[index].style.width = "100%";
		contentList.style.top = -index*contentList.offsetHeight + "px";
		
		//控制出入场动画
		arrAni[index].inAni();
		if(index!=0){
			arrAni[index-1].outAni();
		}
		if(index!=4){
			arrAni[index+1].outAni();
		}
		
	}
	
	
	//内容区
	content();
	function content(){
		// var page = 0;
		var timer;
		contentNode.style.height = document.documentElement.clientHeight - headerNode.offsetHeight + "px";
		//火狐滚轮事件
		if(contentNode.addEventListener){
			contentNode.addEventListener("DOMMouseScroll",function(ev){
				ev = ev || event;
				clearTimeout(timer);
				timer = setTimeout(function(){
					if(ev.detail>0){
						now++;
						if(now>contentDivs.length-1){
							now = contentDivs.length-1;
						}
					}
					if(ev.detail<0){
						now--;
						if(now<0){
							now=0;
						}
					}
					contentList.style.top = -now*contentList.offsetHeight + "px";
					console.log("滚动now="+now)
					arrow.style.left = liNodes[now].offsetLeft + liNodes[now].offsetWidth/2 - arrow.offsetWidth/2 + "px";
					move(now);
					addDotBK(now);
				},200)
			})
		}
		//非火狐滚轮事件
		contentNode.onmousewheel = function(ev){
			ev = ev || event;
			clearTimeout(timer);
			timer = setTimeout(function(){
				if(ev.wheelDelta<0){
					now++;
					if(now>contentDivs.length-1){
						now = contentDivs.length-1;
					}
				}else if(ev.wheelDelta>0){
					now--;
					if(now<0){
						now=0;
					}
				}
				console.log("滚动now="+now)
				contentList.style.top = -now*contentDivs[0].offsetHeight + "px";
				arrow.style.left = liNodes[now].offsetLeft + liNodes[now].offsetWidth/2 - arrow.offsetWidth/2 + "px";
				move(now);
				addDotBK(now);
			},200)
		}
	}
}