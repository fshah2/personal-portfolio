import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { getVideoMimeType, isVideoSource, resolveMediaSrc } from './media.ts';

describe('markdown media helpers', () => {
  it('resolves relative media paths against a content base path', () => {
    assert.equal(
      resolveMediaSrc(
        './prompt-3-video.mp4',
        '/content/projects/build-your-own-agent',
      ),
      '/content/projects/build-your-own-agent/prompt-3-video.mp4',
    );
  });

  it('detects local video sources and their MIME type', () => {
    assert.equal(isVideoSource('./prompt-3-video.mp4'), true);
    assert.equal(getVideoMimeType('./prompt-3-video.mp4'), 'video/mp4');
  });

  it('keeps ordinary image sources out of the video path', () => {
    assert.equal(isVideoSource('./cover.png'), false);
    assert.equal(getVideoMimeType('./cover.png'), undefined);
  });
});
