/**
 * @module core
 * @requires module:threejs
 * @requires module:util
 * @requires module:camera
 */
( function () {
	/**
	 * Основное ядро игры.
	 * @param {object} params - параметры
	 * @param {Element} params.container - элемент в который будет помещен управляемый ядром canvas
	 * @param {Element} [params.class] - класс стилизации который будет добавлен элементу рендерера
	 * @constructor
	 */
	function Core ( params ) {
		// Проверка наличия обязательных параметров
		if ( !params || !params.container || !( params.container instanceof Element ) ) {
			throw new Error( 'Core.container is required parameter' );
		}

		// Слияние экземпляра с параметрами по умолчанию
		Util.merge( this, {
			container: null,
			class: 'main-canvas',
			state: 'play',
			renderer: null,
			canvas: null,
			scene: null,
			camera: null,
			rect: {
				width: null,
				height: null
			},
			objects: {}
		});

		// Слияние экземпляра с полученными параметрами
		Util.merge( this, params );

		// Создание рендерера
		this.renderer = new THREE.WebGLRenderer({ antialias: true });

		// Получение элемента canvas рендерера
		this.canvas = this.renderer.domElement;

		// Добавление элемента рендерера в DOM и установка ему нужного класса стилизации
		this.canvas.classList.add( this.class );
		this.container.appendChild( this.canvas );

		// Первичный ресайз, получение и установка размеров холста
		this.resize();

		// Создание сцены
		this.scene = new THREE.Scene();

		// Создание камеры
		this.camera = new Camera( this );

		// Запуск отрисовки
		this.render();
	}

	/**
	 * Метод резайза холста
	 */
	Core.prototype.resize = function () {
		// Получение размеров контейнера
		this.rect = this.container.getBoundingClientRect();

		// Установка размеров рендерера
		this.renderer.setSize( this.rect.width, this.rect.height );
	};

	/**
	 * Метод отрисовки холста
	 */
	Core.prototype.render = function () {
		if ( this.state === 'play' ) {
			// Запрос к барузеру на выделение ресурсов для анимации
			requestAnimationFrame( this.render.bind( this ) );

			// Обновление обьектов (жизнь)
			Object.keys( this.objects ).forEach( ( id ) => {
				let object = this.objects[ id ];
				object.live();
			});

			// Обновление камеры
			this.camera.update();

			// Отрисовка обьектов
			this.renderer.render( this.scene, this.camera.entity );
		}
	};

	Core.prototype.pause = function () {
		this.state = 'pause';
	};

	Core.prototype.play = function () {
		this.state = 'play';
		this.render();
	};


	if ( !window.Core ) {
		window.Core = Core;
	} else {
		throw new Error( 'Core is already defined or occupied' );
	}
})();
