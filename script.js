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

(function () {
    var anotherSiteHandler = function (e) {
        switch (e.keyCode) {
            case 13: // ENTER - Vote
                $('[type="submit"][value="Vote To Close"]').click()
                $(document).off('keyup', anotherSiteHandler);
                $(document).on('keyup', actionHandler);
                break;
            case 27: // ESC - Close Dialog
                $(document).off('keyup', anotherSiteHandler);
                $(document).on('keyup', actionHandler);
                break;
            case 49: // 1 - Meta
                $('[name="migration"][value="meta.stackoverflow.com"]').click().focus();
                break;
            case 50: // 2 - SuperUser
                $('[name="migration"][value="superuser.com"]').click().focus();
                break;
            case 51: // 3 - TEX
                $('[name="migration"][value="tex.stackexchange.com"]').click().focus();
                break;
            case 52: // 4 - DBA
                $('[name="migration"][value="dba.stackexchange.com"]').click().focus();
                break;
            case 53: // 5 - Stats
                $('[name="migration"][value="stats.stackexchange.com"]').click().focus();
                break;
        }
    };
    var offTopicHandler = function (e) {
        switch (e.keyCode) {
            case 13: // ENTER - Vote
                $('[type="submit"][value="Vote To Close"]').click()
                $(document).off('keyup', offTopicHandler);
                $(document).on('keyup', actionHandler);
                break;
            case 27: // ESC - Close Dialog
                $(document).off('keyup', offTopicHandler);
                $(document).on('keyup', actionHandler);
                break;
            case 49: // 1 - Super User
                $('[name="close-as-off-topic-reason"][value="4"]').click().focus();
                break;
            case 50: // 2 - Server Fault
                $('[name="close-as-off-topic-reason"][value="7"]').click().focus();
                break;
            case 51: // 3 - Recommend Resource
                $('[name="close-as-off-topic-reason"][value="16"]').click().focus();
                break;
            case 52: // 4 - Debugging Help
                $('[name="close-as-off-topic-reason"][value="13"]').click().focus();
                break;
            case 53: // 5 - Typografical Error
                $('[name="close-as-off-topic-reason"][value="11"]').click().focus();
                break;
            case 54: // 6 - Another Site
                $('[name="close-as-off-topic-reason"][value="2"]').click();
                $(document).off('keyup', offTopicHandler);
                $(document).on('keyup', anotherSiteHandler);
                break;
            case 55: // 7 - Other
                $('[name="close-as-off-topic-reason"][value="3"]').click();
                break;
        }
    };
    var closeHandler = function (e) {
        switch (e.keyCode) {
            case 13: // ENTER - Vote
                $('[type="submit"][value="Vote To Close"]').click()
                $(document).off('keyup', closeHandler);
                $(document).on('keyup', actionHandler);
                break;
            case 27: // ESC - Close Dialog
                $(document).off('keyup', closeHandler);
                $(document).on('keyup', actionHandler);
                break;
            case 49: // 1 - Duplicate
                $('[name="close-reason"][value="Duplicate"]').click().focus();
                $(document).off('keyup', closeHandler);
                // TODO
                break;
            case 50: // 2 - Off Topic
                $('[name="close-reason"][value="OffTopic"]').click().focus();
                $(document).off('keyup', closeHandler);
                $(document).on('keyup', offTopicHandler);
                break;
            case 51: // 3 - Unclear
                $('[name="close-reason"][value="Unclear"]').click().focus();
                break;
            case 52: // 4 - Too Broad
                $('[name="close-reason"][value="TooBroad"]').click().focus();
                break;
            case 53: // 5 - Opinion Based
                $('[name="close-reason"][value="OpinionBased"]').click().focus();
                break;
        }
    };
    var actionHandler = function (e) {
        switch (e.keyCode) {
            case 49: // 1 - Leave Open
                $('.review-actions [value="Leave Open"]').click();
                break;
            case 50: // 2 - Close
                $('.review-actions [value="Close"]').click();
                $(document).off('keyup', actionHandler);
                $(document).on('keyup', closeHandler);
                break;
            case 51: // 3 - Edit
                $('.review-actions [value="Edit"]').click();
                break;
            case 52: // 4 - Skip
                $('.review-actions [value="Skip"]').click();
                break;
        }
    };
    $(document).on('keyup', actionHandler);
})();
