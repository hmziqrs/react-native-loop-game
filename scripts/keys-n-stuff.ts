import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface Config {
  dir: string;
  type: string;
  repo: string;
}

async function copyFile(source: string, destination: string): Promise<void> {
  try {
    if (fs.existsSync(destination)) {
      console.log(`Overwriting existing file: ${destination}`);
      fs.unlinkSync(destination);
    }

    fs.copyFileSync(source, destination);
    console.log(`Successfully copied: ${destination}`);
  } catch (e) {
    
    throw new Error(`Failed to copy ${source} to ${destination}: ${e}`);
  }
}

async function ensureDirectoryExists(dirPath: string): Promise<void> {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function main(): Promise<void> {
  try {
    // Check if .keys-n-stuff directory exists
    const keysDir = '.keys-n-stuff';

    // Read the keys-n-stuff.json file
    const configPath = '.keys-n-stuff.json';
    if (!fs.existsSync(configPath)) {
      throw new Error('Configuration file not found');
    }

    const config: Config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const { dir: projectDir, type: projectType, repo } = config;
    const source = `.keys-n-stuff/${projectDir}`;

    console.log('Project directory:', projectDir);
    console.log('Project type:', projectType);
    console.log('Repository:', repo);

    if (fs.existsSync(keysDir)) {
      console.log('Repository already exists, pulling latest changes...');
      const { stderr: pullError } = await execAsync('git pull', {
        cwd: keysDir,
      });

      if (pullError) {
        throw new Error(`Failed to pull repository: ${pullError}`);
      }
      console.log('Successfully pulled latest changes');
    } else {
      console.log('Cloning repository...');
      await execAsync(`git clone ${repo} ${keysDir}`);

 
      console.log('Successfully cloned repository');
    }

    if (projectType === 'expo') {
      // Create necessary directories
      await ensureDirectoryExists('android/app');
      await ensureDirectoryExists('ios');

      // Copy Firebase config files
      // Android
      await copyFile(
        `${source}/google-services.json`,
        'google-services.json' // Root directory
      );
      await copyFile(
        `${source}/google-services.json`,
        'android/app/google-services.json'
      );

      // iOS
      await copyFile(
        `${source}/GoogleService-Info.plist`,
        'GoogleService-Info.plist' // Root directory
      );
      await copyFile(
        `${source}/GoogleService-Info.plist`,
        'ios/GoogleService-Info.plist'
      );

      // Copy keystore files if they exist
      const prodKeystoreFile = `${source}/prod.jks`;
      if (fs.existsSync(prodKeystoreFile)) {
        await copyFile(prodKeystoreFile, 'android/app/prod.jks');
        await copyFile(`${source}/prod.properties`, 'android/prod.properties');
      }

      const devKeystoreFile = `${source}/dev.jks`;
      if (fs.existsSync(devKeystoreFile)) {
        await copyFile(devKeystoreFile, 'android/app/dev.jks');
        await copyFile(`${source}/dev.properties`, 'android/dev.properties');
      }

      // Copy service account if it exists
      const serviceAccountFile = `${source}/service-account.json`;
      if (fs.existsSync(serviceAccountFile)) {
        await copyFile(serviceAccountFile, 'service-account.json');
      }

      console.log(
        'Successfully copied all configuration files to their respective directories'
      );
    } else {
      throw new Error(`Unsupported project type: ${projectType}`);
    }

    console.log('Setup completed successfully');
  } catch (e) {
    console.log(e);
    
    console.error('Error:', e);
    process.exit(1);
  }
}

main();