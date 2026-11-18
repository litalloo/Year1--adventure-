# Year 1 Adventure

A phonics, reading, writing, maths and "My World" practice game for Year 1 (England). Open `index.html` in a browser, or publish the repository with GitHub Pages.

## Voices

The game speaks in this order of preference:

1. **A grown-up's own recordings** of the phonics sounds (👪 Grown-ups → 🎙️ My voice). These are saved on that device only.
2. **Pre-recorded natural voice clips** in `audio/`, listed in `audio/manifest.js`. Voice: **Jenny (Dioco)** ([dataset licence](https://github.com/dioco-group/jenny-tts-dataset)), made with [Piper](https://github.com/OHF-Voice/piper1-gpl).
3. **The device's built-in voice**, for anything without a clip.

### Re-making the voice clips

After changing any spoken text (questions, stories, words), re-make the clips so the new phrases use the natural voice:

```sh
pip install piper-tts playwright         # ffmpeg must also be installed
node tools/collect-phrases.js index.html phrases.json
python tools/make-voice.py phrases.json path/to/en_GB-jenny_dioco-medium.onnx audio
```

Existing clips are reused and unused ones are deleted. To change the voice, delete `audio/` and run the last command with a different British Piper voice model, e.g. `en_GB-cori-high` or `en_GB-alba-medium`.
