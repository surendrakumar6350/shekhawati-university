const calculateTheValueOfPage = (queryParams: any)=> {
    const pageNumber : number = Number(queryParams.get("page"));
    if(pageNumber && !isNaN(pageNumber) &&  (pageNumber < 6)  &&   (pageNumber > 0)) {
      return Number(queryParams.get("page"));
    }
    else {
      return 1;
    }
  }
  export default calculateTheValueOfPage;