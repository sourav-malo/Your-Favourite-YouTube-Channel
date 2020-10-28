window.addEventListener('DOMContentLoaded', () => {




  // For All Channel
  fetch('api/read-channels.php')
    .then(res => res.json())
    .then(data => {
      checkChannelCookieAndRender(data)
    })
    .catch(err => console.log(err))
})

function checkChannelCookieAndRender(channels) {
  let channelCookieStatuses = new Array(0)
  channels.data.forEach(channel => {
    fetch('api/check-channel-cookie.php', {
      method: 'POST',
      body: JSON.stringify({ channel_id: channel.id })
    })
      .then(res => res.json())
      .then(data => {
        channelCookieStatuses.push(data.status)
        if (channels.data.length === channelCookieStatuses.length) {
          renderChannels(channels, channelCookieStatuses)
        }
      })
      .catch(err => console.log(err))
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
                <div class="discounts">${Math.round(channel.rating * 10) / 10}</div>
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
          </div>`, "text/html"); document.getElementById('grid').appendChild(parsedDocument.getElementsByTagName('div')[0], true);
  })
  setStarClickEvent();
}

function setStarClickEvent() {
  document.querySelectorAll('.give').forEach(starContainer => starContainer.addEventListener('click', starCounter))
}
function setStarClickEvent() {
  //rating selection
  document.querySelector('.give').addEventListener('click', function (e) {
    let action = 'add';
    for (const i of this.children) {
      i.classList[action]('active');
      if (i === e.target) action = 'remove';
    }
  });
  document.querySelectorAll('.give').forEach(function (starContainer, index) {
    starContainer.addEventListener('click', (e) => {
      let count = 1;
      if (e.target.classList.contains('fas')) {
        e.target.parentElement.id = 'clicked'; // added
        let ratingCount = e.target.closest('div.grid-item').querySelector('div.discounts')
        let currentStar = e.target;
        while (currentStar.previousElementSibling) {
          currentStar = currentStar.previousElementSibling
          ++count
        }
        createChannelCookie(index + 1, count, ratingCount);
        console.log(ratingCount.innerHTML)
      }
      //      console.log(count)
      //      console.log(index);




    })
  })
}



// These functions will be called after click event on star

function createChannelCookie(channelId, rating, ratingCount) {
  fetch('api/create-channel-cookie.php', {
    method: 'POST',
    body: JSON.stringify({ channel_id: channelId })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'set') {
        createNewRating(channelId, rating, ratingCount);
      }

    })
    .catch(err => console.log(err))
}

function createNewRating(channelId, rating, ratingCount) {
  fetch('api/create-rating.php', {
    method: 'POST',
    body: JSON.stringify({
      channel_id: channelId,
      rating: rating
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'Rating Inserted') {
        //hiding star container
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
    body: JSON.stringify({ channel_id: channelId })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'Channel Found') {
        let newRating = data.data.rating;
        ratingCount.innerText = `${ Math.round(newRating * 10) / 10 }`
        // console.log(data.data.rating);
        // have to update the rating in DOM

      }

    })
    .catch(err => console.log(err))
}