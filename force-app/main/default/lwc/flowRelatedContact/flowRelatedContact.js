import { LightningElement, track, wire, api} from 'lwc';
import retrieveContacts from '@salesforce/apex/searchRelatedContacts.retrieveContacts';
import returnCon from '@salesforce/apex/searchRelatedContacts.returnCon';
import retrieveContactData from '@salesforce/apex/searchRelatedContacts.retrieveContactData';
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';
import StockKeepingUnit from '@salesforce/schema/Product2.StockKeepingUnit';
import { CurrentPageReference } from "lightning/navigation";

export default class FlowRelatedContact extends LightningElement {
    @api recordId ='0015j000007zxNoAAI';
    @track searchVal ;
    @track contactData;
    @track errorMsg = '';
    @api outputTest;
    @api selectedVal;
    @api toFlow;
    @api toFlow1;
    @track isSelected = false;
    @api contactURL;
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
    findSelectedVal()
    {
        returnCon({keyVal : this.toFlow})
        .then(result =>{
            this.selectedVal = result;
        })
        .catch(error =>{
            this.errorMsg = error;
        });
        
    }
    handleURL() {
        // Navigate to Account record page
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                "recordId": this.recordId,
                "objectApiName": "Account",
                "actionName": "view"
            },
        });
    }
    handleRadio(event)
    {
        this.toFlow = event.target.value;
        console.log(this.toFlow);
        this.isSelected = true;
        this.toFlow1 = this.toFlow;

        this.dispatchEvent(new FlowAttributeChangeEvent('outputTest', this.toFlow1));

        this.findSelectedVal();
        
        
    }
    // const attributeChangeEvent = new FlowAttributeChangeEvent('outputTest', this.selectedVal);
    // this.dispatchEvent(attributeChangeEvent); 

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

    addClass(event){
        let index = event.currentTarget.dataset.rowIndex;
        let flipElement = this.template.querySelector('[data-id="' + index + '"]');
        flipElement.classList.add('class1');
       
    }

    removeClass(event){
        let index = event.currentTarget.dataset.rowIndex;
        let flipElement = this.template.querySelector('[data-id="' + index + '"]');
        flipElement.classList.remove('class1');
    }
}