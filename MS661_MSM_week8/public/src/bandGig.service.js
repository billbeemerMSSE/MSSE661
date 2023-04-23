class BandGig {
    bandGigs = [];
    bandGigsService;
  
    constructor(bandGigsService) {
      this.bandGigsService = bandGigsService;
    }
  
    init() {
      this.render();
    }
  
    _renderListRowItem = (bandGig) => {
      const listGroupItem = document.createElement('li');
      listGroupItem.id = `bandGig-${bandGig.id}`;
      listGroupItem.className = 'bandGig-item';
  
      const deleteBtn = document.createElement('button');
      const deleteBtnTxt = document.createTextNode('🗑️');
      deleteBtn.id = 'delete-btn';
      deleteBtn.className = 'dbtn';
      deleteBtn.addEventListener('click', this._deleteEventHandler(bandGig.id));
      deleteBtn.appendChild(deleteBtnTxt);

      const editBtn = document.createElement('button');
      const editBtnTxt = document.createTextNode('✏️');
      editBtn.id = 'edit-btn';
      editBtn.className = 'ebtn';
      editBtn.addEventListener('click', this._editBandGigEventHandler(bandGig));
      editBtn.appendChild(editBtnTxt);
  
      const bandGigInfoDiv = document.createElement('div');

      const bandGigDateSpan = document.createElement('span');
      const bandGigDate = document.createTextNode(bandGig.date);
      bandGigDateSpan.appendChild(bandGigDate);
  
      const bandGigNameSpan = document.createElement('span');
      const bandGigName = document.createTextNode(bandGig.name);
      bandGigNameSpan.append(bandGigName);
  
      // add list item's details
      listGroupItem.append(editBtn);
      listGroupItem.append(bandGigInfoDiv);
      listGroupItem.append(deleteBtn);
      bandGigInfoDiv.append(bandGigDateSpan);
      bandGigInfoDiv.append(bandGigNameSpan);
  
      return listGroupItem;
    };
  

    _renderList = () => {

      const bandGigsDiv = document.getElementById('bandGigs');
      const loadingDiv = bandGigsDiv.childNodes[0];
      const fragment = document.createDocumentFragment();
      const ul = document.createElement('ul');
      ul.id = 'bandGigs-list';
      ul.className = 'bandGig-container';
      const myheader = document.createElement("li");
      myheader.classList.add("bandGig-header");
      myheader.innerHTML = '<div><span>Show Date</span><span>Band Name</span></div>';
      ul.appendChild(myheader);
      this.bandGigs.map((bandGig) => {
        const listGroupRowItem = this._renderListRowItem(bandGig);
        ul.appendChild(listGroupRowItem);
      });
  
      fragment.appendChild(ul);
      bandGigsDiv.replaceChild(fragment, loadingDiv);
    };
  

    _renderMsg = () => {
      const bandGigsDiv = document.getElementById('bandGigs');
      const loadingDiv = bandGigsDiv.childNodes[0];
      const listParent = document.getElementById('bandGigs-list');
      const msgDiv = this._createMsgElement('Create some new Gigs!');
  
      if (bandGigsDiv) {
        bandGigsDiv.replaceChild(msgDiv, loadingDiv);
      } else {
        bandGigsDiv.replaceChild(msgDiv, listParent);
      }
    };
  

    addBandGig = async (newBandGig) => {
      try {
        const { bandGig_date, bandGig_name } = newBandGig;
        await this.bandGigsService.addBandGig({ bandGig_date, bandGig_name });
        this.bandGigs.push(newBandGig);
      } catch (err) {
        console.log(err);
        alert('Unable to add gig. Please try again later.');
      }
    };
  
    _addBandGigEventHandler = () => {
      const bandGigDate = document.getElementById('formInputBandGigDate');
      const bandGig_date = bandGigDate.value;
  
      const bandGigName = document.getElementById('formInputBandGigName');
      const bandGig_name = bandGigName.value;
  
      // validation checks
      if (!bandGig_date) {
        alert('Please enter a show date.');
        return;
      }
      if (!bandGig_name) {
        alert('Please enter a band name.');
        return;
      }
  
      const bandGig = { bandGig_date, bandGig_name }; 
      const newBandGigEl = this._createNewBandGigEl(bandGig); 
      this.addBandGig(bandGig);
  
      if (!document.getElementById('bandGigs-list')) {
        setTimeout(() => {
          bandGigDate.value = ''; 
          bandGigName.value = '';
          window.location.reload();
        }, 50)
        return;
      }
      const listParent = document.getElementById('bandGigs-list');
  
      listParent.appendChild(newBandGigEl);

      bandGigDate.value = ''; 
      bandGigName.value = '';
    };
  

    _createNewBandGigEl = (bandGig) => {
      const bandGig_id = this.bandGigs.length;
      let bandGigInfo = {};
      bandGigInfo.id = bandGig_id;
      bandGigInfo.date = bandGig.bandGig_date;
      bandGigInfo.name = bandGig.bandGig_name;
      const newBandGigEl = this._renderListRowItem(bandGigInfo);

      return newBandGigEl;
    };
  

    deleteBandGig = async (bandGigId) => {
      try {
        const res = await this.bandGigsService.deleteBandGig(bandGigId);
        this.bandGigs = this.bandGigs.filter((bandGig) => bandGig.bandGig_id !== bandGigId);
  
        if (res !== null) {
          alert('Gig deleted successfully!');
        }
        return res;
      } catch (err) {
        alert('Unable to delete Gig. Please try again later.');
      }
    };
  

    _deleteEventHandler = (bandGigId) => (e) => {
      const bandGig = document.getElementById(`bandGig-${bandGigId}`);
      const dateEl = document.querySelector(`#bandGig-${bandGigId} > div > span:nth-child(1)`);
      const nameEl = document.querySelector(`#bandGig-${bandGigId} > div > span:nth-child(2)`);
      const editBtn = document.querySelector(`#bandGig-${bandGigId} > button#edit-btn`);

      if (dateEl.getAttribute("contenteditable") == "true") {
        e.target.innerText = "🗑️";
        dateEl.setAttribute("contenteditable", false);
        nameEl.setAttribute("contenteditable", false);
        dateEl.innerText = this.dateOld;
        nameEl.innerText = this.nameOld;
        editBtn.innerText = "✏️";
        return;
      }
      bandGig.remove();
  
      this.deleteBandGig(bandGigId).then(() => {
        if (!this.bandGigs.length) {
          this._renderMsg();
        }
      });
    };

    editBandGig = async (bandGigInfo) => {
      try {
        const {id, date, name} = bandGigInfo;
        let formData = {};
        formData.bandGig_date = date;
        formData.bandGig_name = name;
        await this.bandGigsService.editBandGig(id, formData);
      } catch (err) {
        console.log(err);
        alert('Unable to modify Gig. Please try again later.');
      }
    };

    dateOld;
    nameOld;
    _editBandGigEventHandler = (bandGig) => (e) => {
      const dateEl = document.querySelector(`#bandGig-${bandGig.id} > div > span:nth-child(1)`);
      const nameEl = document.querySelector(`#bandGig-${bandGig.id} > div > span:nth-child(2)`);
      const dbtn = document.querySelector(`#bandGig-${bandGig.id} > button#delete-btn`);

      if (dateEl.getAttribute("contenteditable") == "true") {
        if (dateEl.innerText == this.dateOld && nameEl.innerText == this.nameOld) {
          dateEl.setAttribute("contenteditable", false);
          nameEl.setAttribute("contenteditable", false);
          e.target.innerText = "✏️";
          dbtn.innerText = "🗑️";
          return;
        };
        let same;
        for (let i = 0; i < this.bandGigs.length; i++) {
          if (this.bandGigs[i].date == dateEl.innerText) same = true;
        }
        if (same == true) {alert("Show date cannot be the same as other show dates!");return;}

        let newBandGig = {};
        newBandGig.id = bandGig.id;
        newBandGig.date = dateEl.innerText;
        newBandGig.name = nameEl.innerText;

        this.editBandGig(newBandGig).then(() => {
          dateEl.setAttribute("contenteditable", false);
          nameEl.setAttribute("contenteditable", false);
          e.target.innerText = "✏️";
          dbtn.innerText = "🗑️";
          this.bandGigs.push(newBandGig);
          this.bandGigs.splice(this.bandGigs.findIndex(x => x.date == this.dateOld), 1);
        })
      } else {
        this.nameOld = nameEl.innerText;
        this.dateOld = dateEl.innerText;
        dateEl.setAttribute("contenteditable", true);
        nameEl.setAttribute("contenteditable", true);
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
      const bandGigs = await this.bandGigsService.getBandGigs();
  
      try {
        if (bandGigs.length) {
          this.bandGigs = bandGigs;
          this._renderList();
        } else {
          this._renderMsg();
        }
      } catch (err) {
        alert(`Error: ${err.message}`);
      }
    };
  }