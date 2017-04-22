const cheerio = require('cheerio');
const request = require('request');

exports.load = function(url, title, genres) {
    request(url, function (error, response, body) {
        if (response.statusCode == 200) {
            loadData(body, title, genres)
        }
    })
}

function loadData(body, title, genres) {
    let metadata = {}
    metadata.title = title
    metadata.genres = genres
    let $ = cheerio.load(body)
    $("td a").each(function() {
        if ($(this).attr("href").includes("author")) {
            metadata.author = $(this).text()
        }
    })

    metadata.summary = $("p.summary").text()

    metadata.chapters = []
    $(".chlist .tips").each(function () {
        let url = $(this).attr("href")
        let chapter = $(this).text()
        if ($(this).siblings(".title")) {
            let title = $(this).siblings(".title").text()
        } else {
            let title = ""
        }
        metadata.chapters.push({"url": url, "chapter": chapter, "title": title})
    })

    metadata.image = $(".cover img").attr("src")

    loadPage(metadata);
}

function loadPage(metadata) {
    document.getElementById("content").innerHTML = `<p class="title">${metadata.title}</p><p class="subtitle">${metadata.genres}</p><p>${metadata.summary}</p>`
}
