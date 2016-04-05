var express = require('express'),
    app = express(),
    mongo = require('mongodb').MongoClient,
    dbUrl = process.env.PROD_MONGODB, // db adress //'mongodb:' + process.env.IP + '/data',
    accountKey = process.env.ACC_KEY, // bing account key
    Search = require('bing.search');


app.get('/',function(req, res){
    // simple string rendered index page for instructions
    var url = req.get('host')
    
    var str = "FreeCodeCamp Image Search Abstraction Layer \n" +
      "https://www.freecodecamp.com/challenges/image-search-abstraction-layer\n\n" +
      "example usage: \n" +
      url + "/search/lolcats?offset=1 \n\n" +
      "example response: \n" +
      JSON.stringify([{"url":"http://3.bp.blogspot.com/-dZNLWrpHVdQ/UG4PoBq4NLI/AAAAAAAAA_c/6Yt4S1CgiiQ/s1600/LOLCATS2.jpg","thumbnail":"http://ts1.mm.bing.net/th?id=OIP.Mfd5277f94e51db29d51cf91014d333ccH0&pid=15.1","context":"http://rosey675.blogspot.com/2012/10/lolcats.html","snippet":"Rosey675's Weirdly Awesome Panfu Blog: LOLcats"},{"url":"http://funnypicture.org/wallpaper/2015/06/lolcats-35-widescreen-wallpaper.jpg","thumbnail":"http://ts1.mm.bing.net/th?id=OIP.Mdca807c4e35d7137c3648d432ef945bbo0&pid=15.1","context":"http://funnypicture.org/lolcats-22-wide-wallpaper.html","snippet":"Lolcats 22 Wide Wallpaper - Funnypicture.org"},{"url":"http://1.bp.blogspot.com/-WiD3qOHgN4A/Ta9-WHrYJAI/AAAAAAAAAK0/QWsz104Dmr0/s1600/lolcats.png","thumbnail":"http://ts1.mm.bing.net/th?id=OIP.Mf7d52d7be72954bdbfc72a1c354dd059H0&pid=15.1","context":"http://omgtehmeme.blogspot.com/p/lolcats.html","snippet":"Blog not found"},{"url":"http://4.bp.blogspot.com/-epxUtTpidgM/Tl0LrfIwPOI/AAAAAAAAdOY/rwZA0Zb_jWg/s1600/lolcats5.jpg","thumbnail":"http://ts1.mm.bing.net/th?id=OIP.Mb796e2f7a6f4001d32c898791a7c4921H0&pid=15.1","context":"http://coolanimalspics.blogspot.com/2011/08/hilarious-lolcats.html","snippet":"Hilarious LOLcats Seen On www.coolpicturegallery.us"},{"url":"http://stwww.bikemag.com/files/2012/05/lolcats2.jpg","thumbnail":"http://ts3.mm.bing.net/th?id=OIP.M02b50de603c52020ffbb037dc1d1a49aH0&pid=15.1","context":"http://www.destuan.tk/lolcats.html","snippet":"10 Types Lolcats"},{"url":"http://fc01.deviantart.net/fs22/f/2007/321/3/d/lolcats_wallpaper1_by_antoniopratas.jpg","thumbnail":"http://ts4.mm.bing.net/th?id=OIP.Mec01420730a8b11667beb67767543537H0&pid=15.1","context":"http://galleryhip.com/lolcats.html","snippet":"Lolcats Lolcats wallpaper1 by"},{"url":"http://vignette1.wikia.nocookie.net/uncyclopedia/images/2/2a/Lolcats-mah-brutha.jpg/revision/latest?cb=20070726080107","thumbnail":"http://ts1.mm.bing.net/th?id=OIP.Mb05107c84fb2e2915edadd8322369960o0&pid=15.1","context":"http://uncyclopedia.wikia.com/wiki/User:Ceridwyn/Lolcats","snippet":"User:Ceridwyn/Lolcats - Uncyclopedia, the content-free encyclopedia"},{"url":"https://weekly.blog.gustavus.edu/slir/w328/wp-content/blogs.dir/20/files/2012/02/lolcats-e1330065121767.jpg","thumbnail":"http://ts2.mm.bing.net/th?id=OIP.M4a7afb97b28bb72299507dba33f3d2e8o0&pid=15.1","context":"https://weekly.blog.gustavus.edu/2012/02/24/a-guide-to-internet-memes/lolcats/","snippet":"LOLcats, a popular phenomenon that started in the early 2000s ..."},{"url":"http://resources3.news.com.au/images/2012/02/29/1226284/800415-lolcat-army.gif","thumbnail":"http://ts3.mm.bing.net/th?id=OIP.M3cc3ff3349e2a62fda4cb1d9ad8b9d97H0&pid=15.1","context":"http://www.couriermail.com.au/news/science-ignore-lolcats-and-you-ignore-humanity/story-e6frep26-1226351588276","snippet":"LOLcats - just give into it. Picture: Icanhazcheezburger.com Source ..."},{"url":"http://cdn1.smosh.com/sites/default/files/legacy.images/smosh-pit/122010/lolcat-thermometer.jpg","thumbnail":"http://ts4.mm.bing.net/th?id=OIP.Mf326986f2db8d547eb746054078235d5o0&pid=15.1","context":"http://www.smosh.com/smosh-pit/photos/30-best-lol-cats-ever","snippet":"Most LOLcats are from icanhascheezburger.com or LOLcats.com."}]) +
      "\n\nexample usage 2:\n\n" +
      url + "/latest \n\n" +
      "example response2: \n\n" +
      JSON.stringify([{"_id":"5703e31149fe53ba0dc90082","term":"cats","when":"Tue Apr 05 2016 16:08:49 GMT+0000 (UTC)"},{"_id":"5703e37f633e69a311614038","term":"cats","when":"Tue Apr 05 2016 16:10:39 GMT+0000 (UTC)"},{"_id":"5703e8268ecf039515481b3f","term":"carrots","when":"Tue Apr 05 2016 16:30:30 GMT+0000 (UTC)"},{"_id":"5703e8cdf1466f9e1927cd61","term":"carrots","when":"Tue Apr 05 2016 16:33:17 GMT+0000 (UTC)"},{"_id":"5703e8daf1466f9e1927cd62","term":"carrots","when":"Tue Apr 05 2016 16:33:30 GMT+0000 (UTC)"},{"_id":"5703e9fef1466f9e1927cd63","term":"lolcats","when":"Tue Apr 05 2016 16:38:22 GMT+0000 (UTC)"}]);
 
    res.end(str);
})
    

app.get('/latest', function(req, res) {
    // return latest searches
    mongo.connect(dbUrl, function(err, db){
    if(err) throw err;
    
    var collection = db.collection('recentSearch');
    collection.find({}).toArray(function(err, data){
        if(err) throw err;
        
        res.json(data);
        res.end();
    });
        
        
    });
    
});

app.get('/search/:search', function(req, res) {
    // return search results
    var searchStr = req.params.search,
        offset;
    offset = parseInt(req.query.offset, 10) || 0;
    
    //add search to records
    mongo.connect(dbUrl, function(err, db){
      if(err) throw err;
      db.collection('recentSearch')
        .insert({
            'term': searchStr,
            'when': Date()
        });
    });
    
    var search = new Search(accountKey);
    
    search.images(searchStr, { 'top': 10, 'skip': offset }, function(err, results){
        if(err) throw err;
        
        results = results.map(function(result) {
            return {
                'url': result.url,
                'thumbnail': result.thumbnail.url,
                'context': result.sourceUrl,
                'snippet': result.title
                }
            });
            
        res.json(results);
        res.end();
        
    });
    
})

app.listen(process.env.PORT);