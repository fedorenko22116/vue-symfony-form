import Vue from 'vue';
import Form from '../../src/components/symfony-form.vue';
import { expect } from 'chai';

describe('symfony-component', function() {
    it('parses errors from the json response', function() {
        const errors = {
            children: {
                foo: {
                        errors: [
                            'Foo #2 error',
                            'Foo #1 error'
                        ]
                },
                bar: {
                        errors: [
                            'Bar #1 error'
                        ]
                }
            }
        };

        expect(Form.methods.fetchErrors(errors)).to.deep.equal([
            [ 'foo', 'Foo #2 error' ],
            [ 'bar', 'Bar #1 error' ]
        ]);
    });
});
