export const getFormData = body => {
  const formData = new FormData();
  const formElements = Object.keys(body);
  const data = {};
  for (let i = 0; i < formElements.length; i++) {
    const currentElement = body[formElements[i]];
    if (!currentElement?.type && !currentElement?.fileList) {
      data[formElements[i]] = currentElement;
    } else if (currentElement.type) {
      formData.append(`files.${formElements[i]}`, currentElement, currentElement.name);
    } else if (currentElement.fileList?.length >= 1) {
      currentElement.fileList.map((file, index) => {
        const origin = file.originFileObj

        console.log(JSON.stringify(origin), origin)
        formData.append(`files.${formElements[i]}`, origin, origin.name)
      })
    }
  }
  for (var pair of formData.entries()) {
    console.log(pair[0] + " - " + pair[1]);
  }
  formData.append('data', JSON.stringify(data));

  return formData
}