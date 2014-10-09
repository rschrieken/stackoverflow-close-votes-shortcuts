
// ==UserScript==
// @version     0.4
// @name        StackOverflow close votes shortcuts
// @author      Albireo
// @description A script to add keyboard shortcuts to StackOverflow's close votes review queue
// @homepage    https://github.com/kappa7194/stackoverflow-close-votes-shortcuts
// @updateURL   https://raw.githubusercontent.com/kappa7194/stackoverflow-close-votes-shortcuts/master/script.js
// @downloadURL https://raw.githubusercontent.com/kappa7194/stackoverflow-close-votes-shortcuts/master/script.js
// @match       http://stackoverflow.com/review/close*
// @grant       none
// ==/UserScript==

/*global $:false, document */

(function () {
	"use strict";

	function select(name, value) {
		return $('[name="' + name + '"][value="' + value + '"]');
	}

	function ClickFocus(name) {
		return function (value) {
			select(name, value).click().focus();
		};
	}

	function Click(name) {
		return function (value) {
			select(name, value).click();
		};
	}

	function ReviewClick() {
		return function (value) {
			$('.review-actions [value="' + value + '"]').click();
		};
	}

	function close() {
		$('[type="submit"][value="Vote To Close"]').click();
	}

    var state = 0,
		anotherSiteHandler = function (e) {
			var click = new ClickFocus('migration');
			switch (e.keyCode) {
			case 49: // 1 - Meta
				click('meta.stackoverflow.com');
				break;
			case 50: // 2 - SuperUser
				click('superuser.com');
				break;
			case 51: // 3 - TEX
				click('tex.stackexchange.com');
				break;
			case 52: // 4 - DBA
				click('dba.stackexchange.com');
				break;
			case 53: // 5 - Stats
				click('stats.stackexchange.com');
				break;
			}
		},
		offTopicClick = new ClickFocus('close-as-off-topic-reason'),
		offTopicClickOnly = new Click('close-as-off-topic-reason'),
		offTopicHandler = function (e) {
			switch (e.keyCode) {
			case 49: // 1 - Super User
				offTopicClick('4');
				break;
			case 50: // 2 - Server Fault
				offTopicClick('7');
				break;
			case 51: // 3 - Recommend Resource
				offTopicClick('16');
				break;
			case 52: // 4 - Debugging Help
				offTopicClick('13');
				break;
			case 53: // 5 - Typografical Error
				offTopicClick('11');
				break;
			case 54: // 6 - Another Site
				offTopicClickOnly('2');
				state = 3;
				break;
			case 55: // 7 - Other
				offTopicClickOnly('3');
				break;
			}
		},
		closeClick = new ClickFocus('close-reason'),
		closeHandler = function (e) {
			switch (e.keyCode) {
			case 49: // 1 - Duplicate
				closeClick('Duplicate');
				//switchKeyHandler(closeHandler);
				//TODO
				break;
			case 50: // 2 - Off Topic
				closeClick('OffTopic');
				state = 2;
				break;
			case 51: // 3 - Unclear
				closeClick('Unclear');
				break;
			case 52: // 4 - Too Broad
				closeClick('TooBroad');
				break;
			case 53: // 5 - Opinion Based
				closeClick('OpinionBased');
				break;
			}
		},
		reviewClick = new ReviewClick(),
		actionHandler = function (e) {
			switch (e.keyCode) {
			case 49: // 1 - Leave Open
				reviewClick('Leave Open');
				break;
			case 50: // 2 - Close
				reviewClick('Close');
				state = 1;
				break;
			case 51: // 3 - Edit
				reviewClick('Edit');
				break;
			case 52: // 4 - Skip
				reviewClick('Skip');
				break;
			}
		};

	// based on state call the correct handler
	function handleStates(e) {
		switch (state) {
		case 0:
			actionHandler(e);
			break;
		case 1:
			closeHandler(e);
			break;
		case 2:
			offTopicHandler(e);
			break;
		case 3:
			anotherSiteHandler(e);
			break;
		default:
			break;
		}
	}
    $(document).on('keyup', function (e) {
	    console.log(e);
		// prevent keying in the filter to trip the handling
		if (e.srcElement.className !== 'review-filter-tags ac_input') {
		    console.log('handle');
			switch (e.keyCode) {
			case 13: // ENTER - Vote
				close();
				state = 0;
				break;
			case 27: // ESC - Close Dialog
				state = 0;
				break;
			default:
				handleStates(e); // select correct handler based on state
				break;
			}
		}
	});
}());
