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
import * as xlsx from 'xlsx';

const form = ref({});

const upload1 = ref<UploadInstance>();
const upload2 = ref<UploadInstance>();
const upload3 = ref<UploadInstance>();

let data11 = [];
let data22 = [];

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
const onSuccess1 = async (file: any) => {
  console.log('文件上传成功时执行1');
  file = file ? file.raw : null;
  console.log(file);
  if (file && file.type === 'application/vnd.ms-excel') {
    const dataBinary = await readFile(file);
    const workBook = xlsx.read(dataBinary, {type: 'binary', cellDates: true});
    const workSheet = workBook.Sheets[workBook.SheetNames[0]];
    const excelData = xlsx.utils.sheet_to_json(workSheet, {header: 1});
    const da = [];
    excelData.forEach((res: Array) => {
      // if (res[4]) {
      if (!res[4]) res[4] = '';
      if (!res[3]) res[3] = '';
      // if (res[3]) {
      //   // console.log(res[3], res[4])
      da.push([res[3].trim(), res[4].trim()]);
      // }

      // }
    });
    console.log(da);

    data11 = da;
  }
};
const onSuccess2 = async (file: any) => {
  console.log('文件上传成功时执行2');
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
      if (res[4]) {
        da.push([res[3].trim(), res[4].trim()]);
      }
    });
    data22 = da;
    allUpdata[1] = true;
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

const i18Json = () => {
  const dataArr = [];
  // console.log(data11, data22)

  // let lodashMergedObj = _.merge({}, data33, dt,);
  // console.log('---', lodashMergedObj); // 输出: { a: 1, b: { x: 1, y: 3, z: 4 }, c: 5 }
  let js = 0;
  const aaa = [];
  data11.forEach((res) => {
    let kk = false;
    let ar = [];

    data22.forEach((res22) => {
      if (res[0] === res22[0] && !res[1]) {
        // dataArr.push(res22)
        kk = true;
        ar = res22;
      }
    });
    js++;
    // if (!kk) dataArr.push(res)
    // else dataArr.push(ar)

    if (kk) {
      aaa.push(ar[1]);
    } else {
      aaa.push(res[1]);
    }
  });
  console.log(js);
  console.log(aaa);
  // console.log(dataArr)
};

/**
 * 对象处理
 * @param obj
 * @param path
 */
</script>

<template>
  <div class="p-5">
    <div style="width: 100%; height: 100%; ">
      <ElForm :model="form" label-width="auto" style="max-width: 600px">
        <ElFormItem label="上传国际化中英对照表格1">
          <ElUpload
            ref="upload1"
            :auto-upload="false"
            :limit="1"
            :on-change="onSuccess1"
            :on-exceed="handleExceed1"
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
        <ElFormItem label="上传国际化中英对照表格2">
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
      </ElForm>

      <ElButton type="primary" @click="i18Json">
        开始生成国际化JSON文件
      </ElButton>
    </div>
  </div>
</template>

<style scoped></style>
