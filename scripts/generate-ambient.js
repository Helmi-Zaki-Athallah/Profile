import fs from 'fs';
import path from 'path';

// Generate a soothing 16-bit 44.1kHz stereo ambient chill chord loop
const sampleRate = 44100;
const durationSeconds = 16; // 16 second seamless loop
const totalSamples = sampleRate * durationSeconds;

// Chords: 4 bars of 4 seconds each (Lo-Fi / Neo-Soul progression: Dm9 -> G13 -> Cmaj9 -> Am9)
// Frequencies in Hz
const chords = [
  // Dm9: D3, F3, A3, C4, E4
  [146.83, 174.61, 220.00, 261.63, 329.63],
  // G13: G2, F3, B3, E4, A4
  [98.00, 174.61, 246.94, 329.63, 440.00],
  // Cmaj9: C3, E3, G3, B3, D4
  [130.81, 164.81, 196.00, 246.94, 293.66],
  // Am9: A2, E3, G3, C4, B4
  [110.00, 164.81, 196.00, 261.63, 493.88]
];

const numChannels = 2;
const bytesPerSample = 2; // 16-bit PCM
const blockAlign = numChannels * bytesPerSample;
const byteRate = sampleRate * blockAlign;
const dataSize = totalSamples * blockAlign;
const buffer = Buffer.alloc(44 + dataSize);

// Write WAV Header
buffer.write('RIFF', 0);
buffer.writeUInt32LE(36 + dataSize, 4);
buffer.write('WAVE', 8);
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16); // Subchunk1Size
buffer.writeUInt16LE(1, 20); // PCM
buffer.writeUInt16LE(numChannels, 22);
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(byteRate, 28);
buffer.writeUInt16LE(blockAlign, 32);
buffer.writeUInt16LE(16, 34); // BitsPerSample
buffer.write('data', 36);
buffer.writeUInt32LE(dataSize, 40);

let offset = 44;
for (let i = 0; i < totalSamples; i++) {
  const t = i / sampleRate;
  const chordIdx = Math.floor((t / durationSeconds) * chords.length) % chords.length;
  const chord = chords[chordIdx];
  const chordLocalT = (t % (durationSeconds / chords.length));
  const chordDuration = durationSeconds / chords.length;
  
  // Smooth envelope for each chord (attack 0.5s, sustain, gentle release 0.5s)
  let env = 1.0;
  if (chordLocalT < 0.6) {
    env = chordLocalT / 0.6;
  } else if (chordLocalT > chordDuration - 0.6) {
    env = (chordDuration - chordLocalT) / 0.6;
  }
  // Soft curve
  env = Math.sin(env * Math.PI * 0.5);

  let left = 0;
  let right = 0;

  // Synthesize chord voices with warm harmonics (warm electric piano / rhodes feel)
  chord.forEach((freq, idx) => {
    // Fundamental + gentle 2nd & 3rd harmonics + subtle chorus LFO
    const lfo = 1 + 0.003 * Math.sin(2 * Math.PI * 1.5 * t + idx);
    const pan = (idx / (chord.length - 1)) * 0.4 + 0.3; // Stereo spread 0.3 - 0.7
    
    const s1 = Math.sin(2 * Math.PI * freq * lfo * t);
    const s2 = 0.35 * Math.sin(2 * Math.PI * freq * 2 * lfo * t);
    const s3 = 0.15 * Math.sin(2 * Math.PI * freq * 3 * lfo * t);
    const voice = (s1 + s2 + s3) * 0.18;

    left += voice * (1 - pan);
    right += voice * pan;
  });

  // Soft vinyl crackle & warm tape air
  const noise = (Math.random() - 0.5) * 0.004;
  left += noise;
  right += noise;

  // Master volume scaling
  const masterGain = 0.7 * env;
  const sampleL = Math.max(-1, Math.min(1, left * masterGain));
  const sampleR = Math.max(-1, Math.min(1, right * masterGain));

  buffer.writeInt16LE(Math.floor(sampleL * 32767), offset);
  buffer.writeInt16LE(Math.floor(sampleR * 32767), offset + 2);
  offset += 4;
}

const outputPath = path.resolve('public', 'music.mp3');
fs.writeFileSync(outputPath, buffer);
console.log(`Generated preview ambient audio at: ${outputPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
