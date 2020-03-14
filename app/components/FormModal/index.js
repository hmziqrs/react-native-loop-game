import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Message, TouchNative } from 'rn-hgl/components';
import { isIOS } from 'rn-hgl/platform';
import { Formik, isString } from 'formik';

import Input from 'components/Input';
import Error from 'components/Error';
import Modal from 'components/Modal';

import Button from 'components/Button';
import { hideKeyboard } from 'rn-hgl/utils';
import styles from './styles';

class FormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      map,
      toggle,
      onSubmit,
      messages,
      hideForm,
      allowDismiss,
      useDefaultErrors,
      atRootBottomRender,
      disableKeyboardSpacer,
      ...props
    } = this.props;
    return (
      <Modal {...props} style={styles.base}>
        <View style={styles.flex}>
          <TouchNative
            noNative
            activeOpacity={1}
            style={styles.scrollBaseTouch}
            onPress={() => (allowDismiss ? toggle() : null)}
          >
            <ScrollView
              style={styles.scrollBase}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.scrollContent}
            >
              <TouchNative noTouch={!isIOS} activeOpacity={1} onPress={() => hideKeyboard()}>
                <View style={styles.formContainerTouchBase}>
                  <View style={styles.formContainer}>
                    {messages.title ? (
                      <>
                        {isString(messages.title) ? (
                          <Text style={styles.title}>{messages.title}</Text>
                        ) : (
                          <Message {...messages.title} style={styles.title} />
                        )}
                      </>
                    ) : null}
                    {messages.desc ? <Message {...messages.desc} style={styles.desc} /> : null}
                    {!hideForm ? (
                      <Formik
                        {...map}
                        ref={(node) => {
                          if (node) {
                            this.form = node;
                          }
                        }}
                        onSubmit={onSubmit}
                        render={({ values, errors, submitCount, setFieldValue }) => (
                          <>
                            {map.fields.map((field) => (
                              <View key={field.key} style={styles.field}>
                                <Input
                                  {...field}
                                  value={values[field.key]}
                                  baseStyle={styles.inputBase}
                                  placeholder={messages.placeholders[field.key]}
                                  onChangeText={(val) => setFieldValue(field.key, val)}
                                />
                                {errors[field.key] && submitCount ? (
                                  <Error
                                    style={styles.error}
                                    text={
                                      useDefaultErrors
                                        ? errors[field.key]
                                        : messages.errors[field.key]
                                    }
                                  />
                                ) : null}
                              </View>
                            ))}
                          </>
                        )}
                      />
                    ) : null}
                    <View style={styles.actionHolder}>
                      {messages.cancel ? (
                        <Button onPress={toggle} style={styles.button} text={messages.cancel} />
                      ) : null}
                      {messages.submit ? (
                        <Button
                          onPress={() => {
                            if (this.form) {
                              this.form.submitForm();
                            }
                          }}
                          style={styles.button}
                          text={messages.submit}
                          baseStyle={styles.buttonBase}
                        />
                      ) : null}
                    </View>
                  </View>
                </View>
              </TouchNative>
            </ScrollView>
          </TouchNative>
        </View>
        {!disableKeyboardSpacer && isIOS ? <KeyboardSpacer /> : null}
        {atRootBottomRender}
      </Modal>
    );
  }
}

FormModal.propTypes = {
  messages: PropTypes.object.isRequired,
  disableKeyboardSpacer: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  atRootBottomRender: PropTypes.any,
  toggle: PropTypes.func.isRequired,
  useDefaultErrors: PropTypes.bool,
  allowDismiss: PropTypes.bool,
  hideForm: PropTypes.bool,
  map: PropTypes.object,
};

FormModal.defaultProps = {
  disableKeyboardSpacer: false,
  atRootBottomRender: false,
  useDefaultErrors: false,
  allowDismiss: false,
  hideForm: false,
  map: null,
};

export default FormModal;
