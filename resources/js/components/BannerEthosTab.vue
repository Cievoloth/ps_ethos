<template>
  <div>
    <b-card header-text-variant="white" footer-tag="footer">
      <b-card-text>
        <div class="row">
          <div class="col-12 col-md-4">
            <div class="input-group">
              <div class="input-group-prepend">
                <span id="basic-addon1" class="input-group-text">
                  <i class="fas fa-search"></i>
                </span>
              </div>
              <input v-model="filter" class="form-control" placeholder="Find Endpoint..." />
            </div>
          </div>
          <div class="col-6 offset-md-4 col-md-2">
            <button class="btn btn-success btn-sm btn-block" @click="addEndpoint()">
              <i class="fas fa-plus"></i> Endpoint
            </button>
          </div>
          <div class="col-6 col-md-2">
            <button class="btn btn-info btn-sm btn-block" @click="regenerateConnectors()">
              <i class="fas fa-sync-alt"></i> Regenerate
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <b-table
              ref="endpointsTable"
              class="mt-3"
              responsive
              striped
              hover
              bordered
              :fields="fields"
              :items="getData"
              :busy="loading"
              :per-page="perPage"
              :current-page="currentPage"
              :filter="filter"
              show-empty
            >
              <template #empty="scope">
                <h4 class="text-center" style="padding:50px 0px">
                  <i class="fas fa-times-circle"></i>
                  {{ scope.emptyText }}
                </h4>
              </template>
              <template #emptyfiltered="scope">
                <h4 class="text-center" style="padding:50px 0px">
                  <i class="fas fa-times-circle"></i>
                  {{ scope.emptyFilteredText }}
                </h4>
              </template>
              <template #table-busy>
                <div class="text-center mt-5 my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>
              <template #cell(actions)="data">
                <b-button-group size="sm">
                  <b-button
                    v-b-tooltip.hover
                    title="Edit"
                    variant="info"
                    @click="editEndpoint(data.item.id)"
                  >
                    <i class="fas fa-edit"></i>
                  </b-button>
                  <b-button
                    v-b-tooltip.hover
                    title="Delete"
                    variant="danger"
                    @click="deleteEndpoint(data.item.id)"
                  >
                    <i class="fas fa-trash"></i>
                  </b-button>
                </b-button-group>
              </template>
            </b-table>
          </div>
        </div>
        <div class="row">
          <div class="col-4 text-align-left">
            <p v-show="captionTableToggle">
              {{ 1 + (currentPage - 1) * 10 }} -
              {{
              totalRows > currentPage * 10
              ? currentPage * 10
              : totalRows
              }}
              of {{ totalRows }} Endpoints
            </p>
          </div>
          <div class="col-8 offset-md-4 col-md-4">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              align="fill"
              size="sm"
              class="my-0"
            ></b-pagination>
          </div>
        </div>
      </b-card-text>
    </b-card>
    <endpoint-modal
      :endpoint-id="selectedEndpoint"
      @refresh-data="refreshData"
      @clear-selection="clearSelection"
    ></endpoint-modal>
  </div>
</template>

<script>
  import EndpointModal from "./banner/EndpointModal.vue";

  export default {
    components: { EndpointModal },

    data() {
      return {
        fields: [
          { key: "name", label: "Name" },
          { key: "type", label: "Type" },
          { key: "api", label: "Api" },
          { key: "description", label: "Description" },
          { key: "actions", label: "Actions" },
        ],
        endpoints: [],
        selectedEndpoint: undefined,
        filter: "",
        loading: false,
        currentPage: 1,
        perPage: 10,
        lastPage: null,
        totalRows: 0,
        error: null,
      };
    },
    computed: {
      captionTableToggle() {
        return this.totalRows !== 0;
      },
    },
    methods: {
      clearSelection() {
        this.selectedEndpoint = undefined;
      },
      refreshData() {
        this.clearSelection();
        this.$refs.endpointsTable.refresh();
      },
      getData() {
        const promise = ProcessMaker.apiClient.get(
          `ps_ethos/ps_ethos_connector?page=${this.currentPage}&filter=${this.filter}&per_page=${this.perPage}`
        );

        return promise
          .then((response) => {
            this.totalRows = response.data.meta.total;
            const items = response.data.data;
            return items || [];
          })
          .catch((error) => {
            if (error.response.status === 422) {
              this.error = error.response.data.errors;
            }
          })
          .finally(() => {
            this.loading = false;
            // this.emptyData();
          });
      },

      regenerateConnectors() {
        ProcessMaker.apiClient
          .get("ps_ethos/auth", {})
          .then((response) => {
            if (response.data.split(" ").includes("ERROR:")) {
              ProcessMaker.alert(response.data, "warning");
            } else {
              ProcessMaker.alert(response.data, "success");
            }
          })
          .catch((error) => {
            if (error.response.status === 422) {
              this.error = error.response.data.errors;
            }
          })
          .finally(() => {
            this.refreshData();
          });
      },
      addEndpoint() {
        this.selectedEndpoint = null;
      },
      editEndpoint(id) {
        this.selectedEndpoint = id;
      },
      deleteEndpoint(id) {
        ProcessMaker.confirmModal(
          "Caution!",
          `Are you sure to delete this endpoint`,
          "",
          () => {
            ProcessMaker.apiClient
              .post(`ps_ethos/ps_ethos_connector/${id}`, {})
              .then(() => {
                ProcessMaker.alert("Endpoint successfully deleted ", "success");
              })
              .catch((error) => {
                if (error.response.status === 422) {
                  this.error = error.response.data.errors;
                }
              })
              .finally(() => {
                this.refreshData();
              });
          }
        );
      },
    },
  };
</script>