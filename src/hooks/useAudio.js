import React, { useState, useEffect, useRef } from "react";
import { useIPFS } from "./useIPFS"; 

const useAudio = (url) => {
  const {resolveLink} = useIPFS();
  const [audio, setAudio] = useState(url);
  const [trackIndex, setTrackIndex] = useState(0); //this is used to keep track of the album
  const [newSong, setNewSong] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0); //to keep track of the duration of the song
  const [isPlaying, setIsPlaying] = useState(false); //to identify if the player is on or not.
  const [volume, setVolume] = useState(1); //to give us the volume.
  const audioRef = useRef(new Audio(resolveLink(JSON.parse(audio[trackIndex].metadata).animation_url))); //this will give us the current audio
  
  const intervalRef = useRef(); //to increment the duration of the audio being played
  const isReady = useRef(false);

  const { duration } = audioRef.current;

  const toPrevTrack = () => { //if you want to go to the previous track by decrementing the index
    if (trackIndex - 1 < 0) {
      setTrackIndex(audio.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };

  const toNextTrack = () => {//if you want to go to the next track by incrementing the index
    if (trackIndex < audio.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };

  useEffect(() => { //to toggle if we are playing an audio or not (isPlaying)
    toggle();
    setAudio(url);
    if(trackIndex === 0){
      setNewSong(newSong+1)
    }else{
      setTrackIndex(0);
    }
  }, [url]); 

  useEffect(() => { //for playing the next track
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      clearInterval(intervalRef.current);
      audioRef.current.pause();//to pause the track
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    audioRef.current.pause(); //pause
    audioRef.current = new Audio(resolveLink(JSON.parse(audio[trackIndex].metadata).animation_url)); //next track
    audioRef.current.volume = volume; //adjust volume
    setTrackProgress(Math.round(audioRef.current.currentTime)); //set the track progress to 0
    if (isReady.current) { //if isReady then play the track
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [trackIndex, newSong]);

  const toggle = () => setIsPlaying(!isPlaying);

  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {//if the track duration ended, go to the next track
      if (audioRef.current.ended) {
        toNextTrack();
      } else {//or else keep incrementing the timer
        setTrackProgress(Math.round(audioRef.current.currentTime));
      }
    }, [1000]);
  };

  const onSearch = (value) => { //to move the track slider as you want
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  }

  const onSearchEnd = () => {//after moving the slider the track will start automaticlly playing
    if (!isPlaying) {
        setIsPlaying(true);
      }
      startTimer();
  } 

  const onVolume = (vol) => {//to move the volume slider
      setVolume(vol);
      audioRef.current.volume = vol;
  };

  return [isPlaying, duration,toggle, toNextTrack, toPrevTrack, trackProgress, onSearch, onSearchEnd, onVolume, trackIndex];
};

export default useAudio;