import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';

export default defineConfig({
    // ...vite configures
    server: {
        // vite server configs, for details see [vite doc](https://vitejs.dev/config/#server-host)

        port: 8080
    },
    plugins: [

        ...VitePluginNode({

            adapter: 'express',

            // tell the plugin where is your project entry
            appPath: './src/app.js',

            // Optional, default: 'viteNodeApp'
            // the name of named export of you app from the appPath file
            exportName: 'viteNodeApp',


            tsCompiler: 'esbuild',

            // Optional, default: {
            // jsc: {
            //   target: 'es2019',
            //   parser: {
            //     syntax: 'typescript',
            //     decorators: true
            //   },
            //  transform: {
            //     legacyDecorator: true,
            //     decoratorMetadata: true
            //   }
            // }
            // }
            // swc configs, see [swc doc](https://swc.rs/docs/configuration/swcrc)
            swcOptions: {}
        })
    ],
    optimizeDeps: {

    },

    resolve: {
        alias: {

            crypto: 'crypto-browserify',

        },
    },
});