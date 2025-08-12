import request from '@/utils/request';
import CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt'
import { fetchImageAsBase64 } from '@/utils/imageUtils';

const bookJsonFileName = 'book.json';
const bookPrivateKey = "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDSBh6knS8wB4CzUDL/a0pBJonHV6F4uhFSUmiPWpo/8ElIGSujGHbLXUxe6TAVP9WvxxZRBPCBuE/5KW7Q/E9GdnKwhTBP47FmO9l+j2TGj0IuWUYyVB2ta/JruOEOx6B62UoqUuoccQw7Z08U0P0oRyocE4YKp/11poytO4LiiWdBqpV3V9XjqqW3Rw/dyKnJlAyhsGR1SZLvxsb5PDmi7bKmiSpWVRHpAMNDCLXMzNYtpuKunQofY0BqUSENFyh0AineQx2jKqPz78Rb2hQWw0Jr3qj+UYu/GevXUvpPH1kwKlSspWhNA7JZYOCMQlPgNITYBUjqAdvj5mRP8/YnAgMBAAECggEAbCASbpUt0gBK1gYX+z91Pw1kKWiIDOteN4+NnR/8AabnU2MCADl8Dz69Lq/GvWnbzV8lshhk6aPGKHSYRKdg+NnKOe6X7MlAb22oj2uraj4eyFXVudtsW/gTGjpYQ4+qoxRzBk8hj/rzXTHWmNTvQGlC2KmEfL/30TYpfpYA0DcWIeN97X2M34mvDu1p7Anqz6UChFu095+Dvk6NiRncO3swdg5egC7npoq27ZYyMv5Kk0aD7D4pHGf0374LvgSmv8xHUxKkTnk7Xf0v2iw2uFLpdgqfnC1862nEY+hUhouklKUtti35sewyn2RfdVD5ZG6Tcl0XCdoFD8EAFxhnoQKBgQDyS1gaQArOg3aPtn9cvu/y7HOLIp2d+hwM/uM2TgB+e4txX41yOc984XqalS03qiWz2ZO8DQATYfN6UHUNz+KZCqEgyurPfbkcIgPtCX6L7ZATz+0g0cvPol+/AQbtPVMckFMTWMeaiOUnj+qB5zu9MvitosSjBq9Emn0MB0FO0wKBgQDd53gGe8YbN10ZXgLIv7OLa+S7Fvy7OfuiD7Ty+Ws34Y2vls/cDnWPCh2+oodGGcl6ZDZsYmjAhBFJD/lOTJbyvi7+0oDEIzdd0mcT0Ecw1zaBymDATLcTPU1u/J+R+sLVxFaVtGlKxwS9oDmG93PL9czaRCZyDwSpPYdz9lMu3QKBgQCXuFJM7blWo7+EMlUCcJW0WhfoEh78o3cZNCp3ANUSXq5sqdbaphSlMFQjpDISXzsIqb/2y3U2relWuDb0FS7hgmRvMmFi2Gknkq0+qulRGctUfKkSGg0z0Yt/AVejCvmWM1GyFa+3tu03nsjL203vJZHOuNPE+hSaMtsGwyxD/QKBgCDwOuC7fqyLi0Y4rjEeQ4hue4VJ5DnmYXOs4S8v1rp0wJNPz4rampig58lkVrARI9cHCQ0Njn8FG4u800TMGZvunws0M+jpUU6b7LEEOY0GZRDe+X2R5Zr1foj69rS0hDc27aNLJFX1NL7xCZj/IjEkS0Qa2ZoUoJx+hZyw86gBAoGAAUWMVH6lHEzkgHq8YNR8Gzt/+YQCyEFZ3qhR60P0H326l/hCvrbpEWdrEASL1lOJ8ZaBaguDfg2T6oIUeZADVm9RurIZkce6Y5+FSaJg661pjoXpEhpgbD80PFlaHbTQNZG3e6/1edJEpNeABlWX4l2lEnpqGnbPb24nLJKVcPc=";
const SALT = "fhdafhsahfqewipuywirnk;2y304172489jQUHOIUY*(*&*^(GH:";

