<template>
  <q-page class="q-pa-md bg-grey-1">
    <!-- Download Part -->
    <q-card class="q-py-md q-px-xl">
      <div>
        <div class="text-h6 text-primary">
          Download File
        </div>
        <div class="row items-start q-col-gutter-md q-pt-lg q-pb-md">
          <!-- Date Picker for Start Date Generate File -->
          <div class="row">
            <div class="text-body1 text-weight-medium q-mt-md q-mr-sm">
              Tanggal Awal
            </div>
            <div>
              <date-picker
                v-model="beginningDate"
                :min-date="beginMinDate"
                between
                required
                :max-date="beginMaxDate"
                name="beginningDate"
              />
            </div>
          </div>
          <!-- Date Picker for End Date Generate File -->
          <div class="row">
            <div class="text-body1 text-weight-medium q-mt-md q-mr-sm">
              Tanggal Akhir
            </div>
            <date-picker
              v-model="endDate"
              :disable="disableEndDate"
              :min-date="beginningDate"
              required
              between
              :max-date="beginMaxDate"
              name="endDate"
            />
          </div>
          <div class="q-pt-lg">
            <!-- Generate Btn -->
            <q-btn
              :disable="isBtnDisable"
              unelevated
              class="text-capitalize q-px-md"
              width="80px"
              name="generateBtn"
              color="primary"
              label="Generate File"
              @click="generateDPLK"
            />
          </div>
        </div>
        <!-- Table of Generated File -->
        <q-table
          name="downloadTable"
          flat
          bordered
          class="q-mt-sm"
          row-key="name"
          :columns="downloadCol"
          :data="downloadData"
          :loading="isLoading"
          :pagination.sync="pagination"
          :filter="filter"
          @request="onRequest"
        >
          <!-- table header -->
          <template v-slot:header="props">
            <q-tr
              :props="props"
              class="bg-light-blue-6 text-white"
            >
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
                class="text-weight-bold text-center"
                style="font-size: 1rem"
              >
                <div
                  id="headCol"
                  class="q-ml-sm"
                >
                  {{ col.label }}
                </div>
              </q-th>
            </q-tr>
          </template>
          <!-- fill download cell Button -->
          <template v-slot:body-cell-download="downloadCell">
            <q-td :props="downloadCell">
              <div class="q-ml-sm">
                <div class="flex flex-center">
                  <q-btn
                    v-if="downloadCell.row.fileStat === 'Generated'"
                    flat
                    round
                    name="downloadGeneratedBtn"
                    unelevated
                    class="text-capitalize q-px-md q-py-xs"
                    width="50px"
                    color="primary"
                    @click="download(downloadCell.row)"
                  >
                    <q-icon name="ion-cloud-download" />
                  </q-btn>
                  <q-skeleton
                    v-else
                    size="50px"
                    type="circle"
                    class="bg-primary"
                    animation="blink"
                    width="125px"
                  />
                </div>
              </div>
            </q-td>
          </template>
        </q-table>
      </div>
    </q-card>
  </q-page>
</template>
<script>
import { mapActions } from 'vuex';
import DatePicker from 'src/components/Field/DatePicker/Default';

export default {
  components: { DatePicker },
  data() {
    return {
      filter: '', // Table Filter
      beginningDate: '', // start date generate file
      endDate: '', // end date for generate file
      dayInMiliSeconds: 86400000, // miliseconds a day
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 5,
        rowsNumber: 10
      }
    };
  },
  computed: {
    serverPagination: { // pagination from server
      get() {
        return this.$store.state.dplk.pagination;
      }
    },
    isLoading: { // flag loading
      get() {
        return this.$store.state.dplk.isLoading;
      }
    },
    downloadCol: { // setup download columns
      get() {
        return this.$store.state.dplk.downloadCol;
      }
    },
    downloadData: { // Data for Table Download
      get() {
        return this.$store.state.dplk.downloadData;
      }
    },
    generatedFileUrl: { // url for download generated file
      get() {
        return this.$store.state.dplk.generatedFileUrl;
      }
    },
    beginMinDate() { // filter date 30 days before until today
      let today = new Date();
      today.setDate(today.getDate() - 30); // tomorrow
      today = today.toJSON().slice(0, 10).replace(/-/g, '/');
      return today;
    },
    beginMaxDate() { // today as filter maxDate
      let today = new Date();
      today = today.toJSON().slice(0, 10).replace(/-/g, '/');
      return today;
    },
    disableEndDate: { // flag disable end Date picker
      get() {
        if (this.beginningDate === '') return true;
        return false;
      }
    },
    isBtnDisable: { // flag disable btn generate
      get() {
        return this.beginningDate === '' || this.endDate === ''
        || this.endDate.replace(/-|[/]/g, '') < this.beginningDate.replace(/-|[/]/g, '')
        || this.beginningDate.replace(/-|[/]/g, '') > this.beginMaxDate.replace(/-|[/]/g, '')
        || this.endDate.replace(/-|[/]/g, '') > this.beginMaxDate.replace(/-|[/]/g, '');
      }
    }

  },
  mounted() {
    this.initUrl();
    // get initial data from server (1st page)
    if (this.isLoading) {
      this.onRequest({
        pagination: this.pagination,
        filter: undefined
      });
    }
  },
  methods: {
    ...mapActions('dplk', ['initUrl', 'generateFile', 'getFile', 'downloadFile', 'showUploadModal']),
    async onRequest(props) {
      const {
        page, rowsPerPage, sortBy, descending
      } = props.pagination;
      const { filter } = props;
      this.pagination.rowsNumber = this.getRowsNumberCount(filter);

      this.$store.commit('dplk/setFileReq', {
        status: '',
        index: page === 1 ? 1 : rowsPerPage * (page - 1) + 1,
        limit: rowsPerPage
      });

      if (this.$store.state.dplk.isGettingFile) this.$store.commit('dplk/stopGetFile');
      await this.getFile({
        date: {
          start: this.beginningDate,
          end: this.endDate
        },
        file: this.$store.state.dplk.fileReq
      });
      // update local pagination Obj
      this.pagination.page = this.serverPagination.currentpage;
      this.pagination.rowsPerPage = rowsPerPage;
      this.pagination.sortBy = sortBy;
      this.pagination.descending = descending;
    },
    getRowsNumberCount(filter) {
      if (!filter) {
        return this.serverPagination.total;
      }
      let count = 0;
      this.downloadData.forEach((treat) => {
        if (treat.name.includes(filter)) {
          count += 1;
        }
      });
      return count;
    },
    async generateDPLK() { // dispatch generateFile
      await this.generateFile({ date: { start: this.beginningDate, end: this.endDate } });
      this.pagination.rowsNumber = this.serverPagination.total;
    },
    async download(file) {
      this.downloadFile({
        file,
        typeOfFile: 'Generated'
      });
    }
  }

};
</script>
<style>
 #headCol {

   margin-bottom: -25px;
 }
</style>
