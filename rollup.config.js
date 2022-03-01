import babel from '@rollup/plugin-babel'; // 引入babel
import commonjs from '@rollup/plugin-commonjs'; // 引入cjs插件
import { nodeResolve } from '@rollup/plugin-node-resolve'; // 引入resolve
import typescript from 'rollup-plugin-typescript2'; // ts
import { terser } from 'rollup-plugin-terser'; // 压缩打包文件

const extensions = ['.js', '.ts'];

const pkg = require('./package.json'); // 从package.json引入

const version = pkg.version; // 项目版本
const license = pkg.license; // 协议
const author = pkg.author; // 作者

// 打包文件的头部声明
const banner =
    '/*!\n' +
    ` * ${pkg.name} v${version}\n` +
    ` * (c) 2020-${new Date().getFullYear()} ${author}\n` +
    ` * Released under the ${license} License.\n` +
    ' */';

module.exports = {
    input: 'src/index.ts',
    output: [
        // 文件输出配置
        {
            file: 'dist/index.js', // 打包后生产的文件位置，及文件名
            format: 'umd',
            name: 'utools', // 包的全局变量名称
            banner
        },
        {
            file: 'dist/index.esm.js', // 打包后生产的文件位置，及文件名
            format: 'esm',
            name: 'utools', // 包的全局变量名称
            banner
        }
    ],
    plugins: [
        nodeResolve({
            extensions,
            modulesOnly: true
        }),
        commonjs(),
        typescript(),
        babel({
            babelHelpers: 'runtime',
            include: 'src/**',
            exclude: 'node_modules/**',
            extensions
        }),
        terser()
    ]
};
