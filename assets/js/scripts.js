
window.addEventListener('DOMContentLoaded', () => {

    
    createChannelCookie(4)  // For Test 

    // For All Channel
    fetch('http://localhost/Your-Favourite-YouTube-Channel/api/read-channels.php')
        .then(res => res.json())
        .then(data => {
            checkChannelCookieAndRender(data)
        })
        .catch(err => console.log(err))
})

function checkChannelCookieAndRender(channels){
    let channelCookieStatuses = new Array(0)
    channels.data.forEach(channel => {
        fetch('http://localhost/Your-Favourite-YouTube-Channel/api/check-channel-cookie.php', {
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



// Create Channel Cookie 
// This function will be called after click event on star

function createChannelCookie(channelId) {
    fetch('http://localhost/Your-Favourite-YouTube-Channel/api/create-channel-cookie.php', {
        method: 'POST',
        body: JSON.stringify({channel_id: channelId})
      }) 
        .then( res => res.json())
        .then( data => {
            console.log(data)
            // checkCookie(1)
        })
        .catch( err => console.log(err))
}

// function checkCookie(channelId) { // This function is for test
//     fetch('http://localhost/Your-Favourite-YouTube-Channel/api/check-channel-cookie.php', {
//             method: 'POST',
//             body: JSON.stringify({channel_id: channelId})
//       })
//         .then( res => res.json())
//         .then( data => {
//             console.log(data)
//         })
//         .catch( err => console.log(err))
// }