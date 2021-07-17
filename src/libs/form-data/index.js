export const getFormData = (body) => {
  const formData = new FormData();
  const formElements = Object.keys(body);

  for (let i = 0; i < formElements.length; i++) {
    const currentElement = body[formElements[i]];
    formData.append(formElements[i], currentElement);
  }

  return formData;
};
