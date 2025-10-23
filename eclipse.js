(function(global) {
  'use strict';

  const Eclipse = {
    version: '1.0.0',
    sounds: {
      bassDrum: 'https://raw.githubusercontent.com/ilovecode17/Eclipse/main/sounds/bass_drum.mp3',
      snareDrum: 'https://raw.githubusercontent.com/ilovecode17/Eclipse/main/sounds/snare_drum.wav',
      snareDrumCross: 'https://raw.githubusercontent.com/ilovecode17/Eclipse/main/sounds/snare_drum(cross-stick).mp3',
      crashCymbal: 'https://raw.githubusercontent.com/ilovecode17/Eclipse/main/sounds/crash_cymbal.wav',
      rideCymbal: 'https://raw.githubusercontent.com/ilovecode17/Eclipse/main/sounds/ride_cymbal.wav',
      floorTom: 'https://raw.githubusercontent.com/ilovecode17/Eclipse/main/sounds/floor-tom.wav',
      highTom: 'https://raw.githubusercontent.com/ilovecode17/Eclipse/main/sounds/high_tom-tom.wav',
      lowTom: 'https://raw.githubusercontent.com/ilovecode17/Eclipse/main/sounds/low_tom-tom.wav',
      closedHiHat: 'https://raw.githubusercontent.com/ilovecode17/Eclipse/main/sounds/closed_hi-hat.wav',
      openHiHat: 'https://raw.githubusercontent.com/ilovecode17/Eclipse/main/sounds/open_hi-hat.wav',
      footHiHat: 'https://raw.githubusercontent.com/ilovecode17/Eclipse/main/sounds/foot_hi-hat.wav'
    },
    _audioContext: null,
    _buffers: {},
    _loadedCount: 0,
    _totalSounds: 0,
    _loadCallbacks: [],
    _loops: {},
    _loopIdCounter: 0,
    _sequences: {},
    _sequenceIdCounter: 0,

    init: function(callback) {
      if (!this._audioContext) {
        try {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          this._audioContext = new AudioContext();
        } catch (e) {
          console.error('Web Audio API not supported');
          return false;
        }
      }

      this._totalSounds = Object.keys(this.sounds).length;
      
      if (callback) {
        this._loadCallbacks.push(callback);
      }

      Object.keys(this.sounds).forEach(key => {
        this._loadSound(key, this.sounds[key]);
      });

      return this;
    },

    _loadSound: function(name, url) {
      const request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.responseType = 'arraybuffer';

      request.onload = () => {
        this._audioContext.decodeAudioData(request.response, (buffer) => {
          this._buffers[name] = buffer;
          this._loadedCount++;
          
          if (this._loadedCount === this._totalSounds) {
            this._loadCallbacks.forEach(cb => cb());
            this._loadCallbacks = [];
          }
        }, (error) => {
          console.error(`Error decoding ${name}:`, error);
        });
      };

      request.onerror = () => {
        console.error(`Error loading ${name}`);
      };

      request.send();
    },

    isReady: function() {
      return this._loadedCount === this._totalSounds;
    },

    play: function(soundName, options = {}) {
      if (!this._buffers[soundName]) {
        console.error(`Sound ${soundName} not loaded`);
        return null;
      }

      if (this._audioContext.state === 'suspended') {
        this._audioContext.resume();
      }

      const source = this._audioContext.createBufferSource();
      source.buffer = this._buffers[soundName];

      const gainNode = this._audioContext.createGain();
      gainNode.gain.value = options.volume !== undefined ? options.volume : 1.0;

      source.connect(gainNode);
      gainNode.connect(this._audioContext.destination);

      const startTime = options.delay !== undefined ? 
        this._audioContext.currentTime + options.delay : 
        this._audioContext.currentTime;

      source.start(startTime);

      if (options.duration) {
        source.stop(startTime + options.duration);
      }

      return source;
    },

    playMultiple: function(sounds, options = {}) {
      if (!Array.isArray(sounds)) {
        console.error('sounds must be an array');
        return [];
      }

      const sources = [];
      sounds.forEach((sound, index) => {
        const soundName = typeof sound === 'string' ? sound : sound.name;
        const soundOptions = typeof sound === 'object' ? { ...options, ...sound } : options;
        
        const source = this.play(soundName, soundOptions);
        if (source) {
          sources.push(source);
        }
      });

      return sources;
    },

    createLoop: function(sounds, options = {}) {
      const loopId = this._loopIdCounter++;
      const interval = options.interval || 500;
      const repetitions = options.repetitions || Infinity;
      const volume = options.volume !== undefined ? options.volume : 1.0;

      let currentRepetition = 0;
      let isPlaying = false;
      let timeoutId = null;
      let soundIndex = 0;

      const loop = {
        id: loopId,
        sounds: Array.isArray(sounds) ? sounds : [sounds],
        
        start: function() {
          if (isPlaying) return this;
          isPlaying = true;
          currentRepetition = 0;
          soundIndex = 0;
          this._scheduleNext();
          return this;
        },

        stop: function() {
          isPlaying = false;
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
          return this;
        },

        pause: function() {
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
          isPlaying = false;
          return this;
        },

        resume: function() {
          if (!isPlaying) {
            isPlaying = true;
            this._scheduleNext();
          }
          return this;
        },

        _scheduleNext: function() {
          if (!isPlaying) return;
          
          if (repetitions !== Infinity && currentRepetition >= repetitions) {
            this.stop();
            return;
          }

          const currentSound = this.sounds[soundIndex];
          const soundName = typeof currentSound === 'string' ? currentSound : currentSound.name;
          const soundOptions = typeof currentSound === 'object' ? 
            { volume, ...currentSound } : 
            { volume };

          Eclipse.play(soundName, soundOptions);

          soundIndex++;
          if (soundIndex >= this.sounds.length) {
            soundIndex = 0;
            currentRepetition++;
          }

          if (repetitions === Infinity || currentRepetition < repetitions) {
            timeoutId = setTimeout(() => this._scheduleNext(), interval);
          } else {
            this.stop();
          }
        },

        isPlaying: function() {
          return isPlaying;
        }
      };

      this._loops[loopId] = loop;
      return loop;
    },

    createSequence: function(pattern, options = {}) {
      const sequenceId = this._sequenceIdCounter++;
      const bpm = options.bpm || 120;
      const beatDuration = (60 / bpm) * 1000;
      const loop = options.loop !== undefined ? options.loop : false;
      const volume = options.volume !== undefined ? options.volume : 1.0;

      let isPlaying = false;
      let currentBeat = 0;
      let timeoutId = null;

      const sequence = {
        id: sequenceId,
        pattern: pattern,
        
        start: function() {
          if (isPlaying) return this;
          isPlaying = true;
          currentBeat = 0;
          this._playBeat();
          return this;
        },

        stop: function() {
          isPlaying = false;
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
          currentBeat = 0;
          return this;
        },

        pause: function() {
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
          isPlaying = false;
          return this;
        },

        resume: function() {
          if (!isPlaying) {
            isPlaying = true;
            this._playBeat();
          }
          return this;
        },

        _playBeat: function() {
          if (!isPlaying) return;

          const beat = this.pattern[currentBeat];
          
          if (beat) {
            if (Array.isArray(beat)) {
              Eclipse.playMultiple(beat.map(s => ({ name: s, volume })));
            } else if (typeof beat === 'string') {
              Eclipse.play(beat, { volume });
            } else if (typeof beat === 'object') {
              Eclipse.play(beat.name, { volume, ...beat });
            }
          }

          currentBeat++;
          
          if (currentBeat >= this.pattern.length) {
            if (loop) {
              currentBeat = 0;
              timeoutId = setTimeout(() => this._playBeat(), beatDuration);
            } else {
              this.stop();
            }
          } else {
            timeoutId = setTimeout(() => this._playBeat(), beatDuration);
          }
        },

        isPlaying: function() {
          return isPlaying;
        },

        setBPM: function(newBpm) {
          bpm = newBpm;
          beatDuration = (60 / bpm) * 1000;
          return this;
        }
      };

      this._sequences[sequenceId] = sequence;
      return sequence;
    },

    stopAll: function() {
      Object.values(this._loops).forEach(loop => loop.stop());
      Object.values(this._sequences).forEach(seq => seq.stop());
      return this;
    },

    setMasterVolume: function(volume) {
      if (this._audioContext && this._audioContext.destination) {
        const masterGain = this._audioContext.createGain();
        masterGain.gain.value = Math.max(0, Math.min(1, volume));
      }
      return this;
    },

    getContext: function() {
      return this._audioContext;
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Eclipse;
  } else if (typeof define === 'function' && define.amd) {
    define([], function() {
      return Eclipse;
    });
  } else {
    global.Eclipse = Eclipse;
  }

})(typeof window !== 'undefined' ? window : this);
