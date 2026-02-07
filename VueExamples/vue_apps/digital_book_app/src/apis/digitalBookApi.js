import request from '@/utils/request';
import CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt'
import { fetchImageAsBase64 } from '@/utils/imageUtils';

const bookJsonFileName = 'book.json';
const bookPrivateKey = import.meta.env.VITE_APP_BOOK_PRIVATE_KEY;
const SALT = import.meta.env.VITE_APP_SALT;

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