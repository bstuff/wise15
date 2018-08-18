// @flow
import React from 'react';
import {
  Form, Text, Field,
} from 'react-form';
import InputMask from 'react-input-mask';
import cn from 'classnames';

import styles from './FullForm.styl';

import { apiService } from '../../api';

// const SomeComponent = stuff => (
//   <pre>
//     {JSON.stringify(stuff, null, 2)}
//   </pre>
// );

// const ComponentWithFormApi = withFormApi(SomeComponent);

export default ({ city, apiUrl, onSubmitSuccess }: {
  apiUrl: string,
  city: string,
  onSubmitSuccess: Function,
}) => (
  <div className={styles.ff}>
    <div className={styles.title}>
      Подключить услугу
    </div>
    <Form
      onSubmit={(values) => {
        apiService.url = apiUrl;
        return apiService.register(values)
          .then(onSubmitSuccess)
          .catch(console.warn);
      }}
    >
      {formApi => (
        <form onSubmit={formApi.submitForm} className={styles.form}>
          <Text
            className={cn(styles.input, {
              [styles.error]: Boolean(formApi.errors?.name) && Boolean(formApi.touched?.name),
            })}
            field="name"
            required
            name="name"
            placeholder="ВАШЕ ИМЯ"
            validate={value => !/[a-я\w]{2,}/.test(value) && ({
              error: 'n',
            })}
          />
          <Text
            className={cn(styles.input, {
              [styles.error]: Boolean(formApi.errors?.email) && Boolean(formApi.touched?.email),
            })}
            field="email"
            type="email"
            required
            placeholder="EMAIL"
            validate={value => !/[^@]*@[^@]*\..*/.test(value) && ({
              error: 'n',
            })}
          />
          <Field
            field="phone"
            validate={value => !/\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}/.test(value) && ({
              error: 'n',
            })}
          >
            {(fieldApi) => {
              const { value, setValue, setTouched } = fieldApi;
              return (
                <InputMask
                  className={cn(styles.input, {
                    [styles.error]: Boolean(formApi.errors?.phone) && Boolean(formApi.touched?.phone),
                  })}
                  placeholder="ТЕЛЕФОН"
                  type="tel"
                  name="mobile phone"
                  mask="+7 (999) 999-99-99"
                  maskChar=" "
                  value={value || ''}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                  onBlur={() => setTouched()}
                />
              );
            }}
          </Field>
          <Text
            className={styles.input}
            field="city"
            placeholder="city"
            disabled
            type="hidden"
            defaultValue={city}
          />
          <Text
            className={cn(styles.input, {
              [styles.error]: Boolean(formApi.errors?.company) && Boolean(formApi.touched?.company),
            })}
            field="company"
            name="company title"
            placeholder="НАЗВАНИЕ КОМПАНИИ"
          />
          <div className={styles.btnWrapper}>
            <button type="submit" className={styles.btn} disabled={formApi.submitting}>
              Отправить заявку на услугу
            </button>
          </div>
        </form>
      )}
    </Form>
  </div>
);
