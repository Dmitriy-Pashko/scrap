import { action } from 'mobx';
import store from './form-store';

const fmodal = {
  setModalState: action(function (bool) {
    store.open = bool;
  }),
  open: action(function () {
    console.log(store.open);
    return this.setModalState(true);
  }),
  close: action(function () {
    return this.setModalState(false);
  }),
};

export default fmodal;
