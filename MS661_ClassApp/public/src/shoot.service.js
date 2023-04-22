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
      listGroupItem.className = 'shoot-item';
  
      const deleteBtn = document.createElement('button');
      const deleteBtnTxt = document.createTextNode('🗑️');
      deleteBtn.id = 'delete-btn';
      deleteBtn.className = 'dbtn';
      deleteBtn.addEventListener('click', this._deleteEventHandler(shoot.id));
      deleteBtn.appendChild(deleteBtnTxt);

      const editBtn = document.createElement('button');
      const editBtnTxt = document.createTextNode('✏️');
      editBtn.id = 'edit-btn';
      editBtn.className = 'ebtn';
      editBtn.addEventListener('click', this._editShootEventHandler(shoot));
      editBtn.appendChild(editBtnTxt);
  
      const shootInfoDiv = document.createElement('div');

      const shootClientSpan = document.createElement('span');
      const shootClient = document.createTextNode(shoot.client);
      shootClientSpan.appendChild(shootClient);
  
      const shootCaterSpan = document.createElement('span');
      const shootCater = document.createTextNode(shoot.cater);
      shootCaterSpan.append(shootCater);
  
      // add list item's details
      listGroupItem.append(editBtn);
      listGroupItem.append(shootInfoDiv);
      listGroupItem.append(deleteBtn);
      shootInfoDiv.append(shootClientSpan);
      shootInfoDiv.append(shootCaterSpan);
  
      return listGroupItem;
    };
  

    _renderList = () => {

      const shootsDiv = document.getElementById('shoots');
      const loadingDiv = shootsDiv.childNodes[0];
      const fragment = document.createDocumentFragment();
      const ul = document.createElement('ul');
      ul.id = 'shoots-list';
      ul.className = 'shoot-container';
      const myheader = document.createElement("li");
      myheader.classList.add("shoot-header");
      myheader.innerHTML = '<div><span>Client Name</span><span>Catering Needs</span></div>';
      ul.appendChild(myheader);
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
      const newShootEl = this._createNewShootEl(shoot); 
      this.addShoot(shoot);
  
      const listParent = document.getElementById('shoots-list');
  
      listParent.appendChild(newShootEl);

      shootClient.value = ''; 
      shootCater.value = '';
    };
  

    _createNewShootEl = (shoot) => {
      const shoot_id = this.shoots.length;
      let shootInfo = {};
      shootInfo.id = shoot_id;
      shootInfo.client = shoot.shoot_client;
      shootInfo.cater = shoot.shoot_cater;
      const newShootEl = this._renderListRowItem(shootInfo);

      return newShootEl;
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
  

    _deleteEventHandler = (shootId) => (e) => {
      const shoot = document.getElementById(`shoot-${shootId}`);
      const clientEl = document.querySelector(`#shoot-${shootId} > div > span:nth-child(1)`);
      const caterEl = document.querySelector(`#shoot-${shootId} > div > span:nth-child(2)`);
      const editBtn = document.querySelector(`#shoot-${shootId} > button#edit-btn`);

      if (clientEl.getAttribute("contenteditable") == "true") {
        e.target.innerText = "🗑️";
        clientEl.setAttribute("contenteditable", false);
        caterEl.setAttribute("contenteditable", false);
        clientEl.innerText = this.clientOld;
        caterEl.innerText = this.caterOld;
        editBtn.innerText = "✏️";
        return;
      }
      shoot.remove();
  
      this.deleteShoot(shootId).then(() => {
        if (!this.shoots.length) {
          this._renderMsg();
        }
      });
    };

    editShoot = async (shootInfo) => {
      try {
        const {id, client, cater} = shootInfo;
        let formData = {};
        formData.shoot_client = client;
        formData.shoot_cater = cater;
        await this.shootsService.editShoot(id, formData);
      } catch (err) {
        console.log(err);
        alert('Unable to modify shoot. Please try again later.');
      }
    };

    clientOld;
    caterOld;
    _editShootEventHandler = (shoot) => (e) => {
      const clientEl = document.querySelector(`#shoot-${shoot.id} > div > span:nth-child(1)`);
      const caterEl = document.querySelector(`#shoot-${shoot.id} > div > span:nth-child(2)`);
      const dbtn = document.querySelector(`#shoot-${shoot.id} > button#delete-btn`);

      if (clientEl.getAttribute("contenteditable") == "true") {
        if (clientEl.innerText == this.clientOld && caterEl.innerText == this.caterOld) {
          clientEl.setAttribute("contenteditable", false);
          caterEl.setAttribute("contenteditable", false);
          e.target.innerText = "✏️";
          dbtn.innerText = "🗑️";
          return;
        };
        let same;
        for (let i = 0; i < this.shoots.length; i++) {
          if (this.shoots[i].client == clientEl.innerText) same = true;
        }
        if (same == true) {alert("Client name cannot be the same as other clients!");return;}

        let newShoot = {};
        newShoot.id = shoot.id;
        newShoot.client = clientEl.innerText;
        newShoot.cater = parseInt(caterEl.innerText);

        this.editShoot(newShoot).then(() => {
          clientEl.setAttribute("contenteditable", false);
          caterEl.setAttribute("contenteditable", false);
          e.target.innerText = "✏️";
          dbtn.innerText = "🗑️";
          this.shoots.push(newShoot);
          this.shoots.splice(this.shoots.findIndex(x => x.client == this.clientOld), 1);
        })
      } else {
        this.caterOld = caterEl.innerText;
        this.clientOld = clientEl.innerText;
        clientEl.setAttribute("contenteditable", true);
        caterEl.setAttribute("contenteditable", true);
        e.target.innerText = "✔️";
        dbtn.innerText = "X"
      }
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