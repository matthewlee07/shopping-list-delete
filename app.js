const STORE = {itemList: [
  {name: "apples", checked: false, editing: false},
  {name: "oranges", checked: false, editing: false},
  {name: "milk", checked: true, editing: false},
  {name: "bread", checked: false, editing: false}
]
};

function generateItemElement(item, itemIndex) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button> 
        ${item.editing ?  `<input type="text"/>` : ''}
        <button class="shopping-item-edit js-item-edit">
          <span class="button-label">edit</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
  // console.log("Generating shopping list element");

  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  
  return items.join("");
}


function renderShoppingList() {
  // render the shopping list in the DOM
  // console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateShoppingItemsString(STORE.itemList);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}

function addItemToShoppingList(itemName) {
  // console.log(`Adding "${itemName}" to shopping list`);
  STORE.itemList.push({name: itemName, checked: false});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    // console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemIndex) {
  // console.log("Toggling checked property for item at index " + itemIndex);
  STORE.itemList[itemIndex].checked = !STORE.itemList[itemIndex].checked;
}

function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
    // console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}
//<button class="shopping-item-delete js-item-delete">

function deleteItemForShoppingList(itemIndex){
  //delete the item
  // console.log('delete button working');
  STORE.itemList.splice(itemIndex, 1);
}

function handleDeleteItemClicked() {
  // Listen for when users want to delete an item and 
  $('.shopping-list').on('click', `.js-item-delete`, event => {
    // console.log('`handleDeleteItemClicked` ran')
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    // delete it
    deleteItemForShoppingList(itemIndex);
    renderShoppingList();
  });
}

function editItemForShoppingList(itemIndex){
  const itemName = STORE.itemList[itemIndex].name
  console.log(itemName);
  STORE.itemList[itemIndex].editing=true;
}

function handleEditItemClicked(){
  $('.shopping-list').on('click', `.js-item-edit`, event => {
    console.log('`handleEditItemClicked` ran')
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    editItemForShoppingList(itemIndex);
    renderShoppingList();
  });

}


function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleEditItemClicked();
}


$(handleShoppingList);
