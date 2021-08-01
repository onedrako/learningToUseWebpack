const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")   //Con requiere se llama al recurso
// const CopyPlugin = require("copy-webpack-plugin")
const Dotenv = require("dotenv-webpack")


module.exports = {
    entry: "./src/index.js", //punto de entrada de la aplicación, archivo qeu representa ese punto
                            //A donde se conectan,
    output: {
        path: path.resolve(__dirname, "dist"), //Donde se guarda el proyecto. 
                            //Para encontrar la carpeta donde se encuentra el proyecto.Aseguramos que siempre la encuentre con __dirname
        filename: "[name].[contenthash].js",   //main, bundle o # en la industria
        assetModuleFilename: "assets/images/[hash][ext][query]"
    },
    mode: "development",
    // watch: true,
    resolve: {   //Que extensiones tiene que identificar webpack para poder compilar el archivo al final
        extensions: [".js"],
        alias: {
            "@utils":path.resolve(__dirname, "src/utils/"),
            "@templates":path.resolve(__dirname, "src/templates/"),
            "@styles":path.resolve(__dirname, "src/styles/"),
            "@images":path.resolve(__dirname, "src/assets/images/")

        }  
    },
    module: {
        rules:[

            //  REGLAS PARA LOS ARCHIVOS JS USANDO BABEL

            {  //Añadimos la configuración de BABEL
            test: /\.m?js$/,   //Que tipo de extensiones vamos a utilizar, mjs o js
            exclude: /node_modules/,
            use:{
                loader: "babel-loader"
                }   
            },

            // REGLAS PARA LOS ARCHIVOS CSS Y SUS PREPROCESADORES

            {
            test: /\.css|styl$/i,
            use:[
                MiniCssExtractPlugin.loader, 
                "css-loader",
                "stylus-loader"
                ]
            },

            //PARA LAS IMAGENES USANDO LA CONFIGURACION DE WEBPACK 

            {
                test: /\.png/,
                type: "asset/resource"
            },


            //PARA LAS FUENTES USANDO URL LOADER

            // {
            //     test: /\.(woff|woff2)$/,
            //     use:{
            //         loader: "url-loader",
            //         options: {   //configuraciones para que funciones
            //             limit: 10000, 
            //             mimetype: "application/font-woff", //tipo de dato que utilizaremos, caracteristicas que tienen nuestros recursos
            //             name: "[name].[ext]",    //Que respete el nombre y la extensíon que tiene cada archivo
            //             outputPath: "./assets/fonts/",  //el lugar de salida
            //             publicPath: "./assets/fonts/",   
            //             esModule:false
            //         }
            //     }
            // },


            //PARA LAS FUENTES USANDO LA CONFIGURACION DE WEBPACK 5 

            {
                test: /\.(woff|woff2)$/i,  // Tipos de fuentes a incluir
                type: 'asset/resource',  // Tipo de módulo a usar (este mismo puede ser usado para archivos de imágenes)
                generator: {
                    filename: 'static/fonts/[hash][ext][query]',  //Directorio de salida
                },
            },
        ]
    }, 
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,   //Para ahcer la insersión de los elementos
            template: "./public/index.html",   //El el archivo HTML
            fielname: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "assets/[name].[contenthash].css"
        }),
        // new CopyPlugin({
        //     patterns: [{
        //         from: path.resolve(__dirname, "src", "assets/images"), //Que recurso vamos a copiar, (carpeta o archivos)
        //         to: "assets/images"    //En donde terminaran los recursos
        //         }
        //     ]
        // })
        new Dotenv(),
    ],
}
