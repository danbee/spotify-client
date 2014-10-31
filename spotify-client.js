if (Meteor.isClient) {
  Template.body.helpers({
    songs: function () {
      return Session.get('songs')
    }
  })

  Template.body.events({
    "submit .search": function (event) {
      event.preventDefault()

      q = event.target.q.value

      if (q) {
        HTTP.call('get', 'https://api.spotify.com/v1/search', {
          params: { type: 'track', market: 'GB', q: q }
        }, function (error, result) {
          if (!error) {
            tracks = []

            items = JSON.parse(result.content).tracks.items

            items.forEach(function (item) {
              tracks.push({
                artist: item.artists.map(function (artist) {
                  return artist.name
                }).join(', '),
                album: item.album.name,
                title: item.name,
                image: item.album.images[2].url
              })
              console.log(item)
            })

            Session.set('songs', tracks)
          }
        })
      }
    }
  })
}
