self.addEventListener( 'install', function( event ) {
	// Do install stuff
	console.warn( 'SW install' );
});

self.addEventListener( 'activate', function ( event ) {
	// Do activate stuff: This will come later on.
	console.warn( 'SW activate' );
});
