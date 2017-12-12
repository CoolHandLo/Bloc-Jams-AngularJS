(function() {
  function SongPlayer(Fixtures) {

    // @desc
    // @type
    var SongPlayer = {};

    // @desc
    // @type
    var currentAlbum = Fixtures.getAlbum();

    // @desc Buzz object audio file
    // @type {Object}
    var currentBuzzObject = null;

    // @function setSong
    // @desc Stops currently playing song and loads new audio file as currentBuzzObject
    // @param {Object} song
    var setSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      SongPlayer.currentSong = song;
    };

    // @function playSong
    // @desc
    // @parm {Object} song
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    };

    // @function getSongIndex
    // @desc
    // @parm {Object} song
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };

    // @desc Active song object from list of songs
    // @type {object}
    SongPlayer.currentSong = null;


    // @function
    // @desc
    // @parm {Object} song
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong!== song) {
        setSong(song);
        playSong(song);
      } else if (SongPlayer.currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          playSong(song);
        }

      }
    };

    // @function
    // @desc
    // @parm {Object} song
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    // @function
    // @desc
    // @parm
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    return SongPlayer;
  };

  angular
    .module('blocJams')
    .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
