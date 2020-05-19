export default class ItemsModel {
	
	constructor() {
		this.data = {items: []};
	}

	async get_data() {
        await fetch('/download/data/items.json')
            .then(
                (response) => {
                    if(!response.ok) {
                        return;
                    }
                    return response.json().then((saved_data) => {this.data = saved_data})
                }
            );
	}
	
	add_item(item) {
		this.data.items.push(item);
	}
	
	async save() {
		const itemFile = new File([JSON.stringify(this.data)], 'items.json');
		const saveEndpointUrl = "/upload?path=/data&filename=items.json";
		
		await fetch(saveEndpointUrl, {method: 'POST', body: itemFile}).then(
            (response) => { if (!response.ok || response.status != 201) {
                    return Promise.reject("Unable to save items");
                }

                return Promise.resolve();
		});
	}
}