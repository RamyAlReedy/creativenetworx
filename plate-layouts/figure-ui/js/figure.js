/**
* Figure.js v1.0
* Figure UI Core JS
* http://figure-ui.com
* Licensed under the MIT license: http://opensource.org/licenses/MIT
*/

var Figure = {};

Figure.rtl = false;
Figure.spApps = false;

Figure.messageToChildren = function (message, childIndex) {
    var appframes = jQuery('.ms-webpart-chrome iframe');
    if (appframes.length > 0) {
        if (childIndex == null) {
            for (i = 0; i < appframes.length; i++) {
                appframes[i].contentWindow.postMessage(message, '*');
            }
        }
        else {
            appframes[childIndex].contentWindow.postMessage(message, '*');
        }
    }
};

Figure.messageToParent = function (message, parentFileName) {
    if (parentFileName == null) {
        window.parent.postMessage(message, '*');
    }
    else {
        var parentLocation = document.referrer.lastIndexOf("/") + 1;
        var parentPage = document.referrer.substr(parentLocation).toLowerCase();
        if (parentPage == parentFileName.toLowerCase()) {
            window.parent.postMessage(message, '*');
        }
    }
};

Figure.jsToChildren = function (jsToTrigger, childIndex) {
    if (childIndex == null) {
        Figure.messageToChildren('Figure.triggerFunction|' + jsToTrigger);
    }
    else {
        Figure.messageToChildren('Figure.triggerFunction|' + jsToTrigger, childIndex);
    }
};

Figure.jsToParent = function (jsToTrigger, parentFileName) {
    if (parentFileName == null) {
        Figure.messageToParent('Figure.triggerFunction|' + jsToTrigger);
    }
    else {
        Figure.messageToParent('Figure.triggerFunction|' + jsToTrigger, parentFileName);
    }
};

Figure.getWindowWidth = function () {
    var windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if (!windowWidth) {
        var documentElementRect = document.documentElement.getBoundingClientRect();
        windowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
    }
    return windowWidth;
};

Figure.getWindowHeight = function () {
    var windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    if (!windowHeight) {
        var documentElementRect = document.documentElement.getBoundingClientRect();
        windowHeight = documentElementRect.bottom - Math.abs(documentElementRect.top);
    }
    return windowHeight;
};

Figure.getScreenSize = function () {
    var windowWidth = Figure.getWindowWidth();
    var screenSize = 'small';
    if (windowWidth > 639 && windowWidth < 960) {
        screenSize = 'medium';
    }
    else if (windowWidth > 959 && windowWidth < 1200) {
        screenSize = 'large';
    }
    else if (windowWidth > 1199) {
        screenSize = 'xlarge';
    }
    return screenSize;
};

Figure.spAppsMediaQuery = function () {
    var screenSize = Figure.getScreenSize();

    jQuery('.fi-parent-page body').addClass('fi-window-small ');
    jQuery('.fi-parent-page body').removeClass('fi-window-small-only fi-window-medium fi-window-medium-only fi-window-large fi-window-large-only fi-window-xlarge fi-window-xlarge-only');

    if (screenSize == 'small') {
        jQuery('.fi-parent-page body').addClass('fi-window-small-only');
        Figure.messageToChildren('Figure.windowWidth|small');
    }
    else if (screenSize == 'medium') {
        jQuery('.fi-parent-page body').addClass('fi-window-medium fi-window-medium-only');
        Figure.messageToChildren('Figure.windowWidth|medium');
    }
    else if (screenSize == 'large') {
        jQuery('.fi-parent-page body').addClass('fi-window-large fi-window-large-only');
        Figure.messageToChildren('Figure.windowWidth|large');
    }
    else if (screenSize == 'xlarge') {
        jQuery('.fi-parent-page body').addClass('fi-window-xlarge fi-window-xlarge-only');
        Figure.messageToChildren('Figure.windowWidth|xlarge');
    }
};

Figure.matchHeights = function () {
    jQuery('[data-fi-match-heights]').not('pre *').each(function () {
        var matchWrapper = jQuery(this);
        var matchWrapperWidth = matchWrapper.outerWidth();
        var target = matchWrapper.find(jQuery(this).attr('data-fi-match-heights'));
        var targetHeight = 0;

        target.css('height', 'auto');
        target.each(function () {
            if (jQuery(this).outerHeight() > targetHeight) {
                targetHeight = jQuery(this).outerHeight();
            }
        });

        target.each(function () {
            if (jQuery(this).parent().is(matchWrapper)) {
                if (jQuery(this).outerWidth() != matchWrapperWidth) {
                    jQuery(this).css('height', targetHeight + 'px');
                }
                else {
                    jQuery(this).css('height', '');
                }
            }
            else {
                if (jQuery(this).parent().outerWidth() != matchWrapperWidth) {
                    jQuery(this).css('height', targetHeight + 'px');
                }
                else {
                    jQuery(this).css('height', '');
                }
            }
        });
    });
};

Figure.checkSticky = function () {
    if (jQuery('[data-fi-sticky]').length) {
        var scrollTop = jQuery(window).scrollTop();
        var windowWidth = Figure.getWindowWidth();
        var windowHeight = Figure.getWindowHeight();
        jQuery('[data-fi-sticky]:visible').each(function () {
            var sticky = jQuery(this);
            if (!sticky.parent().is('.fi-sticky-wrapper')) {
                sticky.wrap('<div class="fi-sticky-wrapper"></div>');
            }
            var stickyParent = sticky.closest('.fi-sticky-wrapper');
            var stickyWidth = stickyParent.width();
            var stickyHeight = sticky.outerHeight();
            var stickyOffsetTop = sticky.offset().top;
            var stickyOffsetBottom = stickyOffsetTop + stickyHeight;
            var parentOffsetTop = stickyParent.offset().top;
            var stickySettings = {
                offset: 0,
                limit: null,
                limitOffset: 0,
                minBreakpoint: 'large',
                disableWhenExceedsWindow: false
            };
            if (sticky.attr('data-fi-sticky').length) {
                var userSettings = eval('(' + sticky.attr('data-fi-sticky') + ')');
                if (userSettings.offset) {
                    stickySettings.offset = userSettings.offset;
                }
                if (userSettings.limit) {
                    stickySettings.limit = userSettings.limit;
                }
                if (userSettings.limitOffset) {
                    stickySettings.limitOffset = userSettings.limitOffset;
                }
                if (userSettings.minBreakpoint) {
                    stickySettings.minBreakpoint = userSettings.minBreakpoint;
                }
                if (userSettings.disableWhenExceedsWindow) {
                    stickySettings.disableWhenExceedsWindow = userSettings.disableWhenExceedsWindow;
                }
            }
            var limitTarget = stickySettings.limit || null;
            var limitTargetOffset = stickySettings.limitOffset || 0;
            var offsetMargin = stickySettings.offset || 0;
            var noSticky = stickySettings.minBreakpoint || 'large';
            var disableWhenExceedsWindow = stickySettings.disableWhenExceedsWindow || false;

            var stickyAllow = false;
            var stickyAllowBreakPoint = false;
            var stickyAllowWindowHeight = false;

            var screenSize = Figure.getScreenSize();

            if (screenSize == 'xlarge') {
                if (noSticky == 'xlarge' || noSticky == 'large' || noSticky == 'medium' || noSticky == 'small') {
                    stickyAllowBreakPoint = true;
                }
            }
            else if (screenSize == 'large') {
                if (noSticky == 'large' || noSticky == 'medium' || noSticky == 'small') {
                    stickyAllowBreakPoint = true;
                }
            }
            else if (screenSize == 'medium') {
                if (noSticky == 'medium' || noSticky == 'small') {
                    stickyAllowBreakPoint = true;
                }
            }
            else if (screenSize == 'small') {
                if (noSticky == 'small') {
                    stickyAllowBreakPoint = true;
                }
            }

            if (disableWhenExceedsWindow) {
                if (stickyHeight + offsetMargin < windowHeight) {
                    stickyAllowWindowHeight = true;
                }
            }
            else {
                stickyAllowWindowHeight = true;
            }

            if (stickyAllowBreakPoint && stickyAllowWindowHeight) {
                stickyAllow = true;
            }

            if (stickyAllow) {
                if (parentOffsetTop <= scrollTop + offsetMargin) {
                    if (stickyHeight > windowHeight) {
                        if (scrollTop + windowHeight >= parentOffsetTop + stickyHeight) {
                            sticky.addClass('fi-sticky-active').css({ width: stickyWidth, position: 'fixed', top: 'auto', bottom: 0 });
                            stickyParent.css({ height: stickyHeight });
                        }

                        else if (scrollTop + offsetMargin + stickyHeight >= stickyOffsetBottom) {
                            var stickyRectTop = this.getBoundingClientRect().top;
                            sticky.addClass('fi-sticky-active').css({ width: stickyWidth, position: 'fixed', top: -(scrollTop - stickyOffsetBottom + stickyHeight) - stickyOffsetTop + parentOffsetTop });
                            stickyParent.css({ height: stickyHeight });
                        }

                    }
                    else {
                        sticky.addClass('fi-sticky-active').css({ width: stickyWidth, position: 'fixed', top: offsetMargin + 'px' });
                        stickyParent.css({ height: stickyHeight });
                    }
                }
                else if (parentOffsetTop >= scrollTop + offsetMargin) {
                    sticky.removeClass('fi-sticky-active').css({ width: '', position: '', top: '', bottom: '' });
                    stickyParent.css({ height: '' });
                }
                if (limitTarget != undefined && sticky.closest(limitTarget).length) {
                    limitTarget = sticky.closest(limitTarget);
                    var parentOffsetBottom = limitTarget.offset().top + limitTarget.outerHeight();
                    if (scrollTop - parentOffsetBottom + stickyHeight >= 0 - offsetMargin - limitTargetOffset) {
                        sticky.css({ top: -(scrollTop - parentOffsetBottom + stickyHeight) - limitTargetOffset, bottom: '' });
                    }
                }
            }
            else {
                sticky.removeClass('fi-sticky-active').css({ width: '', position: '', top: '' });
                stickyParent.css({ height: '' });
            }
        });
    }
};

Figure.bodyOverflow = function () {
    var windowWidth = Figure.getWindowWidth();
    if (document.body.clientWidth < windowWidth) {
        return true;
    }
    else {
        return false;
    }
};

Figure.getScrollbar = function () {
    var scrollBarMeasure = jQuery('<div />');
    jQuery('body').css('position', 'relative').append(scrollBarMeasure);
    scrollBarMeasure.width(50).height(50)
        .css({
            overflow: 'scroll',
            visibility: 'hidden',
            position: 'absolute',
            left: 0
        });
    var scrollBarMeasureContent = jQuery('<div />').height(1);
    scrollBarMeasure.append(scrollBarMeasureContent);
    var insideWidth = scrollBarMeasureContent[0].offsetWidth;
    var outsideWitdh = scrollBarMeasure[0].offsetWidth;
    var insideOffset = scrollBarMeasureContent.offset().left;
    var scrollPosition = 'right';
    if (insideOffset > 0) {
        scrollPosition = 'left';
    }
    scrollBarMeasure.remove();
    jQuery('body').css('position', '');
    return { width: outsideWitdh - insideWidth, position: scrollPosition };
};

