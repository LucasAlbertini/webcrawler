const { crawlPage } = require("./crawl");

function main(){
    if (process.argv.length < 3){
        console.log("No website provided");
        process.exit(1);
    }
    if(process.argv.length > 3){
        console.log("Provide only one website at once")
        process.exit(1);
    }

    const providedUrl = process.argv[2];
    console.log(`Starting crawl of ${providedUrl}`)
    crawlPage(providedUrl)

}


main()