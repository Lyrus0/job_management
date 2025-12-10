import { defineConfig } from 'jsrepo';

export default defineConfig({
    registries: [
        {
            url: "https://reactbits.dev/r",
        }
    ],
    paths: {
        "*": "resources/js/components/animations"
    },
});
