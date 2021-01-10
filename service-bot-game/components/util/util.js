/**
 * @module util
 */
( function () {
	let Util = {};

	/**
	 * Слияние объектов
	 * @param {Object} source - исходный объект
	 * @param {Object} merged - слияемый объект
	 * @return {Object} - измененный исходный объект
	 */
	Util.merge = function merge( source, merged ) {
		for ( let key in merged ) {
			if ( merged[ key ] instanceof Object && merged[ key ].constructor.name === 'Object' ) {
				if ( typeof( source[ key ] ) !== 'object' ) source[ key ] = {};
				source[ key ] = merge( source[ key ], merged[ key ] );
			} else {
				source[ key ] = merged[ key ];
			}
		}

		return source;
	};


	if ( !window.Util ) {
		window.Util = Util;
	} else {
		throw new Error( 'Util is already defined or occupied' );
	}
})();
