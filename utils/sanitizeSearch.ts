const sanitizeSearchParams = (searchParams: any) => {
    const sanitizedParams: any = {};

    Object.keys(searchParams).forEach((key) => {
        const value = searchParams[key];
        if (typeof value === 'string') {
            sanitizedParams[key] = value.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;');
        } else {
            sanitizedParams[key] = value;
        }
    });

    return sanitizedParams;
};

export default sanitizeSearchParams;