document.addEventListener( 'DOMContentLoaded', function () {
	let core = window.core = new Core({
		container: document.querySelector( '#main' )
	});

	new Cube({
		id: 'sample',
		owner: core,
		position: { x: 0, y: 1.5, z: 0 },
		geometry: new THREE.BoxGeometry( 2, 2, 2 )
	});

	for ( let x = -100; x <= 100; x += 5 ) {
		let material = new THREE.LineBasicMaterial({ color: 0x313233 });

		core.scene.add( new THREE.Line(
			new THREE.BufferGeometry().setFromPoints([
				new THREE.Vector3( x, 0, -100 ),
				new THREE.Vector3( x, 0, 100 ),
			]),
			material
		));

		core.scene.add( new THREE.Line(
			new THREE.BufferGeometry().setFromPoints([
				new THREE.Vector3( x, 10, -100 ),
				new THREE.Vector3( x, 10, 100 ),
			]),
			material
		));
	}

	for ( let z = -100; z <= 100; z += 5 ) {
		let material = new THREE.LineBasicMaterial({ color: 0x313233 });

		core.scene.add( new THREE.Line(
			new THREE.BufferGeometry().setFromPoints([
				new THREE.Vector3( -100, 0, z ),
				new THREE.Vector3( 100, 0, z ),
			]),
			material
		));

		core.scene.add( new THREE.Line(
			new THREE.BufferGeometry().setFromPoints([
				new THREE.Vector3( -100, 10, z ),
				new THREE.Vector3( 100, 10, z ),
			]),
			material
		));
	}

	for ( let x = -50; x <= 50; x += 5 ) {
		for ( let z = -50; z <= 50; z += 5 ) {
			new Cube({
				owner: core,
				position: { x: x, y: Math.random() * 10, z: z },
				geometry: new THREE.BoxGeometry( 2, 2, 2 )
			});
		}
	}
});
