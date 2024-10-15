import sanitizeSearchParams from "./sanitizeSearch";

const handleSearch = (searchParams: any, e: any) => {
    e.preventDefault();
    const { name, fatherName, course, mobile, address } = searchParams;
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

        if (searchParams.page) {
            queryParams.push(`page=${searchParams.page}`);
        }
        const queryString = queryParams.join('&');
        if (name.length < 1 &&
            fatherName.length < 1 &&
            course.length < 1 &&
            mobile.length < 1 &&
            address.length < 1) {
                return;
        }
        else {
        window.location.href = `/find?${queryString}`;
        }
    } catch (error) {
        console.error(error);
    }
};

export default handleSearch;