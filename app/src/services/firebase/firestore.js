import { getFirestore } from 'firebase/firestore';

import config from './firebase-config';

const db = getFirestore(config);

export default db;
