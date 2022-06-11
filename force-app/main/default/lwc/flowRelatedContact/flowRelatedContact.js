import { LightningElement, track, wire, api} from 'lwc';
import retrieveContacts from '@salesforce/apex/searchRelatedContacts.retrieveContacts';
import retrieveContactData from '@salesforce/apex/searchRelatedContacts.retrieveContactData';
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';
import StockKeepingUnit from '@salesforce/schema/Product2.StockKeepingUnit';

export default class FlowRelatedContact extends LightningElement {
    @api recordId ='0015j000007zxNoAAI';
    @track searchVal ;
    @track contactData;
    @track errorMsg = '';
    @api outputTest;
    @track selectedVal;
    @track isSelected = false;
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


    handleRadio(event)
    {
        //No NaN
        console.log("Helllllooooooo!!!!!!!!");
        this.selectedVal = event.target.value;
        console.log(this.selectedVal);
        this.isSelected = true;

        this.dispatchEvent(new FlowAttributeChangeEvent('outputValue', this.selectedVal));

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