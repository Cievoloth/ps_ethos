<template>
  <b-card header-text-variant="white" footer-tag="footer">
    <div class="row">
      <div class="col-md-6 col-sm-12">
        <b-form-group id="label-config-uri" label="Base URI:" label-for="input-config-uri">
          <b-form-input
            id="input-config-uri"
            v-model="config.uri"
            type="text"
            placeholder="Enter Base URI"
            required
            :state="configUriState"
          ></b-form-input>
          <b-form-invalid-feedback id="input-config-uri-feedback">This field is required</b-form-invalid-feedback>
        </b-form-group>
      </div>
      <div class="col-md-6 col-sm-12">
        <b-form-group
          id="label-config-ethos-key"
          label="Ethos Key:"
          label-for="input-config-ethos-key"
        >
          <b-form-input
            id="input-config-ethos-key"
            v-model="config.ethosToken"
            type="password"
            placeholder="Enter Ethos Key"
            required
            :state="configEthosKeyState"
          ></b-form-input>
          <b-form-invalid-feedback id="input-config-ethos-key-feedback">This field is required</b-form-invalid-feedback>
        </b-form-group>
      </div>
    </div>
    <br />
    <div class="row">
      <div class="col-sm-12" align="right">
        <b-button variant="info" @click="saveConfig()">
          <i class="fa fa-save"></i> Save
        </b-button>
      </div>
    </div>
  </b-card>
</template>

<script>
  export default {
    data() {
      return {
        config: {
          uri: null,
          ethosToken: null,
        },
        error: null,
        submitted: false,
      };
    },
    computed: {
      configUriState() {
        return (this.config.uri !== null && this.config.uri !== "") ||
          this.submitted === false
          ? null
          : false;
      },
      configEthosKeyState() {
        return (this.config.ethosToken !== null &&
          this.config.ethosToken !== "") ||
          this.submitted === false
          ? null
          : false;
      },
    },
    mounted() {
      this.getConfig();
    },
    methods: {
      getConfig() {
        ProcessMaker.apiClient
          .get("ps_ethos/get-config", {})
          .then((response) => {
            this.config.uri = response.data.uri;
            this.config.ethosToken = response.data.ethosKey;
          })
          .catch((error) => {
            if (error.response.status === 422) {
              this.error = error.response.data.errors;
            }
          });
      },
      saveConfig() {
        this.submitted = true;
        if (this.validateForm()) {
          ProcessMaker.apiClient
            .put("ps_ethos/config-update", {
              base_uri: this.config.uri,
              ethos_token: this.config.ethosToken,
            })
            .then(() => {
              ProcessMaker.alert("The configuration has been updated", "success");
              this.submitted = false;
            })
            .catch((error) => {
              if (error.response.status === 422) {
                this.error = error.response.data.errors;
              }
            });
        }
      },
      validateForm() {
        let valid = true;
        const { config } = this;

        if (config.uri === null || config.uri.length === 0) {
          valid = false;
        }

        if (config.ethosToken === null || config.ethosToken.length === 0) {
          valid = false;
        }

        return valid;
      },
    },
  };
</script>