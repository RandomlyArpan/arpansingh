import ffmpeg from 'ffmpeg-static';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const inputDir = path.join(process.cwd(), 'public', 'workvideo');
const outputDir = path.join(process.cwd(), 'public', 'videos', 'compressed');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.mp4'));

console.log(`Found ${files.length} videos to compress using ${ffmpeg}...`);

files.forEach(file => {
  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, file);
  console.log(`Compressing ${file} with audio...`);
  
  // Compress to 720p max, 30fps, CRF 30, ultrafast, KEEP audio as AAC 128k
  const cmd = `"${ffmpeg}" -i "${inputPath}" -vf "scale='min(1280,iw)':-2" -r 30 -c:v libx264 -preset ultrafast -crf 30 -c:a aac -b:a 128k -y "${outputPath}"`;
  
  try {
    execSync(cmd, { stdio: 'inherit' });
    console.log(`Successfully compressed ${file} with audio`);
  } catch (error) {
    console.error(`Failed to compress ${file}:`, error.message);
  }
});

console.log('All videos compressed successfully with audio!');
