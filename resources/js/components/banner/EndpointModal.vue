<template>
  <b-modal id="endpoint-data" no-close-on-esc>
    <template #modal-header-close>
      <p @click="closeModal()">x</p>
    </template>
    <template #modal-title>Endpoint</template>
    <b-form-group id="label-endpoint-name" label="Name" label-for="input-endpoint-name">
      <b-form-input
        id="input-endpoint-name"
        v-model="endpoint.name"
        type="text"
        placeholder="Enter endpoint name"
        required
        :state="endpointNameState"
      ></b-form-input>
      <b-form-invalid-feedback id="input-endpoint-name-feedback">This field is required</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group id="label-endpoint-type" label="Method" label-for="input-endpoint-type">
      <b-form-select
        id="input-endpoint-type"
        v-model="endpoint.type"
        :options="httpMethods"
        :state="endpointTypeState"
        required
      >
        <template #first>
          <b-form-select-option :value="null" disabled>Please select a method</b-form-select-option>
        </template>
      </b-form-select>
      <b-form-invalid-feedback id="input-endpoint-type-feedback">This field is required</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group id="label-endpoint-api" label="API Url" label-for="input-endpoint-api">
      <b-form-input
        id="input-endpoint-api"
        v-model="endpoint.api"
        type="text"
        placeholder="Enter endpoint api"
        required
        :state="endpointApiState"
      ></b-form-input>
      <b-form-invalid-feedback id="input-endpoint-api-feedback">This field is required</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group
      id="label-endpoint-add-params"
      label="Options"
      label-for="input-endpoint-add-params"
    >
      <b-form-checkbox id="input-endpoint-add-params" v-model="addParams" switch>Add more params?</b-form-checkbox>
    </b-form-group>
    <b-form-group
      v-show="addParams"
      id="label-endpoint-api"
      label="API Parameters"
      label-for="input-endpoint-params"
    >
      <div class="row mb-3">
        <div class="col-5">Param</div>
        <div class="col-5">Value</div>
        <div class="col-2">
          <b-button size="sm" variant="primary" @click="addParam()">
            <i class="fa fa-plus"></i>
          </b-button>
        </div>
      </div>
      <div v-for="(item,index) in params" :key="item.id" class="row">
        <div class="col-5">
          <b-form-input v-model="item.key" size="sm" placeholder="Param"></b-form-input>
        </div>
        <div class="col-5">
          <b-form-textarea
            v-model="item.value"
            style="font-size: 11px;"
            placeholder="value..."
            rows="3"
            @change="formatJson(index)"
          ></b-form-textarea>
          <b-form-checkbox
            v-if="viewFlag"
            v-model="item.jsonFormat"
            class="text-right"
            switch
            size="sm"
            @change="formatJson(index, $event)"
          >JSON</b-form-checkbox>
        </div>
        <div class="col-2">
          <b-button size="sm" variant="danger" @click="removeParam(index)">
            <i class="fa fa-trash"></i>
          </b-button>
        </div>
      </div>
    </b-form-group>
    <b-form-group
      id="label-endpoint-description"
      label="Description"
      label-for="input-endpoint-description"
    >
      <b-form-textarea
        id="input-endpoint-description"
        v-model="endpoint.description"
        type="text"
        rows="2"
        placeholder="Enter endpoint description"
        required
        :state="endpointDescriptionState"
      ></b-form-textarea>
      <b-form-invalid-feedback id="input-endpoint-api-feedback">This field is required</b-form-invalid-feedback>
    </b-form-group>
    <template #modal-footer>
      <div class="float-left">
        <button class="btn btn-sm btn-secondary" @click="closeModal()">Cancel</button>
        <button type="button" class="btn btn-primary btn-sm" @click="saveEndpoint()">Save</button>
      </div>
    </template>
  </b-modal>
</template>

