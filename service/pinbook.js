const {readFileSync} = require("fs");



const sortdescending = (prop) => {
    return function(a, b) {
        return a[prop].localeCompare(b[prop]);
    };
};

const constructHighest = (graph) => {
    const max = graph.reduce((prev, current)=> ( (prev.views > current.views) ? prev : current),0) //returns object
    var mid = max.views/2;
    var json = '"highest": ['
    for(var i = 0; i < graph.length; i++){
        const data = graph[i];
        if(data.views > mid){
            json += '{"views": "'+data.views+'", "active": "'+data.active+'", "date": "'+data.date+'", "id": "'+data.id+'", "destination_url": "'+data.destination_url+'", "impression_1": "'+data.impression_1+'", "impression_2": "'+data.impression_2+'", "clicks": "'+data.clicks+'"}';
            if(graph.length - 2 !== i){
                json += ",";
            }
        }
    }
    json += ']';
    return json;
};

const constructLowest = (graph) => {
    const max = graph.reduce((prev, current)=> ( (prev.views > current.views) ? prev : current),0) //returns object
    var mid = max.views/2;
    var json = '"lowest": ['
    for(var i = 0; i < graph.length; i++){
        const data = graph[i];
        if(data.views < mid){
            json += '{"views": "'+data.views+'", "active": "'+data.active+'", "date": "'+data.date+'", "id": "'+data.id+'", "destination_url": "'+data.destination_url+'", "impression_1": "'+data.impression_1+'", "impression_2": "'+data.impression_2+'", "clicks": "'+data.clicks+'"}';
            if(graph.length - 1 !== i){
                json += ",";
            }
        }
    }
    json += ']';
    return json;
};

const check_if_url_has_nbt_query_param = (url) => {
    let result = false;

    if (url == null) {
        return result;
    }
    const parse = new URL(url);
    if (parse.search.includes('nbt_platform=PinBook')) {
        result = true;
    }
    return result;
};

const loadJSON = () => {
    let pinBook = JSON.parse(readFileSync('./data/pinbook_data.json'));
    return pinBook;
};

const list_ids_of_ad_objects_without_nbt_platform_query_param = () => {
    let json = loadJSON();
    const books = [];

    json = json.sort(sortdescending('id'));
    json.forEach((x) => {
        if (check_if_url_has_nbt_query_param(x.destination_url) === true) {
            books.push(x);
        }
    });
    return books;
};

const create_advertisement_report = () => {
    let ad_list = list_ids_of_ad_objects_without_nbt_platform_query_param();

    const map = new Map();
    const message = [];

    ad_list.forEach(e => {
        if (check_if_url_has_nbt_query_param(e.destination_url) === true) {
            var ads = map.get(e.id) || {
                id: e.id,
                count: 0,
                clicks: 0,
                url: e.destination_url,
                views: 0
            };

            ads.clicks += e.clicks;
            ads.url = e.destination_url;
            if (e.active) {
                ads.count++;
                // considered impressions as views
                ads.views += typeof(e.impression_1) !== 'undefined' ? e.impression_1 : 0; //good impression
                ads.views += typeof(e.impression_2) !== 'undefined' ? e.impression_2 : 0; //bad impression
            }
            map.set(ads.id, ads);
        }
    })

    for ([key, value] of map.entries()) {
        message.push({"message": "Advertisement with ID " + value.id + " has received " + value.views + " views, " + value.clicks + " clicks, and ran for " + value.count + " days"});
    }
    // msg=;
    return message;
};

const create_advertisement_report_graph = (req) => {
    const graph = [];
    var result = [];
    let advertisement = loadJSON();
    const map = new Map();

    advertisement.forEach(e => {
        var ads = map.get(e.id) || {
            id: e.id,
            url: e.destination_url,
            data: e.date,
            active: e.active,
            views: 0,
            clicks: e.clicks,
            impression_1: e.impression_1,
            impression_2: e.impression_2
        };

        ads.date = e.date;
        ads.active = e.active;
        ads.clicks += e.clicks;
        ads.url = e.destination_url;
        ads.impression_1 = e.impression_1;
        ads.impression_2 = e.impression_2;

        if (e.active) {
            ads.views += typeof(e.impression_1) !== 'undefined' ? e.impression_1 : 0; //good impression
            ads.views += typeof(e.impression_2) !== 'undefined' ? e.impression_2 : 0; //bad impression
        }
        map.set(ads.id, ads);
    })

    for ([key, value] of map.entries()) {
        graph.push({
            'views': value.views,
            'active': value.active,
            'date': value.date,
            'id': value.id,
            'destination_url': value.url,
            'impression_1': value.impression_1,
            'impression_2': value.impression_2,
            'clicks': value.clicks
        });
    }

    const highest = constructHighest(graph);
    const lowest = constructLowest(graph);
    
    var construct = "{"+highest+","+lowest+"}";

    result.push(JSON.parse(construct));
    

    return result;
};

module.exports = {
    check_if_url_has_nbt_query_param,
    loadJSON,
    list_ids_of_ad_objects_without_nbt_platform_query_param,
    create_advertisement_report,
    create_advertisement_report_graph
};