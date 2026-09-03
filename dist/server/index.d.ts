declare const _default: {
    config: {
        default: {
            umamiUrl: string;
        };
        validator: (config: any) => void;
    };
    controllers: {
        controller: ({ strapi }: {
            strapi: any;
        }) => {
            getConfig: (ctx: any) => Promise<void>;
        };
    };
    routes: {
        method: string;
        path: string;
        handler: string;
        config: {
            policies: {
                name: string;
                config: {
                    actions: string[];
                };
            }[];
        };
    }[];
    register({ strapi }: {
        strapi: any;
    }): void;
    bootstrap({ strapi }: {
        strapi: any;
    }): void;
};
export default _default;
