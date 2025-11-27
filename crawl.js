const { JSDOM } = require('jsdom');

function normalizeUrl(urlString) {
    const urlObject = new URL(urlString); //URL constructor already lowercase it all
    var hostName = `${urlObject.hostname}${urlObject.pathname}`;
    if (hostName.endsWith('/')) {
        hostName = hostName.slice(0, -1);
    }
    return hostName;
}



function getUrlsFromHtml(htmlBody, baseUrl) {
    const urls = [];
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a');
    linkElements.forEach(element => {
        let url = element.href;
        if(element.href.startsWith('/')){
            url = baseUrl + element.href
        }
        console.log(url)
        try{
            const normalizedUrl = normalizeUrl(url)
            urls.push(normalizedUrl);
        }catch{
            console.log(`Error with url: ${url}`)
        }
    });
    console.log(urls)
    return urls
}

module.exports = { 
    normalizeUrl,
    getUrlsFromHtml
};