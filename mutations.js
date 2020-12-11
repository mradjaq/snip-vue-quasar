export const setPagination = (state, payload) => {
  state.pagination = payload;
};

export const setDownloadData = (state, payload) => {
  state.downloadData = payload;
};

export const setUploadData = (state, payload) => {
  state.uploadData = payload;
};

export const setGeneratedDownloadUrl = (state, payload) => {
  state.generatedFileUrl = payload;
};

export const setUploadedDownloadUrl = (state, payload) => {
  state.uploadedFileUrl = payload;
};

export const setUploadUrl = (state, payload) => {
  state.uploadUrl = payload;
};

export const setFileReq = (state, payload) => {
  state.fileReq = payload;
};

export const setLoading = (state, payload) => {
  state.isLoading = payload;
};

export const clearDownloadData = (state) => {
  state.downloadData = [];
};

export const stopGetFile = (state) => {
  state.isStopGetFile = !state.isStopGetFile;
};

export const gettingFile = (state, payload) => {
  state.isGettingFile = payload;
};
