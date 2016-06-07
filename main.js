//разберем как работает compile и создадим директиву, которая будет подсвечивать синтаксис написанного кода.

// compile используется вместе с  link Функцией
// link Функция чаще всего необходима чтобы вешать какие-то ивенты на элемент
// вешать вотчеры, смотреть за тем как меняются атрибуты
// Зачем же нам нужен compile?
// compile используется для одной единственной вещи - чтобы манипулировать с самой разметкой нашего элемента и шаблоном нашего элемента

// а теперь попробуем создадим директиву  <ui-source></ui-source>в html
// и опишем ее в main.js
// app.directive('uiSource', function(){
    // return{
//         
    // };
// });

// Эта директива будет принимать в себя кусок html выводить его на страницу
// и оборачивать в prettify (перенаряжать-украшать)
// есть такая классная библиотека  - google-pretify     <script src="https://cdnjs.cloudflare.com/ajax/libs/prettify/r298/prettify.min.js"></script>
// эта библиотека имеет функции которые добавляют в разметку классы и если мы добавим еще и css то у нас будет красиво видно разметку
// видно будет вложенность разные цвета и тд
//сейчас мы попробуем сделать это в виде директивы
// подключим в html Файл css prettify.css c заранее заготовленными стилями 
// теперь напишем html который мы будем оборачивать
   // <ui-sorce>
      // <label>Name:</label>
      // <input type='text' ng-model='yourName' placeholder='Enter a name here'>
      // <hr>
      // <h1>Hello {{yourName}}</h1>
   // </ui-sorce>
// Теперь напишем compile в функции директивы
// выведем в нем DOM элемент который нам доступен
 // compile: function (elem) {
            // console.log(elem);
        // }
// создадим элемент pre в который мы и будем все это оборачивать и посмотрим на него
             // var pre = angular.element('<pre class="prettyprint"></pre');
             // console.log(pre);
//посмотрим в консоли браузера и увидим Dom элемент который теперь мы можем использовать

// теперь напишем var pretty = prettyPrintOne(elem.html()); prettyPrintOne- функция библиотеки perttify, 
//которая принимает на вход первым параметром html который мы получим через elem.html()
//Посмотрим в консоли что у нас получилось console.log(pretty);
// и мы видим что добавилс кусок html c различными span которы содержа различные классы для того чтобы обрамлять наш html
// теперь внутрь элемента<pre class="prettyprint"></pre> мы хотим засунуть содержимое pretty pre.append(pretty);

// и далее мы хотим заменить наш элемент elem на pre elem.replaceWith(pre);

// как мы видим в браузере у нас уже все стало выглядеть красиво!!!

// если мы хотим вывести наш код таким как он был написан нам надо заменeть некотрые символы в   html
// сделаем это при помощи функции 
 // var escape = function (content) {
        // return content.replace(/\</g, '&lt;')
                      // .replace(/\>/g, '&gt;');
      // }; - которая меняет ковычки тегов на символы '&lt;' и '&gt;'
      
     // и обработаем наш html код нашего элемента этой функцией var pretty = prettyPrintOne(escape(elem.html()));
     
     // посмотрим в браузер


var app = angular.module('app', []);

app.directive('uiSource', function () {
    return{
         compile: function (elem) {
             var escape = function (content) {
        return content.replace(/\</g, '&lt;')
                      .replace(/\>/g, '&gt;');
      };
             
            console.log(elem);
             var pre = angular.element('<pre class="prettyprint"></pre');
             console.log(pre);
             var pretty = prettyPrintOne(escape(elem.html()));
             console.log(pretty);
             pre.append(pretty);
             elem.replaceWith(pre);
             
        }
    };
});



