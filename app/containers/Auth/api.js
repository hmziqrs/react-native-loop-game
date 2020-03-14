// import { api } from 'rn-hgl/services';

import { sleep } from 'rn-hgl/utils';

export function signIn(data) {
  return sleep({ success: true, data }, 300);
  // return api({
  //   method: 'POST',
  //   url: '/post',
  //   body,
  // });
}

export function signUp(data) {
  return sleep({ success: true, data }, 300);
  // return api({
  //   method: 'POST',
  //   url: '/post',
  //   body,
  // });
}
