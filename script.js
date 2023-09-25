document.addEventListener( 'DOMContentLoaded', function () {
  // Particles Background Effect
  document.querySelectorAll("#particles-container").forEach(function(node){
    let params = {
      'particles': {
        'number': {
          'value': 80,
          'density': {
            'enable': true,
            'value_area': 800
          }
        },
        'color': {
          'value': '#637D63'
        },
        'shape': {
          'type': 'circle',
          'stroke': {
            'width': 0,
            'color': '#637D63'
          },
          'polygon': {
            'nb_sides': 5
          },
          'image': {
            'src': 'img/github.svg',
            'width': 100,
            'height': 100
          }
        },
        'opacity': {
          'value': 0.5,
          'random': false,
          'anim': {
            'enable': false,
            'speed': 1,
            'opacity_min': 0.1,
            'sync': false
          }
        },
        'size': {
          'value': 3,
          'random': true,
          'anim': {
            'enable': false,
            'speed': 40,
            'size_min': 0.1,
            'sync': false
          }
        },
        'line_linked': {
          'enable': true,
          'distance': 220,
          'color': '#637D63',
          'opacity': 0.25,
          'width': 1
        },
        'move': {
          'enable': true,
          'speed': 3,
          'direction': 'none',
          'random': false,
          'straight': false,
          'out_mode': 'bounce',
          'bounce': false,
          'attract': {
            'enable': false,
            'rotateX': 600,
            'rotateY': 1200
          }
        }
      },
      'interactivity': {
        'detect_on': 'canvas',
        'events': {
          'onhover': {
            'enable': true,
            'mode': 'grab'
          },
          'onclick': {
            'enable': true,
            'mode': ''
          },
          'resize': true
        },
        'modes': {
          'grab': {
            'distance': 140,
            'line_linked': {
              'opacity': 1
            }
          },
          'bubble': {
            'distance': 400,
            'size': 40,
            'duration': 2,
            'opacity': 8,
            'speed': 3
          },
          'repulse': {
            'distance': 100,
            'duration': 0.4
          },
          'push': {
            'particles_nb': 4
          },
          'remove': {
            'particles_nb': 2
          }
        }
      },
      'retina_detect': true
    };

    particlesJS('particles-container', params);
  });

  // Popups
  document.querySelectorAll("[data-popup]").forEach(function(node){
    node.Popup = {
      state: false,
      show: function() {
        if(node.Popup.state) {
          console.warn(`[Popup]: Tried to show already shown popup.`);
          return;
        }

        node.classList.add("popup-opened");
        document.body.classList.add("scroll-disabled");
        node.Popup.state = true;
      },
      hide: function() {
        if(!node.Popup.state) {
          console.warn(`[Popup]: Tried to hide already hidden popup.`);
          return;
        }

        node.classList.remove("popup-opened");
        document.body.classList.remove("scroll-disabled");
        node.Popup.state = false;
      }
    };

    node.querySelector(".popup-background").addEventListener("click", node.Popup.hide);
    node.querySelector(".popup-close").addEventListener("click", node.Popup.hide);
  });

  document.querySelectorAll("[data-popup-button]").forEach(function(node){
    node.addEventListener("click", function (){
      let key = node.getAttribute("data-popup-button");
      let popupNode = document.querySelector(`[data-popup="${key}"]`);
      if(popupNode) popupNode.Popup.show();
      else console.warn(`[Popup Button]: Can't found popup with name "${key}"`);
    });
  });
});