Figure.setBodyPaddingScroll = function () {
    var bodyOverflow = Figure.bodyOverflow();
    if (bodyOverflow) {
        var scrollbar = Figure.getScrollbar();
        if (scrollbar.width > 0) {
            var bodyPadding = parseInt(jQuery('body').css('padding-' + scrollbar.position), 10) || 0;
            jQuery('body').css('padding-' + scrollbar.position, bodyPadding + scrollbar.width);
        }
    }
};

Figure.resetBodyPaddingScroll = function () {
    jQuery('body').css({ paddingRight: '', paddingLeft: '' });
};

Figure.checkZeroCounts = function () {
    jQuery('.fi-count').not('pre *').each(function () {
        var count = jQuery(this);
        if (jQuery.trim(count.text()) == '0') {
            count.hide();
        }
        else {
            count.css('display', '');
        }
    });
};

//NAV-BAR
Figure.showNavBarSubMenu = function (navItem) {
    if (!navItem.is('li.mega-menu-item *')) {

        var subMenu = navItem.children('ul');

        clearTimeout(Figure.nbWrapTimerOut);
        clearTimeout(Figure.nbTimerOut);
        clearTimeout(Figure.nbTimerIn);

        Figure.nbTimerIn = setTimeout(function () {

            jQuery('.fi-nav-bar ul.fi-root li').not(navItem).not(navItem.parents('li')).not(navItem.find('li')).removeClass('fi-child-open child-visible').children('ul').removeClass('fi-opposite');

            if (subMenu.length && !navItem.hasClass('fi-child-open')) {

                navItem.addClass('fi-child-open');

                Figure.hideAllDropdownMenus();

                //CHECK IF SUB NAV IS OFF SCREEN
                var windowWidth = jQuery(window).innerWidth();
                var subMenuWidth = subMenu.outerWidth();
                var subMenuOffset = subMenu.offset().left;
                var subMenuDepth = subMenu.parents('ul').length + 1;

                if (subMenuOffset < 0 || subMenuOffset + subMenuWidth > windowWidth) {
                    if (subMenuDepth < 4) {
                        subMenu.addClass('fi-opposite');
                    }
                }
                else {
                    subMenu.removeClass('fi-opposite');
                }

                setTimeout(function () {
                    navItem.addClass('child-visible');
                }, 0);

            }

        }, 150);

    }
}

Figure.hideNavBarSubMenu = function (navItem) {
    if (!navItem.is('li.mega-menu-item *')) {

        var subMenu = navItem.children('ul');

        clearTimeout(Figure.nbWrapTimerOut);
        clearTimeout(Figure.nbTimerOut);
        clearTimeout(Figure.nbTimerIn);

        if (subMenu.length) {

            Figure.nbTimerOut = setTimeout(function () {

                if (navItem.hasClass('fi-child-open')) {
                    navItem.removeClass('child-visible');

                    setTimeout(function () {
                        navItem.removeClass('fi-child-open');
                        subMenu.removeClass('fi-opposite');
                    }, 50);
                }

            }, 200);
        }

    }
}

Figure.tap = ("ontouchstart" in document.documentElement);

if (!Figure.tap) {
    jQuery(document).on({
        mouseenter: function () {
            var navItem = jQuery(this);
            Figure.showNavBarSubMenu(navItem);
        },
        mouseleave: function () {
            var navItem = jQuery(this);
            Figure.hideNavBarSubMenu(navItem);
        }
    }, '.fi-nav-bar ul.fi-root li');
}
else {
    jQuery(document).on({
        click: function () {
            var navItem = jQuery(this).parent('li');
            if (navItem.hasClass('fi-child-open')) {
                Figure.hideNavBarSubMenu(navItem);
            }
            else {
                Figure.showNavBarSubMenu(navItem);
            }
        }
    }, '.fi-nav-bar ul.fi-root li > a, .fi-nav-bar ul.fi-root li > span');
}

jQuery(document).on({
    focus: function () {
        var navItem = jQuery(this);
        Figure.showNavBarSubMenu(navItem.parent('li'));
    }
}, '.fi-nav-bar ul.fi-root li > a, .fi-nav-bar ul.fi-root li > span');

jQuery(document).on({
    mouseleave: function () {
        Figure.nbWrapTimerOut = setTimeout(function () {
            jQuery('.fi-nav-bar ul.fi-root li').removeClass('fi-child-open child-visible').children('ul').removeClass('fi-opposite');
        }, 200);
    }
}, '.fi-nav-bar');

//MODALS SHARED TEMPLATE
Figure.modalTemplate = '<div class="fi-modal fi-no-click-close">\
    <div class="fi-modal-outer">\
        <div class="fi-modal-inner">\
            <div class="fi-modal-content">\
                <div class="fi-modal-body"></div>\
            </div>\
        </div>\
    </div>\
</div>';

Figure.lastSrollPosition = null;
Figure.overlayId = 0;
Figure.overlayQueue = [];

Figure.overlayQueueAdd = function (elementData) {

    Figure.overlayId++;

    if (!jQuery(elementData.element).length) {
        return;
    }

    if (!Figure.overlayQueue.length) {
        jQuery('body').addClass('fi-overlay-open');
        var scrollPosition = window.scrollY;
        Figure.lastSrollPosition = scrollPosition;
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.position = 'fixed';
    }

    elementData.id = Figure.overlayId;
    jQuery(elementData.element).attr('data-fi-overlay-id', Figure.overlayId);
    Figure.overlayQueue.push(elementData);

    Figure.hideTooltip();
    Figure.hideAllDropdownMenus();
    Figure.setBodyPaddingScroll();
    Figure.centerNotify();

    return Figure.overlayId;

};

Figure.overlayQueueRemove = function (elementData) {

    if (!jQuery(elementData.element).length && !elementData.id) {
        return;
    }

    var elementOverlayId;

    if (elementData.id) {
        elementOverlayId = parseInt(elementData.id);
    }
    else {
        elementOverlayId = parseInt(jQuery(elementData.element).attr('data-fi-overlay-id'));
    }

    var elementIndexInQueue;

    if (elementOverlayId) {
        for (var i = 0; i < Figure.overlayQueue.length; i++) {
            if (Figure.overlayQueue[i].id == elementOverlayId) {
                elementIndexInQueue = i;
            }
        }
    }
    else {
        return;
    }

    if (elementIndexInQueue > -1) {
        Figure.overlayQueue.splice(elementIndexInQueue, 1);
        jQuery(elementData.element).removeAttr('data-fi-overlay-id');
    }

    if (!Figure.overlayQueue.length) {
        var scrollPosition = Figure.lastSrollPosition;
        document.body.style.position = '';
        document.body.style.top = '';
        if (scrollPosition) {
            window.scrollTo(0, parseInt(scrollPosition || '0'));
        }
        Figure.lastSrollPosition = null;
        Figure.overlayId = 1;

        jQuery('body').removeClass('fi-overlay-open');
    }

    Figure.resetBodyPaddingScroll();
    Figure.centerNotify();
};

Figure.overlayQueueHideCheck = function () {

    if (Figure.overlayQueue.length) {
        var lastQueueObject = Figure.overlayQueue[Figure.overlayQueue.length-1];
        if (lastQueueObject.hideOnEsc && lastQueueObject.hideMethod) {
            lastQueueObject.hideMethod();
        }
    }

    // if (jQuery('body').hasClass('fi-modal-open')) {
    //     //IF NOT DIALOG OR CONFIRM
    //     if (jQuery('.fi-modal:visible').not('.fi-dialog-modal, .fi-confirm-modal').length) {
    //         //IF DIALOG
    //         if (jQuery('.fi-modal:visible').hasClass('fi-dialog-modal')) {
    //             jQuery('.fi-dialog-modal').removeClass('fi-modal-visible');
    //             setTimeout(function () {
    //                 jQuery('.fi-dialog-modal').remove();
    //
    //                 if (!jQuery('.fi-modal.fi-modal-open').length) {
    //                     jQuery('body').removeClass('fi-modal-open');
    //                     Figure.overlayQueueRemove();
    //
    //                 }
    //             }, 200);
    //
    //             var screenSize = Figure.getScreenSize();
    //             var largeScreen = screenSize == 'large' || screenSize == 'xlarge';
    //
    //             if (largeScreen) {
    //                 Figure.buttonFocusTimeout = setTimeout(function () {
    //                     jQuery('[data-fi-focus]').focus().removeAttr('data-fi-focus');
    //                 }, 250);
    //             }
    //         }
    //             //IF MODAL
    //         else {
    //             //Figure.modal(jQuery('.fi-modal:visible')).hide();
    //         }
    //     }
    // }
};

//DIALOG
Figure.dialog = function (options) {
    var element;
    var options = jQuery.extend({
        message: '',
        title: null,
        onHide: function () {

        },
        okText: 'Ok',
    }, options);
    var methods = {
        show: function () {

            var screenSize = Figure.getScreenSize();
            var largeScreen = screenSize == 'large' || screenSize == 'xlarge';

            clearTimeout(Figure.buttonFocusTimeout);
            if (!jQuery('[data-fi-focus]').length && largeScreen) {
                jQuery(document.activeElement).attr('data-fi-focus', '');
            }

            element = jQuery(Figure.modalTemplate);
            element.appendTo('body');

            if (jQuery('.fi-modal-visible').length) {
                element.addClass('fi-additional-modal');
            }

            Figure.overlayQueueAdd({
                element: element,
                hideOnEsc: true,
                hideMethod: function () { Figure.dialog(element).hide() },
            });

            if (options.title) {
                element.find('.fi-modal-body').before('<div class="fi-modal-header"><h3><strong>' + options.title + '</strong></h3></div>');
            }

            element.find('.fi-modal-body').append('<div>' + options.message + '</div>');
            element.find('.fi-modal-content').append('<div class="fi-modal-footer fi-buttons-container fi-text-right"><button class="fi-button fi-primary fi-close-dialog">' + options.okText + '</button></div>');
            element.addClass('fi-dialog-modal fi-modal-open');

            setTimeout(function () {
                element.addClass('fi-modal-visible');
                element.find('.fi-primary').focus();
            }, 10);

            element.find('.fi-close-dialog').on('click', function () {
                methods.hide(options.onHide);
            });

        },
        hide: function (onhide) {
            element.removeClass('fi-modal-visible');

            setTimeout(function () {

                Figure.overlayQueueRemove({
                    element: element,
                });

                element.remove();

                if (onhide) {
                    onhide();
                }

            }, 200);

            var screenSize = Figure.getScreenSize();
            var largeScreen = screenSize == 'large' || screenSize == 'xlarge';

            if (largeScreen) {
                Figure.buttonFocusTimeout = setTimeout(function () {
                    jQuery('[data-fi-focus]').focus().removeAttr('data-fi-focus');
                }, 250);
            }
        }
    };
    return methods.show();
};

