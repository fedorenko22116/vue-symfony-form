# vue-symfony-form
Easy to use AJAX forms written to handle symfony form errors.

## Set Up
Enable symfony-form plugin and add connector:
```javascript
import symfonyForm from 'vue-symfony-form';
import connector from 'vue-symfony-form/src/core/connector';

Vue.use(symfonyForm, {
  connector: connector
});
```

Connector is a driver responsible for sending messages. You can replace it with your own.

## Usage
Create new form with `symfony-form` component with required `action` attribute. <br>
Following code will send simple `GET` request to `action` url:
```html
<symfony-form action="/foo">
  <input type="text" name="name" />
  <input type="email" name="email" />
  <button>Send</button>
</symfony-form>
```
When form will be proceeded you'll get appropriate errors above fields in case your form data isn't valid.

That's all.

## Hooks
##### @beforeSubmit(data)
    Action procceeded before data will be sent.
##### @onSuccess(request)
    Action in case of success status
##### @onFail
    Action in case of invalid data
##### @onSubmit
    Action procceeded when request completely sent
    
## Properties
##### :method
    Request method ('GET' by default)
##### :error-class
    Class which will be performed to error divs
##### :data-prefix
    Set unify data prefix for input fields. [dataPrefix][name]
##### :is-secure
    Just a flag to use in connector. You can modify connector and set extra headers for authorized requests

## Slots
##### warning
    Use it to modify default error message in case of request was failed

## Look usage examples in [examples](https://github.com/22116/vue-symfony-form/tree/master/examples) directory
