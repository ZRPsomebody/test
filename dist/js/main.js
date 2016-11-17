$(function(){
	function GetRtime(time){
		//var DIRE    = new Date(Date.parse(time.replace(/-/g, "/"))).getTime(),
		nowTime = new Date().getTime();
			sub = time-nowTime;
			day = Math.floor(sub/86400000);
			hou = Math.floor((sub-86400000*day)/3600000);
			min = Math.floor((sub-86400000*day-hou*3600000)/60000);
			sec = Math.floor((sub-86400000*day-hou*3600000-min*60000)/1000);
			if(sub<86400000&&sub>=3600000){
				return  hou + min + sec;
			}else if(sub<3600000&&sub>=60000){
				return  min  + sec;
			}else if (sub<60000) {
				return   sec;
			}
		return hou + min+ sec;
		
	};
	setInterval(function(){
		var answerEndDate = "2016-11-30 24:00:00", //最终时间
	 		ti 	 	  = new Date(Date.parse(answerEndDate.replace(/-/g, "/"))).getTime();//讲获取到的时间转换成时间格式
			nowTime   = new Date().getTime(),//将现在时间转换为时间戳;
			timer 	  = GetRtime(ti);//ti就是你设定最终的时间 记住时间格式是："2016-10-21 11:39:00"
			
		if (ti-nowTime>0) {
			countTime = timer;
		}else{
			countTime = "时间已截止";
		}
		if(hou<10){
			$('.hour').html('0'+hou);
		}else{
			$('.hour').html(hou);
		}
		if(min<10){
			$('.min').html('0'+min);
		}else{
			$('.min').html(min);
		}
		if(sec<10){
			$('.sec').html('0'+sec);
		}else{
			$('.sec').html(sec);
		}
	},1000)
})

$(function(){
	var swiper = new Swiper('.swiper-container', {
	    pagination: '.swiper-pagination',
	    paginationClickable: true
	});
	
	$('.top_btn').on('click',function(){
		$(window).scrollTop('0');
	})
	
	var index = 1;
	//当滚动条滚动到接近底部时，加载更多的数据
	ajax(showImg);
	$(window).on('scroll',function(){
		
		var scrollTop = $(window).scrollTop();
		
		//文档内容高度
		var docHeight = $(document).height();
		
		//窗口高度
		var winHeight = $(window).height();
		
		if(scrollTop >= 500){
			$('.top_btn').show();
		}else{
			$('.top_btn').hide();
		}
		
		
		//滚动条滚动到底时触发
		if(scrollTop >= docHeight - winHeight){
			index++;
			if(index < 6){
				ajax(showImg);
				$('#datalist').show();
			}else{
				$('#datalist').hide();
			}
		}
	})
	
	function ajax(callback){
		
		var i = (index == 1) ? index : index * 15;
		
		$.ajax({
			
			url:'http://diviner.jd.com/diviner?p=610009&uuid=12396477&lid='+i+'&lim=15&cb=tempGuessLikeCallback',
			dataType:'jsonp',
			jsonp: 'callback',
			jsonpCallback: 'tempGuessLikeCallback',
			scriptCharset:'gb2312',
			
			success:function(res){
				var data = res.data;
				var _html = '';
				$.each(data,function(idx,obj){
					_html += '<li><a href="#"><span class="my"></span><div class="left_img"><img src="http://img13.360buyimg.com/n1/s200x200_'+ obj.img +'" />'+
					'</div><div class="right_con"><div class="title">'+ unescape(obj.t)+'</div>'+
					'<div class="price"><span class="strong">' + obj.jp + '</span><span class="strong-color">元</span><span class="tag">新用户1元抢</span>'+
					' <span class="line-right">已售'+obj.c3+'</span></div></div></a></li>'					
				})

				$('<ul/>').addClass('list-'+index).html(_html).appendTo($('.con_like'));		
					// 回调函数，等数据全部拼接完再执行
				if (typeof callback == 'function') {
					callback();
				}
			}
		});
	}
	ajax();
	// 用data-lazy-img属性替换src属性
	function showImg () {
		$('.list-' + index + ' img').each(function (){
			$(this).animate({opacity:0.3}, 500, function() {
				$(this).attr('src', $(this).attr('data-lazy-img')).animate({opacity: 1}, 100);
			});
		})
	}

	
})
