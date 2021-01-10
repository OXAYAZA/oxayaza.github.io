/**
 * @module camera
 * @require module:threejs
 */
( function () {
	/**
	 * 
	 * @constructor
	 */
	function Camera ( owner ) {
		this.owner = owner;
		this.entity = new THREE.PerspectiveCamera( 75, this.owner.rect.width / this.owner.rect.height, 0.1, 100 );
		this.state = false;
		this.speed = 0.5;
		this.acceleration = { x: 0, y: 0, z: 0, ox: 0, oy: 0, oz: 0 };
		this.entity.position.z = 25;
		this.entity.position.y = 5;
		this.euler = new THREE.Euler( 0, 0, 0, 'YXZ' );

		this.handlers = {
			click: this.clickHandler.bind( this ),
			pointerlockchangeHandler: this.pointerlockchangeHandler.bind( this ),
			keydownHandler: this.keydownHandler.bind( this ),
			keyupHandler: this.keyupHandler.bind( this ),
			mousemoveHandler: this.mousemoveHandler.bind( this )
		};

		document.addEventListener( 'click', this.handlers.click );
	}

	Camera.prototype.update = function () {
		this.entity.position.x += this.acceleration.x;
		this.entity.position.y += this.acceleration.y;
		this.entity.position.z += this.acceleration.z;

		// this.acceleration.ox = this.acceleration.oy = this.acceleration.oz = 0;
	};

	Camera.prototype.focus = function () {
		if ( !this.state ) {
			this.state = true;
			document.addEventListener( 'pointerlockchange', this.handlers.pointerlockchangeHandler );
			document.addEventListener( 'mousemove', this.handlers.mousemoveHandler );
			window.addEventListener( 'keydown', this.handlers.keydownHandler );
			window.addEventListener( 'keyup', this.handlers.keyupHandler );
			this.owner.canvas.requestPointerLock();
		}
	};

	Camera.prototype.unfocus = function () {
		this.state = false;
		document.removeEventListener( 'pointerlockchange', this.handlers.pointerlockchangeHandler );
		document.removeEventListener( 'mousemove', this.handlers.mousemoveHandler );
		window.removeEventListener( 'keydown', this.handlers.keydownHandler );
		window.removeEventListener( 'keyup', this.handlers.keyupHandler );
	};

	Camera.prototype.clickHandler = function ( event ) {
		if ( event.target === this.owner.canvas ) {
			this.focus();
		}
	};

	Camera.prototype.pointerlockchangeHandler = function () {
		if( !( document.pointerLockElement === this.owner.canvas ) ) {
			this.unfocus();
		}
	};

	Camera.prototype.mousemoveHandler = function ( event ) {
		this.euler.setFromQuaternion( this.entity.quaternion );

		this.euler.y -= event.movementX * 0.002;
		this.euler.x -= event.movementY * 0.002;

		this.entity.quaternion.setFromEuler( this.euler );
	};

	Camera.prototype.keydownHandler = function ( event ) {
		if ( !event.repeat ) {
			switch ( event.code ) {
				case 'KeyW':
					this.acceleration.z -= this.speed;
					break;
				case 'KeyS':
					this.acceleration.z += this.speed;
					break;
				case 'KeyA':
					this.acceleration.x -= this.speed;
					break;
				case 'KeyD':
					this.acceleration.x += this.speed;
					break;
				case 'ControlLeft':
					this.acceleration.y -= this.speed;
					break;
				case 'Space':
					this.acceleration.y += this.speed;
					break;
			}
		}
	};

	Camera.prototype.keyupHandler = function ( event ) {
		switch ( event.code ) {
			case 'KeyW':
				this.acceleration.z += this.speed;
				break;
			case 'KeyS':
				this.acceleration.z -= this.speed;
				break;
			case 'KeyA':
				this.acceleration.x += this.speed;
				break;
			case 'KeyD':
				this.acceleration.x -= this.speed;
				break;
			case 'ControlLeft':
				this.acceleration.y += this.speed;
				break;
			case 'Space':
				this.acceleration.y -= this.speed;
				break;
		}
	};


	if ( !window.Camera ) {
		window.Camera = Camera;
	} else {
		throw new Error( 'Camera is already defined or occupied' );
	}
})();
