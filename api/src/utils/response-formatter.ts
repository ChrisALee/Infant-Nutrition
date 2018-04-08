// Not made generic since it would be a performance cost
// that's not necessary unless more responses
// need a similar formatting
const arrayToMultipleDepthObject = (arr, keyFields) => {
    let result;
    result = arr.map(obj => {
        return {
            [obj[keyFields[0]]]: {
                [obj[keyFields[1]]]: {
                    [obj[keyFields[2]]]: {
                        contentType: obj.contentType,
                        text: obj.text,
                        guid: obj.guid,
                        links: obj.links,
                    },
                },
            },
        };
    });

    // Should be reduced down to an object of objects
    // and should be merged
    result = result.reduce((obj, item) => {
        merge(obj, item);
        return obj;
    }, {});

    return result;
};

const merge = (t, s) => {
    // Do nothing if they're the same object
    if (t === s) {
        return;
    }

    // Loop through source's own enumerable properties
    Object.keys(s).forEach(key => {
        // Get the value
        const val = s[key];

        // Is it a non-null object reference?
        if (val !== null && typeof val === 'object') {
            // Yes, if it doesn't exist yet on target, create it
            if (!t.hasOwnProperty(key)) {
                t[key] = {};
            }

            // Recurse into that object
            merge(t[key], s[key]);

            // Not a non-null object ref, copy if target doesn't have it
        } else if (!t.hasOwnProperty(key)) {
            t[key] = s[key];
        }
    });
};

export default arrayToMultipleDepthObject;
