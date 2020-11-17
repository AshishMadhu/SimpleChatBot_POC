const getProductsDetails = () => {
	var productAndQuantiy = [];
	$(".product-name").each((i, obj) => {
		var name = $(obj).data("name");
		var quantity = $(obj).data("quantity");
		var price = $(obj).data("price");
		productAndQuantiy.push({
			name: name,
			quantity: quantity,
			price: price,
		});
	});
	return productAndQuantiy;
};

const getTotalPrice = () => {
	total = 0;
	products = getProductsDetails();
	products.forEach((product, i) => {
		total += parseInt(product.price) * parseInt(product.quantity);
	});
	return total;
};

const setTotalPrice = () => {
	$("#total-price").html(getTotalPrice());
};

const setSubTotal = (product_id) => {
	$("#")
}

const addAndRemoveToggle = (element, productId) => {
	axios
		.get(hostname + `/addToBasketApi/?product_id=${productId}`, {
			headers: {
				"X-CSRFToken": getCookie("csrftoken"),
			},
		})
		.then((res) => {
			if (res.data.isThere) {
				deleteLine(productId);
				element.classList.toggle("btn-secondary");
				element.textContent = "Add to Basket";
			} else if (res.data.created) {
				element.classList.toggle("btn-secondary");
				element.textContent = "Remove from Basket";
			} else {
				// called when
				addToBasket(productId).then((res) => {
					updateBasket(res);
					element.classList.toggle("btn-secondary");
					element.textContent = "Remove from Basket";
				});
			}
		});
};

const addToBasket = (id) => {
	return axios
		.post(
			hostname + `/addToBasketApi/?product_id=${id}`,
			{},
			{
				headers: {
					"X-CSRFToken": getCookie("csrftoken"),
				},
			}
		)
		.then((res) => res)
		.catch((err) => err);
};

const add = (product_id, p_cost, input_field) => {
	input_field.value++;
	updateQuantity(product_id, p_cost, input_field);
};

const minus = (product_id, p_cost, input_field) => {
	value = input_field.value;
	if (value > 0) input_field.value--;
	updateQuantity(product_id, p_cost, input_field);
};

const getTotal = (p_cost, p_quantity) => {
	return p_cost * p_quantity;
};

const updateQuantity = (product_id, p_cost, element) => {
	var count = element.value;
	if (count == "") {
		count = 0;
	}
	axios
		.post(
			hostname + `/addToBasketApi/?product_id=${product_id}&count=${count}`,
			{},
			{
				headers: {
					"X-CSRFToken": getCookie("csrftoken"),
				},
			}
		)
		.then((result) => {
			$("#basket").attr("data-count", result.data.count);
			$(`#${product_id}_total`).html(`Rs.${getTotal(p_cost, count)}`);
			$(`#${product_id}_subtotal`).html(`${getTotal(p_cost, count)}`);
			$(`#${product_id}_quantity_count`).html(`x${count}`);
			$(`#${product_id}_name`).data("quantity", count);
			setTotalPrice();
		})
		.catch((err) => {
			console.log(err);
		});
};

const deleteLine = (productId) => {
	axios
		.delete(hostname + `/addToBasketApi/?product_id=${productId}`, {
			headers: {
				"X-CSRFTOKEN": getCookie("csrftoken"),
			},
		})
		.then((res) => {
			$(`#${res.data.lineId}_basket_box`).remove();
			$(`#${productId}_row`).remove();
			updateBasket(res);
			setTotalPrice();
		});
};

function deleteBasketLine(event, productId) {
	event.preventDefault();
	deleteLine(productId);
}

const updateBasket = (res) => {
	if (res.data.created) {
		customAlert("Basket added", "success", 4000);
		$("#basket").attr("data-count", res.data.count);
	} else if (res.data.deleted) {
		customAlert("Item deleted form basket", "danger", 2000);
		$("#basket").attr("data-count", res.data.count);
	} else {
		customAlert("Item is already added", "danger", 4000);
	}
};


setTotalPrice()