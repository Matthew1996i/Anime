import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
  user: {},
};

export default function auth(state = INITIAL_STATE, action) {
  return produce((state, draft) => {
    switch (action.type) {
      case '@auth/SING_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      default:
    }
  });
}