//CONFIRM
Figure.confirm = function (options) {
    var element;
    var options = jQuery.extend({
        message: '',
        title: null,
        onConfirm: function () {

        },
        onCancel: function () {

        },
        okText: 'Ok',
        cancelText: 'Cancel',
    }, options);
    var methods = {
        show: function () {

            var screenSize = Figure.getScreenSize();
            var largeScreen = screenSize == 'large' || screenSize == 'xlarge';

            clearTimeout(Figure.buttonFocusTimeout);
            if (!jQuery('[data-fi-focus]').length && largeScreen) {
                jQuery(document.activeElement).attr('data-fi-focus', '');
            }

            element = jQuery(Figure.modalTemplate);
            element.appendTo('body');

            if (jQuery('.fi-modal-visible').length) {
                element.addClass('fi-additional-modal');
            }

            Figure.overlayQueueAdd({
                element: element,
                hideOnEsc: false,
            });

            if (options.title) {
                element.find('.fi-modal-body').before('<div class="fi-modal-header"><h3><strong>' + options.title + '</strong></h3></div>');
            }
            element.find('.fi-modal-body').append('<div>' + options.message + '</div>');
            element.find('.fi-modal-content').append('<div class="fi-modal-footer fi-buttons-container fi-text-right"><button class="fi-button fi-default fi-cancel-button">' + options.cancelText + '</button> <button class="fi-button fi-primary fi-confirm-button">' + options.okText + '</button></div>');
            element.addClass('fi-confirm-modal fi-modal-open');

            setTimeout(function () {
                element.addClass('fi-modal-visible');
                element.find('.fi-confirm-button').focus();
            }, 10);

            element.find('.fi-confirm-button').on('click', function () {
                methods.hide(options.onConfirm);
            });

            element.find('.fi-cancel-button').on('click', function () {
                methods.hide(options.onCancel);
            });

        },
        hide: function (onhide) {
            element.removeClass('fi-modal-visible');

            setTimeout(function () {

                Figure.overlayQueueRemove({
                    element: element,
                });

                element.remove();

                if (onhide) {
                    onhide();
                }

            }, 200);

            var screenSize = Figure.getScreenSize();
            var largeScreen = screenSize == 'large' || screenSize == 'xlarge';

            if (largeScreen) {
                Figure.buttonFocusTimeout = setTimeout(function () {
                    jQuery('[data-fi-focus]').focus().removeAttr('data-fi-focus');
                }, 250);
            }
        }
    };
    return methods.show();
};

jQuery(document).on('click', '.fi-modal .fi-close-modal', function () {
    if (!jQuery(this).is('.fi-dialog-modal, .fi-confirm-modal')) {
        var modal = jQuery(this);
        if (!jQuery(this).is('.fi-modal')) {
            modal = jQuery(this).closest('.fi-modal');
        }
        Figure.modal(modal).hide();
    }
});

//MODAL
Figure.modal = function (element, options) {
    var element = jQuery(element);
    if (!element.length) {
        return methods = {
            show: function () { },
            hide: function () { }
        };
    }
    var settings = jQuery.extend({
        title: null,
        position: 'top',
        size: 'default',
        fullHeight: false,
        hideOnEsc: true,
    }, options);
    var methods = {
        show: function () {

            var screenSize = Figure.getScreenSize();
            var largeScreen = screenSize == 'large' || screenSize == 'xlarge';

            clearTimeout(Figure.buttonFocusTimeout);
            if (!jQuery('[data-fi-focus]').length && largeScreen) {
                jQuery(document.activeElement).attr('data-fi-focus', '');
            }

            if (!element.find('.fi-modal-outer').length) {
                element.find('.fi-modal-content').wrap('<div class="fi-modal-outer"><div class="fi-modal-inner"></div></div>');
            }

            if (settings.size == 'large' || element.hasClass('fi-large')) {
                settings.size = 'large';
                element.addClass('fi-large');
            }

            if (settings.size == 'full-width' || element.hasClass('fi-full-width')) {
                settings.size = 'full-width';
                element.addClass('fi-full-width');
            }

            if (settings.position == 'center' || element.hasClass('fi-center')) {
                settings.position = 'center';
                element.addClass('fi-center');
            }

            if (settings.position == 'left' || element.hasClass('fi-left')) {
                settings.position = 'left';
                element.addClass('fi-left');
            }

            if (settings.position == 'right' || element.hasClass('fi-right')) {
                settings.position = 'right';
                element.addClass('fi-right');
            }

            if (settings.title != null) {
                if (!element.find('.fi-modal-header').length) {
                    element.find('.fi-modal-content').prepend('<div class="fi-modal-header"><button class="fi-close-button"></button> <h3 class="fi-modal-title"></h3></div>');
                }
                else if (!element.find('.fi-modal-title').length) {
                    element.find('.fi-modal-header').append('<h3 class="fi-modal-title"></h3>');
                }
                element.find('.fi-modal-title').html(settings.title);
            }

            if (settings.fullHeight == true || element.hasClass('fi-full-height')) {
                settings.fullHeight = true;
                element.addClass('fi-full-height');
            }

            if (settings.position == 'left' || settings.position == 'right') {
                settings.fullHeight = false;
                element.removeClass('fi-full-height');
            }

            if (jQuery('.fi-modal-visible').length) {
                element.addClass('fi-additional-modal');
            }

            Figure.overlayQueueAdd({
                element: element,
                hideOnEsc: settings.hideOnEsc,
                hideMethod: function () { Figure.modal(element).hide() },
            });

            element.addClass('fi-modal-open');

            element.trigger('fi-modal:show');

            setTimeout(function () {
                element.addClass('fi-modal-visible');

                setTimeout(function () {
                    element.trigger('fi-modal:shown');
                }, 10);
            }, 10);

        },
        hide: function () {

            var confirm_before_close = element.attr('data-fi-confirm-before-close');

            if (confirm_before_close) {
                var confirm_before_close = eval('(' + confirm_before_close + ')');
                Figure.confirm({
                    message: confirm_before_close.message || "Are you sure you want to close this?",
                    title: confirm_before_close.title || "Confirmation",
                    onConfirm: function () {
                        methods.hideFunction();
                    },
                    onCancel: function () {

                    },
                    okText: confirm_before_close.okText || "Yes",
                    cancelText: confirm_before_close.cancelText || "Cancel",
                });
            }
            else {
                methods.hideFunction();
            }
        },
        hideFunction: function () {
            element.removeClass('fi-modal-visible');

            element.removeClass('fi-additional-modal');

            element.trigger('fi-modal:hide');

            setTimeout(function () {

                element.removeClass('fi-modal-open');
                element.find('.fi-modal-body').css({ height: '' });

                Figure.overlayQueueRemove({
                    element: element,
                });

                element.trigger('fi-modal:hidden');

            }, 200);

            var screenSize = Figure.getScreenSize();
            var largeScreen = screenSize == 'large' || screenSize == 'xlarge';

            if (largeScreen) {
                Figure.buttonFocusTimeout = setTimeout(function () {
                    jQuery('[data-fi-focus]').focus().removeAttr('data-fi-focus');
                }, 250);
            }
        }
    }

    return methods;
};

jQuery(document).on('fi-modal:shown', '.fi-modal', function () {
    jQuery(this).find('[data-fi-focus-start]').focus();
});

jQuery(document).on('keydown', function (e) {
    var contentEditable =  jQuery(document.activeElement).is('[contenteditable="true"]');
    if (e.which === 9 && jQuery('.fi-modal.fi-modal-visible, .fi-dropdown.fi-mobile-dropdown-active').length && !contentEditable) {
        var inputs = jQuery('.fi-modal.fi-modal-visible, .fi-dropdown.fi-mobile-dropdown-active').find('select, input, textarea, button, a, [tabindex="0"]').filter(':visible');
        if (!inputs.is(':focus')) {
            e.preventDefault();
            if (!e.shiftKey) {
                inputs.first().focus();
            }
            else {
                inputs.last().focus();
            }
        }
    }
});

jQuery(document).on('keydown', '.fi-modal, .fi-mobile-dropdown-overlay', function (e) {
    var contentEditable =  jQuery(document.activeElement).is('[contenteditable="true"]');
    var inputs = jQuery(this).find('select, input, textarea, button, a, [tabindex="0"]').filter(':visible');
    if (jQuery(':focus').is(inputs.last()) && !contentEditable) {
        if ((e.which === 9 && !e.shiftKey)) {
            e.preventDefault();
            inputs.first().focus();
        }
    }
    else if (jQuery(':focus').is(inputs.first()) && !contentEditable) {
        if ((e.which === 9 && e.shiftKey)) {
            e.preventDefault();
            inputs.last().focus();
        }
    }
});

Figure.centerNotify = function () {
    // jQuery('.fi-notify-wrapper.fi-top, .fi-notify-wrapper.fi-bottom').each(function () {
    //     var notifyWrapper = jQuery(this);
    //     var notifyWrapperWidth = notifyWrapper.outerWidth();
    //
    //     if (jQuery('body').hasClass('fi-overlay-open')) {
    //         if (Figure.rtl) {
    //             notifyWrapper.css('margin-right', -notifyWrapperWidth / 2 - Figure.getScrollbar().width / 2);
    //         }
    //         else {
    //             notifyWrapper.css('margin-left', -notifyWrapperWidth / 2 - Figure.getScrollbar().width / 2);
    //         }
    //     }
    //
    //     else {
    //         if (Figure.rtl) {
    //             notifyWrapper.css('margin-right', notifyWrapperWidth / 2);
    //         }
    //         else {
    //             notifyWrapper.css('margin-left', -notifyWrapperWidth / 2);
    //         }
    //     }
    // });
    //
    // jQuery('.fi-notify-wrapper.fi-top-left, .fi-notify-wrapper.fi-bottom-left').each(function () {
    //     var notifyWrapper = jQuery(this);
    //     if (jQuery('body').hasClass('fi-overlay-open')) {
    //         if (Figure.rtl) {
    //             notifyWrapper.css('margin-right', Figure.getScrollbar().width);
    //         }
    //     }
    //     else {
    //         notifyWrapper.css('margin-right', '');
    //     }
    // });
    // jQuery('.fi-notify-wrapper.fi-top-right, .fi-notify-wrapper.fi-bottom-right').each(function () {
    //     var notifyWrapper = jQuery(this);
    //     if (jQuery('body').hasClass('fi-overlay-open')) {
    //         if (!Figure.rtl) {
    //             notifyWrapper.css('margin-right', Figure.getScrollbar().width);
    //         }
    //     }
    //     else {
    //         notifyWrapper.css('margin-right', '');
    //     }
    // });
};

Figure.showNotify = function (element, position) {
    var notifyHeight = jQuery(element).outerHeight();
    var notifyMarginBottom = parseInt(jQuery(element).css('margin-bottom'), 10);

    var notifyWrapper = jQuery(element).closest('.fi-notify-wrapper');

    if (notifyWrapper.hasClass('fi-bottom') || notifyWrapper.hasClass('fi-bottom-left') || notifyWrapper.hasClass('fi-bottom-right')) {
        jQuery(element).css({ marginBottom: -notifyHeight, position: '', visibility: 'visible' });
        jQuery(element).show().animate({ marginBottom: notifyMarginBottom, opacity: 1 }, 200);
    }
    else {
        jQuery(element).css({ marginTop: -notifyHeight - notifyMarginBottom, position: '', visibility: 'visible' });
        jQuery(element).show().animate({ marginTop: 0, opacity: 1 }, 200);
    }

    Figure.centerNotify();
};

Figure.hideNotify = function (element) {
    if (!jQuery(element).length) {
        return;
    }
    var notifyHeight = jQuery(element).outerHeight();
    var notifyMarginBottom = parseInt(jQuery(element).css('margin-bottom'), 10);
    var notifyWrapper = jQuery(element).closest('.fi-notify-wrapper');
    if (notifyWrapper.hasClass('fi-bottom') || notifyWrapper.hasClass('fi-bottom-left') || notifyWrapper.hasClass('fi-bottom-right')) {
        jQuery(element).animate({ marginBottom: -notifyHeight, opacity: 0 }, 250, function () {
            jQuery(element).remove();
            if (notifyWrapper.find('.fi-notify').length == 0) {
                notifyWrapper.remove();
            }
        });
    }
    else {
        jQuery(element).animate({ marginTop: -notifyHeight - notifyMarginBottom, opacity: 0 }, 250, function () {
            jQuery(element).remove();
            if (notifyWrapper.find('.fi-notify').length == 0) {
                notifyWrapper.remove();
            }
        });
    }
};

