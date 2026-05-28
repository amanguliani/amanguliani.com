// 1. Core Loader: Load manifest, fetch all pages in parallel, and dynamically stitch them
async function loadPhotobook() {
  const statusEl = document.getElementById('loader-status');
  const bookWrap = document.getElementById('book-wrap');
  
  try {
    statusEl.textContent = 'Reading table of contents...';
    const response = await fetch('pages/manifest.json');
    if (!response.ok) throw new Error('Failed to load table of contents manifest.');
    const manifest = await response.json();
    
    const totalPages = manifest.length;
    let loadedPages = 0;
    
    statusEl.textContent = `Reading chapters (0 / ${totalPages})...`;
    
    // Parallel fetches for extreme performance
    const pagePromises = manifest.map(async (path, index) => {
      try {
        const res = await fetch(path);
        if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
        const text = await res.text();
        loadedPages++;
        statusEl.textContent = `Reading chapters (${loadedPages} / ${totalPages})...`;
        return { index, text };
      } catch (err) {
        console.error(`Error loading page ${path}:`, err);
        return { index, text: `<section class="page"><div class="letter"><h2>Error Loading Page</h2><p>Could not load page from ${path}: ${err.message}</p></div></section>` };
      }
    });
    
    const pages = await Promise.all(pagePromises);
    
    // Sort in sequential chronological order
    pages.sort((a, b) => a.index - b.index);
    
    statusEl.textContent = 'Stitching spreads together...';
    bookWrap.innerHTML = ''; // Clear spacer/empty state
    
    // Inject all HTML contents sequentially
    pages.forEach(page => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = page.text.trim();
      while (tempDiv.firstChild) {
        bookWrap.appendChild(tempDiv.firstChild);
      }
    });
    
    statusEl.textContent = 'Styling typography & photo grids...';
    
    // 2. Initialize aspect-ratio offsets and tilts
    initializePhotoLayouts();
    
    // 3. Construct and inject realistic Gmail headers
    initializeEmailMetaHeaders();
    
    // Update page indicator with real count (subtracted cover and intro)
    const count = Math.max(0, totalPages - 2);
    const indicator = document.querySelector('.page-indicator');
    if (indicator) {
      indicator.innerHTML = `Dadi's Letters &middot; ${count} Chapters`;
    }
    
    // Smooth fade-out of the loading screen overlay
    const loader = document.getElementById('loader-overlay');
    loader.style.opacity = '0';
    loader.style.visibility = 'hidden';
    setTimeout(() => loader.remove(), 500);
    
  } catch (err) {
    console.error(err);
    statusEl.innerHTML = `<span style="color: #d32f2f; font-weight: 500;">Failed to open photobook: ${err.message}</span>`;
  }
}

// 2. Image Layouts: Arrange photo pages to maximize space, applying tilts & stagger styles
function initializePhotoLayouts() {
  document.querySelectorAll('.photos').forEach(photosContainer => {
    const images = Array.from(photosContainer.querySelectorAll('img'));
    if (images.length >= 2) {
      
      const applyLayout = () => {
        let allLandscape = true;
        let allPortrait = true;

        images.forEach(img => {
          const ratio = img.naturalHeight > 0 ? (img.naturalWidth / img.naturalHeight) : 1.0;
          if (ratio < 1.05) allLandscape = false;
          if (ratio > 0.95) allPortrait = false;
        });

        let layoutClass = 'layout-stagger';
        if (allLandscape) {
          layoutClass = 'layout-column';
        } else if (allPortrait) {
          layoutClass = 'layout-row';
        }

        photosContainer.classList.add(layoutClass);

        images.forEach((img, idx) => {
          let tilt = (idx % 2 === 0 ? -2.5 : 2.5) + (Math.random() * 1.5 - 0.75);
          if (layoutClass === 'layout-column') {
            tilt = tilt * 0.4; // Subtle tilts for vertical stacks
          }
          img.style.transform = `rotate(${tilt.toFixed(1)}deg)`;
          img.classList.add('multi-photo');
        });
      };

      // If already cached and natural size is loaded
      if (images.every(img => img.complete && img.naturalHeight > 0)) {
        applyLayout();
      } else {
        // Wait for load/error events to compute styles
        let loadedCount = 0;
        images.forEach(img => {
          if (img.complete && img.naturalHeight > 0) {
            loadedCount++;
            if (loadedCount === images.length) applyLayout();
          } else {
            img.addEventListener('load', () => {
              loadedCount++;
              if (loadedCount === images.length) applyLayout();
            });
            img.addEventListener('error', () => {
              loadedCount++;
              if (loadedCount === images.length) applyLayout();
            });
          }
        });
      }
    }
  });
}

// 3. Gmail meta injection: Extract native date element and transform into high-fidelity Gmail header
function initializeEmailMetaHeaders() {
  document.querySelectorAll('.letter').forEach(letter => {
    const isIntro = letter.parentNode.classList.contains('introduction');
    const isCover = letter.parentNode.classList.contains('cover-page');
    if (isCover) return; // Skip cover

    let dateEl = letter.querySelector('.letter-date') || letter.querySelector('.date');
    let dateText = '';

    if (dateEl) {
      dateText = dateEl.textContent.trim();
    } else if (isIntro) {
      dateText = '01 May 2025';
    } else {
      const h2El = letter.querySelector('h2') || letter.querySelector('.chapter-title');
      if (h2El) {
        const match = h2El.textContent.match(/\(([^)]+)\)/);
        if (match) {
          dateText = match[1].trim();
        }
      }
    }

    if (dateText && !letter.querySelector('.email-header-meta')) {
      dateText = dateText.replace('To: riyanguliani@gmail.com  ·  ', '');
      
      const senderName = 'Ravinder Guliani';
      const senderEmail = 'ravinderguliani@gmail.com';
      const recipientEmail = 'riyanguliani@gmail.com';

      const headerDiv = document.createElement('div');
      headerDiv.className = 'email-header-meta';
      headerDiv.innerHTML = `
        <div class="email-avatar">D</div>
        <div class="email-meta-details">
          <div class="email-sender-row">
            <span class="email-sender-name">${senderName}</span>
            <span class="email-sender-address">&lt;${senderEmail}&gt;</span>
            <span class="email-timestamp">${dateText}</span>
          </div>
          <div class="email-recipient-row">
            to ${recipientEmail}
          </div>
        </div>
      `;

      const titleEl = letter.querySelector('.chapter-title') || letter.querySelector('h2');
      if (titleEl) {
        titleEl.parentNode.insertBefore(headerDiv, titleEl.nextSibling);
        titleEl.innerHTML = titleEl.innerHTML.replace(/\s*\([^)]+\)\s*$/, '');
      } else {
        letter.insertBefore(headerDiv, letter.firstChild);
      }
    }
  });
}

// Trigger loading immediately
window.addEventListener('DOMContentLoaded', loadPhotobook);
