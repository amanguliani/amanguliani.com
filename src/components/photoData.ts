/**
 * Photo data for the gallery.
 * 
 * To add photos from Google Drive:
 * 1. Upload the photo to Google Drive
 * 2. Right-click → Share → "Anyone with the link" → Viewer
 * 3. Copy the file ID from the sharing link (the long string between /d/ and /view)
 * 4. Add an entry below with the file ID
 * 
 * The component will construct the direct image URL automatically.
 */

export interface PhotoItem {
  id: string;          // Google Drive file ID
  caption?: string;    // Optional caption
  alt: string;         // Alt text for accessibility
}

/**
 * Convert a Google Drive file ID to a direct viewable image URL.
 * Uses uc?export=view for broad compatibility including localhost.
 */
export function getDriveImageUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

/**
 * Get a full-resolution URL for the lightbox view.
 */
export function getDriveImageUrlFull(fileId: string): string {
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

// Add your Google Drive photo file IDs below.
// To get the file ID: open the photo in Drive → Share → copy the ID from the URL.
// Example URL: https://drive.google.com/file/d/ABC123XYZ/view → ID is "ABC123XYZ"
export const PHOTOS: PhotoItem[] = [
  {
    id: '1VdlUOH_-RCOHF4vtTNxFP0tISUT5CpUq',
    caption: 'Me, my wife and my little guy',
    alt: 'Me, my wife and my little guy',
  },
  {
    id: '13uERZjqmQofcp6YegHxBSeWENI-vLgPV',
    caption: 'NYU Stern Grad Day !!',
    alt: 'NYU Stern Grad Day !!',
  },
  {
    id: '1iB9335Qusjm-9U6bn8eKpBQJGkJsdOVY',
    caption: 'The Guliani Boys',
    alt: 'The Guliani Boys',
  },
  {
    id: '1OD3nMxdm-XR1zt_H9J6jjbKb99NwUZ3h',
    caption: 'Just me and my little guy',
    alt: 'Just me and my little guy',
  },
  {
    id: '1-L0FdamjULeR_GUiFgPp65j44xiBURG8',
    caption: 'Welcome little guy',
    alt: 'Welcome little guy',
  },
  {
    id: '1ZbCsOPpciZw_mdalqxgq42RHC1GNAZmU',
    caption: 'Dr Nidhi',
    alt: 'Dr Nidhi',
  },
];
