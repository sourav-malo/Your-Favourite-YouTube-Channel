window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Loaded')



    // For Single Channel
    /*fetch('http://localhost/Your-Favourite-YouTube-Channel/api/read-single-channel.php', {
        method: 'POST',
        body: JSON.stringify({channel_id: 13})
      }) 
        .then( res => res.json())
        .then( data => {
            console.log(data)
        })
        .catch( err => console.log(err))*/


    // For All Channel
    fetch('http://localhost/Your-Favourite-YouTube-Channel/api/read-channels.php')
        .then(res => res.json())
        .then(data => {
            myFunction(data)
        })
        .catch(err => console.log(err))
})

function myFunction(channels) {
    console.log(channels);
    channels.data.forEach(channel => {
        const parser = new DOMParser();
        const parsedDocument = parser.parseFromString(`
       
       
          <div class="grid-item">
            <div class="card-container">
              <div class="upper-container">
                <div id="discount" class="discounts">${channel.rating}</div>
                <div class="image-container">
                  <img id="imgLink" src=${channel.logo_url} />
                </div>
              </div>

              <div class="lower-container">
                <div>
                  <h3 id="titles">${channel.title}</h3>
                  <h4>Front-end Developer</h4>
                </div>
                <div>
                  <div class="give">
                    <i class="fas fa-star give-rating"></i>
                    <i class="fas fa-star give-rating"></i>
                    <i class="fas fa-star give-rating"></i>
                    <i class="fas fa-star give-rating"></i>
                    <i class="fas fa-star give-rating"></i>
                  </div>
                </div>
                <div>
                  <a href=${channel.channel_url} class="btn" id="btn_link"> View profile</a>
                </div>
              </div>
            </div>
          </div>
       
        
    `, "text/html");
        document.getElementById('grid').appendChild(parsedDocument.body);



    })



}