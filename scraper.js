var request = require('request'),
    cheerio = require('cheerio'),
    urls = [],
    titles = [];

request("http://mangafox.me/directory/", function(err, resp,body) {
    var $ = cheerio.load(body);
    $('.title', '.list').each(function() {
        var url = $(this).attr('href');
        urls.push(url);
        var title = $(this).text();
        titles.push(title);
    });
    for (i = 0; i < urls.length; i++) {
        var x = document.createElement("P");
        var t = document.createTextNode(titles[i]);
        var u = document.createTextNode(urls[i]);
        x.appendChild(t);
        x.appendChild(document.createElement("BR"));
        x.appendChild(u);
        document.body.appendChild(x);
    }
});
