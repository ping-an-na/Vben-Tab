<script setup lang="ts">
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus';

import { ref } from 'vue';

import {
  ElButton,
  ElForm,
  ElFormItem,
  ElUpload,
  genFileId,
} from 'element-plus';
import _ from 'lodash';

import { baidu } from '#/api';

const form = ref({});

const upload1 = ref<UploadInstance>();
const upload2 = ref<UploadInstance>();
const upload3 = ref<UploadInstance>();

const data1 = ref({});
const data3 = ref({});
let data11 = {};
let data33 = {};

/**
 * 只上传一个
 * @param files
 */
const handleExceed1: UploadProps['onExceed'] = (files) => {
  console.log('11');
  upload1.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload1.value!.handleStart(file);
};
const handleExceed3: UploadProps['onExceed'] = (files) => {
  upload3.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload3.value!.handleStart(file);
};

/**
 * 文件上传成功时执行
 */
const allUpdata = [false, false, false];
const onSuccess1 = (file: any) => {
  file = file ? file.raw : null;
  console.log(file);
  if (file && file.type === 'text/javascript') {
    let fileContent = null;
    const reader = new FileReader();
    reader.addEventListener('load', (e) => {
      fileContent = e.target?.result || null;
      // console.log(fileContent)
      if (fileContent) {
        const reg = /export default /i; // o为要替换的关键字，不能加引号，否则替换不生效，i忽略大小写，g表示全局查找。
        const a = '';
        const str1 = fileContent.replace(reg, 'a = ');
        eval(str1);
        data1.value = a;
        data11 = a;
        // console.log(data1.value)
        allUpdata[0] = true;
      }
    });
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };
    reader.readAsText(file);
  } else {
    alert('Please upload a valid JavaScript file.');
  }
};
const onSuccess3 = (file: any) => {
  file = file ? file.raw : null;
  console.log(file);
  if (file && file.type === 'text/javascript') {
    let fileContent = null;
    const reader = new FileReader();
    reader.addEventListener('load', (e) => {
      fileContent = e.target?.result || null;
      // console.log(fileContent)
      if (fileContent) {
        const reg = /export default /i; // o为要替换的关键字，不能加引号，否则替换不生效，i忽略大小写，g表示全局查找。
        const a = '';
        const str1 = fileContent.replace(reg, 'a = ');
        eval(str1);
        data3.value = a;
        data33 = a;
        allUpdata[2] = true;
        // console.log(data3.value)
      }
    });
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };
    reader.readAsText(file);
  } else {
    alert('Please upload a valid JavaScript file.');
  }
};
let jishua = 0;
const i18Json = async () => {
  const lodashMergedObj = _.merge({}, data11, data33);
  console.log(lodashMergedObj);

  const a = {
    a: '船名/航次',
    b: {
      // c: "亲情",
      d: '货类与箱型不匹配',
      c: 'lo ve',
    },
  };

  // let adata = await deepTraverse11(a)
  const adata = await deepTraverse11(lodashMergedObj);
  console.log(adata);
  console.log(jishua);
};

function isEnWord(str) {
  // return /^[A-Za-z]+('[a-zA-Z-]+|[a-zA-Z-]*)$/.test(str)
  return /^[A-Z0-9."'>{&。㎥},，+;!！/:¥)(©?：（）？…”“-]+('[a-z0-9-]+|[a-z0-9-]*)$/i.test(
    str,
  );
}
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function deepTraverse11(obj, path = '') {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        // 如果当前属性是对象且不为null，则递归遍历
        // obj[key] = deepTraverse(obj[key], newPath);
        obj[key] = await deepTraverse11(obj[key]);
      } else {
        if (obj[key]) {
          let a = obj[key];
          const b = a.replaceAll(/\s/g, '');
          if (isEnWord(b)) {
            a = obj[key];
            // a = await deepTraverse(obj[key])
          } else {
            jishua++;
            console.log(jishua);
            await delay(600);
            a = await deepTraverse(obj[key]);
            console.log(a);
          }
          obj[key] = a;
        }
        // 如果当前属性不是对象，则打印路径和值
        // console.log(`Path: ${newPath}, Value: ${capitalizeWords(obj[key])}`);
      }
    }
  }
  return obj;
}

async function deepTraverse(obj) {
  function truncate(q) {
    const len = q.length;
    if (len <= 20) return q;
    return q.slice(0, 10) + len + q.substring(len - 10, len);
  }

  function objectToQueryString(obj) {
    // 使用 Array.prototype.map 和 URLSearchParams 来转换对象
    // 注意：URLSearchParams 是现代浏览器内置的对象，不需要额外安装库
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(obj)) {
      params.append(key, value);
    }
    return params.toString();
  }

  const appKey = '6c962b5af947708b';
  const key = 'qYjlP5r513ciUH0DujdVLRvSnk7wUTjZ'; // 注意：暴露appSecret，有被盗用造成损失的风险
  const salt = Date.now();
  const curtime = Math.round(Date.now() / 1000);
  const query = obj;
  const from = 'auto';
  const to = 'en';
  const str1 = appKey + truncate(query) + salt + curtime + key;
  // var vocabId = '您的用户词表ID';
  const sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex);

  const data = {
    q: query,
    appKey,
    salt,
    from,
    to,
    sign,
    signType: 'v3',
    curtime,
  };
  const apiDataDD = await baidu(objectToQueryString(data));
  if (apiDataDD && apiDataDD.translation) {
    return apiDataDD.translation[0] ? apiDataDD.translation[0] : obj;
  } else {
    return obj;
  }
}
</script>

<template>
  <div style="width: 100%; height: 100%">
    <ElForm :model="form" label-width="auto" style="max-width: 600px">
      <ElFormItem label="上传国际化中文文件">
        <ElUpload
          ref="upload1"
          :auto-upload="false"
          :limit="1"
          :on-change="onSuccess1"
          :on-exceed="handleExceed1"
          action="#"
          class="upload-demo"
        >
          <template #trigger>
            <ElButton type="primary">请选择文件</ElButton>
          </template>

          <template #tip>
            <div class="el-upload__tip text-red">仅限上传一个文件</div>
          </template>
        </ElUpload>
      </ElFormItem>
      <ElFormItem label="上传英文/日/韩国际化原本文件">
        <ElUpload
          ref="upload3"
          :auto-upload="false"
          :limit="1"
          :on-change="onSuccess3"
          :on-exceed="handleExceed3"
          action="alert"
          class="upload-demo"
        >
          <template #trigger>
            <ElButton type="primary">请选择文件</ElButton>
          </template>

          <template #tip>
            <div class="el-upload__tip text-red">仅限上传一个文件</div>
          </template>
        </ElUpload>
      </ElFormItem>
    </ElForm>

    <ElButton type="primary" @click="i18Json">
      开始生成国际化JSON文件
    </ElButton>
  </div>
</template>

<style scoped></style>
