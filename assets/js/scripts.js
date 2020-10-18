
window.addEventListener('DOMContentLoaded', () => {

    
    

    // For All Channel
    fetch('api/read-channels.php')
        .then(res => res.json())
        .then(data => {
            checkChannelCookieAndRender(data)
        })
        .catch(err => console.log(err))
})

function checkChannelCookieAndRender(channels){
    let channelCookieStatuses = new Array(0)
    channels.data.forEach(channel => {
        fetch('api/check-channel-cookie.php', {
            method: 'POST',
            body: JSON.stringify({channel_id: channel.id})
          })
            .then( res => res.json())
            .then( data => {
                channelCookieStatuses.push(data.status)
                if(channels.data.length === channelCookieStatuses.length) {
                    renderChannels(channels, channelCookieStatuses)
                }
            })
            .catch( err => console.log(err))
    })
}



function renderChannels(channels, cookieStatuses) {
    channels.data.forEach((channel, index) => {
        
        let ratingContainer = '';
        if (cookieStatuses[index] == 'unset') {
            ratingContainer = `<div>
                  <div class="give">
                    <i class="fas fa-star give-rating"></i>
                    <i class="fas fa-star give-rating"></i>
                    <i class="fas fa-star give-rating"></i>
                    <i class="fas fa-star give-rating"></i>
                    <i class="fas fa-star give-rating"></i>
                  </div>
                </div>
            `
        }
        const parser = new DOMParser();
        const parsedDocument = parser.parseFromString(`
          <div class="grid-item">
            <div class="card-container">
              <div class="upper-container">
                <div id="discount" class="discounts">${Math.round(channel.rating * 10) / 10}</div>
                <div class="image-container">
                  <img id="imgLink" src=${channel.logo_url} />
                </div>
              </div>

              <div class="lower-container">
                <div>
                  <h3 id="titles">${channel.title}</h3>
                  <h4>Front-end Developer</h4>
                </div>
                ${ratingContainer}
                <div>
                  <a href=${channel.channel_url} class="btn" id="btn_link"> View profile</a>
                </div>
              </div>
            </div>
          </div>`, "text/html"); document.getElementById('grid').appendChild(parsedDocument.body);
    })
}



// These functions will be called after click event on star

function createChannelCookie(channelId, rating) {
    fetch('api/create-channel-cookie.php', {
        method: 'POST',
        body: JSON.stringify({channel_id: channelId})
      }) 
        .then( res => res.json())
        .then( data => {
            if (data.status === 'set') {
                createNewRating(channelId, rating);
            }
            
        })
        .catch( err => console.log(err))
}

function createNewRating(channelId, rating) {
    fetch('api/create-rating.php', {
        method: 'POST',
        body: JSON.stringify({
            channel_id: channelId, 
            rating: rating
        })
      }) 
        .then( res => res.json())
        .then( data => {
            if (data.status === 'Rating Inserted') {
                updateNewRating(channelId)
                // Have to hide The rating container
            }
            
        })
        .catch( err => console.log(err))
}



function updateNewRating(channelId) {
    fetch('api/read-single-channel.php', {
        method: 'POST',
        body: JSON.stringify({channel_id: channelId})
      }) 
        .then( res => res.json())
        .then( data => {
            if (data.status === 'Channel Found') {
//                console.log(data.data.rating)
                // have to update the rating in DOM
            }
            
        })
        .catch( err => console.log(err))
}