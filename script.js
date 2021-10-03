function getAnimes(event)
{
    if(event.keyCode == 13)
    {
        const filterBox = document.getElementById('filter-box');
        filterBox.innerHTML = ''
        const animeName = document.getElementById('anime-search-box').value;
        displayAnime(animeName)
    }
}




async function displayAnime(animeName,type)
{
    const filterBox = document.getElementById('filter-box');
    const msgBox = document.getElementById('msg-box');
    msgBox.innerHTML = `<h5>Loading...</h5>`
    const moviePoster = document.getElementById('movie-poster');
    moviePoster.innerHTML = '';
    let data;
    let jsonData;
    try{
        if(!type)
        {
            data = await fetch(`https://api.jikan.moe/v3/search/anime?q=${animeName}&page=1`)
        }
        else{
            data = await fetch(`https://api.jikan.moe/v3/search/anime?q=${animeName}&order_by=${type}&sort=desc&page=1`)
        }
    }catch{

        msgBox.innerHTML = `<h5>No results found</h5>`
        alert('Try loading this page after some time')
    }
    jsonData = await data.json()
    let {results} = jsonData;
   
    if (results)
    {
        filterBox.innerHTML = ` <button onclick="displayAnime('${animeName}','score')">Top Rated</button>
        <button onclick="displayAnime('${animeName}','members')">Most Popular</button>`
        msgBox.innerHTML = `<h5>Anime Results... <b> ${animeName} </b></h5>`
        for (i in results)
        {
            let {title,image_url,type,start_date,end_date,score,url} = results[i];
            if (start_date == null)
            {
                start_date = 'Not started yet'
            }
            else{
                let temp = start_date.split('T');
                start_date = temp[0];
            }
            if (end_date == null)
            {
                end_date = 'Not ended yet'
            }
            else{
                let temp= end_date.split('T')
                end_date = temp[0];
            }
            if(score == 0)
            {
                score = 'Yet to be rated'
            }
        // console.log(title,image_url,type,start_date[0],end_date[0],score)

            moviePoster.innerHTML += `<div class="col-md-6 col-lg-4 mt-3 total-container">
            <div class="row anime-card">
            <div class="col-5">
            <a href = "${url}" target = '_blank'>
                <img src="${image_url}" alt="">
            </a>
            </div>
            <div class="col-7">
                <a href = "${url}" target = '_blank'>
                <h4>${title}</h4>
                </a>
                <p><b>Type       :</b>${type}</p>
                <p><b>IMDB       :</b>${score}</p>
                <p><b>Start Date :</b>${start_date}</p>
                <p><b>End Date   :</b>${end_date}</p>
            </div>
            </div>
             </div> `
        }
    }
    else{
   
        msgBox.innerHTML = `<h5>No results found</h5>`
     
    }
    document.getElementById('anime-search-box').value = ''
    
}




