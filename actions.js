import {
  showOnProgress, hideLoading, showErrorNotification, showNotification
} from 'src/utils/ui';
import Config from 'src/config';
import DPLKService from 'src/services/dplk';
import { exportFile } from 'quasar';

export const initUrl = ({ commit }) => { // init all url for download and upload DPLK file
  commit('setGeneratedDownloadUrl', `${Config.dplkDownloadUrl}s3f_generated_files/`);
  commit('setUploadedDownloadUrl', `${Config.dplkDownloadUrl}s3f_upload_result/`);
  commit('setUploadUrl', Config.dplkUploadUrl);
};

// Download Part
const generateFile = async ({
  commit, state, rootGetters, dispatch
}, { date }) => {
  try {
    showOnProgress({ message: 'Please Wait' });
    const metadata = rootGetters.metadata();

    await DPLKService.generateFile({ date, metadata });

    commit('setFileReq', {
      status: '', // filter status
      index: 1, // first number of page
      limit: 5 // rows per page

    });
    if (state.isGettingFile) { // stop getting file if it is running
      commit('stopGetFile');
    }
    await dispatch('getFile', { // dispatch getFile
      file: state.fileReq,
      date
    });
    hideLoading();
  } catch (err) {
    hideLoading();
    showErrorNotification({
      err,
      name: '[DPLK-ACTIONS] Generate File Error'
    });
  }
};

const getFile = async ({
  state, commit, dispatch, rootGetters
}, {
  file, date
}) => {
  const route = global.location.href.split('/');
  if (route[route.length - 1] !== 'downloadS3fDPLK') return;
  commit('setLoading', true);
  const metadata = rootGetters.metadata();
  const user = rootGetters.userid;
  const res = await DPLKService.getFile({
    file, metadata, date, user
  });
  commit('setDownloadData', res.fileList); // set data of download table
  commit('setPagination', res.pagination); // set server pagination
  commit('setLoading', false);

  for (let i = 0; i < res.fileList.length; i++) { // continuously call get file
    commit('gettingFile', true);
    if (res.fileList[i].fileStat === 'Pending') { // as long as file stat still pending
      setTimeout(() => {
        if (state.isStopGetFile) { // stop current loop if getFile triggered again
          commit('stopGetFile');
          return;
        }
        dispatch('getFile', {
          file, metadata, date, user
        });
      }, 5000);
      return;
    }
  }
  commit('gettingFile', false);
};

// Upload Part
const showUploadModal = async ({ dispatch }, { parent }) => {
  const $q = await import('quasar');
  // import component
  const { default: dialogComponent } = await import('src/components/Dialog/DplkUpload');
  await new Promise((resolve) => {
    $q.Dialog.create({ // create dialog of imported component
      component: dialogComponent,
      parent,
      persistent: true
    }).onOk((file) => { // when file is successfully uploaded
      showNotification({
        message: 'File Has Been Uploaded Successfully',
        color: 'green'
      });
      console.log('file: ', file.files[0]);
      const reqFile = file.files[0];
      dispatch('uploadFile', { file: reqFile });
      resolve();
    });
  });
};

const uploadFile = async ({
  state, commit, rootGetters, dispatch
}, { file }) => {
  try {
    showOnProgress({ message: 'Please Wait' });
    const metadata = rootGetters.metadata();
    const FileID = await DPLKService.uploadFile({ file, metadata });

    showNotification({
      message: `Upload Success File ID: ${FileID.fileid}`,
      color: 'green'
    });

    commit('setFileReq', {
      name: '', // as filter name
      uploadDate: '', // as filter date
      status: '', // as filter status
      index: 1, // first number of a page
      limit: 5 // rows per pages
    });

    if (state.isGettingFile) { // stop getting file if it is running
      commit('stopGetFile');
    }
    await dispatch('getUploadedFile', {
      file: state.fileReq
    });
    // const res = await DPLKService.getUploadedFile({ file: reqFile, user, metadata });
    // commit('setUploadData', res.fileList);

    hideLoading();
  } catch (err) {
    hideLoading();
    showErrorNotification({
      err,
      name: '[DPLK-ACTIONS] Generate File Error'
    });
  }
};

const getUploadedFile = async ({
  state, commit, dispatch, rootGetters
}, {
  file
}) => {
  const route = global.location.href.split('/');
  if (route[route.length - 1] !== 'uploadS3fDPLK') return;
  const metadata = rootGetters.metadata();
  const user = {
    id: rootGetters.userid,
    branch: rootGetters.branch
  };
  commit('setLoading', true);

  const res = await DPLKService.getUploadedFile({ file, user, metadata });
  commit('setUploadData', res.fileList); // set data of upload table
  commit('setPagination', res.pagination); // set server pagination
  commit('setLoading', false);

  for (let i = 0; i < res.fileList.length; i++) { // continuously call get file
    commit('gettingFile', true);
    if (res.fileList[i].statDesc === 'Pending') { // as long as file stat still pending
      setTimeout(() => {
        if (state.isStopGetFile) {
          commit('stopGetFile');
          return;
        }
        dispatch('getUploadedFile', {
          file, user, metadata
        });
      }, 5000);
      return;
    }
  }
  commit('gettingFile', false);
};

const showError = async (_, { message }) => {
  showErrorNotification({
    err: message,
    name: 'Error on upload process'
  });
};

const downloadFile = async ({ state }, { file, typeOfFile }) => {
  try {
    let URL = '';
    if (typeOfFile === 'Generated') URL = `${state.generatedFileUrl}${file.filename}`;
    else URL = `${state.uploadedFileUrl}${file.filename}`;
    const res = await fetch(URL, {
      headers: { 'Content-Type': 'application/json', clientname: 'nds-ui-dev' }
    });
    console.log('error: ', res);
    exportFile(`${file.filename}`, await res.blob());
  } catch (err) {
    showErrorNotification({
      err,
      name: '[DPLK-ACTIONS] Download File Error'
    });
  }
};
export {
  getFile, getUploadedFile, uploadFile, showUploadModal, generateFile, showError, downloadFile
};
