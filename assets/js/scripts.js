function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
  
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

window.addEventListener('DOMContentLoaded', () => {
    fetch('api/read-channels.php')
        .then(res => res.json())
        .then(data => checkChannelCookieAndRender(data))
        .catch(err => console.log(err))
})

function checkChannelCookieAndRender(channels) {
    let channelCookieStatuses = new Array(channels.length)
    let iCount = 0
    channels.data.forEach(channel => {
        let channelName = `yfyc-${channel.id}`;
        getCookie(channelName).length ? channelCookieStatuses[channel.id - 1] = "set" : channelCookieStatuses[channel.id - 1] = "unset";
        if (++iCount == 15) renderChannels(channels, channelCookieStatuses)
    })
}

function renderChannels(channels, cookieStatuses) {
    channels.data.forEach((channel, index) => {
        let ratingNANCheck = 'N/R'
        let ratingContainer = ''
        if (channel.rating) ratingNANCheck = `${Math.round(channel.rating * 10) / 10}/5`
        if (cookieStatuses[index] == 'unset') {
            ratingContainer = `
                <div class="give">
                    <i class="fas fa-star give-rating"></i>
                    <i class="fas fa-star give-rating"></i>
                    <i class="fas fa-star give-rating"></i>
                    <i class="fas fa-star give-rating"></i>
                    <i class="fas fa-star give-rating"></i>
                </div>
            `
        }
        const parser = new DOMParser();
        const parsedDocument = parser.parseFromString(`
          <div class="channel">
            <span class="avg-rating">${ratingNANCheck}</span>
            <img class="img"  src=${channel.logo_url} />
            <a href=${channel.channel_url} class="title">${channel.title}</a>
            ${ratingContainer}
          </div>`, "text/html");
        document.getElementById('channels').appendChild(parsedDocument.getElementsByTagName('div')[0], true);
    })
    starCounter();
}

function starCounter() {
    document.querySelectorAll('.channel').forEach((starContainer, index) => {
        starContainer.addEventListener('click', (e) => {
            let count = 1
            if (e.target.tagName == 'path' || e.target.tagName == 'svg') {
                if (e.target.tagName == 'path') e.target.parentElement.parentElement.id = 'clicked'
                if (e.target.tagName == 'svg') e.target.parentElement.id = 'clicked'
                let ratingCount = e.target.closest('div.channel').querySelector('span.avg-rating')
                console.log(ratingCount)
                let currentStar = e.target.parentElement
                while (currentStar.previousElementSibling) {
                    currentStar = currentStar.previousElementSibling
                        ++count
                }
                createChannelCookie(index, count, ratingCount)
            } else {
                console.log(e.target.tagName)
            }
        })
    })
}


function createChannelCookie(channelId, rating, ratingCount) {
    let channelName = `yfyc-${channelId + 1}`;
    setCookie(channelName, true, 365);
    createNewRating(channelId, rating, ratingCount);
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
                document.querySelector('#clicked').style.visibility = 'hidden';
                document.querySelector('#clicked').id = '';
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
                ratingCount.innerText = `${ Math.round(newRating * 10) / 10 }/5`
            }

        })
        .catch(err => console.log(err))
}
