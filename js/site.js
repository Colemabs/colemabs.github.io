  $(document).ready(function() {
  	$('select').material_select();
  	$('ul.tabs').tabs();
  	$('.slider').slider();
  });




//dynamically generate tabs so it's easier to add another tab
var buildPage = function(){

	var tabs = ['Home', 'Items', 'Admin'];
	var pathname = window.location.pathname;
	var url = window.location.href;

	for(var i = 0; i < tabs.length; i++){
		$('.tabs').append('<li class="tab col s4" data-page="' + tabs[i].toLowerCase() + '"><a href="' + tabs[i].toLowerCase() + '.html">' + tabs[i] + '</a></li>');
}//end of for

for(var i = 0; i < tabs.length; i++){
	if(window.location.href.indexOf( tabs[i].toLowerCase() ) > -1 ) {
		$('li[data-page="' + tabs[i].toLowerCase() + '"]').find('a').addClass('active');
	}
	else{
		$('li[data-page="' + tabs[i].toLowerCase() + '"]').find('a').removeClass('active')
	}
}//end of for

//forcing page to go to clicked href
$(document).on('click', 'a', function(e){
	e.preventDefault();
	window.location = $(this).attr('href');
})

}()//end of buildPage()

var items = [];

var Item = (function(){

	var itemGlobalID = 0;

	return function Item(name, description, special, fullPrice, options, imgURL){
		this.id = itemGlobalID++;
		this.name = name;
		this.description = description;
		this.special = special;
		this.fullPrice = fullPrice;
		this.options = options;
		this.imgURL = imgURL;
	}
})();

//first instance of storedItems
console.log("Before first storedItems" + storedItems);
var storedItems = $.parseJSON(localStorage.getItem('localItems'));
console.log("After first storedItems" + storedItems);

var tableDraw = function(){

	var amount = 0;

	$('#tblItems tbody').empty();


	for(var i = 0; i < storedItems.length; i++){
		if(storedItems[i].options == "Dozen"){
			console.log('Its a dozen');
			amount = 12;
		}else if(storedItems[i].options == "Half Dozen"){
			console.log('Its a half dozen');
			amount = 6;
		}else if(storedItems[i].options == "Single"){
			console.log('Its a single');
			amount = 1;
		}

		$('#tblItems').append('<tr class="info" data-id="'+ storedItems[i].id + '">' + 
			'<td>' + storedItems[i].name +  '</td>'  +
			'<td>' + storedItems[i].description + '</td>'  +
			'<td>' + storedItems[i].special + '</td>'  +
			'<td>' + amount + '</td>'  +
			'<td>' + storedItems[i].fullPrice + '</td>'  +
			'</tr>');
	}
};
localStorage.setItem('localItems', JSON.stringify(storedItems));

tableDraw();
/*

var a = [ { name: 'Ben'} ,  {name: 'Will'} ];
var cart = $.parseJSON(localStorage.getItem('cart'));
localStorage.setItem('cart',  JSON.stringify(a));



*/






$(document).on('click', '.btnAdd', function(){

	var nameIn = $('#item_name').val();
	var descriptionIn = $("#description").val();
	var specialIn = $("#special").prop("checked");
	var priceIn = $("#full_price").val();
	var optionsIn = $("#options").val();
	var imgURLIn = $("#img_url").val();

	var newItem = new Item(nameIn, descriptionIn, specialIn, priceIn, optionsIn, imgURLIn);

	
	
	var updateLocalStorage = function(){
		console.log('before pushing new Item:');
		for(var i = 0; i < storedItems.length; i++){

			console.log(storedItems[i]);

		}
		storedItems.push(newItem);
		items.push(newItem);
		console.log('after pushing new Item:');
		for(var i = 0; i < storedItems.length; i++){

			console.log(storedItems[i]);

		}
		localStorage.setItem('localItems', JSON.stringify(storedItems));
	}()


	emptyForm();
	tableDraw();
});



var emptyForm = function(){
	$('#item_name').val('');
	$('#description').val('');
	$('#full_price').val('');
	$('#img_url').val('');

}