Figure.notifyIndex = 0;

Figure.notify = function (message, options) {

    var settings = jQuery.extend({
        state: 'default',
        position: 'top',
        autoHide: true,
        timeout: 5000,
        class: '',
    }, options);

    var notifyTimer;

    if (jQuery('.fi-notify-wrapper.fi-' + settings.position).length == 0) {
        jQuery('body').append('<div class="fi-notify-wrapper fi-' + settings.position + '"></div>');
        var notifyWrapper = jQuery('.fi-notify-wrapper.fi-' + settings.position);
        if (settings.position == 'top' || settings.position == 'top-left' || settings.position == 'top-right') {
            notifyWrapper.prepend('<div class="fi-notify fi-' + settings.state + ' ' + settings.class + '" data-fi-notifyid="' + Figure.notifyIndex + '" style="position: absolute; visibility: hidden; opacity: 0;"><button class="fi-close-button"></button>' + message + '</div>');
        }
        else {
            notifyWrapper.append('<div class="fi-notify fi-' + settings.state + ' ' + settings.class + '" data-fi-notifyid="' + Figure.notifyIndex + '" style="position: absolute; visibility: hidden; opacity: 0;"><button class="fi-close-button"></button>' + message + '</div>');
        }
    }

    else {
        var notifyWrapper = jQuery('.fi-notify-wrapper.fi-' + settings.position);
        if (notifyWrapper.hasClass('fi-top') || notifyWrapper.hasClass('fi-top-left') || notifyWrapper.hasClass('fi-top-right')) {
            notifyWrapper.prepend('<div class="fi-notify fi-' + settings.state + ' ' + settings.class + '" data-fi-notifyid="' + Figure.notifyIndex + '" style="position: absolute; visibility: hidden; opacity: 0;"><button class="fi-close-button"></button>' + message + '</div>');
        }
        else {
            notifyWrapper.append('<div class="fi-notify fi-' + settings.state + ' ' + settings.class + '" data-fi-notifyid="' + Figure.notifyIndex + '" style="position: absolute; visibility: hidden; opacity: 0;"><button class="fi-close-button"></button>' + message + '</div>');
        }
    }

    Figure.showNotify('.fi-notify-wrapper .fi-notify[data-fi-notifyid="' + Figure.notifyIndex + '"]', settings.position);

    var cachedIndex = Figure.notifyIndex;

    function autoHideNotify() {
        notifyTimer = setTimeout(function () {
            Figure.hideNotify('.fi-notify-wrapper .fi-notify[data-fi-notifyid="' + cachedIndex + '"]');
        }, settings.timeout);
    }

    if (settings.autoHide == true) {
        autoHideNotify();
        jQuery('.fi-notify-wrapper .fi-notify[data-fi-notifyid="' + cachedIndex + '"]').hover(function () {
            clearTimeout(notifyTimer);
        },
        function () {
            autoHideNotify();
        });
    }

    Figure.notifyIndex++;
};

Figure.accordion = function () {
    jQuery('.fi-accordion, .fi-nav-accordion').not('.fi-handled, pre *').each(function () {

        var thisAccordion = jQuery(this);
        var firstAccordionItem = thisAccordion.children('ul').children('li:first-child');
        var allAccordionTriggers = '.fi-accordion-trigger, li.fi-has-child > a, li.fi-has-child > span';
        var allAccordionContents = '.fi-accordion-content, li.fi-has-child > ul';

        var stateAttr = thisAccordion.attr('data-fi-state');

        if (stateAttr == undefined) {
            if (thisAccordion.is('.fi-nav-accordion')) {
                stateAttr = ('close');
            }
            else {
                stateAttr = ('default');
            }
        }

        if (stateAttr == 'default') {
            if (thisAccordion.is('.fi-accordion')) {
                firstAccordionItem.closest('li').addClass('fi-child-open').children('.fi-accordion-content').show();
            }
            else if (thisAccordion.is('.fi-nav-accordion')) {
                if (firstAccordionItem.closest('li').hasClass('fi-has-child')) {
                    firstAccordionItem.closest('li').addClass('fi-child-open').children('ul').show();
                }
            }
        }

        else if (stateAttr == 'open') {
            thisAccordion.find(allAccordionTriggers).closest('li').addClass('fi-child-open');
            thisAccordion.find(allAccordionContents).show();
        }

        else if (stateAttr == 'close') {
            thisAccordion.find(allAccordionContents).hide();
        }

        thisAccordion.addClass('fi-handled');

    });
};

Figure.showTooltipTimeout;
Figure.hideTooltipTimeout;

if (!Figure.tap) {
    jQuery(document).on('mouseenter', '[data-fi-tooltip]', function (e) {
        var element = jQuery(this);
        var delayIn = element.attr('data-fi-delay');
        if (!Figure.mousedown) {
            if (delayIn != undefined) {
                Figure.showTooltipTimeout = setTimeout(function () {
                    Figure.showTooltip(element);
                }, parseInt(delayIn, 10));
            }
            else {
                Figure.showTooltip(element);
            }
        }
    });
}

Figure.hideTooltip = function (element) {

    if (element == undefined) {
        element = '[data-fi-tooltip]';
    }

    var element = jQuery(element);
    if (!element.length) {
        return;
    }

    //TOOLTIP HIDE CALLBACK
    element.trigger('fi-tooltip:hide');

    jQuery('body > .fi-tooltip').removeClass('fi-tooltip-visible');

    element.removeClass('fi-tooltip-visible');

    var css_class = element.attr('data-fi-class');

    if (css_class) {
        jQuery('body > .fi-tooltip').removeClass(css_class);
    }

    Figure.hideTooltipTimeout = setTimeout(function () {

        jQuery('body > .fi-tooltip').removeClass('fi-tooltip-active');

        element.removeClass('fi-tooltip-active');

        jQuery('body > .fi-tooltip').remove();

        //TOOLTIP HIDDEN CALLBACK
        element.trigger('fi-tooltip:hidden');

    }, 150);

};

jQuery(document).on('mouseleave', '[data-fi-tooltip]', function () {
    var element = jQuery(this);
    clearTimeout(Figure.showTooltipTimeout);
    Figure.hideTooltip(element);
});

jQuery(document).on('mouseover', '.fi-tooltip', function () {
    //Figure.hideTooltip();
    //clearTimeout(Figure.showTooltipTimeout);
});

