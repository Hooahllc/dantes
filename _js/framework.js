var framework = {
	data: {
        global: {
            hostname: ''
        },
        nav: {
            containers: {
                selected: null,
                nav: null,
                links: null
            },
            open: false,
            timeout: null,
            delay: 325
        },
        cta: {
			aside: {
				newsView: {
                    count: 0,
                    current: 0,
					animation: {
						speed: 500,
                        timeout: null,
                        delay: 5000
					}
				}
			}
		}, 
		containers: {
			ctaAsideNewsView: null
		}
	}, 
	
	fn: {
        global: {
            findExternalLinks: function() {
                framework.data.global.hostname      = new RegExp(location.host);

                jQuery('a').each(function() {
                    var strURL          = jQuery(this).attr('href');

                    if ((strURL) && (strURL.length)) {
                        if ((framework.data.global.hostname.test(strURL)) || (strURL.indexOf('http') == -1) || (jQuery(this).hasClass('modal-trigger'))) {
                            jQuery(this).attr('data-link-type', 'local');
                        } else if (strURL.slice(0, 1) == '#') {
                            jQuery(this).attr('data-link-type', 'anchor');
                        } else {
                            jQuery(this).attr('data-link-type', 'external');
                            jQuery(this).attr('target', '_blank');
                        }
                    }
                });

                jQuery('a[data-link-type="external"]').bind('click', framework.fn.global.trapExternalLink);
            },

            trapExternalLink: function(objEvent) {
                var strURL             = jQuery(this).attr('href');

                if ((strURL) && (strURL.length)) {
                    if (confirm('PLEASE NOTE!\n\nYou are about to leave the DANTES website and access an external website.\n\nThe appearance of hyperlinks does not constitute endorsement by the (Department of Defense/the U.S. Army/the U.S. Navy/the U.S. Air Force/the U.S. Marine Corps, etc.) of this Web site or the information, products or services contained therein. For other than authorized activities such as military exchanges and Morale, Welfare and Recreation sites, the (Department of Defense/the U.S. Army/the U.S. Navy/the U.S. Air Force/the U.S. Marine Corps, etc.) does not exercise any editorial control over the information you may find at these locations. Such links are provided consistent with the stated purpose of this DoD Web site.\n\nPress [OK] to continue to the requested website, or [CANCEL] to return to the DANTES website.')) {
                        return true;
                    } else {
                        objEvent.preventDefault();
                        return false;
                    }
                }
            }
        },

        nav: {
            init: function() {
                jQuery('#container>header>section').after('<aside><nav class="row"></nav></aside>');

                framework.data.nav.containers.nav   = jQuery('#container>header>aside>nav');
                framework.data.nav.containers.links = jQuery('#container>header>section>nav>ul>li>a');

                jQuery(framework.data.nav.containers.links).bind('mouseover', function(objEvent) {
                    clearTimeout(framework.data.nav.timeout);

                    framework.data.nav.containers.selected  = objEvent.target;

                    if (framework.data.nav.open) {
                        framework.data.nav.timeout              = setTimeout(framework.fn.nav.show, framework.data.nav.delay);
                    } else {
                        framework.fn.nav.show();
                    }
                });
                jQuery('#container>header>aside')
                    .bind('mouseover', function() {
                        clearTimeout(framework.data.nav.timeout);
                    })
                    .bind('mouseout', function() {
                        clearTimeout(framework.data.nav.timeout);

                        framework.data.nav.timeout              = setTimeout(framework.fn.nav.hide, framework.data.nav.delay / 2);
                    });
            },

            show: function() {
                var objSubnav          = jQuery(framework.data.nav.containers.selected).siblings('.subnav');

                if (objSubnav.length) {
                    framework.data.nav.open        = true;

                    jQuery(framework.data.nav.containers.links).removeClass('current');
                    jQuery(framework.data.nav.containers.selected).addClass('current');
                    jQuery(framework.data.nav.containers.nav).html(jQuery(jQuery(objSubnav).html()).addClass('twelve'));

                    jQuery('body').addClass('nav-open');
                } else {
                    framework.data.nav.open        = false;

                    jQuery('body').removeClass('nav-open');
                }
            },

            hide: function() {
                clearTimeout(framework.data.nav.timeout);

                jQuery('body').removeClass('nav-open');
            }
        },

        cta: {
            slim: {
                toggleContent: function(objEvent) {
                    objEvent.preventDefault();

                    var objParentNode				= jQuery(this).parent('h2').parent('.slim-cta-banner');
                    var objTextNode					= jQuery(objParentNode).find('>div');

                    if ((objParentNode.length) && (objTextNode.length)) {
                        if (jQuery(objParentNode).hasClass('expanded')) {
                            jQuery(objParentNode).removeClass('expanded');
                            jQuery(this).find('strong').html(jQuery(this).attr('data-text-collapsed'));

                            jQuery(objTextNode).slideUp();
                        } else {
                            jQuery(objParentNode).addClass('expanded');
                            jQuery(this).find('strong').html(jQuery(this).attr('data-text-expanded'));

                            jQuery(objTextNode).slideDown();
                        }
                    }
                }
            },

			aside: {
				newsView: {
					init: function() {
						framework.data.containers.ctaAsideNewsView	= jQuery('.hero-aside-news-view');
						
						if (framework.data.containers.ctaAsideNewsView) {
							jQuery('>ol>li', framework.data.containers.ctaAsideNewsView).each(function() {
								jQuery(this).css({'opacity': 0, 'display': 'none'});
								jQuery('>nav>ol', framework.data.containers.ctaAsideNewsView).append('<li><a href="javascript:;" rel="' + (jQuery(this).index() + 1) + '">' + jQuery(this).index() + '</a></li>');
							});
							jQuery('>nav>ol>li>a', framework.data.containers.ctaAsideNewsView).bind('click', framework.fn.cta.aside.newsView.change);

                            framework.data.cta.aside.newsView.count                 = jQuery('>ol>li', framework.data.containers.ctaAsideNewsView).length - 1;
                            framework.data.cta.aside.newsView.current               = 0;

							setTimeout(function () { jQuery('>nav>ol>li>a:first', framework.data.containers.ctaAsideNewsView).trigger('click'); }, framework.data.cta.aside.newsView.animation.speed);

                            framework.data.cta.aside.newsView.animation.timeout     = setTimeout(framework.fn.cta.aside.newsView.next, framework.data.cta.aside.newsView.animation.delay);
						}
					}, 
					
					change: function(objEvent) {
						var intRequestedSlide		= parseInt(jQuery(this).attr('rel'));
						
						if ((!isNaN(intRequestedSlide)) && (intRequestedSlide > 0)) {
                            framework.data.cta.aside.newsView.current           = intRequestedSlide - 1;

                            clearTimeout(framework.data.cta.aside.newsView.animation.timeout);

							jQuery('>nav>ol>li>a', framework.data.containers.ctaAsideNewsView).removeClass('current');
							jQuery(this).addClass('current');
							
							jQuery('>ol>li:visible', framework.data.containers.ctaAsideNewsView)
								.css({'opacity': 1, 'display': 'table'})
								.stop()
								.animate({'opacity': 0}, framework.data.cta.aside.newsView.animation.speed, function() { jQuery(this).css({'display': 'none'}); });
							jQuery('>ol>li:eq(' + (intRequestedSlide - 1) + ')', framework.data.containers.ctaAsideNewsView)
								.css({'opacity': 0, 'display': 'table'})
								.stop()
								.animate({'opacity': 1}, framework.data.cta.aside.newsView.animation.speed, function() {
                                    framework.data.cta.aside.newsView.animation.timeout     = setTimeout(framework.fn.cta.aside.newsView.next, framework.data.cta.aside.newsView.animation.delay);
                                });
						}
					},

                    next: function() {
                        if (framework.data.cta.aside.newsView.current == framework.data.cta.aside.newsView.count) {
                            framework.data.cta.aside.newsView.current           = 0;
                        } else {
                            framework.data.cta.aside.newsView.current++;
                        }

                        jQuery('>nav>ol>li>a:eq(' + framework.data.cta.aside.newsView.current + ')', framework.data.containers.ctaAsideNewsView).trigger('click');
                    }
				}
			}
		},

        modal: {
            init: function() {
                var objTriggers             = jQuery('.modal-trigger');

                if (objTriggers.length) {
                    jQuery(objTriggers).each(function() {
                        var strType                 = jQuery(this).attr('data-modal-type');

                        if ((strType) && (strType.length)) {
                            switch (strType.toLowerCase()) {
                                case 'iframe' :
                                    jQuery(this).magnificPopup({
                                        disableOn: 700,
                                        type: 'iframe',
                                        mainClass: 'mfp-fade',
                                        removalDelay: 160,
                                        preloader: false,
                                        fixedContentPos: false
                                        /*
                                        type: 'iframe',
                                        iframe: {
                                            markup: '<div class="mfp-iframe-scaler">' +
                                                        '<div class="mfp-close"></div>'+
                                                        '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                                                    '</div>',
                                            patterns: {
                                                youtube: {
                                                    index: 'youtube.com/',
                                                    id: 'v=',
                                                    src: '//www.youtube.com/embed/%id%?rel=0&autoplay=1'
                                                },
                                                vimeo: {
                                                    index: 'vimeo.com/',
                                                    id: '/',
                                                    src: '//player.vimeo.com/video/%id%?autoplay=1'
                                                },
                                                gmaps: {
                                                    index: '//maps.google.',
                                                    src: '%id%&output=embed'
                                                }
                                            }
                                        }
                                        */
                                    });
                                    break;
                            }
                        }
                    });
                }
            }
        }
	}
};