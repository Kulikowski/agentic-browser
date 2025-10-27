export declare const gLibrary: {
    name: string;
    elements: ({
        tagName: string;
        component: any;
        propMapping: {
            label: string;
            content?: undefined;
        };
        eventMapping: {
            press: string;
        };
    } | {
        tagName: string;
        component: any;
        propMapping: {
            content: string;
            label?: undefined;
        };
        eventMapping: {
            press?: undefined;
        };
    })[];
};
