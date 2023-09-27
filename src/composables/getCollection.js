import { ref, watchEffect } from 'vue';
import { projectFirestore } from '@/firebase/config';

const getCollection = (collection, orderBy, query) => {
  const documents = ref(null);
  const error = ref(null);
  const isPending = ref(true);

  let collectionRef = projectFirestore.collection(collection);

  if (orderBy) {
    collectionRef = collectionRef.orderBy(orderBy, 'desc');
  }

  if (query) {
    collectionRef = collectionRef.where(...query);
  }

  collectionRef.onSnapshot(
    (snap) => {
      let results = [];
      snap.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });

      documents.value = results;
      error.value = null;
      isPending.value = false;
    },
    (err) => {
      documents.value = null;
      error.value = err.message;
      isPending.value = false;
    }
  );

  return { error, documents, isPending };
};

export default getCollection;
