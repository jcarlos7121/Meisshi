var Coming = function(){

	this.W           = $(window);
	this.Ww          = this.W.width();
	this.Wh          = this.W.height();
	this.body        = $(document.body);
	this.viewport    = 940;

 	this.container   = $("#coming");
	this.banner      = this.container.find(".banner");
	this.menu        = this.container.find(".menu");
	this.trailer     = this.container.find(".trailer");
	this.video       = this.trailer.find("video");
	this.anchorsLink = this.container.find("*[data-trigger]");
	this.formSubmit  = this.container.find(".input-submit");
	this.alerts      = this.container.find(".alerts");
	this.sharer      = this.container.find(".support .button");
	this.toAnimate	 = this.container.find("*[data-to-animate]");
	this.isAnim      = false;
	this.isLoaded    = false;
	this.videoSetup  = false;
	this.iScroll     = 0;
	this.iPrevScroll = 0;

	this._initEvents();

};

//* Initialize events
Coming.prototype._initEvents = function(){

	var that = this;

	this._setFullSize(this.banner.find(".banner-cover"), this.banner);
	this._polyfill();

	this._update(function(){

		that.iScroll = that.W.scrollTop();
		that.Ww = $(window).width();
		that.Wh = $(window).height();

		if(that.Ww > that.viewport){

			that._fixHeader();
			that.isLoaded = true;

			if(that.W.scrollTop() >= 0 && Modernizr.csstransforms){

				that.banner.find(".banner-cover").css({
					transform : "translateY(" + (that.W.scrollTop() * 0.3) + "px)"
				});

			}

			if(!that.videoSetup){

				that.video.mediaelementplayer({

					features: ['playpause','progress','current','tracks'],
					alwaysShowControls : true,
					success : function(){

						that.videoSetup = true;

						setTimeout(function(){

							that.video.show();

						},200);

					}

				});

			}

			that._animations();

		}else{

			that.banner.find(".banner-cover").removeAttr("style");
			that.banner.removeAttr("style");

		}

	});

	this.anchorsLink.each(function(){

		var $this = $(this);

		$this.on("click", function(e){

			e.preventDefault();

			var link  = $this.attr("href");

			if(!that.isAnim){

				that.isAnim = true;
				that._scrollToAnchor(link);

			}

		});

	});

	this.sharer.each(function(){

		var $this = $(this);

		$this.on("click", function(e){

			e.preventDefault();

			var link = $(this).attr("href");
				social = $(this).attr("data-social");

			window.open(link, "_blank", "width=600, height=400");

		});

	});

	this.formSubmit.on("click", function(e){

		e.preventDefault();
		that._sendAjaxRequest();

	});

	this.W.on("resize", function(){

		that._setFullSize(that.banner.find(".banner-cover"), that.banner);

	});

};

//* 60FPS Update
Coming.prototype._update = function(callback){

	setInterval(callback, 17);

};

//* Animate scroll to targetted anchor
Coming.prototype._scrollToAnchor = function(id){

	var that   = this,
		offset = $(id).offset();

	$('body,html').animate({

		scrollTop : offset.top

	}, 500, "easeInOutQuad", function(){

		that.isAnim = false;

	});

};

//* Handle menu on scroll
Coming.prototype._fixHeader = function(){

	if(!this.isLoaded){

		this.body.addClass("no-transitions");

	}else{

		this.body.removeClass("no-transitions");

	}

	if(this.iScroll > this.iPrevScroll){

		if(this.iScroll > 120 && this.iScroll < this.banner.height()){

			this.menu.addClass("hidden");

		}else if(this.iScroll >= this.banner.height() && this.iScroll < (this.body.height() - this.W.height())){

			this.menu.addClass("sticky hidden");

		}else if(this.iScroll >= (this.body.height() - this.W.height())){

			this.menu.removeClass("hidden");
			this.menu.addClass("sticky");

		}

	}else if(this.iScroll < this.iPrevScroll){

		if(this.iScroll < this.banner.height() && this.iScroll > 120){

			this.menu.addClass("hidden");

		}else if(this.iScroll <= 120){

			this.menu.removeClass("sticky hidden");

		}else{

			this.menu.removeClass("hidden");

		}

	}

	this.iPrevScroll = this.iScroll;

};

