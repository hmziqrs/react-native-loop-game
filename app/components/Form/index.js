import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Message, TouchNative } from 'rn-hgl/components';
import { Formik } from 'formik';

import { initLayout } from 'utils/ui';

import Button from 'components/Button';
import Input from 'components/Input';

import { colors } from 'configs';
import styles from './styles';

function Form({
  validationSchema,
  initialValues,
  handleSubmit,
  buttonProps,
  innerRef,
  messages,
  fields,
}) {
  return (
    <Formik
      ref={innerRef}
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
      render={({ values, errors, submitForm, setFieldValue, submitCount }) => (
        <>
          {fields.map((field) => {
            const isError = !!(submitCount && errors[field.key]);
            let render = null;
            if (field.render === 'radio') {
              render = (
                <View style={[field.label ? styles.radioHolderWithLabel : {}]}>
                  {field.values.map((option) => (
                    <TouchNative
                      noNative
                      key={option.key}
                      style={styles.radioOptionBase}
                      onPress={() => setFieldValue(field.key, option.value)}
                    >
                      <TouchNative
                        rippleEffect
                        rippleColor={colors.white.alpha(0.3).string()}
                        style={styles.radioCircleBase}
                        onPress={() => setFieldValue(field.key, option.value)}
                      >
                        <View
                          style={[
                            styles.radioCircle,
                            values[field.key] === option.value ? styles.radioCircleActive : {},
                          ]}
                        />
                      </TouchNative>
                      <Message
                        style={styles.radioText}
                        {...messages.values[field.key][option.key]}
                      />
                    </TouchNative>
                  ))}
                </View>
              );
            } else {
              render = (
                <Input
                  baseStyle={[styles.inputBase, field.multiline ? styles.inputBaseMultiline : {}]}
                  {...field}
                  error={isError}
                  value={values[field.key]}
                  placeholder={messages.placeholders[field.key]}
                  onChangeText={(value) => {
                    initLayout();
                    setFieldValue(field.key, value);
                  }}
                />
              );
            }
            return (
              <View key={field.key}>
                {field.label ? (
                  <Message style={styles.label} {...messages.labels[field.key]} />
                ) : null}
                {render}
                {isError && !field.noErrorText ? (
                  <Message style={styles.errorText} {...messages.errors[field.key]} />
                ) : null}
              </View>
            );
          })}
          {handleSubmit ? (
            <Button
              {...buttonProps}
              onPress={() => {
                initLayout();
                submitForm();
              }}
              baseStyle={styles.submitBase}
              style={styles.submit}
            >
              <Message style={styles.submitText} {...messages.submit} />
            </Button>
          ) : null}
        </>
      )}
    />
  );
}

Form.propTypes = {
  validationSchema: PropTypes.object.isRequired,
  initialValues: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  buttonProps: PropTypes.object,
  handleSubmit: PropTypes.func,
  innerRef: PropTypes.func,
};

Form.defaultProps = {
  handleSubmit: null,
  innerRef: (p) => p,
  buttonProps: {},
};

export default Form;
