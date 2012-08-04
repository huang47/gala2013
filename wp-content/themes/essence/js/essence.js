jQuery(document).ready( function ($) {
	/* TABS --------------------------------- */
	/* Remove if you don't need :) */

	function activateTab($tab) {
		var $activeTab = $tab.closest('dl').find('a.active'),
			contentLocation = $tab.attr("href") + 'Tab';

		// Strip off the current url that IE adds
		contentLocation = contentLocation.replace(/^.+#/, '#');

		//Make Tab Active
		$activeTab.removeClass('active');
		$tab.addClass('active');

	    //Show Tab Content
		$(contentLocation).closest('.tabs-content').children('li').hide();
		$(contentLocation).css('display', 'block');
	}

	$('dl.tabs').each(function () {
		//Get all tabs
		var tabs = $(this).children('dd').children('a');
		tabs.click(function (e) {
			activateTab($(this));
		});
	});

	if (window.location.hash) {
		activateTab($('a[href="' + window.location.hash + '"]'));
		$.foundation.customForms.appendCustomMarkup();
	}

	/* ALERT BOXES ------------ */
	$(".alert-box a.close").on("click.essence-alert", function(event) {
		event.preventDefault();
		$(this).closest(".alert-box").fadeOut(function(event){
			$(this).remove();
		});
	});

	/* DROPDOWN NAV ------------- */

	var lockNavBar = false;
	$('.nav-bar a.flyout-toggle').live('click', function(e) {
		e.preventDefault();
		var flyout = $(this).siblings('.flyout');
		if (lockNavBar === false) {
			$('.nav-bar .flyout').not(flyout).slideUp(500);
			flyout.slideToggle(500, function(){
				lockNavBar = false;
			});
		}
		lockNavBar = true;
	});

	if (Modernizr.touch) {
		$('.nav-bar>li.has-flyout>a.main').css({
			'padding-right' : '75px'
		});
		$('.nav-bar>li.has-flyout>a.flyout-toggle').css({
			'border-left' : '1px dashed #eee'
		});
	} else {
		$('.nav-bar>li.has-flyout').hover(function() {
			$(this).children('.flyout').show();
		}, function() {
			$(this).children('.flyout').hide();
		})
	}
});

(function () {
    var TEMPLATE = '<div class="day">{day}</div>' +
        '<div class="hour">{hour}</div>' +
        '<div class="minute">{minute}</div>' +
        '<div class="second">{second}</div>',
        DAY = 86400000,    // 24*60*60*1000
        HOUR = 3600000,    // 60*60*1000
        MINUTE = 60000,    // 60*1000
        SECOND = 1000,     // 1000
        INTERVAL = SECOND,
        END,
        diff,
        timer = document.getElementById('timer'),
        html;

    function toDate(iso8601DateTime) {
        var ISO8601_REGEX = /(\d{4})-?(\d{2})(?:-?(\d{2}))?T(\d{2}):(\d{2})(?::(\d{2}))?(\+\d{2}|Z|)/,
            EMPTY_STRING = '',
            date = new Date(null),
            dt = iso8601DateTime.match(ISO8601_REGEX),
            designator;

        if (!dt) {
            //Y.log('input time is not in ISO8601 format', 'error', NAME);
            return EMPTY_STRING;
        }

        // skip input
        dt.shift();
        designator = dt.pop();

        date.setFullYear(dt.shift(), dt.shift() - 1, dt.shift());
        if (dt[0]) { date.setUTCHours(dt.shift()); }
        if (dt[0]) { date.setUTCMinutes(dt.shift()); }
        if (dt[0]) { date.setUTCSeconds(dt.shift()); }

        return date;
    }

    function getDiff() {
        var diff, d, h, m, s, start;

        start = new Date();
        diff = END - start;
        d = (diff / DAY) >> 0;
        h = ((diff - d * DAY) / HOUR) >> 0;
        m = ((diff - d * DAY - h * HOUR) / MINUTE) >> 0;
        s = ((diff - d * DAY - h * HOUR - m * MINUTE) / SECOND) >> 0;

        return {
            day: d,
            hour: h,
            minute: m,
            second: s
        };
    }

    END = toDate('2013-05-24T00:00:00Z');

    setTimeout(function iterate() {
        var diff = getDiff(),
            html = TEMPLATE.replace('{day}', diff.day).replace('{hour}', diff.hour).replace('{minute}', diff.minute).replace('{second}', diff.second);

        if (timer) { timer.innerHTML = html; }
        setTimeout(iterate, INTERVAL);
    }, 10);
}());
