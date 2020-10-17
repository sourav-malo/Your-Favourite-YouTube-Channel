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
        .then( res => res.json())
        .then( data => {
            myFunction(data)
        })
        .catch( err => console.log(err))
})

function myFunction(channels){
    console.log(channels); 
}