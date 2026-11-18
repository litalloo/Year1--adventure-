# Year 1 Adventure

A phonics, reading, writing, maths and "My World" practice game for Year 1 (England). Open `index.html` in a browser, or publish the repository with GitHub Pages.

## Voices

Reading voices can be previewed and selected in **Grown-ups → My voice**. The default prefers an installed natural British device voice, with the existing Jenny clips as fallback. You can explicitly select the device voice or original clips. Pitch stays close to the speaker's natural pitch, with gentle changes in pace for encouragement and slower reading. Available device voices vary by browser.

Phonics uses **a grown-up's own pure-sound recordings**, saved on that device only. These always play at their original speed and pitch. If a sound is missing, the game asks a grown-up to model the sound in an example word; it never sends isolated letter spellings to ordinary text-to-speech. Record each sound and listen back before your child uses it. The long /oo/ in “blue” shares the moon sound; /yoo/ in “cube” and “stew” has a separate recording. The old ambiguous “ue” recording is no longer used; record the new cube row if needed.

Existing reading clips use **Jenny (Dioco)** ([dataset licence](https://github.com/dioco-group/jenny-tts-dataset)), made with [Piper](https://github.com/OHF-Voice/piper1-gpl). This branch does not include new human-recorded phonics clips. It needs listening review on the child's device before merging.

### Re-making the voice clips

After changing any spoken text (questions, stories, words), re-make the clips so the new phrases use the natural voice:

```sh
pip install piper-tts playwright         # ffmpeg must also be installed
node tools/collect-phrases.js index.html phrases.json
python tools/make-voice.py phrases.json path/to/en_GB-jenny_dioco-medium.onnx audio
```

Existing clips are reused and unused ones are deleted. To change the voice, delete `audio/` and run the last command with a different British Piper voice model, e.g. `en_GB-cori-high` or `en_GB-alba-medium`.