<script>
  export default {
    props: { endpointId: { type: Number, required: false, default: undefined } },
    data() {
      return {
        httpMethods: ["GET", "POST", "PUT", "DELETE"],
        endpoint: {
          name: null,
          type: null,
          api: null,
          description: null,
        },
        params: [],
        addParams: false,
        viewFlag: true,
        submitted: false,
        error: null,
      };
    },
    computed: {
      endpointNameState() {
        return (this.endpoint.name !== null && this.endpoint.name !== "") ||
          this.submitted === false
          ? null
          : false;
      },
      endpointTypeState() {
        return (this.endpoint.type !== null && this.endpoint.type !== "") ||
          this.submitted === false
          ? null
          : false;
      },
      endpointApiState() {
        return (this.endpoint.api !== null && this.endpoint.api !== "") ||
          this.submitted === false
          ? null
          : false;
      },
      endpointDescriptionState() {
        return (this.endpoint.description !== null &&
          this.endpoint.description !== "") ||
          this.submitted === false
          ? null
          : false;
      },
    },
    watch: {
      endpointId(val) {
        if (val !== undefined) {
          if (val !== null) {
            this.updateEndpoint(val);
          } else {
            this.createEndpoint();
          }
        }
      },
    },
    methods: {
      clearEndpoint() {
        this.endpoint = {
          name: null,
          type: null,
          api: null,
          description: null,
        };

        this.params = [
          {
            key: "",
            value: "",
            jsonFormat: false,
          },
        ];

        this.addParams = false;
        this.submitted = false;
        this.$emit("clear-selection");
      },
      closeModal() {
        this.clearEndpoint();
        this.$bvModal.hide("endpoint-data");
      },
      addParam() {
        this.params.push({
          id: (Math.random() + 1).toString(36).substring(7),
          key: "",
          value: "",
          jsonFormat: false,
        });
      },
      removeParam(index) {
        this.params.splice(index, 1);
      },
      formatJson(index, event = undefined) {
        this.viewFlag = false;
        const jsonText = this.params[index].value;

        if (this.IsValidJSONString(jsonText)) {
          const jsonObject = JSON.parse(jsonText);

          if (event !== undefined) {
            this.params[index].jsonFormat = event;
          }

          if (this.params[index].jsonFormat) {
            this.params[index].value = JSON.stringify(jsonObject, undefined, 2);
          } else {
            this.params[index].value = JSON.stringify(jsonObject);
          }
        }
        this.viewFlag = true;
      },
      IsValidJSONString(str) {
        try {
          JSON.parse(str);
        } catch (e) {
          return false;
        }
        return true;
      },
      createEndpoint() {
        this.clearEndpoint();
        this.$bvModal.show("endpoint-data");
      },
      updateEndpoint(endpointId) {
        ProcessMaker.apiClient
          .get(`ps_ethos/ps_ethos_connector/${endpointId}`, {})
          .then((response) => {
            const fullApi = response.data.api;
            const apiParts = fullApi.split("?");
            let param = [];

            if (apiParts.length > 1) {
              const params = apiParts[1].split("&");
              for (let i = 0; i < params.length; i += 1) {
                param = params[i].split("=");
                this.params[i] = {
                  id: (Math.random() + 1).toString(36).substring(7),
                  key: param[0],
                  value: param[1],
                  jsonFormat: false,
                };
              }
              this.addParams = true;
            }

            this.endpoint = {
              name: response.data.name,
              type: response.data.type,
              api: apiParts[0],
              description: response.data.description,
            };
          })
          .catch((error) => {
            if (error.response.status === 422) {
              this.error = error.response.data.errors;
            }
          });
        this.$bvModal.show("endpoint-data");
      },
      saveEndpoint() {
        this.submitted = true;
        if (this.validateForm()) {
          const body = {
            id: this.endpointId,
            name: this.endpoint.name,
            type: this.endpoint.type,
            api: this.buildUrl(),
            description: this.endpoint.description,
          };

          if (this.endpointId === null || this.endpointId === undefined) {
            // Creates a new endpoint
            ProcessMaker.apiClient
              .post("ps_ethos/ps_ethos_connector", body)
              .then(() => {
                ProcessMaker.alert("Endpoint successfully saved. ", "success");
              })
              .catch((error) => {
                if (error.response.status === 422) {
                  this.error = error.response.data.errors;
                }
              })
              .finally(() => {
                this.$emit("refresh-data");
                this.closeModal();
              });
          } else {
            // Updates the selected endpoint
            ProcessMaker.apiClient
              .put("ps_ethos/ps_ethos_connector", body)
              .then(() => {
                ProcessMaker.alert("Endpoint successfully saved. ", "success");
              })
              .catch((error) => {
                if (error.response.status === 422) {
                  this.error = error.response.data.errors;
                }
              })
              .finally(() => {
                this.$emit("refresh-data");
                this.closeModal();
              });
          }
        }
      },
      buildUrl() {
        const { api } = this.endpoint;
        const { params } = this;
        const { addParams } = this;
        let param;
        if (addParams) {
          if (params.length > 0) {
            let complement = ``;
            let firstElementValid = false;
            for (let i = 0; i < params.length; i += 1) {
              if (params[i].key !== "" && params[i].value !== "") {
                param = params[i].value;
                if (this.IsValidJSONString(param)) {
                  param = JSON.stringify(JSON.parse(param));
                }
                if (!firstElementValid) {
                  complement += `?${params[i].key}=${param}`;
                  firstElementValid = true;
                } else {
                  complement += `&${params[i].key}=${param}`;
                }
              }
            }
            return api + complement;
          }
          return api;
        }
        return api;
      },
      validateForm() {
        let valid = true;
        const { endpoint } = this;

        if (endpoint.name === null || endpoint.name.length === 0) {
          valid = false;
        }
        if (endpoint.type === null) {
          valid = false;
        }
        if (endpoint.api === null || endpoint.api.length === 0) {
          valid = false;
        }
        if (endpoint.description === null || endpoint.description.length === 0) {
          valid = false;
        }
        return valid;
      },
    },
  };
</script>