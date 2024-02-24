module.exports = function (wallaby) {
	return {
		files: [
			// 'src/**/*.js' // adjust if required
			// "./server/src/CssService/**/*.ts",
			// "./server/src/CssServiceOriginal/**/*.ts",
			"package.json",
			"./server/src/**/*.js",
			"./server/src/**/*.ts",
			"./common/**/*.ts",
			{pattern: "./server/src/server.ts", load: false, ignore: true, instrument: false},
			"!**/*.test.ts"
		],

		tests: [
			//'test/**/*.spec.js' // adjust if required
			"./server/src/CssService/test/css/lint.test.ts"
		],

		compilers: {
			'**/*.ts?(x)': wallaby.compilers.typeScript({
				module: 'commonjs',
				allowJs: true,
				moduleResolution: "node",
				target: "es2020",
				lib: ["es2020"],
			})
		},

		env: {
			type: 'node'
		},

		setup: function (wallaby) {
			var mocha = wallaby.testFramework;
			//mocha.ui('tdd');
			mocha.ui("tdd")
			mocha.color(true)
			mocha.recursive = true;
		}
	};
};