'use strict';

$(function() {
    $('.section .contents').hide()

    $('.expand_collapse_links').show()
    $('.expand_collapse_links .expand_all').click(function() {
        $('.section .contents').show()
    })
    $('.expand_collapse_links .collapse_all').click(function() {
        $('.section .contents').hide()
    })

    $('.section h2').click(function() {
        var hidden = $(this).next().is(':hidden')
        $(this).next().slideToggle()
        return hidden
    })

    $('#menu span').css('cursor', 'pointer').click(function() {
        $('.section .contents').hide()
        showSectionsForSCM(this.innerHTML)
        document.location.hash = this.innerHTML
    }) 

    if (document.location.hash) {
        var anchor = document.location.hash.substring(1)
        $('.section h2 a[name=' + anchor + ']').parent('h2').click()
        showSectionsForSCM(anchor)
    }

    function showSectionsForSCM(scm) {
        $('.section a[name=' + scm + ']').parents('.section').find('.contents').show()
    }
})


var d = document,
    images = d.images || Array.prototype.slice.call(d.getElementsByTagName('img')),
    len,
    i,
    image,
    src;

for (i = 0, len = images.length; i < len; i += 1) {
    image = images[i];
    src = image.getAttribute('data-src');
    if (src) {
        image.src = src;
        image.removeAttribute('data-src');
    }
}
