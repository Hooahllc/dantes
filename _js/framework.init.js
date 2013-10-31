jQuery(document).ready(function() {
    framework.fn.global.findExternalLinks();
    framework.fn.nav.init();

    jQuery('#container>header>section>nav').bind('click', function() {
        jQuery(this).hasClass('open') ? jQuery(this).removeClass('open') : jQuery(this).addClass('open');
    });

    if (typeof jQuery.fn.foundationAccordion === 'function') {
        jQuery('.accordion').foundationAccordion();
    }
    if (typeof jQuery.fn.chosen === 'function') {
        jQuery('select').chosen();

        jQuery('button[type="reset"], input[type="reset"]').bind('click', function() {
            jQuery('select').val('').trigger('chosen:updated');
        });
    }
	if (jQuery('.hero-aside-news-view').length) {
		framework.fn.cta.aside.newsView.init();
	}
    if (jQuery('.modal-trigger').length) {
        framework.fn.modal.init();
    }
	jQuery('.slim-cta-banner a.trigger').bind('click', framework.fn.cta.slim.toggleContent);

    setTimeout( function() {
                    if (window.location.hash.length) {
                        // check for accordion hash
                        if (window.location.hash.indexOf('accordion-') > -1) {
                            var strAccordionHash        = window.location.hash.substr(window.location.hash.indexOf('accordion-') + 10);

                            if (strAccordionHash.length) {
                                strAccordionHash            = strAccordionHash.toLowerCase();
                                var objAccordionItem        = jQuery('.accordion>li>div.title[data-ref="' + strAccordionHash + '"]');

                                if (objAccordionItem.length) {
                                    objAccordionItem.trigger('click');
                                }
                            }
                        }
                    }
                }, 500);
});