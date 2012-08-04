/*jslint document, jQuery*/
'use strict';
var d = document,
    thumbs = ['adam-chou.png', 'hester-wei.png', 'maili-wu.png', 'tony-lee.png', 'alex-tam.png', 'jane.png', 'winston-liang.png', 'angela-chou.png', 'julian-lee.png', 'paul-hsieh.png', 'xiang-xing.png', 'beiwen-chang.png', 'kin-chew.png', 'paul-lee.png', 'yeng-fong.png', 'charles-lo.png', 'lien-jun.png', 'robert-lee.png', 'yi-chai.png', 'elizabeth-sor.png', 'lily-chi.png', 'shujei-lan.png', 'zheng-guo.png', 'ellen-wu.png', 'lily-wang.png', 'susu-liu.png', 'george-hsu.png', 'long-hua.png', 'timothy-chen.png'],
    brick = '<div class="box photo col11 masonry-brick">' +
        '<a href="{url}" title="{title}"><img src="{src}" alt="{alt}"></a>' +
        '<h3>{name}</h3>' + 
    '</div>',
    html = '';

jQuery.each(thumbs, function (index, i) {
    var t = i.substring(0, i.lastIndexOf('.'));
    html += brick.replace('{url}', '/')
                 .replace('{src}', 'http://ncuaanc.org/images/gala-agents/' + i)
                 .replace('{name}', t)
                 .replace('{title}', t);
});

var container = d.getElementById('agents-profile'),
    $container = jQuery('#agents-profile');

container.innerHTML = html;
$container.imagesLoaded( function(){
    $container.masonry({
        itemSelector : '.box'
    });
});
