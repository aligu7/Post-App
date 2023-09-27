import { ref } from 'vue';
import { projectFirestore } from '@/firebase/config';
import lengthLimits from './getLengthLimits';
import {
  onlyContainsSpaces,
  trimAndRemoveExtraLines,
} from './utilityFunctions';

const useCollection = (collection) => {
  const error = ref(null);
  const isPending = ref(false);

  const addDoc = async (doc, id) => {
    error.value = null;
    isPending.value = true;

    try {
      if (collection == 'posts') {
        if (doc.message.length > lengthLimits.post.message) {
          throw Error(
            `Message should have less than ${lengthLimits.post.message} characters`
          );
        } else if (onlyContainsSpaces(doc.message)) {
          throw Error("You can't create a post with an empty message");
        }

        doc.message = trimAndRemoveExtraLines(doc.message);
      }

      let res = '';
      if (id) {
        res = await projectFirestore
          .collection(collection)
          .doc(id)
          .set(doc);
      } else {
        res = await projectFirestore.collection(collection).add(doc);
      }
      isPending.value = false;
      return res;
    } catch (err) {
      error.value = err.message;
      isPending.value = false;
    }
  };

  return { error, addDoc, isPending };
};

export default useCollection;
