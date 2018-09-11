<template>
  <form @submit.prevent="onSubmit" ref="form">
    <div class="alert alert-danger" v-if="showInvalid">Whoops! Seems you've entered invalid data.</div>
    <slot></slot>
  </form>
</template>

<script>
import connector from "../core/connector";
import serialize from "form-serialize";
import _ from "lodash";

export default {
  name: "symfony-form",
  props: {
    action: { type: String, required: true },
    method: { type: String, default: 'GET' },
    dataPrefix: String,
    isSecure: Boolean
  },
  data() {
    return {
      showInvalid: false
    };
  },
  methods: {
    onSubmit: function() {
      let that = this;
      let data = serialize(this.$refs.form, { hash: true });

      this.$emit("beforeSubmit", data);

      connector(this.action, this.method, data, this.isSecure)
        .then(function(req) {
          that.clearErrors();

          that.$emit("onSuccess", req);
        })
        .catch(function(error) {
          that.$emit("onFail");

          let res = error.response;
          if (res.status === 400) {
            if (res.data.hasOwnProperty("errors")) {
              that.showErrors(res.data.errors);
              that.showInvalid = false;
            } else {
              that.showInvalid = true;
            }
          }
        });

      this.$emit("onSubmit");
    },
    showErrors: function(errors) {
      this.clearErrors();

      let prefix = this.dataPrefix === undefined ? "" : this.dataPrefix;
      this.fetchErrors(errors, prefix).forEach((value) => {
        let el = this.$refs.form.querySelector("[name='" + value[0] + "']");
        let error = document.createElement("div");
        error.classList.add("alert");
        error.classList.add("alert-danger");
        error.innerHTML = value[1];
        el.parentNode.insertBefore(error, el);
      });
    },
    clearErrors: function() {
      let errors = this.$refs.form.getElementsByClassName("alert-danger");

      Array.from(errors).forEach(function(error) {
        error.remove();
      });
    },
    fetchErrors: function(errors, prefix = "") {
      let that = this;
      let result = [];

      if (errors.hasOwnProperty("children")) {
        return that.fetchErrors(errors.children, prefix);
      } else {
        _.forOwn(errors, function(value, index) {
          if ("" !== prefix) index = "[" + index + "]";

          if (value.hasOwnProperty("children")) {
            result.push(_.flatten(that.fetchErrors(value, prefix + index)));
          } else if (value.hasOwnProperty("errors")) {
            result.push([prefix + index, value.errors[0]]);
          }
        });
      }

      return result;
    }
  }
};
</script>