Figure.showTooltip = function (element) {

    var element = jQuery(element);
    if (!element.length) {
        return;
    }

    if (!element.is('.fi-dropdown-open .fi-dropdown-trigger, .fi-tooltip-active, [data-fi-focus]')) {

        clearTimeout(Figure.hideTooltipTimeout);

        jQuery('.fi-tooltip-active').not(element).removeClass(' fi-tooltip-active fi-tooltip-visible');

        element.addClass('fi-tooltip-active');

        //TOOLTIP SHOW CALLBACK
        element.trigger('fi-tooltip:show');

        //clearTimeout(Figure.hideTooltipTimeout);

        //jQuery('body > .fi-tooltip').remove();
        if (jQuery('body > .fi-tooltip').length == 0) {
            jQuery('body').append('<div class="fi-tooltip" role="tooltip" style="display: none;"><div></div><span></span></div>');
        }

        if (jQuery(this).attr('title') != undefined) {
            jQuery(this).attr('title', '');
        }

        var tooltip = jQuery('body > .fi-tooltip');
        var arrow = tooltip.children('span');

        var css_class = element.attr('data-fi-class') || '';
        if (css_class) {
            tooltip.addClass(css_class);
        }

        var tooltipText;
        var tooltipPos;
        var tooltipOffset;

        var thisWidth;
        var thisHalfWidth;
        var thisHeight;
        var thisHalfHeight;

        var thisOffsetTop;
        var thisOffsetLeft;

        var tooltipWidth;
        var tooltipHalfWidth;
        var tooltipHeight;
        var tooltipHalfHeight;

        var arrowWidth;
        var arrowHalfWidth;
        var arrowHeight;

        var topCalc;
        var topCenterCalc;
        var bottomCalc;
        var centerCalc;
        var leftCalc;
        var rightCalc;

        var windowWidth = Figure.getWindowWidth();
        var windowHeight = Figure.getWindowHeight();

        function positionTooltip() {
            tooltipText = jQuery.trim(element.attr('data-fi-tooltip'));
            tooltipPos = element.attr('data-fi-position') || 'top';
            tooltipOffset = element.attr('data-fi-offset');

            if (tooltipOffset == undefined) {
                tooltipOffset = 0;
            }
            else {
                tooltipOffset = parseInt(tooltipOffset, 10);
            }

            tooltip.children('div').html(tooltipText);
            tooltip.removeClass('fi-north fi-south fi-east fi-west').show();

            thisWidth = element.outerWidth();
            thisHalfWidth = thisWidth / 2;
            thisHeight = element.outerHeight();
            thisHalfHeight = thisHeight / 2;

            thisOffsetTop = element.offset().top;
            thisOffsetLeft = element.offset().left;

            tooltipWidth = tooltip.outerWidth();
            tooltipHalfWidth = tooltipWidth / 2;
            tooltipHeight = tooltip.outerHeight();
            tooltipHalfHeight = tooltipHeight / 2;

            arrowWidth = arrow.outerWidth();
            arrowHalfWidth = arrowWidth / 2;
            arrowHeight = arrow.outerHeight() / 2;
            arrowCenterCalc = thisHalfWidth - arrowHalfWidth - 1;

            if (arrowCenterCalc > arrowWidth) {
                arrowCenterCalc = arrowWidth;
            }

            else if (arrowCenterCalc < arrowHalfWidth / 2) {
                arrowCenterCalc = arrowHalfWidth / 2;
            }

            topCalc = thisOffsetTop - (tooltipHeight + arrowHeight + tooltipOffset);
            if (Figure.lastSrollPosition) {
                topCalc += Figure.lastSrollPosition;
            }
            topCenterCalc = thisOffsetTop + thisHalfHeight - tooltipHalfHeight;
            bottomCalc = thisOffsetTop + thisHeight + arrowHeight + tooltipOffset;
            centerCalc = thisOffsetLeft + thisHalfWidth - tooltipHalfWidth;
            leftCalc = thisOffsetLeft - tooltipWidth - arrowHalfWidth - tooltipOffset;
            rightCalc = thisOffsetLeft - (tooltipWidth - thisWidth);

            function tooltipTopLeft() {
                tooltip.addClass('fi-north');
                tooltip.css({
                    top: topCalc,
                    left: thisOffsetLeft,
                    right: 'auto',
                    bottom: 'auto',
                    marginLeft: 0,
                    marginRight: 0
                });
                arrow.css({
                    top: 'auto',
                    bottom: -arrowHeight,
                    left: arrowCenterCalc,
                    right: 'auto',
                    marginLeft: 0,
                    marginRight: 0
                });
            }

            function tooltipTopRight() {
                tooltip.addClass('fi-north');
                tooltip.css({
                    top: topCalc,
                    left: rightCalc,
                    right: 'auto',
                    bottom: 'auto',
                    marginLeft: 0,
                    marginRight: 0
                });
                arrow.css({
                    top: 'auto',
                    bottom: -arrowHeight,
                    left: 'auto',
                    right: arrowCenterCalc,
                    marginLeft: 0,
                    marginRight: 0
                });
            }

            function tooltipTop() {
                tooltip.addClass('fi-north');
                tooltip.css({
                    top: topCalc,
                    left: centerCalc,
                    right: 'auto',
                    bottom: 'auto',
                    marginLeft: 0,
                    marginRight: 0
                });
                arrow.css({
                    top: 'auto',
                    bottom: -arrowHeight,
                    left: tooltipHalfWidth - arrowHalfWidth,
                    right: 'auto',
                    marginLeft: 0,
                    marginRight: 0
                });
            }

            function tooltipBottomLeft() {
                tooltip.addClass('fi-south');
                tooltip.css({
                    top: bottomCalc,
                    left: thisOffsetLeft,
                    right: 'auto',
                    bottom: 'auto',
                    marginLeft: 0,
                    marginRight: 0
                });
                arrow.css({
                    top: -arrowHeight,
                    bottom: 'auto',
                    left: arrowCenterCalc,
                    right: 'auto',
                    marginLeft: 0,
                    marginRight: 0
                });
            }

            function tooltipBottomRight() {
                tooltip.addClass('fi-south');
                tooltip.css({
                    top: bottomCalc,
                    left: rightCalc,
                    right: 'auto',
                    bottom: 'auto',
                    marginLeft: 0,
                    marginRight: 0
                });
                arrow.css({
                    top: -arrowHeight,
                    bottom: 'auto',
                    left: 'auto',
                    right: arrowCenterCalc,
                    marginLeft: 0,
                    marginRight: 0
                });
            }

            function tooltipBottom() {
                tooltip.addClass('fi-south');
                tooltip.css({
                    top: bottomCalc,
                    left: centerCalc,
                    right: 'auto',
                    bottom: 'auto',
                    marginLeft: 0,
                    marginRight: 0
                });
                arrow.css({
                    top: -arrowHeight,
                    bottom: 'auto',
                    left: tooltipHalfWidth - arrowHalfWidth,
                    right: 'auto',
                    marginLeft: 0,
                    marginRight: 0
                });
            }

            function tooltipLeft() {
                tooltip.addClass('fi-west');
                tooltip.css({
                    top: topCenterCalc,
                    left: leftCalc,
                    right: 'auto',
                    bottom: 'auto',
                    marginLeft: 0,
                    marginRight: 0
                });
                arrow.css({
                    top: tooltipHalfHeight - arrowHeight,
                    bottom: 'auto',
                    left: 'auto',
                    right: -arrowHalfWidth,
                    marginLeft: 0,
                    marginRight: 0
                });
            }

            function tooltipRight() {
                tooltip.addClass('fi-east');
                tooltip.css({
                    top: topCenterCalc,
                    left: thisOffsetLeft + thisWidth + arrowHalfWidth + tooltipOffset,
                    right: 'auto',
                    bottom: 'auto',
                    marginLeft: 0,
                    marginRight: 0
                });
                arrow.css({
                    top: tooltipHalfHeight - arrowHeight,
                    bottom: 'auto',
                    left: -arrowHalfWidth,
                    right: 'auto',
                    marginLeft: 0,
                    marginRight: 0
                });
            }

            if (tooltipPos == 'top') {
                if (topCalc < 0 && centerCalc < 0) {
                    tooltipBottomLeft();
                }
                else if (topCalc > 0 && centerCalc < 0) {
                    tooltipTopLeft();
                }
                else if (topCalc > 0 && centerCalc + tooltipWidth > windowWidth ) {
                    tooltipTopRight();
                }
                else {
                    tooltipTop();
                }
            }

            else if (tooltipPos == 'top-left') {
                if (Figure.rtl) {
                    tooltipTopRight();
                }
                else {
                    tooltipTopLeft();
                }
            }

            else if (tooltipPos == 'top-right') {
                if (Figure.rtl) {
                    tooltipTopLeft();
                }
                else {
                    tooltipTopRight();
                }
            }

            else if (tooltipPos == 'bottom') {
                tooltipBottom();
            }

            else if (tooltipPos == 'bottom-left') {
                if (Figure.rtl) {
                    tooltipBottomRight();
                }
                else {
                    tooltipBottomLeft();
                }
            }

            else if (tooltipPos == 'bottom-right') {
                if (Figure.rtl) {
                    tooltipBottomLeft();
                }
                else {
                    tooltipBottomRight();
                }
            }

            else if (tooltipPos == 'left') {
                if (Figure.rtl) {
                    tooltipRight();
                }
                else {
                    tooltipLeft();
                }
            }

            else if (tooltipPos == 'right') {
                if (Figure.rtl) {
                    tooltipLeft();
                }
                else {
                    tooltipRight();
                }
            }

            else {
                tooltipTop();
            }

            element.addClass('fi-tooltip-visible');

            tooltip.addClass('fi-tooltip-visible');

            //TOOLTIP SHOWN CALLBACK
            element.trigger('fi-tooltip:shown');
        }

        positionTooltip();
    }
};

function scrollToChecked(target, threshhold, timeout) {
    setTimeout(function () {
        var targetOffset = target.offset().top - threshhold;
        var bodyContentHeight = jQuery('body')[0].scrollHeight;
        var windowHeight = window.innerHeight;
        if (targetOffset > (bodyContentHeight - windowHeight)) {
            targetOffset = bodyContentHeight - windowHeight;
        }
        jQuery('html, body').animate({ scrollTop: targetOffset }, 200, function () {
            jQuery('html, body').unbind('mousewheel DOMMouseScroll');
        });
        jQuery('html, body').bind('mousewheel DOMMouseScroll', function (e) {
            e.preventDefault();
        });
    }, timeout);
}

function scrollToElement(target, threshhold, timeout, allowIfAfter) {
    var targetOffset = target.offset().top - threshhold;
    var windowScrollTop = jQuery(window).scrollTop();

    if (allowIfAfter == undefined) {
        allowIfAfter == true;
    }

    if (targetOffset > windowScrollTop) {
        scrollToChecked(target, threshhold, timeout);
    }
    else if (targetOffset < windowScrollTop && allowIfAfter == true) {
        scrollToChecked(target, threshhold, timeout);
    }
}

// Figure.autoSizeTextarea = function(element) {
//     var offset = element.offsetHeight - element.clientHeight;
//     jQuery(element).css('height', 'auto').css('height', element.scrollHeight + offset);
// }

// jQuery(document).on('keyup input', 'textarea.fi-auto-resize', function () {
//     Figure.autoSizeTextarea(this);
// });

Figure.processNewContent = function (pageload) {

    //MATCH HEIGHTS OF ELEMENTS UNDER [data-fi-match-heights] ATTRIBUTE
    Figure.matchHeights();

    //ADD NAV ROOT & AND HAS-CHILD CLASSES
    jQuery('.fi-nav, .fi-nav-bar').each(function () {
        var nav = jQuery(this);
        if (!nav.find('.fi-root').length) {
            nav.find('ul:first').addClass('fi-root');
        }
        else if (!nav.find('.fi-root').is('ul:first')) {
            nav.find('.fi-root').removeClass('fi-root');
            nav.find('ul:first').addClass('fi-root');
        }
    });
    jQuery('.fi-nav-accordion li, .fi-nav-bar li').each(function () {
        var navLi = jQuery(this);
        if (navLi.children('ul').length > 0) {
            navLi.addClass('fi-has-child');
        }
        else {
            navLi.removeClass('fi-has-child');
        }
    });

    //ACCORDION
    Figure.accordion();

    //TRUNCATE
    if (typeof FigureTruncate == 'function' && !pageload) {
        FigureTruncate(jQuery('.truncate'));
    }

    //HIDE COUNTS IF ZERO
    Figure.checkZeroCounts();

    //CHECK STICKY ELEMENTS
    Figure.checkSticky();

    //CUSTOM DROPDOWNS
    jQuery('select.fi-custom-dropdown').not('.fi-handled, pre *').each(function () {
        var thisSelect = jQuery(this);
        var thisItems = jQuery(this).find('option');

        //BUILD CUSTOM DROPDOWN
        thisSelect.after('<div class="fi-dropdown fi-custom-dropdown fi-highlight-selected">\
            <button class="fi-button fi-default fi-dropdown-trigger">\
                <span class="fi-dropdown-title"></span>\
                <i class="fa fa-caret-down"></i>\
            </button>\
            <div class="fi-dropdown-content">\
                <ul>\
                </ul>\
            </div>\
        </div>');

        var customDropdown = thisSelect.next('.fi-dropdown');
        var selectedItemTitle = thisSelect.find('option:selected').text();

        //ADD FIRST ITEM TITLE
        customDropdown.find('.fi-dropdown-title').text(selectedItemTitle);

        //BUILD CUSTOM DROPDOWN ITEMS
        thisItems.each(function () {
            var thisItemText = jQuery(this).text();
            customDropdown.find('.fi-dropdown-content > ul').append('<li><a href="#">' + thisItemText + '</a></li>');
        });

        thisSelect.addClass('fi-handled');
    });

    Figure.updateCustomDropdowns();

    //ADD TABINDEX TO ELEMENTS
    jQuery('.fi-nav-bar li.fi-has-child > span, .fi-nav-accordion li.fi-has-child > span, .fi-accordion .fi-accordion-trigger, .fi-tabs .fi-tab-button, [data-fi-tooltip]').not('pre *, a, button, input').attr('tabindex', '0');

    //TABS
    jQuery('.fi-tabs').not('.fi-handled, pre *').each(function () {

        var activeTabsCount = jQuery(this).find('.fi-tab-active').length;

        if (activeTabsCount == 0 || activeTabsCount > 1) {

            var firstTab = jQuery(this).children('ul').children('li:first');
            var firstTarget = jQuery(firstTab.attr('data-fi-tab'));

            firstTab.addClass('fi-tab-active').siblings().removeClass('fi-tab-active');

            firstTarget.addClass('fi-tab-active').siblings('.fi-tab-content').removeClass('fi-tab-active');
        }

        else {
            var activeTab = jQuery(this).children('ul').children('li.fi-tab-active');
            var activeTarget = jQuery(activeTab.attr('data-fi-tab'));

            activeTarget.addClass('fi-tab-active');
        }

        jQuery(this).addClass('fi-handled');

    });

    jQuery('.fi-dropdown.fi-highlight-selected').not('.fi-handled, pre *').each(function () {
        if (jQuery(this).find('.fi-dropdown-content li.fi-dropdown-active').length == 0) {
            jQuery(this).find('.fi-dropdown-content li:first').addClass('fi-dropdown-active');
        }
        var selectedItemTitle = jQuery(this).find('li.fi-dropdown-active > *').html();
        var selectedItem = jQuery(this).find('.fi-dropdown-content li.fi-dropdown-active');
        selectedItem.addClass('fi-dropdown-active').siblings('li').removeClass('fi-dropdown-active');
        jQuery(this).find('.fi-dropdown-title').html(selectedItemTitle);
        jQuery(this).addClass('fi-handled');
    });

    //CONFIRMATION MODALS
    jQuery('[data-fi-confirm]').not('.fi-handled, pre *').each(function () {
        var action = jQuery(this).attr('onclick');
        jQuery(this).attr('onclick', 'return false;').attr('data-fi-onclick', action);
        jQuery(this).addClass('fi-handled');
    });

    //PROCESS POLL RESULTS IF VISIBLE
    jQuery('.fi-poll.fi-show-results').not('.fi-handled, pre *').each(function () {
        Figure.showPollResults(jQuery(this));
        jQuery(this).addClass('fi-handled');
    });

};

