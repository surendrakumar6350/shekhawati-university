
const areAllQueryParamsNull = (queryParams: any) => {
    const nameValue = queryParams.get("name");
    const fatherNameValue = queryParams.get("fatherName");
    const courseValue = queryParams.get("course");
    const mobile = queryParams.get("mobile");
    const address = queryParams.get("address");
    return [nameValue, fatherNameValue, courseValue, mobile, address].every(param => (param == null || param.length < 1));
  }

  export default areAllQueryParamsNull;