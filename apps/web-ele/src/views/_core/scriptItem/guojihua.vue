<script setup lang="ts">
import type {UploadInstance, UploadProps, UploadRawFile} from 'element-plus';

import {ref} from 'vue';

import {
  ElButton,
  ElForm,
  ElFormItem,
  ElUpload,
  genFileId,
} from 'element-plus';
import _ from 'lodash';
import * as xlsx from 'xlsx';

const form = ref({});

const upload1 = ref<UploadInstance>();
const upload2 = ref<UploadInstance>();
const upload3 = ref<UploadInstance>();

const data1 = ref({});
const data2 = ref({});
const data3 = ref({});
let data11 = {};
let data22 = [];
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
const handleExceed2: UploadProps['onExceed'] = (files) => {
  upload2.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload2.value!.handleStart(file);
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

      if (fileContent) {
        const reg = /export default /i; // o为要替换的关键字，不能加引号，否则替换不生效，i忽略大小写，g表示全局查找。
        let a = '';
        const str1 = fileContent.replace(reg, 'a = ');
        eval(str1);
        data1.value = a;
        data11 = a;
        console.log(a);

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
const onSuccess2 = async (file: any) => {
  console.log('文件上传成功时执行2');
  console.log(file);
  file = file ? file.raw : null;
  console.log(file);
  if (
    file &&
    file.type ===
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ) {
    const dataBinary = await readFile(file);
    const workBook = xlsx.read(dataBinary, {type: 'binary', cellDates: true});
    const workSheet = workBook.Sheets[workBook.SheetNames[0]];
    const excelData = xlsx.utils.sheet_to_json(workSheet, {header: 1});
    const da = [];
    excelData.forEach((res: Array) => {
      if (res[5]) {
        da.push([res[3].trim(), res[6].trim()]);
      }
    });
    // console.log(da)
    data2.value = da;
    data22 = da;
    allUpdata[1] = true;
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
        let a = '';
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

const readFile = (file: any) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.addEventListener('load', (ev) => {
      resolve(ev.target?.result);
    });
  });
};

const CHData = [];
const feiqi = [];
const EnData = {};

const i18Json = () => {
  console.log('i18');
  console.log(data11, data22, data33, '======')


  let ifok = false;
  allUpdata.forEach((r) => {
    if (!r) ifok = true;
  });
  // if (ifok) alert('没上传全！');
  const dt = deepTraverse(data11);
  console.log(data11, 'data11');
  console.log(dt, 'dt');
  console.log(CHData, 'CHData');
  console.log(EnData, 'EnData');
  feiqizhixing();
  console.log(feiqi);

  console.log(data33, 'data33');
  // let a = {
  //   aa: 111,
  //   bb: 11,
  //   cc: {
  //     aa: 11,
  //     bb: 11,
  //     cc: 11,
  //     dd: 11
  //   }
  // }
  //
  // let b = {
  //   cc: {
  //     aa: 22
  //   }
  // }

  const lodashMergedObj = _.merge({}, data33, dt);

  console.log('---', lodashMergedObj); // 输出: { a: 1, b: { x: 1, y: 3, z: 4 }, c: 5 }
};

/**
 * 对象处理
 * @param obj
 * @param path
 */

// let indexArr = [];
function deepTraverse(obj, path = '', index = 0) {
  // let deepArr = [];
  // let enAllArr = {};
  // indexArr[index] = obj

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        // 如果当前属性是对象且不为null，则递归遍历
        obj[key] = deepTraverse(
          obj[key],
          path ? `${path}.${key}` : key,
          index + 1,
        );
      } else {
        if (obj[key]) {
          obj[key] = obj[key].trim();
          let hebingok = false;
          let valueOk = '';
          data22.forEach((res) => {
            if (res[0] === obj[key]) {
              hebingok = true;
              valueOk = res[1];
              CHData.push([key, res[1], res[0]]);
              const EnArr = path.split('.');
              EnArr.push(key);
            }
          });
          obj[key] = hebingok ? valueOk : undefined;
        }
      }
    }
  }
  return obj;
}

async function feiqizhixing() {
  data22.forEach((r) => {
    let okD = false;
    CHData.forEach((r1) => {
      if (r[1] === r1[1]) {
        okD = true;
      }
    });
    if (!okD) {
      feiqi.push(r);
    }
  });
}
</script>

<template>
  <div style="width: 100%; height: 100%">
    <ElForm :model="form" label-width="auto" style="max-width: 600px">
      <ElFormItem label="上传国际化中文文件1111">
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
      <ElFormItem label="上传国际化中英对照表格">
        <ElUpload
          ref="upload2"
          :auto-upload="false"
          :limit="1"
          :on-change="onSuccess2"
          :on-exceed="handleExceed2"
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