let rootPath = ""; // 域名/digitalBook/fileName
let key = "";
let md5Key = "";
let fileName = "";

/**
 * 为一些变量初始化值
 * @param {string} path，根路径，如 http://localhost:8080/digitalBook/fileName
 * @param {string} fileNameParam，一本书的唯一标识，形如bookId + courseId
 * @param {string} secretKey
 */
export function init(path, fileNameParam, secretKey) {
    rootPath = path;
    fileName = fileNameParam;
    key = getKey(secretKey);
    md5Key = em(key);
}

/**
 * 获取数字教材
 * @returns {Promise<any>}
 */
export async function getDigitalBook() {
    try {
        const filePath = getFilePath(bookJsonFileName);
        return await request.get(`/digitalBook/${fileName}/${filePath}`);
    } catch (error) {
        console.error('Error fetching digital book:', error);
        throw error;
    }
}

/**
 * 获取数字教材页面
 * @param {Object} params 参数对象
 * @param {string} params.jsonFile page json文件路径，如0_5/C01.json
 * @param {string} params.moduleName 所在文件夹名，如0_5
 * @returns {Promise<any>}
 */
export async function getDigitalBookPage({ jsonFile, moduleName }) {
    try {
        // console.log('getDigitalBookPage', jsonFile, moduleName, index, id, pageName);
        const filePath = getFilePath(jsonFile);
        const pageModel = await request.get(`/digitalBook/${fileName}/${filePath}`);
        const pageFilePath = `${rootPath}${moduleName}/${getFilePath(pageModel.background.file)}`;
        
        let imgBase64 = '';
        // 添加将图片转换为base64的功能
        try {
          imgBase64 = await fetchImageAsBase64(pageFilePath);
        } catch (error) {
          console.warn('图片转换为base64失败:', error.message);
        }
        
        return { pageModel: pageModel, imgBase64: imgBase64};
    } catch (error) {
        console.error('Error fetching digital book list:', error);
        throw error;
    }
}

/**
 * 获取拼接的文件路径
 * @param {string} fileName 文件名（有时会带目录）
 * @param {string} directory 所在目录
 * @param {boolean} needFileNameMd5 是否需要将文件名进行MD5加密
 * @returns {string} 完整路径
 */
export function getFilePath(fileName, directory = "", needFileNameMd5 = true) {
    if (!fileName) {
        throw new Error('Invalid arguments');
    }

    let processedFileName = fileName;
    const pathSegments = fileName.split('/');
    
    if (pathSegments.length > 1) {
        const actualFileName = pathSegments[pathSegments.length - 1];
        const processedFileNamePart = needFileNameMd5 ? toMd5(actualFileName) : actualFileName;
        pathSegments[pathSegments.length - 1] = processedFileNamePart;
        processedFileName = pathSegments.join('/');
    } else {
        processedFileName = needFileNameMd5 ? toMd5(fileName) : fileName;
    }
    
    return directory ? `${directory}/${processedFileName}` : processedFileName;
}

/**
 * 获取密钥
 * @param {string} secretKey 待解密字符串
 * @returns {string}
 */
function getKey(secretKey){
    if (!secretKey) {
        throw new Error('Secret key is required');
    }
    // RSA 解密
    const jsencrypt = new JSEncrypt();
    jsencrypt.setPrivateKey(bookPrivateKey);
    return jsencrypt.decrypt(secretKey);
}

function toMd5(info){
    return em(`${info}${key}${SALT}${md5Key}`);
}

function em(info) {
    try {
        // Create MD5 hash of the input string
        const hash = CryptoJS.MD5(info);
        // Convert the hash to a hexadecimal string (uppercase)
        return hash.toString(CryptoJS.enc.Hex).toUpperCase();
    } catch (error) {
        console.error(error.toString());
        return '';
    }
}