import sanitizeSearchParams from "./sanitizeSearch";


const refreshByPagination = (searchParams: any, pageNumber: number) => {
    try {
        const sanitizedSearchParams = sanitizeSearchParams(searchParams);
        const queryParams = [];

        if (sanitizedSearchParams.name && sanitizedSearchParams.name.length > 2) {
            queryParams.push(`name=${encodeURI(sanitizedSearchParams.name)}`);
        }

        if (sanitizedSearchParams.fatherName && sanitizedSearchParams.fatherName.length > 2) {
            queryParams.push(`fatherName=${encodeURI(sanitizedSearchParams.fatherName)}`);
        }

        if (sanitizedSearchParams.course && sanitizedSearchParams.course.length > 2) {
            queryParams.push(`course=${encodeURI(sanitizedSearchParams.course)}`);
        }

        if (sanitizedSearchParams.mobile && sanitizedSearchParams.mobile.length > 2) {
            queryParams.push(`mobile=${encodeURI(sanitizedSearchParams.mobile)}`);
        }

        if (sanitizedSearchParams.address && sanitizedSearchParams.address.length > 2) {
            queryParams.push(`address=${encodeURI(sanitizedSearchParams.address)}`);
        }
        if (pageNumber) {
            queryParams.push(`page=${pageNumber}`);
        }

        const queryString = queryParams.join('&');
        window.location.href = `/find?${queryString}`;
    } catch (error) {
        console.error(error);
    }
}

export default refreshByPagination;