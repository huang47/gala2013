/*jslint document, jQuery*/
'use strict';
var container = jQuery('#image-container'),
    api = container.attr('data-api'),
    imagePath = container.attr('data-image-path');

jQuery.getJSON(api, function (thumbs) {
    var d = document,
        brick = '<div class="box photo col11 masonry-brick">' +
            '<a href="{url}" title="{title}"><img src="{src}" alt="{alt}"></a>' +
            '<h3>{name}</h3>' + 
        '</div>',
        html = '';

    jQuery.each(thumbs, function (index, i) {
        var img = imagePath + i.name + '.png';
        html += brick.replace('{url}', img)
                     .replace('{src}', img)
                     .replace('{name}', i.title)
                     .replace('{title}', i.content);
    });

    if (container) {
        container.html(html);
        container.imagesLoaded( function(){
            container.masonry({
                itemSelector : '.box'
            });
        });
    }
});
