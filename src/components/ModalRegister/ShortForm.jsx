// @flow
import React from 'react';
import { Form, Text } from 'react-form';
import cn from 'classnames';

import styles from './FullForm.styl';

import { apiService } from '../../api';

export default ({ city, apiUrl, onSubmitSuccess }: {
  apiUrl: string,
  city: string,
  onSubmitSuccess: Function,
}) => (
  <div className={styles.ff}>
    <div className={styles.title}>
      Связаться с Gett Delivery
    </div>
    <div className={styles.subtitle}>
      Данный спецтариф пока работает только в Москве, но если вы хотите его в своем
      городе, оставьте свои контакты и мы вас уведомим, когда он появится в вашем городе
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
              [styles.error]: Boolean(formApi.errors?.email) && Boolean(formApi.touched?.email),
            })}
            field="email"
            type="email"
            name="email"
            placeholder="ЭЛ. ПОЧТА"
            validate={value => !/[^@]*@[^@]*\..*/.test(value) && ({
              error: 'n',
            })}
          />
          <Text
            className={styles.input}
            field="city"
            placeholder="city"
            disabled
            type="hidden"
            defaultValue={city}
          />
          <div className={styles.btnWrapper}>
            <button type="submit" className={styles.btn}>
              Уведомить меня
            </button>
          </div>
        </form>
      )}
    </Form>
  </div>
);
