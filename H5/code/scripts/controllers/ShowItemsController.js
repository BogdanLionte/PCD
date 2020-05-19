import ContainerController from '../../cardinal/controllers/base-controllers/ContainerController.js';
import ItemsModel from '../models/ItemsModel.js';

var model = {
    items: []
};

export default class ShowItemsController extends ContainerController {
    constructor(element) {
        super(element);
        var itemsModel = new ItemsModel();
        model.items = [];
        itemsModel.get_data().then(() => {
                itemsModel.data.items.forEach(item => {
                        let newItem = {
                            id: {
                                label: 'Id',
                                name: 'id',
                                value: item.id
                            },
                            name: {
                                label: 'Name',
                                name: 'name',
                                value: item.name
                            },
                            quantity: {
                                label: 'Quantity',
                                name: 'quantity',
                                value: item.quantity
                            },
                            price: {
                                label: 'Price',
                                name: 'price',
                                value: item.price
                            },
                        };
                        model.items.push(newItem);
                    }
                )
            console.log(JSON.stringify(model));
            this.model = this.setModel(JSON.parse(JSON.stringify(model)));
            }
        );

	}
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
