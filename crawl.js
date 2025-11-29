const { JSDOM } = require('jsdom');

async function crawlPage(baseURL, currentURL, pages){   
    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(currentURL);
    if(baseURLObj.hostname !== currentURLObj.hostname){
        //ignore it
        return pages
    }
    const normalizedCurrentURL = normalizeUrl(currentURL);
    if(pages[normalizedCurrentURL] > 0){
        pages[normalizedCurrentURL]++
        return pages;
    }
    pages[normalizedCurrentURL] = 1
    console.log(`actively crawling ${currentURL}`);

    try{
        const resp = await fetch(currentURL)
        if(resp.status > 399){
            console.log(`error in fetch with status code: ${resp.status} on page: ${currentURL}`)
            return pages
        }
        const contentType = resp.headers.get("content-type")
        if(!contentType.includes("text/html")){
            console.log(`non html response, content type: "${contentType}" on page: ${currentURL}`)
            return pages
        }

        const htmlBody = await resp.text()
        const nextURLs = getUrlsFromHtml(htmlBody, baseURL)
        for (const nextURL of nextURLs){
            pages = await crawlPage(baseURL, nextURL, pages) // Never forget to add await into async functions
        };

    } catch (err){
        console.log(`error in fetch: "${err.message}" on page ${currentURL}`)
        return
    }

    return pages
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

function getUrlsFromHtml(htmlBody, baseURL){
  const urls = []
  const dom = new JSDOM(htmlBody)
  const aElements = dom.window.document.querySelectorAll('a')
  aElements.forEach(aElement => {
    if (aElement.href.startsWith('/')){
      try {
        urls.push(new URL(aElement.href, baseURL).href)
      } catch (err){
        console.log(`${err.message}: ${aElement.href}`)
      }
    } else {
      try {
        urls.push(new URL(aElement.href).href)
      } catch (err){
        console.log(`${err.message}: ${aElement.href}`)
      }
    }
  });
  return urls
}

module.exports = { 
    normalizeUrl,
    getUrlsFromHtml,
    crawlPage
};