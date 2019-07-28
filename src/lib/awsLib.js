import { Storage } from 'aws-amplify';

export async function uploadFile(file) {
  const filename = `videos/${Date.now()}-${file.name}`;

  const stored = await Storage.put(filename, file, { contentType: file.type });

  return stored.key.split('/')[1];
}

export async function getFile(fileKey) {
  return Storage.get(fileKey);
}

export async function listFiles(path) {
  return Storage.list(path);
}
