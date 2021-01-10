/**
 * @module cube
 * @require module:threejs
 * @require module:util
 * @require module:core
 */
( function () {
	/**
	 * Конструктор обьекта кубика.
	 * @param {object} params - параметры кубика
	 * @param {Core} params.owner - вляделец обьекта (ядро)
	 * @param {string} params.id - идентификатор обьекта
	 * @constructor
	 */
	function Cube ( params ) {
		// Проверка наличия обязательных параметров
		if ( !params || !params.owner || !( params.owner instanceof Core ) ) {
			throw new Error( 'Cube.owner is required parameter' );
		}

		// Слияние экземпляра с параметрами по умолчанию
		Util.merge( this, {
			id: null,
			owner: null,
			geometry: new THREE.BoxGeometry( 10, 10, 10 ),
			material: new THREE.MeshBasicMaterial({ color: 0xff00ff }),
			mesh: null,
			position: { x: 0, y: 0, z: 0 },
			acceleration: { x: 0, y: 0, z: 0 },
			speed: 0.25
		});

		// Слияние экземпляра с полученными параметрами
		Util.merge( this, params );

		// Генерация идентификатора если небыл задан
		if ( !this.id ) {
			this.id = Math.random().toString( 36 ).substring( 2 );
		}

		// Привязка к холсту по идентификатору
		this.owner.objects[ this.id ] = this;

		// Создание самого кубика
		this.mesh = new THREE.Mesh( this.geometry, this.material );

		// Установка позиции
		this.mesh.position.set( this.position.x, this.position.y, this.position.z );

		// Добавление кубика на сцену
		this.owner.scene.add( this.mesh );
	}

	/**
	 * Метод жизни кубика
	 */
	Cube.prototype.live = function () {
		if ( this.acceleration.y === 0 ) {
			this.acceleration.y = this.speed;
		} else if ( this.acceleration.y > 0 && this.position.y >= 10 ) {
			this.acceleration.y = -this.speed;
		} else if ( this.acceleration.y < 0 && this.position.y <= 0 ) {
			this.acceleration.y = this.speed;
		}

		this.position.x += this.acceleration.x;
		this.position.y += this.acceleration.y;
		this.position.z += this.acceleration.z;

		this.mesh.position.set( this.position.x, this.position.y, this.position.z );
	};


	if ( !window.Cube ) {
		window.Cube = Cube;
	} else {
		throw new Error( 'Cube is already defined or occupied' );
	}
})();
