import { ref, computed } from "vue";

const fileError = ref(null);
const fileData = ref(null);
const file = ref(null);

// allowed types
const types = ["image/png", "image/jpeg", "image/gif"];

const handleChange = (hiddenInp) => {
  const selected = hiddenInp.files[0];
  if (selected && types.includes(selected.type)) {
    fileError.value = null;
    const reader = new FileReader();
    file.value = selected;
    reader.onload = () => {
      fileData.value = reader.result;
    };
    reader.readAsDataURL(selected);
  } else if (!selected) {
    fileError.value = "Please choose an image";
  } else {
    fileError.value = "Please select an image file (png, jpg or gif)";
  }
};

const clearFile = () => {
  file.value = null;
  fileData.value = null;
  fileError.value = null;
};

const filteredFileName = (string, limit) => {
  if (string.length >= limit) {
    return string.substring(0, limit) + "...";
  }
  return string;
};

const getFile = () => {
  return {
    fileError,
    fileData,
    file,
    handleChange,
    filteredFileName,
    clearFile,
  };
};

export default getFile;
