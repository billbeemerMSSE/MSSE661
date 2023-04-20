class Shoot {
    shoots = [];
    shootsService;
  
    constructor(shootsService) {
      this.shootsService = shootsService;
    }
  
    init() {
      this.render();
    }
  
    _renderListRowItem = (shoot) => {
      const listGroupItem = document.createElement('li');
      listGroupItem.id = `shoot-${shoot.id}`;
      listGroupItem.className = 'list-group-item';
  
      const deleteBtn = document.createElement('button');
      const deleteBtnTxt = document.createTextNode('X');
      deleteBtn.id = 'delete-btn';
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
  

    _renderList = () => {

      const shootsDiv = document.getElementById('shoots');
      const loadingDiv = shootsDiv.childNodes[0];
      const fragment = document.createDocumentFragment();
      const ul = document.createElement('ul');
      ul.id = 'shoots-list';
      ul.className = 'list-group list-group-flush checked-list-box';
  
      this.shoots.map((shoot) => {
        const listGroupRowItem = this._renderListRowItem(shoot);
  
        ul.appendChild(listGroupRowItem);
      });
  
      fragment.appendChild(ul);
      shootsDiv.replaceChild(fragment, loadingDiv);
    };
  

    _renderMsg = () => {
      const shootsDiv = document.getElementById('shoots');
      const loadingDiv = shootsDiv.childNodes[0];
      const listParent = document.getElementById('shoots-list');
      const msgDiv = this._createMsgElement('Create some new shoots!');
  
      if (shootsDiv) {
        shootsDiv.replaceChild(msgDiv, loadingDiv);
      } else {
        shootsDiv.replaceChild(msgDiv, listParent);
      }
    };
  

    addShoot = async (newShoot) => {
      try {
        const { shoot_client, shoot_cater } = newShoot;
        await this.shootsService.addShoot({ shoot_client, shoot_cater });
        this.shoots.push(newShoot);
      } catch (err) {
        console.log(err);
        alert('Unable to add shoot. Please try again later.');
      }
    };
  
    _addShootEventHandler = () => {
      const shootClient = document.getElementById('formInputShootClient');
      const shoot_client = shootClient.value;
  
      const shootCater = document.getElementById('formInputShootCater');
      const shoot_cater = shootCater.value;
  
      // validation checks
      if (!shoot_client) {
        alert('Please enter a client name.');
        return;
      }
      if (!shoot_cater) {
        alert('Please enter a cater amount.');
        return;
      }
  
      const shoot = { shoot_client, shoot_cater }; 
      const { newShoot, newShootEl } = this._createNewShootEl(shoot); 
  
      this.addShoot(newShoot);
  
      const listParent = document.getElementById('shoots-list');
  
      if (listParent) {
        listParent.appendChild(newShootEl);
      } else {
        this._renderList();
      }
      shootClient.value = ''; 
      shootCater.value = '';
    };
  

    _createNewShootEl = (shoot) => {
      const shoot_id = this.shoots.length;
      const newShoot = { ...shoot, shoot_id};
      const newShootEl = this._renderListRowItem(newShoot);
  
      return { newShoot, newShootEl };
    };
  

    deleteShoot = async (shootId) => {
      try {
        const res = await this.shootsService.deleteShoot(shootId);
        this.shoots = this.shoots.filter((shoot) => shoot.shoot_id !== shootId);
  
        if (res !== null) {
          alert('Shoot deleted successfully!');
        }
        return res;
      } catch (err) {
        alert('Unable to delete shoot. Please try again later.');
      }
    };
  

    _deleteEventHandler = (shootId) => () => {
      const shoot = document.getElementById(`shoot-${shootId}`);
      shoot.remove();
  
      this.deleteShoot(shootId).then(() => {
        if (!this.shoots.length) {
          this._renderMsg();
        }
      });
    };
  
    _createMsgElement = (msg) => {
      const msgDiv = document.createElement('div');
      const text = document.createTextNode(msg);
      msgDiv.id = 'user-message';
      msgDiv.className = 'center';
      msgDiv.appendChild(text);
  
      return msgDiv;
    };
  
    render = async () => {
      const shoots = await this.shootsService.getShoots();
  
      try {
        if (shoots.length) {
          this.shoots = shoots;
          this._renderList();
        } else {
          this._renderMsg();
        }
      } catch (err) {
        alert(`Error: ${err.message}`);
      }
    };
  }