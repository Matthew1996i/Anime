import { createStore } from '@reduxjs/toolkit';
import reducer from './slices/user';

export default createStore(reducer);
