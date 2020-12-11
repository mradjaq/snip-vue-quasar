export default function () {
  return {
    pagination: {
    },
    uploadCol: [
      {
        name: 'fileid',
        required: true,
        label: 'File ID',
        align: 'center',
        field: 'fileid',
        sortable: true
      },
      {
        name: 'uploadDate',
        label: 'Tanggal Upload',
        align: 'center',
        field: 'uploadDate',
        sortable: true
      },
      {
        name: 'statDesc',
        label: 'Status',
        align: 'center',
        field: 'statDesc',
        sortable: true
      },
      {
        name: 'downloadRes',
        label: 'Download Hasil',
        align: 'center',
        field: 'downloadRes',
        sortable: true
      }
    ],
    downloadCol: [
      {
        name: 'fileid',
        required: true,
        label: 'File ID',
        align: 'center',
        field: 'fileid',
        sortable: true
      },
      {
        name: 'beginDate',
        label: 'Tanggal Awal',
        align: 'center',
        field: 'beginDate',
        sortable: true
      },
      {
        name: 'finishDate',
        label: 'Tanggal Akhir',
        align: 'center',
        field: 'finishDate',
        sortable: true
      },
      {
        name: 'generateDate',
        label: 'Tanggal Generate',
        align: 'center',
        field: 'generateDate',
        sortable: true
      },
      {
        name: 'fileStat',
        label: 'Status File',
        align: 'center',
        field: 'fileStat',
        sortable: true
      },
      {
        name: 'download',
        label: 'Download',
        align: 'center',
        field: 'download',
        sortable: true
      }
    ],
    downloadData: [
      // {
      //   fileid: 'AAHS23',
      //   beginDate: '2020/02/22',
      //   finishDate: '2020/02/30',
      //   generateDate: '2020/02/26',
      //   fileStat: 'Selesai'
      // },
      // {
      //   fileid: 'ABHASS23',
      //   beginDate: '2020/02/12',
      //   finishDate: '2020/02/03',
      //   generateDate: '2020/02/06',
      //   fileStat: 'Undone'
      // },
      // {
      //   fileid: 'AAHS23',
      //   beginDate: '2020/02/22',
      //   finishDate: '2020/02/30',
      //   generateDate: '2020/02/26',
      //   fileStat: 'Selesai'
      // },
      // {
      //   fileid: 'ABHASS23',
      //   beginDate: '2020/02/12',
      //   finishDate: '2020/02/03',
      //   generateDate: '2020/02/06',
      //   fileStat: 'Undone'
      // },
      // {
      //   fileid: 'AAHS23',
      //   beginDate: '2020/02/22',
      //   finishDate: '2020/02/30',
      //   generateDate: '2020/02/26',
      //   fileStat: 'Selesai'
      // },
      // {
      //   fileid: 'ABHASS23',
      //   beginDate: '2020/02/12',
      //   finishDate: '2020/02/03',
      //   generateDate: '2020/02/06',
      //   fileStat: 'Undone'
      // },
      // {
      //   fileid: 'AAHS23',
      //   beginDate: '2020/02/22',
      //   finishDate: '2020/02/30',
      //   generateDate: '2020/02/26',
      //   fileStat: 'Selesai'
      // },
      // {
      //   fileid: 'ABHASS23',
      //   beginDate: '2020/02/12',
      //   finishDate: '2020/02/03',
      //   generateDate: '2020/02/06',
      //   fileStat: 'Undone'
      // },
      // {
      //   fileid: 'AAHS23',
      //   beginDate: '2020/02/22',
      //   finishDate: '2020/02/30',
      //   generateDate: '2020/02/26',
      //   fileStat: 'Selesai'
      // },
      // {
      //   fileid: 'ABHASS23',
      //   beginDate: '2020/02/12',
      //   finishDate: '2020/02/03',
      //   generateDate: '2020/02/06',
      //   fileStat: 'Undone'
      // },
      // {
      //   fileid: 'AAHS23',
      //   beginDate: '2020/02/22',
      //   finishDate: '2020/02/30',
      //   generateDate: '2020/02/26',
      //   fileStat: 'Selesai'
      // },
      // {
      //   fileid: 'ABHASS23',
      //   beginDate: '2020/02/12',
      //   finishDate: '2020/02/03',
      //   generateDate: '2020/02/06',
      //   fileStat: 'Undone'
      // },
      // {
      //   fileid: 'AAHS23',
      //   beginDate: '2020/02/22',
      //   finishDate: '2020/02/30',
      //   generateDate: '2020/02/26',
      //   fileStat: 'Selesai'
      // },
      // {
      //   fileid: 'ABHASS23',
      //   beginDate: '2020/02/12',
      //   finishDate: '2020/02/03',
      //   generateDate: '2020/02/06',
      //   fileStat: 'Undone'
      // },
      // {
      //   fileid: 'AAHS23',
      //   beginDate: '2020/02/22',
      //   finishDate: '2020/02/30',
      //   generateDate: '2020/02/26',
      //   fileStat: 'Selesai'
      // },
      // {
      //   fileid: 'ABHASS23',
      //   beginDate: '2020/02/12',
      //   finishDate: '2020/02/03',
      //   generateDate: '2020/02/06',
      //   fileStat: 'Undone'
      // }

    ],
    uploadData: [
      // {
      //   fileid: 'ASAD62',
      //   uploadDate: '2020-11-12',
      //   stat: 'Selesai'
      // },
      // {
      //   fileid: 'ASAD62',
      //   uploadDate: '2020-11-12',
      //   stat: 'Undone'
      // }
    ],
    headers: [{ name: 'clientname', value: 'nds-ui-dev' },
      { name: 'frontendip', value: '172.18.127.19' },
      { name: 'activityid', value: '3e607467-54f2-428c-92e1-058e061bde03' }],
    fileReq: {},
    generatedFileUrl: '',
    uploadedFileUrl: '',
    uploadUrl: '',
    isLoading: false,
    isStopGetFile: false,
    isGettingFile: false

  };
}
