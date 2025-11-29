const { crawlPage } = require("./crawl");

async function main(){
    if (process.argv.length < 3){
        console.log("No website provided");
        process.exit(1);
    }
    if(process.argv.length > 3){
        console.log("Provide only one website at once")
        process.exit(1);
    }

    const baseURL = process.argv[2];
    console.log(`Starting crawl of ${baseURL}`)
    const pages = await crawlPage(baseURL, baseURL, {})
      
    console.log("Here are all the pages found:")
    for (const page of Object.entries(pages)){
        console.log(page)
    }
}

main()

//testing it with npm start https://wagslane.dev