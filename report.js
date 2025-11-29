function createReport(pages){
    pagesArr = sortPages(pages);
    console.log(`==================\nREPORT\n==================`)
    pagesArr.forEach(page => {
        console.log(`${page[1]} mention(s) found for ${page[0]} URL`)
    });
    console.log(`==================\nEND REPORT\n==================`)
}
function sortPages(pages) {
    const pagesArr = Object.entries(pages);
    pagesArr.sort((a,b) =>{

        return b[1] - a[1]
    })
    return pagesArr
}

module.exports = {sortPages, createReport}