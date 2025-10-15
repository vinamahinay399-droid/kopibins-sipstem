let selectedRow = null;

function onFormSubmit(e) {
    e.preventDefault();

    const formData = readFormData();
    if (selectedRow == null) {
        insertNewRecord(formData);
    } else {
        updateRecord(formData);
    }
    resetForm();
}

function readFormData() {
    return {
        productCode: document.getElementById("productCode").value,
        product: document.getElementById("product").value,
        qty: parseInt(document.getElementById("qty").value),
        perPrice: parseFloat(document.getElementById("perPrice").value)
    };
}

function insertNewRecord(data) {
    const table = document.getElementById("storeList").getElementsByTagName("tbody")[0];
    const newRow = table.insertRow();

    const subtotal = data.qty * data.perPrice;

    newRow.insertCell(0).innerHTML = data.productCode;
    newRow.insertCell(1).innerHTML = data.product;
    newRow.insertCell(2).innerHTML = data.qty;
    newRow.insertCell(3).innerHTML = `₱${data.perPrice.toFixed(2)}`;
    newRow.insertCell(4).innerHTML = `₱${subtotal.toFixed(2)}`;
    newRow.insertCell(5).innerHTML = `
    <button onClick="onEdit(this)">Edit</button>
    <button onClick="onDelete(this)" style="background:#c0392b;">Delete</button>
  `;
}

function resetForm() {
    document.getElementById("productCode").value = "";
    document.getElementById("product").value = "";
    document.getElementById("qty").value = "1";
    document.getElementById("perPrice").value = "";
    document.getElementById("submitBtn").textContent = "Add Item";
    document.getElementById("cancelEdit").style.display = "none";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("productCode").value = selectedRow.cells[0].innerHTML;
    document.getElementById("product").value = selectedRow.cells[1].innerHTML;
    document.getElementById("qty").value = selectedRow.cells[2].innerHTML;
    document.getElementById("perPrice").value = selectedRow.cells[3].innerHTML.replace("₱", "");
    document.getElementById("submitBtn").textContent = "Update Item";
    document.getElementById("cancelEdit").style.display = "inline-block";
}

function updateRecord(formData) {
    const subtotal = formData.qty * formData.perPrice;
    selectedRow.cells[0].innerHTML = formData.productCode;
    selectedRow.cells[1].innerHTML = formData.product;
    selectedRow.cells[2].innerHTML = formData.qty;
    selectedRow.cells[3].innerHTML = `₱${formData.perPrice.toFixed(2)}`;
    selectedRow.cells[4].innerHTML = `₱${subtotal.toFixed(2)}`;
}

function onDelete(td) {
    if (confirm("Are you sure you want to delete this item?")) {
        const row = td.parentElement.parentElement;
        document.getElementById("storeList").deleteRow(row.rowIndex);
        resetForm();
    }
}

function cancelEdit() {
    resetForm();
}
