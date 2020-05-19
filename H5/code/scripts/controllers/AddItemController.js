import ContainerController from '../../cardinal/controllers/base-controllers/ContainerController.js';
import ItemsModel from '../models/ItemsModel.js';

var model = {
        id: {
            label: 'Id',
            name: 'id',
            value: ''
        },
        name: {
            label: 'Name',
            name: 'name',
            value: ''
        },
        quantity: {
            label: 'Quantity',
            name: 'quantity',
            value: ''
        },
        price: {
            label: 'Price',
            name: 'price',
            value: ''
        }
};

export default class AddItemController extends ContainerController {
    constructor(element) {

        super(element);
        this.model = this.setModel(JSON.parse(JSON.stringify(model)));
        let uploadItem = () => {
            let item = {
                id : this.model.getChainValue("id.value"),
                name : this.model.getChainValue("name.value"),
                quantity : this.model.getChainValue("quantity.value"),
                price : this.model.getChainValue("price.value"),
            };
			
			let itemsModel = new ItemsModel();
			itemsModel.get_data().then(() => {itemsModel.add_item(item); itemsModel.save();});
        };

        this.on("uploadItem", uploadItem, true);
    }
}