document.onmousemove = moveTip;
function moveTip(e) {
  floatTipStyle = document.getElementById("floatTip").style;
  w = 250; // Ширина слоя
  // Для браузера IE
  if (document.all) { 
    x = event.x + document.body.scrollLeft; 
    y = event.y + document.body.scrollTop; 
  // Для остальных браузеров
  } else { 
    x = e.pageX; // Координата X курсора
    y = e.pageY; // Координата Y курсора
  }
  // Показывать слой справа от курсора 
  if ((x + w + 10) < document.body.clientWidth) { 
    floatTipStyle.left = x + 'px';
  // Показывать слой слева от курсора
  } else { 
    floatTipStyle.left = x - w + 'px';
  }
  // Положение от верхнего края окна браузера
  floatTipStyle.top = y + 20 + 'px';
}
function toolTip(msg) {
  floatTipStyle = document.getElementById("floatTip").style;
  if (msg) {
    // Выводим текст подсказки
    document.getElementById("floatTip").innerHTML = msg;
    floatTipStyle.display = "block"; // Показываем слой
  } else { 
    floatTipStyle.display = "none"; // Прячем слой
  } 
}