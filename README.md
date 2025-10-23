# 🥁 Eclipse.js

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/ilovecode17/Eclipse)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![CDN](https://img.shields.io/badge/CDN-jsDelivr-orange.svg)](https://cdn.jsdelivr.net/gh/ilovecode17/Eclipse/eclipse.js)

**Eclipse.js** is a powerful, lightweight JavaScript library for playing professional drum sounds in your web applications. Built with the Web Audio API, Eclipse.js offers advanced features like simultaneous sound playback, loops, sequences, and BPM-based drum patterns.

Perfect for music apps, rhythm games, educational tools, or any project that needs high-quality drum sounds.

---

## ✨ Features

- **11 Professional Drum Sounds** - High-quality samples ready to use
- **Simultaneous Playback** - Play multiple drums at the same time
- **Advanced Looping System** - Create repeating drum sequences with custom intervals
- **Sequence Engine** - Build complex drum patterns with BPM control
- **Zero Dependencies** - Pure vanilla JavaScript
- **CDN Ready** - Easy integration via jsDelivr
- **Volume Control** - Adjust volume per sound or globally
- **Playback Controls** - Start, stop, pause, and resume capabilities
- **Tiny Footprint** - Minimal overhead, maximum performance
- **Cross-Browser Compatible** - Works in all modern browsers

---

## 📦 Installation

### Via CDN (Recommended)

```html
<script src="https://cdn.jsdelivr.net/gh/ilovecode17/Eclipse/eclipse.js"></script>
```

### Manual Download

Download `eclipse.js` from this repository and include it in your project:

```html
<script src="path/to/eclipse.js"></script>
```

---

## 🚀 Quick Start

```javascript
Eclipse.init(() => {
  Eclipse.play('bassDrum');
});
```

That's it! Eclipse.js will automatically load all drum sounds and you're ready to make music.

---

## 📖 API Documentation

### Initialization

#### `Eclipse.init(callback)`

Initialize Eclipse.js and load all drum sounds.

```javascript
Eclipse.init(() => {
  console.log('Eclipse.js is ready!');
  Eclipse.play('snareDrum');
});
```

**Parameters:**
- `callback` (Function, optional): Called when all sounds are loaded

---

### Playing Sounds

#### `Eclipse.play(soundName, options)`

Play a single drum sound.

```javascript
Eclipse.play('bassDrum');

Eclipse.play('snareDrum', {
  volume: 0.8,
  delay: 0.5
});
```

**Parameters:**
- `soundName` (String): Name of the drum sound
- `options` (Object, optional):
  - `volume` (Number, 0-1): Volume level (default: 1.0)
  - `delay` (Number): Delay in seconds before playing (default: 0)
  - `duration` (Number): Duration to play in seconds (optional)

**Returns:** AudioBufferSourceNode or null

---

#### `Eclipse.playMultiple(sounds, options)`

Play multiple drums simultaneously.

```javascript
Eclipse.playMultiple(['bassDrum', 'closedHiHat', 'snareDrum']);

Eclipse.playMultiple([
  'bassDrum',
  { name: 'snareDrum', volume: 0.7 },
  { name: 'crashCymbal', delay: 0.1 }
], { volume: 0.9 });
```

**Parameters:**
- `sounds` (Array): Array of sound names or sound objects
- `options` (Object, optional): Default options for all sounds

**Returns:** Array of AudioBufferSourceNodes

---

### Looping

#### `Eclipse.createLoop(sounds, options)`

Create a repeating loop of drum sounds.

```javascript
const loop = Eclipse.createLoop(['closedHiHat', 'snareDrum'], {
  interval: 250,
  volume: 0.8,
  repetitions: 16
});

loop.start();
```

**Parameters:**
- `sounds` (Array): Array of sound names to loop through
- `options` (Object, optional):
  - `interval` (Number): Time between sounds in milliseconds (default: 500)
  - `volume` (Number, 0-1): Volume level (default: 1.0)
  - `repetitions` (Number): Number of complete loops (default: Infinity)

**Returns:** Loop object with methods:
- `start()` - Start the loop
- `stop()` - Stop the loop completely
- `pause()` - Pause the loop
- `resume()` - Resume the loop
- `isPlaying()` - Check if loop is active

**Example:**

```javascript
const hiHatLoop = Eclipse.createLoop(['closedHiHat'], {
  interval: 200,
  volume: 0.6
});

hiHatLoop.start();

setTimeout(() => {
  hiHatLoop.pause();
}, 5000);

setTimeout(() => {
  hiHatLoop.resume();
}, 7000);

setTimeout(() => {
  hiHatLoop.stop();
}, 10000);
```

---

### Sequences

#### `Eclipse.createSequence(pattern, options)`

Create a beat pattern with BPM control.

```javascript
const beat = Eclipse.createSequence([
  ['bassDrum', 'closedHiHat'],
  'closedHiHat',
  ['snareDrum', 'closedHiHat'],
  'closedHiHat'
], {
  bpm: 120,
  loop: true,
  volume: 0.9
});

beat.start();
```

**Parameters:**
- `pattern` (Array): Array of beats, where each item can be:
  - A string (single drum)
  - An array of strings (multiple simultaneous drums)
  - An object with sound options
  - `null` or `undefined` for silence
- `options` (Object, optional):
  - `bpm` (Number): Beats per minute (default: 120)
  - `loop` (Boolean): Loop the pattern (default: false)
  - `volume` (Number, 0-1): Volume level (default: 1.0)

**Returns:** Sequence object with methods:
- `start()` - Start the sequence
- `stop()` - Stop the sequence
- `pause()` - Pause the sequence
- `resume()` - Resume the sequence
- `setBPM(bpm)` - Change tempo during playback
- `isPlaying()` - Check if sequence is active

**Advanced Pattern Example:**

```javascript
const rockBeat = Eclipse.createSequence([
  ['bassDrum', 'closedHiHat'],
  'closedHiHat',
  ['snareDrum', 'closedHiHat'],
  'closedHiHat',
  ['bassDrum', 'closedHiHat'],
  'closedHiHat',
  ['snareDrum', 'closedHiHat'],
  ['closedHiHat', 'bassDrum']
], {
  bpm: 140,
  loop: true
});

rockBeat.start();

setTimeout(() => {
  rockBeat.setBPM(180);
}, 5000);
```

---

### Utility Methods

#### `Eclipse.stopAll()`

Stop all active loops and sequences.

```javascript
Eclipse.stopAll();
```

---

#### `Eclipse.isReady()`

Check if all sounds are loaded and ready.

```javascript
if (Eclipse.isReady()) {
  Eclipse.play('bassDrum');
}
```

**Returns:** Boolean

---

#### `Eclipse.setMasterVolume(volume)`

Set the master volume level.

```javascript
Eclipse.setMasterVolume(0.7);
```

**Parameters:**
- `volume` (Number, 0-1): Master volume level

---

#### `Eclipse.getContext()`

Get the Web Audio API context.

```javascript
const audioContext = Eclipse.getContext();
```

**Returns:** AudioContext

---

## 🎵 Available Drum Sounds

Eclipse.js includes 11 professional drum sounds:

| Sound Name | Description |
|------------|-------------|
| `bassDrum` | Deep bass drum / kick drum |
| `snareDrum` | Standard snare drum |
| `snareDrumCross` | Snare drum with cross-stick technique |
| `crashCymbal` | Crash cymbal |
| `rideCymbal` | Ride cymbal |
| `floorTom` | Floor tom-tom |
| `highTom` | High tom-tom |
| `lowTom` | Low tom-tom |
| `closedHiHat` | Closed hi-hat |
| `openHiHat` | Open hi-hat |
| `footHiHat` | Foot-operated hi-hat |

---

## 💡 Examples

### Basic Drum Machine

```javascript
Eclipse.init(() => {
  document.getElementById('kick').addEventListener('click', () => {
    Eclipse.play('bassDrum');
  });

  document.getElementById('snare').addEventListener('click', () => {
    Eclipse.play('snareDrum');
  });

  document.getElementById('hihat').addEventListener('click', () => {
    Eclipse.play('closedHiHat');
  });
});
```

---

### Four-on-the-Floor Beat

```javascript
Eclipse.init(() => {
  const fourOnFloor = Eclipse.createSequence([
    ['bassDrum', 'closedHiHat'],
    'closedHiHat',
    ['bassDrum', 'closedHiHat'],
    'closedHiHat',
    ['bassDrum', 'closedHiHat'],
    'closedHiHat',
    ['bassDrum', 'closedHiHat'],
    'closedHiHat'
  ], {
    bpm: 128,
    loop: true
  });

  fourOnFloor.start();
});
```

---

### Rock Beat with Fill

```javascript
Eclipse.init(() => {
  const rockBeat = Eclipse.createSequence([
    ['bassDrum', 'closedHiHat'],
    'closedHiHat',
    ['snareDrum', 'closedHiHat'],
    'closedHiHat',
    ['bassDrum', 'closedHiHat'],
    ['bassDrum', 'closedHiHat'],
    ['snareDrum', 'closedHiHat'],
    'closedHiHat',
    ['bassDrum', 'closedHiHat'],
    'closedHiHat',
    ['snareDrum', 'closedHiHat'],
    'closedHiHat',
    'highTom',
    'lowTom',
    ['floorTom', 'crashCymbal'],
    null
  ], {
    bpm: 120,
    loop: true,
    volume: 0.85
  });

  document.getElementById('startRock').addEventListener('click', () => {
    rockBeat.start();
  });

  document.getElementById('stopRock').addEventListener('click', () => {
    rockBeat.stop();
  });
});
```

---

### Interactive Drum Pad

```javascript
Eclipse.init(() => {
  const keyMap = {
    'q': 'bassDrum',
    'w': 'snareDrum',
    'e': 'closedHiHat',
    'r': 'openHiHat',
    'a': 'lowTom',
    's': 'highTom',
    'd': 'floorTom',
    'z': 'crashCymbal',
    'x': 'rideCymbal'
  };

  document.addEventListener('keydown', (e) => {
    const sound = keyMap[e.key.toLowerCase()];
    if (sound) {
      Eclipse.play(sound);
    }
  });
});
```

---

### Dynamic BPM Controller

```javascript
Eclipse.init(() => {
  const beat = Eclipse.createSequence([
    ['bassDrum', 'closedHiHat'],
    'closedHiHat',
    ['snareDrum', 'closedHiHat'],
    'closedHiHat'
  ], {
    bpm: 120,
    loop: true
  });

  beat.start();

  document.getElementById('bpmSlider').addEventListener('input', (e) => {
    const bpm = parseInt(e.target.value);
    beat.setBPM(bpm);
    document.getElementById('bpmDisplay').textContent = bpm;
  });
});
```

---

### Multiple Simultaneous Patterns

```javascript
Eclipse.init(() => {
  const hiHats = Eclipse.createLoop(['closedHiHat'], {
    interval: 125,
    volume: 0.6
  });

  const kickSnare = Eclipse.createSequence([
    'bassDrum',
    null,
    'snareDrum',
    null
  ], {
    bpm: 120,
    loop: true,
    volume: 0.9
  });

  hiHats.start();
  kickSnare.start();
});
```

---

## 🎨 Complete Demo

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Eclipse.js Drum Machine</title>
  <script src="https://cdn.jsdelivr.net/gh/ilovecode17/Eclipse/eclipse.js"></script>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
    }
    .drum-pad {
      display: inline-block;
      padding: 20px 40px;
      margin: 10px;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
    }
    .drum-pad:active {
      transform: scale(0.95);
    }
    .controls {
      margin-top: 30px;
    }
    .control-btn {
      padding: 12px 24px;
      margin: 5px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
    }
    .start { background: #2196F3; color: white; }
    .stop { background: #f44336; color: white; }
  </style>
</head>
<body>
  <h1>🥁 Eclipse.js Drum Machine</h1>
  
  <div id="drumPads"></div>
  
  <div class="controls">
    <button class="control-btn start" onclick="startBeat()">Start Beat</button>
    <button class="control-btn stop" onclick="stopBeat()">Stop Beat</button>
  </div>

  <script>
    let currentBeat = null;

    const drums = [
      'bassDrum', 'snareDrum', 'closedHiHat', 'openHiHat',
      'crashCymbal', 'rideCymbal', 'highTom', 'lowTom', 'floorTom'
    ];

    Eclipse.init(() => {
      const container = document.getElementById('drumPads');
      
      drums.forEach(drum => {
        const btn = document.createElement('button');
        btn.className = 'drum-pad';
        btn.textContent = drum.replace(/([A-Z])/g, ' $1').trim();
        btn.onclick = () => Eclipse.play(drum);
        container.appendChild(btn);
      });
    });

    function startBeat() {
      if (currentBeat) currentBeat.stop();
      
      currentBeat = Eclipse.createSequence([
        ['bassDrum', 'closedHiHat'],
        'closedHiHat',
        ['snareDrum', 'closedHiHat'],
        'closedHiHat'
      ], {
        bpm: 120,
        loop: true
      });
      
      currentBeat.start();
    }

    function stopBeat() {
      if (currentBeat) {
        currentBeat.stop();
      }
    }
  </script>
</body>
</html>
```

---

## 🔊 Sound Credits

The professional drum samples in Eclipse.js come from multiple high-quality sources:

- **Pixabay.com** - Royalty-free sound effects
- **[Drums4Life YouTube Channel](https://youtube.com/@drums4lifesubscribe?si=dyq4SBWFWxiDaDBx)** - Professional drum recordings
- **Self-recorded samples** - Custom recorded drum sounds

All sounds are carefully selected and optimized for web playback, ensuring consistent quality and performance across all devices.

---

## 🌐 Browser Support

Eclipse.js works in all modern browsers that support the Web Audio API:

- ✅ Chrome 34+
- ✅ Firefox 25+
- ✅ Safari 14.1+
- ✅ Edge 79+
- ✅ Opera 21+
- ✅ iOS Safari 14.5+
- ✅ Chrome for Android

---

## ⚡ Performance Tips

1. **Initialize Once**: Call `Eclipse.init()` only once when your page loads
2. **Reuse Sequences**: Create sequences once and reuse them instead of recreating
3. **Stop Unused Loops**: Always stop loops when they're no longer needed
4. **Volume Control**: Use lower volumes when playing multiple sounds simultaneously
5. **Mobile Considerations**: Mobile browsers may require user interaction before playing audio

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

MIT License - feel free to use Eclipse.js in your projects!

---

## 🔗 Links

- **GitHub Repository**: [https://github.com/ilovecode17/Eclipse](https://github.com/ilovecode17/Eclipse)
- **CDN**: [https://cdn.jsdelivr.net/gh/ilovecode17/Eclipse/eclipse.js](https://cdn.jsdelivr.net/gh/ilovecode17/Eclipse/eclipse.js)
- **Issues**: [https://github.com/ilovecode17/Eclipse/issues](https://github.com/ilovecode17/Eclipse/issues)

---

## 💬 Support

If you encounter any issues or have questions:

1. Check the documentation above
2. Search [existing issues](https://github.com/ilovecode17/Eclipse/issues)
3. Open a new issue with detailed information

---

## ⭐ Show Your Support

If you find Eclipse.js useful, please consider giving it a star on GitHub!

---

**Made with ❤️ for the web audio community**