Figure.hideOtherPagesElements = function () {
    if (Figure.spApps) {
        if (jQuery('html').hasClass('fi-parent-page')) {
            Figure.messageToChildren('Figure.hideOtherPagesElements');
        }
        else if (jQuery('html').hasClass('fi-child-page')) {
            Figure.messageToParent('Figure.hideOtherPagesElements');
        }
    }
};

Figure.hideAllDropdownMenus = function () {
    if (jQuery('.fi-dropdown.fi-dropdown-open').length) {
        Figure.toggleDropdown(jQuery('.fi-dropdown-open').not('.fi-mobile-dropdown-active'));
    }
};

Figure.updateCustomDropdowns =  function () {
    jQuery('div.fi-custom-dropdown').each(function () {
        var dropdown = jQuery(this);
        var selectItems = dropdown.prev('select.fi-custom-dropdown').find('option');
        dropdown.find('.fi-dropdown-content > ul').empty();
        selectItems.each(function () {
            var thisItemText = jQuery(this).text();
            dropdown.find('.fi-dropdown-content > ul').append('<li><a href="#">' + thisItemText + '</a></li>');
        });
    });
};

Figure.showPollResults = function (poll) {
    if (poll == undefined) {
        poll = '.fi-poll';
    }
    var poll = jQuery(poll).not('.fi-results-open');
    var pollAnswers = poll.find('.fi-poll-answers');
    var pollResults = poll.find('.fi-poll-results');

    var pollTotalVotes = 0;

    pollResults.find('.fi-progress').each(function () {
        var resultWrapper = jQuery(this);
        var count = resultWrapper.attr('data-fi-count');
        pollTotalVotes += parseFloat(count);
    });

    poll.find('.fi-total-votes').text(pollTotalVotes);

    pollAnswers.hide();
    pollResults.show();

    poll.addClass('fi-results-open');

    pollResults.find('.fi-progress').each(function () {

        var resultWrapper = jQuery(this);
        var count = parseFloat(resultWrapper.attr('data-fi-count'));
        var countPercentage = count / pollTotalVotes * 100;
        var result = Math.round(countPercentage * 10) / 10 + '%';

        resultWrapper.append('<div class="fi-progress-bar fi-percent-bar">' + result + '</div><div class="fi-progress-bar fi-count-bar"></div>');

        if (count == 0) {
            resultWrapper.find('.fi-count-bar').hide();
        }

        setTimeout(function () {
            resultWrapper.find('.fi-count-bar').css({
                width: result
            });
        }, 10);

        resultWrapper.css('visibility', 'visible').addClass('fi-handled');

        setTimeout(function () {
            resultWrapper.find('.fi-count-bar').text(count);
        }, 500);

    });
};

Figure.hidePollResults = function (poll) {
    if (poll == undefined) {
        poll = '.fi-poll';
    }
    var poll = jQuery(poll);
    if (poll.hasClass('fi-results-open')) {
        var pollAnswers = poll.find('.fi-poll-answers');
        var pollResults = poll.find('.fi-poll-results');

        pollAnswers.show();
        pollResults.hide().find('.fi-progress').html('').css({ visibility: '' });
        poll.find('.fi-total-votes').text('');

        poll.removeClass('fi-results-open');
    }
};

Figure.showMobileDropdown = function (dropdown, dropdownContent) {

    dropdown.addClass('fi-mobile-dropdown-active');

    Figure.overlayQueueAdd({
        element: dropdown,
        hideOnEsc: true,
        hideMethod: function () { Figure.hideMobileDropdown(dropdown) },
    });

    dropdownContent.wrap('<div class="fi-mobile-dropdown-overlay"></div>');

    var dropdownOverlay = dropdown.children('.fi-mobile-dropdown-overlay');

    if (dropdown.hasClass('fi-highlight-selected') || dropdown.hasClass('fi-custom-dropdown')) {
        var dropdownTitle = dropdown.attr('data-fi-dropdown-title');
        if (dropdownTitle != undefined) {
            dropdownContent.prepend('<div class="fi-dropdown-header fi-mobile-dropdown-only"><button class="fi-close-button"></button><div class="fi-dropdown-title">' + dropdownTitle + '</div></div>');
        }
    }

    else {
        var dropdownTitle = dropdown.attr('data-fi-dropdown-title');
        if (dropdownTitle != undefined) {
            dropdownContent.prepend('<div class="fi-dropdown-header fi-mobile-dropdown-only"><button class="fi-close-button"></button><div class="fi-dropdown-title">' + dropdownTitle + '</div></div>');
        }
        else {
            var dropdownTitleHtml = dropdown.find('.fi-dropdown-title').html();
            if (dropdownTitleHtml != undefined && dropdownTitleHtml.length && !dropdown.find('.fi-dropdown-header').length) {
                dropdownContent.prepend('<div class="fi-dropdown-header fi-mobile-dropdown-only"><button class="fi-close-button"></button><div class="fi-dropdown-title">' + dropdownTitleHtml + '</div></div>');
            }
        }
    }

    if (!dropdownContent.find('.fi-dropdown-header .fi-close-button').length) {
        dropdownContent.find('.fi-dropdown-header').prepend('<button class="fi-close-button fi-mobile-dropdown-only"></button>');
    }

    if (!dropdownOverlay.is('body > *')) {
        jQuery('body').append(dropdownOverlay);
        dropdownOverlay.addClass('fi-active');
    }

    setTimeout(function () {
        dropdownOverlay.addClass('fi-visible');
    }, 10);

};

Figure.hideMobileDropdown = function (dropdown) {

    var dropdownContent = jQuery('.fi-dropdown-content[data-fi-dropdown-id="' + dropdown.attr('data-fi-dropdown-id') + '"]');

    dropdownContent.closest('.fi-mobile-dropdown-overlay').removeClass('fi-visible');

    setTimeout(function () {

        dropdownContent.closest('.fi-mobile-dropdown-overlay').removeClass('fi-active');

        dropdown.removeClass('fi-dropdown-open');

        dropdownContent.unwrap().find('.fi-mobile-dropdown-only').remove();
        dropdownContent.find('.fi-dropdown-body').css({ height: '' });

        dropdown.append(dropdownContent);

        dropdown.removeClass('fi-mobile-dropdown-active');

        Figure.overlayQueueRemove({
            element: dropdown,
        });

    }, 200);

};

Figure.positionDropdown = function () {
    jQuery('.fi-dropdown.fi-dropdown-open').each(function () {

        var dropdown = jQuery(this);
        var thisMobileAttr = dropdown.attr('data-fi-mobile-dropdown');

        var screenSize = Figure.getScreenSize();
        var canPosition = true;

        if (thisMobileAttr == 'all' || thisMobileAttr == 'large' && screenSize !== 'xlarge' || thisMobileAttr == 'medium' && screenSize == 'medium' || thisMobileAttr == 'small' && screenSize == 'small' || screenSize == 'small') {
            canPosition = false;
        }

        if (canPosition) {

            var trigger = dropdown.find('.fi-dropdown-trigger').first();
            var dropdownContent = jQuery('.fi-dropdown-content[data-fi-dropdown-id="' + dropdown.attr('data-fi-dropdown-id') + '"]');

            var triggerWidth = trigger.outerWidth();
            var triggerHeight = trigger.outerHeight();
            var triggerCoords = trigger[0].getBoundingClientRect();
            var dropdownContentWidth = dropdownContent.outerWidth();
            var dropdownContentHeight = dropdownContent.outerHeight();
            var dropdownContentCoords = dropdownContent[0].getBoundingClientRect();
            var windowWidth = Figure.getWindowWidth();
            var windowHeight = Figure.getWindowHeight();
            var thisOriginallyOppositeAttr = dropdown.attr('data-fi-originally-opposite');
            var thisAppendToBodyAttr = dropdown.attr('data-fi-append-to-body');
            var dropdownContentMarginTop = parseInt(dropdownContent.css('margin-top'));
            var dropdownContentMarginBottom = parseInt(dropdownContent.css('margin-bottom'));

            var shouldInvert = false, shouldOpposite = false;

            dropdown.removeClass('fi-inverted fi-opposite');
            dropdownContent.removeClass('fi-inverted fi-opposite');

            if (triggerCoords.top + triggerHeight + dropdownContentMarginTop + dropdownContentHeight > windowHeight && triggerCoords.top - dropdownContentHeight - dropdownContentMarginBottom >= 0)  {
                shouldInvert = true;
            }
            if (thisOriginallyOppositeAttr == 'true' || triggerCoords.left + dropdownContentWidth > windowWidth && triggerCoords.left - dropdownContentWidth + triggerWidth >= 0)  {
                shouldOpposite = true;
            }

            if (thisAppendToBodyAttr != undefined) {

                if (!dropdownContent.is('body > *')) {
                    jQuery('body').append(dropdownContent);
                }

                dropdownContent.css({
                    display: 'block',
                    position: 'fixed',
                    top: 0,
                    left: '-9999px',
                    right: 'auto',
                    bottom: 'auto',
                });

                dropdownContent.css({
                    top: (shouldInvert ? triggerCoords.top - dropdownContentHeight - dropdownContentMarginBottom : triggerCoords.top + triggerHeight),
                    left: (shouldOpposite ? triggerCoords.left - dropdownContentWidth + triggerWidth : triggerCoords.left),
                    right: 'auto',
                    bottom: 'auto',
                });

            }

            if (shouldInvert) {
                dropdown.addClass('fi-inverted');
                dropdownContent.addClass('fi-inverted');
            }
            else {
                dropdown.removeClass('fi-inverted');
                dropdownContent.removeClass('fi-inverted');
            }
            if (shouldOpposite) {
                dropdown.addClass('fi-opposite');
                dropdownContent.addClass('fi-opposite');
            }
            else {
                dropdown.removeClass('fi-opposite');
                dropdownContent.removeClass('fi-opposite');
            }
        }

    });
};

Figure.dropdownId = 0;

