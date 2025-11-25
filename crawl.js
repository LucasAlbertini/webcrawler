function normalizeUrl(urlString) {
    const urlObject = new URL(urlString); //URL constructor already lowercase it all
    var hostName = `${urlObject.hostname}${urlObject.pathname}`;
    if (hostName.endsWith('/')) {
        hostName = hostName.slice(0, -1);
    }
    return hostName;
}

module.exports = { 
    normalizeUrl 
};