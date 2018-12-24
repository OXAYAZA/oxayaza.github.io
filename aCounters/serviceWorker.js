self.addEventListener('install', event => {
	// Do install stuff
	console.warn( 'cp1' );
});

self.addEventListener('activate', event => {
	// Do activate stuff: This will come later on.
	console.warn( 'cp2' );
});
