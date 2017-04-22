let sources = require("./sources.json")
const request = require('request');
const cheerio = require('cheerio');


exports.search = function() {
    if (sources.length > 0) {
        let search = document.getElementById("search").value
        let URL = `http://mangafox.me/search.php?name_method=cw&name=${search}&type=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdult%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSmut%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BWebtoons%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&rating_method=eq&rating=&is_completed=&advopts=1`
        request(URL, function (error, response, body) {
            if (response.statusCode == 200) {
                findResults(body)
            }
        })
    }
}

function findResults(body) {
    let $ = cheerio.load(body)
    let results = []

    $('li', '.list').each(function() {
        let $$ = cheerio.load($(this).html())
        let url = $$(".title.series_preview.top", ".manga_text").attr("href")
        let title = $$(".title.series_preview.top", ".manga_text").text()
        let img = $$('img', 'div').attr("src")
        let genres = $$(this).find('.info').first().attr('title')
        results.push({"title": title, "url": url, "img": img, "genres": genres})
    });

    loadResults(results)
}

function loadResults(results) {
    let list = document.getElementById("result");
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
    for (var i = 0; i < results.length; i++) {
        let node = document.createElement("div")
        node.setAttribute("class", "column is-2-desktop is-3-tablet is-4-mobile")
        node.innerHTML = `<article class="box" style="height: 100%;" onclick='mangaData.load("${results[i].url}", "${results[i].title}", "${results[i].genres}");'><p class="title is-4">${results[i].title}</p><p class="subtitle is-6">${results[i].genres}</p><figure class="image"><img src="${results[i].img}"></figure></article>`
        document.getElementById("result").appendChild(node)
    }
}
