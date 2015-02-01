(function (win) {

	"use strict";
	/*global window */

	win.sections = win.sections || {};

	win.sections.algorithms = {
		name: 'Алгоритмы',
		lang: 'ru',
		questions: [
			{
				title: 'Белки и кролики',

				text: 'http://www.smekalka.pp.ru/sites/default/files/1824.png_!_Перед вами восемь перенумерованных пней. На пнях 1 и 3 сидят кролики, на пнях 6 и 8 - белки. И белки, и кролики почему-то недовольны своими местами и хотят обменяться пнями: белки желают сидеть на местах кроликов, а кролики - на местах белок. Попасть на новое место они могут, прыгая с пня на пень по следующим правилам:<br>1) прыгать с пня на пень можно только по тем линиям, которые показаны на рисунке; каждый зверек может делать несколько прыжков кряду;<br>2) два зверька на одном пне поместиться не могут, поэтому прыгать можно только на свободный пень. Имейте также в виду, что зверьки желают обменяться местами за наименьшее число прыжков. Впрочем, меньше чем 16 прыжками им не обойтись.<br>Как же они это сделают?',
				hint: '',
				answer: 'Ниже указан самый короткий способ обмена. Цифры показывают, с какого пня на какой надо прыгать (например, 1-5 означает, что белка прыгает с 1-го пня на 5-й). Всех прыжков понадобится 16, а именно:<br>1-5;<br>3-7, 7-1;<br>8-4, 4-3, 3-7;<br>6-2, 2-8, 8-4, 4-3;<br>5-6, 6-2, 2-8;<br>1-5, 5-6;<br>7-1'

			},
			{
				title: 'Безопасная переправа',

				text: 'Крестьянину нужно перевезти через реку волка, козу и капусту. Лодка небольшая: в ней может поместиться крестьянин, а с ним или только коза, или только волк, или только капуста. Но если оставить волка с козой, то волк сьест козу, а если оставить козу с капустой, то коза сьест капусту. Как перевез свой груз крестьянин?',
				hint: '',
				answer: 'Ясно, что начинать приходится с козы. Крестьянин, перевезя козу, возвращается и берет волка, которого перевозит на другой берег, где его и оставляет, но зато берет и везет обратно на первый берег козу. Здесь он оставляет ее и перевозит к волку капусту. Вслед за тем, возвратившись, он перевозит козу, и переправа оканчивается благополучно'

			},
			{
				title: 'Игра "ним"',

				text: 'Имеется две кучки спичек. В первой 7 спичек, во второй - 5. За один ход разрешается взять любое количество спичек, но из одной кучки. Проигрывает тот, кому нечего брать. Кто выигрывает при правильной игре - начинающий или его партнер? И как для этого ему надо играть?',
				hint: '',
				answer: 'При правильной игре выигрывает начинающий игрок. Его стратегия: первым ходом он должен сравнять количество спичек в кучках, т.е. взять из первой кучки 2 спички. Каждый следующий его ход должен быть "симметричен" ходу второго игрока, т.е. если "второй" берет n спичек из одной кучки, то "первый" должен взять также n спичек, но из другой кучки. Таким образом, если может сделать ход "второй" игрок, то может сделать ход и "первый". Так как после каждого хода количество спичек уменьшается, то наступит момент, когда "второй" не сможет сделать ход (ни в одной из кучек спичек не останется) и проиграет'

			},
			{
				title: 'Голодный студент',

				text: 'На сковороде могут одновременно жариться две котлеты. Каждую котлету нужно обжаривать с двух сторон, при этом на обжаривание ее с одной стороны требуется 2 мин. Голодный студент мечтает побыстрее поджарить три котлеты. Какое наименьшее время ему потребуется?',
				hint: '',
				answer: 'Поджарив одну сторону пары котлет, студент переворачивает одну котлету, другую снимает и заменяет ее на третью. Через 2 мин на сковороде будет одна готовая котлета, которую можно уже есть и заменить на снятую ранее со сковороды. Всего на поджаривание уйдет 6 мин'

			},
			{
				title: 'Спасение семейства',

				text: 'Король, его сын принц и дочь принцесса находились в темнице высокой башни. Они весили 195, 105 и 90 фунтов соответственно. Еду им поднимали в двух корзинах, прикрепленных к концам длинного каната. Канат был перекинут через балку, вбитую под самой крышей. Получалось так, что, когда одна корзина находилась на земле, вторая находилась на уровне оконца в камере пленников. Эти корзины оставались единственной надеждой на спасение. Естественно как только одна корзина становилась тяжелее другой она опускалась. Однако если разница в весе превышает 15 фунтов, корзина стремительно неслась вниз. Единственное что помогло бы пленникам бежать из плена, было находившееся в камере пушечное ядро весом 75 фунтов - его можно было попытаться использовать как противовес. Как пленникам удалось бежать?',
				hint: '',
				answer: '1. Спускается принцесса, используя ядро в качестве противовеса.<br>2. Принцеса достигнув земли не вылезает из корзины. Принц занимает место ядра и спускается вниз, используя принцессу в качестве противовеса.<br>3. Принцесса поднялась вверх и вместе с королем положила в корзину ядро.<br>4. В опустившуюся корзину с ядром садится принц, что позволяет опустить короля.<br>5. Когда король оказался на земле, принц с ядром оказался наверху. Принц вылез из корзины и корзина с ядром опустилась вниз.<br>6. В пустую корзину у темницы садится принцесса и спускается на землю.<br>7. Принц вытаскивает ядро из поднявшейся корзины и спускается сам, исспотльзуя принцессу как противовес.<br>8. Принцесса опускает в пустой корзине ядро, а сама садится в поднявшуюся и спускается, используя ядро в качестве противовеса'

			},
			{
				title: 'Игра с пятаками',

				text: 'Два игрока кладут по очереди пятаки на круглый стол так, чтобы пятаки не накладывались друг на друга. Проигрывает тот, кто не сможет положить пятака. Кто выигрывает при правильной игре и как он должен для этого играть?',
				hint: '',
				answer: 'При правильной игре выигрывает начинающий. Его стратегия: первым ходом он кладет пятак в центр стола. Каждым следующим своим ходом он кладет пятак симметрично пятаку, положенному вторым игроком относительно центра стола, Таким образом, если сможет сделать ход "второй" игрок, то может сделать ход и "первый". Так как после каждого хода "свободная" поверхность стола уменьшается, то наступит момент, когда второй не сможет сделать ход и проиграет'

			},
			{
				title: 'Простая игра со спичками',

				text: 'На столе лежат 37 спичек. Каждому из двух игроков разрешается по очереди брать не более 5 спичек. Выигрывает тот, кто возьмет последнюю. Кто выигрывает при правильной стратегии - начинающий игру или второй игрок? Какова выигрышная стратегия?',
				hint: '',
				answer: 'Начинающий первым ходом берет одну спичку, а затем каждый раз дополняет число спичек, взятых соперником, до шести'

			},
			{
				title: 'Вредный математик',

				text: 'Три второклассника делят 24 яблока. Пока у них есть три кучки: 11, 7 и 6 яблок соотвественно, но они хотят поделить их поровну. Один из этих второклассников, хитрый математик, предложил двум другим такое пари:<br>- Вы должны будете уравнять количество яблок в кучках, но строго по моей системе: из одной кучки берёте столько яблок, сколько их в той кучке, куда вы добавлять собираетесь. Но сделать это вы должны строго за 3 перекладывания. Сможете - все яблоки ваши, нет - они мои.<br>- Давай! - согласились двое. Подумали с минутку и сумели так сделать. И вот они, довольно хрумкая яблоками, утопали от вредного математика. А вы бы смогли так сделать?',
				hint: '',
				answer: 'Цифры в скобках обозначают кол-во яблок в каждой из кучек.<br>1. (11,7,6) перекладываем 7 яблок из первой кучки во вторую.<br>2. (4,14,6) перекладываем 6 яблок из 2 кучи в третью.<br>3. (4,8,12) перекладываем 4 яблока из 3 кучи в первую<br>4. (8,8,8) - условие выполнено'

			},
			{
				title: 'Еще одна переправа',

				text: 'Командиру взвода нужно переправить через реку 10 солдат. На реке нет мостов, и ни один солдат не пожелал переплывать реку вплавь. Тут командир увидел лодку, в которой сидели два мальчика. Лодка могла удержать либо двоих мальчиков, либо одного солдата.<br>Как командир переправил солдат на другой берег, используя лодку?',
				hint: '',
				answer: 'Вначале переправляются два мальчика; один мальчик высаживается, а другой возвращается обратно; затем он высаживается, в лодку садится солдат и переплывает на другой берег; солдат высаживается, в лодку садится первый мальчик и плывет через реку. Дети снова переплывают реку вдвоем, и все действие повторяется'

			},
			{
				title: 'Опять переправа',

				text: 'Вам нужно переправить через реку с помощью одного плота семью (мать, отца, 2-х дочерей и 2-х сыновей) и полицейского с заключенным.<br>Правила:<br>1. На плоту могут одновременно перемещаться максимум 2 человека.<br>2. Папе не разрешается находиться с дочерьми без присутствия матери.<br>3. Маме не разрешается находиться с сыновьями без присутствия отца.<br>4. Заключённого нельзя оставлять без полицейского ни с одним из членов семьи.<br>5. Управлять плотом могут только полицейский и родители',
				hint: '',
				answer: 'Вот решение:<br>1. Переправляются полицейский и заключенный, полицейский возвращается назад;<br>2. Переправляются полицейский и дочь, полицейский с заключенным возвращаются назад;<br>3. Переправляются мать и вторая дочь, мать возвращается назад;<br>4. Переправляются отец и мать, отец возвращается назад;<br>5. Переправляются полицейский и преступник, мать возвращается назад;<br>6. Переправляются отец и мать, отец возвращается назад;<br>7. Переправляются отец и сын, полицейский и заключенный возвращаются назад;<br>8. Переправляются полицейский и второй сын, полицейский возвращается назад;<br>9. Переправляются полицейский и заключенный.<br>Есть в решении один интересный момент - заключенный остается в последнем действии один на берегу'

			},
			{
				title: 'В лодке с недругом',

				text: 'Три миссионера и три каннибала должны пересечь реку в лодке, в которой могут поместиться только двое. Миссионеры должны соблюдать осторожность, чтобы каннибалы не получили на каком-либо берегу численное преимущество. Как переплыть реку?',
				hint: '',
				answer: 'Первыми пересекают реку миссионер и каннибал. После этого миссионер возвращается. Затем пересекают реку два каннибала. Один из них возвращается. Потом два миссионера пересекают реку. Миссионер и каннибал возвращаются. Два миссионера пересекают реку. Один каннибал возвращается. Два каннибала пересекают реку. Один каннибал возвращается. Два оставшихся каннибала пересекают реку'

			},
			{
				title: 'Хирургия',

				text: 'Трём хирургам необходимо последовательно прооперировать в полевых условиях больного, страдающего заразным заболеванием. Сами хирурги тоже больны, причём все - разными болезнями. В распоряжении хирургов есть лишь две пары стерильных перчаток. Подскажите план операции, после которой ни хирурги, ни больной не заразятся друг от друга. (Помогать друг другу во время операций хирурги не должны. Оперировать одной рукой нельзя.)',
				hint: '',
				answer: 'Первый хирург может надеть сразу две пары перчаток. Затем второй хирург наденет ту пару, которая была внешней во время первой операции. А третий хирург будет делать операцию опять в двух парах перчаток, причём внешняя останется внешней, а пара перчаток, бывшая во время первой операции внутренней, останется внутренней, но будет вывернута наизнанку'

			},
			{
				title: 'Иванушка и коварная принцесса',

				text: '- Задаю тебе последнюю задачу, - сказала принцесса Иванушке, - найди единственно верный путь из этой комнаты в наш зимний сад и сорви для меня самую красивую розу. Из этой комнаты ты пройдешь через левую, или правую, или среднюю дверь во вторую комнату; такие же три вида дверей будут перед тобой при переходе из второй комнаты в третью и из третей - в сад. Учти мои советы, - продолжала принцесса, - первый: из этого зала пройди через правую дверь; второй: из второй комнаты - не через правую дверь, и третий совет: из третей - не через левую дверь. Иванушка знал, что обычно из трех советов принцессы ровно в двух указывают ложное направление, кроме того, служанка принцессы успела шепнуть ему, что надо пройти через дверь каждого вида по одному разу. Как и полагается сказке, принес Иванушка розу и был вознагражден. Какой же маршрут оказался верным?',
				hint: '',
				answer: 'Рассмотрим все возможные маршруты. Т.к. на выбранном пути не должно встречаться одинаково расположенных дверей, то маршрутов всего шесть. Обозначим каждый из маршрутов записью вида Л П С, которая означает, что сначала идем в левую дверь, потом в правую, затем - в среднюю. И для каждой двери отметим, удовлетворяет ли она советам принцессы. Ставим плюс, если да, и минус, если выбранная дверь противоречит совету принцессы.<br>Л П С - - +<br>Л С П - + +<br>П Л С + + +<br>П С Л + + -<br>С П Л - - -<br>С Л П - + +<br>Т.к. нам известно, что два из трех советов были ложными, то правильным будет маршрут, имеющий два минуса и один плюс, т.е. Л П С'

			},
			{
				title: 'Кегли',

				text: 'В старой датской игре, положившей начало современной игре в кегли, в ряд вплотную друг к другу располагаются 13 деревянных кеглей. Одним ударом шара можно сбить либо одну, либо две соседние кегли. Игроки бросают поочередно по одному шару, а цель игры состоит в том, чтобы сбить последнюю кеглю.<br>Горный гном, с которым Рип ван Винкль играет эту партию, только что сбил кеглю № 2. Рип должен выбрать одну из 22 возможностей: сбить одну из 12 кеглей или метнуть шар так, чтобы сбить любую из 10 пар соседних кеглей. Как лучше поступить Рипу, чтобы выиграть партию? Предполагается, что оба игрока могут сбить любую кеглю или любую пару соседних кеглей и что каждая из сторон располагает наилучшей стратегией',
				hint: '',
				answer: 'Рипу необходимо сбить кеглю №6 или №10, чтобы образовались группы с 1-й, 3-мя и 7-ю кеглями. Рассмотрев все варианты, можно доказать, что  ситуацию 1+3+7 всегда можно свести к тому, что гному остается четное число одинаковых групп кеглей. После этого достаточно просто симметрично повторять действия гнома, чтобы гарантировать себе победу'

			},
			{
				title: 'Переправа',

				text: 'Всем известна задача про переправу с одного берега на другой волка, козы и капусты. Эта задача ее разновидность.<br>Итак, есть трехместная лодка, одно из мест забронировано человеком. Нужно переправить на другой берег козла, капусту, двух волков и собаку, причем собака в ссоре с волком, козел неравнодушен к капусте, а волк и собака не могут оставаться наедине с козлом',
				hint: '',
				answer: 'Переправляются по очереди (разумеется, человек все время находится в лодке):<br>1. Козел+Собака<br>2. Собака<br>3. Собака+Капуста<br>4. Козел<br>5. Два волка<br>6. Собака<br>7. Собака+Козел'

			},
			{
				title: 'Задача про электрика',

				text: 'По дну реки (поперёк) проложен кабель. Под его наружной защитной оболочкой скрыто 49 жил - 49 изолированных проводов. Все жилы имеют изоляцию одного цвета, поэтому определить их по цвету изоляции, какой из концов проводов, торчащих из кабеля на одном берегу реки, соответствует тому или иному концу провода на другом берегу реки, невозможно. Электрик должен, определив концы проводов, прикрепить к ним бирки и соответствующие концы перенумеровать одинаковыми числами. Для этого в его распоряжении имеются проходящяя вдоль берега реки линия электропередач, пробник-индикатор (пробник позволяет определить, находится ли данный провод под напряжением) и лодка.<br>Сколько раз придётся электрику переправиться через реку, чтобы решить задачу?<br>Примечание: река довольно широкая и электрик вряд ли захочет лишний раз переправляться через нее ',
				hint: '',
				answer: 'На основном берегу подаём напряжение на один любой провод, сразу можно его пронумеровать №1, все оставшиеся 48 жил соединяем попарно перемычками между собой. Получаем 24 перемычки.<br>Переправляемся на тот берег. Находим сразу жилу №1, которая под напряжением. С помощью перемычки накидываем фазу из 1-ой жилы на любой провод, ставим на него бирку №2.Т.к. он соединён на том берегу с другим проводом, находим и его по напряжению, ставим бирку №3. И так поочерёдно можно пронумеровать все провода на втором берегу.<br>Следующий этап. Начинаем делать перемычки. Провод №1 соединяем с проводом №2, №3 с №4, №5 с №6, №7 с №8 и т.д. Только для удобства, чтобы работать не под напряжением, лучше провод №1 соединить с проводом №2 последними. У нас получается последовательное соединение проводников, помните физику?<br>Теперь возвращаемся на основной берег. Начинаем поочерёдно искать перемычку между 2-м и 3-м проводом. Если разрываем эту перемычку, ток во всех проводах исчезнет, за исключением естественно, основного провода №1, на который сначала подали напряжение (он у нас пронумерован) и провода №2, на котором будет напряжение благодаря перемычке на том берегу между №1 и №2, пронумеровываем жилу №2 и сразу жилу №3. Опять их соединяем между собой. Ищем дальше аналогично №4 и №5, потом №6 и №7. Вот и всё, кабель "прозвонили" и пронумеровали все жилы. Напряжение можно отключить, убрать все перемычки, если они не нужны на этом берегу. Перемычки же на том берегу уже не имеют смысла и будут разъединены, когда в этом будет необходимость в дальнейшем. Вот и получается, нужны всего две  переправы - на тот берег и обратно!'

			},
			{
				title: 'Максимальное расстояние на автомобиле',

				text: 'У вас есть автомобиль с пустым баком вместительностью 20л и есть три бочки с топливом, каждая по 100л. В автомобиле можно увезти не больше одной бочки. Как при таких условиях проехать максимальное расстояние, если на 1км расходуется 1л топлива?',
				hint: '',
				answer: 'Сначала перевозим все 3 бочки на 12км вперед (3 раза туда и 2 обратно), тратим 60л, остается 240л в 3-х бочках. Далее перевозим 2 бочки на 20км (2 раза туда и 1 обратно), тратим еще 60л, остается 180л в 2-х бочках. Далее перевозим 2 бочки еще на 20км (2 раза туда и 1 обратно), тратим еще 60л, остается 120л в 2-х бочках. Переливаем 20л в бак, берем бочку Едем еще 120км. Приехали итого за 172км от начала'

			},
			{
				title: 'Песочные часы',

				text: 'Натали надо испечь яблочный пирог. Обычных часов у нее нет, но есть двое песочных часов. Одни рассчитаны на 7 минут , другие - на 11 минут.<br>Как ей точно отмерить 15 минут, необходимых для приготовления пирога?',
				hint: '',
				answer: 'Она должна их перевернуть одновременно; когда в часах №1 песок пересыпется, она должна поставить пирог в печь; в часах №2 песок продолжает пересыпаться на протяжении еще 4-х минут; спустя 4 минуты Натали снова переворачивает часы №2 и ждет, пока весь песок не пересыпется. Итого получаем 4+11 = 15 минут'

			},
			{
				title: 'Задача Колумба',

				text: 'Недавно я обнаружил одно весьма живое описание того, как в XV веке страстно увлекались азартными играми. Среди упомянутых там игр, требовавших умения или слепого везения, в которые смело и безрассудно бросались знатные кавалеры, была и игра с куриными яйцами. По-видимому, именно здесь следует искать истоки известной истории про колумбово яйцо, которая, несмотря на всю содержащуюся в ней поучительную мораль, кажется слишком постной и бесцветной для того кипевшего страстями времени. Я обратил внимание на любопытный принцип, который лежит в основе этой игры и требует изобретательности и оригинальности мышления.<br>В игре участвуют двое. Игроки выкладывают по очереди яйца одинаковых размеров на квадратную салфетку. После того как яйцо положено на стол, его нельзя больше ни передвигать, ни касаться другим яйцом. Так продолжается до тех пор, пока вся салфетка не будет настолько густо покрыта яйцами, что на ней не останется места для очередного яйца. Последний, кому удалось положить яйцо, выигрывает, а поскольку размеры салфетки или яиц, так же как и меняющиеся расстояния между яйцами, роли не играют, то кажется, что выигрывает просто тот, кому больше повезет. И все же первый игрок может всегда выиграть, если он выберет правильную стратегию, которая, как заметил великий мореплаватель, «проще простого, если вы знаете, в чем тут дело»',
				hint: '',
				answer: 'Секрет состоит в том, что первое яйцо нужно поместить точно в центр салфетки. Тогда, что бы ни делал ваш противник, точно повторяйте его ходы с противоположной стороны на прямой, проходящей через яйцо № 1. Цифры на рисунке обозначают номер соответствующего хода, помогая понять начало партии._!_http://www.smekalka.pp.ru/sites/default/files/1621.gif_!_Просто положив яйцо в центр стола, вы рискуете проиграть, ибо противник может положить свое яйцо в непосредственной близости от вашего, как показано на рисунке, а из-за неправильной формы яйца вам не удастся в точности повторить его ход.<br>Следовательно, единственный способ выиграть наверняка состоит в том, чтобы, подобно великому мореплавателю, надбив конец яйца, поставить его вертикально'

			},
			{
				title: 'Поиски вируса',

				text: 'В лаборатории имеется некоторое количество проб крови, взятых у различных людей. Одна из них содержит весьма разновидность вируса, определяемую при помощи дорогостоящих и трудоемких исследований. Чтобы уменьшить число исследований, лаборатория обратилась за консультацией к математику. Ему пояснили, что при анализах можно брать части различных проб, смешивать их и определять, присутствует ли вирус в полученной смеси. Узнав общее исследуемых людей (оно оказалось между 100 и 200), математик предложил исследовать сначала одну любую из имеющихся проб, утверждая, что общее число анализов при этом все же будет минимальным. Сколько проб в лаборатории?',
				hint: '',
				answer: 'За 7 анализов можно найти зараженную пробу не более чем из 27 = 128 проб. Если бы число проб было более 129, то исследование на первом шаге одной пробы было бы нерациональным, так как (в случае отрицательного результата) осталось бы после этого по-прежнему более 128 неисследованных проб, а значит, число оставшихся анализов будет более 7. Поскольку, по мнению математика, исследование на первом шаге одной пробы не меняем оптимальности процедуры, то число исследуемых проб равно 129'

			},
			{
				title: 'Отмерить время с помощью песочных часов',

				text: 'При помощи только 4- и 7-минутных песочных часов точно отмерьте девять минут',
				hint: '',
				answer: '1. Запустите 4- и 7-минутные часы одновременно<br>2. Когда в 4-минутных часах закончится песок, переверните их (итоговое время - 4 минуты)<br>3. Когда в 7-минутных часах закончится песок, их тоже переворачиваем. В этот момент в 4-минутных часах, в верхней половинке, осталось песка на 1 минуту (итоговое время - 7 минут)<br>4. Когда 4-минутные часы опустеют, переворачиваем 7-минутные, где в нижней половине песка на 1 минуту (итоговое время 8 минут)<br>5. Когда 7-минутные опустеют, прошло ровно 9 минут'

			},
			{
				title: 'Находчивый торговец',

				text: 'Одному торговцу редкими экзотическими фруктами необходимо посетить 30 рынков. У него имеется 3 мешка, в каждый из которых помещается не более 30 плодов. При посещении рынка в качестве торговой пошлины необходимо заплатить по одному плоду из каждого непустого мешка.<br>Если изначально у торговца было 90 плодов, то сколько их останется после посещения всех 30 рынков?<br>P.S. Можно перекладывать плоды из одного мешка в другой',
				hint: '',
				answer: 'Очевидно, что в интересах торговца опустошать мешки как можно скорее, чтобы не платить лишнюю пошлину. Посчитаем, через сколько рынков торговец сможет освободить первый мешок: нужно отдать 30 плодов, за каждое посещение он отдает по 3, т.е. через 10 рынков один из мешков останется пустым. Второй мешок опустеет через 30/2 = 15 посещений рынка. Посетив оставшиеся 5 рынков с одним мешком, наш торговец отдаст еще 5 плодов, а в мешке у него останется 90-30-30-5 = 25 плодов'

			},
			{
				title: 'Чайный сервиз',

				text: 'http://www.smekalka.pp.ru/sites/default/files/1822_1.png_!_Суть задачи в том, чтобы поменять местами чайник и молочник, передвигая предметы из одного квадрата в другой по определенным правилам, а именно:<br>1) предмет перемещать только в тот квадрат, который окажется свободным;<br>2) нельзя передвигать предметы по диагонали квадрата;<br>3) нельзя переносить один предмет поверх другого;<br>4) нельзя также помещать в квадрат более одного предмета, даже временно.<br>Эта задача имеет много решений, но интересно найти самое короткое, т. е. обменять местами чайник и молочник за наименьшее число ходов.<br>В поисках решения незаметно прошел вечер; я покидал станцию, так и не найдя кратчайшего решения.<br>Может быть, читатели найдут его? На всякий случай предупреждаю, что искомое наименьшее число ходов все же больше дюжины, хотя и меньше полутора дюжин',
				hint: '',
				answer: 'Для удобства заменим чайную посуду цифрами:_!_http://www.smekalka.pp.ru/sites/default/files/1822_2.png_!_Тогда задача представится в таком виде: надо поменять местами предметы 2 и 5.<br>Вот порядок, в каком их следует передвигать на свободный квадрат:<br>2, 5, 4, 2, 1, 3, 2, 4, 5, 1, 4, 2, 3, 4, 1, 5, 2<br>Задача решается в 17 ходов; более короткого решения нет'

			}

		]

	};

}(window));