Figure.toggleDropdown = function (dropdown) {
    var dropdown = jQuery(dropdown);
    if (!dropdown.length) {
        return;
    }

    var thisTrigger = dropdown.find('.fi-dropdown-trigger')[0];
    var dropdownContent = dropdown.children('.fi-dropdown-content') || dropdown.find('.fi-mobile-dropdown-overlay > .fi-dropdown-content');
    var thisMobileAttr = dropdown.attr('data-fi-mobile-dropdown');
    var thisAppendToBodyAttr = dropdown.attr('data-fi-append-to-body');

    Figure.toggleDropdown(jQuery('.fi-dropdown.fi-dropdown-open').not(dropdown).not(dropdown.parents('.fi-dropdown')).not('.fi-dropdown.fi-mobile-dropdown-active'));

    Figure.hideOtherPagesElements();

    var canPosition = true, mobileMode = false;

    var screenSize = Figure.getScreenSize();
    var shownHiddenTimeOut = 0;

    if (thisMobileAttr == 'all' || thisMobileAttr == 'large' && screenSize !== 'xlarge' || thisMobileAttr == 'medium' && screenSize == 'medium' || thisMobileAttr == 'small' && screenSize == 'small' || screenSize == 'small') {
        canPosition = false;
        mobileMode = true;
        shownHiddenTimeOut = 200;
    }

    if (!dropdown.hasClass('fi-dropdown-open')) {

        dropdown.attr('data-fi-dropdown-id', Figure.dropdownId);
        dropdownContent.attr('data-fi-dropdown-id', Figure.dropdownId);
        Figure.dropdownId++;

        if (mobileMode && !dropdown.is('.fi-child-page *')) {
            Figure.showMobileDropdown(dropdown, dropdownContent);
        }

        //DROPDOWN SHOW CALLBACK
        dropdown.trigger('fi-dropdown:show', [thisTrigger, dropdownContent]);

        dropdown.addClass('fi-dropdown-open');

        if (dropdown.hasClass('fi-inverted')) {
            dropdown.attr('data-fi-originally-inverted', 'true');
        }
        else {
            dropdown.attr('data-fi-originally-inverted', 'false');
        }
        if (dropdown.hasClass('fi-opposite')) {
            dropdown.attr('data-fi-originally-opposite', 'true');
        }
        else {
            dropdown.attr('data-fi-originally-opposite', 'false');
        }

        if (canPosition) {
            Figure.positionDropdown();
        }

        //DROPDOWN SHOWN CALLBACK
        setTimeout(function () {
            dropdown.trigger('fi-dropdown:shown', [dropdown.find('.fi-dropdown-trigger'), dropdownContent]);
        }, shownHiddenTimeOut);

        ////FOCUS ON FIRST INPUT
        //if (dropdownContent.find('input[type="text"], input[type="search"], input[type="password"], textarea').length > 0) {
        //    if (dropdown.hasClass('fi-dropdown-open')) {
        //        dropdownContent.find('input[type="text"], input[type="search"], input[type="password"], textarea')[0].focus();
        //    }
        //}

        //REHANDLE IMAGES
        dropdownContent.find('.image-handler').trigger('rehandle');

        //CHECK TRUNCATE
        if (typeof FigureTruncate == 'function') {
            FigureTruncate(dropdownContent.find('.truncate'));
        }
    }
    else {

        Figure.toggleDropdown(dropdown.find('.fi-dropdown.fi-dropdown-open'));

        if (thisAppendToBodyAttr != undefined && !mobileMode) {
            dropdownContent = jQuery('.fi-dropdown-content[data-fi-dropdown-id="' + dropdown.attr('data-fi-dropdown-id') + '"]');

            dropdownContent.css({
                display: '',
                position: '',
                top: '',
                left: '',
                right: '',
                bottom: '',
            });

            dropdown.append(dropdownContent);
        }

        if (dropdown.attr('data-fi-originally-inverted') == 'false') {
            dropdown.removeClass('fi-inverted');
            dropdownContent.removeClass('fi-inverted');
        }
        else if (dropdown.attr('data-fi-originally-inverted') == 'true') {
            dropdown.addClass('fi-inverted');
            dropdownContent.addClass('fi-inverted');
        }
        if (dropdown.attr('data-fi-originally-opposite') == 'false') {
            dropdown.removeClass('fi-opposite');
            dropdownContent.removeClass('fi-opposite');
        }
        else if (dropdown.attr('data-fi-originally-opposite') == 'true') {
            dropdown.addClass('fi-opposite');
            dropdownContent.addClass('fi-opposite');
        }

        if (dropdown.hasClass('fi-mobile-dropdown-active')) {
            Figure.hideMobileDropdown(dropdown);
        }
        else {
            dropdown.removeClass('fi-dropdown-open');
        }

        //DROPDOWN HIDE CALLBACK
        dropdown.trigger('fi-dropdown:hide', [thisTrigger, dropdownContent]);

        dropdown.removeAttr('data-fi-dropdown-id');
        dropdownContent.removeAttr('data-fi-dropdown-id');

        //thisTrigger.focus();

        //DROPDOWN HIDDEN CALLBACK
        setTimeout(function () {
            dropdown.trigger('fi-dropdown:hidden', [thisTrigger, dropdownContent]);
        }, shownHiddenTimeOut);
    }
};

jQuery(document).on('fi-dropdown:shown', '.fi-dropdown', function () {
    jQuery(this).find('[data-fi-focus-start]').focus();
});

//PREVENT DEFAULT ON CLICK
Figure.noClickElements = '\
    .fi-no-click,\
    .prevent-default,\
    button.fi-tab-button,\
    .fi-accordion-trigger,\
    .fi-nav-accordion li.fi-has-child > a,\
    .fi-expand-accordion,\
    .fi-collapse-accordion,\
    .fi-dropdown .fi-dropdown-trigger,\
    .fi-highlight-selected .fi-dropdown-content li,\
    .fi-custom-dropdown a,\
    button.fi-close-button,\
    .fi-close-modal,\
    .fi-view-results,\
    .fi-poll .fi-back-button,\
    .truncate-revert,\
    [data-fi-dialog],\
    [data-fi-confirm],\
    [data-fi-modal],\
    [data-off-canvas],\
    .owl-nav a\
';

jQuery(document).on('click', Figure.noClickElements, function (e) {
    e.preventDefault();
});

Figure.toggleAccordion = function (accordionContent, expandCollapseAll) {

    var accordionContent = jQuery(accordionContent);
    if (!accordionContent.length) {
        return;
    }

    var accordionTrigger;

    if (accordionContent.is('.fi-accordion *')) {
        accordionTrigger = accordionContent.siblings('.fi-accordion-trigger');
    }
    else if (accordionContent.is('.fi-nav-accordion *')) {
        accordionTrigger = accordionContent.siblings('li.fi-has-child > span');
    }

    var accordionRoot = accordionContent.closest('.fi-accordion, .fi-nav-accordion');


    var multipleAttr = accordionRoot.attr('data-fi-multiple');
    if (multipleAttr == 'true') {
        multipleAttr = true;
    }
    else {
        multipleAttr = false;
    }

    var scrollAttr = accordionRoot.attr('data-fi-scroll');
    if (scrollAttr == 'true') {
        scrollAttr = true;
    }
    else {
        scrollAttr = false;
    }

    if (accordionContent.closest('li').hasClass('fi-child-open') || expandCollapseAll == 'collapse') {

        accordionContent.closest('li').removeClass('fi-child-open');

        //ACCORDION HIDE CALLBACK
        accordionContent.trigger('fi-accordion:hide');

        accordionContent.slideUp(200);

        setTimeout(function () {
            //ACCORDION HIDDEN CALLBACK
            accordionContent.trigger('fi-accordion:hidden');
        }, 200);

    }

    else if (!accordionContent.closest('li').hasClass('fi-child-open') || expandCollapseAll == 'expand') {

        accordionContent.closest('li').addClass('fi-child-open');

        //ACCORDION SHOW CALLBACK
        accordionContent.trigger('fi-accordion:show');

        accordionContent.slideDown(200);

        setTimeout(function () {
            //ACCORDION SHOWN CALLBACK
            accordionContent.trigger('fi-accordion:shown');

            //REHANDLE IMAGES
            accordionContent.find('.image-handler').trigger('rehandle');

            //CHECK TRAUNCATE
            if (typeof FigureTruncate == 'function') {
                FigureTruncate(accordionContent.find('.truncate'));
            }

            Figure.checkSticky();
        }, 200);

        if (!multipleAttr) {

            var activeContent = accordionContent.closest('li').siblings('.fi-child-open').children('.fi-accordion-content, li.fi-has-child > ul');

            accordionContent.closest('li').siblings().removeClass('fi-child-open');

            //ACCORDION HIDE CALLBACK
            activeContent.trigger('fi-accordion:hide');

            activeContent.slideUp(200);

            setTimeout(function () {
                //ACCORDION HIDDEN CALLBACK
                activeContent.trigger('fi-accordion:hidden');
            }, 200);

        }

        if (scrollAttr) {
            jQuery('html, body').bind('mousewheel DOMMouseScroll', function (e) {
                e.preventDefault();
            });
            setTimeout(function () {
                var accordionTriggerOffset = accordionTrigger.offset().top - 100;
                var bodyContentHeight = jQuery('body')[0].scrollHeight;
                var windowHeight = window.innerHeight;
                if (accordionTriggerOffset > (bodyContentHeight - windowHeight)) {
                    accordionTriggerOffset = bodyContentHeight - windowHeight;
                }
                jQuery('html, body').animate({ scrollTop: accordionTriggerOffset }, 200, function () {
                    jQuery('html, body').unbind('mousewheel DOMMouseScroll');
                });
            }, 250);
        }
    }

};

//ACCORDION & NAV-ACCORDION
jQuery(document).on('click', '.fi-accordion-trigger, .fi-nav-accordion li.fi-has-child > a, .fi-nav-accordion li.fi-has-child > span', function () {
    var accordionTrigger = jQuery(this);
    var accordionContent;

    if (accordionTrigger.is('.fi-accordion *')) {
        accordionContent = accordionTrigger.siblings('.fi-accordion-content');
    }
    else if (accordionTrigger.is('.fi-nav-accordion *')) {
        accordionContent = accordionTrigger.siblings('ul');
    }
    Figure.toggleAccordion(accordionContent);
});

//EXPAND ALL & COLLAPSE ALL CLICK
jQuery(document).on('click', '.fi-expand-accordion', function () {
    var target = jQuery(this).attr('data-fi-accordion');

    var multipleAttr = jQuery(target).attr('data-fi-multiple');
    if (multipleAttr == 'true') {
        multipleAttr = true;
    }
    else {
        multipleAttr = false;
    }

    if (multipleAttr) {
        Figure.toggleAccordion(jQuery(target).find('.fi-accordion-content'), 'expand');
    }
});

jQuery(document).on('click', '.fi-collapse-accordion', function () {
    var target = jQuery(this).attr('data-fi-accordion');
    Figure.toggleAccordion(jQuery(target).find('.fi-accordion-content'), 'collapse');
});

//ALERTS CLOSE BUTTON
jQuery(document).on('click', '.fi-alert .fi-close-button', function () {
    jQuery(this).closest('.fi-alert').remove();
});

//DOCUMENT CLICK (HANDLING CLICK & TOUCH TO CLOSE BUT OUTSIDE OF ELEMENTS)
jQuery(document).on('touchstart', function (e) {
    Figure.documentClick = true;
});

jQuery(document).on('touchmove', function () {
    Figure.documentClick = false;
});

Figure.lastMousedownTarget = null;
jQuery(document).on('mousedown', function (e) {
    Figure.mousedown = true;
    Figure.lastMousedownTarget = e.target;
});

jQuery(document).on('mouseup', function (e) {
    Figure.mousedown = false;
    Figure.lastMousedownTarget = e.target;
});

jQuery(document).on('click touchend', function (e) {
    if (e.type == 'click') {
        Figure.documentClick = true;
    }
    if (Figure.documentClick) {
        jQuery(this).trigger('documentClick', [e]);
    }
});

