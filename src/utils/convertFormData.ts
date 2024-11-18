const convertFormData = (bodyData: any, numericFields: any) => {
    let formData = {};
    Object.keys(bodyData).forEach((key) => {
      if (numericFields.has(key)) {
        formData[key] = parseFloat(bodyData[key]);
        if (isNaN(formData[key])) {
          formData[key] = undefined;
        }
      } else {
        formData[key] = bodyData[key];
      }
    });
  
    return formData
  };
  
  export default convertFormData;