var throttleV1 = function(fn, delay){
	var timer = null;
	return function(){
		var context = this, args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function(){
			fn.apply(context, args);
		}, delay);
	};
};

var throttleV2 = function(fn, delay, mustRunDelay){
	var timer = null;
	var t_start;
	return function(){
		var context = this, args = arguments, t_curr = +new Date();
		clearTimeout(timer);
		if(!t_start){
			t_start = t_curr;
		}
		if(t_curr - t_start >= mustRunDelay){
			fn.apply(context, args);
			t_start = t_curr;
		}
		else {
			timer = setTimeout(function(){
				fn.apply(context, args);
			}, delay);
		}
	};
};

var throttleV3 = function(opt){
	var timer = null;
	var t_start;
	var fn = opt.fn,
		context = opt.context,
		delay = opt.delay || 100,
		mustRunDelay = opt.mustRunDelay;
	return function(){
		var args = arguments, t_curr = +new Date();
		context = context || this;
		
		clearTimeout(timer);
		if(!t_start){
			t_start = t_curr;
		}
		if(mustRunDelay && t_curr - t_start >= mustRunDelay){
			fn.apply(context, args);
			t_start = t_curr;
		}
		else {
			timer = setTimeout(function(){
				fn.apply(context, args);
			}, delay);
		}
	};
};

window.onload = function(){
	var box = document.getElementById('box'),
		handle = document.getElementById('handle'),
		iframe = document.getElementById('frame'),
		maskLayer = document.getElementById('maskLayer'),
		switchBox = document.getElementById('switchBox');
	var oldX,
		oldY,
		left,
		top;
	
	
	/**
	 * �ֲ�ͬģʽ���岻ͬ������϶���Ӧ����
	 */
	var mode = 0;
	var moveFns = [];
	
	var move = function(e){
		box.style.left = (e.clientX - oldX + left) + 'px';
		box.style.top = (e.clientY - oldY + top) + 'px';
		//iframe.src = 'http://www.qq.com';
	};
	
	moveFns[0] = function(){
			var e = arguments[0];
			move(e);
			console.log('normal');
		};
	
	moveFns[1] = throttleV1(function(){
			var e = arguments[0];
			move(e);
			console.log('throttleV1');
		}, 100);
	
	moveFns[2] = throttleV2(function(){
			var e = arguments[0];
			move(e);
			console.log('throttleV2');
		}, 50, 50);
	
	moveFns[3] = throttleV2(function(){
			var e = arguments[0];
			move(e);
			console.log('throttleV2');
		}, 50, 30);
	
	
	/**
	 * �¼�����
	 */
	handle.onmousedown = function(e){
		console.log('mouse down');
		oldX = e.clientX;
		oldY = e.clientY;
		left = parseInt(box.style.left);
		top = parseInt(box.style.top);
		maskLayer.style.display = 'block';
	};
	maskLayer.onmousemove = function(e){
		moveFns[mode](e);
	};
	maskLayer.onmouseup = function(){
		maskLayer.style.display = 'none';
	};
	
	switchBox.onclick = function(e){
		var target = e.target,
			siblings = target.parentNode.childNodes;
		mode = parseInt(target.value);
		for(var i = siblings.length; i--;){
			siblings[i].disabled = false;
		}
		target.disabled = true;
		console.log(mode);
	};
};