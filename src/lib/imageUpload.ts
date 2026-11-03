/**
 * Utility to process and optimize client-side image file uploads.
 * Reads image file from user's device, resizes it onto an HTML5 canvas,
 * and produces a lightweight, high-fidelity base64 data URL.
 */

export async function processUploadedImage(
  file: File,
  maxWidth = 480,
  maxHeight = 640,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Vui lòng chọn file hình ảnh hợp lệ (PNG, JPG, WEBP).'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Không thể đọc file hình ảnh từ thiết bị.'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('File ảnh bị lỗi hoặc không hỗ trợ.'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect ratio preserving dimensions
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Trình duyệt không hỗ trợ xử lý canvas ảnh.'));
          return;
        }

        // High quality smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to webp or jpeg
        try {
          const dataUrl = canvas.toDataURL('image/webp', quality);
          // If browser doesn't support webp, fallback to jpeg
          if (dataUrl.startsWith('data:image/webp')) {
            resolve(dataUrl);
          } else {
            resolve(canvas.toDataURL('image/jpeg', quality));
          }
        } catch {
          resolve(canvas.toDataURL('image/jpeg', quality));
        }
      };
      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}
