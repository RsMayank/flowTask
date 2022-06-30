import { LightningElement,api, track} from 'lwc';
import { FlowAttributeChangeEvent, FlowNavigationNextEvent , FlowNavigationBackEvent, FlowNavigationFinishEvent} from 'lightning/flowSupport';
import { createRecord } from 'lightning/uiRecordApi';
import OPPORTUNITY_OBJ from '@salesforce/schema/Opportunity';
import OPPORTUNITYCR_OBJ from '@salesforce/schema/OpportunityContactRole';
import OPPORTUNITY_NAME from '@salesforce/schema/Opportunity.Name';
import AMOUNT from '@salesforce/schema/Opportunity.Amount';
import CLOSEDATE from '@salesforce/schema/Opportunity.CloseDate';
import TYPE from '@salesforce/schema/Opportunity.Type';
import STAGENAME from '@salesforce/schema/Opportunity.StageName';
import CONTACTROLE from '@salesforce/schema/OpportunityContactRole.Role';
import CONTACTID from '@salesforce/schema/OpportunityContactRole.ContactId';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

// import { NavigationMixin } from 'lightning/navigation';
export default class flowOpportunityCreation extends LightningElement 
{
    @api recordId; //from the flow
    @api contactID; // from the flow
    @api contactRole; //to the flow
    @api opportunityId; //to the flow
    @api triggerNavigationNextEvent;
    @api availableActions = [];
    contactRole_field = CONTACTROLE;
    contact_ID = CONTACTID;


    opportunity_obj = OPPORTUNITY_OBJ;
    opportunityCR_obj = OPPORTUNITYCR_OBJ;
    OpportunityName_field = OPPORTUNITY_NAME;

    Amount_field= AMOUNT;
    CloseDate_field=CLOSEDATE;
    Type_field=TYPE;
    StageName_field= STAGENAME;
    isLoading = false;
    name = '';
    amount ;
    stage ='';
    type='';
    closedate;

    // handleChange(event) {
    //     this.rec[event.target.name] = event.target.value;
    // }
    handleConRoleChange(event)
    {
        this.contactRole = event.target.value;
    }
    handleNameChange(event)
    {
        this.name = event.target.value;
    }
    handleStagechange(event)
    {
        this.stage = event.target.value;
    }
    handleTypeChange(event)
    {
        this.type = event.target.value;
    }
    handleCloseDateChange(event)
    {
        this.closedate= event.target.value;
    }
    handleAmountChange(event)
    {
        this.amount = event.target.value;
    }
    // handleAccountIdChange(event)
    // {
    //     this.AccountID = this.recordId;
    // }
    // handleGoBack()
    // {
    //     if (this.availableActions.find((action) => action === "BACK")) {
    //         const navigateBackEvent = new FlowNavigationBackEvent();
    //         this.dispatchEvent(navigateBackEvent);
    //       }
    // }
    handleNext() {
        if (this.availableActions.find((action) => action === "NEXT")) {
          const navigateNextEvent = new FlowNavigationFinishEvent();
          this.dispatchEvent(navigateNextEvent);
        }
      }
    // showSuccessToast() {
        // const evt = 
    //      this.dispatchEvent(evt);
    createOpportunity() {
        const fields = {};
        fields[OPPORTUNITY_NAME.fieldApiName] = this.name;
        fields[AMOUNT.fieldApiName] = this.amount;
        fields[TYPE.fieldApiName] = this.type;
        fields[STAGENAME.fieldApiName] = this.stage;
        fields[CLOSEDATE.fieldApiName] = this.closedate;
        const recordInput = { apiName: OPPORTUNITY_OBJ.objectApiName, fields };
        createRecord(recordInput)
            .then(account => {
                this.opportunityId = account.id;
                if (this.availableActions.find((action) => action === "NEXT")) {

                    const navigateNextEvent = new FlowNavigationNextEvent();
                    this.dispatchEvent(navigateNextEvent);
                    this.dispatchEvent(new FlowAttributeChangeEvent('contactRole', this.contactRole));
                    this.dispatchEvent(new FlowAttributeChangeEvent('opportunityId', this.opportunityId));
    
                    //this.dispatchEvent(navigateNextEvent);
    
                  }
                  
                const evnt = new ShowToastEvent({
                    title: 'Toast Success',
                    message: 'Record Created sucessfully',
                    variant: 'success',
                    mode: 'dismissable'
                });
                this.dispatchEvent(evnt);
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
////////////////////////////////////////////=============
              //////////////===========================

    

        }
}