const VIDEO_MIME_TYPES = new Map<string, string>([
  ['.mov', 'video/quicktime'],
  ['.mp4', 'video/mp4'],
  ['.m4v', 'video/x-m4v'],
  ['.webm', 'video/webm'],
  ['.ogv', 'video/ogg'],
]);

const isAbsoluteOrExternal = (src: string) =>
  src.startsWith('/') ||
  src.startsWith('http://') ||
  src.startsWith('https://') ||
  src.startsWith('data:');

const getPathname = (src: string) => src.split(/[?#]/, 1)[0].toLowerCase();

export const resolveMediaSrc = (src: string, basePath: string) => {
  if (!src) return '';
  if (isAbsoluteOrExternal(src)) return src;

  const normalized = src.startsWith('./') ? src.slice(2) : src;
  return `${basePath}/${normalized}`;
};

export const getVideoMimeType = (src: string) => {
  const pathname = getPathname(src);

  for (const [extension, mimeType] of VIDEO_MIME_TYPES) {
    if (pathname.endsWith(extension)) return mimeType;
  }

  return undefined;
};

export const isVideoSource = (src: string) =>
  getVideoMimeType(src) !== undefined;
