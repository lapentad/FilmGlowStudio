import init, { PhotonImage, gaussian_blur, threshold, blend } from '@silvia-odwyer/photon';

let initialized = false;

self.onmessage = async (e) => {
  const { imageData, halation, bloom, grain, halationThreshold = 180, halationBlur = 50, bloomThreshold = 180, bloomBlur = 50, bloomBlendMode = 'screen', grainSize = 1, grainDistribution = 50, filmStock = 'none', vignette = 0, contrast = 0, shadows = 0, highlights = 0, saturation = 0, vibrance = 0, sharpness = 0, softness = 0, temperature = 0 } = e.data;

  if (!initialized) {
    await init();
    initialized = true;
  }

  let workingData = new Uint8Array(imageData.data);
  
  // Apply basic adjustments
  for (let i = 0; i < workingData.length; i += 4) {
    let r = workingData[i];
    let g = workingData[i + 1];
    let b = workingData[i + 2];
    
    // Temperature (white balance)
    if (temperature !== 0) {
      const temp = temperature / 100;
      r += temp * 30;
      b -= temp * 30;
    }
    
    // Contrast
    if (contrast !== 0) {
      const factor = (contrast / 100) + 1;
      r = ((r / 255 - 0.5) * factor + 0.5) * 255;
      g = ((g / 255 - 0.5) * factor + 0.5) * 255;
      b = ((b / 255 - 0.5) * factor + 0.5) * 255;
    }
    
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const lumFactor = lum / 255;
    
    // Shadows
    if (shadows !== 0 && lumFactor < 0.5) {
      const shadowBoost = (1 - lumFactor * 2) * (shadows / 100) * 50;
      r += shadowBoost;
      g += shadowBoost;
      b += shadowBoost;
    }
    
    // Highlights
    if (highlights !== 0 && lumFactor > 0.5) {
      const highlightBoost = ((lumFactor - 0.5) * 2) * (highlights / 100) * 50;
      r += highlightBoost;
      g += highlightBoost;
      b += highlightBoost;
    }
    
    // Saturation
    if (saturation !== 0) {
      const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      const satFactor = (saturation / 100) + 1;
      r = gray + (r - gray) * satFactor;
      g = gray + (g - gray) * satFactor;
      b = gray + (b - gray) * satFactor;
    }
    
    // Vibrance (affects less saturated colors more)
    if (vibrance !== 0) {
      const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      const maxChannel = Math.max(r, g, b);
      const avgSat = (maxChannel - gray) / 255;
      const vibranceFactor = (1 - avgSat) * (vibrance / 100);
      r = gray + (r - gray) * (1 + vibranceFactor);
      g = gray + (g - gray) * (1 + vibranceFactor);
      b = gray + (b - gray) * (1 + vibranceFactor);
    }
    
    workingData[i] = Math.min(255, Math.max(0, r));
    workingData[i + 1] = Math.min(255, Math.max(0, g));
    workingData[i + 2] = Math.min(255, Math.max(0, b));
  }

  // Apply film stock color grading
  if (filmStock !== 'none') {
    const filmProfiles = {
      'vision3-50d': { r: 0.98, g: 0.99, b: 1.03, contrast: 1.12, saturation: 1.15, shadows: 0.02, highlights: -0.01 },
      'vision3-200t': { r: 1.06, g: 0.96, b: 0.91, contrast: 1.08, saturation: 1.12, shadows: 0.03, highlights: 0.02 },
      'vision3-250d': { r: 1.0, g: 0.98, b: 1.02, contrast: 1.05, saturation: 1.1, shadows: 0.01, highlights: 0.0 },
      'vision3-500t': { r: 1.08, g: 0.94, b: 0.88, contrast: 1.06, saturation: 1.08, shadows: 0.04, highlights: 0.03 },
      'fuji-eterna-vivid-500': { r: 0.95, g: 1.02, b: 1.08, contrast: 1.15, saturation: 1.25, shadows: -0.02, highlights: 0.01 },
      'fuji-reala-500d': { r: 1.02, g: 1.0, b: 0.98, contrast: 1.03, saturation: 1.05, shadows: 0.0, highlights: -0.02 },
    };

    const profile = filmProfiles[filmStock];
    if (profile) {
      for (let i = 0; i < workingData.length; i += 4) {
        let r = workingData[i];
        let g = workingData[i + 1];
        let b = workingData[i + 2];

        const lum = (r + g + b) / 3;
        const lumFactor = lum / 255;

        // Apply shadow/highlight adjustments
        const shadowBoost = (1 - lumFactor) * profile.shadows * 255;
        const highlightBoost = lumFactor * profile.highlights * 255;
        r += shadowBoost + highlightBoost;
        g += shadowBoost + highlightBoost;
        b += shadowBoost + highlightBoost;

        // Apply color shift
        r *= profile.r;
        g *= profile.g;
        b *= profile.b;

        // Apply contrast
        r = ((r / 255 - 0.5) * profile.contrast + 0.5) * 255;
        g = ((g / 255 - 0.5) * profile.contrast + 0.5) * 255;
        b = ((b / 255 - 0.5) * profile.contrast + 0.5) * 255;

        // Apply saturation
        const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        r = gray + (r - gray) * profile.saturation;
        g = gray + (g - gray) * profile.saturation;
        b = gray + (b - gray) * profile.saturation;

        workingData[i] = Math.min(255, Math.max(0, r));
        workingData[i + 1] = Math.min(255, Math.max(0, g));
        workingData[i + 2] = Math.min(255, Math.max(0, b));
      }
    }
  }

  // Apply grain
  if (grain > 0) {
    const grainIntensity = grain / 100;
    for (let i = 0; i < workingData.length; i += 4) {
      const lum = (workingData[i] + workingData[i + 1] + workingData[i + 2]) / 3;
      const lumFactor = lum / 255;

      // Calculate distribution weight: 0=shadows, 50=balanced, 100=highlights
      let weight = 1;
      if (grainDistribution < 50) {
        // More grain in shadows
        weight = 1 - (lumFactor * (grainDistribution / 50));
      } else if (grainDistribution > 50) {
        // More grain in highlights
        weight = lumFactor * ((grainDistribution - 50) / 50) + (1 - (grainDistribution - 50) / 50);
      }

      const noise = (Math.random() - 0.5) * grainIntensity * 50 * grainSize * weight;
      workingData[i] = Math.min(255, Math.max(0, workingData[i] + noise));
      workingData[i + 1] = Math.min(255, Math.max(0, workingData[i + 1] + noise));
      workingData[i + 2] = Math.min(255, Math.max(0, workingData[i + 2] + noise));
    }
  }

  let originalImage = new PhotonImage(workingData, imageData.width, imageData.height);

  // Apply halation
  if (halation > 0) {
    let halationImage = new PhotonImage(new Uint8Array(workingData), imageData.width, imageData.height);

    threshold(halationImage, halationThreshold);
    const blurAmt = Math.max(1, Math.floor((halationBlur / 100) * halation));
    gaussian_blur(halationImage, blurAmt);

    const redData = halationImage.get_raw_pixels();
    for (let i = 0; i < redData.length; i += 4) {
      if (redData[i] !== 0 || redData[i + 1] !== 0 || redData[i + 2] !== 0) {
        let brightness = (redData[i] + redData[i + 1] + redData[i + 2]) / 3;
        redData[i] = Math.min(255, brightness * (halation / 50));
        redData[i + 1] = 0;
        redData[i + 2] = 0;
      }
    }

    halationImage = new PhotonImage(redData, imageData.width, imageData.height);
    gaussian_blur(halationImage, blurAmt);

    blend(originalImage, halationImage, 'screen');
  }

  // Apply bloom
  if (bloom > 0) {
    const currentData = originalImage.get_raw_pixels();
    let bloomImage = new PhotonImage(new Uint8Array(currentData), imageData.width, imageData.height);

    threshold(bloomImage, bloomThreshold);
    const blurAmt = Math.max(3, Math.floor(bloomBlur / 2));
    gaussian_blur(bloomImage, blurAmt);
    gaussian_blur(bloomImage, blurAmt);
    
    // Apply intensity control via opacity
    const bloomData = bloomImage.get_raw_pixels();
    const intensity = bloom / 100;
    for (let i = 0; i < bloomData.length; i += 4) {
      bloomData[i] *= intensity;
      bloomData[i + 1] *= intensity;
      bloomData[i + 2] *= intensity;
    }
    bloomImage = new PhotonImage(bloomData, imageData.width, imageData.height);

    blend(originalImage, bloomImage, bloomBlendMode);
  }

  let finalData = originalImage.get_raw_pixels();
  
  // Apply softness (subtle blur)
  if (softness > 0) {
    const softImage = new PhotonImage(finalData, imageData.width, imageData.height);
    gaussian_blur(softImage, Math.floor(softness / 20));
    finalData = softImage.get_raw_pixels();
  }
  
  // Apply vignette
  if (vignette > 0) {
    const centerX = imageData.width / 2;
    const centerY = imageData.height / 2;
    const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);
    const vignetteStrength = vignette / 100;
    
    for (let y = 0; y < imageData.height; y++) {
      for (let x = 0; x < imageData.width; x++) {
        const dx = x - centerX;
        const dy = y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const factor = 1 - Math.pow(dist / maxDist, 2) * vignetteStrength;
        
        const i = (y * imageData.width + x) * 4;
        finalData[i] *= factor;
        finalData[i + 1] *= factor;
        finalData[i + 2] *= factor;
      }
    }
  }
  
  // Apply sharpness using unsharp masking
  if (sharpness > 0) {
    const sharpImage = new PhotonImage(new Uint8Array(finalData), imageData.width, imageData.height);
    gaussian_blur(sharpImage, 1);
    const blurred = sharpImage.get_raw_pixels();
    
    const amount = sharpness / 50;
    for (let i = 0; i < finalData.length; i += 4) {
      for (let c = 0; c < 3; c++) {
        const original = finalData[i + c];
        const blur = blurred[i + c];
        const diff = original - blur;
        finalData[i + c] = Math.min(255, Math.max(0, original + diff * amount));
      }
    }
  }
  
  const result = new PhotonImage(finalData, imageData.width, imageData.height).get_image_data();
  self.postMessage({ imageData: result });
};
