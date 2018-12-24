const
	action = require( 'tempaw-functions' ).action,
	preset = require( 'tempaw-functions' ).preset,

	ROOT = 'aCounters'; // emitty hardcode

module.exports = {
	livedemo: {
		enable: true,
		server: {
			baseDir: `${ROOT}/`,
			directory: false
		},
		port: 8000,
		open: false,
		notify: true,
		reloadDelay: 0,
		ghostMode: {
			clicks: false,
			forms: false,
			scroll: false
		}
	},
	sass: {
		enable: true,
		showTask: false,
		watch: `${ROOT}sass/**/*.scss`,
		source: `${ROOT}sass/!(_).scss`,
		dest: `${ROOT}css/`,
		options: {
			outputStyle: 'expanded',
			indentType: 'tab',
			indentWidth: 1,
			linefeed: 'cr'
		}
	},
	less: {
		enable: false,
		showTask: false,
		watch: `${ROOT}/less/**/*.less`,
		source: `${ROOT}/less/style.less`,
		dest: `${ROOT}/css/`
	},
	pug: {
		enable: true,
		showTask: false,
		watch: `${ROOT}/pug/**/*.pug`,
		source: `${ROOT}/pug/!(_)*.pug`,
		dest: `${ROOT}/`,
		options: {
			pretty: true,
			verbose: true,
			emitty: true
		}
	},
	jade: {
		enable: false,
		showTask: false,
		watch: `${ROOT}/jade/**/*.jade`,
		source: `${ROOT}/jade/pages/!(_)*.jade`,
		dest: `${ROOT}/`,
		options: {
			pretty: true
		}
	},
	babel: {
		enable: false,
		watch: `${ROOT}/babel/**/!(_)*.js`,
		source: `${ROOT}/babel/!(_)*.js`,
		dest: `${ROOT}/js/`,
		options: {
			presets: ['env'],
			comments: false,
			compact: true,
			minified: true,
			sourceType: 'script'
		},
		alternate: {
			sourcemaps: false
		}
	},
	autoprefixer: {
		enable: false,
		options: {
			cascade: true,
			browsers: ['Chrome >= 45', 'Firefox ESR', 'Edge >= 12', 'Explorer >= 10', 'iOS >= 9', 'Safari >= 9', 'Android >= 4.4', 'Opera >= 30']
		}
	},
	watcher: {
		enable: true,
		watch: `${ROOT}/js/**/*.js`
	},
	htmlValidate: {
		showTask: false,
		source: `${ROOT}/*.html`,
		report: `${ROOT}/`
	},
	jadeToPug: {
		showTask: false,
		source: `${ROOT}/jade/**/*.jade`,
		dest: `${ROOT}/pug/`
	},
	lessToScss: {
		showTask: false,
		source: `${ROOT}/less/**/*.less`,
		dest: `${ROOT}/scss/`
	},
	cache: {
		showTask: false,
	},
	buildRules: {
		'util-backup': [
			action.pack({
				src: [ 'dev/**/*', '*.*' ], dest: 'versions/',
				name( dateTime ) { return `aCounters-${dateTime[0]}-${dateTime[1]}.zip`; }
			})
		]
	}
};
