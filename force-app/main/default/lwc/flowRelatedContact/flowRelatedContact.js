import { LightningElement, track, wire, api} from 'lwc';
import retrieveContacts from '@salesforce/apex/searchRelatedContacts.retrieveContacts';
import retrieveContactData from '@salesforce/apex/searchRelatedContacts.retrieveContactData';

export default class FlowRelatedContact extends LightningElement {
    @api recordId ;
    @track searchVal = '';
    @track contactData;
    @track errorMsg = '';
    handleChangeAccName(event)
    {
        this.searchVal = event.target.value;    
    }
    handleContactSearch()
    { retrieveContacts({recordID : this.recordId , skey : this.searchVal})
        .then(result => {
            this.contactData = result;

        })
        .catch(error =>{
            this.errorMsg = error;
        });

    }

    handleShowAll()
    {
        retrieveContactData({recordID : this.recordId})
        .then(result =>{
            this.contactData = result;
        })
        .catch(error =>{
            this.errorMsg  = error;

        });
    }
}