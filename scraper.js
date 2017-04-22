var request = require('request'),
    cheerio = require('cheerio'),
    urls = [],
    titles = [],
    images = [],
    genres = [];

request("http://mangafox.me/directory/", function(err, resp,body) {
    var $ = cheerio.load(body);
    $('.title', '.list').each(function() {
        var url = $(this).attr('href');
        urls.push(url);
        var title = $(this).text();
        titles.push(title);
    });

    $('.manga_text').each(function() {
        var genre = $(this).find('.info').first().attr('title');
        genres.push(genre);
    });

    $('img', '.list').each(function() {
        var image = $(this).attr('src');
        images.push(image);
    });

    let html = document.getElementById('list').outerHTML;
    let $$ = cheerio.load(html);

    for (i = 0; i < urls.length; i++) {
        $$('#list').append(`<div class="column is-2-desktop is-3-tablet is-4-mobile"><article class="box" style="height: 100%;"><p class="title is-4">${titles[i]}</p><p class="subtitle is-6">${genres[i]}</p><figure class="image"><img src="${images[i]}"></figure></article></div>`);
    }

    console.log($$.html());
    document.getElementById('list').outerHTML = $$.html();
});
