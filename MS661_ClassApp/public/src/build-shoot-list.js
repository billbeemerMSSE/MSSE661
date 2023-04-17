class ShootList {
    shoot = [];

    constructor() {}

    createShootListParent = () => {
        const ul = document.createElement('ul');
        ul.id = 'shoot-list';
        ul.className = 'list-group list-group-flush checked-list-box';
        return ul;
    };

    _deleteEventHandler = (shootId) => async () => {
        if (shootId) {
            const response = await deleteShoot(shootId);

            if (response !== null) {
                this.shoots = this.shoots.filter((shoot) => shoot.id !== shootId);
                const shoot = document.getElementById(`shoot-${shootId}`);
                shoot.remove();

                if (!this.shoots.length) {
                    const div = document.getElementById('shoots');
                    const loadingDiv = div.childNodes[1];
                    const errDiv = this.generateErrorMsg('Create some new shoots!');
                    div.replaceChild(errDiv, loadingDiv);
                }
            }
        }
    };

    buildShootListRowItem = (shoot) => {
        const listGroupItem = document.createElement('li');
        listGroupItem.id = `shoot-${shoot.shoot_id}`; // shoot-1
        listGroupItem.className = 'list-group-item';
    
        const deleteBtn = document.createElement('button');
        const deleteBtnTxt = document.createTextNode('X');
        deleteBtn.className = 'btn btn-secondary';
        deleteBtn.addEventListener('click', this._deleteEventHandler(shoot.id));
        deleteBtn.appendChild(deleteBtnTxt);
    
        const shootClientSpan = document.createElement('span');
        const shootClient = document.createTextNode(shoot.client);
        shootClientSpan.appendChild(shootClient);
    
        const shootCaterSpan = document.createElement('span');
        const shootCater = document.createTextNode(shoot.cater);
        shootCaterSpan.append(shootCater);

        // add list item's details
        listGroupItem.append(deleteBtn);
        listGroupItem.append(shootClientSpan);
        listGroupItem.append(shootCaterSpan);
    
        return listGroupItem;
    };

    buildShootList = (mount, shoots) =>
        shoots.map((shoot) => {
            const listGroupRowItem = this.buildShootListRowItem(shoot);
            mount.append(listGroupRowItem);
        });

    generateErrorMsg = (msg) => {
        const div = document.createElement('div');
        const text = document.createTextNode(msg);
        div.id = 'user-message';
        div.className = 'center';
        div.appendChild(text);
        return div;
    };

    generateShoots = async () => {
        const response = await getShoots();
        const div = document.getElementById('shoots');
        const loadingDiv = div.childNodes[1];

        if (response.length) {
            this.shoots = response;
            const shootsDiv = this.createShootListParent();
            this.buildShootList(shootsDiv, response);
            div.replaceChild(shootsDiv, loadingDiv);
        } else {
            const errDiv = this.generateErrorMsg(res.msg);
            div.replaceChild(errDiv, loadingDiv);
        }
    };
}

const inst = new ShootList();