//* Function setting an element full size
Coming.prototype._setFullSize = function(element, parent){

	var iWidth,
	    iHeight,
	    iRatio,
		parentHeight,
		parentWidth;

	if(!parent){

		parentHeight = W.wh;
		parentWidth  = W.ww;

	}else{

		parentHeight = parent.height();
		parentWidth  = parent.width();

	}

	element.removeAttr("style");

	iWidth  = element.width();
	iHeight = element.height();
	iRatio  = iHeight/iWidth;

	if(iRatio < parentHeight / parentWidth){

	    var iNewWidth = parentHeight / iRatio;
	    element.css({
	        height   : parentHeight,
	        width    : iNewWidth,
	        'margin' : '0 0 0 -'+((iNewWidth-parentWidth) / 2)+'px'
	    });

	}else{

	    var iNewHeight = parentWidth * iRatio;
	    element.css({
	        height   : iNewHeight,
	        width    : parentWidth
	    });

	}

};

//* Polyfill to allow placeholder across old browsers
Coming.prototype._polyfill = function(){

	var selector = 'input[data-placeholder],textarea[data-placeholder]';

	var elements = $(selector);

	var onFocus = function() {
		var el = $(this);
		var placeholder = el.attr('data-placeholder');

		if(el.val() === placeholder) {
			el.val('');
			el.removeClass('has-placeholder');
		}
	};

	var onBlur = function() {
		var el = $(this);
		var placeholder = el.attr('data-placeholder');

		if(el.val() === '') {
			el.val(placeholder);
			el.addClass('has-placeholder');
		}
	};

	elements.on('focus', onFocus);
	elements.on('click', onFocus);
	elements.on('blur', onBlur);
	elements.trigger('blur');

	var forms = $('form').has(selector);

	forms.on('submit', function(e) {
		e.preventDefault();

		$(this).children(selector).trigger('focus');

		if(this.id === 'newsletter-form' && !!window['submitNewsletter']) {
			submitNewsletter(e);
		} else {
			this.submit();
		}
	});

};

//* Ajax Request for the beta form
Coming.prototype._sendAjaxRequest = function(){

	var that = this;

    $.ajax({

        url : 'email.model.php',
        type : 'POST',
        cache : false,
        data : 'emailinput=' + $("#emailinput").val(),
        complete : function(data){

            //* Show good message
            switch(data.responseText){
                // Sucess
                case 'OK':
                    that._showFormMessage($("#OK"), true);
                    break;
                // Already exists
                case 'EXIST':
                    that._showFormMessage($("#EXIST"), false);
                    break;
                // Invalid
                case 'NOV':
                	that._showFormMessage($("#NOV"), false);
                    break;
                // Error
                case 'NOK':
                default:
                    that._showFormMessage($("#NOK"), false);
                    break;
            }

        },
        error : function(){

            console.log("Ajax Request Failed Biatch !");

        }

    });

};

//* Show Form Errors
Coming.prototype._showFormMessage = function(element, bool){

	var selected = this.alerts.find(".selected");

	selected.removeClass("selected");
	element.addClass("selected");

	if(selected.length == 0){

		var iHeight = element.outerHeight(true);

		this.alerts.css({
			height : 0
		});

		this.alerts.animate({
			height : iHeight
		}, 300, 'easeInOutQuad');

	}

	if(bool){

		var input = $("#emailinput"),
			placeholder = input.attr("data-placeholder");

		input.val(placeholder);

	}

};

//* Animations
Coming.prototype._animations = function(){

	var that = this;

	this.Wh = $(window).height();

	this.toAnimate.not(".animated").each(function(){

		var $this   = $(this),
			start = ($this.offset().top - that.Wh) + (($this.outerHeight(true) / 4) * 3),
			limit = $this.offset().top + $this.outerHeight(true);

		if(that.Wh >= limit){
			$this.addClass("animated");
		}else{
			if(that.iScroll >= start){
				$this.addClass("animated");
			}
		}

	});

};

$(document).ready(function(){

	new Coming();

});