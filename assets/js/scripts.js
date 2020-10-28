window.addEventListener('DOMContentLoaded', () => {
    fetch('api/read-channels.php')
        .then(res => res.json())
        .then(data => checkChannelCookieAndRender(data))
        .catch(err => console.log(err))
})

async function checkChannelCookieAndRender(channels) {
    let channelCookieStatuses = new Array(channels.length)
    let iCount = 0
    channels.data.forEach(async channel => {
        await fetch('api/check-channel-cookie.php', {
                method: 'POST',
                body: JSON.stringify({
                    channel_id: channel.id
                })
            })
            .then(res => res.json())
            .then(data => {
                channelCookieStatuses[channel.id - 1] = data.status
                if (++iCount == 15) renderChannels(channels, channelCookieStatuses)
            })
            .catch(err => console.log(err))
    })
}



async function renderChannels(channels, cookieStatuses) {

    channels.data.forEach((channel, index) => {
        let ratingNANCheck = ''
        let ratingContainer = ''
        if (channel.rating) ratingNANCheck = Math.round(channel.rating * 10) / 10
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
                <div class="discounts">${ratingNANCheck}</div>
                <div class="image-container">
                  <img  src=${channel.logo_url} />
                </div>
              </div>

              <div class="lower-container">
                <div>
                  <h3>${channel.title}</h3>
                  <h4>Front-end Developer</h4>
                </div>
                ${ratingContainer}
                <div>
                  <a href=${channel.channel_url} class="btn"> View profile</a>
                </div>
              </div>
            </div>
          </div>`, "text/html");
        document.getElementById('grid').appendChild(parsedDocument.getElementsByTagName('div')[0], true);
    })
    starCounter();
}

function starCounter() {
    document.querySelectorAll('.grid-item').forEach((starContainer, index) => {
        starContainer.addEventListener('click', (e) => {
            let count = 1
            if (e.target.classList.contains('fas')) {
                e.target.parentElement.id = 'clicked';
                let ratingCount = e.target.closest('div.grid-item').querySelector('div.discounts')
                let currentStar = e.target
                while (currentStar.previousElementSibling) {
                    currentStar = currentStar.previousElementSibling
                        ++count
                }
                createChannelCookie(index, count, ratingCount)
            }
        })
    })
}



// These functions will be called after click event on star

function createChannelCookie(channelId, rating, ratingCount) {
    fetch('api/create-channel-cookie.php', {
            method: 'POST',
            body: JSON.stringify({
                channel_id: channelId + 1
            })
        })
        .then(res => res.json())
        .then(data => {
            createNewRating(channelId, rating, ratingCount)
        })
        .catch(err => console.log(err))
}



function createNewRating(channelId, rating, ratingCount) {
    fetch('api/create-rating.php', {
            method: 'POST',
            body: JSON.stringify({
                channel_id: channelId + 1,
                rating: rating
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'Rating Inserted') {
                document.querySelector('#clicked').style.visibility = 'hidden'; // added 
                document.querySelector('#clicked').id = ''; // added
                updateNewRating(channelId, ratingCount);
            }

        })
        .catch(err => console.log(err))
}



function updateNewRating(channelId, ratingCount) {
    fetch('api/read-single-channel.php', {
            method: 'POST',
            body: JSON.stringify({
                channel_id: channelId + 1
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'Channel Found') {
                let newRating = data.data.rating;
                ratingCount.innerText = `${ Math.round(newRating * 10) / 10 }`
            }

        })
        .catch(err => console.log(err))
}
