import { Storage } from 'aws-amplify';

export async function uploadFile(file) {
  const filename = `${Date.now()}-${file.name}`;

  const stored = await Storage.put(filename, file, { contentType: file.type });

  return stored.key;
}

export async function getFile(fileKey) {
  return Storage.get(fileKey);
}
