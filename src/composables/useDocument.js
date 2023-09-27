import { ref } from 'vue';
import { projectFirestore } from '../firebase/config';
import { projectAuth } from '../firebase/config';
import lengthLimits from './getLengthLimits';
import {
  onlyContainsSpaces,
  trimAndRemoveExtraLines,
} from './utilityFunctions';

const useDocument = (collection, id) => {
  const error = ref(null);
  const isPending = ref(false);

  let docRef = projectFirestore.collection(collection).doc(id);

  const deleteDoc = async () => {
    isPending.value = true;
    error.value = null;

    try {
      const res = await docRef.delete();
      isPending.value = false;
      return res;
    } catch (err) {
      error.value = err.message;
      isPending.value = false;
    }
  };

  const updateDoc = async (updates) => {
    isPending.value = true;
    error.value = null;

    try {
      if (collection == 'users') {
        for (let limit in lengthLimits.user) {
          if (
            updates[limit] &&
            updates[limit].length > lengthLimits.user[limit]
          ) {
            let newLimit = limit.charAt(0).toUpperCase() + limit.slice(1);
            throw Error(
              `${newLimit} should have less than ${lengthLimits.user[limit]} characters`
            );
          }
        }
      } else if (collection == 'posts') {
        if (updates.message) {
          let newPostMessage = updates.message;

          if (newPostMessage.length > lengthLimits.post.message) {
            throw Error(
              `Message should have less than ${lengthLimits.post.message} characters`
            );
          } else if (onlyContainsSpaces(newPostMessage)) {
            throw Error("You can't create a post with an empty message");
          }

          updates.message = trimAndRemoveExtraLines(newPostMessage);
        } else if (updates.comments && updates.comments.length > 0) {
          let newCommentMessage = updates.comments[0].commentMessage;

          if (newCommentMessage.length > lengthLimits.post.comments) {
            throw Error(
              `Comment message should have less than ${lengthLimits.post.comments} characters`
            );
          } else if (onlyContainsSpaces(newCommentMessage)) {
            throw Error(`You can't send empty comments`);
          }

          updates.comments[0].commentMessage = trimAndRemoveExtraLines(
            newCommentMessage
          );
        }
      }

      const res = await docRef.update(updates);
      isPending.value = false;

      // If collection is "users" then change the displayName
      if (collection == 'users') {
        await projectAuth.currentUser.updateProfile({
          displayName: updates.displayName,
        });
      }

      return res;
    } catch (err) {
      error.value = err.message;
      isPending.value = false;
    }
  };

  return { error, isPending, deleteDoc, updateDoc };
};

export default useDocument;
