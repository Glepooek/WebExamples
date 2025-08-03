/**
 * 将图片URL转换为base64格式
 * @param {string} url - 图片URL
 * @returns {Promise<string>} - 返回base64格式的图片数据
 */
export function imageUrlToBase64(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // 处理跨域问题
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = img.width;
      canvas.height = img.height;
      
      ctx.drawImage(img, 0, 0);
      
      try {
        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      } catch (error) {
        reject(new Error('图片转换为base64失败: ' + error.message));
      }
    };
    
    img.onerror = () => {
      reject(new Error('图片加载失败'));
    };
    
    img.src = url;
  });
}

/**
 * 通过fetch获取图片并转换为base64格式
 * @param {string} url - 图片URL
 * @returns {Promise<string>} - 返回base64格式的图片数据
 */
export async function fetchImageAsBase64(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    throw new Error('获取图片失败: ' + error.message);
  }
}