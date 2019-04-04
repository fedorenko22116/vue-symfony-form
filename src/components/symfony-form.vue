<template>
  <form
    ref="form"
    @submit.prevent="onSubmit"
  >
    <div
      v-if="showInvalid"
      :class="errorClass"
    >
      <slot name="warning">
        Whoops! Seems you've entered invalid data.
      </slot>
    </div>
    <slot />
  </form>
</template>

<script>
import serialize from 'form-serialize';
import _ from 'lodash';

export default {
  name: 'SymfonyForm',
  props: {
    action: { type: String, required: true },
    method: { type: String, default: 'GET' },
    errorClass: { type: String, default: 'form-error'},
    dataPrefix: { type: String, default: undefined },
    isSecure: Boolean,
  },
  data() {
    return {
      showInvalid: false
    };
  },
  methods: {
    onSubmit: function() {
      let data = serialize(this.$refs.form, { hash: true });

      this.$emit('beforeSubmit', data);

      this.$connector(this.action, this.method, data, this.isSecure)
        .then((req) => {
          this.clearErrors();

          this.$emit('onSuccess', req);
        })
        .catch((error) => {
          this.$emit('onFail');

          let res = error.response;
          if (res.status >= 400) {
            if (res.data.hasOwnProperty('errors')) {
              this.showErrors(res.data.errors);
              this.showInvalid = false;
            } else {
              this.showInvalid = true;
            }
          }
        });

      this.$emit('onSubmit');
    },
    showErrors: function(errors) {
      this.clearErrors();

      let prefix = this.dataPrefix === undefined ? '' : this.dataPrefix;
      this.fetchErrors(errors, prefix).forEach((value) => {
        let el = this.$refs.form.querySelector('[name=\'' + value[0] + '\']');
        let error = document.createElement('div');
        error.classList.add(this.errorClass);
        error.innerHTML = value[1];
        el.parentNode.insertBefore(error, el);
      });
    },
    clearErrors: function() {
      let errors = this.$refs.form.getElementsByClassName(this.errorClass);

      Array.from(errors).forEach(function(error) {
        error.remove();
      });
    },
    fetchErrors: function(errors, prefix = '') {
      let result = [];

      if (errors.hasOwnProperty('children')) {
        return this.fetchErrors(errors.children, prefix);
      } else {
        _.forOwn(errors, (value, index) => {
          if ('' !== prefix) index = '[' + index + ']';

          if (value.hasOwnProperty('children')) {
            result.push(_.flatten(this.fetchErrors(value, prefix + index)));
          } else if (value.hasOwnProperty('errors')) {
            result.push([prefix + index, value.errors[0]]);
          }
        });
      }

      return result;
    }
  }
};
</script>
