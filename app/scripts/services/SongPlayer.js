(function() {
  function SongPlayer(Fixtures) {

    // @desc SongPlayer declaration
    // @type {object}
    var SongPlayer = {};

    // @desc Active album from collection
    // @type {object} album
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
        SongPlayer.currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      SongPlayer.currentSong = song;
    };

    // @function playSong
    // @desc Plays selected song
    // @parm {Object} song
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    };

    // @function stopSong
    // @desc Stops playing selected song
    // @parm {Object} song
    var stopSong = function(song) {
      currentBuzzObject.stop();
      song.playing = null;
    };

    // @function getSongIndex
    // @desc Finds index of song in album
    // @parm {Object} song
    // @return Index of song in album
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };

    // @desc Active song object from list of songs
    // @type {object}
    SongPlayer.currentSong = null;


    // @function play
    // @desc Play current or new song
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

    // @function pause
    // @desc Pause current song
    // @parm {Object} song
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = null;
    };

    // @function previous
    // @desc Plays previous song in album
    // @parm
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
        stopSong(song);
        // currentBuzzObject.stop();
        // SongPlayer.currentSong.playing = null;
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    // @function next
    // @desc Plays next song in album
    // @parm
    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if (!currentSongIndex) {
        stopSong(song);
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
