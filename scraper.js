var request = require('request'),
    cheerio = require('cheerio'),
    urls = [],
    titles = []
    images = []
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
        $$('#list').append(`<li class="manga"><img src="${images[i]}"><a href="${urls[i]}">${titles[i]}</a><br>${genres[i]}</li>`);
    }

    console.log($$.html());
    document.getElementById('list').outerHTML = $$.html();
});
