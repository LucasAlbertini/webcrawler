const { JSDOM } = require('jsdom');

async function crawlPage(currentUrl){
    console.log(`actively crawling ${currentUrl}`);
    try{
        const resp = await fetch(currentUrl)
        if(resp.status > 399){
            console.log(`error in fetch with status code: ${resp.status} on page: ${currentUrl}`)
            return
        }
        const contentType = resp.headers.get("content-type")
        if(!contentType.includes("text/html")){
            console.log(`non html response, content type: "${contentType}" on page: ${currentUrl}`)
            return
        }

        console.log( await resp.text())
        // const htmlBody = await resp.text()
        // const newUrls = getUrlsFromHtml(htmlBody)
        // console.log(newUrls);
    } catch (err){
        console.log(`error in fetch: "${err.message}" on page ${currentUrl}`)
        return
    }
    // normalizedUrl = normal
}

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
        try{
            const normalizedUrl = normalizeUrl(url)
            urls.push(normalizedUrl);
        }catch(err){
            console.log(`Error ${err.message} with url: ${url}`)
        }
    });
    console.log(urls)
    return urls
}

module.exports = { 
    normalizeUrl,
    getUrlsFromHtml,
    crawlPage
};