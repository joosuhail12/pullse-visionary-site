'use client';

import { NextStudio } from 'next-sanity/studio';
import dynamic from 'next/dynamic';
import config from '../../../../../sanity.config';

// Load Studio only on the client to keep it out of the main client bundle.
const StudioInner = () => <NextStudio config={config} />;

export default dynamic(async () => StudioInner, {
  ssr: false,
});