var buildItemsList = function(){
	for(var i = 0; i < storedItems.length; i++){
		$('#items-list').append("<div class='col s4 list-item card-panel'><h5 class='list-item-title'>" + storedItems[i].name + " </h5>"+
			"<div class='col s12 list-item-description'>" + storedItems[i].description + "</div>" +
			"<div class='col s12 list-item-amount'>" + storedItems[i].options + "</div>" +
			"<div class='col s12 list-item-price'> $" + storedItems[i].fullPrice + "/flower</div>" +
			"<div class='col s8 offset-s2 btn-flat red lighten-4 white-text btnCart' data-item=" + i + ">Add to Cart</div>" +
			"</div>");
	}

}()

console.log("Before first storedCartItems" + storedCartItems);
var storedCartItems = $.parseJSON(localStorage.getItem('cartItems'));
console.log("After first storedCartItems" + storedCartItems);


var addToCart = function(){
	$(document).on('click', '.btnCart', function(){

		console.log($(this).attr('data-item'));
		
		storedCartItems.push(storedItems[$(this).attr('data-item')]);				
		buildCart();

		localStorage.setItem('cartItems', JSON.stringify(storedCartItems));
		
	});
}()


var buildCart = function(){

	var amount = 0;

	

	$('.collection').html("");
	$('.collection').append('<li class="collection-header"><h4>Cart</h4></li>')
	var totalPrice = 0;
	for(var i = 0; i < storedCartItems.length; i++){
					if(storedCartItems[i].options == "Dozen"){
						console.log('Its a dozen');
						amount = 12;
					}else if(storedCartItems[i].options == "Half Dozen"){
						console.log('Its a half dozen');
						amount = 6;
					}else if(storedCartItems[i].options == "Single"){
						console.log('Its a single');
						amount = 1;
					}
				
		$('.collection').append('<li class="collection-item"><span class="cartItemName">' + storedCartItems[i].name + '</span><span class="cartItemPrice">$' + (storedCartItems[i].fullPrice * amount) + '</span><a href="#!" style="float:right;" class="secondary-content"><i class="material-icons deleteCartItem">delete</i></a></li>');
		totalPrice += parseInt(storedCartItems[i].fullPrice * amount);
	}
	$('#cartTotal').html('Total: $' + totalPrice);
}
buildCart();


$(document).on('click', '.deleteCartItem', function(){
	//traverse the DOM to find the object name related to remove button
	var itemTitle = $(this).parent().parent().children().first().html();
	console.log(itemTitle);

	//loop through the storedCartItems and compare storedCartItems.name to the itemTitle, if it matches, remove both.
	//The downside of this is that it deletes the first item in the cart that matches the name, so if there are duplicates, the first one gets deleted.
	//This would be solved by adding an unique id to the cart objects. Since I'm using localStorage, I didn't want to wrap the objects in an extra layer, nor modify the objects just for a unique id, when this way is a partial solution.
	for(var i = 0; i < storedCartItems.length; i++){
		if($.parseJSON(localStorage.getItem('cartItems'))[i].name == itemTitle){
			console.log($.parseJSON(localStorage.getItem('cartItems'))[i].name + " matches " + itemTitle);
			console.log(i);
			storedCartItems.splice(i, 1);
		}
	}
	localStorage.setItem('cartItems', JSON.stringify(storedCartItems));
	buildCart();
});

var buildHomePage = function(){

	for(var i=0; i < storedItems.length; i++){
		if(storedItems[i].special){
			$('.slides').append('<li> <img src="' + storedItems[i].imgURL + '">'+
								'<div class="caption left-align"><h3>Flowers</h3><a href="items.html"><div class="btn">See more</div></a></div><div class="caption center-align"></div></li>')
			$('#featuredArea').append("<div class='col s4'>" +
										"<div class='card'>" +
											"<div class='card-image'>" +
												"<img src=" + storedItems[i].imgURL + ">" +
												'<span class="card-title">' + storedItems[i].name + '</span>' +
											'</div>' +
											"<div class='card-content'> " +
												"<p>" + storedItems[i].description + "</p>" +
											"</div>" +
											"<div class='card-action'>" +
												"<a href='items.html'>See in Items</a> " +
											"</div>" +
										 "</div>" +
										"</div>");
		}
		
	}
}()

$('#special').change(function() {
    // this will contain a reference to the checkbox   
    $('.urlInput').fadeToggle("slow");
    /*if (this.checked) {
        
        $('.urlInput').fadeIn("slow");
    } else {
        $('.urlInput').addClass('hidden');
    }*/
});