jQuery(document).on('documentClick', function (e, element) {
    if (jQuery(element.target).closest('.side-panel').length) {
        Figure.documentClick = false;
    }
    if (!jQuery(element.target).closest('.fi-dropdown-trigger, .fi-dropdown-content, .fi-dropdown-arrow').length) {
        Figure.hideAllDropdownMenus();
        Figure.hideOtherPagesElements();

        if (jQuery(element.target).is('body > .fi-mobile-dropdown-overlay')) {
            Figure.toggleDropdown(jQuery('.fi-dropdown[data-fi-dropdown-id="' + jQuery(element.target).children('.fi-dropdown-content').attr('data-fi-dropdown-id') + '"]'));
        }
    }
    if (jQuery(element.target).closest('.fi-dropdown').find('.fi-dropdown-open').length) {
        Figure.toggleDropdown(jQuery(element.target).closest('.fi-dropdown').find('.fi-dropdown-open'));
    }
    if (!jQuery(element.target).closest('.fi-nav-bar ul.fi-root li').length) {
        Figure.hideNavBarSubMenu(jQuery('.fi-nav-bar ul.fi-root li.fi-child-open'));
    }
    if (!jQuery(element.target).closest('.fi-modal-content, .fi-close-modal, .fi-no-click-close, .fi-mobile-dropdown-overlay').length && !jQuery(Figure.lastMousedownTarget).closest('.fi-modal-content, .fi-no-click-close').length) {
        Figure.modal(jQuery(element.target).closest('.fi-modal')).hide();
    }
});

jQuery(document).on('click', '.fi-dropdown-header .fi-close-button', function () {
    if (jQuery(this).closest('.fi-dropdown-content').is('.fi-mobile-dropdown-overlay > *')) {
        Figure.toggleDropdown(jQuery('.fi-dropdown[data-fi-dropdown-id="' + jQuery(this).closest('.fi-dropdown-content').attr('data-fi-dropdown-id') + '"]'));
    }
    else {
        Figure.toggleDropdown(jQuery(this).closest('.fi-dropdown'));
    }
});

jQuery(document).on('click', '.fi-dropdown > .fi-dropdown-trigger', function () {

    Figure.hideTooltip();

    var thisTrigger = jQuery(this);
    var dropdown = thisTrigger.closest('.fi-dropdown');

    Figure.toggleDropdown(dropdown);

});

jQuery(document).on('click', '[data-fi-tooltip]', function () {
    Figure.hideTooltip();
});

Figure.showTab = function (tab) {

    var tab = jQuery(tab);
    if (!tab.length) {
        return;
    }

    var tabContent = jQuery(tab.attr('data-fi-tab'));

    if (!tabContent.length) {
        return;
    }

    var tabsContentWrapper = tabContent.closest('.fi-tabs-content-wrapper');
    var activeTab = tabsContentWrapper.children('.fi-tab-active');
    var itemText = tab.find('.fi-tab-button').text();

    if (!tab.hasClass('fi-tab-active')) {

        //CURRENTLY ACTIVE TAB HIDE CALLBACK
        activeTab.trigger('fi-tab:hide');

        if (!tabsContentWrapper.hasClass('fi-no-fade')) {
            activeTab.finish().animate({
                opacity: 0
            }, 200,
            function () {
                //CURRENTLY ACTIVE TAB HIDDEN CALLBACK
                activeTab.trigger('fi-tab:hidden');

                activeTab.css('opacity', '').removeClass('fi-tab-active');

                tabContent.css({ opacity: 0 }).addClass('fi-tab-active');

                //NEW SELETED TAB SHOW CALLBACK
                tabContent.trigger('fi-tab:show', [tab, activeTab]);

                //REHANDLE IMAGES
                tabContent.find('.image-handler').trigger('rehandle');

                //CHECK TRUNCATE
                if (typeof FigureTruncate == 'function') {
                    FigureTruncate(tabContent.find('.truncate'));
                }

                tabContent.finish().animate({ opacity: 1 }, 200, function () {

                    //NEW SELETED TAB SHOWN CALLBACK
                    tabContent.trigger('fi-tab:shown', [tab, activeTab]);

                    tabContent.css('opacity', '');

                });
            });
        }
        else {
            //CURRENTLY ACTIVE TAB HIDDEN CALLBACK
            activeTab.trigger('fi-tab:hidden');

            tabsContentWrapper.find('.fi-tab-content').removeClass('fi-tab-active');

            tabContent.addClass('fi-tab-active');

            //NEW SELETED TAB SHOW CALLBACK
            tabContent.trigger('fi-tab:show', [tab, activeTab]);

            //NEW SELETED TAB SHOWN CALLBACK
            tabContent.trigger('fi-tab:shown', [tab, activeTab]);

            //REHANDLE IMAGES
            tabContent.find('.image-handler').trigger('rehandle');

            //CHECK TRUNCATE
            if (typeof FigureTruncate == 'function') {
                FigureTruncate(tabContent.find('.truncate'));
            }
        }

        tab.addClass('fi-tab-active').siblings().removeClass('fi-tab-active');
    }

};

jQuery(document).on('click', '.fi-tabs > ul > li', function () {
    Figure.showTab(jQuery(this));
});

jQuery(document).on('click', '.fi-dropdown-content.fi-highlight-selected-content li', function () {

    jQuery(this).addClass('fi-dropdown-active').siblings('li').removeClass('fi-dropdown-active');

    var itemTitle = jQuery(this).children().html();

    var dropdown = jQuery('.fi-dropdown[data-fi-dropdown-id="' + jQuery(this).closest('.fi-dropdown-content').attr('data-fi-dropdown-id') + '"]');

    if (!jQuery(this).is('.fi-disabled, .fi-no-click')) {
        Figure.toggleDropdown(dropdown);
    }

    if (dropdown.length) {
        dropdown.find('.fi-dropdown-trigger .fi-dropdown-title').html(itemTitle);
        jQuery(this).closest('.fi-dropdown').find('.fi-dropdown-trigger').focus();
    }

});

//CUSTOM DROPDOWNS (CHANGE SELECTED VALUE ON CUSTOM DROPDOWN ITEM CLICK)
jQuery(document).on('click', '.fi-custom-dropdown a', function () {
    var select = jQuery(this).closest('.fi-custom-dropdown').siblings('select.fi-custom-dropdown');
    var thisIndex = jQuery(this).closest('li').index();
    select.find('option').eq(thisIndex).prop('selected', true);
});

jQuery(document).on('click', '.fi-notify', function () {
    var thisindex = jQuery(this).closest('.fi-notify').attr('data-fi-notifyid');
    Figure.hideNotify('.fi-notify-wrapper .fi-notify[data-fi-notifyid="' + thisindex + '"]');
});

//DIALOGS
jQuery(document).on('click', '[data-fi-dialog]', function () {
    var thisMessage = jQuery(this).attr('data-fi-dialog');
    Figure.dialog(thisMessage);
});

//CONFIRM
jQuery(document).on('click', '[data-fi-confirm]', function () {
    var message = jQuery(this).attr('data-fi-confirm');
    var action = new Function(jQuery(this).attr('data-fi-onclick'));
    Figure.confirm({
        message: message,
        onConfirm: action,
    });
});

//MODALS
jQuery(document).on('click', '[data-fi-modal]', function () {
    var modal = jQuery(this).attr('data-fi-modal');
    var modalTitleAttr = jQuery(this).attr('data-fi-modal-title');
    var modalHideOnEscAttr = jQuery(this).attr('data-fi-modal-hideonesc');
    var modalTitle = null;
    if (modalTitleAttr != undefined && modalTitleAttr.length) {
        modalTitle = modalTitleAttr;
    }
    var hideOnEsc = true;
    if (modalHideOnEscAttr != undefined && modalHideOnEscAttr == 'false') {
        hideOnEsc = false;
    }
    Figure.modal(modal, {
        title: modalTitle,
        hideOnEsc: hideOnEsc,
    }).show();
});

//POLLS
jQuery(document).on('click', '.fi-view-results', function () {
    Figure.showPollResults(jQuery(this).closest('.fi-poll'));
});

jQuery(document).on('click', '.fi-poll .fi-back-button', function () {
    Figure.hidePollResults(jQuery(this).closest('.fi-poll'));
});

//REVERT TRUNCATION
jQuery(document).on('click', '.truncate-revert', function () {
    var thisElement = jQuery(this);
    if (typeof FigureTruncate == 'function') {
        thisElement.closest('.truncate').trunk8('revert').removeClass('truncate').css({ float: '', position: '' });
    }
});

Figure.getQueryString = function (string) {
    var vars = [], hash;
    var hashes;
    if (string == null) {
        hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    }
    else {
        hashes = string.slice(string.indexOf('?') + 1).split('&');
    }
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
};

Figure.holdEscKeyFlag = false;

Figure.holdEscKey = function () {
    Figure.holdEscKeyFlag = true;
};

Figure.unholdEscKey = function () {
    setTimeout(function () {
        Figure.holdEscKeyFlag = false;
    }, 50);
};

//ENTER & ESC KEYS
jQuery(document).keyup(function (e) {
    //ENTER
    if (e.keyCode == 13) {
        jQuery('.fi-nav-accordion .fi-has-child span:focus').trigger('click');
    }
    //ESC
    else if (e.keyCode == 27) {
        Figure.hideNotify('.fi-notify');
        if (jQuery('.fi-dropdown.fi-dropdown-open').not('.fi-mobile-dropdown-active').length) {
            Figure.toggleDropdown(jQuery('.fi-dropdown.fi-dropdown-open').not('.fi-mobile-dropdown-active').last());
        }
        else if (!Figure.holdEscKeyFlag) {
            Figure.overlayQueueHideCheck();
        }

        //Figure.hideAllDropdownMenus();
        //Figure.hideOtherPagesElements();
    }
});

//SHOW TOOLTIP ON FOCUS
jQuery(document).on('focus', '[data-fi-tooltip]', function () {
    if (!jQuery(this).is('.fi-tooltip-active') && !jQuery(this).is(':hover')) {
        Figure.showTooltip(jQuery(this));
    }
});

//HIDE TOOLTIP ON FOCUS
jQuery(document).on('blur', '[data-fi-tooltip]', function () {
    if (jQuery(this).is('.fi-tooltip-active')) {
        Figure.hideTooltip(jQuery(this));
    }
});

jQuery(document).ready(function () {

    //CHECK FOR SHAREPOINT APPS
    if (jQuery('body').attr('data-fi-spapps') != undefined) {
        Figure.spApps = true;
        Figure.spAppsMediaQuery();
    }

    //CHECK FOR RTL
    if (jQuery('html').attr('dir') == 'rtl' || jQuery('html').css('direction') == 'rtl' || jQuery('body').css('direction') == 'rtl') {
        Figure.rtl = true;
    }

    Figure.processNewContent(true);

    //PREVENT PAGE SCROLLING WHILE USING MOUSEWHEEL INSIDE DROPDOWN CONTENT
    // jQuery(document).on('mousewheel DOMMouseScroll', '.fi-dropdown-body', function (e) {
    //     if (this.scrollHeight > this.offsetHeight) {
    //         var d = e.originalEvent.wheelDelta || -e.originalEvent.detail,
    //             dir = d > 0 ? 'up' : 'down',
    //             stop = (dir == 'up' && this.scrollTop == 0) ||
    //                    (dir == 'down' && Math.round(this.scrollTop) == this.scrollHeight - this.offsetHeight);
    //         stop && e.preventDefault();
    //     }
    // });

});

jQuery(window).resize(function () {

    if (Figure.spApps) {
        Figure.spAppsMediaQuery();
    }

    //MATCH HEIGHTS OF ELEMENTS UNDER [data-fi-match-heights] ATTRIBUTE
    Figure.matchHeights();

    Figure.centerNotify();

});

jQuery(window).bind('scroll resize', function () {
    Figure.checkSticky();
    Figure.positionDropdown();
});

document.addEventListener('scroll', function (event) {
    if (jQuery(event.target).find('.fi-dropdown.fi-dropdown-open').length) {
        Figure.positionDropdown();
    }
    Figure.hideTooltip();
}, true);
