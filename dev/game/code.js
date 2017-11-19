$(function(){
	function conlog(print){
		console.log(print);
	}
	function addToConsole(text){
		$(".progressConsole").append("<p>" + text + "</p>");
	}
	function addWarning(text){
		$(".progressConsole").append("<p class='warning'>" + text + "</p>");
	}
	var player = [];
	var crew = ["rachel","spencer", "marg", "thom"];

	var location = 0;

	var farmer = [job = "Meteorite Farmer", startmoney = 1000, ];
	var engineer = [job = "Spaceship Engineer", startmoney = 1500];
	var moneybags = [job = "Moneybags", startmoney = 2000];
	var supplyCost = [
		fuel = 50,
		food = 20,
		ammo = 20,
		parts = 100
	];
	var money = 0;
	var numOfParts = 0, numOfFuel = 0, numOfFood = 0, numOfAmmo = 0;
	var costOfItems = 0;
	var oldBillParts = 0, oldBillFuel = 0, oldBillFood = 0, oldBillAmmo = 0;
	var storeBill = 0;
	var storeTotal = 0;

	var startCounter = false;
	var counter = 0;

	var screenCount = 0;
	var docHeight = $("body").height();
	var mainMargin = 0;

	var weather = "perfect";
	var weatherOpt = ["heated", "freezing", "fair", "perfect"];
	var pace = "quick";
	var paceOpt = ["stopped", "slow", "moderate", "quick", "fast"];
	var health = $(crew).length;
	var rations = "filling";
	var food = 0;
	var ffp = 0;
	var ammo = 0;
	var fuel = 0;
	var fuelUsage = 0;
	var day = 1;

	var diceOne = 0;
	var diceTwo = 0;
	var ranEnDice = 0;
	var encounter = 0;

	var traderTitle = ["Space Voyager", "Hitchhiker", "Galaxy Vagabond", "Ex-Pirate"];
	var traderName = ["Bobbert", "Baltazar", "Hosanna", "Huxley", "Ivar", "Nevin", "Caess", "Sourdrop", "Aut"];
	var tradeItems = [
		{one:'100 lbs of food', two:'§10', add:'100', to:'food', minus:'10', from:'money'},
		{one:'200 lbs of food', two:'§10', add:'200', to:'food', minus:'10', from:'money'},
		{one:'200 lbs of food', two:'§30', add:'200', to:'food', minus:'30', from:'money'},
		{one:'300 lbs of food', two:'§40', add:'300', to:'food', minus:'40', from:'money'},
		{one:'100 gallons of fuel', two:'§10', add:'100', to:'fuel', minus:'10', from:'money'},
	]
	var itemNum = 0;
	var traderNum = 0;
	var titleNum = 0;

	// console.log(farmer);
	// console.log(engineer);
	// console.log(moneybags);

//function
	function addJob(job){
		player = $.merge([],job);
		console.log(player);
		$("span.money").text(player[1]);
	};

	function addMembers(num){
		var inputMember = $("input[name = " + num + "]").val();
		var name  = [num = inputMember];
		player = $.merge(player,name);
	}
player[7] = "April";
	function updateMonth(){
		$("span.month").text(player[7]);
		$("span.day").text(day);
		// console.log(player[7]);
		day++;
		if(player[7] == "April" && day > 30){
			player[7] = "May";
			day = 1;
		} else if(player[7] == "May" && day > 31){
			player[7] = "June";
			day = 1;
		} else if(player[7] == "June" && day > 30){
			player[7] = "July";
			day = 1;
		} else if(player[7] == "July" && day > 31){
			player[7] = "August";
			day = 1;
		} else if(player[7] == "August" && day > 31){
			player[7] = "September";
			day = 1;
		} else if(player[7] == "September" && day > 30){
			player[7] = "October";
			day = 1;
		} else if(player[7] == "October" && day > 31){
			player[7] = "November";
			day = 1;
		} else if(player[7] == "November" && day > 30){
			player[7] = "Decmeber";
			day = 1;
		} else if(player[7] == "Decmeber" && day > 31){
			player[7] = "January";
			day = 1;
		} else if(player[7] == "January" && day > 31){
			player[7] = "Febuary";
			day = 1;
		} else if(player[7] == "Febuary" && day > 28){
			player[7] = "March";
			day = 1;
		} else if(player[7] == "March" && day > 31){
			player[7] = "April";
			day = 1;
		} 
		conlog("day:" + day);
	}

	function storeBilling(bill){
		storeBill -= bill;
		storeBill += costOfItems;
		storeTotal = money - storeBill;
		console.log("bill: " + storeBill);
		console.log("total: " + storeTotal);
		$("span.bill").text(storeBill);
		$("span.total").text(storeTotal);
		if(storeTotal >= 0){
			$(".exitStore").show();
		} else if(storeTotal < 0){
			$(".exitStore").hide();
		}
	}

	// function step(){
	// 	console.log(counter);
	// 	counter++;
	// 	console.log(counter);
	// 	if(counter > 129600) t = 0;
	// 	window.requestAnimationFrame(step);

	// 	//20 chances for randomness
	// }

	

	function encounterSituations(){
		if(encounter == 0){
			addToConsole("You travel a days worth");
			//when have time do animation of getting closer to location
		} else if(encounter == 1){
			addToConsole("ARRRRRRRGH! Pirates have stormed the ship!");
			addToConsole("The space pirates demand §500 or else!");
			addToConsole("What will you do?");
			$(".travel").hide();
			$(".twoChoices .one").text("Attack!");
			$(".twoChoices .two").text("Give In");
			$(".twoChoices").show();
			$(".twoChoices .one").click(function(){
				if(ammo > 0){
					diceOne = Math.ceil( ( Math.random() * 10) );
					conlog("Dice roll:" + diceOne);
					if(diceOne >= 6){
						addToConsole("Your gunslinging ways superior to the space pirates and they run away!");
						$(".travel").show();
						$(".twoChoices").hide();
					} else {
						addToConsole("The space pirates draw their laser guns before you're able to!");
						addToConsole("They loot §500 and 100lbs of food because of the trouble you caused.");
						money -= 500;
						food -= 100;
						$("span.money").text(money);
						$("span.food").text(food);
						$(".travel").show();
						$(".twoChoices").hide();
					}
				} else {
					addToConsole("You have no ammo! What will you do?");
					$(".twoChoices .one").text("Bluff!").addClass("bluff").removeClass("one").off("click");

				}
				$(".twoChoices .bluff").click(function(){
					diceOne = Math.ceil( ( Math.random() * 10) );
					if( diceOne < 6){
						addToConsole("They believe you and back off only taking §10.");
						money -= 10;
						$("span.money").text(money);
						$(".twoChoices .bluff").addClass("one").removeClass("bluff");
						$(".twoChoices").hide();
						$(".travel").show();
					} else{
						addToConsole("They laugh when they realize there's no ammo and take §700 instead.");
						money -= 700;
						$("span.money").text(money);
						$(".twoChoices .bluff").addClass("one").removeClass("bluff");
						$(".twoChoices").hide();
						$(".travel").show();
					}
					$(".progressConsole").stop().animate({
						scrollTop: $(".progressConsole")[0].scrollHeight
					});
				});

			});
			$(".twoChoices .two").click(function(){
				addToConsole("You give the pirates what they want and they saunter off the ship with their pockets full");
				money -= 500;
				$(this).off('click');
				$("span.money").text(money);
				$(".twoChoices").hide();
				$(".travel").show();
				$(".progressConsole").stop().animate({
					scrollTop: $(".progressConsole")[0].scrollHeight
				});
			});


		} else if(encounter == 2){
			addToConsole("Space whales pass by and sooth your soul");
		} else if(encounter == 3 && role > 3){
			addToConsole("Woaahhh! Woaahhh! Time Warp sends you back three days!");
			day -= 4;
			role -= 4;
			if(day < 1){
				if(player[7] == 'April'){
					player[7] = 'March';
					day = 31 + day;
				} else if(player[7] == 'May'){
					player[7] = 'April';
					day = 30 + day;
				} else if(player[7] == 'June'){
					player[7] = 'May';
					day = 31 + day;
				} else if(player[7] == 'July'){
					player[7] = 'June';
					day = 30 + day;
				} else if(player[7] == 'August'){
					player[7] = 'July';
					day = 31 + day;
				} else if(player[7] == 'September'){
					player[7] = 'August';
					day = 31 + day;
				} else if(player[7] == 'October'){
					player[7] = 'September';
					day = 30 + day;
				} else if(player[7] == 'November'){
					player[7] = 'October';
					day = 31 + day;
				} else if(player[7] == 'Decmeber'){
					player[7] = 'November';
					day = 30 + day;
				} else if(player[7] == 'January'){
					player[7] = 'Decmeber';
					day = 31 + day;
				} else if(player[7] == 'February'){
					player[7] = 'January';
					day = 31 + day;
				} else if(player[7] == 'March'){
					player[7] = 'February';
					day = 28 + day;
				}


				$("span.month").text(player[7]);
				$("span.day").text(day);
			}
			$("span.day").text(day);
		} else if(encounter == 4){
			addToConsole("You see poop in space. That was weird.");
			//black hole shed weight choose what to dump
		} else if(encounter == 5){
			addToConsole("Asteroids fly by but you make it out unscathed! Thank the space lords!");
		} else if(encounter == 6){
			addToConsole(player[4] + " gets space mites and dies!");
		} else if(encounter == 7){
			var death = Math.floor((Math.random() * health+1));

			conlog("death num: " + death);
			conlog(crew);
			addToConsole("Weasles! Weasles! SPACE WEASLES! They are in the suits! AHHHHH! " + crew[death - 1] + " dies from an infected bite.");
			crew.splice(death - 1,1);
			health = $(crew).length;
			$("span.health").text(health);
			conlog(crew);
			deadCrew();
		} else if(encounter == 8){
			addToConsole("Space Pigeons are found in the storage area. They have eaten all the food but now you have space pigeons to eat.");
		} else if(encounter == 9){
			addToConsole("You catch flotsam passing by your ship. You inspect it closer. NEVERMIND IT'S SPACE WHALE POOP! NOOOOOOO!");
		} else if(encounter == 10){
			addToConsole("You wish on a falling star. What a beautiful time.");
		} else if(encounter >= 20){

		} else{
			addToConsole("You travel a days worth");
		}
	}

	function paceChange(clickPace){
		$("." + clickPace).click(function(){
			pace = clickPace;
			$(".pace-container h4").css({'color':'#ffffff'});
			$(this).css({'color':'#2dfffe'});
		});
	}

	function rationChange(clickRation){
		$("." + clickRation).click(function(){
			rations = clickRation;
			$(".ration-container h4").css({'color':'#ffffff'});
			$(this).css({'color':'#2dfffe'});
		});
	}


	function trading(traderNum,adding,minusing,itTo,itFrom){
		$("." + traderNum + " .make-trade").click(function(){
			if(itTo == "food"){
				food += parseInt(adding);
				$("span.food").text(food);
			} else if(itTo == "fuel"){
				fuel += parseInt(adding);
				$("span.fuel").text(fuel);
			} else if(itTo == "money"){
				money += parseInt(adding);
				$("span.money").text(money);
			}

			if(itFrom == "food"){
				food -= parseInt(minusing);
				$("span.food").text(food);
			} else if(itFrom == "fuel"){
				fuel -= parseInt(minusing);
				$("span.fuel").text(fuel);
			} else if(itFrom == "money"){
				money -= parseInt(minusing);
				$("span.money").text(money);
			}
		});
	}
	function trade(traderNum){
		titleNum = (Math.floor((Math.random() * $(traderTitle).length + 1))) - 1;
		nameNum = (Math.floor((Math.random() * $(traderName).length + 1))) - 1;
		itemNum = (Math.floor((Math.random() * $(tradeItems).length + 1))) - 1;
		$("." + traderNum + " .traderTitle").text(traderTitle[titleNum]);
		$("." + traderNum + " .trader").text(traderName[nameNum]);
		$("." + traderNum + " .first-item").text(tradeItems[itemNum].one);
		$("." + traderNum + " .second-item").text(tradeItems[itemNum].two);

		if(traderNum == "trade-one"){
			var oneAdd = tradeItems[itemNum].add;
			var oneMinus = tradeItems[itemNum].minus;
			var oneTo = tradeItems[itemNum].to;
			var oneFrom = tradeItems[itemNum].from;
			trading(traderNum,oneAdd,oneMinus,oneTo,oneFrom);
		} else if(traderNum == "trade-two"){
			var twoAdd = tradeItems[itemNum].add;
			var twoMinus = tradeItems[itemNum].minus;
			var twoTo = tradeItems[itemNum].to;
			var twoFrom = tradeItems[itemNum].from;
			trading(traderNum,twoAdd,twoMinus,twoTo,twoFrom);
		} else if(traderNum == "trade-three"){
			var threeAdd = tradeItems[itemNum].add;
			var threeMinus = tradeItems[itemNum].minus;
			var threeTo = tradeItems[itemNum].to;
			var threeFrom = tradeItems[itemNum].from;
			trading(traderNum,threeAdd,threeMinus,threeTo,threeFrom);
		}
		
		
	}
	

	function deadCrew(){
		if(health <= 0){
			addToConsole("Your whole crew has passed away.");
			addToConsole("What is a captain without a good crew by their side?");
			addToConsole("Shall we try again?");
			$(".restart").show();
			$(".travel").hide();
			encounter = 20;
		}
	}


//next
	$(".next").click(function(){
		screenCount++;
		// console.log(docHeight);
		mainMargin += docHeight;
		$(".atMain").css('marginTop',  -mainMargin);
		// console.log(mainMargin);
	});

//jobs
	$(".farmer").click(function(){
		addJob(farmer);
		money = 1000;
	});
	$(".engineer").click(function(){
		addJob(engineer);
		money = 1500;
	});
	$(".moneybags").click(function(){
		addJob(moneybags);
		money = 2000;
	});


//names
	$(".leaderName").click(function(){
		var inputLeader = $("input[name = 'captain']").val();
		var name = [leader = inputLeader];
		player = $.merge(player,name);
		console.log(player);
	});

	$(".memberName").click(function(){
		var inputMember = $("input[name = 'member1']").val();
		var name  = [member1 = inputMember];
		player = $.merge(player,name);
		inputMember = $("input[name = 'member2']").val();
		name  = [member2 = inputMember];
		player = $.merge(player,name);
		inputMember = $("input[name = 'member3']").val();
		name  = [member3 = inputMember];
		player = $.merge(player,name);
		inputMember = $("input[name = 'member4']").val();
		name  = [member4 = inputMember];
		player = $.merge(player,name);
		crew = $.merge([],name);
		console.log(player);
	});

//month
	$(".april").click(function(){
		player[7] = 'April';
		updateMonth();
	});
	$(".may").click(function(){
		player[7] = 'May';
		updateMonth();
	});
	$(".june").click(function(){
		player[7] = 'June';
		updateMonth();
	});
	$(".july").click(function(){
		player[7] = 'July';
		updateMonth();
	});

//shop
	// money = parseInt(player[1]);
	$("span.money").text(money);

	$("input[name = 'parts']").change(function(){
		numOfParts = $("input[name = 'parts']").val();
		costOfItems = 100 * numOfParts;
		storeBilling(oldBillParts);
		oldBillParts = costOfItems;
	});
	$("input[name = 'fuel']").change(function(){
		numOfFuel = $("input[name = 'fuel']").val();
		costOfItems = 50 * numOfFuel;
		storeBilling(oldBillFuel);
		oldBillFuel = costOfItems;
	});
	$("input[name = 'food']").change(function(){
		numOfFood = $("input[name = 'food']").val();
		costOfItems = 10 * numOfFood;
		storeBilling(oldBillFood);
		oldBillFood = costOfItems;
	});
	$("input[name = 'ammo']").change(function(){
		numOfAmmo = $("input[name = 'ammo']").val();
		costOfItems = 20 * numOfAmmo;
		storeBilling(oldBillAmmo);
		oldBillAmmo = costOfItems;
	});
	$(".exitStore").click(function(){

		player[1] = storeTotal;
		player[8] = numOfParts;
		player[9] = numOfFuel * 100;
		fuel = player[9];
		player[10] = numOfFood;
		food = player[10] * 100;
		player[11] = numOfAmmo;
		ammo = player[11] * 2;
		money = storeTotal;
		console.log(player);
	});



	$(".departure").click(function(){
		counter = 0;
		startCounter = true;
		console.log(startCounter);
		$("span.money").text(money);
		$("span.weather").text(weather);
		$("span.pace").text(pace);
		$("span.health").text(health);
		$("span.rations").text(rations);
		$("span.food").text(food);
		$("span.ammo").text(ammo);
		$("span.fuel").text(fuel);
		$("span.month").text(player[7]);
		$("span.day").text(day);
		$(".options").show();
	});

// //counter
	
// 			//Math.ceil rounds up
// 			var diceOne = Math.ceil( ( Math.random() * 10) );
// 			var diceTwo = Math.ceil( ( Math.random() * 10) );
// 			var randomEncounterDice = Math.floor((diceOne + diceTwo)/2);
// 			var encounter = 0;
// 			console.log(diceOne);
// 			console.log(diceTwo);
// 			console.log(randomEncounterDice);
var role = 1;

player[7] = "April";
food = 500;
ammo = 0;
fuel = 2000;
money = 2000;


$("span.money").text(money);
$("span.food").text(food);
$("span.fuel").text(fuel);




//day
	$(".traverse").click(function(){
		updateMonth();

		if(pace == "slow"){
			fuelUsage = 5;
			fuel -= fuelUsage;
			$("span.fuel").text(fuel)
		} else if(pace == "moderate"){
			fuelUsage = 15;
			fuel -= fuelUsage;
			$("span.fuel").text(fuel)
		} else if(pace == "quick"){
			fuelUsage = 30;
			fuel -= fuelUsage;
			$("span.fuel").text(fuel)
		} else if(pace == "fast"){
			fuelUsage = 50;
			fuel -= fuelUsage;
			$("span.fuel").text(fuel)
		}

		if(rations == "bare"){
			fpp = 5;
			food -= (fpp * health);
			$("span.food").text(food);
		} else if(rations == "meager"){
			fpp = 10;
			food -= (fpp * health);
			$("span.food").text(food);
		}else if(rations == "filling"){
			fpp = 20;
			food -= (fpp * health);
			$("span.food").text(food);
		}
		
		diceOne = Math.ceil( ( Math.random() * 10) );
		diceTwo = Math.ceil( ( Math.random() * 10) );
		ranEnDice = Math.floor((diceOne + diceTwo)/2);
		if(ranEnDice == diceOne || ranEnDice == diceTwo){
			encounter = Math.ceil( ( Math.random() * 10) );
		}
		// encounter = 3;
		

		if(fuel <= fuelUsage && fuel > 0){
			// $(".travel").hide();

			addToConsole("You are running low on fuel. Try trading for more fuel or adjusting your pace.");
		} else if(fuel <=0){
			addToConsole("Warning! You have run out of fuel. Attempt to trade for fuel or drift helplessly through space.");
			$(".traverse").addClass("noFuel").removeClass("traverse").off('click');
			encounter = 20;
		}

		if(food <= (ffp * health) && food > 0){
			addToConsole("A crew member warns you that food storage is getting low. It's advisable to make a trade for food.");
		} else if(food <= 0){
			food = 0;
			$("span.food").text(food);
			addWarning("Warning! You have run out of food. If you continue to travel without food your crew members may die.");
			var hungryDice = Math.ceil( ( Math.random() * 10) );
			conlog("hungry: " + hungryDice)
			if(hungryDice == 5 || hungryDice == 3){
				var death = Math.floor((Math.random() * health+1));

				addToConsole(crew[death - 1] + " has passed away from hunger.");

				crew.splice(death - 1,1);
				health = $(crew).length;
				$("span.health").text(health);
				encounter = 20;
			}
		}

		deadCrew();
		




		
		encounterSituations();

		$(".progressConsole").stop().animate({
			scrollTop: $(".progressConsole")[0].scrollHeight
		});

		conlog("role:" + role);
		conlog(diceOne);
		conlog(diceTwo);
		conlog(ranEnDice);
		conlog(encounter);
		encounter = 0;
		role++;

		// if(role == 10){
		// 	location++;
		// 	if(location == 1){
		// 		addToConsole("You have neared Planet X, what will you do?");
		// 		$(".travel").hide();
		// 		$(".twoChoices").show();
		// 		$(".twoChoices .one").text("Touch Down");
		// 		$(".twoChoices .two").text("Avoid");
		// 		$(".one").click(function(){
		// 			conlog("touch down");
		// 		})
		// 		$(".two").click(function(){
		// 			addToConsole("You chose to avoid Planet X. Was this a good idea? Only time will tell.");
		// 			$(".travel").show();
		// 			$(".twoChoices").hide();
		// 			$(this).off("click");
		// 		})
		// 	}
		// }
	});





//pace
	$(".check-pace").click(function(){
		$(".change-pace").show();
		$(".travel").hide();
		$(".progressConsole").hide();
	});

	paceChange("slow");
	paceChange("moderate");
	paceChange("quick");
	paceChange("fast");
	
	$(".set-pace").click(function(){
		$("span.pace").text(pace);
		$(".change-pace").hide();
		$(".travel").show();
		$(".progressConsole").show();
	})
	
//rations
	$(".check-rations").click(function(){
		$(".change-rations").show();
		$(".travel").hide();
		$(".progressConsole").hide();
	});

	rationChange("bare");
	rationChange("meager");
	rationChange("filling");

	$(".set-rations").click(function(){
		$("span.rations").text(rations);
		$(".change-rations").hide();
		$(".travel").show();
		$(".progressConsole").show();
	});


//trade
	$(".attempt-trade").click(function(){
		$(".progressConsole").hide();
		$(".travel").hide();
		$(".trading").show();

		// $(".noFuel").addClass("traverse").removeClass("noFuel").on('click');
		addToConsole("trade attempted");

	});
	

	trade("trade-one");
	trade("trade-two");
	trade("trade-three");
	



//restart
	$(".restart h4").click(function(){
		location.reload();
	});



});